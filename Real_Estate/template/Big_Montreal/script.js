// Email and phone validation/formatting
function isValidEmail(email) {
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  return emailPattern.test(email);
}

function isValidCanadianPhoneNumber(phoneNumber) {
  const phonePattern = /^(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
  return phonePattern.test(phoneNumber);
}

function formatPhoneNumber(phoneNumber) {
  const cleaned = phoneNumber.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phoneNumber;
}

function formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    // Global parser: removes spaces (and commas) so that the result can be parsed as a float.
    function parseNumber(value) {
      return parseFloat((value || '').toString().replace(/\s/g, '').replace(',', '.')) || 0;
    }
    
       // Format a number as currency (using CAD)
    function formatCurrency(number) {
      const formatted = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(number);
      return formatted.replace(/,/g, ' ').replace(/\u00A0/g, ' ');
    }

// IMPORTANT: Define toggleCollapse only once as a global function


window.toggleCollapse = function(e, element) {
  e.stopPropagation();
  element.classList.toggle("active");
  const content = element.nextElementSibling;
  content.style.display = content.style.display === "block" ? "none" : "block";
  
  // Rotate the SVG icon
  const icon = element.querySelector(".collapse-icon");
  if (icon) {
    if (element.classList.contains("active")) {
      icon.style.transform = "rotate(-180deg)";
    } else {
      icon.style.transform = "rotate(0deg)";
    }
  }
}


/*************************************************************
 * 2) Shared Data: Property Categories & Types
 *************************************************************/

// Categories
const SharedPropertyCategories = {
  Residential: {
    en: ["House", "Co-ownership House", "Intergenerational", "Mobile House", "Condo", "Loft / Studio", "Cottage", "Farmhouse", "Land"],
    fr: ["Maison", "Maison en copropriété", "Intergénération", "Maison mobile", "Condo", "Loft / Studio", "Chalet", "Fermette", "Terrain"],
  },
  Plex: {
    en: ["Duplex", "Triplex", "Quadruplex", "Quintuplex", "MultiPlex"],
    fr: ["Duplex", "Triplex", "Quadruplex", "Quintuplex", "MultiPlex"],
  },
};

// House Type lists (en/fr)
const SharedPropertyTypes = {
  en: ["Multi-level", "Multi-storey", "Detached", "Semi-detached", "Row House", "Divided", "Undivided", "Single-storey", "One and a half storeys"],
  fr: ["À Paliers multiples", "À étages", "Détaché", "Jumelé", "En rangée", "Divise", "Indivise", "Plain-pied", "À un étage et demi"],
};

/*************************************************************
 * 3) Sellers & Seller Utilities
 *************************************************************/

const Sellers = ["No Preference", "Emma Thompson", "Liam Carter", "Sophia Martinez", "Ethan Brown", "Olivia Davis", "Noah Wilson", "Ava Johnson"];

function getSellerList(includeNoPreference = true) {
  let list = [...Sellers];
  if (!includeNoPreference) {
    list = list.filter(s => s !== "No Preference");
  }
  return list;
}

function buildSellerListItems(sellers, isEnglish) {
  return sellers
    .map((seller) => {
      const displayName = (!isEnglish && seller === "No Preference") ? "Pas de préférence" : seller;
      return `
            <li class="item">
              <span class="checkbox">
                                ${SVG_CHECK}
                              </span>
              <span class="item-text" data-value="${seller}">${displayName}</span>
            </li>
          `;
    })
    .join("");
}

/*************************************************************
 * 4) Service Options & Utilities
 *************************************************************/

const ServiceOptions = [
  {
    value: "Ventes",
    label: { en: "Sell", fr: "Ventes" },
  },
  {
    value: "Achat",
    label: { en: "Buy", fr: "Achat" },
  },
  {
    value: "Information",
    label: { en: "Information", fr: "Information" },
  },
];

function getServiceList(language) {
  return ServiceOptions.map((serviceOption) => {
    return {
      value: serviceOption.value,
      label: serviceOption.label[language],
    };
  });
}

/*************************************************************
 * 5) Booking URLs
 *************************************************************/

const BookingData = {
  "Emma Thompson": {
    link: "ainextg-emma-thompsonn",  // Remove the /meeting part
    namespace: "meeting"
  },
  "Liam Carter": {
    link: "ainextg-liam-carter",
    namespace: "meeting"
  },
  "Sophia Martinez": {
    link: "ainextg-sophia-martinez",
    namespace: "meeting"
  },
  "Ethan Brown": {
    link: "ainextg-ethan-brownn",
    namespace: "meeting"
  },
  "Olivia Davis": {
    link: "ainextg-olivia-daviss",  // Just the username without /meeting
    namespace: "meeting"
  },
  "Noah Wilson": {
    link: "ainextg-noah-wilsonn",
    namespace: "meeting"
  },
  "Ava Johnson": {
    link: "ainextg-ava-johnson",
    namespace: "meeting"
  }
};

/*************************************************************
 * 6) Mappings & Options
 *************************************************************/

// Property Type Mappings
const PropertyTypeMappings = {
  en: {
    Residential: "Residential",
    Plex: "Plex",
  },
  fr: {
    Résidentiel: "Residential",
    Plex: "Plex",
  },
};

// City mappings
const CityMappings = {
  en: {
    "Montreal-North Shore": "North Shore",
    "Montreal": "Montreal",
    "Montreal-South Shore": "South Shore",
  },
  fr: {
    "Rive-Nord de Montréal": "North Shore",
    "Montréal": "Montreal",
    "Rive-Sud de Montréal": "South Shore",
  },
};

// Option labels for bedrooms, bathrooms, etc.
const NumericOptions = ["1", "2", "3", "4", "5"];
const OptionMappings = {
  Room: {
    en: "+ rooms",
    fr: "+ pièces",
  },
  Bedroom: {
    en: "+ bedrooms",
    fr: "+ chambres",
  },
  Bathroom: {
    en: "+ bathrooms",
    fr: "+ salles de bains",
  },
  Car: {
    en: "+ car",
    fr: "+ voiture",
  },
};

const Options = Object.fromEntries(
  Object.entries(OptionMappings).map(([key, translations]) => [
    key,
    {
      en: NumericOptions.map((num) => ({ value: num, text: num + translations.en })),
      fr: NumericOptions.map((num) => ({ value: num, text: num + translations.fr })),
    },
  ])
);

/*************************************************************
 * 7) Shared Cities Data
 *************************************************************/

const SharedCities = {
  "North Shore": [
    "Blainville", "Boisbriand", "Bois-des-Filion", "Charlemagne", "Chomedey", "Deux-Montagnes", "Fabreville", "Gore",
    "Kirkland", "L'Assomption", "L'Épiphanie", "La Plaine", "Lachenaie", "Lafontaine", "Lavaltrie",
    "Laval", "Lorraine", "Le Gardeur", "Mascouche", "Mirabel", "Oka", "Pointe-Calumet", "Repentigny", "Rosemère",
    "Saint-Colomban", "Saint-Eustache", "Saint-Jérôme", "Saint-Joseph-du-Lac", "Saint-Lin/Laurentides", "Saint-Placide",
    "Saint-Sulpice", "Sainte-Anne-des-Plaines", "Sainte-Dorothée", "Sainte-Marthe-sur-le-Lac", "Sainte-Sophie", 
    "Sainte-Thérèse", "Terrebonne",
  ],
  Montreal: [
    "Ahuntsic-Cartierville", "Anjou", "Baie-D'Urfé", "Beaconsfield", "Côte-des-Neiges",
    "Côte-des-Neiges–Notre-Dame-de-Grâce", "Côte-Saint-Luc", "Dollard-des-Ormeaux", "Dorval", "Hampstead", "L'Île-Bizard",
    "L'Île-Bizard–Sainte-Geneviève", "L'Île-Dorval", "LaSalle", "Lachine", "Le Plateau-Mont-Royal", "Le Sud-Ouest", "Mercier",
    "Hochelaga-Maisonneuve", "Mercier–Hochelaga-Maisonneuve", "Mont-Royal", "Montréal", "Montréal-Est", "Montréal-Nord",
    "Montréal-Ouest", "Notre-Dame-de-Grâce", "Outremont", "Pierrefonds-Roxboro", "P.-a.-T.", "Pointe-Claire", "R.-d.-P.",
    "Rivière-des-Prairies", "Pointe-aux-Trembles", "Rivière-des-Prairies–Pointe-aux-Trembles", "Rosemont–La Petite-Patrie", "Rosemont",
    "La Petite-Patrie", "Sainte-Anne-de-Bellevue", "Saint-Laurent", "Saint-Léonard", "Sainte-Geneviève", "Senneville", "Verdun",
    "Île-des-Soeurs", "Ville-Marie", "Westmount", "Villeray–Saint-Michel–Parc-Extension", "Villeray", "Saint-Michel", "Parc-Extension",
  ],
  "South Shore": [
    "Beauharnois", "Beloeil", "Boucherville", "Brossard", "Candiac", "Carignan", "Chambly",
    "Châteauguay", "Contrecœur", "Delson", "Greenfield Park", "Henryville", "Howick", "Kirkland", "La Prairie", "Lacolle",
    "Le Vieux-Longueuil", "Lemoyne", "Léry", "Longueuil", "Marieville", "McMasterville", "Mercier", "Mont-Saint-Hilaire",
    "Montérégie", "Napierville", "Otterburn Park", "Richelieu", "Rougemont", "Saint-Amable", "Saint-Basile-le-Grand",
    "Saint-Blaise-sur-Richelieu", "Saint-Bruno-de-Montarville", "Saint-Constant", "Saint-Étienne-de-Beauharnois",
    "Saint-Hyacinthe", "Saint-Hubert", "Saint-Isidore", "Saint-Jean-sur-Richelieu", "Saint-Lambert", "Saint-Marc-sur-Richelieu",
    "Saint-Mathias-sur-Richelieu", "Saint-Mathieu", "Saint-Mathieu-de-Beloeil", "Saint-Michel", "Saint-Philippe", "Saint-Rémi",
    "Sainte-Catherine", "Sainte-Julie", "Sainte-Martine", "Salaberry-de-Valleyfield", "Sherrington", "Varennes", "Verchères",
  ],
};

/*************************************************************
 * 8) Custom Price Input Controls
 *************************************************************/

// Increment price values - define ONCE globally
function incrementValue(id, step) {
  const input = document.getElementById(id);
  let currentValue;
  
  if (id === "price-max") {
    // If empty, start from the greater of 1000 or the minimum price
    if (input.value === "") {
      const priceMin = parseInt(document.getElementById("price-min").value, 10) || 0;
      currentValue = Math.max(1000, priceMin);
    } else {
      currentValue = parseInt(input.value, 10);
    }
  } else {
    currentValue = input.value === "" ? 0 : parseInt(input.value, 10);
  }
  
  let newValue = currentValue + step;
  
  if (id === "price-min") {
    const priceMax = parseInt(document.getElementById("price-max").value, 10) || 0;
    if (priceMax && newValue > priceMax) {
      newValue = priceMax;
    }
    input.value = newValue;
    document.getElementById("price-max").min = newValue;
  } else if (id === "price-max") {
    const minVal = parseInt(input.min, 10) || 0;
    if (newValue < minVal) {
      newValue = minVal;
    }
    input.value = newValue;
    document.getElementById("price-min").max = newValue;
  }
}

// Decrement price values - define ONCE globally
function decrementValue(id, step) {
  const input = document.getElementById(id);
  let currentValue = input.value === "" ? 0 : parseInt(input.value, 10);
  
  if (id === "price-max") {
    const priceMin = parseInt(document.getElementById("price-min").value, 10) || 0;
    let newValue = currentValue - step;
    if (newValue < priceMin) {
      newValue = priceMin;
    }
    input.value = newValue;
    document.getElementById("price-min").max = newValue;
  } else if (id === "price-min") {
    let newValue = currentValue - step;
    if (newValue < 0) {
      newValue = 0;
    }
    input.value = newValue;
    document.getElementById("price-max").min = newValue;
  }
}

/*************************************************************
 * 9) Airtable Formula Generation
 *************************************************************/

// Single definition merging both occurrences
function generateAirtableFormula(input) {
	const {
		cityName = [],
		category = [],
		houseType = [], // ADDED
		bedrooms = 0,
		bathrooms = 0,
		priceMax = 0,
		priceMin = 0,
		parkingIndoor = "",
		car = 0,
		swimmingPool = "",
	} = input;

	const conditions = [];

	// City filter
	if (cityName.length > 0) {
		const cityConditions = cityName.map((city) => `FIND("${city}", {City})`);
		const cityFormula = cityConditions.length === 1 ? cityConditions[0] : `OR(${cityConditions.join(", ")})`;
		conditions.push(cityFormula);
	}



	// Category filter
	if (category.length > 0) {
		const categoryConditions = category.map((cat) => `{Category} = "${cat}"`);
		const categoryFormula = categoryConditions.length === 1 ? categoryConditions[0] : `OR(${categoryConditions.join(", ")})`;
		conditions.push(categoryFormula);
	}

	// ADDED: House Type filter (optional)
	if (houseType.length > 0) {
		// If your Airtable field is something else, rename {HouseType} below
		const houseTypeConditions = houseType.map((ht) => `FIND("${ht}", {Type})`);
		const houseTypeFormula = houseTypeConditions.length === 1 ? houseTypeConditions[0] : `OR(${houseTypeConditions.join(", ")})`;
		conditions.push(houseTypeFormula);
	}

	// Bedrooms filter
	if (bedrooms > 0) {
		conditions.push(`{Bedrooms} >= ${bedrooms}`);
	}

	// Bathrooms filter
	if (bathrooms > 0) {
		conditions.push(`{Bathrooms} >= ${bathrooms}`);
	}

	// Price range
	if (priceMin > 0) {
		conditions.push(`{Price} >= ${priceMin}`);
	}
	if (priceMax > 0) {
		conditions.push(`{Price} <= ${priceMax}`);
	}

	// Parking
	if (parkingIndoor === "Yes") {
		conditions.push(`{IndoorParking} = "Yes"`);
	}
	if (car > 0) {
		conditions.push(`{CarIndoor} >= ${car}`);
	}

	// Swimming pool
	if (swimmingPool === "Yes") {
		conditions.push(`{SwimmingPool} = "Yes"`);
	}

	return `AND(${conditions.join(", ")})`;
}


/*************************************************************
 * 10) Define the 4 Extensions
 *************************************************************/

/************** EXTENSION #1: PropertySearchExtension **************/
     
const SVG_DOLLAR = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="18px" height="18px">
  <g transform="translate(0, 0)">
    <path fill="#9C27B0" d="M160 0c17.7 0 32 14.3 32 32l0 35.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11l0 33.4c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.9c-.4-.1-.9-.1-1.3-.2l-.2 0s0 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7s0 0 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11L128 32c0-17.7 14.3-32 32-32z"/>
  </g>
</svg>
`;

const SVG_LIST = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
  <path fill="#9C27B0" d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/>
</svg>
`;

const SVG_SLIDER = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
  <path fill="#9C27B0" d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/>
</svg>
`;

const SVG_ADDRESS = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18px" height="18px">
  <path fill="#9C27B0" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
</svg>
`;

const SVG_CHEVRON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
  <!-- Added 50px padding on top and bottom -->
  <g transform="translate(75, 75)">
    <path fill="#9C27B0" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
  </g>
</svg>
`;

const SVG_CHECK = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="12px" height="12px">
  <path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
</svg>
`;

const SVG_HOUSE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="18px" height="18px">
  <path fill="#9C27B0" d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
</svg>
`;

const SVG_USER = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
  <path fill="#9C27B0" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
</svg>
`;

const SVG_USER_TIE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
  <path fill="#9C27B0" d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z"/>
</svg>
`;

const SVG_BUILDING_COLUMNS = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
  <path fill="#9C27B0" d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160l0 8c0 13.3 10.7 24 24 24l400 0c13.3 0 24-10.7 24-24l0-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224l-64 0 0 196.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512l448 0c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1L448 224l-64 0 0 192-40 0 0-192-64 0 0 192-48 0 0-192-64 0 0 192-40 0 0-192zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
</svg>
`;

const SVG_NOTE_STICK = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
  <path fill="#9C27B0" d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l224 0 0-80c0-17.7 14.3-32 32-32l80 0 0-224c0-8.8-7.2-16-16-16L64 80zM288 480L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 224 0 5.5c0 17-6.7 33.3-18.7 45.3l-90.5 90.5c-12 12-28.3 18.7-45.3 18.7l-5.5 0z"/>
</svg>
`;

const SVG_BRIEFCASE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
  <path fill="#9C27B0" d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-128z"/>
</svg>
`;

const SVG_MESSAGE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
  <path fill="#9C27B0" d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"/>
</svg>
`;


/*************************************************************
 * 2) EXTENSION CODE
 *************************************************************/
const PropertySearchExtension = {
  name: "PropertySearch",
  type: "response",
  match: ({ trace }) => trace.type === "ext_property_search" || trace.payload?.name === "ext_property_search",
  render: ({ trace, element }) => {
    const { language } = trace.payload;
    const isEnglish = language === "en";

    // Shared utilities for the extension
    const utilityFunctions = {
      // Close all dropdowns except the one that was clicked
      closeAllOtherDropdowns: function(currentSelectBtn, formContainer) {
        const allSelectBtns = formContainer.querySelectorAll(".select-btn");
        allSelectBtns.forEach((btn) => {
          if (btn !== currentSelectBtn) {
            btn.classList.remove("open");
          }
        });
      },
      
      // Toggle a section open/closed
      toggleSection: function(sectionId, formContainer) {
        const section = formContainer.querySelector(`#${sectionId}`);
        
        // First close all sections
        const allSections = formContainer.querySelectorAll('.collapsible-section');
        allSections.forEach(s => {
          s.classList.remove('expanded');
          s.closest('.section').classList.remove('active');
          const icon = s.closest('.section').querySelector('.collapse-icon');
          if (icon) icon.classList.remove('active');
        });
        
        // Then open the clicked section
        if (section) {
          section.classList.add('expanded');
          section.closest('.section').classList.add('active');
          const icon = section.closest('.section').querySelector('.collapse-icon');
          if (icon) icon.classList.add('active');
        }
      },
      
      // Toggle group collapse (for category/city lists)
      toggleCollapseGroup: function(element) {
        // Find the parent form container
        const formContainer = element.closest('form');
        if (!formContainer) return;
        
        // First close all other group headers and options
        const allGroups = formContainer.querySelectorAll(".group");
        allGroups.forEach(group => {
          const header = group.querySelector(".group-header");
          const options = group.querySelector(".group-options");
          if (header !== element) {
            header.classList.remove("active");
            if (options) options.style.display = "none";
          }
        });
        
        // Then toggle the clicked group
        const groupOptions = element.nextElementSibling;
        if (groupOptions.style.display === "block") {
          groupOptions.style.display = "none";
          element.classList.remove("active");
        } else {
          groupOptions.style.display = "block";
          element.classList.add("active");
          // Scroll to first item for better UX
          const firstItem = groupOptions.firstElementChild;
          if (firstItem) {
            firstItem.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      },
      
      // Set up a multi-select dropdown
      setupMultiSelect: function(formContainer, dropdownId, listSelector, hiddenInputId, defaultText) {
        const container = formContainer.querySelector(`#${dropdownId}`);
        if (!container) return;
        
        const selectBtn = container.querySelector(".select-btn");
        const listEl = container.querySelector(".list-items");
        const btnText = selectBtn.querySelector(".select-btn-holder");
        const hiddenInput = formContainer.querySelector(`#${hiddenInputId}`);

        selectBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.closeAllOtherDropdowns(selectBtn, formContainer);
          selectBtn.classList.toggle("open");
        });

        const updateSelectAllState = (groupEl) => {
          if (!groupEl) return;
          const selectAllItem = groupEl.querySelector(".item.select-all");
          if (!selectAllItem) return;
          const groupItems = groupEl.querySelectorAll(".item:not(.select-all)");
          const allChecked = Array.from(groupItems).every(item => item.classList.contains("checked"));
          if (allChecked) selectAllItem.classList.add("checked");
          else selectAllItem.classList.remove("checked");
        };

        const items = formContainer.querySelectorAll(`${listSelector} .item`);
        items.forEach(item => {
          item.addEventListener("click", (e) => {
            e.stopPropagation();
            if (item.classList.contains("select-all")) {
              const groupOptions = item.parentElement;
              const groupItems = groupOptions.querySelectorAll(".item:not(.select-all)");
              const allSelected = Array.from(groupItems).every(i => i.classList.contains("checked"));
              item.classList.toggle("checked");
              const newState = item.classList.contains("checked");
              groupItems.forEach(ci => {
                if (newState) ci.classList.add("checked");
                else ci.classList.remove("checked");
              });
            } else {
              item.classList.toggle("checked");
              const groupOptions = item.closest(".group-options") || listEl;
              updateSelectAllState(groupOptions);
            }
            const checkedItems = formContainer.querySelectorAll(`${listSelector} .item:not(.select-all).checked`);
            const count = checkedItems.length;
            btnText.innerText = count > 0 ? `${count} ${isEnglish ? "Selected" : "Sélectionné"}` : defaultText;
            const values = Array.from(checkedItems).map(ci => ci.querySelector(".item-text").getAttribute("data-value"));
            hiddenInput.value = values.join(",");
          });
        });
      },
      
      // Set up a single-select dropdown
      setupDropdownSingle: function(formContainer, dropdownId, hiddenInputId) {
        const dropdownContainer = formContainer.querySelector(`#${dropdownId}`);
        if (!dropdownContainer) return;
        
        const selectBtn = dropdownContainer.querySelector(".select-btn");
        const listEl = dropdownContainer.querySelector(".list-items");
        const selectBtnHolder = selectBtn.querySelector(".select-btn-holder");
        const hiddenInput = formContainer.querySelector(`#${hiddenInputId}`);
        const listItems = listEl.querySelectorAll(".item");

        selectBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.closeAllOtherDropdowns(selectBtn, formContainer);
          selectBtn.classList.toggle("open");
        });

        listItems.forEach(item => {
          item.addEventListener("click", (e) => {
            e.stopPropagation();
            listItems.forEach(i => i.classList.remove("checked"));
            item.classList.add("checked");
            const labelText = item.querySelector(".item-text").innerText;
            const value = item.querySelector(".item-text").getAttribute("data-value");
            selectBtnHolder.innerText = labelText;
            hiddenInput.value = value;
            
            // Close the dropdown after selection
            selectBtn.classList.remove("open");
          });
        });
      },
      
      // Set up price increment/decrement buttons
      setupPriceControls: function(formContainer) {
        formContainer.querySelectorAll('.price-up, .price-down').forEach(button => {
          button.addEventListener('click', function() {
            const inputId = this.getAttribute('data-input');
            const step = parseInt(this.getAttribute('data-step'), 10);
            const input = formContainer.querySelector(`#${inputId}`);
            if (!input) return;
            
            if (this.classList.contains('price-up')) {
              let currentValue;
              if (inputId === "price-max") {
                if (input.value === "") {
                  const priceMin = parseInt(formContainer.querySelector("#price-min").value, 10) || 0;
                  currentValue = Math.max(1000, priceMin);
                } else {
                  currentValue = parseInt(input.value, 10);
                }
              } else {
                currentValue = input.value === "" ? 0 : parseInt(input.value, 10);
              }
              
              let newValue = currentValue + step;
              if (inputId === "price-min") {
                const priceMax = parseInt(formContainer.querySelector("#price-max").value, 10) || 0;
                if (priceMax && newValue > priceMax) {
                  newValue = priceMax;
                }
                input.value = newValue;
                formContainer.querySelector("#price-max").min = newValue;
              } else if (inputId === "price-max") {
                const minVal = parseInt(input.min, 10) || 0;
                if (newValue < minVal) {
                  newValue = minVal;
                }
                input.value = newValue;
                formContainer.querySelector("#price-min").max = newValue;
              }
            } else {
              let currentValue = input.value === "" ? 0 : parseInt(input.value, 10);
              if (inputId === "price-max") {
                const priceMin = parseInt(formContainer.querySelector("#price-min").value, 10) || 0;
                let newValue = currentValue - step;
                if (newValue < priceMin) {
                  newValue = priceMin;
                }
                input.value = newValue;
                formContainer.querySelector("#price-min").max = newValue;
              } else if (inputId === "price-min") {
                let newValue = currentValue - step;
                if (newValue < 0) {
                  newValue = 0;
                }
                input.value = newValue;
                formContainer.querySelector("#price-max").min = newValue;
              }
            }
          });
        });
      }
    };

    // Text labels
    const texts = {
      cityLabel: isEnglish ? "Select City" : "Sélectionnez la ville",
      cityDefault: isEnglish ? "-- Select --" : "-- Sélectionnez --",
      categoryLabel: isEnglish ? "Property Category" : "Catégorie de propriété",
      categoryDefault: isEnglish ? "-- Select --" : "-- Sélectionnez --",
      typeLabel: isEnglish ? "Property Type" : "Type de propriété",
      typeDefault: isEnglish ? "-- Select --" : "-- Sélectionnez --",
      roomsLabel: isEnglish ? "Rooms" : "Nombre de pièces",
      optionDefault: isEnglish ? "Select" : "-- Sélectionnez --",
      bedroomsLabel: isEnglish ? "Bedrooms" : "Chambres",
      bathroomsLabel: isEnglish ? "Bathrooms" : "Salles de bains",
      priceMinLabel: isEnglish ? "Minimum Budget" : "Budget minimum",
      priceMinPlaceholder: isEnglish ? "Enter minimum budget" : "Entrez le budget minimum",
      priceMaxLabel: isEnglish ? "Maximum Budget" : "Budget maximum",
      priceMaxPlaceholder: isEnglish ? "Enter maximum budget" : "Entrez le budget maximum",
      garageLabel: isEnglish ? "Garage" : "Garage",
      carsLabel: isEnglish ? "Garage Capacity" : "Capacité du garage",
      poolLabel: isEnglish ? "Swimming Pool" : "Piscine",
      submitBtn: isEnglish ? "Search Properties" : "Rechercher",
    };

    // Prepare dropdown data (unchanged)
    const Cities = Object.fromEntries(
      Object.entries(CityMappings[language]).map(([label, sharedKey]) => [
        label,
        SharedCities[sharedKey],
      ])
    );
    const PropertyTypes = Object.fromEntries(
      Object.entries(PropertyTypeMappings[language]).map(([label, sharedKey]) => [
        label,
        SharedPropertyCategories[sharedKey][language],
      ])
    );
    const propertyCategories = Object.fromEntries(
      Object.entries(SharedPropertyCategories).map(([group, translations]) => [
        group,
        translations[language],
      ])
    );

    const RoomOptions = Options.Room[language];
    const BedroomOptions = Options.Bedroom[language];
    const BathroomOptions = Options.Bathroom[language];
    const CarOptions = Options.Car[language];
    const HouseTypeList = SharedPropertyTypes[language];

    // Build city, category, type HTML
    function buildGroupedCityHTML(cityData) {
      return Object.entries(cityData)
        .map(([areaName, cityList]) => {
          const itemsHTML = cityList
            .map(city => `
                <li class="item">
                  <span class="checkbox">${SVG_CHECK}</span>
                  <span class="item-text" data-value="${city}">${city}</span>
                </li>
              `)
            .join("");
          return `
                <li class="group">
                    <div class="group-header" onclick="propertySearchToggleCollapse(this)">
                        ${areaName}
                        <span class="collapse-icon">${SVG_CHEVRON}</span>
                    </div>
                    <ul class="group-options">
                        <li class="item select-all">
                            <span class="checkbox">${SVG_CHECK}</span>
                            <span class="item-text">${isEnglish ? "Select All" : "Tout sélectionner"}</span>
                        </li>
                        ${itemsHTML}
                    </ul>
                </li>
              `;
        })
        .join("");
    }

    function buildGroupedCategoryHTML(categoryData) {
      return Object.entries(categoryData)
        .map(([groupName, catList]) => {
          const itemsHTML = catList
            .map(cat => `
                <li class="item">
                  <span class="checkbox">${SVG_CHECK}</span>
                  <span class="item-text" data-value="${cat}">${cat}</span>
                </li>
              `)
            .join("");
          return `
                <li class="group">
                    <div class="group-header" onclick="propertySearchToggleCollapse(this)">
                        ${groupName}
                        <span class="collapse-icon">${SVG_CHEVRON}</span>
                    </div>
                    <ul class="group-options">
                        <li class="item select-all">
                            <span class="checkbox">${SVG_CHECK}</span>
                            <span class="item-text">${isEnglish ? "Select All" : "Tout sélectionner"}</span>
                        </li>
                        ${itemsHTML}
                    </ul>
                </li>
              `;
        })
        .join("");
    }

    function buildPropertyTypeHTML(typeList) {
      return `
            <li class="item select-all">
                <span class="checkbox">${SVG_CHECK}</span>
                <span class="item-text">${isEnglish ? "Select All" : "Tout sélectionner"}</span>
            </li>
            ${typeList
              .map(type => `
                  <li class="item">
                      <span class="checkbox">${SVG_CHECK}</span>
                      <span class="item-text" data-value="${type}">${type}</span>
                  </li>
                `)
              .join("")}
          `;
    }

    // Create the form container
    const formContainer = document.createElement("form");
    formContainer.setAttribute("id", "property-search-form");
    formContainer.innerHTML = `
      <style>        
        /* Base Form Styles */
        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 16px;
          border-radius: 6px;
        }

        .flex-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .flex-row > div {
          flex: 1;
          min-width: 200px;
        }

        .bold-label {
          font-weight: 700;
          color: #000;
          font-size: 14px;
          margin-bottom: 4px;
          display: block;
        }

        /* Input Styles */
        input[type="text"],
        input[type="number"] {
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          padding: 8px;
          background: #fff;
          font-size: 13px;
          outline: none;
          box-sizing: border-box;
          height: 40px;
        }

        input[type="text"]:focus,
        input[type="number"]:focus {
          border: 2px solid #9C27B0;
        }

        /* Remove spinner from number inputs */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }

        /* Submit Button */
        .submit {
          color: #9C27B0;
          background-color: #F8EAFA;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 8px;
          transition: background-color 0.2s, color 0.2s, font-weight 0.2s;
        }

        .submit:hover {
          color: #fff;
          background-color: #9C27B0;
          font-weight: 700;
        }

        .submit:disabled {
          background-color: #ccc;
          color: #666;
          cursor: not-allowed;
          font-weight: 700;
        }

        /* Custom Dropdown */
        .dropdown-container {
          position: relative;
          max-width: 100%;
        }

        .select-btn {
          display: flex;
          height: 40px;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          border-radius: 6px;
          cursor: pointer;
          background-color: #fff;
          border: 1px solid rgba(0, 0, 0, 0.2);
          transition: border 0.2s;
        }

        .select-btn .btn-text {
          font-size: 13px;
          font-weight: 400;
          color: #555;
        }

        .select-btn-holder {
          color: #777;
          font-size: 13px;
        }

        .select-btn .arrow-dwn {
          display: flex;
          height: 24px;
          width: 24px;
          color: #9C27B0;
          font-size: 13px;
          border-radius: 50%;
          background: #F8EAFA;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s;
        }

        .select-btn.open .arrow-dwn {
          transform: rotate(-180deg);
        }

        .select-btn:focus,
        .select-btn.open {
          border: 2px solid #9C27B0;
        }

        /* Dropdown List */
        .list-items {
          position: relative;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 4px;
          border-radius: 6px;
          padding: 4px 0;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
          display: none;
          max-height: 200px;
          overflow-y: auto;
          z-index: 100;
          background-color: #fff;
        }

        .select-btn.open + .list-items {
          display: block;
        }

        .list-items .item {
          display: flex;
          align-items: center;
          height: 36px;
          cursor: pointer;
          padding: 0 12px;
          border-radius: 4px;
          transition: background-color 0.3s;
          margin: 4px;
        }

        .list-items .item:hover {
          background-color: #F8EAFA;
        }

        .item .item-text {
          font-size: 13px;
          font-weight: 400;
          color: #333;
          margin-left: 8px;
        }

        /* Checkbox Styles */
        .list-items.multi-select .item .checkbox,
        .list-items.single-select .item .checkbox {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 16px;
          width: 16px;
          margin-right: 8px;
          border: 1.5px solid #c0c0c0;
          transition: all 0.3s ease-in-out;
        }

        .list-items.multi-select .item .checkbox {
          border-radius: 4px;
        }

        .list-items.single-select .item .checkbox {
          border-radius: 50%;
        }

        .item.checked .checkbox {
          background-color: #9C27B0;
          border: 2px solid #9C27B0;
        }

        .checkbox .check-icon {
          color: #fff;
          font-size: 12px;
          transform: scale(0);
          transition: all 0.2s ease-in-out;
        }

        .item.checked .check-icon {
          transform: scale(1);
        }

        /* Checkbox SVG fill states */
        .list-items .item:not(.checked) .checkbox svg path {
          fill: transparent !important;
        }

        .list-items .item:not(.checked):hover .checkbox svg path {
          fill: #9C27B0 !important;
        }

        .list-items .item.checked .checkbox svg path {
          fill: #ffffff !important;
        }

        /* Standard checkbox */
        input[type="checkbox"] {
          accent-color: #9C27B0;
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        /* Group Styles */
        .group {
          border-top: 1px solid #eee;
          margin-bottom: 10px;
          margin-left: 10px;
          margin-right: 10px;
          border-radius: 4px;
          overflow: hidden;
        }

        .group:first-child {
          border-top: none;
        }

        .group-header {
          font-weight: 500;
          padding: 8px 12px;
          background: #F8EAFA;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #9C27B0;
        }

        .group-header .collapse-icon {
          color: #9C27B0;
          font-size: 13px;
          transition: transform 0.3s;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-right: 8px;
        }

        .group-header.active .collapse-icon {
          transform: rotate(-180deg);
        }

        .group-options {
          display: none;
          padding-left: 0;
        }

        /* Price Input */
        .price-wrapper {
          position: relative;
          width: 100%;
        }

        .price-controls {
          position: absolute;
          right: 0;
          top: 1px;
          bottom: 1px;
          width: 20px;
          display: flex;
          flex-direction: column;
          background-color: #F8EAFA;
          border-left: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 0 4px 4px 0;
          overflow: hidden;
        }

        .price-up,
        .price-down {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9C27B0;
          cursor: pointer;
          font-size: 8px;
          transition: background-color 0.2s, color 0.2s;
        }

        .price-up:hover,
        .price-down:hover {
          background-color: #9C27B0;
          color: #fff;
        }

        /* Section Cards */
        .section {
          border: 1px solid #eee;
          border-radius: 6px;
          margin-bottom: 0;
          overflow: hidden;
          background: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .section-card {
          padding: 10px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          border-radius: 6px;
        }

        .section.active {
          border-color: #9C27B0;
          box-shadow: 0 3px 8px rgba(154, 13, 242, 0.1);
        }

        .section:hover:not(.disabled) {
          border-color: #9C27B0;
          box-shadow: 0 3px 8px rgba(154, 13, 242, 0.1);
        }

        .section-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-icon {
          background-color: #F8EAFA;
          color: #9C27B0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-title {
          font-weight: 700;
          font-size: 14px;
          color: #444;
        }

        /* Collapse Icon */
        .collapse-icon {
          color: #9C27B0;
          font-size: 13px;
          transition: transform 0.3s;
          background: #F8EAFA;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-right: 0;
        }

        .collapse-icon i {
          transition: transform 0.3s ease;
        }

        .collapse-icon.active i {
          transform: rotate(180deg);
        }

        /* Collapsible Section */
        .collapsible-section {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease-out;
        }

        .collapsible-section.expanded {
          max-height: 1000px;
        }

        .section-content {
          padding: 20px;
          background: #fefefe;
          border-top: 1px solid #eee;
        }

        /* Inline Fields */
        .inline-field {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        /* Disabled States */
        input:disabled,
        select:disabled,
        textarea:disabled,
        button:disabled,
        .select-btn.disabled,
        .disabled .select-btn,
        .section.disabled,
        .section.disabled * {
          cursor: not-allowed;
        }

        .section.disabled,
        .section.disabled * {
          pointer-events: auto;
        }
      </style>

      <!-- Row 1: Location & Category and Budget -->
      <div class="flex-row">
        <!-- Location & Category -->
        <div class="section" style="flex: 1;">
          <div class="section-card" data-target="section-location-category">
            <div class="section-info">
              <div class="section-icon">${SVG_ADDRESS}</div>
              <div>
                <div class="section-title">${isEnglish ? "Location & Category" : "Emplacement & Catégorie"}</div>
              </div>
            </div>
            <div class="collapse-icon">${SVG_CHEVRON}</div>
          </div>
          <div class="collapsible-section" id="section-location-category">
            <div class="section-content">
              <div class="flex-row">
                <div>
                  <label for="city" class="bold-label">${texts.cityLabel}</label>
                  <div class="dropdown-container" id="dropdown-city">
                    <div class="select-btn" tabindex="0">
                      <span class="select-btn-holder">${texts.cityDefault}</span>
                      <span class="arrow-dwn">${SVG_CHEVRON}</span>
                    </div>
                    <ul class="list-items multi-select" id="cityList"></ul>
                  </div>
                </div>
                <input type="hidden" id="cityValues" />
                <div>
                  <label for="property-category" class="bold-label">${texts.categoryLabel}</label>
                  <div class="dropdown-container" id="dropdown-property-category">
                    <div class="select-btn" tabindex="0">
                      <span class="select-btn-holder">${texts.categoryDefault}</span>
                      <span class="arrow-dwn">${SVG_CHEVRON}</span>
                    </div>
                    <ul class="list-items multi-select" id="propertyCategoryList"></ul>
                  </div>
                </div>
                <input type="hidden" id="propertyCategoryValues" />
                <div>
                  <label for="property-type" class="bold-label">${texts.typeLabel}</label>
                  <div class="dropdown-container" id="dropdown-property-type">
                    <div class="select-btn" tabindex="0">
                      <span class="select-btn-holder">${texts.typeDefault}</span>
                      <span class="arrow-dwn">${SVG_CHEVRON}</span>
                    </div>
                    <ul class="list-items multi-select" id="propertyTypeList"></ul>
                  </div>
                </div>
                <input type="hidden" id="propertyTypeValues" />
              </div>
            </div>
          </div>
        </div>

        <!-- Budget -->
        <div class="section" style="flex: 1;">
          <div class="section-card" data-target="section-budget">
            <div class="section-info">
              <div class="section-icon">${SVG_DOLLAR}</div>
              <div>
                <div class="section-title">${isEnglish ? "Price Range" : "Plage de Prix"}</div>
              </div>
            </div>
            <div class="collapse-icon">${SVG_CHEVRON}</div>
          </div>
          <div class="collapsible-section" id="section-budget">
            <div class="section-content">
              <div class="flex-row">
                <div>
                  <label class="bold-label" for="price-min">${texts.priceMinLabel}</label>
                  <div class="price-wrapper">
                    <input type="number" id="price-min" placeholder="${texts.priceMinPlaceholder}" step="1000" min="0" />
                    <div class="price-controls">
                      <div class="price-up" data-input="price-min" data-step="1000">▲</div>
                      <div class="price-down" data-input="price-min" data-step="1000">▼</div>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="bold-label" for="price-max">${texts.priceMaxLabel}</label>
                  <div class="price-wrapper">
                    <input type="number" id="price-max" placeholder="${texts.priceMaxPlaceholder}" step="1000" min="0" />
                    <div class="price-controls">
                      <div class="price-up" data-input="price-max" data-step="1000">▲</div>
                      <div class="price-down" data-input="price-max" data-step="1000">▼</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 2: Property Specifications and Amenities -->
      <div class="flex-row">
        <!-- Property Specifications -->
        <div class="section" style="flex: 1;">
          <div class="section-card" data-target="section-specifications">
            <div class="section-info">
              <div class="section-icon">${SVG_LIST}</div>
              <div>
                <div class="section-title">${isEnglish ? "Property Specifications" : "Caractéristiques de la Propriété"}</div>
              </div>
            </div>
            <div class="collapse-icon">${SVG_CHEVRON}</div>
          </div>
          <div class="collapsible-section" id="section-specifications">
            <div class="section-content">
              <div class="flex-row">
                <div>
                  <label class="bold-label" for="rooms-number">${texts.roomsLabel}</label>
                  <div class="dropdown-container" id="dropdown-rooms-number">
                    <div class="select-btn" tabindex="0">
                      <span class="select-btn-holder">${texts.optionDefault}</span>
                      <span class="arrow-dwn">${SVG_CHEVRON}</span>
                    </div>
                    <ul class="list-items single-select">
                      ${RoomOptions.map(opt => `
                        <li class="item">
                          <span class="checkbox">${SVG_CHECK}</span>
                          <span class="item-text" data-value="${opt.value}">${opt.text}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                  <input type="hidden" id="rooms-number" name="rooms-number" required>
                </div>
                <div>
                  <label class="bold-label" for="bedrooms-number">${texts.bedroomsLabel}</label>
                  <div class="dropdown-container" id="dropdown-bedrooms-number">
                    <div class="select-btn" tabindex="0">
                      <span class="select-btn-holder">${texts.optionDefault}</span>
                      <span class="arrow-dwn">${SVG_CHEVRON}</span>
                    </div>
                    <ul class="list-items single-select">
                      ${BedroomOptions.map(opt => `
                        <li class="item">
                          <span class="checkbox">${SVG_CHECK}</span>
                          <span class="item-text" data-value="${opt.value}">${opt.text}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                  <input type="hidden" id="bedrooms-number" name="bedrooms-number" required>
                </div>
                <div>
                  <label class="bold-label" for="bathrooms-number">${texts.bathroomsLabel}</label>
                  <div class="dropdown-container" id="dropdown-bathrooms-number">
                    <div class="select-btn" tabindex="0">
                      <span class="select-btn-holder">${texts.optionDefault}</span>
                      <span class="arrow-dwn">${SVG_CHEVRON}</span>
                    </div>
                    <ul class="list-items single-select">
                      ${BathroomOptions.map(opt => `
                        <li class="item">
                          <span class="checkbox">${SVG_CHECK}</span>
                          <span class="item-text" data-value="${opt.value}">${opt.text}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                  <input type="hidden" id="bathrooms-number" name="bathrooms-number" required>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Amenities -->
        <div class="section" style="flex: 1;">
          <div class="section-card" data-target="section-amenities">
            <div class="section-info">
              <div class="section-icon">${SVG_SLIDER}</div>
              <div>
                <div class="section-title">${isEnglish ? "Additional Features" : "Caractéristiques Supplémentaires"}</div>
              </div>
            </div>
            <div class="collapse-icon">${SVG_CHEVRON}</div>
          </div>
          <div class="collapsible-section" id="section-amenities">
            <div class="section-content">
              <div class="flex-row" style="align-items: flex-start;">
                <div style="position: relative;">
                  <div class="inline-field">
                    <label for="garage" class="bold-label">${texts.garageLabel}</label>
                    <input type="checkbox" id="garage" name="garage" value="Yes">
                  </div>
                  <div id="cars-container" style="display:none; margin-top: 10px;">
                    <label class="bold-label" for="cars-number">${texts.carsLabel}</label>
                    <div class="dropdown-container" id="dropdown-cars-number">
                      <div class="select-btn" tabindex="0">
                        <span class="select-btn-holder">${texts.optionDefault}</span>
                        <span class="arrow-dwn">${SVG_CHEVRON}</span>
                      </div>
                      <ul class="list-items single-select">
                        ${CarOptions.map(opt => `
                          <li class="item">
                            <span class="checkbox">${SVG_CHECK}</span>
                            <span class="item-text" data-value="${opt.value}">${opt.text}</span>
                          </li>
                        `).join('')}
                      </ul>
                    </div>
                    <input type="hidden" id="cars-number" name="cars-number">
                  </div>
                </div>
                <div class="inline-field" style="align-self: flex-start;">
                  <label for="swimming-pool" class="bold-label">${texts.poolLabel}</label>
                  <input type="checkbox" id="swimming-pool" name="swimming-pool" value="Yes">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit">${texts.submitBtn}</button>
    `;

    // Attach the form to the DOM
    element.appendChild(formContainer);

    // Create a global function for the toggleCollapse action
    window.propertySearchToggleCollapse = function(element) {
      utilityFunctions.toggleCollapseGroup(element);
    };

    // 1) Populate the dropdowns
    const cityListEl = formContainer.querySelector("#cityList");
    const categoryListEl = formContainer.querySelector("#propertyCategoryList");
    const propertyTypeListEl = formContainer.querySelector("#propertyTypeList");

    cityListEl.innerHTML = buildGroupedCityHTML(Cities);
    categoryListEl.innerHTML = buildGroupedCategoryHTML(propertyCategories);
    propertyTypeListEl.innerHTML = buildPropertyTypeHTML(HouseTypeList);

    // 2) Set up section toggles
    formContainer.querySelectorAll('.section-card').forEach(card => {
      card.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!this.closest('.section').classList.contains('disabled')) {
          const targetId = this.getAttribute('data-target');
          utilityFunctions.toggleSection(targetId, formContainer);
        }
      });
    });

    // 3) Set up dropdowns
    // Multi-select dropdowns
    utilityFunctions.setupMultiSelect(formContainer, "dropdown-city", "#cityList", "cityValues", texts.cityDefault);
    utilityFunctions.setupMultiSelect(formContainer, "dropdown-property-category", "#propertyCategoryList", "propertyCategoryValues", texts.categoryDefault);
    utilityFunctions.setupMultiSelect(formContainer, "dropdown-property-type", "#propertyTypeList", "propertyTypeValues", texts.typeDefault);

    // Single-select dropdowns
    utilityFunctions.setupDropdownSingle(formContainer, "dropdown-rooms-number", "rooms-number");
    utilityFunctions.setupDropdownSingle(formContainer, "dropdown-bedrooms-number", "bedrooms-number");
    utilityFunctions.setupDropdownSingle(formContainer, "dropdown-bathrooms-number", "bathrooms-number");
    utilityFunctions.setupDropdownSingle(formContainer, "dropdown-cars-number", "cars-number");

    // 4) Price controls
    utilityFunctions.setupPriceControls(formContainer);

    // 5) Toggle car dropdown based on garage checkbox
    const garageCheckbox = formContainer.querySelector("#garage");
    const carsContainer = formContainer.querySelector("#cars-container");
    garageCheckbox.addEventListener("change", function() {
      if (this.checked) {
        carsContainer.style.display = "block";
      } else {
        carsContainer.style.display = "none";
        formContainer.querySelector("#cars-number").value = "";
        formContainer.querySelector("#dropdown-cars-number .select-btn-holder").innerText = texts.optionDefault;
        formContainer.querySelectorAll("#dropdown-cars-number .list-items .item").forEach(item => {
          item.classList.remove("checked");
        });
      }
    });

    // 6) Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      // Close all select buttons when clicking outside any dropdown
      const allDropdowns = formContainer.querySelectorAll(".dropdown-container");
      let clickedInsideDropdown = false;
      
      allDropdowns.forEach(dropdown => {
        if (dropdown.contains(e.target)) {
          clickedInsideDropdown = true;
        }
      });
      
      if (!clickedInsideDropdown) {
        formContainer.querySelectorAll(".select-btn").forEach(btn => {
          btn.classList.remove("open");
        });
      }
    });

    // 7) Form submission
    formContainer.addEventListener("submit", (event) => {
      event.preventDefault();
      
      // Collapse all sections
      const allSections = formContainer.querySelectorAll(".collapsible-section");
      allSections.forEach(section => {
        section.classList.remove("expanded");
        const sectionCard = section.previousElementSibling;
        if (sectionCard) {
          sectionCard.classList.remove("active");
          const collapseIcon = sectionCard.querySelector(".collapse-icon");
          if (collapseIcon) collapseIcon.classList.remove("active");
        }
      });
      
      // Disable all form elements
      const formEls = formContainer.querySelectorAll("input, textarea, button, .select-btn");
      formEls.forEach(el => {
        el.disabled = true;
        el.classList.add("disabled");
      });
      
      // Disable all sections
      const allSectionCards = formContainer.querySelectorAll(".section");
      allSectionCards.forEach(section => {
        section.classList.add("disabled");
      });
      
      // Update submit button text
      const submitBtn = formContainer.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = isEnglish ? "Processing..." : "Traitement...";
        submitBtn.style.backgroundColor = "#4CAF50";
        submitBtn.style.color = "white";
      }
      
      // Gather form data
      const cityValues = formContainer.querySelector("#cityValues").value.trim();
      const propertyCategoryValues = formContainer.querySelector("#propertyCategoryValues").value.trim();
      const propertyTypeValues = formContainer.querySelector("#propertyTypeValues").value.trim();

      let roomsNumber = parseInt(formContainer.querySelector("#rooms-number").value, 10);
      if (isNaN(roomsNumber)) { roomsNumber = 0; }
      roomsNumber = Math.max(0, Math.min(roomsNumber, 50));

      const bedroomsNumber = parseInt(formContainer.querySelector("#bedrooms-number").value || 0, 10);
      const bathroomsNumber = parseInt(formContainer.querySelector("#bathrooms-number").value || 0, 10);
      const priceMin = parseInt(formContainer.querySelector("#price-min").value || 0, 10);
      const priceMax = parseInt(formContainer.querySelector("#price-max").value || 0, 10);
      const indoorParking = formContainer.querySelector("#garage").checked ? "Yes" : "No";
      const indoorParkingCars = indoorParking === "Yes"
        ? parseInt(formContainer.querySelector("#cars-number").value || 0, 10)
        : 0;
      const swimmingPool = formContainer.querySelector("#swimming-pool").checked ? "Yes" : "No";

      const selectedCities = cityValues ? cityValues.split(",") : [];
      const selectedPropertyCategories = propertyCategoryValues ? propertyCategoryValues.split(",") : [];
      const selectedHouseTypes = propertyTypeValues ? propertyTypeValues.split(",") : [];

      const payload = {
        cityName: selectedCities,
        category: selectedPropertyCategories,
        houseType: selectedHouseTypes,
        rooms: roomsNumber,
        bedrooms: bedroomsNumber,
        bathrooms: bathroomsNumber,
        priceMin: priceMin,
        priceMax: priceMax,
        parkingIndoor: indoorParking,
        car: indoorParkingCars,
        swimmingPool: swimmingPool,
      };

      const airtableFormula = generateAirtableFormula(payload);
      window.voiceflow.chat.interact({
        type: "complete",
        payload: { formula: airtableFormula },
      });
    });

  },
};

// Register the function for toggleCollapse for use from HTML
window.propertySearchToggleCollapse = function(element) {
  // Find the parent form container
  const formContainer = element.closest('form');
  if (!formContainer) return;
  
  // First close all other group headers and options
  const allGroups = formContainer.querySelectorAll(".group");
  allGroups.forEach(group => {
    const header = group.querySelector(".group-header");
    const options = group.querySelector(".group-options");
    if (header !== element) {
      header.classList.remove("active");
      if (options) options.style.display = "none";
    }
  });
  
  // Then toggle the clicked group
  const groupOptions = element.nextElementSibling;
  if (groupOptions.style.display === "block") {
    groupOptions.style.display = "none";
    element.classList.remove("active");
  } else {
    groupOptions.style.display = "block";
    element.classList.add("active");
    // Scroll to first item for better UX
    const firstItem = groupOptions.firstElementChild;
    if (firstItem) {
      firstItem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};
/************** EXTENSION #2: SellingExtension **************/
const SellingExtension = {
  name: "Forms",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_selling" || trace.payload?.name === "ext_selling",
  render: ({ trace, element }) => {
    /*************************************************************
     * 1) Language Setup
     *************************************************************/
    const { language } = trace.payload;
    const isEnglish = language === "en";

    /*************************************************************
     * 2) Helper: close all other dropdowns
     *************************************************************/
    function closeAllOtherDropdowns(currentSelectBtn) {
      const allSelectBtns = formContainer.querySelectorAll(".select-btn");
      allSelectBtns.forEach((btn) => {
        if (btn !== currentSelectBtn) {
          btn.classList.remove("open");
        }
      });
    }

    /*************************************************************
     * 3) Group Collapse for property categories
     *************************************************************/
    function toggleCollapse(element, container) {
      const groups = container.querySelectorAll(".group");
      groups.forEach((group) => {
        const header = group.querySelector(".group-header");
        const options = group.querySelector(".group-options");
        if (header !== element) {
          header.classList.remove("active");
          options.style.display = "none";
        }
      });

      const groupOptions = element.nextElementSibling;
      if (groupOptions.style.display === "block") {
        groupOptions.style.display = "none";
        element.classList.remove("active");
      } else {
        groupOptions.style.display = "block";
        element.classList.add("active");
        const firstItem = groupOptions.firstElementChild;
        if (firstItem) {
          firstItem.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }

    /*************************************************************
     * 4) Section Toggle for .section-card
     *************************************************************/
    function toggleSection(sectionId, container) {
      const section = container.querySelector(`#${sectionId}`);
      const sectionParent = section.closest(".section");
      const collapseIcon = sectionParent.querySelector(".collapse-icon");
      const wasExpanded = section.classList.contains("expanded");

      const allSections = container.querySelectorAll(".collapsible-section");
      const allIcons = container.querySelectorAll(".collapse-icon");
      const allSectionParents = container.querySelectorAll(".section");

      allSections.forEach((sec) => sec.classList.remove("expanded"));
      allIcons.forEach((icon) => icon.classList.remove("active"));
      allSectionParents.forEach((parent) => parent.classList.remove("active"));

      if (!wasExpanded) {
        section.classList.add("expanded");
        collapseIcon.classList.add("active");
        sectionParent.classList.add("active");
      }
    }

    /*************************************************************
     * 5) Build grouped HTML for property category
     *************************************************************/
    const propertyCategories = Object.fromEntries(
      Object.entries(PropertyTypeMappings[language]).map(([label, sharedKey]) => [
        label,
        SharedPropertyCategories[sharedKey][language],
      ])
    );
    const houseTypes = SharedPropertyTypes[language];

    function buildGroupedCategoryHTML() {
      const groupLabels = Object.keys(propertyCategories);
      return groupLabels
        .map((groupName) => {
          const subItems = propertyCategories[groupName] || [];
          const subItemsHTML = subItems
            .map(
              (subItem) => `
                <li class="item">
                  <span class="checkbox">
                    <!-- Using SVG_CHECK for the check icon -->
                    ${SVG_CHECK}
                  </span>
                  <span class="item-text" data-value="${subItem}">${subItem}</span>
                </li>
              `
            )
            .join("");
          return `
            <li class="group">
              <div class="group-header">
                ${groupName}
                <span class="collapse-icon">
                  <!-- Using SVG_CHEVRON for the chevron arrow -->
                  ${SVG_CHEVRON}
                </span>
              </div>
              <ul class="group-options">
                ${subItemsHTML}
              </ul>
            </li>
          `;
        })
        .join("");
    }

    /*************************************************************
     * 6) Build the Form
     *************************************************************/
    const formContainer = document.createElement("form");
    formContainer.innerHTML = `
      <style>
/* Variables for consistent theming */
/* Base Form Styles */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  border-radius: 6px;
}

.flex-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.flex-row > div {
  flex: 1;
  min-width: 200px;
}

.bold-label {
  font-weight: 700;
  color: #000;
  font-size: 14px;
  margin-bottom: 4px;
  display: block;
}

/* Input Styles */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"],
textarea {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 8px;
  background: #fff;
  font-size: 13px;
  outline: none;
  box-sizing: border-box;
  height: 40px;
}

/* Specific styling for details textarea */
#details {
  width: 100%;
  resize: vertical;
  min-height: 120px;
  max-height: 300px;
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 13px;
  box-sizing: border-box;
  height: auto !important; /* Override the default height */
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
input[type="number"]:focus,
select:focus,
#details:focus {
  border: 2px solid #9C27B0;
}

/* Remove spinner from number inputs */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Submit Button */
.submit {
  color: #9C27B0;
  background-color: #F8EAFA;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.2s, color 0.2s, font-weight 0.2s;
}

.submit:hover {
  color: #fff;
  background-color: #9C27B0;
  font-weight: 700;
}

.submit:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
  font-weight: 700;
}

/* Custom Dropdown */
.dropdown-container {
  position: relative;
  max-width: 100%;
}

.select-btn {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-radius: 6px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: border 0.2s;
}

.select-btn .btn-text {
  font-size: 13px;
  font-weight: 400;
  color: #555;
}

.select-btn-holder {
  color: #777;
  font-size: 13px;
}

.select-btn .arrow-dwn {
  display: flex;
  height: 24px;
  width: 24px;
  color: #9C27B0;
  font-size: 13px;
  border-radius: 50%;
  background: #F8EAFA;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}

.select-btn.open .arrow-dwn {
  transform: rotate(-180deg);
}

.select-btn:focus,
.select-btn.open {
  border: 2px solid #9C27B0;
}

/* Dropdown List */
.list-items {
  position: relative;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  border-radius: 6px;
  padding: 4px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  display: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  background-color: #fff;
}

.select-btn.open + .list-items {
  display: block;
}

.list-items .item {
  display: flex;
  align-items: center;
  height: 36px;
  cursor: pointer;
  padding: 0 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin: 4px;
}

.list-items .item:hover {
  background-color: #F8EAFA;
}

.item .item-text {
  font-size: 13px;
  font-weight: 400;
  color: #333;
  margin-left: 8px;
}

/* Checkbox Styles */
/* Circle for single selection */
.item .checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  margin-right: 8px;
  border: 1.5px solid #c0c0c0;
  transition: all 0.3s ease-in-out;
}

.item.checked .checkbox {
  background-color: #9C27B0;
  border: 2px solid #9C27B0;
}

.checkbox .check-icon {
  color: #fff;
  font-size: 12px;
  transform: scale(0);
  transition: all 0.2s ease-in-out;
}

.item.checked .check-icon {
  transform: scale(1);
}

/* Checkbox SVG fill states */
.list-items .item:not(.checked) .checkbox svg path {
  fill: transparent !important;
}

.list-items .item:not(.checked):hover .checkbox svg path {
  fill: #9C27B0 !important;
}

.list-items .item.checked .checkbox svg path {
  fill: #ffffff !important;
}

/* Standard checkbox */
input[type="checkbox"] {
  accent-color: #9C27B0;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* Group Styles */
.group {
  border-top: 1px solid #eee;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 4px;
  overflow: hidden;
}

.group:first-child {
  border-top: none;
}

.group-header {
  font-weight: 500;
  padding: 8px 12px;
  background: #F8EAFA;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #9C27B0;
}

.group-header .collapse-icon {
  color: #9C27B0;
  font-size: 13px;
  transition: transform 0.3s;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
}

.group-header.active .collapse-icon {
  transform: rotate(-180deg);
}

.group-options {
  display: none;
  padding-left: 0;
}

/* Price Input */
.price-wrapper {
  position: relative;
  width: 100%;
}

.price-controls {
  position: absolute;
  right: 0;
  top: 1px;
  bottom: 1px;
  width: 20px;
  display: flex;
  flex-direction: column;
  background-color: #F8EAFA;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 4px 4px 0;
  overflow: hidden;
}

.price-up,
.price-down {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9C27B0;
  cursor: pointer;
  font-size: 8px;
  transition: background-color 0.2s, color 0.2s;
}

.price-up:hover,
.price-down:hover {
  background-color: #9C27B0;
  color: #fff;
}

/* Section Cards */
/* Added styles for the section layout */
.section {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  margin-bottom: 0;
  overflow: hidden;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.section-card {
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}

.section.active {
  border: 2px solid #9C27B0;
  box-shadow: 0 3px 8px rgba(154, 13, 242, 0.1);
}

.section:hover:not(.disabled) {
  border-color: #9C27B0;
  box-shadow: 0 3px 8px rgba(154, 13, 242, 0.1);
}

.section-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-icon {
  background-color: #F8EAFA;
  color: #9C27B0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title {
  font-weight: 700;
  font-size: 14px;
  color: #444;
}

.status-icon {
  font-size: 18px;
  color: #aaa;
}

/* Collapse Icon */
.collapse-icon {
  color: #9C27B0;
  font-size: 13px;
  transition: transform 0.3s;
  background: #F8EAFA;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 0;
}

.collapse-icon i {
  transition: transform 0.3s ease;
}

.collapse-icon.active i {
  transform: rotate(180deg);
}

/* Collapsible Section */
.collapsible-section {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease-out;
}

.collapsible-section.expanded {
  max-height: 1000px;
}

.section-content {
  padding: 20px;
  background: #fefefe;
  border-top: 1px solid #eee;
}

/* Inline Fields */
.inline-field {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

/* Disabled States */
input:disabled,
select:disabled,
textarea:disabled,
button:disabled,
.select-btn.disabled,
.disabled .select-btn,
.section.disabled,
.section.disabled * {
  cursor: not-allowed;
}

.section.disabled,
.section.disabled * {
  pointer-events: auto;
}
      </style>

      <!-- Row 1: Personal Info + Seller -->
      <div class="flex-row">
        <!-- Section 1: Personal Information -->
        <div class="section">
          <div class="section-card" data-target="section-personalInfo">
            <div class="section-info">
              <!-- Replace fa-user with your SVG_USER -->
              <div class="section-icon">${SVG_USER}</div>
              <div>
                <div class="section-title">
  ${isEnglish ? "Your Contact Details" : "Vos coordonnées"}
</div>
              </div>
            </div>
            <div class="collapse-icon">
              <!-- Using SVG_CHEVRON -->
              ${SVG_CHEVRON}
            </div>
          </div>
          <div class="collapsible-section" id="section-personalInfo">
            <div class="section-content">
              <div class="flex-row">
                <div>
                  <label for="full-name" class="bold-label">
                    ${isEnglish ? "Full Name" : "Nom complet"}
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    placeholder="${isEnglish ? "Enter your full name" : "Entrez votre nom complet"}"
                    required
                  >
                </div>
                <div>
                  <label for="email" class="bold-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="${isEnglish ? "Enter your email address" : "Entrez votre adresse email"}"
                    required
                  >
                </div>
                <div>
                  <label for="phone" class="bold-label">
                    ${isEnglish ? "Phone Number" : "Numéro de téléphone"}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="${isEnglish ? "Enter your phone number" : "Entrez votre numéro de téléphone"}"
                    required
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Seller -->
        <div class="section">
          <div class="section-card" data-target="section-seller">
            <div class="section-info">
              <!-- Replace fa-user-tie with your SVG_USER_TIE -->
              <div class="section-icon">${SVG_USER_TIE}</div>
              <div>
                <div class="section-title">
  ${isEnglish ? "Seller Info" : "Informations du vendeur"}
</div>
              </div>
            </div>
            <div class="collapse-icon">
              ${SVG_CHEVRON}
            </div>
          </div>
          <div class="collapsible-section" id="section-seller">
            <div class="section-content">
              <div>
                <label for="seller-name" class="bold-label">
                  ${isEnglish ? "Select a Seller" : "Sélectionnez un vendeur"}
                </label>
                <div class="dropdown-container" id="dropdown-seller">
                  <div class="select-btn" tabindex="0">
                    <span class="select-btn-holder">${isEnglish ? "-- Select --" : "-- Sélectionnez --"}</span>
                    <span class="arrow-dwn">
                      ${SVG_CHEVRON}
                    </span>
                  </div>
                  <ul class="list-items" id="seller-list-items"></ul>
                </div>
                <input type="hidden" id="seller-name" name="seller-name" required>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 2: Property Category + Property Location -->
      <div class="flex-row">
        <!-- Section 3: Property Category -->
        <div class="section">
          <div class="section-card" data-target="section-propertyType">
            <div class="section-info">
              <!-- Replace fa-home with your SVG_HOUSE, or your chosen icon for property category -->
              <div class="section-icon">${SVG_HOUSE}</div>
              <div>
                <div class="section-title">
  ${isEnglish ? "Type of Property" : "Type de propriété"}
</div>
              </div>
            </div>
            <div class="collapse-icon">
              ${SVG_CHEVRON}
            </div>
          </div>
          <div class="collapsible-section" id="section-propertyType">
            <div class="section-content">
              <div class="flex-row">
                <div>
                  <label for="property-category" class="bold-label">
                    ${isEnglish ? "Select Property Category" : "Sélectionnez une Catégorie"}
                  </label>
                  <div class="dropdown-container" id="dropdown-property-category">
                    <div class="select-btn" tabindex="0">
                      <span class="select-btn-holder">${isEnglish ? "-- Select --" : "-- Sélectionnez --"}</span>
                      <span class="arrow-dwn">${SVG_CHEVRON}</span>
                    </div>
                    <ul class="list-items" id="property-category-grouped">
                      <!-- Filled dynamically -->
                    </ul>
                  </div>
                  <input type="hidden" id="property-category" name="property-category" required>
                </div>
                <!-- House Type (simple list) -->
                <div>
                  <label for="house-type" class="bold-label">
                    ${isEnglish ? "Select House Type" : "Sélectionnez le type de Maison"}
                  </label>
                  <div class="dropdown-container" id="dropdown-house-type">
                    <div class="select-btn" tabindex="0">
                      <span class="select-btn-holder">${isEnglish ? "-- Select --" : "-- Sélectionnez --"}</span>
                      <span class="arrow-dwn">${SVG_CHEVRON}</span>
                    </div>
                    <ul class="list-items">
                      ${houseTypes
                        .map(
                          (item) => `
                            <li class="item">
                              <span class="checkbox">
                                ${SVG_CHECK}
                              </span>
                              <span class="item-text" data-value="${item}">${item}</span>
                            </li>
                          `
                        )
                        .join("")}
                    </ul>
                  </div>
                  <input type="hidden" id="house-type" name="house-type" required>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: Property Location -->
        <div class="section">
          <div class="section-card" data-target="section-location">
            <div class="section-info">
              <!-- Replace fa-location-dot with your SVG_ADDRESS -->
              <div class="section-icon">${SVG_ADDRESS}</div>
              <div>
               <div class="section-title">
  ${isEnglish ? "Property Location" : "Emplacement de la propriété"}
</div>
              </div>
            </div>
            <div class="collapse-icon">
              ${SVG_CHEVRON}
            </div>
          </div>
          <div class="collapsible-section" id="section-location">
            <div class="section-content">
              <div class="flex-row">
                <div>
                  <label for="street-address" class="bold-label">
                    ${isEnglish ? "Street Address" : "Adresse de rue"}
                  </label>
                  <input
                    type="text"
                    id="street-address"
                    placeholder="${isEnglish ? "Enter your street address" : "Entrez votre adresse de rue"}"
                    required
                  >
                </div>
                <div>
                  <label for="city" class="bold-label">
                    ${isEnglish ? "City" : "Ville"}
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder="${isEnglish ? "Enter your city" : "Entrez votre ville"}"
                    required
                  >
                </div>
                <div>
                  <label for="postal-code" class="bold-label">
                    ${isEnglish ? "Postal Code" : "Code Postal"}
                  </label>
                  <input
                    type="text"
                    id="postal-code"
                    placeholder="${isEnglish ? "Enter your code" : "Entrez votre code postal"}"
                    required
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 3: Basic Property Details + Amenities -->
      <div class="flex-row">
        <!-- Section 5: Basic Property Details -->
        <div class="section">
          <div class="section-card" data-target="section-basic-details">
            <div class="section-info">
              <!-- Replace fa-building-columns with your SVG_BUILDING_COLUMNS -->
              <div class="section-icon">${SVG_BUILDING_COLUMNS}</div>
              <div>
                <div class="section-title">
  ${isEnglish ? "Key Property Details" : "Détails clés de la propriété"}
</div>
              </div>
            </div>
            <div class="collapse-icon">
              ${SVG_CHEVRON}
            </div>
          </div>
          <div class="collapsible-section" id="section-basic-details">
            <div class="section-content">
              <div class="flex-row">
                <div>
                  <label for="rooms-number" class="bold-label">
                    ${isEnglish ? "Number of Rooms" : "Nombre de pièces"}
                  </label>
                  <input
                    type="text"
                    id="rooms-number"
                    placeholder="${isEnglish ? "Enter number of rooms" : "Entrez le nombre de pièces"}"
                    required
                  >
                </div>
                <div>
                  <label for="bedrooms-number" class="bold-label">
                    ${isEnglish ? "Number of Bedrooms" : "Nombre de chambres"}
                  </label>
                  <input
                    type="text"
                    id="bedrooms-number"
                    placeholder="${isEnglish ? "Enter number of bedrooms" : "Entrez le nombre de chambres"}"
                    required
                  >
                </div>
                <div>
                  <label for="bathrooms-number" class="bold-label">
                    ${isEnglish ? "Number of Bathrooms" : "Nombre de salles de bains"}
                  </label>
                  <input
                    type="text"
                    id="bathrooms-number"
                    placeholder="${isEnglish ? "Enter number of bathrooms" : "Entrez le nombre de salles de bains"}"
                    required
                  >
                </div>
                <div>
                  <label for="year-build" class="bold-label">
                    ${isEnglish ? "Year Built" : "Année de construction"}
                  </label>
                  <input
                    type="text"
                    id="year-build"
                    placeholder="${isEnglish ? "Enter year built" : "Entrez l'année de construction"}"
                    required
                  >
                </div>
                <div>
                  <label for="area" class="bold-label">
                    ${isEnglish ? "Area (sq ft)" : "Superficie (pieds carrés)"}
                  </label>
                  <input
                    type="text"
                    id="area"
                    placeholder="${isEnglish ? "Enter area" : "Entrez la superficie"}"
                    required
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 6: Property Amenities -->
        <div class="section">
          <div class="section-card" data-target="section-amenities">
            <div class="section-info">
              <!-- Replace fa-sliders with your SVG_SLIDER -->
              <div class="section-icon">${SVG_SLIDER}</div>
              <div class="section-title">
  ${isEnglish ? "Additional Features" : "Caractéristiques supplémentaires"}
</div>
            </div>
            <div class="collapse-icon">
              ${SVG_CHEVRON}
            </div>
          </div>
          <div class="collapsible-section" id="section-amenities">
            <div class="section-content">
              <div class="flex-row">
                <div style="display: flex; align-items: center; gap: 5px;">
                  <label for="garage" class="bold-label">Garage?</label>
                  <input type="checkbox" id="garage" name="garage" value="Yes">
                  <input
                    type="number"
                    id="garage-cars"
                    placeholder="${isEnglish ? "Number of cars" : "Nombre de voitures"}"
                    style="display: none;"
                  >
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                  <label for="outside-parking" class="bold-label">
                    ${isEnglish ? "Outside Parking?" : "Stationnement extérieur ?"}
                  </label>
                  <input type="checkbox" id="outside-parking" value="Yes">
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                  <label for="swimming-pool" class="bold-label">
                    ${isEnglish ? "Swimming Pool" : "Piscine"}?
                  </label>
                  <input type="checkbox" id="swimming-pool" value="Yes">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 4: Additional Details -->
      <div class="section">
        <div class="section-card" data-target="section-details">
          <div class="section-info">
            <!-- Replace fa-note-sticky with your SVG_NOTE_STICK -->
            <div class="section-icon">${SVG_NOTE_STICK}</div>
            <div>
              <div class="section-title">
  ${isEnglish ? "Further Details" : "Informations supplémentaires"}
</div>
            </div>
          </div>
          <div class="collapse-icon">
            ${SVG_CHEVRON}
          </div>
        </div>
        <div class="collapsible-section" id="section-details">
          <div class="section-content">
            <div style="flex:1; margin-bottom: 10px;">
              <label for="details" class="bold-label">
                ${isEnglish ? "Details" : "Détails"}
              </label>
              <textarea id="details" rows="8" required></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit">
        ${isEnglish ? "Submit" : "Envoyer"}
      </button>
    `;

    // Show/hide #garage-cars
    formContainer.querySelector("#garage").addEventListener("change", (event) => {
      const carsField = formContainer.querySelector("#garage-cars");
      carsField.style.display = event.target.checked ? "inline-block" : "none";
      if (!event.target.checked) carsField.value = "";
    });

    // Insert grouped property-category HTML
    const categoryListEl = formContainer.querySelector("#property-category-grouped");
    categoryListEl.innerHTML = buildGroupedCategoryHTML();

    // Insert dynamic seller list
    const sellerListEl = formContainer.querySelector("#seller-list-items");
    sellerListEl.innerHTML = buildSellerListItems(Sellers, isEnglish);

    /*************************************************************
     * 7) Single-select dropdown logic (scroll + close others)
     *************************************************************/
    // This is the problematic function that needs fixing
// This is the problematic function that needs fixing
// This revised function fixes both:
// 1. The initial dropdown issue where selections weren't closing properly
// 2. The new issue where clicking a dropdown with a selection doesn't reopen it

function setupDropdownSingle(dropdownId, hiddenInputId) {
  const dropdownContainer = formContainer.querySelector(`#${dropdownId}`);
  const selectBtn = dropdownContainer.querySelector(".select-btn");
  const listEl = dropdownContainer.querySelector(".list-items");
  const selectBtnHolder = selectBtn.querySelector(".select-btn-holder");
  const hiddenInput = formContainer.querySelector(`#${hiddenInputId}`);
  const listItems = listEl.querySelectorAll(".item");

  // Manually force list items to display:none initially
  listEl.style.display = "none";

  selectBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    
    // Close other dropdowns
    closeAllOtherDropdowns(selectBtn);
    
    // Toggle open class
    selectBtn.classList.toggle("open");
    
    // Explicitly toggle display property regardless of CSS
    if (selectBtn.classList.contains("open")) {
      listEl.style.display = "block";
      // If opening, scroll to the first item or to the selected item
      const selectedItem = listEl.querySelector(".item.checked");
      const targetItem = selectedItem || listEl.firstElementChild;
      if (targetItem) {
        targetItem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      listEl.style.display = "none";
    }
  });

  listItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      
      // Update selection visually
      listItems.forEach((i) => i.classList.remove("checked"));
      item.classList.add("checked");
      
      // Update selected value and hidden input
      const value = item.querySelector(".item-text").getAttribute("data-value");
      selectBtnHolder.innerText = item.querySelector(".item-text").innerText;
      hiddenInput.value = value;
      
      // Close the dropdown
      selectBtn.classList.remove("open");
      listEl.style.display = "none";
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!dropdownContainer.contains(e.target)) {
      selectBtn.classList.remove("open");
      listEl.style.display = "none";
    }
  });
}
    // Setup single-select for property category, house type, seller
    setupDropdownSingle("dropdown-property-category", "property-category");
    setupDropdownSingle("dropdown-house-type", "house-type");
    setupDropdownSingle("dropdown-seller", "seller-name");

    /*************************************************************
     * 8) Group collapse
     *************************************************************/
    const groupHeaders = formContainer.querySelectorAll(".group-header");
    groupHeaders.forEach((header) => {
      header.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleCollapse(header, formContainer);
      });
    });

    /*************************************************************
     * 9) Section toggles
     *************************************************************/
   const sectionCards = formContainer.querySelectorAll(".section-card");
    sectionCards.forEach((card) => {
  const targetId = card.getAttribute("data-target");
  card.addEventListener("click", (e) => {
    // If the section is disabled, do nothing.
    if (card.closest(".section").classList.contains("disabled")) return;
    e.stopPropagation();
    toggleSection(targetId, formContainer);
  });
});


    /*************************************************************
     * 10) Form Submission
     *************************************************************/
    formContainer.addEventListener("submit", (event) => {
  event.preventDefault();

  // Collapse all sections
  const allSections = formContainer.querySelectorAll(".collapsible-section");
  allSections.forEach((section) => {
    section.classList.remove("expanded");
    const sectionCard = section.previousElementSibling;
    if (sectionCard) {
      sectionCard.classList.remove("active");
      const collapseIcon = sectionCard.querySelector(".collapse-icon");
      if (collapseIcon) collapseIcon.classList.remove("active");
    }
  });

  // Disable all form elements including inputs, textareas, buttons, and custom dropdown controls
  // Disable all form elements
          const formEls = formContainer.querySelectorAll("input, textarea, button, .select-btn");
          formEls.forEach(el => {
            el.disabled = true;
            el.classList.add("disabled");
          });

  // Disable all sections (to prevent further clicks)
  const allSectionCards = formContainer.querySelectorAll(".section");
          allSectionCards.forEach(section => {
            section.classList.add("disabled");
          });

  // Close any open dropdowns
  formContainer.querySelectorAll(".list-items").forEach((dropdown) => {
    dropdown.style.display = "none";
  });

  // Update the submit button text and style
  const submitBtn = formContainer.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.textContent = isEnglish ? "Submitted ✓" : "Envoyé ✓";
    submitBtn.style.backgroundColor = "#4CAF50";
    submitBtn.style.color = "white";
  }

  // Gather form values as before
  const fullName = formContainer.querySelector("#full-name").value.trim();
  const email = (formContainer.querySelector("#email")?.value || "").trim();
  const phone = formContainer.querySelector("#phone").value.trim();
  const formattedPhone = formatPhoneNumber(phone);
  const sellerName = formContainer.querySelector("#seller-name").value.trim();
  const propertyCategory = formContainer.querySelector("#property-category").value.trim();
  const houseType = formContainer.querySelector("#house-type").value.trim();
  const streetAddress = formContainer.querySelector("#street-address").value.trim();
  const city = formContainer.querySelector("#city").value.trim();
  const postalCode = formContainer.querySelector("#postal-code").value.trim();
  const yearBuild = formContainer.querySelector("#year-build").value.trim();
  const area = formContainer.querySelector("#area").value.trim();

  let roomsNumber = parseInt(formContainer.querySelector("#rooms-number").value.trim(), 10) || 0;
  let bedroomsNumber = parseInt(formContainer.querySelector("#bedrooms-number").value.trim(), 10) || 0;
  let bathroomsNumber = parseInt(formContainer.querySelector("#bathrooms-number").value.trim(), 10) || 0;

  const garageChecked = formContainer.querySelector("#garage").checked;
  const insideParking = garageChecked ? "Yes" : "No";
  let insideParkingCars = 0;
  if (garageChecked) {
    insideParkingCars = parseInt(formContainer.querySelector("#garage-cars").value.trim(), 10) || 0;
  }
  const outsideParking = formContainer.querySelector("#outside-parking")?.checked ? "Yes" : "No";
  const swimmingPool = formContainer.querySelector("#swimming-pool")?.checked ? "Yes" : "No";
  const details = formContainer.querySelector("#details").value.trim() || "";

  const seedPayload = {
    fullName: fullName || "John Doe",
    email: email || "johndoe@example.com",
    phone: formattedPhone || "000-000-0000",
    sellerName: sellerName || "No Preference",
    propertyCategory: propertyCategory || "Residential",
    houseType: houseType || "Detached",
    streetAddress: streetAddress || "123 Main St",
    city: city || "Sample City",
    postalCode: postalCode || "00000",
    yearBuild: yearBuild || "2020",
    area: area || "1000",
    roomsNumber,
    bedroomsNumber,
    bathroomsNumber,
    insideParking,
    insideParkingCars,
    outsideParking,
    swimmingPool,
    details: details || "No additional details provided.",
  };

  // Send to Voiceflow
  window.voiceflow.chat.interact({
    type: "complete",
    payload: seedPayload,
  });
});


    // 11) Append form
    element.appendChild(formContainer);
  },
};

/************** EXTENSION #3: ContactExtension **************/
const ContactExtension = {
      name: "Forms",
      type: "response",
      match: ({ trace }) =>
          trace.type === `ext_contact` || trace.payload?.name === `ext_contact`,

      render: ({ trace, element }) => {
        const { language } = trace.payload;
        const isEnglish = language === "en";

        // 1) Create the form container
        const formContainer = document.createElement("form");
        formContainer.innerHTML = `
          <style>
            /* Basic styling */
/* Variables for consistent theming */

/* Base Form Styles */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  border-radius: 6px;
}

.flex-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.flex-row > div {
  flex: 1;
  min-width: 200px;
}

.bold-label {
  font-weight: 600;
  color: #000;
  font-size: 14px;
  margin-bottom: 4px;
  display: block;
}

/* Input Styles */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"],
textarea {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 8px;
  background: #fff;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

/* Specific styling for details textarea */
#details {
  resize: vertical;
  min-height: 100px;
  max-height: 200px;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
#details:focus {
  border: 2px solid #9C27B0;
}

/* Remove spinner from number inputs */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Submit Button */
.submit {
  color: #9C27B0;
  background-color: #F8EAFA;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.2s, color 0.2s, font-weight 0.2s;
}

.submit:hover {
  color: #fff;
  background-color: #9C27B0;
}

.submit:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
  font-weight: 700;
}

/* Custom Dropdown */
.dropdown-container {
  position: relative;
  max-width: 100%;
}

.select-btn {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-radius: 6px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: border 0.2s;
}

.select-btn .btn-text {
  font-size: 13px;
  font-weight: 400;
  color: #555;
}

.select-btn-holder {
  color: #777;
  font-size: 13px;
}

.select-btn .arrow-dwn {
  display: flex;
  height: 24px;
  width: 24px;
  color: #9C27B0;
  font-size: 12px;
  border-radius: 50%;
  background: #F8EAFA;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.select-btn.open .arrow-dwn {
  transform: rotate(-180deg);
}

.select-btn:focus,
.select-btn.open {
  border: 2px solid #9C27B0;
}

/* Dropdown Styles */
.list-items {
  position: relative;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  border-radius: 6px;
  padding: 8px 0;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  display: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
}

.select-btn.open + .list-items {
  display: block;
}

.list-items .item {
  display: flex;
  align-items: center;
  height: 36px;
  cursor: pointer;
  padding: 0 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin: 4px;
}

.list-items .item:hover {
  background-color: #F8EAFA;
}

.item .item-text {
  font-size: 13px;
  font-weight: 400;
  color: #333;
  margin-left: 8px;
}

/* Checkbox Styles */
/* Circle for single selection */
.item .checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  margin-right: 8px;
  border: 1.5px solid #c0c0c0;
  transition: all 0.3s ease-in-out;
}

.item.checked .checkbox {
  background-color: #9C27B0;
  border: 2px solid #9C27B0;
}

.checkbox .check-icon {
  color: #fff;
  font-size: 10px;
  transform: scale(0);
  transition: all 0.2s ease-in-out;
}

.item.checked .check-icon {
  transform: scale(1);
}

/* Checkbox SVG fill states */
.list-items .item:not(.checked) .checkbox svg path {
  fill: transparent !important;
}

.list-items .item:not(.checked):hover .checkbox svg path {
  fill: #9C27B0 !important;
}

.list-items .item.checked .checkbox svg path {
  fill: #ffffff !important;
}

/* Standard checkbox */
input[type="checkbox"] {
  accent-color: #9C27B0;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* Group Styles */
.group {
  border-top: 1px solid #eee;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 4px;
  overflow: hidden;
}

.group:first-child {
  border-top: none;
}

.group-header {
  font-weight: 500;
  padding: 8px 12px;
  background: #F8EAFA;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #9C27B0;
}

.group-header .collapse-icon {
  color: #9C27B0;
  font-size: 13px;
  transition: transform 0.3s;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
}

.group-header.active .collapse-icon {
  transform: rotate(-180deg);
}

.group-options {
  display: none;
  padding-left: 0;
}

/* Price Input */
.price-wrapper {
  position: relative;
  width: 100%;
}

.price-controls {
  position: absolute;
  right: 0;
  top: 1px;
  bottom: 1px;
  width: 20px;
  display: flex;
  flex-direction: column;
  background-color: #F8EAFA;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 4px 4px 0;
  overflow: hidden;
}

.price-up,
.price-down {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9C27B0;
  cursor: pointer;
  font-size: 8px;
  transition: background-color 0.2s, color 0.2s;
}

.price-up:hover,
.price-down:hover {
  background-color: #9C27B0;
  color: #fff;
}

/* Section Cards */
/* Added styles for the section layout */
.section {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  margin-bottom: 0;
  overflow: hidden;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.section-card {
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}

.section.active {
  border: 2px solid #9C27B0;
  box-shadow: 0 3px 8px rgba(154, 13, 242, 0.1);
}

.section:hover:not(.disabled) {
  border-color: #9C27B0;
  box-shadow: 0 3px 8px rgba(154, 13, 242, 0.1);
}

.section-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-icon {
  background-color: #F8EAFA;
  color: #9C27B0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title {
  font-weight: 700;
  font-size: 14px;
  color: #444;
}

.status-icon {
  font-size: 18px;
  color: #aaa;
}

/* Collapse Icon */
.collapse-icon {
  color: #9C27B0;
  font-size: 13px;
  transition: transform 0.3s;
  background: #F8EAFA;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 0;
}

.collapse-icon i {
  transition: transform 0.3s ease;
}

.collapse-icon.active {
  transform: rotate(-180deg);
}

/* Collapsible Section */
.collapsible-section {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease-out;
}

.collapsible-section.expanded {
  max-height: 1000px;
}

.section-content {
  padding: 20px;
  background: #fefefe;
  border-top: 1px solid #eee;
}

/* Inline Fields */
.inline-field {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

/* Disabled States */
/* Ensure native disabled elements show not-allowed cursor */
input:disabled,
select:disabled,
textarea:disabled,
button:disabled {
  cursor: not-allowed;
}

/* Custom disabled elements should show not-allowed cursor.
   Note: We removed pointer-events: none so that hover events fire. */
.select-btn.disabled,
.section.disabled,
.section.disabled * {
  cursor: not-allowed;
}
/* Instead of disabling pointer events, we simply reduce opacity */
          </style>

          <!-- First Row: Contact Info + Service & Seller -->
          <div class="flex-row">
            <!-- Section 1: Contact Information -->
            <div class="section">
              <div class="section-card" data-target="section-contactInfo">
                <div class="section-info">
                  <div class="section-icon">
                    ${SVG_USER}
                  </div>
                  <div class="section-title">
                    ${isEnglish ? "Your Contact Details" : "Vos coordonnées"}
                  </div>
                </div>
                <div class="collapse-icon">
                  ${SVG_CHEVRON}
                </div>
              </div>
              <div class="collapsible-section" id="section-contactInfo">
                <div class="section-content">
                  <div class="flex-row">
                    <div>
                      <label for="full-name" class="bold-label">
                        ${isEnglish ? 'Full Name' : 'Nom complet'}
                      </label>
                      <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required />
                    </div>
                    <div>
                      <label for="email" class="bold-label">Email</label>
                      <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required />
                    </div>
                    <div>
                      <label for="phone" class="bold-label">
                        ${isEnglish ? 'Phone Number' : 'Numéro de téléphone'}
                      </label>
                      <input type="tel" id="phone" name="phone" placeholder="${isEnglish ? 'Enter your phone number' : 'Entrez votre numéro de téléphone'}" required />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 2: Service & Seller -->
            <div class="section">
              <div class="section-card" data-target="section-serviceSeller">
                <div class="section-info">
                  <div class="section-icon">
                    ${SVG_BRIEFCASE}
                  </div>
                  <div class="section-title">
                    ${isEnglish ? "Service & Seller" : "Service et vendeur"}
                  </div>
                </div>
                <div class="collapse-icon">
                  ${SVG_CHEVRON}
                </div>
              </div>
              <div class="collapsible-section" id="section-serviceSeller">
                <div class="section-content">
                  <div class="flex-row">
                    <!-- Service Dropdown -->
                    <div>
                      <label for="dropdown-service" class="bold-label">
                        ${isEnglish ? 'Select a Service' : 'Sélectionnez un Service'}
                      </label>
                      <div class="dropdown-container" id="dropdown-service">
                        <div class="select-btn" tabindex="0">
                          <span class="btn-text">${isEnglish ? '-- Select a Service --' : '-- Sélectionnez un Service --'}</span>
                          <span class="arrow-dwn">
                            ${SVG_CHEVRON}
                          </span>
                        </div>
                        <ul class="list-items single-select" id="serviceList"></ul>
                      </div>
                      <input type="hidden" id="service" name="service" required />
                    </div>

                    <!-- Seller Dropdown -->
                    <div>
                      <label for="dropdown-seller" class="bold-label">
                        ${isEnglish ? 'Select a Seller' : 'Sélectionnez un vendeur'}
                      </label>
                      <div class="dropdown-container" id="dropdown-seller">
                        <div class="select-btn" tabindex="0">
                          <span class="btn-text">${isEnglish ? '-- Select a Seller --' : '-- Sélectionnez un vendeur --'}</span>
                          <span class="arrow-dwn">
                            ${SVG_CHEVRON}
                          </span>
                        </div>
                        <ul class="list-items single-select" id="sellerList"></ul>
                      </div>
                      <input type="hidden" id="seller-name" name="seller-name" required />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Second Row: Message Section -->
          <div class="section">
            <div class="section-card" data-target="section-message">
              <div class="section-info">
                <div class="section-icon">
                  ${SVG_MESSAGE}
                </div>
                <div class="section-title">
                  ${isEnglish ? "Message" : "Message"}
                </div>
              </div>
              <div class="collapse-icon">
                ${SVG_CHEVRON}
              </div>
            </div>
            <div class="collapsible-section" id="section-message">
              <div class="section-content">
                <label for="details" class="bold-label">
                  ${isEnglish ? 'Message' : 'Message'}
                </label>
                <textarea id="details" name="details" placeholder="${isEnglish ? 'Write your message here...' : 'Écrivez votre message ici...'}" required></textarea>
              </div>
            </div>
          </div>

          <button type="submit" class="submit">${isEnglish ? 'Submit' : 'Envoyer'}</button>
        `;

        // 2) Append the form to the element
        element.appendChild(formContainer);

        /*************************************************************
         * 3) Data population for dropdowns
         *************************************************************/
        const serviceListEl = formContainer.querySelector("#serviceList");
        const sellerListEl = formContainer.querySelector("#sellerList");

        // Populate Service Dropdown
        const services = getServiceList(language);
        services.forEach(item => {
          const li = document.createElement("li");
          li.classList.add("item");
          li.innerHTML = `
            <span class="checkbox">
              ${SVG_CHECK}
            </span>
            <span class="item-text" data-value="${item.value}">${item.label}</span>
          `;
          serviceListEl.appendChild(li);
        });

        // Populate Seller Dropdown
        const isEnglish2 = (language === 'en');
        const sellers = getSellerList(isEnglish2, true);
        sellers.forEach(seller => {
          const li = document.createElement("li");
          li.classList.add("item");
          li.innerHTML = `
            <span class="checkbox">
              ${SVG_CHECK}
            </span>
            <span class="item-text" data-value="${seller}">${seller}</span>
          `;
          sellerListEl.appendChild(li);
        });

        /*************************************************************
         * 4) Single-select dropdown logic
         *    - close other dropdowns
         *    - scroll to first item on open
         *************************************************************/
        function closeAllOtherDropdowns(currentBtn) {
          const allSelectBtns = formContainer.querySelectorAll(".select-btn");
          allSelectBtns.forEach(btn => {
            if (btn !== currentBtn) {
              btn.classList.remove("open");
            }
          });
        }
		

        function setupDropdownSingle(dropdownId, listId, hiddenInputId, defaultText) {
          const dropdownContainer = formContainer.querySelector(`#${dropdownId}`);
          const selectBtn = dropdownContainer.querySelector(".select-btn");
          const listEl = dropdownContainer.querySelector(".list-items");
          const btnText = selectBtn.querySelector(".btn-text");
          const hiddenInput = formContainer.querySelector(`#${hiddenInputId}`);
          const listItems = listEl.querySelectorAll(".item");

          if (defaultText) btnText.innerText = defaultText;

          selectBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            // close other dropdowns
            closeAllOtherDropdowns(selectBtn);
            // toggle
            selectBtn.classList.toggle("open");
            // scroll to first item if opening
            if (selectBtn.classList.contains("open") && listEl.firstElementChild) {
              listEl.firstElementChild.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          });

          listItems.forEach(liItem => {
            liItem.addEventListener("click", (e) => {
              e.stopPropagation();
              listItems.forEach(i => i.classList.remove("checked"));
              liItem.classList.add("checked");

              const labelText = liItem.querySelector(".item-text").innerText;
              const value = liItem.querySelector(".item-text").getAttribute("data-value");

              btnText.innerText = labelText;
              hiddenInput.value = value;

              selectBtn.classList.remove("open");
            });
          });

          // close if user clicks outside
          document.addEventListener("click", (e) => {
            if (!dropdownContainer.contains(e.target)) {
              selectBtn.classList.remove("open");
            }
          });
        }

        setupDropdownSingle(
          "dropdown-service",
          "serviceList",
          "service",
          isEnglish ? "-- Select a Service --" : "-- Sélectionnez un Service --"
        );
        setupDropdownSingle(
          "dropdown-seller",
          "sellerList",
          "seller-name",
          isEnglish ? "-- Select a Seller --" : "-- Sélectionnez un vendeur --"
        );

        /*************************************************************
         * 5) Accordion/Section logic
         *************************************************************/
        function closeAllOtherSections(currentId) {
          const allSections = formContainer.querySelectorAll(".collapsible-section");
          allSections.forEach(sec => {
            if (sec.id !== currentId) {
              sec.classList.remove("expanded");
              const card = sec.previousElementSibling;
              card.classList.remove("active");
              const icon = card.querySelector(".collapse-icon");
              if (icon) icon.classList.remove("active");
            }
          });
        }

        function toggleSection(sectionId) {
          const section = formContainer.querySelector(`#${sectionId}`);
          if (!section) return;

          const parentSection = section.previousElementSibling;
          const icon = parentSection.querySelector(".collapse-icon");

          const wasExpanded = section.classList.contains("expanded");
          // close others
          closeAllOtherSections(sectionId);

          if (!wasExpanded) {
            section.classList.add("expanded");
            parentSection.classList.add("active");
            if (icon) icon.classList.add("active");
          } else {
            section.classList.remove("expanded");
            parentSection.classList.remove("active");
            if (icon) icon.classList.remove("active");
          }
        }

        // Attach click events to each section-card
        // Attach click events to each section-card
// Attach click events to each section-card
const sectionCards = formContainer.querySelectorAll(".section-card");
sectionCards.forEach(card => {
  const targetId = card.getAttribute("data-target");
  card.addEventListener("click", (e) => {
    e.stopPropagation();
    // Prevent toggling if the section is disabled
    if (card.closest(".section").classList.contains("disabled")) return;
    toggleSection(targetId);
  });
});



        /*************************************************************
         * 6) Form Submission
         *************************************************************/
        formContainer.addEventListener("submit", (e) => {
          e.preventDefault();

          const fullName = formContainer.querySelector("#full-name").value.trim();
          const email = formContainer.querySelector("#email").value.trim();
          const phone = formContainer.querySelector("#phone").value.trim();
          const service = formContainer.querySelector("#service").value.trim();
          const sellerName = formContainer.querySelector("#seller-name").value.trim();
          const details = formContainer.querySelector("#details").value.trim();

          // Minimal validation example
          if (!fullName) {
            alert(isEnglish ? "Full Name is required." : "Le nom complet est obligatoire.");
            return;
          }
          if (!isValidEmail(email)) {
            alert(isEnglish ? "Please enter a valid email address." : "Veuillez entrer une adresse email valide.");
            return;
          }
          if (!isValidCanadianPhoneNumber(phone)) {
            alert(isEnglish ? "Please enter a valid Canadian phone number." : "Veuillez entrer un numéro de téléphone canadien valide.");
            return;
          }
          if (!service) {
            alert(isEnglish ? "Please select a service." : "Veuillez sélectionner un service.");
            return;
          }
          if (!sellerName) {
            alert(isEnglish ? "Please select a seller." : "Veuillez sélectionner un vendeur.");
            return;
          }
          if (!details) {
            alert(isEnglish ? "Message is required." : "Le message est obligatoire.");
            return;
          }

          // --- Added from GymCourseExtension ---
          // Collapse all expanded sections before disabling form elements
          const allCollapsibleSections = formContainer.querySelectorAll(".collapsible-section.expanded");
          allCollapsibleSections.forEach(section => {
            section.classList.remove("expanded");
            const sectionCard = section.previousElementSibling;
            if (sectionCard) {
              sectionCard.classList.remove("active");
              const collapseIcon = sectionCard.querySelector(".collapse-icon");
              if (collapseIcon) collapseIcon.classList.remove("active");
            }
          });
          // --- End Added section ---

          // Disable all form elements including custom dropdown controls
          const formEls = formContainer.querySelectorAll("input, textarea, button, .select-btn");
          formEls.forEach(el => {
            el.disabled = true;
            el.classList.add("disabled");
          });

          // Disable all sections (so they show the not-allowed cursor on hover)
          const allSections = formContainer.querySelectorAll(".section");
          allSections.forEach(section => section.classList.add("disabled"));

          // Close any open dropdowns
          formContainer.querySelectorAll(".list-items").forEach(dropdown => {
            dropdown.style.display = "none";
          });

          // Update the submit button text and style
          const submitBtn = formContainer.querySelector('button[type="submit"]');
          if (submitBtn) {
            submitBtn.textContent = isEnglish ? "Submitted ✓" : "Envoyé ✓";
            submitBtn.style.backgroundColor = "#4CAF50";
            submitBtn.style.color = "white";
          }

          // Send data to Voiceflow (or your backend)
          window.voiceflow.chat.interact({
            type: "complete",
            payload: {
              fullName,
              email,
              phone,
              service,
              sellerName,
              message: details,
            },
          });
        });
      },
    };




/************** EXTENSION #4: BookingExtension **************/
 
const BookingExtension = {
  name: "Forms",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_booking" || trace.payload?.name === "ext_booking",
  render: ({ trace, element }) => {
    // Handle various payload formats for backward compatibility
    const { 
      language = trace.payload.language || "en", 
      Uid = trace.payload.rescheduleUid || "2KXEcfxLx7kF1MQuAaxHqc", 
      email = trace.payload.email || "belganasaad%40gmail.com", 
      link = trace.payload.link || "ainextg/emma-thompson",
	  namespace = trace.payload.namespace || "emma-thompson"
    } = trace.payload;
    
    const isEnglish = language === 'en';

        // Create container with an inline embed target and debug info.
        const container = document.createElement("div");
        container.innerHTML = `
          <style>
            .reschedule-container {
              display: flex;
              flex-direction: column;
              gap: 10px;
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
              background: transparent;
              padding: 16px;
              border-radius: 8px;
              min-width: 300px;
              align-items: center;
            }
            /* Inline embed container for reschedule view */
            #my-cal-reschedule-inline {
              width: 100%;
              height: 100%;
              overflow: auto;
              margin-top: 20px;
              display: none;
            }
            .debug-info {
              font-size: 12px;
              color: #666;
              margin-top: 10px;
            }
          </style>
          <div class="reschedule-container">
            <div id="my-cal-reschedule-inline"></div>
            <div class="debug-info" id="debug-info"></div>
          </div>
        `;
        element.appendChild(container);

        // ====== Cal.com Library Initialization ======
        (function(C, A, L) {
          let p = function(a, ar) { a.q.push(ar); };
          let d = C.document;
          C.Cal = C.Cal || function() {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function() { p(api, arguments); };
              const namespace = ar[1];
              api.q = api.q || [];
              if (typeof namespace === "string") {
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
              } else {
                p(cal, ar);
              }
              return;
            }
            p(cal, ar);
          };
        })(window, "https://app.cal.com/embed/embed.js", "init");

        // ====== Automatic Reschedule Logic ======
        function triggerReschedule() {
          // Notify Voiceflow that reschedule is starting.
          if (window.voiceflow && window.voiceflow.chat) {
            window.voiceflow.chat.interact({
              type: "reschedule_started",
              payload: { email, Uid, link }
            });
          }
          
          const debugInfo = container.querySelector("#debug-info");

          try {
            // Build the dynamic reschedule link with parameters.
            const calLinkWithParams = `${link}?rescheduleUid=${Uid}&rescheduledBy=${email}`;

            // Initialize Cal.com for the provided namespace.
            Cal("init", namespace, { origin: "https://cal.com" });
            
            // Set UI preferences for inline reschedule view (light theme, week view).
            Cal.ns[namespace]("ui", {
              theme: "light",
              cssVarsPerTheme: {
                light: { "cal-brand": "#9c27b0" },
                dark: { "cal-brand": "#9c27b0" }
              },
              hideEventTypeDetails: false,
              layout: "month_view"
            });
            
            // Initialize the inline embed for rescheduling.
            Cal.ns[namespace]("inline", {
              elementOrSelector: "#my-cal-reschedule-inline",
              config: { layout: "month_view", theme: "light" },
              calLink: calLinkWithParams,
            });
            
            // Unhide the inline reschedule container.
            document.getElementById("my-cal-reschedule-inline").style.display = "block";
            
            // Listen for successful reschedule events.
            Cal.ns[namespace]("on", {
              action: "reschedule_successful",
              callback: (event) => {
                console.log("Reschedule successful", event);
                if (window.voiceflow && window.voiceflow.chat) {
                  window.voiceflow.chat.interact({
                    type: "complete",
                    payload: { email, link, Uid }
                  });
                }
                debugInfo.textContent = isEnglish ? "Reschedule completed" : "Reprogrammation terminée";
              }
            });
            
            // Listen for errors.
            Cal.ns[namespace]("on", {
              action: "error",
              callback: (error) => {
                console.error("Cal error:", error);
                debugInfo.textContent = `Cal error: ${JSON.stringify(error)}`;
              }
            });
          } catch (error) {
            console.error("Error initializing Cal:", error);
            debugInfo.textContent = `Error: ${error.message}`;
          }
        }

        // Automatically trigger the inline reschedule process upon rendering.
        triggerReschedule();

        // Return a cleanup function if needed.
        return function cleanup() {
          // Cleanup logic can be added here if necessary.
        };
      },
    };


const BookingExtension_old = {
      name: "Forms",
      type: "response",
      match: ({ trace }) =>
        trace.type === "ext_booking" || trace.payload?.name === "ext_booking",
      render: ({ trace, element }) => {
        const { language } = trace.payload;
        const isEnglish = language === 'en';

        // Create the form container
        const formContainer = document.createElement("form");

        // Insert the style and HTML for the booking form
        formContainer.innerHTML = `
          <style>
            /* Variables for consistent theming */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  border-radius: 8px;
}

.flex-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.flex-row > div {
  flex: 1;
  min-width: 200px;
}

.bold-label {
  font-weight: 600;
  color: #000;
  font-size: 14px;
  margin-bottom: 4px;
  display: block;
}

/* Input Styles */
input[type="text"],
input[type="email"] {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 8px;
  background: #fff;
  font-size: 13px;
  outline: none;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="email"]:focus {
  border: 2px solid #9C27B0;
}

/* Remove spinner from number inputs */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Submit Button */
.book-now {
  color: #9C27B0;
  background-color: #F8EAFA;
  border: none;
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.3s;
}

.book-now:hover {
  background-color: #9C27B0;
  font-weight: 700;
  color: #fff;
}

.book-now:disabled {
  background-color: #4CAF50;
  color: white;
  cursor: not-allowed;
  font-weight: 700;
}

/* Custom Dropdown */
.dropdown-container {
  position: relative;
  max-width: 100%;
}

.select-btn {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: #555;
  font-size: 13px;
}

.select-btn-holder {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: #555;
  font-size: 13px;
}

.select-btn .btn-text {
  font-size: 13px;
  font-weight: 400;
  color: black;
}

.select-btn .arrow-dwn {
  display: flex;
  height: 24px;
  width: 24px;
  color: #9C27B0;
  font-size: 12px;
  border-radius: 50%;
  background: #F8EAFA;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.select-btn.open .arrow-dwn {
  transform: rotate(-180deg);
}

.select-btn:focus,
.select-btn.open {
  border: 2px solid #9C27B0;
}

/* Dropdown Styles */
.list-items {
  position: relative;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  border-radius: 8px;
  padding: 8px 0;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  display: none;
  max-height: 200px;
  overflow-y: auto;
}

.select-btn.open ~ .list-items {
  display: block;
}

.list-items .item {
  display: flex;
  align-items: center;
  height: 36px;
  cursor: pointer;
  transition: 0.3s;
  padding: 0 12px;
  border-radius: 8px;
}

.list-items .item:hover {
  background-color: #F8EAFA;
}

.item .item-text {
  font-size: 13px;
  font-weight: 400;
  color: #333;
  margin-left: 8px;
}

/* Checkbox Styles */
/* Circle for single selection */
.item .checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  margin-right: 8px;
  border: 1.5px solid #c0c0c0;
  transition: all 0.3s ease-in-out;
}

.item.checked .checkbox {
  background-color: #9C27B0;
  border: 2px solid #9C27B0;
}

.checkbox .check-icon {
  color: #fff;
  font-size: 12px;
  transform: scale(0);
  transition: all 0.2s ease-in-out;
}

.item.checked .check-icon {
  transform: scale(1);
}

/* Checkbox SVG fill states */
.list-items .item:not(.checked) .checkbox svg path {
  fill: transparent !important;
}

.list-items .item:not(.checked):hover .checkbox svg path {
  fill: #9C27B0 !important;
}

.list-items .item.checked .checkbox svg path {
  fill: #ffffff !important;
}

/* Standard checkbox */
input[type="checkbox"] {
  accent-color: #9C27B0;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* Group Styles */
.group {
  border-top: 1px solid #eee;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 8px;
  overflow: hidden;
}

.group:first-child {
  border-top: none;
}

.group-header {
  font-weight: 500;
  padding: 8px 12px;
  background: #F8EAFA;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #9C27B0;
}

.group-header .collapse-icon {
  color: #9C27B0;
  font-size: 13px;
  transition: transform 0.3s;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
}

.group-header.active .collapse-icon {
  transform: rotate(-180deg);
}

.group-options {
  display: none;
  padding-left: 0;
}

/* Price Input */
.price-wrapper {
  position: relative;
  width: 100%;
}

.price-controls {
  position: absolute;
  right: 0;
  top: 1px;
  bottom: 1px;
  width: 20px;
  display: flex;
  flex-direction: column;
  background-color: #F8EAFA;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 8px 8px 0;
  overflow: hidden;
}

.price-up,
.price-down {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9C27B0;
  cursor: pointer;
  font-size: 8px;
  transition: background-color 0.2s, color 0.2s;
}

.price-up:hover,
.price-down:hover {
  background-color: #9C27B0;
  color: #fff;
}

/* Section Cards */
/* Added styles for the section layout */
.section {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-bottom: 0;
  overflow: hidden;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.section-card {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.section:not(.disabled) .section-card {
  cursor: pointer;
}

.section.active {
  border: 2px solid #9C27B0;
  box-shadow: 0 3px 8px rgba(154, 13, 242, 0.1);
}

.section:hover:not(.disabled) {
  border-color: #9C27B0;
  box-shadow: 0 3px 8px rgba(154, 13, 242, 0.1);
}

.section-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-icon {
  background-color: #F8EAFA;
  color: #9C27B0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title {
  font-weight: 700;
  font-size: 14px;
  color: #444;
}

.status-icon {
  font-size: 18px;
  color: #aaa;
}

/* Collapse Icon */
.collapse-icon {
  color: #9C27B0;
  font-size: 13px;
  transition: transform 0.3s;
  background: #F8EAFA;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.collapse-icon i {
  transition: transform 0.3s ease;
}

.collapse-icon.active {
  transform: rotate(-180deg);
}

/* Collapsible Section */
.collapsible-section {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease-out;
}

.collapsible-section.expanded {
  max-height: 1000px;
}

.section-content {
  padding: 20px;
  background: #fefefe;
  border-top: 1px solid #eee;
}

/* Inline Fields */
.inline-field {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

/* Disabled States */
/* Disabled States */
input:disabled,
select:disabled,
textarea:disabled,
button:disabled {
  cursor: not-allowed;
}

.disabled {
  cursor: not-allowed;
}
.dropdown-container.disabled {
  cursor: not-allowed;
}
.dropdown-container.disabled .select-btn {
  cursor: not-allowed;
}
          </style>

          <!-- Booking Form Fields -->
          <div>
              <label for="full-name" class="bold-label">
                  ${isEnglish ? 'Full Name' : 'Nom complet'}
              </label>
              <input
                  type="text"
                  id="full-name"
                  name="full-name"
                  placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}"
                  required
              />
          </div>

          <div> 
              <label for="email" class="bold-label">Email</label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}"
                  required
              />
          </div>

          <!-- Single-Select Dropdown for Seller -->
          <div>
              <label for="dropdown-seller" class="bold-label">
                  ${isEnglish ? 'Select a Seller' : 'Sélectionnez un vendeur'}
              </label>
              <div class="dropdown-container" id="dropdown-seller">
                  <div class="select-btn" tabindex="0">
                      <span class="btn-text">${isEnglish ? '-- Select a Seller --' : '-- Sélectionnez un vendeur --'}</span>
                      <span class="arrow-dwn">
                          ${SVG_CHEVRON}
                      </span>
                  </div>
                  <ul class="list-items single-select" id="sellerList"></ul>
              </div>
              <!-- Hidden input to store the chosen seller -->
              <input type="hidden" id="seller-name" name="seller-name" required />
          </div>

          <button type="button" class="book-now" id="cal-booking-button">
              ${isEnglish ? 'Book Now' : 'Réserver maintenant'}
          </button>
        `;

        // Append the form container to the provided element
        element.appendChild(formContainer);

        // Cal.com embed code
        (function (C, A, L) { 
          let p = function (a, ar) { a.q.push(ar); }; 
          let d = C.document; 
          C.Cal = C.Cal || function () { 
            let cal = C.Cal; 
            let ar = arguments; 
            if (!cal.loaded) { 
              cal.ns = {}; 
              cal.q = cal.q || []; 
              d.head.appendChild(d.createElement("script")).src = A; 
              cal.loaded = true; 
            } 
            if (ar[0] === L) { 
              const api = function () { p(api, arguments); }; 
              const namespace = ar[1]; 
              api.q = api.q || []; 
              if(typeof namespace === "string") {
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
              } else p(cal, ar); 
              return;
            } 
            p(cal, ar); 
          }; 
        })(window, "https://app.cal.com/embed/embed.js", "init");

        /*************************************************************
         * 2a) Populate Single-Select for Sellers
         *************************************************************/
        const sellerListEl = formContainer.querySelector("#sellerList");
        const sellers = getSellerList(false);
        sellers.forEach(seller => {
          const li = document.createElement("li");
          li.classList.add("item");
          li.innerHTML = `
            <span class="checkbox">
              ${SVG_CHECK}
            </span>
            <span class="item-text" data-value="${seller}">${seller}</span>
          `;
          sellerListEl.appendChild(li);
        });

        /*************************************************************
         * 2b) Setup Single-Select Logic for Seller Dropdown
         *************************************************************/
        function setupDropdownSingle(dropdownId, listId, hiddenInputId, defaultText) {
          const container = formContainer.querySelector(`#${dropdownId}`);
          const selectBtn = container.querySelector(".select-btn");
          const listEl = container.querySelector(`#${listId}`) || container.querySelector(".list-items");
          const btnText = selectBtn.querySelector(".btn-text");
          const hiddenInput = formContainer.querySelector(`#${hiddenInputId}`);

          if (defaultText) {
            btnText.innerText = defaultText;
          }

          const listItems = listEl.querySelectorAll(".item");

          selectBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            // Close other dropdowns if open
            formContainer.querySelectorAll(".dropdown-container").forEach((otherContainer) => {
              if (otherContainer !== container) {
                const otherSelectBtn = otherContainer.querySelector(".select-btn");
                const otherListEl = otherContainer.querySelector(".list-items");
                if (otherSelectBtn) otherSelectBtn.classList.remove("open");
                if (otherListEl) otherListEl.style.display = "none";
              }
            });
            selectBtn.classList.toggle("open");
            listEl.style.display = selectBtn.classList.contains("open") ? "block" : "none";
          });

          listItems.forEach((item) => {
            item.addEventListener("click", (e) => {
              e.stopPropagation();
              listItems.forEach((i) => i.classList.remove("checked"));
              item.classList.add("checked");

              const labelText = item.querySelector(".item-text").innerText;
              const value = item.querySelector(".item-text").getAttribute("data-value");
              btnText.innerText = labelText;
              hiddenInput.value = value;

              selectBtn.classList.remove("open");
              listEl.style.display = "none";
              
              // When a seller is selected, initialize Cal for that seller
              if (BookingData[value]) {
                const { namespace } = BookingData[value];
                Cal("init", namespace, {origin:"https://cal.com"});
                Cal.ns[namespace]("ui", {
                  "theme": "light",
                  "cssVarsPerTheme": {
                    "light": {"cal-brand": "#9C27B0"},
                    "dark": {"cal-brand": "#9C27B0"}
                  },
                  "hideEventTypeDetails": false,
                  "layout": "month_view"
                });
              }
            });
          });

          document.addEventListener("click", (e) => {
            if (!container.contains(e.target)) {
              selectBtn.classList.remove("open");
              listEl.style.display = "none";
            }
          });
        }

        // Initialize the single-select dropdown for Seller
        setupDropdownSingle(
          "dropdown-seller",
          "sellerList",
          "seller-name",
          isEnglish ? "-- Select a Seller --" : "-- Sélectionnez un vendeur --"
        );

        /*************************************************************
         * 2c) Booking Logic with Disable Functionality
         *************************************************************/
        const bookNowButton = formContainer.querySelector("#cal-booking-button");

        // Find the book now button event listener code and modify it to properly disable the dropdown
bookNowButton.addEventListener("click", () => {
  console.log("Book Now button clicked");
  
  const fullName = formContainer.querySelector("#full-name").value.trim();
  const email = formContainer.querySelector("#email").value.trim();
  const sellerName = formContainer.querySelector("#seller-name").value.trim();

  // Validations
  if (!fullName) {
    alert(isEnglish ? "Full Name is required." : "Le nom complet est obligatoire.");
    return;
  }
  if (!email || !isValidEmail(email)) {
    alert(isEnglish ? "Please enter a valid email address." : "Veuillez entrer une adresse email valide.");
    return;
  }
  if (!sellerName) {
    alert(isEnglish ? "Please select a seller." : "Veuillez sélectionner un vendeur.");
    return;
  }

  if (BookingData[sellerName]) {
    // Disable all form controls to prevent further interaction
    const formElements = formContainer.querySelectorAll("input, select, textarea, button");
    formElements.forEach(el => {
      el.disabled = true;
    });
    
    // Here's the fix - properly disable the dropdown by:
    // 1. Adding disabled class
    // 2. Removing the click event listener by cloning and replacing the element
    const dropdownContainer = formContainer.querySelector("#dropdown-seller");
    const selectBtn = dropdownContainer.querySelector(".select-btn");
    
    // Add disabled class
    selectBtn.classList.add("disabled");
    dropdownContainer.classList.add("disabled");
    
    // Clone and replace to remove event listeners
    const newSelectBtn = selectBtn.cloneNode(true);
    selectBtn.parentNode.replaceChild(newSelectBtn, selectBtn);
    
    // Make sure dropdown is closed
    formContainer.querySelector(".list-items").style.display = "none";
    
    // Update the Book Now button text to indicate processing
    bookNowButton.textContent = isEnglish ? "Processing..." : "Traitement...";

    const { link, namespace } = BookingData[sellerName];
    console.log(`Opening Cal for ${sellerName} (namespace: ${namespace}, link: ${link})`);

    // Voiceflow integration
    window.voiceflow.chat.interact({
      type: "complete",
      payload: { fullName, email, sellerName, link },
    });

    // Create a new, hidden button that will trigger Cal.com
    const calTrigger = document.createElement('button');
    calTrigger.style.display = 'none';
      
    // Add name and email as URL parameters
    const calLinkWithParams = `${link}/${namespace}?name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}`;

    calTrigger.setAttribute('data-cal-link', calLinkWithParams);
    calTrigger.setAttribute('data-cal-namespace', namespace);
    calTrigger.setAttribute('data-cal-config', JSON.stringify({
      layout: "month_view",
      theme: "light"
    }));
    
    // Append and click the trigger to launch the booking process
    document.body.appendChild(calTrigger);
    calTrigger.click();
  } else {
    alert(isEnglish ? "No booking information available for the selected seller." : "Aucune information de réservation disponible pour le vendeur sélectionné.");
  }
});

        // Finally, attach the form to the element
        element.appendChild(formContainer);
      },
    };

const BookingExtension_2 = {
  name: "Forms",
  type: "response",
  match: ({ trace }) =>
    trace.type === 'ext_booking_2' || trace.payload?.name === 'ext_booking_2',
  render: ({ trace, element }) => {
    const { language, seller } = trace.payload || {};
    const isEnglish = language === 'en';
    
   

    const formContainer = document.createElement("form");

    formContainer.innerHTML = `
      <style>
        /* Variables for consistent theming */
        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background: transparent;
          padding: 16px;
          border-radius: 8px;
          min-width: 300px;
        }
        .bold-label {
          font-weight: 600;
          color: #000;
          font-size: 14px;
          margin-bottom: 4px;
          display: block;
        }
        input[type="text"],
        input[type="email"],
        input[type="tel"],
        select.form-select {
          width: 100%;
          border: 1px solid rgba(0,0,0,0.2);
          border-radius: 8px;
          padding: 8px;
          background: #fff;
          font-size: 13px;
          outline: none;
          box-sizing: border-box;
        }
        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="tel"]:focus,
        select.form-select:focus {
          border: 2px solid #9C27B0;
        }
        .book-now {
          color: #9C27B0;
          background-color: #F8EAFA;
          border: none;
          padding: 12px;
          border-radius: 8px;
          width: 100%;
          font-size: 16px;
          cursor: pointer;
          margin-top: 8px;
          transition: background-color 0.3s;
        }
        .book-now:hover {
          background-color: #9C27B0;
          font-weight: 700;
          color: #fff;
        }
        .book-now:disabled {
          background-color: #4CAF50;
          color: white;
          cursor: not-allowed;
          font-weight: 700;
        }
        .flex-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .flex-row > div {
          flex: 1;
          min-width: 200px;
        }
        .info-row {
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 10px;
          border: 1px solid #e0e0e0;
        }
        .info-label {
          font-weight: 500;
          margin-right: 5px;
          color: #555;
        }
        .info-value {
          font-weight: 600;
          color: #9C27B0;
        }
        
        /* Disabled States */
        input:disabled,
        select:disabled,
        textarea:disabled,
        button:disabled {
          cursor: not-allowed;
        }
        .disabled {
          cursor: not-allowed;
        }
      </style>
     
      <div>
        <label for="full-name" class="bold-label">
            ${isEnglish ? 'Full Name' : 'Nom complet'}
        </label>
        <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required>
      </div>
      <div>
        <label for="email" class="bold-label">Email</label>
        <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required>
      </div>
      

      <button type="button" class="book-now" id="book-now">
        ${isEnglish ? 'Schedule Appointment' : 'Planifier un rendez-vous'}
      </button>
    `;

    element.appendChild(formContainer);

    // Cal.com script - properly formatted
    (function (C, A, L) { 
      let p = function (a, ar) { a.q.push(ar); }; 
      let d = C.document; 
      C.Cal = C.Cal || function () { 
        let cal = C.Cal; 
        let ar = arguments; 
        if (!cal.loaded) { 
          cal.ns = {}; 
          cal.q = cal.q || []; 
          d.head.appendChild(d.createElement("script")).src = A; 
          cal.loaded = true; 
        } 
        if (ar[0] === L) { 
          const api = function () { p(api, arguments); }; 
          const namespace = ar[1]; 
          api.q = api.q || []; 
          if(typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar); 
          return;
        } 
        p(cal, ar); 
      }; 
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // If a seller is provided, pre-initialize Cal
    if (seller && BookingData[seller]) {
      const { namespace } = BookingData[seller];
      Cal("init", namespace, {origin:"https://cal.com"});
      Cal.ns[namespace]("ui", {
        "theme": "light",
        "cssVarsPerTheme": {
          "light": {"cal-brand": "#9C27B0"},
          "dark": {"cal-brand": "#9C27B0"}
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    }

    // Event listener for "Book Now" click
    const bookNowButton = formContainer.querySelector("#book-now");
    bookNowButton.addEventListener("click", () => {
      const fullName = formContainer.querySelector("#full-name").value.trim();
      const email = formContainer.querySelector("#email").value.trim();
      const sellerName = seller; // Use the seller from the payload

      // Validation
      if (!fullName) {
        alert(isEnglish ? "Full Name is required." : "Le nom complet est obligatoire.");
        return;
      }
      
      if (!email || !isValidEmail(email)) {
        alert(isEnglish ? "Please enter a valid email address." : "Veuillez entrer une adresse email valide.");
        return;
      }
      
      if (!sellerName) {
        alert(isEnglish ? "No seller specified. Please contact support." : "Aucun vendeur spécifié. Veuillez contacter le support.");
        return;
      }
      
      if (!BookingData[sellerName]) {
        alert(isEnglish ? "No booking information available for the selected seller." : "Aucune information de réservation disponible pour le vendeur sélectionné.");
        return;
      }
      
      // Disable all form controls to prevent further interaction
      const formElements = formContainer.querySelectorAll("input, select, textarea, button");
      formElements.forEach(el => {
        el.disabled = true;
      });
      
      // Update the Book Now button text to indicate processing
      bookNowButton.textContent = isEnglish ? "Processing..." : "Traitement...";
      
      // Send data to Voiceflow
      if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.interact({
          type: "complete",
          payload: { 
            fullName, 
            email, 
            sellerName
          }
        });
      }
        
      // Cal.com integration
      try {
        // Get booking data for this agent
        const agentBookingInfo = BookingData[sellerName];
        const { link, namespace } = agentBookingInfo;
        
        console.log(`Using Cal.com data: link=${link}, namespace=${namespace}`);
        
        // Create a hidden button to trigger Cal
        const calTrigger = document.createElement('button');
        calTrigger.style.display = 'none';
        
        // Add URL parameters for name and email
        const calLinkWithParams = `${link}/${namespace}?name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}`;
        
        // Set attributes for Cal
        calTrigger.setAttribute('data-cal-link', calLinkWithParams);
        calTrigger.setAttribute('data-cal-namespace', namespace);
        calTrigger.setAttribute('data-cal-config', JSON.stringify({
          layout: "month_view",
          theme: "light"
        }));
        
        // Listen for booking events
        Cal.ns[namespace]("on", {
          action: "booking_successful",
          callback: (event) => {
            console.log(`Booking successful with namespace: ${namespace}`, event);
            bookNowButton.textContent = isEnglish ? "Appointment Confirmed" : "Rendez-vous confirmé";
            bookNowButton.style.backgroundColor = "#4CAF50";
            bookNowButton.style.color = "white";
          }
        });
        
        Cal.ns[namespace]("on", {
          action: "modal_closed",
          callback: () => {
            console.log(`Booking modal closed for namespace: ${namespace}`);
            if (bookNowButton.textContent === (isEnglish ? "Processing..." : "Traitement...")) {
              bookNowButton.textContent = isEnglish ? "Schedule Appointment" : "Planifier un rendez-vous";
              bookNowButton.disabled = false;
              
              // Re-enable form elements if the modal is closed without booking
              formElements.forEach(el => {
                el.disabled = false;
              });
            }
          }
        });
        
        // Append and click to trigger Cal
        document.body.appendChild(calTrigger);
        calTrigger.click();
        
      } catch (error) {
        console.error("Error initializing Cal:", error);
        bookNowButton.textContent = isEnglish ? "Error - Please Try Again" : "Erreur - Veuillez réessayer";
        setTimeout(() => {
          bookNowButton.textContent = isEnglish ? "Schedule Appointment" : "Planifier un rendez-vous";
          bookNowButton.disabled = false;
          
          // Re-enable form elements on error
          formElements.forEach(el => {
            el.disabled = false;
          });
        }, 3000);
      }
    });
  },
};

const RescheduleExtension = {
  name: "Forms",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_reschedule" || trace.payload?.name === "ext_reschedule",

  render: ({ trace, element }) => {
    // Handle various payload formats for backward compatibility
    const { 
      language = "en", 
      Uid = trace.payload.rescheduleUid, 
      email = trace.payload.email, 
      link = trace.payload.link,
	  namespace = trace.payload.namespace
    } = trace.payload;
    
    const isEnglish = language === 'en';

    // Create the container
    const container = document.createElement("div");

    // Insert the style and HTML for the reschedule button
    container.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        .reschedule-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          background: transparent;
          padding: 16px;
          border-radius: 8px;
          min-width: 300px;
          align-items: center;
        }
        .reschedule {
          color: #9C27B0;
          background-color: #F8EAFA;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          margin-top: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .reschedule:active {
          transform: translateY(0);
          box-shadow: 0 2px 3px rgba(0,0,0,0.1);
        }
        
        .reschedule:hover:not(:disabled) {
      background-color: #9C27B0;
      font-weight: 700;
      color: #fff;
    }
    .reschedule:disabled {
      background-color: #ccc;
      color: #666;
      cursor: not-allowed;
    }
    
        .debug-info {
          font-size: 12px;
          color: #666;
          margin-top: 10px;
          display: none;
        }
      </style>

      <div class="reschedule-container">
        <button type="button" class="reschedule" id="cal-reschedule-button">
            ${isEnglish ? 'Reschedule Appointment' : 'Reprogrammer le rendez-vous'}
        </button>
        <div class="debug-info" id="debug-info"></div>
      </div>
    `;

    // Append the container to the provided element
    element.appendChild(container);

    // ====== Cal.com Initialization ======
    (function(C, A, L) {
      let p = function(a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal = C.Cal || function() {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function() {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // ====== reschedule Logic ======
    const rescheduleButton = container.querySelector("#cal-reschedule-button");
    const debugInfo = container.querySelector("#debug-info");
    
    rescheduleButton.addEventListener("click", () => {
	rescheduleButton.textContent = isEnglish ? "Processing..." : "Traitement...";
  rescheduleButton.style.backgroundColor = "#4CAF50";
  rescheduleButton.style.color = "white";

      // Notify Voiceflow that we're proceeding with reschedule
      if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.interact({
          type: "reschedule_started",
          payload: { 
            email,
            Uid,
            link
          },
        });
      }
      
      // Disable button to prevent multiple clicks
      rescheduleButton.disabled = true;
	  

      
      try {
        // Initialize Cal for the namespace
        Cal("init", namespace, {
          origin: "https://cal.com"
        });
        
        // Set UI preferences
        Cal.ns[namespace]("ui", {
          "theme": "light",
          "cssVarsPerTheme": {
            "light": {"cal-brand": "#9C27B0"},
            "dark": {"cal-brand": "#9C27B0"}
          },
          "hideEventTypeDetails": false,
          "layout": "week_view"
        });
        
        // Create a button with data-cal-link attribute that will trigger Cal.com directly
        const calTrigger = document.createElement('button');
        calTrigger.style.display = 'none';
        
        // Build the link with reschedule parameters - this is the key part that needs fixing
        const calLinkWithParams = `${link}?rescheduleUid=${Uid}&rescheduledBy=${email}`;
        
       
        
        // Set up the data-cal-link attributes
        calTrigger.setAttribute('data-cal-link', calLinkWithParams);
        calTrigger.setAttribute('data-cal-namespace', namespace);
        calTrigger.setAttribute('data-cal-config', JSON.stringify({
          layout: "week_view",
          theme: "light"
        }));
        
        // Setup event listener for successful reschedule
        Cal.ns[namespace]("on", {
          action: "reschedule_successful",
          callback: (event) => {
            console.log("reschedule successful", event);
            
            // Notify Voiceflow that reschedule is complete
            if (window.voiceflow && window.voiceflow.chat) {
              window.voiceflow.chat.interact({
                type: "complete",
                payload: { 
                  email,
                  link,
                  Uid
                },
              });
            }
          }
        });
        
        // Append the trigger to the body and click it
        document.body.appendChild(calTrigger);
        
        // Small timeout to ensure Cal.js has initialized
        setTimeout(() => {
          calTrigger.click();
        }, 300);
      } catch (error) {
        console.error("Error initializing Cal:", error);
        debugInfo.textContent = `Error: ${error.message}`;
        debugInfo.style.display = 'block';
        rescheduleButton.disabled = false;
        rescheduleButton.textContent = isEnglish ? 'Reschedule Appointment' : 'Reprogrammer le rendez-vous';
      }
    });

    // Return a cleanup function
    return function cleanup() {
      rescheduleButton.render({ trace, element: container });
    };
  },
};



const CancellationExtension = {
      name: "Forms",
      type: "response",
      match: ({ trace }) =>
        trace.type === "ext_cancellation" || trace.payload?.name === "ext_cancellation",

      render: ({ trace, element }) => {
        // Handle various payload formats for backward compatibility
        const { 
          language = "en", 
          Uid = trace.payload.Uid, 
          email = trace.payload.email, 
          namespace = trace.payload.namespace
        } = trace.payload;
        
        const isEnglish = language === 'en';

        // Create the container
        const container = document.createElement("div");

        // Insert the style and HTML for the cancellation button
        container.innerHTML = `
          <style>
            .cancel-container {
              display: flex;
              flex-direction: column;
              gap: 10px;
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
              background: transparent;
              padding: 16px;
              border-radius: 8px;
              min-width: 300px;
              align-items: center;
            }
            .cancel {
              color: #d32f2f;
              background-color: #ffebee;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 500;
              cursor: pointer;
              margin-top: 8px;
              transition: all 0.3s ease;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }

            .cancel:active {
              transform: translateY(0);
              box-shadow: 0 2px 3px rgba(0,0,0,0.1);
            }
            
            .cancel:hover:not(:disabled) {
              background-color: #d32f2f;
              font-weight: 700;
              color: #fff;
            }
            .cancel:disabled {
              background-color: #ccc;
              color: #666;
              cursor: not-allowed;
            }
            
            .debug-info {
              font-size: 12px;
              color: #666;
              margin-top: 10px;
              display: none;
            }
          </style>

          <div class="cancel-container">
            <button type="button" class="cancel" id="cal-cancel-button">
                ${isEnglish ? 'Cancel Appointment' : 'Annuler le rendez-vous'}
            </button>
            <div class="debug-info" id="debug-info"></div>
          </div>
        `;

        // Append the container to the provided element
        element.appendChild(container);

        // ====== Cal.com Initialization ======
        (function(C, A, L) {
          let p = function(a, ar) {
            a.q.push(ar);
          };
          let d = C.document;
          C.Cal = C.Cal || function() {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function() {
                p(api, arguments);
              };
              const namespace = ar[1];
              api.q = api.q || [];
              if (typeof namespace === "string") {
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
              } else p(cal, ar);
              return;
            }
            p(cal, ar);
          };
        })(window, "https://app.cal.com/embed/embed.js", "init");

        // ====== cancel Logic ======
        const cancelButton = container.querySelector("#cal-cancel-button");
        const debugInfo = container.querySelector("#debug-info");
        
        cancelButton.addEventListener("click", () => {

          
          // Notify Voiceflow that we're proceeding with cancellation
          if (window.voiceflow && window.voiceflow.chat) {
            window.voiceflow.chat.interact({
              type: "cancellation_started",
              payload: { 
                email,
                Uid
              },
            });
          }
          
          // Disable button to prevent multiple clicks
          cancelButton.disabled = true;
		  cancelButton.textContent = isEnglish ? "Processing..." : "Traitement...";
  cancelButton.style.backgroundColor = "#4CAF50";
  cancelButton.style.color = "white";

          try {
            // Initialize Cal for the namespace
            Cal("init", namespace, {
              origin: "https://cal.com"
            });
            
            // Set UI preferences
            Cal.ns[namespace]("ui", {
              "theme": "light",
              "cssVarsPerTheme": {
                "light": {"cal-brand": "#d32f2f"},
                "dark": {"cal-brand": "#d32f2f"}
              },
              "hideEventTypeDetails": false,
              "layout": "week_view"
            });
            
            // Create a button with data-cal-link attribute that will trigger Cal.com directly
            const calTrigger = document.createElement('button');
            calTrigger.style.display = 'none';
            
            // Build the cancellation link with the data attributes to open Cal.com inline
            // The key difference: we need to use the data attributes to make it open in same page
            const cancellationLink = `cancel/${Uid}?cancel=true&allRemainingcancels=false&cancelledBy=${email}`;
            
            // Set data attributes to match the Cal.com SDK expected format
            calTrigger.setAttribute('data-cal-link', cancellationLink);
            calTrigger.setAttribute('data-cal-namespace', namespace);
            calTrigger.setAttribute('data-cal-config', JSON.stringify({
              layout: "week_view",
              theme: "light",
              hideEventTypeDetails: false,
              // This is the key to making it cancel instead of reschedule:
              actionType: "cancel",
              cancelParams: {
                allRemainingcancels: false,
                cancelledBy: decodeURIComponent(email)
              }
            }));
            
            // Setup event listener for successful cancellation
            Cal.ns[namespace]("on", {
              action: "cancel_cancelled",
              callback: (event) => {
                console.log("cancel cancelled", event);
                
                // Notify Voiceflow that cancellation is complete
                if (window.voiceflow && window.voiceflow.chat) {
                  window.voiceflow.chat.interact({
                    type: "cancellation_complete",
                    payload: { 
                      email,
                      Uid
                    },
                  });
                }
                
                // Re-enable button 
                cancelButton.disabled = false;
                cancelButton.textContent = isEnglish ? 'Cancel Appointment' : 'Annuler le rendez-vous';
              }
            });
            
            // Listen for any failure events
            Cal.ns[namespace]("on", {
              action: "error",
              callback: (error) => {
                console.error("Cal error:", error);
                debugInfo.textContent = `Cal error: ${JSON.stringify(error)}`;
                debugInfo.style.display = 'block';
                
                // Re-enable button
                cancelButton.disabled = false;
                cancelButton.textContent = isEnglish ? 'Cancel Appointment' : 'Annuler le rendez-vous';
              }
            });
            
            // Append the trigger to the body and click it
            document.body.appendChild(calTrigger);
            
            // Small timeout to ensure Cal.js has initialized
            setTimeout(() => {
              calTrigger.click();
            }, 300);
          } catch (error) {
            console.error("Error initializing Cal:", error);
            debugInfo.textContent = `Error: ${error.message}`;
            debugInfo.style.display = 'block';
            cancelButton.disabled = false;
            cancelButton.textContent = isEnglish ? 'Cancel Appointment' : 'Annuler le rendez-vous';
          }
        });

        // Return a cleanup function
        return function cleanup() {
          // This should be fixed to properly remove the event listener
          const button = container.querySelector("#cal-cancel-button");
          if (button) {
            button.remove();
          }
        };
      },
    };


/************** EXTENSION #5: ImageExtension **************/
const ImageExtension = {
      name: 'ImageExtension',
      type: 'response',
      match: ({ trace }) => trace.type === 'ext_image_extension' || trace.payload?.name === 'ext_image_extension',
      render: ({ trace, element }) => {
        console.log('ImageExtension render called');

        // Get images from payload
        const { images } = trace.payload;
        const errorContainer = document.getElementById('error-container');

        // Error check for images
        if (!images) {
          console.error('No images provided in trace payload');
          if (errorContainer) {
            errorContainer.textContent = 'Error: No images provided';
          }
          return;
        }

        // Parse image list
        let imageList = [];
        try {
          imageList = images.split(',').map(url => url.trim()).filter(Boolean);
          if (imageList.length === 0) {
            console.error('No valid images found in payload');
            if (errorContainer) {
              errorContainer.textContent = 'Error: No valid images found';
            }
            return;
          }
        } catch (error) {
          console.error('Error parsing image list:', error);
          if (errorContainer) {
            errorContainer.textContent = 'Error parsing image list';
          }
          return;
        }

        // Clear any previous errors
        if (errorContainer) {
          errorContainer.textContent = '';
        }

        // Create image gallery container
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'image-gallery';
        galleryContainer.innerHTML = `
          <style>
            .image-gallery {
              width: 100%;
              margin-bottom: 15px;
            }
            .gallery-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            }
            .gallery-title {
              font-weight: bold;
              color: #333;
              font-size: 16px;
            }
            .gallery-nav {
              display: flex;
              gap: 10px;
            }
            .nav-btn {
              background-color: #F8EAFA;
              color: #9C27B0;
              border: none;
              border-radius: 50%;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              font-size: 16px;
              transition: background-color 0.3s;
            }
            .nav-btn:hover {
              background-color: #9C27B0;
              color: white;
            }
            .gallery-image-container {
              width: 100%;
              position: relative;
              margin-bottom: 10px;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            }
            .gallery-image {
              max-width: 800px;
              display: block;
              height: auto;
              max-height: 400px;
              object-fit: cover;
            }
            .image-counter {
              position: absolute;
              bottom: 10px;
              right: 10px;
              background-color: rgba(0,0,0,0.5);
              color: white;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 12px;
            }
	    /* Media query for phone screens */
            @media (max-width: 768px) {
              .image-gallery {
                width: 300px;
              }
              .gallery-image {
                max-width: 300px;
                height: auto;
                max-height: none;
              }
            }
          </style>

          <div class="gallery-header">
            <div class="gallery-title"> </div>
            <div class="gallery-nav">
              <button class="nav-btn prev-btn">&#10094;</button>
              <button class="nav-btn next-btn">&#10095;</button>
            </div>
          </div>
          
          <div class="gallery-image-container">
            <img class="gallery-image" src="${imageList[0]}" alt="Gallery image">
            <div class="image-counter">1/${imageList.length}</div>
          </div>
        `;

        // Add image navigation functionality
        let currentIndex = 0;
        const prevBtn = galleryContainer.querySelector('.prev-btn');
        const nextBtn = galleryContainer.querySelector('.next-btn');
        const galleryImage = galleryContainer.querySelector('.gallery-image');
        const imageCounter = galleryContainer.querySelector('.image-counter');

        // Navigation functions
        function updateImage() {
          galleryImage.src = imageList[currentIndex];
          imageCounter.textContent = `${currentIndex + 1}/${imageList.length}`;
        }

        prevBtn.addEventListener('click', () => {
          currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
          updateImage();
        });

        nextBtn.addEventListener('click', () => {
          currentIndex = (currentIndex + 1) % imageList.length;
          updateImage();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
            updateImage();
          } else if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % imageList.length;
            updateImage();
          }
        });

        // Append to the element
        element.appendChild(galleryContainer);
      }
    };


/************** EXTENSION #6: LocalisationExtension **************/
const LocalisationExtension = {
      name: 'Localisation',
      type: 'response',
      match: ({ trace }) =>
        trace.type === 'ext_localisation' || trace.payload?.name === 'ext_localisation',
      render: ({ trace, element }) => {
        const { language, key, LAT, LNG } = trace.payload;

        // Create the container element
        const container = document.createElement("div");

        // Determine container width based on device screen width
        const containerWidth = window.innerWidth <= 768 ? "300px" : "800px";
	const containerHeight = window.innerWidth <= 768 ? "500px" : "400px";

        container.style.cssText = `
          width: ${containerWidth};
          height: ${containerHeight};
          border: 1px solid #888;
          border-radius: 8px;
          overflow: hidden;
        `;
        element.appendChild(container);

        function loadSDKScript() {
          return new Promise((resolve, reject) => {
            if (document.querySelector('script[src="https://sdk.locallogic.co/sdks-js/1.13.2/index.umd.js"]')) {
              resolve();
              return;
            }
            const sdkScript = document.createElement('script');
            sdkScript.src = "https://sdk.locallogic.co/sdks-js/1.13.2/index.umd.js";
            sdkScript.async = true;
            sdkScript.onload = () => resolve();
            sdkScript.onerror = () =>
              reject(new Error('Failed to load LocalLogic SDK script.'));
            document.body.appendChild(sdkScript);
          });
        }

        loadSDKScript()
          .then(() => {
            if (typeof LLSDKsJS === 'undefined') {
              container.innerHTML = "LocalLogic SDK not available.";
              return;
            }

            const ll = LLSDKsJS(key, {
              locale: language,
              appearance: {
                theme: "day",
                variables: {
                  "--ll-color-primary": "#9C27B0",
                  "--ll-color-primary-variant1": "#9C27B0",
                  "--ll-border-radius-small": "8px",
                  "--ll-border-radius-medium": "16px",
                  "--ll-font-family": "Avenir, sans-serif"
                }
              }
            });

            // Render the local content inside our container
            ll.create("local-content", container, {
              lat: parseFloat(LAT),
              lng: parseFloat(LNG),
              cooperativeGestures: false,
              marker: { lat: parseFloat(LAT), lng: parseFloat(LNG) },
              zoom: 20
            });
          })
          .catch(error => {
            container.innerHTML = "Error loading local content.";
            console.error(error);
          });
      }
    };







    // --- MortgageCalculatorExtension ---
    const MortgageCalculatorExtension = {
      name: "MortgageCalculator",
      type: "response",
      match: ({ trace }) =>
        trace.type === "mortgage_calculator" || trace.payload?.name === "mortgage_calculator",
      render: ({ trace, element }) => {
        const { propertyCost = 500000, language = "en" } = trace.payload || {};
        
        const translations = {
  fr: {
    title: "Calculatrice de Versements Hypothécaires",
    propertyValue: "Coût de la propriété :",
    downPayment: "Mise de fonds :",
    loanAmount: "Montant du prêt :",
    interestRate: "Taux d'intérêt (%) :",
    amortizationPeriod: "Période d'amortissement :",
    paymentFrequency: "Fréquence des versements :",
    paymentResult: "Paiement estimé",
    years: "ans",
    weekly: "Hebdomadaire",
    biweekly: "Aux 2 semaines",
    monthly: "Mensuelle",
    perWeek: "/semaine",
    perBiweek: "/2 semaines",
    perMonth: "/mois",
    selectFrequency: "Sélectionnez la fréquence des versements",
    calculate: "Calculer",
    language: "Langue",
    errorInvalidProperty: "Veuillez entrer une valeur de propriété valide.",
    errorMaxDownPayment: "La mise de fonds ne peut pas dépasser la valeur de la propriété.",
    errorMinDownPayment: "La mise de fonds minimale est de {amount} $ (5 %) de la valeur de la propriété.",
    errorInvalidDownPayment: "Veuillez entrer une mise de fonds valide.",
    downPaymentAvailable: "Mise de fonds disponible",
    estimatedPayment: "Montant estimé du paiement",
    borrowingCapacity: "Votre capacité d'emprunt estimée"
  },
  en: {
    title: "Mortgage Payment Calculator",
    propertyValue: "Property Value:",
    downPayment: "Down Payment:",
    loanAmount: "Loan Amount:",
    interestRate: "Interest Rate (%):",
    amortizationPeriod: "Amortization Period:",
    paymentFrequency: "Payment Frequency:",
    paymentResult: "Estimated Payment",
    years: "years",
    weekly: "Weekly",
    biweekly: "Bi-weekly",
    monthly: "Monthly",
    perWeek: "/week",
    perBiweek: "/2 weeks",
    perMonth: "/month",
    selectFrequency: "Select payment frequency",
    calculate: "Calculate",
    language: "Language",
    errorInvalidProperty: "Please enter a valid property value.",
    errorMaxDownPayment: "Down payment cannot exceed property value.",
    errorMinDownPayment: "Minimum down payment is ${amount} (5%) of Property Value.",
    errorInvalidDownPayment: "Please enter a valid down payment.",
    downPaymentAvailable: "Down Payment Available",
    estimatedPayment: "Estimated Payment Amount",
    borrowingCapacity: "Your Estimated Borrowing Capacity"
  },
};

        
        let currentLanguage = language;
        const text = () => translations[currentLanguage] || translations.en;
        const minDownPayment = (propertyCost * 0.05).toFixed(2);

        // Define allowed amortization years list.
        const allowedAmortizations = [5, 10, 15, 20, 25, 30];

        // Create the form container (all element queries will be scoped to formContainer)
        const formContainer = document.createElement("div");
        formContainer.innerHTML = `
          <style>
            /* Form Styling */
            form {
              display: flex;
              flex-direction: column;
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
            }
            .form-row {
              display: flex;
              flex-wrap: wrap;
              gap: 15px;
              margin-bottom: 15px;
            }
            .form-column {
              flex: 1;
              min-width: 200px;
            }
            .bold-label {
              font-weight: 600;
              display: block;
              margin-bottom: 5px;
              color: #000;
              font-size: 14px;
            }
            .input-group {
              position: relative;
              width: 100%;
            }
            .currency-input {
              height: 40px;
              width: 100%;
              border: 1px solid rgba(0, 0, 0, 0.2);
              border-radius: 8px;
              padding: 12px;
              background: #fff;
              font-size: 13px;
              outline: none;
              box-sizing: border-box;
              padding-left: 30px;
            }
            .currency-symbol {
              position: absolute;
              left: 10px;
              top: 50%;
              transform: translateY(-50%);
              color: black;
            }
            .number-input-wrapper {
              position: relative;
              width: 100%;
            }
            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            input[type="number"] {
              -moz-appearance: textfield;
            }
	    input[type="text"], input[type="number"] {
      width: 100%;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      padding: 8px 8px 8px 20px;
      background: #fff;
      font-size: 13px;
      outline: none;
      box-sizing: border-box;
      height: 40px;
      left: 10px !important;
    }
            .number-input-controls {
              position: absolute;
              right: 0px;
              top: 0px;
              bottom: 0px;
              width: 20px;
              display: flex;
              flex-direction: column;
              background-color: #F8EAFA;
              border: 1px solid rgba(0,0,0,0.1);
              border-radius: 0 8px 8px 0;
              overflow: hidden;
            }
            .number-input-up,
            .number-input-down {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #9C27B0;
              cursor: pointer;
              font-size: 8px;
            }
            .number-input-up:hover,
            .number-input-down:hover {
              background-color: #9C27B0;
              color: #fff;
            }
            /* Dropdown Styles */
            .dropdown-container {
              position: relative;
              max-width: 100%;
              margin-top: 4px;
            }
            .select-btn {
              display: flex;
              height: 40px;
              align-items: center;
              justify-content: space-between;
              padding: 0 12px;
              border-radius: 8px;
              cursor: pointer;
              background-color: #fff;
              border: 1px solid rgba(0,0,0,0.2);
              color: #555;
            }
            .select-btn .btn-text {
              font-size: 13px;
              font-weight: 400;
              color: black;
            }
            .arrow-dwn {
              display: flex;
              height: 24px;
              width: 24px;
              color: #9C27B0;
              font-size: 12px;
              border-radius: 50%;
              background: #F8EAFA;
              align-items: center;
              justify-content: center;
              transition: 0.3s;
            }
            .select-btn.open .arrow-dwn {
              transform: rotate(-180deg);
            }
            .select-btn:focus,
            .select-btn.open {
              border: 2px solid #9C27B0;
            }
            .list-items {
              position: static;
              top: 100%;
              left: 0;
              right: 0;
              margin-top: 4px;
              border-radius: 8px;
              padding: 8px 0;
              background-color: #fff;
              box-shadow: 0 4px 8px rgba(0,0,0,0.08);
              display: none;
              max-height: 200px;
              overflow-y: auto;
              z-index: 100;
            }
            /* Dropdown style with checkboxes */
            .list-items .item {
              display: flex;
              align-items: center;
              height: 36px;
              cursor: pointer;
              transition: 0.3s;
              padding: 0 12px;
              border-radius: 8px;
            }
            .list-items .item:hover {
              background-color: #F8EAFA;
            }
            .item .checkbox {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 16px;
              width: 16px;
              border-radius: 50%;
              margin-right: 8px;
              border: 1.5px solid #c0c0c0;
              transition: all 0.3s ease-in-out;
            }
            .item.checked .checkbox {
              background-color: #9C27B0;
              border: 2px solid #9C27B0;
            }
            .checkbox .check-icon {
              color: #fff;
              font-size: 12px;
              transform: scale(0);
              transition: all 0.2s ease-in-out;
            }
            .item.checked .check-icon {
              transform: scale(1);
            }
            .list-items .item:not(.checked) .checkbox svg path {
              fill: transparent !important;
            }
            .list-items .item:not(.checked):hover .checkbox svg path {
              fill: #9C27B0 !important;
            }
            .list-items .item.checked .checkbox svg path {
              fill: #ffffff !important;
            }
            .item .item-text {
              font-size: 13px;
              font-weight: 400;
              color: #333;
              margin-left: 8px;
            }
            /* Results Styles */
            .results-container {
              margin-top: 20px;
              padding: 15px;
              background-color: #F8EAFA;
              border-radius: 8px;
              text-align: center;
            }
            .results-title {
              margin: 0 0 10px 0;
              color: #333;
              font-size: 16px;
              font-weight: 600;
            }
            .results-amount {
              font-size: 2em;
              color: #9C27B0;
              font-weight: bold;
              margin: 15px 0;
            }
            input[readonly] {
              background-color: #f9f9f9;
              cursor: not-allowed;
            }
            .result h3 {
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 10px;
              color: #333;
            }
            .result .amount {
              font-size: 24px;
              font-weight: bold;
              color: #9C27B0;
              margin: 15px 0;
            }
            .result .hint {
              font-size: 12px;
              color: #666;
              margin-bottom: 15px;
            }
            #min-down-payment-message {
              color: red;
              font-size: 16px;
              margin-top: 5px;
              margin-bottom: 10px;
              text-align: center;
              padding: 10px;
              border-radius: 4px;
              font-weight: bold;
            }
            #error-message {
              color: red;
              font-size: 12px;
              margin-top: 5px;
            }
            #loan-amount {
  background-color: #9C27B0 !important; /* Purple background */
  color: white !important;
  border-color: #9C27B0 !important;
}

#loan-amount + .currency-symbol,
.input-group:has(#loan-amount) .currency-symbol {
  color: white !important;

}
          </style>

          <!-- Minimum Down Payment Message -->
          <div id="min-down-payment-message" style="display: none;"></div>
          
          <!-- Input Fields -->
          <div class="form-row">
            <div class="form-column">
              <label for="property-cost" class="bold-label">
                ${text().propertyValue}
              </label>
              <div class="input-group number-input-wrapper">
                <span class="currency-symbol">$</span>
                <input type="text" id="property-cost" class="currency-input" required
                       placeholder="Enter property value"
                       value="${formatNumber(propertyCost)}">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="property-cost" data-step="500">▲</div>
                  <div class="number-input-down" data-target="property-cost" data-step="500">▼</div>
                </div>
              </div>
            </div>
            <div class="form-column">
              <label for="down-payment" class="bold-label">
                ${text().downPayment}
              </label>
              <div class="input-group number-input-wrapper">
                <span class="currency-symbol">$</span>
                <input type="text" id="down-payment" class="currency-input" required
                       placeholder="Enter down payment"
                       value="${formatNumber(propertyCost * 0.05)}">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="down-payment" data-step="250">▲</div>
                  <div class="number-input-down" data-target="down-payment" data-step="250">▼</div>
                </div>
              </div>
              <div id="error-message" style="display: none;"></div>
            </div>
          </div>
    
          <div class="form-row">
            <div class="form-column">
              <label for="interest-rate" class="bold-label">
                ${text().interestRate}
              </label>
              <div class="input-group number-input-wrapper">
                <input type="number" id="interest-rate" class="currency-input" required
                       placeholder="Enter interest rate"
                       min="1" max="100" step="0.05" value="5.9">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="interest-rate" data-step="0.05">▲</div>
                  <div class="number-input-down" data-target="interest-rate" data-step="0.05">▼</div>
                </div>
              </div>
            </div>
            <div class="form-column">
              <label class="bold-label" for="amortization" id="amortization-label">
                ${text().amortizationPeriod}
              </label>
              <div class="input-group number-input-wrapper">
                <input type="text" id="amortization" class="currency-input" value="25 ${text().years}">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="amortization" data-step="1">▲</div>
                  <div class="number-input-down" data-target="amortization" data-step="1">▼</div>
                </div>
              </div>
            </div>
          </div>
    
          <!-- Payment Frequency -->
          <div class="form-row">
            <div class="form-column">
              <label class="bold-label" for="frequency" id="frequency-label">
                ${text().paymentFrequency}
              </label>
              <div class="dropdown-container" id="dropdown-payment-frequency">
                <div class="select-btn" tabindex="0">
                  <span class="btn-text" id="frequency-text">${text().biweekly}</span>
                  <span class="arrow-dwn">${SVG_CHEVRON}</span>
                </div>
                <ul class="list-items single-select" id="paymentFrequencyList">
                  <li class="item">
                    <span class="checkbox">${SVG_CHECK}</span>
                    <span class="item-text" data-value="monthly">${text().monthly}</span>
                  </li>
                  <li class="item checked">
                    <span class="checkbox">${SVG_CHECK}</span>
                    <span class="item-text" data-value="biweekly">${text().biweekly}</span>
                  </li>
                  <li class="item">
                    <span class="checkbox">${SVG_CHECK}</span>
                    <span class="item-text" data-value="weekly">${text().weekly}</span>
                  </li>
                </ul>
              </div>
              <input type="hidden" id="frequency" value="biweekly">
            </div>
            <div class="form-column">
              <label class="bold-label" for="loan-amount">
                ${text().loanAmount}
              </label>
              <div class="input-group">
                <span class="currency-symbol">$</span>
                <input type="text" id="loan-amount" class="currency-input" readonly>
              </div>
            </div>
          </div>
    
          <!-- Results Section -->
          <div class="results-container">
            <div class="result" id="payment-preview">
              <h3>${text().estimatedPayment}</h3>
              <div class="amount" id="payment-amount">$0</div>
              <div class="hint">
                This is your estimated payment amount based on the property value, down payment, and selected terms.
              </div>
            </div>
          </div>
        `;
    
        // Append formContainer to the provided element.
        element.appendChild(formContainer);
    
        /********** Numeric Up/Down Controls **********/
        function attachNumericControls() {
          formContainer.querySelectorAll('.number-input-up').forEach(btn => {
            btn.addEventListener('click', e => {
              e.preventDefault();
              const targetId = btn.getAttribute('data-target');
              const step = parseFloat(btn.getAttribute('data-step'));
              const input = formContainer.querySelector("#" + targetId);
              if (!input) return;
              let currentValue = parseNumber(input.value);
              let newValue = currentValue;
              if (targetId === 'property-cost') {
                newValue = currentValue === 0 ? 5000 : Math.round((currentValue + step) / step) * step;
              } else if (targetId === 'down-payment') {
                newValue = currentValue === 0 ? 5000 : Math.round((currentValue + step) / step) * step;
              } else if (targetId === 'interest-rate') {
                newValue = (currentValue + step).toFixed(2);
                input.value = newValue;
                input.dispatchEvent(new Event('input'));
                return;
              } else if (targetId === 'amortization') {
                // For amortization, use the allowed list
                const allowed = allowedAmortizations;
                const currentNum = parseNumber(input.value);
                let idx = allowed.indexOf(currentNum);
                if (idx === -1) { idx = allowed.indexOf(25); }
                if (idx < allowed.length - 1) {
                  newValue = allowed[idx + 1];
                } else {
                  newValue = allowed[idx];
                }
                input.value = newValue + " " + text().years;
                input.dispatchEvent(new Event('input'));
                return;
              } else {
                newValue = currentValue + step;
              }
              if (["property-cost","down-payment","amortization"].includes(targetId)) {
                input.value = formatNumber(newValue);
              } else {
                input.value = newValue;
              }
              input.dispatchEvent(new Event('input'));
            });
          });
          formContainer.querySelectorAll('.number-input-down').forEach(btn => {
            btn.addEventListener('click', e => {
              e.preventDefault();
              const targetId = btn.getAttribute('data-target');
              const step = parseFloat(btn.getAttribute('data-step'));
              const input = formContainer.querySelector("#" + targetId);
              if (!input) return;
              let currentValue = parseNumber(input.value);
              let newValue = currentValue;
              if (targetId === 'property-cost') {
                newValue = currentValue === 0 ? 0 : Math.round((currentValue - step) / step) * step;
              } else if (targetId === 'down-payment') {
                newValue = currentValue === 0 ? 0 : Math.round((currentValue - step) / step) * step;
              } else if (targetId === 'interest-rate') {
                newValue = Math.max(0, (currentValue - step).toFixed(2));
              } else if (targetId === 'amortization') {
                const allowed = allowedAmortizations;
                const currentNum = parseNumber(input.value);
                let idx = allowed.indexOf(currentNum);
                if (idx === -1) { idx = allowed.indexOf(25); }
                if (idx > 0) {
                  newValue = allowed[idx - 1];
                } else {
                  newValue = allowed[idx];
                }
                input.value = newValue + " " + text().years;
                input.dispatchEvent(new Event('input'));
                return;
              } else {
                newValue = currentValue - step;
              }
              if (newValue < 0) newValue = 0;
              if (["property-cost","down-payment","amortization"].includes(targetId)) {
                input.value = formatNumber(newValue);
              } else {
                input.value = newValue;
              }
              input.dispatchEvent(new Event('input'));
            });
          });
        }
    
        /********** Dropdown Setup **********/
        function setupDropdownSingleModal(dropdownId, listId, hiddenInputId, defaultText) {
          const container = formContainer.querySelector("#" + dropdownId);
          const selectBtn = container.querySelector(".select-btn");
          const listEl = container.querySelector("#" + listId) || container.querySelector(".list-items");
          const btnText = selectBtn.querySelector(".btn-text");
          const hiddenInput = formContainer.querySelector("#" + hiddenInputId);
          if (defaultText) { btnText.innerText = defaultText; }
          selectBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = selectBtn.classList.toggle("open");
            listEl.style.display = isOpen ? "block" : "none";
            if (isOpen) {
              formContainer.querySelectorAll('.select-btn.open').forEach(openBtn => {
                if (openBtn !== selectBtn) {
                  openBtn.classList.remove('open');
                  const otherList = openBtn.parentElement.querySelector('.list-items');
                  if (otherList) { otherList.style.display = 'none'; }
                }
              });
            }
          });
          const listItems = listEl.querySelectorAll(".item");
          listItems.forEach(item => {
            item.addEventListener("click", ev => {
              ev.stopPropagation();
              listItems.forEach(i => i.classList.remove("checked"));
              item.classList.add("checked");
              const labelText = item.querySelector(".item-text").innerText;
              const value = item.querySelector(".item-text").getAttribute("data-value");
              btnText.innerText = labelText;
              hiddenInput.value = value;
              hiddenInput.dispatchEvent(new Event('input'));
              selectBtn.classList.remove("open");
              listEl.style.display = "none";
            });
          });
          formContainer.addEventListener("click", (ev) => {
            if (!container.contains(ev.target)) {
              selectBtn.classList.remove("open");
              listEl.style.display = "none";
            }
          });
        }
    
        /********** Attach Input Event Listeners **********/
        const fields = [
          '#property-cost',
          '#down-payment',
          '#interest-rate',
          '#amortization',
          '#frequency'
        ];
        fields.forEach(selector => {
          const element = formContainer.querySelector(selector);
          if (element) {
            element.addEventListener('input', () => updateCalculation());
          }
        });
    
        // Calculation for mortgage: loanAmount = cost - downPayment; then monthly payment computed.
        function calculatePaymentAndCapacity(cost, downPayment, interestRate, term, frequency) {
          const loanAmount = Math.round(cost - downPayment);
          let monthlyRate = interestRate / 100 / 12;
          let months = term * 12;
          let monthlyPayment = 0;
          if (monthlyRate > 0) {
            monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
          } else {
            monthlyPayment = loanAmount / months;
          }
          let payment, suffix;
          if (frequency === "weekly") {
            payment = (monthlyPayment * 12) / 52;
            suffix = text().perWeek;
          } else if (frequency === "biweekly") {
            payment = (monthlyPayment * 12) / 26;
            suffix = text().perBiweek;
          } else {
            payment = monthlyPayment;
            suffix = text().perMonth;
          }
          return { loanAmount, payment, suffix };
        }
    
        function updateCalculation() {
          const cost = parseNumber(formContainer.querySelector("#property-cost").value);
          const downPayment = parseNumber(formContainer.querySelector("#down-payment").value);
          const errorMsg = formContainer.querySelector("#error-message");
          const loanAmountInput = formContainer.querySelector("#loan-amount");
          const paymentResult = formContainer.querySelector("#payment-amount");
    
          if (cost <= 0 || isNaN(cost)) {
            errorMsg.textContent = text().errorInvalidProperty;
            paymentResult.textContent = '$0';
            loanAmountInput.value = '0';
            return;
          }
    
          const minDown = cost * 0.05;
          const downPaymentPercentage = (downPayment / cost) * 100;
          const minDownMsg = formContainer.querySelector("#min-down-payment-message");
          
          if (!isNaN(downPayment)) {
            if (downPayment > cost) {
              errorMsg.textContent = text().errorMaxDownPayment;
              errorMsg.style.display = 'block';
              minDownMsg.style.display = 'none';
              paymentResult.textContent = '$0';
              loanAmountInput.value = '0';
              return;
            } else if (downPaymentPercentage < 5) {
              minDownMsg.innerHTML = text().errorMinDownPayment.replace('{amount}', formatNumber(minDown));
              minDownMsg.style.display = 'block';
              errorMsg.style.display = 'none';
            } else {
              minDownMsg.style.display = 'none';
              errorMsg.style.display = 'none';
            }
          } else {
            errorMsg.textContent = text().errorInvalidDownPayment;
            errorMsg.style.display = 'block';
            minDownMsg.style.display = 'none';
            paymentResult.textContent = '$0';
            loanAmountInput.value = '0';
            return;
          }
    
          const result = calculatePaymentAndCapacity(
            cost,
            downPayment,
            parseFloat(formContainer.querySelector("#interest-rate").value) || 5.5,
            parseInt(parseNumber(formContainer.querySelector("#amortization").value)) || 25,
            formContainer.querySelector("#frequency").value || "biweekly"
          );
    
          loanAmountInput.value = formatNumber(result.loanAmount);
          paymentResult.textContent = `$${formatNumber(Math.round(result.payment))} ${result.suffix || ''}`;
        }
    
        // Initialize dropdown for Payment Frequency.
        setupDropdownSingleModal("dropdown-payment-frequency", "paymentFrequencyList", "frequency", text().biweekly);
    
        // Attach numeric controls and update initial calculations.
        attachNumericControls();
        updateCalculation();
      }
    };
       
    // --- BorrowingCalculatorExtension ---

    const BorrowingCalculatorExtension = {
      name: 'BorrowingCalculator',
      type: 'response',
      match: ({ trace }) =>
        trace.type === 'ext_borrowing' || trace.payload?.name === 'ext_borrowing',
      render: ({ trace, element }) => {
        const { language = 'en' } = trace.payload || {};
        
        const translations = {
          fr: {
            annualIncome: "Revenu annuel brut :",
            monthlyExpenses: "Dépenses mensuelles :",
            downPayment: "Mise de fonds disponible :",
            interestRate: "Taux d'intérêt (%) :",
            mortgageTerm: "Durée du prêt (Années) :",
            paymentFrequency: "Fréquence de paiement :",
            years: "ans",
            weekly: "Hebdomadaire",
            biweekly: "Aux 2 semaines",
            monthly: "Mensuelle",
            perWeek: "/semaine",
            perBiweek: "/2 semaines",
            perMonth: "/mois",
            estimatedPayment: "Montant estimé du paiement",
            borrowingCapacity: "Votre capacité d'emprunt estimée",
            paymentHint: "Ceci est votre montant de paiement maximum estimé basé sur 32% de votre revenu disponible (revenu annuel moins dépenses annuelles) et la fréquence sélectionnée.",
            capacityHint: "Cette estimation est basée sur un ratio de 32% appliqué à votre revenu disponible."
          },
          en: {
            annualIncome: "Annual Gross Income:",
            monthlyExpenses: "Monthly Expenses:",
            downPayment: "Down Payment Available:",
            interestRate: "Interest Rate (%):",
            mortgageTerm: "Mortgage Term (Years):",
            paymentFrequency: "Payment Frequency:",
            years: "years",
            weekly: "Weekly",
            biweekly: "Bi-weekly",
            monthly: "Monthly",
            perWeek: "/week",
            perBiweek: "/2 weeks",
            perMonth: "/month",
            estimatedPayment: "Estimated Payment Amount",
            borrowingCapacity: "Your Estimated Borrowing Capacity",
            paymentHint: "This is your estimated maximum payment amount based on 32% of your disposable income (annual income minus annualized expenses) and the selected frequency.",
            capacityHint: "This is an estimate based on a 32% Gross Debt Service ratio applied to your disposable income."
          }
        };
        
        const currentLanguage = language;
        const text = () => translations[currentLanguage] || translations.en;
        
        // Define allowed mortgage term values
        const allowedTerms = [5, 10, 15, 20, 25, 30];

        // Frequency maps used in calculation
        const freqMap = { monthly: 12, 'biweekly': 26, weekly: 52 };
        const freqLabelMap = {
          monthly: text().perMonth,
          'biweekly': text().perBiweek,
          weekly: text().perWeek,
        };

        // Calculation: disposable income = max(annualIncome - monthlyExpenses×12, 0)
        function calculatePaymentAndCapacity(annualIncome, monthlyExpenses, deposit, interestRate, term, frequency) {
          const paymentsPerYear = freqMap[frequency];
          const annualExp = monthlyExpenses * 12;
          const disposableAnnualIncome = Math.max(annualIncome - annualExp, 0);
          const periodicIncome = disposableAnnualIncome / paymentsPerYear;
          const maxPeriodicPayment = periodicIncome * 0.32;
          const periodicRate = interestRate / 100 / paymentsPerYear;
          const numberOfPayments = term * paymentsPerYear;
          let presentValue = 0;
          if (periodicRate > 0) {
            presentValue = maxPeriodicPayment *
              ((1 - Math.pow(1 + periodicRate, -numberOfPayments)) / periodicRate);
          } else {
            presentValue = maxPeriodicPayment * numberOfPayments;
          }
          return {
            paymentPerPeriod: maxPeriodicPayment,
            borrowingCapacity: Math.round(presentValue + deposit)
          };
        }

        // Create the container form
        const formContainer = document.createElement('div');
        formContainer.innerHTML = `
          <style>
            /* Form Styling */
            form {
              display: flex;
              flex-direction: column;
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
            }
            .form-row {
              display: flex;
              flex-wrap: wrap;
              gap: 15px;
              margin-bottom: 15px;
            }
            .form-column {
              flex: 1;
              min-width: 200px;
            }
            .bold-label {
              font-weight: 600;
              display: block;
              margin-bottom: 5px;
              color: #000;
              font-size: 14px;
            }
            .input-group {
              position: relative;
              width: 100%;
            }
            .currency-input {
              height: 40px;
              width: 100%;
              border: 1px solid rgba(0, 0, 0, 0.2);
              border-radius: 8px;
              padding: 12px;
              background: #fff;
              font-size: 13px;
              outline: none;
              box-sizing: border-box;
              padding-left: 30px;
            }
            .currency-symbol {
              position: absolute;
              left: 10px;
              top: 50%;
              transform: translateY(-50%);
              color: black;
            }
            .number-input-wrapper {
              position: relative;
              width: 100%;
            }
            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            input[type="number"] {
              -moz-appearance: textfield;
            }
	    input[type="text"], input[type="number"] {
      width: 100%;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      padding: 8px 8px 8px 20px;
      background: #fff;
      font-size: 13px;
      outline: none;
      box-sizing: border-box;
      height: 40px;
      left: 10px !important;
    }
            .number-input-controls {
              position: absolute;
              right: 0px;
              top: 0px;
              bottom: 0px;
              width: 20px;
              display: flex;
              flex-direction: column;
              background-color: #F8EAFA;
              border: 1px solid rgba(0,0,0,0.1);
              border-radius: 0 8px 8px 0;
              overflow: hidden;
            }
            .number-input-up,
            .number-input-down {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #9C27B0;
              cursor: pointer;
              font-size: 8px;
            }
            .number-input-up:hover,
            .number-input-down:hover {
              background-color: #9C27B0;
              color: #fff;
            }
            /* Dropdown Styles */
            .dropdown-container {
              position: relative;
              max-width: 100%;
              margin-top: 4px;
            }
            .select-btn {
              display: flex;
              height: 40px;
              align-items: center;
              justify-content: space-between;
              padding: 0 12px;
              border-radius: 8px;
              cursor: pointer;
              background-color: #fff;
              border: 1px solid rgba(0,0,0,0.2);
              color: #555;
            }
            .select-btn .btn-text {
              font-size: 13px;
              font-weight: 400;
              color: black;
            }
            .arrow-dwn {
              display: flex;
              height: 24px;
              width: 24px;
              color: #9C27B0;
              font-size: 12px;
              border-radius: 50%;
              background: #F8EAFA;
              align-items: center;
              justify-content: center;
              transition: 0.3s;
            }
            .select-btn.open .arrow-dwn {
              transform: rotate(-180deg);
            }
            .select-btn:focus,
            .select-btn.open {
              border: 2px solid #9C27B0;
            }
            .list-items {
              position: static;
              top: 100%;
              left: 0;
              right: 0;
              margin-top: 4px;
              border-radius: 8px;
              padding: 8px 0;
              background-color: #fff;
              box-shadow: 0 4px 8px rgba(0,0,0,0.08);
              display: none;
              max-height: 200px;
              overflow-y: auto;
              z-index: 100;
            }
            /* Dropdown style with checkboxes */
            .list-items .item {
              display: flex;
              align-items: center;
              height: 36px;
              cursor: pointer;
              transition: 0.3s;
              padding: 0 12px;
              border-radius: 8px;
            }
            .list-items .item:hover {
              background-color: #F8EAFA;
            }
            .item .checkbox {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 16px;
              width: 16px;
              border-radius: 50%;
              margin-right: 8px;
              border: 1.5px solid #c0c0c0;
              transition: all 0.3s ease-in-out;
            }
            .item.checked .checkbox {
              background-color: #9C27B0;
              border: 2px solid #9C27B0;
            }
            .checkbox .check-icon {
              color: #fff;
              font-size: 12px;
              transform: scale(0);
              transition: all 0.2s ease-in-out;
            }
            .item.checked .check-icon {
              transform: scale(1);
            }
            .list-items .item:not(.checked) .checkbox svg path {
              fill: transparent !important;
            }
            .list-items .item:not(.checked):hover .checkbox svg path {
              fill: #9C27B0 !important;
            }
            .list-items .item.checked .checkbox svg path {
              fill: #ffffff !important;
            }
            .item .item-text {
              font-size: 13px;
              font-weight: 400;
              color: #333;
              margin-left: 8px;
            }
            /* Results Styles */
            .results-container {
              margin-top: 20px;
              padding: 15px;
              background-color: #F8EAFA;
              border-radius: 8px;
              text-align: center;
            }
            .results-title {
              margin: 0 0 10px 0;
              color: #333;
              font-size: 16px;
              font-weight: 600;
            }
            .results-amount {
              font-size: 2em;
              color: #9C27B0;
              font-weight: bold;
              margin: 15px 0;
            }
            input[readonly] {
              background-color: #f9f9f9;
              cursor: not-allowed;
            }
            .result h3 {
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 10px;
              color: #333;
            }
            .result .amount {
              font-size: 24px;
              font-weight: bold;
              color: #9C27B0;
              margin: 15px 0;
            }
            .result .hint {
              font-size: 12px;
              color: #666;
              margin-bottom: 15px;
            }
            .results-row {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap; /* Add this line */
}

.results-row .result {
  flex: 1;
  background-color: #F8EAFA;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  display: block;
  min-width: 200px; /* Add this line */
}
          </style>

          <div class="form-row">
            <div class="form-column">
              <label for="annual-income" class="bold-label">
                ${text().annualIncome}
              </label>
              <div class="input-group number-input-wrapper">
                <span class="currency-symbol">$</span>
                <input type="text" id="annual-income" class="currency-input" required
                       placeholder="Enter your annual income"
                       value="${formatNumber(75000)}">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="annual-income" data-step="1000">▲</div>
                  <div class="number-input-down" data-target="annual-income" data-step="1000">▼</div>
                </div>
              </div>
            </div>
            <div class="form-column">
              <label for="monthly-expenses" class="bold-label">
                ${text().monthlyExpenses}
              </label>
              <div class="input-group number-input-wrapper">
                <span class="currency-symbol">$</span>
                <input type="text" id="monthly-expenses" class="currency-input" required
                       placeholder="Enter monthly expenses"
                       value="${formatNumber(3000)}">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="monthly-expenses" data-step="250">▲</div>
                  <div class="number-input-down" data-target="monthly-expenses" data-step="250">▼</div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-column">
              <label for="down-payment" class="bold-label">
                ${text().downPayment}
              </label>
              <div class="input-group number-input-wrapper">
                <span class="currency-symbol">$</span>
                <input type="text" id="down-payment" class="currency-input" required
                       placeholder="Enter down payment"
                       value="${formatNumber(25000)}">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="down-payment" data-step="1000">▲</div>
                  <div class="number-input-down" data-target="down-payment" data-step="1000">▼</div>
                </div>
              </div>
            </div>
            <div class="form-column">
              <label for="interest-rate" class="bold-label">
                ${text().interestRate}
              </label>
              <div class="input-group number-input-wrapper">
                <input type="number" id="interest-rate" class="currency-input" required
                       placeholder="Enter interest rate"
                       min="1" max="100" step="0.05" value="5.9">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="interest-rate" data-step="0.05">▲</div>
                  <div class="number-input-down" data-target="interest-rate" data-step="0.05">▼</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mortgage Term & Payment Frequency -->
          <div class="form-row">
            <div class="form-column">
              <label class="bold-label" for="mortgage-term">
                ${text().mortgageTerm}
              </label>
              <div class="input-group number-input-wrapper">
                <input type="text" id="mortgage-term" class="currency-input" value="25 ${text().years}">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="mortgage-term" data-step="1">▲</div>
                  <div class="number-input-down" data-target="mortgage-term" data-step="1">▼</div>
                </div>
              </div>
            </div>
            <div class="form-column">
              <label class="bold-label" for="payment-frequency">
                ${text().paymentFrequency}
              </label>
              <div class="dropdown-container" id="dropdown-payment-frequency">
                <div class="select-btn" tabindex="0">
                  <span class="btn-text" id="frequency-text">${text().weekly}</span>
                  <span class="arrow-dwn">${SVG_CHEVRON}</span>
                </div>
                <ul class="list-items single-select" id="paymentFrequencyList">
                  <li class="item">
                    <span class="checkbox">${SVG_CHECK}</span>
                    <span class="item-text" data-value="monthly">${text().monthly}</span>
                  </li>
                  <li class="item">
                    <span class="checkbox">${SVG_CHECK}</span>
                    <span class="item-text" data-value="biweekly">${text().biweekly}</span>
                  </li>
                  <li class="item checked">
                    <span class="checkbox">${SVG_CHECK}</span>
                    <span class="item-text" data-value="weekly">${text().weekly}</span>
                  </li>
                </ul>
              </div>
              <input type="hidden" id="payment-frequency" value="weekly">
            </div>
          </div>

          <!-- Results Section -->
          <div class="results-row">
            <div class="result" id="payment-preview">
              <h3>${text().estimatedPayment}</h3>
              <div class="amount" id="payment-amount">$0</div>
              <div class="hint">
                ${text().paymentHint}
              </div>
            </div>
            <div class="result" id="capacity-preview">
              <h3>${text().borrowingCapacity}</h3>
              <div class="amount" id="capacity-amount">$0</div>
              <div class="hint">
                ${text().capacityHint}
              </div>
            </div>
          </div>
        `;

        // Append the form container to the provided element
        element.appendChild(formContainer);

        /********** Numeric Up/Down Controls **********/
        function attachNumericControls() {
          formContainer.querySelectorAll('.number-input-up').forEach(btn => {
            btn.addEventListener('click', e => {
              e.preventDefault();
              const targetId = btn.getAttribute('data-target');
              const step = parseFloat(btn.getAttribute('data-step'));
              const input = formContainer.querySelector("#" + targetId);
              if (!input) return;

              let currentValue = parseNumber(input.value);
              let newValue = currentValue;

              if (targetId === 'annual-income') {
                newValue = currentValue === 0 ? 1000 : Math.round((currentValue + step) / step) * step;
              } else if (targetId === 'monthly-expenses') {
                newValue = currentValue === 0 ? 250 : Math.round((currentValue + step) / step) * step;
              } else if (targetId === 'down-payment') {
                newValue = currentValue === 0 ? 1000 : Math.round((currentValue + step) / step) * step;
              } else if (targetId === 'interest-rate') {
                newValue = (currentValue + step).toFixed(2);
                // Set the value and manually dispatch "input" to recalc
                input.value = newValue;
                input.dispatchEvent(new Event('input'));
                return;
              } else if (targetId === 'mortgage-term') {
                // For mortgage term, use the allowed list
                const allowed = allowedTerms;
                const currentNum = parseNumber(input.value);
                let idx = allowed.indexOf(currentNum);
                if (idx === -1) { idx = allowed.indexOf(25); }
                if (idx < allowed.length - 1) {
                  newValue = allowed[idx + 1];
                } else {
                  newValue = allowed[idx];
                }
                input.value = newValue + " " + text().years;
                input.dispatchEvent(new Event('input'));
                return;
              } else {
                newValue = currentValue + step;
              }

              if (["annual-income","monthly-expenses","down-payment"].includes(targetId)) {
                input.value = formatNumber(newValue);
              } else {
                input.value = newValue;
              }
              // Trigger the "input" event so we recalc
              input.dispatchEvent(new Event('input'));
            });
          });
          formContainer.querySelectorAll('.number-input-down').forEach(btn => {
            btn.addEventListener('click', e => {
              e.preventDefault();
              const targetId = btn.getAttribute('data-target');
              const step = parseFloat(btn.getAttribute('data-step'));
              const input = formContainer.querySelector("#" + targetId);
              if (!input) return;

              let currentValue = parseNumber(input.value);
              let newValue = currentValue;

              if (targetId === 'annual-income') {
                newValue = currentValue === 0 ? 0 : Math.round((currentValue - step) / step) * step;
              } else if (targetId === 'monthly-expenses') {
                newValue = currentValue === 0 ? 0 : Math.round((currentValue - step) / step) * step;
              } else if (targetId === 'down-payment') {
                newValue = currentValue === 0 ? 0 : Math.round((currentValue - step) / step) * step;
              } else if (targetId === 'interest-rate') {
                newValue = Math.max(0, (currentValue - step).toFixed(2));
                input.value = newValue;
                input.dispatchEvent(new Event('input'));
                return;
              } else if (targetId === 'mortgage-term') {
                // For mortgage term, use the allowed list
                const allowed = allowedTerms;
                const currentNum = parseNumber(input.value);
                let idx = allowed.indexOf(currentNum);
                if (idx === -1) { idx = allowed.indexOf(25); }
                if (idx > 0) {
                  newValue = allowed[idx - 1];
                } else {
                  newValue = allowed[idx];
                }
                input.value = newValue + " " + text().years;
                input.dispatchEvent(new Event('input'));
                return;
              } else {
                newValue = currentValue - step;
              }

              if (newValue < 0) newValue = 0;
              if (["annual-income","monthly-expenses","down-payment"].includes(targetId)) {
                input.value = formatNumber(newValue);
              } else {
                input.value = newValue;
              }
              input.dispatchEvent(new Event('input'));
            });
          });
        }

        /********** Dropdown Setup **********/
        function setupDropdownSingleModal(dropdownId, listId, hiddenInputId, defaultText) {
          const container = formContainer.querySelector("#" + dropdownId);
          const selectBtn = container.querySelector(".select-btn");
          const listEl = container.querySelector("#" + listId) || container.querySelector(".list-items");
          const btnText = selectBtn.querySelector(".btn-text");
          const hiddenInput = formContainer.querySelector("#" + hiddenInputId);

          // If you want a default text, set it here
          if (defaultText) {
            btnText.innerText = defaultText;
          }
          selectBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = selectBtn.classList.toggle("open");
            listEl.style.display = isOpen ? "block" : "none";
            if (isOpen) {
              formContainer.querySelectorAll('.select-btn.open').forEach(openBtn => {
                if (openBtn !== selectBtn) {
                  openBtn.classList.remove('open');
                  const otherList = openBtn.parentElement.querySelector('.list-items');
                  if (otherList) otherList.style.display = 'none';
                }
              });
            }
          });

          const listItems = listEl.querySelectorAll(".item");
          listItems.forEach(item => {
            item.addEventListener("click", ev => {
              ev.stopPropagation();
              listItems.forEach(i => i.classList.remove("checked"));
              item.classList.add("checked");

              const labelText = item.querySelector(".item-text").innerText;
              const value = item.querySelector(".item-text").getAttribute("data-value");
              btnText.innerText = labelText;
              hiddenInput.value = value;

              // Dispatch 'input' to recalc
              hiddenInput.dispatchEvent(new Event('input'));
              selectBtn.classList.remove("open");
              listEl.style.display = "none";
            });
          });

          // Close if clicking outside
          formContainer.addEventListener("click", (ev) => {
            if (!container.contains(ev.target)) {
              selectBtn.classList.remove("open");
              listEl.style.display = "none";
            }
          });
        }

        // Listen for changes in fields to recalc
        function updateCalculations() {
          const annualIncome = parseNumber(formContainer.querySelector('#annual-income').value) || 0;
          const monthlyExpenses = parseNumber(formContainer.querySelector('#monthly-expenses').value) || 0;
          const downPayment = parseNumber(formContainer.querySelector('#down-payment').value) || 0;
          const interestRate = parseFloat(formContainer.querySelector('#interest-rate').value) || 0;
          const mortgageTerm = parseNumber(formContainer.querySelector('#mortgage-term').value) || 25;
          const frequency = formContainer.querySelector('#payment-frequency').value || 'weekly';

          const paymentPreview = formContainer.querySelector('#payment-preview');
          const capacityPreview = formContainer.querySelector('#capacity-preview');
          const paymentAmount = formContainer.querySelector('#payment-amount');
          const capacityAmount = formContainer.querySelector('#capacity-amount');

          if (annualIncome > 0 && interestRate > 0) {
            const { paymentPerPeriod, borrowingCapacity } =
              calculatePaymentAndCapacity(annualIncome, monthlyExpenses, downPayment, interestRate, mortgageTerm, frequency);

            paymentAmount.textContent = `${formatCurrency(Math.round(paymentPerPeriod))}${freqLabelMap[frequency].replace(' ', '')}`;
            capacityAmount.textContent = `${formatCurrency(borrowingCapacity)}`;

            paymentPreview.style.display = 'block';
            capacityPreview.style.display = 'block';
          } else {
            paymentPreview.style.display = 'block';
            capacityPreview.style.display = 'block';
            paymentAmount.textContent = '$0';
            capacityAmount.textContent = '$0';
          }
        }

        // Initialize the numeric controls
        attachNumericControls();

        // Setup Payment Frequency
        setupDropdownSingleModal(
          "dropdown-payment-frequency",
          "paymentFrequencyList",
          "payment-frequency",
          text().weekly
        );

        // Recalc on input changes
        const fields = [
          '#annual-income',
          '#monthly-expenses',
          '#down-payment',
          '#interest-rate',
          '#mortgage-term',
          '#payment-frequency'
        ];
        fields.forEach(selector => {
          const element = formContainer.querySelector(selector);
          if (element) {
            element.addEventListener('input', () => updateCalculations());
          }
        });

        // Initial calc
        updateCalculations();
      }
    };

    // --- CombinedCalculatorsExtension ---
    const CombinedCalculatorsExtension = {
      name: "CombinedCalculators",
      type: "response",
      match: ({ trace }) =>
        trace.type === "ext_combined_calculators" || trace.payload?.name === "ext_combined_calculators",
      render: ({ trace, element }) => {
        const { language, propertyCost } = trace.payload;
        const isEnglish = language === "en";
        console.log("CombinedCalculatorsExtension rendering with:", { language, propertyCost });
        
        // Use the provided element or get the wrapper
        const calculatorsWrapper = element || document.getElementById("calculators-wrapper");
        if (!calculatorsWrapper) {
          console.error("Calculators wrapper element not found!");
          return;
        }
        
        // Create the navigation HTML
        // Add this style to the navHTML in CombinedCalculatorsExtension:

const navHTML = `
  <style>
    /* Main container styling */
    #calculators-wrapper {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      box-sizing: border-box;
    }
    
    .calculator-nav {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      justify-content: center;
    }
    .calculator-nav-button {
      padding: 12px 16px;
      cursor: pointer;
      border: none;
      background: #F8EAFA;
      border-radius: 4px;
      font-weight: bold;
      transition: background 0.2s;
      color: #9C27B0;
      font-size: 16px;
    }
    .calculator-nav-button.active {
      background: #9C27B0;
      color: #fff;
    }
    #calculator-container {
      border-top: 2px solid #9C27B0;
      padding: 15px;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }
    
    /* Ensure child forms don't exceed container width */
    #calculator-container form,
    #calculator-container > div {
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
    }
    
    /* Responsive adjustments */
    @media (max-width: 840px) {
      #calculators-wrapper {
        padding: 10px;
      }
    }
  </style>
  <div class="calculator-nav">
    <button class="calculator-nav-button active" data-calculator="borrowing">
      ${isEnglish ? "Borrowing Capacity" : "Capacité d'emprunt"}
    </button>
    <button class="calculator-nav-button" data-calculator="mortgage">
      ${isEnglish ? "Mortgage Payment" : "Paiement hypothécaire"}
    </button>
  </div>
  <div id="calculator-container"></div>
`;
        
        // Set the HTML inside the wrapper
        calculatorsWrapper.innerHTML = navHTML;
        
        // Use querySelector on calculatorsWrapper to get the calculator container
        const calculatorContainer = calculatorsWrapper.querySelector("#calculator-container");
        if (!calculatorContainer) {
          console.error("Calculator container element not found after creation!");
          return;
        }
        
        // Function to switch calculators
        function switchCalculator(type) {
          console.log(`Switching to calculator: ${type}`);
          // Get the nav buttons scoped to calculatorsWrapper
          const buttons = calculatorsWrapper.querySelectorAll(".calculator-nav-button");
          buttons.forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.calculator === type);
          });
          // Clear the calculator container
          calculatorContainer.innerHTML = "";
          if (type === "borrowing") {
            BorrowingCalculatorExtension.render({
              trace: { payload: { language: language, name: "ext_borrowing" } },
              element: calculatorContainer
            });
          } else if (type === "mortgage") {
            MortgageCalculatorExtension.render({
              trace: { payload: { language: language, propertyCost: propertyCost, name: "mortgage_calculator" } },
              element: calculatorContainer
            });
          }
        }
         
        // Attach click event listeners for the navigation buttons
        const navButtons = calculatorsWrapper.querySelectorAll(".calculator-nav-button");
        navButtons.forEach((button) => {
          button.addEventListener("click", () => {
            switchCalculator(button.dataset.calculator);
          });
        });
        
        // Default to the borrowing calculator
        switchCalculator("borrowing");
      }
    };

const UserInformationExtension = {
      name: "Forms",
      type: "response",
      match: ({ trace }) =>
        trace.type === 'ext_information' || trace.payload?.name === 'ext_information',
      render: ({ trace, element }) => {
        const { language } = trace.payload;
        const isEnglish = language === 'en';
        const formContainer = document.createElement("form");

        formContainer.innerHTML = `
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
            form {
              display: flex;
              flex-direction: column;
              gap: 10px;
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
              background: transparent;
              padding: 16px;
              border-radius: 8px;
              min-width: 300px;
            }
            .bold-label {
              font-weight: 600;
              color: #000;
              font-size: 14px;
              margin-bottom: 4px;
              display: block;
            }
            input[type="text"],
            input[type="email"] {
              width: 100%;
              border: 1px solid rgba(0,0,0,0.2);
              border-radius: 8px;
              padding: 8px;
              background: #fff;
              font-size: 13px;
              outline: none;
              box-sizing: border-box;
            }
            input[type="text"]:focus,
            input[type="email"]:focus {
              border: 2px solid #9C27B0;
            }
            .book-now {
              color: #9C27B0;
              background-color: #F8EAFA;
              border: none;
              padding: 12px;
              border-radius: 8px;
              width: 100%;
              font-size: 16px;
              cursor: pointer;
              margin-top: 8px;
              transition: background-color 0.3s;
            }
            .book-now:hover {
              background-color: #9C27B0;
              font-weight: 700;
	      color : #fff;
            }
            /* Dropdown Styles */
            .dropdown-container {
              position: relative;
              max-width: 100%;
            }
            .select-btn {
              display: flex;
              height: 40px;
              align-items: center;
              justify-content: space-between;
              padding: 0 12px;
              border-radius: 8px;
              cursor: pointer;
              background-color: #fff;
              border: 1px solid rgba(0,0,0,0.2);
            }
            .select-btn .btn-text {
              font-size: 13px;
              font-weight: 400;
              color: #555;
            }
            .select-btn .arrow-dwn {
              display: flex;
              height: 24px;
              width: 24px;
              color: #9C27B0;
              font-size: 12px;
              border-radius: 50%;
              background: #F8EAFA;
              align-items: center;
              justify-content: center;
              transition: 0.3s;
            }
            .select-btn.open .arrow-dwn {
              transform: rotate(-180deg);
            }
            .select-btn:focus,
            .select-btn.open {
              border: 2px solid #9C27B0;
              outline: none;
            }
            .list-items {
              position: relative;
              top: 100%;
              left: 0;
              right: 0;
              margin-top: 4px;
              border-radius: 8px;
              padding: 8px 0;
              background-color: #fff;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
              display: none;
              max-height: 200px;
              overflow-y: auto;
            }
            .select-btn.open ~ .list-items {
              display: block;
            }
            .list-items .item {
              display: flex;
              align-items: center;
              height: 36px;
              cursor: pointer;
              transition: 0.3s;
              padding: 0 12px;
              border-radius: 8px;
            }
            .list-items .item:hover {
              background-color: #F8EAFA;
            }
            .item .item-text {
              font-size: 13px;
              font-weight: 400;
              color: #333;
              margin-left: 8px;
            }
            .list-items.single-select .item .checkbox {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 16px;
              width: 16px;
              border-radius: 50%;
              margin-right: 8px;
              border: 1.5px solid #c0c0c0;
              transition: all 0.3s ease-in-out;
            }
            .item.checked .checkbox {
              background-color: #9C27B0;
              border: 2px solid #9C27B0;
            }
            .checkbox .check-icon {
              color: #fff;
              font-size: 12px;
              transform: scale(0);
              transition: all 0.2s ease-in-out;
            }
            .item.checked .check-icon {
              transform: scale(1);
            }
          </style>
          <div>
            <label for="full-name" class="bold-label">
              ${isEnglish ? 'Full Name' : 'Nom complet'}
            </label>
            <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required>
          </div>
          <div>
            <label for="email" class="bold-label">Email</label>
            <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required>
          </div>
          <button type="button" class="book-now" id="book-now">
            ${isEnglish ? 'Book Now' : 'Réserver maintenant'}
          </button>
        `;

        element.appendChild(formContainer);

        // Event listener for "Book Now" click
        const bookNowButton = formContainer.querySelector("#book-now");
        bookNowButton.addEventListener("click", () => {
          const fullName = formContainer.querySelector("#full-name").value.trim();
          const email = formContainer.querySelector("#email").value.trim();
          
          if (!fullName) {
            alert(isEnglish ? "Full Name is required." : "Le nom complet est obligatoire.");
            return;
          }
          if (!email || !isValidEmail(email)) {
            alert(isEnglish ? "Please enter a valid email address." : "Veuillez entrer une adresse email valide.");
            return;
          }
          
          // Disable the button to prevent multiple clicks
          bookNowButton.disabled = true;
          
          // Interact with Voiceflow (simulated)
          window.voiceflow.chat.interact({
            type: "complete",
            payload: { fullName, email }
          });
        });
      },
    };

window.PropertySearchExtension = PropertySearchExtension;
window.SellingExtension = SellingExtension;
window.ContactExtension = ContactExtension;
window.BookingExtension = BookingExtension;
window.BookingExtension_2 = BookingExtension_2;
window.RescheduleExtension = RescheduleExtension;
window.CancellationExtension = CancellationExtension;
window.ImageExtension = ImageExtension;
window.LocalisationExtension = LocalisationExtension;
window.CombinedCalculatorsExtension = CombinedCalculatorsExtension;
window.UserInformationExtension = UserInformationExtension;
