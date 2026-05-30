const timestampField = document.querySelector("#timestamp");

timestampField.value = new Date().toISOString();

const links = document.querySelectorAll(".membership-card a");

links.forEach(link => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const modalId =
            link.getAttribute("href").replace("#", "");

        document
            .getElementById(modalId)
            .showModal();
    });
});