// DOM Elements
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');
const hero = document.querySelector('.hero');
const navItems = document.querySelectorAll('.nav-links li');
const photoUpload = document.getElementById('photoUpload');
const photoInput = document.getElementById('photoInput');

// Toggle mobile menu with improved animations
menuIcon.addEventListener('click', () => {
    // First show the overlay with a fade effect
    menuOverlay.classList.add('active');
    
    // Then show the menu with a slide effect
    setTimeout(() => {
        navLinks.classList.add('active');
        closeIcon.classList.add('active');
        menuIcon.style.display = 'none';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    }, 100);
});

closeIcon.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

// Function to close the menu
function closeMenu() {
    navLinks.classList.remove('active');
    
    // Small delay before hiding the overlay for smooth transition
    setTimeout(() => {
        menuOverlay.classList.remove('active');
    }, 300);
    
    closeIcon.classList.remove('active');
    menuIcon.style.display = 'block';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close menu when clicking on a link
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeMenu();
        }
    });
});

// Photo upload functionality for all photo upload areas
document.addEventListener('DOMContentLoaded', () => {
    const photoUploads = document.querySelectorAll('.photo-upload');
    const photoInputs = document.querySelectorAll('input[type="file"]');
    
    photoUploads.forEach((upload, index) => {
        upload.addEventListener('click', () => {
            // If there's a corresponding input, click it
            if (photoInputs[0]) {
                photoInputs[0].click();
            }
        });
    });
    
    // Handle file selection for the main photo input
    if (photoInput) {
        photoInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // Create image preview
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '100%';
                    img.style.objectFit = 'contain';
                    
                    // Clear placeholder and add image in all photo preview areas
                    const photoUploads = document.querySelectorAll('.photo-upload');
                    photoUploads.forEach(upload => {
                        const placeholder = upload.querySelector('.upload-placeholder');
                        if (placeholder) {
                            placeholder.style.display = 'none';
                        }
                        
                        // Remove any previous image
                        const oldImg = upload.querySelector('img');
                        if (oldImg) {
                            oldImg.remove();
                        }
                        
                        // Clone and append the image
                        const imgClone = img.cloneNode(true);
                        upload.appendChild(imgClone);
                    });
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
});

// Smooth page load animations
document.addEventListener('DOMContentLoaded', () => {
    // Elements are already animated via CSS animations
    // This ensures all animations work properly on page refresh
    
    // Initial check for layout
    checkWindowSize();
    
    // Fix any potential horizontal scroll issues
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    
    // Fix for menu auto-opening issue
    // Make sure menu is closed on page load
    navLinks.classList.remove('active');
    closeIcon.classList.remove('active');
    menuOverlay.classList.remove('active');
    menuIcon.style.display = 'block';
});

// Check window size and adjust layout if needed
function checkWindowSize() {
    if (window.innerWidth <= 576) {
        // For mobile devices, ensure images are shown first
        hero.classList.add('mobile-view');
    } else {
        hero.classList.remove('mobile-view');
    }
    
    // Adjust template positions based on screen size
    adjustTemplatePositions();
}

// Adjust template positions based on screen size
function adjustTemplatePositions() {
    const template1 = document.querySelector('.template-1');
    const template2 = document.querySelector('.template-2');
    const couple = document.querySelector('.couple');
    const ringIcon = document.querySelector('.ring-icon');
    
    if (window.innerWidth <= 768) {
        // Mobile specific adjustments - center couple with templates on sides
        if (couple) {
            couple.style.width = '95%';
            couple.style.margin = '0 auto';
        }
        
        if (template1) {
            template1.style.top = '20%';
            template1.style.right = '-5%';
            template1.style.width = '150px';
            template1.style.maxWidth = '35%';
            template1.style.zIndex = '3';
        }
        
        if (template2) {
            template2.style.bottom = '30%';
            template2.style.left = '-5%';
            template2.style.width = '150px';
            template2.style.maxWidth = '35%';
            template2.style.marginLeft = '0';
            template2.style.zIndex = '1';
        }
        
        if (ringIcon) {
            ringIcon.style.top = '-5%';
            ringIcon.style.left = '80%';
            ringIcon.style.transform = 'translateX(-50%)';
            ringIcon.style.width = '15%';
            ringIcon.style.maxWidth = '60px';
        }
    } else if (window.innerWidth <= 992 && window.innerWidth > 768) {
        // Tablet specific adjustments
        if (couple) {
            couple.style.width = '80%';
            couple.style.margin = '0 auto';
        }
        
        if (template1) {
            template1.style.top = '5%';
            template1.style.right = '-5%';
            template1.style.width = '350px';
            template1.style.maxWidth = '45%';
        }
        
        if (template2) {
            template2.style.bottom = '20%';
            template2.style.left = '-5%';
            template2.style.width = '350px';
            template2.style.maxWidth = '45%';
            template2.style.marginLeft = '0';
        }
        
        if (ringIcon) {
            ringIcon.style.top = '0%';
            ringIcon.style.left = '15%';
        }
    } else {
        // Desktop - reset to original styles
        if (couple) {
            couple.style.width = '';
            couple.style.margin = '';
        }
        
        if (template1) {
            template1.style.top = '';
            template1.style.right = '';
            template1.style.width = '';
            template1.style.maxWidth = '';
        }
        
        if (template2) {
            template2.style.bottom = '';
            template2.style.left = '';
            template2.style.width = '';
            template2.style.maxWidth = '';
            template2.style.marginLeft = '';
        }
        
        if (ringIcon) {
            ringIcon.style.top = '';
            ringIcon.style.left = '';
            ringIcon.style.transform = '';
        }
    }
}

// Run on window resize
window.addEventListener('resize', () => {
    checkWindowSize();
    
    // Ensure no horizontal scrollbar appears
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
});

// Handle orientation change specifically for mobile devices
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        checkWindowSize();
        adjustTemplatePositions();
    }, 100); // Small delay to ensure DOM has updated
});

// How It Works section animations
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Animate elements when they come into view
    function animateOnScroll() {
        const section = document.querySelector('.how-it-works-section');
        
        if (section && isInViewport(section)) {
            const title = document.querySelector('.section-title');
            const steps = document.querySelectorAll('.step-card');
            const arrows = document.querySelectorAll('.step-arrow');
            
            // Animate title
            if (title) {
                title.classList.add('animate');
            }
            
            // Animate steps with delay
            if (steps.length) {
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('animate');
                    }, 200 * index);
                });
            }
            
            // Animate arrows with delay
            if (arrows.length) {
                arrows.forEach((arrow, index) => {
                    setTimeout(() => {
                        arrow.classList.add('animate');
                    }, 600 + (200 * index));
                });
            }
        }
        
        // Also animate Wedding Journey section
        const journeySection = document.querySelector('.wedding-journey-section');
        if (journeySection && isInViewport(journeySection)) {
            journeySection.classList.add('animate');
        }
    }

    // Handle responsive layout for How It Works section
    function handleResponsiveLayout() {
        const windowWidth = window.innerWidth;
        const stepsContainer = document.querySelector('.steps-container');
        const stepCards = document.querySelectorAll('.step-card');
        const arrows = document.querySelectorAll('.step-arrow');
        
        if (!stepsContainer || !stepCards.length) return;
        
        if (windowWidth <= 576) {
            // Mobile: 1 card per row
            stepsContainer.style.flexDirection = 'column';
            stepsContainer.style.alignItems = 'center';
            
            stepCards.forEach(card => {
                card.style.width = '100%';
                card.style.maxWidth = '280px';
                card.style.marginBottom = '40px';
            });
            
            // Hide arrows on mobile
            arrows.forEach(arrow => {
                arrow.style.display = 'none';
            });
        } else if (windowWidth <= 992) {
            // Tablet: 2 cards per row
            stepsContainer.style.flexWrap = 'wrap';
            stepsContainer.style.justifyContent = 'center';
            stepsContainer.style.flexDirection = 'row';
            
            stepCards.forEach(card => {
                card.style.width = '45%';
                card.style.marginBottom = '30px';
            });
            
            // Hide arrows on tablet
            arrows.forEach(arrow => {
                arrow.style.display = 'none';
            });
        } else {
            // Desktop: 3 cards per row (default)
            stepsContainer.style.flexDirection = 'row';
            stepsContainer.style.flexWrap = 'nowrap';
            stepsContainer.style.justifyContent = 'center';
            
            stepCards.forEach(card => {
                card.style.width = '';
                card.style.maxWidth = '280px';
                card.style.marginBottom = '0';
            });
            
            // Show arrows on desktop
            arrows.forEach(arrow => {
                arrow.style.display = 'flex';
            });
        }
    }
    
    // Run animations on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Run responsive layout on load and resize
    handleResponsiveLayout();
    window.addEventListener('resize', handleResponsiveLayout);
});

// Multi-step form functionality
document.addEventListener('DOMContentLoaded', function() {
    // Store the photo upload section reference
    const photoSection = document.querySelector('.form-right');
    
    // Next button functionality
    const nextButtons = document.querySelectorAll('.next-button');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.closest('.form-step').getAttribute('data-step'));
            const nextStep = this.getAttribute('data-next');
            
            // Get current form step
            const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            
            // Get next form step
            const nextFormStep = document.querySelector(`.form-step[data-step="${nextStep}"]`);
            
            // Save the photo section
            if (photoSection) {
                const photoSectionClone = photoSection.cloneNode(true);
                
                // Hide current step
                currentFormStep.style.display = 'none';
                
                // Show next step
                nextFormStep.style.display = 'flex';
                
                // Replace the photo section in the next step with our saved one
                const nextStepPhotoSection = nextFormStep.querySelector('.form-right');
                if (nextStepPhotoSection) {
                    nextStepPhotoSection.parentNode.replaceChild(photoSectionClone, nextStepPhotoSection);
                }
            } else {
                // Fallback if photo section not found
                currentFormStep.style.display = 'none';
                nextFormStep.style.display = 'flex';
            }
            
            // Scroll to top of form
            document.querySelector('.biodata-form').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Back button functionality
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.closest('.form-step').getAttribute('data-step'));
            const prevStep = this.getAttribute('data-prev');
            
            // Get current form step
            const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            
            // Get previous form step
            const prevFormStep = document.querySelector(`.form-step[data-step="${prevStep}"]`);
            
            // Save the photo section
            if (photoSection) {
                const photoSectionClone = photoSection.cloneNode(true);
                
                // Hide current step
                currentFormStep.style.display = 'none';
                
                // Show previous step
                prevFormStep.style.display = 'flex';
                
                // Replace the photo section in the previous step with our saved one
                const prevStepPhotoSection = prevFormStep.querySelector('.form-right');
                if (prevStepPhotoSection) {
                    prevStepPhotoSection.parentNode.replaceChild(photoSectionClone, prevStepPhotoSection);
                }
            } else {
                // Fallback if photo section not found
                currentFormStep.style.display = 'none';
                prevFormStep.style.display = 'flex';
            }
            
            // Scroll to top of form
            document.querySelector('.biodata-form').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Marital status selection
    const maritalOptions = document.querySelectorAll('.marital-option');
    maritalOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            maritalOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Set the hidden input value
            const value = this.getAttribute('data-value');
            document.getElementById('maritalStatus').value = value;
        });
    });
    
    // Improved Add new field functionality with editable labels
    const addFieldButtons = document.querySelectorAll('.add-field-btn');
    let fieldCounter = 1;
    
    addFieldButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fieldType = this.getAttribute('data-field-type');
            const container = document.getElementById(`${fieldType}ExtraFields`);
            fieldCounter++;
            
            // Create new field based on field type with editable labels
            let newField = '';
            
            if (fieldType === 'education') {
                newField = `
                    <div class="extra-field">
                        <button class="remove-field-btn" title="Remove Field">
                            <i class="fas fa-times-circle"></i>
                        </button>
                        <div class="form-row">
                            <div class="form-group full-width">
                                <input type="text" class="editable-label" value="Additional Education" 
                                    onfocus="this.select()" placeholder="Enter Label">
                                <input type="text" placeholder="Enter Value">
                            </div>
                        </div>
                    </div>
                `;
            } else if (fieldType === 'family') {
                newField = `
                    <div class="extra-field">
                        <button class="remove-field-btn" title="Remove Field">
                            <i class="fas fa-times-circle"></i>
                        </button>
                        <div class="form-row">
                            <div class="form-group full-width">
                                <input type="text" class="editable-label" value="Family Member" 
                                    onfocus="this.select()" placeholder="Enter Label">
                                <input type="text" placeholder="Enter Value">
                            </div>
                        </div>
                    </div>
                `;
            } else if (fieldType === 'contact') {
                newField = `
                    <div class="extra-field">
                        <button class="remove-field-btn" title="Remove Field">
                            <i class="fas fa-times-circle"></i>
                        </button>
                        <div class="form-row">
                            <div class="form-group full-width">
                                <input type="text" class="editable-label" value="Contact Information" 
                                    onfocus="this.select()" placeholder="Enter Label">
                                <input type="text" placeholder="Enter Value">
                            </div>
                        </div>
                    </div>
                `;
            }
            
            
            // Add the new field with animation
            const fieldElement = document.createElement('div');
            fieldElement.innerHTML = newField;
            const newFieldElement = fieldElement.firstElementChild;
            newFieldElement.style.opacity = '0';
            container.appendChild(newFieldElement);
            
            // Add event listener to remove button
            const removeBtn = newFieldElement.querySelector('.remove-field-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                const fieldToRemove = this.closest('.extra-field');
                fieldToRemove.style.opacity = '0';
                fieldToRemove.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    fieldToRemove.remove();
                }, 300);
            });
        }
            
            // Animate the new field
            setTimeout(() => {
                newFieldElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                newFieldElement.style.opacity = '1';
                newFieldElement.style.transform = 'translateY(0)';
            }, 10);
        });
    });
    
    // Submit button functionality
    const submitButton = document.querySelector('.submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            alert('Form submitted successfully! Your biodata will be generated shortly.');
            // Here you would typically send the data to the server
        });
    }
});

// Add CSS for editable labels
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .extra-field {
            position: relative;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(10px);
        }
        
        .remove-field-btn {
            position: absolute;
            right: 10px;
            top: 10px;
            background: none;
            border: none;
            color: #FF5555;
            cursor: pointer;
            font-size: 18px;
            padding: 5px;
            transition: all 0.3s ease;
            z-index: 5;
        }
        
        .remove-field-btn:hover {
            color: #FF0000;
            transform: scale(1.2);
        }
        
        .editable-label {
            font-weight: 600;
            color: #333;
            background-color: rgba(255, 224, 180, 0.3);
            border: 1px dashed #ccc !important;
            margin-bottom: 5px;
            font-size: 14px !important;
        }
        
        .editable-label:focus {
            background-color: #fff;
            border: 1px solid #8B4513 !important;
        }
    `;
    document.head.appendChild(style);
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all template cards and the load more button
    const templateCards = document.querySelectorAll('.template-card');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    // Track which batch of templates we're showing
    let currentBatch = 1;
    const templatesPerBatch = 3;
    const totalBatches = Math.ceil(templateCards.length / templatesPerBatch);
    
    // Function to show a specific batch of templates
    function showTemplateBatch(batchNumber) {
        const startIndex = (batchNumber - 1) * templatesPerBatch;
        const endIndex = startIndex + templatesPerBatch;
        
        // Show templates for the current batch
        for (let i = startIndex; i < endIndex && i < templateCards.length; i++) {
            templateCards[i].classList.remove('hidden');
            
            // Add fade-in animation
            templateCards[i].style.opacity = '0';
            templateCards[i].style.transform = 'translateY(20px)';
            
            // Staggered animation
            setTimeout(() => {
                templateCards[i].style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                templateCards[i].style.opacity = '1';
                templateCards[i].style.transform = 'translateY(0)';
            }, (i - startIndex) * 150);
        }
        
        // Update button text or hide if we've shown all templates
        if (batchNumber >= totalBatches) {
            loadMoreBtn.textContent = 'All Templates Loaded';
            loadMoreBtn.disabled = true;
            loadMoreBtn.style.opacity = '0.7';
            loadMoreBtn.style.cursor = 'default';
        }
    }
    
    // Initialize - show first batch
    showTemplateBatch(1);
    
    // Load more button click handler
    loadMoreBtn.addEventListener('click', function() {
        if (currentBatch < totalBatches) {
            currentBatch++;
            showTemplateBatch(currentBatch);
        }
    });
    
    // Create placeholder images for templates
 
    
    // Call the function to create placeholder images
    createPlaceholderImages();
});


// Find the existing accordion functionality in your script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const icon = item.querySelector('.accordion-icon');
        
        header.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
              // Close all accordion items first
              accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
                const accIcon = accItem.querySelector('.accordion-icon');
                if (accIcon) {
                    accIcon.textContent = '+';
                    accItem.querySelector('.accordion-content').style.maxHeight = '0';
                }
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                if (icon) {
                    icon.textContent = '-';
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            }
        });
    });
    
    // ... existing code ...

// Add this to your DOMContentLoaded event listener
// document.addEventListener('DOMContentLoaded', function() {
//     // Accordion functionality
//     const accordionItems = document.querySelectorAll('.accordion-item');
    
//     accordionItems.forEach(item => {
//         const header = item.querySelector('.accordion-header');
//         const icon = item.querySelector('.accordion-icon');
        
//         header.addEventListener('click', () => {
//             const isActive = item.classList.contains('active');
            
//             // Close all accordion items first
//             accordionItems.forEach(accItem => {
//                 accItem.classList.remove('active');
//                 const accIcon = accItem.querySelector('.accordion-icon');
//                 if (accIcon) {
//                     accIcon.textContent = '+';
//                 }
//             });
            
//             // If the clicked item wasn't active, open it
//             if (!isActive) {
//                 item.classList.add('active');
//                 if (icon) {
//                     icon.textContent = '-';
//                 }
//             }
//         });
//     });
// });

// ... rest of your code ...
    document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all accordion items first
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
                accItem.querySelector('.accordion-content').style.maxHeight = null;
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});
    
    // Add animation to FAQ section when it comes into view
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    function animateOnScroll() {
        const faqSection = document.querySelector('.faq-section');
        const accordionItemsForAnimation = document.querySelectorAll('.accordion-item');
        
        if (faqSection && isInViewport(faqSection)) {
            // Add staggered animation to accordion items
            accordionItemsForAnimation.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100 * index);
            });
        }
    }
    
    // Set initial state for animations
    const accordionItemsForInitialState = document.querySelectorAll('.accordion-item');
    accordionItemsForInitialState.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animations on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});