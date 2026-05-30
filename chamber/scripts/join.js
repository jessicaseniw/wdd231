const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}

const modalButtons = document.querySelectorAll("[data-modal]");

modalButtons.forEach(button => {

    button.addEventListener("click", () => {

        const modalId = button.dataset.modal;
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
        }
    });

});