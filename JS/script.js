// ============================================================================
// INDEPENDENT CLOUD INFRASTRUCTURE VECTOR
// ============================================================================
const SUPABASE_URL = "https://ncxnszpybvzxidxiakrg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_aD_OIx_4gmkMWicC2QcH8w_A0Tm1DYU";

// Run asynchronous sync in an isolated pipeline to guarantee zero animation interference
(async function initializeDataPipeline() {
    try {
        if (SUPABASE_URL === "YOUR_SUPABASE_URL") return;

        const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        const { data, error } = await supabaseClient
            .from('landing_page_data')
            .select('*')
            .single();

        if (error) throw error;
        if (!data) return;

        // 1. Live Vector Injection: Countdown Clock Target Date
        if (data.countdown_target) {
            const clockContainer = document.querySelector('.matrix-countdown');
            if (clockContainer) {
                clockContainer.setAttribute('data-target', data.countdown_target);
                // Dynamically re-trigger clock parsing if active
                if (typeof initializeMatrixCountdowns === 'function') {
                    initializeMatrixCountdowns();
                }
            }
        }

        // 2. Live Vector Injection: Club Feed Item 1
        const feedItems = document.querySelectorAll('.feed-container .feed-item');
        if (feedItems.length >= 1) {
            const date1 = feedItems[0].querySelector('.feed-date');
            const title1 = feedItems[0].querySelector('h4');
            const body1 = feedItems[0].querySelector('p');
            
            if (date1 && data.insight_1_date) date1.textContent = data.insight_1_date;
            if (title1 && data.insight_1_title) title1.textContent = data.insight_1_title;
            if (body1 && data.insight_1_body) body1.textContent = data.insight_1_body;
        }

        // 3. Live Vector Injection: Club Feed Item 2
        if (feedItems.length >= 2) {
            const title2 = feedItems[1].querySelector('h4');
            const prize2 = feedItems[1].querySelector('.feed-date');
            const body2 = feedItems[1].querySelector('p');

            if (title2 && data.insight_2_title) title2.textContent = data.insight_2_title;
            if (prize2 && data.insight_2_prize) {
                prize2.innerHTML = `COMING SOON // PRIZE: <span class="neongreen-text">${data.insight_2_prize}</span>`;
            }
            if (body2 && data.insight_2_body) body2.textContent = data.insight_2_body;
        }

        // 4. Live Vector Injection: Competitions Hub Card
        const upcomingCard = document.querySelector('.comp-card.upcoming');
        if (upcomingCard) {
            const statusNode = upcomingCard.querySelector('.card-status');
            const titleNode = upcomingCard.querySelector('h3');
            const descNode = upcomingCard.querySelector('.comp-details');
            const prizeNode = upcomingCard.querySelector('.prize-tag');

            if (statusNode && data.comp_card_status) statusNode.textContent = data.comp_card_status;
            if (titleNode && data.comp_card_title) titleNode.textContent = data.comp_card_title;
            if (descNode && data.comp_card_desc) descNode.textContent = data.comp_card_desc;
            if (prizeNode && data.comp_card_prize) prizeNode.textContent = data.comp_card_prize;
        }

        // 5. Live Vector Injection: Visual Matrix Archive Images
        const matrixImages = document.querySelectorAll('.matrix-grid .matrix-item img');
        if (matrixImages.length >= 2) {
            if (data.archive_img_1) matrixImages[0].src = data.archive_img_1;
            if (data.archive_img_2) matrixImages[1].src = data.archive_img_2;
        }

        // =========================================================================
        // 6. Live Vector Injection: Floating Modernist Bubble Content Elements (FIXED STRUCT)
        // =========================================================================
        const bubbleNodes = document.querySelectorAll('.floating-bubbles-container .bubble-floating');
        if (bubbleNodes.length >= 2) {
            // Only overwrite if the database field exists and isn't a blank placeholder string
            if (data.bubble_img_1 && data.bubble_img_1.trim() !== "" && data.bubble_img_1 !== "PLACEHOLDER") {
                bubbleNodes[0].setAttribute('data-img', data.bubble_img_1);
                // Apply directly as a background style to preserve modernist bubble geometry
                bubbleNodes[0].style.backgroundImage = `url('${data.bubble_img_1}')`;
                bubbleNodes[0].style.backgroundSize = 'cover';
                bubbleNodes[0].style.backgroundPosition = 'center';
            }
            if (data.bubble_desc_1) bubbleNodes[0].setAttribute('data-desc', data.bubble_desc_1);
            
            if (data.bubble_img_2 && data.bubble_img_2.trim() !== "" && data.bubble_img_2 !== "PLACEHOLDER") {
                bubbleNodes[1].setAttribute('data-img', data.bubble_img_2);
                // Apply directly as a background style to preserve modernist bubble geometry
                bubbleNodes[1].style.backgroundImage = `url('${data.bubble_img_2}')`;
                bubbleNodes[1].style.backgroundSize = 'cover';
                bubbleNodes[1].style.backgroundPosition = 'center';
            }
            if (data.bubble_desc_2) bubbleNodes[1].setAttribute('data-desc', data.bubble_desc_2);
        }

    } catch (pipelineFault) {
        console.warn("Isolated Data Sync Paused safely: Check row fields or RLS policies.", pipelineFault.message);
    }
})(); // <--- THIS WAS PREVIOUSLY ACCIDENTALLY REMOVED OR CLOSED WRONG

// ============================================================================
// CORE USER INTERFACE CONTROL LOOPS (ORIGINAL REVERTED FUNCTIONS)
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

// countdown 
function initializeMatrixCountdowns() {
    // =================================================================
    // CONFIGURATION AREA: SET TARGET DATE STRING
    // =================================================================
    const CONFIG = {
        targetDate: "2026-06-26T07:00:00+05:45"
    };
    // =================================================================

    const countdownElements = document.querySelectorAll('.matrix-countdown');
    
    // Check if dynamic data attribute overriding exists from database
    const dynamicTarget = countdownElements[0]?.getAttribute('data-target');
    const finalTargetString = dynamicTarget || CONFIG.targetDate;
    const targetTime = new Date(finalTargetString).getTime();

    if (isNaN(targetTime)) {
        return;
    }

    countdownElements.forEach(container => {
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
            // Clears prior intervals to prevent speed multiplication loops
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