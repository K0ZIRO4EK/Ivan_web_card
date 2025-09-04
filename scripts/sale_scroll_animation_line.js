let ticking = false;
let resizeTicking = false;

// Function to calculate and update progress
function updateProgress() {
    const progressLine = document.querySelector('.line');
    const steps = document.querySelectorAll('.step-number');
    const section = document.querySelector('.sale');
    
    // Exit if required elements don't exist
    if (!progressLine || !steps.length || !section) return;
    
    const firstStep = steps[0];
    const lastStep = steps[steps.length - 1];
    
    // Get element positions relative to viewport
    const sectionRect = section.getBoundingClientRect();
    const firstStepRect = firstStep.getBoundingClientRect();
    const lastStepRect = lastStep.getBoundingClientRect();
    
    // Calculate positions
    const windowHeight = window.innerHeight;
    const scrollPosition = window.pageYOffset + windowHeight / 2; // Middle of viewport
    const firstStepPosition = firstStepRect.top + window.pageYOffset;
    const lastStepPosition = lastStepRect.bottom + window.pageYOffset;

    // Before first step - reset progress
    if (scrollPosition < firstStepPosition) {
        progressLine.style.height = '0px';
        steps.forEach(step => step.classList.remove('active'));
        return;
    }

    // After last step - complete progress
    if (scrollPosition > lastStepPosition) {
        const maxHeight = lastStepPosition - firstStepPosition;
        progressLine.style.height = maxHeight + 'px';
        steps.forEach(step => step.classList.add('active'));
        return;
    }

    // Between steps - update progress dynamically
    const newHeight = scrollPosition - firstStepPosition;
    progressLine.style.height = newHeight + 'px';

    // Toggle active class based on scroll position
    steps.forEach(step => {
        const stepPosition = step.getBoundingClientRect().top + window.pageYOffset;
        step.classList.toggle('active', scrollPosition > stepPosition);
    });
}

// Scroll event handler with requestAnimationFrame optimization
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            updateProgress();
            ticking = false;
        });
        ticking = true;
    }
});

// Resize event handler for recalculating positions
window.addEventListener('resize', function() {
    if (!resizeTicking) {
        requestAnimationFrame(function() {
            updateProgress();
            resizeTicking = false;
        });
        resizeTicking = true;
    }
});

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay for complete DOM loading
    setTimeout(updateProgress, 100);
});

// Additional initialization on full page load
window.addEventListener('load', updateProgress);