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
            // Lock State
            nameInput.value = "ANONYMOUS";
            emailInput.value = "anonymous@gmail.com";
            
            nameInput.readOnly = true;
            emailInput.readOnly = true;
            
            nameInput.classList.add("anon-active");
            emailInput.classList.add("anon-active");
            
            contactReminder.classList.add("reminder-highlight");
            
            optReg.disabled = true;
            optAdvisor.disabled = true;
            purposeSelect.value = "General Inquiry/Report";
        } else {
            // Release State
            nameInput.value = "";
            emailInput.value = "";
            
            nameInput.readOnly = false;
            emailInput.readOnly = false;
            
            nameInput.classList.remove("anon-active");
            emailInput.classList.remove("anon-active");
            
            contactReminder.classList.remove("reminder-highlight");
            
            optReg.disabled = false;
            optAdvisor.disabled = false;
            purposeSelect.value = "Competition Registration";
        }
    });
});