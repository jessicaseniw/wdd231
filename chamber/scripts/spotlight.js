/* ==== SPOTLIGHT JS ==== */

const spotlightContainer = document.querySelector("#spotlights");

async function getSpotlights() {

    try {

        const response = await fetch("data/members.json");

        const data = await response.json();

        const filteredMembers = data.members.filter(member =>
            member.membership === 2 ||
            member.membership === 3
        );

        const shuffled = filteredMembers.sort(() => 0.5 - Math.random());

        const selected = shuffled.slice(0, 3);

        displaySpotlights(selected);

    } catch (error) {

        console.error("Spotlight error:", error);
    }
}

function displaySpotlights(members) {

    spotlightContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("div");

        card.classList.add("business");

        const membershipLevel =
            member.membership === 3
                ? "Gold Member"
                : "Silver Member";

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo">

            <div>
                <h3>${member.name}</h3>

                <p>${member.phone}</p>

                <p>${member.address}</p>

                <p>
                    <a href="${member.website}" target="_blank">
                        Visit Website
                    </a>
                </p>

                <p>${membershipLevel}</p>
            </div>
        `;

        spotlightContainer.appendChild(card);
    });
}

getSpotlights();