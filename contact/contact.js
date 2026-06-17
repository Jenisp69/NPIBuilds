document.addEventListener("DOMContentLoaded", () => {
    const anonToggle = document.getElementById("anonymousToggle");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const purposeSelect = document.getElementById("purpose");
    
    // Grab both options we want to lock out
    const optReg = document.getElementById("optReg");
    const optAdvisor = document.getElementById("optAdvisor");

    anonToggle.addEventListener("change", () => {
        if (anonToggle.checked) {
            // Lock out name and email fields
            nameInput.value = "ANONYMOUS";
            emailInput.value = "anonymous@gmail.com";
            
            nameInput.readOnly = true;
            emailInput.readOnly = true;
            
            nameInput.classList.add("anon-active");
            emailInput.classList.add("anon-active");
            
            // DISABLE both options so they can't be selected
            optReg.disabled = true;
            optAdvisor.disabled = true;
            
            // Force the dropdown to select the report option
            purposeSelect.value = "General Inquiry/Report";
        } else {
            // Reset fields to defaults
            nameInput.value = "";
            emailInput.value = "";
            
            nameInput.readOnly = false;
            emailInput.readOnly = false;
            
            nameInput.classList.remove("anon-active");
            emailInput.classList.remove("anon-active");
            
            // RE-ENABLE both options when toggled off
            optReg.disabled = false;
            optAdvisor.disabled = false;
            
            purposeSelect.value = "Competition Registration";
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const anonToggle = document.getElementById("anonymousToggle");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const purposeSelect = document.getElementById("purpose");
    const contactReminder = document.getElementById("contactReminder");
    
    const optReg = document.getElementById("optReg");
    const optAdvisor = document.getElementById("optAdvisor");

    anonToggle.addEventListener("change", () => {
        if (anonToggle.checked) {
            nameInput.value = "ANONYMOUS";
            emailInput.value = "anonymous@gmail.com";
            
            nameInput.readOnly = true;
            emailInput.readOnly = true;
            
            nameInput.classList.add("anon-active");
            emailInput.classList.add("anon-active");
            
            // LIGHT UP the second sentence in green
            contactReminder.classList.add("reminder-highlight");
            
            optReg.disabled = true;
            optAdvisor.disabled = true;
            purposeSelect.value = "General Inquiry/Report";
        } else {
            nameInput.value = "";
            emailInput.value = "";
            
            nameInput.readOnly = false;
            nameInput.readOnly = false;
            
            nameInput.classList.remove("anon-active");
            nameInput.classList.remove("anon-active");
            
            // Turn the text back to standard muted color
            contactReminder.classList.remove("reminder-highlight");
            
            optReg.disabled = false;
            optAdvisor.disabled = false;
            purposeSelect.value = "Competition Registration";
        }
    });
});