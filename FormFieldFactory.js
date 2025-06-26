/**
 * Complete FormFieldFactory System - Enhanced with Personalized Error Messages
 * @version 3.3.0
 * @description Complete form system with multi-step capability, universal data processing, linked fields, subsections support, and personalized error messages
 */
class FormFieldFactory {
    constructor(options = {}) {
        
		this.container = options.container || document.body;
		this.formValues = options.formValues || {};
		this.onChangeCallback = options.onChange || null;
		this.currentMultiStepForm = null;
		this.fieldRegistry = {};
		
		// Add global click management
		this.openDropdowns = new Set();
		this.openInfoPanels = new Set();
		this.globalClickHandlerAttached = false;
		
		// Enhanced texts with summary support
		this.texts = {
			required: options.texts?.required || "required",
			selectPlaceholder: options.texts?.selectPlaceholder || "-- Select --",
			selectMultiplePlaceholder: options.texts?.selectMultiplePlaceholder || "-- Multiple selection --",
			selectSubsectionPlaceholder: options.texts?.selectSubsectionPlaceholder || "-- Select from categories --",
			yes: options.texts?.yes || "Yes",
			no: options.texts?.no || "No",
			other: options.texts?.other || "Other",
			fieldRequired: options.texts?.fieldRequired || "This field is required",
			emailInvalid: options.texts?.emailInvalid || "Invalid email format",
			phoneInvalid: options.texts?.phoneInvalid || "Invalid phone format",
			urlInvalid: options.texts?.urlInvalid || "Invalid URL format",
			selectAtLeastOne: options.texts?.selectAtLeastOne || "Please select at least one option",
			selectAll: options.texts?.selectAll || "Select All",
			selected: options.texts?.selected || "selected",
			next: options.texts?.next || "Next",
			previous: options.texts?.previous || "Previous",
			submit: options.texts?.submit || "Submit",
			step: options.texts?.step || "Step",
			of: options.texts?.of || "of",
			edit: options.texts?.edit || "Edit",
			noDataEntered: options.texts?.noDataEntered || "No data entered",
			serviceRequired: options.texts?.serviceRequired || "Please select a service",
			dateTimeRequired: options.texts?.dateTimeRequired || "Please select a date and time"
		};
        
        // SVG Icons - All icons used by fields should be defined here
this.SVG_ICONS = {
    CHECK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="12px" height="12px">
        <path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
    </svg>`,
    CHEVRON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
        <g transform="translate(75, 75)">
            <path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
        </g>
    </svg>`,
    INFO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
        <path class="info-bg" fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
        <path class="info-icon" fill="currentColor" d="M216 336l24 0 0-64-24 0 c-13.3 0-24-10.7-24-24s10.7-24 24-24 l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24 l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208 a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
    </svg>`,
    CLOSE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="8px" height="8px">
        <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
    </svg>`,
    PLUS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 400" width="15px" height="15px"> 
        <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
    </svg>`,
    MINUS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 400" width="15px" height="15px"> 
        <path fill="currentColor" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
    </svg>`,
    CALCULATOR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24px" height="24px">
        <path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L64 0zM96 64l192 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32L96 160c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32zm32 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM96 352a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM64 416c0-17.7 14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32zM192 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm64-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM288 448a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"/>
    </svg>`,
    CALENDAR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24px" height="24px">
        <path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48H0l0-48c0-26.5 21.5-48 48-48l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/>
    </svg>`,
    RESCHEDULE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24px" height="24px">
        <path fill="currentColor" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-17.6-17.5H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-2.2 0-4.2 .5-6.1 1.3z"/>
    </svg>`,
    APPOINTMENT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24px" height="24px">
        <path fill="currentColor" d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6 263.6 506.2c-9 7.7-22.3 7.7-31.2 0L192 471.6 151.6 506.2c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 208c0-8.8 7.2-16 16-16H288c8.8 0 16 7.2 16 16s-7.2 16-16 16H96c-8.8 0-16-7.2-16-16zM96 304c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z"/>
    </svg>`,
    SERVICE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24px" height="24px">
        <path fill="currentColor" d="M142.4 21.9c5.6 16.8-3.5 34.9-20.2 40.5L96 71.1V192c0 53 43 96 96 96s96-43 96-96V71.1l-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2L309.5 18c7.9 2.6 13.3 9.7 13.9 18.3s-4.6 16.6-12.1 20.2L288 71.1V192c0 70.7-57.3 128-128 128s-128-57.3-128-128V71.1L8.7 56.5C-2.9 53-9.2 40.8-5.7 29.1S18.4.7 30.1 4.2L57.4 12.8C65.3 15.4 70.7 22.5 71.3 31.1s-4.6 16.6-12.1 20.2L32 71.1V192c0 70.7 57.3 128 128 128v64c0 17.7-14.3 32-32 32H96c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192c-17.7 0-32-14.3-32-32V320c70.7 0 128-57.3 128-128V71.1l-26.1 8.7c-7.5 2.5-11.7 10.5-11.1 18.9.6 8.4 6 15.9 13.9 18.5l27.3 9.1c11.7 3.9 18 16.7 14.1 28.4s-16.7 18-28.4 14.1L250.5 160c-7.9-2.6-13.3-9.7-13.9-18.3s4.6-16.6 12.1-20.2L288 96V71.1l-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2L309.5 18c7.9 2.6 13.3 9.7 13.9 18.3s-4.6 16.6-12.1 20.2L288 71.1"/>
    </svg>`
};

        // Initialize global click handler
        this.initGlobalClickHandler();
    }

    // ===== GLOBAL CLICK MANAGEMENT =====
    initGlobalClickHandler() {
        if (!this.globalClickHandlerAttached) {
            this.globalClickHandler = this.handleGlobalClick.bind(this);
            document.addEventListener('click', this.globalClickHandler, true);
            this.globalClickHandlerAttached = true;
        }
    }

    handleGlobalClick(event) {
        // Close all open dropdowns that don't contain the clicked element
        this.openDropdowns.forEach(dropdown => {
            if (!dropdown.element.contains(event.target)) {
                dropdown.close();
            }
        });

        // Close all open info panels that don't contain the clicked element
        this.openInfoPanels.forEach(infoPanel => {
            if (!infoPanel.element.contains(event.target) && 
                !infoPanel.button.contains(event.target)) {
                infoPanel.close();
            }
        });
    }

    registerDropdown(dropdownInstance) {
        this.openDropdowns.add(dropdownInstance);
    }

    unregisterDropdown(dropdownInstance) {
        this.openDropdowns.delete(dropdownInstance);
    }

    registerInfoPanel(infoPanelInstance) {
        this.openInfoPanels.add(infoPanelInstance);
    }

    unregisterInfoPanel(infoPanelInstance) {
        this.openInfoPanels.delete(infoPanelInstance);
    }

    closeAllDropdowns() {
        this.openDropdowns.forEach(dropdown => dropdown.close());
    }

    closeAllInfoPanels() {
        this.openInfoPanels.forEach(infoPanel => infoPanel.close());
    }

    // ===== FIELD CREATION METHOD =====
    createField(config) {
        let field;
        
        switch (config.type) {
            case 'text':
                field = new TextField(this, config);
                break;
            case 'email':
                field = new EmailField(this, config);
                break;
            case 'phone':
                field = new PhoneField(this, config);
                break;
            case 'url':
                field = new UrlField(this, config);
                break;
            case 'textarea':
                field = new TextAreaField(this, config);
                break;
            case 'number':
                field = new NumberField(this, config);
                break;
            case 'percentage':
                field = new PercentageField(this, config);
                break;
            case 'options-stepper':
                field = new OptionsStepperField(this, config);
                break;
            case 'yesno':
                field = new YesNoField(this, config);
                break;
            case 'select':
                field = new SingleSelectField(this, config);
                break;
            case 'multiselect':
                field = new MultiSelectField(this, config);
                break;
            case 'select-subsections':
                field = new SingleSelectSubsectionsField(this, config);
                break;
            case 'multiselect-subsections':
                field = new MultiSelectSubsectionsField(this, config);
                break;
            case 'yesno-with-options':
                field = new YesNoWithOptionsField(this, config);
                break;
            case 'select-with-other':
                field = new SingleSelectWithOtherField(this, config);
                break;
            case 'multiselect-with-other':
                field = new MultiSelectWithOtherField(this, config);
                break;
            case 'sliding-window-range':
                field = new SlidingWindowRangeField(this, config);
                break;
            case 'sliding-window':
                field = new SlidingWindowSliderField(this, config);
                break;
            case 'dual-range':
                field = new DualRangeField(this, config);
                break;
            case 'slider':
                field = new SliderField(this, config);
                break;
            case 'options-slider':
                field = new OptionsSliderField(this, config);
                break;
            case 'serviceCard':
                field = new ServiceCardField(this, config);
                break;
            case 'calendar':
                field = new CalendarField(this, config);
                break;
            case 'currentAppointmentCard':
                field = new CurrentAppointmentCardField(this, config);
                break;
            case 'custom':
                field = new CustomField(this, config);
                break;
            default:
                console.warn(`Unknown field type: ${config.type}`);
                field = new TextField(this, config);
        }
        
        return field;
    }

    // ===== UNIVERSAL DATA PROCESSING METHODS =====

    /**
     * Universal data processor - works with ANY form structure
     * @param {Object} rawFormData - Raw data from any multi-step form
     * @returns {Object} Processed data ready for submission
     */
    processAnyFormData(rawFormData) {
        if (!this.currentMultiStepForm) {
            console.warn('No multi-step form available for processing');
            return rawFormData;
        }
        
        // Step 1: Flatten complex structures
        const flattened = this.universalFlatten(rawFormData);
        
        // Step 2: Convert IDs to names
        const converted = this.universalConvertIds(flattened);
        
        // Step 3: Apply universal transformations
        const processed = this.universalTransform(converted);
        
        return processed;
    }

    /**
     * Universal flattening - works with any field structure
     */
    universalFlatten(formData) {
        const flattened = { ...formData };
        const allFieldConfigs = this.getAllFieldConfigs();
        
        Object.keys(formData).forEach(fieldName => {
            const fieldValue = formData[fieldName];
            const fieldConfig = this.findFieldConfig(fieldName, allFieldConfigs);
            
            if (!fieldConfig || !fieldValue || typeof fieldValue !== 'object') return;
            
            // Handle yesno-with-options fields
            if (fieldConfig.type === 'yesno-with-options' && fieldValue.main) {
                flattened[fieldName] = fieldValue.main;
                
                // Extract yesValues
                if (fieldValue.yesValues) {
                    Object.keys(fieldValue.yesValues).forEach(key => {
                        flattened[key] = fieldValue.yesValues[key];
                    });
                }
                
                // Extract noValues
                if (fieldValue.noValues) {
                    Object.keys(fieldValue.noValues).forEach(key => {
                        flattened[key] = fieldValue.noValues[key];
                    });
                }
            }
            
            // Handle select-with-other and multiselect-with-other fields
            else if ((fieldConfig.type === 'select-with-other' || 
                      fieldConfig.type === 'multiselect-with-other') && 
                     fieldValue.main !== undefined) {
                
                flattened[fieldName] = fieldValue.main;
                
                if (fieldValue.other) {
                    const otherFieldName = this.generateOtherFieldName(fieldName);
                    flattened[otherFieldName] = fieldValue.other;
                }
            }
        });
        
        return flattened;
    }

    /**
     * Universal ID to name conversion
     */
    universalConvertIds(flatData) {
		const converted = { ...flatData };
		const allFieldConfigs = this.getAllFieldConfigs();
		
		Object.keys(flatData).forEach(fieldName => {
			const fieldValue = flatData[fieldName];
			const fieldConfig = this.findFieldConfig(fieldName, allFieldConfigs);
			
			if (!fieldConfig || !fieldValue) return;
			
			// Handle fields with options
			if (fieldConfig.options && Array.isArray(fieldConfig.options)) {
				
				// Single select fields
				if (typeof fieldValue === 'string') {
					if (fieldValue !== 'other') {
						const option = fieldConfig.options.find(opt => opt.id === fieldValue);
						if (option) {
							converted[fieldName] = option.name;
						}
					} else {
						// Handle "other"
						const otherFieldName = this.generateOtherFieldName(fieldName);
						if (converted[otherFieldName]) {
							converted[fieldName] = converted[otherFieldName];
							// Remove the separate other field since we merged it
							delete converted[otherFieldName];
						}
					}
				}
				
				// Multiple select fields
				else if (Array.isArray(fieldValue)) {
					const convertedValues = fieldValue.map(id => {
						if (id === 'other') {
							const otherFieldName = this.generateOtherFieldName(fieldName);
							return converted[otherFieldName] || this.getText('other');
						}
						const option = fieldConfig.options.find(opt => opt.id === id);
						return option ? option.name : id;
					}).filter(val => val && val.trim() !== ''); // Remove empty values
					
					converted[fieldName] = convertedValues;
					converted[`${fieldName}Array`] = convertedValues;
					converted[`${fieldName}String`] = convertedValues.join(', ');
					
					// Remove the separate other field if it exists
					const otherFieldName = this.generateOtherFieldName(fieldName);
					if (converted[otherFieldName]) {
						delete converted[otherFieldName];
					}
				}
			}
			
			// Handle subsection fields
			if (fieldConfig.subsectionOptions && Array.isArray(fieldConfig.subsectionOptions)) {
				if (typeof fieldValue === 'string') {
					// Find option in subsections
					for (const group of fieldConfig.subsectionOptions) {
						const option = group.subcategories.find(opt => opt.id === fieldValue);
						if (option) {
							converted[fieldName] = option.name;
							break;
						}
					}
				} else if (Array.isArray(fieldValue)) {
					const convertedValues = fieldValue.map(id => {
						for (const group of fieldConfig.subsectionOptions) {
							const option = group.subcategories.find(opt => opt.id === id);
							if (option) return option.name;
						}
						return id;
					}).filter(val => val && val.trim() !== ''); // Remove empty values
					
					converted[fieldName] = convertedValues;
					converted[`${fieldName}Array`] = convertedValues;
					converted[`${fieldName}String`] = convertedValues.join(', ');
				}
			}
			
			// Handle select-with-other fields
			if (fieldConfig.type === 'select-with-other' && typeof fieldValue === 'object') {
				if (fieldValue.main === 'other' && fieldValue.other) {
					converted[fieldName] = fieldValue.other;
				} else if (fieldValue.main && fieldConfig.options) {
					const option = fieldConfig.options.find(opt => opt.id === fieldValue.main);
					converted[fieldName] = option ? option.name : fieldValue.main;
				}
			}
			
			// Handle multiselect-with-other fields
			if (fieldConfig.type === 'multiselect-with-other' && typeof fieldValue === 'object') {
				const allValues = [];
				
				if (fieldValue.main && Array.isArray(fieldValue.main)) {
					const convertedMain = fieldValue.main.map(id => {
						const option = fieldConfig.options.find(opt => opt.id === id);
						return option ? option.name : id;
					});
					allValues.push(...convertedMain);
				}
				
				if (fieldValue.other && fieldValue.other.trim() !== '') {
					allValues.push(fieldValue.other);
				}
				
				converted[fieldName] = allValues;
				converted[`${fieldName}Array`] = allValues;
				converted[`${fieldName}String`] = allValues.join(', ');
			}
		});
		
		return converted;
	}

    /**
     * Universal transformations
     */
    universalTransform(data) {
        const transformed = { ...data };
        const allFieldConfigs = this.getAllFieldConfigs();
        
        // Transform based on field types
        Object.keys(data).forEach(fieldName => {
            const fieldValue = data[fieldName];
            const fieldConfig = this.findFieldConfig(fieldName, allFieldConfigs);
            
            if (!fieldConfig) return;
            
            // Convert yes/no to boolean
            if (fieldConfig.type === 'yesno' || 
                (fieldConfig.type === 'yesno-with-options' && typeof fieldValue === 'string')) {
                
                if (fieldValue === 'yes') {
                    transformed[fieldName] = true;
                } else if (fieldValue === 'no') {
                    transformed[fieldName] = false;
                }
            }
            
            // Clean text fields
            if (['text', 'email', 'phone', 'url', 'textarea'].includes(fieldConfig.type)) {
                if (!fieldValue || (typeof fieldValue === 'string' && fieldValue.trim() === '')) {
                    transformed[fieldName] = "";
                }
            }
            
            // Handle number fields
            if (['number', 'percentage'].includes(fieldConfig.type)) {
                transformed[fieldName] = parseFloat(fieldValue) || 0;
            }
            
            // Ensure arrays for multiselect fields
            if (['multiselect', 'multiselect-with-other', 'multiselect-subsections'].includes(fieldConfig.type)) {
                if (!Array.isArray(fieldValue)) {
                    transformed[fieldName] = fieldValue ? [fieldValue] : [];
                }
                
                if (!transformed[`${fieldName}Array`]) {
                    transformed[`${fieldName}Array`] = transformed[fieldName];
                }
                if (!transformed[`${fieldName}String`]) {
                    transformed[`${fieldName}String`] = Array.isArray(transformed[fieldName]) 
                        ? transformed[fieldName].join(', ') 
                        : '';
                }
            }
        });
        
		// Clean up any remaining other fields and ensure proper formatting
		Object.keys(transformed).forEach(fieldName => {
			const fieldValue = transformed[fieldName];
			
			// Clean up empty arrays and strings
			if (Array.isArray(fieldValue) && fieldValue.length === 0) {
				delete transformed[fieldName];
				delete transformed[`${fieldName}Array`];
				delete transformed[`${fieldName}String`];
			} else if (typeof fieldValue === 'string' && fieldValue.trim() === '') {
				delete transformed[fieldName];
			}
			
			// Remove any remaining otherXXX fields that weren't properly merged
			if (fieldName.startsWith('other') && fieldName.length > 5) {
				const baseFieldName = fieldName.replace(/^other/, '').toLowerCase();
				const baseFieldNamePlural = baseFieldName + 's';
				
				// Check if the base field exists and has incorporated this other value
				if (transformed[baseFieldName] || transformed[baseFieldNamePlural]) {
					delete transformed[fieldName];
				}
			}
		});

		this.setUniversalDefaults(transformed, allFieldConfigs);
			
		this.setUniversalDefaults(transformed, allFieldConfigs);
		return transformed;
    }

    getAllFieldConfigs() {
        if (!this.currentMultiStepForm || !this.currentMultiStepForm.steps) {
            return [];
        }
        
        return this.currentMultiStepForm.steps.flatMap(step => step.fields || []);
    }

    findFieldConfig(fieldName, fieldConfigs) {
        return fieldConfigs.find(config => 
            (config.name === fieldName) || 
            (config.id === fieldName) ||
            (config.yesFields && config.yesFields.some(yf => (yf.name || yf.id) === fieldName)) ||
            (config.noFields && config.noFields.some(nf => (nf.name || nf.id) === fieldName)) ||
            (config.yesField && ((config.yesField.name || config.yesField.id) === fieldName))
        ) || null;
    }

    generateOtherFieldName(fieldName) {
        if (fieldName.endsWith('s')) {
            return `other${fieldName.charAt(0).toUpperCase() + fieldName.slice(1, -1)}`;
        }
        return `other${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`;
    }

    setUniversalDefaults(data, fieldConfigs) {
        const defaultText = "Not specified";
        
        fieldConfigs.forEach(config => {
            const fieldName = config.name || config.id;
            
            if (config.required && !data[fieldName]) {
                if (['text', 'email', 'phone', 'url', 'textarea'].includes(config.type)) {
                    data[fieldName] = "";
                }
                else if (['select', 'select-with-other', 'select-subsections'].includes(config.type)) {
                    data[fieldName] = defaultText;
                }
                else if (['multiselect', 'multiselect-with-other', 'multiselect-subsections'].includes(config.type)) {
                    data[fieldName] = [];
                    data[`${fieldName}Array`] = [];
                    data[`${fieldName}String`] = "";
                }
                else if (config.type === 'yesno') {
                    data[fieldName] = false;
                }
                else if (['number', 'percentage'].includes(config.type)) {
                    data[fieldName] = 0;
                }
            }
        });
    }

    getProcessingSummary(originalData, processedData) {
        const allFieldConfigs = this.getAllFieldConfigs();
        
        return {
            totalFields: Object.keys(originalData).length,
            processedFields: Object.keys(processedData).length,
            fieldTypes: allFieldConfigs.reduce((acc, config) => {
                acc[config.type] = (acc[config.type] || 0) + 1;
                return acc;
            }, {}),
            transformations: {
                flattened: Object.keys(originalData).filter(key => 
                    originalData[key] && typeof originalData[key] === 'object' && 
                    !(processedData[key] && typeof processedData[key] === 'object')
                ),
                converted: Object.keys(processedData).filter(key => 
                    originalData[key] !== processedData[key]
                )
            }
        };
    }

    // ===== STANDARD METHODS =====
    getText(key, customMessages = {}) {
        return customMessages[key] || this.texts[key] || key;
    }

    createYesNoField(config) {
        return new YesNoField(this, config);
    }

    createTextField(config) {
        return new TextField(this, config);
    }

    createTextAreaField(config) {
        return new TextAreaField(this, config);
    }

    createEmailField(config) {
        return new EmailField(this, config);
    }

    createPhoneField(config) {
        return new PhoneField(this, config);
    }

    createUrlField(config) {
        return new UrlField(this, config);
    }

    createNumberField(config) {
        return new NumberField(this, config);
    }

    createPercentageField(config) {
        return new PercentageField(this, config);
    }

    createOptionsStepperField(config) {
        return new OptionsStepperField(this, config);
    }

    createSingleSelectField(config) {
        return new SingleSelectField(this, config);
    }

    createMultiSelectField(config) {
        return new MultiSelectField(this, config);
    }

    createSingleSelectSubsectionsField(config) {
        return new SingleSelectSubsectionsField(this, config);
    }

    createMultiSelectSubsectionsField(config) {
        return new MultiSelectSubsectionsField(this, config);
    }

    createYesNoWithOptionsField(config) {
        return new YesNoWithOptionsField(this, config);
    }

    createSingleSelectWithOtherField(config) {
        return new SingleSelectWithOtherField(this, config);
    }

    createMultiSelectWithOtherField(config) {
        return new MultiSelectWithOtherField(this, config);
    }

    createMultiStepForm(config) {
        return new MultiStepForm(this, config);
    }
	
	createSlidingWindowRangeField(config) {
		return new SlidingWindowRangeField(this, config);
	}

	createDualRangeField(config) {
		return new DualRangeField(this, config);
	}

	createSliderField(config) {
		return new SliderField(this, config);
	}

	createOptionsSliderField(config) {
		return new OptionsSliderField(this, config);
	}
	
	createSlidingWindowSliderField(config) {
		return new SlidingWindowSliderField(this, config);
	}

	createServiceCardField(config) {
        return new ServiceCardField(this, config);
    }
	
	createCalendarField(config) {
        return new CalendarField(this, config);
    }

    createCurrentAppointmentCardField(config) {
        return new CurrentAppointmentCardField(this, config);
    }

    // Cleanup method
    destroy() {
        if (this.globalClickHandlerAttached) {
            document.removeEventListener('click', this.globalClickHandler, true);
            this.globalClickHandlerAttached = false;
        }
        this.openDropdowns.clear();
        this.openInfoPanels.clear();
    }

    static ValidationUtils = {
        isValidEmail(email) {
            const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
            return emailPattern.test(email);
        },

        isValidPhoneNumber(phoneNumber) {
            const phonePattern = /^(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
            return phonePattern.test(phoneNumber);
        },

        isValidUrl(url) {
            if (!url || url.trim() === '') return false;
            let testUrl = url.trim();
            if (!testUrl.match(/^https?:\/\//)) {
                testUrl = 'https://' + testUrl;
            }
            try {
                new URL(testUrl);
                const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]*)?$/;
                return urlPattern.test(url.trim());
            } catch (e) {
                return false;
            }
        },

        formatPhoneNumber(phoneNumber) {
            const cleaned = phoneNumber.replace(/\D/g, '');
            if (cleaned.length === 10) {
                return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
            }
            return phoneNumber;
        },

        normalizeUrl(url) {
            if (!url || url.trim() === '') return '';
            let normalized = url.trim();
            if (!normalized.match(/^https?:\/\//)) {
                if (normalized.startsWith('www.') || normalized.split('.').length > 2) {
                    normalized = 'https://' + normalized;
                } else {
                    normalized = 'https://www.' + normalized;
                }
            }
            return normalized;
        }
    };
}

/**
 * MultiStepForm - Enhanced main manager for multi-step forms
 */
class MultiStepForm {
    constructor(factory, config) {
        this.factory = factory;
        this.config = config;
        this.steps = config.steps || [];
        this.currentStep = 0;
        this.formData = config.initialData || {};
        this.onSubmit = config.onSubmit || null;
        this.onStepChange = config.onStepChange || null;
        this.validateOnNext = config.validateOnNext !== false;
        this.showProgress = config.showProgress !== false;
        this.saveProgressEnabled = config.saveProgress !== false;
        this.storageKey = config.storageKey || 'multistep_form_data';
        
        this.container = null;
        this.stepInstances = [];
        this.progressBar = null;
        this.navigationButtons = null;
        
        this.init();
    }

    init() {
        this.factory.currentMultiStepForm = this;
        this.createContainer();
        this.createProgressBar();
        this.createSteps();
        this.createNavigation();
        this.loadSavedProgress();
        this.showCurrentStep();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'multistep-form';
        this.factory.container.appendChild(this.container);
    }

    createProgressBar() {
        if (!this.showProgress) return;
        
        this.progressBar = new ProgressBar(this, {
            totalSteps: this.steps.length,
            currentStep: this.currentStep
        });
        this.container.appendChild(this.progressBar.render());
    }

    createSteps() {
        this.steps.forEach((stepConfig, index) => {
            const step = new FormStep(this, {
                ...stepConfig,
                index: index,
                isActive: index === this.currentStep
            });
            this.stepInstances.push(step);
            this.container.appendChild(step.render());
        });
    }

    createNavigation() {
        this.navigationButtons = new NavigationButtons(this);
        this.container.appendChild(this.navigationButtons.render());
    }

    showCurrentStep() {
        this.stepInstances.forEach((step, index) => {
            step.setActive(index === this.currentStep);
        });
        
        if (this.progressBar) {
            this.progressBar.updateProgress(this.currentStep);
        }
        
        this.navigationButtons.updateButtons(this.currentStep, this.steps.length);
        
        if (this.onStepChange) {
            this.onStepChange(this.currentStep, this.stepInstances[this.currentStep]);
        }
    }

    nextStep() {
        if (this.validateOnNext && !this.validateCurrentStep()) {
            return false;
        }
        
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.showCurrentStep();
            this.saveProgress();
            return true;
        }
        return false;
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showCurrentStep();
            this.saveProgress();
            return true;
        }
        return false;
    }

    goToStep(stepIndex) {
        if (stepIndex >= 0 && stepIndex < this.steps.length) {
            this.currentStep = stepIndex;
            this.showCurrentStep();
            this.saveProgress();
            return true;
        }
        return false;
    }

    validateCurrentStep() {
        return this.stepInstances[this.currentStep].validate();
    }

    validateAllSteps() {
        return this.stepInstances.every(step => step.validate());
    }

    getFormData() {
        const data = {};
        this.stepInstances.forEach(step => {
            Object.assign(data, step.getStepData());
        });
        return data;
    }

    setFormData(data) {
        this.formData = { ...this.formData, ...data };
        this.stepInstances.forEach(step => {
            step.setStepData(this.formData);
        });
    }

    saveProgress() {
        if (!this.saveProgressEnabled) return;
        
        const progressData = {
            currentStep: this.currentStep,
            formData: this.getFormData(),
            timestamp: Date.now()
        };
        
        localStorage.setItem(this.storageKey, JSON.stringify(progressData));
    }

    loadSavedProgress() {
        if (!this.saveProgressEnabled) return;
        
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const progressData = JSON.parse(saved);
                this.currentStep = progressData.currentStep || 0;
                this.setFormData(progressData.formData || {});
            }
        } catch (e) {
            console.warn('Failed to load saved progress:', e);
        }
    }

    clearSavedProgress() {
        localStorage.removeItem(this.storageKey);
    }

    reset() {
    // Reset step and form data
    this.currentStep = 0;
    this.formData = {};
    
    // Reset all field instances
    this.stepInstances.forEach(step => {
        step.reset();
        // Also clear any error states
        step.fieldInstances.forEach(field => {
            field.hideError();
            field.setValue('');
        });
    });
    
    // Clear factory form values
    this.factory.formValues = {};
    
    // Close any open dropdowns and info panels
    this.factory.closeAllDropdowns();
    this.factory.closeAllInfoPanels();
    
    // Clear saved progress
    this.clearSavedProgress();
    
    // Reset UI state
    this.showCurrentStep();
    
    // Reset any custom field content (like summaries)
    this.stepInstances.forEach(step => {
        step.fieldInstances.forEach(field => {
            if (field.autoSummary && field.updateContent) {
                setTimeout(() => field.updateContent(), 100);
            }
        });
    });
    
    console.log('Form completely reset');
}

    submit() {
        if (!this.validateAllSteps()) {
            return false;
        }
        
        const formData = this.getFormData();
        
        if (this.onSubmit) {
            const result = this.onSubmit(formData);
            if (result !== false) {
                this.clearSavedProgress();
            }
            return result;
        }
        
        this.clearSavedProgress();
        return formData;
    }
}

/**
 * FormStep - Enhanced with subsection field support and row layout
 */
class FormStep {
    constructor(multiStepForm, config) {
        this.multiStepForm = multiStepForm;
        this.factory = multiStepForm.factory;
        this.config = config;
        this.index = config.index;
        this.title = config.title || `Step ${this.index + 1}`;
        this.description = config.description || '';
        this.fields = config.fields || [];
        this.validationRules = config.validation || {};
        this.conditionalLogic = config.conditionalLogic || {};
        
        this.container = null;
        this.fieldInstances = [];
        this.isActive = config.isActive || false;
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = `form-step ${this.isActive ? 'active' : 'hidden'}`;
        this.container.setAttribute('data-step', this.index);

        if (this.title) {
            const titleElement = document.createElement('h2');
            titleElement.className = 'step-title';
            titleElement.textContent = this.title;
            this.container.appendChild(titleElement);
        }

        const fieldsContainer = document.createElement('div');
        fieldsContainer.className = 'step-fields';
        
        // Group fields by row
        const fieldGroups = this.groupFields(this.fields);
        
        fieldGroups.forEach(group => {
            if (group.isRow) {
                // Create row container
                const rowContainer = document.createElement('div');
                rowContainer.className = 'field-row';
                
                group.fields.forEach(fieldConfig => {
                    const colContainer = document.createElement('div');
                    colContainer.className = 'field-col';
                    
                    const field = this.createField(fieldConfig);
                    if (field) {
                        this.fieldInstances.push(field);
                        colContainer.appendChild(field.render());
                    }
                    rowContainer.appendChild(colContainer);
                });
                
                fieldsContainer.appendChild(rowContainer);
            } else {
                // Single field
                const field = this.createField(group.fields[0]);
                if (field) {
                    this.fieldInstances.push(field);
                    fieldsContainer.appendChild(field.render());
                }
            }
        });

        this.container.appendChild(fieldsContainer);
        this.setupConditionalLogic();
        
        return this.container;
    }

    groupFields(fields) {
        const groups = [];
        let i = 0;
        
        while (i < fields.length) {
            const currentField = fields[i];
            
            // Check if current field should be in a row with the next field
            if (currentField.row && i + 1 < fields.length) {
                const nextField = fields[i + 1];
                if (nextField.row === currentField.row) {
                    // Find all fields with the same row identifier
                    const rowFields = [];
                    let j = i;
                    while (j < fields.length && fields[j].row === currentField.row) {
                        rowFields.push(fields[j]);
                        j++;
                    }
                    
                    groups.push({
                        isRow: true,
                        fields: rowFields
                    });
                    
                    i = j; // Skip the grouped fields
                    continue;
                }
            }
            
            // Single field
            groups.push({
                isRow: false,
                fields: [currentField]
            });
            
            i++;
        }
        
        return groups;
    }

    createField(config) {
        const fieldType = config.type;
        const fieldConfig = {
            ...config,
            onChange: (value) => {
                this.handleFieldChange(config.name, value);
                if (config.onChange) {
                    config.onChange(value);
                }
            }
        };

        switch (fieldType) {
            case 'text':
                return this.factory.createTextField(fieldConfig);
            case 'email':
                return this.factory.createEmailField(fieldConfig);
            case 'phone':
                return this.factory.createPhoneField(fieldConfig);
            case 'url':
                return this.factory.createUrlField(fieldConfig);
            case 'textarea':
                return this.factory.createTextAreaField(fieldConfig);
            case 'number':
                return this.factory.createNumberField(fieldConfig);
            case 'percentage':
                return this.factory.createPercentageField(fieldConfig);
            case 'options-stepper':
                return this.factory.createOptionsStepperField(fieldConfig);
            case 'yesno':
                return this.factory.createYesNoField(fieldConfig);
            case 'select':
                return this.factory.createSingleSelectField(fieldConfig);
            case 'multiselect':
                return this.factory.createMultiSelectField(fieldConfig);
            case 'select-subsections':
                return this.factory.createSingleSelectSubsectionsField(fieldConfig);
            case 'multiselect-subsections':
                return this.factory.createMultiSelectSubsectionsField(fieldConfig);
            case 'yesno-with-options':
                return this.factory.createYesNoWithOptionsField(fieldConfig);
            case 'select-with-other':
                return this.factory.createSingleSelectWithOtherField(fieldConfig);
            case 'multiselect-with-other':
                return this.factory.createMultiSelectWithOtherField(fieldConfig);
            case 'sliding-window-range':
                return this.factory.createSlidingWindowRangeField(fieldConfig);
            case 'dual-range':
                return this.factory.createDualRangeField(fieldConfig);
            case 'sliding window':
                return this.factory.createSliderField(fieldConfig);
            case 'slider':
                return this.factory.createSlidingWindowSliderField(fieldConfig);
            case 'options-slider':
                return this.factory.createOptionsSliderField(fieldConfig);
            case 'serviceCard':
                return this.factory.createServiceCardField(fieldConfig);
            case 'calendar':
                return this.factory.createCalendarField(fieldConfig);
            case 'currentAppointmentCard':
                return this.factory.createCurrentAppointmentCardField(fieldConfig);
            case 'custom':
                return new CustomField(this.factory, fieldConfig);
            default:
                console.warn(`Unknown field type: ${fieldType}`);
                return null;
        }
    }

    handleFieldChange(fieldName, value) {
        this.multiStepForm.formData[fieldName] = value;
        this.executeConditionalLogic(fieldName, value);
        this.multiStepForm.saveProgress();
    }

    setupConditionalLogic() {
        Object.keys(this.conditionalLogic).forEach(fieldName => {
            const currentValue = this.multiStepForm.formData[fieldName];
            if (currentValue !== undefined) {
                this.executeConditionalLogic(fieldName, currentValue);
            }
        });
    }

    executeConditionalLogic(fieldName, value) {
        const logic = this.conditionalLogic[fieldName];
        if (!logic) return;

        logic.forEach(rule => {
            const { condition, target, action } = rule;
            const shouldExecute = this.evaluateCondition(condition, value);
            
            if (shouldExecute) {
                this.executeAction(target, action);
            }
        });
    }

    evaluateCondition(condition, value) {
        if (typeof condition === 'function') {
            return condition(value);
        }
        
        if (typeof condition === 'object') {
            const { equals, notEquals, includes, notIncludes } = condition;
            
            if (equals !== undefined) {
                return value === equals;
            }
            if (notEquals !== undefined) {
                return value !== notEquals;
            }
            if (includes !== undefined) {
                return Array.isArray(value) ? value.includes(includes) : value === includes;
            }
            if (notIncludes !== undefined) {
                return Array.isArray(value) ? !value.includes(notIncludes) : value !== notIncludes;
            }
        }
        
        return value === condition;
    }

    executeAction(target, action) {
        const field = this.fieldInstances.find(f => f.name === target);
        if (!field) return;

        switch (action.type) {
            case 'show':
                field.show();
                break;
            case 'hide':
                field.hide();
                break;
            case 'enable':
                field.enable();
                break;
            case 'disable':
                field.disable();
                break;
            case 'setValue':
                field.setValue(action.value);
                break;
            case 'setOptions':
                if (field.setOptions) {
                    field.setOptions(action.options);
                }
                break;
        }
    }

    setActive(active) {
        this.isActive = active;
        if (this.container) {
            this.container.classList.toggle('active', active);
            this.container.classList.toggle('hidden', !active);
        }
    }

    validate() {
        let isValid = true;
        
        this.fieldInstances.forEach(field => {
            if (!field.validate()) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    getStepData() {
        const data = {};
        this.fieldInstances.forEach(field => {
            data[field.name] = field.getValue();
        });
        return data;
    }

    setStepData(data) {
        this.fieldInstances.forEach(field => {
            if (data[field.name] !== undefined) {
                field.setValue(data[field.name]);
            }
        });
    }

    reset() {
        this.fieldInstances.forEach(field => {
            field.setValue('');
        });
    }
}
/**
 * ProgressBar - Progress bar for multi-step forms
 */
class ProgressBar {
    constructor(multiStepForm, config) {
        this.multiStepForm = multiStepForm;
        this.config = config;
        this.totalSteps = config.totalSteps;
        this.currentStep = config.currentStep || 0;
        this.showStepNumbers = config.showStepNumbers !== false;
        this.showStepTitles = config.showStepTitles !== false;
        
        this.container = null;
        this.progressFill = null;
        this.stepInfo = null;
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = 'progress-container';

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        this.progressFill = document.createElement('div');
        this.progressFill.className = 'progress-fill';
        progressBar.appendChild(this.progressFill);
        
        this.container.appendChild(progressBar);

        if (this.showStepNumbers || this.showStepTitles) {
            this.stepInfo = document.createElement('div');
            this.stepInfo.className = 'step-info';
            this.container.appendChild(this.stepInfo);
        }

        this.updateProgress(this.currentStep);
        
        return this.container;
    }

    updateProgress(currentStep) {
        this.currentStep = currentStep;
        
        if (this.progressFill) {
            const progress = (currentStep / (this.totalSteps - 1)) * 100;
            this.progressFill.style.width = `${Math.min(progress, 100)}%`;
        }
        
        if (this.stepInfo) {
            let infoText = '';
            
            if (this.showStepNumbers) {
                infoText += `${this.multiStepForm.factory.getText('step')} ${currentStep + 1} ${this.multiStepForm.factory.getText('of')} ${this.totalSteps}`;
            }
            
            if (this.showStepTitles && this.multiStepForm.steps[currentStep]) {
                const stepTitle = this.multiStepForm.steps[currentStep].title;
                if (stepTitle) {
                    if (infoText) infoText += ' - ';
                    infoText += stepTitle;
                }
            }
            
            this.stepInfo.textContent = infoText;
        }
    }
}

/**
 * NavigationButtons - Navigation buttons for multi-step forms
 */
class NavigationButtons {
    constructor(multiStepForm) {
        this.multiStepForm = multiStepForm;
        this.factory = multiStepForm.factory;
        
        this.container = null;
        this.prevButton = null;
        this.nextButton = null;
        this.submitButton = null;
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = 'form-navigation';

        this.prevButton = document.createElement('button');
        this.prevButton.type = 'button';
        this.prevButton.className = 'btn btn-prev';
        this.prevButton.textContent = this.factory.getText('previous');
        this.prevButton.addEventListener('click', () => {
            this.multiStepForm.previousStep();
        });

        this.nextButton = document.createElement('button');
        this.nextButton.type = 'button';
        this.nextButton.className = 'btn btn-next';
        this.nextButton.textContent = this.factory.getText('next');
        this.nextButton.addEventListener('click', () => {
            this.multiStepForm.nextStep();
        });

        this.submitButton = document.createElement('button');
        this.submitButton.type = 'button';
        this.submitButton.className = 'btn btn-submit';
        this.submitButton.textContent = this.factory.getText('submit');
        this.submitButton.addEventListener('click', () => {
            this.multiStepForm.submit();
        });

        this.container.appendChild(this.prevButton);
        this.container.appendChild(this.nextButton);
        this.container.appendChild(this.submitButton);

        return this.container;
    }

    updateButtons(currentStep, totalSteps) {
        this.prevButton.style.display = currentStep > 0 ? 'inline-block' : 'none';
        
        if (currentStep === totalSteps - 1) {
            this.nextButton.style.display = 'none';
            this.submitButton.style.display = 'inline-block';
        } else {
            this.nextButton.style.display = 'inline-block';
            this.submitButton.style.display = 'none';
        }
    }
}

/**
 * BaseField - Enhanced base class for all fields with personalized error messages
 */
class BaseField {
    constructor(factory, config) {
        this.factory = factory;
        this.id = config.id;
        this.name = config.name || config.id;
        this.label = config.label || '';
        this.required = config.required || false;
        this.placeholder = config.placeholder || '';
        this.value = config.value || config.defaultValue || '';
        this.containerClass = config.containerClass || 'form-group';
        this.onChange = config.onChange || null;
        this.customValidation = config.customValidation || null;
        
        // Custom error messages support
        this.customErrorMessage = config.customErrorMessage || null;
        this.customErrorMessages = config.customErrorMessages || {};
        
        this.infoButton = config.infoButton || null;
        
        this.element = null;
        this.errorElement = null;
        this.container = null;
        this.infoPanel = null;
        this.infoPanelInstance = null;
    }

    // Get field-specific error message
    getFieldErrorMessage(errorType = 'required') {
        // Priority: 1. Custom message for specific error type, 2. General custom message, 3. Factory default
        if (this.customErrorMessages[errorType]) {
            return this.customErrorMessages[errorType];
        }
        
        if (errorType === 'required' && this.customErrorMessage) {
            return this.customErrorMessage;
        }
        
        // Fallback to factory defaults based on error type
        switch (errorType) {
            case 'required':
                return this.factory.getText('fieldRequired');
            case 'invalid':
            case 'email':
                return this.factory.getText('emailInvalid');
            case 'phone':
                return this.factory.getText('phoneInvalid');
            case 'url':
                return this.factory.getText('urlInvalid');
            case 'selectAtLeastOne':
                return this.factory.getText('selectAtLeastOne');
            case 'serviceRequired':
                return this.factory.getText('serviceRequired');
            case 'dateTimeRequired':
                return this.factory.getText('dateTimeRequired');
            default:
                return this.factory.getText('fieldRequired');
        }
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = this.containerClass;
        return this.container;
    }

    createLabel() {
        const labelContainer = document.createElement('div');
        labelContainer.className = 'label-container';
        
        const label = document.createElement('label');
        label.className = 'form-label';
        label.setAttribute('for', this.id);
        label.textContent = this.label;
        
        if (this.required) {
            label.classList.add('required');
            const requiredSpan = document.createElement('span');
            //requiredSpan.textContent = ' *';
            requiredSpan.className = 'required-indicator';
            label.appendChild(requiredSpan);
        }
        
        if (this.infoButton) {
            const infoBtn = document.createElement('button');
            infoBtn.className = 'info-button';
            infoBtn.type = 'button';
            infoBtn.setAttribute('aria-label', 'Plus d\'informations');
            infoBtn.innerHTML = this.factory.SVG_ICONS.INFO;
            
            infoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleInfoPanel();
            });
            
            label.appendChild(infoBtn);
            
            const infoPanel = this.createInfoPanel();
            if (infoPanel) {
                labelContainer.appendChild(label);
                labelContainer.appendChild(infoPanel);
                return labelContainer;
            }
        }
        
        labelContainer.appendChild(label);
        return labelContainer;
    }

    createQuestionLabel() {
        const labelContainer = document.createElement('div');
        labelContainer.className = 'label-container';
        
        const label = document.createElement('label');
        label.className = 'question-label';
        label.textContent = this.label;
        
        if (this.required) {
            label.classList.add('required');
        }
        
        if (this.infoButton) {
            const infoBtn = document.createElement('button');
            infoBtn.className = 'info-button';
            infoBtn.type = 'button';
            infoBtn.setAttribute('aria-label', 'Plus d\'informations');
            infoBtn.innerHTML = this.factory.SVG_ICONS.INFO;
            
            infoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleInfoPanel();
            });
            
            label.appendChild(infoBtn);
            
            const infoPanel = this.createInfoPanel();
            if (infoPanel) {
                labelContainer.appendChild(label);
                labelContainer.appendChild(infoPanel);
                return labelContainer;
            }
        }
        
        labelContainer.appendChild(label);
        return labelContainer;
    }

    createInfoPanel() {
        if (!this.infoButton) return null;
        
        this.infoPanel = document.createElement('div');
        this.infoPanel.className = 'info-panel';
        this.infoPanel.id = `${this.id}-info`;
        
        if (this.infoButton.title) {
            const titleEl = document.createElement('div');
            titleEl.className = 'info-title';
            titleEl.textContent = this.infoButton.title;
            this.infoPanel.appendChild(titleEl);
        }
        
        const contentEl = document.createElement('div');
        contentEl.innerHTML = this.infoButton.content;
        this.infoPanel.appendChild(contentEl);
        
        const closeButton = document.createElement('button');
        closeButton.className = 'close-info';
        closeButton.type = 'button';
        closeButton.setAttribute('aria-label', 'Fermer');
        closeButton.innerHTML = this.factory.SVG_ICONS.CLOSE;
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.hideInfoPanel();
        });
        this.infoPanel.appendChild(closeButton);
        
        return this.infoPanel;
    }

    toggleInfoPanel() {
        if (!this.infoPanel) return;
        
        const isCurrentlyShown = this.infoPanel.classList.contains('show');
        
        if (isCurrentlyShown) {
            this.hideInfoPanel();
        } else {
            this.showInfoPanel();
        }
    }

    showInfoPanel() {
        if (!this.infoPanel) return;
        
        this.factory.closeAllInfoPanels();
        
        this.infoPanel.classList.add('show');
        
        this.infoPanelInstance = {
            element: this.infoPanel,
            button: this.container.querySelector('.info-button'),
            close: () => this.hideInfoPanel()
        };
        
        this.factory.registerInfoPanel(this.infoPanelInstance);
    }

    hideInfoPanel() {
        if (this.infoPanel) {
            this.infoPanel.classList.remove('show');
            
            if (this.infoPanelInstance) {
                this.factory.unregisterInfoPanel(this.infoPanelInstance);
                this.infoPanelInstance = null;
            }
        }
    }

    createErrorElement() {
        this.errorElement = document.createElement('div');
        this.errorElement.className = 'error-message';
        this.errorElement.id = `error-${this.id}`;
        this.errorElement.innerHTML = `
            <div class="error-icon">!</div>
            <span class="error-text">${this.getFieldErrorMessage('required')}</span>
        `;
        return this.errorElement;
    }

    showError(message) {
        if (this.errorElement) {
            const errorText = this.errorElement.querySelector('.error-text');
            if (errorText) {
                errorText.textContent = message || this.getFieldErrorMessage('required');
            }
            this.errorElement.classList.add('show');
        }
    }

    hideError() {
        if (this.errorElement) {
            this.errorElement.classList.remove('show');
        }
    }

    validate() {
        if (this.required && !this.getValue()) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }

        if (this.customValidation) {
            const result = this.customValidation(this.getValue());
            if (result !== true) {
                this.showError(result);
                return false;
            }
        }

        this.hideError();
        return true;
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
        if (this.element) {
            this.element.value = value;
        }
    }

    handleChange() {
        if (this.onChange) {
            this.onChange(this.getValue());
        }
        if (this.factory.onChangeCallback) {
            this.factory.onChangeCallback(this.name, this.getValue());
        }
        this.factory.formValues[this.name] = this.getValue();
    }

    show() {
        if (this.container) {
            this.container.style.display = 'block';
        }
    }

    hide() {
        if (this.container) {
            this.container.style.display = 'none';
        }
    }

    enable() {
        if (this.container) {
            const inputs = this.container.querySelectorAll('input, select, button');
            inputs.forEach(input => input.disabled = false);
        }
    }

    disable() {
        if (this.container) {
            const inputs = this.container.querySelectorAll('input, select, button');
            inputs.forEach(input => input.disabled = true);
        }
    }

    cleanup() {
        this.hideInfoPanel();
    }

    render() {
        throw new Error('render() method must be implemented by subclass');
    }

    resetToInitial() {
        this.value = this.defaultValue || '';
        this.hideError();
        
        if (this.element) {
            if (this.element.type === 'checkbox' || this.element.type === 'radio') {
                this.element.checked = false;
            } else {
                this.element.value = '';
            }
        }
    }

    clearVisualState() {
        this.hideError();
        this.hideInfoPanel();
    }
}

/**
 * YesNoField - Yes/No field with personalized error messages
 */
/**
 * YesNoField - Generalized Yes/No field with custom options support
 */
class YesNoField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Support for custom options
        this.customOptions = config.customOptions || null;
        
        // If customOptions provided, use them, otherwise default to yes/no
        if (this.customOptions && Array.isArray(this.customOptions) && this.customOptions.length === 2) {
            this.yesOption = this.customOptions[0];
            this.noOption = this.customOptions[1];
        } else {
            this.yesOption = { value: 'yes', label: factory.getText('yes') };
            this.noOption = { value: 'no', label: factory.getText('no') };
        }
    }

    render() {
        const container = this.createContainer();
        
        const labelContainer = this.createQuestionLabel();
        
        const optionsGroup = document.createElement('div');
        optionsGroup.className = 'options-group';
        
        const yesOption = document.createElement('label');
        yesOption.className = 'radio-option';
        yesOption.innerHTML = `
            <input type="radio" name="${this.name}" value="${this.yesOption.value}" />
            <span class="radio-icon"></span>
            <span class="radio-label">${this.yesOption.label}</span>
        `;
        
        const noOption = document.createElement('label');
        noOption.className = 'radio-option';
        noOption.innerHTML = `
            <input type="radio" name="${this.name}" value="${this.noOption.value}" />
            <span class="radio-icon"></span>
            <span class="radio-label">${this.noOption.label}</span>
        `;
        
        optionsGroup.appendChild(yesOption);
        optionsGroup.appendChild(noOption);
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(labelContainer);
        container.appendChild(optionsGroup);
        container.appendChild(errorElement);
        
        const radioInputs = container.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(radio => {
            radio.addEventListener('change', () => {
                this.value = radio.value;
                this.hideError();
                this.handleChange();
            });
        });
        
        this.container = container;
        return container;
    }

    validate() {
        if (this.required && !this.getValue()) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        return super.validate();
    }

    getValue() {
        if (this.container) {
            const checkedRadio = this.container.querySelector('input[type="radio"]:checked');
            return checkedRadio ? checkedRadio.value : '';
        }
        return this.value;
    }

    setValue(value) {
        this.value = value;
        if (this.container) {
            const radio = this.container.querySelector(`input[value="${value}"]`);
            if (radio) radio.checked = true;
        }
    }

    // Get display value for the current selection
    getDisplayValue() {
        const currentValue = this.getValue();
        if (currentValue === this.yesOption.value) {
            return this.yesOption.label;
        } else if (currentValue === this.noOption.value) {
            return this.noOption.label;
        }
        return currentValue;
    }
}

/**
 * Enhanced NumberField with support for linked constraints and personalized error messages
 */
class NumberField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.min = config.min || 0;
        this.max = config.max || 1000000;
        this.step = config.step || 1;
        this.prefix = config.prefix || '';
        this.suffix = config.suffix || '';
        this.customValidation = config.customValidation || null;
        this.linkedField = config.linkedField || null;
        this.value = config.value || config.defaultValue || 0;
        this.errorElement = null;
    }

    validateValue(newValue) {
        if (this.customValidation) {
            const validationResult = this.customValidation(newValue, this.factory.formValues);
            if (validationResult !== true) {
                if (typeof validationResult === 'object') {
                    this.showError(validationResult.message);
                    return validationResult.adjustedValue !== undefined ? validationResult.adjustedValue : this.value;
                } else if (typeof validationResult === 'string') {
                    this.showError(validationResult);
                    return this.value;
                }
                return this.value;
            }
        }
        this.hideError();
        return newValue;
    }

    validate() {
        if (this.required && (this.value === null || this.value === undefined || this.value === '')) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        return super.validate();
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = 'form-group';

        const label = this.createLabel();
        this.container.appendChild(label);

        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';

        const decrementBtn = document.createElement('button');
        decrementBtn.type = 'button';
        decrementBtn.className = 'decrement-btn';
        decrementBtn.innerHTML = this.factory.SVG_ICONS.MINUS;

        this.element = document.createElement('input');
        this.element.type = 'number';
        this.element.id = this.id;
        this.element.value = this.formatValue(this.value);

        const incrementBtn = document.createElement('button');
        incrementBtn.type = 'button';
        incrementBtn.className = 'increment-btn';
        incrementBtn.innerHTML = this.factory.SVG_ICONS.PLUS;

        inputGroup.appendChild(decrementBtn);
        inputGroup.appendChild(this.element);
        inputGroup.appendChild(incrementBtn);
        this.container.appendChild(inputGroup);

        // Add error element
        const errorEl = this.createErrorElement();
        this.container.appendChild(errorEl);

        // Event listeners
        this.element.addEventListener('input', () => {
            const newValue = this.parseValue(this.element.value);
            const validatedValue = this.validateValue(newValue);
            this.value = validatedValue;
            this.element.value = this.formatValue(this.value);
            this.handleChange();
        });

        decrementBtn.addEventListener('click', () => {
            const newValue = Math.max(this.min, this.value - this.step);
            const validatedValue = this.validateValue(newValue);
            this.value = validatedValue;
            this.element.value = this.formatValue(this.value);
            this.handleChange();
        });

        incrementBtn.addEventListener('click', () => {
            const newValue = Math.min(this.max, this.value + this.step);
            const validatedValue = this.validateValue(newValue);
            this.value = validatedValue;
            this.element.value = this.formatValue(this.value);
            this.handleChange();
        });

        return this.container;
    }

    formatValue(value) {
        return value.toString();
    }

    parseValue(value) {
        return parseFloat((value || '').toString().replace(/\s/g, '')) || 0;
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = this.parseValue(value);
        if (this.element) {
            this.element.value = this.formatValue(this.value);
        }
    }

    // Method to trigger validation from external sources
    revalidate() {
        const validatedValue = this.validateValue(this.value);
        if (validatedValue !== this.value) {
            this.value = validatedValue;
            this.element.value = this.formatValue(this.value);
            this.handleChange();
        }
    }
}

class PercentageField extends NumberField {
    constructor(factory, config) {
        super(factory, config);
        this.min = config.min || 0;
        this.max = config.max || 20;
        this.step = config.step || 0.05;
        this.decimalPlaces = config.decimalPlaces || 2;
    }

    formatValue(value) {
        return parseFloat(value).toFixed(this.decimalPlaces);
    }

    parseValue(value) {
        return parseFloat(value) || 0;
    }
}

class OptionsStepperField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.options = config.options || [];
        this.currentIndex = config.defaultIndex || 0;
        this.displayFormatter = config.displayFormatter || null;
        this.fieldStyle = config.fieldStyle || 'default';
        this.value = this.getCurrentValue();
    }

    getCurrentValue() {
        const option = this.options[this.currentIndex];
        return typeof option === 'object' ? option.value : option;
    }

    validate() {
        if (this.required && (this.value === undefined || this.value === null || this.value === '')) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        return super.validate();
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = 'form-group';
        
        if (this.fieldStyle === 'stepper') {
            this.container.classList.add('stepper-field');
        }

        const label = this.createLabel();
        this.container.appendChild(label);

        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';

        const decrementBtn = document.createElement('button');
        decrementBtn.type = 'button';
        decrementBtn.className = 'decrement-btn';
        decrementBtn.innerHTML = this.factory.SVG_ICONS.MINUS;

        this.element = document.createElement('input');
        this.element.type = 'text';
        this.element.id = this.id;
        this.element.className = 'stepper-display-input';
        this.element.readOnly = true;
        this.element.value = this.getDisplayText();

        const incrementBtn = document.createElement('button');
        incrementBtn.type = 'button';
        incrementBtn.className = 'increment-btn';
        incrementBtn.innerHTML = this.factory.SVG_ICONS.PLUS;

        inputGroup.appendChild(decrementBtn);
        inputGroup.appendChild(this.element);
        inputGroup.appendChild(incrementBtn);
        this.container.appendChild(inputGroup);

        // Update initial value
        this.updateValue();

        // Event listeners
        decrementBtn.addEventListener('click', () => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.updateValue();
                this.updateDisplay();
                this.handleChange();
            }
        });

        incrementBtn.addEventListener('click', () => {
            if (this.currentIndex < this.options.length - 1) {
                this.currentIndex++;
                this.updateValue();
                this.updateDisplay();
                this.handleChange();
            }
        });

        return this.container;
    }

    updateValue() {
        const option = this.options[this.currentIndex];
        this.value = typeof option === 'object' ? option.value : option;
    }

    updateDisplay() {
        this.element.value = this.getDisplayText();
    }

    getDisplayText() {
        const option = this.options[this.currentIndex];
        if (this.displayFormatter) {
            return this.displayFormatter(option);
        }
        return typeof option === 'object' ? option.display || option.label || option.value : option;
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        const index = this.options.findIndex(opt => 
            (typeof opt === 'object' ? opt.value : opt) === value
        );
        if (index !== -1) {
            this.currentIndex = index;
            this.updateValue();
            this.updateDisplay();
        }
    }
}

/**
 * TextField - Simple text field with personalized error messages
 */
class TextField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.maxLength = config.maxLength || null;
        this.minLength = config.minLength || null;
    }

    validate() {
        const value = this.getValue();
        
        if (this.required && !value) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        if (this.minLength && value.length < this.minLength) {
            const message = this.getFieldErrorMessage('minLength') || 
                `Minimum ${this.minLength} characters required`;
            this.showError(message);
            return false;
        }
        
        return super.validate();
    }

    render() {
        const container = this.createContainer();
        const labelContainer = this.createLabel();
        
        this.element = document.createElement('input');
        this.element.type = 'text';
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.placeholder = this.placeholder;
        this.element.value = this.value;
        
        if (this.maxLength) {
            this.element.maxLength = this.maxLength;
        }
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(labelContainer);
        container.appendChild(this.element);
        container.appendChild(errorElement);
        
        this.element.addEventListener('input', () => {
            this.value = this.element.value.trim();
            if (this.value) this.hideError();
            this.handleChange();
        });
        
        this.container = container;
        return container;
    }
}

/**
 * TextAreaField - Multiple text field with personalized error messages
 */
class TextAreaField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.rows = config.rows || 4;
        this.maxLength = config.maxLength || 500;
        this.showCounter = config.showCounter !== false;
        this.minHeight = config.minHeight || 120;
    }

    validate() {
        const value = this.getValue();
        
        if (this.required && !value) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        return super.validate();
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const textareaWrapper = document.createElement('div');
        textareaWrapper.className = 'textarea-wrapper';
        
        this.element = document.createElement('div');
        this.element.id = this.id;
        this.element.className = 'custom-textarea';
        this.element.setAttribute('contenteditable', 'true');
        this.element.setAttribute('data-placeholder', this.placeholder);
        this.element.style.minHeight = `${this.minHeight}px`;
        
        const lineHeight = 20;
        this.element.style.height = `${Math.max(this.minHeight, this.rows * lineHeight + 24)}px`;
        
        if (this.value) {
            this.element.textContent = this.value;
        }
        
        textareaWrapper.appendChild(this.element);
        
        if (this.showCounter) {
            this.counterElement = document.createElement('div');
            this.counterElement.className = 'char-counter';
            this.counterElement.innerHTML = `<span id="${this.id}-counter">${this.value.length}</span>/${this.maxLength}`;
            textareaWrapper.appendChild(this.counterElement);
        }
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(label);
        container.appendChild(textareaWrapper);
        container.appendChild(errorElement);
        
        this.element.addEventListener('input', () => {
            let text = this.element.textContent || '';
            
            if (this.maxLength && text.length > this.maxLength) {
                text = text.substring(0, this.maxLength);
                this.element.textContent = text;
                
                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(this.element);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            }
            
            this.value = text.trim();
            if (this.value) this.hideError();
            
            if (this.showCounter) {
                const counter = container.querySelector(`#${this.id}-counter`);
                if (counter) counter.textContent = text.length;
            }
            
            this.handleChange();
        });
        
        this.element.addEventListener('focus', () => {
            if (this.element.textContent === '') {
                this.element.classList.add('focused');
            }
        });
        
        this.element.addEventListener('blur', () => {
            this.element.classList.remove('focused');
        });
        
        this.element.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text/plain');
            const maxLength = this.maxLength || text.length;
            const finalText = text.substring(0, maxLength);
            
            document.execCommand('insertText', false, finalText);
        });
        
        this.container = container;
        return container;
    }

    getValue() {
        return this.element ? (this.element.textContent || '').trim() : this.value;
    }

    setValue(value) {
        this.value = value;
        if (this.element) {
            this.element.textContent = value;
            
            if (this.showCounter && this.counterElement) {
                const counter = this.counterElement.querySelector(`#${this.id}-counter`);
                if (counter) counter.textContent = value.length;
            }
        }
    }
}

/**
 * EmailField - Email field with personalized error messages
 */
class EmailField extends TextField {
    validate() {
        const value = this.getValue();
        
        if (this.required && !value) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        if (value && !FormFieldFactory.ValidationUtils.isValidEmail(value)) {
            this.showError(this.getFieldErrorMessage('invalid'));
            return false;
        }
        
        return super.validate();
    }

    render() {
        const container = super.render();
        this.element.type = 'email';
        
        // REPLACE with this:
		this.element.addEventListener('input', () => {
			this.value = this.element.value.trim();
			if (this.value) {
				this.hideError(); // Only hide error, don't show it
			}
			this.handleChange();
		});

		// ADD this new blur event listener:
		this.element.addEventListener('blur', () => {
			const value = this.element.value.trim();
			if (value) {
				if (FormFieldFactory.ValidationUtils.isValidEmail(value)) {
					this.hideError();
				} else {
					this.showError(this.getFieldErrorMessage('invalid'));
				}
			}
			this.handleChange();
		});
        
        return container;
    }
}

/**
 * PhoneField - Phone field with personalized error messages
 */
class PhoneField extends TextField {
    validate() {
        const value = this.getValue();
        
        if (this.required && !value) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        if (value && !FormFieldFactory.ValidationUtils.isValidPhoneNumber(value)) {
            this.showError(this.getFieldErrorMessage('phone'));
            return false;
        }
        
        return super.validate();
    }

    render() {
        const container = super.render();
        this.element.type = 'tel';
        
        // REPLACE with this:
		this.element.addEventListener('input', () => {
			this.value = this.element.value.trim();
			if (this.value) {
				this.hideError(); // Only hide error, don't show it
			}
			this.handleChange();
		});

		// ADD this new blur event listener:
		this.element.addEventListener('blur', () => {
			const value = this.element.value.trim();
			if (value) {
				if (FormFieldFactory.ValidationUtils.isValidPhoneNumber(value)) {
					this.hideError();
				} else {
					this.showError(this.getFieldErrorMessage('phone'));
				}
			}
			this.handleChange();
		});
        
        return container;
    }

    getValue() {
        const value = this.element ? this.element.value.trim() : this.value;
        return FormFieldFactory.ValidationUtils.formatPhoneNumber(value);
    }
}

/**
 * UrlField - URL field with personalized error messages
 */
class UrlField extends TextField {
    validate() {
        const value = this.getValue();
        
        if (this.required && !value) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        if (value && !FormFieldFactory.ValidationUtils.isValidUrl(value)) {
            this.showError(this.getFieldErrorMessage('url'));
            return false;
        }
        
        return super.validate();
    }

    render() {
        const container = super.render();
        this.element.type = 'url';
        
        this.element.addEventListener('blur', () => {
            const value = this.element.value.trim();
            if (value) {
                if (FormFieldFactory.ValidationUtils.isValidUrl(value)) {
                    const normalized = FormFieldFactory.ValidationUtils.normalizeUrl(value);
                    this.element.value = normalized;
                    this.value = normalized;
                    this.hideError();
                } else {
                    this.showError(this.getFieldErrorMessage('url'));
                }
            }
            this.handleChange();
        });
        
        this.element.addEventListener('input', () => {
            this.value = this.element.value.trim();
            if (this.value && FormFieldFactory.ValidationUtils.isValidUrl(this.value)) {
                this.hideError();
            }
            this.handleChange();
        });
        
        return container;
    }
}

/**
 * YesNoWithOptionsField - Enhanced with subsection field support and personalized error messages
 */
/**
 * YesNoWithOptionsField - Enhanced with generalized option support
 */
class YesNoWithOptionsField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // FIXED: Ensure factory is properly stored for text access
        this.factory = factory;
        
        this.yesFieldConfig = config.yesField || null;
        this.noFieldConfig = config.noField || null;
        
        this.yesFieldsConfig = config.yesFields || (config.yesField ? [config.yesField] : []);
        this.noFieldsConfig = config.noFields || (config.noField ? [config.noField] : []);
        
        this.layout = config.layout || 'below';
        this.customOptions = config.customOptions || null;
        
        // Set up option values and labels
        if (this.customOptions && Array.isArray(this.customOptions) && this.customOptions.length === 2) {
            this.yesOption = this.customOptions[0];
            this.noOption = this.customOptions[1];
        } else {
            this.yesOption = { value: 'yes', label: this.getText('yes') };
            this.noOption = { value: 'no', label: this.getText('no') };
        }
        
        this.yesFieldInstances = [];
        this.noFieldInstances = [];
    }

    // FIXED: Add a helper method to safely get text
    getText(key) {
        return this.factory.getText ? this.factory.getText(key) : 
               this.factory.texts ? this.factory.texts[key] : key;
    }

    validate() {
        if (this.required && !this.getValue().main) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }

        let isValid = true;
        const currentValue = this.getValue();
        
        if (currentValue.main === this.yesOption.value && 
            this.yesContainer && this.yesContainer.style.display === 'block') {
            this.yesFieldInstances.forEach(fieldInstance => {
                if (!fieldInstance.validate()) {
                    isValid = false;
                }
            });
        }
        
        if (currentValue.main === this.noOption.value && 
            this.noContainer && this.noContainer.style.display === 'block') {
            this.noFieldInstances.forEach(fieldInstance => {
                if (!fieldInstance.validate()) {
                    isValid = false;
                }
            });
        }

        if (isValid) {
            this.hideError();
        }

        return isValid;
    }

    render() {
        const container = this.createContainer();
        
        const label = this.createQuestionLabel();
        
        const optionsGroup = document.createElement('div');
        optionsGroup.className = 'options-group';
        
        const yesOption = document.createElement('label');
        yesOption.className = 'radio-option';
        yesOption.innerHTML = `
            <input type="radio" name="${this.name}" value="${this.yesOption.value}" />
            <span class="radio-icon"></span>
            <span class="radio-label">${this.yesOption.label}</span>
        `;
        
        const noOption = document.createElement('label');
        noOption.className = 'radio-option';
        noOption.innerHTML = `
            <input type="radio" name="${this.name}" value="${this.noOption.value}" />
            <span class="radio-icon"></span>
            <span class="radio-label">${this.noOption.label}</span>
        `;
        
        optionsGroup.appendChild(yesOption);
        optionsGroup.appendChild(noOption);
        
        let conditionalContainer;
        if (this.layout === 'side-by-side' && this.yesFieldsConfig.length > 0 && this.noFieldsConfig.length > 0) {
            conditionalContainer = document.createElement('div');
            conditionalContainer.className = 'conditional-side-by-side';
        } else {
            conditionalContainer = document.createElement('div');
        }
        
        let yesContainer = null;
        if (this.yesFieldsConfig.length > 0) {
            yesContainer = document.createElement('div');
            yesContainer.className = 'conditional-field-wrapper';
            yesContainer.id = `${this.id}-yes-options`;
            yesContainer.style.display = 'none';
            
            // Group yesFields by row (same logic as FormStep)
            const yesFieldGroups = this.groupFields(this.yesFieldsConfig);

            yesFieldGroups.forEach(group => {
                if (group.isRow) {
                    // Create row container
                    const rowContainer = document.createElement('div');
                    rowContainer.className = 'field-row';
                    
                    group.fields.forEach((fieldConfig, index) => {
                        const colContainer = document.createElement('div');
                        colContainer.className = 'field-col';
                        
                        const fieldInstance = this.createFieldInstance(fieldConfig, `yes-${this.yesFieldInstances.length}`);
                        if (fieldInstance) {
                            this.yesFieldInstances.push(fieldInstance);
                            colContainer.appendChild(fieldInstance.render());
                        }
                        rowContainer.appendChild(colContainer);
                    });
                    
                    yesContainer.appendChild(rowContainer);
                } else {
                    // Single field
                    const fieldInstance = this.createFieldInstance(group.fields[0], `yes-${this.yesFieldInstances.length}`);
                    if (fieldInstance) {
                        this.yesFieldInstances.push(fieldInstance);
                        const fieldElement = fieldInstance.render();
                        yesContainer.appendChild(fieldElement);
                    }
                }
            });
        }
        
        let noContainer = null;
        if (this.noFieldsConfig.length > 0) {
            noContainer = document.createElement('div');
            noContainer.className = 'conditional-field-wrapper';
            noContainer.id = `${this.id}-no-options`;
            noContainer.style.display = 'none';
            
            // Group noFields by row (same logic as FormStep)
            const noFieldGroups = this.groupFields(this.noFieldsConfig);

            noFieldGroups.forEach(group => {
                if (group.isRow) {
                    // Create row container
                    const rowContainer = document.createElement('div');
                    rowContainer.className = 'field-row';
                    
                    group.fields.forEach((fieldConfig, index) => {
                        const colContainer = document.createElement('div');
                        colContainer.className = 'field-col';
                        
                        const fieldInstance = this.createFieldInstance(fieldConfig, `no-${this.noFieldInstances.length}`);
                        if (fieldInstance) {
                            this.noFieldInstances.push(fieldInstance);
                            colContainer.appendChild(fieldInstance.render());
                        }
                        rowContainer.appendChild(colContainer);
                    });
                    
                    noContainer.appendChild(rowContainer);
                } else {
                    // Single field
                    const fieldInstance = this.createFieldInstance(group.fields[0], `no-${this.noFieldInstances.length}`);
                    if (fieldInstance) {
                        this.noFieldInstances.push(fieldInstance);
                        const fieldElement = fieldInstance.render();
                        noContainer.appendChild(fieldElement);
                    }
                }
            });
        }
        
        if (yesContainer) conditionalContainer.appendChild(yesContainer);
        if (noContainer) conditionalContainer.appendChild(noContainer);
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(label);
        container.appendChild(optionsGroup);
        if (yesContainer || noContainer) {
            container.appendChild(conditionalContainer);
        }
        container.appendChild(errorElement);
        
        const radioInputs = container.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(radio => {
            radio.addEventListener('change', () => {
                this.value = radio.value;
                this.hideError();
                
                const isYesValue = radio.value === this.yesOption.value;
                const isNoValue = radio.value === this.noOption.value;
                
                if (isYesValue) {
                    if (yesContainer) yesContainer.style.display = 'block';
                    if (noContainer) noContainer.style.display = 'none';
                } else if (isNoValue) {
                    if (yesContainer) yesContainer.style.display = 'none';
                    if (noContainer) noContainer.style.display = 'block';
                }
                
                this.handleChange();
            });
        });
        
        this.container = container;
        this.yesContainer = yesContainer;
        this.noContainer = noContainer;
        
        return container;
    }

    createFieldInstance(fieldConfig, suffix) {
        const fieldType = fieldConfig.type;
        const config = {
            ...fieldConfig,
            id: `${this.id}-${suffix}-${fieldConfig.id}`,
            name: fieldConfig.name || fieldConfig.id,
            onChange: (value) => {
                if (fieldConfig.onChange) {
                    fieldConfig.onChange(value);
                }
                this.handleChange();
            }
        };

        switch (fieldType) {
            case 'text':
                return this.factory.createTextField(config);
            case 'email':
                return this.factory.createEmailField(config);
            case 'phone':
                return this.factory.createPhoneField(config);
            case 'url':
                return this.factory.createUrlField(config);
            case 'textarea':
                return this.factory.createTextAreaField(config);
            case 'number':
                return this.factory.createNumberField(config);
            case 'percentage':
                return this.factory.createPercentageField(config);
            case 'options-stepper':
                return this.factory.createOptionsStepperField(config);
            case 'yesno':
                return this.factory.createYesNoField(config);
            case 'select':
                return this.factory.createSingleSelectField(config);
            case 'multiselect':
                return this.factory.createMultiSelectField(config);
            case 'select-subsections':
                return this.factory.createSingleSelectSubsectionsField(config);
            case 'multiselect-subsections':
                return this.factory.createMultiSelectSubsectionsField(config);
            case 'yesno-with-options':
                return this.factory.createYesNoWithOptionsField(config);
            case 'select-with-other':
                return this.factory.createSingleSelectWithOtherField(config);
            case 'multiselect-with-other':
                return this.factory.createMultiSelectWithOtherField(config);
            default:
                console.warn(`Unknown field type: ${fieldType}`);
                return null;
        }
    }

    // Enhanced getValue method to properly extract display names
    getValue() {
        const mainValue = this.container ? 
            this.container.querySelector('input[type="radio"]:checked')?.value || '' : 
            this.value;
            
        const result = { main: mainValue };
        
        if (mainValue === this.yesOption.value && this.yesFieldInstances.length > 0) {
            result.yesValues = {};
            this.yesFieldInstances.forEach((fieldInstance, index) => {
                const fieldConfig = this.yesFieldsConfig[index];
                const fieldValue = fieldInstance.getValue();
                const displayValue = this.extractDisplayValue(fieldValue, fieldInstance, fieldConfig);
                result.yesValues[fieldConfig.name || fieldConfig.id] = displayValue;
            });
        }
        
        if (mainValue === this.noOption.value && this.noFieldInstances.length > 0) {
            result.noValues = {};
            this.noFieldInstances.forEach((fieldInstance, index) => {
                const fieldConfig = this.noFieldsConfig[index];
                const fieldValue = fieldInstance.getValue();
                const displayValue = this.extractDisplayValue(fieldValue, fieldInstance, fieldConfig);
                result.noValues[fieldConfig.name || fieldConfig.id] = displayValue;
            });
        }
        
        return result;
    }

    // Method to extract display values for select/multi-select fields
    extractDisplayValue(value, fieldInstance, fieldConfig) {
        // Handle yes/no fields specifically to prevent double processing
        if (fieldConfig.type === 'yesno') {
            if (typeof value === 'boolean') {
                return value ? this.getText('yes') : this.getText('no');
            }
            if (value === 'yes' || value === 'no') {
                return value === 'yes' ? this.getText('yes') : this.getText('no');
            }
            // Handle true/false string values
            if (value === 'true' || value === 'false') {
                return value === 'true' ? this.getText('yes') : this.getText('no');
            }
            return value; // fallback
        }

        // For select and multi-select fields, get display names instead of IDs
        if (fieldConfig.type === 'select' || fieldConfig.type === 'multiselect' ||
            fieldConfig.type === 'select-with-other' || fieldConfig.type === 'multiselect-with-other') {
            
            if (Array.isArray(value)) {
                // Multi-select case
                return value.map(item => {
                    if (typeof item === 'object' && item.name) {
                        return typeof item.name === 'object' ? 
                               (item.name[this.factory.texts?.language || 'fr'] || item.name.en || item.name.fr) :
                               item.name;
                    }
                    return this.getOptionDisplayName(item, fieldConfig);
                }).filter(Boolean).join(', ');
            } else if (typeof value === 'object' && value !== null) {
                // Single select with object value
                if (value.name) {
                    return typeof value.name === 'object' ? 
                           (value.name[this.factory.texts?.language || 'fr'] || value.name.en || value.name.fr) :
                           value.name;
                }
                if (value.selectedValue) {
                    return this.extractDisplayValue(value.selectedValue, fieldInstance, fieldConfig);
                }
                if (value.value) {
                    return this.getOptionDisplayName(value.value, fieldConfig);
                }
                if (value.id) {
                    return this.getOptionDisplayName(value.id, fieldConfig);
                }
            } else {
                // Simple value - look up display name
                return this.getOptionDisplayName(value, fieldConfig);
            }
        }
        
        // For other field types, return the value as-is
        return value;
    }

    // Helper method to get display name for an option ID
    getOptionDisplayName(optionId, fieldConfig) {
        if (!optionId || !fieldConfig.options) return optionId;
        
        let options = fieldConfig.options;
        
        // If options is a string (data path), try to get it from factory
        if (typeof options === 'string' && this.factory.getData) {
            options = this.factory.getData(options);
        }
        
        if (Array.isArray(options)) {
            const option = options.find(opt => opt.id === optionId);
            if (option && option.name) {
                return typeof option.name === 'object' ? 
                       (option.name[this.factory.texts?.language || 'fr'] || option.name.en || option.name.fr) :
                       option.name;
            }
        }
        
        return optionId; // Fallback to ID if display name not found
    }

    setValue(value) {
        let mainValue = value;
        
        if (typeof value === 'object' && value.main) {
            mainValue = value.main;
            
            if (value.yesValues && this.yesFieldInstances.length > 0) {
                this.yesFieldInstances.forEach((fieldInstance, index) => {
                    const fieldConfig = this.yesFieldsConfig[index];
                    const fieldName = fieldConfig.name || fieldConfig.id;
                    if (value.yesValues[fieldName] !== undefined) {
                        fieldInstance.setValue(value.yesValues[fieldName]);
                    }
                });
            }
            
            if (value.noValues && this.noFieldInstances.length > 0) {
                this.noFieldInstances.forEach((fieldInstance, index) => {
                    const fieldConfig = this.noFieldsConfig[index];
                    const fieldName = fieldConfig.name || fieldConfig.id;
                    if (value.noValues[fieldName] !== undefined) {
                        fieldInstance.setValue(value.noValues[fieldName]);
                    }
                });
            }
        }
        
        this.value = mainValue;
        
        if (this.container) {
            const radio = this.container.querySelector(`input[value="${mainValue}"]`);
            if (radio) {
                radio.checked = true;
                
                if (mainValue === this.yesOption.value) {
                    if (this.yesContainer) this.yesContainer.style.display = 'block';
                    if (this.noContainer) this.noContainer.style.display = 'none';
                } else if (mainValue === this.noOption.value) {
                    if (this.yesContainer) this.yesContainer.style.display = 'none';
                    if (this.noContainer) this.noContainer.style.display = 'block';
                }
            }
        }
    }
    
    groupFields(fields) {
        const groups = [];
        let i = 0;
        
        while (i < fields.length) {
            const currentField = fields[i];
            
            // Check if current field should be in a row with the next field
            if (currentField.row && i + 1 < fields.length) {
                const nextField = fields[i + 1];
                if (nextField.row === currentField.row) {
                    // Find all fields with the same row identifier
                    const rowFields = [];
                    let j = i;
                    while (j < fields.length && fields[j].row === currentField.row) {
                        rowFields.push(fields[j]);
                        j++;
                    }
                    
                    groups.push({
                        isRow: true,
                        fields: rowFields
                    });
                    
                    i = j; // Skip the grouped fields
                    continue;
                }
            }
            
            // Single field
            groups.push({
                isRow: false,
                fields: [currentField]
            });
            
            i++;
        }
        
        return groups;
    }

    // Get display value for the main selection
    getMainDisplayValue() {
        const currentValue = this.getValue().main;
        if (currentValue === this.yesOption.value) {
            return this.yesOption.label;
        } else if (currentValue === this.noOption.value) {
            return this.noOption.label;
        }
        return currentValue;
    }
}

/**
 * SingleSelectField - Simple dropdown with personalized error messages
 */
class SingleSelectField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.options = config.options || [];
        this.placeholder = config.placeholder || factory.getText('selectPlaceholder');
        this.dropdownInstance = null;
        this.isOpen = false;
    }

    validate() {
        if (this.required && !this.getValue()) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        return super.validate();
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';
        
        this.element = document.createElement('select');
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.style.display = 'none';
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = this.placeholder;
        this.element.appendChild(defaultOption);
        
        this.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.name;
            this.element.appendChild(optionElement);
        });
        
        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'select-wrapper';
        
        this.selectDisplayElement = document.createElement('div');
        this.selectDisplayElement.className = 'select-display placeholder';
        this.selectDisplayElement.innerHTML = `
            <span>${this.placeholder}</span>
            <div class="dropdown-icon">
                ${this.factory.SVG_ICONS.CHEVRON}
            </div>
        `;
        
        this.customOptionsElement = document.createElement('div');
        this.customOptionsElement.className = 'custom-options';
        
        this.options.forEach(option => {
            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.setAttribute('data-value', option.id);
            customOption.innerHTML = `
                <div class="option-checkbox">
                    ${this.factory.SVG_ICONS.CHECK}
                </div>
                <span>${option.name}</span>
            `;
            
            customOption.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectOption(option);
            });
            
            this.customOptionsElement.appendChild(customOption);
        });
        
        selectWrapper.appendChild(this.selectDisplayElement);
        selectWrapper.appendChild(this.customOptionsElement);
        
        this.selectDisplayElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });
        
        mainContainer.appendChild(this.element);
        mainContainer.appendChild(selectWrapper);
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(label);
        container.appendChild(mainContainer);
        container.appendChild(errorElement);
        
        this.container = container;
        this.selectWrapper = selectWrapper;
        
        return container;
    }

    selectOption(option) {
        this.customOptionsElement.querySelectorAll('.custom-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        const optionElement = this.customOptionsElement.querySelector(`[data-value="${option.id}"]`);
        if (optionElement) {
            optionElement.classList.add('selected');
        }
        
        this.selectDisplayElement.querySelector('span').textContent = option.name;
        this.selectDisplayElement.classList.remove('placeholder');
        
        this.element.value = option.id;
        this.value = option.id;
        
        this.closeDropdown();
        
        this.hideError();
        this.handleChange();
    }

    toggleDropdown() {
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        if (this.isOpen) return;
        
        this.factory.closeAllDropdowns();
        
        this.customOptionsElement.classList.add('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.add('rotate');
        this.isOpen = true;
        
        this.dropdownInstance = {
            element: this.selectWrapper,
            close: () => this.closeDropdown()
        };
        
        this.factory.registerDropdown(this.dropdownInstance);
    }

    closeDropdown() {
        if (!this.isOpen) return;
        
        this.customOptionsElement.classList.remove('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.remove('rotate');
        this.isOpen = false;
        
        if (this.dropdownInstance) {
            this.factory.unregisterDropdown(this.dropdownInstance);
            this.dropdownInstance = null;
        }
    }

    getValue() {
        return this.element ? this.element.value : this.value;
    }

    setValue(value) {
        this.value = value;
        if (this.element) {
            this.element.value = value;
            
            const option = this.options.find(opt => opt.id === value);
            if (option && this.selectDisplayElement) {
                this.selectDisplayElement.querySelector('span').textContent = option.name;
                this.selectDisplayElement.classList.remove('placeholder');
                
                if (this.customOptionsElement) {
                    this.customOptionsElement.querySelectorAll('.custom-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    const optionElement = this.customOptionsElement.querySelector(`[data-value="${value}"]`);
                    if (optionElement) {
                        optionElement.classList.add('selected');
                    }
                }
            }
        }
    }
}

/**
 * MultiSelectField - Multiple dropdown with personalized error messages
 */
class MultiSelectField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.options = config.options || [];
        this.placeholder = config.placeholder || factory.getText('selectMultiplePlaceholder');
        this.selectedValues = [];
        this.dropdownInstance = null;
        this.isOpen = false;
    }

    validate() {
        if (this.required && this.selectedValues.length === 0) {
            this.showError(this.getFieldErrorMessage('selectAtLeastOne'));
            return false;
        }
        
        return super.validate();
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';
        
        this.element = document.createElement('select');
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.multiple = true;
        this.element.style.display = 'none';
        
        this.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.name;
            this.element.appendChild(optionElement);
        });
        
        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'select-wrapper multi-select';
        
        this.selectDisplayElement = document.createElement('div');
        this.selectDisplayElement.className = 'select-display placeholder';
        this.selectDisplayElement.innerHTML = `
            <span>${this.placeholder}</span>
            <div class="dropdown-icon">
                ${this.factory.SVG_ICONS.CHEVRON}
            </div>
        `;
        
        this.customOptionsElement = document.createElement('div');
        this.customOptionsElement.className = 'custom-options multi-select';
        
        const selectAllOption = document.createElement('div');
        selectAllOption.className = 'custom-option select-all-option';
        selectAllOption.innerHTML = `
            <div class="option-checkbox">
                ${this.factory.SVG_ICONS.CHECK}
            </div>
            <span>${this.factory.getText('selectAll')}</span>
        `;
        
        selectAllOption.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSelectAll();
        });
        
        this.customOptionsElement.appendChild(selectAllOption);
        
        this.options.forEach(option => {
            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.setAttribute('data-value', option.id);
            customOption.innerHTML = `
                <div class="option-checkbox">
                    ${this.factory.SVG_ICONS.CHECK}
                </div>
                <span>${option.name}</span>
            `;
            
            customOption.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleOption(option, customOption);
            });
            
            this.customOptionsElement.appendChild(customOption);
        });
        
        selectWrapper.appendChild(this.selectDisplayElement);
        selectWrapper.appendChild(this.customOptionsElement);
        
        this.selectDisplayElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });
        
        mainContainer.appendChild(this.element);
        mainContainer.appendChild(selectWrapper);
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(label);
        container.appendChild(mainContainer);
        container.appendChild(errorElement);
        
        this.container = container;
        this.selectWrapper = selectWrapper;
        
        return container;
    }

    toggleOption(option, customOption) {
        const isSelected = customOption.classList.contains('selected');
        const optElement = this.element.querySelector(`option[value="${option.id}"]`);
        
        if (isSelected) {
            customOption.classList.remove('selected');
            if (optElement) optElement.selected = false;
            this.selectedValues = this.selectedValues.filter(val => val !== option.id);
        } else {
            customOption.classList.add('selected');
            if (optElement) optElement.selected = true;
            this.selectedValues.push(option.id);
        }
        
        this.updateDisplayText();
        this.updateSelectAllState();
        this.value = this.selectedValues;
        this.hideError();
        this.handleChange();
    }

    toggleSelectAll() {
        const allOptions = this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option)');
        const selectAllOption = this.customOptionsElement.querySelector('.select-all-option');
        const allSelected = Array.from(allOptions).every(opt => opt.classList.contains('selected'));
        
        allOptions.forEach(opt => {
            const optValue = opt.dataset.value;
            const optElement = this.element.querySelector(`option[value="${optValue}"]`);
            
            if (allSelected) {
                opt.classList.remove('selected');
                if (optElement) optElement.selected = false;
            } else {
                opt.classList.add('selected');
                if (optElement) optElement.selected = true;
            }
        });
        
        if (allSelected) {
            selectAllOption.classList.remove('selected');
            this.selectedValues = [];
        } else {
            selectAllOption.classList.add('selected');
            this.selectedValues = this.options.map(opt => opt.id);
        }
        
        this.updateDisplayText();
        this.value = this.selectedValues;
        this.handleChange();
    }

    updateSelectAllState() {
        const allOptions = this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option)');
        const selectAllOption = this.customOptionsElement.querySelector('.select-all-option');
        const allSelected = Array.from(allOptions).every(opt => opt.classList.contains('selected'));
        
        if (allSelected && this.selectedValues.length > 0) {
            selectAllOption.classList.add('selected');
        } else {
            selectAllOption.classList.remove('selected');
        }
    }

    updateDisplayText() {
        const span = this.selectDisplayElement.querySelector('span');
        
        if (this.selectedValues.length === 0) {
            span.textContent = this.placeholder;
            this.selectDisplayElement.classList.add('placeholder');
        } else if (this.selectedValues.length === 1) {
            const option = this.options.find(opt => opt.id === this.selectedValues[0]);
            span.textContent = option ? option.name : this.selectedValues[0];
            this.selectDisplayElement.classList.remove('placeholder');
        } else {
            span.textContent = `${this.selectedValues.length} ${this.factory.getText('selected')}`;
            this.selectDisplayElement.classList.remove('placeholder');
        }
    }

    toggleDropdown() {
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        if (this.isOpen) return;
        
        this.factory.closeAllDropdowns();
        
        this.customOptionsElement.classList.add('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.add('rotate');
        this.isOpen = true;
        
        this.dropdownInstance = {
            element: this.selectWrapper,
            close: () => this.closeDropdown()
        };
        
        this.factory.registerDropdown(this.dropdownInstance);
    }

    closeDropdown() {
        if (!this.isOpen) return;
        
        this.customOptionsElement.classList.remove('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.remove('rotate');
        this.isOpen = false;
        
        if (this.dropdownInstance) {
            this.factory.unregisterDropdown(this.dropdownInstance);
            this.dropdownInstance = null;
        }
    }

    getValue() {
        return this.selectedValues;
    }

    setValue(values) {
        this.selectedValues = Array.isArray(values) ? values : [];
        this.value = this.selectedValues;
        
        if (this.element) {
            Array.from(this.element.options).forEach(option => {
                option.selected = this.selectedValues.includes(option.value);
            });
            
            if (this.customOptionsElement) {
                this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option)').forEach(opt => {
                    if (this.selectedValues.includes(opt.dataset.value)) {
                        opt.classList.add('selected');
                    } else {
                        opt.classList.remove('selected');
                    }
                });
                
                this.updateSelectAllState();
            }
            
            if (this.selectDisplayElement) {
                this.updateDisplayText();
            }
        }
    }
}

/**
 * SingleSelectSubsectionsField - Single select dropdown with nested subsections and personalized error messages
 */
class SingleSelectSubsectionsField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Resolve subsectionOptions from string reference to actual data
        if (typeof config.subsectionOptions === 'string') {
            // Try multiple ways to access the form data
            let optionsData = null;
            
            // Method 1: From factory
            if (factory.formData && factory.formData.options) {
                optionsData = factory.formData.options;
            }
            // Method 2: From factory.data
            else if (factory.data && factory.data.options) {
                optionsData = factory.data.options;
            }
            // Method 3: Direct from factory
            else if (factory.options) {
                optionsData = factory.options;
            }
            // Method 4: From global PropertySearchFormExtension
            else if (typeof window !== 'undefined' && window.PropertySearchFormExtension && window.PropertySearchFormExtension.FORM_DATA) {
                optionsData = window.PropertySearchFormExtension.FORM_DATA.options;
            }
            // Method 5: From global PropertySellFormExtension
            else if (typeof window !== 'undefined' && window.PropertySellFormExtension && window.PropertySellFormExtension.FORM_DATA) {
                optionsData = window.PropertySellFormExtension.FORM_DATA.options;
            }
            // Method 6: From config itself
            else if (config.formData && config.formData.options) {
                optionsData = config.formData.options;
            }
            
            this.subsectionOptions = (optionsData && optionsData[config.subsectionOptions]) || [];
            
            // Log for debugging
            console.log('Resolving subsectionOptions:', config.subsectionOptions);
            console.log('Factory formData:', factory.formData);
            console.log('Factory data:', factory.data);
            console.log('Options data found:', optionsData);
            console.log('Resolved subsectionOptions:', this.subsectionOptions);
        } else {
            this.subsectionOptions = config.subsectionOptions || [];
        }
        
        // Ensure we have an array
        if (!Array.isArray(this.subsectionOptions)) {
            console.warn('subsectionOptions is not an array, using empty array');
            this.subsectionOptions = [];
        }
        
        this.placeholder = config.placeholder || factory.getText('selectSubsectionPlaceholder');
        this.dropdownInstance = null;
        this.isOpen = false;
    }

    validate() {
        if (this.required && !this.getValue()) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        return super.validate();
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';
        
        this.element = document.createElement('select');
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.style.display = 'none';
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = this.placeholder;
        this.element.appendChild(defaultOption);
        
        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'select-wrapper';
        
        this.selectDisplayElement = document.createElement('div');
        this.selectDisplayElement.className = 'select-display placeholder';
        this.selectDisplayElement.innerHTML = `
            <span>${this.placeholder}</span>
            <div class="dropdown-icon">
                ${this.factory.SVG_ICONS.CHEVRON}
            </div>
        `;
        
        this.customOptionsElement = document.createElement('div');
        this.customOptionsElement.className = 'custom-options';
        
        this.buildSubsectionOptions();
        
        selectWrapper.appendChild(this.selectDisplayElement);
        selectWrapper.appendChild(this.customOptionsElement);
        
        this.selectDisplayElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });
        
        mainContainer.appendChild(this.element);
        mainContainer.appendChild(selectWrapper);
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(label);
        container.appendChild(mainContainer);
        container.appendChild(errorElement);
        
        this.container = container;
        this.selectWrapper = selectWrapper;
        
        return container;
    }

    buildSubsectionOptions() {
        // Ensure subsectionOptions is an array
        if (!Array.isArray(this.subsectionOptions)) {
            console.error('subsectionOptions is not an array:', this.subsectionOptions);
            return;
        }

        // Get language from factory with fallbacks
        const language = this.factory?.config?.language || this.factory?.language || 'fr';

        this.subsectionOptions.forEach(group => {
            const mainDiv = document.createElement('div');
            mainDiv.className = 'custom-option category-option';
            mainDiv.dataset.value = group.id;
            
            // Handle multilingual names with better fallbacks
            let groupName = group.name;
            if (typeof group.name === 'object' && group.name !== null) {
                groupName = group.name[language] || group.name.fr || group.name.en || Object.values(group.name)[0] || group.name;
            }
            
            mainDiv.innerHTML = `
                <span>${groupName}</span>
                <div class="main-arrow">
                    <div class="arrow-icon">${this.factory.SVG_ICONS.CHEVRON}</div>
                </div>
            `;
            
            mainDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                
                if (mainDiv.classList.contains('expanded')) {
                    this.collapseSection(mainDiv);
                } else {
                    this.expandSection(mainDiv, group);
                }
            });
            
            this.customOptionsElement.appendChild(mainDiv);
        });
    }

    expandSection(mainDiv, group) {
        // Close other expanded sections
        this.customOptionsElement.querySelectorAll('.custom-option.category-option.expanded').forEach(opt => {
            this.collapseSection(opt);
        });
        
        mainDiv.classList.add('expanded');
        mainDiv.querySelector('.arrow-icon').classList.add('rotate');
        
        const subWrapper = document.createElement('div');
        subWrapper.className = 'sub-options';
        
        // Get language from factory with fallbacks
        const language = this.factory?.config?.language || this.factory?.language || 'fr';
        
        group.subcategories.forEach(item => {
            // Handle multilingual names for subcategories with better fallbacks
            let itemName = item.name;
            if (typeof item.name === 'object' && item.name !== null) {
                itemName = item.name[language] || item.name.fr || item.name.en || Object.values(item.name)[0] || item.name;
            }
            
            const subDiv = document.createElement('div');
            subDiv.className = 'custom-option';
            subDiv.dataset.value = item.id;
            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'option-checkbox';
            checkboxDiv.innerHTML = this.factory.SVG_ICONS.CHECK;
            const itemSpan = document.createElement('span');
            itemSpan.textContent = itemName;
            subDiv.appendChild(checkboxDiv);
            subDiv.appendChild(itemSpan);
            
            // Check if already selected
            if (this.value === item.id) {
                subDiv.classList.add('selected');
            }
            
            subDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectOption(item);
            });
            
            subWrapper.appendChild(subDiv);
        });
        
        mainDiv.insertAdjacentElement('afterend', subWrapper);
    }

    collapseSection(mainDiv) {
        mainDiv.classList.remove('expanded');
        if (mainDiv.nextElementSibling && mainDiv.nextElementSibling.classList.contains('sub-options')) {
            mainDiv.nextElementSibling.remove();
        }
        const arrow = mainDiv.querySelector('.arrow-icon');
        if (arrow) arrow.classList.remove('rotate');
    }

    selectOption(option) {
        // Get language from factory with fallbacks
        const language = this.factory?.config?.language || this.factory?.language || 'fr';
        
        // Handle multilingual names for display
        let optionName = option.name;
        if (typeof option.name === 'object' && option.name !== null) {
            optionName = option.name[language] || option.name.fr || option.name.en || Object.values(option.name)[0] || option.name;
        }
        
        // Clear all selections
        this.customOptionsElement.querySelectorAll('.custom-option.selected').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Select the clicked option
        const optionElement = this.customOptionsElement.querySelector(`[data-value="${option.id}"]`);
        if (optionElement) {
            optionElement.classList.add('selected');
        }
        
        this.selectDisplayElement.querySelector('span').textContent = optionName;
        this.selectDisplayElement.classList.remove('placeholder');
        
        // FIX: Create the option element if it doesn't exist
        let optionEl = this.element.querySelector(`option[value="${option.id}"]`);
        if (!optionEl) {
            optionEl = document.createElement('option');
            optionEl.value = option.id;
            optionEl.textContent = optionName;
            this.element.appendChild(optionEl);
        }
        
        this.element.value = option.id;
        this.value = option.id;
        
        this.closeDropdown();
        this.hideError();
        this.handleChange();
    }

    toggleDropdown() {
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        if (this.isOpen) return;
        
        this.factory.closeAllDropdowns();
        
        this.customOptionsElement.classList.add('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.add('rotate');
        this.isOpen = true;
        
        this.dropdownInstance = {
            element: this.selectWrapper,
            close: () => this.closeDropdown()
        };
        
        this.factory.registerDropdown(this.dropdownInstance);
    }

    closeDropdown() {
        if (!this.isOpen) return;
        
        this.customOptionsElement.classList.remove('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.remove('rotate');
        this.isOpen = false;
        
        // Collapse all expanded sections
        this.customOptionsElement.querySelectorAll('.sub-options').forEach(sw => sw.remove());
        this.customOptionsElement.querySelectorAll('.custom-option.category-option.expanded').forEach(opt => {
            this.collapseSection(opt);
        });
        
        if (this.dropdownInstance) {
            this.factory.unregisterDropdown(this.dropdownInstance);
            this.dropdownInstance = null;
        }
    }

    getValue() {
        return this.element ? this.element.value : this.value;
    }

    setValue(value) {
        this.value = value;
        if (this.element) {
            // Get language from factory with fallbacks
            const language = this.factory?.config?.language || this.factory?.language || 'fr';
            
            // Find the option in subsections
            for (const group of this.subsectionOptions) {
                const option = group.subcategories.find(opt => opt.id === value);
                if (option) {
                    // Handle multilingual names for display
                    let optionName = option.name;
                    if (typeof option.name === 'object' && option.name !== null) {
                        optionName = option.name[language] || option.name.fr || option.name.en || Object.values(option.name)[0] || option.name;
                    }
                    
                    // Create the option element if it doesn't exist
                    let optionEl = this.element.querySelector(`option[value="${option.id}"]`);
                    if (!optionEl) {
                        optionEl = document.createElement('option');
                        optionEl.value = option.id;
                        optionEl.textContent = optionName;
                        this.element.appendChild(optionEl);
                    }
                    
                    this.element.value = value;
                    
                    if (this.selectDisplayElement) {
                        this.selectDisplayElement.querySelector('span').textContent = optionName;
                        this.selectDisplayElement.classList.remove('placeholder');
                    }
                    break;
                }
            }
        }
    }

    cleanup() {
        this.closeDropdown();
        super.cleanup();
    }
}


/**
 * MultiSelectSubsectionsField - Multi-select dropdown with nested subsections and personalized error messages
 */
class MultiSelectSubsectionsField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Resolve subsectionOptions from string reference to actual data
        if (typeof config.subsectionOptions === 'string') {
            // Try multiple ways to access the form data
            let optionsData = null;
            
            // Method 1: From factory
            if (factory.formData && factory.formData.options) {
                optionsData = factory.formData.options;
            }
            // Method 2: From factory.data
            else if (factory.data && factory.data.options) {
                optionsData = factory.data.options;
            }
            // Method 3: Direct from factory
            else if (factory.options) {
                optionsData = factory.options;
            }
            // Method 4: From global PropertySearchFormExtension
            else if (typeof window !== 'undefined' && window.PropertySearchFormExtension && window.PropertySearchFormExtension.FORM_DATA) {
                optionsData = window.PropertySearchFormExtension.FORM_DATA.options;
            }
            // Method 5: From config itself
            else if (config.formData && config.formData.options) {
                optionsData = config.formData.options;
            }
            
            this.subsectionOptions = (optionsData && optionsData[config.subsectionOptions]) || [];
            
            // Log for debugging
            console.log('Resolving subsectionOptions:', config.subsectionOptions);
            console.log('Factory formData:', factory.formData);
            console.log('Factory data:', factory.data);
            console.log('Options data found:', optionsData);
            console.log('Resolved subsectionOptions:', this.subsectionOptions);
        } else {
            this.subsectionOptions = config.subsectionOptions || [];
        }
        
        // Ensure we have an array
        if (!Array.isArray(this.subsectionOptions)) {
            console.warn('subsectionOptions is not an array, using empty array');
            this.subsectionOptions = [];
        }
        
        this.placeholder = config.placeholder || factory.getText('selectMultiplePlaceholder');
        this.selectedValues = [];
        this.dropdownInstance = null;
        this.isOpen = false;
    }

    validate() {
        if (this.required && this.selectedValues.length === 0) {
            this.showError(this.getFieldErrorMessage('selectAtLeastOne'));
            return false;
        }
        
        return super.validate();
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';
        
        this.element = document.createElement('select');
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.multiple = true;
        this.element.style.display = 'none';
        
        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'select-wrapper multi-select';
        
        this.selectDisplayElement = document.createElement('div');
        this.selectDisplayElement.className = 'select-display placeholder';
        this.selectDisplayElement.innerHTML = `
            <span>${this.placeholder}</span>
            <div class="dropdown-icon">
                ${this.factory.SVG_ICONS.CHEVRON}
            </div>
        `;
        
        this.customOptionsElement = document.createElement('div');
        this.customOptionsElement.className = 'custom-options multi-select';
        
        this.buildSubsectionOptions();
        
        selectWrapper.appendChild(this.selectDisplayElement);
        selectWrapper.appendChild(this.customOptionsElement);
        
        this.selectDisplayElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });
        
        mainContainer.appendChild(this.element);
        mainContainer.appendChild(selectWrapper);
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(label);
        container.appendChild(mainContainer);
        container.appendChild(errorElement);
        
        this.container = container;
        this.selectWrapper = selectWrapper;
        
        return container;
    }

    buildSubsectionOptions() {
        // Ensure subsectionOptions is an array
        if (!Array.isArray(this.subsectionOptions)) {
            console.error('subsectionOptions is not an array:', this.subsectionOptions);
            return;
        }

        // Get language from factory with fallbacks
        const language = this.factory?.config?.language || this.factory?.language || 'fr';

        // Add Select All option
        const selectAllDiv = document.createElement('div');
        selectAllDiv.className = 'custom-option select-all-option';
        selectAllDiv.dataset.value = 'select_all';
        const allCheckbox = document.createElement('div');
        allCheckbox.className = 'option-checkbox';
        allCheckbox.innerHTML = this.factory.SVG_ICONS.CHECK;
        const allText = document.createElement('span');
        allText.textContent = this.factory.getText('selectAll');
        selectAllDiv.appendChild(allCheckbox);
        selectAllDiv.appendChild(allText);
        
        selectAllDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSelectAll();
        });
        
        this.customOptionsElement.appendChild(selectAllDiv);
        
        // Add subsection groups
        this.subsectionOptions.forEach(group => {
            const mainDiv = document.createElement('div');
            mainDiv.className = 'custom-option category-option';
            mainDiv.dataset.value = group.id;
            
            // Handle multilingual names with better fallbacks
            let groupName = group.name;
            if (typeof group.name === 'object' && group.name !== null) {
                groupName = group.name[language] || group.name.fr || group.name.en || Object.values(group.name)[0] || group.name;
            }
            
            mainDiv.innerHTML = `
                <span>${groupName}</span>
                <div class="main-arrow">
                    <div class="arrow-icon">${this.factory.SVG_ICONS.CHEVRON}</div>
                </div>
            `;
            
            mainDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                
                if (mainDiv.classList.contains('expanded')) {
                    this.collapseSection(mainDiv);
                } else {
                    this.expandSection(mainDiv, group);
                }
            });
            
            this.customOptionsElement.appendChild(mainDiv);
        });
    }

    expandSection(mainDiv, group) {
        // Close other expanded sections
        this.customOptionsElement.querySelectorAll('.custom-option.category-option.expanded').forEach(opt => {
            this.collapseSection(opt);
        });
        
        mainDiv.classList.add('expanded');
        mainDiv.querySelector('.arrow-icon').classList.add('rotate');
        
        const subWrapper = document.createElement('div');
        subWrapper.className = 'sub-options';
        
        // Get language from factory with fallbacks
        const language = this.factory?.config?.language || this.factory?.language || 'fr';
        
        // Add Select All for this group
        const selectAllDiv = document.createElement('div');
        selectAllDiv.className = 'custom-option select-all-option';
        selectAllDiv.dataset.value = `select_all_${group.id}`;
        const allCheckbox = document.createElement('div');
        allCheckbox.className = 'option-checkbox';
        allCheckbox.innerHTML = this.factory.SVG_ICONS.CHECK;
        const allSpan = document.createElement('span');
        allSpan.textContent = this.factory.getText('selectAll');
        selectAllDiv.appendChild(allCheckbox);
        selectAllDiv.appendChild(allSpan);
        
        selectAllDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSelectAllInGroup(group, subWrapper);
        });
        
        subWrapper.appendChild(selectAllDiv);
        
        group.subcategories.forEach(item => {
            // Handle multilingual names for subcategories with better fallbacks
            let itemName = item.name;
            if (typeof item.name === 'object' && item.name !== null) {
                itemName = item.name[language] || item.name.fr || item.name.en || Object.values(item.name)[0] || item.name;
            }
                
            this.element.appendChild(new Option(itemName, item.id));
            
            const subDiv = document.createElement('div');
            subDiv.className = 'custom-option';
            subDiv.dataset.value = item.id;
            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'option-checkbox';
            checkboxDiv.innerHTML = this.factory.SVG_ICONS.CHECK;
            const itemSpan = document.createElement('span');
            itemSpan.textContent = itemName;
            subDiv.appendChild(checkboxDiv);
            subDiv.appendChild(itemSpan);
            
            // Check if already selected
            if (this.selectedValues.includes(item.id)) {
                subDiv.classList.add('selected');
                const subOption = this.element.querySelector(`option[value="${item.id}"]`);
                if (subOption) subOption.selected = true;
            }
            
            subDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleOption(item, subDiv, subWrapper);
            });
            
            subWrapper.appendChild(subDiv);
        });
        
        // Update group select all state
        this.updateGroupSelectAllState(group, subWrapper);
        
        mainDiv.insertAdjacentElement('afterend', subWrapper);
    }

    collapseSection(mainDiv) {
        mainDiv.classList.remove('expanded');
        if (mainDiv.nextElementSibling && mainDiv.nextElementSibling.classList.contains('sub-options')) {
            mainDiv.nextElementSibling.remove();
        }
        const arrow = mainDiv.querySelector('.arrow-icon');
        if (arrow) arrow.classList.remove('rotate');
    }

    toggleOption(option, customOption, subWrapper) {
        const isSelected = customOption.classList.contains('selected');
        const optElement = this.element.querySelector(`option[value="${option.id}"]`);
        
        if (isSelected) {
            customOption.classList.remove('selected');
            if (optElement) optElement.selected = false;
            this.selectedValues = this.selectedValues.filter(val => val !== option.id);
        } else {
            customOption.classList.add('selected');
            if (optElement) optElement.selected = true;
            this.selectedValues.push(option.id);
        }
        
        this.updateDisplayText();
        this.updateSelectAllStates(subWrapper);
        this.value = this.selectedValues;
        this.hideError();
        this.handleChange();
    }

    toggleSelectAllInGroup(group, subWrapper) {
        const subOptions = subWrapper.querySelectorAll('.custom-option:not(.select-all-option)');
        const selectAllOption = subWrapper.querySelector('.select-all-option');
        const allSelected = Array.from(subOptions).every(opt => opt.classList.contains('selected'));
        
        subOptions.forEach(opt => {
            const optValue = opt.dataset.value;
            const optElement = this.element.querySelector(`option[value="${optValue}"]`);
            
            if (allSelected) {
                opt.classList.remove('selected');
                if (optElement) optElement.selected = false;
                this.selectedValues = this.selectedValues.filter(val => val !== optValue);
            } else {
                opt.classList.add('selected');
                if (optElement) optElement.selected = true;
                if (!this.selectedValues.includes(optValue)) {
                    this.selectedValues.push(optValue);
                }
            }
        });
        
        selectAllOption.classList.toggle('selected', !allSelected);
        this.updateDisplayText();
        this.updateGlobalSelectAllState();
        this.value = this.selectedValues;
        this.handleChange();
    }

    toggleSelectAll() {
        const globalSelectAll = this.customOptionsElement.querySelector('.select-all-option[data-value="select_all"]');
        const allSubOptions = [];
        
        // Collect all subcategory options
        this.subsectionOptions.forEach(group => {
            group.subcategories.forEach(item => {
                allSubOptions.push(item.id);
            });
        });
        
        const allSelected = allSubOptions.every(id => this.selectedValues.includes(id));
        
        if (allSelected) {
            // Deselect all
            this.selectedValues = [];
            globalSelectAll.classList.remove('selected');
            
            // Update all visible options
            this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option):not(.category-option)').forEach(opt => {
                opt.classList.remove('selected');
                const optElement = this.element.querySelector(`option[value="${opt.dataset.value}"]`);
                if (optElement) optElement.selected = false;
            });
        } else {
            // Select all
            this.selectedValues = [...allSubOptions];
            globalSelectAll.classList.add('selected');
            
            // Update all visible options
            this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option):not(.category-option)').forEach(opt => {
                opt.classList.add('selected');
                const optElement = this.element.querySelector(`option[value="${opt.dataset.value}"]`);
                if (optElement) optElement.selected = true;
            });
        }
        
        this.updateDisplayText();
        this.value = this.selectedValues;
        this.handleChange();
    }

    updateGroupSelectAllState(group, subWrapper) {
        const subOptions = subWrapper.querySelectorAll('.custom-option:not(.select-all-option)');
        const selectAllOption = subWrapper.querySelector('.select-all-option');
        const allSelected = Array.from(subOptions).every(opt => opt.classList.contains('selected'));
        
        if (allSelected && subOptions.length > 0) {
            selectAllOption.classList.add('selected');
        } else {
            selectAllOption.classList.remove('selected');
        }
    }

    updateSelectAllStates(subWrapper = null) {
        if (subWrapper) {
            // Update group select all
            const subOptions = subWrapper.querySelectorAll('.custom-option:not(.select-all-option)');
            const selectAllOption = subWrapper.querySelector('.select-all-option');
            const allSelected = Array.from(subOptions).every(opt => opt.classList.contains('selected'));
            selectAllOption.classList.toggle('selected', allSelected && subOptions.length > 0);
        }
        
        this.updateGlobalSelectAllState();
    }

    updateGlobalSelectAllState() {
        const globalSelectAll = this.customOptionsElement.querySelector('.select-all-option[data-value="select_all"]');
        const allSubOptions = [];
        
        this.subsectionOptions.forEach(group => {
            group.subcategories.forEach(item => {
                allSubOptions.push(item.id);
            });
        });
        
        const allSelected = allSubOptions.length > 0 && allSubOptions.every(id => this.selectedValues.includes(id));
        globalSelectAll.classList.toggle('selected', allSelected);
    }

    updateDisplayText() {
        const span = this.selectDisplayElement.querySelector('span');
        
        if (this.selectedValues.length === 0) {
            span.textContent = this.placeholder;
            this.selectDisplayElement.classList.add('placeholder');
        } else if (this.selectedValues.length === 1) {
            // Get language from factory with fallbacks
            const language = this.factory?.config?.language || this.factory?.language || 'fr';
            
            // Find the option name
            for (const group of this.subsectionOptions) {
                const option = group.subcategories.find(opt => opt.id === this.selectedValues[0]);
                if (option) {
                    let optionName = option.name;
                    if (typeof option.name === 'object' && option.name !== null) {
                        optionName = option.name[language] || option.name.fr || option.name.en || Object.values(option.name)[0] || option.name;
                    }
                    span.textContent = optionName;
                    break;
                }
            }
            this.selectDisplayElement.classList.remove('placeholder');
        } else {
            span.textContent = `${this.selectedValues.length} ${this.factory.getText('selected')}`;
            this.selectDisplayElement.classList.remove('placeholder');
        }
    }

    toggleDropdown() {
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        if (this.isOpen) return;
        
        this.factory.closeAllDropdowns();
        
        this.customOptionsElement.classList.add('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.add('rotate');
        this.isOpen = true;
        
        this.dropdownInstance = {
            element: this.selectWrapper,
            close: () => this.closeDropdown()
        };
        
        this.factory.registerDropdown(this.dropdownInstance);
    }

    closeDropdown() {
        if (!this.isOpen) return;
        
        this.customOptionsElement.classList.remove('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.remove('rotate');
        this.isOpen = false;
        
        // Collapse all expanded sections
        this.customOptionsElement.querySelectorAll('.sub-options').forEach(sw => sw.remove());
        this.customOptionsElement.querySelectorAll('.custom-option.category-option.expanded').forEach(opt => {
            this.collapseSection(opt);
        });
        
        if (this.dropdownInstance) {
            this.factory.unregisterDropdown(this.dropdownInstance);
            this.dropdownInstance = null;
        }
    }

    getValue() {
        return this.selectedValues;
    }

    setValue(values) {
        this.selectedValues = Array.isArray(values) ? values : [];
        this.value = this.selectedValues;
        
        if (this.element) {
            Array.from(this.element.options).forEach(option => {
                option.selected = this.selectedValues.includes(option.value);
            });
            
            this.updateDisplayText();
        }
    }

    cleanup() {
        this.closeDropdown();
        super.cleanup();
    }
}

/**
 * CustomField - For special content like summaries with personalized error messages
 */
/**
 * CustomField - For special content like summaries with personalized error messages
 */
class CustomField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.renderFunction = config.render || null;
        this.updateFunction = config.update || null;
        this.autoSummary = config.autoSummary || false;
    }

    validate() {
        // Custom fields generally don't require validation
        return super.validate();
    }

    render() {
        const container = this.createContainer();
        
        if (this.autoSummary) {
            const summaryContent = this.createAutoSummary();
            container.appendChild(summaryContent);
        } else if (this.renderFunction) {
            const customContent = this.renderFunction(this.factory, this.getFormData());
            container.appendChild(customContent);
        }
        
        this.container = container;
        return container;
    }

    createAutoSummary() {
        const multiStepForm = this.factory.currentMultiStepForm;
        if (!multiStepForm) {
            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'No multi-step form found';
            return errorDiv;
        }

        const summaryContainer = document.createElement('div');
        summaryContainer.className = 'summary-container auto-summary';

        const currentStepIndex = multiStepForm.currentStep;
        
        multiStepForm.steps.forEach((step, stepIndex) => {
            if (stepIndex === currentStepIndex) return;

            const stepData = this.getStepData(multiStepForm, stepIndex);
            if (this.hasVisibleData(stepData)) {
                const stepSection = this.createStepSummarySection(step, stepData, stepIndex);
                summaryContainer.appendChild(stepSection);
            }
        });

        return summaryContainer;
    }

    createStepSummarySection(step, stepData, stepIndex) {
        const section = document.createElement('div');
        section.className = 'summary-section';
        section.innerHTML = `
            <div class="summary-heading">
                <span>${step.title}</span>
                <button type="button" class="edit-btn" data-step="${stepIndex}">
                    ${this.factory.getText('edit') || 'Modifier'}
                </button>
            </div>
            <div class="summary-content" id="step-${stepIndex}-summary"></div>
        `;

        const editBtn = section.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            if (this.factory.currentMultiStepForm) {
                this.factory.currentMultiStepForm.goToStep(stepIndex);
            }
        });

        const contentDiv = section.querySelector('.summary-content');
        this.populateStepContent(contentDiv, step, stepData);

        return section;
    }

    populateStepContent(contentDiv, step, stepData) {
        let contentHtml = '';

        step.fields.forEach(fieldConfig => {
            const fieldValue = stepData[fieldConfig.name || fieldConfig.id];
            if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
                
                // Special handling for YesNoWithOptionsField
                if (fieldConfig.type === 'yesno-with-options') {
                    contentHtml += this.formatYesNoWithOptionsField(fieldConfig, fieldValue);
                } else {
                    const displayValue = this.formatFieldValue(fieldConfig, fieldValue);
                    if (displayValue) {
                        contentHtml += `
                            <div class="summary-row">
                                <div class="summary-label">${fieldConfig.label}:</div>
                                <div class="summary-value">${displayValue}</div>
                            </div>
                        `;
                    }
                }
            }
        });

        contentDiv.innerHTML = contentHtml || '<div class="summary-empty">Aucune donnée saisie</div>';
    }

    formatYesNoWithOptionsField(fieldConfig, value) {
        let html = '';
        
        if (typeof value === 'object' && value.main !== undefined) {
            // Get the custom options for this field if available
            const customOptions = fieldConfig.customOptions;
            let mainDisplayValue = value.main;
            
            // If we have custom options, try to find the display label
            if (customOptions && Array.isArray(customOptions)) {
                const selectedOption = customOptions.find(opt => opt.value === value.main);
                if (selectedOption) {
                    mainDisplayValue = selectedOption.label;
                }
            } else {
                // Fallback to standard yes/no translation
                mainDisplayValue = value.main === true || value.main === 'yes' ? this.factory.getText('yes') :
                                  value.main === false || value.main === 'no' ? this.factory.getText('no') :
                                  value.main;
            }
            
            // Display main field value
            html += `
                <div class="summary-row">
                    <div class="summary-label">${fieldConfig.label}:</div>
                    <div class="summary-value">${mainDisplayValue}</div>
                </div>
            `;
            
            // Determine which conditional fields to show based on custom options or default yes/no
            let showYesFields = false;
            let showNoFields = false;
            
            if (customOptions && Array.isArray(customOptions)) {
                showYesFields = value.main === customOptions[0].value;
                showNoFields = value.main === customOptions[1].value;
            } else {
                showYesFields = value.main === true || value.main === 'yes';
                showNoFields = value.main === false || value.main === 'no';
            }
            
            // Display sub-fields based on selection
            if (showYesFields) {
                // Handle yesFields (array) or yesField (single)
                if (fieldConfig.yesFields && value.yesValues) {
                    fieldConfig.yesFields.forEach(subField => {
                        const subValue = value.yesValues[subField.id];
                        if (subValue !== undefined && subValue !== null && subValue !== '') {
                            const subDisplayValue = this.formatFieldValue(subField, subValue);
                            if (subDisplayValue) {
                                html += `
                                    <div class="summary-row">
                                        <div class="summary-label">${subField.label}:</div>
                                        <div class="summary-value">${subDisplayValue}</div>
                                    </div>
                                `;
                            }
                        }
                    });
                } else if (fieldConfig.yesField && value.yesValues) {
                    const subValue = value.yesValues[fieldConfig.yesField.id];
                    if (subValue !== undefined && subValue !== null && subValue !== '') {
                        const subDisplayValue = this.formatFieldValue(fieldConfig.yesField, subValue);
                        if (subDisplayValue) {
                            html += `
                                <div class="summary-row">
                                    <div class="summary-label">${fieldConfig.yesField.label}:</div>
                                    <div class="summary-value">${subDisplayValue}</div>
                                </div>
                            `;
                        }
                    }
                }
            } else if (showNoFields) {
                // Handle noField
                if (fieldConfig.noField && value.noValues) {
                    const subValue = value.noValues[fieldConfig.noField.id];
                    if (subValue !== undefined && subValue !== null && subValue !== '') {
                        const subDisplayValue = this.formatFieldValue(fieldConfig.noField, subValue);
                        if (subDisplayValue) {
                            html += `
                                <div class="summary-row">
                                    <div class="summary-label">${fieldConfig.noField.label}:</div>
                                    <div class="summary-value">${subDisplayValue}</div>
                                </div>
                            `;
                        }
                    }
                }
            }
        } else {
            // Fallback for simple values
            const displayValue = this.formatFieldValue(fieldConfig, value);
            if (displayValue) {
                html += `
                    <div class="summary-row">
                        <div class="summary-label">${fieldConfig.label}:</div>
                        <div class="summary-value">${displayValue}</div>
                    </div>
                `;
            }
        }
        
        return html;
    }

    formatFieldValue(fieldConfig, value) {
        const fieldType = fieldConfig.type;

        switch (fieldType) {
            case 'yesno':
                // Check for custom options first
                if (fieldConfig.customOptions && Array.isArray(fieldConfig.customOptions)) {
                    const option = fieldConfig.customOptions.find(opt => opt.value === value);
                    if (option) return option.label;
                }
                // Fallback to standard yes/no
                return value === 'yes' || value === true ? 
                    (this.factory.getText('yes') || 'Oui') : 
                    (this.factory.getText('no') || 'Non');

            case 'select':
            case 'select-subsections':
                return this.getOptionDisplayName(fieldConfig.options || fieldConfig.subsectionOptions, value);

            case 'multiselect':
            case 'multiselect-subsections':
                if (Array.isArray(value)) {
                    return value.map(v => this.getOptionDisplayName(fieldConfig.options || fieldConfig.subsectionOptions, v)).join(', ');
                }
                return value;

            case 'select-with-other':
                if (typeof value === 'object' && value.main) {
                    if (value.main === 'other') {
                        return value.other || this.factory.getText('other');
                    }
                    return this.getOptionDisplayName(fieldConfig.options, value.main);
                }
                return this.getOptionDisplayName(fieldConfig.options, value);

            case 'multiselect-with-other':
                if (typeof value === 'object' && value.main) {
                    const mainValues = Array.isArray(value.main) ? 
                        value.main.map(v => this.getOptionDisplayName(fieldConfig.options, v)) : [];
                    if (value.other) {
                        mainValues.push(value.other);
                    }
                    return mainValues.join(', ');
                }
                return Array.isArray(value) ? value.join(', ') : value;

            case 'yesno-with-options':
                // Handle the main value display with custom options
                if (typeof value === 'object' && value.main) {
                    if (fieldConfig.customOptions && Array.isArray(fieldConfig.customOptions)) {
                        const option = fieldConfig.customOptions.find(opt => opt.value === value.main);
                        if (option) return option.label;
                    }
                    // Fallback to standard yes/no
                    return value.main === true || value.main === 'yes' ? 
                        (this.factory.getText('yes') || 'Oui') :
                        (this.factory.getText('no') || 'Non');
                }
                return value;

            case 'textarea':
                if (typeof value === 'string' && value.length > 100) {
                    return value.substring(0, 100) + '...';
                }
                return value;

            case 'number':
            case 'percentage':
            case 'options-stepper':
            case 'email':
            case 'phone':
            case 'url':
            case 'text':
            default:
                return value;
        }
    }

    formatSubValue(key, value, fieldConfig) {
        // Handle language fields specifically using existing data
        if (key === 'languages' || key === 'language') {
            const currentLang = window.currentLanguage || 'fr';
            const languageOptions = window.formDataOptions?.[currentLang]?.languages || [];
            
            if (Array.isArray(value)) {
                return value.map(v => this.getOptionDisplayName(languageOptions, v)).join(', ');
            } else {
                return this.getOptionDisplayName(languageOptions, value);
            }
        }
        
        // Handle other fields
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        
        return value;
    }

    getOptionDisplayName(options, value) {
        if (!options) return value;
        
        // Handle regular options array
        if (Array.isArray(options)) {
            const option = options.find(opt => opt.id === value);
            return option ? (option.name || option.label) : value;
        }
        
        // Handle subsection options
        if (Array.isArray(options)) {
            for (const group of options) {
                if (group.subcategories) {
                    const option = group.subcategories.find(opt => opt.id === value);
                    if (option) return option.name || option.label;
                }
            }
        }
        
        return value;
    }

    getStepData(multiStepForm, stepIndex) {
        const stepInstance = multiStepForm.stepInstances[stepIndex];
        if (!stepInstance) return {};
        
        return stepInstance.getStepData();
    }

    hasVisibleData(stepData) {
        return Object.values(stepData).some(value => 
            value !== undefined && 
            value !== null && 
            value !== '' && 
            !(Array.isArray(value) && value.length === 0)
        );
    }

    updateContent() {
        if (this.autoSummary && this.container) {
            this.container.innerHTML = '';
            const summaryContent = this.createAutoSummary();
            this.container.appendChild(summaryContent);
        } else if (this.updateFunction && this.container) {
            const formData = this.getFormData();
            this.updateFunction(this.container, formData);
        }
    }

    getFormData() {
        if (this.factory.currentMultiStepForm) {
            return this.factory.currentMultiStepForm.getFormData();
        }
        return {};
    }

    getValue() {
        return null;
    }

    setValue(value) {
        // Custom fields don't have settable values
    }
    
    setStepData(data) {
        if (this.autoSummary) {
            this.updateContent();
        }
    }
}


/**
 * SingleSelectWithOtherField - Simple dropdown with "Other" option and personalized error messages
 */
class SingleSelectWithOtherField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.options = config.options || [];
        this.placeholder = config.placeholder || factory.getText('selectPlaceholder');
        this.otherLabel = config.otherLabel || factory.getText('other');
        this.otherPlaceholder = config.otherPlaceholder || `${factory.getText('other')}...`;
        this.otherValue = '';
        this.dropdownInstance = null;
        this.isOpen = false;
    }

    validate() {
        if (this.required) {
            const mainValue = this.element ? this.element.value : '';
            
            if (!mainValue) {
                this.showError(this.getFieldErrorMessage('required'));
                return false;
            }
            
            if (mainValue === 'other' && !this.otherValue) {
                if (this.otherError) {
                    this.otherError.classList.add('show');
                }
                return false;
            }
        }
        
        this.hideError();
        if (this.otherError) {
            this.otherError.classList.remove('show');
        }
        return true;
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const optionsWithOther = [...this.options, { id: 'other', name: this.otherLabel }];
        
        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';
        
        this.element = document.createElement('select');
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.style.display = 'none';
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = this.placeholder;
        this.element.appendChild(defaultOption);
        
        optionsWithOther.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.name;
            this.element.appendChild(optionElement);
        });
        
        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'select-wrapper';
        
        this.selectDisplayElement = document.createElement('div');
        this.selectDisplayElement.className = 'select-display placeholder';
        this.selectDisplayElement.innerHTML = `
            <span>${this.placeholder}</span>
            <div class="dropdown-icon">
                ${this.factory.SVG_ICONS.CHEVRON}
            </div>
        `;
        
        this.customOptionsElement = document.createElement('div');
        this.customOptionsElement.className = 'custom-options';
        
        optionsWithOther.forEach(option => {
            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.setAttribute('data-value', option.id);
            customOption.innerHTML = `
                <div class="option-checkbox">
                    ${this.factory.SVG_ICONS.CHECK}
                </div>
                <span>${option.name}</span>
            `;
            
            customOption.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectMainOption(option);
            });
            
            this.customOptionsElement.appendChild(customOption);
        });
        
        selectWrapper.appendChild(this.selectDisplayElement);
        selectWrapper.appendChild(this.customOptionsElement);
        
        this.selectDisplayElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });
        
        mainContainer.appendChild(this.element);
        mainContainer.appendChild(selectWrapper);
        
        this.otherContainer = document.createElement('div');
        this.otherContainer.className = 'conditional-field-wrapper';
        this.otherContainer.id = `${this.id}-other-group`;
        this.otherContainer.style.display = 'none';
        
        const otherLabel = document.createElement('label');
        otherLabel.className = 'form-label';
        otherLabel.textContent = this.otherLabel;
        
        this.otherInput = document.createElement('input');
        this.otherInput.type = 'text';
        this.otherInput.id = `${this.id}-other`;
        this.otherInput.placeholder = this.otherPlaceholder;
        
        this.otherError = document.createElement('div');
        this.otherError.className = 'error-message';
        this.otherError.id = `error-${this.id}-other`;
        this.otherError.innerHTML = `
            <div class="error-icon">!</div>
            <span class="error-text">${this.getFieldErrorMessage('required')}</span>
        `;
        
        this.otherContainer.appendChild(otherLabel);
        this.otherContainer.appendChild(this.otherInput);
        this.otherContainer.appendChild(this.otherError);
        
        this.otherInput.addEventListener('input', () => {
            this.otherValue = this.otherInput.value.trim();
            this.value = { main: 'other', other: this.otherValue };
            
            if (this.otherValue) {
                this.otherError.classList.remove('show');
            }
            
            this.handleChange();
        });
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(label);
        container.appendChild(mainContainer);
        container.appendChild(this.otherContainer);
        container.appendChild(errorElement);
        
        this.container = container;
        this.selectWrapper = selectWrapper;
        
        return container;
    }

    selectMainOption(option) {
        this.customOptionsElement.querySelectorAll('.custom-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        const optionElement = this.customOptionsElement.querySelector(`[data-value="${option.id}"]`);
        if (optionElement) {
            optionElement.classList.add('selected');
        }
        
        this.selectDisplayElement.querySelector('span').textContent = option.name;
        this.selectDisplayElement.classList.remove('placeholder');
        
        this.element.value = option.id;
        
        this.closeDropdown();
        
        if (option.id === 'other') {
            this.otherContainer.style.display = 'block';
            this.value = { main: option.id, other: this.otherValue };
        } else {
            this.otherContainer.style.display = 'none';
            this.value = { main: option.id, other: '' };
            this.otherValue = '';
            if (this.otherInput) this.otherInput.value = '';
        }
        
        this.hideError();
        this.handleChange();
    }

    toggleDropdown() {
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        if (this.isOpen) return;
        
        this.factory.closeAllDropdowns();
        
        this.customOptionsElement.classList.add('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.add('rotate');
        this.isOpen = true;
        
        this.dropdownInstance = {
            element: this.selectWrapper,
            close: () => this.closeDropdown()
        };
        
        this.factory.registerDropdown(this.dropdownInstance);
    }

    closeDropdown() {
        if (!this.isOpen) return;
        
        this.customOptionsElement.classList.remove('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.remove('rotate');
        this.isOpen = false;
        
        if (this.dropdownInstance) {
            this.factory.unregisterDropdown(this.dropdownInstance);
            this.dropdownInstance = null;
        }
    }

    getValue() {
        if (this.value && typeof this.value === 'object') {
            if (this.value.main === 'other' && this.value.other) {
                return this.value.other;
            } else if (this.value.main !== 'other') {
                return this.value.main;
            }
        }
        return this.element ? this.element.value : '';
    }

    setValue(value) {
        const existingOption = this.options.find(opt => opt.id === value);
        
        if (existingOption) {
            this.selectMainOption(existingOption);
        } else if (value) {
            const otherOption = { id: 'other', name: this.otherLabel };
            this.selectMainOption(otherOption);
            this.otherValue = value;
            if (this.otherInput) {
                this.otherInput.value = value;
            }
            this.value = { main: 'other', other: value };
        }
    }

    setOptions(newOptions) {
        this.options = newOptions || [];
        
        if (this.container) {
            const currentValue = this.getValue();
            
            const mainContainer = this.container.querySelector('.main-container');
            if (mainContainer) {
                this.element.innerHTML = '';
                this.customOptionsElement.innerHTML = '';
                
                const optionsWithOther = [...this.options, { id: 'other', name: this.otherLabel }];
                
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = this.placeholder;
                this.element.appendChild(defaultOption);
                
                optionsWithOther.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.id;
                    optionElement.textContent = option.name;
                    this.element.appendChild(optionElement);
                    
                    const customOption = document.createElement('div');
                    customOption.className = 'custom-option';
                    customOption.setAttribute('data-value', option.id);
                    customOption.innerHTML = `
                        <div class="option-checkbox">
                            ${this.factory.SVG_ICONS.CHECK}
                        </div>
                        <span>${option.name}</span>
                    `;
                    
                    customOption.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.selectMainOption(option);
                    });
                    
                    this.customOptionsElement.appendChild(customOption);
                });
                
                if (currentValue) {
                    this.setValue(currentValue);
                }
            }
        }
    }

    cleanup() {
        this.closeDropdown();
        super.cleanup();
    }
}

/**
 * MultiSelectWithOtherField - Multiple dropdown with "Other" option and personalized error messages
 */
class MultiSelectWithOtherField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.options = config.options || [];
        this.placeholder = config.placeholder || factory.getText('selectMultiplePlaceholder');
        this.otherLabel = config.otherLabel || factory.getText('other');
        this.otherPlaceholder = config.otherPlaceholder || `${factory.getText('other')}...`;
        this.otherValue = '';
        this.selectedValues = [];
        this.dropdownInstance = null;
        this.isOpen = false;
    }

    validate() {
        if (this.required) {
            const hasMainSelection = this.selectedValues.length > 0;
            
            if (!hasMainSelection) {
                this.showError(this.getFieldErrorMessage('selectAtLeastOne'));
                return false;
            }
            
            if (this.selectedValues.includes('other') && !this.otherValue) {
                this.otherError.classList.add('show');
                return false;
            }
        }
        
        this.hideError();
        this.otherError.classList.remove('show');
        return true;
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const optionsWithOther = [...this.options, { id: 'other', name: this.otherLabel }];
        
        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';
        
        this.element = document.createElement('select');
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.multiple = true;
        this.element.style.display = 'none';
        
        optionsWithOther.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.name;
            this.element.appendChild(optionElement);
        });
        
        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'select-wrapper multi-select';
        
        this.selectDisplayElement = document.createElement('div');
        this.selectDisplayElement.className = 'select-display placeholder';
        this.selectDisplayElement.innerHTML = `
            <span>${this.placeholder}</span>
            <div class="dropdown-icon">
                ${this.factory.SVG_ICONS.CHEVRON}
            </div>
        `;
        
        this.customOptionsElement = document.createElement('div');
        this.customOptionsElement.className = 'custom-options multi-select';
        
        const selectAllOption = document.createElement('div');
        selectAllOption.className = 'custom-option select-all-option';
        selectAllOption.innerHTML = `
            <div class="option-checkbox">
                ${this.factory.SVG_ICONS.CHECK}
            </div>
            <span>${this.factory.getText('selectAll')}</span>
        `;
        
        selectAllOption.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSelectAll();
        });
        
        this.customOptionsElement.appendChild(selectAllOption);
        
        optionsWithOther.forEach(option => {
            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.setAttribute('data-value', option.id);
            customOption.innerHTML = `
                <div class="option-checkbox">
                    ${this.factory.SVG_ICONS.CHECK}
                </div>
                <span>${option.name}</span>
            `;
            
            customOption.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMainOption(option, customOption);
            });
            
            this.customOptionsElement.appendChild(customOption);
        });
        
        selectWrapper.appendChild(this.selectDisplayElement);
        selectWrapper.appendChild(this.customOptionsElement);
        
        this.selectDisplayElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });
        
        mainContainer.appendChild(this.element);
        mainContainer.appendChild(selectWrapper);
        
        this.otherContainer = document.createElement('div');
        this.otherContainer.className = 'conditional-field-wrapper';
        this.otherContainer.id = `${this.id}-other-group`;
        this.otherContainer.style.display = 'none';
        
        const otherLabel = document.createElement('label');
        otherLabel.className = 'form-label';
        otherLabel.textContent = this.otherLabel;
        
        this.otherInput = document.createElement('input');
        this.otherInput.type = 'text';
        this.otherInput.id = `${this.id}-other`;
        this.otherInput.placeholder = this.otherPlaceholder;
        
        this.otherError = document.createElement('div');
        this.otherError.className = 'error-message';
        this.otherError.id = `error-${this.id}-other`;
        this.otherError.innerHTML = `
            <div class="error-icon">!</div>
            <span class="error-text">${this.getFieldErrorMessage('required')}</span>
        `;
        
        this.otherContainer.appendChild(otherLabel);
        this.otherContainer.appendChild(this.otherInput);
        this.otherContainer.appendChild(this.otherError);
        
        this.otherInput.addEventListener('input', () => {
            this.otherValue = this.otherInput.value.trim();
            this.value = {
                main: this.selectedValues.filter(v => v !== 'other'),
                other: this.otherValue
            };
            
            if (this.otherValue) {
                this.otherError.classList.remove('show');
            }
            
            this.handleChange();
        });
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(label);
        container.appendChild(mainContainer);
        container.appendChild(this.otherContainer);
        container.appendChild(errorElement);
        
        this.container = container;
        this.selectWrapper = selectWrapper;
        
        return container;
    }

    toggleMainOption(option, customOption) {
        const isSelected = customOption.classList.contains('selected');
        const optElement = this.element.querySelector(`option[value="${option.id}"]`);
        
        if (isSelected) {
            customOption.classList.remove('selected');
            if (optElement) optElement.selected = false;
            this.selectedValues = this.selectedValues.filter(val => val !== option.id);
        } else {
            customOption.classList.add('selected');
            if (optElement) optElement.selected = true;
            this.selectedValues.push(option.id);
        }
        
        if (this.selectedValues.includes('other')) {
            this.otherContainer.style.display = 'block';
        } else {
            this.otherContainer.style.display = 'none';
            this.otherValue = '';
            this.otherInput.value = '';
        }
        
        this.updateDisplayText();
        this.updateSelectAllState();
        this.value = {
            main: this.selectedValues.filter(v => v !== 'other'),
            other: this.selectedValues.includes('other') ? this.otherValue : ''
        };
        
        this.hideError();
        this.handleChange();
    }

    toggleSelectAll() {
        const allOptions = this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option)');
        const selectAllOption = this.customOptionsElement.querySelector('.select-all-option');
        const allSelected = Array.from(allOptions).every(opt => opt.classList.contains('selected'));
        
        allOptions.forEach(opt => {
            const optValue = opt.dataset.value;
            const optElement = this.element.querySelector(`option[value="${optValue}"]`);
            
            if (allSelected) {
                opt.classList.remove('selected');
                if (optElement) optElement.selected = false;
            } else {
                opt.classList.add('selected');
                if (optElement) optElement.selected = true;
            }
        });
        
        if (allSelected) {
            selectAllOption.classList.remove('selected');
            this.selectedValues = [];
            this.otherContainer.style.display = 'none';
            this.otherValue = '';
            this.otherInput.value = '';
        } else {
            selectAllOption.classList.add('selected');
            this.selectedValues = [...this.options.map(opt => opt.id), 'other'];
            this.otherContainer.style.display = 'block';
        }
        
        this.updateDisplayText();
        this.value = {
            main: this.selectedValues.filter(v => v !== 'other'),
            other: this.selectedValues.includes('other') ? this.otherValue : ''
        };
        
        this.handleChange();
    }

    updateSelectAllState() {
        const allOptions = this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option)');
        const selectAllOption = this.customOptionsElement.querySelector('.select-all-option');
        const allSelected = Array.from(allOptions).every(opt => opt.classList.contains('selected'));
        
        if (allSelected && this.selectedValues.length > 0) {
            selectAllOption.classList.add('selected');
        } else {
            selectAllOption.classList.remove('selected');
        }
    }

    updateDisplayText() {
        const span = this.selectDisplayElement.querySelector('span');
        
        if (this.selectedValues.length === 0) {
            span.textContent = this.placeholder;
            this.selectDisplayElement.classList.add('placeholder');
        } else if (this.selectedValues.length === 1) {
            const value = this.selectedValues[0];
            if (value === 'other') {
                span.textContent = this.otherLabel;
            } else {
                const option = this.options.find(opt => opt.id === value);
                span.textContent = option ? option.name : value;
            }
            this.selectDisplayElement.classList.remove('placeholder');
        } else {
            span.textContent = `${this.selectedValues.length} ${this.factory.getText('selected')}`;
            this.selectDisplayElement.classList.remove('placeholder');
        }
    }

    toggleDropdown() {
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        if (this.isOpen) return;
        
        this.factory.closeAllDropdowns();
        
        this.customOptionsElement.classList.add('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.add('rotate');
        this.isOpen = true;
        
        this.dropdownInstance = {
            element: this.selectWrapper,
            close: () => this.closeDropdown()
        };
        
        this.factory.registerDropdown(this.dropdownInstance);
    }

    closeDropdown() {
        if (!this.isOpen) return;
        
        this.customOptionsElement.classList.remove('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.remove('rotate');
        this.isOpen = false;
        
        if (this.dropdownInstance) {
            this.factory.unregisterDropdown(this.dropdownInstance);
            this.dropdownInstance = null;
        }
    }

    getValue() {
        const result = [];
        
        if (this.value && typeof this.value === 'object') {
            if (this.value.main && Array.isArray(this.value.main)) {
                result.push(...this.value.main);
            }
            
            if (this.value.other) {
                result.push(this.value.other);
            }
        }
        
        return result;
    }

    setValue(values) {
        if (!Array.isArray(values)) {
            values = values ? [values] : [];
        }
        
        const existingValues = [];
        let otherValue = '';
        
        values.forEach(value => {
            const existingOption = this.options.find(opt => opt.id === value);
            if (existingOption) {
                existingValues.push(value);
            } else if (value) {
                otherValue = value;
            }
        });
        
        this.selectedValues = [...existingValues];
        if (otherValue) {
            this.selectedValues.push('other');
        }
        
        if (this.element) {
            Array.from(this.element.options).forEach(option => {
                option.selected = this.selectedValues.includes(option.value);
            });
        }
        
        if (this.customOptionsElement) {
            this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option)').forEach(opt => {
                if (this.selectedValues.includes(opt.dataset.value)) {
                    opt.classList.add('selected');
                } else {
                    opt.classList.remove('selected');
                }
            });
            this.updateSelectAllState();
        }
        
        if (otherValue) {
            this.otherValue = otherValue;
            this.otherInput.value = otherValue;
            this.otherContainer.style.display = 'block';
        } else {
            this.otherContainer.style.display = 'none';
        }
        
        this.value = {
            main: existingValues,
            other: otherValue
        };
        
        if (this.selectDisplayElement) {
            this.updateDisplayText();
        }
    }

    cleanup() {
        this.closeDropdown();
        super.cleanup();
    }
}

// Continue with additional field classes...

/**
 * SlidingWindowRangeField - Dual range slider with sliding window controls and validation
 */
/**
 * OPTIMIZED FIELD CLASSES WITH PERFORMANCE ENHANCEMENTS
 */

/**
 * SlidingWindowRangeField - Optimized with debouncing, caching, and memoization
 */
/**
 * OPTIMIZED SLIDER/RANGE FIELD CLASSES WITH PERFORMANCE ENHANCEMENTS
 * Updated with debouncing, caching, memoization, and improved calculations
 */

/**
 * SlidingWindowRangeField - Optimized with enhanced caching and performance
 */

class SlidingWindowRangeField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.min = config.min || 0;
        this.max = config.max || 10000;
        this.step = config.step || 100;
        this.rangeWindow = config.rangeWindow || 1000;
        this.windowStep = config.windowStep || 1000;
        this.minGap = config.minGap || 100;
        this.formatValue = config.formatValue || ((val) => `${parseInt(val).toLocaleString()}`);
        
        this.currentMin = config.currentMin || this.min;
        this.currentMax = config.currentMax || Math.min(this.min + this.rangeWindow, this.max);
        this.selectedMin = config.defaultMin || this.currentMin + 200;
        this.selectedMax = config.defaultMax || this.currentMax - 200;
        
        // Performance optimizations
        this.debounceDelay = config.debounceDelay || 50;
        this.debouncedUpdate = this.debounce(() => this.updateUI(), this.debounceDelay);
        this.debouncedChange = this.debounce(() => this.handleChange(), this.debounceDelay);
        this.positionCache = new Map();
        this.dimensionCache = new Map();
        
        this.customValidation = config.customValidation || null;
    }

    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    validate() {
        if (this.required && (!this.selectedMin && !this.selectedMax)) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        return super.validate();
    }

    validateConstraints(newValue) {
        if (this.customValidation) {
            const result = this.customValidation(newValue, this.factory.formValues);
            if (result !== true) {
                if (typeof result === 'object' && result.adjustedValue !== undefined) {
                    this.selectedMin = result.adjustedValue;
                    this.selectedMax = Math.max(this.selectedMin + this.minGap, this.selectedMax);
                    
                    if (this.minRange && this.maxRange) {
                        this.minRange.value = this.selectedMin;
                        this.maxRange.value = this.selectedMax;
                        this.debouncedUpdate();
                    }
                    
                    this.showError(result.message);
                    return result.adjustedValue;
                } else if (typeof result === 'string') {
                    this.showError(result);
                    return false;
                }
            } else {
                this.hideError();
            }
        }
        return newValue;
    }

    updateConstraints(newConstraints) {
        if (newConstraints.min !== undefined) {
            this.min = newConstraints.min;
            this.currentMin = Math.max(this.currentMin, newConstraints.min);
            
            if (this.minRange) {
                this.minRange.min = this.currentMin;
                this.maxRange.min = this.currentMin;
                
                if (this.selectedMin < this.currentMin) {
                    this.selectedMin = this.currentMin;
                    this.minRange.value = this.selectedMin;
                }
                if (this.selectedMax < this.currentMin + this.minGap) {
                    this.selectedMax = this.currentMin + this.minGap;
                    this.maxRange.value = this.selectedMax;
                }
                
                this.clearCache();
                this.debouncedUpdate();
            }
        }
        
        if (newConstraints.rangeWindow !== undefined) {
            this.rangeWindow = newConstraints.rangeWindow;
        }
        
        if (newConstraints.windowStep !== undefined) {
            this.windowStep = newConstraints.windowStep;
        }
    }

    clearCache() {
        this.positionCache.clear();
        this.dimensionCache.clear();
    }

    getContainerDimensions() {
        const container = this.container.querySelector('.range-container');
        if (!container) return { width: 0, height: 0 };
        
        const cacheKey = 'container-dimensions';
        if (this.dimensionCache.has(cacheKey)) {
            return this.dimensionCache.get(cacheKey);
        }
        
        const dimensions = {
            width: container.offsetWidth,
            height: container.offsetHeight
        };
        
        this.dimensionCache.set(cacheKey, dimensions);
        return dimensions;
    }

    calculateLabelPosition(percent, labelElement) {
        if (!labelElement) return percent;
        
        const cacheKey = `label-pos-${percent}-${labelElement.offsetWidth}`;
        if (this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey);
        }
        
        const containerDimensions = this.getContainerDimensions();
        if (containerDimensions.width === 0) return percent;
        
        const labelWidth = labelElement.offsetWidth || 100;
        const leftBoundary = (labelWidth / 2) / containerDimensions.width * 100;
        const rightBoundary = 100 - leftBoundary;
        
        let result = percent;
        if (percent < leftBoundary) {
            result = leftBoundary;
        } else if (percent > rightBoundary) {
            result = rightBoundary;
        }
        
        this.positionCache.set(cacheKey, result);
        return result;
    }

    checkLabelCollision(minPercent, maxPercent, minLabel, maxLabel) {
        if (!minLabel || !maxLabel) return { minPercent, maxPercent };
        
        const cacheKey = `collision-${minPercent}-${maxPercent}-${minLabel.offsetWidth}-${maxLabel.offsetWidth}`;
        if (this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey);
        }
        
        const minWidth = minLabel.offsetWidth || 100;
        const maxWidth = maxLabel.offsetWidth || 100;
        const containerDimensions = this.getContainerDimensions();
        
        if (containerDimensions.width === 0) return { minPercent, maxPercent };
        
        const minDistance = ((minWidth + maxWidth) / 2 + 10) / containerDimensions.width * 100;
        const currentDistance = maxPercent - minPercent;
        
        let result = { minPercent, maxPercent };
        
        if (currentDistance < minDistance) {
            const center = (minPercent + maxPercent) / 2;
            const halfDistance = minDistance / 2;
            
            let adjustedMinPercent = center - halfDistance;
            let adjustedMaxPercent = center + halfDistance;
            
            if (adjustedMinPercent < 0) {
                adjustedMinPercent = 0;
                adjustedMaxPercent = minDistance;
            } else if (adjustedMaxPercent > 100) {
                adjustedMaxPercent = 100;
                adjustedMinPercent = 100 - minDistance;
            }
            
            result = { 
                minPercent: adjustedMinPercent, 
                maxPercent: adjustedMaxPercent 
            };
        }
        
        this.positionCache.set(cacheKey, result);
        return result;
    }

    calculateTrianglePosition(originalPercent, finalPercent, labelElement, containerElement) {
        if (!labelElement || !containerElement) return '50%';
        
        const containerWidth = containerElement.offsetWidth;
        const labelWidth = labelElement.offsetWidth;
        
        if (containerWidth === 0 || labelWidth === 0) return '50%';
        
        const originalHandlePosition = (originalPercent / 100) * containerWidth;
        const finalLabelPosition = (finalPercent / 100) * containerWidth;
        const offsetFromCenter = originalHandlePosition - finalLabelPosition;
        const triangleOffset = (offsetFromCenter / labelWidth) * 100;
        const trianglePosition = 50 + triangleOffset;
        
        const triangleHalfWidth = 5;
        const safetyMargin = 4;
        const minSafeDistance = triangleHalfWidth + safetyMargin;
        const minTrianglePos = (minSafeDistance / labelWidth) * 100;
        const maxTrianglePos = 100 - minTrianglePos;
        const absoluteMinPos = Math.max(minTrianglePos, 15);
        const absoluteMaxPos = Math.min(maxTrianglePos, 85);
        
        return `${Math.max(absoluteMinPos, Math.min(absoluteMaxPos, trianglePosition))}%`;
    }

    updateTrianglePosition(labelElement, originalPercent, finalPercent) {
        if (!labelElement) return;
        
        const container = this.container.querySelector('.range-container');
        const trianglePos = this.calculateTrianglePosition(originalPercent, finalPercent, labelElement, container);
        labelElement.style.setProperty('--triangle-left', trianglePos);
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const slidingLayout = document.createElement('div');
        slidingLayout.className = 'sliding-window-layout';
        
        this.decreaseBtn = document.createElement('button');
        this.decreaseBtn.type = 'button';
        this.decreaseBtn.className = 'slider-control-btn';
        this.decreaseBtn.innerHTML = this.factory.SVG_ICONS.MINUS;
        
        const rangeContainer = document.createElement('div');
        rangeContainer.className = 'range-container';
        
        const trackBg = document.createElement('div');
        trackBg.className = 'slider-track-bg';
        
        this.track = document.createElement('div');
        this.track.className = 'slider-track';
        trackBg.appendChild(this.track);
        
        this.minRange = document.createElement('input');
        this.minRange.type = 'range';
        this.minRange.className = 'range-input';
        this.minRange.min = this.currentMin;
        this.minRange.max = this.currentMax;
        this.minRange.value = this.selectedMin;
        this.minRange.step = this.step;
        
        this.maxRange = document.createElement('input');
        this.maxRange.type = 'range';
        this.maxRange.className = 'range-input';
        this.maxRange.min = this.currentMin;
        this.maxRange.max = this.currentMax;
        this.maxRange.value = this.selectedMax;
        this.maxRange.step = this.step;
        
        this.minLabel = document.createElement('div');
        this.minLabel.className = 'slider-value-label';
        
        this.maxLabel = document.createElement('div');
        this.maxLabel.className = 'slider-value-label';
        
        rangeContainer.appendChild(trackBg);
        rangeContainer.appendChild(this.minRange);
        rangeContainer.appendChild(this.maxRange);
        rangeContainer.appendChild(this.minLabel);
        rangeContainer.appendChild(this.maxLabel);
        
        this.increaseBtn = document.createElement('button');
        this.increaseBtn.type = 'button';
        this.increaseBtn.className = 'slider-control-btn';
        this.increaseBtn.innerHTML = this.factory.SVG_ICONS.PLUS;
        
        slidingLayout.appendChild(this.decreaseBtn);
        slidingLayout.appendChild(rangeContainer);
        slidingLayout.appendChild(this.increaseBtn);
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(label);
        container.appendChild(slidingLayout);
        container.appendChild(errorElement);
        
        this.setupEventListeners();
        this.updateUI();
        
        this.container = container;
        return container;
    }

    setupEventListeners() {
        this.minRange.addEventListener('input', () => this.handleMinChange());
        this.maxRange.addEventListener('input', () => this.handleMaxChange());
        this.decreaseBtn.addEventListener('click', () => this.decreaseRange());
        this.increaseBtn.addEventListener('click', () => this.increaseRange());
        
        // Clear cache on window resize
        window.addEventListener('resize', () => this.clearCache());
    }

    handleMinChange() {
        const minVal = parseInt(this.minRange.value);
        const maxVal = parseInt(this.maxRange.value);
        
        if (maxVal - minVal < this.minGap) {
            this.minRange.value = maxVal - this.minGap;
        }
        
        this.selectedMin = parseInt(this.minRange.value);
        this.selectedMax = parseInt(this.maxRange.value);
        
        const validatedValue = this.validateConstraints({
            min: this.selectedMin,
            max: this.selectedMax,
            currentMin: this.currentMin,
            currentMax: this.currentMax
        });
        
        if (validatedValue !== false) {
            this.debouncedUpdate();
            this.debouncedChange();
        }
    }

    handleMaxChange() {
        const minVal = parseInt(this.minRange.value);
        const maxVal = parseInt(this.maxRange.value);
        
        if (maxVal - minVal < this.minGap) {
            this.maxRange.value = minVal + this.minGap;
        }
        
        this.selectedMin = parseInt(this.minRange.value);
        this.selectedMax = parseInt(this.maxRange.value);
        
        const validatedValue = this.validateConstraints({
            min: this.selectedMin,
            max: this.selectedMax,
            currentMin: this.currentMin,
            currentMax: this.currentMax
        });
        
        if (validatedValue !== false) {
            this.debouncedUpdate();
            this.debouncedChange();
        }
    }

    increaseRange() {
        if (this.currentMax < this.max) {
            this.currentMin = Math.min(this.currentMin + this.windowStep, this.max - this.rangeWindow);
            this.currentMax = Math.min(this.currentMax + this.windowStep, this.max);
            this.updateSliderAttributes();
            this.clearCache();
            this.updateUI();
        }
    }

    decreaseRange() {
        if (this.currentMin > this.min) {
            this.currentMin = Math.max(this.currentMin - this.windowStep, this.min);
            this.currentMax = Math.max(this.currentMax - this.windowStep, this.min + this.rangeWindow);
            this.updateSliderAttributes();
            this.clearCache();
            this.updateUI();
        }
    }

    updateSliderAttributes() {
        this.minRange.min = this.currentMin;
        this.minRange.max = this.currentMax;
        this.maxRange.min = this.currentMin;
        this.maxRange.max = this.currentMax;
        
        if (this.selectedMin < this.currentMin) this.selectedMin = this.currentMin;
        if (this.selectedMin > this.currentMax) this.selectedMin = this.currentMax - this.minGap;
        if (this.selectedMax > this.currentMax) this.selectedMax = this.currentMax;
        if (this.selectedMax < this.currentMin + this.minGap) this.selectedMax = this.currentMin + this.minGap;
        
        this.minRange.value = this.selectedMin;
        this.maxRange.value = this.selectedMax;
    }

    updateUI() {
        let minPercent = ((this.selectedMin - this.currentMin) / (this.currentMax - this.currentMin)) * 100;
        let maxPercent = ((this.selectedMax - this.currentMin) / (this.currentMax - this.currentMin)) * 100;
        
        const originalMinPercent = minPercent;
        const originalMaxPercent = maxPercent;
        
        this.track.style.left = minPercent + '%';
        this.track.style.width = (maxPercent - minPercent) + '%';
        
        requestAnimationFrame(() => {
            const boundaryCheckedMin = this.calculateLabelPosition(minPercent, this.minLabel);
            const boundaryCheckedMax = this.calculateLabelPosition(maxPercent, this.maxLabel);
            
            const { minPercent: finalMinPercent, maxPercent: finalMaxPercent } = 
                this.checkLabelCollision(boundaryCheckedMin, boundaryCheckedMax, this.minLabel, this.maxLabel);
            
            this.minLabel.style.left = finalMinPercent + '%';
            this.maxLabel.style.left = finalMaxPercent + '%';
            this.minLabel.textContent = this.formatValue(this.selectedMin);
            this.maxLabel.textContent = this.formatValue(this.selectedMax);
            
            this.updateTrianglePosition(this.minLabel, originalMinPercent, finalMinPercent);
            this.updateTrianglePosition(this.maxLabel, originalMaxPercent, finalMaxPercent);
        });
        
        this.decreaseBtn.disabled = this.currentMin <= this.min;
        this.increaseBtn.disabled = this.currentMax >= this.max;
    }

    getValue() {
        return {
            min: this.selectedMin,
            max: this.selectedMax,
            currentMin: this.currentMin,
            currentMax: this.currentMax
        };
    }

    setValue(value) {
        if (typeof value === 'object' && value !== null) {
            this.selectedMin = value.min || this.selectedMin;
            this.selectedMax = value.max || this.selectedMax;
            this.currentMin = value.currentMin || this.currentMin;
            this.currentMax = value.currentMax || this.currentMax;
            
            if (this.minRange) {
                this.updateSliderAttributes();
                this.clearCache();
                this.updateUI();
            }
        }
    }
}

/**
 * OptionsSliderField - Optimized slider with predefined options
 */
class OptionsSliderField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.options = config.options || [];
        this.showMarkers = config.showMarkers !== false;
        this.currentIndex = config.defaultIndex || Math.floor(this.options.length / 2);
        this.value = this.getCurrentValue();
        
        // Performance optimizations
        this.debounceDelay = config.debounceDelay || 50;
        this.debouncedUpdate = this.debounce(() => this.updateUI(), this.debounceDelay);
        this.debouncedChange = this.debounce(() => this.handleChange(), this.debounceDelay);
        this.positionCache = new Map();
        this.dimensionCache = new Map(); // ADDED: Missing dimension cache
        
        this.customValidation = config.customValidation || null;
    }

    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    validate() {
        if (this.required && (this.value === undefined || this.value === null || this.value === '')) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        return super.validate();
    }

    getCurrentValue() {
        if (this.currentIndex >= 0 && this.currentIndex < this.options.length) {
            const option = this.options[this.currentIndex];
            return typeof option === 'object' ? option.value : option;
        }
        return '';
    }

    getCurrentDisplay() {
        if (this.currentIndex >= 0 && this.currentIndex < this.options.length) {
            const option = this.options[this.currentIndex];
            return typeof option === 'object' ? (option.display || option.label || option.value) : option;
        }
        return '';
    }

    validateConstraints(newValue) {
        if (this.customValidation) {
            const result = this.customValidation(newValue, this.factory.formValues);
            if (result !== true) {
                if (typeof result === 'object' && result.adjustedValue !== undefined) {
                    const adjustedIndex = this.options.findIndex(opt => 
                        (typeof opt === 'object' ? opt.value : opt) === result.adjustedValue
                    );
                    
                    if (adjustedIndex !== -1) {
                        this.currentIndex = adjustedIndex;
                        this.value = result.adjustedValue;
                        
                        if (this.slider) {
                            this.slider.value = this.currentIndex;
                            this.debouncedUpdate();
                        }
                    }
                    
                    this.showError(result.message);
                    return result.adjustedValue;
                } else if (typeof result === 'string') {
                    this.showError(result);
                    return false;
                }
            } else {
                this.hideError();
            }
        }
        return newValue;
    }

    updateConstraints(newConstraints) {
        if (newConstraints.options !== undefined) {
            this.options = newConstraints.options;
            
            if (this.currentIndex >= this.options.length) {
                this.currentIndex = this.options.length - 1;
            }
            
            if (this.slider) {
                this.slider.max = this.options.length - 1;
                this.slider.value = this.currentIndex;
                this.value = this.getCurrentValue();
                
                if (this.showMarkers && this.markersContainer) {
                    this.createMarkers();
                }
                
                this.clearCache();
                this.debouncedUpdate();
            }
        }
    }

    clearCache() {
        this.positionCache.clear();
        this.dimensionCache.clear();
    }

    // ADDED: Missing getContainerDimensions method
    getContainerDimensions() {
        const container = this.container.querySelector('.slider-container');
        if (!container) return { width: 0, height: 0 };
        
        const cacheKey = 'container-dimensions';
        if (this.dimensionCache.has(cacheKey)) {
            return this.dimensionCache.get(cacheKey);
        }
        
        const dimensions = {
            width: container.offsetWidth,
            height: container.offsetHeight
        };
        
        this.dimensionCache.set(cacheKey, dimensions);
        return dimensions;
    }

    // UPDATED: Fixed calculateLabelPosition method
    calculateLabelPosition(percent, labelElement) {
        if (!labelElement) return percent;
        
        const cacheKey = `label-pos-${percent}-${labelElement.offsetWidth}`;
        if (this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey);
        }
        
        const containerDimensions = this.getContainerDimensions();
        if (containerDimensions.width === 0) return percent;
        
        const labelWidth = labelElement.offsetWidth || 100;
        const leftBoundary = (labelWidth / 2) / containerDimensions.width * 100;
        const rightBoundary = 100 - leftBoundary;
        
        let result = percent;
        if (percent < leftBoundary) {
            result = leftBoundary;
        } else if (percent > rightBoundary) {
            result = rightBoundary;
        }
        
        this.positionCache.set(cacheKey, result);
        return result;
    }

    // ADDED: Missing checkLabelCollision method for consistency
    checkLabelCollision(minPercent, maxPercent, minLabel, maxLabel) {
        // For single slider, just return the original position
        return { minPercent, maxPercent };
    }

    calculateTrianglePosition(originalPercent, finalPercent, labelElement, containerElement) {
        if (!labelElement || !containerElement) return '50%';
        
        const containerWidth = containerElement.offsetWidth;
        const labelWidth = labelElement.offsetWidth;
        
        if (containerWidth === 0 || labelWidth === 0) return '50%';
        
        const originalHandlePosition = (originalPercent / 100) * containerWidth;
        const finalLabelPosition = (finalPercent / 100) * containerWidth;
        const offsetFromCenter = originalHandlePosition - finalLabelPosition;
        const triangleOffset = (offsetFromCenter / labelWidth) * 100;
        const trianglePosition = 50 + triangleOffset;
        
        const triangleHalfWidth = 5;
        const safetyMargin = 4;
        const minSafeDistance = triangleHalfWidth + safetyMargin;
        const minTrianglePos = (minSafeDistance / labelWidth) * 100;
        const maxTrianglePos = 100 - minTrianglePos;
        const absoluteMinPos = Math.max(minTrianglePos, 15);
        const absoluteMaxPos = Math.min(maxTrianglePos, 85);
        
        return `${Math.max(absoluteMinPos, Math.min(absoluteMaxPos, trianglePosition))}%`;
    }

    updateTrianglePosition(labelElement, originalPercent, finalPercent) {
        if (!labelElement) return;
        
        const container = this.container.querySelector('.slider-container');
        const trianglePos = this.calculateTrianglePosition(originalPercent, finalPercent, labelElement, container);
        labelElement.style.setProperty('--triangle-left', trianglePos);
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';
        
        if (this.showMarkers) {
            this.markersContainer = document.createElement('div');
            this.markersContainer.className = 'slider-markers';
            this.createMarkers();
            sliderContainer.appendChild(this.markersContainer);
        }
        
        const trackBg = document.createElement('div');
        trackBg.className = 'slider-track-bg';
        
        this.progress = document.createElement('div');
        this.progress.className = 'slider-progress';
        trackBg.appendChild(this.progress);
        
        this.slider = document.createElement('input');
        this.slider.type = 'range';
        this.slider.className = 'range-input';
        this.slider.id = this.id;
        this.slider.min = 0;
        this.slider.max = this.options.length - 1;
        this.slider.value = this.currentIndex;
        this.slider.step = 1;
        
        this.valueLabel = document.createElement('div');
        this.valueLabel.className = 'slider-value-label';
        
        sliderContainer.appendChild(trackBg);
        sliderContainer.appendChild(this.slider);
        sliderContainer.appendChild(this.valueLabel);
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(label);
        container.appendChild(sliderContainer);
        container.appendChild(errorElement);
        
        this.setupEventListeners();
        this.updateUI();
        
        this.container = container;
        return container;
    }

    createMarkers() {
        this.markersContainer.innerHTML = '';
        this.options.forEach((option, index) => {
            const marker = document.createElement('div');
            marker.className = 'slider-marker';
            marker.dataset.index = index;
            
            const display = typeof option === 'object' ? (option.display || option.label || option.value) : option;
            marker.textContent = display;
            
            marker.addEventListener('click', () => {
                const newValue = typeof option === 'object' ? option.value : option;
                
                const validatedValue = this.validateConstraints(newValue);
                
                if (validatedValue !== false) {
                    this.currentIndex = index;
                    this.value = this.getCurrentValue();
                    this.slider.value = index;
                    this.debouncedUpdate();
                    this.debouncedChange();
                }
            });
            
            this.markersContainer.appendChild(marker);
        });
    }

    setupEventListeners() {
        this.slider.addEventListener('input', () => {
            this.currentIndex = parseInt(this.slider.value);
            const newValue = this.getCurrentValue();
            
            const validatedValue = this.validateConstraints(newValue);
            
            if (validatedValue !== false) {
                this.value = validatedValue;
                this.debouncedUpdate();
                this.debouncedChange();
            }
        });
        
        // UPDATED: Clear cache on window resize
        window.addEventListener('resize', () => this.clearCache());
    }

    // UPDATED: Enhanced updateUI method with proper positioning
    updateUI() {
        const percent = this.options.length > 1 ? (this.currentIndex / (this.options.length - 1)) * 100 : 0;
        const originalPercent = percent;
        
        this.progress.style.width = percent + '%';
        
        requestAnimationFrame(() => {
            // Force dimension recalculation
            this.clearCache();
            
            const finalPercent = this.calculateLabelPosition(percent, this.valueLabel);
            this.valueLabel.style.left = finalPercent + '%';
            this.valueLabel.textContent = this.getCurrentDisplay();
            
            this.updateTrianglePosition(this.valueLabel, originalPercent, finalPercent);
        });
        
        if (this.showMarkers && this.markersContainer) {
            this.markersContainer.querySelectorAll('.slider-marker').forEach((marker, index) => {
                marker.classList.toggle('active', index === this.currentIndex);
            });
        }
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        const index = this.options.findIndex(opt => 
            (typeof opt === 'object' ? opt.value : opt) === value
        );
        
        if (index !== -1) {
            this.currentIndex = index;
            this.value = value;
            
            if (this.slider) {
                this.slider.value = index;
                this.clearCache();
                this.updateUI();
            }
        }
    }
}

/**
 * Fixed DualRangeField - Added proper dimension caching and label positioning
 */
class DualRangeField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.min = config.min || 0;
        this.max = config.max || 10000;
        this.step = config.step || 100;
        this.minGap = config.minGap || 500;
        this.formatValue = config.formatValue || ((val) => `${parseInt(val).toLocaleString()}`);
        this.selectedMin = config.defaultMin || this.min + 1000;
        this.selectedMax = config.defaultMax || this.max - 1000;
        
        // Performance optimizations
        this.debounceDelay = config.debounceDelay || 50;
        this.debouncedUpdate = this.debounce(() => this.updateUI(), this.debounceDelay);
        this.debouncedChange = this.debounce(() => this.handleChange(), this.debounceDelay);
        this.positionCache = new Map();
        this.dimensionCache = new Map(); // ADDED: Missing dimension cache
        
        this.customValidation = config.customValidation || null;
    }

    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    validate() {
        if (this.required && (!this.selectedMin && !this.selectedMax)) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        return super.validate();
    }

    validateConstraints(newValue) {
        if (this.customValidation) {
            const result = this.customValidation(newValue, this.factory.formValues);
            if (result !== true) {
                if (typeof result === 'object' && result.adjustedValue !== undefined) {
                    this.selectedMin = result.adjustedValue;
                    this.selectedMax = Math.max(this.selectedMin + this.minGap, this.selectedMax);
                    
                    if (this.minRange && this.maxRange) {
                        this.minRange.value = this.selectedMin;
                        this.maxRange.value = this.selectedMax;
                        this.debouncedUpdate();
                    }
                    
                    this.showError(result.message);
                    return result.adjustedValue;
                } else if (typeof result === 'string') {
                    this.showError(result);
                    return false;
                }
            } else {
                this.hideError();
            }
        }
        return newValue;
    }

    updateConstraints(newConstraints) {
        if (newConstraints.min !== undefined) {
            this.min = newConstraints.min;
            
            if (this.minRange) {
                this.minRange.min = this.min;
                this.maxRange.min = this.min;
                
                if (this.selectedMin < this.min) {
                    this.selectedMin = this.min;
                    this.minRange.value = this.selectedMin;
                }
                if (this.selectedMax < this.min + this.minGap) {
                    this.selectedMax = this.min + this.minGap;
                    this.maxRange.value = this.selectedMax;
                }
                
                this.clearCache();
                this.debouncedUpdate();
            }
        }
        
        if (newConstraints.max !== undefined) {
            this.max = newConstraints.max;
            if (this.minRange) {
                this.minRange.max = this.max;
                this.maxRange.max = this.max;
                this.clearCache();
                this.debouncedUpdate();
            }
        }
    }

    clearCache() {
        this.positionCache.clear();
        this.dimensionCache.clear(); // ADDED: Clear dimension cache
    }

    // ADDED: Missing getContainerDimensions method
    getContainerDimensions() {
        const container = this.container.querySelector('.slider-container');
        if (!container) return { width: 0, height: 0 };
        
        const cacheKey = 'container-dimensions';
        if (this.dimensionCache.has(cacheKey)) {
            return this.dimensionCache.get(cacheKey);
        }
        
        const dimensions = {
            width: container.offsetWidth,
            height: container.offsetHeight
        };
        
        this.dimensionCache.set(cacheKey, dimensions);
        return dimensions;
    }

    // UPDATED: Fixed calculateLabelPosition method
    calculateLabelPosition(percent, labelElement) {
        if (!labelElement) return percent;
        
        const cacheKey = `label-pos-${percent}-${labelElement.offsetWidth}`;
        if (this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey);
        }
        
        const containerDimensions = this.getContainerDimensions();
        if (containerDimensions.width === 0) return percent;
        
        const labelWidth = labelElement.offsetWidth || 100;
        const leftBoundary = (labelWidth / 2) / containerDimensions.width * 100;
        const rightBoundary = 100 - leftBoundary;
        
        let result = percent;
        if (percent < leftBoundary) {
            result = leftBoundary;
        } else if (percent > rightBoundary) {
            result = rightBoundary;
        }
        
        this.positionCache.set(cacheKey, result);
        return result;
    }

    // UPDATED: Enhanced checkLabelCollision method
    checkLabelCollision(minPercent, maxPercent, minLabel, maxLabel) {
        if (!minLabel || !maxLabel) return { minPercent, maxPercent };
        
        const cacheKey = `collision-${minPercent}-${maxPercent}-${minLabel.offsetWidth}-${maxLabel.offsetWidth}`;
        if (this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey);
        }
        
        const minWidth = minLabel.offsetWidth || 100;
        const maxWidth = maxLabel.offsetWidth || 100;
        const containerDimensions = this.getContainerDimensions();
        
        if (containerDimensions.width === 0) return { minPercent, maxPercent };
        
        const minDistance = ((minWidth + maxWidth) / 2 + 10) / containerDimensions.width * 100;
        const currentDistance = maxPercent - minPercent;
        
        let result = { minPercent, maxPercent };
        
        if (currentDistance < minDistance) {
            const center = (minPercent + maxPercent) / 2;
            const halfDistance = minDistance / 2;
            
            let adjustedMinPercent = center - halfDistance;
            let adjustedMaxPercent = center + halfDistance;
            
            if (adjustedMinPercent < 0) {
                adjustedMinPercent = 0;
                adjustedMaxPercent = minDistance;
            } else if (adjustedMaxPercent > 100) {
                adjustedMaxPercent = 100;
                adjustedMinPercent = 100 - minDistance;
            }
            
            result = { 
                minPercent: adjustedMinPercent, 
                maxPercent: adjustedMaxPercent 
            };
        }
        
        this.positionCache.set(cacheKey, result);
        return result;
    }

    calculateTrianglePosition(originalPercent, finalPercent, labelElement, containerElement) {
        if (!labelElement || !containerElement) return '50%';
        
        const containerWidth = containerElement.offsetWidth;
        const labelWidth = labelElement.offsetWidth;
        
        if (containerWidth === 0 || labelWidth === 0) return '50%';
        
        const originalHandlePosition = (originalPercent / 100) * containerWidth;
        const finalLabelPosition = (finalPercent / 100) * containerWidth;
        const offsetFromCenter = originalHandlePosition - finalLabelPosition;
        const triangleOffset = (offsetFromCenter / labelWidth) * 100;
        const trianglePosition = 50 + triangleOffset;
        
        const triangleHalfWidth = 5;
        const safetyMargin = 4;
        const minSafeDistance = triangleHalfWidth + safetyMargin;
        const minTrianglePos = (minSafeDistance / labelWidth) * 100;
        const maxTrianglePos = 100 - minTrianglePos;
        const absoluteMinPos = Math.max(minTrianglePos, 15);
        const absoluteMaxPos = Math.min(maxTrianglePos, 85);
        
        return `${Math.max(absoluteMinPos, Math.min(absoluteMaxPos, trianglePosition))}%`;
    }

    updateTrianglePosition(labelElement, originalPercent, finalPercent) {
        if (!labelElement) return;
        
        const container = this.container.querySelector('.slider-container');
        const trianglePos = this.calculateTrianglePosition(originalPercent, finalPercent, labelElement, container);
        labelElement.style.setProperty('--triangle-left', trianglePos);
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';
        
        const trackBg = document.createElement('div');
        trackBg.className = 'slider-track-bg';
        
        this.progress = document.createElement('div');
        this.progress.className = 'slider-progress';
        trackBg.appendChild(this.progress);
        
        this.minRange = document.createElement('input');
        this.minRange.type = 'range';
        this.minRange.className = 'range-input';
        this.minRange.min = this.min;
        this.minRange.max = this.max;
        this.minRange.value = this.selectedMin;
        this.minRange.step = this.step;
        
        this.maxRange = document.createElement('input');
        this.maxRange.type = 'range';
        this.maxRange.className = 'range-input';
        this.maxRange.min = this.min;
        this.maxRange.max = this.max;
        this.maxRange.value = this.selectedMax;
        this.maxRange.step = this.step;
        
        this.minLabel = document.createElement('div');
        this.minLabel.className = 'slider-value-label';
        
        this.maxLabel = document.createElement('div');
        this.maxLabel.className = 'slider-value-label';
        
        sliderContainer.appendChild(trackBg);
        sliderContainer.appendChild(this.minRange);
        sliderContainer.appendChild(this.maxRange);
        sliderContainer.appendChild(this.minLabel);
        sliderContainer.appendChild(this.maxLabel);
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(label);
        container.appendChild(sliderContainer);
        container.appendChild(errorElement);
        
        this.setupEventListeners();
        this.updateUI();
        
        this.container = container;
        return container;
    }

    setupEventListeners() {
        this.minRange.addEventListener('input', () => this.handleMinChange());
        this.maxRange.addEventListener('input', () => this.handleMaxChange());
        window.addEventListener('resize', () => this.clearCache()); // UPDATED: Clear cache on resize
    }

    handleMinChange() {
        const minVal = parseInt(this.minRange.value);
        const maxVal = parseInt(this.maxRange.value);
        
        if (maxVal - minVal < this.minGap) {
            this.minRange.value = maxVal - this.minGap;
        }
        
        this.selectedMin = parseInt(this.minRange.value);
        
        const validatedValue = this.validateConstraints({
            min: this.selectedMin,
            max: this.selectedMax
        });
        
        if (validatedValue !== false) {
            this.debouncedUpdate();
            this.debouncedChange();
        }
    }

    handleMaxChange() {
        const minVal = parseInt(this.minRange.value);
        const maxVal = parseInt(this.maxRange.value);
        
        if (maxVal - minVal < this.minGap) {
            this.maxRange.value = minVal + this.minGap;
        }
        
        this.selectedMax = parseInt(this.maxRange.value);
        
        const validatedValue = this.validateConstraints({
            min: this.selectedMin,
            max: this.selectedMax
        });
        
        if (validatedValue !== false) {
            this.debouncedUpdate();
            this.debouncedChange();
        }
    }

    // UPDATED: Enhanced updateUI method with proper positioning
    updateUI() {
        let minPercent = ((this.selectedMin - this.min) / (this.max - this.min)) * 100;
        let maxPercent = ((this.selectedMax - this.min) / (this.max - this.min)) * 100;
        
        const originalMinPercent = minPercent;
        const originalMaxPercent = maxPercent;
        
        this.progress.style.left = minPercent + '%';
        this.progress.style.width = (maxPercent - minPercent) + '%';
        
        requestAnimationFrame(() => {
            // Force dimension recalculation
            this.clearCache();
            
            const boundaryCheckedMin = this.calculateLabelPosition(minPercent, this.minLabel);
            const boundaryCheckedMax = this.calculateLabelPosition(maxPercent, this.maxLabel);
            
            const { minPercent: finalMinPercent, maxPercent: finalMaxPercent } = 
                this.checkLabelCollision(boundaryCheckedMin, boundaryCheckedMax, this.minLabel, this.maxLabel);
            
            this.minLabel.style.left = finalMinPercent + '%';
            this.maxLabel.style.left = finalMaxPercent + '%';
            this.minLabel.textContent = this.formatValue(this.selectedMin);
            this.maxLabel.textContent = this.formatValue(this.selectedMax);
            
            this.updateTrianglePosition(this.minLabel, originalMinPercent, finalMinPercent);
            this.updateTrianglePosition(this.maxLabel, originalMaxPercent, finalMaxPercent);
        });
    }

    getValue() {
        return {
            min: this.selectedMin,
            max: this.selectedMax
        };
    }

    setValue(value) {
        if (typeof value === 'object' && value !== null) {
            this.selectedMin = value.min || this.selectedMin;
            this.selectedMax = value.max || this.selectedMax;
            
            if (this.minRange && this.maxRange) {
                this.minRange.value = this.selectedMin;
                this.maxRange.value = this.selectedMax;
                this.clearCache();
                this.updateUI();
            }
        }
    }
}

/**
 * Fixed SliderField - Added proper dimension caching and label positioning
 */
class SliderField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.min = config.min || 0;
        this.max = config.max || 10000;
        this.step = config.step || 100;
        this.sliderType = config.sliderType || 'currency';
        this.formatValue = config.formatValue || this.getDefaultFormatter();
        this.value = config.value || config.defaultValue || (this.min + this.max) / 2;
        
        // Performance optimizations
        this.debounceDelay = config.debounceDelay || 50;
        this.debouncedUpdate = this.debounce(() => this.updateUI(), this.debounceDelay);
        this.debouncedChange = this.debounce(() => this.handleChange(), this.debounceDelay);
        this.positionCache = new Map();
        this.dimensionCache = new Map(); // ADDED: Missing dimension cache
        
        this.customValidation = config.customValidation || null;
    }

    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    validate() {
        if (this.required && (this.value === null || this.value === undefined || this.value === '')) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        return super.validate();
    }

    getDefaultFormatter() {
        switch (this.sliderType) {
            case 'currency':
                return (val) => `${parseInt(val).toLocaleString()}`;
            case 'percentage':
                return (val) => `${parseFloat(val).toFixed(1)}%`;
            case 'number':
            default:
                return (val) => val.toString();
        }
    }

    validateConstraints(newValue) {
        if (this.customValidation) {
            const result = this.customValidation(newValue, this.factory.formValues);
            if (result !== true) {
                if (typeof result === 'object' && result.adjustedValue !== undefined) {
                    this.value = result.adjustedValue;
                    
                    if (this.slider) {
                        this.slider.value = this.value;
                        this.debouncedUpdate();
                    }
                    
                    this.showError(result.message);
                    return result.adjustedValue;
                } else if (typeof result === 'string') {
                    this.showError(result);
                    return false;
                }
            } else {
                this.hideError();
            }
        }
        return newValue;
    }

    updateConstraints(newConstraints) {
        if (newConstraints.min !== undefined) {
            this.min = newConstraints.min;
            
            if (this.slider) {
                this.slider.min = this.min;
                
                if (this.value < this.min) {
                    this.value = this.min;
                    this.slider.value = this.value;
                }
                
                this.clearCache();
                this.debouncedUpdate();
            }
        }
        
        if (newConstraints.max !== undefined) {
            this.max = newConstraints.max;
            if (this.slider) {
                this.slider.max = this.max;
                
                if (this.value > this.max) {
                    this.value = this.max;
                    this.slider.value = this.value;
                }
                
                this.clearCache();
                this.debouncedUpdate();
            }
        }
    }

    clearCache() {
        this.positionCache.clear();
        this.dimensionCache.clear(); // ADDED: Clear dimension cache
    }

    // ADDED: Missing getContainerDimensions method
    getContainerDimensions() {
        const container = this.container.querySelector('.slider-container');
        if (!container) return { width: 0, height: 0 };
        
        const cacheKey = 'container-dimensions';
        if (this.dimensionCache.has(cacheKey)) {
            return this.dimensionCache.get(cacheKey);
        }
        
        const dimensions = {
            width: container.offsetWidth,
            height: container.offsetHeight
        };
        
        this.dimensionCache.set(cacheKey, dimensions);
        return dimensions;
    }

    // UPDATED: Fixed calculateLabelPosition method
    calculateLabelPosition(percent, labelElement) {
        if (!labelElement) return percent;
        
        const cacheKey = `label-pos-${percent}-${labelElement.offsetWidth}`;
        if (this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey);
        }
        
        const containerDimensions = this.getContainerDimensions();
        if (containerDimensions.width === 0) return percent;
        
        const labelWidth = labelElement.offsetWidth || 100;
        const leftBoundary = (labelWidth / 2) / containerDimensions.width * 100;
        const rightBoundary = 100 - leftBoundary;
        
        let result = percent;
        if (percent < leftBoundary) {
            result = leftBoundary;
        } else if (percent > rightBoundary) {
            result = rightBoundary;
        }
        
        this.positionCache.set(cacheKey, result);
        return result;
    }

    calculateTrianglePosition(originalPercent, finalPercent, labelElement, containerElement) {
        if (!labelElement || !containerElement) return '50%';
        
        const containerWidth = containerElement.offsetWidth;
        const labelWidth = labelElement.offsetWidth;
        
        if (containerWidth === 0 || labelWidth === 0) return '50%';
        
        const originalHandlePosition = (originalPercent / 100) * containerWidth;
        const finalLabelPosition = (finalPercent / 100) * containerWidth;
        const offsetFromCenter = originalHandlePosition - finalLabelPosition;
        const triangleOffset = (offsetFromCenter / labelWidth) * 100;
        const trianglePosition = 50 + triangleOffset;
        
        const triangleHalfWidth = 5;
        const safetyMargin = 4;
        const minSafeDistance = triangleHalfWidth + safetyMargin;
        const minTrianglePos = (minSafeDistance / labelWidth) * 100;
        const maxTrianglePos = 100 - minTrianglePos;
        const absoluteMinPos = Math.max(minTrianglePos, 15);
        const absoluteMaxPos = Math.min(maxTrianglePos, 85);
        
        return `${Math.max(absoluteMinPos, Math.min(absoluteMaxPos, trianglePosition))}%`;
    }

    updateTrianglePosition(labelElement, originalPercent, finalPercent) {
        if (!labelElement) return;
        
        const container = this.container.querySelector('.slider-container');
        const trianglePos = this.calculateTrianglePosition(originalPercent, finalPercent, labelElement, container);
        labelElement.style.setProperty('--triangle-left', trianglePos);
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';
        
        const trackBg = document.createElement('div');
        trackBg.className = 'slider-track-bg';
        
        this.progress = document.createElement('div');
        this.progress.className = 'slider-progress';
        trackBg.appendChild(this.progress);
        
        this.slider = document.createElement('input');
        this.slider.type = 'range';
        this.slider.className = 'range-input';
        this.slider.id = this.id;
        this.slider.min = this.min;
        this.slider.max = this.max;
        this.slider.value = this.value;
        this.slider.step = this.step;
        
        this.valueLabel = document.createElement('div');
        this.valueLabel.className = 'slider-value-label';
        
        sliderContainer.appendChild(trackBg);
        sliderContainer.appendChild(this.slider);
        sliderContainer.appendChild(this.valueLabel);
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(label);
        container.appendChild(sliderContainer);
        container.appendChild(errorElement);
        
        this.setupEventListeners();
        this.updateUI();
        
        this.container = container;
        return container;
    }

    setupEventListeners() {
        this.slider.addEventListener('input', () => {
            const newValue = parseFloat(this.slider.value);
            
            const validatedValue = this.validateConstraints(newValue);
            
            if (validatedValue !== false) {
                this.value = validatedValue;
                this.debouncedUpdate();
                this.debouncedChange();
            }
        });
        
        window.addEventListener('resize', () => this.clearCache()); // UPDATED: Clear cache on resize
    }

    // UPDATED: Enhanced updateUI method with proper positioning
    updateUI() {
        const percent = ((this.value - this.min) / (this.max - this.min)) * 100;
        const originalPercent = percent;
        
        this.progress.style.width = percent + '%';
        
        requestAnimationFrame(() => {
            // Force dimension recalculation
            this.clearCache();
            
            const finalPercent = this.calculateLabelPosition(percent, this.valueLabel);
            this.valueLabel.style.left = finalPercent + '%';
            this.valueLabel.textContent = this.formatValue(this.value);
            
            this.updateTrianglePosition(this.valueLabel, originalPercent, finalPercent);
        });
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = parseFloat(value) || this.min;
        if (this.slider) {
            this.slider.value = this.value;
            this.clearCache();
            this.updateUI();
        }
    }
}

/**
 * Fixed SlidingWindowSliderField - Added proper dimension caching and label positioning
 */
class SlidingWindowSliderField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.min = config.min || 0;
        this.max = config.max || 10000;
        this.step = config.step || 100;
        this.rangeWindow = config.rangeWindow || 1000;
        this.windowStep = config.windowStep || 1000;
        this.formatValue = config.formatValue || ((val) => `${parseInt(val).toLocaleString()}`);
        
        this.currentMin = config.currentMin || this.min;
        this.currentMax = config.currentMax || Math.min(this.min + this.rangeWindow, this.max);
        this.selectedValue = config.defaultValue || config.value || ((this.currentMin + this.currentMax) / 2);
        
        if (this.selectedValue < this.currentMin) {
            this.selectedValue = this.currentMin;
        } else if (this.selectedValue > this.currentMax) {
            this.selectedValue = this.currentMax;
        }
        
        this.value = this.selectedValue;
        
        // Performance optimizations
        this.debounceDelay = config.debounceDelay || 50;
        this.debouncedUpdate = this.debounce(() => this.updateUI(), this.debounceDelay);
        this.debouncedChange = this.debounce(() => this.handleChange(), this.debounceDelay);
        this.positionCache = new Map();
        this.dimensionCache = new Map(); // ADDED: Missing dimension cache
        
        this.customValidation = config.customValidation || null;
    }

    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    validate() {
        if (this.required && (this.selectedValue === null || this.selectedValue === undefined || this.selectedValue === '')) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        return super.validate();
    }

    validateConstraints(newValue) {
        if (this.customValidation) {
            const result = this.customValidation(newValue, this.factory.formValues);
            if (result !== true) {
                if (typeof result === 'object' && result.adjustedValue !== undefined) {
                    this.selectedValue = result.adjustedValue;
                    this.value = result.adjustedValue;
                    
                    if (this.slider) {
                        this.slider.value = this.selectedValue;
                        this.debouncedUpdate();
                    }
                    
                    this.showError(result.message);
                    return result.adjustedValue;
                } else if (typeof result === 'string') {
                    this.showError(result);
                    return false;
                }
            } else {
                this.hideError();
            }
        }
        return newValue;
    }

    updateConstraints(newConstraints) {
        if (newConstraints.min !== undefined) {
            this.min = newConstraints.min;
            this.currentMin = Math.max(this.currentMin, newConstraints.min);
            
            if (this.slider) {
                this.slider.min = this.currentMin;
                
                if (this.selectedValue < this.currentMin) {
                    this.selectedValue = this.currentMin;
                    this.value = this.selectedValue;
                    this.slider.value = this.selectedValue;
                }
                
                this.clearCache();
                this.debouncedUpdate();
            }
        }
        
        if (newConstraints.rangeWindow !== undefined) {
            this.rangeWindow = newConstraints.rangeWindow;
        }
        
        if (newConstraints.windowStep !== undefined) {
            this.windowStep = newConstraints.windowStep;
        }
    }

    clearCache() {
        this.positionCache.clear();
        this.dimensionCache.clear(); // ADDED: Clear dimension cache
    }

    // ADDED: Missing getContainerDimensions method
    getContainerDimensions() {
        const container = this.container.querySelector('.slider-container');
        if (!container) return { width: 0, height: 0 };
        
        const cacheKey = 'container-dimensions';
        if (this.dimensionCache.has(cacheKey)) {
            return this.dimensionCache.get(cacheKey);
        }
        
        const dimensions = {
            width: container.offsetWidth,
            height: container.offsetHeight
        };
        
        this.dimensionCache.set(cacheKey, dimensions);
        return dimensions;
    }

    // UPDATED: Fixed calculateLabelPosition method
    calculateLabelPosition(percent, labelElement) {
        if (!labelElement) return percent;
        
        const cacheKey = `label-pos-${percent}-${labelElement.offsetWidth}`;
        if (this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey);
        }
        
        const containerDimensions = this.getContainerDimensions();
        if (containerDimensions.width === 0) return percent;
        
        const labelWidth = labelElement.offsetWidth || 100;
        const leftBoundary = (labelWidth / 2) / containerDimensions.width * 100;
        const rightBoundary = 100 - leftBoundary;
        
        let result = percent;
        if (percent < leftBoundary) {
            result = leftBoundary;
        } else if (percent > rightBoundary) {
            result = rightBoundary;
        }
        
        this.positionCache.set(cacheKey, result);
        return result;
    }

    calculateTrianglePosition(originalPercent, finalPercent, labelElement, containerElement) {
        if (!labelElement || !containerElement) return '50%';
        
        const containerWidth = containerElement.offsetWidth;
        const labelWidth = labelElement.offsetWidth;
        
        if (containerWidth === 0 || labelWidth === 0) return '50%';
        
        const originalHandlePosition = (originalPercent / 100) * containerWidth;
        const finalLabelPosition = (finalPercent / 100) * containerWidth;
        const offsetFromCenter = originalHandlePosition - finalLabelPosition;
        const triangleOffset = (offsetFromCenter / labelWidth) * 100;
        const trianglePosition = 50 + triangleOffset;
        
        const triangleHalfWidth = 5;
        const safetyMargin = 4;
        const minSafeDistance = triangleHalfWidth + safetyMargin;
        const minTrianglePos = (minSafeDistance / labelWidth) * 100;
        const maxTrianglePos = 100 - minTrianglePos;
        const absoluteMinPos = Math.max(minTrianglePos, 15);
        const absoluteMaxPos = Math.min(maxTrianglePos, 85);
        
        return `${Math.max(absoluteMinPos, Math.min(absoluteMaxPos, trianglePosition))}%`;
    }

    updateTrianglePosition(labelElement, originalPercent, finalPercent) {
        if (!labelElement) return;
        
        const container = this.container.querySelector('.slider-container');
        const trianglePos = this.calculateTrianglePosition(originalPercent, finalPercent, labelElement, container);
        labelElement.style.setProperty('--triangle-left', trianglePos);
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const slidingLayout = document.createElement('div');
        slidingLayout.className = 'sliding-window-layout';
        
        this.decreaseBtn = document.createElement('button');
        this.decreaseBtn.type = 'button';
        this.decreaseBtn.className = 'slider-control-btn';
        this.decreaseBtn.innerHTML = this.factory.SVG_ICONS.MINUS;
        
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';
        
        const trackBg = document.createElement('div');
        trackBg.className = 'slider-track-bg';
        
        this.progress = document.createElement('div');
        this.progress.className = 'slider-progress';
        trackBg.appendChild(this.progress);
        
        this.slider = document.createElement('input');
        this.slider.type = 'range';
        this.slider.className = 'range-input';
        this.slider.id = this.id;
        this.slider.min = this.currentMin;
        this.slider.max = this.currentMax;
        this.slider.value = this.selectedValue;
        this.slider.step = this.step;
        
        this.valueLabel = document.createElement('div');
        this.valueLabel.className = 'slider-value-label';
        
        sliderContainer.appendChild(trackBg);
        sliderContainer.appendChild(this.slider);
        sliderContainer.appendChild(this.valueLabel);
        
        this.increaseBtn = document.createElement('button');
        this.increaseBtn.type = 'button';
        this.increaseBtn.className = 'slider-control-btn';
        this.increaseBtn.innerHTML = this.factory.SVG_ICONS.PLUS;
        
        slidingLayout.appendChild(this.decreaseBtn);
        slidingLayout.appendChild(sliderContainer);
        slidingLayout.appendChild(this.increaseBtn);
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(label);
        container.appendChild(slidingLayout);
        container.appendChild(errorElement);
        
        this.setupEventListeners();
        this.updateUI();
        
        this.container = container;
        return container;
    }

    setupEventListeners() {
        this.slider.addEventListener('input', () => this.handleValueChange());
        this.decreaseBtn.addEventListener('click', () => this.decreaseRange());
        this.increaseBtn.addEventListener('click', () => this.increaseRange());
        window.addEventListener('resize', () => this.clearCache()); // UPDATED: Clear cache on resize
    }

    handleValueChange() {
        const newValue = parseFloat(this.slider.value);
        
        const validatedValue = this.validateConstraints(newValue);
        
        if (validatedValue !== false) {
            this.selectedValue = validatedValue;
            this.value = validatedValue;
            this.debouncedUpdate();
            this.debouncedChange();
        }
    }

    increaseRange() {
        if (this.currentMax < this.max) {
            this.currentMin = Math.min(this.currentMin + this.windowStep, this.max - this.rangeWindow);
            this.currentMax = Math.min(this.currentMax + this.windowStep, this.max);
            this.updateSliderAttributes();
            this.clearCache();
            this.updateUI();
        }
    }

    decreaseRange() {
        if (this.currentMin > this.min) {
            this.currentMin = Math.max(this.currentMin - this.windowStep, this.min);
            this.currentMax = Math.max(this.currentMax - this.windowStep, this.min + this.rangeWindow);
            this.updateSliderAttributes();
            this.clearCache();
            this.updateUI();
        }
    }

    updateSliderAttributes() {
        this.slider.min = this.currentMin;
        this.slider.max = this.currentMax;
        
        if (this.selectedValue < this.currentMin) {
            this.selectedValue = this.currentMin;
        } else if (this.selectedValue > this.currentMax) {
            this.selectedValue = this.currentMax;
        }
        
        this.slider.value = this.selectedValue;
        this.value = this.selectedValue;
    }

    // UPDATED: Enhanced updateUI method with proper positioning
    updateUI() {
        const percent = ((this.selectedValue - this.currentMin) / (this.currentMax - this.currentMin)) * 100;
        const originalPercent = percent;
        
        this.progress.style.width = percent + '%';
        
        requestAnimationFrame(() => {
            // Force dimension recalculation
            this.clearCache();
            
            const finalPercent = this.calculateLabelPosition(percent, this.valueLabel);
            this.valueLabel.style.left = finalPercent + '%';
            this.valueLabel.textContent = this.formatValue(this.selectedValue);
            
            this.updateTrianglePosition(this.valueLabel, originalPercent, finalPercent);
        });
        
        this.decreaseBtn.disabled = this.currentMin <= this.min;
        this.increaseBtn.disabled = this.currentMax >= this.max;
    }

    getValue() {
        return this.selectedValue;
    }

    setValue(value) {
        if (typeof value === 'object' && value !== null) {
            this.selectedValue = value.value || value.selectedValue || value.min || this.selectedValue;
            this.currentMin = value.currentMin || this.currentMin;
            this.currentMax = value.currentMax || this.currentMax;
        } else {
            this.selectedValue = parseFloat(value) || this.selectedValue;
        }
        
        this.value = this.selectedValue;
        
        if (this.slider) {
            this.updateSliderAttributes();
            this.clearCache();
            this.updateUI();
        }
    }
}

// ============================================================================
// SERVICE CARD FIELD CLASS WITH PERSONALIZED ERROR MESSAGES
// ============================================================================

class ServiceCardField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Store config for later use
        this.config = config;
        
        // Service card specific config
        this.services = config.services || [];
        this.layout = config.layout || 'grid';
        this.columns = config.columns || 'auto';
        this.showDuration = config.showDuration !== false;
        this.showDescription = config.showDescription !== false;
        this.allowDeselect = config.allowDeselect || false;
        this.selectionMode = config.selectionMode || 'single';
        
        // State
        this.selectedServices = [];
        this.selectedService = null;
    }

    validate() {
        const hasSelection = this.selectionMode === 'single' ? 
            this.selectedService !== null : 
            this.selectedServices.length > 0;
            
        const isValid = !this.required || hasSelection;
        
        if (!isValid) {
            this.showError(this.getFieldErrorMessage('serviceRequired'));
        } else {
            this.hideError();
        }
        
        return isValid;
    }
    
    render() {
        this.element = document.createElement('div');
        this.element.className = `form-field service-card-field layout-${this.layout}`;
               
        const container = document.createElement('div');
        container.className = `service-cards-container columns-${this.columns}`;
        container.id = this.id;
        
        // Render each service card
        this.services.forEach((service, index) => {
            const card = this.renderServiceCard(service, index);
            container.appendChild(card);
        });
        
        this.element.appendChild(container);
        
        // Add error container
        if (this.required) {
            const errorContainer = document.createElement('div');
            errorContainer.className = 'error-container';
            errorContainer.innerHTML = `
                <div class="error-message" id="${this.id}-error">
                    <div class="error-icon">!</div>
                    <span class="error-text">${this.getFieldErrorMessage('serviceRequired')}</span>
                </div>
            `;
            this.element.appendChild(errorContainer);
        }
        
        return this.element;
    }
    
    renderServiceCard(service, index) {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.dataset.serviceId = service.id || index;
        card.dataset.serviceIndex = index;
        
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-pressed', 'false');
        card.setAttribute('aria-describedby', `service-description-${index}`);
        
        const cardContent = `
            <div class="service-card-inner">
                ${this.renderCheckmark()}
                ${this.renderCardHeader(service)}
                ${this.renderCardBody(service, index)}
                ${this.renderCardFooter(service)}
            </div>
        `;
        
        card.innerHTML = cardContent;
        
        // Add event listeners
        card.addEventListener('click', () => this.handleCardClick(card, service));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleCardClick(card, service);
            }
        });
        
        return card;
    }
    
    renderCheckmark() {
        return `
            <div class="checkmark-icon" aria-hidden="true">
                ${this.factory.SVG_ICONS.CHECK}
            </div>
        `;
    }
    
    renderCardHeader(service) {
        const titleElement = service.title || service.name || service.eventName || 'Unnamed Service';
        const durationElement = this.showDuration && service.duration ? 
            `<div class="service-duration">${service.duration}</div>` : '';
            
        return `
            <div class="service-card-header">
                <div class="service-title">${titleElement}</div>
                ${durationElement}
            </div>
        `;
    }
    
    renderCardBody(service, index) {
        const description = this.showDescription && service.description ? 
            `<div class="service-description" id="service-description-${index}">${service.description}</div>` : '';
            
        const price = service.price ? 
            `<div class="service-price">${service.price}</div>` : '';
            
        const features = service.features && Array.isArray(service.features) ? 
            `<ul class="service-features">
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>` : '';
            
        return `
            <div class="service-card-body">
                ${description}
                ${features}
                ${price}
            </div>
        `;
    }
    
    renderCardFooter(service) {
        if (!service.badge && !service.popular && !service.recommended) {
            return '';
        }
        
        let badgeContent = '';
        
        if (service.popular) {
            badgeContent = '<div class="service-badge popular">Populaire</div>';
        } else if (service.recommended) {
            badgeContent = '<div class="service-badge recommended">Recommandé</div>';
        } else if (service.badge) {
            badgeContent = `<div class="service-badge custom">${service.badge}</div>`;
        }
        
        return badgeContent ? `<div class="service-card-footer">${badgeContent}</div>` : '';
    }
    
    handleCardClick(cardElement, service) {
        if (this.selectionMode === 'single') {
            this.handleSingleSelection(cardElement, service);
        } else {
            this.handleMultipleSelection(cardElement, service);
        }
        
        this.updateValue();
        this.hideError();
    }
    
    handleSingleSelection(cardElement, service) {
        const allCards = this.element.querySelectorAll('.service-card');
        allCards.forEach(card => {
            card.classList.remove('selected');
            card.setAttribute('aria-pressed', 'false');
        });
        
        if (this.allowDeselect && this.selectedService && this.selectedService.id === service.id) {
            this.selectedService = null;
            this.selectedServices = [];
            return;
        }
        
        cardElement.classList.add('selected');
        cardElement.setAttribute('aria-pressed', 'true');
        this.selectedService = service;
        this.selectedServices = [service];
    }
    
    handleMultipleSelection(cardElement, service) {
        const isSelected = cardElement.classList.contains('selected');
        
        if (isSelected) {
            cardElement.classList.remove('selected');
            cardElement.setAttribute('aria-pressed', 'false');
            this.selectedServices = this.selectedServices.filter(s => s.id !== service.id);
        } else {
            cardElement.classList.add('selected');
            cardElement.setAttribute('aria-pressed', 'true');
            this.selectedServices.push(service);
        }
        
        this.selectedService = this.selectedServices.length > 0 ? this.selectedServices[0] : null;
    }
    
    updateValue() {
        const value = this.selectionMode === 'single' ? 
            this.selectedService : 
            this.selectedServices;
            
        this.handleChange();
    }
    
    getValue() {
        return this.selectionMode === 'single' ? 
            this.selectedService : 
            this.selectedServices;
    }
    
    setValue(value) {
        this.selectedService = null;
        this.selectedServices = [];
        
        const allCards = this.element.querySelectorAll('.service-card');
        allCards.forEach(card => {
            card.classList.remove('selected');
            card.setAttribute('aria-pressed', 'false');
        });
        
        if (!value) return;
        
        if (this.selectionMode === 'single') {
            if (typeof value === 'object' && value.id) {
                this.selectedService = value;
                this.selectedServices = [value];
                const card = this.element.querySelector(`[data-service-id="${value.id}"]`);
                if (card) {
                    card.classList.add('selected');
                    card.setAttribute('aria-pressed', 'true');
                }
            }
        } else {
            if (Array.isArray(value)) {
                this.selectedServices = [...value];
                this.selectedService = value.length > 0 ? value[0] : null;
                
                value.forEach(service => {
                    const card = this.element.querySelector(`[data-service-id="${service.id}"]`);
                    if (card) {
                        card.classList.add('selected');
                        card.setAttribute('aria-pressed', 'true');
                    }
                });
            }
        }
    }
    
    showError(message) {
        const errorElement = this.element.querySelector(`#${this.id}-error`);
        if (errorElement) {
            const errorText = errorElement.querySelector('.error-text');
            if (errorText) {
                errorText.textContent = message;
            }
            errorElement.classList.add('show');
        }
    }
    
    hideError() {
        const errorElement = this.element.querySelector(`#${this.id}-error`);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
}

// ============================================================================
// CALENDAR FIELD CLASS WITH PERSONALIZED ERROR MESSAGES
// ============================================================================

/**
 * Enhanced CalendarField - Supports both booking and rescheduling modes with personalized error messages
 */
class CalendarField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Calendar specific config
        this.apiKey = config.apiKey || '';
        this.timezone = config.timezone || 'America/Toronto';
        this.eventTypeId = config.eventTypeId;
        this.eventTypeSlug = config.eventTypeSlug;
        this.scheduleId = config.scheduleId;
        this.eventName = config.eventName || 'Appointment';
        this.language = config.language || 'en';
        
        // Enhanced header configuration
        this.mode = config.mode || 'booking'; // 'booking' or 'reschedule'
        this.serviceProvider = config.serviceProvider || '';
        this.serviceName = config.serviceName || config.eventName || 'Appointment';
        this.currentAppointment = config.currentAppointment || null; // For reschedule mode
        this.headerIcon = config.headerIcon || 'CALENDAR';
        
        // ENHANCED: Store original serviceProvider to prevent loss during updates
        this.originalServiceProvider = config.serviceProvider || '';
        this.availableServices = config.availableServices || [];
        this.dynamicServiceUpdate = config.dynamicServiceUpdate || false;
        this.onServiceChange = config.onServiceChange || null;
        
        // Store full config for reference
        this.fullConfig = config;
        
        // State
        this.state = {
            currentDate: new Date(),
            selectedDate: null,
            selectedTime: null,
            availableSlots: {},
            workingDays: [1, 2, 3, 4, 5],
            isConfirmed: false,
            isLoading: false
        };
        
        console.log('CalendarField initialized with serviceProvider:', this.serviceProvider);
        
        // Initialize
        this.init();
    }

    // ENHANCED: Method to update calendar configuration while preserving serviceProvider
    async updateServiceConfiguration(serviceConfig) {
        console.log('CalendarField: Updating service configuration:', serviceConfig);
        console.log('CalendarField: Current serviceProvider before update:', this.serviceProvider);
        
        // Store original serviceProvider before any updates
        const preservedServiceProvider = this.originalServiceProvider || this.serviceProvider;
        
        // Update calendar properties
        if (serviceConfig.eventTypeId) this.eventTypeId = serviceConfig.eventTypeId;
        if (serviceConfig.eventTypeSlug) this.eventTypeSlug = serviceConfig.eventTypeSlug;
        if (serviceConfig.scheduleId) this.scheduleId = serviceConfig.scheduleId;
        if (serviceConfig.serviceName) this.serviceName = serviceConfig.serviceName;
        if (serviceConfig.eventName) this.eventName = serviceConfig.eventName;
        
        // CRITICAL: Always preserve the original serviceProvider
        this.serviceProvider = preservedServiceProvider;
        
        console.log('CalendarField: ServiceProvider preserved as:', this.serviceProvider);
        
        // Clear current selection and slots since service changed
        this.state.selectedDate = null;
        this.state.selectedTime = null;
        this.state.availableSlots = {};
        
        // Fetch new working days for the new service
        if (this.scheduleId && this.apiKey) {
            this.state.workingDays = await this.fetchWorkingDays(this.scheduleId);
            this.state.selectedDate = this.getDefaultActiveDay();
            const dayKey = this.formatDate(this.state.selectedDate);
            const slots = await this.fetchAvailableSlots(dayKey);
            this.state.availableSlots[dayKey] = slots;
        }
        
        // CRITICAL: Re-render the header with preserved serviceProvider
        this.updateCalendarHeader();
        
        // Re-render the calendar with new configuration
        if (this.element) {
            this.renderCalendarData();
        }
        
        // Update form value
        this.updateValue();
        
        console.log('CalendarField: Service configuration updated, final serviceProvider:', this.serviceProvider);
    }

    // ENHANCED: Method to specifically update calendar header
    updateCalendarHeader() {
        if (this.element) {
            const headerElement = this.element.querySelector('.calendar-title');
            if (headerElement) {
                console.log('CalendarField: Updating header with serviceProvider:', this.serviceProvider);
                headerElement.innerHTML = this.generateCalendarHeader();
            }
        }
    }

    // ENHANCED: Method to preserve serviceProvider during any updates
    preserveServiceProvider() {
        if (this.originalServiceProvider && !this.serviceProvider) {
            this.serviceProvider = this.originalServiceProvider;
            console.log('CalendarField: ServiceProvider restored to:', this.serviceProvider);
            this.updateCalendarHeader();
        }
    }

    validate() {
        const isValid = !!(this.state.selectedDate && this.state.selectedTime);
        
        if (this.required && !isValid) {
            this.showError(this.getFieldErrorMessage('dateTimeRequired'));
            return false;
        }
        
        this.hideError();
        return isValid;
    }
    
    async init() {
        if (this.scheduleId && this.apiKey) {
            this.state.workingDays = await this.fetchWorkingDays(this.scheduleId);
            if (!this.state.selectedDate) {
                this.state.selectedDate = this.getDefaultActiveDay();
                const dayKey = this.formatDate(this.state.selectedDate);
                const slots = await this.fetchAvailableSlots(dayKey);
                this.state.availableSlots[dayKey] = slots;
            }
        }
        
        // Ensure serviceProvider is preserved after init
        this.preserveServiceProvider();
    }
    
    formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    
    isSameDay(date1, date2) {
        if (!date1 || !date2) return false;
        return this.formatDate(date1) === this.formatDate(date2);
    }
    
    getDefaultActiveDay() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (this.state.workingDays.includes(today.getDay())) return today;
        
        const next = new Date(today);
        let daysChecked = 0;
        while (!this.state.workingDays.includes(next.getDay()) && daysChecked < 14) {
            next.setDate(next.getDate() + 1);
            daysChecked++;
        }
        return next;
    }

    async fetchWorkingDays(scheduleId) {
        if (!this.apiKey || !scheduleId) return [1, 2, 3, 4, 5];
        
        try {
            const res = await fetch(`https://api.cal.com/v2/schedules/${scheduleId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "cal-api-version": "2024-06-11",
                    "Content-Type": "application/json"
                }
            });
            
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            
            const data = await res.json();
            const availability = data.data?.availability || [];
            const dayNameToNumber = {
                "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3,
                "Thursday": 4, "Friday": 5, "Saturday": 6
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
    
    async fetchAvailableSlots(selectedDateISO) {
        if (!this.apiKey || !this.eventTypeId || !this.eventTypeSlug) return [];
        
        const start = new Date(selectedDateISO);
        start.setUTCHours(0, 0, 0, 0);
        const end = new Date(selectedDateISO);
        end.setUTCHours(23, 59, 59, 999);
        
        const url = `https://api.cal.com/v2/slots/available?startTime=${start.toISOString()}&endTime=${end.toISOString()}&eventTypeId=${this.eventTypeId}&eventTypeSlug=${this.eventTypeSlug}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "cal-api-version": "2024-08-13",
                    "Content-Type": "application/json"
                }
            });
            
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            
            const responseBody = await res.json();
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

    async createBooking(startTimeISO, fullName, email) {
        if (!this.apiKey || !this.eventTypeId) {
            throw new Error('Missing API key or event type ID');
        }
        
        try {
            const url = `https://api.cal.com/v2/bookings`;
            const body = {
                start: startTimeISO,
                attendee: { 
                    name: fullName, 
                    email: email, 
                    timeZone: this.timezone 
                },
                eventTypeId: Number(this.eventTypeId)
            };
            
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "cal-api-version": "2024-08-13",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const responseBody = await res.json();
            if (responseBody.status && responseBody.status !== "success") {
                throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
            }
            
            return responseBody;
        } catch (err) {
            console.error("Booking error:", err);
            return null;
        }
    }

    async rescheduleBooking(uid, startTimeISO, reason, rescheduledBy) {
        if (!this.apiKey || !uid) {
            throw new Error('Missing API key or booking UID');
        }
        
        try {
            const url = `https://api.cal.com/v2/bookings/${uid}/reschedule`;
            const body = {
                rescheduledBy: rescheduledBy,
                reschedulingReason: reason,
                start: startTimeISO
            };
            
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "cal-api-version": "2024-08-13",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const responseBody = await res.json();
            if (responseBody.status && responseBody.status !== "success") {
                throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
            }
            
            return responseBody;
        } catch (err) {
            console.error("Error rescheduling booking:", err);
            return null;
        }
    }
    
    getText(key) {
        const translations = {
            en: {
                selectDate: "Select a date to view available times",
                availableTimesFor: "Available times for",
                noAvailableSlots: "No available time slots for this date",
                pleaseSelectDate: "Please select a date first",
                weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                currentAppointment: "Current Appointment",
                newAppointment: "New Appointment"
            },
            fr: {
                selectDate: "Sélectionnez une date pour voir les horaires disponibles",
                availableTimesFor: "Disponibilités pour",
                noAvailableSlots: "Aucun horaire disponible pour cette date",
                pleaseSelectDate: "Veuillez d'abord sélectionner une date",
                weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                currentAppointment: "Rendez-vous Actuel",
                newAppointment: "Nouveau Rendez-vous"
            }
        };
        return translations[this.language]?.[key] || key;
    }

    // ENHANCED: Header generation with improved serviceProvider handling
    generateCalendarHeader() {
        const iconSvg = this.factory.SVG_ICONS.CALENDAR;
        
        // FORCE the correct serviceProvider - use multiple fallbacks to ensure it's never empty
        const displayProvider = this.serviceProvider || 
                               this.originalServiceProvider || 
                               this.fullConfig?.serviceProvider || 
                               'Service Provider';
        
        console.log('CalendarField: Generating header with serviceProvider:', displayProvider);
        
        if (this.mode === 'reschedule' && this.currentAppointment) {
            return `
                <div class="calendar-title-content">
                    <div class="service-provider">
                        <span class="provider-icon">${iconSvg}</span>
                        <div class="appointment-details">
                            <div class="provider-name">${displayProvider}</div>
                            ${this.serviceName ? `<div class="service-name">${this.serviceName}</div>` : ''}
                            <div class="service-name">${this.formatCurrentAppointment()}</div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Enhanced booking mode header
            return `
                <div class="service-provider">
                    <span class="provider-icon">${iconSvg}</span>
                    <div class="appointment-details">
                        <div class="provider-name">${displayProvider}</div>
                        ${this.serviceName ? `<div class="service-name">${this.serviceName}</div>` : ''}
                    </div>
                </div>
            `;
        }
    }

    formatCurrentAppointment() {
        if (!this.currentAppointment) return '';
        
        const date = new Date(this.currentAppointment);
        const formatOptions = { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        };
        
        let locale = this.language === 'fr' ? 'fr-FR' : 'en-US';
        const formatter = new Intl.DateTimeFormat(locale, formatOptions);
        return formatter.format(date);
    }
    
    render() {
        this.element = document.createElement('div');
        this.element.className = 'form-field calendar-field';
        this.element.innerHTML = `
            <div class="calendar-container ${this.state.isConfirmed ? 'confirmed' : ''}">
                <div class="calendar-header">
                    <div class="calendar-title">
                        ${this.generateCalendarHeader()}
                    </div>
                    <div class="calendar-nav">
                        <button class="nav-btn prev-btn" type="button" aria-label="Previous month">
                            ${this.factory.SVG_ICONS.CHEVRON}
                        </button>
                        <div class="current-date"></div>
                        <button class="nav-btn next-btn" type="button" aria-label="Next month">
                            ${this.factory.SVG_ICONS.CHEVRON}
                        </button>
                    </div>
                </div>
                <div class="calendar-body">
                    <div class="days-container">
                        <div class="weekdays"></div>
                        <div class="days"></div>
                    </div>
                    <div class="times-container">
                        <div class="time-header"></div>
                        <div class="time-slots"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Store reference to this field instance on the element for debugging
        this.element.fieldInstance = this;
        
        this.renderCalendarData();
        this.attachCalendarEvents();
        
        return this.element;
    }
    
    renderCalendarData() {
        if (!this.element) return;
        
        // Ensure serviceProvider is preserved
        this.preserveServiceProvider();
        
        const currentDateEl = this.element.querySelector('.current-date');
        if (currentDateEl) {
            const dateFormatter = new Intl.DateTimeFormat(this.language === "fr" ? "fr-CA" : "en-US", { month: "long", year: "numeric" });
            currentDateEl.textContent = dateFormatter.format(this.state.currentDate);
        }
        
        const weekdaysEl = this.element.querySelector('.weekdays');
        if (weekdaysEl) {
            weekdaysEl.innerHTML = '';
            const weekdays = this.getText('weekdays');
            weekdays.forEach(day => {
                const dayEl = document.createElement("div");
                dayEl.textContent = day;
                weekdaysEl.appendChild(dayEl);
            });
        }
        
        this.renderDays();
        this.renderTimeSlots();
    }
    
    renderDays() {
        const daysEl = this.element.querySelector('.days');
        if (!daysEl) return;
        
        daysEl.innerHTML = '';
        let daysToShow = [];
        const firstDay = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), 1);
        const daysFromPrevMonth = firstDay.getDay();
        const lastDay = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, 0);
        const totalDays = lastDay.getDate();
        
        for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
            const day = new Date(firstDay);
            day.setDate(day.getDate() - i - 1);
            daysToShow.push({ date: day, inactive: true });
        }
        
        for (let i = 1; i <= totalDays; i++) {
            const day = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), i);
            daysToShow.push({ date: day, inactive: false });
        }
        
        const remainingDays = 42 - daysToShow.length;
        for (let i = 1; i <= remainingDays; i++) {
            const day = new Date(lastDay);
            day.setDate(day.getDate() + i);
            daysToShow.push({ date: day, inactive: true });
        }
        
        const highlightDay = this.state.selectedDate || this.getDefaultActiveDay();
        
        daysToShow.forEach(({ date, inactive }) => {
            const dayEl = document.createElement("div");
            dayEl.className = "day";
            dayEl.textContent = date.getDate();
            
            if (inactive) {
                dayEl.classList.add("inactive");
            } else {
                const dayOfWeek = date.getDay();
                if (!this.state.workingDays.includes(dayOfWeek)) {
                    dayEl.classList.add("inactive");
                } else {
                    const todayMidnight = new Date();
                    todayMidnight.setHours(0, 0, 0, 0);
                    if (date < todayMidnight) {
                        dayEl.classList.add("inactive");
                    } else {
                        if (this.formatDate(date) === this.formatDate(highlightDay)) {
                            dayEl.classList.add("today");
                        }
                        if (this.state.selectedDate && this.isSameDay(date, this.state.selectedDate)) {
                            dayEl.classList.add("active");
                        }
                        dayEl.classList.add("available");
                        dayEl.addEventListener("click", async () => {
                            this.state.selectedDate = new Date(date);
                            this.state.selectedTime = null;
                            const dateKey = this.formatDate(date);
                            const slots = await this.fetchAvailableSlots(dateKey);
                            this.state.availableSlots[dateKey] = slots;
                            this.renderCalendarData();
                            this.updateValue();
                        });
                    }
                }
            }
            daysEl.appendChild(dayEl);
        });
    }
    
    renderTimeSlots() {
        const timeHeaderEl = this.element.querySelector('.time-header');
        const timeSlotsEl = this.element.querySelector('.time-slots');
        
        if (!timeHeaderEl || !timeSlotsEl) return;
        
        if (this.state.selectedDate) {
            const dateFormatter = new Intl.DateTimeFormat(this.language === "fr" ? "fr-CA" : "en-US", { 
                weekday: "long", month: "long", day: "numeric" 
            });
            timeHeaderEl.textContent = `${this.getText('availableTimesFor')} ${dateFormatter.format(this.state.selectedDate)}`;
            
            const dateKey = this.formatDate(this.state.selectedDate);
            const timeSlots = this.state.availableSlots[dateKey] || [];
            
            if (timeSlots.length === 0) {
                timeSlotsEl.innerHTML = `<div class="no-slots-message">${this.getText('noAvailableSlots')}</div>`;
            } else {
                const columnsContainer = document.createElement("div");
                columnsContainer.className = "time-slots-columns";
                
                const amColumn = document.createElement("div");
                amColumn.className = "time-slots-column";
                const pmColumn = document.createElement("div");
                pmColumn.className = "time-slots-column";
                
                const amHeader = document.createElement("div");
                amHeader.className = "time-column-header";
                amHeader.textContent = "AM";
                amColumn.appendChild(amHeader);
                
                const pmHeader = document.createElement("div");
                pmHeader.className = "time-column-header";
                pmHeader.textContent = "PM";
                pmColumn.appendChild(pmHeader);
                
                timeSlots.forEach((timeISO) => {
                    const dateTime = new Date(timeISO);
                    const hours = dateTime.getHours();
                    const timeSlot = document.createElement("div");
                    timeSlot.className = "time-slot available";
                    
                    if (this.state.selectedTime === timeISO) {
                        timeSlot.classList.add("selected");
                    }
                    
                    const timeFormatter = new Intl.DateTimeFormat(this.language === "fr" ? "fr-CA" : "en-US", { 
                        hour: "numeric", minute: "2-digit", hour12: true 
                    });
                    timeSlot.textContent = timeFormatter.format(dateTime);
                    
                    timeSlot.addEventListener("click", () => {
                        if (!this.state.isConfirmed) {
                            this.state.selectedTime = timeISO;
                            this.renderTimeSlots();
                            this.updateValue();
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
                timeSlotsEl.innerHTML = '';
                timeSlotsEl.appendChild(columnsContainer);
            }
        } else {
            timeHeaderEl.innerHTML = `<span class="pulse-text">${this.getText('selectDate')}</span>`;
            timeSlotsEl.innerHTML = `<div class="no-slots-message">${this.getText('pleaseSelectDate')}</div>`;
        }
    }
    
    attachCalendarEvents() {
        if (!this.element) return;
        
        const prevBtn = this.element.querySelector('.prev-btn');
        const nextBtn = this.element.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                if (!this.state.isConfirmed) {
                    this.state.currentDate = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() - 1, 1);
                    this.renderCalendarData();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                if (!this.state.isConfirmed) {
                    this.state.currentDate = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, 1);
                    this.renderCalendarData();
                }
            });
        }
    }
    
    updateValue() {
        const value = {
            selectedDate: this.state.selectedDate,
            selectedTime: this.state.selectedTime,
            formattedDate: this.state.selectedDate ? this.formatDate(this.state.selectedDate) : null,
            formattedTime: this.state.selectedTime ? new Intl.DateTimeFormat(this.language === "fr" ? "fr-CA" : "en-US", { 
                hour: "numeric", minute: "2-digit", hour12: true 
            }).format(new Date(this.state.selectedTime)) : null
        };
        
        this.handleChange();
    }
    
    getValue() {
        return {
            selectedDate: this.state.selectedDate,
            selectedTime: this.state.selectedTime,
            formattedDate: this.state.selectedDate ? this.formatDate(this.state.selectedDate) : null,
            formattedTime: this.state.selectedTime ? new Intl.DateTimeFormat(this.language === "fr" ? "fr-CA" : "en-US", { 
                hour: "numeric", minute: "2-digit", hour12: true 
            }).format(new Date(this.state.selectedTime)) : null
        };
    }
    
    setValue(value) {
        if (value && typeof value === 'object') {
            if (value.selectedDate) this.state.selectedDate = new Date(value.selectedDate);
            if (value.selectedTime) this.state.selectedTime = value.selectedTime;
            if (this.element) this.renderCalendarData();
        }
    }
    
    reset() {
        this.state.selectedDate = null;
        this.state.selectedTime = null;
        this.state.availableSlots = {};
        if (this.element) this.renderCalendarData();
    }
    
    destroy() {
        super.destroy();
        // Calendar specific cleanup if needed
    }
}



/**
 * CreatForm - Main form creation and management class
 */
/**
 * CreatForm - Main form creation and management class
 */


/**
 * CreatForm - Main form creation and management class
 */
class CreatForm {
    constructor(config = {}, formData = {}, formConfig = {}, defaultConfig = {}) {
        this.config = {
            language: config.language || "fr",
            webhookUrl: config.webhookUrl || defaultConfig.DEFAULT_WEBHOOK,
            voiceflowEnabled: config.voiceflowEnabled || false,
            cssUrls: config.cssUrls || defaultConfig.DEFAULT_CSS,
            enableSessionTimeout: config.enableSessionTimeout !== false,
            sessionTimeout: config.sessionTimeout || defaultConfig.SESSION_TIMEOUT,
            sessionWarning: config.sessionWarning || defaultConfig.SESSION_WARNING,
            debounceDelay: config.debounceDelay || defaultConfig.DEBOUNCE_DELAY,
            // Booking-specific configuration
            formType: config.formType || "submission", // "submission" or "booking"
            apiKey: config.apiKey || "",
            timezone: config.timezone || "America/Toronto"
        };
        
        // Store the passed data
        this.formData = formData;
        this.formConfig = formConfig;
        this.defaultConfig = defaultConfig;
        
        this.state = { cssLoaded: false, initialized: false, formSubmitted: false, sessionExpired: false, currentStep: 0 };
        this.elements = new Map();
        this.formValues = {};
        this.sessionTimer = null;
        this.warningTimer = null;
        this.cssCache = new Map();

        // Determine if this is a booking form
        this.isBookingForm = this.config.formType === "booking";
    }

    // Utility methods
    getText(path) {
        return this.getNestedValue(this.formData.translations[this.config.language], path) || path;
    }

    getData(path) {
        const data = this.getNestedValue(this.formData.options, path) || [];
        return Array.isArray(data) ? data.map(item => ({
            ...item,
            name: typeof item.name === 'object' ? item.name[this.config.language] || item.name.en : item.name
        })) : data;
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((curr, key) => curr?.[key], obj);
    }

    getErrorMessage(fieldId, errorType = 'required') {
        return this.getText(`errors.${fieldId}${errorType !== 'required' ? '_' + errorType : ''}`) || 
               this.getText(`errors.${errorType}`) || 
               this.getText('common.fieldRequired');
    }

    // Enhanced extractValue method with generalized option handling
    extractValue(value) {
        if (value == null || value === undefined) return '';
        
        // Handle numbers
        if (typeof value === 'number' && !isNaN(value)) return value;
        
        // Handle boolean values - BUT skip if it's already a display string
        if (typeof value === 'boolean') {
            return value ? this.getText('common.yes') : this.getText('common.no');
        }
        
        // Handle string values that might already be translated
        if (typeof value === 'string') {
            // Check if it's already a translated yes/no value to prevent double translation
            const yesText = this.getText('common.yes');
            const noText = this.getText('common.no');
            if (value === yesText || value === noText) {
                return value; // Already translated, return as-is
            }
            // For other strings, return as-is
            return value;
        }
        
        // Handle arrays (multi-select)
        if (Array.isArray(value)) {
            return value.map(item => this.extractValue(item)).filter(Boolean).join(', ');
        }
        
        // Handle objects
        if (typeof value === 'object' && value !== null) {
            // Handle complex objects from YesNoWithOptionsField
            if (value.main !== undefined) {
                let result = [];
                
                // Add main value 
                const mainDisplay = value.main === true ? this.getText('common.yes') :
                                   value.main === false ? this.getText('common.no') :
                                   value.main; // Just use the value as-is for custom options
                result.push(mainDisplay);
                
                // Add yesValues if present
                if (value.yesValues && Object.keys(value.yesValues).length > 0) {
                    Object.values(value.yesValues).forEach(subValue => {
                        const extracted = this.extractValue(subValue);
                        if (extracted && extracted !== '') {
                            result.push(extracted);
                        }
                    });
                }
                
                // Add noValues if present
                if (value.noValues && Object.keys(value.noValues).length > 0) {
                    Object.values(value.noValues).forEach(subValue => {
                        const extracted = this.extractValue(subValue);
                        if (extracted && extracted !== '') {
                            result.push(extracted);
                        }
                    });
                }
                
                return result.filter(Boolean).join(', ');
            }
            
            // Check for selectedValue first (conditional fields)
            if (value.selectedValue !== undefined) {
                return this.extractValue(value.selectedValue);
            }
            
            // Check for value property
            if (value.value !== undefined) {
                return this.extractValue(value.value);
            }
            
            // Check for name property (option objects)
            if (value.name !== undefined) {
                return typeof value.name === 'object' ? 
                       (value.name[this.config.language] || value.name.en || value.name) :
                       value.name;
            }
            
            // Check for id property
            if (value.id !== undefined) {
                return value.id;
            }
            
            // Default fallback - return empty string instead of [object Object]
            return '';
        }
        
        // Handle primitive values
        return String(value);
    }

    // Enhanced formatValueForDisplay method
    formatValueForDisplay(fieldId, value, fieldConfig = null) {
        const extractedValue = this.extractValue(value);
        
        if (!extractedValue || extractedValue === '') {
            return this.getText('common.notSpecified') || 'Non spécifié';
        }
        
        return extractedValue;
    }
    
    // Enhanced summary generation with generalized handling
    generateSummaryData() {
        const summaryData = {};
        
        this.formConfig.steps.forEach((stepConfig, stepIndex) => {
            if (stepIndex === this.formConfig.steps.length - 1) return; // Skip summary step itself
            
            const stepData = {};
            
            const processField = (fieldConfig, parentValue = null) => {
                const fieldValue = this.formValues[fieldConfig.id];
                
                if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
                    stepData[fieldConfig.id] = {
                        label: this.getText(`fields.${fieldConfig.id}`),
                        value: this.formatValueForDisplay(fieldConfig.id, fieldValue, fieldConfig),
                        rawValue: fieldValue
                    };
                    
                    // Handle conditional fields for yesno-with-options
                    if (fieldConfig.type === 'yesno-with-options') {
                        // Determine which option was selected based on custom options or default
                        let isFirstOption = false;
                        let isSecondOption = false;
                        
                        if (fieldConfig.customOptions && Array.isArray(fieldConfig.customOptions)) {
                            isFirstOption = fieldValue === fieldConfig.customOptions[0].value;
                            isSecondOption = fieldValue === fieldConfig.customOptions[1].value;
                        } else {
                            // Default yes/no behavior
                            isFirstOption = fieldValue === true || fieldValue === 'yes';
                            isSecondOption = fieldValue === false || fieldValue === 'no';
                        }
                        
                        if (isFirstOption) {
                            // Handle yesFields (array)
                            if (fieldConfig.yesFields) {
                                fieldConfig.yesFields.forEach(subField => {
                                    processField(subField, true);
                                });
                            }
                            // Handle yesField (single)
                            if (fieldConfig.yesField) {
                                processField(fieldConfig.yesField, true);
                            }
                        } else if (isSecondOption) {
                            // Handle noField
                            if (fieldConfig.noField) {
                                processField(fieldConfig.noField, false);
                            }
                        }
                    }
                }
            };
            
            stepConfig.fields.forEach(fieldConfig => {
                processField(fieldConfig);
            });
            
            if (Object.keys(stepData).length > 0) {
                summaryData[`step_${stepIndex}`] = {
                    title: this.getText(`steps.${stepIndex}.title`),
                    data: stepData
                };
            }
        });
        
        return summaryData;
    }

    // CSS Management
    async loadCSS() {
        if (this.state.cssLoaded) return;
        try {
            const cssPromises = this.config.cssUrls.map(url => this.fetchCSS(url));
            const cssTexts = await Promise.allSettled(cssPromises);
            const validCSS = cssTexts
                .filter(result => result.status === 'fulfilled' && result.value)
                .map(result => result.value).join('\n');
            
            if (validCSS.trim()) this.injectCSS(validCSS);
            this.state.cssLoaded = true;
        } catch (error) {
            console.warn('Failed to load CSS:', error);
        }
    }

    async fetchCSS(url) {
        if (this.cssCache.has(url)) return this.cssCache.get(url);
        try {
            const response = await fetch(url);
            const css = response.ok ? await response.text() : '';
            this.cssCache.set(url, css);
            return css;
        } catch (error) {
            console.warn(`Failed to fetch CSS from ${url}:`, error);
            return '';
        }
    }

    injectCSS(css) {
        const styleClass = this.isBookingForm ? 'booking-form-styles' : 'submission-form-styles';
        document.querySelector(`.${styleClass}`)?.remove();
        const styleElement = document.createElement('style');
        styleElement.className = styleClass;
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
    }

    // Form Creation - Configuration-driven approach
    createFormSteps() {
        return this.formConfig.steps.map((stepConfig, index) => {
            // Special handling for summary step - use custom type like working code
            if (stepConfig.fields.length === 1 && 
                (stepConfig.fields[0].type === 'summary' || stepConfig.fields[0].autoGenerate || stepConfig.fields[0].type === 'custom')) {
                return {
                    title: this.getText(`steps.${index}.title`),
                    description: this.getText(`steps.${index}.desc`),
                    fields: [{
                        type: 'custom',
                        id: 'summary',
                        name: 'summary',
                        autoSummary: true,
                        getSummaryData: () => this.generateSummaryData(),
                        label: ''
                    }]
                };
            }
            
            return {
                title: this.getText(`steps.${index}.title`),
                description: this.getText(`steps.${index}.desc`),
                fields: this.createFields(stepConfig.fields)
            };
        });
    }

    createFields(fieldsConfig) {
        return fieldsConfig.map(fieldConfig => {
            const field = {
                ...fieldConfig,
                name: fieldConfig.id,
                label: this.getText(`fields.${fieldConfig.id}`),
                placeholder: fieldConfig.placeholder || this.getText(`fields.${fieldConfig.id}`) + '...',
                customErrorMessage: this.getErrorMessage(fieldConfig.id)
            };

            // Handle options
            if (fieldConfig.options) {
                if (typeof fieldConfig.options === 'string') {
                    field.options = this.getData(fieldConfig.options);
                    // For serviceCard, pass as services
                    if (fieldConfig.type === 'serviceCard') {
                        field.services = this.getData(fieldConfig.options);
                    }
                } else {
                    field.options = fieldConfig.options.map(opt => ({
                        ...opt,
                        name: typeof opt.name === 'object' ? opt.name[this.config.language] : opt.name
                    }));
                }
            }

            // Handle custom options for yes/no fields
            if (fieldConfig.customOptions) {
                field.customOptions = fieldConfig.customOptions.map(opt => ({
                    ...opt,
                    label: typeof opt.label === 'object' ? opt.label[this.config.language] || opt.label.en : opt.label
                }));
            }

            // Handle nested fields
            if (fieldConfig.yesFields) field.yesFields = this.createFields(fieldConfig.yesFields);
            if (fieldConfig.yesField) field.yesField = this.createFields([fieldConfig.yesField])[0];
            if (fieldConfig.noField) field.noField = this.createFields([fieldConfig.noField])[0];

            // Handle booking-specific calendar field configuration
            if (fieldConfig.type === 'calendar' && this.isBookingForm) {
                field.apiKey = this.config.apiKey;
                field.timezone = this.config.timezone;
                field.language = this.config.language;
                // These will be updated when service is selected
                field.eventTypeId = null;
                field.eventTypeSlug = null;
                field.scheduleId = null;
                field.eventName = "Appointment";
                field.serviceProvider = "";
            }

            return field;
        });
    }

    // ============================================================================
    // BOOKING-SPECIFIC METHODS
    // ============================================================================

    // Method to update calendar configuration when service is selected (booking forms only)
    updateCalendarConfiguration(selectedService) {
        if (!this.isBookingForm || !selectedService || !this.multiStepForm) return;
        
        console.log('Updating calendar configuration with service:', selectedService);
        
        // Find the calendar field instance
        const calendarField = this.getCalendarFieldInstance();
        
        if (calendarField) {
            console.log('Found calendar field, updating configuration...');
            
            // Update calendar configuration
            calendarField.apiKey = this.config.apiKey;
            calendarField.timezone = this.config.timezone;
            calendarField.eventTypeId = selectedService.eventTypeId;
            calendarField.eventTypeSlug = selectedService.eventTypeSlug;
            calendarField.scheduleId = selectedService.scheduleId;
            calendarField.eventName = selectedService.eventName || selectedService.title;
            calendarField.serviceProvider = selectedService.provider || "SkaLean";
            calendarField.serviceName = selectedService.title;
            calendarField.mode = 'booking';
            
            // Reset calendar state
            calendarField.state.selectedDate = null;
            calendarField.state.selectedTime = null;
            calendarField.state.availableSlots = {};
            
            // Update the header immediately
            if (calendarField.updateCalendarHeader) {
                calendarField.updateCalendarHeader();
            }
            
            // Reinitialize calendar with new configuration
            calendarField.init().then(() => {
                if (calendarField.element) {
                    calendarField.renderCalendarData();
                }
                console.log('Calendar reinitialized with new service configuration');
            }).catch(error => {
                console.error('Error reinitializing calendar:', error);
            });
        } else {
            console.log('Calendar field not found, will be configured when calendar step is reached');
        }
    }

    // Method to get calendar field instance (booking forms only)
    getCalendarFieldInstance() {
        if (!this.isBookingForm || !this.multiStepForm) return null;
        
        // Find calendar field in any step
        for (let stepIndex = 0; stepIndex < this.multiStepForm.stepInstances.length; stepIndex++) {
            const stepInstance = this.multiStepForm.stepInstances[stepIndex];
            if (stepInstance && stepInstance.fieldInstances) {
                const calendarField = stepInstance.fieldInstances.find(field => 
                    field.constructor.name === 'CalendarField'
                );
                if (calendarField) return calendarField;
            }
        }
        return null;
    }

    // Booking-specific data preparation
    prepareBookingDataForSubmission(formValues, bookingResponse) {
        const appointment = formValues.appointment || {};
        const formattedDate = appointment.selectedDate ? 
            new Intl.DateTimeFormat(this.config.language === "fr" ? "fr-CA" : "en-US", { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
            }).format(new Date(appointment.selectedDate)) : '';
        
        const formattedTime = appointment.selectedTime ? 
            new Intl.DateTimeFormat(this.config.language === "fr" ? "fr-CA" : "en-US", { 
                hour: 'numeric', minute: '2-digit', hour12: true 
            }).format(new Date(appointment.selectedTime)) : '';

        return {
            firstName: formValues.firstName || '',
            lastName: formValues.lastName || '',
            fullName: `${formValues.firstName || ''} ${formValues.lastName || ''}`.trim(),
            email: formValues.email || '',
            
            service: formValues.serviceSelection?.eventName || '',
            serviceTitle: formValues.serviceSelection?.title || '',
            serviceDuration: formValues.serviceSelection?.duration || '',
            
            appointmentDate: appointment.formattedDate || '',
            appointmentTime: appointment.formattedTime || '',
            appointmentDateTime: appointment.selectedTime || '',
            formattedDate,
            formattedTime,
            formattedDateTime: `${formattedDate} ${this.config.language === "fr" ? "à" : "at"} ${formattedTime}`,
            
            bookingId: bookingResponse?.data?.id || null,
            bookingUid: bookingResponse?.data?.uid || null,
            
            formLanguage: this.config.language,
            submissionTimestamp: new Date().toISOString(),
            formVersion: this.defaultConfig.FORM_VERSION,
            userAgent: navigator.userAgent,
            formType: "booking_form",
            timezone: this.config.timezone
        };
    }

    // ============================================================================
    // EVENT HANDLERS
    // ============================================================================

    handleFieldChange = (name, value) => {
        // Store the raw value - let extractValue handle formatting when needed
        this.formValues[name] = value;
        console.log(`Field ${name} changed:`, { value, extracted: this.extractValue(value) });
        
        // Handle service selection for booking forms
        if (this.isBookingForm && name === 'serviceSelection' && value) {
            console.log('Service selected:', value);
            this.updateCalendarConfiguration(value);
        }
    };

    handleSubmission = async (formData) => {
        const submitButton = document.querySelector('.btn-submit');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = this.getText('nav.processing');
        }

        try {
            let submissionData;
            
            if (this.isBookingForm) {
                // Booking form submission
                const calendarField = this.getCalendarFieldInstance();
                if (!calendarField) {
                    throw new Error('Calendar field not found');
                }

                // Create booking using calendar field
                const bookingResponse = await calendarField.createBooking(
                    formData.appointment.selectedTime,
                    `${formData.firstName} ${formData.lastName}`,
                    formData.email
                );

                if (!bookingResponse) {
                    throw new Error('Booking creation failed');
                }

                submissionData = this.prepareBookingDataForSubmission(formData, bookingResponse);
            } else {
                // Regular submission form
                submissionData = this.prepareDataForSubmission(formData);
                
                const response = await fetch(this.config.webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(submissionData)
                });

                if (!response.ok) throw new Error('Network response was not ok');
            }
            
            this.clearSessionTimers();
            this.state.formSubmitted = true;
            this.showSuccessScreen();
            
            if (this.config.voiceflowEnabled && window.voiceflow) {
                window.voiceflow.chat.interact({ type: "success", payload: submissionData });
            }

            return submissionData;
        } catch (error) {
            console.error('Submission error:', error);
            if (submitButton) {
                const errorMessage = this.isBookingForm ? 
                    (this.getText('errors.bookingError') || 'Erreur lors de la réservation. Veuillez réessayer.') :
                    'Erreur lors de la soumission. Veuillez réessayer.';
                submitButton.textContent = errorMessage;
                submitButton.disabled = false;
            }
            throw error;
        }
    };

    prepareDataForSubmission(formValues) {
        // Process all form values for submission using the working code approach
        const processedData = {};
        
        Object.keys(formValues).forEach(key => {
            const value = formValues[key];
            processedData[key] = this.extractValue(value);
        });
        
        return {
            ...processedData,
            formLanguage: this.config.language,
            submissionTimestamp: new Date().toISOString(),
            formVersion: this.defaultConfig.FORM_VERSION,
            userAgent: navigator.userAgent,
            summaryData: this.generateSummaryData()
        };
    }

    // Session Management
    setupSessionManagement() {
        if (!this.config.enableSessionTimeout) {
            console.log('Session timeout disabled');
            return;
        }
        
        console.log('Setting up session management:', {
            warningTime: this.config.sessionWarning,
            timeoutTime: this.config.sessionTimeout
        });
        
        this.warningTimer = setTimeout(() => this.showSessionWarning(), this.config.sessionWarning);
        this.sessionTimer = setTimeout(() => this.disableFormOnTimeout(), this.config.sessionTimeout);
    }

    showSessionWarning() {
        if (this.state.formSubmitted || this.state.sessionExpired) return;
        const warningDiv = document.createElement('div');
        warningDiv.className = 'session-warning';
        warningDiv.innerHTML = `<div style="display: flex; align-items: center; margin-bottom: 10px;"><span style="font-size: 20px; margin-right: 10px;">⚠️</span><strong>Session Warning</strong></div><p style="margin: 0; font-size: 14px;">Your session will expire in 2 minutes.</p>`;
        document.body.appendChild(warningDiv);
        setTimeout(() => warningDiv.remove(), 30000);
    }

    disableFormOnTimeout() {
        if (this.state.formSubmitted || this.state.sessionExpired) return;
        this.state.sessionExpired = true;
        
        if (this.multiStepForm?.container) {
            this.multiStepForm.container.querySelectorAll('input, select, button, textarea, [contenteditable]')
                .forEach(el => {
                    el.disabled = true;
                    el.style.opacity = '0.5';
                    el.style.pointerEvents = 'none';
                });
            this.showTimeoutOverlay();
        }
    }

    clearSessionTimers() {
        console.log('Clearing session timers');
        if (this.sessionTimer) {
            clearTimeout(this.sessionTimer);
            this.sessionTimer = null;
        }
        if (this.warningTimer) {
            clearTimeout(this.warningTimer);
            this.warningTimer = null;
        }
        document.querySelector('.session-warning')?.remove();
    }

    // UI States
    showSuccessScreen() {
        if (this.multiStepForm?.container) this.multiStepForm.container.style.display = 'none';
        
        const successScreen = document.createElement('div');
        successScreen.className = 'success-state';
        successScreen.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 20px;">✅</div>
            <h2>${this.getText('success.title')}</h2>
            <p style="margin: 20px 0;">${this.getText('success.message')}</p>
            <button type="button" class="btn btn-next" onclick="location.reload()">
                ${this.isBookingForm ? 'Retour au formulaire' : 'Retour au formulaire'}
            </button>
        `;
        this.container.appendChild(successScreen);
    }

    showTimeoutOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'timeout-overlay';
        overlay.innerHTML = `
            <div style="background: white; padding: 40px; border-radius: 12px; text-align: center; max-width: 400px; margin: 20px;">
                <div style="color: #e95d2c; font-size: 48px; margin-bottom: 20px;">⏰</div>
                <h3 style="color: #333; margin: 0 0 15px 0;">Session Expired</h3>
                <p style="color: #666; margin: 0;">Your session has expired after ${this.config.sessionTimeout / 60000} minutes of inactivity. The form is no longer available.</p>
            </div>
        `;
        this.container.appendChild(overlay);
    }

    // Main Render Method
    async render(element) {
        try {
            await this.loadCSS();
            
            this.container = document.createElement('div');
            this.container.className = this.isBookingForm ? 'booking-form-extension' : 'submission-form-extension';
            this.container.id = this.isBookingForm ? 'booking-form-root' : 'submission-form-root';

            // Enhanced FormFieldFactory configuration with edit button text
            this.factory = new FormFieldFactory({
                container: this.container,
                formValues: this.formValues,
                onChange: this.handleFieldChange,
                texts: {
                    next: this.getText('nav.next'),
                    previous: this.getText('nav.previous'),
                    submit: this.getText('nav.submit'),
                    required: this.getText('common.required'),
                    fieldRequired: this.getText('common.fieldRequired'),
                    yes: this.getText('common.yes'),
                    no: this.getText('common.no'),
                    other: this.getText('common.other'),
                    selectAtLeastOne: this.getText('errors.selectAtLeastOne'),
                    edit: this.getText('summary.editStep') || this.getText('common.edit'),
                    language: this.config.language
                }
            });

            const formConfig = {
                showProgress: true,
                saveProgress: false,
                validateOnNext: true,
                steps: this.createFormSteps(),
                onSubmit: this.handleSubmission,
                onStepChange: (stepIndex, stepInstance) => { 
                    this.state.currentStep = stepIndex;
                    console.log(`Step changed to ${stepIndex + 1}`);
                    
                    // Booking-specific: When reaching calendar step, ensure service configuration is applied
                    if (this.isBookingForm && this.formValues.serviceSelection) {
                        // Find calendar step (could be step 2 for booking forms)
                        const calendarStepIndex = this.formConfig.steps.findIndex(step => 
                            step.fields.some(field => field.type === 'calendar')
                        );
                        
                        if (stepIndex === calendarStepIndex) {
                            console.log('Reached calendar step, applying service configuration...');
                            setTimeout(() => {
                                this.updateCalendarConfiguration(this.formValues.serviceSelection);
                            }, 100);
                        }
                    }
                    
                    // Update custom fields with autoSummary when entering summary step
                    if (stepInstance && stepInstance.fieldInstances) {
                        stepInstance.fieldInstances.forEach(fieldInstance => {
                            if (fieldInstance.autoSummary && fieldInstance.updateContent) {
                                setTimeout(() => {
                                    fieldInstance.updateContent();
                                }, 100);
                            }
                        });
                    }
                }
            };

            this.multiStepForm = this.factory.createMultiStepForm(formConfig);
            element.appendChild(this.container);
            this.setupSessionManagement();
            this.state.initialized = true;

            return this.createPublicAPI();
        } catch (error) {
            console.error('Failed to render form:', error);
            const errorMessage = this.isBookingForm ? 'Failed to load booking form' : 'Failed to load submission form';
            element.innerHTML = `<div class="error-state">${errorMessage}</div>`;
            return { destroy: () => {} };
        }
    }

    createPublicAPI() {
        return {
            destroy: () => this.destroy(),
            getCurrentStep: () => this.state.currentStep,
            getFormData: () => this.multiStepForm?.getFormData() || {},
            getSummaryData: () => this.generateSummaryData(),
            isInitialized: () => this.state.initialized,
            isSubmitted: () => this.state.formSubmitted,
            isBookingForm: () => this.isBookingForm,
            reset: () => this.reset(),
            // Booking-specific API methods
            getCalendarField: () => this.isBookingForm ? this.getCalendarFieldInstance() : null,
            updateCalendar: (serviceData) => this.isBookingForm ? this.updateCalendarConfiguration(serviceData) : null
        };
    }

    reset() {
        this.clearSessionTimers();
        this.state = { ...this.state, initialized: false, formSubmitted: false, sessionExpired: false, currentStep: 0 };
        this.multiStepForm?.reset();
        this.setupSessionManagement();
    }

    destroy() {
        this.clearSessionTimers();
        this.factory?.destroy();
        this.multiStepForm?.clearSavedProgress();
        this.elements.clear();
        this.container?.remove();
        const styleClass = this.isBookingForm ? 'booking-form-styles' : 'submission-form-styles';
        document.querySelector(`.${styleClass}`)?.remove();
    }
}


class CurrentAppointmentCardField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Store config for later use
        this.config = config;
        
        // Validate required configuration
        if (!config.translations) {
            console.error('CurrentAppointmentCardField: translations are required in config');
        }
        if (!config.serviceMapping) {
            console.error('CurrentAppointmentCardField: serviceMapping is required in config');
        }
        
        // Current appointment specific config
        this.meetingName = config.meetingName || config.serviceProvider || "Provider";
        this.startTime = config.startTime || config.currentAppointment || new Date().toISOString();
        this.serviceName = config.serviceName || config.eventName || this.getServiceNameFromSlug(config.eventTypeSlug, this.meetingName);
        this.language = config.language || 'en';
        this.showServiceName = config.showServiceName !== false;
        this.showDateTime = config.showDateTime !== false;
        this.showProvider = config.showProvider !== false;
        this.iconType = config.iconType || 'calendar'; // 'calendar', 'appointment', 'reschedule'
        this.cardStyle = config.cardStyle || 'default'; // 'default', 'compact', 'detailed'
        
        // Translations and service mapping - MUST be provided from extension
        this.translations = config.translations || {};
        this.serviceMapping = config.serviceMapping || {};
    }

    getText(key) {
        return this.translations[this.language]?.[key] || key;
    }

    getServiceNameFromSlug(eventTypeSlug, fallback) {
        if (!eventTypeSlug) {
            return fallback || 'Appointment';
        }
        
        // Check if service mapping is provided
        const serviceName = this.serviceMapping[eventTypeSlug];
        if (serviceName) {
            return serviceName;
        }
        
        // Fallback: convert eventTypeSlug to readable format
        return eventTypeSlug
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }

    formatAppointmentDate(dateTimeString) {
        try {
            const date = new Date(dateTimeString);
            const formatOptions = { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            };
            
            const locale = this.language === 'fr' ? 'fr-FR' : 'en-US';
            const formatter = new Intl.DateTimeFormat(locale, formatOptions);
            return formatter.format(date);
        } catch (error) {
            console.warn('Error formatting date:', error);
            return dateTimeString;
        }
    }

    getIcon() {
        const iconKey = this.iconType.toUpperCase();
        
        // Get icon from factory - factory is responsible for all icons
        if (this.factory.SVG_ICONS[iconKey]) {
            return this.factory.SVG_ICONS[iconKey];
        }
        
        // Fallback to CALENDAR if specific icon not found
        return this.factory.SVG_ICONS.CALENDAR || '';
    }

    validate() {
        // Current appointment card is typically read-only, so it's always valid
        // But we can validate that required appointment data is present
        if (this.required) {
            const hasRequiredData = this.meetingName && this.startTime;
            if (!hasRequiredData) {
                this.showError("Appointment information is required");
                return false;
            }
        }
        
        this.hideError();
        return true;
    }
    
    render() {
        this.element = document.createElement('div');
        this.element.className = `form-field current-appointment-card-field card-style-${this.cardStyle}`;
        this.element.id = this.id;
        
        const appointmentDate = this.formatAppointmentDate(this.startTime);
        
        let cardContent = '';
        
        if (this.cardStyle === 'compact') {
            cardContent = this.renderCompactCard(appointmentDate);
        } else if (this.cardStyle === 'detailed') {
            cardContent = this.renderDetailedCard(appointmentDate);
        } else {
            cardContent = this.renderDefaultCard(appointmentDate);
        }
        
        this.element.innerHTML = cardContent;
        
        // Add error container if required
        if (this.required) {
            const errorContainer = document.createElement('div');
            errorContainer.className = 'error-container';
            errorContainer.innerHTML = `
                <div class="error-message" id="${this.id}-error">
                    <div class="error-icon">!</div>
                    <span class="error-text">Appointment information is required</span>
                </div>
            `;
            this.element.appendChild(errorContainer);
        }
        
        return this.element;
    }
    
    renderDefaultCard(appointmentDate) {
        return `
            <div class="current-appointment-card">
                <div class="appointment-header">
                    <div class="appointment-icon">
                        ${this.getIcon()}
                    </div>
                    <div class="appointment-info">
                        <div class="appointment-info-title">${this.getText('currentAppointment')}</div>
                        ${this.showProvider ? `<p><strong>${this.getText('scheduledWith')}:</strong> ${this.meetingName}</p>` : ''}
                        ${this.showServiceName && this.serviceName ? `<p><strong>${this.getText('serviceName')}:</strong> ${this.serviceName}</p>` : ''}
                        ${this.showDateTime ? `<p><strong>${this.getText('currentDateTime')}:</strong> ${appointmentDate}</p>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    renderCompactCard(appointmentDate) {
        return `
            <div class="current-appointment-card compact">
                <div class="appointment-header-compact">
                    <div class="appointment-icon-small">
                        ${this.getIcon()}
                    </div>
                    <div class="appointment-summary">
                        <div class="appointment-title-compact">${this.meetingName}</div>
                        <div class="appointment-date-compact">${appointmentDate}</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderDetailedCard(appointmentDate) {
        return `
            <div class="current-appointment-card detailed">
                <div class="appointment-header-detailed">
                    <div class="appointment-icon-large">
                        ${this.getIcon()}
                    </div>
                    <div class="appointment-details-full">
                        <div class="appointment-title-large">${this.getText('currentAppointment')}</div>
                        <div class="appointment-meta">
                            ${this.showProvider ? `<div class="meta-item"><span class="meta-label">${this.getText('scheduledWith')}:</span> <span class="meta-value">${this.meetingName}</span></div>` : ''}
                            ${this.showServiceName && this.serviceName ? `<div class="meta-item"><span class="meta-label">${this.getText('serviceName')}:</span> <span class="meta-value">${this.serviceName}</span></div>` : ''}
                            ${this.showDateTime ? `<div class="meta-item"><span class="meta-label">${this.getText('currentDateTime')}:</span> <span class="meta-value">${appointmentDate}</span></div>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getValue() {
        // Return the appointment information as an object
        return {
            meetingName: this.meetingName,
            startTime: this.startTime,
            serviceName: this.serviceName,
            formattedDate: this.formatAppointmentDate(this.startTime),
            language: this.language
        };
    }
    
    setValue(value) {
        // Update appointment information if provided
        if (value && typeof value === 'object') {
            if (value.meetingName) this.meetingName = value.meetingName;
            if (value.startTime) this.startTime = value.startTime;
            if (value.serviceName) this.serviceName = value.serviceName;
            if (value.language) this.language = value.language;
            
            // Re-render the card with new values
            if (this.element) {
                const appointmentDate = this.formatAppointmentDate(this.startTime);
                let cardContent = '';
                
                if (this.cardStyle === 'compact') {
                    cardContent = this.renderCompactCard(appointmentDate);
                } else if (this.cardStyle === 'detailed') {
                    cardContent = this.renderDetailedCard(appointmentDate);
                } else {
                    cardContent = this.renderDefaultCard(appointmentDate);
                }
                
                const cardContainer = this.element.querySelector('.current-appointment-card');
                if (cardContainer) {
                    cardContainer.outerHTML = cardContent;
                }
            }
        }
    }
    
    showError(message) {
        const errorElement = this.element.querySelector(`#${this.id}-error`);
        if (errorElement) {
            const errorText = errorElement.querySelector('.error-text');
            if (errorText) {
                errorText.textContent = message;
            }
            errorElement.classList.add('show');
        }
    }
    
    hideError() {
        const errorElement = this.element.querySelector(`#${this.id}-error`);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
    
    destroy() {
        // Clean up any event listeners or resources
        if (this.element) {
            this.element.remove();
        }
    }

    // Update configuration method for dynamic updates
    updateConfig(newConfig) {
        if (newConfig.meetingName) this.meetingName = newConfig.meetingName;
        if (newConfig.startTime) this.startTime = newConfig.startTime;
        if (newConfig.serviceName) this.serviceName = newConfig.serviceName;
        if (newConfig.language) this.language = newConfig.language;
        if (newConfig.translations) this.translations = { ...this.translations, ...newConfig.translations };
        if (newConfig.serviceMapping) this.serviceMapping = { ...this.serviceMapping, ...newConfig.serviceMapping };
        
        // Update service name if eventTypeSlug changed
        if (newConfig.eventTypeSlug) {
            this.serviceName = this.getServiceNameFromSlug(newConfig.eventTypeSlug, this.meetingName);
        }
        
        // Re-render if element exists
        if (this.element) {
            const appointmentDate = this.formatAppointmentDate(this.startTime);
            let cardContent = '';
            
            if (this.cardStyle === 'compact') {
                cardContent = this.renderCompactCard(appointmentDate);
            } else if (this.cardStyle === 'detailed') {
                cardContent = this.renderDetailedCard(appointmentDate);
            } else {
                cardContent = this.renderDefaultCard(appointmentDate);
            }
            
            const cardContainer = this.element.querySelector('.current-appointment-card');
            if (cardContainer) {
                cardContainer.outerHTML = cardContent;
            }
        }
    }
}
// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FormFieldFactory, CreatForm };
}

// Export to window
window.FormFieldFactory = FormFieldFactory;
window.CreatForm = CreatForm;
window.MultiStepForm = MultiStepForm;
