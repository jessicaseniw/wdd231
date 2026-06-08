/* ======================================================
   KEYS
====================================================== */
const ORIGIN_KEY = 'selectedOrigin';
const DESTINATION_KEY = 'selectedDestination';
const CURRENCY_KEY = 'selectedCurrency';
const CHECKIN_KEY = 'checkInDate';
const CHECKOUT_KEY = 'checkOutDate';
const LANGUAGE_KEY = 'selectedLanguage';

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
        accommodations: "Available Accommodations",
        changeDestination: "Change Destination",
        myTrips: "My Trip",
        nights: "nights",
        noAccommodations: "No accommodations available for this destination.",
        selectOrigin: "Select origin"
    }
};

/* ======================================================
   LANGUAGE
====================================================== */
function getLanguage() {
    return localStorage.getItem(LANGUAGE_KEY) || 'en';
}

function applyTranslations() {
    const lang = getLanguage();
    const t = translations[lang];

    const title = document.querySelector('#destinations h2');
    if (title) title.textContent = t.destinations;

    const subtitles = document.querySelectorAll('.section-subtitle');
    if (subtitles[0]) subtitles[0].textContent = t.national;
    if (subtitles[1]) subtitles[1].textContent = t.international;

    const changeBtn = document.querySelector('.change-btn');
    if (changeBtn) changeBtn.textContent = t.changeDestination;

    const originSelect = document.querySelector('#origin');
    if (originSelect && originSelect.options.length > 0) {
        originSelect.options[0].textContent = t.selectOrigin;
    }
}

function initializeLanguage() {
    const select = document.querySelector('#language');
    if (!select) return;

    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved) select.value = saved;

    select.addEventListener('change', () => {
        localStorage.setItem(LANGUAGE_KEY, select.value);
        applyTranslations();
        renderCards();
        displayStayPeriod();
    });

    applyTranslations();
}

/* ======================================================
   BRAZIL ORIGINS
====================================================== */
const brazilOrigins = [
    "Aracaju/SE", "Belém/PA", "Belo Horizonte/MG", "Boa Vista/RR", "Brasília/DF",
    "Campo Grande/MS", "Cuiabá/MT", "Curitiba/PR", "Florianópolis/SC", "Fortaleza/CE",
    "Goiânia/GO", "João Pessoa/PB", "Macapá/AP", "Maceió/AL", "Manaus/AM",
    "Natal/RN", "Palmas/TO", "Porto Alegre/RS", "Porto Velho/RO", "Recife/PE",
    "Rio Branco/AC", "Rio de Janeiro/RJ", "Salvador/BA", "São Luís/MA",
    "São Paulo/SP", "Teresina/PI", "Vitória/ES"
];

function populateOrigins() {
    const originSelect = document.getElementById('origin');
    if (!originSelect) return;

    originSelect.innerHTML = '';

    const saved = localStorage.getItem(ORIGIN_KEY);

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = translations[getLanguage()].selectOrigin;
    placeholder.disabled = true;
    placeholder.selected = !saved;
    originSelect.appendChild(placeholder);

    brazilOrigins.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        if (saved === city) option.selected = true;
        originSelect.appendChild(option);
    });

    originSelect.onchange = function () {
        localStorage.setItem(ORIGIN_KEY, this.value);
        renderCards();
        displayRoute();
    };
}

/* ======================================================
   DESTINATIONS
====================================================== */
const destinations = {
    national: [
        { name: 'Rio de Janeiro/RJ', image: 'images/rio-de-janeiro.avif' },
        { name: 'São Paulo/SP', image: 'images/sao-paulo.avif' },
        { name: 'Salvador/BA', image: 'images/salvador.avif' },
        { name: 'Florianópolis/SC', image: 'images/florianopolis.avif' },
        { name: 'Gramado/RS', image: 'images/gramado.avif' },
        { name: 'Foz do Iguaçu/PR', image: 'images/foz-do-iguacu.avif' },
        { name: 'Natal/RN', image: 'images/natal.avif' },
        { name: 'Recife/PE', image: 'images/recife.avif' },
        { name: 'Fortaleza/CE', image: 'images/fortaleza.avif' },
        { name: 'Maceió/AL', image: 'images/maceio.avif' }
    ],
    international: [
        { name: 'Paris, France', image: 'images/paris.avif' },
        { name: 'London, England', image: 'images/london.avif' },
        { name: 'Rome, Italy', image: 'images/rome.avif' },
        { name: 'Barcelona, Spain', image: 'images/barcelona.avif' },
        { name: 'Lisbon, Portugal', image: 'images/lisbon.avif' },
        { name: 'New York, USA', image: 'images/new-york.avif' },
        { name: 'Tokyo, Japan', image: 'images/tokyo.avif' },
        { name: 'Cancún, Mexico', image: 'images/cancun.avif' },
        { name: 'Dubai, UAE', image: 'images/dubai.avif' },
        { name: 'Sydney, Australia', image: 'images/sydney.avif' }
    ]
};

/* ======================================================
   ACCOMMODATIONS
====================================================== */
const accommodations = {
    national: [
        //Rio de Janeiro
        { name: 'Atlântico Rio Palace', destination: 'Rio de Janeiro/RJ', image: 'images/hotel/national/hotel-rio1.avif', pricePerNight: 85 },
        { name: 'Copacabana View Hotel', destination: 'Rio de Janeiro/RJ', image: 'images/hotel/national/hotel-rio2.avif', pricePerNight: 140 },
        { name: 'Mar Azul Boutique Hotel', destination: 'Rio de Janeiro/RJ', image: 'images/hotel/national/hotel-rio3.avif', pricePerNight: 210 },

        //São Paulo
        { name: 'Paulista Prime Hotel', destination: 'São Paulo/SP', image: 'images/hotel/national/hotel-sp1.avif', pricePerNight: 120 },
        { name: 'Vila Urbana Residence', destination: 'São Paulo/SP', image: 'images/hotel/national/hotel-sp2.avif', pricePerNight: 180 },
        { name: 'Metropolitan Center Hotel', destination: 'São Paulo/SP', image: 'images/hotel/national/hotel-sp3.avif', pricePerNight: 250 },

        //Salvador
        { name: 'Solar do Pelourinho Hotel', destination: 'Salvador/BA', image: 'images/hotel/national/hotel-salvador1.avif', pricePerNight: 90 },
        { name: 'Bahia Mar Resort', destination: 'Salvador/BA', image: 'images/hotel/national/hotel-salvador2.avif', pricePerNight: 150 },
        { name: 'Encanto do Farol Hotel', destination: 'Salvador/BA', image: 'images/hotel/national/hotel-salvador3.avif', pricePerNight: 180 },

        //Florianópolis
        { name: 'Ilha da Magia Resort', destination: 'Florianópolis/SC', image: 'images/hotel/national/hotel-floripa1.avif', pricePerNight: 120 },
        { name: 'Praia Norte Hotel', destination: 'Florianópolis/SC', image: 'images/hotel/national/hotel-floripa2.avif', pricePerNight: 160 },
        { name: 'Costa Azul Boutique Hotel', destination: 'Florianópolis/SC', image: 'images/hotel/national/hotel-floripa3.avif', pricePerNight: 200 },

        //Gramado
        { name: 'Vale das Hortênsias Hotel', destination: 'Gramado/RS', image: 'images/hotel/national/hotel-gramado1.avif', pricePerNight: 100 },
        { name: 'Alpen Lumière Hotel', destination: 'Gramado/RS', image: 'images/hotel/national/hotel-gramado2.avif', pricePerNight: 140 },
        { name: 'Montanha Encantada Resort', destination: 'Gramado/RS', image: 'images/hotel/national/hotel-gramado3.avif', pricePerNight: 180 },

        //Foz do Iguaçu
        { name: 'Cataratas View Hotel', destination: 'Foz do Iguaçu/PR', image: 'images/hotel/national/hotel-foz1.avif', pricePerNight: 110 },
        { name: 'Tríplice Fronteira Resort', destination: 'Foz do Iguaçu/PR', image: 'images/hotel/national/hotel-foz2.avif', pricePerNight: 160 },
        { name: 'Nature Falls Lodge', destination: 'Foz do Iguaçu/PR', image: 'images/hotel/national/hotel-foz3.avif', pricePerNight: 200 },

        //Natal
        { name: 'Dunas Sun Hotel', destination: 'Natal/RN', image: 'images/hotel/national/hotel-natal1.avif', pricePerNight: 95 },
        { name: 'Ponta Negra Resort', destination: 'Natal/RN', image: 'images/hotel/national/hotel-natal2.avif', pricePerNight: 140 },
        { name: 'Atlântico Breeze Hotel', destination: 'Natal/RN', image: 'images/hotel/national/hotel-natal3.avif', pricePerNight: 180 },

        //Recife
        { name: 'Boa Viagem Palace', destination: 'Recife/PE', image: 'images/hotel/national/hotel-recife1.avif', pricePerNight: 100 },
        { name: 'Mar do Nordeste Hotel', destination: 'Recife/PE', image: 'images/hotel/national/hotel-recife2.avif', pricePerNight: 130 },
        { name: 'Porto do Sol Resort', destination: 'Recife/PE', image: 'images/hotel/national/hotel-recife3.avif', pricePerNight: 160 },

        //Fortaleza
        { name: 'Beira-Mar Premium Hotel', destination: 'Fortaleza/CE', image: 'images/hotel/national/hotel-fortaleza1.avif', pricePerNight: 120 },
        { name: 'Vento Leste Resort', destination: 'Fortaleza/CE', image: 'images/hotel/national/hotel-fortaleza2.avif', pricePerNight: 150 },
        { name: 'Costa Dourada Hotel', destination: 'Fortaleza/CE', image: 'images/hotel/national/hotel-fortaleza3.avif', pricePerNight: 180 },

        //Maceió
        { name: 'Piscinas Naturais Resort', destination: 'Maceió/AL', image: 'images/hotel/national/hotel-maceio1.avif', pricePerNight: 100 },
        { name: 'Mar Verde Boutique Hotel', destination: 'Maceió/AL', image: 'images/hotel/national/hotel-maceio2.avif', pricePerNight: 130 },
        { name: 'Atlântica Paradise Hotel', destination: 'Maceió/AL', image: 'images/hotel/national/hotel-maceio3.avif', pricePerNight: 160 }
    ],
    international: [

        //Paris
        { name: 'Hotel Lumière Paris', destination: 'Paris, France', image: 'images/hotel/international/hotel-paris1.avif', pricePerNight: 250 },
        { name: 'Eiffel View Boutique', destination: 'Paris, France', image: 'images/hotel/international/hotel-paris2.avif', pricePerNight: 300 },
        { name: 'Champs Élégance Hotel', destination: 'Paris, France', image: 'images/hotel/international/hotel-paris3.avif', pricePerNight: 350 },

        //London
        { name: 'Royal Thames Hotel', destination: 'London, England', image: 'images/hotel/international/hotel-london1.avif', pricePerNight: 200 },
        { name: 'Westminster Grand', destination: 'London, England', image: 'images/hotel/international/hotel-london2.avif', pricePerNight: 250 },
        { name: 'Camden City Hotel', destination: 'London, England', image: 'images/hotel/international/hotel-london3.avif', pricePerNight: 180 },

        //Rome
        { name: 'Roma Antica Hotel', destination: 'Rome, Italy', image: 'images/hotel/international/hotel-rome1.avif', pricePerNight: 220 },
        { name: 'Colosseum View Inn', destination: 'Rome, Italy', image: 'images/hotel/international/hotel-rome2.avif', pricePerNight: 180 },
        { name: 'Vaticano Boutique Hotel', destination: 'Rome, Italy', image: 'images/hotel/international/hotel-rome3.avif', pricePerNight: 250 },

        //Barcelona
        { name: 'Costa Catalana Hotel', destination: 'Barcelona, Spain', image: 'images/hotel/international/hotel-barcelona1.avif', pricePerNight: 180 },
        { name: 'Gaudí Style Resort', destination: 'Barcelona, Spain', image: 'images/hotel/international/hotel-barcelona2.avif', pricePerNight: 220 },
        { name: 'Mediterráneo Urban Hotel', destination: 'Barcelona, Spain', image: 'images/hotel/international/hotel-barcelona3.avif', pricePerNight: 190 },

        //Lisbon
        { name: 'Alfama Charm Hotel', destination: 'Lisbon, Portugal', image: 'images/hotel/international/hotel-lisbon1.avif', pricePerNight: 160 },
        { name: 'Tejo View Residence', destination: 'Lisbon, Portugal', image: 'images/hotel/international/hotel-lisbon2.avif', pricePerNight: 170 },
        { name: 'Luz do Castelo Hotel', destination: 'Lisbon, Portugal', image: 'images/hotel/international/hotel-lisbon3.avif', pricePerNight: 150 },

        //New York
        { name: 'Manhattan Skyline Hotel', destination: 'New York, USA', image: 'images/hotel/international/hotel-ny1.avif', pricePerNight: 300 },
        { name: 'Central Park View', destination: 'New York, USA', image: 'images/hotel/international/hotel-ny2.avif', pricePerNight: 250 },
        { name: 'Hudson River Lodge', destination: 'New York, USA', image: 'images/hotel/international/hotel-ny3.avif', pricePerNight: 200 },

        //Tokyo
        { name: 'Sakura Tower Hotel', destination: 'Tokyo, Japan', image: 'images/hotel/international/hotel-tokyo1.avif', pricePerNight: 220 },
        { name: 'Shibuya Urban Stay', destination: 'Tokyo, Japan', image: 'images/hotel/international/hotel-tokyo2.avif', pricePerNight: 180 },
        { name: 'Zen Garden Ryokan', destination: 'Tokyo, Japan', image: 'images/hotel/international/hotel-tokyo3.avif', pricePerNight: 250 },

        //Cancún
        { name: 'Caribe Azul Resort', destination: 'Cancún, Mexico', image: 'images/hotel/international/hotel-cancun1.avif', pricePerNight: 180 },
        { name: 'Playa Blanca Hotel', destination: 'Cancún, Mexico', image: 'images/hotel/international/hotel-cancun2.avif', pricePerNight: 160 },
        { name: 'Maya Sun Paradise', destination: 'Cancún, Mexico', image: 'images/hotel/international/hotel-cancun3.avif', pricePerNight: 200 },

        //Dubai
        { name: 'Desert Pearl Hotel', destination: 'Dubai, UAE', image: 'images/hotel/international/hotel-dubai1.avif', pricePerNight: 280 },
        { name: 'Skyline Luxury Resort', destination: 'Dubai, UAE', image: 'images/hotel/international/hotel-dubai2.avif', pricePerNight: 320 },
        { name: 'Palm Oasis Hotel', destination: 'Dubai, UAE', image: 'images/hotel/international/hotel-dubai3.avif', pricePerNight: 250 },

        //Sydney
        { name: 'Harbour View Hotel', destination: 'Sydney, Australia', image: 'images/hotel/international/hotel-sydney1.avif', pricePerNight: 200 },
        { name: 'Opera House Boutique', destination: 'Sydney, Australia', image: 'images/hotel/international/hotel-sydney2.avif', pricePerNight: 250 },
        { name: 'Bondi Beach Resort', destination: 'Sydney, Australia', image: 'images/hotel/international/hotel-sydney3.avif', pricePerNight: 180 }
    ]
};

function renderAccommodations() {
    const natGrid = document.querySelector('.national-grid');
    const intlGrid = document.querySelector('.international-grid');
    if (!natGrid || !intlGrid) return;

    const selectedDestination = localStorage.getItem(DESTINATION_KEY);
    if (!selectedDestination) {
        natGrid.innerHTML = `<p>${translations[getLanguage()].noAccommodations}</p>`;
        intlGrid.innerHTML = '';
        return;
    }

    const nationalHotels = accommodations.national.filter(acc => acc.destination === selectedDestination);
    const internationalHotels = accommodations.international.filter(acc => acc.destination === selectedDestination);

    const createCard = acc => `
        <div class="card">
            <img src="${acc.image}" alt="${acc.name}">
            <h3>${acc.name}</h3>
            <p>${translations[getLanguage()].from} ${formatPrice(acc.pricePerNight)}</p>
            <button class="choose-accommodation">Add Accommodation</button>
        </div>
    `;

    natGrid.innerHTML = nationalHotels.length ? nationalHotels.map(createCard).join('') : `<p>${translations[getLanguage()].noAccommodations}</p>`;
    intlGrid.innerHTML = internationalHotels.length ? internationalHotels.map(createCard).join('') : '';
    setupCardButtons();
}

/* ======================================================
   FLIGHT PRICES
====================================================== */
function generateFlightPrice(origin, destination) {
    const nationalDestinations = destinations.national.map(d => d.name);
    const internationalDestinations = destinations.international.map(d => d.name);

    let base;
    if (nationalDestinations.includes(destination)) base = 120;
    else if (internationalDestinations.includes(destination)) base = 750;
    else return null;

    const variation = Math.abs(origin.length * 7 - destination.length * 5) % 200;
    return base + variation;
}

function getDestinationPrice(origin, destination) {
    if (!origin || !destination) return null;
    return generateFlightPrice(origin, destination);
}

/* ======================================================
   CURRENCY
====================================================== */
const exchangeRates = { USD: 1, BRL: 5, EUR: 0.9 };

function formatPrice(priceUSD) {
    const currency = localStorage.getItem(CURRENCY_KEY) || 'USD';
    const localeMap = { USD: 'en-US', BRL: 'pt-BR', EUR: 'de-DE' };
    return new Intl.NumberFormat(localeMap[currency], {
        style: 'currency',
        currency
    }).format(priceUSD * exchangeRates[currency]);
}

function initializeCurrency() {
    const select = document.querySelector('#currency');
    if (!select) return;

    const saved = localStorage.getItem(CURRENCY_KEY);
    if (saved) select.value = saved;

    select.addEventListener('change', () => {
        localStorage.setItem(CURRENCY_KEY, select.value);
        renderCards();
        displayRoute();
    });
}

/* ======================================================
   DATES
====================================================== */
function initializeDates() {
    const checkInInput = document.querySelector('#checkin');
    const checkOutInput = document.querySelector('#checkout');
    if (!checkInInput || !checkOutInput) return;

    const savedCheckIn = localStorage.getItem(CHECKIN_KEY);
    const savedCheckOut = localStorage.getItem(CHECKOUT_KEY);

    if (savedCheckIn) checkInInput.value = savedCheckIn;
    if (savedCheckOut) checkOutInput.value = savedCheckOut;

    checkInInput.addEventListener('change', () => {
        localStorage.setItem(CHECKIN_KEY, checkInInput.value);
        renderCards();
        displayStayPeriod();
    });

    checkOutInput.addEventListener('change', () => {
        localStorage.setItem(CHECKOUT_KEY, checkOutInput.value);
        renderCards();
        displayStayPeriod();
    });
}

function calculateNights(checkIn, checkOut) {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut) - new Date(checkIn);
    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0;
}

/* ======================================================
   RENDER CARDS
====================================================== */
function renderCards() {
    const t = translations[getLanguage()];
    const natGrid = document.querySelector('.national-grid');
    const intlGrid = document.querySelector('.international-grid');
    if (!natGrid || !intlGrid) return;

    const origin = localStorage.getItem(ORIGIN_KEY);
    const selectedDestination = localStorage.getItem(DESTINATION_KEY);

    const createCard = dest => {
        const price = origin ? getDestinationPrice(origin, dest.name) : null;
        const isSelected = selectedDestination === dest.name;
        const cardClass = isSelected ? 'card selected' : 'card';

        return `
            <div class="${cardClass}">
                <img src="${dest.image}" alt="${dest.name}">
                <h3>${dest.name}</h3>
                ${price ? `<p class="price">${t.from} ${formatPrice(price)}</p>` : ''}
                <button class="select-destination">${isSelected ? t.selected : t.select}</button>
            </div>
        `;
    };

    natGrid.innerHTML = destinations.national.map(createCard).join('');
    intlGrid.innerHTML = destinations.international.map(createCard).join('');

    setupDestinationButtons();
}

/* ======================================================
   CARD INTERACTIONS
====================================================== */
function setupDestinationButtons() {
    document.querySelectorAll('.select-destination').forEach(btn => {
        btn.addEventListener('click', e => {
            const card = e.target.closest('.card');
            const destinationName = card.querySelector('h3').textContent;

            localStorage.setItem(DESTINATION_KEY, destinationName);

            // Redirect directly to the accommodations page
            window.location.href = 'listings.html';
        });
    });
}

function setupCardButtons() {
    document.querySelectorAll('.choose-accommodation').forEach(btn => {
        btn.onclick = e => {
            const card = e.target.closest('.card');
            const accommodationName = card.querySelector('h3').textContent;

            // Get the nightly price directly from the accommodations object
            const selectedDestination = localStorage.getItem(DESTINATION_KEY);
            const acc = accommodations.national.concat(accommodations.international)
                .find(a => a.name === accommodationName && a.destination === selectedDestination);

            if (!acc) return;

            localStorage.setItem('selectedAccommodation', accommodationName);
            localStorage.setItem('selectedAccommodationPrice', acc.pricePerNight); // raw number

            window.location.href = 'trips.html';
        };
    });
}

/* ======================================================
   ROUTE DISPLAY
====================================================== */
function displayRoute() {
    const route = document.querySelector('#selected-route');
    if (!route) return;

    const origin = localStorage.getItem(ORIGIN_KEY);
    const dest = localStorage.getItem(DESTINATION_KEY);

    route.textContent = origin
        ? dest ? `${origin} → ${dest}` : `${origin} → ...`
        : '...';
}

/* ======================================================
   STAY PERIOD
====================================================== */
function displayStayPeriod() {
    const el = document.getElementById('stay-period');
    if (!el) return;

    const checkIn = localStorage.getItem(CHECKIN_KEY);
    const checkOut = localStorage.getItem(CHECKOUT_KEY);
    if (!checkIn || !checkOut) {
        el.textContent = '';
        return;
    }

    const nights = calculateNights(checkIn, checkOut);
    const t = translations[getLanguage()];
    el.textContent = `${nights} ${t.nights}`;
}

/* ======================================================
   CHANGE DESTINATION
====================================================== */
function changeDestination() {
    localStorage.removeItem(DESTINATION_KEY);
    window.location.href = 'wanderly.html';
}

/* ======================================================
   UPDATE TRIP SUMMARY (TRIPS.HTML)
====================================================== */
function updateTripSummary() {
    const destination = localStorage.getItem(DESTINATION_KEY) || 'Not selected';
    const accommodation = localStorage.getItem('selectedAccommodation') || 'None';
    const accommodationPrice = parseFloat(localStorage.getItem('selectedAccommodationPrice')) || 0;

    const checkIn = localStorage.getItem(CHECKIN_KEY) || '---';
    const checkOut = localStorage.getItem(CHECKOUT_KEY) || '---';
    const nights = calculateNights(checkIn, checkOut);

    const origin = localStorage.getItem(ORIGIN_KEY);
    const flightPrice = origin && destination ? getDestinationPrice(origin, destination) || 0 : 0;

    const total = flightPrice + accommodationPrice * nights;

    const infoBlock = document.getElementById('trip-info');
    if (infoBlock) {
        infoBlock.innerHTML = `
            <div class="card">
                <h3>Selected Destination:</h3>
                <p>${destination}</p>
                <h3>Dates:</h3>
                <p>${checkIn} → ${checkOut} (${nights} nights)</p>
                <h3>Accommodation:</h3>
                <p>${accommodation}</p>
            </div>
        `;
    }

    const valueBlock = document.getElementById('trip-values');
    if (valueBlock) {
        valueBlock.innerHTML = `
            <div class="card">
                <h3>Destination cost (flight):</h3>
                <p>${formatPrice(flightPrice)}</p>
                <h3>Nights × nightly price:</h3>
                <p>${nights} × ${formatPrice(accommodationPrice)}</p>
                <h3>Total to pay:</h3>
                <p>${formatPrice(total)}</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateTripSummary();
});

/* ======================================================
   INIT
====================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    populateOrigins();
    initializeCurrency();
    initializeDates();
    displayRoute();
    displayStayPeriod();

    // Render cards if on wanderly.html or listings.html
    const listingsSection = document.getElementById('listings');
    if (listingsSection) {
        renderAccommodations();
        const currentDest = localStorage.getItem(DESTINATION_KEY);
        if (currentDest) {
            const currentDestEl = document.getElementById('current-destination');
            if (currentDestEl) currentDestEl.textContent = currentDest;
        }
    } else {
        renderCards();
    }

    // Update trip summary only if on trips.html
    if (document.getElementById('trip-summary')) {
        updateTripSummaryFromStorage();
    }
});