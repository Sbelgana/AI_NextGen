/*************************************************************
 * 1) Helper Function
 *************************************************************/
function isValidEmail(email) {
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  return emailPattern.test(email);
}

function isValidPhoneNumber(phoneNumber) {
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
 * 3) Agents & Agent Utilities
 *************************************************************/

const Agents = ["No Preference", "Emma Thompson", "Liam Carter", "Sophia Martinez", "Ethan Brown", "Olivia Davis", "Noah Wilson", "Ava Johnson"];

function getAgentList(includeNoPreference = true) {
  let list = [...Agents];
  if (!includeNoPreference) {
    list = list.filter(s => s !== "No Preference");
  }
  return list;
}

function buildAgentListItems(agents, isEnglish) {
  return agents
    .map((agent) => {
      const displayName = (!isEnglish && agent === "No Preference") ? "Pas de préférence" : agent;
      return `
            <li class="item">
              <span class="checkbox">
                                ${SVG_CHECK}
                              </span>
              <span class="item-text" data-value="${agent}">${displayName}</span>
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
 * 5) Mappings & Options
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
 * 6) Shared Cities Data
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
 * 7) Airtable Formula Generation
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
 * 8) Define the svg Icone
 *************************************************************/

     
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

const SVG_Plus = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 400" width="15px" height="15px"> 
      <path fill="#9C27B0" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
    </svg>`;
const SVG_Minus =  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 400" width="15px" height="15px"> 
      <path fill="#9C27B0" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
    </svg>`;


const SVG_AGENT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
      <path fill="#9C27B0" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
    </svg>`;

/*************************************************************
 * 9) Define the Extensions
 *************************************************************/

/************** EXTENSION #1: SearchPropertyFormExtension **************/
const SearchPropertyFormExtension = {
  name: "PropertySearchForm",
  type: "response",
  match: ({ trace }) => trace.type === "ext_property_search_form" || trace.payload?.name === "ext_property_search_form",
  render: ({ trace, element }) => {
    const { language } = trace.payload;
    const isEnglish = language === "en";
        
        // Create the form container.
        const formContainer = document.createElement("form");
        formContainer.setAttribute("novalidate", "true");
        formContainer.innerHTML = `
        <style>
    /* ========= Dropdown Components ========= */
    /* ========= LAYOUT & STRUCTURE ========= */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  border-radius: 6px;
  background: #fff;
}

.flex-row {
  display: flex;
  gap: 10px 16px;
  flex-wrap: wrap;
}

.flex-row > div {
  flex: 1;
  min-width: 300px;
}

.main-container {
  display: block;
  transition: height 0.3s ease;
  border-radius: 6px;
  margin-bottom: 15px;
}

.select-container {
  min-width: 300px;
  max-width: 600px;
  width: 100%;
  margin-bottom: 10px;
}

/* ========= SECTION STYLING ========= */
.section {
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 6px;
  margin-bottom: 10px;
  overflow: hidden;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.section:hover:not(.disabled) {
  border-color: #9C27B0;
  box-shadow: 0 3px 8px rgba(154,13,242,0.1);
}

.section.active {
  border: 2px solid #9C27B0;
  box-shadow: 0 3px 8px rgba(154,13,242,0.1);
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
  font-size: 16px;
}

.collapse-icon {
  transition: transform 0.3s;
  background: #F8EAFA;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
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

/* ========= DROPDOWN COMPONENTS ========= */
.select-wrapper {
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  position: relative;
  min-width: 300px;
  max-width: 600px;
  width: 100%;
  min-height: 50px;
}

.select-display {
  padding: 0 15px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
				color: #444;
}

.dropdown-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F8EAFA;
  border-radius: 50%;
}

.dropdown-icon.rotate {
  transform: rotate(180deg);
}

.custom-options {
  display: none;
  font-size: 14px;
  border-top: 1px solid #ddd;
  max-height: 300px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 100;
  border-radius: 0 0 6px 6px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.custom-options::-webkit-scrollbar {
  display: none;
}

.show-options {
  display: block;
}

.custom-option {
  padding: 12px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
}

.custom-option:hover {
  background-color: #F8EAFA;
  color: #9C27B0;
}

.custom-option.selected {
  background-color: #F8EAFA;
  color: #9C27B0;
  font-weight: bold;
}

.option-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #ccc;
  border-radius: 50%;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  transition: all 0.2s;
}

.multi-select .option-checkbox {
  border-radius: 4px !important;
}

.custom-option.selected .option-checkbox {
  border-color: #9C27B0;
  background-color: #9C27B0;
}

.custom-option:not(.selected):hover .option-checkbox {
  border-color: #9C27B0;
}

.custom-option.selected .option-checkbox svg path {
  fill: #fff !important;
}

.custom-option:not(.selected):hover .option-checkbox svg path {
  fill: #9C27B0;
}

.custom-option.selected .main-arrow,
    .custom-option:hover .main-arrow {
      background-color: #fff;
    }
    
.main-arrow {
      margin-left: auto;
    display: flex
    align-items: center;
    background-color: #F8EAFA;
    border-radius: 50%;
    transition: background-color 0.3s;
    width: 24px;
    height: 24px;
    justify-content: center;
    }
    .arrow-icon {
      transition: transform 0.3s ease;
      display: flex
;
    }
    .arrow-icon.rotate {
      transform: rotate(180deg);
    }

.sub-options {
  margin-left: 25px;
  border-left: 2px solid #9C27B0;
}

select {
  display: none;
}

/* ========= FORM INPUTS ========= */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"]{
  width: 100%;
  min-width: 200px;
  max-width: 100%;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 6px;
  padding: 8px;
  background: #fff;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  height: 50px;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
input[type="number"]:focus{
  border: 2px solid #9C27B0;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* ========= NUMBER INPUT GROUP ========= */
.price-control {
  display: flex;
  align-items: center;
  gap: 5px;
}

.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 15px;
  min-width: 200px;
  width: 100%;
  max-width: 100%;
  border: 1px solid #ddd;
  height: 50px;
  overflow: hidden;
}

.input-group:focus-within {
  border: 2px solid #9C27B0;
  outline: none;
}

.input-group input[type="number"]:focus {
  border: none !important;
  outline: none !important;
}

.input-group button,
.input-group input {
  outline: none;
  border: none;
  padding: 16px;
  
}

.input-group input {
  width: 100%;
  text-align: center;
}

.input-group button {
  cursor: pointer;
  background-color: #F8EAFA;
}

.input-group button:hover {
  background-color: #9C27B0;
}

.input-group button:hover svg path {
  fill: #fff !important;
}

/* ========= CHECKBOXES ========= */
.checkbox-container {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.checkbox-container input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}



.custom-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 2px solid #9C27B0;
  border-radius: 6px;
  background-color: #fff;
  margin-right: 8px;
  position: relative;
}

.check-icon {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #9C27B0;
  align-items: center;
  justify-content: center;
}

.checkbox-container input[type="checkbox"]:checked 
  + .bold-label 
  .custom-checkbox 
  .check-icon {
  display: flex;
}

.checkbox-text {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

/* ========= LABELS ========= */
.bold-label {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 8px;
      display: block;
  
  display: inline-flex;
  align-items: center;
}



/* ========= BUTTONS ========= */
.submit {
  color: #9C27B0;
  background-color: #F8EAFA;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.2s, color 0.2s, font-weight 0.2s;
  width: 100%;
}

.submit:hover {
  color: #fff;
  background-color: #9C27B0;
  font-weight: 600;
}

.submit:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
  font-weight: 700;
}

/* ========= STATES ========= */
.disabled {
  cursor: not-allowed !important;
}

.disabled * {
  pointer-events: none !important;
  cursor: not-allowed !important;
}

/* ========= PLACEHOLDER STYLING ========= */
.select-display.placeholder span {
  color: #808080;
}

.select-display:not(.placeholder) span {
  color: #000;
}

.select-display.placeholder input {
  color: #808080;
}

.select-display:not(.placeholder) input {
  color: #000;
}

  </style>
          <!-- SECTION 1: Location & Category -->
          <div class="flex-row">
          <div class="section">
            <div class="section-card" data-target="section-location-category">
              <div class="section-info">
                <div class="section-icon">${SVG_ADDRESS}</div>
                <div class="section-title">${isEnglish ? "Location & Category" : "Emplacement & Catégorie"}</div>
              </div>
              <div class="collapse-icon">${SVG_CHEVRON}</div>
            </div>
            <div class="collapsible-section" id="section-location-category">
              <div class="section-content">
                <!-- City Selection: Multi-select -->
                <div class="select-container multi-select" id="citySelectContainer">
                  <label class="bold-label">${isEnglish ? "Select City" : "Sélectionnez la ville"}</label>
                  <select id="cityMainSelect" multiple></select>
                  <select id="citySubSelect" multiple></select>
                  <div class="select-wrapper">
                    <div class="select-display" id="dropdownToggleCity" data-placeholder="${isEnglish ? 'Choose a city' : 'Choisissez la ville'}">
                      <span id="selectedTextCity">${isEnglish ? 'Choose a city' : 'Choisissez la ville'}</span>
                      <div class="dropdown-icon" id="dropdownIconCity">${SVG_CHEVRON}</div>
                    </div>
                    <div class="custom-options" id="customOptionsCity"></div>
                  </div>
                </div>
                <!-- Property Category: Multi-select -->
                <div class="select-container multi-select" id="propertyCategorySelectContainer">
                  <label class="bold-label">${isEnglish ? "Property Category" : "Catégorie de propriété"}</label>
                  <select id="propertyCategoryMainSelect" multiple></select>
                  <select id="propertyCategorySubSelect" multiple></select>
                  <div class="select-wrapper">
                    <div class="select-display" id="selectDisplayPropertyCategory" data-placeholder="${isEnglish ? '-- Select Category --' : '-- Sélectionnez une catégorie --'}">
                      <span id="selectedTextPropertyCategory">${isEnglish ? '-- Select Category --' : '-- Sélectionnez une catégorie --'}</span>
                      <div class="dropdown-icon" id="dropdownIconPropertyCategory">${SVG_CHEVRON}</div>
                    </div>
                    <div class="custom-options" id="customOptionsPropertyCategory"></div>
                  </div>
                </div>
                <!-- Property Type: Single-select -->
                <div class="select-container multi-select" id="houseTypeDropdown">
  <label class="bold-label">${isEnglish ? "Property Type" : "Type de propriété"}</label>
  <select id="houseTypeMainSelect" multiple></select>
  <select id="houseTypeSubSelect" multiple></select>
  <div class="select-wrapper">
    <div class="select-display" id="selectDisplayHouseType" data-placeholder="${isEnglish ? '-- Select Property Type --' : '-- Sélectionnez le type de propriété --'}">
      <span id="selectedTextHouseType">${isEnglish ? '-- Select Property Type --' : '-- Sélectionnez le type de propriété --'}</span>
      <div class="dropdown-icon" id="dropdownIconHouseType">${SVG_CHEVRON}</div>
    </div>
    <div class="custom-options" id="customOptionsHouseType"></div>
  </div>
</div>

              </div>
            </div>
          </div>
          
          <!-- SECTION 2: Price Range -->
<div class="section">
  <div class="section-card" data-target="section-price-range">
    <div class="section-info">
      <div class="section-icon">${SVG_DOLLAR}</div>
      <div class="section-title">${isEnglish ? "Price Range" : "Plage de Prix"}</div>
    </div>
    <div class="collapse-icon">${SVG_CHEVRON}</div>
  </div>
  <div class="collapsible-section" id="section-price-range">
    <div class="section-content">
      <div class="flex-row">
        <div>
          <label for="price-min" class="bold-label">${isEnglish ? "Minimum Budget" : "Budget minimum"}</label>
          <div class="price-control">
            <div class="input-group">
              <button type="button" id="decrement-price-min" class="decrement-price">
  ${SVG_Minus}
</button>
              <input type="number" id="price-min" name="price-min" placeholder="${isEnglish ? 'Enter minimum budget' : 'Entrez le budget minimum'}">
              <button type="button" id="increment-price-min" class="increment-price">
  ${SVG_Plus}
</button>
            </div>
          </div>
        </div>
        <div>
          <label for="price-max" class="bold-label">${isEnglish ? "Maximum Budget" : "Budget maximum"}</label>
          <div class="price-control">
            <div class="input-group">
             <button type="button" id="decrement-price-max" class="decrement-price">
  ${SVG_Minus}
</button>
              <input type="number" id="price-max" name="price-max" placeholder="${isEnglish ? 'Enter maximum budget' : 'Entrez le budget maximum'}">
              <button type="button" id="increment-price-max" class="increment-price">
  ${SVG_Plus}
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
          </div>
          <div class="flex-row">

          
          <!-- SECTION 3: Property Specifications -->
          <div class="section">
            <div class="section-card" data-target="section-property-specs">
              <div class="section-info">
                <div class="section-icon">${SVG_LIST}</div>
                <div class="section-title">${isEnglish ? "Property Specifications" : "Caractéristiques de la Propriété"}</div>
              </div>
              <div class="collapse-icon">${SVG_CHEVRON}</div>
            </div>
            <div class="collapsible-section" id="section-property-specs">
              <div class="section-content">
                <div class="flex-row">
                  <!-- Example replacement for Rooms -->
<div class="main-container" id="roomsGroup">
  <label class="bold-label">${isEnglish ? "Rooms" : "Nombre de pièces"}</label>
  <div class="price-control">
    <div class="input-group">
      <button type="button" id="decrement-roomsInput" class="decrement-generic">
  ${SVG_Minus}
</button>
      <input type="number" id="roomsInput" min="1" max="50" placeholder="${isEnglish ? 'Number of rooms' : 'Nombre de pièces'}">
     <button type="button" id="increment-roomsInput" class="increment-generic">
  ${SVG_Plus}
</button>
    </div>
  </div>
</div>
<div class="main-container" id="bedroomsDropdown">
  <label class="bold-label">${isEnglish ? "Bedrooms" : "Chambres"}</label>
  <div class="price-control">
    <div class="input-group">
      <button type="button" id="decrement-bedRoomsInput" class="decrement-generic">
  ${SVG_Minus}
</button>
      <input type="number" id="bedroomsInput" min="0" max="50" placeholder="${isEnglish ? 'Number of bedrooms' : 'Nombre de chambres'}">
     <button type="button" id="increment-bedRoomsInput" class="increment-generic">
  ${SVG_Plus}
</button>
    </div> 
  </div> 
</div>
<div class="main-container" id="bathroomsDropdown">
  <label class="bold-label">${isEnglish ? "Bathrooms" : "Salles de bain"}</label>
  <div class="price-control">
    <div class="input-group">
      <button type="button" id="decrement-bathroomsInput" class="decrement-generic">
  ${SVG_Minus}
</button>
      <input type="number" id="bathroomsInput" min="0" max="50" placeholder="${isEnglish ? 'Number of bathrooms' : 'Nombre de salles de bain'}">
      <button type="button" id="increment-bathroomsInput" class="increment-generic">
  ${SVG_Plus}
</button>
    </div>
  </div>
</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- SECTION 4: Additional Features -->
          <div class="section">
            <div class="section-card" data-target="section-additional-features">
              <div class="section-info">
                <div class="section-icon">${SVG_SLIDER}</div>
                <div class="section-title">${isEnglish ? "Additional Features" : "Caractéristiques Supplémentaires"}</div>
              </div>
              <div class="collapse-icon">${SVG_CHEVRON}</div>
            </div>
            <div class="collapsible-section" id="section-additional-features">
              <div class="section-content">
                <div class="flex-row">
                  <div class="checkbox-container">
                    <input type="checkbox" id="garage" name="garage" />
                    <label for="garage" class="bold-label">
                      <span class="custom-checkbox"><span class="check-icon">${SVG_CHECK}</span></span>
                      <span class="checkbox-text">Garage</span>
                    </label>
                  </div>
                  
                  <div class="main-container" id="garageCapacityGroup" style="display:none;">
  <label class="bold-label">${isEnglish ? "Garage Capacity" : "Capacité du garage"}</label>
  <div class="price-control">
    <div class="input-group">
      <button type="button" id="decrement-garageCapacityInput" class="decrement-generic">
  ${SVG_Minus}
</button>
      <input type="number" id="garageCapacityInput" min="1" max="10" placeholder="${isEnglish ? 'Number of cars' : 'Nombre de voitures'}">
      <button type="button" id="increment-garageCapacityInput" class="increment-generic">
  ${SVG_Plus}
</button>
    </div>
  </div>
</div>

                  <div class="checkbox-container">
                    <input type="checkbox" id="swimming-pool" name="swimming-pool" />
                    <label for="swimming-pool" class="bold-label">
                      <span class="custom-checkbox"><span class="check-icon">${SVG_CHECK}</span></span>
                      <span class="checkbox-text">${isEnglish ? "Swimming Pool" : "Piscine"}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          
          <!-- Submit Button -->
          <button type="button" class="submit" id="submit-button">
            ${isEnglish ? "Search" : "Rechercher"}
          </button>
        `;
        element.appendChild(formContainer);
		

// Attach event handlers to increment/decrement buttons
// Define form-scoped increment/decrement functions
function decrementPriceValue(id, step) {
  const input = formContainer.querySelector(`#${id}`);
  let currentValue = input.value === "" ? 0 : parseInt(input.value, 10);
  if (id === "price-max") {
    const priceMin = parseInt(formContainer.querySelector("#price-min").value, 10) || 0;
    let newValue = currentValue - step;
    if (newValue < priceMin) { newValue = priceMin; }
    input.value = newValue;
    formContainer.querySelector("#price-min").max = newValue;
  } else if (id === "price-min") {
    let newValue = currentValue - step;
    if (newValue < 0) { newValue = 0; }
    input.value = newValue;
    formContainer.querySelector("#price-max").min = newValue;
  }
}

function incrementPriceValue(id, step) {
  const input = formContainer.querySelector(`#${id}`);
  let currentValue = input.value === "" ? 0 : parseInt(input.value, 10);
  let newValue = currentValue + step;
  if (id === "price-min") {
    const priceMax = parseInt(formContainer.querySelector("#price-max").value, 10) || 0;
    if (priceMax && newValue > priceMax) { newValue = priceMax; }
    input.value = newValue;
    formContainer.querySelector("#price-max").min = newValue;
  } else if (id === "price-max") {
    const minVal = parseInt(input.min, 10) || 0;
    if (newValue < minVal) { newValue = minVal; }
    input.value = newValue;
    formContainer.querySelector("#price-min").max = newValue;
  }
}

function decrementGenericValue(id, step, min) {
  const input = formContainer.querySelector(`#${id}`);
  let currentValue = parseInt(input.value, 10) || 0;
  let newValue = currentValue - step;
  if (newValue < min) { newValue = min; }
  input.value = newValue;
}

function incrementGenericValue(id, step, max) {
  const input = formContainer.querySelector(`#${id}`);
  let currentValue = parseInt(input.value, 10) || 0;
  let newValue = currentValue + step;
  if (newValue > max) { newValue = max; }
  input.value = newValue;
}

// Attach event handlers to increment/decrement buttons
formContainer.querySelector("#decrement-price-min").addEventListener('click', function() {
  decrementPriceValue('price-min', 1000);
});

formContainer.querySelector("#increment-price-min").addEventListener('click', function() {
  incrementPriceValue('price-min', 1000);
});

formContainer.querySelector("#decrement-price-max").addEventListener('click', function() {
  decrementPriceValue('price-max', 1000);
});

formContainer.querySelector("#increment-price-max").addEventListener('click', function() {
  incrementPriceValue('price-max', 1000);
});

// Attach handlers for rooms, bedrooms, bathrooms, garage capacity
formContainer.querySelector("#decrement-roomsInput").addEventListener('click', function() {
  decrementGenericValue('roomsInput', 1, 1);
});

formContainer.querySelector("#increment-roomsInput").addEventListener('click', function() {
  incrementGenericValue('roomsInput', 1, 50);
});

// Attach handlers for rooms, bedrooms, bathrooms, garage capacity
formContainer.querySelector("#decrement-bedRoomsInput").addEventListener('click', function() {
  decrementGenericValue('bedroomsInput', 1, 1);
});

formContainer.querySelector("#increment-bedRoomsInput").addEventListener('click', function() {
  incrementGenericValue('bedroomsInput', 1, 50);
});

// Attach handlers for rooms, bedrooms, bathrooms, garage capacity
formContainer.querySelector("#decrement-bathroomsInput").addEventListener('click', function() {
  decrementGenericValue('bathroomsInput', 1, 1);
});

formContainer.querySelector("#increment-bathroomsInput").addEventListener('click', function() {
  incrementGenericValue('bathroomsInput', 1, 50);
});

// Attach handlers for rooms, bedrooms, bathrooms, garage capacity
formContainer.querySelector("#decrement-garageCapacityInput").addEventListener('click', function() {
  decrementGenericValue('garageCapacityInput', 1, 1);
});

formContainer.querySelector("#increment-garageCapacityInput").addEventListener('click', function() {
  incrementGenericValue('garageCapacityInput', 1, 50);
});

// Add similar handlers for bedrooms, bathrooms, garage capacity
        
        /*************************************************************
         * 6) Section Toggle Setup (scoped within formContainer)
         *************************************************************/
        formContainer.querySelectorAll('.section-card').forEach(card => {
          const targetId = card.getAttribute("data-target");
          card.addEventListener("click", function(e) {
            e.stopPropagation();
            toggleSection(formContainer, targetId);
          });
        });
        
        /*************************************************************
         * 7) Additional Features: Garage Conditional Display
         *************************************************************/
         const GarageOptions = Options.Car.en;
    
    /**********************************************************************
     * Multi-Select Dropdown Helper (for Cities & Property Category)
     **********************************************************************/
    function buildMultiSelectDropdown(container, nativeMainSelect, nativeSubSelect, customOptionsContainer, dropdownToggle, dropdownIcon, selectedText, data, selectLabelAll) {
      // Clear previous options.
      nativeMainSelect.innerHTML = "";
      nativeSubSelect.innerHTML = "";
      customOptionsContainer.innerHTML = "";
      
      data.forEach(group => {
        nativeMainSelect.appendChild(new Option(group.name, group.id));
        
        const mainDiv = document.createElement("div");
        mainDiv.className = "custom-option category-option";
        mainDiv.dataset.value = group.id;
        mainDiv.innerHTML = `<span>${group.name}</span><div class="main-arrow"><div class="arrow-icon">${SVG_CHEVRON}</div></div>`;
        
        mainDiv.addEventListener("click", function(e) {
          e.stopPropagation();
          // Close any open dropdowns if clicking outside the current one
          const sectionContent = container.closest(".section-content");
          if (mainDiv.classList.contains("expanded")) {
            mainDiv.classList.remove("expanded");
            if (mainDiv.nextElementSibling && mainDiv.nextElementSibling.classList.contains("sub-options")) {
              mainDiv.nextElementSibling.remove();
            }
            mainDiv.querySelector(".arrow-icon").classList.remove("rotate");
            updateMultiSelectText();
          } else {
            // Close other dropdowns in the same section.
            if (sectionContent) {
              sectionContent.querySelectorAll(".custom-options").forEach(optList => {
                if(optList !== customOptionsContainer) {
                  optList.classList.remove("show-options");
                }
              });
              sectionContent.querySelectorAll(".dropdown-icon").forEach(icon => {
                if(icon !== dropdownIcon) {
                  icon.classList.remove("rotate");
                }
              });
              sectionContent.querySelectorAll(".custom-option.category-option.expanded").forEach(opt => {
                opt.classList.remove("expanded");
                if(opt.nextElementSibling && opt.nextElementSibling.classList.contains("sub-options")){
                  opt.nextElementSibling.remove();
                }
                const arrow = opt.querySelector(".arrow-icon");
                if (arrow) arrow.classList.remove("rotate");
              });
            }
            mainDiv.classList.add("expanded");
            mainDiv.querySelector(".arrow-icon").classList.add("rotate");
            const subWrapper = document.createElement("div");
            subWrapper.className = "sub-options";
            
            // "Select All" option.
            const selectAllDiv = document.createElement("div");
            selectAllDiv.className = "custom-option select-all-services";
            selectAllDiv.dataset.value = "select_all_" + group.id;
            const allCheckbox = document.createElement("div");
            allCheckbox.className = "option-checkbox";
            allCheckbox.innerHTML = SVG_CHECK;
            const allSpan = document.createElement("span");
            allSpan.textContent = selectLabelAll;
            selectAllDiv.appendChild(allCheckbox);
            selectAllDiv.appendChild(allSpan);
            selectAllDiv.addEventListener("click", function(e) {
              e.stopPropagation();
              const options = subWrapper.querySelectorAll(".custom-option.service-option");
              let allSelected = true;
              options.forEach(opt => { if (!opt.classList.contains("selected")) { allSelected = false; } });
              options.forEach(opt => {
                const nativeOpt = nativeSubSelect.querySelector(`option[value="${opt.dataset.value}"]`);
                if (allSelected) {
                  opt.classList.remove("selected");
                  if (nativeOpt) nativeOpt.selected = false;
                } else {
                  opt.classList.add("selected");
                  if (nativeOpt) nativeOpt.selected = true;
                }
              });
              if (allSelected) { selectAllDiv.classList.remove("selected"); }
              else { selectAllDiv.classList.add("selected"); }
              updateMultiSelectText();
            });
            subWrapper.appendChild(selectAllDiv);
            
            group.subcategories.forEach(item => {
              nativeSubSelect.appendChild(new Option(item.name, item.id));
              const subDiv = document.createElement("div");
              subDiv.className = "custom-option service-option";
              subDiv.dataset.value = item.id;
              const checkboxDiv = document.createElement("div");
              checkboxDiv.className = "option-checkbox";
              checkboxDiv.innerHTML = SVG_CHECK;
              const itemSpan = document.createElement("span");
              itemSpan.textContent = item.name;
              subDiv.appendChild(checkboxDiv);
              subDiv.appendChild(itemSpan);
              const nativeOpt = nativeSubSelect.querySelector(`option[value="${item.id}"]`);
              if (nativeOpt && nativeOpt.selected) {
                subDiv.classList.add("selected");
              }
              subDiv.addEventListener("click", function(e) {
                e.stopPropagation();
                const nativeOpt = nativeSubSelect.querySelector(`option[value="${item.id}"]`);
                if (subDiv.classList.contains("selected")) {
                  subDiv.classList.remove("selected");
                  if (nativeOpt) nativeOpt.selected = false;
                } else {
                  subDiv.classList.add("selected");
                  if (nativeOpt) nativeOpt.selected = true;
                }
                const opts = subWrapper.querySelectorAll(".custom-option.service-option");
                let allS = true;
                opts.forEach(opt => { if (!opt.classList.contains("selected")) allS = false; });
                if (allS) { selectAllDiv.classList.add("selected"); }
                else { selectAllDiv.classList.remove("selected"); }
                updateMultiSelectText();
              });
              subWrapper.appendChild(subDiv);
            });
            let allServicesSelected = true;
            group.subcategories.forEach(sub => {
              const nativeOpt = nativeSubSelect.querySelector(`option[value="${sub.id}"]`);
              if (!(nativeOpt && nativeOpt.selected)) {
                allServicesSelected = false;
              }
            });
            if (allServicesSelected) {
              selectAllDiv.classList.add("selected");
            } else {
              selectAllDiv.classList.remove("selected");
            }
            mainDiv.insertAdjacentElement("afterend", subWrapper);
          }
          updateMultiSelectText();
        });
        customOptionsContainer.appendChild(mainDiv);
      });
      
      dropdownToggle.addEventListener("click", function(e) {
        e.stopPropagation();
        const sectionContent = container.closest(".section-content");
        if (sectionContent) {
          sectionContent.querySelectorAll(".custom-options").forEach(optList => {
            if(optList !== customOptionsContainer) {
              optList.classList.remove("show-options");
            }
          });
          sectionContent.querySelectorAll(".dropdown-icon").forEach(icon => {
            if(icon !== dropdownIcon) {
              icon.classList.remove("rotate");
            }
          });
        }
        customOptionsContainer.classList.toggle("show-options");
        dropdownIcon.classList.toggle("rotate");
        if (!customOptionsContainer.classList.contains("show-options")) {
          container.querySelectorAll(".custom-option.category-option.expanded").forEach(opt => {
            opt.classList.remove("expanded");
            if (opt.nextElementSibling && opt.nextElementSibling.classList.contains("sub-options")) {
              opt.nextElementSibling.remove();
            }
            const arrow = opt.querySelector(".arrow-icon");
            if (arrow) arrow.classList.remove("rotate");
          });
        }
      });
      
      // When clicking anywhere outside any select-wrapper, close the open dropdown.
      document.addEventListener("click", function(e) {
        // If the click is not inside any .select-wrapper in this container, close the dropdown.
        if (!e.target.closest(".select-wrapper")) {
          customOptionsContainer.classList.remove("show-options");
          dropdownIcon.classList.remove("rotate");
          container.querySelectorAll(".sub-options").forEach(sw => sw.remove());
        }
      });
      
      function updateMultiSelectText() {
  const selectedOpts = Array.from(nativeSubSelect.options).filter(opt => opt.selected && opt.value !== "");
  if (selectedOpts.length === 0) {
    selectedText.textContent = dropdownToggle.getAttribute("data-placeholder");
    dropdownToggle.classList.add("placeholder"); // Add the placeholder class
  } else if (selectedOpts.length === 1) {
    selectedText.textContent = selectedOpts[0].text;
    dropdownToggle.classList.remove("placeholder"); // Remove the placeholder class
  } else {
    selectedText.textContent = selectedOpts.length + " selected";
    dropdownToggle.classList.remove("placeholder"); // Remove the placeholder class
  }
}
updateMultiSelectText();
    }
    
    function buildFlatMultiSelectDropdown(container, nativeSelect, customOptionsContainer, dropdownToggle, dropdownIcon, selectedText, options, selectLabelAll) {
  // Clear previous options
  nativeSelect.innerHTML = "";
  customOptionsContainer.innerHTML = "";
  
  // "Select All" option
  const selectAllDiv = document.createElement("div");
  selectAllDiv.className = "custom-option select-all-option";
  selectAllDiv.dataset.value = "select_all";
  const allCheckbox = document.createElement("div");
  allCheckbox.className = "option-checkbox";
  allCheckbox.innerHTML = SVG_CHECK;
  const allSpan = document.createElement("span");
  allSpan.textContent = selectLabelAll;
  selectAllDiv.appendChild(allCheckbox);
  selectAllDiv.appendChild(allSpan);
  selectAllDiv.addEventListener("click", function(e) {
    e.stopPropagation();
    const allOptions = customOptionsContainer.querySelectorAll(".custom-option:not(.select-all-option)");
    let allSelected = true;
    allOptions.forEach(opt => { 
      if (!opt.classList.contains("selected")) { 
        allSelected = false; 
      } 
    });
    
    allOptions.forEach(opt => {
      const nativeOpt = nativeSelect.querySelector(`option[value="${opt.dataset.value}"]`);
      if (allSelected) {
        opt.classList.remove("selected");
        if (nativeOpt) nativeOpt.selected = false;
      } else {
        opt.classList.add("selected");
        if (nativeOpt) nativeOpt.selected = true;
      }
    });
    
    if (allSelected) { 
      selectAllDiv.classList.remove("selected"); 
    } else { 
      selectAllDiv.classList.add("selected"); 
    }
    
    updateFlatMultiSelectText();
  });
  customOptionsContainer.appendChild(selectAllDiv);
  
  // Individual options
  options.forEach(item => {
    nativeSelect.appendChild(new Option(item.text, item.value));
    const optionDiv = document.createElement("div");
    optionDiv.className = "custom-option";
    optionDiv.dataset.value = item.value;
    const checkboxDiv = document.createElement("div");
    checkboxDiv.className = "option-checkbox";
    checkboxDiv.innerHTML = SVG_CHECK;
    const itemSpan = document.createElement("span");
    itemSpan.textContent = item.text;
    optionDiv.appendChild(checkboxDiv);
    optionDiv.appendChild(itemSpan);
    
    optionDiv.addEventListener("click", function(e) {
      e.stopPropagation();
      const nativeOpt = nativeSelect.querySelector(`option[value="${item.value}"]`);
      if (optionDiv.classList.contains("selected")) {
        optionDiv.classList.remove("selected");
        if (nativeOpt) nativeOpt.selected = false;
      } else {
        optionDiv.classList.add("selected");
        if (nativeOpt) nativeOpt.selected = true;
      }
      
      // Check if all options are selected
      const allOptionsSelected = Array.from(customOptionsContainer.querySelectorAll(".custom-option:not(.select-all-option)"))
        .every(opt => opt.classList.contains("selected"));
        
      if (allOptionsSelected) {
        selectAllDiv.classList.add("selected");
      } else {
        selectAllDiv.classList.remove("selected");
      }
      
      updateFlatMultiSelectText();
    });
    
    customOptionsContainer.appendChild(optionDiv);
  });
  
  // Click handler for dropdown toggle
  dropdownToggle.addEventListener("click", function(e) {
    e.stopPropagation();
    const sectionContent = container.closest(".section-content");
    if (sectionContent) {
      sectionContent.querySelectorAll(".custom-options").forEach(optList => {
        if(optList !== customOptionsContainer) {
          optList.classList.remove("show-options");
        }
      });
      sectionContent.querySelectorAll(".dropdown-icon").forEach(icon => {
        if(icon !== dropdownIcon) {
          icon.classList.remove("rotate");
        }
      });
    }
    customOptionsContainer.classList.toggle("show-options");
    dropdownIcon.classList.toggle("rotate");
  });
  
  // Global click handler to close dropdown
  document.addEventListener("click", function(e) {
    if (!e.target.closest(".select-wrapper")) {
      customOptionsContainer.classList.remove("show-options");
      dropdownIcon.classList.remove("rotate");
    }
  });
  
  // Update the display text
  function updateFlatMultiSelectText() {
    const selectedOpts = Array.from(nativeSelect.options).filter(opt => opt.selected && opt.value !== "");
    if (selectedOpts.length === 0) {
      selectedText.textContent = dropdownToggle.getAttribute("data-placeholder");
      dropdownToggle.classList.add("placeholder");
    } else if (selectedOpts.length === 1) {
      selectedText.textContent = selectedOpts[0].text;
      dropdownToggle.classList.remove("placeholder");
    } else {
      selectedText.textContent = selectedOpts.length + " selected";
      dropdownToggle.classList.remove("placeholder");
    }
  }
  
  updateFlatMultiSelectText();
}
    
    /**********************************************************************
     * Single-Select Dropdown Helper
     **********************************************************************/
    function initializeSingleSelectDropdown(dropdownId, placeholderText, optionsData, onSelect, parent) {
      const container = parent.querySelector(`#${dropdownId}`);
      const selectDisplay = container.querySelector('.select-display');
      const customOptions = container.querySelector('.custom-options');
      const dropdownIcon = container.querySelector('.dropdown-icon');
      const nativeSelect = container.querySelector('select');
      nativeSelect.innerHTML = `<option value="" disabled selected>${placeholderText}</option>`;
      selectDisplay.querySelector('span').textContent = placeholderText;
      customOptions.innerHTML = "";
      optionsData.forEach(item => {
        const optionEl = document.createElement('div');
        optionEl.className = 'custom-option';
        optionEl.dataset.value = item.value;
        optionEl.innerHTML = `<div class="option-checkbox">${SVG_CHECK}</div><span>${item.text}</span>`;
        customOptions.appendChild(optionEl);
        nativeSelect.appendChild(new Option(item.text, item.value));
        optionEl.addEventListener("click", function(e) {
          e.stopPropagation();
          const sectionContent = container.closest(".section-content");
          if (sectionContent) {
            sectionContent.querySelectorAll(".custom-options").forEach(optList => {
              if (optList !== customOptions) {
                optList.classList.remove("show-options");
              }
            });
            sectionContent.querySelectorAll(".dropdown-icon").forEach(icon => {
              if (icon !== dropdownIcon) {
                icon.classList.remove("rotate");
              }
            });
          }
          customOptions.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
          optionEl.classList.add("selected");
          selectDisplay.querySelector("span").textContent = item.text;
          selectDisplay.classList.remove("placeholder");
          nativeSelect.value = item.value;
          customOptions.classList.remove("show-options");
          dropdownIcon.classList.remove("rotate");
          if (onSelect) onSelect(item);
          const errorEl = container.parentNode.querySelector(".error-message");
          if (errorEl) errorEl.style.display = "none";
        });
      });
      selectDisplay.addEventListener("click", function(e) {
        e.stopPropagation();
        const sectionContent = container.closest(".section-content");
        if (sectionContent) {
          sectionContent.querySelectorAll(".custom-options").forEach(optList => {
            if (optList !== customOptions) {
              optList.classList.remove("show-options");
            }
          });
          sectionContent.querySelectorAll(".dropdown-icon").forEach(icon => {
            if (icon !== dropdownIcon) {
              icon.classList.remove("rotate");
            }
          });
        }
        const isOpen = customOptions.classList.contains("show-options");
        if (!isOpen) {
          customOptions.classList.add("show-options");
          dropdownIcon.classList.add("rotate");
        } else {
          customOptions.classList.remove("show-options");
          dropdownIcon.classList.remove("rotate");
        }
      });
      parent.addEventListener("click", function(e) {
        if (!container.contains(e.target)) {
          customOptions.classList.remove("show-options");
          dropdownIcon.classList.remove("rotate");
        }
      });
      selectDisplay.classList.add("placeholder");
    }
    
    /*************************************************************
     * 4) Section Toggle and Form Disable Functions (scoped to formContainer)
     *************************************************************/
    function toggleSection(formContainer, sectionId) {
      const section = formContainer.querySelector(`#${sectionId}`);
      if (!section) return;
      const parentSection = section.previousElementSibling;
      const icon = parentSection.querySelector('.collapse-icon');
      const wasExpanded = section.classList.contains('expanded');
      formContainer.querySelectorAll('.collapsible-section').forEach(sec => {
        if (sec.id !== sectionId) {
          sec.classList.remove('expanded');
          const card = sec.previousElementSibling;
          if (card) card.classList.remove('active');
          const icon = card ? card.querySelector('.collapse-icon') : null;
          if (icon) icon.classList.remove('active');
        }
      });
      if (!wasExpanded) {
        section.classList.add('expanded');
        parentSection.classList.add('active');
        if (icon) icon.classList.add('active');
      } else {
        section.classList.remove('expanded');
        parentSection.classList.remove('active');
        if (icon) icon.classList.remove('active');
      }
    }
    function disableAllFormElements(formContainer) {
      formContainer.querySelectorAll('.collapsible-section.expanded').forEach(sec => {
        sec.classList.remove('expanded');
        const card = sec.previousElementSibling;
        if (card) {
          card.classList.remove('active');
          const icon = card.querySelector('.collapse-icon');
          if (icon) icon.classList.remove('active');
        }
      }); 
      formContainer.querySelectorAll('.custom-options.show-options').forEach(opt => opt.classList.remove('show-options'));
      formContainer.querySelectorAll('.dropdown-icon.rotate').forEach(icon => icon.classList.remove('rotate'));
      formContainer.classList.add('disabled');
    }
    
   
        const garageCheckbox = formContainer.querySelector("#garage");
const garageCapacityGroup = formContainer.querySelector("#garageCapacityGroup");
garageCheckbox.addEventListener("change", function() {
  garageCapacityGroup.style.display = this.checked ? "block" : "none";
});
        
        /*************************************************************
         * 8) Initialize Single-Select Dropdowns for House Type and Garage Capacity
         *************************************************************/
const propertyTypeOptions = (isEnglish ? SharedPropertyTypes.en : SharedPropertyTypes.fr).map(type => ({
  value: type,
  text: type
}));

buildFlatMultiSelectDropdown(
  formContainer.querySelector("#houseTypeDropdown"),
  formContainer.querySelector("#houseTypeSubSelect"),
  formContainer.querySelector("#customOptionsHouseType"),
  formContainer.querySelector("#selectDisplayHouseType"),
  formContainer.querySelector("#dropdownIconHouseType"),
  formContainer.querySelector("#selectedTextHouseType"),
  propertyTypeOptions,
  isEnglish ? "Select All" : "Tout sélectionner"
);
       
        
       
        
        /*************************************************************
         * 9) Build Multi-Select Dropdown for Property Category
         *************************************************************/
        buildMultiSelectDropdown(
          formContainer.querySelector("#propertyCategorySelectContainer"),
          formContainer.querySelector("#propertyCategoryMainSelect"),
          formContainer.querySelector("#propertyCategorySubSelect"),
          formContainer.querySelector("#customOptionsPropertyCategory"),
          formContainer.querySelector("#selectDisplayPropertyCategory"),
          formContainer.querySelector("#dropdownIconPropertyCategory"),
          formContainer.querySelector("#selectDisplayPropertyCategory").querySelector("span"),
          [
            {
              id: "Residential",
              name: isEnglish ? "Residential" : "Résidentiel",
              subcategories: (isEnglish ? SharedPropertyCategories.Residential.en : SharedPropertyCategories.Residential.fr).map(item => ({ id: item, name: item }))
            },
            {
              id: "Plex",
              name: "Plex",
              subcategories: (isEnglish ? SharedPropertyCategories.Plex.en : SharedPropertyCategories.Plex.fr).map(item => ({ id: item, name: item }))
            }
          ],
          isEnglish ? "Select All" : "Tout sélectionner"
        );
        
        /*************************************************************
         * 10) Build Multi-Select Dropdown for City Selection
         *************************************************************/
        const cityData = Object.keys(SharedCities).map(region => ({
          id: region,
          name: isEnglish ? CityMappings.en[region] : CityMappings.fr[region],
          subcategories: SharedCities[region].map(cityName => ({ id: cityName, name: cityName }))
        }));
        buildMultiSelectDropdown(
          formContainer.querySelector("#citySelectContainer"),
          formContainer.querySelector("#cityMainSelect"),
          formContainer.querySelector("#citySubSelect"),
          formContainer.querySelector("#customOptionsCity"),
          formContainer.querySelector("#dropdownToggleCity"),
          formContainer.querySelector("#dropdownIconCity"),
          formContainer.querySelector("#selectedTextCity"),
          cityData,
          isEnglish ? "Select All" : "Tout sélectionner"
        );
        
        /*************************************************************
         * 11) Initialize Single-Select Dropdowns for Property Specifications
         *************************************************************/
        
        
        
        /*************************************************************
         * 12) Global Click Listener for Closing Open Dropdowns
         * If user clicks anywhere that is not inside a ".select-wrapper",
         * all open dropdowns are closed.
         *************************************************************/
        document.addEventListener("click", function(e) {
          if (!e.target.closest(".select-wrapper")) {
            formContainer.querySelectorAll(".custom-options.show-options").forEach(opt => opt.classList.remove("show-options"));
            formContainer.querySelectorAll(".dropdown-icon.rotate").forEach(icon => icon.classList.remove("rotate"));
            formContainer.querySelectorAll(".sub-options").forEach(sw => sw.remove());
          }
        });
        
        /*************************************************************
         * 13) Form Submission: Gather Selected Filters (all are optional)
         *************************************************************/
// Replace the submit button handler with this improved version
formContainer.querySelector("#submit-button").addEventListener("click", function() {
          // Get form values
          const citySelected = Array.from(formContainer.querySelector("#citySubSelect").options)
                                  .filter(opt => opt.selected && opt.value !== "")
                                  .map(opt => opt.text);
          const propertyCategorySelected = Array.from(formContainer.querySelector("#propertyCategorySubSelect").options)
                                      .filter(opt => opt.selected && opt.value !== "")
                                      .map(opt => opt.text);
          const houseType = Array.from(formContainer.querySelector("#houseTypeSubSelect").options)
            .filter(opt => opt.selected && opt.value !== "")
            .map(opt => opt.text);
          
          const roomsInput = formContainer.querySelector("#roomsInput");
          const bedroomsInput = formContainer.querySelector("#bedroomsInput");
          const bathroomsInput = formContainer.querySelector("#bathroomsInput");
          
          const priceMin = formContainer.querySelector("#price-min").value;
          const priceMax = formContainer.querySelector("#price-max").value;
          
          const garage = formContainer.querySelector("#garage").checked;
          const garageCapacity = formContainer.querySelector("#garageCapacityInput").value;
          const swimmingPool = formContainer.querySelector("#swimming-pool").checked;
          
          // Format data for the formula generator
          const formulaInput = {
            cityName: citySelected,
            category: propertyCategorySelected,
            houseType: houseType,
            rooms: roomsInput ? parseInt(roomsInput.value) || 0 : 0,
            bedrooms: bedroomsInput ? parseInt(bedroomsInput.value) || 0 : 0,
            bathrooms: bathroomsInput ? parseInt(bathroomsInput.value) || 0 : 0,
            priceMin: priceMin ? parseInt(priceMin) : 0,
            priceMax: priceMax ? parseInt(priceMax) : 0,
            parkingIndoor: garage ? "Yes" : "No",
            car: garage ? (parseInt(garageCapacity) || 0) : 0,
            swimmingPool: swimmingPool ? "Yes" : "No"
          };
          
          // Generate the Airtable formula
          const airtableFormula = generateAirtableFormula(formulaInput);
          
          // Log to console for debugging
          console.log("Property search form submitted!");
          console.log("Form input:", formulaInput);
          console.log("Generated Airtable Formula:", airtableFormula);
          
          // Disable further form interactions
          const submitButton = formContainer.querySelector("#submit-button");
          submitButton.disabled = true;
          submitButton.textContent = isEnglish ? "Search Submitted!" : "Recherche soumise!";
          submitButton.style.backgroundColor = "#4CAF50";
          submitButton.style.color = "white";
          
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
          
          // Disable all form elements
          disableAllFormElements(formContainer);
          
          // Send data to Voiceflow
          window.voiceflow.chat.interact({
            type: "complete",
            payload: { formula: airtableFormula },
          });
        });
      }
    };
   
/************** EXTENSION #2: ImageExtension **************/
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

/************** EXTENSION #3: LocalisationExtension **************/
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
        const containerWidth = window.innerWidth <= 768 ? "400px" : "800px";

        container.style.cssText = `
          width: ${containerWidth};
          height: 350px;
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

/************** EXTENSION #4: MortgageCalculatorExtension **************/
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
      font-size: 15px;
      margin-bottom: 8px;
      display: block;
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
              font-size: 14px;
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
              font-size: 14px;
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
              font-size: 14px;
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
.input-group {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 8px;
  min-width: 200px;
  width: 100%;
  max-width: 100%;
  border: 1px solid #ddd;
  height: 40px;
  overflow: hidden;
}

.input-group:focus-within {
  border: 2px solid #9C27B0;
  outline: none;
}

.input-group button,
.input-group input {
  outline: none;
  border: none;
  padding: 16px;
}

.input-group input {
  width: 100%;
  text-align: center;
}

.input-group button {
  cursor: pointer;
  background-color: #F8EAFA;
  border: none;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-group button:hover {
  background-color: #9C27B0;
}

.input-group button:hover svg path {
  fill: #fff !important;
}
.currency-symbol {
  display: none;
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
    <div class="input-group">
      <button type="button" id="decrement-property-cost">
  ${SVG_Minus}
</button>
      <input type="text" id="property-cost" class="currency-input" required
             placeholder="Enter property value"
             value="${formatNumber(propertyCost)}">
      <button type="button" id="increment-property-cost">
  ${SVG_Plus}
</button>
    </div>
  </div>
  <div class="form-column">
    <label for="down-payment" class="bold-label">
      ${text().downPayment}
    </label>
    <div class="input-group">
     <button type="button" id="decrement-down-payment">
  ${SVG_Minus}
</button>
      <input type="text" id="down-payment" class="currency-input" required
             placeholder="Enter down payment"
             value="${formatNumber(propertyCost * 0.05)}">
      <button type="button" id="increment-down-payment">
  ${SVG_Plus}
</button>
    </div>
    <div id="error-message" style="display: none;"></div>
  </div>
</div>

<div class="form-row">
  <div class="form-column">
    <label for="interest-rate" class="bold-label">
      ${text().interestRate}
    </label>
    <div class="input-group">
      <button type="button" id="decrement-interest-rate">
  ${SVG_Minus}
</button>
      <input type="number" id="interest-rate" class="currency-input" required
             placeholder="Enter interest rate"
             min="1" max="100" step="0.05" value="7.9">
     <button type="button" id="increment-interest-rate">
  ${SVG_Plus}
</button>
    </div>
  </div>
  <div class="form-column">
    <label class="bold-label" for="amortization" id="amortization-label">
      ${text().amortizationPeriod}
    </label>
    <div class="input-group">
     <button type="button" id="decrement-amortization">
  ${SVG_Minus}
</button>
      <input type="text" id="amortization" class="currency-input" value="25 ${text().years}" readonly>
      <button type="button" id="increment-amortization">
  ${SVG_Plus}
</button>
    </div>
  </div>
</div>

<!-- Payment Frequency -->
<div class="form-row">
  <div class="form-column">
  <label class="bold-label" for="frequency" id="frequency-label">
    ${text().paymentFrequency}
  </label>
  <div class="input-group">
    <button type="button" id="decrement-frequency">
  ${SVG_Minus}
</button>
    <input type="text" id="frequency" class="currency-input" value="${text().weekly}" 
       data-value="weekly" 
       
   data-weekly="${text().weekly}"
   data-biweekly="${text().biweekly}"
   data-monthly="${text().monthly}"
       readonly> 
    <button type="button" id="increment-frequency">
  ${SVG_Plus}
</button>
  </div>
</div>
  <div class="form-column">
    <label class="bold-label" for="loan-amount">
      ${text().loanAmount}
    </label>
    <div class="input-group">
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
        // This function is called by the increment buttons
// Add these functions and event listeners after element.appendChild(formContainer);

// Form-scoped increment/decrement functions
function decrementFormValue(id, step) {
  const input = formContainer.querySelector(`#${id}`);
  if (!input) return;
  
  let currentValue;
  
  // Special handling for different input types
  if (id === 'interest-rate') {
    currentValue = parseFloat(input.value) || 0;
    let newValue = Math.max(0, currentValue - step);
    input.value = newValue.toFixed(2);
  } else if (id === 'frequency') {
    const freqs = ['weekly','biweekly','monthly'];
  const idx   = freqs.indexOf(input.dataset.value);
  if (idx > 0) {
    const prev = freqs[idx - 1];
    input.dataset.value = prev;
    input.value          = input.dataset[prev];
    input.dispatchEvent(new Event('input'));
  }
  } else if (id === 'amortization') {
    const allowedYears = [5, 10, 15, 20, 25, 30];
    // Extract just the numeric part
    const currentYear = parseInt(input.value) || 25;
    let idx = allowedYears.indexOf(currentYear);
    
    // Decrement: move to previous index or stay at min
    idx = (idx <= 0) ? 0 : idx - 1;
    
    // Keep the years text from the original value
    const yearsText = input.value.replace(/[0-9\s]+/g, '').trim();
    input.value = allowedYears[idx] + " " + yearsText;
  } else {
    // Standard number inputs (property cost, down payment)
    currentValue = parseNumber(input.value) || 0;
    let newValue = Math.max(0, currentValue - step);
    input.value = formatNumber(newValue);
  }
  
  // Trigger calculation update
  input.dispatchEvent(new Event('input'));
}

function incrementFormValue(id, step) {
  const input = formContainer.querySelector(`#${id}`);
  if (!input) return;
  
  let currentValue;
  
  // Special handling for different input types
  if (id === 'interest-rate') {
    currentValue = parseFloat(input.value) || 0;
    let newValue = currentValue + step;
    input.value = newValue.toFixed(2);
  } else if (id === 'frequency') {
    const freqs = ['weekly','biweekly','monthly'];
  const idx   = freqs.indexOf(input.dataset.value);
  if (idx < freqs.length - 1) {
    const next = freqs[idx + 1];
    input.dataset.value = next;
    input.value          = input.dataset[next];
    input.dispatchEvent(new Event('input'));
  }
  } else if (id === 'amortization') {
    const allowedYears = [5, 10, 15, 20, 25, 30];
    // Extract just the numeric part
    const currentYear = parseInt(input.value) || 25;
    let idx = allowedYears.indexOf(currentYear);
    
    // Increment: move to next index or stay at max
    idx = (idx >= allowedYears.length - 1) ? allowedYears.length - 1 : idx + 1;
    
    // Keep the years text from the original value
    const yearsText = input.value.replace(/[0-9\s]+/g, '').trim();
    input.value = allowedYears[idx] + " " + yearsText;
  } else {
    // Standard number inputs
    currentValue = parseNumber(input.value) || 0;
    let newValue = currentValue + step;
    input.value = formatNumber(newValue);
  }
  
  // Trigger calculation update
  input.dispatchEvent(new Event('input'));
}

// Attach event handlers to all buttons
// In MortgageCalculatorExtension, replace the event handlers with:

// Attach event handlers to all buttons
formContainer.querySelector('#decrement-property-cost').addEventListener('click', function() {
  decrementFormValue('property-cost', 500);
});

formContainer.querySelector('#increment-property-cost').addEventListener('click', function() {
  incrementFormValue('property-cost', 500);
});

formContainer.querySelector('#decrement-down-payment').addEventListener('click', function() {
  decrementFormValue('down-payment', 250);
});

formContainer.querySelector('#increment-down-payment').addEventListener('click', function() {
  incrementFormValue('down-payment', 250);
});

formContainer.querySelector('#decrement-interest-rate').addEventListener('click', function() {
  decrementFormValue('interest-rate', 0.05);
});

formContainer.querySelector('#increment-interest-rate').addEventListener('click', function() {
  incrementFormValue('interest-rate', 0.05);
});

formContainer.querySelector('#decrement-amortization').addEventListener('click', function() {
  decrementFormValue('amortization', 1);
});

formContainer.querySelector('#increment-amortization').addEventListener('click', function() {
  incrementFormValue('amortization', 1);
});

formContainer.querySelector('#decrement-frequency').addEventListener('click', function() {
  decrementFormValue('frequency', 1);
});

formContainer.querySelector('#increment-frequency').addEventListener('click', function() {
  incrementFormValue('frequency', 1);
});
    
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
            formContainer.querySelector("#frequency").dataset.value || "biweekly"

          );
    
          loanAmountInput.value = formatNumber(result.loanAmount);
          paymentResult.textContent = `${formatNumber(Math.round(result.payment))} ${result.suffix || ''}`;
        }
    

    
        // Attach numeric controls and update initial calculations.
        updateCalculation();
      }
    };
           
/************** EXTENSION #5: BorrowingCalculatorExtension **************/
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
      font-size: 15px;
      margin-bottom: 8px;
      display: block;
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
            }
            .results-row .result {
              flex: 1;
              background-color: #F8EAFA;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
              display: block;
            }
            
            .input-group {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 8px;
  min-width: 200px;
  width: 100%;
  max-width: 100%;
  border: 1px solid #ddd;
  height: 40px;
  overflow: hidden;
}

.input-group:focus-within {
  border: 2px solid #9C27B0;
  outline: none;
}

.input-group button,
.input-group input {
  outline: none;
  border: none;
  padding: 16px;
}

.input-group input {
  width: 100%;
  text-align: center;
}

.input-group button {
  cursor: pointer;
  background-color: #F8EAFA;
  border: none;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-group button:hover {
  background-color: #9C27B0;
}

.input-group button:hover svg path {
  fill: #fff !important;
}
          </style>

          <div class="form-row">
  <div class="form-column">
    <label for="annual-income" class="bold-label">
      ${text().annualIncome}
    </label>
    <div class="input-group">
     <button type="button" id="decrement-annual-income">
  ${SVG_Minus}
</button>
      <input type="text" id="annual-income" class="currency-input" required
             placeholder="Enter your annual income"
             value="${formatNumber(75000)}">
      <button type="button" id="increment-annual-income">
  ${SVG_Plus}
</button>
    </div>
  </div>
  <div class="form-column">
    <label for="monthly-expenses" class="bold-label">
      ${text().monthlyExpenses}
    </label>
    <div class="input-group">
     <button type="button" id="decrement-monthly-expenses">
  ${SVG_Minus}
</button>
      <input type="text" id="monthly-expenses" class="currency-input" required
             placeholder="Enter monthly expenses"
             value="${formatNumber(3000)}">
      <button type="button" id="increment-monthly-expenses">
  ${SVG_Plus}
</button>
    </div>
  </div>
</div>

<div class="form-row">
  <div class="form-column">
    <label for="down-payment" class="bold-label">
      ${text().downPayment}
    </label>
    <div class="input-group">
      <button type="button" id="decrement-down-payment">
  ${SVG_Minus}
</button>
      <input type="text" id="down-payment" class="currency-input" required
             placeholder="Enter down payment"
             value="${formatNumber(25000)}">
      <button type="button" id="increment-down-payment">
  ${SVG_Plus}
</button>
    </div>
  </div>
  <div class="form-column">
    <label for="interest-rate" class="bold-label">
      ${text().interestRate}
    </label>
    <div class="input-group">
      <button type="button" id="decrement-interest-rate">
  ${SVG_Minus}
</button>
      <input type="number" id="interest-rate" class="currency-input" required
             placeholder="Enter interest rate"
             min="1" max="100" step="0.05" value="5.9">
      <button type="button" id="increment-interest-rate">
  ${SVG_Plus}
</button>
    </div>
  </div>
</div>

<!-- Mortgage Term & Payment Frequency -->
<div class="form-row">
  <div class="form-column">
    <label class="bold-label" for="mortgage-term">
      ${text().mortgageTerm}
    </label>
    <div class="input-group">
     <button type="button" id="decrement-mortgage-term">
  ${SVG_Minus}
</button>
      <input type="text" id="mortgage-term" class="currency-input" value="25 years" readonly>

      
     
      
     <button type="button" id="increment-mortgage-term">
  ${SVG_Plus}
</button>
    </div>
  </div>
  <div class="form-column">
  <label class="bold-label" for="payment-frequency">
    ${text().paymentFrequency}
  </label>
  <div class="input-group">
    <button type="button" id="decrement-payment-frequency">
  ${SVG_Minus}
</button>
    <input type="text" id="payment-frequency" class="currency-input" value="${text().weekly}" 
   data-value="weekly" 
   data-weekly="${text().weekly}"
   data-biweekly="${text().biweekly}"
   data-monthly="${text().monthly}"
   readonly>
    <button type="button" id="increment-payment-frequency">
  ${SVG_Plus}
</button>
  </div>
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
        // This function is called by the increment buttons

// Add these functions and event listeners after element.appendChild(formContainer);

// Form-scoped increment/decrement functions
function decrementFormValue(id, step) {
  const input = formContainer.querySelector(`#${id}`);
  if (!input) return;
  
  let currentValue;
  
  // Special handling for different input types
  if (id === 'interest-rate') {
 currentValue = parseFloat(input.value) || 0;
    let newValue = Math.max(0, currentValue - step);
    input.value = newValue.toFixed(2);
}
 else if (id === 'payment-frequency') {
  const freqs = ['weekly','biweekly','monthly'];
  const idx   = freqs.indexOf(input.dataset.value);
  if (idx > 0) {
    const prev = freqs[idx - 1]; 
    input.dataset.value = prev;
    input.value          = input.dataset[prev];
    input.dispatchEvent(new Event('input'));
  }
}
 else if (id === 'mortgage-term') {
    const allowedYears = [5, 10, 15, 20, 25, 30];
    // Extract just the numeric part
    const currentYear = parseInt(input.value) || 25;
    let idx = allowedYears.indexOf(currentYear);
    
    // Decrement: move to previous index or stay at min
    idx = (idx <= 0) ? 0 : idx - 1;
    
    // Keep the years text from the original value
    const yearsText = input.value.replace(/[0-9\s]+/g, '').trim();
    input.value = allowedYears[idx] + " " + yearsText;
  } else {
    // Standard number inputs (property cost, down payment)
    currentValue = parseNumber(input.value) || 0;
    let newValue = Math.max(0, currentValue - step);
    input.value = formatNumber(newValue);
  }
  
  // Trigger calculation update
  input.dispatchEvent(new Event('input'));
}

function incrementFormValue(id, step) {
  const input = formContainer.querySelector(`#${id}`);
  if (!input) return;
  
  let currentValue;
  
  // Special handling for different input types
  if (id === 'interest-rate') {
  currentValue = parseFloat(input.value) || 0;
    let newValue = currentValue + step;
    input.value = newValue.toFixed(2);
}

  else if (id === 'payment-frequency') {
  const freqs = ['weekly','biweekly','monthly'];
  const idx   = freqs.indexOf(input.dataset.value);
  if (idx < freqs.length - 1) {
    const next = freqs[idx + 1];
    input.dataset.value = next;
    input.value          = input.dataset[next];
    input.dispatchEvent(new Event('input'));
  }
}
else if (id === 'mortgage-term') {
    const allowedYears = [5, 10, 15, 20, 25, 30];
    // Extract just the numeric part
    const currentYear = parseInt(input.value) || 25;
    let idx = allowedYears.indexOf(currentYear);
    
    // Increment: move to next index or stay at max
    idx = (idx >= allowedYears.length - 1) ? allowedYears.length - 1 : idx + 1;
    
    // Keep the years text from the original value
    const yearsText = input.value.replace(/[0-9\s]+/g, '').trim();
    input.value = allowedYears[idx] + " " + yearsText;
  } else {
    // Standard number inputs
    currentValue = parseNumber(input.value) || 0;
    let newValue = currentValue + step;
    input.value = formatNumber(newValue);
  }
  
  // Trigger calculation update
  input.dispatchEvent(new Event('input'));
}

// Attach event handlers to all buttons
formContainer.querySelector('#decrement-annual-income').addEventListener('click', function() {
  decrementFormValue('annual-income', 1000);
});

formContainer.querySelector('#increment-annual-income').addEventListener('click', function() {
  incrementFormValue('annual-income', 1000);
});

formContainer.querySelector('#decrement-monthly-expenses').addEventListener('click', function() {
  decrementFormValue('monthly-expenses', 250);
});

formContainer.querySelector('#increment-monthly-expenses').addEventListener('click', function() {
  incrementFormValue('monthly-expenses', 250);
});

formContainer.querySelector('#decrement-down-payment').addEventListener('click', function() {
  decrementFormValue('down-payment', 1000);
});

formContainer.querySelector('#increment-down-payment').addEventListener('click', function() {
  incrementFormValue('down-payment', 1000);
});

formContainer.querySelector('#decrement-interest-rate').addEventListener('click', function() {
  decrementFormValue('interest-rate', 0.05);
});

formContainer.querySelector('#increment-interest-rate').addEventListener('click', function() {
  incrementFormValue('interest-rate', 0.05);
});

formContainer.querySelector('#decrement-mortgage-term').addEventListener('click', function() {
  decrementFormValue('mortgage-term', 1);
});

formContainer.querySelector('#increment-mortgage-term').addEventListener('click', function() {
  incrementFormValue('mortgage-term', 1);
});

formContainer.querySelector('#decrement-payment-frequency').addEventListener('click', function() {
  decrementFormValue('payment-frequency', 1);
});

formContainer.querySelector('#increment-payment-frequency').addEventListener('click', function() {
  incrementFormValue('payment-frequency', 1);
});
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
          const frequency = formContainer.querySelector('#payment-frequency').dataset.value || 'weekly';

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

        // Setup Payment Frequency
        

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

/************** EXTENSION #6: CombinedCalculatorsExtension **************/
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

/************** EXTENSION #7: SellPropertyFormExtension **************/
    const SellPropertyFormExtension = {
      name: "ContactForm",
      type: "response",
      match: ({ trace }) => trace.type === 'ext_sell_property_form' || trace.payload?.name === 'ext_sell_property_form',
      render: ({ trace, element }) => {
        const { language } = trace.payload || { language: 'FR' };
        const isEnglish = language === 'en';
		
        // Create the form container
        const formContainer = document.createElement("form");
        formContainer.setAttribute("novalidate", "true");
        formContainer.innerHTML = `
          <style>
    /* ========= Dropdown Components ========= */
    .main-container {
      display: block;
      transition: height 0.3s ease;
      border-radius: 6px;
      margin-bottom: 15px;
    }
    .select-wrapper {
      border: 1px solid #ddd;
      border-radius: 6px;
      background-color: #fff;
      position: relative;
      min-width: 300px;
      max-width: 600px;
      width: 100%;
      min-height: 50px;
    }
    .select-display {
      padding: 0 15px;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
				color: #444;
    }
    .dropdown-icon {
      width: 24px;
      height: 24px;
      transition: transform 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #F8EAFA;
      border-radius: 50%;
    }
    .dropdown-icon.rotate {
      transform: rotate(180deg);
    }
    /* Custom Options & Subselect */
    .custom-options {
      display: none;
	  font-size: 14px;
      border-top: 1px solid #ddd;
      max-height: 300px;
      overflow-y: auto;
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      z-index: 100;
      border-radius: 0 0 6px 6px;
    }
    .custom-options::-webkit-scrollbar {
      display: none; 
    }
    .custom-options {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .custom-option {
      padding: 12px 15px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: background 0.2s;
      position: relative;
    }
    .custom-option:hover {
      background-color: #F8EAFA;
      color: #9C27B0;
    }
    .custom-option.selected {
      background-color: #F8EAFA;
      color: #9C27B0;
      font-weight: bold;
    }
    .option-checkbox {
      width: 18px;
      height: 18px;
      border: 2px solid #ccc;
      border-radius: 50%;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      transition: all 0.2s;
    }
    .option-checkbox::after {
      content: "";
      color: #9C27B0;
      font-size: 12px;
      display: none;
    }
    .custom-option.selected .option-checkbox {
      border-color: #9C27B0;
      background-color: #9C27B0;
    }
    .custom-option.selected .option-checkbox::after {
      display: block;
      color: #fff;
    }
    .custom-option:not(.selected):hover .option-checkbox,
    .custom-option:not(.selected):hover .option-checkbox::after {
      border-color: #9C27B0;
      display: block;
      color: #9C27B0;
    }
    .custom-option.selected .option-checkbox svg path {
      fill: #fff !important;
    }
    .show-options {
      display: block;
    }
    .custom-option.selected .main-arrow,
    .custom-option:hover .main-arrow {
      background-color: #fff;
    }
    
    /* Subselect Container & Elements */
    .select-container {
      min-width: 300px;
      max-width: 600px;
      width: 100%;
      margin-bottom: 10px;
    }
    .sub-options {
      margin-left: 25px;
      border-left: 2px solid #9C27B0;
    }
    select {
      display: none;
    }
    .main-arrow {
      margin-left: auto;
    display: flex
    align-items: center;
    background-color: #F8EAFA;
    border-radius: 50%;
    transition: background-color 0.3s;
    width: 24px;
    height: 24px;
    justify-content: center;
    }
    .arrow-icon {
      transition: transform 0.3s ease;
    }
    .arrow-icon.rotate {
      transform: rotate(180deg);
    }
    
    /* ========= Error Components ========= */
    .error-container {
      width: 100%;
      margin: 2px 0;
      box-sizing: border-box;
    }
    .error-message {
      display: none;
      padding: 5px;
      border: 1px solid #e8e8e8;
      border-radius: 6px;
      background-color: #fff;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      font-size: 14px;
      align-items: center;
    }
    .error-icon {
      background-color: red;
      color: #fff;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 15px;
      flex-shrink: 0;
    }
    
    /* ========= Custom Checkbox Styles ========= */
    .checkbox-container {
      display: flex;
      align-items: center;
      margin: 8px 0;
    }
    /* Hide the native checkbox */
    .checkbox-container input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
    .checkbox-label {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }
    .custom-checkbox {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border: 2px solid #9C27B0;
      border-radius: 6px;
      background-color: #fff;
      margin-right: 8px;
      position: relative;
    }
    .check-icon {
      display: none;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #9C27B0;
      align-items: center;
      justify-content: center;
    }
    .checkbox-container input[type="checkbox"]:checked 
      + .checkbox-label 
      .custom-checkbox 
      .check-icon {
      display: flex;
    }
    .checkbox-text {
      font-weight: 600;
      color: #000;
      font-size: 14px;
    }
    
    /* ========= Form Inputs & Layout ========= */
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 16px;
      border-radius: 6px;
      background: #fff;
    }
    .flex-row {
      display: flex;
      gap: 10px 16px;
      flex-wrap: wrap;
    }
    .flex-row > div {
      flex: 1;
      min-width: 300px;
    }
    .bold-label {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 8px;
      display: block;
    }
    input[type="text"],
    input[type="email"],
    input[type="tel"],
    #details {
      width: 100%;
      min-width: 200px;
      max-width: 100%;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 6px;
      padding: 8px;
      background: #fff;
      font-size: 14px;
      outline: none;
      box-sizing: border-box;
      height: 50px;
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
      border: 2px solid #9C27B0;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
    
    /* ========= Buttons ========= */
    .appointment-btn,
    .submit {
      color: #9C27B0;
      background-color: #F8EAFA;
      border: none;
      padding: 12px;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 8px;
      transition: background-color 0.2s, color 0.2s, font-weight 0.2s;
      width: 100%;
    }
    .appointment-btn:hover,
    .submit:hover {
      color: #fff;
      background-color: #9C27B0;
      font-weight: 600;
    }
    .appointment-btn:disabled,
    .submit:disabled {
      background-color: #4CAF50;
      color: #fff;
      cursor: not-allowed;
      font-weight: 700;
    }
    
    /* ========= Sections & Tabs ========= */
    .section {
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 6px;
      margin-bottom: 10px;
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
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      border-radius: 6px;
    }
    .section.active {
      border: 2px solid #9C27B0;
      box-shadow: 0 3px 8px rgba(154,13,242,0.1);
    }
    .section:hover:not(.disabled) {
      border-color: #9C27B0;
      box-shadow: 0 3px 8px rgba(154,13,242,0.1);
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
      font-size: 16px;
      color: #444;
    }
    .collapse-icon {
      transition: transform 0.3s;
      background: #F8EAFA;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
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
    .tabs-container {
      margin-bottom: 15px;
      border-radius: 6px;
      overflow: hidden;
    }
    .tabs {
      display: flex;
      width: 100%;
    }
    .tab {
      flex: 1;
      padding: 10px 20px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      background-color: #f5f5f5;
      text-align: center;
      color: #333;
      border: none;
    }
    .tab.active {
      background-color: #9C27B0;
      color: #fff;
    }
    .tab:hover:not(.active) {
      background-color: #F8EAFA;
      color: #9C27B0;
    }
    .tab-content {
      display: none;
    }
    .tab-content.active {
      display: block;
    }
    .select-label {
      margin-bottom: 8px;
      font-weight: bold;
      color: #444;
    }
    
    /* ========= Disabled State ========= */
    .disabled {
      cursor: not-allowed !important;
    }
    
    
    .disabled * {
      pointer-events: none !important;
      cursor: not-allowed !important;
    }
    
    /* Miscellaneous adjustments */
    .custom-option:not(.selected):hover .option-checkbox svg path {
      fill: #9C27B0;
    }
  </style>
          <div class="flex-row">
            <!-- Section 1: Contact Details -->
            <div class="section">
              <div class="section-card" data-target="section-contact-details">
                <div class="section-info">
                  <div class="section-icon">${SVG_USER}</div>
                  <div class="section-title">${isEnglish ? "Your Contact Details" : "Vos coordonnées"}</div>
                </div>
                <div class="collapse-icon">${SVG_CHEVRON}</div>
              </div>
              <div class="collapsible-section" id="section-contact-details">
                <div class="section-content">
                  <div class="flex-row">
                    <div>
                      <label for="full-name" class="bold-label">${isEnglish ? 'Full Name' : 'Nom complet'}</label>
                      <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorFullName">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'Full Name is required.' : 'Le nom complet est obligatoire.'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="email" class="bold-label">Email</label>
                      <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorEmail">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'A valid email is required.' : "Une adresse email valide est obligatoire."}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="phone" class="bold-label">${isEnglish ? 'Phone Number' : 'Numéro de téléphone'}</label>
                      <input type="tel" id="phone" name="phone" placeholder="${isEnglish ? 'Enter your phone number' : 'Entrez votre numéro de téléphone'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorPhone">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'A valid phone number is required.' : "Un numéro de téléphone valide est obligatoire."}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Section 2: Agent Info -->
            <div class="section">
              <div class="section-card" data-target="section-agent-info">
                <div class="section-info">
                  <div class="section-icon">${SVG_USER_TIE}</div>
                  <div class="section-title">${isEnglish ? "Agent Info" : "Informations du vendeur"}</div>
                </div>
                <div class="collapse-icon">${SVG_CHEVRON}</div>
              </div>
              <div class="collapsible-section" id="section-agent-info">
                <div class="section-content">
                  <div class="main-container" id="agentDropdown">
                    <label class="bold-label">${isEnglish ? 'Select a Agent' : 'Sélectionnez un vendeur'}</label>
                    <select id="agentSelect" name="agentSelect" required style="display:none;"></select>
                    <div class="select-wrapper">
                      <div class="select-display" id="selectDisplayAgent">
                        <span>${isEnglish ? '-- Select a Agent --' : '-- Sélectionnez un vendeur --'}</span>
                        <div class="dropdown-icon" id="dropdownIconAgent">${SVG_CHEVRON}</div>
                      </div>
                      <div class="custom-options" id="customOptionsAgent"></div>
                    </div>
                    <div class="error-container">
                      <div class="error-message" id="errorAgent">
                        <div class="error-icon">!</div>
                        <span>${isEnglish ? 'You must select a agent.' : 'Vous devez sélectionner un vendeur.'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-row">
            <!-- Section 3: Property Type -->
            <div class="section">
              <div class="section-card" data-target="section-property-type">
                <div class="section-info">
                  <div class="section-icon">${SVG_HOUSE}</div>
                  <div class="section-title">${isEnglish ? "Property Type" : "Type de propriété"}</div>
                </div>
                <div class="collapse-icon">${SVG_CHEVRON}</div>
              </div>
              <div class="collapsible-section" id="section-property-type">
                <div class="section-content">
                  <div class="flex-row">
                    <!-- Multi‑Level Property Category Dropdown -->
                    <div class="main-container" id="propertyCategoryDropdown">
                      <label class="bold-label">${isEnglish ? 'Select Property Category' : 'Sélectionnez la catégorie de propriété'}</label>
                      <select id="propertyCategoryMainSelect" style="display:none;"></select>
                      <select id="propertyCategorySubSelect" style="display:none;"></select>
                      <div class="select-wrapper">
                        <div class="select-display" id="selectDisplayPropertyCategory">
                          <span>${isEnglish ? '-- Select Category --' : '-- Sélectionnez une catégorie --'}</span>
                          <div class="dropdown-icon" id="dropdownIconPropertyCategory">${SVG_CHEVRON}</div>
                        </div>
                        <div class="custom-options" id="customOptionsPropertyCategory"></div>
                      </div>
                      <div class="error-container">
                        <div class="error-message" id="errorPropertyCategory">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'You must select a property category.' : 'Vous devez sélectionner une catégorie de propriété.'}</span>
                        </div>
                      </div>
                    </div>
                    <!-- House Type Dropdown (single level) -->
                    <div class="main-container" id="houseTypeDropdown">
                      <label class="bold-label">${isEnglish ? 'Select House Type' : 'Sélectionnez le type de maison'}</label>
                      <select id="houseTypeSelect" name="houseTypeSelect" required style="display:none;"></select>
                      <div class="select-wrapper">
                        <div class="select-display" id="selectDisplayHouseType">
                          <span>${isEnglish ? '-- Select House Type --' : '-- Sélectionnez le type de maison --'}</span>
                          <div class="dropdown-icon" id="dropdownIconHouseType">${SVG_CHEVRON}</div>
                        </div>
                        <div class="custom-options" id="customOptionsHouseType"></div>
                      </div>
                      <div class="error-container">
                        <div class="error-message" id="errorHouseType">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'You must select a house type.' : 'Vous devez sélectionner un type de maison.'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Section 4: Property Location -->
            <div class="section">
              <div class="section-card" data-target="section-property-location">
                <div class="section-info">
                  <div class="section-icon">${SVG_ADDRESS}</div>
                  <div class="section-title">${isEnglish ? "Property Location" : "Localisation de la propriété"}</div>
                </div>
                <div class="collapse-icon">${SVG_CHEVRON}</div>
              </div>
              <div class="collapsible-section" id="section-property-location">
                <div class="section-content">
                  <div class="flex-row">
                    <div>
                      <label for="street-address" class="bold-label">${isEnglish ? 'Street Address' : 'Adresse'}</label>
                      <input type="text" id="street-address" name="street-address" placeholder="${isEnglish ? 'Enter street address' : 'Entrez l\'adresse'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorStreetAddress">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'Street address is required.' : 'L\'adresse est obligatoire.'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="city" class="bold-label">${isEnglish ? 'City' : 'Ville'}</label>
                      <input type="text" id="city" name="city" placeholder="${isEnglish ? 'Enter city' : 'Entrez la ville'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorCity">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'City is required.' : 'La ville est obligatoire.'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="postal-code" class="bold-label">${isEnglish ? 'Postal Code' : 'Code postal'}</label>
                      <input type="text" id="postal-code" name="postal-code" placeholder="${isEnglish ? 'Enter postal code' : 'Entrez le code postal'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorPostalCode">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'Postal code is required.' : 'Le code postal est obligatoire.'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-row">
            <!-- Section 5: Key Property Details -->
            <div class="section">
              <div class="section-card" data-target="section-property-details">
                <div class="section-info">
                  <div class="section-icon">${SVG_BUILDING_COLUMNS}</div>
                  <div class="section-title">${isEnglish ? "Key Property Details" : "Détails clés de la propriété"}</div>
                </div>
                <div class="collapse-icon">${SVG_CHEVRON}</div>
              </div>
              <div class="collapsible-section" id="section-property-details">
                <div class="section-content">
                  <div class="flex-row">
                    <div>
                      <label for="rooms" class="bold-label">${isEnglish ? 'Number of Rooms' : 'Nombre de pièces'}</label>
                      <input type="text" id="rooms" name="rooms" placeholder="${isEnglish ? 'Enter number of rooms' : 'Entrez le nombre de pièces'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorRooms">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'Number of rooms is required.' : 'Le nombre de pièces est obligatoire.'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="bedrooms" class="bold-label">${isEnglish ? 'Number of Bedrooms' : 'Nombre de chambres'}</label>
                      <input type="text" id="bedrooms" name="bedrooms" placeholder="${isEnglish ? 'Enter number of bedrooms' : 'Entrez le nombre de chambres'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorBedrooms">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'Number of bedrooms is required.' : 'Le nombre de chambres est obligatoire.'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="bathrooms" class="bold-label">${isEnglish ? 'Number of Bathrooms' : 'Nombre de salles de bain'}</label>
                      <input type="text" id="bathrooms" name="bathrooms" placeholder="${isEnglish ? 'Enter number of bathrooms' : 'Entrez le nombre de salles de bain'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorBathrooms">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'Number of bathrooms is required.' : 'Le nombre de salles de bain est obligatoire.'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="year-built" class="bold-label">${isEnglish ? 'Year Built' : 'Année de construction'}</label>
                      <input type="text" id="year-built" name="year-built" placeholder="${isEnglish ? 'Enter year built' : 'Entrez l\'année de construction'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorYearBuilt">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'Year built is required.' : 'L\'année de construction est obligatoire.'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="area" class="bold-label">${isEnglish ? 'Area (sq ft)' : 'Superficie (en pieds carrés)'}</label>
                      <input type="text" id="area" name="area" placeholder="${isEnglish ? 'Enter area in sq ft' : 'Entrez la superficie en pieds carrés'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorArea">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'Area is required.' : 'La superficie est obligatoire.'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Section 6: Additional Features -->
            <div class="section">
              <div class="section-card" data-target="section-additional-features">
                <div class="section-info">
                  <div class="section-icon">${SVG_SLIDER}</div>
                  <div class="section-title">${isEnglish ? "Additional Features" : "Caractéristiques supplémentaires"}</div>
                </div>
                <div class="collapse-icon">${SVG_CHEVRON}</div>
              </div>
              <div class="collapsible-section" id="section-additional-features">
                <div class="section-content">
                  <div class="flex-row">
                    <!-- Garage Checkbox -->
                    <div class="checkbox-container">
                      <input type="checkbox" id="garage" name="garage" />
                      <label for="garage" class="checkbox-label">
                        <span class="custom-checkbox">
                          <span class="check-icon">
                            ${SVG_CHECK}
                          </span>
                        </span>
                        <span class="checkbox-text">${isEnglish ? 'Garage?' : 'Garage ?'}</span>
                      </label>
                    </div>
                    <!-- Number of Cars (conditionally shown) -->
                    <div id="number-of-cars-container" style="display:none;">
                      <label for="number-of-cars" class="bold-label">
                        ${isEnglish ? 'Number of Cars' : 'Nombre de voitures'}
                      </label>
                      <input type="text" id="number-of-cars" name="number-of-cars" placeholder="${isEnglish ? 'Enter number of cars' : 'Entrez le nombre de voitures'}" />
                      <div class="error-container">
                        <div class="error-message" id="errorNumberOfCars">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'Number of cars is required when garage is selected.' : 'Le nombre de voitures est obligatoire si le garage est sélectionné.'}</span>
                        </div>
                      </div>
                    </div>
                    <!-- Outside Parking Checkbox -->
                    <div class="checkbox-container">
                      <input type="checkbox" id="outside-parking" name="outside-parking" />
                      <label for="outside-parking" class="checkbox-label">
                        <span class="custom-checkbox">
                          <span class="check-icon">
                            ${SVG_CHECK}
                          </span>
                        </span>
                        <span class="checkbox-text">${isEnglish ? 'Outside Parking?' : 'Parking extérieur ?'}</span>
                      </label>
                    </div>
                    <!-- Swimming Pool Checkbox -->
                    <div class="checkbox-container">
                      <input type="checkbox" id="swimming-pool" name="swimming-pool" />
                      <label for="swimming-pool" class="checkbox-label">
                        <span class="custom-checkbox">
                          <span class="check-icon">
                            ${SVG_CHECK}
                          </span>
                        </span>
                        <span class="checkbox-text">${isEnglish ? 'Swimming Pool?' : 'Piscine ?'}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-row">
            <!-- Section 7: Further Details -->
            <div class="section">
              <div class="section-card" data-target="section-further-details">
                <div class="section-info">
                  <div class="section-icon">${SVG_NOTE_STICK}</div>
                  <div class="section-title">${isEnglish ? "Further Details" : "Plus de détails"}</div>
                </div>
                <div class="collapse-icon">${SVG_CHEVRON}</div>
              </div>
              <div class="collapsible-section" id="section-further-details">
                <div class="section-content">
                  <div>
                    <label for="details" class="bold-label">${isEnglish ? 'Details' : 'Détails'}</label>
                    <textarea id="details" name="details" placeholder="${isEnglish ? 'Enter additional details' : 'Entrez des détails supplémentaires'}"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Submit Button -->
          <button type="button" class="submit" id="submit-button">
            ${isEnglish ? 'Submit' : 'Envoyer'}
          </button>
        `;
        element.appendChild(formContainer);
        
        /*************************************************************
         * 6) Section Toggle Setup
         *************************************************************/
        formContainer.querySelectorAll('.section-card').forEach(card => {
          const targetId = card.getAttribute("data-target");
          card.addEventListener("click", function(e) {
            e.stopPropagation();
            toggleSection(formContainer, targetId);
          });
        });
        
        /*************************************************************
         * 7) Additional Features: Garage Conditional Display
         *************************************************************/
         
         // Modified to accept a parent element (usually the formContainer)
    function initializeCustomDropdown(dropdownId, placeholderText, optionsData, onSelect, parent) {
      const container = parent.querySelector(`#${dropdownId}`);
      const selectDisplay = container.querySelector('.select-display');
      const customOptions = container.querySelector('.custom-options');
      const dropdownIcon = container.querySelector('.dropdown-icon');
      const nativeSelect = container.querySelector('select');
      nativeSelect.innerHTML = `<option value="" disabled selected>${placeholderText}</option>`;
      selectDisplay.querySelector('span').textContent = placeholderText;
      customOptions.innerHTML = "";
      optionsData.forEach(item => {
        const optionEl = document.createElement('div');
        optionEl.className = 'custom-option';
        optionEl.dataset.value = item.id;
        optionEl.innerHTML = `<div class="option-checkbox">${SVG_CHECK}</div><span>${item.name}</span>`;
        customOptions.appendChild(optionEl);
        const opt = document.createElement('option');
        opt.value = item.id;
        opt.textContent = item.name;
        nativeSelect.appendChild(opt);
        optionEl.addEventListener('click', function(e) {
          e.stopPropagation();
          customOptions.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
          this.classList.add('selected');
          selectDisplay.querySelector('span').textContent = item.name;
          nativeSelect.value = item.id;
          customOptions.classList.remove('show-options');
          dropdownIcon.classList.remove('rotate');
          if (onSelect) onSelect(item);
          const errorEl = container.parentNode.querySelector(".error-message");
          if (errorEl) errorEl.style.display = "none";
        });
      });
      selectDisplay.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = customOptions.classList.contains('show-options');
        parent.querySelectorAll('.custom-options').forEach(optList => optList.classList.remove('show-options'));
        parent.querySelectorAll('.dropdown-icon').forEach(icon => icon.classList.remove('rotate'));
        if (!isOpen) {
          customOptions.classList.add('show-options');
          dropdownIcon.classList.add('rotate');
        } else {
          customOptions.classList.remove('show-options');
          dropdownIcon.classList.remove('rotate');
        }
      });
      parent.addEventListener('click', function(e) {
        if (!container.contains(e.target)) {
          customOptions.classList.remove('show-options');
          dropdownIcon.classList.remove('rotate');
        }
      });
    }
    
    /*************************************************************
     * 4) Section Toggle and Form Disable Functions
     *************************************************************/
    // Modified toggleSection to include an optional forceOpen parameter so that
    // if the field is missing, the section is forced open rather than toggled.
    function toggleSection(formContainer, sectionId, forceOpen = false) {
      const section = formContainer.querySelector(`#${sectionId}`);
      if (!section) return;
      const parentSection = section.previousElementSibling;
      const icon = parentSection.querySelector('.collapse-icon');
      
      if (forceOpen) {
        if (!section.classList.contains('expanded')) {
          section.classList.add('expanded');
          parentSection.classList.add('active');
          if (icon) icon.classList.add('active');
        }
        return;
      }
      
      // Regular toggle behavior
      const wasExpanded = section.classList.contains('expanded');
      formContainer.querySelectorAll('.collapsible-section').forEach(sec => {
        if (sec.id !== sectionId) {
          sec.classList.remove('expanded');
          const card = sec.previousElementSibling;
          if (card) card.classList.remove('active');
          const icon = card ? card.querySelector('.collapse-icon') : null;
          if (icon) icon.classList.remove('active');
        }
      });
      if (!wasExpanded) {
        section.classList.add('expanded');
        parentSection.classList.add('active');
        if (icon) icon.classList.add('active');
      } else {
        section.classList.remove('expanded');
        parentSection.classList.remove('active');
        if (icon) icon.classList.remove('active');
      }
    }
    
    // Modified disableAllFormElements to update cursor style on interactive elements.
    function disableAllFormElements(formContainer) {
      formContainer.querySelectorAll('.collapsible-section.expanded').forEach(sec => {
        sec.classList.remove('expanded');
        const card = sec.previousElementSibling;
        if (card) {
          card.classList.remove('active');
          const icon = card.querySelector('.collapse-icon');
          if (icon) icon.classList.remove('active');
        }
      });
      formContainer.querySelectorAll('.custom-options.show-options').forEach(opt => opt.classList.remove('show-options'));
      formContainer.querySelectorAll('.dropdown-icon.rotate').forEach(icon => icon.classList.remove('rotate'));
      // Set cursor style to not-allowed for all interactive elements.
      formContainer.querySelectorAll('button, input, select, .section, .custom-options, .select-wrapper, .section-card, .dropdown-icon').forEach(el => {
        el.style.cursor = "not-allowed";
      });
      formContainer.classList.add('disabled');
    }
    
   
        const garageCheckbox = formContainer.querySelector("#garage");
        const numberOfCarsContainer = formContainer.querySelector("#number-of-cars-container");
        garageCheckbox.addEventListener("change", function() {
          numberOfCarsContainer.style.display = this.checked ? "block" : "none";
        });
        
        /*************************************************************
         * 8) Initialize Custom Dropdowns for Agent and House Type
         *************************************************************/
        // Agent Dropdown
        const agentOptionsData = getAgentList().map(agent => ({
          id: agent,
          name: agent === "No Preference" ? (isEnglish ? agent : "Pas de préférence") : agent
        }));
        initializeCustomDropdown("agentDropdown", isEnglish ? '-- Select a Agent --' : '-- Sélectionnez un vendeur --', agentOptionsData, null, formContainer);
        // House Type Dropdown (single level)
        const houseTypeOptions = (isEnglish ? SharedPropertyTypes.en : SharedPropertyTypes.fr).map(type => ({
          id: type,
          name: type
        }));
        initializeCustomDropdown("houseTypeDropdown", isEnglish ? '-- Select House Type --' : '-- Sélectionnez le type de maison --', houseTypeOptions, null, formContainer);
        
        /*************************************************************
         * 9) Build the Multi‑Level Property Category Dropdown
         *************************************************************/
        let currentSelectedPropertyCategory = null;
        let currentSelectedPropertyOption = null;
        function buildPropertyDropdown() {
          const customOptionsContainer = formContainer.querySelector("#customOptionsPropertyCategory");
          const mainSelectNative = formContainer.querySelector("#propertyCategoryMainSelect");
          const subSelectNative = formContainer.querySelector("#propertyCategorySubSelect");
          const dropdownToggle = formContainer.querySelector("#selectDisplayPropertyCategory");
          const dropdownIcon = formContainer.querySelector("#dropdownIconPropertyCategory");
          const selectedText = dropdownToggle.querySelector("span");
          customOptionsContainer.innerHTML = "";
          mainSelectNative.innerHTML = "";
          subSelectNative.innerHTML = "";
          const propertyCategoriesData = [
            {
              id: "Residential",
              name: isEnglish ? "Residential" : "Résidentiel",
              subcategories: (isEnglish ? SharedPropertyCategories.Residential.en : SharedPropertyCategories.Residential.fr).map(item => ({ id: item, name: item }))
            },
            {
              id: "Plex",
              name: "Plex",
              subcategories: (isEnglish ? SharedPropertyCategories.Plex.en : SharedPropertyCategories.Plex.fr).map(item => ({ id: item, name: item }))
            }
          ];
          propertyCategoriesData.forEach(cat => {
            mainSelectNative.appendChild(new Option(cat.name, cat.id));
            const catDiv = document.createElement("div");
            catDiv.className = "custom-option";
            catDiv.dataset.catId = cat.id;
            catDiv.innerHTML = `<span>${cat.name}</span><span class="main-arrow arrow-icon">${SVG_CHEVRON}</span>`;
            catDiv.addEventListener("click", function(e) {
              e.stopPropagation();
              if (catDiv.classList.contains("expanded")) {
                catDiv.classList.remove("expanded", "selected");
                const arrowEl = catDiv.querySelector(".arrow-icon");
                if (arrowEl) arrowEl.classList.remove("rotate");
                removeSubOptions(cat.id);
                updatePropertyDropdownText();
                return;
              }
              currentSelectedPropertyCategory = cat.id;
              customOptionsContainer.querySelectorAll(".sub-options").forEach(el => el.remove());
              customOptionsContainer.querySelectorAll(".custom-option").forEach(opt => {
                if(opt.dataset.catId !== currentSelectedPropertyCategory) {
                  opt.classList.remove("selected", "expanded");
                }
              });
              catDiv.classList.add("expanded", "selected");
              const arrowEl = catDiv.querySelector(".arrow-icon");
              if (arrowEl) arrowEl.classList.add("rotate");
              mainSelectNative.value = cat.id;
              if (!currentSelectedPropertyOption) {
                selectedText.textContent = cat.name;
              }
              const subWrapper = document.createElement("div");
              subWrapper.className = "sub-options";
              subWrapper.dataset.parentCat = cat.id;
              cat.subcategories.forEach(sub => {
                const subDiv = document.createElement("div");
                subDiv.className = "custom-option";
                subDiv.dataset.subId = sub.id;
                subDiv.innerHTML = `<div class="option-checkbox">${SVG_CHECK}</div><span>${sub.name}</span>`;
                if(currentSelectedPropertyOption === sub.id && currentSelectedPropertyCategory === cat.id) {
                  subDiv.classList.add("selected");
                }
                subDiv.addEventListener("click", function(e) {
                  e.stopPropagation();
                  if (currentSelectedPropertyOption === sub.id) {
                    updatePropertyDropdownText();
                    closePropertyDropdown();
                    return;
                  }
                  const siblings = subWrapper.querySelectorAll(".custom-option");
                  siblings.forEach(opt => opt.classList.remove("selected"));
                  subDiv.classList.add("selected");
                  currentSelectedPropertyOption = sub.id;
                  subSelectNative.value = sub.id;
                  selectedText.textContent = sub.name;
                  formContainer.querySelector("#errorPropertyCategory").style.display = "none";
                  closePropertyDropdown();
                });
                subWrapper.appendChild(subDiv);
                subSelectNative.appendChild(new Option(sub.name, sub.id));
              });
              catDiv.insertAdjacentElement("afterend", subWrapper);
            });
            customOptionsContainer.appendChild(catDiv);
          });
        }
        function removeSubOptions(catId) {
          const subWrappers = formContainer.querySelectorAll(`.sub-options[data-parent-cat="${catId}"]`);
          subWrappers.forEach(sw => sw.remove());
        }
        function updatePropertyDropdownText() {
          const dropdownToggle = formContainer.querySelector("#selectDisplayPropertyCategory");
          const selectedText = dropdownToggle.querySelector("span");
          if (currentSelectedPropertyOption) {
            selectedText.textContent = currentSelectedPropertyOption;
          } else {
            selectedText.textContent = isEnglish ? "-- Select Category --" : "-- Sélectionnez une catégorie --";
          }
        }
        function closePropertyDropdown() {
          const customOptionsContainer = formContainer.querySelector("#customOptionsPropertyCategory");
          const dropdownIcon = formContainer.querySelector("#dropdownIconPropertyCategory");
          customOptionsContainer.classList.remove("show-options");
          dropdownIcon.classList.remove("rotate");
          formContainer.querySelectorAll(".sub-options").forEach(sw => sw.remove());
        }
        formContainer.querySelector("#selectDisplayPropertyCategory").addEventListener("click", function(e) {
          e.stopPropagation();
          const customOptionsContainer = formContainer.querySelector("#customOptionsPropertyCategory");
          const dropdownIcon = formContainer.querySelector("#dropdownIconPropertyCategory");
          const isOpen = customOptionsContainer.classList.contains("show-options");
          formContainer.querySelectorAll(".custom-options").forEach(optList => optList.classList.remove("show-options"));
          formContainer.querySelectorAll(".dropdown-icon").forEach(icon => icon.classList.remove("rotate"));
          if (!isOpen) {
            customOptionsContainer.classList.add("show-options");
            dropdownIcon.classList.add("rotate");
            if (currentSelectedPropertyCategory) {
              const catDiv = customOptionsContainer.querySelector(`.custom-option[data-cat-id="${currentSelectedPropertyCategory}"]`);
              if (catDiv && !catDiv.classList.contains("expanded")) {
                catDiv.click();
              }
            }
          } else {
            customOptionsContainer.classList.remove("show-options");
            dropdownIcon.classList.remove("rotate");
          }
        });
        formContainer.addEventListener("click", function(e) {
          const containerProp = formContainer.querySelector("#propertyCategoryDropdown");
          if (!containerProp.contains(e.target)) {
            const customOptionsContainer = formContainer.querySelector("#customOptionsPropertyCategory");
            const dropdownIcon = formContainer.querySelector("#dropdownIconPropertyCategory");
            customOptionsContainer.classList.remove("show-options");
            dropdownIcon.classList.remove("rotate");
            formContainer.querySelectorAll(".sub-options").forEach(sw => sw.remove());
          }
        });
        // Build the property category dropdown
        buildPropertyDropdown();
        
        /*************************************************************
         * 10) Live Validation for Contact Inputs
         *************************************************************/
        formContainer.querySelector("#full-name").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorFullName").style.display = "none";
        });
        formContainer.querySelector("#email").addEventListener("input", function() {
          if (isValidEmail(this.value.trim())) formContainer.querySelector("#errorEmail").style.display = "none";
        });
        formContainer.querySelector("#phone").addEventListener("input", function() {
          if (isValidPhoneNumber(this.value.trim())) formContainer.querySelector("#errorPhone").style.display = "none";
        });
        
        /*************************************************************
         * 11) Form Submission with Validation and Disable Logic
         *************************************************************/
        formContainer.querySelector("#submit-button").addEventListener("click", function() {
          // Hide all error messages
          formContainer.querySelectorAll(".error-message").forEach(errorEl => {
            errorEl.style.display = "none";
          });
          
          const fullName = formContainer.querySelector("#full-name").value.trim();
          const email = formContainer.querySelector("#email").value.trim();
          const phone = formContainer.querySelector("#phone").value.trim();
          const agent = formContainer.querySelector("#agentSelect").value;
          const propertyCategory = formContainer.querySelector("#propertyCategorySubSelect").value;
          const houseType = formContainer.querySelector("#houseTypeSelect").value;
          const streetAddress = formContainer.querySelector("#street-address").value.trim();
          const city = formContainer.querySelector("#city").value.trim();
          const postalCode = formContainer.querySelector("#postal-code").value.trim();
          const rooms = formContainer.querySelector("#rooms").value.trim();
          const bedrooms = formContainer.querySelector("#bedrooms").value.trim();
          const bathrooms = formContainer.querySelector("#bathrooms").value.trim();
          const yearBuilt = formContainer.querySelector("#year-built").value.trim();
          const area = formContainer.querySelector("#area").value.trim();
          const garage = formContainer.querySelector("#garage").checked;
          const numberOfCars = formContainer.querySelector("#number-of-cars").value.trim();
          const outsideParking = formContainer.querySelector("#outside-parking").checked;
          const swimmingPool = formContainer.querySelector("#swimming-pool").checked;
          const details = formContainer.querySelector("#details").value.trim();
          
          // Validate each field; if error, use forceOpen=true to keep section open
          if (!fullName) {
            toggleSection(formContainer, "section-contact-details", true);
            formContainer.querySelector("#errorFullName").style.display = "flex";
            return;
          }
          if (!email || !isValidEmail(email)) {
            toggleSection(formContainer, "section-contact-details", true);
            formContainer.querySelector("#errorEmail").style.display = "flex";
            return;
          }
          if (!phone || !isValidPhoneNumber(phone)) {
            toggleSection(formContainer, "section-contact-details", true);
            formContainer.querySelector("#errorPhone").style.display = "flex";
            return;
          }
          if (!agent) {
            toggleSection(formContainer, "section-agent-info", true);
            formContainer.querySelector("#errorAgent").style.display = "flex";
            return;
          }
          if (!propertyCategory) {
            toggleSection(formContainer, "section-property-type", true);
            formContainer.querySelector("#errorPropertyCategory").style.display = "flex";
            return;
          }
          if (!houseType) {
            toggleSection(formContainer, "section-property-type", true);
            formContainer.querySelector("#errorHouseType").style.display = "flex";
            return;
          }
          if (!streetAddress) {
            toggleSection(formContainer, "section-property-location", true);
            formContainer.querySelector("#errorStreetAddress").style.display = "flex";
            return;
          }
          if (!city) {
            toggleSection(formContainer, "section-property-location", true);
            formContainer.querySelector("#errorCity").style.display = "flex";
            return;
          }
          if (!postalCode) {
            toggleSection(formContainer, "section-property-location", true);
            formContainer.querySelector("#errorPostalCode").style.display = "flex";
            return;
          }
          if (!rooms) {
            toggleSection(formContainer, "section-property-details", true);
            formContainer.querySelector("#errorRooms").style.display = "flex";
            return;
          }
          if (!bedrooms) {
            toggleSection(formContainer, "section-property-details", true);
            formContainer.querySelector("#errorBedrooms").style.display = "flex";
            return;
          }
          if (!bathrooms) {
            toggleSection(formContainer, "section-property-details", true);
            formContainer.querySelector("#errorBathrooms").style.display = "flex";
            return;
          }
          if (!yearBuilt) {
            toggleSection(formContainer, "section-property-details", true);
            formContainer.querySelector("#errorYearBuilt").style.display = "flex";
            return;
          }
          if (!area) {
            toggleSection(formContainer, "section-property-details", true);
            formContainer.querySelector("#errorArea").style.display = "flex";
            return;
          }
          if (garage && !numberOfCars) {
            toggleSection(formContainer, "section-additional-features", true);
            formContainer.querySelector("#errorNumberOfCars").style.display = "flex";
            return;
          }
          
          // Disable form elements, set submit button style, and submit
          const submitButton = formContainer.querySelector("#submit-button");
          submitButton.disabled = true;
          submitButton.textContent = isEnglish ? "Processing..." : "Traitement...";
          // Issue 2: Set cursor to not-allowed on interactive elements already handled in disableAllFormElements,
          // but here we also explicitly set for the submit button.
          submitButton.style.cursor = "not-allowed";
          // Issue 3: Set the background color of submit button to #4CAF50
          submitButton.style.backgroundColor = "#4CAF50";
          submitButton.style.Color = "#fff";
          
          console.log("Form Data Submitted:", {
            fullName,
            email,
            phone: formatPhoneNumber(phone),
            agent,
            propertyCategory,
            houseType,
            streetAddress,
            city,
            postalCode,
            rooms,
            bedrooms,
            bathrooms,
            yearBuilt,
            area,
            garage,
            numberOfCars: garage ? numberOfCars : null,
            outsideParking,
            swimmingPool,
            details
          });
		  
		  window.voiceflow.chat.interact({ 
            type: "complete",
            payload: { 
			fullName,
            email,
            phone: formatPhoneNumber(phone),
            agent,
            propertyCategory,
            houseType,
            streetAddress,
            city,
            postalCode,
            rooms,
            bedrooms,
            bathrooms,
            yearBuilt,
            area,
            garage,
            numberOfCars: garage ? numberOfCars : null,
            outsideParking,
            swimmingPool,
            details
			},
          });
          disableAllFormElements(formContainer);
          submitButton.textContent = isEnglish ? "Submitted!" : "Soumis!";
        });
      }
    };
    
/************** EXTENSION #8: ContactFormExtension **************/
    const ContactFormExtension = {
      name: "ContactForm",
      type: "response",
      match: ({ trace }) => trace.type === 'ext_contact_form' || trace.payload?.name === 'ext_contact_form',
      render: ({ trace, element }) => {
        const { language } = trace.payload || { language: 'FR' };
        const isEnglish = language === 'en';
    
        /*************************************************************
         * HTML Generation & Initial Setup
         *************************************************************/
        const formContainer = document.createElement("form");
        formContainer.setAttribute("novalidate", "true");
        formContainer.innerHTML = `
          <style>
            /* (Your CSS styles remain unchanged.) */
            /* ========== Dropdown Components ========== */
            .main-container {
              display: block;
              transition: height 0.3s ease;
              border-radius: 6px;
              margin-bottom: 15px;
            }
            .select-wrapper {
              border: 1px solid #ddd;
              border-radius: 6px;
              background-color: #fff;
              position: relative;
              min-width: 300px;
              max-width: 800px;
              width: 100%;
              min-height: 50px;
            }
            .select-display {
              padding: 0 15px;
              font-size: 14px;
              cursor: pointer;
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 50px;
				color: #444;
            }
            .dropdown-icon {
              width: 24px;
              height: 24px;
              transition: transform 0.3s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #F8EAFA;
              border-radius: 50%;
            }
            .dropdown-icon.rotate {
              transform: rotate(180deg);
            }
            /* Custom Options */
            .custom-options {
              display: none;
			  font-size: 14px;
              border-top: 1px solid #ddd;
              max-height: 300px;
              overflow-y: auto;
              background-color: #fff;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
              z-index: 100;
              border-radius: 0 0 6px 6px;
            }
            .custom-options::-webkit-scrollbar {
              display: none; 
            }
            .custom-options {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .custom-option {
              padding: 12px 15px;
              display: flex;
              align-items: center;
              cursor: pointer;
              transition: background 0.2s;
              position: relative;
            }
            .custom-option:hover {
              background-color: #F8EAFA;
              color:#9C27B0;
            }
            .custom-option.selected {
              background-color: #F8EAFA;
              color:#9C27B0;
              font-weight: bold;
            }
            .option-checkbox {
              width: 18px;
              height: 18px;
              border: 2px solid #ccc;
              border-radius: 50%;
              margin-right: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #fff;
              transition: all 0.2s;
            }
            .option-checkbox::after {
              content: "";
              color: #9C27B0;
              font-size: 14px;
              display: none;
            }
            .custom-option.selected .option-checkbox {
              border-color: #9C27B0;
              background-color: #9C27B0;
            }
            .custom-option.selected .option-checkbox::after {
              display: block;
              color: #fff;
            }
            .custom-option:not(.selected):hover .option-checkbox,
            .custom-option:not(.selected):hover .option-checkbox::after {
              border-color: #9C27B0;
              display: block;
              color: #9C27B0;
            }
            .custom-option.selected .option-checkbox svg path {
              fill: #fff !important;
            }
            .show-options {
              display: block;
            }
            .custom-option.selected .main-arrow,
            .custom-option:hover .main-arrow {
              background-color: #fff;
            }
            /* ========== Error Components ========== */
            .error-container {
              width: 100%;
              margin: 2px 0;
              box-sizing: border-box;
            }
            .error-message {
              display: none;
              padding: 5px;
              border: 1px solid #e8e8e8;
              border-radius: 6px;
              background-color: #fff;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
              font-size: 14px;
              align-items: center;
            }
            .error-icon {
              background-color: red;
              color: #fff;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              margin-right: 15px;
              flex-shrink: 0;
            }
            /* ========== Form Inputs & Layout ========== */
            form {
              display: flex;
              flex-direction: column;
              gap: 10px;
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
              padding: 16px;
              border-radius: 6px;
              background: #fff;
            }
            .flex-row {
              display: flex;
              gap: 10px 16px;
              flex-wrap: wrap;
            }
            .flex-row > div {
              flex: 1;
              min-width: 300px;
            }
            .bold-label {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 8px;
      display: block;
            }
            input[type="text"],
            input[type="email"],
            input[type="tel"],
            #details {
              width: 100%;
              min-width: 200px;
              max-width: 800px;
              border: 1px solid rgba(0,0,0,0.2);
              border-radius: 6px;
              padding: 8px;
              background: #fff;
              font-size: 14px;
              outline: none;
              box-sizing: border-box;
              height: 50px;
            }
            #details {
              resize: vertical;
              min-height: 100px;
              max-height: 200px;
              width: 100%;
            }
            input[type="text"]:focus,
            input[type="email"]:focus,
            input[type="tel"]:focus,
            #details:focus {
              border: 2px solid #9C27B0;
            }
            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            input[type="number"] {
              -moz-appearance: textfield;
            }
            /* ========== Buttons ========== */
            .appointment-btn,
            .submit {
              color: #9C27B0;
              background-color: #F8EAFA;
              border: none;
              padding: 12px;
              border-radius: 6px;
              font-size: 16px;
              cursor: pointer;
              margin-top: 8px;
              transition: background-color 0.2s, color 0.2s, font-weight 0.2s;
              width: 100%;
            }
            .appointment-btn:hover,
            .submit:hover {
              color: #fff;
              background-color: #9C27B0;
              font-weight: 600;
            }
            .appointment-btn:disabled,
            .submit:disabled {
              background-color: #ccc;
              color: #666;
              cursor: not-allowed;
              font-weight: 700;
            }
            /* ========== Sections & Tabs ========== */
            .section {
              border: 1px solid rgba(0,0,0,0.2);
              border-radius: 6px;
              margin-bottom: 10px;
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
              box-shadow: 0 2px 4px rgba(0,0,0,0.05);
              border-radius: 6px;
            }
            .section.active {
              border: 2px solid #9C27B0;
              box-shadow: 0 3px 8px rgba(154,13,242,0.1);
            }
            .section:hover:not(.disabled) {
              border-color: #9C27B0;
              box-shadow: 0 3px 8px rgba(154,13,242,0.1);
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
              font-size: 16px;
              color: #444;
            }
            .collapse-icon {
              transition: transform 0.3s;
              background: #F8EAFA;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 24px;
              height: 24px;
              border-radius: 50%;
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
            .select-label {
              margin-bottom: 8px;
              font-weight: bold;
              color: #444;
            }
            /* ========== Disabled State ========== */
            .disabled {
              cursor: not-allowed !important;
            }
            .disabled * {
              cursor: not-allowed !important;
              pointer-events: none !important;
            }
            .custom-option:not(.selected):hover .option-checkbox svg path {
              fill: #9C27B0;
            }
            .custom-option:not(.selected):hover .option-checkbox {
              border-color: #9C27B0;
            }
            
            .main-arrow {
              margin-left: auto;
    display: flex
    align-items: center;
    background-color: #F8EAFA;
    border-radius: 50%;
    transition: background-color 0.3s;
    width: 24px;
    height: 24px;
    justify-content: center;
            }
            .arrow-icon {
              transition: transform 0.3s ease;
            }
            .arrow-icon.rotate {
              transform: rotate(180deg);
            }
          </style>
          <!-- Section 1: Contact Information -->
          <div class="flex-row">
            <div class="section">
              <div class="section-card" data-target="section-contactInfo">
                <div class="section-info">
                  <div class="section-icon">${SVG_USER}</div>
                  <div class="section-title">${isEnglish ? "Your Contact Details" : "Vos coordonnées"}</div>
                </div>
                <div class="collapse-icon">${SVG_CHEVRON}</div>
              </div>
              <div class="collapsible-section" id="section-contactInfo">
                <div class="section-content">
                  <div class="flex-row">
                    <div>
                      <label for="full-name" class="bold-label">${isEnglish ? 'Full Name' : 'Nom complet'}</label>
                      <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorFullName">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'Full Name is required.' : 'Le nom complet est obligatoire.'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="email" class="bold-label">Email</label>
                      <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorEmail">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'A valid email is required.' : "Une adresse email valide est obligatoire."}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="phone" class="bold-label">${isEnglish ? 'Phone Number' : 'Numéro de téléphone'}</label>
                      <input type="tel" id="phone" name="phone" placeholder="${isEnglish ? 'Enter your phone number' : 'Entrez votre numéro de téléphone'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorPhone">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'A valid phone number is required.' : "Un numéro de téléphone valide est obligatoire."}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Section 2: Agent and Service -->
            <div class="section">
              <div class="section-card" data-target="section-agent-service">
                <div class="section-info">
                  <div class="section-icon">${SVG_AGENT}</div>
                  <div class="section-title">${isEnglish ? "Agent & Service" : "Vendeur et Service"}</div>
                </div>
                <div class="collapse-icon">${SVG_CHEVRON}</div>
              </div>
              <div class="collapsible-section" id="section-agent-service">
                <div class="section-content">
                  <!-- Custom Agent Dropdown -->
                  <div class="main-container" id="sellerDropdown">
                    <label class="bold-label">${isEnglish ? 'Select a Agent' : 'Sélectionnez un vendeur'}</label>
                    <select id="sellerSelect" name="sellerSelect" required style="display:none;"></select>
                    <div class="select-wrapper">
                      <div class="select-display" id="selectDisplaySeller">
                        <span>${isEnglish ? '-- Select a Agent --' : '-- Sélectionnez un vendeur --'}</span>
                        <div class="dropdown-icon" id="dropdownIconSeller">${SVG_CHEVRON}</div>
                      </div>
                      <div class="custom-options" id="customOptionsSeller"></div>
                    </div>
                    <div class="error-container">
                      <div class="error-message" id="errorSeller">
                        <div class="error-icon">!</div>
                        <span>${isEnglish ? 'You must select a agent.' : 'Vous devez sélectionner un vendeur.'}</span>
                      </div>
                    </div>
                  </div>
                  <!-- Custom Service Dropdown -->
                  <div id="sellerServiceContainer">
                    <label class="bold-label">${isEnglish ? 'Select a Service' : 'Sélectionnez un service'}</label>
                    <div class="main-container" id="serviceDropdownSeller">
                      <select id="sellerServiceSelect" name="sellerServiceSelect" required style="display:none;"></select>
                      <div class="select-wrapper">
                        <div class="select-display" id="selectDisplaySellerService">
                          <span>${isEnglish ? '-- Select a Service --' : '-- Sélectionnez un service --'}</span>
                          <div class="dropdown-icon" id="dropdownIconSellerService">${SVG_CHEVRON}</div>
                        </div>
                        <div class="custom-options" id="customOptionsSellerService"></div>
                      </div>
                      <div class="error-container">
                        <div class="error-message" id="errorSellerService">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'You must select a service.' : 'Vous devez sélectionner un service.'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Section 3: Message -->
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
                <div class="error-container">
                  <div class="error-message" id="errorMessage">
                    <div class="error-icon">!</div>
                    <span>${isEnglish ? 'A message is required.' : 'Un message est obligatoire.'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Submit button -->
          <button type="button" class="appointment-btn" id="submit-button">
            ${isEnglish ? 'Submit' : 'Soumettre'}
          </button>
        `;
        element.appendChild(formContainer);
    
        /*************************************************************
         * UI Helper Functions for Custom Dropdown
         *************************************************************/
        function closeAllUIElements() {
          formContainer.querySelectorAll('.custom-options').forEach(opt => opt.classList.remove('show-options'));
          formContainer.querySelectorAll('.dropdown-icon').forEach(icon => icon.classList.remove('rotate'));
          formContainer.querySelectorAll('.collapsible-section.expanded').forEach(sec => sec.classList.remove('expanded'));
          formContainer.querySelectorAll('.section-card.active').forEach(card => card.classList.remove('active'));
        }
    
        function initializeCustomDropdown(dropdownId, placeholderText, optionsData, onSelect) {
          const container = formContainer.querySelector(`#${dropdownId}`);
          const selectDisplay = container.querySelector('.select-display');
          const customOptions = container.querySelector('.custom-options');
          const dropdownIcon = container.querySelector('.dropdown-icon');
          const nativeSelect = container.querySelector('select');
          nativeSelect.innerHTML = `<option value="" disabled selected>${placeholderText}</option>`;
          selectDisplay.querySelector('span').textContent = placeholderText;
          customOptions.innerHTML = "";
          optionsData.forEach(item => {
            const optionEl = document.createElement('div');
            optionEl.className = 'custom-option';
            optionEl.dataset.value = item.id;
            optionEl.innerHTML = `<div class="option-checkbox">${SVG_CHECK}</div><span>${item.name}</span>`;
            customOptions.appendChild(optionEl);
            const opt = document.createElement('option');
            opt.value = item.id;
            opt.textContent = item.name;
            nativeSelect.appendChild(opt);
            optionEl.addEventListener('click', function(e) {
              e.stopPropagation();
              customOptions.querySelectorAll('.custom-option').forEach(opt => {
                opt.classList.remove('selected');
              });
              this.classList.add('selected');
              selectDisplay.querySelector('span').textContent = item.name;
              nativeSelect.value = item.id;
              customOptions.classList.remove('show-options');
              dropdownIcon.classList.remove('rotate');
              if (onSelect) onSelect(item);
              const errorEl = container.parentNode.querySelector(".error-message");
              if (errorEl) errorEl.style.display = "none";
            });
          });
          selectDisplay.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = customOptions.classList.contains('show-options');
            formContainer.querySelectorAll('.custom-options').forEach(optList => optList.classList.remove('show-options'));
            formContainer.querySelectorAll('.dropdown-icon').forEach(icon => icon.classList.remove('rotate'));
            if (!isOpen) {
              customOptions.classList.add('show-options');
              dropdownIcon.classList.add('rotate');
            } else {
              customOptions.classList.remove('show-options');
              dropdownIcon.classList.remove('rotate');
            }
          });
          formContainer.addEventListener('click', function(e) {
            if (!container.contains(e.target)) {
              customOptions.classList.remove('show-options');
              dropdownIcon.classList.remove('rotate');
            }
          });
        }
    
        /*************************************************************
         * Section and Tab Functionality
         *************************************************************/
        function toggleSection(sectionId, forceOpen = false) {
          const section = formContainer.querySelector(`#${sectionId}`);
          if (!section) return;
          const parentSection = section.previousElementSibling;
          const icon = parentSection.querySelector(".collapse-icon");
          const wasExpanded = section.classList.contains("expanded");
          formContainer.querySelectorAll(".collapsible-section").forEach(sec => {
            if (sec.id !== sectionId) {
              sec.classList.remove("expanded");
              const card = sec.previousElementSibling;
              if (card) card.classList.remove("active");
              const icon = card ? card.querySelector(".collapse-icon") : null;
              if (icon) icon.classList.remove("active");
            }
          });
          if (forceOpen || !wasExpanded) {
            section.classList.add("expanded");
            parentSection.classList.add("active");
            if (icon) icon.classList.add("active");
          } else {
            section.classList.remove("expanded");
            parentSection.classList.remove("active");
            if (icon) icon.classList.remove("active");
          }
        }
    
        formContainer.querySelectorAll('.section-card').forEach(card => {
          const targetId = card.getAttribute("data-target");
          card.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleSection(targetId);
          });
        });
    
        /*************************************************************
         * Initialize Dropdowns for Agent and Service
         *************************************************************/
        // Build agent dropdown data from Agents array.
        const sellersData = Agents.map(name => ({ id: name, name }));
        initializeCustomDropdown("sellerDropdown", isEnglish ? '-- Select a Agent --' : '-- Sélectionnez un vendeur --', sellersData);
    
        // Build service dropdown data from ServiceOptions array.
        const servicesData = ServiceOptions.map(service => ({ 
          id: service.value, 
          name: isEnglish ? service.label.en : service.label.fr 
        }));
        initializeCustomDropdown("serviceDropdownSeller", isEnglish ? '-- Select a Service --' : '-- Sélectionnez un service --', servicesData);
    
        /*************************************************************
         * Live Validation for Input Fields
         *************************************************************/
        formContainer.querySelector("#full-name").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorFullName").style.display = "none";
        });
        formContainer.querySelector("#email").addEventListener("input", function() {
          if (isValidEmail(this.value.trim())) formContainer.querySelector("#errorEmail").style.display = "none";
        });
        formContainer.querySelector("#phone").addEventListener("input", function() {
          if (isValidPhoneNumber(this.value.trim())) formContainer.querySelector("#errorPhone").style.display = "none";
        });
    
        /*************************************************************
         * Disable All Form Elements After Submission
         *************************************************************/
        function disableAllFormElements() {
          formContainer.querySelectorAll('.collapsible-section.expanded').forEach(sec => {
            sec.classList.remove('expanded');
            let card = sec.previousElementSibling;
            if (card) {
              card.classList.remove('active');
              let icon = card.querySelector('.collapse-icon');
              if (icon) icon.classList.remove('active');
            }
          });
          formContainer.querySelectorAll('.custom-options.show-options').forEach(opt => opt.classList.remove('show-options'));
          formContainer.querySelectorAll('.dropdown-icon.rotate').forEach(icon => icon.classList.remove('rotate'));
          formContainer.classList.add('disabled');
        }
    
        /*************************************************************
         * Form Submission Process with Sequential Validation
         *************************************************************/
        formContainer.querySelector("#submit-button").addEventListener("click", () => {
          formContainer.querySelectorAll(".error-message").forEach(errorEl => {
            errorEl.style.display = "none";
          });
    
          const fullName = formContainer.querySelector("#full-name").value.trim();
          const email = formContainer.querySelector("#email").value.trim();
          const phone = formContainer.querySelector("#phone").value.trim();
          // Use the agent and service dropdown selections.
          const selectedSeller = formContainer.querySelector("#sellerSelect").value;
          const selectedService = formContainer.querySelector("#sellerServiceSelect").value;
          const details = formContainer.querySelector("#details").value.trim();
    
          if (!fullName) {
            toggleSection("section-contactInfo", true);
            formContainer.querySelector("#errorFullName").style.display = "flex";
            return;
          }
          if (!email || !isValidEmail(email)) {
            toggleSection("section-contactInfo", true);
            formContainer.querySelector("#errorEmail").style.display = "flex";
            return;
          }
          if (!phone || !isValidPhoneNumber(phone)) {
            toggleSection("section-contactInfo", true);
            formContainer.querySelector("#errorPhone").style.display = "flex";
            return;
          }
    
          if (!selectedSeller) {
            toggleSection("section-agent-service", true);
            formContainer.querySelector("#errorSeller").style.display = "flex";
            return;
          }
          if (!selectedService) {
            toggleSection("section-agent-service", true);
            formContainer.querySelector("#errorSellerService").style.display = "flex";
            return;
          }
          if (!details) {
            toggleSection("section-message", true);
            const errorMessage = formContainer.querySelector("#errorMessage");
            if (errorMessage) {
              errorMessage.style.display = "flex";
            } else {
              console.error("Error message element for details field not found");
            }
            return;
          }
    
          formContainer.querySelectorAll(".error-message").forEach(errorEl => {
            errorEl.style.display = "none";
          });
    
          const submitButton = formContainer.querySelector("#submit-button");
          submitButton.disabled = true;
          submitButton.textContent = isEnglish ? "Processing..." : "Traitement...";
          submitButton.style.cursor = "not-allowed";
          submitButton.style.backgroundColor = "#4CAF50";
          submitButton.style.color = "white";
		  
		  window.voiceflow.chat.interact({ 
            type: "complete",
            payload: { 
			fullName,
                email,
                phone: formatPhoneNumber(phone),
                agent: selectedSeller,
                service: selectedService,
                message: details
			},
          });
   
          disableAllFormElements();
        });
      }
    };
    
/************** EXTENSION #9: BookingFormExtension **************/
     const BookingFormExtension = {
      name: "BookingForm",
      type: "response",
      match: ({ trace }) => trace.type === `ext_booking_form` || trace.payload?.name === `ext_booking_form`,
      render: ({ trace, element }) => {
        const { language } = trace.payload || { language: 'FR' };
        const isEnglish = language === 'en';

        
        // Create the form
        const formContainer = document.createElement("form");
        formContainer.setAttribute("novalidate", "true");
        formContainer.innerHTML = `
		<style>
    /* ========== Dropdown Components ========== */
    .main-container {
              display: block;
              transition: height 0.3s ease;
              border-radius: 6px;
              margin-bottom: 15px;
            }
            .select-wrapper {
              border: 1px solid #ddd;
              border-radius: 6px;
              background-color: #fff;
              position: relative;
              min-width: 300px;
              max-width: 800px;
              width: 100%;
              min-height: 50px;
            }
            .select-display {
              padding: 0 15px;
              font-size: 14px;
              cursor: pointer;
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 50px;
				color: #444;
            }
            .dropdown-icon {
              width: 24px;
              height: 24px;
              transition: transform 0.3s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #F8EAFA;
              border-radius: 50%;
            }
            .dropdown-icon.rotate {
              transform: rotate(180deg);
            }
    
    /* Custom Options */
  .custom-options {
              display: none;
			  font-size: 14px;
              border-top: 1px solid #ddd;
              max-height: 300px;
              overflow-y: auto;
              background-color: #fff;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
              z-index: 100;
              border-radius: 0 0 6px 6px;
            }
    /* Hide scrollbar for Chrome, Safari, Opera */
.custom-options::-webkit-scrollbar {
  display: none; 
}
    .custom-options {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}

    .custom-options {
              display: none;
              border-top: 1px solid #ddd;
              max-height: 300px;
              overflow-y: auto;
              background-color: #fff;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
              z-index: 100;
              border-radius: 0 0 6px 6px;
            }
            .custom-options::-webkit-scrollbar {
              display: none; 
            }
            .custom-options {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
    /* Option Checkbox – consolidated duplicate rules */
    .option-checkbox {
              width: 18px;
              height: 18px;
              border: 2px solid #ccc;
              border-radius: 50%;
              margin-right: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #fff;
              transition: all 0.2s;
            }
            .option-checkbox::after {
              content: "";
              color: #9C27B0;
              font-size: 14px;
              display: none;
            }
    .custom-option.selected .option-checkbox {
              border-color: #9C27B0;
              background-color: #9C27B0;
            }
            .custom-option.selected .option-checkbox::after {
              display: block;
              color: #fff;
            }
            .custom-option:not(.selected):hover .option-checkbox,
            .custom-option:not(.selected):hover .option-checkbox::after {
              border-color: #9C27B0;
              display: block;
              color: #9C27B0;
            }
    
    .custom-option.selected .option-checkbox svg path {
              fill: #fff !important;
            }
            .show-options {
              display: block;
            }
            .custom-option.selected .main-arrow,
            .custom-option:hover .main-arrow {
              background-color: #fff;
            }
    .custom-option {
              padding: 12px 15px;
              display: flex;
              align-items: center;
              cursor: pointer;
              transition: background 0.2s;
              position: relative;
            }
            .custom-option:hover {
              background-color: #F8EAFA;
              color:#9C27B0;
            }
            .custom-option.selected {
              background-color: #F8EAFA;
              color:#9C27B0;
              font-weight: bold;
            }
            .option-checkbox {
              width: 18px;
              height: 18px;
              border: 2px solid #ccc;
              border-radius: 50%;
              margin-right: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #fff;
              transition: all 0.2s;
            }
            .option-checkbox::after {
              content: "";
              color: #9C27B0;
              font-size: 14px;
              display: none;
            }
            .custom-option.selected .option-checkbox {
              border-color: #9C27B0;
              background-color: #9C27B0;
            }
            .custom-option.selected .option-checkbox::after {
              display: block;
              color: #fff;
            }
            .custom-option:not(.selected):hover .option-checkbox,
            .custom-option:not(.selected):hover .option-checkbox::after {
              border-color: #9C27B0;
              display: block;
              color: #9C27B0;
            }
            .custom-option.selected .option-checkbox svg path {
              fill: #fff !important;
            }
            .show-options {
              display: block;
            }
            .custom-option.selected .main-arrow,
            .custom-option:hover .main-arrow {
              background-color: #fff;
            }
			
			.custom-option:not(.selected):hover .option-checkbox svg path {
              fill: #9C27B0;
            }
            .custom-option:not(.selected):hover .option-checkbox {
              border-color: #9C27B0;
            }

    /* ========== Error Components ========== */
    .error-container {
      width: 100%;
      margin: 2px 0;
      box-sizing: border-box;
    }
    .error-message {
      display: none;
      padding: 5px;
      border: 1px solid #e8e8e8;
      border-radius: 6px;
      background-color: #fff;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      font-size: 14px;
      align-items: center;
    }
    .error-icon {
      background-color: red;
      color: #fff;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 15px;
      flex-shrink: 0;
    }
    
    /* ========== Form Inputs & Layout ========== */
    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .bold-label {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 8px;
      display: block;
    }
    input[type="text"],
    input[type="email"],
    input[type="tel"]{
      width: 100%;
      min-width: 200px;
      max-width: 600px;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 6px;
      padding: 8px;
      background: #fff;
      font-size: 14px;
      outline: none;
      box-sizing: border-box;
      height: 50px;
    
    }
    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="tel"]:focus {
      border: 2px solid #9C27B0;
    }
    
    /* ========== Buttons ========== */
    .submit-btn {
      color: #9C27B0;
      background-color: #F8EAFA;
      border: none;
      padding: 15px;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
      transition: background-color 0.2s, color 0.2s;
      width: 100%;
      font-weight: 600;
    }
    .submit-btn:hover {
      color: #fff;
      background-color: #9C27B0;
    }
    .submit-btn:disabled {
      background-color: #4CAF50;
      color: white;
      cursor: not-allowed;
    }
    
    /* Disabled state - preserve pointer-events to allow cursor display */
    .form-disabled input,
    .form-disabled .select-wrapper,
    .form-disabled .select-display,
    .form-disabled .dropdown-icon,
    .form-disabled .custom-option {
      cursor: not-allowed;
    }
    
    /* Add not-allowed cursor to all disabled elements */
    input:disabled, 
    select:disabled, 
    button:disabled {
      cursor: not-allowed !important;
    }
    
    .disabled {
      cursor: not-allowed !important;
    }
    
    .disabled * {
      cursor: not-allowed !important;
      pointer-events: none !important;
    }
    
    .dropdown-disabled {
  pointer-events: none !important;
      cursor: not-allowed !important;
}
    
    /* Miscellaneous adjustments */
    .custom-option:not(.selected):hover .option-checkbox svg path {
      fill: #9C27B0;
    }
  </style>
          <div>
            <label for="full-name" class="bold-label">${isEnglish ? 'Full Name' : 'Nom complet'}</label>
            <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required />
            <div class="error-container">
              <div class="error-message" id="errorFullName">
                <div class="error-icon">!</div>
                <span>${isEnglish ? 'Full Name is required.' : 'Le nom complet est obligatoire.'}</span>
              </div>
            </div>
          </div>
          
          <div>
            <label for="email" class="bold-label">Email</label>
            <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required />
            <div class="error-container">
              <div class="error-message" id="errorEmail">
                <div class="error-icon">!</div>
                <span>${isEnglish ? 'A valid email is required.' : "Une adresse email valide est obligatoire."}</span>
              </div>
            </div>
          </div>
          
          <div>
            <label for="phone" class="bold-label">${isEnglish ? 'Phone Number' : 'Numéro de téléphone'}</label>
            <input type="tel" id="phone" name="phone" placeholder="${isEnglish ? 'Enter your phone number' : 'Entrez votre numéro de téléphone'}" required />
            <div class="error-container">
              <div class="error-message" id="errorPhone">
                <div class="error-icon">!</div>
                <span>${isEnglish ? 'A valid phone number is required.' : "Un numéro de téléphone valide est obligatoire."}</span>
              </div>
            </div>
          </div>
          
          <div class="main-container" id="agentDropdown">
            <label class="bold-label">${isEnglish ? 'Select a Agent' : 'Sélectionnez un vendeur'}</label>
            <select id="agentSelect" name="agentSelect" required style="display:none;"></select>
            <div class="select-wrapper">
              <div class="select-display" id="selectDisplayAgent">
                <span>${isEnglish ? '-- Select a Agent --' : '-- Sélectionnez un vendeur --'}</span>
                <div class="dropdown-icon" id="dropdownIconAgent">${SVG_CHEVRON}</div>
              </div>
              <div class="custom-options" id="customOptionsAgent"></div>
            </div>
            <div class="error-container">
              <div class="error-message" id="errorAgent">
                <div class="error-icon">!</div>
                <span>${isEnglish ? 'You must select a agent.' : 'Vous devez sélectionner un vendeur.'}</span>
              </div>
            </div>
          </div>
          
          <button type="button" class="submit-btn" id="submit-button">
            ${isEnglish ? 'Submit' : 'Soumettre'}
          </button>
          
          
        `;

        element.appendChild(formContainer);

        // Initialize the agent dropdown
        const agentDropdown = formContainer.querySelector("#agentDropdown");
        const agentSelect = formContainer.querySelector("#agentSelect");
        const selectDisplayAgent = formContainer.querySelector("#selectDisplayAgent");
        const customOptionsAgent = formContainer.querySelector("#customOptionsAgent");
        const dropdownIconAgent = formContainer.querySelector("#dropdownIconAgent");
        const errorAgent = formContainer.querySelector("#errorAgent");
        
        agentSelect.innerHTML = `<option value="" disabled selected>${isEnglish ? '-- Select a Agent --' : '-- Sélectionnez un vendeur --'}</option>`;
        selectDisplayAgent.querySelector("span").textContent = isEnglish ? '-- Select a Agent --' : '-- Sélectionnez un vendeur --';
        customOptionsAgent.innerHTML = "";
        
        Agents.forEach(agent => {
          const optionEl = document.createElement('div');
          optionEl.className = 'custom-option';
          optionEl.dataset.value = agent;
          optionEl.innerHTML = `<div class="option-checkbox">${SVG_CHECK}</div><span>${agent}</span>`;
          customOptionsAgent.appendChild(optionEl);
          
          const opt = document.createElement('option');
          opt.value = agent;
          opt.textContent = agent;
          agentSelect.appendChild(opt);
          
          optionEl.addEventListener('click', function(e) {
            e.stopPropagation();
            customOptionsAgent.querySelectorAll('.custom-option').forEach(opt => {
              opt.classList.remove('selected');
            });
            this.classList.add('selected');
            selectDisplayAgent.querySelector('span').textContent = agent;
            agentSelect.value = agent;
            customOptionsAgent.classList.remove('show-options');
            dropdownIconAgent.classList.remove('rotate');
            
            // Hide the error message when a agent is selected
            errorAgent.style.display = "none";
          });
        });
        
        selectDisplayAgent.addEventListener('click', function(e) {
          e.stopPropagation();
          const isOpen = customOptionsAgent.classList.contains('show-options');
          formContainer.querySelectorAll('.custom-options').forEach(optList => optList.classList.remove('show-options'));
          formContainer.querySelectorAll('.dropdown-icon').forEach(icon => icon.classList.remove('rotate'));
          if (!isOpen) {
            customOptionsAgent.classList.add('show-options');
            dropdownIconAgent.classList.add('rotate');
          }
        });
        
        document.addEventListener('click', function(e) {
          if (!agentDropdown.contains(e.target)) {
            customOptionsAgent.classList.remove('show-options');
            dropdownIconAgent.classList.remove('rotate');
          }
        });

        // Input validation
        formContainer.querySelector("#full-name").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorFullName").style.display = "none";
        });
        
        formContainer.querySelector("#email").addEventListener("input", function() {
          if (isValidEmail(this.value.trim())) formContainer.querySelector("#errorEmail").style.display = "none";
        });
        
        formContainer.querySelector("#phone").addEventListener("input", function() {
          if (isValidPhoneNumber(this.value.trim())) formContainer.querySelector("#errorPhone").style.display = "none";
        });
        
        // Form submission
// Form submission
formContainer.querySelector("#submit-button").addEventListener("click", () => {
  // Hide all error messages first
  formContainer.querySelectorAll(".error-message").forEach(errorEl => {
    errorEl.style.display = "none";
  });
  
  // Validate inputs
  const fullName = formContainer.querySelector("#full-name").value.trim();
  const email = formContainer.querySelector("#email").value.trim();
  const phone = formContainer.querySelector("#phone").value.trim();
  const selectedAgent = agentSelect.value;
  let isValid = true;
  
  if (!fullName) {
    formContainer.querySelector("#errorFullName").style.display = "flex";
    isValid = false;
  }
  
  if (!email || !isValidEmail(email)) {
    formContainer.querySelector("#errorEmail").style.display = "flex";
    isValid = false;
  }
  
  if (!phone || !isValidPhoneNumber(phone)) {
    formContainer.querySelector("#errorPhone").style.display = "flex";
    isValid = false;
  }
  
  if (!selectedAgent) {
    errorAgent.style.display = "flex";
    isValid = false;
  }
  
  if (!isValid) {
    return;
  }
  
  // Force close any open dropdown
  customOptionsAgent.classList.remove('show-options');
  dropdownIconAgent.classList.remove('rotate');
  
  // Apply disabled styling
  formContainer.classList.add('form-disabled');
  
  // Disable all form inputs
  formContainer.querySelector("#full-name").disabled = true;
  formContainer.querySelector("#email").disabled = true;
  formContainer.querySelector("#phone").disabled = true;
  
  // Disable the dropdown
  selectDisplayAgent.classList.add('dropdown-disabled');
  
  // Update button state
  const submitButton = formContainer.querySelector("#submit-button");
  submitButton.disabled = true;
  submitButton.textContent = isEnglish ? "Processing..." : "Traitement...";
  submitButton.style.backgroundColor = "#4CAF50";
  submitButton.style.color = "white";
  
  window.voiceflow.chat.interact({
            type: "complete",
            payload: { 
			fullName,
    email,
    phone: formatPhoneNumber(phone),
    agentName: selectedAgent },
          });
        });
      }
    };

/************** EXTENSION #10: BookingCalendarExtension **************/
    const BookingCalendarExtension = {
      name: 'Booking',
      type: 'response',
      match: ({ trace }) =>
        trace.type === 'ext_booking_calendar' || trace.payload?.name === 'ext_booking_calendar',
      render: async ({ trace, element }) => {
        // --- Extract required payload values with fallbacks ---
        const {
  fullName = "John Doe",
  email = "john@example.com",
  apiKey = "",
  scheduleId = "",
  eventTypeId = "1", 
  eventTypeSlug = "default-event",
  agentName, // Add this line
  slots = {},
  selectedDate = "", 
  selectedTime = "",
  language = "en",
  timezone = "America/Toronto"
} = trace.payload || {};

        const locale = language === "fr" ? "fr-CA" : "en-US";

        // Create a container and attach a shadow DOM for encapsulated styling.
        const container = document.createElement("div");
        container.style.width = window.innerWidth <= 768 ? "100%" : "800px";
        container.style.maxWidth = "800px";
        container.style.margin = "0 auto";
        const shadow = container.attachShadow({ mode: "open" });

        // Build CSS with direct values (no CSS variables)
        const style = document.createElement("style");
        style.textContent = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
.calendar-container {
  font-family: "Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 10px 25px rgba(156, 39, 176, 0.15);
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  color: #333;
  animation: fadeIn 0.3s ease-out forwards;
  border: 1px solid #eaeaea;
  transition: all 0.3s ease;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background-color: #faf7fc;
  border-bottom: 1px solid #eaeaea;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  position: relative;
}
.calendar-header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #9C27B0, transparent);
  opacity: 0.5;
}
.calendar-title {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-size: 16px;
  background: transparent;
  -webkit-text-fill-color: initial;
}
.calendar-title-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.service-provider, .service-name {
  display: flex;
  align-items: center; 
  height: 24px;
  font-size: 16px;
  color: #9C27B0;
  margin: 3px 0;
  line-height: 24px;
}
.service-provider, .service-name  {
  font-weight: 650;
}

.provider-icon, .service-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
.provider-icon svg, .service-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
}
.calendar-nav {
  display: flex;
  align-items: center;
  gap: 15px;
}
.nav-btn {
  background: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: #9C27B0;
}
.nav-btn:hover {
  background-color: #F8EAFA;
  box-shadow: 0 3px 10px rgba(156, 39, 176, 0.15);
}
.current-date {
  font-weight: 600;
  font-size: 17px;
  background: #F8EAFA;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 500;
  color: #9C27B0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s;
}
.calendar-body {
  display: flex;
  height: 400px;
  background: linear-gradient(to bottom, #ffffff, #fefeff);
}
.days-container {
  width: 47%;
  padding: 15px 10px;
  position: relative;
  background-image: linear-gradient(
      rgba(156, 39, 176, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(156, 39, 176, 0.03) 1px, transparent 1px);
  background-size: 25px 25px;
  background-position: -1px -1px;
}
.calendar-container::before {
  content: "";
  position: absolute;
  top: -3px;
  left: 10%;
  right: 10%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #9C27B0, transparent);
  border-radius: 3px;
  opacity: 0.7;
}
.days-container::after {
  content: "";
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 80px;
  height: 80px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='80' height='80'%3E%3Cpath d='M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z' fill='rgba(156, 39, 176, 0.03)'/%3E%3C/svg%3E");
  opacity: 0.6;
}
.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 600;
  font-size: 13px;
  padding: 15px 0 10px;
  color: #666;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 5px;
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  padding: 5px;
}
.day {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  cursor: pointer;
  position: relative;
  font-size: 14px;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  margin: 0 auto;
  border: 1px solid transparent;
  border-radius: 50%;
  z-index: 1;
}
.day:not(.inactive)::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: transparent;
  transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  z-index: -1;
}
.day:hover:not(.inactive)::before {
  background-color: #F8EAFA;
}
.day:hover:not(.inactive) {
  color: #9C27B0;
  border: 2px solid #9C27B0;
  font-weight: 500;
}
.day.available {
  position: relative;
}
.day.available::after {
  content: "";
  position: absolute;
  bottom: 3px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #9C27B0;
  opacity: 0.7;
  animation: fadeIn 0.3s ease forwards;
}
.day.today {
  border: 1.5px solid #9C27B0;
  position: relative;
  box-shadow: 0 0 0 1px rgba(156, 39, 176, 0.1);
}
.day.today::after {
  content: "";
  position: absolute;
  bottom: 4px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #9C27B0;
}
.day.active {
  background-color: #9C27B0;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(156, 39, 176, 0.15);
}
.day.active::after {
  display: none;
}
.day.inactive {
  color: #ccc;
  cursor: default;
  opacity: 0.7;
}
.times-container {
  width: 53%;
  border-left: 1px solid #eaeaea;
  padding: 20px 10px;
  overflow-y: auto;
  background-color: #fefeff;
  position: relative;
}
.times-container::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: linear-gradient(to bottom, #9C27B0, transparent);
  opacity: 0.1;
}
.time-header {
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
  color: #9C27B0;
  padding: 0 5px;
  line-height: 1.4;
  position: relative;
}
.time-header::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background-color: #9C27B0;
  opacity: 0.5;
  border-radius: 3px;
}
.time-slots {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 5px;
}
.time-slots-columns {
  display: flex;
  gap: 20px;
}
.time-slots-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
.times-container::-webkit-scrollbar {
  width: 6px;
}
.times-container::-webkit-scrollbar-track {
  background: rgba(156, 39, 176, 0.05);
  border-radius: 10px;
}
.times-container::-webkit-scrollbar-thumb {
  background: rgba(156, 39, 176, 0.2);
  border-radius: 10px;
}
.times-container::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 39, 176, 0.3);
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.time-slot {
  padding: 14px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  border: 1px solid #e0e0e0;
  font-size: 14px;
  background-color: white;
  color: #444;
  position: relative;
  overflow: hidden;
  transform-origin: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.time-slot::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, #F8EAFA, transparent);
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.3s;
}
.time-slot.available {
  background-color: white;
}
.time-slot.unavailable {
  background-color: #f4f4f5;
  color: #999;
  cursor: not-allowed;
  opacity: 0.7;
}
.time-slot.selected {
  background-color: #9C27B0;
  color: white;
  border-color: #9C27B0;
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(156, 39, 176, 0.15);
  z-index: 5;
}
.time-slot.selected::after {
  content: "";
  position: absolute;
  right: 16px;
  font-size: 14px;
  opacity: 0.9;
}
.time-slot.available:hover:not(.selected) {
  background-color: #F8EAFA;
  color: #9C27B0;
  border: 2px solid #9C27B0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.07);
}
.time-slot.available:hover:not(.selected)::before {
  opacity: 0.6;
  animation: shimmer 1.5s infinite;
}
.calendar-container.confirmed .day,
.calendar-container.confirmed .time-slot {
  pointer-events: none;
  cursor: default;
}
.calendar-container.confirmed .nav-btn {
  pointer-events: none;
  opacity: 0.5;
  cursor: default;
}
.calendar-footer {
  padding: 15px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #eaeaea;
}
.action-btn {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 14px;
}
.confirm-btn {
  background: #F8EAFA;
  color: #9C27B0;
  font-weight: 600;
  border-radius: 10px;
  padding: 12px 24px;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(156, 39, 176, 0.15);
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}
.confirm-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: translateX(-100%);
}
.confirm-btn:hover:not(:disabled) {
  background: #9C27B0;
  color: white;
  box-shadow: 0 6px 18px rgba(156, 39, 176, 0.15);
}
.confirm-btn:hover:not(:disabled)::before {
  animation: shimmer 1.5s infinite;
}
.confirm-btn:active:not(:disabled) {
  box-shadow: 0 2px 10px rgba(156, 39, 176, 0.15);
}
.confirm-btn:disabled {
  cursor: not-allowed;
  box-shadow: none;
}
.cancel-btn {
  background-color: white;
  color: #333;
  border: 1px solid #eaeaea;
  margin-right: 10px;
}
.cancel-btn:hover {
  background-color: #f5f5f5;
}
.toggle-view {
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  display: flex;
  overflow: hidden;
}
.toggle-btn {
  padding: 8px 12px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}
.toggle-btn.active {
  background-color: #9C27B0;
  color: white;
}

@media (max-width: 768px) {
  .calendar-body {
    flex-direction: column;
    height: auto;
  }
  .days-container,
  .times-container {
    width: 100%;
  }
  .times-container {
    border-left: none;
    border-top: 1px solid #eaeaea;
    max-height: 250px;
  }
  .day {
    height: 40px;
    width: 40px;
    font-size: 13px;
  }
  .nav-btn {
    width: 36px;
    height: 36px;
  }
  .time-header {
    font-size: 15px;
  }
  .action-btn {
    padding: 10px 18px;
    font-size: 14px;
  }
  .service-provider,
  .service-name {
    font-size: 14px;
  }
  @keyframes mobileShimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  .confirm-btn:hover:not(:disabled)::before {
    animation: mobileShimmer 2s infinite;
  }
}

        `;
        shadow.appendChild(style);

        // ---------------------
        // API CALL FUNCTIONS
        // ---------------------
        async function fetchWorkingDays() {
          if (!apiKey || !scheduleId) return [1, 2, 3, 4, 5];
          try {
            const res = await fetch(`https://api.cal.com/v2/schedules/${scheduleId}`, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-06-11",
                "Content-Type": "application/json"
              }
            });
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await res.json();
            console.log("Schedule data:", data);
            const availability = data.data?.availability || [];
            const dayNameToNumber = {
              "Sunday": 0,
              "Monday": 1,
              "Tuesday": 2,
              "Wednesday": 3,
              "Thursday": 4,
              "Friday": 5,
              "Saturday": 6
            };
            const workingDaysSet = new Set();
            availability.forEach(item => {
              if (Array.isArray(item.days)) {
                item.days.forEach(dayName => {
                  const dayNum = dayNameToNumber[dayName];
                  if (dayNum !== undefined) {
                    workingDaysSet.add(dayNum);
                  }
                });
              }
            });
            return Array.from(workingDaysSet);
          } catch (err) {
            console.error("Error fetching schedule:", err);
            return [1, 2, 3, 4, 5];
          }
        }

        async function fetchAvailableSlots(selectedDateISO) {
          const start = new Date(selectedDateISO);
          start.setUTCHours(0, 0, 0, 0);
          const end = new Date(selectedDateISO);
          end.setUTCHours(23, 59, 59, 999);
          const url = `https://api.cal.com/v2/slots/available?startTime=${start.toISOString()}&endTime=${end.toISOString()}&eventTypeId=${eventTypeId}&eventTypeSlug=${eventTypeSlug}`;
          try {
            const res = await fetch(url, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-08-13",
                "Content-Type": "application/json"
              }
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const responseBody = await res.json();
            if (!responseBody || typeof responseBody !== "object") {
              throw new Error("Invalid or missing response body from the API");
            }
            if (responseBody.status !== "success") {
              throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
            }
            const slotsObj = responseBody.data?.slots || {};
            const slotsForDate = slotsObj[selectedDateISO] || [];
            return slotsForDate.map(slot => slot.time);
          } catch (err) {
            console.error("Error fetching available slots:", err);
            return [];
          }
        }

        // ---------------------
        // IMPROVED BOOKING FUNCTION
        // ---------------------
        async function createBooking(startTimeISO) {
          try {
            const bookingDate = new Date(startTimeISO);
            const dateStr = formatDate(bookingDate);
            const currentAvailableSlots = await fetchAvailableSlots(dateStr);
            if (!currentAvailableSlots.includes(startTimeISO)) {
              throw new Error("This slot is no longer available. Please select another time.");
            }
            const url = `https://api.cal.com/v2/bookings`;
            const body = {
              start: startTimeISO,
              attendee: { name: fullName, email: email, timeZone: timezone },
              eventTypeId: Number(eventTypeId)
            };
            const res = await fetch(url, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-08-13",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
            });
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status} ${JSON.stringify(await res.text())}`);
            }
            const responseBody = await res.json();
            if (responseBody.status && responseBody.status !== "success") {
              throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
            }
            return responseBody;
          } catch (err) {
            console.error("Booking error:", err);
            showErrorMessage(err.message || "Unable to complete booking. Please try again.");
            return null;
          }
        }

        // ---------------------
        // ERROR DISPLAY FUNCTION
        // ---------------------
        function showErrorMessage(message) {
          const errorOverlay = document.createElement("div");
          errorOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          `;
          const errorMessage = document.createElement("div");
          errorMessage.style.cssText = `
            background-color: #fff0f0;
            border: 1px solid #ffdddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 80%;
          `;
          errorMessage.innerHTML = `
            <div style="color: #d32f2f; font-size: 24px; margin-bottom: 10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="currentColor"/>
              </svg>
            </div>
            <p style="margin: 0; color: #333;">${message}</p>
            <button style="margin-top: 15px; background: #9C27B0; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">OK</button>
          `;
          errorOverlay.appendChild(errorMessage);
          calendarContainer.appendChild(errorOverlay);
          const closeButton = errorMessage.querySelector("button");
          closeButton.addEventListener("click", () => {
            calendarContainer.removeChild(errorOverlay);
            if (state.selectedDate) {
              const dateKey = formatDate(state.selectedDate);
              fetchAvailableSlots(dateKey).then(slots => {
                state.availableSlots[dateKey] = slots;
                renderCalendar();
              });
            }
          });
        }

        // ---------------------
        // EXTENSION INTERNAL STATE
        // ---------------------
        const state = {
          currentDate: new Date(),
          selectedDate: selectedDate ? new Date(selectedDate) : null,
          selectedTime: selectedTime || null,
          availableSlots: {},
          workingDays: await fetchWorkingDays(),
          isConfirmed: false,
          language: language || "en"
        };

        const translations = {
          en: {
            selectDateAndTime: "Select Date & Time",
            selectDate: "Select a date to view available times",
            pleaseSelectDate: "Please select a date first",
            availableTimesFor: "Available times for",
            noAvailableSlots: "No available time slots for this date",
            confirmBooking: "Confirm Booking",
            bookingConfirmed: "Booking Confirmed",
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
          },
          fr: {
            selectDateAndTime: "Sélectionner Date & Heure",
            selectDate: "Sélectionnez une date pour voir les horaires disponibles",
            pleaseSelectDate: "Veuillez d'abord sélectionner une date",
            availableTimesFor: "Horaires disponibles pour",
            noAvailableSlots: "Aucun horaire disponible pour cette date",
            confirmBooking: "Confirmer la Réservation",
            bookingConfirmed: "Réservation Confirmée",
            weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
          }
        }; 

        function getText(key) {
          const lang = translations[state.language] ? state.language : "en";
          return translations[lang][key];
        }

        function formatDate(date) {
          const d = new Date(date);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        }

        function isSameDay(date1, date2) {
          if (!date1 || !date2) return false;
          return formatDate(date1) === formatDate(date2);
        }

        function isToday(date) {
          const now = new Date();
          return isSameDay(date, now);
        }

        function getDefaultActiveDay() {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (state.workingDays.includes(today.getDay())) return today;
          const next = new Date(today);
          while (!state.workingDays.includes(next.getDay())) {
            next.setDate(next.getDate() + 1);
          }
          return next;
        }

        // Initialize default selected date and fetch its slots if not already set.
        if (!state.selectedDate) {
          const defaultDay = getDefaultActiveDay();
          state.selectedDate = defaultDay;
          const dayKey = formatDate(defaultDay);
          const defaultSlots = await fetchAvailableSlots(dayKey);
          state.availableSlots[dayKey] = defaultSlots;
        }

        // ---------------------
        // RENDER CALENDAR COMPONENTS
        // ---------------------
function renderHeader() {
  const header = document.createElement("div");
  header.className = "calendar-header";
  const dateFormatter = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  
  // Create calendar title with provider and service info
  const calendarTitle = document.createElement("div");
  calendarTitle.className = "calendar-title";
  
  // Calendar icon
  const calendarIcon = document.createElement("span");
  calendarIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px"><path fill="#9C27B0" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/></svg>
  `;
  
  // Provider and service information section
  const titleContent = document.createElement("div");
  titleContent.className = "calendar-title-content";
  
  const providerDiv = document.createElement("div");
  providerDiv.className = "service-provider";
  providerDiv.innerHTML = `
    <span class="provider-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="18px" height="18px">
      <path fill="#9C27B0" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 256l64 0c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16L80 384c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
      </svg>
    </span>
    <span>${agentName}</span>
  `;
  

  titleContent.appendChild(providerDiv);
  
  calendarTitle.appendChild(titleContent);
  
  // Calendar navigation section (remains unchanged)
  const calendarNav = document.createElement("div");
  calendarNav.className = "calendar-nav";
  const currentDateEl = document.createElement("div");
  currentDateEl.className = "current-date";
  currentDateEl.textContent = dateFormatter.format(state.currentDate);
  currentDateEl.style.cssText = "background: #F8EAFA; padding: 6px 14px; border-radius: 20px; font-weight: 500; color: #9C27B0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.3s;";
  
  const prevBtn = document.createElement("button");
  prevBtn.className = "nav-btn prev-btn";
  prevBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  prevBtn.addEventListener("click", () => {
    if (!state.isConfirmed) {
      state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, 1);
      renderCalendar();
    }
  });
  
  const nextBtn = document.createElement("button");
  nextBtn.className = "nav-btn next-btn";
  nextBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  nextBtn.addEventListener("click", () => {
    if (!state.isConfirmed) {
      state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 1);
      renderCalendar();
    }
  });
  
  calendarNav.appendChild(currentDateEl);
  calendarNav.appendChild(prevBtn);
  calendarNav.appendChild(nextBtn);
  
  header.appendChild(calendarTitle);
  header.appendChild(calendarNav);
  
  return header;
}
       
	   async function renderCalendarDays() {
          const daysContainer = document.createElement("div");
          daysContainer.className = "days-container";
          const weekdaysDiv = document.createElement("div");
          weekdaysDiv.className = "weekdays";
          const weekdays = getText("weekdays");
          weekdays.forEach(day => {
            const dayEl = document.createElement("div");
            dayEl.textContent = day;
            weekdaysDiv.appendChild(dayEl);
          });
          daysContainer.appendChild(weekdaysDiv);
          const daysDiv = document.createElement("div");
          daysDiv.className = "days";
          let daysToShow = [];
          const firstDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), 1);
          const daysFromPrevMonth = firstDay.getDay();
          const lastDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 0);
          const totalDays = lastDay.getDate();
          for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
            const day = new Date(firstDay);
            day.setDate(day.getDate() - i - 1);
            daysToShow.push({ date: day, inactive: true });
          }
          for (let i = 1; i <= totalDays; i++) {
            const day = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), i);
            daysToShow.push({ date: day, inactive: false });
          }
          const remainingDays = 42 - daysToShow.length;
          for (let i = 1; i <= remainingDays; i++) {
            const day = new Date(lastDay);
            day.setDate(day.getDate() + i);
            daysToShow.push({ date: day, inactive: true });
          }
          const highlightDay = state.selectedDate || getDefaultActiveDay();
          daysToShow.forEach(({ date, inactive }) => {
            const dayEl = document.createElement("div");
            dayEl.className = "day";
            dayEl.textContent = date.getDate();
            if (inactive) {
              dayEl.classList.add("inactive");
            } else {
              const dayOfWeek = date.getDay();
              if (!state.workingDays.includes(dayOfWeek)) {
                dayEl.classList.add("inactive");
              } else {
                const todayMidnight = new Date();
                todayMidnight.setHours(0, 0, 0, 0);
                if (date < todayMidnight) {
                  dayEl.classList.add("inactive");
                } else {
                  if (formatDate(date) === formatDate(highlightDay)) {
                    dayEl.classList.add("today");
                  }
                  if (state.selectedDate && isSameDay(date, state.selectedDate)) {
                    dayEl.classList.add("active");
                  }
                  dayEl.classList.add("available");
                  dayEl.addEventListener("click", async () => {
                    state.selectedDate = new Date(date);
                    state.selectedTime = null;
                    const slots = await fetchAvailableSlots(formatDate(date));
                    state.availableSlots[formatDate(date)] = slots;
                    renderCalendar();
                  });
                }
              }
            }
            daysDiv.appendChild(dayEl);
          });
          daysContainer.appendChild(daysDiv);
          return daysContainer;
        }

        async function renderTimeSlots() {
          const timesContainer = document.createElement("div");
          timesContainer.className = "times-container";
          const timeHeader = document.createElement("div");
          timeHeader.className = "time-header";
          if (state.selectedDate) {
            const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: "long", month: "long", day: "numeric" });
            timeHeader.textContent = `${getText("availableTimesFor")} ${dateFormatter.format(state.selectedDate)}`;
          } else {
            timeHeader.innerHTML = `<span style="display: inline-block; animation: pulse 2s infinite ease-in-out;">${getText("selectDate")}</span>`;
          }
          timesContainer.appendChild(timeHeader);
          const timeSlotsDiv = document.createElement("div");
          timeSlotsDiv.className = "time-slots";
          if (state.selectedDate) {
            const dateKey = formatDate(state.selectedDate);
            const timeSlots = state.availableSlots[dateKey] || [];
            if (timeSlots.length === 0) {
              const noSlots = document.createElement("div");
              noSlots.textContent = getText("noAvailableSlots");
              noSlots.style.textAlign = "center";
              noSlots.style.padding = "20px 0";
              noSlots.style.color = "#666";
              timeSlotsDiv.appendChild(noSlots);
            } else {
              const columnsContainer = document.createElement("div");
              columnsContainer.className = "time-slots-columns";
              const amColumn = document.createElement("div");
              amColumn.className = "time-slots-column";
              const pmColumn = document.createElement("div");
              pmColumn.className = "time-slots-column";
              const amHeader = document.createElement("div");
              amHeader.textContent = "AM";
              amHeader.style.fontWeight = "bold";
              amHeader.style.marginBottom = "5px";
              amColumn.appendChild(amHeader);
              const pmHeader = document.createElement("div");
              pmHeader.textContent = "PM";
              pmHeader.style.fontWeight = "bold";
              pmHeader.style.marginBottom = "5px";
              pmColumn.appendChild(pmHeader);
              timeSlots.forEach((timeISO, index) => {
                const dateTime = new Date(timeISO);
                const hours = dateTime.getHours();
                const timeSlot = document.createElement("div");
                timeSlot.className = "time-slot available";
                timeSlot.style.animation = `slideIn ${0.2 + index * 0.1}s ease-out forwards`;
                if (state.selectedTime === timeISO) {
                  timeSlot.classList.add("selected");
                }
                const timeFormatter = new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", hour12: true });
                timeSlot.textContent = timeFormatter.format(dateTime);
                timeSlot.addEventListener("click", () => {
                  if (!state.isConfirmed) {
                    state.selectedTime = timeISO;
                    renderCalendar();
                  }
                });
                if (hours < 12) {
                  amColumn.appendChild(timeSlot);
                } else {
                  pmColumn.appendChild(timeSlot);
                }
              });
              columnsContainer.appendChild(amColumn);
              columnsContainer.appendChild(pmColumn);
              timeSlotsDiv.appendChild(columnsContainer);
            }
          } else {
            const noDate = document.createElement("div");
            noDate.textContent = getText("pleaseSelectDate");
            noDate.style.textAlign = "center";
            noDate.style.padding = "20px 0";
            noDate.style.color = "#666";
            timeSlotsDiv.appendChild(noDate);
          }
          timesContainer.appendChild(timeSlotsDiv);
          return timesContainer;
        }

   function renderFooter() {
  const footer = document.createElement("div");
  footer.className = "calendar-footer";
  const confirmBtn = document.createElement("button");
  confirmBtn.className = "action-btn confirm-btn";
  
  if (state.isConfirmed) {
    const isEnglish = locale === "en-US";
    confirmBtn.textContent = isEnglish ? "Booked ✓" : "Réservée ✓";
    confirmBtn.style.backgroundImage = "none";
    confirmBtn.style.backgroundColor = "#4CAF50";
    confirmBtn.style.color = "white";
    confirmBtn.disabled = true;
  } else {
    confirmBtn.textContent = getText("confirmBooking");
    if (!state.selectedDate || !state.selectedTime) { 
      confirmBtn.disabled = true; 
    }
    
    confirmBtn.addEventListener("click", async () => {
      if (state.selectedDate && state.selectedTime) {
        // Show loading state
        confirmBtn.disabled = true;
        confirmBtn.textContent = getText('confirmBooking') + '...';
        
        try {
          // 1. First completes the booking with Cal.com
          const bookingResponse = await createBooking(state.selectedTime);
          
          if (bookingResponse) {
            // 2. Then updates the UI to show confirmation
            state.isConfirmed = true;
            renderCalendar();
            
            // 3. Finally shows the success animation
            const successOverlay = document.createElement('div');
            successOverlay.style.cssText = `
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(156, 39, 176, 0.05);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000;
              opacity: 0;
              transition: opacity 0.5s;
              pointer-events: none;
            `;
            
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
              background-color: white;
              border-radius: 15px;
              padding: 20px 30px;
              box-shadow: 0 10px 30px rgba(156, 39, 176, 0.15);
              text-align: center;
              transform: translateY(20px);
              transition: transform 0.5s, opacity 0.5s;
              opacity: 0;
            `;
            
            const checkmark = document.createElement('div');
            checkmark.innerHTML = `
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30" fill="#F8EAFA"/>
                <path d="M20 30L27 37L40 23" stroke="#9C27B0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            `;
            
            successMessage.appendChild(checkmark);
            const successText = document.createElement('p');
            successText.textContent = getText('bookingConfirmed') + '!';
            successText.style.cssText = `
              font-size: 18px;
              font-weight: 600;
              margin-top: 15px;
              color: #9C27B0;
            `;
            successMessage.appendChild(successText);
            successOverlay.appendChild(successMessage);
            calendarContainer.appendChild(successOverlay);
            
            // Animation sequence
            setTimeout(() => {
              successOverlay.style.opacity = '1';
              successMessage.style.opacity = '1';
              successMessage.style.transform = 'translateY(0)';
              
              setTimeout(() => {
                // Start hiding animation
                successOverlay.style.opacity = '0';
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                  // Remove overlay after animation completes
                  calendarContainer.removeChild(successOverlay);
                  
                  // 4. FINALLY - Send data to Voiceflow (LAST STEP)
                  const dateStr = formatDate(state.selectedDate);
                  const timeFormatter = new Intl.DateTimeFormat(locale, { 
                    hour: 'numeric', 
                    minute: '2-digit', 
                    hour12: true 
                  });
                  const formattedDate = new Intl.DateTimeFormat(locale, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(state.selectedDate);
  const formattedTime = new Intl.DateTimeFormat(locale, { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  }).format(new Date(state.selectedTime));
  const formattedDateTime = `${formattedDate} ${language === "fr" ? "à" : "at"} ${formattedTime}`;

                  
				   const formData = { 
      fullName,
      email,
      date: dateStr,
      time: state.selectedTime,
      formattedDate,
      formattedTime,
      formattedDateTime
                    };
				  
		
  
  window.voiceflow.chat.interact({
    type: "complete",
    payload: { 
      fullName,
      email,
      date: dateStr,
      time: state.selectedTime,
      formattedDate,
      formattedTime,
      formattedDateTime
    }
  });


		  
                  
                  
                }, 500); // End of hide animation
              }, 2500); // Show duration before hiding
            }, 100); // Start of show animation
          }
        } catch (err) {
          console.error("Booking error:", err);
          confirmBtn.disabled = false;
          confirmBtn.textContent = getText("confirmBooking");
          showErrorMessage(err.message || "Unable to complete booking. Please try again.");
        }
      }
    });
  }
  
  footer.appendChild(confirmBtn);
  return footer;
}
        async function renderCalendar() {
          calendarContainer.innerHTML = "";
          if (state.isConfirmed) {
            calendarContainer.classList.add("confirmed");
          } else {
            calendarContainer.classList.remove("confirmed");
          }
          calendarContainer.appendChild(renderHeader());
          const calendarBody = document.createElement("div");
          calendarBody.className = "calendar-body";
          calendarBody.appendChild(await renderCalendarDays());
          calendarBody.appendChild(await renderTimeSlots());
          calendarContainer.appendChild(calendarBody);
          calendarContainer.appendChild(renderFooter());
          shadow.innerHTML = "";
          shadow.appendChild(style);
          shadow.appendChild(calendarContainer);
        }

        const calendarContainer = document.createElement("div");
        calendarContainer.className = "calendar-container";
        renderCalendar();
        element.appendChild(container);
        window.addEventListener("resize", () => {
          container.style.width = window.innerWidth <= 768 ? "100%" : "800px";
        });
      }
    };

/************** EXTENSION #11: BookingInformationExtension **************/
    const BookingInformationExtension = {
      name: "BookingInformation",
      type: "response",
      match: ({ trace }) => trace.type === `ext_booking_inf_inf` || trace.payload?.name === `ext_booking_inf`,
      render: ({ trace, element }) => {
        const { language } = trace.payload || { language: 'FR' };
        const isEnglish = language === 'en';
        
        
        // Create the form
        const formContainer = document.createElement("form");
        formContainer.setAttribute("novalidate", "true");
        formContainer.innerHTML = `
		<style>
    /* ========== Error Components ========== */
    .error-container {
      width: 100%;
      margin: 2px 0;
      box-sizing: border-box;
    }
    .error-message {
      display: none;
      padding: 5px;
      border: 1px solid #e8e8e8;
      border-radius: 6px;
      background-color: #fff;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      font-size: 14px;
      align-items: center;
    }
    .error-icon {
      background-color: red;
      color: #fff;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 15px;
      flex-shrink: 0;
    }
    
    /* ========== Form Inputs & Layout ========== */
    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .bold-label {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 8px;
      display: block;
    }
    input[type="text"],
    input[type="email"],
    input[type="tel"] {
      width: 100%;
      min-width: 200px;
      max-width: 600px;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 6px;
      padding: 12px 15px;
      background: #fff;
      font-size: 16px;
      outline: none;
      box-sizing: border-box;
      height: 50px;
    }
    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="tel"]:focus {
      border: 2px solid #9C27B0;
    }
    
    /* ========== Buttons ========== */
    .submit-btn {
      color: #9C27B0;
      background-color: #F8EAFA;
      border: none;
      padding: 15px;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
      transition: background-color 0.2s, color 0.2s;
      width: 100%;
      font-weight: 600;
    }
    .submit-btn:hover {
      color: #fff;
      background-color: #9C27B0;
    }
    .submit-btn:disabled {
      background-color: #4CAF50;
      color: white;
      cursor: not-allowed;
    }
    
    /* Disabled state - preserve pointer-events to allow cursor display */
    .form-disabled input {
      background-color: #f8f8f8;
      opacity: 0.8;
      cursor: not-allowed;
    }
    
    /* Add not-allowed cursor to all disabled elements */
    input:disabled, 
    button:disabled {
      cursor: not-allowed;
    }
  </style>
          <div>
            <label for="full-name" class="bold-label">${isEnglish ? 'Full Name' : 'Nom complet'}</label>
            <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required />
            <div class="error-container">
              <div class="error-message" id="errorFullName">
                <div class="error-icon">!</div>
                <span>${isEnglish ? 'Full Name is required.' : 'Le nom complet est obligatoire.'}</span>
              </div>
            </div>
          </div>
          
          <div>
            <label for="email" class="bold-label">Email</label>
            <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required />
            <div class="error-container">
              <div class="error-message" id="errorEmail">
                <div class="error-icon">!</div>
                <span>${isEnglish ? 'A valid email is required.' : "Une adresse email valide est obligatoire."}</span>
              </div>
            </div>
          </div>
          
          <div>
            <label for="phone" class="bold-label">${isEnglish ? 'Phone Number' : 'Numéro de téléphone'}</label>
            <input type="tel" id="phone" name="phone" placeholder="${isEnglish ? 'Enter your phone number' : 'Entrez votre numéro de téléphone'}" required />
            <div class="error-container">
              <div class="error-message" id="errorPhone">
                <div class="error-icon">!</div>
                <span>${isEnglish ? 'A valid phone number is required.' : "Un numéro de téléphone valide est obligatoire."}</span>
              </div>
            </div>
          </div>
          
          <button type="button" class="submit-btn" id="submit-button">
            ${isEnglish ? 'Submit' : 'Soumettre'}
          </button>
        `;

        element.appendChild(formContainer);

        // Input validation
        formContainer.querySelector("#full-name").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorFullName").style.display = "none";
        });
        
        formContainer.querySelector("#email").addEventListener("input", function() {
          if (isValidEmail(this.value.trim())) formContainer.querySelector("#errorEmail").style.display = "none";
        });
        
        formContainer.querySelector("#phone").addEventListener("input", function() {
          if (isValidPhoneNumber(this.value.trim())) formContainer.querySelector("#errorPhone").style.display = "none";
        });
        
        // Form submission
        formContainer.querySelector("#submit-button").addEventListener("click", () => {
          // Hide all error messages first
          formContainer.querySelectorAll(".error-message").forEach(errorEl => {
            errorEl.style.display = "none";
          });
          
          // Validate inputs
          const fullName = formContainer.querySelector("#full-name").value.trim();
          const email = formContainer.querySelector("#email").value.trim();
          const phone = formContainer.querySelector("#phone").value.trim();
          let isValid = true;
          
          if (!fullName) {
            formContainer.querySelector("#errorFullName").style.display = "flex";
            isValid = false;
          }
          
          if (!email || !isValidEmail(email)) {
            formContainer.querySelector("#errorEmail").style.display = "flex";
            isValid = false;
          }
          
          if (!phone || !isValidPhoneNumber(phone)) {
            formContainer.querySelector("#errorPhone").style.display = "flex";
            isValid = false;
          }
          
          if (!isValid) {
            return;
          }
          
          // Apply disabled styling but don't prevent pointer events
          formContainer.classList.add('form-disabled');
          
          // Explicitly disable all input elements and buttons
          // This sets the disabled attribute but still allows cursor effects
          const inputs = formContainer.querySelectorAll('input');
          inputs.forEach(input => {
            input.disabled = true;
          });
          
          const submitButton = formContainer.querySelector("#submit-button");
          submitButton.disabled = true;
          submitButton.textContent = isEnglish ? "Processing..." : "Traitement...";
          
          // Prepare form data
          const formData = {
            fullName,
            email,
            phone: formatPhoneNumber(phone)
          };
          
          // If Voiceflow integration is needed
       
            window.voiceflow.chat.interact({
              type: "complete",
              payload: {
            fullName,
            email,
            phone: formatPhoneNumber(phone)
          }
            });

        });
      }
    };

/************** EXTENSION #12: RescheduleCalendarExtension **************/
    const RescheduleCalendarExtension = {
      name: 'RescheduleCalendar',
      type: 'response',
      match: ({ trace }) =>
        trace.type === 'ext_reschedule_calendar' || trace.payload?.name === 'ext_reschedule_calendar',
      render: async ({ trace, element }) => {
        // --- Extract required payload values with fallbacks ---
        const {
          email = "john@example.com",
  agentName = "Dr. Sophie Martin", // Add this line
          apiKey = "",
            startTime = "4/11/2025, 3:00:00 PM", // Add this line for the current appointment

          scheduleId = "",
          eventTypeId = "1",
          eventTypeSlug = "default-event",
          slots = {},
          selectedDate = '', 
          selectedTime = '',
          language = 'en',
          timezone = 'America/Toronto',
          uid = ""                // UID for rescheduling
        } = trace.payload || {};

        const locale = language === 'fr' ? 'fr-CA' : 'en-US';
        const highlightColor = '#9C27B0';

        // Create a container and attach a shadow DOM for encapsulated styling.
        const container = document.createElement("div");
        container.style.width = window.innerWidth <= 768 ? "100%" : "800px";
        container.style.maxWidth = "800px";
        container.style.margin = "0 auto";
        const shadow = container.attachShadow({ mode: 'open' });

        // Build CSS with direct values (no CSS variables)
        const style = document.createElement("style");
        style.textContent = `
       @keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
.calendar-container {
  font-family: "Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 10px 25px rgba(156, 39, 176, 0.15);
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  color: #333;
  animation: fadeIn 0.3s ease-out forwards;
  border: 1px solid #eaeaea;
  transition: all 0.3s ease;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background-color: #faf7fc;
  border-bottom: 1px solid #eaeaea;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  position: relative;
}
.calendar-header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #9C27B0, transparent);
  opacity: 0.5;
}
.calendar-title {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-size: 16px;
  background: transparent;
  -webkit-text-fill-color: initial;
}
.calendar-title-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.service-provider, .service-name {
  display: flex;
  align-items: center; 
  height: 24px;
  font-size: 16px;
  color: #9C27B0;
  margin: 3px 0;
  line-height: 24px;
  font-weight: 650;
}


.provider-icon, .service-icon, .appointment-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
.provider-icon svg, .service-icon svg,  .appointment-icon svg{
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
}
.calendar-nav {
  display: flex;
  align-items: center;
  gap: 15px;
}
.nav-btn {
  background: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: #9C27B0;
}
.nav-btn:hover {
  background-color: #F8EAFA;
  box-shadow: 0 3px 10px rgba(156, 39, 176, 0.15);
}
.current-date {
  font-weight: 600;
  font-size: 17px;
  background: #F8EAFA;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 500;
  color: #9C27B0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s;
}
.calendar-body {
  display: flex;
  height: 400px;
  background: linear-gradient(to bottom, #ffffff, #fefeff);
}
.days-container {
  width: 47%;
  padding: 15px 10px;
  position: relative;
  background-image: linear-gradient(
      rgba(156, 39, 176, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(156, 39, 176, 0.03) 1px, transparent 1px);
  background-size: 25px 25px;
  background-position: -1px -1px;
}
.calendar-container::before {
  content: "";
  position: absolute;
  top: -3px;
  left: 10%;
  right: 10%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #9C27B0, transparent);
  border-radius: 3px;
  opacity: 0.7;
}
.days-container::after {
  content: "";
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 80px;
  height: 80px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='80' height='80'%3E%3Cpath d='M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z' fill='rgba(156, 39, 176, 0.03)'/%3E%3C/svg%3E");
  opacity: 0.6;
}
.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 600;
  font-size: 13px;
  padding: 15px 0 10px;
  color: #666;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 5px;
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  padding: 5px;
}
.day {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  cursor: pointer;
  position: relative;
  font-size: 14px;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  margin: 0 auto;
  border: 1px solid transparent;
  border-radius: 50%;
  z-index: 1;
}
.day:not(.inactive)::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: transparent;
  transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  z-index: -1;
}
.day:hover:not(.inactive)::before {
  background-color: #F8EAFA;
}
.day:hover:not(.inactive) {
  color: #9C27B0;
  border: 2px solid #9C27B0;
  font-weight: 500;
}
.day.available {
  position: relative;
}
.day.available::after {
  content: "";
  position: absolute;
  bottom: 3px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #9C27B0;
  opacity: 0.7;
  animation: fadeIn 0.3s ease forwards;
}
.day.today {
  border: 1.5px solid #9C27B0;
  position: relative;
  box-shadow: 0 0 0 1px rgba(156, 39, 176, 0.1);
}
.day.today::after {
  content: "";
  position: absolute;
  bottom: 4px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #9C27B0;
}
.day.active {
  background-color: #9C27B0;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(156, 39, 176, 0.15);
}
.day.active::after {
  display: none;
}
.day.inactive {
  color: #ccc;
  cursor: default;
  opacity: 0.7;
}
.times-container {
  width: 53%;
  border-left: 1px solid #eaeaea;
  padding: 20px 10px;
  overflow-y: auto;
  background-color: #fefeff;
  position: relative;
}
.times-container::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: linear-gradient(to bottom, #9C27B0, transparent);
  opacity: 0.1;
}
.time-header {
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
  color: #9C27B0;
  padding: 0 5px;
  line-height: 1.4;
  position: relative;
}
.time-header::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background-color: #9C27B0;
  opacity: 0.5;
  border-radius: 3px;
}
.time-slots {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 5px;
}
.time-slots-columns {
  display: flex;
  gap: 20px;
}
.time-slots-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
.times-container::-webkit-scrollbar {
  width: 6px;
}
.times-container::-webkit-scrollbar-track {
  background: rgba(156, 39, 176, 0.05);
  border-radius: 10px;
}
.times-container::-webkit-scrollbar-thumb {
  background: rgba(156, 39, 176, 0.2);
  border-radius: 10px;
}
.times-container::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 39, 176, 0.3);
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.time-slot {
  padding: 14px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  border: 1px solid #e0e0e0;
  font-size: 14px;
  background-color: white;
  color: #444;
  position: relative;
  overflow: hidden;
  transform-origin: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.time-slot::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, #F8EAFA, transparent);
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.3s;
}
.time-slot.available {
  background-color: white;
}
.time-slot.unavailable {
  background-color: #f4f4f5;
  color: #999;
  cursor: not-allowed;
  opacity: 0.7;
}
.time-slot.selected {
  background-color: #9C27B0;
  color: white;
  border-color: #9C27B0;
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(156, 39, 176, 0.15);
  z-index: 5;
}
.time-slot.selected::after {
  content: "";
  position: absolute;
  right: 16px;
  font-size: 14px;
  opacity: 0.9;
}
.time-slot.available:hover:not(.selected) {
  background-color: #F8EAFA;
  color: #9C27B0;
  border: 2px solid #9C27B0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.07);
}
.time-slot.available:hover:not(.selected)::before {
  opacity: 0.6;
  animation: shimmer 1.5s infinite;
}
.calendar-container.confirmed .day,
.calendar-container.confirmed .time-slot {
  pointer-events: none;
  cursor: default;
}
.calendar-container.confirmed .nav-btn {
  pointer-events: none;
  opacity: 0.5;
  cursor: default;
}
.calendar-footer {
  padding: 15px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #eaeaea;
}
.action-btn {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 14px;
}
.confirm-btn {
  background: #F8EAFA;
  color: #9C27B0;
  font-weight: 600;
  border-radius: 10px;
  padding: 12px 24px;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(156, 39, 176, 0.15);
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}
.confirm-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: translateX(-100%);
}
.confirm-btn:hover:not(:disabled) {
  background: #9C27B0;
  color: white;
  box-shadow: 0 6px 18px rgba(156, 39, 176, 0.15);
}
.confirm-btn:hover:not(:disabled)::before {
  animation: shimmer 1.5s infinite;
}
.confirm-btn:active:not(:disabled) {
  box-shadow: 0 2px 10px rgba(156, 39, 176, 0.15);
}
.confirm-btn:disabled {
  cursor: not-allowed;
  box-shadow: none;
}
.cancel-btn {
  background-color: white;
  color: #333;
  border: 1px solid #eaeaea;
  margin-right: 10px;
}
.cancel-btn:hover {
  background-color: #f5f5f5;
}
.toggle-view {
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  display: flex;
  overflow: hidden;
}
.toggle-btn {
  padding: 8px 12px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}
.toggle-btn.active {
  background-color: #9C27B0;
  color: white;
}

@media (max-width: 768px) {
  .calendar-body {
    flex-direction: column;
    height: auto;
  }
  .days-container,
  .times-container {
    width: 100%;
  }
  .times-container {
    border-left: none;
    border-top: 1px solid #eaeaea;
    max-height: 250px;
  }
  .day {
    height: 40px;
    width: 40px;
    font-size: 13px;
  }
  .nav-btn {
    width: 36px;
    height: 36px;
  }
  .time-header {
    font-size: 15px;
  }
  .action-btn {
    padding: 10px 18px;
    font-size: 14px;
  }
  .service-provider,
  .service-name {
    font-size: 14px;
  }
  @keyframes mobileShimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  .confirm-btn:hover:not(:disabled)::before {
    animation: mobileShimmer 2s infinite;
  }
}
          
          
          .reschedule-reason {
            display: flex;
            flex-direction: column;
            padding: 20px;
            border-top: 1px solid #eaeaea;
            background-color: #fafafa;
          }
          .reschedule-reason label {
            font-size: 14px;
            margin-bottom: 6px;
            font-weight: 600;
            color: #555;
          }
          .reschedule-reason #details {
            resize: vertical;
            padding: 10px;
            font-size: 14px;
            border-radius: 6px;
            border: 1px solid #ccc;
            font-family: inherit;
            min-height: 60px;
          }
          .reschedule-reason #details:focus {
            border: 2px solid ${highlightColor};
            outline: none;
          }
          .error-message {
            color: ${highlightColor};
            font-size: 13px;
            margin-top: 4px;
            display: none;
          }
		  
    #details {
      resize: vertical;
      min-height: 100px;
      max-height: 200px;
    }
          


.appointment-date {
  display: flex;
  align-items: center; 
  height: 24px;
  font-size: 16px;
  color: #7b7b7b;
  margin: 3px 0;
  line-height: 24px;
  font-weight: 500;
}



        `;
        shadow.appendChild(style);

        // ---------------------
        // API CALL FUNCTIONS
        // ---------------------
        async function fetchWorkingDays() {
          if (!apiKey || !scheduleId) return [1, 2, 3, 4, 5];
          try {
            const res = await fetch(`https://api.cal.com/v2/schedules/${scheduleId}`, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-06-11",
                "Content-Type": "application/json"
              }
            });
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await res.json();
            console.log("Schedule data:", data);
            const availability = data.data?.availability || [];
            const dayNameToNumber = {
              "Sunday": 0,
              "Monday": 1,
              "Tuesday": 2,
              "Wednesday": 3,
              "Thursday": 4,
              "Friday": 5,
              "Saturday": 6
            };
            const workingDaysSet = new Set();
            availability.forEach(item => {
              if (Array.isArray(item.days)) {
                item.days.forEach(dayName => {
                  const dayNum = dayNameToNumber[dayName];
                  if (dayNum !== undefined) {
                    workingDaysSet.add(dayNum);
                  }
                });
              }
            });
            return Array.from(workingDaysSet);
          } catch (err) {
            console.error("Error fetching schedule:", err);
            return [1, 2, 3, 4, 5];
          }
        }

        async function fetchAvailableSlots(selectedDateISO) {
          const start = new Date(selectedDateISO);
          start.setUTCHours(0, 0, 0, 0);
          const end = new Date(selectedDateISO);
          end.setUTCHours(23, 59, 59, 999);
          const url = `https://api.cal.com/v2/slots/available?startTime=${start.toISOString()}&endTime=${end.toISOString()}&eventTypeId=${eventTypeId}&eventTypeSlug=${eventTypeSlug}`;
          try {
            const res = await fetch(url, {
              method: 'GET',
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-08-13",
                "Content-Type": "application/json"
              }
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const responseBody = await res.json();
            console.log("Available slots API response:", responseBody);
            if (!responseBody || typeof responseBody !== 'object') {
              throw new Error("Invalid or missing response body from the API");
            }
            if (responseBody.status !== "success") {
              throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
            }
            const slotsObj = responseBody.data?.slots || {};
            const slotsForDate = slotsObj[selectedDateISO] || [];
            return slotsForDate.map(slot => slot.time);
          } catch (err) {
            console.error("Error fetching available slots:", err);
            return [];
          }
        }

        // New function for rescheduling a booking using the UID.
        async function rescheduleBooking(startTimeISO, reason) {
          const url = `https://api.cal.com/v2/bookings/${uid}/reschedule`;
          const body = {
            rescheduledBy: email,
            reschedulingReason: reason,
            start: startTimeISO
          };
          try {
            const res = await fetch(url, {
              method: 'POST',
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-08-13",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
            });
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status} ${JSON.stringify(await res.text())}`);
            }
            const responseBody = await res.json();
            if (responseBody.status && responseBody.status !== "success") {
              throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
            }
            return responseBody;
          } catch (err) {
            console.error("Error rescheduling booking:", err);
            throw err;
          }
        }
        

// Then add this function to format the date and time
function formatAppointmentDate(dateTimeString, language) {
  const date = new Date(dateTimeString);
  
  // Format date with weekday, day, month, year
  const formatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  };
  
  let locale = language === 'fr' ? 'fr-FR' : 'en-US';
  const formatter = new Intl.DateTimeFormat(locale, formatOptions);
  let formattedDate = formatter.format(date);
  
  // Replace the comma or add "at"/"à" between date and time
  if (language === 'fr') {
    formattedDate = formattedDate.replace(' à ', ' à ');
  } else {
    formattedDate = formattedDate.replace(' at ', ' at ');
  }
  
  return formattedDate;
}

        // Function to show error messages to the user.
        function showErrorMessage(message) {
          const errorOverlay = document.createElement('div');
          errorOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          `;
          
          const errorMessage = document.createElement('div');
          errorMessage.style.cssText = `
            background-color: #fff0f0;
            border: 1px solid #ffdddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 80%;
          `;
          
          errorMessage.innerHTML = `
            <div style="color: #d32f2f; font-size: 24px; margin-bottom: 10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="currentColor"/>
              </svg>
            </div>
            <p style="margin: 0; color: #333;">${message}</p>
            <button style="margin-top: 15px; background: #9C27B0; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">OK</button>
          `;
          
          errorOverlay.appendChild(errorMessage);
          calendarContainer.appendChild(errorOverlay);
          
          const closeButton = errorMessage.querySelector('button');
          closeButton.addEventListener('click', () => {
            calendarContainer.removeChild(errorOverlay);
            if (state.selectedDate) {
              const dateKey = formatDate(state.selectedDate);
              fetchAvailableSlots(dateKey).then(slots => {
                state.availableSlots[dateKey] = slots;
                renderCalendar();
              });
            }
          });
        }

        // ---------------------
        // EXTENSION INTERNAL STATE
        // ---------------------
        const state = {
          currentDate: new Date(),
          selectedDate: selectedDate ? new Date(selectedDate) : null,
          selectedTime: selectedTime || null,
          availableSlots: {},
          workingDays: await fetchWorkingDays(),
          isConfirmed: false,
          language: language || 'en',
          reason: "",
          isLoading: false
        };

        const translations = {
          en: {
            selectDateAndTime: "Select Date & Time",
            selectDate: "Select a date to view available times",
            pleaseSelectDate: "Please select a date first",
            availableTimesFor: "Available times for",
            noAvailableSlots: "No available time slots for this date",
            confirmReschedule: "Confirm Reschedule",
            rescheduleConfirmed: "Reschedule Confirmed",
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            reasonLabel: "Reason for rescheduling",
            pleaseProvideReason: "Please provide a reason for rescheduling",
            loading: "Processing..."
          },
          fr: {
            selectDateAndTime: "Sélectionner Date & Heure",
            selectDate: "Sélectionnez une date pour voir les horaires disponibles",
            pleaseSelectDate: "Veuillez d'abord sélectionner une date",
            availableTimesFor: "Horaires disponibles pour",
            noAvailableSlots: "Aucun horaire disponible pour cette date",
            confirmReschedule: "Replanifier le rendez-vous",
            rescheduleConfirmed: "Rendez-vous replanifié",
            weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
            reasonLabel: "Raison de la replanification",
            pleaseProvideReason: "Veuillez fournir une raison pour la replanification",
            loading: "Traitement en cours..."
          }
        };

        function getDefaultActiveDay() {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (state.workingDays.includes(today.getDay())) {
            return today;
          }
          const next = new Date(today);
          while (!state.workingDays.includes(next.getDay())) {
            next.setDate(next.getDate() + 1);
          }
          return next;
        }

        function getText(key) {
          const lang = translations[state.language] ? state.language : 'en';
          return translations[lang][key] || key;
        }

        function formatDate(date) {
          const d = new Date(date);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        }

        function isSameDay(date1, date2) {
          if (!date1 || !date2) return false;
          return formatDate(date1) === formatDate(date2);
        }

        function isToday(date) {
          const now = new Date();
          return isSameDay(date, now);
        }

        if (!state.selectedDate) {
          const defaultDay = getDefaultActiveDay();
          state.selectedDate = defaultDay;
          const dayKey = formatDate(defaultDay);
          const defaultSlots = await fetchAvailableSlots(dayKey);
          state.availableSlots[dayKey] = defaultSlots;
        }

function renderHeader() {
  const header = document.createElement("div");
  header.className = "calendar-header";
  const dateFormatter = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  
  // Create calendar title with provider and service info
  const calendarTitle = document.createElement("div");
  calendarTitle.className = "calendar-title";
  
  // Provider and service information section
  const titleContent = document.createElement("div");
  titleContent.className = "calendar-title-content";
  
  const providerDiv = document.createElement("div");
  providerDiv.className = "service-provider";
  providerDiv.innerHTML = `
    <span class="provider-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="18px" height="18px">
      <path fill="#9C27B0" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 256l64 0c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16L80 384c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
      </svg>
    </span>
    <span>${agentName}</span>
  `;
  


  const appointmentDateDiv = document.createElement("div");
  appointmentDateDiv.className = "appointment-date";
  
  // Add calendar icon - using a different fullName here to avoid conflict
  const dateIcon = document.createElement("span");
  dateIcon.className = "appointment-icon";
  dateIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
      <path fill="#7b7b7b" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/>
    </svg>
  `;
  
  // Add the formatted date text
  const dateTextSpan = document.createElement("span");
  dateTextSpan.textContent = formatAppointmentDate(startTime, language);
  
  // Append both to the appointment div
  appointmentDateDiv.appendChild(dateIcon);
  appointmentDateDiv.appendChild(dateTextSpan);
  
  // Add to title content
  titleContent.appendChild(providerDiv);
  titleContent.appendChild(appointmentDateDiv);
  
  calendarTitle.appendChild(titleContent);
  
  // Calendar navigation section (remains unchanged)
  const calendarNav = document.createElement("div");
  calendarNav.className = "calendar-nav";
  const currentDateEl = document.createElement("div");
  currentDateEl.className = "current-date";
  currentDateEl.textContent = dateFormatter.format(state.currentDate);
  currentDateEl.style.cssText = "background: #F8EAFA; padding: 6px 14px; border-radius: 20px; font-weight: 500; color: #9C27B0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.3s;";
  
  const prevBtn = document.createElement("button");
  prevBtn.className = "nav-btn prev-btn";
  prevBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  prevBtn.addEventListener("click", () => {
    if (!state.isConfirmed) {
      state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, 1);
      renderCalendar();
    }
  });
  
  const nextBtn = document.createElement("button");
  nextBtn.className = "nav-btn next-btn";
  nextBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  nextBtn.addEventListener("click", () => {
    if (!state.isConfirmed) {
      state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 1);
      renderCalendar();
    }
  });
  
  calendarNav.appendChild(currentDateEl);
  calendarNav.appendChild(prevBtn);
  calendarNav.appendChild(nextBtn);
  
  header.appendChild(calendarTitle);
  header.appendChild(calendarNav);
  
  return header;
}
   
        async function renderCalendarDays() {
          const daysContainer = document.createElement("div");
          daysContainer.className = "days-container";
          const weekdaysDiv = document.createElement("div");
          weekdaysDiv.className = "weekdays";
          const weekdays = getText('weekdays');
          weekdays.forEach(day => {
            const dayEl = document.createElement("div");
            dayEl.textContent = day;
            weekdaysDiv.appendChild(dayEl);
          });
          daysContainer.appendChild(weekdaysDiv);
          const daysDiv = document.createElement("div");
          daysDiv.className = "days";
          let daysToShow = [];
          const firstDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), 1);
          const daysFromPrevMonth = firstDay.getDay();
          const lastDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 0);
          const totalDays = lastDay.getDate();
          for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
            const day = new Date(firstDay);
            day.setDate(day.getDate() - i - 1);
            daysToShow.push({ date: day, inactive: true });
          }
          for (let i = 1; i <= totalDays; i++) {
            const day = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), i);
            daysToShow.push({ date: day, inactive: false });
          }
          const remainingDays = 42 - daysToShow.length;
          for (let i = 1; i <= remainingDays; i++) {
            const day = new Date(lastDay);
            day.setDate(day.getDate() + i);
            daysToShow.push({ date: day, inactive: true });
          }
          const highlightDay = state.selectedDate || getDefaultActiveDay();
          daysToShow.forEach(({ date, inactive }) => {
            const dayEl = document.createElement("div");
            dayEl.className = "day";
            dayEl.textContent = date.getDate();
            if (inactive) {
              dayEl.classList.add("inactive");
            } else {
              const dayOfWeek = date.getDay();
              if (!state.workingDays.includes(dayOfWeek)) {
                dayEl.classList.add("inactive");
              } else {
                const todayMidnight = new Date();
                todayMidnight.setHours(0, 0, 0, 0);
                if (date < todayMidnight) {
                  dayEl.classList.add("inactive");
                } else {
                  if (formatDate(date) === formatDate(highlightDay)) {
                    dayEl.classList.add("today");
                  }
                  if (state.selectedDate && isSameDay(date, state.selectedDate)) {
                    dayEl.classList.add("active");
                  }
                  dayEl.classList.add("available");
                  dayEl.addEventListener("click", async () => {
                    state.selectedDate = new Date(date);
                    state.selectedTime = null;
                    const slots = await fetchAvailableSlots(formatDate(date));
                    state.availableSlots[formatDate(date)] = slots;
                    renderCalendar();
                  });
                }
              }
            }
            daysDiv.appendChild(dayEl);
          });
          daysContainer.appendChild(daysDiv);
          return daysContainer;
        }

        async function renderTimeSlots() {
          const timesContainer = document.createElement("div");
          timesContainer.className = "times-container";
          const timeHeader = document.createElement("div");
          timeHeader.className = "time-header";
          if (state.selectedDate) {
            const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' });
            timeHeader.textContent = `${getText('availableTimesFor')} ${dateFormatter.format(state.selectedDate)}`;
          } else {
            timeHeader.innerHTML = `<span style="display: inline-block; animation: pulse 2s infinite ease-in-out;">${getText('selectDate')}</span>`;
          }
          timesContainer.appendChild(timeHeader);
          const timeSlotsDiv = document.createElement("div");
          timeSlotsDiv.className = "time-slots";
          if (state.selectedDate) {
            const dateKey = formatDate(state.selectedDate);
            const timeSlots = state.availableSlots[dateKey] || [];
            if (timeSlots.length === 0) {
              const noSlots = document.createElement("div");
              noSlots.textContent = getText('noAvailableSlots');
              noSlots.style.textAlign = "center";
              noSlots.style.padding = "20px 0";
              noSlots.style.color = "#666";
              timeSlotsDiv.appendChild(noSlots);
            } else {
              const columnsContainer = document.createElement("div");
              columnsContainer.className = "time-slots-columns";
              const amColumn = document.createElement("div");
              amColumn.className = "time-slots-column";
              const pmColumn = document.createElement("div");
              pmColumn.className = "time-slots-column";
              const amHeader = document.createElement("div");
              amHeader.textContent = "AM";
              amHeader.style.fontWeight = "bold";
              amHeader.style.marginBottom = "5px";
              amColumn.appendChild(amHeader);
              const pmHeader = document.createElement("div");
              pmHeader.textContent = "PM";
              pmHeader.style.fontWeight = "bold";
              pmHeader.style.marginBottom = "5px";
              pmColumn.appendChild(pmHeader);
              timeSlots.forEach((timeISO, index) => {
                const dateTime = new Date(timeISO);
                const hours = dateTime.getHours();
                const timeSlot = document.createElement("div");
                timeSlot.className = "time-slot available";
                timeSlot.style.animation = `slideIn ${0.2 + index * 0.1}s ease-out forwards`;
                if (state.selectedTime === timeISO) {
                  timeSlot.classList.add("selected");
                }
                const timeFormatter = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit', hour12: true });
                timeSlot.textContent = timeFormatter.format(dateTime);
                timeSlot.addEventListener("click", () => {
                  if (!state.isConfirmed) {
                    state.selectedTime = timeISO;
                    renderCalendar();
                  }
                });
                if (hours < 12) {
                  amColumn.appendChild(timeSlot);
                } else {
                  pmColumn.appendChild(timeSlot);
                }
              });
              columnsContainer.appendChild(amColumn);
              columnsContainer.appendChild(pmColumn);
              timeSlotsDiv.appendChild(columnsContainer);
            }
          } else {
            const noDate = document.createElement("div");
            noDate.textContent = getText('pleaseSelectDate');
            noDate.style.textAlign = "center";
            noDate.style.padding = "20px 0";
            noDate.style.color = "#666";
            timeSlotsDiv.appendChild(noDate);
          }
          timesContainer.appendChild(timeSlotsDiv);
          return timesContainer;
        }

        function renderReasonSection() {
          const reasonDiv = document.createElement("div");
          reasonDiv.className = "reschedule-reason";
          
          const reasonLabel = document.createElement("label");
          reasonLabel.textContent = getText('reasonLabel');
          reasonDiv.appendChild(reasonLabel);
          
          const textarea = document.createElement("textarea");
		  
		  textarea.id = "details";
          textarea.placeholder = (language === 'fr')
            ? "Pourquoi souhaitez-vous replanifier ce rendez-vous?"
            : "Why do you want to reschedule this appointment?";
          if (state.isConfirmed) {
            textarea.disabled = true;
          }
          textarea.addEventListener("input", (e) => { 
            state.reason = e.target.value; 
            const errorMessage = shadow.querySelector(".error-message");
            if (errorMessage) {
              errorMessage.style.display = "none";
              textarea.style.borderColor = "#ccc";
            }
          });
          reasonDiv.appendChild(textarea);
          
          const errorMessage = document.createElement("div");
          errorMessage.className = "error-message";
          errorMessage.textContent = getText('pleaseProvideReason');
          errorMessage.style.display = "none";
          reasonDiv.appendChild(errorMessage);
          
          return reasonDiv;
        }

        function renderFooter() {
          const footer = document.createElement("div");
          footer.className = "calendar-footer";
          const confirmBtn = document.createElement("button");
          confirmBtn.className = "action-btn confirm-btn";
          
          if (state.isConfirmed) {
            const isEnglish = locale === "en-US";
            confirmBtn.textContent = isEnglish ? "Rescheduled ✓" : "Replanifiée ✓";
            confirmBtn.style.backgroundImage = "none";
            confirmBtn.style.backgroundColor = "#4CAF50";
            confirmBtn.style.color = "white";
            confirmBtn.disabled = true;
          } else {
            confirmBtn.textContent = getText('confirmReschedule');
            confirmBtn.disabled = !state.selectedDate || !state.selectedTime || state.isLoading;
            
            confirmBtn.addEventListener("click", async () => {
              if (state.isConfirmed) return;
              
              const reasonText = state.reason.trim();
              if (!reasonText) {
                const textarea = shadow.querySelector(".reschedule-reason textarea");
                const errorMessage = shadow.querySelector(".error-message");
                errorMessage.style.display = "block";
                textarea.style.borderColor = highlightColor;
                return;
              }
              
              // Show loading state
              confirmBtn.disabled = true;
              confirmBtn.textContent = getText('loading');
              state.isLoading = true;
              
              try {
                // 1. First completes the rescheduling with Cal.com
                const rescheduleResponse = await rescheduleBooking(state.selectedTime, reasonText);
                
                if (rescheduleResponse) {
                  // 2. Then updates the UI to show confirmation
                  state.isConfirmed = true;
                  renderCalendar();
                  
                  // 3. Finally shows the success animation
                  const successOverlay = document.createElement('div');
                  successOverlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(156, 39, 176, 0.05);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.5s;
                    pointer-events: none;
                  `;
                  
                  const successMessage = document.createElement('div');
                  successMessage.style.cssText = `
                    background-color: white;
                    border-radius: 15px;
                    padding: 20px 30px;
                    box-shadow: 0 10px 30px rgba(156, 39, 176, 0.15);
                    text-align: center;
                    transform: translateY(20px);
                    transition: transform 0.5s, opacity 0.5s;
                    opacity: 0;
                  `;
                  
                  const checkmark = document.createElement('div');
                  checkmark.innerHTML = `
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="30" cy="30" r="30" fill="#F8EAFA"/>
                      <path d="M20 30L27 37L40 23" stroke="#9C27B0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  `;
                  
                  successMessage.appendChild(checkmark);
                  const successText = document.createElement('p');
                  successText.textContent = getText('rescheduleConfirmed') + '!';
                  successText.style.cssText = `
                    font-size: 18px;
                    font-weight: 600;
                    margin-top: 15px;
                    color: #9C27B0;
                  `;
                  successMessage.appendChild(successText);
                  successOverlay.appendChild(successMessage);
                  calendarContainer.appendChild(successOverlay);
                  
                  // Animation sequence
                  setTimeout(() => {
                    successOverlay.style.opacity = '1';
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                    
                    setTimeout(() => {
                      // Start hiding animation
                      successOverlay.style.opacity = '0';
                      successMessage.style.opacity = '0';
                      successMessage.style.transform = 'translateY(-20px)';
                      
                      setTimeout(() => {
                        // Remove overlay after animation completes
                        calendarContainer.removeChild(successOverlay);
                        
                        // 4. FINALLY - Send data to Voiceflow (LAST STEP)
                        const dateStr = formatDate(state.selectedDate);
                        const timeFormatter = new Intl.DateTimeFormat(locale, { 
                          hour: 'numeric', 
                          minute: '2-digit', 
                          hour12: true 
                        });
                        const formattedTime = timeFormatter.format(new Date(state.selectedTime));
                        
                        window.voiceflow.chat.interact({
                          type: "complete",
                          payload: { 
                            email,
                            date: dateStr,
                            time: state.selectedTime,
                            formattedDate: new Intl.DateTimeFormat(locale, { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }).format(state.selectedDate),
                            formattedTime: formattedTime,
                            reschedulingReason: reasonText,
                            uid: uid
                          },
                        });
                        
                      }, 500); // End of hide animation
                    }, 2500); // Show duration before hiding
                  }, 100); // Start of show animation
                }
              } catch (err) {
                console.error("Rescheduling error:", err);
                confirmBtn.disabled = false;
                confirmBtn.textContent = getText("confirmReschedule");
                state.isLoading = false;
                showErrorMessage(err.message || "Unable to complete rescheduling. Please try again.");
              }
            });
          }
          
          footer.appendChild(confirmBtn);
          return footer;
        }

        async function renderCalendar() {
          calendarContainer.innerHTML = '';
          if (state.isConfirmed) {
            calendarContainer.classList.add('confirmed');
          } else {
            calendarContainer.classList.remove('confirmed');
          }
          calendarContainer.appendChild(renderHeader());
          const calendarBody = document.createElement("div");
          calendarBody.className = "calendar-body";
          calendarBody.appendChild(await renderCalendarDays());
          calendarBody.appendChild(await renderTimeSlots());
          calendarContainer.appendChild(calendarBody);
          calendarContainer.appendChild(renderReasonSection());
          calendarContainer.appendChild(renderFooter());
          shadow.innerHTML = "";
          shadow.appendChild(style);
          shadow.appendChild(calendarContainer);
        }

        const calendarContainer = document.createElement("div");
        calendarContainer.className = "calendar-container";

        renderCalendar();
        element.appendChild(container);
        window.addEventListener('resize', () => {
          const newWidth = window.innerWidth <= 768 ? "100%" : "800px";
          container.style.width = newWidth;
        });
      }
    };

/************** EXTENSION #13: CancellationCalendarExtension **************/
    const CancellationCalendarExtension = {
      name: 'CancellationCalendar',
      type: 'response',
      match: ({ trace }) =>
        trace.type === 'ext_cancellation_calendar' || trace.payload?.name === 'ext_cancellation_calendar',
      render: async ({ trace, element }) => {
        // --- Extract payload values ---
        const {
          apiKey = "",
          language = 'en',           // 'en' or 'fr'
          timezone = 'America/Toronto',
          uid = ""                   // Booking UID
        } = trace.payload || {};

        // For checking the language and reusing in conditionals
        const locale = language === "fr" ? "fr-CA" : "en-US";
        const highlightColor = '#9C27B0';

        // Create container with shadow DOM
        const container = document.createElement("div");
        container.style.width = window.innerWidth <= 768 ? "100%" : "650px";
        container.style.maxWidth = "650px";
        container.style.margin = "0 auto";
        const shadow = container.attachShadow({ mode: 'open' });

        // Unified CSS (adapted for both extensions)
        const style = document.createElement("style");
        style.textContent = `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .extension-container {
            box-shadow: 0 10px 25px rgba(156, 39, 176, 0.15);
            border-radius: 16px;
            overflow: hidden;
            background: #fff;
            color: #333;
            animation: fadeIn 0.3s ease-out forwards;
            border: 1px solid #eaeaea;
            transition: all 0.3s ease;
            position: relative;
          }
          .extension-header {
            padding: 18px 24px;
            background-color: #faf7fc;
            border-bottom: 1px solid #eaeaea;
            position: relative;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .extension-header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 10%;
            width: 80%;
            height: 3px;
            background: #9C27B0;
            opacity: 0.5;
          }
          .extension-title {
            font-size: 24px;
            font-weight: 700;
            background: #9C27B0;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0;
          }
          .extension-body {
            padding: 20px;
          }
          .booking-card {
            background: #fafafa;
            border: 1px solid #eaeaea;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .booking-card h3 {
            margin: 0 0 10px;
            font-size: 16px;
            font-weight: 600;
            color: ${highlightColor};
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 6px;
          }
          .info-line {
            display: flex;
            margin: 8px 0;
            font-size: 14px;
            line-height: 1.4;
          }
          .info-label {
            font-weight: 600;
            width: 180px;
            min-width: 180px;
            color: #000;
          }
          .info-value {
            flex: 1;
            color: #444;
          }
          .extension-reason {
            display: flex;
            flex-direction: column;
          }
          .extension-reason label {
            font-size: 14px;
            margin-bottom: 6px;
            font-weight: 600;
            color: #555;
          }
          .extension-reason #details {
            resize: vertical;
            padding: 10px;
            font-size: 14px;
            border-radius: 6px;
            border: 1px solid #ccc;
            font-family: inherit;
            min-height: 60px;
          }
          .extension-reason #details:focus {
            border: 2px solid ${highlightColor};
            outline: none;
          }
          .error-message {
            color: ${highlightColor};
            font-size: 13px;
            margin-top: 4px;
            display: none;
          }
          .extension-footer {
            display: flex;
            justify-content: center;
            padding-bottom: 20px;
          }
		  #details {
      resize: vertical;
      min-height: 100px;
      max-height: 200px;
    }
          .action-btn {
            padding: 10px 20px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
            font-size: 14px;
          }
          /* Button CSS matching the Rescheduling Extension (3-phase behavior) */
          .confirm-btn {
            background: #F8EAFA;
            color: #9C27B0;
            font-weight: 600;
            border-radius: 10px;
            padding: 12px 24px;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(156, 39, 176, 0.15);
            position: relative;
            overflow: hidden;
            transition: all 0.3s;
          }
          .confirm-btn:hover:not(:disabled) {
            background: #9C27B0;
            color: white;
            box-shadow: 0 6px 18px rgba(156, 39, 176, 0.15);
          }
          .confirm-btn:active:not(:disabled) {
            box-shadow: 0 2px 10px rgba(156, 39, 176, 0.15);
          }
          .confirm-btn:disabled {
            cursor: not-allowed;
            box-shadow: none;
          }
          .success-overlay {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-color: rgba(156, 39, 176, 0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.5s;
            pointer-events: none;
          }
          .success-message {
            background-color: #fff;
            border-radius: 15px;
            padding: 20px 30px;
            box-shadow: 0 10px 30px rgba(156, 39, 176, 0.15);
            text-align: center;
            transform: translateY(20px);
            transition: transform 0.5s, opacity 0.5s;
            opacity: 0;
          }
          .success-message svg {
            margin-bottom: 10px;
          }
        `;
        shadow.appendChild(style);

        // Internal state
        const state = {
          booking: null,
          reason: "",
          isConfirmed: false,
          isLoading: false
        };

        // API functions
        async function fetchBooking(uid) {
          if (!uid || !apiKey) return null;
          const url = `https://api.cal.com/v2/bookings/${uid}`;
          const options = {
            method: 'GET',
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-08-13",
                "Content-Type": "application/json"
              }
          };
          try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const json = await res.json();
            console.log("Fetched booking details:", json);
            return json.data || null;
          } catch (err) {
            console.error("Error fetching booking details:", err);
            return null;
          }
        }

        async function cancelBooking(uid, reason) {
          const url = `https://api.cal.com/v2/bookings/${uid}/cancel`;
          const body = { cancellationReason: reason };
          const options = {
            method: 'POST',
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-08-13",
                "Content-Type": "application/json"
              },
            body: JSON.stringify(body)
          };
          try {
            const res = await fetch(url, options);
            if (!res.ok)
              throw new Error(`HTTP error! status: ${res.status} ${JSON.stringify(await res.text())}`);
            const responseBody = await res.json();
            if (responseBody.status && responseBody.status !== "success") {
              throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
            }
            return responseBody;
          } catch (err) {
            console.error("Error cancelling booking:", err);
            throw err;
          }
        }

        // Utility functions
        function formatDateRange(startDate, endDate) {
          const dateFormatter = new Intl.DateTimeFormat(locale, {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'//,
              //timeZone: timezone
            });
            const timeFormatter = new Intl.DateTimeFormat(locale, {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false//,
              //timeZone: timezone
            });
            const datePart = dateFormatter.format(startDate);
            let startTime = timeFormatter.format(startDate).replace(":", "h");
            let endTime = timeFormatter.format(endDate).replace(":", "h");
            return `${datePart} de ${startTime} à ${endTime}`;
        }

        // Translation helper with added "cancelled" key
        function t(key) {
          const translations = {
            en: {
              cancelBooking: "Booking Cancellation",
              bookingInfo: "Booking Information",
              bookingNumber: "Booking Number",
              status: "Status",
              title: "Title",
              when: "When",
              host: "Host",
              attendee: "Participant Name",
              email: "Participant Email",
              reasonLabel: "Reason for cancellation",
              confirmCancel: "Confirm Cancellation",
              cancelled: "Cancelled ✓",
              successMessage: "Your booking has been cancelled successfully!",
              loading: "Cancelling..."
            },
            fr: {
              cancelBooking: "Annulation de Réservation",
              bookingInfo: "Informations de Réservation",
              bookingNumber: "Numéro de Réservation",
              status: "Statut",
              title: "Titre",
              when: "Quand",
              host: "Hôte",
              attendee: "Nom Complet Participant",
              email: "Courriel Participant",
              reasonLabel: "Raison de l'annulation",
              confirmCancel: "Confirmer l'Annulation",
              cancelled: "Annulée ✓",
              successMessage: "Votre réservation a été annulée avec succès !",
              loading: "Annulation en cours..."
            }
          };
          const lang = language === 'fr' ? 'fr' : 'en';
          return translations[lang][key] || key;
        }

        // UI Component functions
        function createInfoLine(labelText, valueText) {
          const line = document.createElement("div");
          line.className = "info-line";
          const label = document.createElement("div");
          label.className = "info-label";
          label.textContent = labelText + ":";
          const value = document.createElement("div");
          value.className = "info-value";
          value.textContent = valueText;
          line.appendChild(label);
          line.appendChild(value);
          return line;
        }

        // Updated renderHeader to add the SVG icon before the title
        function renderHeader() {
          const header = document.createElement("div");
          header.className = "extension-header";
          
          // Create icon element from provided SVG
          const icon = document.createElement("span");
          icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
              <path fill="#9C27B0" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/>
            </svg>
          `;
          
          const title = document.createElement("h1");
          title.className = "extension-title";
          title.textContent = state.isConfirmed ? t('cancelled') : t('cancelBooking');
          
          header.appendChild(icon);
          header.appendChild(title);
          return header;
        }

        function renderBody() {
          const body = document.createElement("div");
          body.className = "extension-body";

          // Booking Info Card
          const card = document.createElement("div");
          card.className = "booking-card";
          const infoTitle = document.createElement("h3");
          infoTitle.textContent = t('bookingInfo');
          card.appendChild(infoTitle);

          if (state.booking) {
            if (state.booking.id) {
              card.appendChild(createInfoLine(t('bookingNumber'), state.booking.id));
            }
            let displayStatus = state.booking.status || "";
            if (displayStatus === "cancelled") {
              displayStatus = (language === 'fr') ? "Confirmé" : "Confirmed";
            } else if (language === 'fr' && displayStatus === "accepted") {
              displayStatus = "Actif";
            }
            card.appendChild(createInfoLine(t('status'), displayStatus));
            
            if (state.booking.start && state.booking.end) {
              const startDate = new Date(state.booking.start);
              const endDate = new Date(state.booking.end);
              const formatted = formatDateRange(startDate, endDate);
              card.appendChild(createInfoLine(t('when'), formatted));
            }
            if (state.booking.hosts && state.booking.hosts.length > 0) {
              card.appendChild(createInfoLine(t('host'), state.booking.hosts[0].name));
            }
            if (state.booking.attendees && state.booking.attendees.length > 0) {
              card.appendChild(createInfoLine(t('attendee'), state.booking.attendees[0].name));
              card.appendChild(createInfoLine(t('email'), state.booking.attendees[0].email));
            }
          } else {
            const noBooking = document.createElement("p");
            noBooking.style.color = "#999";
            noBooking.textContent = (language === 'fr')
              ? "Impossible de charger les détails de la réservation."
              : "Unable to load booking details.";
            card.appendChild(noBooking);
          }
          body.appendChild(card);

          // Cancellation Reason
          const reasonDiv = document.createElement("div");
          reasonDiv.className = "extension-reason";
          const reasonLabel = document.createElement("label");
          reasonLabel.textContent = t('reasonLabel');
          reasonDiv.appendChild(reasonLabel);
          
          const textarea = document.createElement("textarea");
		  
		  textarea.id = "details";
          textarea.placeholder = (language === 'fr')
            ? "Raison de l'annulation"
            : "Why are you cancelling?";
          if (state.isConfirmed) {
            textarea.disabled = true;
          }
          textarea.addEventListener("input", (e) => { 
            state.reason = e.target.value; 
            errorMessage.style.display = "none";
            textarea.style.borderColor = "#ccc";
          });
          reasonDiv.appendChild(textarea);
          
          const errorMessage = document.createElement("div");
          errorMessage.className = "error-message";
          errorMessage.textContent = (language === 'fr')
            ? "Veuillez fournir une raison pour l'annulation."
            : "Please provide a reason for cancellation.";
          reasonDiv.appendChild(errorMessage);
          
          body.appendChild(reasonDiv);
          return body;
        }

        function renderFooter() {
  const footer = document.createElement("div");
  footer.className = "extension-footer";
  
  const confirmBtn = document.createElement("button");
  confirmBtn.className = "action-btn confirm-btn";

  if (state.isConfirmed) {
    confirmBtn.textContent = t('cancelled');
    confirmBtn.style.backgroundImage = 'none';
    confirmBtn.style.backgroundColor = '#4CAF50';
    confirmBtn.style.color = 'white';
    confirmBtn.disabled = true;
  } else {
    confirmBtn.textContent = t('confirmCancel');
    confirmBtn.disabled = state.isLoading || !uid;
    
    confirmBtn.addEventListener("click", async () => {
      if (state.isConfirmed) return;
      
      const reasonText = state.reason.trim();
      if (!reasonText) {
        const textarea = shadow.querySelector(".extension-reason textarea");
        const errorMessage = shadow.querySelector(".error-message");
        errorMessage.style.display = "block";
        textarea.style.borderColor = highlightColor;
        return;
      }
      
      // Show loading state
      confirmBtn.disabled = true;
      confirmBtn.textContent = t('loading');
      state.isLoading = true;
      
      try {
        // 1. First complete the cancellation with Cal.com
        const cancellationResponse = await cancelBooking(uid, reasonText);
        
        if (cancellationResponse) {
          // 2. Update UI to show confirmation
          state.isConfirmed = true;
          renderCancellation();
          
          // 3. Show success animation
          const successOverlay = document.createElement('div');
          successOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(156, 39, 176, 0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.5s;
            pointer-events: none;
          `;
          
          const successMessage = document.createElement('div');
          successMessage.style.cssText = `
            background-color: white;
            border-radius: 15px;
            padding: 20px 30px;
            box-shadow: 0 10px 30px rgba(156, 39, 176, 0.15);
            text-align: center;
            transform: translateY(20px);
            transition: transform 0.5s, opacity 0.5s;
            opacity: 0;
          `;
          
          const checkmark = document.createElement('div');
          checkmark.innerHTML = `
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="30" fill="#F8EAFA"/>
              <path d="M20 30L27 37L40 23" stroke="#9C27B0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
          successMessage.appendChild(checkmark);
          
          const successText = document.createElement('p');
          successText.textContent = t('successMessage');
          successText.style.cssText = `
            font-size: 18px;
            font-weight: 600;
            margin-top: 15px;
            color: #9C27B0;
          `;
          successMessage.appendChild(successText);
          successOverlay.appendChild(successMessage);
          cancellationContainer.appendChild(successOverlay);
          
          // Animation sequence
          setTimeout(() => {
            successOverlay.style.opacity = '1';
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
            
            setTimeout(() => {
              // Start hiding animation
              successOverlay.style.opacity = '0';
              successMessage.style.opacity = '0';
              successMessage.style.transform = 'translateY(-20px)';
              
              setTimeout(() => {
                // Remove overlay after animation completes
                cancellationContainer.removeChild(successOverlay);
                
                // 4. FINALLY - Send data to Voiceflow (LAST STEP)
                window.voiceflow.chat.interact({
                  type: "complete",
                  payload: { 
                    uid: uid,
                    reason: reasonText,
                    bookingDetails: {
                      id: state.booking?.id,
                      title: state.booking?.title,
                      originalDate: state.booking?.start,
                      formattedDate: state.booking?.start ? 
                        new Intl.DateTimeFormat(locale, { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }).format(new Date(state.booking.start)) : ''
                    }
                  },
                });
                
              }, 500); // End of hide animation
            }, 2500); // Show duration before hiding
          }, 100); // Start of show animation
        }
      } catch (err) {
        console.error("Cancellation error:", err);
        confirmBtn.disabled = false;
        confirmBtn.textContent = t('confirmCancel');
        state.isLoading = false;
        
        // Show error message
        const errorOverlay = document.createElement("div");
        errorOverlay.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        `;
        const errorMessage = document.createElement("div");
        errorMessage.style.cssText = `
          background-color: #fff0f0;
          border: 1px solid #ffdddd;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 80%;
        `;
        errorMessage.innerHTML = `
          <div style="color: #d32f2f; font-size: 24px; margin-bottom: 10px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="currentColor"/>
            </svg>
          </div>
          <p style="margin: 0; color: #333;">${
            err.message || 
            (language === 'fr' 
              ? "Impossible d'annuler la réservation. Veuillez réessayer." 
              : "Unable to cancel booking. Please try again.")
          }</p>
          <button style="margin-top: 15px; background: #9C27B0; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
            ${language === 'fr' ? "OK" : "OK"}
          </button>
        `;
        errorOverlay.appendChild(errorMessage);
        cancellationContainer.appendChild(errorOverlay);
        
        const closeButton = errorMessage.querySelector("button");
        closeButton.addEventListener("click", () => {
          cancellationContainer.removeChild(errorOverlay);
        });
      }
    });
  }
  
  footer.appendChild(confirmBtn);
  return footer;
}

        function renderSuccessOverlay() {
          const overlay = document.createElement("div");
          overlay.className = "success-overlay";
          
          const msg = document.createElement("div");
          msg.className = "success-message";
          
          const icon = document.createElement("div");
          icon.innerHTML = `
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="30" fill='#F8EAFA'/>
              <path d="M20 30L27 37L40 23" stroke='${highlightColor}' stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
          msg.appendChild(icon);
          
          const textEl = document.createElement("p");
          textEl.style.fontSize = "16px";
          textEl.style.fontWeight = "600";
          textEl.style.color = highlightColor;
          textEl.textContent = t('successMessage');
          msg.appendChild(textEl);
          
          overlay.appendChild(msg);
          return overlay;
        }

        function showSuccessOverlay() {
          const overlay = shadow.querySelector(".success-overlay");
          const msg = shadow.querySelector(".success-message");
          if (overlay && msg) {
            overlay.style.opacity = '1';
            msg.style.opacity = '1';
            msg.style.transform = 'translateY(0)';
            setTimeout(() => {
              overlay.style.opacity = '0';
              msg.style.opacity = '0';
              msg.style.transform = 'translateY(-20px)';
              setTimeout(() => { overlay.remove(); }, 500);
            }, 2500);
          }
        }

        async function renderCancellation() {
          cancellationContainer.innerHTML = "";
          cancellationContainer.appendChild(renderHeader());
          cancellationContainer.appendChild(renderBody());
          cancellationContainer.appendChild(renderFooter());
          if (state.isConfirmed) {
            cancellationContainer.classList.add("confirmed");
          } else {
            cancellationContainer.classList.remove("confirmed");
          }
          const overlay = renderSuccessOverlay();
          cancellationContainer.appendChild(overlay);
        }

        const cancellationContainer = document.createElement("div");
        cancellationContainer.className = "extension-container";

        let bookingData = null;
        if (uid && apiKey) {
          bookingData = await fetchBooking(uid);
        }
        state.booking = bookingData;

        await renderCancellation();

        shadow.appendChild(cancellationContainer);
        element.appendChild(container);

        window.addEventListener('resize', () => {
          container.style.width = window.innerWidth <= 768 ? "100%" : "650px";
        });
      }
    };

window.SearchPropertyFormExtension = SearchPropertyFormExtension;
window.ImageExtension = ImageExtension;
window.LocalisationExtension = LocalisationExtension;
window.CombinedCalculatorsExtension = CombinedCalculatorsExtension;
window.SellPropertyFormExtension = SellPropertyFormExtension;
window.ContactFormExtension = ContactFormExtension;
window.BookingFormExtension = BookingFormExtension;
window.BookingCalendarExtension = BookingCalendarExtension;
window.BookingInformationExtension = BookingInformationExtension;
window.RescheduleCalendarExtension = RescheduleCalendarExtension;
window.CancellationCalendarExtension = CancellationCalendarExtension;
