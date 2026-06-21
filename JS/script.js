

function toggleWinnerPanel(cardElement) {
    cardElement.classList.toggle("active");
    const promptText = cardElement.querySelector(".click-prompt");
    
    if (cardElement.classList.contains("active")) {
        promptText.innerText = "CLICK TO CONCEAL DRAWERS";
    } else {
        promptText.innerText = "CLICK TO VIEW REVEAL PANEL";
    }
}

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