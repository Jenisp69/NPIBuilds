function toggleWinnerPanel(cardElement) {
    cardElement.classList.toggle("active");
    const promptText = cardElement.querySelector(".click-prompt");
    
    if (cardElement.classList.contains("active")) {
        promptText.innerText = "CLICK TO CONCEAL DRAWERS";
    } else {
        promptText.innerText = "CLICK TO VIEW REVEAL PANEL";
    }
}

/**
 * NPIBuilds Modernist Bubble Engine v2.0
 * High-performance fluid multi-axis matrix drifting loops + Scroll vectors + DOM Modals
 */
document.addEventListener("DOMContentLoaded", () => {
    const bubbles = document.querySelectorAll('.bubble-floating');
    if (!bubbles.length) return;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let currentScrollY = window.scrollY;

    // Track cross-window normalized coordinate deviations
    document.addEventListener('mousemove', (event) => {
        targetMouseX = (event.clientX - window.innerWidth / 2) * 0.04;
        targetMouseY = (event.clientY - window.innerHeight / 2) * 0.04;
    });

    // Track scroll events to inject into the rendering matrix
    document.addEventListener('scroll', () => {
        currentScrollY = window.scrollY;
    }, { passive: true });

    const bubbleData = Array.from(bubbles).map((bubble, index) => {
        return {
            element: bubble,
            angleX: Math.random() * Math.PI * 2,
            angleY: Math.random() * Math.PI * 2,
            // Vary velocity variables per element node
            speedX: 0.004 + (index * 0.002),
            speedY: 0.003 + (index * 0.0015),
            rangeX: 25 + (index * 15),
            rangeY: 35 + (index * 10),
            // Unique offset weighting factor for counter-parallax depth
            parallaxFactor: index === 0 ? 1.2 : -0.8
        };
    });

    // Dynamic UI Injector for Glassy Modal
    function triggerGlassyPopup(imgSrc, descText) {
        // Purge existing modal layers to prevent DOM stacking
        const existingOverlay = document.getElementById('glassy-popup-overlay');
        if(existingOverlay) existingOverlay.remove();

        const overlay = document.createElement('div');
        overlay.id = 'glassy-popup-overlay';
        overlay.innerHTML = `
            <div class="glassy-popup-modal">
                <button class="glassy-close-btn">&times;</button>
                <img src="${imgSrc}" alt="Data Node Image" class="glassy-popup-img">
                <div class="glassy-popup-desc">${descText}</div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Bind termination handlers
        const closeBtn = overlay.querySelector('.glassy-close-btn');
        closeBtn.addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    }

    // Bind click events to individual nodes
    bubbles.forEach(bubble => {
        bubble.addEventListener('click', () => {
            // Extracts data from HTML attributes, falls back to placeholders if null
            const imageSource = bubble.getAttribute('data-img') || 'https://via.placeholder.com/400x300';
            const description = bubble.getAttribute('data-desc') || 'System status nominal. <br> Matrix parameters stable.';
            triggerGlassyPopup(imageSource, description);
        });
    });

    function renderEngineLoop() {
        // Linear interpolation to smooth mouse reactive displacement forces
        currentMouseX += (targetMouseX - currentMouseX) * 0.08;
        currentMouseY += (targetMouseY - currentMouseY) * 0.08;

        bubbleData.forEach((node) => {
            node.angleX += node.speedX;
            node.angleY += node.speedY;

            // Generate clean sinusoidal fluid drifting vectors
            const baseDriftX = Math.sin(node.angleX) * node.rangeX;
            const baseDriftY = Math.cos(node.angleY) * node.rangeY;

            // Synthesis core coordinates: wave equations + mouse vectors + scroll displacement
            const scrollDisplacementY = currentScrollY * 0.15 * node.parallaxFactor; 
            const computedTransformX = baseDriftX + (currentMouseX * node.parallaxFactor);
            const computedTransformY = baseDriftY + (currentMouseY * node.parallaxFactor) - scrollDisplacementY;

            node.element.style.transform = `translate3d(${computedTransformX.toFixed(2)}px, ${computedTransformY.toFixed(2)}px, 0)`;
        });

        requestAnimationFrame(renderEngineLoop);
    }

    // Initialize rendering tracking axis
    requestAnimationFrame(renderEngineLoop);
});

// High performance scroll intersection mapping engine
document.addEventListener("DOMContentLoaded", () => {
    const scrollElements = document.querySelectorAll(".reveal-on-scroll");

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Flash visible state to hardware layers
                entry.target.classList.add("is-visible");
                // Free up processing loop cycles by unobserving animated items
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.20,        // Activates when 20% of element touches frame
        rootMargin: "0px 0px -40px 0px" // Offset to avoid awkward snapping borders
    });

    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });
});