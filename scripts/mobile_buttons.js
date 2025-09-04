// Minimal touch screen implementation for visual feedback
document.addEventListener('DOMContentLoaded', function() {
    // Event delegation on body for better performance
    document.body.addEventListener('touchstart', function(e) {
        const btn = e.target.closest('.btn');
        if (btn) btn.classList.add('touch-active');
    }, { passive: true });

    // Remove active state when touch ends
    document.body.addEventListener('touchend', function(e) {
        const activeBtn = document.querySelector('.btn.touch-active');
        if (activeBtn) activeBtn.classList.remove('touch-active');
    }, { passive: true });

    // Handle touch cancellation (interrupted gesture)
    document.body.addEventListener('touchcancel', function(e) {
        const activeBtn = document.querySelector('.btn.touch-active');
        if (activeBtn) activeBtn.classList.remove('touch-active');
    }, { passive: true });
});