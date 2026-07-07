// ============================================================================
// CORE USER INTERFACE CONTROL LOOPS
// ============================================================================
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
            speedX: 0.004 + (index * 0.002),
            speedY: 0.003 + (index * 0.0015),
            rangeX: 25 + (index * 15),
            rangeY: 35 + (index * 10),
            parallaxFactor: index === 0 ? 1.2 : -0.8
        };
    });

    // Dynamic UI Injector for Glassy Modal
    function triggerGlassyPopup(imgSrc, descText) {
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

        const closeBtn = overlay.querySelector('.glassy-close-btn');
        closeBtn.addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    }

    // Bind click events to individual nodes
    bubbles.forEach(bubble => {
        bubble.addEventListener('click', () => {
            const imageSource = bubble.getAttribute('data-img') || './images-resources/NPIindustriallooking.jpg';
            const description = bubble.getAttribute('data-desc') || 'System status nominal. <br> Matrix parameters stable.';
            triggerGlassyPopup(imageSource, description);
        });
    });

    function renderEngineLoop() {
        currentMouseX += (targetMouseX - currentMouseX) * 0.08;
        currentMouseY += (targetMouseY - currentMouseY) * 0.08;

        bubbleData.forEach((node) => {
            node.angleX += node.speedX;
            node.angleY += node.speedY;

            const baseDriftX = Math.sin(node.angleX) * node.rangeX;
            const baseDriftY = Math.cos(node.angleY) * node.rangeY;

            const scrollDisplacementY = currentScrollY * 0.15 * node.parallaxFactor; 
            const computedTransformX = baseDriftX + (currentMouseX * node.parallaxFactor);
            const computedTransformY = baseDriftY + (currentMouseY * node.parallaxFactor) - scrollDisplacementY;

            node.element.style.transform = `translate3d(${computedTransformX.toFixed(2)}px, ${computedTransformY.toFixed(2)}px, 0)`;
        });

        requestAnimationFrame(renderEngineLoop);
    }

    requestAnimationFrame(renderEngineLoop);
});

// Countdown Processing Engine
function initializeMatrixCountdowns() {
    // =================================================================
    // CONFIGURATION AREA: SET DEFAULT TARGET DATE STRING
    // =================================================================
    const CONFIG = {
        targetDate: "2026-07-10T07:00:00+05:45"
    };
    // =================================================================

    const countdownElements = document.querySelectorAll('.matrix-countdown');
    
    countdownElements.forEach(container => {
        // Fall back cleanly to CONFIG.targetDate if the specific HTML container element doesn't have a data-target attribute
        const dynamicTarget = container.getAttribute('data-target');
        const finalTargetString = dynamicTarget || CONFIG.targetDate;
        
        const targetTime = new Date(finalTargetString).getTime();
        if (isNaN(targetTime)) return;

        const daysElement = container.querySelector('.days');
        const hoursElement = container.querySelector('.hours');
        const minutesElement = container.querySelector('.minutes');
        const secondsElement = container.querySelector('.seconds');
        
        let intervalId;

        function updateClock() {
            const now = Date.now();
            const difference = targetTime - now;
            
            if (difference <= 0) {
                container.innerHTML = `<span style="font-size:0.85rem; font-weight:700; color:var(--accent-amber); letter-spacing:0.5px;">EXECUTION FRAME OPEN // IN PROGRESS</span>`;
                if (intervalId) clearInterval(intervalId);
                return true; 
            }
            
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
            if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
            if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
            if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');
            return false;
        }
        
        const isExpired = updateClock(); 
        
        if (!isExpired) {
            if (container.dataset.intervalId) clearInterval(parseInt(container.dataset.intervalId));
            intervalId = setInterval(updateClock, 1000);
            container.dataset.intervalId = intervalId;
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeMatrixCountdowns);

// High performance scroll intersection mapping engine
document.addEventListener("DOMContentLoaded", () => {
    const scrollElements = document.querySelectorAll(".reveal-on-scroll");

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.20,
        rootMargin: "0px 0px -40px 0px"
    });

    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });
});