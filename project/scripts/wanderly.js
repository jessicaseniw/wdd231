/* ======================================================
   wanderly.js
====================================================== */

/* ======================================================
   KEYS
====================================================== */
const ORIGIN_KEY = 'selectedOrigin';
const DESTINATION_KEY = 'selectedDestination';
const CURRENCY_KEY = 'selectedCurrency';
const CHECKIN_KEY = 'checkInDate';
const CHECKOUT_KEY = 'checkOutDate';
const LANGUAGE_KEY = 'selectedLanguage';
const PASSENGERS_KEY = 'selectedPassengers';
const CABIN_KEY = 'selectedCabin';

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
        destinations: "Available flights and destinations",
        national: "National Destinations",
        international: "International Destinations",
        select: "Select",
        selected: "Selected",
        from: "From",
        changeDestination: "Change Destination",
        nights: "nights",
        noAccommodations: "No accommodations available for this destination.",
        selectOrigin: "Select origin",
        chooseFlight: "Choose flight",
        chooseHotel: "Choose hotel",
        domesticPackage: "Domestic package",
        internationalPackage: "International package",
        directOrStop: "Direct or 1 stop",
        oneTwoStops: "1-2 stops",
        carryOn: "Carry-on included",
        checkedBag: "Checked bag available",
        perPassenger: "per passenger",
        estimatedAirfare: "estimated airfare",
        chooseOrigin: "Choose your origin to compare airfare.",
        selectDeparture: "Select your departure city before choosing a flight.",
        guestRating: "guest rating",
        breakfastWifi: "Breakfast | Wi-Fi | Free cancellation",
        poolTransfer: "Pool | Airport transfer | Flexible rate",
        perNight: "per night",
        forStay: "for",
        night: "night",
        selectedStay: "selected",
        bookingConfirmed: "Booking confirmed successfully!",
        tripDetails: "Trip details",
        route: "Route",
        passengers: "Passengers",
        hotel: "Hotel",
        dates: "Dates",
        stay: "Stay",
        to: "to",
        priceSummary: "Price summary",
        airfare: "Round-trip airfare",
        hotelStay: "Hotel stay",
        taxes: "Estimated taxes and fees",
        totalDue: "Total due today"
    },
    pt: {
        destinations: "Voos e destinos disponíveis",
        national: "Destinos nacionais",
        international: "Destinos internacionais",
        select: "Selecionar",
        selected: "Selecionado",
        from: "De",
        changeDestination: "Alterar destino",
        nights: "noites",
        noAccommodations: "Nenhuma acomodação disponível para este destino.",
        selectOrigin: "Selecione a origem",
        chooseFlight: "Escolher voo",
        chooseHotel: "Escolher hotel",
        domesticPackage: "Pacote nacional",
        internationalPackage: "Pacote internacional",
        directOrStop: "Direto ou 1 escala",
        oneTwoStops: "1-2 escalas",
        carryOn: "Bagagem de mão incluída",
        checkedBag: "Bagagem despachada disponível",
        perPassenger: "por passageiro",
        estimatedAirfare: "passagem estimada",
        chooseOrigin: "Escolha sua origem para comparar passagens.",
        selectDeparture: "Selecione a cidade de saída antes de escolher um voo.",
        guestRating: "avaliação dos hóspedes",
        breakfastWifi: "Café da manhã | Wi-Fi | Cancelamento grátis",
        poolTransfer: "Piscina | Traslado | Tarifa flexível",
        perNight: "por noite",
        forStay: "por",
        night: "noite",
        selectedStay: "selecionadas",
        bookingConfirmed: "Reserva confirmada com sucesso!",
        tripDetails: "Detalhes da viagem",
        route: "Rota",
        passengers: "Passageiros",
        hotel: "Hotel",
        dates: "Datas",
        stay: "Estadia",
        to: "para",
        priceSummary: "Resumo de preços",
        airfare: "Passagem ida e volta",
        hotelStay: "Hospedagem",
        taxes: "Taxas e impostos estimados",
        totalDue: "Total a pagar hoje"
    }
};

/* ======================================================
   HELPERS
====================================================== */
const getLanguage = () =>
    translations[localStorage.getItem(LANGUAGE_KEY)] ? localStorage.getItem(LANGUAGE_KEY) : 'en';

const getTranslations = () =>
    translations[getLanguage()] || translations.en;

const getPassengers = () =>
    Math.max(1, Number(localStorage.getItem(PASSENGERS_KEY)) || 1);

const getCabin = () =>
    localStorage.getItem(CABIN_KEY) || 'Economy';

function getCabinMultiplier() {
    const cabin = getCabin();

    if (cabin === 'Business') return 2.2;
    if (cabin === 'Premium Economy') return 1.45;
    return 1;
}

function getNights() {
    const inD = localStorage.getItem(CHECKIN_KEY);
    const outD = localStorage.getItem(CHECKOUT_KEY);

    if (!inD || !outD) return 1;

    const nights = (new Date(outD) - new Date(inD)) / 86400000;
    return nights > 0 ? nights : 1;
}

function getDestinationImage(destination) {
    return [...destinations.national, ...destinations.international]
        .find(d => d.name === destination)?.image;
}

/* ======================================================
   TRANSLATION UI
====================================================== */
function applyTranslations() {
    const t = getTranslations();

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
    placeholder.textContent = getTranslations().selectOrigin;
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
   HAMBURGUER MENU
====================================================== */

const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

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

    const createCard = (d, type) => {

        const t = getTranslations();
        const price = origin ? getFlightPrice(origin, d.name) : null;
        const passengerTotal = price ? price * getPassengers() * getCabinMultiplier() : null;
        const duration = type === 'national' ? t.directOrStop : t.oneTwoStops;
        const baggage = type === 'national' ? t.carryOn : t.checkedBag;

        return `
        <div class="card destination-card ${selected === d.name ? 'selected' : ''}">
            <img src="${d.image}" alt="${d.name}">
            <div class="card-body">
                <span class="card-tag">${type === 'national' ? t.domesticPackage : t.internationalPackage}</span>
                <h3>${d.name}</h3>
                <p class="card-meta">${duration} | ${baggage}</p>
                ${price ? `
                    <p class="price-line">${formatPrice(price)} <span>${t.perPassenger}</span></p>
                    <p class="total-line">${formatPrice(passengerTotal)} ${t.estimatedAirfare}</p>
                ` : `<p class="muted">${t.chooseOrigin}</p>`}
            </div>
            <button class="select-destination">
                ${selected === d.name ? t.selected : t.chooseFlight}
            </button>
        </div>
        `;
    };

    natGrid.innerHTML = destinations.national.map(d => createCard(d, 'national')).join('');
    intlGrid.innerHTML = destinations.international.map(d => createCard(d, 'international')).join('');

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
            const origin = localStorage.getItem(ORIGIN_KEY);

            if (!origin) {
                alert(getTranslations().selectDeparture);
                return;
            }

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
            getTranslations().noAccommodations;
        return;
    }

    const list = [
        ...accommodations.national,
        ...accommodations.international
    ].filter(a => a.destination === dest);

    grid.innerHTML = list.map((a, index) => {
        const t = getTranslations();
        const rating = (4.2 + (index % 3) * 0.3).toFixed(1);
        const amenities = index % 2 === 0
            ? t.breakfastWifi
            : t.poolTransfer;
        const nightLabel = getNights() > 1 ? t.nights : t.night;

        return `
        <div class="card hotel-card">
            <img src="${a.image}" alt="${a.name}">
            <div class="card-body">
                <span class="card-tag">${rating} ${t.guestRating}</span>
                <h3>${a.name}</h3>
                <p class="card-meta">${amenities}</p>
                <p class="price-line">${formatPrice(a.pricePerNight)} <span>${t.perNight}</span></p>
                <p class="total-line">${formatPrice(a.pricePerNight * getNights())} ${t.forStay} ${getNights()} ${nightLabel}</p>
            </div>
            <button class="choose-accommodation">
                ${t.chooseHotel}
            </button>
        </div>
        `;
    }).join('');

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

    const nights = getNights();
    const t = getTranslations();

    el.textContent =
        `${nights} ${t.nights} ${t.selectedStay}`;
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
        msg.textContent = getTranslations().bookingConfirmed;
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
    const passengers = getPassengers();
    const cabin = getCabin();

    const checkin = localStorage.getItem(CHECKIN_KEY);
    const checkout = localStorage.getItem(CHECKOUT_KEY);

    const nights = getNights();
    const flightPrice = origin && destination
        ? getFlightPrice(origin, destination) * passengers * getCabinMultiplier()
        : 0;
    const hotelTotal = price * nights;
    const taxes = (flightPrice + hotelTotal) * 0.12;
    const total = flightPrice + hotelTotal + taxes;
    const destinationImage = getDestinationImage(destination);
    const t = getTranslations();
    const nightLabel = nights > 1 ? t.nights : t.night;

    info.innerHTML = `
        ${destinationImage ? `<img class="summary-image" src="${destinationImage}" alt="${destination}">` : ''}
        <h3>${t.tripDetails}</h3>
        <p><strong>${t.route}:</strong> ${origin || '-'} ${t.to} ${destination || '-'}</p>
        <p><strong>${t.passengers}:</strong> ${passengers} | ${cabin}</p>
        <p><strong>${t.hotel}:</strong> ${accommodation || '-'}</p>
        <p><strong>${t.dates}:</strong> ${checkin || '-'} ${t.to} ${checkout || '-'}</p>
        <p><strong>${t.stay}:</strong> ${nights} ${nightLabel}</p>
    `;

    values.innerHTML = `
        <h3>${t.priceSummary}</h3>
        <p><span>${t.airfare}</span><strong>${formatPrice(flightPrice)}</strong></p>
        <p><span>${t.hotelStay}</span><strong>${formatPrice(hotelTotal)}</strong></p>
        <p><span>${t.taxes}</span><strong>${formatPrice(taxes)}</strong></p>
        <p class="grand-total"><span>${t.totalDue}</span><strong>${formatPrice(total)}</strong></p>
    `;
}

function setupPreferences() {
    const currency = document.getElementById('currency');
    const language = document.getElementById('language');
    const passengers = document.getElementById('passengers');
    const cabin = document.getElementById('cabin');

    if (currency) {
        currency.value = localStorage.getItem(CURRENCY_KEY) || 'USD';
        currency.addEventListener('change', () => {
            localStorage.setItem(CURRENCY_KEY, currency.value);
            renderCards();
        });
    }

    if (language) {
        language.value = localStorage.getItem(LANGUAGE_KEY) || 'en';
        language.addEventListener('change', () => {
            localStorage.setItem(LANGUAGE_KEY, language.value);
            applyTranslations();
            renderCards();
            renderAccommodations();
            renderTripSummary();
            displayStay();
        });
    }

    if (passengers) {
        passengers.value = getPassengers();
        const savePassengers = () => {
            localStorage.setItem(PASSENGERS_KEY, passengers.value);
            renderCards();
        };

        passengers.addEventListener('input', savePassengers);
        passengers.addEventListener('change', savePassengers);
    }

    if (cabin) {
        cabin.value = getCabin();
        cabin.addEventListener('change', () => {
            localStorage.setItem(CABIN_KEY, cabin.value);
            renderCards();
        });
    }
}

/* ======================================================
RESULTS
====================================================== */
const modal = document.querySelector("#confirmation-modal");
const confirmBtn = document.querySelector("#confirm-booking");
const closeBtn = document.querySelector("#close-modal");

confirmBtn?.addEventListener("click", () => {
  modal.showModal();
});

closeBtn?.addEventListener("click", () => {
  modal.close();
});

/* ======================================================
   INIT
====================================================== */
document.addEventListener('DOMContentLoaded', () => {

    applyTranslations();
    setupPreferences();
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