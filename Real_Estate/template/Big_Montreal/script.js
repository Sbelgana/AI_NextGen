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
                 <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10" height="10">
        <path fill="#FFFFFF" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
    </svg>
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
    <path fill="#9a0df2" d="M160 0c17.7 0 32 14.3 32 32l0 35.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11l0 33.4c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.9c-.4-.1-.9-.1-1.3-.2l-.2 0s0 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7s0 0 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11L128 32c0-17.7 14.3-32 32-32z"/>
  </g>
</svg>
`;

const SVG_LIST = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
  <path fill="#9a0df2" d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/>
</svg>
`;

const SVG_SLIDER = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
  <path fill="#9a0df2" d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/>
</svg>
`;

const SVG_ADDRESS = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18px" height="18px">
  <path fill="#9a0df2" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
</svg>
`;

const SVG_CHEVRON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
  <!-- Added 50px padding on top and bottom -->
  <g transform="translate(75, 75)">
    <path fill="#9a0df2" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
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
  <path fill="#9a0df2" d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
</svg>
`;

const SVG_USER = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
  <path fill="#9a0df2" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
</svg>
`;

const SVG_USER_TIE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
  <path fill="#9a0df2" d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z"/>
</svg>
`;

const SVG_BUILDING_COLUMNS = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
  <path fill="#9a0df2" d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160l0 8c0 13.3 10.7 24 24 24l400 0c13.3 0 24-10.7 24-24l0-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224l-64 0 0 196.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512l448 0c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1L448 224l-64 0 0 192-40 0 0-192-64 0 0 192-48 0 0-192-64 0 0 192-40 0 0-192zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
</svg>
`;

const SVG_NOTE_STICK = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
  <path fill="#9a0df2" d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l224 0 0-80c0-17.7 14.3-32 32-32l80 0 0-224c0-8.8-7.2-16-16-16L64 80zM288 480L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 224 0 5.5c0 17-6.7 33.3-18.7 45.3l-90.5 90.5c-12 12-28.3 18.7-45.3 18.7l-5.5 0z"/>
</svg>
`;

const SVG_BRIEFCASE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
  <path fill="#9a0df2" d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-128z"/>
</svg>
`;

const SVG_MESSAGE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
  <path fill="#9a0df2" d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"/>
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

    // Toggle collapse for dropdown groups
    // This function needs to be modified to close other group headers when one is opened
window.toggleCollapse = function(element) {
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
}

// You should replace this in the HTML where the group headers are defined:
// Replace:
// onclick="event.stopPropagation(); toggleCollapse(this)"
// With:
// onclick="event.stopPropagation(); window.toggleCollapse(this)"

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
                    <div class="group-header" onclick="event.stopPropagation(); window.toggleCollapse(this)">
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
                    <div class="group-header" onclick="event.stopPropagation(); window.toggleCollapse(this)">
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
    formContainer.innerHTML = `
      <style>        
        /* Variables for consistent theming */
:root {
  --primary: #9a0df2;
  --primary-light: #f5e7fe;
  --border-color: rgba(0, 0, 0, 0.2);
  --text-dark: #333;
  --text-medium: #555;
  --text-light: #777;
  --shadow-light: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-medium: 0 4px 8px rgba(0, 0, 0, 0.08);
  --shadow-focus: 0 3px 8px rgba(154, 13, 242, 0.1);
  --border-radius-sm: 4px;
  --border-radius: 6px;
  --border-radius-lg: 8px;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing: 10px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
}

/* Base Form Styles */
form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
}

.flex-row {
  display: flex;
  gap: var(--spacing-lg);
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
  margin-bottom: var(--spacing-xs);
  display: block;
}

/* Input Styles */
input[type="text"],
input[type="number"] {
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-sm);
  background: #fff;
  font-size: 13px;
  outline: none;
  box-sizing: border-box;
  height: 40px;
}

input[type="text"]:focus,
input[type="number"]:focus {
  border: 2px solid var(--primary);
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
  color: var(--primary);
  background-color: var(--primary-light);
  border: none;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-lg);
  font-size: 16px;
  cursor: pointer;
  margin-top: var(--spacing-sm);
  transition: background-color 0.2s, color 0.2s, font-weight 0.2s;
}

.submit:hover {
  color: #fff;
  background-color: var(--primary);
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
  padding: 0 var(--spacing-md);
  border-radius: var(--border-radius);
  cursor: pointer;
  background-color: #fff;
  border: 1px solid var(--border-color);
  transition: border 0.2s;
}

.select-btn .btn-text {
  font-size: 13px;
  font-weight: 400;
  color: var(--text-medium);
}

.select-btn-holder {
  color: var(--text-light);
  font-size: 13px;
}

.select-btn .arrow-dwn {
  display: flex;
  height: 24px;
  width: 24px;
  color: var(--primary);
  font-size: 13px;
  border-radius: 50%;
  background: var(--primary-light);
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}

.select-btn.open .arrow-dwn {
  transform: rotate(-180deg);
}

.select-btn:focus,
.select-btn.open {
  border: 2px solid var(--primary);
}

/* Dropdown List */
.list-items {
  position: relative;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--spacing-xs);
  border-radius: var(--border-radius);
  padding: var(--spacing-xs) 0;
  box-shadow: var(--shadow-medium);
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
  padding: 0 var(--spacing-md);
  border-radius: var(--border-radius-sm);
  transition: background-color 0.3s;
  margin: var(--spacing-xs);
}

.list-items .item:hover {
  background-color: var(--primary-light);
}

.item .item-text {
  font-size: 13px;
  font-weight: 400;
  color: var(--text-dark);
  margin-left: var(--spacing-sm);
}

/* Checkbox Styles */
.list-items.multi-select .item .checkbox,
.list-items.single-select .item .checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
  margin-right: var(--spacing-sm);
  border: 1.5px solid #c0c0c0;
  transition: all 0.3s ease-in-out;
}

.list-items.multi-select .item .checkbox {
  border-radius: var(--border-radius-sm);
}

.list-items.single-select .item .checkbox {
  border-radius: 50%;
}

.item.checked .checkbox {
  background-color: var(--primary);
  border: 2px solid var(--primary);
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
  fill: var(--primary) !important;
}

.list-items .item.checked .checkbox svg path {
  fill: #ffffff !important;
}

/* Standard checkbox */
input[type="checkbox"] {
  accent-color: var(--primary);
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* Group Styles */
.group {
  border-top: 1px solid #eee;
  margin-bottom: var(--spacing);
  margin-left: var(--spacing);
  margin-right: var(--spacing);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
}

.group:first-child {
  border-top: none;
}

.group-header {
  font-weight: 500;
  padding: var(--spacing-sm) var(--spacing-md);
  background: #f4eafb;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--primary);
}

.group-header .collapse-icon {
  color: var(--primary);
  font-size: 13px;
  transition: transform 0.3s;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: var(--spacing-sm);
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
  background-color: var(--primary-light);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
  overflow: hidden;
}

.price-up,
.price-down {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  cursor: pointer;
  font-size: 8px;
  transition: background-color 0.2s, color 0.2s;
}

.price-up:hover,
.price-down:hover {
  background-color: var(--primary);
  color: #fff;
}

/* Section Cards */
.section {
  border: 1px solid #eee;
  border-radius: var(--border-radius);
  margin-bottom: 0;
  overflow: hidden;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.section-card {
  padding: var(--spacing);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-light);
  border-radius: var(--border-radius);
}

.section.active {
  border-color: var(--primary);
  box-shadow: var(--shadow-focus);
}

.section:hover:not(.disabled) {
  border-color: var(--primary);
  box-shadow: var(--shadow-focus);
}

.section-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.section-icon {
  background-color: var(--primary-light);
  color: var(--primary);
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
  color: var(--primary);
  font-size: 13px;
  transition: transform 0.3s;
  background: #f4eafb;
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
  padding: var(--spacing-xl);
  background: #fefefe;
  border-top: 1px solid #eee;
}

/* Inline Fields */
.inline-field {
  display: flex;
  align-items: center;
  gap: var(--spacing);
  margin-bottom: var(--spacing);
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

    // 1) Populate the dropdowns
    const cityListEl = formContainer.querySelector("#cityList");
    const categoryListEl = formContainer.querySelector("#propertyCategoryList");
    const propertyTypeListEl = formContainer.querySelector("#propertyTypeList");

    cityListEl.innerHTML = buildGroupedCityHTML(Cities);
    categoryListEl.innerHTML = buildGroupedCategoryHTML(propertyCategories);
    propertyTypeListEl.innerHTML = buildPropertyTypeHTML(HouseTypeList);

    // 2) Accordion toggle function
    // Improved toggle function that ensures only one section is open at a time
// Improved toggle function that ensures only one section is open at a time
// Improved toggle function that ensures only one section is open at a time
// AND ensures all dropdowns are closed when switching sections
// Replace the existing toggleSection function with this simplified version
function toggleSection(sectionId, formContainer) {
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
}

// And update your event listeners in a simpler way:
formContainer.querySelectorAll('.section-card').forEach(card => {
  card.addEventListener('click', function(e) {
    e.stopPropagation();
    if (!this.closest('.section').classList.contains('disabled')) {
      const targetId = this.getAttribute('data-target');
      toggleSection(targetId, formContainer);
    }
  });
});

    // 3) Multi-select dropdown
    function setupMultiSelect(dropdownId, listSelector, hiddenInputId, defaultText) {
      const container = formContainer.querySelector(`#${dropdownId}`);
      const selectBtn = container.querySelector(".select-btn");
      const listEl = container.querySelector(".list-items");
      const btnText = selectBtn.querySelector(".btn-text");
      const hiddenInput = formContainer.querySelector(`#${hiddenInputId}`);

      selectBtn.addEventListener("click", (e) => {
        e.stopPropagation();
  // First close all other dropdowns
  closeAllOtherDropdowns(selectBtn, formContainer);
  // Then toggle this one
  selectBtn.classList.toggle("open");
      });

      function updateSelectAllState(groupEl) {
        if (!groupEl) return;
        const selectAllItem = groupEl.querySelector(".item.select-all");
        if (!selectAllItem) return;
        const groupItems = groupEl.querySelectorAll(".item:not(.select-all)");
        const allChecked = Array.from(groupItems).every(item => item.classList.contains("checked"));
        if (allChecked) selectAllItem.classList.add("checked");
        else selectAllItem.classList.remove("checked");
      }

      formContainer.querySelectorAll(`${listSelector} .item`).forEach(item => {
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

      document.addEventListener("click", (e) => {
        if (!container.contains(e.target)) {
          selectBtn.classList.remove("open");
        }
      });
    }

    setupMultiSelect("dropdown-city", "#cityList", "cityValues", texts.cityDefault);
    setupMultiSelect("dropdown-property-category", "#propertyCategoryList", "propertyCategoryValues", texts.categoryDefault);
    setupMultiSelect("dropdown-property-type", "#propertyTypeList", "propertyTypeValues", texts.typeDefault);

function closeAllOtherDropdowns(currentSelectBtn, formContainer) {
  // Get all select buttons in the form
  const allSelectBtns = formContainer.querySelectorAll(".select-btn");
  
  // Close all select buttons except the current one
  allSelectBtns.forEach((btn) => {
    if (btn !== currentSelectBtn) {
      btn.classList.remove("open");
    }
  });
}
    // 4) Single-select dropdown
    // 4) Single-select dropdown with proper closing after selection
function setupDropdownSingle(dropdownId, hiddenInputId) {
  const dropdownContainer = formContainer.querySelector(`#${dropdownId}`);
  const selectBtn = dropdownContainer.querySelector(".select-btn");
  const listEl = dropdownContainer.querySelector(".list-items");
  const selectBtnHolder = selectBtn.querySelector(".select-btn-holder");
  const hiddenInput = formContainer.querySelector(`#${hiddenInputId}`);
  const listItems = listEl.querySelectorAll(".item");

  selectBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    // First close all other dropdowns
    closeAllOtherDropdowns(selectBtn, formContainer);
    // Then toggle this one
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

  document.addEventListener("click", (e) => {
    if (!dropdownContainer.contains(e.target)) {
      selectBtn.classList.remove("open");
    }
  });
}
    setupDropdownSingle("dropdown-rooms-number", "rooms-number");
    setupDropdownSingle("dropdown-bedrooms-number", "bedrooms-number");
    setupDropdownSingle("dropdown-bathrooms-number", "bathrooms-number");
    setupDropdownSingle("dropdown-cars-number", "cars-number");

    // Toggle car dropdown based on garage checkbox
    const garageCheckbox = formContainer.querySelector("#garage");
    const carsContainer = formContainer.querySelector("#cars-container");
    garageCheckbox.addEventListener("change", function () {
      if (this.checked) {
        carsContainer.style.display = "block";
      } else {
        carsContainer.style.display = "none";
        formContainer.querySelector("#cars-number").value = "";
        formContainer.querySelector("#dropdown-cars-number .btn-text").innerText = texts.optionDefault;
        formContainer.querySelectorAll("#dropdown-cars-number .item").forEach(item => {
          item.classList.remove("checked");
        });
      }
    });

    // 5) Price controls
    formContainer.querySelectorAll('.price-up, .price-down').forEach(button => {
      button.addEventListener('click', function() {
        const inputId = this.getAttribute('data-input');
        const step = parseInt(this.getAttribute('data-step'), 10);
        
        if (this.classList.contains('price-up')) {
          const input = formContainer.querySelector(`#${inputId}`);
          if (!input) return;
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
          const input = formContainer.querySelector(`#${inputId}`);
          if (!input) return;
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

    // 6) Form submission
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

    element.appendChild(formContainer);
  },
};
/************** EXTENSION #2: SellingExtension **************/
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
         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
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
              .flex-row > div { flex: 1; min-width: 200px; }
              .bold-label {
                  font-weight: 700;
                  color: #000;
                  font-size: 14px;
                  margin-bottom: 4px;
                  display: block;
              }
    input[type="text"],
    input[type="email"],
    input[type="tel"],
    textarea {
        width: 100%;
        border: 1px solid rgba(0,0,0,0.2);
        border-radius: 4px;
        padding: 8px;
        background: #fff;
        font-size: 13px;
        outline: none;
        box-sizing: border-box;
        height: 40px;
    }
    /* First, fix the rule for the details textarea */
#details {
    width: 100%;
    resize: vertical;
    min-height: 120px;  /* Increased from 50px */
    max-height: 300px;  /* Increased from 200px */
    padding: 8px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 4px;
    font-size: 13px;
    box-sizing: border-box;
    height: auto !important; /* Override the default height */
}

/* Then, ensure the focus states rule is separate and complete */
input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
select:focus,
#details:focus {
    border: 2px solid #9A0DF2;
}
    .submit {
        color: #9A0DF2;
        background-color: #F5E7FE;
        border: none;
        padding: 12px;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        margin-top: 8px;
    }
    .submit:hover {
        color: #fff; background-color: #9A0DF2; font-weight: 700;
    }
    .dropdown-container {
        position: relative; max-width: 100%;
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
        border: 1px solid rgba(0,0,0,0.2);
    }
    .select-btn .btn-text {
       font-size: 13px; font-weight: 400; color: #555;
    }
    .select-btn .arrow-dwn {
        display: flex;
        height: 24px;
        width: 24px;
        color: #9A0DF2;
        font-size: 13px;
        border-radius: 50%;
        background: #F5E7FE;
        align-items: center;
        justify-content: center;
        transition: 0.3s;
    }
    .select-btn.open .arrow-dwn {
        transform: rotate(-180deg);
    }
    .list-items {
        position: relative;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: 4px;
        border-radius: 6px;
        padding: 4px 0;
        box-shadow: 0 4px 8px rgba(0,0,0,0.08);
        display: none;
        max-height: 200px;
        overflow-y: auto;
        z-index: 100;
        background-color: #fff;
    }
    .select-btn.open + .list-items {
        display: block;
    }
    .select-btn:focus,
    .select-btn.open {
        border: 2px solid #9A0DF2;
        outline: none;
    }
    .list-items .item {
        display: flex;
        align-items: center;
        height: 36px;
        cursor: pointer;
        padding: 0 12px;
        border-radius: 4px;
        transition: 0.3s;
        margin: 4px;
    }
    .list-items .item:hover {
        background-color: #F5E7FE;
    }
    .item .item-text {
        font-size: 13px;
        font-weight: 400;
        color: #333;
        margin-left: 8px;
    }
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
        background-color: #9A0DF2;
        border: 2px solid #9A0DF2;
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
        background: #f4eafb;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #9A0DF2;
    }
    .group-header .collapse-icon {
        color: #9A0DF2;
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
    /**********************************************
     * Change the native checkbox color to #9A0DF2
     **********************************************/
    input[type="checkbox"] {
        accent-color: #9A0DF2; /* Modern browser support */
    }
    
    /* Added styles for the section layout */
.section {
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 6px;
      margin-bottom: 0;
      overflow: hidden;
      background: #fff;
    }
    .section-card {
      padding: 10px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      border-radius: 6px;
    }
    .section.active {
      border: 2px solid #9A0DF2;
      box-shadow: 0 3px 8px rgba(154, 13, 242, 0.1);
    }
    .section:hover {
      border-color: #9A0DF2;
      box-shadow: 0 3px 8px rgba(154, 13, 242, 0.1);
    }
    .section-info {
      display: flex;
      align-items: center;
      gap: 12px;
      
    }
    .section-icon {
      background-color: #F5E7FE;
      color: #9A0DF2;
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
    .collapse-icon {
      color: #9A0DF2;
      font-size: 13px;
      transition: transform 0.3s;
      background: #f4eafb;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-right: 0px;
    }
    .collapse-icon i {
      transition: transform 0.3s ease;
    }
    .collapse-icon.active i {
      transform: rotate(180deg);
    }
    /* Collapsible content panel */
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
    
    .submit:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
  font-weight: 700;
}



/* For custom elements that don't support the disabled attribute */


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
                    <span class="btn-text">${isEnglish ? "-- Select --" : "-- Sélectionnez --"}</span>
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
                      <span class="btn-text">${isEnglish ? "-- Select --" : "-- Sélectionnez --"}</span>
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
                      <span class="btn-text">${isEnglish ? "-- Select --" : "-- Sélectionnez --"}</span>
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
    function setupDropdownSingle(dropdownId, hiddenInputId) {
      const dropdownContainer = formContainer.querySelector(`#${dropdownId}`);
      const selectBtn = dropdownContainer.querySelector(".select-btn");
      const listEl = dropdownContainer.querySelector(".list-items");
      const btnText = selectBtn.querySelector(".btn-text");
      const hiddenInput = formContainer.querySelector(`#${hiddenInputId}`);
      const listItems = listEl.querySelectorAll(".item");

      selectBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        // Close other dropdowns
        closeAllOtherDropdowns(selectBtn);
        // Toggle open
        selectBtn.classList.toggle("open");
        // If opening, scroll to the first item
        if (selectBtn.classList.contains("open") && listEl.firstElementChild) {
          listEl.firstElementChild.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });

      listItems.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          listItems.forEach((i) => i.classList.remove("checked"));
          item.classList.add("checked");
          const value = item.querySelector(".item-text").getAttribute("data-value");
          btnText.innerText = value;
          hiddenInput.value = value;
          selectBtn.classList.remove("open");
        });
      });

      document.addEventListener("click", (e) => {
        if (!dropdownContainer.contains(e.target)) {
          selectBtn.classList.remove("open");
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
            input[type="text"],
            input[type="email"],
            input[type="tel"],
            textarea {
              width: 100%;
              border: 1px solid rgba(0,0,0,0.2);
              border-radius: 4px;
              padding: 8px;
              background: #fff;
              font-size: 14px;
              outline: none;
              box-sizing: border-box;
            }
            #details {
              resize: vertical;
              min-height: 100px;
              max-height: 200px;
            }
            input[type="text"]:focus,
            input[type="email"]:focus,
            input[type="tel"]:focus,
            #details:focus {
              border: 2px solid #9A0DF2;
            }
            .submit {
              color: #9A0DF2;
              background-color: #F5E7FE;
              border: none;
              padding: 12px;
              border-radius: 8px;
              font-size: 16px;
              cursor: pointer;
              margin-top: 8px;
            }
            .submit:hover {
              color: #fff;
              background-color: #9A0DF2;
            }
            .submit:disabled {
              background-color: #ccc;
              color: #666;
              cursor: not-allowed;
              font-weight: 700;
            }
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
            

            /* Section / Accordion Styles */
            .section {
              border: 1px solid #eee;
              border-radius: 6px;
              margin-bottom: 0;
              overflow: hidden;
              background: #fff;
            }
            .section-card {
              padding: 10px;
              cursor: pointer;
              display: flex;
              justify-content: space-between;
              align-items: center;
              transition: all 0.2s ease;
              box-shadow: 0 2px 4px rgba(0,0,0,0.05);
              border-radius: 6px;
            }
            .section.active {
              border-color: #9A0DF2;
              box-shadow: 0 3px 8px rgba(154, 13, 242, 0.1);
            }
            .section:hover {
              border-color: #9A0DF2;
              box-shadow: 0 3px 8px rgba(154, 13, 242, 0.1);
            }
            .section-info {
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .section-icon {
              background-color: #F5E7FE;
              color: #9A0DF2;
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
            .collapse-icon {
              color: #9A0DF2;
              font-size: 13px;
              transition: transform 0.3s;
              background: #f4eafb;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              margin-right: 0px;
            }
            .collapse-icon.active {
              transform: rotate(-180deg);
            }
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
              border-radius: 6px;
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
              color: #9A0DF2;
              font-size: 12px;
              border-radius: 50%;
              background: #F5E7FE;
              align-items: center;
              justify-content: center;
              transition: 0.3s;
            }
            .select-btn.open .arrow-dwn {
              transform: rotate(-180deg);
            }
            .select-btn:focus,
            .select-btn.open {
              border: 2px solid #9A0DF2;
              outline: none;
            }
            .list-items {
              position: relative;
              top: 100%;
              left: 0;
              right: 0;
              margin-top: 4px;
              border-radius: 6px;
              padding: 8px 0;
              background-color: #fff;
              box-shadow: 0 4px 8px rgba(0,0,0,0.08);
              display: none;
              max-height: 200px;
              overflow-y: auto;
              z-index: 100;
            }
            .select-btn.open + .list-items {
              display: block;
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
            .list-items .item {
              display: flex;
              align-items: center;
              height: 36px;
              cursor: pointer;
              transition: 0.3s;
              padding: 0 12px;
              border-radius: 4px;
            }
            .list-items .item:hover {
              background-color: #F5E7FE;
            }
            .item .item-text {
              font-size: 13px;
              font-weight: 400;
              color: #333;
              margin-left: 8px;
            }
            .item.checked .checkbox {
              background-color: #9A0DF2;
              border: 2px solid #9A0DF2;
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
        const sectionCards = formContainer.querySelectorAll(".section-card");
        sectionCards.forEach(card => {
          const targetId = card.getAttribute("data-target");
          card.addEventListener("click", (e) => {
            e.stopPropagation();
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

    // Insert the style and HTML for the booking button
    container.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        .booking-container {
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
        .book-now {
          color: #9c27b0;
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

        .book-now:active {
          transform: translateY(0);
          box-shadow: 0 2px 3px rgba(0,0,0,0.1);
        }
        
        .book-now:hover:not(:disabled) {
      background-color: #9c27b0;
      font-weight: 700;
      color: #fff;
    }
    .book-now:disabled {
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

      <div class="booking-container">
        <button type="button" class="book-now" id="cal-booking-button">
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

    // ====== Booking Logic ======
    const bookNowButton = container.querySelector("#cal-booking-button");
    const debugInfo = container.querySelector("#debug-info");
    
    bookNowButton.addEventListener("click", () => {

      // Notify Voiceflow that we're proceeding with booking
      if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.interact({
          type: "booking_started",
          payload: { 
            email,
            Uid,
            link
          },
        });
      }
      
      // Disable button to prevent multiple clicks
      bookNowButton.disabled = true;

      
      try {
        // Initialize Cal for the namespace
        Cal("init", namespace, {
          origin: "https://cal.com"
        });
        
        // Set UI preferences
        Cal.ns[namespace]("ui", {
          "theme": "light",
          "cssVarsPerTheme": {
            "light": {"cal-brand": "#9c27b0"},
            "dark": {"cal-brand": "#9c27b0"}
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
        
        // Setup event listener for successful booking
        Cal.ns[namespace]("on", {
          action: "booking_successful",
          callback: (event) => {
            console.log("Booking successful", event);
            
            // Notify Voiceflow that booking is complete
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
        bookNowButton.disabled = false;
        bookNowButton.textContent = isEnglish ? 'Reschedule Appointment' : 'Reprogrammer le rendez-vous';
      }
    });

    // Return a cleanup function
    return function cleanup() {
      bookNowButton.render({ trace, element: container });
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
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
            .booking-container {
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
            .book-now {
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

            .book-now:active {
              transform: translateY(0);
              box-shadow: 0 2px 3px rgba(0,0,0,0.1);
            }
            
            .book-now:hover:not(:disabled) {
              background-color: #d32f2f;
              font-weight: 700;
              color: #fff;
            }
            .book-now:disabled {
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

          <div class="booking-container">
            <button type="button" class="book-now" id="cal-booking-button">
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

        // ====== Booking Logic ======
        const bookNowButton = container.querySelector("#cal-booking-button");
        const debugInfo = container.querySelector("#debug-info");
        
        bookNowButton.addEventListener("click", () => {

          
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
          bookNowButton.disabled = true;

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
            const cancellationLink = `booking/${Uid}?cancel=true&allRemainingBookings=false&cancelledBy=${email}`;
            
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
                allRemainingBookings: false,
                cancelledBy: decodeURIComponent(email)
              }
            }));
            
            // Setup event listener for successful cancellation
            Cal.ns[namespace]("on", {
              action: "booking_cancelled",
              callback: (event) => {
                console.log("Booking cancelled", event);
                
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
                bookNowButton.disabled = false;
                bookNowButton.textContent = isEnglish ? 'Cancel Appointment' : 'Annuler le rendez-vous';
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
                bookNowButton.disabled = false;
                bookNowButton.textContent = isEnglish ? 'Cancel Appointment' : 'Annuler le rendez-vous';
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
            bookNowButton.disabled = false;
            bookNowButton.textContent = isEnglish ? 'Cancel Appointment' : 'Annuler le rendez-vous';
          }
        });

        // Return a cleanup function
        return function cleanup() {
          // This should be fixed to properly remove the event listener
          const button = container.querySelector("#cal-booking-button");
          if (button) {
            button.remove();
          }
        };
      },
    };


/************** EXTENSION #4: BookingExtension **************/

const BookingExtension = {
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
              border: 2px solid #9c27b0;
            }
            .book-now {
              color: #9c27b0;
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
              background-color: #9c27b0;
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
              color: #9c27b0;
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
              border: 2px solid #9c27b0;
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
              background-color: #9c27b0;
              border: 2px solid #9c27b0;
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
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="12" height="12">
                              <path fill="#9c27b0" d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"/>
                          </svg>
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

	// Cal element-click embed code begins
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
              <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10" height="10">
                <path fill="#FFFFFF" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
              </svg>
            </span>
            <span class="item-text" data-value="${seller}">${seller}</span>
          `;
          sellerListEl.appendChild(li);
        });

        /*************************************************************
         * 2b) Setup Single-Select Logic
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

  // \u2B50 Scroll the first item into view
  if (selectBtn.classList.contains("open") && listItems.length > 0) {
    listItems[0].scrollIntoView({ behavior: "smooth", block: "start" });
  }
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
                    "light": {"cal-brand": "#9c27b0"},
                    "dark": {"cal-brand": "#9c27b0"}
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
         * 2c) Booking Logic
         *************************************************************/
        const bookNowButton = formContainer.querySelector("#cal-booking-button");

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
              bookNowButton.disabled = true;
            const { link, namespace } = BookingData[sellerName];
            
            console.log(`Opening Cal for ${sellerName} (namespace: ${namespace}, link: ${link})`);

            // Voiceflow integration
            window.voiceflow.chat.interact({
              type: "complete",
              payload: { fullName, email, sellerName, link },
            });

            // Create a new button that will trigger Cal
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
            
            // Append and click
            document.body.appendChild(calTrigger);
            calTrigger.click();
          } else {
            alert(isEnglish ? "No booking information available for the selected seller." : "Aucune information de réservation disponible pour le vendeur sélectionné.");
          }
        });
      },
    };

const BookingExtensionOld = {
    name: "Forms",
    type: "response",
    match: ({ trace }) =>
        trace.type === `ext_booking` || trace.payload?.name === `ext_booking`,

    render: ({ trace, element }) => {
        const { language } = trace.payload;
        const isEnglish = language === 'en';

        // Create the form container
        const formContainer = document.createElement("form");

        // Insert the style from the property search extension (adjusted for single-select)
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
                    border: 2px solid #9c27b0;
                }

                .book-now {
                    color: #9c27b0;
                    background-color: #F8EAFA;
                    border: none;
                    padding: 12px;
                    border-radius: 8px;
                    width: 100%;
                    font-size: 16px;
                    cursor: pointer;
                    margin-top: 8px;
                }
                .book-now:hover {
                    color: #fff;
                    background-color: #9c27b0;
                    font-weight: 700;
                }

                /* Single-Select Dropdown Styles from Property Search Extension */
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
                    color: #9c27b0;
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
                    border: 2px solid #9c27b0;
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
                    background-color: #9c27b0;
                    border: 2px solid #9c27b0;
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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="12" height="12">
    <!-- Font Awesome Chevron Down icon SVG path -->
    <path fill="#9c27b0" d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"/>
  </svg>
</span>
                    </div>
                    <ul class="list-items single-select" id="sellerList"></ul>
                </div>
                <!-- Hidden input to store the chosen seller -->
                <input type="hidden" id="seller-name" name="seller-name" required />
            </div>

            <button type="button" class="book-now" id="book-now">
                ${isEnglish ? 'Book Now' : 'Réserver maintenant'}
            </button>
        `;

        // Append to DOM
        element.appendChild(formContainer);

        /*************************************************************
         * 2a) Populate Single-Select for Sellers
         *************************************************************/
        const sellerListEl = formContainer.querySelector("#sellerList");
        const sellers = getSellerList(false); // array of seller names (no "No Preference")
        sellers.forEach(seller => {
            const li = document.createElement("li");
            li.classList.add("item");
            li.innerHTML = `
                <span class="checkbox"> <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10" height="10">
        <path fill="#FFFFFF" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
    </svg></span>
                <span class="item-text" data-value="${seller}">${seller}</span>
            `;
            sellerListEl.appendChild(li);
        });

        /*************************************************************
         * 2b) Setup Single-Select Logic
         *************************************************************/
        function setupDropdownSingle(dropdownId, listId, hiddenInputId, defaultText) {
  // 1) Grab references
  const container = formContainer.querySelector(`#${dropdownId}`);
  const selectBtn = container.querySelector(".select-btn");
  // If you want to find the list by a specific ID, use it; otherwise fall back to .list-items
  const listEl = container.querySelector(`#${listId}`) || container.querySelector(".list-items");
  const btnText = selectBtn.querySelector(".btn-text");
  const hiddenInput = formContainer.querySelector(`#${hiddenInputId}`);

  // If you need to set default text on load:
  if (defaultText) {
    btnText.innerText = defaultText;
  }

  // 2) Gather the dropdown items
  const listItems = listEl.querySelectorAll(".item");

  // 3) Toggle open/close on click
  selectBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    // Close all other dropdowns within this form
    formContainer.querySelectorAll(".dropdown-container").forEach((otherContainer) => {
      if (otherContainer !== container) {
        const otherSelectBtn = otherContainer.querySelector(".select-btn");
        const otherListEl = otherContainer.querySelector(".list-items");
        if (otherSelectBtn) otherSelectBtn.classList.remove("open");
        if (otherListEl) otherListEl.style.display = "none";
      }
    });

    // Toggle the current dropdown
    selectBtn.classList.toggle("open");
    listEl.style.display = selectBtn.classList.contains("open") ? "block" : "none";
  });

  // 4) When selecting an item...
  listItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();

      // Uncheck all items
      listItems.forEach((i) => i.classList.remove("checked"));
      // Check the clicked item
      item.classList.add("checked");

      // Update the button text and hidden input value
      const labelText = item.querySelector(".item-text").innerText;
      const value = item.querySelector(".item-text").getAttribute("data-value");
      btnText.innerText = labelText;
      hiddenInput.value = value;

      // Close the dropdown
      selectBtn.classList.remove("open");
      listEl.style.display = "none";
    });
  });

  // 5) Close dropdown if user clicks anywhere else
  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      selectBtn.classList.remove("open");
      listEl.style.display = "none";
    }
  });
}


        // Initialize single-select for Seller
        setupDropdownSingle(
            "dropdown-seller",
            "sellerList",
            "seller-name",
            isEnglish ? "-- Select a Seller --" : "-- Sélectionnez un vendeur --"
        );

        /*************************************************************
         * 2c) Booking Logic
         *************************************************************/
        const bookNowButton = formContainer.querySelector("#book-now");

        // Book Now button click
        bookNowButton.addEventListener("click", () => {
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

            if (BookingUrls[sellerName]) {
                // Disable the button
                bookNowButton.disabled = true;

                // Build the booking URL
                const bookingUrl = BookingUrls[sellerName]
                    .replace("{Full_Name}", encodeURIComponent(fullName))
                    .replace("{Email}", encodeURIComponent(email));

                // Interact with Voiceflow (simulated)
                window.voiceflow.chat.interact({
                    type: "complete",
                    payload: { fullName, email, sellerName, bookingUrl },
                });

                // Insert Calendly widget
                const modal = document.getElementById("bookingModal");
                const calendlyContainer = modal.querySelector("#calendlyContainer");
                calendlyContainer.innerHTML = `<div class="calendly-inline-widget" data-url="${bookingUrl}" style="min-width:320px;height:700px;"></div>`;
                
                // Remove any existing script to avoid duplication
                const existingScript = calendlyContainer.querySelector("script[src='https://assets.calendly.com/assets/external/widget.js']");
                if (existingScript) {
                    existingScript.remove();
                }
                
                // Add the script
                const script = document.createElement("script");
                script.src = "https://assets.calendly.com/assets/external/widget.js";
                script.async = true;
                calendlyContainer.appendChild(script);

                // Display the modal
                modal.style.display = "block";
                
                // ADDED: Setup modal closing functionality
                setupModalClosing(modal);
            } else {
                alert(isEnglish ? "No booking URL available for the selected seller." : "Aucune URL de réservation disponible pour le vendeur sélectionné.");
            }
        });
        
        /*************************************************************
         * 2d) Modal Closing Functionality (Added)
         *************************************************************/
        function setupModalClosing(modal) {
            // Function to close modal
            function closeModal() {
                console.log('Closing booking modal');
                modal.style.display = 'none';
                document.removeEventListener('keydown', handleKeyPress);
                window.removeEventListener('click', handleOutsideClick);
            }
            
            // Handle key presses (Escape to close)
            function handleKeyPress(event) {
                if (event.key === 'Escape') {
                    closeModal();
                }
            }
            
            // Handle clicks outside the modal content
            function handleOutsideClick(event) {
                if (event.target === modal) {
                    closeModal();
                }
            }
            
            // Setup close button if it exists
            const closeButton = modal.querySelector('.close-button');
            if (closeButton) {
                // Clone to remove any existing listeners
                const newCloseButton = closeButton.cloneNode(true);
                closeButton.parentNode.replaceChild(newCloseButton, closeButton);
                newCloseButton.addEventListener('click', e => {
                    e.stopPropagation();
                    closeModal();
                });
            }
            
            // Add keyboard and outside click event listeners
            document.addEventListener('keydown', handleKeyPress);
            window.addEventListener('click', handleOutsideClick);
        }
    },
};
/************** EXTENSION #5: ImageExtension **************/
const ImageExtension = {
	name: 'ImageExtension',
	type: 'response',
	match: ({ trace }) => trace.type === 'ext_image_extension' || trace.payload?.name === 'ext_image_extension',
	render: ({ trace, element }) => {
		console.log('ImageExtension render called');

		// Récupération du payload
		const { images } = trace.payload;

		// Sélecteurs DOM (adaptez les IDs selon votre HTML)
		const errorContainer = document.getElementById('error-container');
		const modal = document.getElementById('image-modal');
		const modalImage = document.getElementById('modal-image');
		const closeButton = modal?.querySelector('.close-button');
		const leftArrow = modal?.querySelector('.left-button');
		const rightArrow = modal?.querySelector('.right-button');

		// Vérification
		if (!modal || !modalImage) {
			console.error('Modal or modalImage element not found in DOM');
			if (errorContainer) {
				errorContainer.textContent = 'Error: Modal elements not found';
			}
			return;
		}

		// S’il n’y a pas d’images
		if (!images) {
			console.error('No images provided in trace payload');
			if (errorContainer) {
				errorContainer.textContent = 'Error: No images provided';
			}
			return;
		}

		// Transforme la chaîne en un tableau
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

		// Variables pour la navigation
		let currentIndex = 0;

		// Nettoyage des messages d’erreur éventuels
		if (errorContainer) {
			errorContainer.textContent = '';
		}

		// Fonctions utilitaires
		function closeModal() {
			console.log('Closing image modal');
			modal.style.display = 'none';
			document.removeEventListener('keydown', handleKeyPress);
			window.removeEventListener('click', handleOutsideClick);
		}

		function navigate(direction) {
			if (direction === 'next') {
				currentIndex = (currentIndex + 1) % imageList.length;
			} else {
				currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
			}
			modalImage.src = imageList[currentIndex];
		}

		function handleKeyPress(event) {
			if (modal.style.display === 'flex') {
				if (event.key === 'Escape') closeModal();
				if (event.key === 'ArrowLeft') navigate('prev');
				if (event.key === 'ArrowRight') navigate('next');
			}
		}

		function handleOutsideClick(event) {
			if (event.target === modal) {
				closeModal();
			}
		}

		// Configuration des boutons
		if (closeButton) {
			// on "clone" pour s'assurer de retirer les anciens listeners
			const newCloseButton = closeButton.cloneNode(true);
			closeButton.parentNode.replaceChild(newCloseButton, closeButton);
			newCloseButton.addEventListener('click', e => {
				e.stopPropagation();
				closeModal();
			});
		}

		if (leftArrow) {
			leftArrow.addEventListener('click', e => {
				e.stopPropagation();
				navigate('prev');
			});
		}

		if (rightArrow) {
			rightArrow.addEventListener('click', e => {
				e.stopPropagation();
				navigate('next');
			});
		}

		// Construction de l’élément image + bouton « thumbs-up »
		const modalContainer = document.createElement('div');
		modalContainer.innerHTML = `
			<style>
				.thumbs-up {
					font-size: 1.2em;
					cursor: pointer;
					display: inline-block;
					transition: transform 0.2s ease-in-out;
				}
			</style>
			<div class="thumbs-up">👍</div>
		`;

		// Bouton Thumbs-up => envoie l’info à Voiceflow
		const thumbsUp = modalContainer.querySelector('.thumbs-up');
		if (thumbsUp) {
			thumbsUp.addEventListener('click', () => {
				if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
					window.voiceflow.chat.interact({ type: 'complete', payload: {} });
				} else {
					console.warn('window.voiceflow.chat.interact is not available');
				}
			});
		}

		// Ajout dans l’élément parent (fourni par Voiceflow)
		element.appendChild(modalContainer);

		// Mise en place des listeners globaux
		document.addEventListener('keydown', handleKeyPress);
		window.addEventListener('click', handleOutsideClick);

		// Initialise l’image et ouvre le modal
		modalImage.src = imageList[currentIndex];
		modal.style.display = 'flex';
	}
};

/************** EXTENSION #6: LocalisationExtension **************/
/************** EXTENSION #6: LocalisationExtension **************/
const LocalisationExtension = {
	name: 'Localisation',
	type: 'response',
	match: ({ trace }) => trace.type === 'ext_localisation' || trace.payload?.name === 'ext_localisation',
	render: ({ trace, element }) => {
		const { language, key, LAT, LNG } = trace.payload;

		function openModal() {
			const modal = document.getElementById('localisation-modal');
			if (modal) {
				modal.style.display = 'block';
				initializeLocalLogic(language, key, parseFloat(LAT), parseFloat(LNG));
				// Add global listeners for key presses and clicks outside the modal
				document.addEventListener('keydown', handleKeyPress);
				window.addEventListener('click', handleOutsideClick);
			} else {
				console.error('Modal element not found');
			}
		}

		function closeModal() {
			const modal = document.getElementById('localisation-modal');
			if (modal) {
				modal.style.display = 'none';
				// Remove global event listeners
				document.removeEventListener('keydown', handleKeyPress);
				window.removeEventListener('click', handleOutsideClick);
			}
		}

		function handleKeyPress(event) {
			const modal = document.getElementById('localisation-modal');
			if (modal && modal.style.display === 'block') {
				if (event.key === 'Escape') closeModal();
			}
		}

		function handleOutsideClick(event) {
			const modal = document.getElementById('localisation-modal');
			if (modal && event.target === modal) {
				closeModal();
			}
		}

		// Update the close button to remove old listeners (using clone technique)
		const closeButton = document.querySelector('#localisation-modal .close-button');
		if (closeButton) {
			const newCloseButton = closeButton.cloneNode(true);
			closeButton.parentNode.replaceChild(newCloseButton, closeButton);
			newCloseButton.addEventListener('click', (e) => {
				e.stopPropagation();
				closeModal();
			});
		} else {
			console.error('Close button not found');
		}

		async function initializeLocalLogic(language, key, lat, lng) {
			try {
				console.log('Initializing LocalLogic SDK...');
				if (typeof LLSDKsJS === 'undefined') {
					console.error('LLSDKsJS is not available.');
					return;
				}

				const ll = LLSDKsJS(key, {
					locale: language,
					appearance: {
						theme: "day",
						variables: {
							"--ll-color-primary": "#A10159",
							"--ll-color-primary-variant1": "#010159",
							"--ll-border-radius-small": "8px",
							"--ll-border-radius-medium": "16px",
							"--ll-font-family": "Avenir, sans-serif"
						}
					}
				});

				const container = document.createElement("div");
				container.id = `localContentWidget-${Date.now()}`;
				container.style.cssText = `
					display: flex;
					border: 1px solid rgb(136, 136, 136);
					width: 100%;
					height: 100%;
					border-radius: 8px;
					position: absolute;
					overflow: hidden;
				`;

				const widgetContent = document.getElementById('localisation-modal-content');
				if (widgetContent) {
					widgetContent.innerHTML = ''; // Clear previous content if any
					widgetContent.appendChild(container);
				} else {
					console.error('Modal content container not found');
					return;
				}

				console.log('Creating LocalLogic widget with LAT:', lat, 'LNG:', lng);
				ll.create("local-content", container, {lat, lng, cooperativeGestures: false, marker: {lat, lng}, zoom: 20});
				console.log('LocalLogic widget initialized successfully.');
			} catch (error) {
				console.error('Error loading LocalLogic content:', error);
			}
		}

		function loadSDKScript() {
			return new Promise((resolve, reject) => {
				// Check if the SDK script is already loaded
				if (document.querySelector('script[src="https://sdk.locallogic.co/sdks-js/1.13.2/index.umd.js"]')) {
					console.log('LocalLogic SDK script already loaded.');
					resolve();
					return;
				}

				const sdkScript = document.createElement('script');
				sdkScript.src = "https://sdk.locallogic.co/sdks-js/1.13.2/index.umd.js";
				sdkScript.async = true;
				sdkScript.onload = () => {
					console.log('LocalLogic SDK script loaded.');
					resolve();
				};
				sdkScript.onerror = () => {
					console.error('Failed to load the LocalLogic SDK script.');
					reject(new Error('Failed to load LocalLogic SDK script.'));
				};

				document.body.appendChild(sdkScript);
				console.log('LocalLogic SDK script appended to body');
			});
		}

		loadSDKScript().then(openModal).catch((error) => {
			console.error('Error loading SDK script:', error);
		});

		// Construction of the thumbs-up element (for Voiceflow interaction)
		const modalContainer = document.createElement('div');
		modalContainer.innerHTML = `
			<style>
				.thumbs-up {
					font-size: 1.2em;
					cursor: pointer;
					display: inline-block;
					transition: transform 0.2s ease-in-out;
				}
			</style>
			<div class="thumbs-up">👍</div>
		`;

		const thumbsUp = modalContainer.querySelector('.thumbs-up');
		if (thumbsUp) {
			thumbsUp.addEventListener('click', () => {
				if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
					window.voiceflow.chat.interact({ type: 'complete', payload: {} });
				} else {
					console.warn('window.voiceflow.chat.interact is not available');
				}
			});
		}

		// Append the thumbs-up element to the provided parent
		element.appendChild(modalContainer);
	},
};


/************** EXTENSION #7: MortgageCalculatorExtension **************/
const MortgageCalculatorExtension = {
      name: 'MortgageCalculator',
      type: 'response',
      match: ({ trace }) =>
        trace.type === 'ext_mortgage_calculator' || trace.payload?.name === 'ext_mortgage_calculator',
      render: ({ trace }) => {
        const { propertyCost, language = 'en' } = trace.payload;
        const calculatorContainer = document.getElementById('calculator-container');

        // (1) setupDropdownSingle (Mortgage version)
        function setupDropdownSingle(dropdownId, listId, hiddenInputId, defaultText) {
          const container = document.getElementById(dropdownId);
          const selectBtn = container.querySelector(".select-btn");
          const listEl = container.querySelector(`#${listId}`) || container.querySelector(".list-items");
          const btnText = selectBtn.querySelector(".btn-text");
          const hiddenInput = document.getElementById(hiddenInputId);

          // Default displayed text
          if (defaultText) {
            btnText.innerText = defaultText;
          }

          // Clicking the dropdown button toggles open/close
          selectBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = selectBtn.classList.toggle("open");
            listEl.style.display = isOpen ? "block" : "none";

            if (isOpen) {
  document.querySelectorAll('.select-btn.open').forEach(openBtn => {
    if (openBtn !== selectBtn) {
      openBtn.classList.remove('open');
      const otherList = openBtn.parentElement.querySelector('.list-items');
      if (otherList) otherList.style.display = 'none';
    }
  });
}
          });

          // Each list item updates the selected value
          const listItems = listEl.querySelectorAll(".item");
          listItems.forEach((item) => {
            item.addEventListener("click", (ev) => {
              ev.stopPropagation();
              listItems.forEach((i) => i.classList.remove("checked"));
              item.classList.add("checked");

              const labelText = item.querySelector(".item-text").innerText;
              const value = item.getAttribute("data-value");
              btnText.innerText = labelText;
              hiddenInput.value = value;

              // DISPATCH 'input' EVENT
              hiddenInput.dispatchEvent(new Event('input'));

              // Close the dropdown
              selectBtn.classList.remove("open");
              listEl.style.display = "none";
            });
          });

          // If user clicks outside container, close the dropdown
          document.addEventListener("click", (ev) => {
            if (!container.contains(ev.target)) {
              selectBtn.classList.remove("open");
              listEl.style.display = "none";
            }
          });
        }

        // (2) attachNumericControls
        function attachNumericControls() {
          // Handle "Up" (▲) clicks
          document.querySelectorAll('.number-input-up').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
              e.preventDefault();
              const targetId = this.getAttribute('data-target');
              const input = document.getElementById(targetId);

              const parentForm = input.closest('form');
              const isMortgage = parentForm && parentForm.querySelector('#amortization-period');
              const isBorrowing = parentForm && parentForm.querySelector('#mortgage-term');

              let currentValue = parseFloat(input.value) || 0;
              let newValue = currentValue;

              if (isBorrowing) {
                switch (targetId) {
                  case 'annual-income':
                    newValue = currentValue === 0 ? 1000 : Math.round((currentValue + 1000) / 1000) * 1000;
                    break;
                  case 'monthly-expenses':
                    newValue = currentValue === 0 ? 1000 : Math.round((currentValue + 250) / 250) * 250;
                    break;
                  case 'down-payment':
                    newValue = currentValue === 0 ? 1000 : Math.round((currentValue + 250) / 250) * 250;
                    break;
                  case 'interest-rate':
                    newValue = currentValue === 0 ? 1 : Number((Math.round((currentValue + 0.05) / 0.05) * 0.05).toFixed(2));
                    break;
                  default:
                    newValue = currentValue + parseFloat(input.getAttribute('step') || 1);
                }
              }
              else if (isMortgage) {
                switch (targetId) {
                  case 'cost':
                    newValue = currentValue === 0 ? 1000 : Math.round((currentValue + 1000) / 1000) * 1000;
                    break;
                  case 'interest-rate':
                    newValue = currentValue === 0 ? 1 : Number((Math.round((currentValue + 0.05) / 0.05) * 0.05).toFixed(2));
                    break;
                  case 'down-payment':
                    if (currentValue === 0) {
                      const costInput = parentForm.querySelector('#cost');
                      const costVal = parseFloat(costInput.value) || 0;
                      let dp = costVal * 0.05;
                      dp = Math.round(dp / 500) * 500;
                      newValue = dp < 0 ? 0 : dp;
                    } else {
                      newValue = currentValue + 500;
                    }
                    break;
                  default:
                    newValue = currentValue + parseFloat(input.getAttribute('step') || 1);
                }
              }
              else {
                newValue = currentValue + parseFloat(input.getAttribute('step') || 1);
              }

              input.value = newValue;
              input.dispatchEvent(new Event('input'));
            });
          });

          // Handle "Down" (▼) clicks
          document.querySelectorAll('.number-input-down').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
              e.preventDefault();
              const targetId = this.getAttribute('data-target');
              const input = document.getElementById(targetId);

              const parentForm = input.closest('form');
              const isMortgage = parentForm && parentForm.querySelector('#amortization-period');
              const isBorrowing = parentForm && parentForm.querySelector('#mortgage-term');

              let currentValue = parseFloat(input.value) || 0;
              let newValue = currentValue;

              if (isBorrowing) {
                switch (targetId) {
                  case 'annual-income':
                    newValue = currentValue === 1000 ? 1000 : Math.round((currentValue - 1000) / 1000) * 1000;
                    break;
                  case 'monthly-expenses':
                    newValue = currentValue === 1000 ? 1000 : Math.round((currentValue - 250) / 250) * 250;
                    break;
                  case 'down-payment':
                    newValue = currentValue === 1000 ? 1000 : Math.round((currentValue - 250) / 250) * 250;
                    break;
                  case 'interest-rate':
                    newValue = currentValue === 1 ? 1 : Number((Math.round((currentValue - 0.05) / 0.05) * 0.05).toFixed(2));
                    break;
                  default:
                    newValue = currentValue - parseFloat(input.getAttribute('step') || 1);
                }
              }
              else if (isMortgage) {
                switch (targetId) {
                  case 'cost':
                    newValue = currentValue === 1000 ? 1000 : Math.round((currentValue - 1000) / 1000) * 1000;
                    break;
                  case 'interest-rate':
                    newValue = currentValue === 1 ? 1 : Number((Math.round((currentValue - 0.05) / 0.05) * 0.05).toFixed(2));
                    break;
                  case 'down-payment':
                    if (currentValue === costVal * 0.05) {
                      const costInput = parentForm.querySelector('#cost');
                      const costVal = parseFloat(costInput.value) || 0;
                      let dp = costVal * 0.05;
                      dp = Math.round(dp / 500) * 500;
                      newValue = dp - 500;
                    } else {
                      newValue = currentValue - 500;
                    }
                    break;
                  default:
                    newValue = currentValue - parseFloat(input.getAttribute('step') || 1);
                }
              }
              else {
                newValue = currentValue - parseFloat(input.getAttribute('step') || 1);
              }

              if (newValue < 0) newValue = 0;
              input.value = newValue;
              input.dispatchEvent(new Event('input'));
            });
          });
        }

        const translations = {
          fr: {
            title: 'Calculatrice de Versements Hypothécaires',
            propertyValue: 'Coût de la propriété:',
            downPayment: 'Mise de fonds:',
            loanAmount: 'Montant du prêt:',
            interestRate: "Taux d'intérêt (%):",
            amortizationPeriod: "Période d'amortissement:",
            paymentFrequency: 'Fréquence des versements:',
            paymentResult: 'Paiement estimé',
            years: 'ans',
            weekly: 'Hebdomadaire',
            biweekly: 'Aux 2 semaines',
            monthly: 'Mensuelle',
            perWeek: '$ / semaine',
            perBiweek: '$ / 2 weeks',
            perMonth: '$ / month',
            errorInvalidProperty: 'Veuillez entrer un coût de propriété valide.',
            errorMinDownPayment: 'La mise de fonds minimale doit être de {amount}$ (5% du coût de la propriété)',
            errorMaxDownPayment: 'La mise de fonds ne peut pas être supérieure au coût de la propriété',
            errorInvalidDownPayment: 'Veuillez entrer une mise de fonds valide',
            paymentNote: 'Ceci est votre montant de paiement estimé selon la fréquence sélectionnée.',
            loanNote: 'Le montant total de votre prêt basé sur la valeur de la propriété et la mise de fonds.',
          },
          en: {
            title: 'Mortgage Payment Calculator',
            propertyValue: 'Property Value:',
            downPayment: 'Down Payment:',
            loanAmount: 'Loan Amount:',
            interestRate: 'Interest Rate (%):',
            amortizationPeriod: 'Amortization Period:',
            paymentFrequency: 'Payment Frequency:',
            paymentResult: 'Estimated Payment',
            years: 'years',
            weekly: 'Weekly',
            biweekly: 'Bi-weekly',
            monthly: 'Monthly',
            perWeek: '$ / week',
            perBiweek: '$ / 2 weeks',
            perMonth: '$ / month',
            errorInvalidProperty: 'Please enter a valid property value.',
            errorMinDownPayment: 'Minimum down payment must be {amount}$ (5% of property value)',
            errorMaxDownPayment: 'Down payment cannot be greater than property value',
            errorInvalidDownPayment: 'Please enter a valid down payment',
            paymentNote: 'This is your estimated payment amount based on the selected frequency.',
            loanNote: 'The total amount of your loan based on the property value and down payment.',
          },
        };
        const text = translations[language] || translations.en;

        function calculateMortgagePayment(P, annualRate, years, paymentsPerYear) {
          const r = (annualRate / 100) / paymentsPerYear;
          const n = years * paymentsPerYear;
          if (r === 0) return P / n;
          const numerator = P * r * Math.pow(1 + r, n);
          const denominator = Math.pow(1 + r, n) - 1;
          return numerator / denominator;
        }

        const formContainer = document.createElement('form');
        const minDownPayment = (propertyCost * 0.05).toFixed(2);

        formContainer.innerHTML = `
        <style>
        .calculator-nav {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
      padding: 10px;
    }
    .calculator-nav-button {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      color: #9c27b0;
      background-color: #F8EAFA;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
      font-size: 1em;
    }
    .calculator-nav-button:hover {
      color: white;
      background-color: #9c27b0;
    }
    .calculator-nav-button.active {
      color: white;
      background-color: #9c27b0;
    }
    /* Form Layout */
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
      padding-left: 30px; /* for currency symbol */
    }
    .currency-symbol {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: black;
    }
    .input-suffix {
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateY(-50%);
      color: black;
      font-size: 13px;
    }
    /* Results Display */
    .results-row {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }
    .result {
      margin: 0;
      padding: 20px;
      background: #F8EAFA;
      border-radius: 8px;
      text-align: center;
      flex: 1;
      display: none;
    }
    .result h3 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 1.2em;
    }
    .result .amount {
      font-size: 2em;
      color: #bb5cf6;
      font-weight: bold;
      margin: 15px 0;
    }
    .hint {
      font-size: 0.9em;
      color: #666;
      margin-top: 8px;
      line-height: 1.4;
      padding: 0 20px;
    }
    .modal-title {
      text-align: center;
      color: #333;
      border-bottom: 2px solid #bb5cf6;
      padding-bottom: 15px;
      margin-bottom: 25px;
      font-size: 1.5em;
    }
    /* ===================== Booking-Style Dropdown ===================== */
    .dropdown-container {
      position: relative;
      max-width: 100%;
      margin-top: 0px;
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
      font-size: 14px;
      font-weight: 500;
    }
    .select-btn .arrow-dwn {
      display: flex;
      height: 24px;
      width: 24px;
      color: #9c27b0;
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
      border: 2px solid #9c27b0;
      outline: none;
    }
    .list-items {
      position: static;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
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
    .currency-input:focus {
      border: 2px solid #9c27b0; /* match collapsible dropdown border */
      outline: none;
    }
    .list-items .item:hover {
      background-color: #F8EAFA;
    }
    .item .item-text {
      font-size: 13px;
      font-weight: 500;
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
      background-color: #9c27b0;
      border: 2px solid #9c27b0;
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
    /* ===================== Numeric Input Controls ===================== */
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
    .number-input-controls {
      position: absolute;
      right: 0px;
      top: 0px;
      bottom: 0px;
      width: 20px;
      display: flex;
      flex-direction: column;
      background-color: #F5E7FE;
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
      color: #9A0DF2;
      cursor: pointer;
      font-size: 8px;
    }
    .number-input-up:hover,
    .number-input-down:hover {
      background-color: #9A0DF2;
      color: #fff;
    }
        </style>
          <div class="modal-title">${text.title}</div>
          <div id="calculator-error-msg"></div>
          		<div class="form-row">
            <div class="form-column">
              <label class="bold-label" for="cost">${text.propertyValue}</label>
              <div class="input-group number-input-wrapper">
                <span class="currency-symbol">$</span>
                <input type="number" id="cost" class="currency-input" value="${propertyCost}" min="0">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="cost">▲</div>
                  <div class="number-input-down" data-target="cost">▼</div>
                </div>
              </div>
            </div>
            <div class="form-column">
              <label class="bold-label" for="down-payment">${text.downPayment}</label>
              <div class="input-group number-input-wrapper">
                <span class="currency-symbol">$</span>
                <input type="number" id="down-payment" class="currency-input" value="${minDownPayment}" step="1000">
                <span class="input-suffix">(5.00 %)</span>
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="down-payment">▲</div>
                  <div class="number-input-down" data-target="down-payment">▼</div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-column">
              <label class="bold-label">${text.amortizationPeriod}</label>
              <div class="dropdown-container" id="dropdown-amortization-period">
                <div class="select-btn" tabindex="0">
                  <span class="btn-text">25 ${text.years}</span>
                  <span class="arrow-dwn">${SVG_CHEVRON}</span>
                </div>
                <ul class="list-items single-select" id="amortizationPeriodList">
                  <li class="item" data-value="5"><span class="item-text">5 ${text.years}</span></li>
                  <li class="item" data-value="10"><span class="item-text">10 ${text.years}</span></li>
                  <li class="item" data-value="15"><span class="item-text">15 ${text.years}</span></li>
                  <li class="item" data-value="20"><span class="item-text">20 ${text.years}</span></li>
                  <li class="item checked" data-value="25"><span class="item-text">25 ${text.years}</span></li>
                </ul>
              </div>
              <input type="hidden" id="amortization-period" value="25">
            </div>
            <div class="form-column">
              <label class="bold-label">${text.paymentFrequency}</label>
              <div class="dropdown-container" id="dropdown-payment-frequency">
                <div class="select-btn" tabindex="0">
                  <span class="btn-text">${text.biweekly}</span>
                  <span class="arrow-dwn">${SVG_CHEVRON}</span>
                </div>
                <ul class="list-items single-select" id="paymentFrequencyList">
                  <li class="item" data-value="week"><span class="item-text">${text.weekly}</span></li>
                  <li class="item checked" data-value="2-weeks"><span class="item-text">${text.biweekly}</span></li>
                  <li class="item" data-value="month"><span class="item-text">${text.monthly}</span></li>
                </ul>
              </div>
              <input type="hidden" id="payment-frequency" value="2-weeks">
            </div>
          </div>
          <div class="form-row">
			<div class="form-column">
              <label class="bold-label" for="interest-rate">${text.interestRate}</label>
              <div class="input-group number-input-wrapper">
                <input type="number" id="interest-rate" class="currency-input" step="0.05" min="1" max="100" value="5.50">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="interest-rate">▲</div>
                  <div class="number-input-down" data-target="interest-rate">▼</div>
                </div>
              </div>
            </div>
            <div class="form-column">
              <label class="bold-label" for="loan-amount">${text.loanAmount}</label>
              <div class="input-group">
                <span class="currency-symbol">$</span>
                <input disabled id="loan-amount" class="currency-input" type="text"
                       value="${(propertyCost - minDownPayment).toFixed(2)}">
              </div>
            </div>
          </div>
          <div class="results-row">
            <div class="result" id="payment-result">
              <h3>${text.paymentResult}</h3>
              <div class="amount" id="payment-amount"></div>
              <div class="hint">${text.paymentNote}</div>
            </div>
          </div>
        `;

        function initCalculator() {
          const costInput = formContainer.querySelector('#cost');
          const downPaymentInput = formContainer.querySelector('#down-payment');
          const loanAmountInput = formContainer.querySelector('#loan-amount');
          const downPercentSpan = formContainer.querySelector('.input-suffix');
          const errorMsg = formContainer.querySelector('#calculator-error-msg');
          const paymentOutput = formContainer.querySelector('#payment-amount');
          const paymentResult = formContainer.querySelector('#payment-result');
          const interestRateInput = formContainer.querySelector('#interest-rate');
          const paymentFrequencyInput = formContainer.querySelector('#payment-frequency');
          const amortizationInput = formContainer.querySelector('#amortization-period');

          function validateAndUpdate() {
            const cost = parseFloat(costInput.value);
            const downPaymentValue = downPaymentInput.value.trim();
            const downPayment = parseFloat(downPaymentValue);
            if (isNaN(cost) || cost <= 0) {
              errorMsg.textContent = text.errorInvalidProperty;
              paymentResult.style.display = 'none';
              return false;
            }
            const minDown = cost * 0.05;
            if (downPaymentValue === '') {
              downPercentSpan.textContent = '(0.00 %)';
              loanAmountInput.value = cost.toFixed(2);
              errorMsg.textContent = '';
              return true;
            }
            if (!isNaN(downPayment)) {
              const downPaymentPercentage = (downPayment / cost) * 100;
              if (downPaymentPercentage < 5) {
                errorMsg.innerHTML = `<span style="color: red; font-weight: bold; display: block; text-align: center;margin-bottom: 16px;">
                  ${text.errorMinDownPayment.replace('{amount}', minDown.toFixed(2))}
                </span>`;
                paymentResult.style.display = 'none';
              } else {
                errorMsg.textContent = downPayment > cost ? text.errorMaxDownPayment : '';
              }
              downPercentSpan.textContent = `(${downPaymentPercentage.toFixed(2)} %)`;
              loanAmountInput.value = (cost - downPayment).toFixed(2);
            } else {
              errorMsg.textContent = text.errorInvalidDownPayment;
              paymentResult.style.display = 'none';
              return false;
            }
            return true;
          }

          function handleCalculate() {
            if (!validateAndUpdate()) return;
            const cost = parseFloat(costInput.value);
            const downPayment = parseFloat(downPaymentInput.value) || 0;
            const loanAmount = parseFloat(loanAmountInput.value) || 0;
            const interestRate = parseFloat(interestRateInput.value) || 0;
            const amortization = parseInt(amortizationInput.value);
            const frequency = paymentFrequencyInput.value;

            if (downPayment < cost * 0.05) {
              paymentResult.style.display = 'none';
              return;
            }
            const paymentsPerYear = frequency === 'week' ? 52 : frequency === '2-weeks' ? 26 : 12;
            const payment = calculateMortgagePayment(loanAmount, interestRate, amortization, paymentsPerYear);
            const suffix = frequency === 'week'
              ? text.perWeek
              : frequency === '2-weeks'
              ? text.perBiweek
              : text.perMonth;
            paymentOutput.textContent = `${payment.toFixed(2)} ${suffix}`;
            paymentResult.style.display = 'block';
          }

          [costInput, downPaymentInput, interestRateInput].forEach(el =>
            el.addEventListener('input', handleCalculate)
          );

          // (3) CHANGED FROM 'change' TO 'input'
          paymentFrequencyInput.addEventListener('input', handleCalculate);
          amortizationInput.addEventListener('input', handleCalculate);

          handleCalculate();
        }

        calculatorContainer.innerHTML = '';
        calculatorContainer.appendChild(formContainer);
        initCalculator();
        attachNumericControls();

        // Show modal
        const modal = document.getElementById('calculator-modal');
        modal.style.display = 'flex';

        // Initialize dropdown logic
        setupDropdownSingle("dropdown-payment-frequency", "paymentFrequencyList", "payment-frequency", text.biweekly);
        setupDropdownSingle("dropdown-amortization-period", "amortizationPeriodList", "amortization-period", `25 ${text.years}`);
      },
    };

    /**********************************************************************
     * 4) BorrowingCalculatorExtension
     **********************************************************************/
    const BorrowingCalculatorExtension = {
      name: 'BorrowingCalculator',
      type: 'response',
      match: ({ trace }) =>
        trace.type === 'ext_borrowing' || trace.payload?.name === 'ext_borrowing',
      render: ({ trace }) => {
        const { language = 'en' } = trace.payload;
        const isEnglish = language === 'en';
        const modal = document.getElementById('calculator-modal');
        const calculatorContainer = document.getElementById('calculator-container');

        // (1) setupDropdownSingle (Borrowing version)
        function setupDropdownSingle(dropdownId, listId, hiddenInputId, defaultText) {
          const container = document.getElementById(dropdownId);
          const selectBtn = container.querySelector(".select-btn");
          const listEl = container.querySelector(`#${listId}`) || container.querySelector(".list-items");
          const btnText = selectBtn.querySelector(".btn-text");
          const hiddenInput = document.getElementById(hiddenInputId);

          if (defaultText) {
            btnText.innerText = defaultText;
          }

          selectBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = selectBtn.classList.toggle("open");
            listEl.style.display = isOpen ? "block" : "none";

            if (isOpen) {
  document.querySelectorAll('.select-btn.open').forEach(openBtn => {
    if (openBtn !== selectBtn) {
      openBtn.classList.remove('open');
      const otherList = openBtn.parentElement.querySelector('.list-items');
      if (otherList) otherList.style.display = 'none';
    }
  });
}
          });

          const listItems = listEl.querySelectorAll(".item");
          listItems.forEach((item) => {
            item.addEventListener("click", (ev) => {
              ev.stopPropagation();
              listItems.forEach((i) => i.classList.remove("checked"));
              item.classList.add("checked");

              const labelText = item.querySelector(".item-text").innerText;
              const value = item.getAttribute("data-value");
              btnText.innerText = labelText;
              hiddenInput.value = value;

              // DISPATCH 'input' EVENT
              hiddenInput.dispatchEvent(new Event('input'));

              selectBtn.classList.remove("open");
              listEl.style.display = "none";
            });
          });

          document.addEventListener("click", (ev) => {
            if (!container.contains(ev.target)) {
              selectBtn.classList.remove("open");
              listEl.style.display = "none";
            }
          });
        }

        // (2) attachNumericControls
        function attachNumericControls() {
          // (Identical to Mortgage version, omitted for brevity but included in final)
          document.querySelectorAll('.number-input-up').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
              e.preventDefault();
              const targetId = this.getAttribute('data-target');
              const input = document.getElementById(targetId);

              const parentForm = input.closest('form');
              const isMortgage = parentForm && parentForm.querySelector('#amortization-period');
              const isBorrowing = parentForm && parentForm.querySelector('#mortgage-term');

              let currentValue = parseFloat(input.value) || 0;
              let newValue = currentValue;

              if (isBorrowing) {
                switch (targetId) {
                  case 'annual-income':
                    newValue = currentValue === 0 ? 1000 : Math.round((currentValue + 1000) / 1000) * 1000;
                    break;
                  case 'monthly-expenses':
                    newValue = currentValue === 0 ? 1000 : Math.round((currentValue + 250) / 250) * 250;
                    break;
                  case 'down-payment':
                    newValue = currentValue === 0 ? 1000 : Math.round((currentValue + 250) / 250) * 250;
                    break;
                  case 'interest-rate':
                    newValue = currentValue === 0 ? 1 : Number((Math.round((currentValue + 0.05) / 0.05) * 0.05).toFixed(2));
                    break;
                  default:
                    newValue = currentValue + parseFloat(input.getAttribute('step') || 1);
                }
              }
              else if (isMortgage) {
                switch (targetId) {
                  case 'cost':
                    newValue = currentValue === 0 ? 1000 : Math.round((currentValue + 1000) / 1000) * 1000;
                    break;
                  case 'interest-rate':
                    newValue = currentValue === 0 ? 1 : Number((Math.round((currentValue + 0.05) / 0.05) * 0.05).toFixed(2));
                    break;
                  case 'down-payment':
                    if (currentValue === 0) {
                      const costInput = parentForm.querySelector('#cost');
                      const costVal = parseFloat(costInput.value) || 0;
                      let dp = costVal * 0.05;
                      dp = Math.round(dp / 500) * 500;
                      newValue = dp < 0 ? 0 : dp;
                    } else {
                      newValue = currentValue + 500;
                    }
                    break;
                  default:
                    newValue = currentValue + parseFloat(input.getAttribute('step') || 1);
                }
              }
              else {
                newValue = currentValue + parseFloat(input.getAttribute('step') || 1);
              }

              input.value = newValue;
              input.dispatchEvent(new Event('input'));
            });
          });

          document.querySelectorAll('.number-input-down').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
              e.preventDefault();
              const targetId = this.getAttribute('data-target');
              const input = document.getElementById(targetId);

              const parentForm = input.closest('form');
              const isMortgage = parentForm && parentForm.querySelector('#amortization-period');
              const isBorrowing = parentForm && parentForm.querySelector('#mortgage-term');

              let currentValue = parseFloat(input.value) || 0;
              let newValue = currentValue;

              if (isBorrowing) {
                switch (targetId) {
                  case 'annual-income':
                    newValue = currentValue === 0 ? 0 : Math.round((currentValue - 1000) / 1000) * 1000;
                    break;
                  case 'monthly-expenses':
                    newValue = currentValue === 0 ? 0 : Math.round((currentValue - 250) / 250) * 250;
                    break;
                  case 'down-payment':
                    newValue = currentValue === 0 ? 0 : Math.round((currentValue - 250) / 250) * 250;
                    break;
                  case 'interest-rate':
                    newValue = currentValue === 0 ? 0 : Number((Math.round((currentValue - 0.05) / 0.05) * 0.05).toFixed(2));
                    break;
                  default:
                    newValue = currentValue - parseFloat(input.getAttribute('step') || 1);
                }
              }
              else if (isMortgage) {
                switch (targetId) {
                  case 'cost':
                    newValue = currentValue === 0 ? 0 : Math.round((currentValue - 1000) / 1000) * 1000;
                    break;
                  case 'interest-rate':
                    newValue = currentValue === 0 ? 0 : Number((Math.round((currentValue - 0.05) / 0.05) * 0.05).toFixed(2));
                    break;
                  case 'down-payment':
                    if (currentValue === 0) {
                      const costInput = parentForm.querySelector('#cost');
                      const costVal = parseFloat(costInput.value) || 0;
                      let dp = costVal * 0.05;
                      dp = Math.round(dp / 500) * 500;
                      newValue = dp - 500;
                    } else {
                      newValue = currentValue - 500;
                    }
                    break;
                  default:
                    newValue = currentValue - parseFloat(input.getAttribute('step') || 1);
                }
              }
              else {
                newValue = currentValue - parseFloat(input.getAttribute('step') || 1);
              }

              if (newValue < 0) newValue = 0;
              input.value = newValue;
              input.dispatchEvent(new Event('input'));
            });
          });
        }

        const formatCurrency = (number) => {
          return new Intl.NumberFormat(isEnglish ? 'en-CA' : 'fr-CA', {
            style: 'currency',
            currency: 'CAD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(number);
        };

        const freqMap = {
          monthly: 12,
          'bi-weekly': 26,
          weekly: 52,
        };
        const freqLabelMap = {
          monthly: isEnglish ? '/month' : '/mois',
          'bi-weekly': isEnglish ? '/2-weeks' : '/2-semaines',
          weekly: isEnglish ? '/week' : '/semaine',
        };

        function calculatePaymentAndCapacity(annualIncome, annualExpenses, deposit, interestRate, term, frequency) {
          const paymentsPerYear = freqMap[frequency];
          const periodicIncome = annualIncome / paymentsPerYear;
          const periodicExpenses = annualExpenses / paymentsPerYear;
          const periodicRate = interestRate / 100 / paymentsPerYear;
          const numberOfPayments = term * paymentsPerYear;
          const maxPeriodicPayment = periodicIncome * 0.32;

          let presentValue = 0;
          if (periodicRate > 0) {
            presentValue = maxPeriodicPayment *
              ((1 - Math.pow(1 + periodicRate, -numberOfPayments)) / periodicRate);
          } else {
            presentValue = maxPeriodicPayment * numberOfPayments;
          }
          return { paymentPerPeriod: maxPeriodicPayment, borrowingCapacity: Math.round(presentValue + deposit) };
        }

        const formContainer = document.createElement('form');
        formContainer.innerHTML = `
            <style>
        .calculator-nav {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
      padding: 10px;
    }
    .calculator-nav-button {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      color: #9c27b0;
      background-color: #F8EAFA;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
      font-size: 1em;
    }
    .calculator-nav-button:hover {
      color: white;
      background-color: #9c27b0;
    }
    .calculator-nav-button.active {
      color: white;
      background-color: #9c27b0;
    }
    /* Form Layout */
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
      padding-left: 30px; /* for currency symbol */
    }
    .currency-symbol {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: black;
    }
    .input-suffix {
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateY(-50%);
      color: black;
      font-size: 13px;
    }
    /* Results Display */
    .results-row {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }
    .result {
      margin: 0;
      padding: 20px;
      background: #F8EAFA;
      border-radius: 8px;
      text-align: center;
      flex: 1;
      display: none;
    }
    .result h3 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 1.2em;
    }
    .result .amount {
      font-size: 2em;
      color: #bb5cf6;
      font-weight: bold;
      margin: 15px 0;
    }
    .hint {
      font-size: 0.9em;
      color: #666;
      margin-top: 0px;
      line-height: 1.4;
      padding: 0 20px;
    }
    .modal-title {
      text-align: center;
      color: #333;
      border-bottom: 2px solid #bb5cf6;
      padding-bottom: 15px;
      margin-bottom: 25px;
      font-size: 1.5em;
    }
    /* ===================== Booking-Style Dropdown ===================== */
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
    }
    .select-btn .btn-text {
      font-size: 14px;
      font-weight: 500;
    }
    .select-btn .arrow-dwn {
      display: flex;
      height: 24px;
      width: 24px;
      color: #9c27b0;
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
      border: 2px solid #9c27b0;
      outline: none;
    }
    .list-items {
      position: static;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
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
    .currency-input:focus {
      border: 2px solid #9c27b0; /* match collapsible dropdown border */
      outline: none;
    }
    .list-items .item:hover {
      background-color: #F8EAFA;
    }
    .item .item-text {
      font-size: 13px;
      font-weight: 500;
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
      background-color: #9c27b0;
      border: 2px solid #9c27b0;
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
    /* ===================== Numeric Input Controls ===================== */
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
    .number-input-controls {
      position: absolute;
      right: 0px;
      top: 0px;
      bottom: 0px;
      width: 20px;
      display: flex;
      flex-direction: column;
      background-color: #F5E7FE;
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
      color: #9A0DF2;
      cursor: pointer;
      font-size: 8px;
    }
    .number-input-up:hover,
    .number-input-down:hover {
      background-color: #9A0DF2;
      color: #fff;
    }
        </style>
          <div class="modal-title">
            ${isEnglish ? 'Borrowing Capacity Calculator' : "Calculateur de capacité d'emprunt"}
          </div>
          <div class="form-row">
            <div class="form-column">
              <label for="annual-income" class="bold-label">
                ${isEnglish ? 'Annual Gross Income' : 'Revenu annuel brut'}
              </label>
              <div class="input-group number-input-wrapper">
                <span class="currency-symbol">$</span>
                <input type="number" id="annual-income" class="currency-input" required
                       placeholder="${isEnglish ? 'Enter your annual income' : 'Entrez votre revenu annuel'}"
                       min="1000" step="1000">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="annual-income">▲</div>
                  <div class="number-input-down" data-target="annual-income">▼</div>
                </div>
              </div>
            </div>
            <div class="form-column">
              <label for="monthly-expenses" class="bold-label">
                ${isEnglish ? 'Monthly Expenses' : 'Dépenses mensuelles'}
              </label>
              <div class="input-group number-input-wrapper">
                <span class="currency-symbol">$</span>
                <input type="number" id="monthly-expenses" class="currency-input" required
                       placeholder="${isEnglish ? 'Enter monthly expenses' : 'Entrez les dépenses mensuelles'}"
                       min="500" step="250">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="monthly-expenses">▲</div>
                  <div class="number-input-down" data-target="monthly-expenses">▼</div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-column">
              <label for="down-payment" class="bold-label">
                ${isEnglish ? 'Down Payment Available' : 'Mise de fonds disponible'}
              </label>
              <div class="input-group number-input-wrapper">
                <span class="currency-symbol">$</span>
                <input type="number" id="down-payment" class="currency-input" required
                       placeholder="${isEnglish ? 'Enter down payment' : 'Entrez la mise de fonds'}"
                       min="250" step="250">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="down-payment">▲</div>
                  <div class="number-input-down" data-target="down-payment">▼</div>
                </div>
              </div>
            </div>
            <div class="form-column">
              <label for="interest-rate" class="bold-label">
                ${isEnglish ? 'Interest Rate (%)' : "Taux d'intérêt (%)"}
              </label>
              <div class="input-group number-input-wrapper">
                <input type="number" id="interest-rate" class="currency-input" required
                       placeholder="${isEnglish ? 'Enter interest rate' : "Entrez le taux d'intérêt"}"
                       min="1" max="100" step="0.05">
                <div class="number-input-controls">
                  <div class="number-input-up" data-target="interest-rate">▲</div>
                  <div class="number-input-down" data-target="interest-rate">▼</div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-column">
              <label class="bold-label" for="mortgage-term">
                ${isEnglish ? 'Mortgage Term (Years)' : 'Durée du prêt (Années)'}
              </label>
              <div class="dropdown-container" id="dropdown-mortgage-term">
                <div class="select-btn" tabindex="0">
                  <span class="btn-text">25 ${isEnglish ? 'years' : 'ans'}</span>
                  <span class="arrow-dwn">${SVG_CHEVRON}</span>
                  </span>
                </div>
                <ul class="list-items single-select" id="mortgageTermList">
                  <li class="item checked" data-value="25"><span class="item-text">25 ${isEnglish ? 'years' : 'ans'}</span></li>
                  <li class="item" data-value="20"><span class="item-text">20 ${isEnglish ? 'years' : 'ans'}</span></li>
                  <li class="item" data-value="15"><span class="item-text">15 ${isEnglish ? 'years' : 'ans'}</span></li>
                  <li class="item" data-value="10"><span class="item-text">10 ${isEnglish ? 'years' : 'ans'}</span></li>
                </ul>
              </div>
              <input type="hidden" id="mortgage-term" value="25">
            </div>
            <div class="form-column">
              <label class="bold-label" for="payment-frequency">
                ${isEnglish ? 'Payment Frequency' : 'Fréquence de paiement'}
              </label>
              <div class="dropdown-container" id="dropdown-payment-frequency-b">
                <div class="select-btn" tabindex="0">
                  <span class="btn-text">${isEnglish ? 'Monthly' : 'Mensuelle'}</span>
                  <span class="arrow-dwn">${SVG_CHEVRON}</span>
                  </span>
                </div>
                <ul class="list-items single-select" id="paymentFrequencyListB">
                  <li class="item checked" data-value="monthly"><span class="item-text">${isEnglish ? 'Monthly' : 'Mensuelle'}</span></li>
                  <li class="item" data-value="bi-weekly"><span class="item-text">${isEnglish ? 'Bi-weekly' : 'Aux deux semaines'}</span></li>
                  <li class="item" data-value="weekly"><span class="item-text">${isEnglish ? 'Weekly' : 'Hebdomadaire'}</span></li>
                </ul>
              </div>
              <input type="hidden" id="payment-frequency" value="monthly">
            </div>
          </div>
          <div class="results-row">
            <div class="result" id="payment-preview">
              <h3>${isEnglish ? 'Estimated Payment Amount' : 'Montant estimé du paiement'}</h3>
              <div class="amount" id="payment-amount"></div>
              <div class="hint">${isEnglish
                ? 'This is your estimated payment amount based on the selected frequency.'
                : 'Ceci est votre montant de paiement estimé selon la fréquence sélectionnée.'}
              </div>
            </div>
            <div class="result" id="result">
              <h3>${isEnglish ? 'Your Estimated Borrowing Capacity' : "Votre capacité d'emprunt estimée"}</h3>
              <div class="amount" id="capacity-amount"></div>
              <div class="hint">
                ${isEnglish
                  ? 'This is an estimate based on a 32% Gross Debt Service ratio. Your actual borrowing capacity may vary based on other factors.'
                  : 'Cette estimation est basée sur un ratio du service de la dette brute de 32%. Votre capacité emprunt réelle peut varier en fonction d’autres facteurs.'
                }
              </div>
            </div>
          </div>
        `;

        function updateCalculations(container) {
          const annualIncome = Number(container.querySelector('#annual-income').value) || 0;
          const monthlyExpenses = Number(container.querySelector('#monthly-expenses').value) || 0;
          const downPayment = Number(container.querySelector('#down-payment').value) || 0;
          const interestRate = Number(container.querySelector('#interest-rate').value) || 0;
          const mortgageTerm = Number(container.querySelector('#mortgage-term').value) || 25;
          const frequency = container.querySelector('#payment-frequency').value || 'monthly';

          const capacityAmount = container.querySelector('#capacity-amount');
          const paymentAmount = container.querySelector('#payment-amount');
          const paymentPreview = container.querySelector('#payment-preview');
          const resultDiv = container.querySelector('#result');

          if (annualIncome > 0 && interestRate > 0) {
            const { paymentPerPeriod, borrowingCapacity } =
              calculatePaymentAndCapacity(
                annualIncome,
                monthlyExpenses * 12,
                downPayment,
                interestRate,
                mortgageTerm,
                frequency
              );
            capacityAmount.textContent = formatCurrency(borrowingCapacity);
            paymentAmount.textContent = formatCurrency(paymentPerPeriod) + freqLabelMap[frequency];
            paymentPreview.style.display = 'block';
            resultDiv.style.display = 'block';
          } else {
            paymentPreview.style.display = 'none';
            resultDiv.style.display = 'none';
          }
        }

        const fields = [
          '#annual-income',
          '#monthly-expenses',
          '#down-payment',
          '#interest-rate',
          '#mortgage-term',
          '#payment-frequency'
        ];

        fields.forEach(selector => {
          formContainer.querySelector(selector).addEventListener('input', () => updateCalculations(formContainer));
        });

        calculatorContainer.innerHTML = '';
        calculatorContainer.appendChild(formContainer);

        modal.style.display = 'flex';
        attachNumericControls();

        // Initialize dropdown logic
        setupDropdownSingle("dropdown-mortgage-term", "mortgageTermList", "mortgage-term", `25 ${isEnglish ? 'years' : 'ans'}`);
        setupDropdownSingle("dropdown-payment-frequency-b", "paymentFrequencyListB", "payment-frequency", isEnglish ? 'Monthly' : 'Mensuelle');

        // Trigger first calculation
        updateCalculations(formContainer);
      },
    };

    /**********************************************************************
     * 5) CombinedCalculatorsExtension
     **********************************************************************/
    const CombinedCalculatorsExtension = {
      name: 'CombinedCalculators',
      type: 'response',
      match: ({ trace }) =>
        trace.type === 'ext_combined_calculators' || trace.payload?.name === 'ext_combined_calculators',
      render: ({ trace, element }) => {
        const { language = 'en', propertyCost } = trace.payload;
        const isEnglish = language === 'en';
        const modal = document.getElementById('calculator-modal');
        const closeButton = modal.querySelector('.close-button');
        const calculatorContainer = document.getElementById('calculator-container');

        const navHTML = `
            <style>
        .calculator-nav {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
      padding: 10px;
    }
    .calculator-nav-button {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      color: #9c27b0;
      background-color: #F8EAFA;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
      font-size: 1em;
    }
    .calculator-nav-button:hover {
      color: white;
      background-color: #9c27b0;
    }
    .calculator-nav-button.active {
      color: white;
      background-color: #9c27b0;
    }
    /* Form Layout */
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
      padding-left: 30px; /* for currency symbol */
    }
    .currency-symbol {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: black;
    }
    .input-suffix {
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateY(-50%);
      color: black;
      font-size: 13px;
    }
    /* Results Display */
    .results-row {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }
    .result {
      margin: 0;
      padding: 20px;
      background: #F8EAFA;
      border-radius: 8px;
      text-align: center;
      flex: 1;
      display: none;
    }
    .result h3 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 1.2em;
    }
    .result .amount {
      font-size: 2em;
      color: #bb5cf6;
      font-weight: bold;
      margin: 15px 0;
    }
    .hint {
      font-size: 0.9em;
      color: #666;
      margin-top: 8px;
      line-height: 1.4;
      padding: 0 20px;
    }
    .modal-title {
      text-align: center;
      color: #333;
      border-bottom: 2px solid #bb5cf6;
      padding-bottom: 15px;
      margin-bottom: 25px;
      font-size: 1.5em;
    }
    /* ===================== Booking-Style Dropdown ===================== */
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
    }
    .select-btn .btn-text {
      font-size: 14px;
      font-weight: 500;
    }
    .select-btn .arrow-dwn {
      display: flex;
      height: 24px;
      width: 24px;
      color: #9c27b0;
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
      border: 2px solid #9c27b0;
      outline: none;
    }
    .list-items {
      position: static;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
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
    .currency-input:focus {
      border: 2px solid #9c27b0; /* match collapsible dropdown border */
      outline: none;
    }
    .list-items .item:hover {
      background-color: #F8EAFA;
    }
    .item .item-text {
      font-size: 13px;
      font-weight: 500;
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
      background-color: #9c27b0;
      border: 2px solid #9c27b0;
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
    /* ===================== Numeric Input Controls ===================== */
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
    .number-input-controls {
      position: absolute;
      right: 0px;
      top: 0px;
      bottom: 0px;
      width: 20px;
      display: flex;
      flex-direction: column;
      background-color: #F5E7FE;
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
      color: #9A0DF2;
      cursor: pointer;
      font-size: 8px;
    }
    .number-input-up:hover,
    .number-input-down:hover {
      background-color: #9A0DF2;
      color: #fff;
    }
        </style>
          <div class="calculator-nav">
            <button class="calculator-nav-button active" data-calculator="borrowing">
              ${isEnglish ? 'Borrowing Capacity' : "Capacité d'emprunt"}
            </button>
            <button class="calculator-nav-button" data-calculator="mortgage">
              ${isEnglish ? 'Mortgage Payment' : 'Paiement hypothécaire'}
            </button>
          </div>
        `;

        function closeModal() {
          modal.style.display = 'none';
          document.removeEventListener('keydown', handleKeyPress);
          window.removeEventListener('click', handleOutsideClick);
        }

        function handleKeyPress(event) {
          if (modal.style.display === 'flex' && event.key === 'Escape') {
            closeModal();
          }
        }

        function handleOutsideClick(event) {
          if (event.target === modal) {
            closeModal();
          }
        }

        function switchCalculator(type) {
          const buttons = modal.querySelectorAll('.calculator-nav-button');
          buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.calculator === type);
          });
          calculatorContainer.innerHTML = '';
          if (type === 'borrowing') {
            BorrowingCalculatorExtension.render({ trace: { payload: { language } } });
          } else {
            const mortgageContainer = document.createElement('div');
            mortgageContainer.id = 'mortgage-calculator-modal-content';
            calculatorContainer.appendChild(mortgageContainer);
            MortgageCalculatorExtension.render({
              trace: { payload: { language, propertyCost } },
              element: mortgageContainer
            });
          }
        }

        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = `
          <style>
            .thumbs-up {
              font-size: 1.2em;
              cursor: pointer;
              display: inline-block;
              transition: transform 0.2s ease-in-out;
            }
          </style>
          <div class="thumbs-up">👍</div>
        `;
        const thumbsUp = modalContainer.querySelector('.thumbs-up');
        if (thumbsUp) {
          thumbsUp.addEventListener('click', () => {
            if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
              window.voiceflow.chat.interact({ type: 'complete', payload: {} });
            } else {
              console.warn('window.voiceflow.chat.interact is not available');
            }
          });
        }
        element.appendChild(modalContainer);

        closeButton.addEventListener('click', e => {
          e.stopPropagation();
          closeModal();
        });

        document.addEventListener('keydown', handleKeyPress);
        window.addEventListener('click', handleOutsideClick);

        // Remove any existing nav
        const existingNav = modal.querySelector('.calculator-nav');
        if (existingNav) {
          existingNav.remove();
        }

        calculatorContainer.insertAdjacentHTML('beforebegin', navHTML);

        const navButtons = modal.querySelectorAll('.calculator-nav-button');
        navButtons.forEach(button => {
          button.addEventListener('click', () => switchCalculator(button.dataset.calculator));
        });

        modal.style.display = 'flex';
        switchCalculator('borrowing');
      },
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
              border: 2px solid #9c27b0;
            }
            .book-now {
              color: #9c27b0;
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
              background-color: #9c27b0;
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
              color: #9c27b0;
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
              border: 2px solid #9c27b0;
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
              background-color: #9c27b0;
              border: 2px solid #9c27b0;
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

window.UserInformationExtension = UserInformationExtension;
window.ContactExtension = ContactExtension;
window.BookingExtension = BookingExtension;
window.RescheduleExtension = RescheduleExtension;
window.CancellationExtension = CancellationExtension;
window.SellingExtension = SellingExtension;
window.PropertySearchExtension = PropertySearchExtension;
window.ImageExtension = ImageExtension;
window.LocalisationExtension = LocalisationExtension;
window.CombinedCalculatorsExtension = CombinedCalculatorsExtension;
