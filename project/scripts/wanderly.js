/* ======================================================
   KEYS
====================================================== */
const ORIGIN_KEY = 'selectedOrigin';
const DESTINATION_KEY = 'selectedDestination';
const CURRENCY_KEY = 'selectedCurrency';
const CHECKIN_KEY = 'checkInDate';
const CHECKOUT_KEY = 'checkOutDate';
const LANGUAGE_KEY = 'selectedLanguage';

const ACCOMMODATION_KEY = 'selectedAccommodation';
const ACCOMMODATION_PRICE_KEY = 'selectedAccommodationPrice';

/* ======================================================
   DATA (from data.js)
====================================================== */
// brazilOrigins, destinations, accommodations are global

/* ======================================================
   TRANSLATIONS
====================================================== */
const translations = {
    en: {
        destinations: "Available Destinations",
        national: "National Destinations",
        international: "International Destinations",
        select: "Select",
        selected: "Selected",
        from: "From",
        changeDestination: "Change Destination",
        nights: "nights",
        noAccommodations: "No accommodations available for this destination.",
        selectOrigin: "Select origin"
    }
};

/* ======================================================
   HELPERS
====================================================== */
const getLanguage = () =>
    localStorage.getItem(LANGUAGE_KEY) || 'en';

/* ======================================================
   TRANSLATION UI
====================================================== */
function applyTranslations() {
    const lang = getLanguage();
    const t = translations[lang];

    if (!t) return;

    /* DESTINATIONS TITLE (mais seguro) */
    const title = document.getElementById('destinations-title');
    if (title) {
        title.textContent = t.destinations;
    }

    const national = document.querySelector('.national-grid')
        ?.previousElementSibling;

    const international = document.querySelector('.international-grid')
        ?.previousElementSibling;

    if (national && national.tagName === 'H3') {
        national.textContent = t.national;
    }

    if (international && international.tagName === 'H3') {
        international.textContent = t.international;
    }

    document.querySelectorAll('.select-destination').forEach(btn => {
        if (btn.textContent.includes('Select') || btn.textContent.includes('Selecionar')) {
            btn.textContent = t.select;
        }

        if (btn.textContent.includes('Selected')) {
            btn.textContent = t.selected;
        }
    });
}

/* ======================================================
   ORIGINS
====================================================== */
function populateOrigins() {
    const el = document.getElementById('origin');
    if (!el) return;

    const saved = localStorage.getItem(ORIGIN_KEY);

    el.innerHTML = '';

    const placeholder = document.createElement('option');
    placeholder.textContent = translations[getLanguage()].selectOrigin;
    placeholder.value = '';
    placeholder.disabled = true;
    placeholder.selected = !saved;
    el.appendChild(placeholder);

    brazilOrigins.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        opt.textContent = city;
        if (city === saved) opt.selected = true;
        el.appendChild(opt);
    });

    el.addEventListener('change', () => {
        localStorage.setItem(ORIGIN_KEY, el.value);
        renderCards();
        displayRoute();
    });
}

/* ======================================================
   FLIGHT PRICE
====================================================== */
function getFlightPrice(origin, destination) {
    const nat = destinations.national.map(d => d.name);
    const intl = destinations.international.map(d => d.name);

    let base = nat.includes(destination) ? 120 :
               intl.includes(destination) ? 750 : null;

    if (!base) return null;

    const variation =
        Math.abs(origin.length * 7 - destination.length * 5) % 200;

    return base + variation;
}

/* ======================================================
   CURRENCY
====================================================== */
const exchangeRates = { USD: 1, BRL: 5, EUR: 0.9 };

function formatPrice(valueUSD) {
    const currency = localStorage.getItem(CURRENCY_KEY) || 'USD';

    return new Intl.NumberFormat(
        {
            USD: 'en-US',
            BRL: 'pt-BR',
            EUR: 'de-DE'
        }[currency],
        {
            style: 'currency',
            currency
        }
    ).format(valueUSD * exchangeRates[currency]);
}

/* ======================================================
   DESTINATIONS RENDER
====================================================== */
function renderCards() {

    const natGrid = document.querySelector('.national-grid');
    const intlGrid = document.querySelector('.international-grid');

    if (!natGrid || !intlGrid) return;

    const origin = localStorage.getItem(ORIGIN_KEY);
    const selected = localStorage.getItem(DESTINATION_KEY);

    const createCard = d => {

        const price = origin ? getFlightPrice(origin, d.name) : null;

        return `
        <div class="card ${selected === d.name ? 'selected' : ''}">
            <img src="${d.image}" alt="${d.name}">
            <h3>${d.name}</h3>
            ${price ? `<p>${formatPrice(price)}</p>` : ''}
            <button class="select-destination">
                ${selected === d.name ? 'Selected' : 'Select'}
            </button>
        </div>
        `;
    };

    natGrid.innerHTML = destinations.national.map(createCard).join('');
    intlGrid.innerHTML = destinations.international.map(createCard).join('');

    setupDestinationButtons();
}

/* ======================================================
   DESTINATION SELECT
====================================================== */
function setupDestinationButtons() {

    document.querySelectorAll('.select-destination').forEach(btn => {

        btn.addEventListener('click', e => {

            const card = e.target.closest('.card');
            const name = card.querySelector('h3').textContent;

            localStorage.setItem(DESTINATION_KEY, name);

            window.location.href = 'accommodations.html';
        });
    });
}

/* ======================================================
   DISPLAY DESTINATION (ACCOMMODATION PAGE)
====================================================== */
function displayCurrentDestination() {

    const el = document.getElementById('current-destination');
    if (!el) return;

    el.textContent =
        localStorage.getItem(DESTINATION_KEY) || '-';
}

/* ======================================================
   ACCOMMODATIONS
====================================================== */
function renderAccommodations() {

    const grid = document.querySelector('.national-grid');
    if (!grid) return;

    const dest = localStorage.getItem(DESTINATION_KEY);

    if (!dest) {
        grid.innerHTML =
            translations[getLanguage()].noAccommodations;
        return;
    }

    const list = [
        ...accommodations.national,
        ...accommodations.international
    ].filter(a => a.destination === dest);

    grid.innerHTML = list.map(a => `
        <div class="card">
            <img src="${a.image}" alt="${a.name}">
            <h3>${a.name}</h3>
            <p>${formatPrice(a.pricePerNight)}</p>
            <button class="choose-accommodation">
                Select
            </button>
        </div>
    `).join('');

    setupAccommodationButtons();
}

/* ======================================================
   ACCOMMODATION SELECT
====================================================== */
function setupAccommodationButtons() {

    document.querySelectorAll('.choose-accommodation').forEach(btn => {

        btn.addEventListener('click', e => {

            const card = e.target.closest('.card');
            const name = card.querySelector('h3').textContent;

            const dest = localStorage.getItem(DESTINATION_KEY);

            const acc = [
                ...accommodations.national,
                ...accommodations.international
            ].find(a =>
                a.name === name &&
                a.destination === dest
            );

            if (!acc) return;

            localStorage.setItem(ACCOMMODATION_KEY, acc.name);
            localStorage.setItem(ACCOMMODATION_PRICE_KEY, acc.pricePerNight);

            window.location.href = 'trips.html';
        });
    });
}

/* ======================================================
   ROUTE DISPLAY
====================================================== */
function displayRoute() {

    const el = document.querySelector('#selected-route');
    if (!el) return;

    const o = localStorage.getItem(ORIGIN_KEY);
    const d = localStorage.getItem(DESTINATION_KEY);

    el.textContent = o ? `${o} → ${d || '...'}` : '...';
}

/* ======================================================
   STAY CALC
====================================================== */
function displayStay() {

    const el = document.getElementById('stay-period');
    if (!el) return;

    const inD = localStorage.getItem(CHECKIN_KEY);
    const outD = localStorage.getItem(CHECKOUT_KEY);

    if (!inD || !outD) {
        el.textContent = '';
        return;
    }

    const nights =
        (new Date(outD) - new Date(inD)) / 86400000;

    el.textContent =
        `${nights} ${translations[getLanguage()].nights}`;
}

/* ======================================================
   CHANGE FLOW
====================================================== */
function changeDestination() {

    localStorage.removeItem(DESTINATION_KEY);
    localStorage.removeItem(ACCOMMODATION_KEY);
    localStorage.removeItem(ACCOMMODATION_PRICE_KEY);

    window.location.href = 'wanderly.html';
}

/* ======================================================
   BOOKING BUTTON
====================================================== */
function setupBookingButton() {

    const btn = document.getElementById('confirm-booking');
    const msg = document.getElementById('booking-message');

    if (!btn || !msg) return;

    btn.addEventListener('click', () => {
        msg.textContent = 'Booking confirmed successfully!';
    });
}

/* ======================================================
   TRIP SUMMARY
====================================================== */
function renderTripSummary() {

    const info = document.getElementById('trip-info');
    const values = document.getElementById('trip-values');

    if (!info || !values) return;

    const origin = localStorage.getItem(ORIGIN_KEY);
    const destination = localStorage.getItem(DESTINATION_KEY);
    const accommodation = localStorage.getItem(ACCOMMODATION_KEY);
    const price = Number(localStorage.getItem(ACCOMMODATION_PRICE_KEY));

    const checkin = localStorage.getItem(CHECKIN_KEY);
    const checkout = localStorage.getItem(CHECKOUT_KEY);

    const nights =
        checkin && checkout
            ? (new Date(checkout) - new Date(checkin)) / 86400000
            : 0;

    info.innerHTML = `
        <h3>Trip Details</h3>
        <p><strong>Origin:</strong> ${origin}</p>
        <p><strong>Destination:</strong> ${destination}</p>
        <p><strong>Accommodation:</strong> ${accommodation}</p>
        <p><strong>Check-in:</strong> ${checkin}</p>
        <p><strong>Check-out:</strong> ${checkout}</p>
    `;

    values.innerHTML = `
        <h3>Price Summary</h3>
        <p>${nights} nights</p>
        <p>${formatPrice(price)} / night</p>
        <p><strong>Total: ${formatPrice(price * nights)}</strong></p>
    `;
}

/* ======================================================
   INIT
====================================================== */
document.addEventListener('DOMContentLoaded', () => {

    applyTranslations();
    populateOrigins();
    displayRoute();
    displayStay();
    displayCurrentDestination();

    const isAcc = document.getElementById('accommodations');
    const isTrips = document.getElementById('trip-summary');

    if (isAcc) renderAccommodations();
    else if (!isTrips) renderCards();

    if (isTrips) {
        renderTripSummary();
        setupBookingButton();
    }

    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');

    if (checkin) {
        checkin.value = localStorage.getItem(CHECKIN_KEY) || '';
        checkin.addEventListener('change', () =>
            localStorage.setItem(CHECKIN_KEY, checkin.value)
        );
    }

    if (checkout) {
        checkout.value = localStorage.getItem(CHECKOUT_KEY) || '';
        checkout.addEventListener('change', () =>
            localStorage.setItem(CHECKOUT_KEY, checkout.value)
        );
    }
});