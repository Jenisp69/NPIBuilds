function toggleWinnerPanel(cardElement) {
    // Toggles the active structural class to expand the drawer smoothly
    cardElement.classList.toggle("active");
    
    const promptText = cardElement.querySelector(".click-prompt");
    
    // Updates internal visual text state dynamically
    if (cardElement.classList.contains("active")) {
        promptText.innerText = "CLICK TO CONCEAL DRAWERS";
    } else {
        promptText.innerText = "CLICK TO VIEW REVEAL PANEL";
    }
}