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

// Categories
const SharedPropertyCategories = {
   Residential: {
      en: [
         "House",
         "Co-ownership House",
         "Intergenerational",
         "Mobile House",
         "Condo",
         "Loft / Studio",
         "Cottage",
         "Farmhouse",
         "Land"
      ],
      fr: [
         "Maison",
         "Maison en copropriété",
         "Intergénération",
         "Maison mobile",
         "Condo",
         "Loft / Studio",
         "Chalet",
         "Fermette",
         "Terrain"
      ],
   },
   Plex: {
      en: ["Duplex", "Triplex", "Quadruplex", "Quintuplex", "MultiPlex"],
      fr: ["Duplex", "Triplex", "Quadruplex", "Quintuplex", "MultiPlex"],
   },
};

// ADDED: House Type lists (en/fr)
const SharedPropertyTypes = {
   en: [
      "Multi-level",
      "Multi-storey",
      "Detached",
      "Semi-detached",
      "Row House",
      "Divided",
      "Undivided",
      "Single-storey",
      "One and a half storeys",
   ],
   fr: [
      "À Paliers multiples",
      "À étages",
      "Détaché",
      "Jumelé",
      "En rangée",
      "Divise",
      "Indivise",
      "Plain-pied",
      "À un étage et demi",
   ],
};

// Sellers
const Sellers = [
   "No Preference",
   "Emma Thompson",
   "Liam Carter",
   "Sophia Martinez",
   "Ethan Brown",
   "Olivia Davis",
   "Noah Wilson",
   "Ava Johnson"
];

function getSellerOptions(isEnglish, includeNoPreference = true) {
   const sellersList = includeNoPreference
       ? Sellers
       : Sellers.filter((seller) => seller !== "No Preference");
   return sellersList
       .map((seller) => {
          const displayName = isEnglish
              ? seller
              : seller === "No Preference"
                  ? "Pas de préférence"
                  : seller;
          return `<option value="${seller}">${displayName}</option>`;
       })
       .join("");
}

function toggleCollapse(element) {
   element.classList.toggle("active");
   const content = element.nextElementSibling;
   content.style.display = content.style.display === "block" ? "none" : "block";
}

// CHANGED: Added logic for {HouseType} to the Airtable formula
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
      const cityFormula =
          cityConditions.length === 1
              ? cityConditions[0]
              : `OR(${cityConditions.join(", ")})`;
      conditions.push(cityFormula);
   }



   // Category filter
   if (category.length > 0) {
      const categoryConditions = category.map((cat) => `{Category} = "${cat}"`);
      const categoryFormula =
          categoryConditions.length === 1
              ? categoryConditions[0]
              : `OR(${categoryConditions.join(", ")})`;
      conditions.push(categoryFormula);
   }

   // ADDED: House Type filter (optional)
   if (houseType.length > 0) {
      // If your Airtable field is something else, rename {HouseType} below
      const houseTypeConditions = houseType.map((ht) => `FIND("${ht}", {Type})`);
      const houseTypeFormula =
          houseTypeConditions.length === 1
              ? houseTypeConditions[0]
              : `OR(${houseTypeConditions.join(", ")})`;
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

// Service Options, Booking, Mappings
const ServiceOptions = [
   {
      value: "Ventes",
      label: {
         en: "Sell",
         fr: "Ventes",
      },
   },
   {
      value: "Achat",
      label: {
         en: "Buy",
         fr: "Achat",
      },
   },
   {
      value: "Information",
      label: {
         en: "Information",
         fr: "Information",
      },
   },
];

const BookingUrls = {
   "Emma Thompson":
       "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
   "Liam Carter":
       "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
   "Sophia Martinez":
       "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
   "Ethan Brown":
       "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
   "Olivia Davis":
       "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
   "Noah Wilson":
       "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
   "Ava Johnson":
       "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
};

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

const NumericOptions = ["1", "2", "3", "4", "5"];
const OptionMappings = {
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

const SharedCities = {
   "North Shore": [
      "Blainville",
      "Boisbriand",
      "Bois-des-Filion",
      "Charlemagne",
      "Chomedey",
      "Deux-Montagnes",
      "Fabreville",
      "Gore",
      "Kirkland",
      "L'Assomption",
      "L'Épiphanie",
      "La Plaine",
      "Lachenaie",
      "Lafontaine",
      "Lavaltrie",
      "Laval",
      "Lorraine",
      "Le Gardeur",
      "Mascouche",
      "Mirabel",
      "Oka",
      "Pointe-Calumet",
      "Repentigny",
      "Rosemère",
      "Saint-Colomban",
      "Saint-Eustache",
      "Saint-Jérôme",
      "Saint-Joseph-du-Lac",
      "Saint-Lin/Laurentides",
      "Saint-Placide",
      "Saint-Sulpice",
      "Sainte-Anne-des-Plaines",
      "Sainte-Dorothée",
      "Sainte-Marthe-sur-le-Lac",
      "Sainte-Sophie",
      "Sainte-Thérèse",
      "Terrebonne",
   ],
   Montreal: [
      "Ahuntsic-Cartierville",
      "Anjou",
      "Baie-D'Urfé",
      "Beaconsfield",
      "Côte-des-Neiges",
      "Côte-des-Neiges–Notre-Dame-de-Grâce",
      "Côte-Saint-Luc",
      "Dollard-des-Ormeaux",
      "Dorval",
      "Hampstead",
      "L'Île-Bizard",
      "L'Île-Bizard–Sainte-Geneviève",
      "L'Île-Dorval",
      "LaSalle",
      "Lachine",
      "Le Plateau-Mont-Royal",
      "Le Sud-Ouest",
      "Mercier",
      "Hochelaga-Maisonneuve",
      "Mercier–Hochelaga-Maisonneuve",
      "Mont-Royal",
      "Montréal",
      "Montréal-Est",
      "Montréal-Nord",
      "Montréal-Ouest",
      "Notre-Dame-de-Grâce",
      "Outremont",
      "Pierrefonds-Roxboro",
      "P.-a.-T.",
      "Pointe-Claire",
      "R.-d.-P.",
      "Rivière-des-Prairies",
      "Pointe-aux-Trembles",
      "Rivière-des-Prairies–Pointe-aux-Trembles",
      "Rosemont–La Petite-Patrie",
      "Rosemont",
      "La Petite-Patrie",
      "Sainte-Anne-de-Bellevue",
      "Saint-Laurent",
      "Saint-Léonard",
      "Sainte-Geneviève",
      "Senneville",
      "Verdun",
      "Île-des-Soeurs",
      "Ville-Marie",
      "Westmount",
      "Villeray–Saint-Michel–Parc-Extension",
      "Villeray",
      "Saint-Michel",
      "Parc-Extension",
   ],
   "South Shore": [
      "Beauharnois",
      "Beloeil",
      "Boucherville",
      "Brossard",
      "Candiac",
      "Carignan",
      "Chambly",
      "Châteauguay",
      "Contrecœur",
      "Delson",
      "Greenfield Park",
      "Henryville",
      "Howick",
      "Kirkland",
      "La Prairie",
      "Lacolle",
      "Le Vieux-Longueuil",
      "Lemoyne",
      "Léry",
      "Longueuil",
      "Marieville",
      "McMasterville",
      "Mercier",
      "Mont-Saint-Hilaire",
      "Montérégie",
      "Napierville",
      "Otterburn Park",
      "Richelieu",
      "Rougemont",
      "Saint-Amable",
      "Saint-Basile-le-Grand",
      "Saint-Blaise-sur-Richelieu",
      "Saint-Bruno-de-Montarville",
      "Saint-Constant",
      "Saint-Étienne-de-Beauharnois",
      "Saint-Hyacinthe",
      "Saint-Hubert",
      "Saint-Isidore",
      "Saint-Jean-sur-Richelieu",
      "Saint-Lambert",
      "Saint-Marc-sur-Richelieu",
      "Saint-Mathias-sur-Richelieu",
      "Saint-Mathieu",
      "Saint-Mathieu-de-Beloeil",
      "Saint-Michel",
      "Saint-Philippe",
      "Saint-Rémi",
      "Sainte-Catherine",
      "Sainte-Julie",
      "Sainte-Martine",
      "Salaberry-de-Valleyfield",
      "Sherrington",
      "Varennes",
      "Verchères",
   ],
};


const CityMappings = {
   en: {
      "Montreal-North Shore": "North Shore",
      Montreal: "Montreal",
      "Montreal-South Shore": "South Shore",
   },
   fr: {
      "Rive-Nord de Montréal": "North Shore",
      Montréal: "Montreal",
      "Rive-Sud de Montréal": "South Shore",
   },
};

// Mapped numeric + label for bedrooms, bathrooms, etc.
const Options = Object.fromEntries(
    Object.entries(OptionMappings).map(([key, translations]) => [
       key,
       {
          en: NumericOptions.map((num) => ({
             value: num,
             text: num + translations.en,
          })),
          fr: NumericOptions.map((num) => ({
             value: num,
             text: num + translations.fr,
          })),
       },
    ])
);

function getServiceOptions(language) {
   return ServiceOptions.map((serviceOption) => {
      const label = serviceOption.label[language];
      return `<option value="${serviceOption.value}">${label}</option>`;
   }).join("");
}

const ContactExtension = {
   name: "Forms",
   type: "response",
   match: ({
              trace
           }) => trace.type === `ext_contact` || trace.payload.name === `ext_contact`,
   render: ({
               trace,
               element
            }) => {
      const {
         language
      } = trace.payload;
      const isEnglish = language === 'en';
      const formContainer = document.createElement("form");
      formContainer.innerHTML = `
      <style>
        form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }
        .bold-label {
          font-weight: bold;
          color: #555;
          font-size: 0.9em;
        }
        input[type="text"], input[type="email"], input[type="tel"], select, textarea {
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          padding: 8px;
          background: #fff;
          font-size: 0.9em;
          outline: none;
          box-sizing: border-box;
        }
        textarea {
          resize: vertical;
          min-height: 100px;
        }
        .submit {
          background: linear-gradient(to right, #CC960A, #CCA60A);
          border: none;
          color: white;
          padding: 12px;
          border-radius: 5px;
          width: 100%;
          font-size: 1em;
          cursor: pointer;
          margin-top: 8px;
        }
      </style>
      <div>
        <label for="full-name" class="bold-label">${isEnglish ? 'Full Name' : 'Nom complet'}</label>
        <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required>
      </div>
      <div>
        <label for="email" class="bold-label">Email</label>
        <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required>
      </div>
      <div>
        <label for="phone" class="bold-label">${isEnglish ? 'Phone Number' : 'Numéro de téléphone'}</label>
        <input type="tel" id="phone" name="phone" placeholder="${isEnglish ? 'Enter your phone number' : 'Entrez votre numéro de téléphone'}" required>
      </div>
      <div>
        <label for="service" class="bold-label">${isEnglish ? 'Select a Service' : 'Sélectionnez un Service'}</label>
        <select id="service" name="service" required>
          <option value="">${isEnglish ? '-- Select a Service --' : '-- Sélectionnez un Service --'}</option>
          ${getServiceOptions(language)}
        </select>
      </div>
      <div>
        <label for="seller-name" class="bold-label">${isEnglish ? 'Select a Seller' : 'Sélectionnez un vendeur'}</label>
        <select id="seller-name" name="seller-name" required>
          <option value="">${isEnglish ? '-- Select a Seller --' : '-- Sélectionnez un vendeur --'}</option>
          ${getSellerOptions(isEnglish)}
        </select>
      </div>
      <div>
        <label for="message" class="bold-label">Message</label>
        <textarea id="message" name="message" placeholder="${isEnglish ? 'Write your message here...' : 'Écrivez votre message ici...'}" rows="5" required></textarea>
      </div>
      <input type="submit" class="submit" value="${isEnglish ? 'Submit' : 'Envoyer'}">
    `;
      formContainer.addEventListener("submit", (event) => {
         event.preventDefault();
         const fullName = formContainer.querySelector("#full-name").value.trim();
         const email = formContainer.querySelector("#email").value.trim();
         const phone = formContainer.querySelector("#phone").value.trim();
         const formattedPhone = formatPhoneNumber(phone); // Formatage du numéro de téléphone
         const service = formContainer.querySelector("#service").value.trim(); // Valeur en français
         const sellerName = formContainer.querySelector("#seller-name").value.trim();
         const message = formContainer.querySelector("#message").value.trim();
         if (!fullName) {
            alert(isEnglish ? "Full Name is required." : "Le nom complet est obligatoire.");
            return;
         }
         if (!email || !isValidEmail(email)) {
            alert(isEnglish ? "Please enter a valid email address." : "Veuillez entrer une adresse email valide.");
            return;
         }
         if (!phone || !isValidCanadianPhoneNumber(phone)) {
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
         if (!message) {
            alert(isEnglish ? "Message is required." : "Le message est obligatoire.");
            return;
         }
         window.voiceflow.chat.interact({
            type: "complete",
            payload: {
               fullName,
               email,
               phone: formattedPhone,
               service,
               sellerName,
               message,
            },
         });
      });
      element.appendChild(formContainer);
   },
};

const BookingExtension = {
   name: "Forms",
   type: "response",
   match: ({
              trace
           }) =>
       trace.type === `ext_booking` || trace.payload.name === `ext_booking`,
   render: ({
               trace,
               element
            }) => {
      const {
         language
      } = trace.payload;
      const isEnglish = language === 'en';
      const formContainer = document.createElement("form");
      formContainer.innerHTML = `
      <style>
        form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }
        .bold-label {
          font-size: 0.9em;
          color: #555;
        }
        input[type="text"], input[type="email"], select {
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          padding: 8px;
          background: #fff;
          font-size: 0.9em;
          outline: none;
          box-sizing: border-box;
        }
        .book-now {
          background: linear-gradient(to right, #CC960A, #CCA60A);
          border: none;
          color: white;
          padding: 12px;
          border-radius: 5px;
          width: 100%;
          font-size: 1em;
          cursor: pointer;
          margin-top: 8px;
        }
      </style>
      <div>
        <label for="full-name" class="bold-label">${isEnglish ? 'Full Name' : 'Nom complet'}</label>
        <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required>
      </div>
      <div>
        <label for="email" class="bold-label">Email</label>
        <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required>
      </div>
      <div>
        <label for="seller-name" class="bold-label">${isEnglish ? 'Select a Seller' : 'Sélectionnez un vendeur'}</label>
        <select id="seller-name" name="seller-name" required>
          <option value="">${isEnglish ? '-- Select a Seller --' : '-- Sélectionnez un vendeur --'}</option>
          ${getSellerOptions(isEnglish, false)}
        </select>
      </div>
      <button type="button" class="book-now" id="book-now">${isEnglish ? 'Book Now' : 'Réserver maintenant'}</button>
    `;
      const bookNowButton = formContainer.querySelector("#book-now");
      bookNowButton.addEventListener("click", () => {
         const fullName = formContainer.querySelector("#full-name").value.trim();
         const email = formContainer.querySelector("#email").value.trim();
         const sellerName = formContainer.querySelector("#seller-name").value.trim();
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
            const bookingUrl = BookingUrls[sellerName]
                .replace("{Full_Name}", encodeURIComponent(fullName))
                .replace("{Email}", encodeURIComponent(email));
            window.voiceflow.chat.interact({
               type: "complete",
               payload: {
                  fullName,
                  email,
                  sellerName,
                  bookingUrl
               },
            });
            window.open(bookingUrl, "_blank");
         } else {
            alert(isEnglish ? "No booking URL available for the selected seller." : "Aucune URL de réservation disponible pour le vendeur sélectionné.");
         }
      });

      element.appendChild(formContainer);
   },
};
const SellingExtension = {
   name: "Forms",
   type: "response",
   match: ({
              trace
           }) =>
       trace.type === `ext_selling` || trace.payload.name === `ext_selling`,
   render: ({
               trace,
               element
            }) => {
      const {
         language
      } = trace.payload;
      const isEnglish = language === 'en';
      const langCode = isEnglish ? 'en' : 'fr';

      // Generate final PropertyTypes object with translations
      const PropertyTypes = Object.fromEntries(
          Object.entries(PropertyTypeMappings[langCode]).map(([label, sharedKey]) => [
             label,
             SharedPropertyTypes[sharedKey][langCode]
          ])
      );


      const createPropertyTypeRadios = (category, types) => {
         // Get the shared key from PropertyTypeMappings
         const sharedKey = PropertyTypeMappings[langCode][category];
         // Get the category types from SharedPropertyTypes using the shared key
         const categoryTypes = SharedPropertyTypes[sharedKey];

         return `
		<div>
		  <div class="collapsible property-category" onclick="toggleCollapse(this)">${category}</div>
		  <div class="collapse-content">
			${categoryTypes[langCode].map((type, index) => {
            const frenchValue = categoryTypes.fr[index];
            return `
				<div class="radio-item">
				  <input 
					type="radio" 
					class="property-radio" 
					data-category="${category}" 
					id="type-${type.replace(/\s+/g, '-')}" 
					name="property-type" 
					value="${frenchValue}"
				  >
				  <label for="type-${type.replace(/\s+/g, '-')}">${type}</label>
				</div>`;
         }).join("")}
		  </div>
		</div>
		`;
      };

      const formContainer = document.createElement("form");

      formContainer.innerHTML = `
      <style>
        form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }
        .bold-label {
          font-weight: bold;
          color: #555;
          font-size: 0.9em;
        }
        input[type="text"], input[type="email"], input[type="tel"], select, textarea {
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          padding: 8px;
          background: #fff;
          font-size: 0.9em;
          outline: none;
          box-sizing: border-box;
        }
        textarea {
          resize: vertical;
          min-height: 100px;
        }
        .submit {
          background: linear-gradient(to right, #CC960A, #CCA60A);
          border: none;
          color: white;
          padding: 12px;
          border-radius: 5px;
          width: 100%;
          font-size: 1em;
          cursor: pointer;
          margin-top: 8px;
        }
        .inline-field {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .collapsible {
          cursor: pointer;
          background: #f1f1f1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 0.9em;
          margin-bottom: 5px;
          text-align: left;
        }
        .collapsible:after {
          content: "\\25BC";
          float: right;
        }
        .collapsible.active:after {
          content: "\\25B2";
        }
        .collapse-content {
          display: none;
          padding: 10px;
          background: #fafafa;
          border: 1px solid #ddd;
          border-top: none;
        }
        .radio-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .radio-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .radio-item label {
          font-weight: normal;
        }
      </style>

      <div>
        <label for="full-name" class="bold-label">${isEnglish ? 'Full Name' : 'Nom complet'}</label>
        <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required>
      </div>

      <div>
        <label for="email" class="bold-label">Email</label>
        <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required>
      </div>

      <div>
        <label for="phone" class="bold-label">${isEnglish ? 'Phone Number' : 'Numéro de téléphone'}</label>
        <input type="tel" id="phone" name="phone" placeholder="${isEnglish ? 'Enter your phone number' : 'Entrez votre numéro de téléphone'}" required>
      </div>

      <div>
        <label for="seller-name" class="bold-label">${isEnglish ? 'Select a Seller' : 'Sélectionnez un Vendeur'}</label>
        <select id="seller-name" name="seller-name" required>
          <option value="">${isEnglish ? '-- Select a Seller --' : '-- Sélectionnez un Vendeur --'}</option>
          ${getSellerOptions(isEnglish)}
        </select>
      </div>

      <div>
        <label for="street-address" class="bold-label">${isEnglish ? 'Street Address' : 'Adresse de rue'}</label>
        <input type="text" id="street-address" name="street-address" placeholder="${isEnglish ? 'Enter the street address' : 'Entrez l\'adresse de la rue'}" required>
      </div>

      <div>
        <label for="city" class="bold-label">${isEnglish ? 'City' : 'Ville'}</label>
        <input type="text" id="city" name="city" placeholder="${isEnglish ? 'Enter the city' : 'Entrez la ville'}" required>
      </div>

      <div>
        <label for="postal-code" class="bold-label">${isEnglish ? 'Postal Code' : 'Code Postal'}</label>
        <input type="text" id="postal-code" name="postal-code" placeholder="${isEnglish ? 'Enter the postal code' : 'Entrez le code postal'}" required>
      </div>


      
      <!-- Property Types -->
      <div>
        <div class="collapsible bold-label" onclick="toggleCollapse(this)">${isEnglish ? 'Select Property Type' : 'Sélectionnez le type de propriété'}</div>
        <div class="collapse-content">
          <div id="property-types-container" class="radio-container">
            ${Object.entries(PropertyTypes)
          .map(([category, types]) => createPropertyTypeRadios(category, types))
          .join("")}
          </div>
        </div>
      </div>

      <div>
        <label for="year-build" class="bold-label">${isEnglish ? 'Year Built' : 'Année de construction'}</label>
        <input type="text" id="year-build" name="year-build" placeholder="${isEnglish ? 'Enter the year built' : 'Entrez l\'année de construction'}" required>
      </div>

      <div>
        <label for="area" class="bold-label">${isEnglish ? 'Area (in square feet)' : 'Superficie en pieds carrés'}</label>
        <input type="text" id="area" name="area" placeholder="${isEnglish ? 'Enter the area in square feet' : 'Entrez la superficie en pieds carrés'}" required>
      </div>

      <div>
        <label for="rooms-number" class="bold-label">${isEnglish ? 'Number of Rooms' : 'Nombre de pièces'}</label>
        <input type="text" id="rooms-number" name="rooms-number" placeholder="${isEnglish ? 'Enter the number of rooms' : 'Entrez le nombre de pièces'}" required>
      </div>

      <div>
        <label for="bedrooms-number" class="bold-label">${isEnglish ? 'Number of Bedrooms' : 'Nombre de chambres'}</label>
        <input type="text" id="bedrooms-number" name="bedrooms-number" placeholder="${isEnglish ? 'Enter the number of bedrooms' : 'Entrez le nombre de chambres'}" required>
      </div>

      <div>
        <label for="bathrooms-number" class="bold-label">${isEnglish ? 'Number of Bathrooms' : 'Nombre de salles de bains'}</label>
        <input type="text" id="bathrooms-number" name="bathrooms-number" placeholder="${isEnglish ? 'Enter the number of bathrooms' : 'Entrez le nombre de salles de bains'}" required>
      </div>

      <!-- Garage -->
      <div class="inline-field">
        <label for="garage" class="bold-label">${isEnglish ? 'Garage' : 'Garage'}</label>
        <input type="checkbox" id="garage" name="garage" value="Yes">
      </div>
      <input type="number" id="garage-cars" name="garage-cars" placeholder="${isEnglish ? 'Number of cars' : 'Nombre de voitures'}" style="display: none;">

      <!-- Outside Parking -->
      <div class="inline-field">
        <label for="outside-parking" class="bold-label">${isEnglish ? 'Outside Parking' : 'Stationnement extérieur'}</label>
        <input type="checkbox" id="outside-parking" name="outside-parking" value="Yes">
      </div>

      <!-- Swimming Pool -->
      <div class="inline-field">
        <label for="swimming-pool" class="bold-label">${isEnglish ? 'Swimming Pool' : 'Piscine'}</label>
        <input type="checkbox" id="swimming-pool" name="swimming-pool" value="Yes">
      </div>

      <div>
        <label for="details" class="bold-label">${isEnglish ? 'Details' : 'Détails'}</label>
        <textarea id="details" name="details" placeholder="${isEnglish ? 'Enter details here (minimum 5 lines)' : 'Écrivez les détails ici...'}" rows="5" required></textarea>
      </div>

      <input type="submit" class="submit" value="${isEnglish ? 'Submit' : 'Envoyer'}">
    `;

      formContainer.addEventListener("submit", (event) => {
         event.preventDefault();

         const fullName = formContainer.querySelector("#full-name").value.trim();
         const email = formContainer.querySelector("#email").value.trim();
         const phone = formContainer.querySelector("#phone").value.trim();
         const formattedPhone = formatPhoneNumber(phone);
         const sellerName = formContainer.querySelector("#seller-name").value.trim();
         const streetAddress = formContainer.querySelector("#street-address").value.trim();
         const city = formContainer.querySelector("#city").value.trim();
         const postalCode = formContainer.querySelector("#postal-code").value.trim();

         const propertyTypeElement = formContainer.querySelector('input[name="property-type"]:checked');
         const propertyType = propertyTypeElement ? propertyTypeElement.value.trim() : "";


         const yearBuild = formContainer.querySelector("#year-build").value.trim();
         const area = formContainer.querySelector("#area").value.trim();
         const roomsNumber = formContainer.querySelector("#rooms-number").value.trim();
         const bedroomsNumber = formContainer.querySelector("#bedrooms-number").value.trim();
         const bathroomsNumber = formContainer.querySelector("#bathrooms-number").value.trim();
         const insideParking = formContainer.querySelector("#garage").checked ? "Yes" : "No";
         const insideParkingCars = insideParking === "Yes" ? formContainer.querySelector("#garage-cars").value.trim() : 0;
         const outsideParking = formContainer.querySelector("#outside-parking").checked ? "Yes" : "No";
         const swimmingPool = formContainer.querySelector("#swimming-pool").checked ? "Yes" : "No";
         const details = formContainer.querySelector("#details").value.trim();

         // Validation checks
         if (!fullName) {
            alert(isEnglish ? "Full Name is required." : "Le nom complet est obligatoire.");
            return;
         }
         if (!email || !isValidEmail(email)) {
            alert(isEnglish ? "Please enter a valid email address." : "Veuillez entrer une adresse email valide.");
            return;
         }
         if (!phone || !isValidCanadianPhoneNumber(phone)) {
            alert(isEnglish ? "Please enter a valid Canadian phone number." : "Veuillez entrer un numéro de téléphone canadien valide.");
            return;
         }
         if (!sellerName) {
            alert(isEnglish ? "Please select a seller." : "Veuillez sélectionner un vendeur.");
            return;
         }
         if (!streetAddress) {
            alert(isEnglish ? "Street Address is required." : "L'adresse de rue est obligatoire.");
            return;
         }
         if (!city) {
            alert(isEnglish ? "City is required." : "La ville est obligatoire.");
            return;
         }
         if (!postalCode) {
            alert(isEnglish ? "Postal Code is required." : "Le code postal est obligatoire.");
            return;
         }
         if (!propertyType) {
            alert(isEnglish ? "Please select a property type." : "Veuillez sélectionner un type de propriété.");
            return;
         }
         if (!yearBuild) {
            alert(isEnglish ? "Year Built is required." : "L'année de construction est obligatoire.");
            return;
         }
         if (!area) {
            alert(isEnglish ? "Area is required." : "La superficie est obligatoire.");
            return;
         }
         if (!roomsNumber) {
            alert(isEnglish ? "Number of Rooms is required." : "Le nombre de pièces est obligatoire.");
            return;
         }
         if (!bedroomsNumber) {
            alert(isEnglish ? "Number of Bedrooms is required." : "Le nombre de chambres est obligatoire.");
            return;
         }
         if (!bathroomsNumber) {
            alert(isEnglish ? "Number of Bathrooms is required." : "Le nombre de salles de bains est obligatoire.");
            return;
         }

         window.voiceflow.chat.interact({
            type: "complete",
            payload: {
               fullName,
               email,
               phone: formattedPhone,
               sellerName,
               streetAddress,
               city,
               postalCode,
               propertyType,
               yearBuild,
               area,
               roomsNumber,
               bedroomsNumber,
               bathroomsNumber,
               insideParking,
               insideParkingCars,
               outsideParking,
               swimmingPool,
               details,
            },
         });
      });

      formContainer.querySelector("#garage").addEventListener("change", (event) => {
         const carsField = formContainer.querySelector("#garage-cars");
         if (event.target.checked) {
            carsField.style.display = "block";
         } else {
            carsField.style.display = "none";
            carsField.value = "";
         }
      });

      element.appendChild(formContainer);
   },
};


const PropertySearchExtension = {
   name: "Forms",
   type: "response",
   match: ({ trace }) =>
       trace.type === `ext_property_search` || trace.payload.name === `ext_property_search`,
   render: ({ trace, element }) => {
      const { language } = trace.payload; // Extracts the language from the payload
      const isEnglish = language === "en"; // Determines if the language is English
      const langCode = isEnglish ? "en" : "fr"; // Sets the language code

      // Build city object based on language
      const Cities = Object.fromEntries(
          Object.entries(CityMappings[langCode]).map(([label, sharedKey]) => [
             label,
             SharedCities[sharedKey],
          ])
      );

      // Build property categories object based on language
      const PropertyTypes = Object.fromEntries(
          Object.entries(PropertyTypeMappings[langCode]).map(([label, sharedKey]) => [
             label,
             SharedPropertyCategories[sharedKey][langCode],
          ])
      );

      // Build a translation map from EN to FR for categories
      const PropertyTypeTranslation = {};
      Object.entries(SharedPropertyCategories).forEach(([category, translations]) => {
         translations.en.forEach((enType, index) => {
            PropertyTypeTranslation[enType] = translations.fr[index];
         });
      });

      // Bedroom, bathroom, car numeric dropdown options
      const BedroomOptions = Options.Bedroom[langCode];
      const BathroomOptions = Options.Bathroom[langCode];
      const CarOptions = Options.Car[langCode];

      // ADDED: Access the house-type array
      const HouseTypeList = SharedPropertyTypes[langCode]; // [ "Multi-level", "Detached", etc. ]

      const formContainer = document.createElement("form");

      // --- CITY CHECKBOXES ---
      const createCityCheckboxes = (category, cities) => `
        <div>
          <div class="collapsible city-category" onclick="toggleCollapse(this)">${category}</div>
          <div class="collapse-content">
            <label class="checkbox-item">
              <input type="checkbox" class="select-all" data-category="${category}">
              <strong>${isEnglish ? "Select all" : "Tout sélectionner"}</strong>
            </label>
            ${cities
          .map(
              (city) => `
                <div class="checkbox-item">
                  <input 
                    type="checkbox" 
                    class="city-checkbox" 
                    data-category="${category}" 
                    id="city-${city}" 
                    name="cities" 
                    value="${city}"
                  >
                  <label for="city-${city}">${city}</label>
                </div>`
          )
          .join("")}
          </div>
        </div>
      `;

      // --- PROPERTY CATEGORY CHECKBOXES ---
      const createPropertyCategoryCheckboxes = (category, categories) => `
        <div>
            <div class="collapsible property-category" onclick="toggleCollapse(this)">${category}</div>
            <div class="collapse-content">
                <label class="checkbox-item">
                    <input type="checkbox" class="select-all-property" data-category="${category}">
                    <strong>${isEnglish ? "Select all" : "Tout sélectionner"}</strong>
                </label>
                ${categories
          .map((cat) => {
             const frenchValue = PropertyTypeTranslation[cat] || cat;
             return `
                      <div class="checkbox-item">
                        <input 
                          type="checkbox" 
                          class="property-checkbox" 
                          data-category="${category}" 
                          id="category-${cat}" 
                          name="property-categories" 
                          value="${isEnglish ? frenchValue : cat}"
                        >
                        <label for="category-${cat}">${cat}</label>
                      </div>`;
          })
          .join("")}
            </div>
        </div>
      `;

      // ADDED: HOUSE TYPE CHECKBOXES
      const createHouseTypeCheckboxes = (houseTypes) => `
        <div class="checkbox-container">
          <!-- "Select All" for House Types -->
          <label class="checkbox-item">
            <input type="checkbox" class="select-all-house-type">
            <strong>${isEnglish ? "Select all" : "Tout sélectionner"}</strong>
          </label>

          ${houseTypes
          .map(
              (ht) => `
            <div class="checkbox-item">
              <input 
                type="checkbox" 
                class="house-type-checkbox"
                id="house-type-${ht}" 
                name="house-type" 
                value="${ht}"
              >
              <label for="house-type-${ht}">${ht}</label>
            </div>
          `
          )
          .join("")}
        </div>
      `;

      // Form markup
      formContainer.innerHTML = `
        <style>
          /* Styles for the Property Search Form */
          form {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 100%;
          }
          .collapsible {
            cursor: pointer;
            background: #f1f1f1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 0.9em;
            margin-bottom: 5px;
            text-align: left;
          }
          .collapsible:after {
            content: "\\25BC"; /* Down arrow */
            float: right;
          }
          .collapsible.active:after {
            content: "\\25B2"; /* Up arrow when active */
          }
          .collapse-content {
            display: none;
            padding: 10px;
            background: #fafafa;
            border: 1px solid #ddd;
            border-top: none;
          }
          .checkbox-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .checkbox-item {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          select,
          input[type="number"] {
            width: 100%;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            padding: 8px;
            background: #fff;
            font-size: 0.9em;
            outline: none;
            box-sizing: border-box;
          }
          .submit {
            background: linear-gradient(to right, #CC960A, #CCA60A);
            border: none;
            color: white;
            padding: 12px;
            border-radius: 5px;
            width: 100%;
            font-size: 1em;
            cursor: pointer;
            margin-top: 8px;
          }
          .bold-label {
            font-weight: bold;
            color: #555;
            font-size: 0.9em;
          }
          .inline-field {
            display: flex;
            align-items: center;
            gap: 8px;
          }
        </style>

        <!-- Cities Section with Collapsible Categories -->
        <div>
          <div class="collapsible bold-label" onclick="toggleCollapse(this)">
            ${isEnglish ? "Select Cities" : "Sélectionnez des villes"}
          </div>
          <div class="collapse-content">
            <div id="cities-container" class="checkbox-container">
              ${Object.entries(Cities)
          .map(([category, cities]) => createCityCheckboxes(category, cities))
          .join("")}
            </div>
          </div>
        </div>

        <!-- Property Categories Section -->
        <div>
          <div class="collapsible bold-label" onclick="toggleCollapse(this)">
            ${isEnglish ? "Select Property Categories" : "Sélectionnez des catégories de propriété"}
          </div>
          <div class="collapse-content">
            <div id="property-categories-container" class="checkbox-container">
              ${Object.entries(PropertyTypes)
          .map(([category, categories]) =>
              createPropertyCategoryCheckboxes(category, categories)
          )
          .join("")}
            </div>
          </div>
        </div>

        <!-- ADDED: House Type Section -->
        <div>
          <div class="collapsible bold-label" onclick="toggleCollapse(this)">
            ${isEnglish ? "Select House Type" : "Sélectionnez le type de maison"}
          </div>
          <div class="collapse-content" id="house-types-container">
            ${createHouseTypeCheckboxes(HouseTypeList)}
          </div>
        </div>

        <!-- Bedrooms Selection -->
        <div>
          <label for="bedrooms-number" class="bold-label">
            ${isEnglish ? "Number of Bedrooms" : "Nombre de chambres"}
          </label>
          <select id="bedrooms-number" name="bedrooms-number" required>
            ${BedroomOptions.map(
          (option) => `<option value="${option.value}">${option.text}</option>`
      ).join("")}
          </select>
        </div>

        <!-- Bathrooms Selection -->
        <div>
          <label for="bathrooms-number" class="bold-label">
            ${isEnglish ? "Number of Bathrooms" : "Nombre de salles de bains"}
          </label>
          <select id="bathrooms-number" name="bathrooms-number" required>
            ${BathroomOptions.map(
          (option) => `<option value="${option.value}">${option.text}</option>`
      ).join("")}
          </select>
        </div>

        <!-- Price Range Minimum -->
        <div>
          <label for="price-min" class="bold-label">
            ${isEnglish ? "Price Range (Min)" : "Prix minimum"}
          </label>
          <input 
            type="number"
            id="price-min"
            name="price-min"
            placeholder="${isEnglish ? "Enter minimum price" : "Entrez le prix minimum"}"
            step="1000"
            min="0"
          >
        </div>

        <!-- Price Range Maximum -->
        <div>
          <label for="price-max" class="bold-label">
            ${isEnglish ? "Price Range (Max)" : "Prix maximum"}
          </label>
          <input 
            type="number"
            id="price-max"
            name="price-max"
            placeholder="${isEnglish ? "Enter maximum price" : "Entrez le prix maximum"}"
            step="1000"
            min="0"
          >
        </div>

        <!-- Garage Checkbox and Car Number Selection -->
        <div class="inline-field">
          <label for="garage" class="bold-label">
            ${isEnglish ? "Garage" : "Garage"}
          </label>
          <input type="checkbox" id="garage" name="garage" value="Yes">
        </div>

        <select id="garage-cars" name="garage-cars" style="display: none;">
          <option value="">
            ${isEnglish ? "Select number of cars" : "Sélectionnez le nombre de voitures"}
          </option>
          ${CarOptions.map((option) => `<option value="${option.value}">${option.text}</option>`).join("")}
        </select>

        <!-- Swimming Pool Checkbox -->
        <div class="inline-field">
          <label for="swimming-pool" class="bold-label">
            ${isEnglish ? "Swimming Pool" : "Piscine"}
          </label>
          <input type="checkbox" id="swimming-pool" name="swimming-pool" value="Yes">
        </div>

        <!-- Submit Button -->
        <input type="submit" class="submit" value="${isEnglish ? "Submit" : "Envoyer"}">
      `;

      // Handle form submission
      formContainer.addEventListener("submit", (event) => {
         event.preventDefault(); // Prevent the default form submission

         // Collect selected cities
         const selectedCities = Array.from(
             formContainer.querySelectorAll(".city-checkbox:checked")
         ).map((input) => input.value);

         // Collect selected property categories
         const selectedPropertyCategoriesRaw = Array.from(
             formContainer.querySelectorAll(".property-checkbox:checked")
         ).map((input) => input.value);

         // If English, map category to French behind the scenes
         const selectedPropertyCategories = isEnglish
             ? selectedPropertyCategoriesRaw.map(
                 (cat) => PropertyTypeTranslation[cat] || cat
             )
             : selectedPropertyCategoriesRaw;

         // ADDED: Collect the selected house types
         const selectedHouseTypes = Array.from(
             formContainer.querySelectorAll(".house-type-checkbox:checked")
         ).map((input) => input.value);

         // Numeric fields
         const bedroomsNumber = parseInt(
             formContainer.querySelector("#bedrooms-number").value || 0,
             10
         );
         const bathroomsNumber = parseInt(
             formContainer.querySelector("#bathrooms-number").value || 0,
             10
         );
         const priceMin = parseInt(
             formContainer.querySelector("#price-min").value || 0,
             10
         );
         const priceMax = parseInt(
             formContainer.querySelector("#price-max").value || 0,
             10
         );

         // Garage
         const indoorParking = formContainer.querySelector("#garage").checked
             ? "Yes"
             : "No";
         const indoorParkingCars =
             indoorParking === "Yes"
                 ? parseInt(formContainer.querySelector("#garage-cars").value || 0, 10)
                 : 0;

         // Swimming Pool
         const swimmingPool = formContainer.querySelector("#swimming-pool").checked
             ? "Yes"
             : "No";

         // Build payload with new houseType field
         const payload = {
            cityName: selectedCities,
            category: selectedPropertyCategories,
            houseType: selectedHouseTypes, // ADDED
            bedrooms: bedroomsNumber,
            bathrooms: bathroomsNumber,
            priceMin: priceMin,
            priceMax: priceMax,
            parkingIndoor: indoorParking,
            car: indoorParkingCars,
            swimmingPool: swimmingPool,
         };

         // Generate Airtable formula
         const airtableFormula = generateAirtableFormula(payload);

         // Send the data to Voiceflow or your integration
         window.voiceflow.chat.interact({
            type: "complete",
            payload: {
               formula: airtableFormula,
            },
         });
      });

      // Handle "Select All" logic, plus toggling the garage cars input
      formContainer.addEventListener("change", (event) => {
         // City select-all
         if (event.target.classList.contains("select-all")) {
            const category = event.target.dataset.category;
            const checkboxes = formContainer.querySelectorAll(
                `.city-checkbox[data-category="${category}"]`
            );
            checkboxes.forEach((checkbox) => (checkbox.checked = event.target.checked));
         } else if (event.target.classList.contains("city-checkbox")) {
            const category = event.target.dataset.category;
            const allCheckbox = formContainer.querySelector(
                `.select-all[data-category="${category}"]`
            );
            const checkboxes = formContainer.querySelectorAll(
                `.city-checkbox[data-category="${category}"]`
            );
            allCheckbox.checked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
         }

         // Property category select-all
         else if (event.target.classList.contains("select-all-property")) {
            const category = event.target.dataset.category;
            const checkboxes = formContainer.querySelectorAll(
                `.property-checkbox[data-category="${category}"]`
            );
            checkboxes.forEach((checkbox) => (checkbox.checked = event.target.checked));
         } else if (event.target.classList.contains("property-checkbox")) {
            const category = event.target.dataset.category;
            const allCheckbox = formContainer.querySelector(
                `.select-all-property[data-category="${category}"]`
            );
            const checkboxes = formContainer.querySelectorAll(
                `.property-checkbox[data-category="${category}"]`
            );
            allCheckbox.checked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
         }

         // ADDED: House type select-all
         else if (event.target.classList.contains("select-all-house-type")) {
            const checkboxes = formContainer.querySelectorAll(".house-type-checkbox");
            checkboxes.forEach(
                (checkbox) => (checkbox.checked = event.target.checked)
            );
         } else if (event.target.classList.contains("house-type-checkbox")) {
            const allHouseTypeCheckbox = formContainer.querySelector(
                ".select-all-house-type"
            );
            const houseTypeCheckboxes = formContainer.querySelectorAll(
                ".house-type-checkbox"
            );
            allHouseTypeCheckbox.checked = Array.from(houseTypeCheckboxes).every(
                (cb) => cb.checked
            );
         }
      });

      // Toggle the #garage-cars only if #garage is checked
      formContainer.querySelector("#garage").addEventListener("change", (event) => {
         const carsField = formContainer.querySelector("#garage-cars");
         if (event.target.checked) {
            carsField.style.display = "block";
         } else {
            carsField.style.display = "none";
            carsField.value = ""; // reset
         }
      });

      // Append form to DOM
      element.appendChild(formContainer);
   },
};


const ImageExtension = {
   name: 'ImageExtension',
   type: 'response',
   match: ({ trace }) =>
       trace.type === 'ext_image_extension' ||
       trace.payload?.name === 'ext_image_extension',

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

const LocalisationExtension = {
   name: 'Localisation',
   type: 'response',
   match: ({
              trace
           }) => trace.type === 'ext_localisation' || trace.payload.name === 'ext_localisation',
   render: ({
               trace,
               element
            }) => {
      const {
         language,
         key,
         LAT,
         LNG
      } = trace.payload;

      function openModal() {
         const modal = document.getElementById('localisation-modal');
         if (modal) {
            modal.style.display = 'block';
            initializeLocalLogic(language, key, parseFloat(LAT), parseFloat(LNG));
         } else {
            console.error('Modal element not found');
         }
      }

      function closeModal() {
         const modal = document.getElementById('localisation-modal');
         if (modal) {
            modal.style.display = 'none';
         }
      }

      const closeButton = document.querySelector('.close-button');
      if (closeButton) {
         closeButton.addEventListener('click', closeModal);
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
            ll.create("local-content", container, {
               lat,
               lng,
               cooperativeGestures: false,
               marker: {
                  lat,
                  lng
               },
               zoom: 20
            });
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
   },
};


const MortgageCalculatorExtension = {
   name: 'MortgageCalculator',
   type: 'response',
   match: ({ trace }) => trace.type === 'ext_mortgage_calculator',
   render: ({ trace }) => {
      const { propertyCost = 300000, language = 'en' } = trace.payload;
      const calculatorContainer = document.getElementById('calculator-container');

      const translations = {
         fr: {
            title: 'calculatrice de versements hypothécaires',
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
            perBiweek: '$ / 2 semaines',
            perMonth: '$ / mois',
            errorInvalidProperty: 'Veuillez entrer un coût de propriété valide.',
            errorMinDownPayment:
                'La mise de fonds minimale doit être de {amount}$ (5% du coût de la propriété)',
            errorMaxDownPayment:
                'La mise de fonds ne peut pas être supérieure au coût de la propriété',
            errorInvalidDownPayment: 'Veuillez entrer une mise de fonds valide',
            paymentNote:
                'Ceci est votre montant de paiement estimé selon la fréquence sélectionnée.',
            loanNote:
                'Le montant total de votre prêt basé sur la valeur de la propriété et la mise de fonds.',
         },
         en: {
            title: 'mortgage payment calculator',
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
            errorMinDownPayment:
                'Minimum down payment must be {amount}$ (5% of property value)',
            errorMaxDownPayment: 'Down payment cannot be greater than property value',
            errorInvalidDownPayment: 'Please enter a valid down payment',
            paymentNote:
                'This is your estimated payment amount based on the selected frequency.',
            loanNote:
                'The total amount of your loan based on the property value and down payment.',
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
          <div class="modal-title">${text.title}</div>
          <div id="calculator-error-msg"></div>
          <div class="form-row">
            <div class="form-column">
              <label class="bold-label" for="cost">${text.propertyValue}</label>
              <div class="input-group">
                <span class="currency-symbol">$</span>
                <input type="number" id="cost" class="currency-input" value="${propertyCost}" min="0">
              </div>
            </div>
            <div class="form-column">
              <label class="bold-label" for="down-payment">${text.downPayment}</label>
              <div class="input-group">
                <span class="currency-symbol">$</span>
                <input type="number" id="down-payment" class="currency-input" 
                       value="${minDownPayment}" step="1000" onfocus="this.select()">
                <span class="input-suffix">(5.00 %)</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-column">
              <label class="bold-label" for="interest-rate">${text.interestRate}</label>
              <input type="number" id="interest-rate" class="currency-input" step="0.01" min="0" max="100" value="5.50">
            </div>
            <div class="form-column">
              <label class="bold-label" for="payment-frequency">${text.paymentFrequency}</label>
              <select id="payment-frequency">
                <option value="week">${text.weekly}</option>
                <option value="2-weeks" selected>${text.biweekly}</option>
                <option value="month">${text.monthly}</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-column">
              <label class="bold-label" for="amortization-period">${text.amortizationPeriod}</label>
              <select id="amortization-period">
                <option value="5">5 ${text.years}</option>
                <option value="10">10 ${text.years}</option>
                <option value="15">15 ${text.years}</option>
                <option value="20">20 ${text.years}</option>
                <option value="25" selected>25 ${text.years}</option>
              </select>
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
         const amortizationSelect = formContainer.querySelector('#amortization-period');
         const frequencySelect = formContainer.querySelector('#payment-frequency');

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
                  errorMsg.innerHTML = `
                  <span style="
                    color: red;
                    font-weight: bold;
                    display: block;
                    text-align: center;
                    margin-bottom: 16px;
                  ">
                    ${text.errorMinDownPayment.replace('{amount}', minDown.toFixed(2))}
                  </span>
                `;
                  paymentResult.style.display = 'none';
               } else {
                  errorMsg.textContent =
                      downPayment > cost ? text.errorMaxDownPayment : '';
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
            const amortization = parseInt(amortizationSelect.value);
            const frequency = frequencySelect.value;

            if (downPayment < cost * 0.05) {
               paymentResult.style.display = 'none';
               return;
            }
            const paymentsPerYear =
                frequency === 'week' ? 52 :
                    frequency === '2-weeks' ? 26 : 12;

            const payment = calculateMortgagePayment(
                loanAmount, interestRate, amortization, paymentsPerYear
            );

            const suffix =
                frequency === 'week' ? text.perWeek :
                    frequency === '2-weeks' ? text.perBiweek : text.perMonth;

            paymentOutput.textContent = `${payment.toFixed(2)} ${suffix}`;
            paymentResult.style.display = 'block';
         }

         [costInput, downPaymentInput, interestRateInput, amortizationSelect, frequencySelect]
             .forEach(el => el.addEventListener('input', handleCalculate));

         handleCalculate();
      }

      calculatorContainer.innerHTML = '';
      calculatorContainer.appendChild(formContainer);
      initCalculator();
   },
};

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

      function calculatePaymentAndCapacity(
          annualIncome,
          annualExpenses,
          deposit,
          interestRate,
          term,
          frequency
      ) {
         const paymentsPerYear = freqMap[frequency];
         const periodicIncome = annualIncome / paymentsPerYear;
         const periodicExpenses = annualExpenses / paymentsPerYear;
         const periodicRate = interestRate / 100 / paymentsPerYear;
         const numberOfPayments = term * paymentsPerYear;
         const maxPeriodicPayment = periodicIncome * 0.32;

         let presentValue = 0;
         if (periodicRate > 0) {
            presentValue =
                maxPeriodicPayment *
                ((1 - Math.pow(1 + periodicRate, -numberOfPayments)) / periodicRate);
         } else {
            presentValue = maxPeriodicPayment * numberOfPayments;
         }
         return {
            paymentPerPeriod: maxPeriodicPayment,
            borrowingCapacity: Math.round(presentValue + deposit),
         };
      }

      const formContainer = document.createElement('form');
      formContainer.innerHTML = `
          <div class="modal-title">
            ${
          isEnglish
              ? 'Borrowing Capacity Calculator'
              : "Calculateur de capacité d'emprunt"
      }
          </div>
          <div class="form-row">
            <div class="form-column">
              <label for="annual-income" class="bold-label">
                ${isEnglish ? 'Annual Gross Income' : 'Revenu annuel brut'}
              </label>
              <div class="input-group">
                <span class="currency-symbol">$</span>
                <input type="number" id="annual-income" class="currency-input" required
                  placeholder="${
          isEnglish
              ? 'Enter your annual income'
              : 'Entrez votre revenu annuel'
      }"
                  min="0" step="1000" />
              </div>
            </div>
            <div class="form-column">
              <label for="monthly-expenses" class="bold-label">
                ${isEnglish ? 'Monthly Expenses' : 'Dépenses mensuelles'}
              </label>
              <div class="input-group">
                <span class="currency-symbol">$</span>
                <input type="number" id="monthly-expenses" class="currency-input" required
                  placeholder="${
          isEnglish
              ? 'Enter monthly expenses'
              : 'Entrez les dépenses mensuelles'
      }"
                  min="0" step="100" />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-column">
              <label for="down-payment" class="bold-label">
                ${isEnglish ? 'Down Payment Available' : 'Mise de fonds disponible'}
              </label>
              <div class="input-group">
                <span class="currency-symbol">$</span>
                <input type="number" id="down-payment" class="currency-input" required
                  placeholder="${
          isEnglish
              ? 'Enter down payment'
              : 'Entrez la mise de fonds'
      }"
                  min="0" step="1000" />
              </div>
            </div>
            <div class="form-column">
              <label for="interest-rate" class="bold-label">
                ${isEnglish ? 'Interest Rate (%)' : "Taux d'intérêt (%)"}
              </label>
              <input type="number" id="interest-rate" class="currency-input" required
                placeholder="${
          isEnglish
              ? 'Enter interest rate'
              : "Entrez le taux d'intérêt"
      }"
                min="0" max="20" step="0.1" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-column">
              <label for="mortgage-term" class="bold-label">
                ${isEnglish ? 'Mortgage Term (Years)' : 'Durée du prêt (Années)'}
              </label>
              <select id="mortgage-term" required>
                <option value="25">25 ${isEnglish ? 'years' : 'ans'}</option>
                <option value="20">20 ${isEnglish ? 'years' : 'ans'}</option>
                <option value="15">15 ${isEnglish ? 'years' : 'ans'}</option>
                <option value="10">10 ${isEnglish ? 'years' : 'ans'}</option>
              </select>
            </div>
            <div class="form-column">
              <label for="payment-frequency" class="bold-label">
                ${isEnglish ? 'Payment Frequency' : 'Fréquence de paiement'}
              </label>
              <select id="payment-frequency" required>
                <option value="monthly">${isEnglish ? 'Monthly' : 'Mensuelle'}</option>
                <option value="bi-weekly">${isEnglish ? 'Bi-weekly' : 'Aux deux semaines'}</option>
                <option value="weekly">${isEnglish ? 'Weekly' : 'Hebdomadaire'}</option>
              </select>
            </div>
          </div>
          <div class="results-row">
            <div class="result" id="payment-preview">
              <h3>${
          isEnglish
              ? 'Estimated Payment Amount'
              : 'Montant estimé du paiement'
      }</h3>
              <div class="amount" id="payment-amount"></div>
              <div class="hint">
                ${
          isEnglish
              ? 'This is your estimated payment amount based on the selected frequency.'
              : 'Ceci est votre montant de paiement estimé selon la fréquence sélectionnée.'
      }
              </div>
            </div>
            <div class="result" id="result">
              <h3>${
          isEnglish
              ? 'Your Estimated Borrowing Capacity'
              : "Votre capacité d'emprunt estimée"
      }</h3>
              <div class="amount" id="capacity-amount"></div>
              <div class="hint">
                ${
          isEnglish
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
            const { paymentPerPeriod, borrowingCapacity } = calculatePaymentAndCapacity(
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
         formContainer.querySelector(selector).addEventListener('input',
             () => updateCalculations(formContainer)
         );
      });

      calculatorContainer.innerHTML = '';
      calculatorContainer.appendChild(formContainer);
      modal.style.display = 'flex';
   },
};

const CombinedCalculatorsExtension = {
   name: 'CombinedCalculators',
   type: 'response',
   match: ({ trace }) =>
       trace.type === 'ext_combined_calculators' || trace.payload?.name === 'ext_combined_calculators',
   render: ({ trace , element}) => {
      const { language = 'en' } = trace.payload;
      const isEnglish = language === 'en';

      const modal = document.getElementById('calculator-modal');
      const closeButton = modal.querySelector('.close-button');
      const calculatorContainer = document.getElementById('calculator-container');

      const navHTML = `
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
            BorrowingCalculatorExtension.render({
               trace: { payload: { language } }
            });
         } else {
            const mortgageContainer = document.createElement('div');
            mortgageContainer.id = 'mortgage-calculator-modal-content';
            calculatorContainer.appendChild(mortgageContainer);
            MortgageCalculatorExtension.render({
               trace: { payload: { language, propertyCost: 300000 } },
               element: mortgageContainer
            });
         }
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

      closeButton.addEventListener('click', e => {
         e.stopPropagation();
         closeModal();
      });
      document.addEventListener('keydown', handleKeyPress);
      window.addEventListener('click', handleOutsideClick);

      // Remove any existing navigation buttons to prevent duplication
      const existingNav = modal.querySelector('.calculator-nav');
      if (existingNav) {
         existingNav.remove();
      }

      // Insert the new navigation buttons
      calculatorContainer.insertAdjacentHTML('beforebegin', navHTML);

      // Re-attach event listeners to the new buttons
      const navButtons = modal.querySelectorAll('.calculator-nav-button');
      navButtons.forEach(button => {
         button.addEventListener('click', () => switchCalculator(button.dataset.calculator));
      });


      modal.style.display = 'flex';
      switchCalculator('borrowing');
   },
};

window.ContactExtension = ContactExtension;
window.BookingExtension = BookingExtension;
window.SellingExtension = SellingExtension;
window.PropertySearchExtension = PropertySearchExtension;
window.ImageExtension = ImageExtension;
window.LocalisationExtension = LocalisationExtension;
window.CombinedCalculatorsExtension = CombinedCalculatorsExtension;
