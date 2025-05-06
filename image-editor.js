// Complete rewrite of image editor with proper cropping functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const photoInput = document.getElementById('photoInput');
    const photoUploads = document.querySelectorAll('.photo-upload');
    
    // Create modal elements for image editor
    const editorModal = document.createElement('div');
    editorModal.className = 'image-editor-modal';
    editorModal.innerHTML = `
        <div class="editor-content">
            <div class="editor-header">
                <h3>Edit Your Photo</h3>
                <button class="close-editor">&times;</button>
            </div>
            <div class="editor-preview">
                <canvas id="editorCanvas"></canvas>
            </div>
            <div class="editor-controls">
                <div class="control-group">
                    <button id="cropBtn" class="editor-btn">Crop</button>
                    <div class="crop-options" style="display: none;">
                        <button id="applyCrop" class="editor-btn">Apply Crop</button>
                        <button id="cancelCrop" class="editor-btn">Cancel</button>
                    </div>
                </div>
                <div class="control-group">
                    <button id="rotateLeftBtn" class="editor-btn">↺ Rotate Left</button>
                    <button id="rotateRightBtn" class="editor-btn">↻ Rotate Right</button>
                </div>
                <button id="saveImageBtn" class="editor-btn save-btn">Save Image</button>
            </div>
        </div>
    `;
    document.body.appendChild(editorModal);
    
    // Editor variables
    let canvas = document.getElementById('editorCanvas');
    let ctx = canvas.getContext('2d');
    let originalImage = null;
    let currentImage = null;
    let rotation = 0;
    let isCropping = false;
    let cropStartX, cropStartY, cropWidth, cropHeight;
    let croppedImageData = null;
    
    // Close button functionality
    const closeBtn = document.querySelector('.close-editor');
    closeBtn.addEventListener('click', function() {
        editorModal.style.display = 'none';
    });
    
    // Handle file selection
    photoInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                // Show the editor modal
                editorModal.style.display = 'flex';
                
                // Load the image into the canvas
                const img = new Image();
                img.onload = function() {
                    originalImage = img;
                    currentImage = img;
                    resetEditor();
                    drawImage();
                };
                img.src = event.target.result;
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });
    
    // Initialize canvas size
    function resetEditor() {
        rotation = 0;
        isCropping = false;
        croppedImageData = null;
        
        // Set canvas size based on image and available space
        const maxWidth = Math.min(window.innerWidth * 0.8, 600);
        const maxHeight = Math.min(window.innerHeight * 0.5, 400);
        
        let width = currentImage.width;
        let height = currentImage.height;
        
        // Calculate aspect ratio
        const aspectRatio = width / height;
        
        if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
        }
        
        if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
        }
        
        canvas.width = width;
        canvas.height = height;
    }
    
    // Draw the image on canvas with current rotation
    function drawImage() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Save context state
        ctx.save();
        
        // Handle rotation
        if (rotation !== 0) {
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(rotation * Math.PI / 180);
            ctx.translate(-canvas.width/2, -canvas.height/2);
        }
        
        // Draw the image
        const aspectRatio = currentImage.width / currentImage.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;
        
        // Maintain aspect ratio
        if (canvas.width / canvas.height > aspectRatio) {
            drawWidth = canvas.height * aspectRatio;
            offsetX = (canvas.width - drawWidth) / 2;
        } else {
            drawHeight = canvas.width / aspectRatio;
            offsetY = (canvas.height - drawHeight) / 2;
        }
        
        ctx.drawImage(currentImage, offsetX, offsetY, drawWidth, drawHeight);
        
        // Draw crop overlay if in crop mode
        if (isCropping && cropWidth && cropHeight) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.strokeRect(cropStartX, cropStartY, cropWidth, cropHeight);
            
            // Darken the area outside the crop
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, cropStartY); // Top
            ctx.fillRect(0, cropStartY + cropHeight, canvas.width, canvas.height - (cropStartY + cropHeight)); // Bottom
            ctx.fillRect(0, cropStartY, cropStartX, cropHeight); // Left
            ctx.fillRect(cropStartX + cropWidth, cropStartY, canvas.width - (cropStartX + cropWidth), cropHeight); // Right
        }
        
        // Restore context state
        ctx.restore();
    }
    
    // Crop functionality
    const cropBtn = document.getElementById('cropBtn');
    const applyCropBtn = document.getElementById('applyCrop');
    const cancelCropBtn = document.getElementById('cancelCrop');
    const cropOptions = document.querySelector('.crop-options');
    
    cropBtn.addEventListener('click', function() {
        isCropping = true;
        cropOptions.style.display = 'flex';
        cropBtn.style.display = 'none';
        
        // Set up crop variables
        cropStartX = canvas.width * 0.1;
        cropStartY = canvas.height * 0.1;
        cropWidth = canvas.width * 0.8;
        cropHeight = canvas.height * 0.8;
        
        drawImage();
        
        // Add mouse events for crop adjustment
        canvas.addEventListener('mousedown', startCropDrag);
        canvas.addEventListener('mousemove', updateCropDrag);
        canvas.addEventListener('mouseup', endCropDrag);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd);
    });
    
    let isDragging = false;
    let dragStartX, dragStartY;
    let dragCorner = null; // For resizing the crop area
    const cornerSize = 20; // Size of the corner handles
    
    function startCropDrag(e) {
        if (!isCropping) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if click is on a corner (for resizing)
        if (Math.abs(x - cropStartX) <= cornerSize && Math.abs(y - cropStartY) <= cornerSize) {
            // Top-left corner
            dragCorner = 'tl';
            isDragging = true;
        } else if (Math.abs(x - (cropStartX + cropWidth)) <= cornerSize && Math.abs(y - cropStartY) <= cornerSize) {
            // Top-right corner
            dragCorner = 'tr';
            isDragging = true;
        } else if (Math.abs(x - cropStartX) <= cornerSize && Math.abs(y - (cropStartY + cropHeight)) <= cornerSize) {
            // Bottom-left corner
            dragCorner = 'bl';
            isDragging = true;
        } else if (Math.abs(x - (cropStartX + cropWidth)) <= cornerSize && Math.abs(y - (cropStartY + cropHeight)) <= cornerSize) {
            // Bottom-right corner
            dragCorner = 'br';
            isDragging = true;
        } 
        // Check if click is inside crop area (for moving)
        else if (x >= cropStartX && x <= cropStartX + cropWidth &&
                 y >= cropStartY && y <= cropStartY + cropHeight) {
            dragCorner = null;
            isDragging = true;
            dragStartX = x - cropStartX;
            dragStartY = y - cropStartY;
        }
        
        e.preventDefault();
    }
    
    function updateCropDrag(e) {
        if (!isDragging) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (dragCorner) {
            // Resizing the crop area
            switch(dragCorner) {
                case 'tl': // Top-left
                    const newWidth1 = cropStartX + cropWidth - x;
                    const newHeight1 = cropStartY + cropHeight - y;
                    if (newWidth1 > 20 && newHeight1 > 20) {
                        cropWidth = newWidth1;
                        cropHeight = newHeight1;
                        cropStartX = x;
                        cropStartY = y;
                    }
                    break;
                case 'tr': // Top-right
                    const newWidth2 = x - cropStartX;
                    const newHeight2 = cropStartY + cropHeight - y;
                    if (newWidth2 > 20 && newHeight2 > 20) {
                        cropWidth = newWidth2;
                        cropHeight = newHeight2;
                        cropStartY = y;
                    }
                    break;
                case 'bl': // Bottom-left
                    const newWidth3 = cropStartX + cropWidth - x;
                    const newHeight3 = y - cropStartY;
                    if (newWidth3 > 20 && newHeight3 > 20) {
                        cropWidth = newWidth3;
                        cropHeight = newHeight3;
                        cropStartX = x;
                    }
                    break;
                case 'br': // Bottom-right
                    const newWidth4 = x - cropStartX;
                    const newHeight4 = y - cropStartY;
                    if (newWidth4 > 20 && newHeight4 > 20) {
                        cropWidth = newWidth4;
                        cropHeight = newHeight4;
                    }
                    break;
            }
        } else {
            // Moving the crop area
            cropStartX = Math.max(0, Math.min(canvas.width - cropWidth, x - dragStartX));
            cropStartY = Math.max(0, Math.min(canvas.height - cropHeight, y - dragStartY));
        }
        
        drawImage();
        e.preventDefault();
    }
    
    function endCropDrag(e) {
        isDragging = false;
        dragCorner = null;
        if (e) e.preventDefault();
    }
    
    // Touch event handlers for mobile devices
    function handleTouchStart(e) {
        if (!isCropping) return;
        
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        startCropDrag(mouseEvent);
        e.preventDefault(); // Prevent scrolling while cropping
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        updateCropDrag(mouseEvent);
        e.preventDefault(); // Prevent scrolling while cropping
    }
    
    function handleTouchEnd(e) {
        endCropDrag();
    }
    
    applyCropBtn.addEventListener('click', function() {
        if (!isCropping) return;
        
        // Create a temporary canvas for the cropped image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = cropWidth;
        tempCanvas.height = cropHeight;
        const tempCtx = tempCanvas.getContext('2d');
        
        // Draw the cropped portion
        tempCtx.drawImage(
            canvas, 
            cropStartX, cropStartY, cropWidth, cropHeight,
            0, 0, cropWidth, cropHeight
        );
        
        // Store the cropped image data
        croppedImageData = tempCanvas.toDataURL('image/png');
        
        // Create a new image from the cropped canvas
        const newImage = new Image();
        newImage.onload = function() {
            currentImage = newImage;
            resetEditor();
            drawImage();
            
            // Exit crop mode
            exitCropMode();
        };
        newImage.src = croppedImageData;
    });
    
    cancelCropBtn.addEventListener('click', exitCropMode);
    
    function exitCropMode() {
        isCropping = false;
        cropOptions.style.display = 'none';
        cropBtn.style.display = 'inline-block';
        
        // Remove crop event listeners
        canvas.removeEventListener('mousedown', startCropDrag);
        canvas.removeEventListener('mousemove', updateCropDrag);
        canvas.removeEventListener('mouseup', endCropDrag);
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
        
        drawImage();
    }
    
    // Rotation functionality
    document.getElementById('rotateLeftBtn').addEventListener('click', function() {
        rotation = (rotation - 90) % 360;
        drawImage();
    });
    
    document.getElementById('rotateRightBtn').addEventListener('click', function() {
        rotation = (rotation + 90) % 360;
        drawImage();
    });
    
    // Save functionality - FIXED to show only cropped portion
    document.getElementById('saveImageBtn').addEventListener('click', function() {
        // Get the final image data - use the cropped image if available
        const finalImage = croppedImageData || canvas.toDataURL('image/jpeg', 0.9);
        
        // Update all photo upload areas with the edited image
        photoUploads.forEach(upload => {
            // Clear placeholder
            const placeholder = upload.querySelector('.upload-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
            
            // Remove any previous image
            const oldImg = upload.querySelector('img');
            if (oldImg) {
                oldImg.remove();
            }
            
            // Create a new image element
            const img = document.createElement('img');
            img.src = finalImage;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '10px';
            
            // Add the image directly to the upload container
            upload.appendChild(img);
        });
        
        // Close the editor
        editorModal.style.display = 'none';
    });
    
    // Center the modal when window is resized
    window.addEventListener('resize', function() {
        if (editorModal.style.display === 'flex') {
            resetEditor();
            drawImage();
        }
    });
});