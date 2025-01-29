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
      "Auteuil",
      "Blainville",
      "Boisbriand",
      "Bois-des-Filion",
      "Deux-Montagnes",
      "Duvernay",
      "Fabreville",
      "Laval-des-Rapides",
      "Laval-Ouest",
      "Laval-sur-le-Lac",
      "Lorraine",
      "Mirabel",
      "Oka",
      "Pointe-Calumet",
      "Pont-Viau",
      "Rosemère",
      "Sainte-Anne-des-Plaines",
      "Sainte-Dorothée",
      "Sainte-Marthe-sur-le-Lac",
      "Sainte-Rose",
      "Sainte-Thérèse",
      "Saint-Eustache",
      "Saint-François",
      "Saint-Joseph-du-Lac",
      "Saint-Vincent-de-Paul",
      "Vimont",
   ],
   Montreal: [
      "Ahuntsic",
      "Anjou",
      "Baie-d'Urfé",
      "Beaconsfield",
      "Cartierville",
      "Côte-des-Neiges",
      "Côte-Saint-Luc",
      "Dollard-Des-Ormeaux",
      "Dorval",
      "Hampstead",
      "Hochelaga-Maisonneuve",
      "Kirkland",
      "Lachine",
      "LaSalle",
      "Le Plateau-Mont-Royal",
      "Le Sud-Ouest",
      "L'Île-Bizard",
      "L'Île-Dorval",
      "Mercier",
      "Montréal-Est",
      "Montréal-Nord",
      "Montréal-Ouest",
      "Mont-Royal",
      "Notre-Dame-de-Grâce",
      "Outremont",
      "Parc-Extension",
      "Pierrefonds-Roxboro",
      "Pointe-aux-Trembles",
      "Pointe-Claire",
      "Rivière-des-Prairies",
      "Rosemont",
      "Sainte-Anne-de-Bellevue",
      "Sainte-Geneviève",
      "Saint-Laurent",
      "Saint-Léonard",
      "Saint-Michel",
      "Senneville",
      "Verdun/Île-des-Soeurs",
      "Ville-Marie",
      "Villeray",
      "Westmount",
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
      "Delson",
      "Greenfield Park",
      "Kahnawake",
      "La Prairie",
      "Léry",
      "Longueuil",
      "McMasterville",
      "Mercier",
      "Mont-Saint-Hilaire",
      "Otterburn Park",
      "Saint-Antoine-sur-Richelieu",
      "Saint-Basile-le-Grand",
      "Saint-Bruno-de-Montarville",
      "Saint-Charles-sur-Richelieu",
      "Saint-Constant",
      "Saint-Denis-sur-Richelieu",
      "Saint-Étienne-de-Beauharnois",
      "Saint-Isidore",
      "Saint-Jean-Baptiste",
      "Saint-Lambert",
      "Saint-Louis-de-Gonzague",
      "Saint-Marc-sur-Richelieu",
      "Saint-Mathieu",
      "Saint-Mathieu-de-Beloeil",
      "Saint-Philippe",
      "Saint-Stanislas-de-Kostka",
      "Saint-Urbain-Premier",
      "Sainte-Catherine",
      "Sainte-Martine",
      "Vieux-Longueuil",
      "Saint-Hubert",
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




window.ContactExtension = ContactExtension;
window.BookingExtension = BookingExtension;
window.SellingExtension = SellingExtension;
window.PropertySearchExtension = PropertySearchExtension;
window.ImageExtension = ImageExtension;
