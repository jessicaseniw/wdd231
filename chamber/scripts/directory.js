const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

const dataURL = "data/members.json";

/* ================= Fetch Members ================= */
async function getMembers() {
    try {
        const response = await fetch(dataURL);
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

/* ================= Display Members ================= */
function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        `;

        membersContainer.appendChild(card);
    });
}

/* ================= View Toggle ================= */
gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

/* ================= Init ================= */
getMembers();