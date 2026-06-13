/* ======================================================
   data.js
====================================================== */

/* ======================================================
   ORIGINS
====================================================== */
const brazilOrigins = [
    "Aracaju/SE","Belem/PA","Belo Horizonte/MG","Boa Vista/RR",
    "Brasilia/DF","Campo Grande/MS","Cuiaba/MT","Curitiba/PR",
    "Florianopolis/SC","Fortaleza/CE","Goiania/GO","Joao Pessoa/PB",
    "Macapa/AP","Maceio/AL","Manaus/AM","Natal/RN","Palmas/TO",
    "Porto Alegre/RS","Porto Velho/RO","Recife/PE","Rio Branco/AC",
    "Rio de Janeiro/RJ","Salvador/BA","Sao Luis/MA","Sao Paulo/SP",
    "Teresina/PI","Vitoria/ES"
];

/* ======================================================
   DESTINATIONS
====================================================== */
const destinations = {
    national: [
        { name: 'Rio de Janeiro/RJ', image: 'images/rio-de-janeiro.avif' },
        { name: 'Sao Paulo/SP', image: 'images/sao-paulo.avif' },
        { name: 'Salvador/BA', image: 'images/salvador.avif' },
        { name: 'Florianopolis/SC', image: 'images/florianopolis.avif' },
        { name: 'Gramado/RS', image: 'images/gramado.avif' },
        { name: 'Foz do Iguacu/PR', image: 'images/foz-do-iguacu.avif' },
        { name: 'Natal/RN', image: 'images/natal.avif' },
        { name: 'Recife/PE', image: 'images/recife.avif' },
        { name: 'Fortaleza/CE', image: 'images/fortaleza.avif' },
        { name: 'Maceio/AL', image: 'images/maceio.avif' }
    ],
    international: [
        { name: 'Paris, France', image: 'images/paris.avif' },
        { name: 'London, England', image: 'images/london.avif' },
        { name: 'Rome, Italy', image: 'images/rome.avif' },
        { name: 'Barcelona, Spain', image: 'images/barcelona.avif' },
        { name: 'Lisbon, Portugal', image: 'images/lisbon.avif' },
        { name: 'New York, USA', image: 'images/new-york.avif' },
        { name: 'Tokyo, Japan', image: 'images/tokyo.avif' },
        { name: 'Cancun, Mexico', image: 'images/cancun.avif' },
        { name: 'Dubai, UAE', image: 'images/dubai.avif' },
        { name: 'Sydney, Australia', image: 'images/sydney.avif' }
    ]
};

export const destinations = [
  { name: "Rio de Janeiro", price: 350 },
  { name: "New York", price: 820 }
];

/* ======================================================
   ACCOMMODATIONS
====================================================== */
const accommodations = {
    national: [
        //Rio de Janeiro
        { name: 'Atlantico Rio Palace', destination: 'Rio de Janeiro/RJ', image: 'images/hotel/national/hotel-rio1.avif', pricePerNight: 85 },
        { name: 'Copacabana View Hotel', destination: 'Rio de Janeiro/RJ', image: 'images/hotel/national/hotel-rio2.avif', pricePerNight: 140 },
        { name: 'Mar Azul Boutique Hotel', destination: 'Rio de Janeiro/RJ', image: 'images/hotel/national/hotel-rio3.avif', pricePerNight: 210 },

        //Sao Paulo
        { name: 'Paulista Prime Hotel', destination: 'Sao Paulo/SP', image: 'images/hotel/national/hotel-sp1.avif', pricePerNight: 120 },
        { name: 'Vila Urbana Residence', destination: 'Sao Paulo/SP', image: 'images/hotel/national/hotel-sp2.avif', pricePerNight: 180 },
        { name: 'Metropolitan Center Hotel', destination: 'Sao Paulo/SP', image: 'images/hotel/national/hotel-sp3.avif', pricePerNight: 250 },

        //Salvador
        { name: 'Solar do Pelourinho Hotel', destination: 'Salvador/BA', image: 'images/hotel/national/hotel-salvador1.avif', pricePerNight: 90 },
        { name: 'Bahia Mar Resort', destination: 'Salvador/BA', image: 'images/hotel/national/hotel-salvador2.avif', pricePerNight: 150 },
        { name: 'Encanto do Farol Hotel', destination: 'Salvador/BA', image: 'images/hotel/national/hotel-salvador3.avif', pricePerNight: 180 },

        //Florianopolis
        { name: 'Ilha da Magia Resort', destination: 'Florianopolis/SC', image: 'images/hotel/national/hotel-floripa1.avif', pricePerNight: 120 },
        { name: 'Praia Norte Hotel', destination: 'Florianopolis/SC', image: 'images/hotel/national/hotel-floripa2.avif', pricePerNight: 160 },
        { name: 'Costa Azul Boutique Hotel', destination: 'Florianopolis/SC', image: 'images/hotel/national/hotel-floripa3.avif', pricePerNight: 200 },

        //Gramado
        { name: 'Vale das Hortensias Hotel', destination: 'Gramado/RS', image: 'images/hotel/national/hotel-gramado1.avif', pricePerNight: 100 },
        { name: 'Alpen Lumiere Hotel', destination: 'Gramado/RS', image: 'images/hotel/national/hotel-gramado2.avif', pricePerNight: 140 },
        { name: 'Montanha Encantada Resort', destination: 'Gramado/RS', image: 'images/hotel/national/hotel-gramado3.avif', pricePerNight: 180 },

        //Foz do Iguacu
        { name: 'Cataratas View Hotel', destination: 'Foz do Iguacu/PR', image: 'images/hotel/national/hotel-foz1.avif', pricePerNight: 110 },
        { name: 'Triplice Fronteira Resort', destination: 'Foz do Iguacu/PR', image: 'images/hotel/national/hotel-foz2.avif', pricePerNight: 160 },
        { name: 'Nature Falls Lodge', destination: 'Foz do Iguacu/PR', image: 'images/hotel/national/hotel-foz3.avif', pricePerNight: 200 },

        //Natal
        { name: 'Dunas Sun Hotel', destination: 'Natal/RN', image: 'images/hotel/national/hotel-natal1.avif', pricePerNight: 95 },
        { name: 'Ponta Negra Resort', destination: 'Natal/RN', image: 'images/hotel/national/hotel-natal2.avif', pricePerNight: 140 },
        { name: 'Atlantico Breeze Hotel', destination: 'Natal/RN', image: 'images/hotel/national/hotel-natal3.avif', pricePerNight: 180 },

        //Recife
        { name: 'Boa Viagem Palace', destination: 'Recife/PE', image: 'images/hotel/national/hotel-recife1.avif', pricePerNight: 100 },
        { name: 'Mar do Nordeste Hotel', destination: 'Recife/PE', image: 'images/hotel/national/hotel-recife2.avif', pricePerNight: 130 },
        { name: 'Porto do Sol Resort', destination: 'Recife/PE', image: 'images/hotel/national/hotel-recife3.avif', pricePerNight: 160 },

        //Fortaleza
        { name: 'Beira-Mar Premium Hotel', destination: 'Fortaleza/CE', image: 'images/hotel/national/hotel-fortaleza1.avif', pricePerNight: 120 },
        { name: 'Vento Leste Resort', destination: 'Fortaleza/CE', image: 'images/hotel/national/hotel-fortaleza2.avif', pricePerNight: 150 },
        { name: 'Costa Dourada Hotel', destination: 'Fortaleza/CE', image: 'images/hotel/national/hotel-fortaleza3.avif', pricePerNight: 180 },

        //Maceio
        { name: 'Piscinas Naturais Resort', destination: 'Maceio/AL', image: 'images/hotel/national/hotel-maceio1.avif', pricePerNight: 100 },
        { name: 'Mar Verde Boutique Hotel', destination: 'Maceio/AL', image: 'images/hotel/national/hotel-maceio2.avif', pricePerNight: 130 },
        { name: 'Atlantica Paradise Hotel', destination: 'Maceio/AL', image: 'images/hotel/national/hotel-maceio3.avif', pricePerNight: 160 }
    ],
    international: [

        //Paris
        { name: 'Hotel Lumiere Paris', destination: 'Paris, France', image: 'images/hotel/international/hotel-paris1.avif', pricePerNight: 250 },
        { name: 'Eiffel View Boutique', destination: 'Paris, France', image: 'images/hotel/international/hotel-paris2.avif', pricePerNight: 300 },
        { name: 'Champs Elegance Hotel', destination: 'Paris, France', image: 'images/hotel/international/hotel-paris3.avif', pricePerNight: 350 },

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
        { name: 'Gaudi Style Resort', destination: 'Barcelona, Spain', image: 'images/hotel/international/hotel-barcelona2.avif', pricePerNight: 220 },
        { name: 'Mediterraneo Urban Hotel', destination: 'Barcelona, Spain', image: 'images/hotel/international/hotel-barcelona3.avif', pricePerNight: 190 },

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

        //Cancun
        { name: 'Caribe Azul Resort', destination: 'Cancun, Mexico', image: 'images/hotel/international/hotel-cancun1.avif', pricePerNight: 180 },
        { name: 'Playa Blanca Hotel', destination: 'Cancun, Mexico', image: 'images/hotel/international/hotel-cancun2.avif', pricePerNight: 160 },
        { name: 'Maya Sun Paradise', destination: 'Cancun, Mexico', image: 'images/hotel/international/hotel-cancun3.avif', pricePerNight: 200 },

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

