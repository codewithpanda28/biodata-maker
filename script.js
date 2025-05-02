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

// Photo upload functionality
if (photoUpload && photoInput) {
    photoUpload.addEventListener('click', () => {
        photoInput.click();
    });
    
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
                
                // Clear placeholder and add image
                const placeholder = photoUpload.querySelector('.upload-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
                
                // Remove any previous image
                const oldImg = photoUpload.querySelector('img');
                if (oldImg) {
                    oldImg.remove();
                }
                
                photoUpload.appendChild(img);
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });
}

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

    // Handle responsive layout for arrows
    function handleResponsiveLayout() {
        const windowWidth = window.innerWidth;
        const arrows = document.querySelectorAll('.step-arrow');
        
        if (windowWidth <= 576) {
            // For very small screens, hide arrows
            arrows.forEach(arrow => {
                arrow.style.display = 'none';
            });
        } else {
            // Show arrows on larger screens
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