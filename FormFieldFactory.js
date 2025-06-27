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
            case 'provider-calendar':
                field = new ProviderCalendarField(this, config);
                break;
            case 'service-provider-filter':
                field = new ServiceProviderFilterField (this, config);
                break;
            case 'tab-manager':
    field = new TabManager(this, config);
    break;
            case 'service-provider-calendar':
                field = new ServiceAndProviderCalendarField (this, config);
                break;
            case 'service-request-calendar':
            case 'serviceRequestCalendar':
                field = new ServiceRequestCalendarField(this, config);
                break;
            case 'terms-checkbox':
            case 'termsCheckbox':
                field = new TermsCheckboxField(this, config);
                break;
            case 'service-request-file-upload':
            case 'serviceRequestFileUpload':
                field = new ServiceRequestFileUploadField(this, config);
                break;
            case 'currentAppointmentCard':
                field = new CurrentAppointmentCardField(this, config);
                break;
            case 'custom':
                field = new CustomField(this, config);
                break;
            case 'booking-cancellation-card':
                field = new BookingCancellationCardField(this, config);
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
	
	createProviderCalendarField (config) {
        return new ProviderCalendarField (this, config);
    }
	
	createTabManager (config) {
        return new TabManager (this, config);
    }

	
	
	createBookingCancellationCardField (config) {
        return new BookingCancellationCardField (this, config);
    }


	

	createServiceAndProviderCalendarField (config) {
        return new ServiceAndProviderCalendarField (this, config);
    }

		createServiceProviderFilterField (config) {
        return new ServiceProviderFilterField (this, config);
    }

    // ===== NEW CUSTOM FIELD FACTORY METHODS =====
    createServiceRequestCalendarField(config) {
        return new ServiceRequestCalendarField(this, config);
    }

    createTermsCheckboxField(config) {
        return new TermsCheckboxField(this, config);
    }

    createServiceRequestFileUploadField(config) {
        return new ServiceRequestFileUploadField(this, config);
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
        
        if (currentField.row) {
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
        
        // Single field without row
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
            case 'provider-calendar':
                return this.factory.createProviderCalendarField(fieldConfig);
            case 'manager':
                return this.factory.createTabManager(fieldConfig);
            case 'service-provider-filter':
                return this.factory.createServiceProviderFilterField(fieldConfig);


		

            case 'service-provider-calendar':
                return this.factory.createServiceAndProviderCalendarField(fieldConfig);
            case 'bookingCancellationCard':
                return this.factory.createBookingCancellationCardField(fieldConfig);
            // ===== NEW CUSTOM FIELD TYPES =====
            case 'service-request-calendar':
            case 'serviceRequestCalendar':
                return this.factory.createServiceRequestCalendarField(fieldConfig);
            case 'terms-checkbox':
            case 'termsCheckbox':
                return this.factory.createTermsCheckboxField(fieldConfig);
            case 'service-request-file-upload':
            case 'serviceRequestFileUpload':
                return this.factory.createServiceRequestFileUploadField(fieldConfig);
            case 'currentAppointmentCard':
                return this.factory.createCurrentAppointmentCardField(fieldConfig);
            case 'custom':
                // Handle custom fields with render functions
                if (fieldConfig.render && typeof fieldConfig.render === 'function') {
                    return fieldConfig.render(this.factory, fieldConfig);
                }
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
        // First, check min/max constraints
        if (newValue < this.min) {
            this.showError(`Value must be at least ${this.min}`);
            return this.min;
        }
        
        if (newValue > this.max) {
            this.showError(`Value must be at most ${this.max}`);
            return this.max;
        }

        // Then run custom validation if provided
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
        
        // Validate min/max for required validation
        if (this.value < this.min) {
            this.showError(this.getFieldErrorMessage('min') || `Value must be at least ${this.min}`);
            return false;
        }
        
        if (this.value > this.max) {
            this.showError(this.getFieldErrorMessage('max') || `Value must be at most ${this.max}`);
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
        
        // ✅ FIX: Set min, max, and step attributes on the HTML element
        this.element.min = this.min;
        this.element.max = this.max;
        this.element.step = this.step;

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
            // ✅ FIX: Clamp value to min/max range before validation
            const clampedValue = Math.min(Math.max(newValue, this.min), this.max);
            const validatedValue = this.validateValue(clampedValue);
            this.value = validatedValue;
            this.element.value = this.formatValue(this.value);
            this.handleChange();
        });

        // ✅ FIX: Add blur event to handle cases where user types invalid values
        this.element.addEventListener('blur', () => {
            const newValue = this.parseValue(this.element.value);
            const clampedValue = Math.min(Math.max(newValue, this.min), this.max);
            const validatedValue = this.validateValue(clampedValue);
            this.value = validatedValue;
            this.element.value = this.formatValue(this.value);
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
        const parsed = parseFloat((value || '').toString().replace(/\s/g, '')) || 0;
        // ✅ FIX: Return a valid number, defaulting to min if invalid
        return isNaN(parsed) ? this.min : parsed;
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        const newValue = this.parseValue(value);
        // ✅ FIX: Clamp the value when setting it
        this.value = Math.min(Math.max(newValue, this.min), this.max);
        if (this.element) {
            this.element.value = this.formatValue(this.value);
        }
    }

    // Method to trigger validation from external sources
    revalidate() {
        const clampedValue = Math.min(Math.max(this.value, this.min), this.max);
        const validatedValue = this.validateValue(clampedValue);
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
            case 'options-slider':
                return this.factory.createOptionsSliderField(config);
            default:
                console.warn(`Unknown field type: ${fieldType}`);
                return null;
        }
    }

    // ENHANCED: getValue method to properly handle unselected states
    getValue() {
        const mainValue = this.container ? 
            this.container.querySelector('input[type="radio"]:checked')?.value : 
            this.value;
            
        // If no selection made and field is not required, return null instead of empty string
        if (!mainValue && !this.required) {
            return { main: null };
        }
        
        // If no selection made but field is required, return empty string to trigger validation
        if (!mainValue && this.required) {
            return { main: '' };
        }
            
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
            
            if (currentField.row) {
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
            
            // Single field without row
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
/**
 * CustomField - For special content like summaries with personalized error messages
 */
// ============================================================================
// ENHANCED CUSTOMFIELD WITH CONFIGURABLE TRANSFORMATION SYSTEM
// ============================================================================

class CustomField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.renderFunction = config.render || null;
        this.updateFunction = config.update || null;
        this.autoSummary = config.autoSummary || false;
        
        // Enhanced transformation configuration
        this.transformationConfig = config.transformationConfig || null;
        this.valueExtractor = config.valueExtractor || null;
        this.summaryRenderer = config.summaryRenderer || null;
    }

    validate() {
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
            if (this.hasVisibleData(stepData, step)) {
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

    // ============================================================================
    // ENHANCED STEP CONTENT POPULATION WITH CONFIGURABLE RENDERING
    // ============================================================================
    populateStepContent(contentDiv, step, stepData) {
        let contentHtml = '';

        // Use custom summary renderer if provided
        if (this.summaryRenderer && typeof this.summaryRenderer === 'function') {
            try {
                contentHtml = this.summaryRenderer(step, stepData, this.factory);
            } catch (error) {
                console.error('Error in custom summary renderer:', error);
                contentHtml = this.defaultPopulateStepContent(step, stepData);
            }
        } else {
            contentHtml = this.defaultPopulateStepContent(step, stepData);
        }

        contentDiv.innerHTML = contentHtml || '<div class="summary-empty">Aucune donnée saisie</div>';
    }

    defaultPopulateStepContent(step, stepData) {
        let contentHtml = '';

        step.fields.forEach(fieldConfig => {
            const fieldValue = stepData[fieldConfig.name || fieldConfig.id];
            
            if (this.shouldDisplayFieldInSummary(fieldConfig, fieldValue)) {
                
                // Check for separate summary fields rendering
                if (fieldConfig.renderSeparateSummaryFields) {
                    const fieldInstance = this.getFieldInstance(fieldConfig.name || fieldConfig.id);
                    
                    if (fieldInstance && typeof fieldInstance.getSummaryFields === 'function') {
                        const summaryFields = fieldInstance.getSummaryFields();
                        
                        summaryFields.forEach(field => {
                            if (this.isValidSummaryValue(field.value)) {
                                contentHtml += this.createSummaryRow(field.label, field.value);
                            }
                        });
                    } else if (fieldConfig.getSummaryDisplay && typeof fieldConfig.getSummaryDisplay === 'function') {
                        const displayValue = fieldConfig.getSummaryDisplay(fieldValue, fieldInstance);
                        if (displayValue && this.isValidSummaryValue(displayValue)) {
                            const lines = displayValue.split('\n').filter(line => line.trim());
                            lines.forEach(line => {
                                contentHtml += this.processSummaryLine(line, fieldConfig.label);
                            });
                        }
                    }
                }
                // Special handling for complex field types
                else if (fieldConfig.type === 'yesno-with-options') {
                    const formattedContent = this.formatYesNoWithOptionsField(fieldConfig, fieldValue);
                    if (formattedContent.trim()) {
                        contentHtml += formattedContent;
                    }
                } 
                // Default handling for other fields
                else {
                    const displayValue = this.formatFieldValue(fieldConfig, fieldValue);
                    if (displayValue && this.isValidSummaryValue(displayValue)) {
                        contentHtml += this.createSummaryRow(fieldConfig.label, displayValue);
                    }
                }
            }
        });

        return contentHtml;
    }

    // ============================================================================
    // ENHANCED VALUE VALIDATION AND FORMATTING
    // ============================================================================
    isValidSummaryValue(value) {
        if (!value) return false;
        if (typeof value === 'string') {
            const cleanValue = value.trim().toLowerCase();
            return cleanValue !== '' && 
                   cleanValue !== 'indifférent' && 
                   cleanValue !== 'any' && 
                   cleanValue !== 'non spécifié' && 
                   cleanValue !== 'not specified';
        }
        return true;
    }

    createSummaryRow(label, value) {
        return `
            <div class="summary-row">
                <div class="summary-label">${label}:</div>
                <div class="summary-value">${value}</div>
            </div>
        `;
    }

    processSummaryLine(line, defaultLabel) {
        if (line.includes(':')) {
            const [label, value] = line.split(':').map(part => part.trim());
            if (value && this.isValidSummaryValue(value)) {
                return this.createSummaryRow(label, value);
            }
        } else if (line && this.isValidSummaryValue(line)) {
            return this.createSummaryRow(defaultLabel, line);
        }
        return '';
    }

    // ============================================================================
    // ENHANCED FIELD VALUE FORMATTING WITH CONFIGURABLE EXTRACTORS
    // ============================================================================
    formatFieldValue(fieldConfig, value) {
        // Use custom value extractor if provided
        if (this.valueExtractor && typeof this.valueExtractor === 'function') {
            try {
                const extracted = this.valueExtractor(fieldConfig, value, this.factory);
                if (extracted !== undefined) return extracted;
            } catch (error) {
                console.error('Error in custom value extractor:', error);
            }
        }

        // Use enhanced field formatter
        return this.enhancedFormatFieldValue(fieldConfig, value);
    }

    enhancedFormatFieldValue(fieldConfig, value) {
        const fieldType = fieldConfig.type;

        // Enhanced field type handlers
        const fieldHandlers = {
            'sliding-window-range': () => this.handleSlidingWindowRange(fieldConfig, value),
            'yesno': () => this.handleYesNoField(fieldConfig, value),
            'select': () => this.handleSelectField(fieldConfig, value),
            'multiselect': () => this.handleMultiSelectField(fieldConfig, value),
            'select-with-other': () => this.handleSelectWithOtherField(fieldConfig, value),
            'multiselect-with-other': () => this.handleMultiSelectWithOtherField(fieldConfig, value),
            'yesno-with-options': () => this.handleYesNoWithOptionsField(fieldConfig, value),
            'options-slider': () => this.handleOptionsSliderField(fieldConfig, value),
            'textarea': () => this.handleTextareaField(value),
            'default': () => value
        };

        const handler = fieldHandlers[fieldType] || fieldHandlers['default'];
        return handler();
    }

    // ============================================================================
    // SPECIALIZED FIELD HANDLERS
    // ============================================================================
    handleSlidingWindowRange(fieldConfig, value) {
        const fieldInstance = this.getFieldInstance(fieldConfig.name || fieldConfig.id);
        if (fieldInstance && typeof fieldInstance.getDisplayValue === 'function') {
            return fieldInstance.getDisplayValue();
        }
        
        if (typeof value === 'object' && value !== null && value.min !== undefined && value.max !== undefined) {
            const formatValue = fieldConfig.formatValue || ((val) => `${parseInt(val).toLocaleString()}`);
            return `${formatValue(value.min)} - ${formatValue(value.max)}`;
        }
        return value;
    }

    handleYesNoField(fieldConfig, value) {
        if (fieldConfig.customOptions && Array.isArray(fieldConfig.customOptions)) {
            const option = fieldConfig.customOptions.find(opt => opt.value === value);
            if (option) return option.label;
        }
        
        return value === 'yes' || value === true ? 
            (this.factory.getText('yes') || 'Oui') : 
            (this.factory.getText('no') || 'Non');
    }

    handleSelectField(fieldConfig, value) {
        return this.getOptionDisplayName(fieldConfig.options || fieldConfig.subsectionOptions, value);
    }

    handleMultiSelectField(fieldConfig, value) {
        if (Array.isArray(value)) {
            return value.map(v => this.getOptionDisplayName(fieldConfig.options || fieldConfig.subsectionOptions, v)).join(', ');
        }
        return value;
    }

    handleSelectWithOtherField(fieldConfig, value) {
        if (typeof value === 'object' && value.main) {
            if (value.main === 'other') {
                return value.other || this.factory.getText('other');
            }
            return this.getOptionDisplayName(fieldConfig.options, value.main);
        }
        return this.getOptionDisplayName(fieldConfig.options, value);
    }

    handleMultiSelectWithOtherField(fieldConfig, value) {
        if (typeof value === 'object' && value.main) {
            const mainValues = Array.isArray(value.main) ? 
                value.main.map(v => this.getOptionDisplayName(fieldConfig.options, v)) : [];
            if (value.other) {
                mainValues.push(value.other);
            }
            return mainValues.join(', ');
        }
        return Array.isArray(value) ? value.join(', ') : value;
    }

    handleYesNoWithOptionsField(fieldConfig, value) {
        if (typeof value === 'object' && value.main) {
            if (fieldConfig.customOptions && Array.isArray(fieldConfig.customOptions)) {
                const option = fieldConfig.customOptions.find(opt => opt.value === value.main);
                if (option) return option.label;
            }
            
            return value.main === true || value.main === 'yes' ? 
                (this.factory.getText('yes') || 'Oui') :
                (this.factory.getText('no') || 'Non');
        }
        return value;
    }

    handleOptionsSliderField(fieldConfig, value) {
        if (typeof value === 'object' && value !== null && value.display) {
            return value.display;
        }
        
        if (fieldConfig.options && Array.isArray(fieldConfig.options)) {
            const option = fieldConfig.options.find(opt => opt.value === value);
            if (option) return option.display || option.label || value;
        }
        return value;
    }

    handleTextareaField(value) {
        if (typeof value === 'string' && value.length > 100) {
            return value.substring(0, 100) + '...';
        }
        return value;
    }

    // ============================================================================
    // ENHANCED VISIBILITY CHECKING WITH CONFIGURABLE RULES
    // ============================================================================
    shouldDisplayFieldInSummary(fieldConfig, fieldValue) {
        // Use transformation config if available
        if (this.transformationConfig && this.transformationConfig.visibilityRules) {
            const rule = this.transformationConfig.visibilityRules[fieldConfig.id];
            if (rule && typeof rule === 'function') {
                return rule(fieldConfig, fieldValue);
            }
        }

        return this.defaultShouldDisplayField(fieldConfig, fieldValue);
    }

    defaultShouldDisplayField(fieldConfig, fieldValue) {
        // Basic null/undefined/empty checks
        if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
            return false;
        }

        // Handle array values
        if (Array.isArray(fieldValue) && fieldValue.length === 0) {
            return false;
        }

        // Enhanced field type specific checks
        const fieldTypeChecks = {
            'yesno': () => this.checkYesNoFieldVisibility(fieldConfig, fieldValue),
            'yesno-with-options': () => this.checkYesNoWithOptionsVisibility(fieldConfig, fieldValue),
            'options-slider': () => this.checkOptionsSliderVisibility(fieldConfig, fieldValue),
            'sliding-window-range': () => this.checkSlidingWindowRangeVisibility(fieldValue)
        };

        const checker = fieldTypeChecks[fieldConfig.type];
        if (checker) {
            return checker();
        }

        return true;
    }

    checkYesNoFieldVisibility(fieldConfig, fieldValue) {
        if (!fieldConfig.required) {
            if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
                return false;
            }
            if (typeof fieldValue === 'string' && (fieldValue === 'null' || fieldValue === 'undefined')) {
                return false;
            }
        }
        return true;
    }

    checkYesNoWithOptionsVisibility(fieldConfig, fieldValue) {
        if (!fieldConfig.required) {
            if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
                return false;
            }
            
            if (typeof fieldValue === 'object' && fieldValue !== null) {
                const mainValue = fieldValue.main;
                if (mainValue === undefined || mainValue === null || mainValue === '') {
                    return false;
                }
                if (typeof mainValue === 'string' && (mainValue === 'null' || mainValue === 'undefined')) {
                    return false;
                }
                
                const hasValidValue = Object.values(fieldValue).some(val => 
                    val !== null && val !== undefined && val !== ''
                );
                if (!hasValidValue) {
                    return false;
                }
            }
        }
        return true;
    }

    checkOptionsSliderVisibility(fieldConfig, fieldValue) {
        if (!fieldConfig.required) {
            if (fieldValue === 0 || (typeof fieldValue === 'object' && fieldValue !== null && fieldValue.value === 0)) {
                return false;
            }
            
            if (typeof fieldValue === 'object' && fieldValue !== null && fieldValue.display) {
                const displayLower = fieldValue.display.toLowerCase();
                if (displayLower.includes('indifférent') || displayLower.includes('any')) {
                    return false;
                }
            }
        }
        return true;
    }

    checkSlidingWindowRangeVisibility(fieldValue) {
        if (typeof fieldValue === 'object' && fieldValue !== null) {
            return fieldValue.min !== undefined && fieldValue.max !== undefined;
        }
        return true;
    }

    // ============================================================================
    // ENHANCED YES/NO WITH OPTIONS FORMATTING
    // ============================================================================
    formatYesNoWithOptionsField(fieldConfig, value) {
        let html = '';
        
        if (typeof value === 'object' && value.main !== undefined) {
            const customOptions = fieldConfig.customOptions;
            let mainDisplayValue = value.main;
            
            // Get display value for main selection
            if (customOptions && Array.isArray(customOptions)) {
                const selectedOption = customOptions.find(opt => opt.value === value.main);
                if (selectedOption) {
                    mainDisplayValue = selectedOption.label;
                }
            } else {
                mainDisplayValue = value.main === true || value.main === 'yes' ? this.factory.getText('yes') :
                                  value.main === false || value.main === 'no' ? this.factory.getText('no') :
                                  value.main;
            }
            
            // Display main field value
            html += this.createSummaryRow(fieldConfig.label, mainDisplayValue);
            
            // Determine which conditional fields to show
            const { showYesFields, showNoFields } = this.determineConditionalFieldsVisibility(fieldConfig, value);
            
            // Display conditional fields
            if (showYesFields) {
                html += this.renderConditionalFields(fieldConfig.yesFields || [fieldConfig.yesField], value.yesValues);
            } else if (showNoFields) {
                html += this.renderConditionalFields([fieldConfig.noField], value.noValues);
            }
        } else {
            const displayValue = this.formatFieldValue(fieldConfig, value);
            if (displayValue && this.isValidSummaryValue(displayValue)) {
                html += this.createSummaryRow(fieldConfig.label, displayValue);
            }
        }
        
        return html;
    }

    determineConditionalFieldsVisibility(fieldConfig, value) {
        let showYesFields = false;
        let showNoFields = false;
        
        if (fieldConfig.customOptions && Array.isArray(fieldConfig.customOptions)) {
            showYesFields = value.main === fieldConfig.customOptions[0].value;
            showNoFields = value.main === fieldConfig.customOptions[1].value;
        } else {
            showYesFields = value.main === true || value.main === 'yes';
            showNoFields = value.main === false || value.main === 'no';
        }
        
        return { showYesFields, showNoFields };
    }

    renderConditionalFields(subFields, subValues) {
        let html = '';
        
        if (!subFields || !subValues) return html;
        
        const fieldsArray = Array.isArray(subFields) ? subFields : [subFields].filter(Boolean);
        
        fieldsArray.forEach(subField => {
            const subValue = subValues[subField.id];
            if (subValue !== undefined && subValue !== null && subValue !== '') {
                const subDisplayValue = this.formatFieldValue(subField, subValue);
                if (subDisplayValue && this.isValidSummaryValue(subDisplayValue)) {
                    html += this.createSummaryRow(subField.label, subDisplayValue);
                }
            }
        });
        
        return html;
    }

    // ============================================================================
    // UTILITY METHODS
    // ============================================================================
    getOptionDisplayName(options, value) {
        if (!options) return value;
        
        if (Array.isArray(options)) {
            const option = options.find(opt => opt.id === value);
            return option ? (option.name || option.label) : value;
        }
        
        // Handle subsection options
        for (const group of options) {
            if (group.subcategories) {
                const option = group.subcategories.find(opt => opt.id === value);
                if (option) return option.name || option.label;
            }
        }
        
        return value;
    }

    getFieldInstance(fieldName) {
        const multiStepForm = this.factory.currentMultiStepForm;
        if (!multiStepForm) return null;
        
        for (let stepInstance of multiStepForm.stepInstances) {
            if (stepInstance.fieldInstances) {
                const fieldInstance = stepInstance.fieldInstances.find(field => 
                    field.name === fieldName || field.id === fieldName
                );
                if (fieldInstance) {
                    return fieldInstance;
                }
            }
        }
        return null;
    }

    getStepData(multiStepForm, stepIndex) {
        const stepInstance = multiStepForm.stepInstances[stepIndex];
        if (!stepInstance) return {};
        
        return stepInstance.getStepData();
    }

    hasVisibleData(stepData, stepConfig) {
        // Use transformation config for visibility if available
        if (this.transformationConfig && this.transformationConfig.stepVisibilityRules) {
            const rule = this.transformationConfig.stepVisibilityRules[stepConfig.id];
            if (rule && typeof rule === 'function') {
                return rule(stepData, stepConfig);
            }
        }

        return Object.entries(stepData).some(([key, value]) => {
            const fieldConfig = stepConfig.fields.find(f => f.id === key || f.name === key);
            return this.shouldDisplayFieldInSummary(fieldConfig || { id: key }, value);
        });
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
        this.otherContainer.style.marginTop = '10px'; // Add 10px vertical spacing
        
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
        this.otherContainer.style.marginTop = '10px'; // Add 10px vertical spacing
        
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

    // ADD THIS METHOD: Returns formatted display value for summary
    getDisplayValue() {
        const formattedMin = this.formatValue(this.selectedMin);
        const formattedMax = this.formatValue(this.selectedMax);
        return `${formattedMin} - ${formattedMax}`;
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
 * OptionsSliderField - Fixed with proper defaultIndex handling
 */
class OptionsSliderField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.options = config.options || [];
        this.showMarkers = config.showMarkers !== false;
        
        // FIX: Proper undefined checking for defaultIndex
        this.currentIndex = config.defaultIndex !== undefined ? 
            config.defaultIndex : 
            Math.floor(this.options.length / 2);
            
        this.value = this.getCurrentValue();
        
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
        
        window.addEventListener('resize', () => this.clearCache());
    }

    updateUI() {
        const percent = this.options.length > 1 ? (this.currentIndex / (this.options.length - 1)) * 100 : 0;
        const originalPercent = percent;
        
        this.progress.style.width = percent + '%';
        
        requestAnimationFrame(() => {
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
 * SliderField - Fixed with proper defaultValue handling
 */
class SliderField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.min = config.min || 0;
        this.max = config.max || 10000;
        this.step = config.step || 100;
        this.sliderType = config.sliderType || 'currency';
        this.formatValue = config.formatValue || this.getDefaultFormatter();
        
        // FIX: Proper undefined checking for value/defaultValue
        this.value = config.value !== undefined ? 
            config.value : 
            (config.defaultValue !== undefined ? 
                config.defaultValue : 
                (this.min + this.max) / 2);
        
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
        this.dimensionCache.clear();
    }

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
        
        window.addEventListener('resize', () => this.clearCache());
    }

    updateUI() {
        const percent = ((this.value - this.min) / (this.max - this.min)) * 100;
        const originalPercent = percent;
        
        this.progress.style.width = percent + '%';
        
        requestAnimationFrame(() => {
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
 * SlidingWindowSliderField - Fixed with proper defaultValue handling
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
        
        // FIX: Proper undefined checking for defaultValue
        this.selectedValue = config.defaultValue !== undefined ? 
            config.defaultValue : 
            (config.value !== undefined ? 
                config.value : 
                ((this.currentMin + this.currentMax) / 2));
        
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
        this.dimensionCache.clear();
    }

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
        window.addEventListener('resize', () => this.clearCache());
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

    updateUI() {
        const percent = ((this.selectedValue - this.currentMin) / (this.currentMax - this.currentMin)) * 100;
        const originalPercent = percent;
        
        this.progress.style.width = percent + '%';
        
        requestAnimationFrame(() => {
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

/**
 * CreatForm - Main form creation and management class
 */
/**
 * CreatForm - Enhanced main form creation and management class with fixed single-step row support
 */

class CreatForm {
    constructor(config = {}, formData = {}, formConfig = {}, defaultConfig = {}) {
        this.config = {
            language: config.language || "fr",
            webhookUrl: config.webhookUrl || defaultConfig.DEFAULT_WEBHOOK,
            webhookEnabled: config.webhookEnabled !== false, // Default: enabled
            voiceflowEnabled: config.voiceflowEnabled !== false, // Default: enabled
            cssUrls: config.cssUrls || defaultConfig.DEFAULT_CSS,
            enableSessionTimeout: config.enableSessionTimeout !== false,
            sessionTimeout: config.sessionTimeout || defaultConfig.SESSION_TIMEOUT,
            sessionWarning: config.sessionWarning || defaultConfig.SESSION_WARNING,
            debounceDelay: config.debounceDelay || defaultConfig.DEBOUNCE_DELAY,
            
            // Form type and structure
            formType: config.formType || "submission", // "submission" or "booking"
            formStructure: config.formStructure || "auto", // "auto", "single", "multistep"
            
            // Submit button configuration
            submitButtonText: config.submitButtonText || null, // Custom submit button text
            showSubmitButton: config.showSubmitButton !== false, // Default: true, can be set to false
            
            // Booking-specific configuration
            apiKey: config.apiKey || "",
            timezone: config.timezone || "America/Toronto",
            
            // ============================================================================
            // STRUCTURED DATA CONFIGURATION
            // ============================================================================
            
            // Enable structured data format (sections, metadata, etc.)
            useStructuredData: config.useStructuredData || false,
            
            // Custom function to transform data into structured format
            // Signature: (flatData, originalFormValues, creatFormInstance) => structuredData
            structuredDataTransformer: config.structuredDataTransformer || null,
            
            // Voiceflow-specific data transformer (separate from structured data)
            // Signature: (submissionData, originalFormValues, creatFormInstance) => voiceflowPayload
            voiceflowDataTransformer: config.voiceflowDataTransformer || null,
            
            // Enhanced logging configuration
            enableDetailedLogging: config.enableDetailedLogging !== false,
            logPrefix: config.logPrefix || "📋 CreatForm"
        };
        
        // Store the passed data
        this.formData = formData;
        this.formConfig = formConfig;
        this.defaultConfig = defaultConfig;
        
        this.state = { 
            cssLoaded: false, 
            initialized: false, 
            formSubmitted: false, 
            sessionExpired: false, 
            currentStep: 0,
            isSingleStep: false 
        };
        this.elements = new Map();
        this.formValues = {};
        this.sessionTimer = null;
        this.warningTimer = null;
        this.cssCache = new Map();

        // Determine if this is a booking form
        this.isBookingForm = this.config.formType === "booking";
        
        // Initialize logging
        this.initializeLogging();
        
        // Determine form structure
        this.determineFormStructure();
    }

    // ============================================================================
    // ENHANCED LOGGING SYSTEM
    // ============================================================================

    initializeLogging() {
        this.logger = {
            info: (message, data = null) => {
                if (this.config.enableDetailedLogging) {
                    console.log(`${this.config.logPrefix} ℹ️`, message, data || '');
                }
            },
            success: (message, data = null) => {
                if (this.config.enableDetailedLogging) {
                    console.log(`${this.config.logPrefix} ✅`, message, data || '');
                }
            },
            warning: (message, data = null) => {
                if (this.config.enableDetailedLogging) {
                    console.warn(`${this.config.logPrefix} ⚠️`, message, data || '');
                }
            },
            error: (message, data = null) => {
                console.error(`${this.config.logPrefix} ❌`, message, data || '');
            },
            webhook: (message, data = null) => {
                if (this.config.enableDetailedLogging) {
                    console.group(`${this.config.logPrefix} 🔗 WEBHOOK`);
                    console.log(message);
                    if (data) {
                        console.log('📤 Webhook Data:', JSON.stringify(data, null, 2));
                    }
                    console.groupEnd();
                }
            },
            voiceflow: (message, data = null) => {
                if (this.config.enableDetailedLogging) {
                    console.group(`${this.config.logPrefix} 🤖 VOICEFLOW`);
                    console.log(message);
                    if (data) {
                        console.log('📤 Voiceflow Data:', JSON.stringify(data, null, 2));
                    }
                    console.groupEnd();
                }
            },
            transformation: (originalData, transformedData) => {
                if (this.config.enableDetailedLogging) {
                    console.group(`${this.config.logPrefix} 🔄 DATA TRANSFORMATION`);
                    console.log('📥 Original Form Data:', JSON.stringify(originalData, null, 2));
                    console.log('📤 Transformed Data:', JSON.stringify(transformedData, null, 2));
                    console.groupEnd();
                }
            }
        };

        this.logger.info('CreatForm initialized', {
            formType: this.config.formType,
            structure: this.state.isSingleStep ? 'single-step' : 'multi-step',
            webhookEnabled: this.config.webhookEnabled,
            voiceflowEnabled: this.config.voiceflowEnabled,
            useStructuredData: this.config.useStructuredData,
            hasStructuredTransformer: typeof this.config.structuredDataTransformer === 'function',
            hasVoiceflowTransformer: typeof this.config.voiceflowDataTransformer === 'function'
        });
    }

    // ============================================================================
    // FORM STRUCTURE DETECTION
    // ============================================================================

    determineFormStructure() {
        const steps = this.formConfig.steps || [];
        
        if (this.config.formStructure === "single") {
            this.state.isSingleStep = true;
        } else if (this.config.formStructure === "multistep") {
            this.state.isSingleStep = false;
        } else {
            // Auto-detect based on steps
            this.state.isSingleStep = steps.length <= 1;
        }
        
        this.logger.info(`Form structure determined: ${this.state.isSingleStep ? 'Single Step' : 'Multi Step'}`);
    }

    // ============================================================================
    // UTILITY METHODS
    // ============================================================================

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

    // Enhanced extractValue method
    extractValue(value) {
        if (value == null || value === undefined) return '';
        
        if (typeof value === 'number' && !isNaN(value)) return value;
        
        if (typeof value === 'boolean') {
            return value ? this.getText('common.yes') : this.getText('common.no');
        }
        
        if (typeof value === 'string') {
            const yesText = this.getText('common.yes');
            const noText = this.getText('common.no');
            if (value === yesText || value === noText) {
                return value;
            }
            return value;
        }
        
        if (Array.isArray(value)) {
            return value.map(item => this.extractValue(item)).filter(Boolean).join(', ');
        }
        
        if (typeof value === 'object' && value !== null) {
            if (value.main !== undefined) {
                let result = [];
                
                const mainDisplay = value.main === true ? this.getText('common.yes') :
                                   value.main === false ? this.getText('common.no') :
                                   value.main;
                result.push(mainDisplay);
                
                if (value.yesValues && Object.keys(value.yesValues).length > 0) {
                    Object.values(value.yesValues).forEach(subValue => {
                        const extracted = this.extractValue(subValue);
                        if (extracted && extracted !== '') {
                            result.push(extracted);
                        }
                    });
                }
                
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
            
            if (value.selectedValue !== undefined) {
                return this.extractValue(value.selectedValue);
            }
            
            if (value.value !== undefined) {
                return this.extractValue(value.value);
            }
            
            if (value.name !== undefined) {
                return typeof value.name === 'object' ? 
                       (value.name[this.config.language] || value.name.en || value.name) :
                       value.name;
            }
            
            if (value.id !== undefined) {
                return value.id;
            }
            
            return '';
        }
        
        return String(value);
    }

    formatValueForDisplay(fieldId, value, fieldConfig = null) {
        const extractedValue = this.extractValue(value);
        
        if (!extractedValue || extractedValue === '') {
            return this.getText('common.notSpecified') || 'Non spécifié';
        }
        
        return extractedValue;
    }
    
    generateSummaryData() {
        const summaryData = {};
        
        this.formConfig.steps.forEach((stepConfig, stepIndex) => {
            if (stepIndex === this.formConfig.steps.length - 1) return;
            
            const stepData = {};
            
            const processField = (fieldConfig, parentValue = null) => {
                const fieldValue = this.formValues[fieldConfig.id];
                
                if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
                    stepData[fieldConfig.id] = {
                        label: this.getText(`fields.${fieldConfig.id}`),
                        value: this.formatValueForDisplay(fieldConfig.id, fieldValue, fieldConfig),
                        rawValue: fieldValue
                    };
                    
                    if (fieldConfig.type === 'yesno-with-options') {
                        let isFirstOption = false;
                        let isSecondOption = false;
                        
                        if (fieldConfig.customOptions && Array.isArray(fieldConfig.customOptions)) {
                            isFirstOption = fieldValue === fieldConfig.customOptions[0].value;
                            isSecondOption = fieldValue === fieldConfig.customOptions[1].value;
                        } else {
                            isFirstOption = fieldValue === true || fieldValue === 'yes';
                            isSecondOption = fieldValue === false || fieldValue === 'no';
                        }
                        
                        if (isFirstOption) {
                            if (fieldConfig.yesFields) {
                                fieldConfig.yesFields.forEach(subField => {
                                    processField(subField, true);
                                });
                            }
                            if (fieldConfig.yesField) {
                                processField(fieldConfig.yesField, true);
                            }
                        } else if (isSecondOption) {
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

    // ============================================================================
    // CSS MANAGEMENT
    // ============================================================================

    async loadCSS() {
        if (this.state.cssLoaded) return;
        try {
            this.logger.info('Loading CSS files...');
            const cssPromises = this.config.cssUrls.map(url => this.fetchCSS(url));
            const cssTexts = await Promise.allSettled(cssPromises);
            const validCSS = cssTexts
                .filter(result => result.status === 'fulfilled' && result.value)
                .map(result => result.value).join('\n');
            
            if (validCSS.trim()) this.injectCSS(validCSS);
            this.state.cssLoaded = true;
            this.logger.success('CSS loaded successfully');
        } catch (error) {
            this.logger.error('Failed to load CSS:', error);
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
            this.logger.warning(`Failed to fetch CSS from ${url}:`, error);
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

    // ============================================================================
    // FORM CREATION - Enhanced for single/multistep support
    // ============================================================================

    createFormSteps() {
        return this.formConfig.steps.map((stepConfig, index) => {
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

            if (fieldConfig.options) {
                if (typeof fieldConfig.options === 'string') {
                    field.options = this.getData(fieldConfig.options);
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

            if (fieldConfig.customOptions) {
                field.customOptions = fieldConfig.customOptions.map(opt => ({
                    ...opt,
                    label: typeof opt.label === 'object' ? opt.label[this.config.language] || opt.label.en : opt.label
                }));
            }

            if (fieldConfig.yesFields) field.yesFields = this.createFields(fieldConfig.yesFields);
            if (fieldConfig.yesField) field.yesField = this.createFields([fieldConfig.yesField])[0];
            if (fieldConfig.noField) field.noField = this.createFields([fieldConfig.noField])[0];

            if (fieldConfig.type === 'calendar' && this.isBookingForm) {
                field.apiKey = this.config.apiKey;
                field.timezone = this.config.timezone;
                field.language = this.config.language;
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
    // ENHANCED SINGLE STEP FORM CREATION WITH ROW SUPPORT AND OPTIONAL SUBMIT BUTTON
    // ============================================================================

    // Helper method to group fields by row (same logic as FormStep)
    groupFieldsForSingleStep(fields) {
        const groups = [];
        let i = 0;
        
        while (i < fields.length) {
            const currentField = fields[i];
            
            if (currentField.row) {
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
            
            // Single field without row
            groups.push({
                isRow: false,
                fields: [currentField]
            });
            
            i++;
        }
        
        return groups;
    }

    createSingleStepForm() {
        const firstStep = this.formConfig.steps[0];
        if (!firstStep) {
            throw new Error('No steps defined for single step form');
        }

        this.logger.info('Creating single step form with row support');

        const container = document.createElement('div');
        // Use same base class as multi-step for consistent styling
        container.className = 'multistep-form single-step-variant';

        // Create form - Use same structure as multi-step
        const form = document.createElement('form');
        form.className = 'form-step active'; // Same as multi-step step class
        
        // Create fields container
        const fieldsContainer = document.createElement('div');
        fieldsContainer.className = 'step-fields';

        // Create fields with proper row grouping
        const fields = this.createFields(firstStep.fields);
        const fieldInstances = [];

        // Use the same grouping logic as multi-step forms
        const fieldGroups = this.groupFieldsForSingleStep(fields);
        
        fieldGroups.forEach(group => {
            if (group.isRow) {
                // Create row container
                const rowContainer = document.createElement('div');
                rowContainer.className = 'field-row';
                
                group.fields.forEach(fieldConfig => {
                    const colContainer = document.createElement('div');
                    colContainer.className = 'field-col';
                    
                    const field = this.factory.createField(fieldConfig);
                    if (field) {
                        fieldInstances.push(field);
                        colContainer.appendChild(field.render());
                    }
                    rowContainer.appendChild(colContainer);
                });
                
                fieldsContainer.appendChild(rowContainer);
            } else {
                // Single field
                const field = this.factory.createField(group.fields[0]);
                if (field) {
                    fieldInstances.push(field);
                    fieldsContainer.appendChild(field.render());
                }
            }
        });

        form.appendChild(fieldsContainer);

        // Create navigation container only if submit button is enabled
        if (this.config.showSubmitButton) {
            const navigationContainer = document.createElement('div');
            navigationContainer.className = 'form-navigation';
            
            const submitButton = document.createElement('button');
            submitButton.type = 'button';
            submitButton.className = 'btn btn-submit';
            submitButton.textContent = this.config.submitButtonText || this.getText('nav.submit');
            
            submitButton.addEventListener('click', async () => {
                this.logger.info('Single step form submit button clicked');
                
                // Validate all fields
                let isValid = true;
                fieldInstances.forEach(field => {
                    if (!field.validate()) {
                        isValid = false;
                    }
                });

                if (isValid) {
                    // Collect form data
                    const formData = {};
                    fieldInstances.forEach(field => {
                        formData[field.name] = field.getValue();
                    });

                    this.logger.info('Single step form validation passed, submitting...', formData);

                    // Submit
                    await this.handleSubmission(formData);
                } else {
                    this.logger.warning('Single step form validation failed');
                }
            });

            navigationContainer.appendChild(submitButton);
            form.appendChild(navigationContainer);
            
            // Store references for cleanup
            this.singleStepForm = {
                container,
                fieldInstances,
                submitButton
            };
        } else {
            // Store references for cleanup (without submit button)
            this.singleStepForm = {
                container,
                fieldInstances,
                submitButton: null
            };
        }

        container.appendChild(form);
        this.logger.success('Single step form created successfully');
        return container;
    }

    // ============================================================================
    // ENHANCED DATA TRANSFORMATION WITH STRUCTURED SECTIONS
    // ============================================================================

    /**
     * Enhanced data preparation that supports both flat and structured formats
     */
    prepareDataForSubmission(formValues) {
        this.logger.info('🔧 Preparing data for submission...', formValues);
        
        // Create flat data (existing functionality)
        const flatData = {};
        Object.keys(formValues).forEach(key => {
            const value = formValues[key];
            flatData[key] = this.extractValue(value);
        });
        
        // Base submission data
        const baseSubmissionData = {
            ...flatData,
            formLanguage: this.config.language,
            submissionTimestamp: new Date().toISOString(),
            formVersion: this.defaultConfig.FORM_VERSION || '1.0.0',
            userAgent: navigator.userAgent,
            formType: this.state.isSingleStep ? "single_step_form" : "multi_step_form"
        };

        // Check if structured data transformation is requested
        if (this.config.useStructuredData) {
            return this.createStructuredSubmissionData(baseSubmissionData, formValues);
        }

        // Add summary data for multi-step forms
        if (!this.state.isSingleStep) {
            baseSubmissionData.summaryData = this.generateSummaryData();
        }
        
        this.logger.info('🔧 Final prepared data:', baseSubmissionData);
        return baseSubmissionData;
    }

    /**
     * Creates structured submission data with sections
     */
    createStructuredSubmissionData(flatData, originalFormValues) {
        this.logger.info('🏗️ Creating structured submission data...');
        
        // Get the structured data transformer function if provided
        if (this.config.structuredDataTransformer && typeof this.config.structuredDataTransformer === 'function') {
            try {
                const structuredData = this.config.structuredDataTransformer(flatData, originalFormValues, this);
                this.logger.success('✅ Custom structured data transformation completed');
                return structuredData;
            } catch (error) {
                this.logger.error('❌ Error in structured data transformer:', error);
                // Fallback to default structure
            }
        }

        // Default structured format
        const sections = this.createDefaultStructuredSections(flatData, originalFormValues);
        
        const structuredPayload = {
            submissionType: this.config.formType === "booking" ? "booking_form" : "submission_form",
            formVersion: this.defaultConfig.FORM_VERSION || '1.0.0',
            submissionTimestamp: new Date().toISOString(),
            language: this.config.language,
            
            // Structured sections
            sections: sections,
            
            // Legacy flat data for backwards compatibility
            flatData: flatData,
            
            // Metadata
            metadata: this.generateSubmissionMetadata(flatData, originalFormValues)
        };

        this.logger.info('🏗️ Structured payload created:', structuredPayload);
        return structuredPayload;
    }

    /**
     * Creates default structured sections based on form configuration
     */
    createDefaultStructuredSections(flatData, originalFormValues) {
        const sections = {};
        
        // Group fields by their step configuration
        this.formConfig.steps?.forEach((stepConfig, stepIndex) => {
            if (stepConfig.sectionId || stepConfig.fields?.length > 0) {
                const sectionId = stepConfig.sectionId || `step_${stepIndex}`;
                const sectionData = {
                    sectionType: sectionId,
                    title: this.getText(`steps.${stepIndex}.title`) || stepConfig.title || `Step ${stepIndex + 1}`,
                    index: stepIndex
                };

                // Add field data for this section
                stepConfig.fields?.forEach(fieldConfig => {
                    const fieldValue = originalFormValues[fieldConfig.id];
                    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
                        sectionData[fieldConfig.id] = this.transformFieldValueForStructure(fieldConfig, fieldValue);
                    }
                });

                // Only add section if it has data
                if (Object.keys(sectionData).length > 3) { // More than just sectionType, title, index
                    sections[sectionId] = sectionData;
                }
            }
        });

        return sections;
    }

    /**
     * Transforms individual field values for structured format
     */
    transformFieldValueForStructure(fieldConfig, value) {
        const baseTransform = {
            id: fieldConfig.id,
            type: fieldConfig.type,
            label: this.getText(`fields.${fieldConfig.id}`) || fieldConfig.label,
            rawValue: value,
            displayValue: this.extractValue(value)
        };

        // Add type-specific transformations
        switch (fieldConfig.type) {
            case 'yesno-with-options':
                if (typeof value === 'object' && value.main !== undefined) {
                    baseTransform.mainSelection = value.main;
                    baseTransform.conditionalValues = {
                        yesValues: value.yesValues || {},
                        noValues: value.noValues || {}
                    };
                }
                break;
                
            case 'multiselect':
            case 'multiselect-with-other':
                if (Array.isArray(value)) {
                    baseTransform.selectedCount = value.length;
                    baseTransform.selectedItems = value;
                }
                break;
                
            case 'select-with-other':
                if (typeof value === 'object' && value.main) {
                    baseTransform.mainSelection = value.main;
                    baseTransform.otherValue = value.other || null;
                    baseTransform.isOther = value.main === 'other';
                }
                break;
        }

        return baseTransform;
    }

    /**
     * Generates metadata for the submission
     */
    generateSubmissionMetadata(flatData, originalFormValues) {
        const metadata = {
            formStructure: this.state.isSingleStep ? 'single-step' : 'multi-step',
            totalSteps: this.formConfig.steps?.length || 1,
            completedFields: Object.keys(originalFormValues).filter(key => {
                const value = originalFormValues[key];
                return value !== undefined && value !== null && value !== '' && 
                       !(Array.isArray(value) && value.length === 0);
            }).length,
            totalFields: this.getTotalFieldCount(),
            completionPercentage: this.calculateCompletionPercentage(originalFormValues),
            submissionQuality: this.assessSubmissionQuality(originalFormValues),
            deviceInfo: {
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            }
        };

        return metadata;
    }

    /**
     * Helper methods for metadata generation
     */
    getTotalFieldCount() {
        return this.formConfig.steps?.reduce((total, step) => {
            return total + (step.fields?.length || 0);
        }, 0) || 0;
    }

    calculateCompletionPercentage(formValues) {
        const totalFields = this.getTotalFieldCount();
        const completedFields = Object.keys(formValues).filter(key => {
            const value = formValues[key];
            return value !== undefined && value !== null && value !== '' && 
                   !(Array.isArray(value) && value.length === 0);
        }).length;
        
        return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
    }

    assessSubmissionQuality(formValues) {
        const completionPercentage = this.calculateCompletionPercentage(formValues);
        const requiredFieldsCompleted = this.checkRequiredFieldsCompletion(formValues);
        
        if (completionPercentage >= 90 && requiredFieldsCompleted) return 'excellent';
        if (completionPercentage >= 70 && requiredFieldsCompleted) return 'good';
        if (completionPercentage >= 50) return 'fair';
        return 'basic';
    }

    checkRequiredFieldsCompletion(formValues) {
        const requiredFields = [];
        this.formConfig.steps?.forEach(step => {
            step.fields?.forEach(field => {
                if (field.required) {
                    requiredFields.push(field.id);
                }
            });
        });
        
        return requiredFields.every(fieldId => {
            const value = formValues[fieldId];
            return value !== undefined && value !== null && value !== '' && 
                   !(Array.isArray(value) && value.length === 0);
        });
    }

    // ============================================================================
    // BOOKING-SPECIFIC METHODS
    // ============================================================================

    updateCalendarConfiguration(selectedService) {
        if (!this.isBookingForm || !selectedService) return;
        
        this.logger.info('Updating calendar configuration with service:', selectedService);
        
        const calendarField = this.getCalendarFieldInstance();
        
        if (calendarField) {
            this.logger.info('Found calendar field, updating configuration...');
            
            calendarField.apiKey = this.config.apiKey;
            calendarField.timezone = this.config.timezone;
            calendarField.eventTypeId = selectedService.eventTypeId;
            calendarField.eventTypeSlug = selectedService.eventTypeSlug;
            calendarField.scheduleId = selectedService.scheduleId;
            calendarField.eventName = selectedService.eventName || selectedService.title;
            calendarField.serviceProvider = selectedService.provider || "SkaLean";
            calendarField.serviceName = selectedService.title;
            calendarField.mode = 'booking';
            
            calendarField.state.selectedDate = null;
            calendarField.state.selectedTime = null;
            calendarField.state.availableSlots = {};
            
            if (calendarField.updateCalendarHeader) {
                calendarField.updateCalendarHeader();
            }
            
            calendarField.init().then(() => {
                if (calendarField.element) {
                    calendarField.renderCalendarData();
                }
                this.logger.success('Calendar reinitialized with new service configuration');
            }).catch(error => {
                this.logger.error('Error reinitializing calendar:', error);
            });
        } else {
            this.logger.info('Calendar field not found, will be configured when calendar step is reached');
        }
    }

    getCalendarFieldInstance() {
        if (!this.isBookingForm) return null;
        
        // For single step forms
        if (this.state.isSingleStep && this.singleStepForm) {
            const calendarField = this.singleStepForm.fieldInstances.find(field => 
                field.constructor.name === 'CalendarField'
            );
            if (calendarField) return calendarField;
        }
        
        // For multi-step forms
        if (this.multiStepForm) {
            for (let stepIndex = 0; stepIndex < this.multiStepForm.stepInstances.length; stepIndex++) {
                const stepInstance = this.multiStepForm.stepInstances[stepIndex];
                if (stepInstance && stepInstance.fieldInstances) {
                    const calendarField = stepInstance.fieldInstances.find(field => 
                        field.constructor.name === 'CalendarField'
                    );
                    if (calendarField) return calendarField;
                }
            }
        }
        
        return null;
    }

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
    // ENHANCED EVENT HANDLERS
    // ============================================================================

    handleFieldChange = (name, value) => {
        this.formValues[name] = value;
        this.logger.info(`Field ${name} changed:`, { value, extracted: this.extractValue(value) });
        
        if (this.isBookingForm && name === 'serviceSelection' && value) {
            this.logger.info('Service selected:', value);
            this.updateCalendarConfiguration(value);
        }
    };

    // ============================================================================
    // ENHANCED SUBMISSION HANDLING WITH COMPREHENSIVE LOGGING
    // ============================================================================

    handleSubmission = async (formData) => {
        this.logger.info('🚀 Starting enhanced submission process...', {
            formType: this.config.formType,
            webhookEnabled: this.config.webhookEnabled,
            voiceflowEnabled: this.config.voiceflowEnabled,
            useStructuredData: this.config.useStructuredData,
            hasStructuredTransformer: typeof this.config.structuredDataTransformer === 'function',
            hasVoiceflowTransformer: typeof this.config.voiceflowDataTransformer === 'function'
        });

        // Log the raw form data received
        this.logger.info('📥 Raw form data received:', formData);
        this.logger.info('📋 Current form values in state:', this.formValues);

        const submitButton = this.getSubmitButton();
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = this.getText('nav.processing');
        }

        try {
            let submissionData;
            let shouldSendToWebhook = false;
            
            if (this.isBookingForm) {
                this.logger.info('Processing booking form submission...');
                const calendarField = this.getCalendarFieldInstance();
                if (!calendarField) {
                    throw new Error('Calendar field not found');
                }

                const bookingResponse = await calendarField.createBooking(
                    formData.appointment.selectedTime,
                    `${formData.firstName} ${formData.lastName}`,
                    formData.email
                );

                if (!bookingResponse) {
                    throw new Error('Booking creation failed');
                }

                submissionData = this.prepareBookingDataForSubmission(formData, bookingResponse);
                shouldSendToWebhook = this.config.webhookEnabled && this.config.webhookUrl;
            } else {
                this.logger.info('Processing regular form submission...');
                submissionData = this.prepareDataForSubmission(formData);
                shouldSendToWebhook = this.config.webhookEnabled && this.config.webhookUrl;
            }

            this.logger.info('📦 Prepared submission data:', submissionData);

            // ============================================================================
            // WEBHOOK SUBMISSION
            // ============================================================================
            if (shouldSendToWebhook) {
                this.logger.webhook('Sending data to webhook...', {
                    url: this.config.webhookUrl,
                    dataType: this.config.useStructuredData ? 'structured' : 'flat'
                });

                try {
                    const webhookStartTime = Date.now();
                    const response = await fetch(this.config.webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(submissionData)
                    });

                    const webhookDuration = Date.now() - webhookStartTime;

                    if (response.ok) {
                        this.logger.webhook(`✅ Webhook submission successful (${webhookDuration}ms)`);
                    } else {
                        this.logger.webhook(`⚠️ Webhook submission failed (${webhookDuration}ms)`, {
                            status: response.status,
                            statusText: response.statusText
                        });
                    }
                } catch (webhookError) {
                    this.logger.webhook('❌ Webhook submission error', webhookError);
                }
            } else {
                this.logger.info('Webhook sending disabled or no webhook URL provided');
            }
            
            this.clearSessionTimers();
            this.state.formSubmitted = true;
            this.showSuccessScreen();
            
            // ============================================================================
            // ENHANCED VOICEFLOW SUBMISSION WITH SEPARATE LOGIC
            // ============================================================================
            if (this.config.voiceflowEnabled) {
                this.logger.voiceflow('Voiceflow integration enabled - preparing data...');
                
                let voiceflowPayload = submissionData;
                
                // Apply Voiceflow-specific transformation if provided
                if (this.config.voiceflowDataTransformer && typeof this.config.voiceflowDataTransformer === 'function') {
                    this.logger.voiceflow('Using custom Voiceflow data transformer');
                    try {
                        const transformStartTime = Date.now();
                        voiceflowPayload = this.config.voiceflowDataTransformer(submissionData, formData, this);
                        const transformDuration = Date.now() - transformStartTime;
                        
                        this.logger.transformation(submissionData, voiceflowPayload);
                        this.logger.voiceflow(`✅ Voiceflow transformation completed (${transformDuration}ms)`);
                    } catch (transformError) {
                        this.logger.voiceflow('❌ Error in Voiceflow transformer:', transformError);
                        voiceflowPayload = submissionData; // Fallback
                    }
                } else {
                    this.logger.voiceflow('No custom transformer found, using original submission data');
                }
                
                // Send to Voiceflow
                if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
                    try {
                        const voiceflowStartTime = Date.now();
                        
                        this.logger.voiceflow('📤 Sending data to Voiceflow...', {
                            payload: voiceflowPayload,
                            interactionType: 'success'
                        });
                        
                        window.voiceflow.chat.interact({ 
                            type: "success", 
                            payload: voiceflowPayload 
                        });
                        
                        const voiceflowDuration = Date.now() - voiceflowStartTime;
                        this.logger.voiceflow(`✅ Voiceflow interaction completed (${voiceflowDuration}ms)`);
                        
                    } catch (voiceflowError) {
                        this.logger.voiceflow('❌ Voiceflow interaction error', voiceflowError);
                    }
                } else {
                    this.logger.warning('Voiceflow not available in window object');
                    this.logger.info('💡 Generated payload that would be sent to Voiceflow:', voiceflowPayload);
                }
            } else {
                this.logger.info('Voiceflow integration disabled');
            }

            this.logger.success('🎉 Enhanced submission completed successfully!');
            return submissionData;
            
        } catch (error) {
            this.logger.error('Enhanced submission failed:', error);
            
            if (submitButton) {
                const errorMessage = this.isBookingForm ? 
                    (this.getText('errors.bookingError') || 'Booking error. Please try again.') :
                    'Submission error. Please try again.';
                submitButton.textContent = errorMessage;
                submitButton.disabled = false;
            }
            throw error;
        }
    };

    getSubmitButton() {
        if (this.state.isSingleStep && this.singleStepForm) {
            return this.singleStepForm.submitButton; // Can be null if showSubmitButton is false
        }
        return document.querySelector('.btn-submit');
    }

    // ============================================================================
    // PUBLIC API FOR EXTERNAL SUBMISSION
    // ============================================================================

    // Public method to trigger form submission programmatically
    async submitForm() {
        if (this.state.isSingleStep && this.singleStepForm) {
            // Validate all fields
            let isValid = true;
            this.singleStepForm.fieldInstances.forEach(field => {
                if (!field.validate()) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Collect form data
                const formData = {};
                this.singleStepForm.fieldInstances.forEach(field => {
                    formData[field.name] = field.getValue();
                });

                // Submit
                return await this.handleSubmission(formData);
            } else {
                throw new Error('Form validation failed');
            }
        } else if (this.multiStepForm) {
            // For multi-step forms, delegate to the multistep form
            return await this.multiStepForm.submitForm();
        }
        throw new Error('Form not initialized');
    }

    // Public method to validate form without submitting
    validateForm() {
        if (this.state.isSingleStep && this.singleStepForm) {
            return this.singleStepForm.fieldInstances.every(field => field.validate());
        } else if (this.multiStepForm) {
            return this.multiStepForm.validateAllSteps();
        }
        return false;
    }

    // ============================================================================
    // SESSION MANAGEMENT
    // ============================================================================

    setupSessionManagement() {
        if (!this.config.enableSessionTimeout) {
            this.logger.info('Session timeout disabled');
            return;
        }
        
        this.logger.info('Setting up session management:', {
            warningTime: this.config.sessionWarning,
            timeoutTime: this.config.sessionTimeout
        });
        
        this.warningTimer = setTimeout(() => this.showSessionWarning(), this.config.sessionWarning);
        this.sessionTimer = setTimeout(() => this.disableFormOnTimeout(), this.config.sessionTimeout);
    }

    showSessionWarning() {
        if (this.state.formSubmitted || this.state.sessionExpired) return;
        this.logger.warning('Session warning displayed');
        const warningDiv = document.createElement('div');
        warningDiv.className = 'session-warning';
        warningDiv.innerHTML = `<div style="display: flex; align-items: center; margin-bottom: 10px;"><span style="font-size: 20px; margin-right: 10px;">⚠️</span><strong>Session Warning</strong></div><p style="margin: 0; font-size: 14px;">Your session will expire in 2 minutes.</p>`;
        document.body.appendChild(warningDiv);
        setTimeout(() => warningDiv.remove(), 30000);
    }

    disableFormOnTimeout() {
        if (this.state.formSubmitted || this.state.sessionExpired) return;
        this.state.sessionExpired = true;
        this.logger.warning('Session expired - disabling form');
        
        const formContainer = this.state.isSingleStep ? 
            this.singleStepForm?.container : 
            this.multiStepForm?.container;
            
        if (formContainer) {
            formContainer.querySelectorAll('input, select, button, textarea, [contenteditable]')
                .forEach(el => {
                    el.disabled = true;
                    el.style.opacity = '0.5';
                    el.style.pointerEvents = 'none';
                });
            this.showTimeoutOverlay();
        }
    }

    clearSessionTimers() {
        this.logger.info('Clearing session timers');
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

    // ============================================================================
    // UI STATES
    // ============================================================================

    showSuccessScreen() {
        const formContainer = this.state.isSingleStep ? 
            this.singleStepForm?.container : 
            this.multiStepForm?.container;
            
        if (formContainer) formContainer.style.display = 'none';
        
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
        this.logger.success('Success screen displayed');
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

    // ============================================================================
    // MAIN RENDER METHOD - Enhanced for single/multistep support
    // ============================================================================

    async render(element) {
        try {
            this.logger.info('🎬 Starting form render process...');
            await this.loadCSS();
            
            this.container = document.createElement('div');
            this.container.className = this.isBookingForm ? 'booking-form-extension' : 'submission-form-extension';
            this.container.id = this.isBookingForm ? 'booking-form-root' : 'submission-form-root';

            // Enhanced FormFieldFactory configuration
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

            if (this.state.isSingleStep) {
                // Create single step form
                this.logger.info('Creating single step form with row support and optional submit button');
                const singleStepContainer = this.createSingleStepForm();
                this.container.appendChild(singleStepContainer);
            } else {
                // Create multi-step form
                this.logger.info('Creating multi-step form');
                const formConfig = {
                    showProgress: true,
                    saveProgress: false,
                    validateOnNext: true,
                    steps: this.createFormSteps(),
                    onSubmit: this.handleSubmission,
                    onStepChange: (stepIndex, stepInstance) => { 
                        this.state.currentStep = stepIndex;
                        this.logger.info(`Step changed to ${stepIndex + 1}`);
                        
                        if (this.isBookingForm && this.formValues.serviceSelection) {
                            const calendarStepIndex = this.formConfig.steps.findIndex(step => 
                                step.fields.some(field => field.type === 'calendar')
                            );
                            
                            if (stepIndex === calendarStepIndex) {
                                this.logger.info('Reached calendar step, applying service configuration...');
                                setTimeout(() => {
                                    this.updateCalendarConfiguration(this.formValues.serviceSelection);
                                }, 100);
                            }
                        }
                        
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
            }

            element.appendChild(this.container);
            this.setupSessionManagement();
            this.state.initialized = true;

            this.logger.success('🎊 Form rendered successfully!');
            return this.createPublicAPI();
        } catch (error) {
            this.logger.error('Failed to render form:', error);
            const errorMessage = this.isBookingForm ? 'Failed to load booking form' : 'Failed to load submission form';
            element.innerHTML = `<div class="error-state">${errorMessage}</div>`;
            return { destroy: () => {} };
        }
    }

    // ============================================================================
    // PUBLIC API
    // ============================================================================

    createPublicAPI() {
        return {
            destroy: () => this.destroy(),
            getCurrentStep: () => this.state.currentStep,
            getFormData: () => {
                if (this.state.isSingleStep && this.singleStepForm) {
                    const data = {};
                    this.singleStepForm.fieldInstances.forEach(field => {
                        data[field.name] = field.getValue();
                    });
                    return data;
                }
                return this.multiStepForm?.getFormData() || {};
            },
            getSummaryData: () => this.generateSummaryData(),
            isInitialized: () => this.state.initialized,
            isSubmitted: () => this.state.formSubmitted,
            isBookingForm: () => this.isBookingForm,
            isSingleStep: () => this.state.isSingleStep,
            reset: () => this.reset(),
            // Enhanced public API for external control
            submitForm: () => this.submitForm(),
            validateForm: () => this.validateForm(),
            hasSubmitButton: () => this.config.showSubmitButton,
            // Booking-specific API methods
            getCalendarField: () => this.isBookingForm ? this.getCalendarFieldInstance() : null,
            updateCalendar: (serviceData) => this.isBookingForm ? this.updateCalendarConfiguration(serviceData) : null,
            // Configuration info
            getConfig: () => ({
                webhookEnabled: this.config.webhookEnabled,
                voiceflowEnabled: this.config.voiceflowEnabled,
                useStructuredData: this.config.useStructuredData,
                formType: this.config.formType,
                formStructure: this.state.isSingleStep ? 'single' : 'multistep',
                showSubmitButton: this.config.showSubmitButton,
                hasStructuredTransformer: typeof this.config.structuredDataTransformer === 'function',
                hasVoiceflowTransformer: typeof this.config.voiceflowDataTransformer === 'function',
                enableDetailedLogging: this.config.enableDetailedLogging
            }),
            // Enhanced testing and debugging methods
            testStructuredTransformer: (testData) => {
                if (this.config.structuredDataTransformer && typeof this.config.structuredDataTransformer === 'function') {
                    try {
                        return this.config.structuredDataTransformer(testData, testData, this);
                    } catch (error) {
                        this.logger.error('Error testing structured transformer:', error);
                        return null;
                    }
                }
                return null;
            },
            testVoiceflowTransformer: (testData) => {
                if (this.config.voiceflowDataTransformer && typeof this.config.voiceflowDataTransformer === 'function') {
                    try {
                        return this.config.voiceflowDataTransformer(testData, testData, this);
                    } catch (error) {
                        this.logger.error('Error testing Voiceflow transformer:', error);
                        return null;
                    }
                }
                return null;
            },
            // Logging control methods
            enableLogging: () => {
                this.config.enableDetailedLogging = true;
                this.logger.info('Detailed logging enabled');
            },
            disableLogging: () => {
                this.config.enableDetailedLogging = false;
                console.log('📋 CreatForm: Detailed logging disabled');
            },
            // Data inspection methods
            inspectFormValues: () => {
                this.logger.info('Current form values:', this.formValues);
                return this.formValues;
            },
            inspectSubmissionData: () => {
                const data = this.state.isSingleStep ? this.getFormData() : this.multiStepForm?.getFormData() || {};
                const prepared = this.prepareDataForSubmission(data);
                this.logger.info('Prepared submission data:', prepared);
                return prepared;
            }
        };
    }

    reset() {
        this.logger.info('Resetting form...');
        this.clearSessionTimers();
        this.state = { 
            ...this.state, 
            initialized: false, 
            formSubmitted: false, 
            sessionExpired: false, 
            currentStep: 0 
        };
        
        if (this.state.isSingleStep && this.singleStepForm) {
            this.singleStepForm.fieldInstances.forEach(field => {
                field.setValue('');
                field.hideError();
            });
        } else if (this.multiStepForm) {
            this.multiStepForm.reset();
        }
        
        this.setupSessionManagement();
        this.logger.success('Form reset completed');
    }

    destroy() {
        this.logger.info('Destroying form...');
        this.clearSessionTimers();
        this.factory?.destroy();
        if (this.multiStepForm) {
            this.multiStepForm.clearSavedProgress();
        }
        this.elements.clear();
        this.container?.remove();
        const styleClass = this.isBookingForm ? 'booking-form-styles' : 'submission-form-styles';
        document.querySelector(`.${styleClass}`)?.remove();
        this.logger.success('Form destroyed successfully');
    }
}

/**
 * OPTIMIZED CALENDAR FIELDS - Unified approach using CalendarField as base
 * Eliminates code duplication and provides consistent interface
 */

/**
 * Enhanced CalendarField - Base class with optional service/provider selection
 * Replaces the need for three separate classes with configuration-driven approach
 */

class CalendarField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Core calendar configuration
        this.timezone = config.timezone || 'America/Toronto';
        this.language = config.language || 'en';
        this.mode = config.mode || 'booking'; // 'booking' or 'reschedule'
        
        // Reschedule mode configuration  
        this.currentAppointment = config.currentAppointment || null; // For reschedule mode
        
        // Selection mode determines what UI to show
        this.selectionMode = config.selectionMode || 'none'; 
        // Options: 'none', 'provider', 'service-provider'
        
        // Service and provider data
        this.rawServiceProviders = config.serviceProviders || config.dentistsInfo || {};
        this.availableServices = [];
        this.filteredProviders = [];
        
        // Selection state
        this.selectedService = config.selectedService || config.serviceName || '';
        this.selectedProviderId = config.selectedProviderId || '';
        
        // Current active configuration (what the calendar uses)
        this.currentProvider = null;
        this.currentServiceConfig = null;
        this.apiKey = config.apiKey || '';
        this.eventTypeId = config.eventTypeId || null;
        this.eventTypeSlug = config.eventTypeSlug || '';
        this.scheduleId = config.scheduleId || null;
        this.eventName = config.eventName || '';
        
        // Direct provider configuration (for direct mode and reschedule)
        this.serviceProvider = config.serviceProvider || '';
        
        // UI Configuration
        this.headerIcon = config.headerIcon || 'CALENDAR';
        this.showProviderInfo = config.showProviderInfo !== false;
        this.placeholderText = config.placeholderText || '';
        
        // Selection fields (created as needed)
        this.serviceSelectField = null;
        this.providerSelectField = null;
        
        // Calendar state
        this.state = {
            currentDate: new Date(),
            selectedDate: null,
            selectedTime: null,
            availableSlots: {},
            workingDays: [1, 2, 3, 4, 5],
            isConfirmed: false,
            isLoading: false
        };
        
        // Store full config for reference
        this.fullConfig = config;
        
        this.init();
    }

    // Initialize based on selection mode
    async init() {
        if (this.selectionMode === 'none') {
            // Direct calendar mode - provider config should already be set
            await this.initializeCalendar();
        } else if (this.selectionMode === 'provider') {
            // Provider selection mode - extract services and filter providers
            this.initializeProviderSelection();
        } else if (this.selectionMode === 'service-provider') {
            // Service + provider selection mode
            this.initializeServiceAndProviderSelection();
        }
    }

    // Direct calendar initialization (original CalendarField behavior)
    async initializeCalendar() {
        if (this.scheduleId && this.apiKey) {
            this.state.workingDays = await this.fetchWorkingDays(this.scheduleId);
            if (!this.state.selectedDate) {
                this.state.selectedDate = this.getDefaultActiveDay();
                const dayKey = this.formatDate(this.state.selectedDate);
                const slots = await this.fetchAvailableSlots(dayKey);
                this.state.availableSlots[dayKey] = slots;
            }
        }
    }

    // Provider selection initialization (ProviderCalendarField behavior)
    initializeProviderSelection() {
        if (!this.selectedService) {
            console.error('Provider selection mode requires selectedService to be set');
            return;
        }
        
        this.filteredProviders = this.filterProvidersByService(this.selectedService);
        
        // Auto-select if only one provider offers the service
        if (this.filteredProviders.length === 1) {
            this.selectedProviderId = this.filteredProviders[0].id;
            this.selectProvider(this.selectedProviderId, false);
        } else if (this.selectedProviderId) {
            this.selectProvider(this.selectedProviderId, false);
        }
    }

    // Service + provider selection initialization (ServiceAndProviderCalendarField behavior)
    initializeServiceAndProviderSelection() {
        this.availableServices = this.extractAvailableServices(this.rawServiceProviders);
        
        if (this.selectedService) {
            this.filteredProviders = this.filterProvidersByService(this.selectedService);
            if (this.selectedProviderId) {
                this.selectProvider(this.selectedProviderId, false);
            }
        }
    }

    // ===============================
    // SERVICE AND PROVIDER UTILITIES
    // ===============================

    // Extract all available services from providers data
    extractAvailableServices(rawProviders) {
        const serviceSet = new Set();
        
        try {
            const providersArray = Array.isArray(rawProviders) ? rawProviders : Object.entries(rawProviders);
            
            providersArray.forEach(([providerName, providerData]) => {
                if (Array.isArray(rawProviders) && typeof providerName === 'object') {
                    providerData = providerName;
                    providerName = providerData.name || providerData.id;
                }
                
                if (providerData && providerData.services) {
                    Object.keys(providerData.services).forEach(service => {
                        serviceSet.add(service);
                    });
                }
            });
        } catch (error) {
            console.error('Error extracting services:', error);
        }
        
        return Array.from(serviceSet).sort().map(service => ({
            id: this.slugify(service),
            name: service,
            displayName: service
        }));
    }

    // Filter providers that offer the specific service
    filterProvidersByService(serviceName) {
        if (!serviceName || !this.rawServiceProviders) {
            return [];
        }

        const filteredProviders = [];
        const providersArray = Array.isArray(this.rawServiceProviders) ? 
            this.rawServiceProviders : Object.entries(this.rawServiceProviders);
        
        providersArray.forEach(([providerName, providerData]) => {
            if (Array.isArray(this.rawServiceProviders) && typeof providerName === 'object') {
                providerData = providerName;
                providerName = providerData.name || providerData.id;
            }
            
            if (providerData.services && providerData.services[serviceName]) {
                const serviceConfig = providerData.services[serviceName];
                
                filteredProviders.push({
                    id: this.slugify(providerName),
                    name: providerName,
                    displayName: providerName,
                    description: providerData.description || providerData.specialty || "",
                    apiKey: providerData.apiKey || "",
                    scheduleId: providerData.scheduleId || "",
                    eventTypeId: serviceConfig.eventId || "",
                    eventTypeSlug: serviceConfig.eventSlug || "",
                    eventName: serviceName,
                    link: serviceConfig.link || "",
                    serviceConfig: serviceConfig,
                    allServices: providerData.services
                });
            }
        });
        
        return filteredProviders;
    }

    // Helper to create URL-friendly slugs
    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') 
            .replace(/[\s_-]+/g, '-') 
            .replace(/^-+|-+$/g, '');
    }

    // ===============================
    // SELECTION METHODS
    // ===============================

    // Select service (for service-provider mode)
    selectService(serviceId) {
        
        const service = this.availableServices.find(s => s.id === serviceId);
        if (!service) {
            console.error('Service not found:', serviceId);
            return;
        }
        
        this.selectedService = service.name;
        this.filteredProviders = this.filterProvidersByService(service.name);
        
        // Update provider dropdown
        this.updateProviderOptions();
        this.showProviderSelection();
        
        // Reset provider and calendar state
        this.resetProviderAndCalendar();
        
        // Auto-select if only one provider
        if (this.filteredProviders.length === 1) {
            this.selectProvider(this.filteredProviders[0].id);
            if (this.providerSelectField) {
                this.providerSelectField.setValue(this.filteredProviders[0].id);
            }
        }
        
        this.updateCalendarHeader();
        this.renderCalendarData();
    }

    // Select provider
    async selectProvider(providerId, shouldUpdateUI = true) {
        
        const provider = this.filteredProviders.find(p => p.id === providerId);
        if (!provider) {
            console.error('Provider not found:', providerId);
            return;
        }
        
        // Update current configuration
        this.selectedProviderId = providerId;
        this.currentProvider = provider;
        this.currentServiceConfig = provider.serviceConfig;
        this.apiKey = provider.apiKey || '';
        this.eventTypeId = provider.eventTypeId || null;
        this.eventTypeSlug = provider.eventTypeSlug || '';
        this.scheduleId = provider.scheduleId || null;
        this.eventName = provider.eventName || this.selectedService || '';
        
        // Reset calendar state
        this.resetCalendarState();
        
        if (shouldUpdateUI && this.element) {
            this.showLoadingState();
        }
        
        // Initialize calendar with new provider
        await this.initializeCalendar();
        
        if (shouldUpdateUI && this.element) {
            this.updateCalendarHeader();
            this.renderCalendarData();
        }
        
        this.updateValue();
        
        if (this.fullConfig.onProviderChange) {
            this.fullConfig.onProviderChange(provider);
        }
    }

    // ===============================
    // UI CREATION METHODS
    // ===============================

    // Create service selection field
    createServiceSelectField() {
        if (this.selectionMode !== 'service-provider') return null;
        
        this.serviceSelectField = new SingleSelectField(this.factory, {
            id: `${this.id}-service`,
            name: `${this.name}_service`,
            label: this.getText('selectService'),
            placeholder: this.getText('selectServicePlaceholder'),
            options: this.availableServices,
            required: true,
            onChange: (value) => this.selectService(value)
        });

        if (this.selectedService) {
            const serviceOption = this.availableServices.find(s => s.name === this.selectedService);
            if (serviceOption) {
                this.serviceSelectField.setValue(serviceOption.id);
            }
        }

        return this.serviceSelectField;
    }

    // Create provider selection field
    createProviderSelectField() {
        if (this.selectionMode === 'none') return null;
        
        this.providerSelectField = new SingleSelectField(this.factory, {
            id: `${this.id}-provider`,
            name: `${this.name}_provider`,
            label: this.getText('selectProvider'),
            placeholder: this.getText('selectProviderPlaceholder'),
            options: this.filteredProviders,
            required: true,
            onChange: (value) => this.selectProvider(value)
        });

        if (this.selectedProviderId) {
            this.providerSelectField.setValue(this.selectedProviderId);
        }

        return this.providerSelectField;
    }

    // Update provider options dynamically
    updateProviderOptions() {
        if (!this.providerSelectField) return;

        const providerContainer = this.element.querySelector('.provider-select-container');
        if (!providerContainer) return;

        const currentValue = this.selectedProviderId;
        providerContainer.innerHTML = '';

        this.providerSelectField = new SingleSelectField(this.factory, {
            id: `${this.id}-provider`,
            name: `${this.name}_provider`,
            label: this.getText('selectProvider'),
            placeholder: this.getText('selectProviderPlaceholder'),
            options: this.filteredProviders,
            required: true,
            onChange: (value) => this.selectProvider(value)
        });

        const newFieldElement = this.providerSelectField.render();
        newFieldElement.className = 'provider-select-container';
        providerContainer.parentNode.replaceChild(newFieldElement, providerContainer);

        if (currentValue && this.filteredProviders.find(p => p.id === currentValue)) {
            this.providerSelectField.setValue(currentValue);
        }
    }

    // Show provider selection container
    showProviderSelection() {
        const providerContainer = this.element.querySelector('.provider-select-container');
        if (providerContainer) {
            providerContainer.style.display = 'block';
        }
    }

    // ===============================
    // STATE MANAGEMENT
    // ===============================

    resetProviderAndCalendar() {
        this.selectedProviderId = '';
        this.currentProvider = null;
        this.resetCalendarState();
    }

    resetCalendarState() {
        this.state.selectedDate = null;
        this.state.selectedTime = null;
        this.state.availableSlots = {};
    }

    showLoadingState() {
        const daysEl = this.element.querySelector('.days');
        const timeSlotsEl = this.element.querySelector('.time-slots');
        
        if (daysEl) {
            daysEl.innerHTML = '<div class="loading-message">Loading availability...</div>';
        }
        
        if (timeSlotsEl) {
            timeSlotsEl.innerHTML = '<div class="loading-message">Loading...</div>';
        }
    }

    updateCalendarHeader() {
        if (!this.element) return;
        
        const headerElement = this.element.querySelector('.calendar-title');
        if (headerElement) {
            headerElement.innerHTML = this.generateCalendarHeader();
        }
    }

    // ===============================
    // VALIDATION
    // ===============================

    validate() {
        // Check service selection if required
        if (this.selectionMode === 'service-provider' && !this.selectedService) {
            this.showError(this.getFieldErrorMessage('serviceRequired') || 'Please select a service');
            return false;
        }
        
        // Check provider selection if required
        if ((this.selectionMode === 'provider' || this.selectionMode === 'service-provider') && !this.selectedProviderId) {
            this.showError(this.getFieldErrorMessage('providerRequired') || 'Please select a provider');
            return false;
        }
        
        // Check date and time selection
        const isDateTimeValid = !!(this.state.selectedDate && this.state.selectedTime);
        
        if (this.required && !isDateTimeValid) {
            this.showError(this.getFieldErrorMessage('dateTimeRequired') || 'Please select date and time');
            return false;
        }
        
        this.hideError();
        return true;
    }

    // ===============================
    // CALENDAR CORE METHODS (Original CalendarField logic)
    // ===============================

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

    // ===============================
    // LOCALIZATION
    // ===============================

    getText(key) {
        const translations = {
            en: {
                selectService: "Select a service",
                selectServicePlaceholder: "-- Select a service --",
                selectProvider: "Select a service provider",
                selectProviderPlaceholder: "-- Select a provider --",
                selectDate: "Select a date to view available times",
                availableTimesFor: "Available times for",
                noAvailableSlots: "No available time slots for this date",
                pleaseSelectDate: "Please select a date first",
                pleaseSelectService: "Please select a service first",
                pleaseSelectProvider: "Please select a service provider first",
                weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                currentAppointment: "Current Appointment",
                newAppointment: "New Appointment"
            },
            fr: {
                selectService: "Sélectionner un service",
                selectServicePlaceholder: "-- Sélectionner un service --",
                selectProvider: "Sélectionner un fournisseur de services",
                selectProviderPlaceholder: "-- Sélectionner un fournisseur --",
                selectDate: "Sélectionnez une date pour voir les horaires disponibles",
                availableTimesFor: "Disponibilités pour",
                noAvailableSlots: "Aucun horaire disponible pour cette date",
                pleaseSelectDate: "Veuillez d'abord sélectionner une date",
                pleaseSelectService: "Veuillez d'abord sélectionner un service",
                pleaseSelectProvider: "Veuillez d'abord sélectionner un fournisseur de services",
                weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                currentAppointment: "Rendez-vous Actuel",
                newAppointment: "Nouveau Rendez-vous"
            }
        };
        return translations[this.language]?.[key] || key;
    }

    // ===============================
    // RESCHEDULE MODE FORMATTING
    // ===============================

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

    // ===============================
    // HEADER GENERATION
    // ===============================

    generateCalendarHeader() {
        const iconSvg = this.factory.SVG_ICONS[this.headerIcon] || this.factory.SVG_ICONS.CALENDAR;
        
        if (!this.showProviderInfo) {
            return '';
        }

        // RESCHEDULE MODE - Show current appointment details
        if (this.mode === 'reschedule' && this.currentAppointment) {
            const displayProvider = this.currentProvider?.displayName || 
                                   this.currentProvider?.name || 
                                   this.currentProvider?.id || 
                                   this.serviceProvider ||
                                   'Service Provider';
            
            
            return `
                <div class="calendar-title-content">
                    <div class="service-provider">
                        <span class="provider-icon">${iconSvg}</span>
                        <div class="appointment-details">
                            <div class="provider-name">${displayProvider}</div>
                            ${this.selectedService ? `<div class="service-name">${this.selectedService}</div>` : ''}
                            <div class="current-appointment">${this.formatCurrentAppointment()}</div>
                        </div>
                    </div>
                </div>
            `;
        } 
        // BOOKING MODE - Show service and provider selection
        else {
            let headerHtml = `
                <div class="service-provider">
                    <span class="provider-icon">${iconSvg}</span>
                    <div class="appointment-details">
            `;
            
            // Show selected service
            if (this.selectedService) {
                headerHtml += `<div class="service-name">${this.selectedService}</div>`;
            }
            
            // Show selected provider
            if (this.currentProvider) {
                const displayName = this.currentProvider.displayName || this.currentProvider.name || this.currentProvider.id;
                headerHtml += `<div class="provider-name">${displayName}</div>`;
            } else if (this.serviceProvider) {
                // Fallback to direct serviceProvider config
                headerHtml += `<div class="provider-name">${this.serviceProvider}</div>`;
            }

            headerHtml += `
                    </div>
                </div>
            `;

            return headerHtml;
        }
    }

    // ===============================
    // RENDER METHODS
    // ===============================

    render() {
        const container = this.createContainer();
        
        // Create service selection field if needed
        if (this.selectionMode === 'service-provider') {
            this.createServiceSelectField();
            const serviceFieldElement = this.serviceSelectField.render();
            container.appendChild(serviceFieldElement);
        }
        
        // Create provider selection field if needed
        if (this.selectionMode === 'provider' || this.selectionMode === 'service-provider') {
            this.createProviderSelectField();
            const providerFieldElement = this.providerSelectField.render();
            providerFieldElement.classList.add('provider-select-container');
            
            // Hide initially for service-provider mode
            if (this.selectionMode === 'service-provider' && !this.selectedService) {
                providerFieldElement.style.display = 'none';
            }
            
            container.appendChild(providerFieldElement);
        }
        
        // Create the calendar component
        const calendarContainer = document.createElement('div');
        calendarContainer.className = 'calendar-container';
        calendarContainer.innerHTML = `
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
        `;
        
        container.appendChild(calendarContainer);
        
        const errorElement = this.createErrorElement();
        container.appendChild(errorElement);
        
        this.element = container;
        this.calendarContainer = calendarContainer;
        this.element.fieldInstance = this;
        
        this.renderCalendarData();
        this.attachEvents();
        
        return this.element;
    }

    renderCalendarData() {
        if (!this.calendarContainer) return;
        
        const currentDateEl = this.calendarContainer.querySelector('.current-date');
        if (currentDateEl) {
            const dateFormatter = new Intl.DateTimeFormat(this.language === "fr" ? "fr-CA" : "en-US", { 
                month: "long", year: "numeric" 
            });
            currentDateEl.textContent = dateFormatter.format(this.state.currentDate);
        }
        
        const weekdaysEl = this.calendarContainer.querySelector('.weekdays');
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
        const daysEl = this.calendarContainer.querySelector('.days');
        if (!daysEl) return;
        
        daysEl.innerHTML = '';
        
        // Check selection requirements based on mode
        if (this.selectionMode === 'service-provider' && !this.selectedService) {
            const messageEl = document.createElement('div');
            messageEl.className = 'no-service-message';
            messageEl.textContent = this.getText('pleaseSelectService');
            daysEl.appendChild(messageEl);
            return;
        }
        
        if ((this.selectionMode === 'provider' || this.selectionMode === 'service-provider') && !this.currentProvider) {
            const messageEl = document.createElement('div');
            messageEl.className = 'no-provider-message';
            messageEl.textContent = this.getText('pleaseSelectProvider');
            daysEl.appendChild(messageEl);
            return;
        }
        
        // Render calendar days (rest of the logic same as original)
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
        const timeHeaderEl = this.calendarContainer.querySelector('.time-header');
        const timeSlotsEl = this.calendarContainer.querySelector('.time-slots');
        
        if (!timeHeaderEl || !timeSlotsEl) return;
        
        // Check selection requirements
        if (this.selectionMode === 'service-provider' && !this.selectedService) {
            timeHeaderEl.textContent = this.getText('pleaseSelectService');
            timeSlotsEl.innerHTML = `<div class="no-service-message">${this.getText('pleaseSelectService')}</div>`;
            return;
        }
        
        if ((this.selectionMode === 'provider' || this.selectionMode === 'service-provider') && !this.currentProvider) {
            timeHeaderEl.textContent = this.getText('pleaseSelectProvider');
            timeSlotsEl.innerHTML = `<div class="no-provider-message">${this.getText('pleaseSelectProvider')}</div>`;
            return;
        }
        
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
    
    attachEvents() {
        if (!this.calendarContainer) return;
        
        const prevBtn = this.calendarContainer.querySelector('.prev-btn');
        const nextBtn = this.calendarContainer.querySelector('.next-btn');
        
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
    
    // ===============================
    // VALUE MANAGEMENT
    // ===============================
    
    updateValue() {
        const value = {
            selectedService: this.selectedService,
            selectedProviderId: this.selectedProviderId,
            selectedProvider: this.currentProvider,
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
            selectedService: this.selectedService,
            selectedProviderId: this.selectedProviderId,
            selectedProvider: this.currentProvider,
            serviceProvider: this.serviceProvider,
            selectedDate: this.state.selectedDate,
            selectedTime: this.state.selectedTime,
            formattedDate: this.state.selectedDate ? this.formatDate(this.state.selectedDate) : null,
            formattedTime: this.state.selectedTime ? new Intl.DateTimeFormat(this.language === "fr" ? "fr-CA" : "en-US", { 
                hour: "numeric", minute: "2-digit", hour12: true 
            }).format(new Date(this.state.selectedTime)) : null,
            currentAppointment: this.currentAppointment,
            mode: this.mode
        };
    }
    
    setValue(value) {
        if (value && typeof value === 'object') {
            if (value.selectedService && this.selectionMode === 'service-provider') {
                const serviceOption = this.availableServices.find(s => s.name === value.selectedService);
                if (serviceOption) {
                    this.selectService(serviceOption.id);
                    if (this.serviceSelectField) {
                        this.serviceSelectField.setValue(serviceOption.id);
                    }
                }
            }
            if (value.selectedProviderId && (this.selectionMode === 'provider' || this.selectionMode === 'service-provider')) {
                this.selectProvider(value.selectedProviderId, false);
                if (this.providerSelectField) {
                    this.providerSelectField.setValue(value.selectedProviderId);
                }
            }
            if (value.selectedDate) this.state.selectedDate = new Date(value.selectedDate);
            if (value.selectedTime) this.state.selectedTime = value.selectedTime;
            if (value.currentAppointment) this.currentAppointment = value.currentAppointment;
            if (value.serviceProvider) this.serviceProvider = value.serviceProvider;
            if (this.element) {
                this.updateCalendarHeader();
                this.renderCalendarData();
            }
        }
    }
    
    reset() {
        this.selectedService = '';
        this.selectedProviderId = '';
        this.currentProvider = null;
        this.serviceProvider = '';
        this.filteredProviders = [];
        this.resetCalendarState();
        
        if (this.serviceSelectField) {
            this.serviceSelectField.setValue('');
        }
        if (this.providerSelectField) {
            this.providerSelectField.setValue('');
            
            if (this.selectionMode === 'service-provider') {
                const providerContainer = this.element.querySelector('.provider-select-container');
                if (providerContainer) {
                    providerContainer.style.display = 'none';
                }
            }
        }
        
        this.apiKey = '';
        this.eventTypeId = null;
        this.eventTypeSlug = '';
        this.scheduleId = null;
        this.eventName = '';
        
        if (this.element) {
            this.updateCalendarHeader();
            this.renderCalendarData();
        }
    }
    
    destroy() {
        if (this.serviceSelectField && typeof this.serviceSelectField.destroy === 'function') {
            this.serviceSelectField.destroy();
        }
        if (this.providerSelectField && typeof this.providerSelectField.destroy === 'function') {
            this.providerSelectField.destroy();
        }
        super.destroy();
    }
}

// ===============================
// LEGACY COMPATIBILITY CLASSES
// ===============================

/**
 * ProviderCalendarField - Backward compatibility
 * Now just a wrapper around CalendarField with provider selection mode
 */
class ProviderCalendarField extends CalendarField {
    constructor(factory, config) {
        // Force provider selection mode and set the service
        const enhancedConfig = {
            ...config,
            selectionMode: 'provider',
            selectedService: config.serviceName || config.eventName || ''
        };
        
        super(factory, enhancedConfig);
    }
}

/**
 * ServiceAndProviderCalendarField - Backward compatibility  
 * Now just a wrapper around CalendarField with service-provider selection mode
 */
class ServiceAndProviderCalendarField extends CalendarField {
    constructor(factory, config) {
        // Force service-provider selection mode
        const enhancedConfig = {
            ...config,
            selectionMode: 'service-provider'
        };
        
        super(factory, enhancedConfig);
    }
}

class ServiceRequestCalendarField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Calendar configuration
        this.maxSlots = config.maxSlots || 5;
        this.workingDays = config.workingDays || [1, 2, 3, 4, 5]; // Monday to Friday
        this.timeSlots = config.timeSlots || [
            { id: 'morning', label: { fr: 'Matin', en: 'Morning' }, hours: { fr: '8h00 - 12h00', en: '8:00 AM - 12:00 PM' } },
            { id: 'afternoon', label: { fr: 'Après-midi', en: 'Afternoon' }, hours: { fr: '13h00 - 17h00', en: '1:00 PM - 5:00 PM' } }
        ];
        
        // Current language
        this.language = config.language || 'fr';
        
        // State
        this.state = {
            currentDate: new Date(),
            selectedDate: null,
            selectedTime: null,
            selectedSlots: [] // Array of {date, time, displayText, id}
        };
        
        // SVG Icons
        this.icons = {
            chevron: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
                <g transform="translate(75, 75)">
                    <path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                </g>
            </svg>`,
            sun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                <path fill="#FF9800" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM352 256c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zm32 0c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128z"/>
            </svg>`,
            moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24">
                <path fill="#5E35B1" d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/>
            </svg>`,
            delete: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>`
        };
    }

    getText(key) {
        const translations = {
            fr: {
                selectDateAndTime: "Sélectionnez une date et une heure",
                chooseOption: "Choisissez une option :",
                selectedSlots: "Disponibilités sélectionnées",
                maxSlotsReached: "Maximum 5 disponibilités atteint",
                addThisSlot: "Ajouter cette disponibilité",
                weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
            },
            en: {
                selectDateAndTime: "Select a Date and Time",
                chooseOption: "Choose an option:",
                selectedSlots: "Selected Availabilities",
                maxSlotsReached: "Maximum 5 availabilities reached",
                addThisSlot: "Add this availability",
                weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            }
        };
        return translations[this.language]?.[key] || key;
    }

    validate() {
        if (this.required && this.state.selectedSlots.length === 0) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        this.hideError();
        return true;
    }

    render() {
        const container = this.createContainer();
        
        const calendarContainer = document.createElement('div');
        calendarContainer.className = 'service-calendar-container';
        calendarContainer.innerHTML = `
            <div class="calendar-flex-container">
                <!-- Calendar Column -->
                <div class="calendar-column">
                    <div class="calendar-header">
                        <div class="calendar-title">${this.getText('selectDateAndTime')}</div>
                        <div class="calendar-nav">
                            <button type="button" class="nav-btn prev-btn">
                                <div style="transform: rotate(90deg);">${this.icons.chevron}</div>
                            </button>
                            <div class="current-date"></div>
                            <button type="button" class="nav-btn next-btn">
                                <div style="transform: rotate(-90deg);">${this.icons.chevron}</div>
                            </button>
                        </div>
                    </div>
                    <div class="days-container">
                        <div class="weekdays-container"></div>
                        <div class="calendar-days"></div>
                    </div>
                </div>
                
                <!-- Availability Column -->
                <div class="availability-column">
                    <div class="time-choice-container">
                        <div class="time-choice-label">${this.getText('chooseOption')}</div>
                        <div class="time-choice-options"></div>
                        
                        <button type="button" class="add-slot-btn" disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                            </svg>
                            <span>${this.getText('addThisSlot')}</span>
                        </button>
                        
                        <div class="max-slots-message" style="display: none;">
                            ${this.getText('maxSlotsReached')}
                        </div>
                    </div>
                    
                    <div class="selected-slots-container" style="display: none;">
                        <div class="selected-slots-title">
                            <span>${this.getText('selectedSlots')}</span>
                            <div class="selected-badge">0</div>
                        </div>
                        <div class="selected-slots-list"></div>
                    </div>
                </div>
            </div>
        `;
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(calendarContainer);
        container.appendChild(errorElement);
        
        this.container = container;
        this.calendarContainer = calendarContainer;
        
        this.initializeCalendar();
        this.setupEventListeners();
        
        return container;
    }

    initializeCalendar() {
        this.updateCurrentMonthDisplay();
        this.updateWeekdays();
        this.generateCalendar();
        this.renderTimeChoices();
    }

    updateCurrentMonthDisplay() {
        const monthDisplay = this.calendarContainer.querySelector('.current-date');
        const months = this.getText('months');
        const monthName = months[this.state.currentDate.getMonth()];
        const year = this.state.currentDate.getFullYear();
        monthDisplay.textContent = `${monthName} ${year}`;
    }

    updateWeekdays() {
        const weekdaysContainer = this.calendarContainer.querySelector('.weekdays-container');
        const weekdays = this.getText('weekdays');
        
        weekdaysContainer.innerHTML = '';
        weekdays.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            weekdaysContainer.appendChild(dayDiv);
        });
    }

    generateCalendar() {
        const daysContainer = this.calendarContainer.querySelector('.calendar-days');
        daysContainer.innerHTML = '';
        
        const currentYear = this.state.currentDate.getFullYear();
        const currentMonth = this.state.currentDate.getMonth();
        
        const firstDay = new Date(currentYear, currentMonth, 1);
        const startingDayOfWeek = firstDay.getDay();
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = lastDay.getDate();
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Add empty days for start of month
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day inactive';
            daysContainer.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = day;
            
            if (!this.workingDays.includes(date.getDay())) {
                dayElement.classList.add('weekend');
            } else if (date < today) {
                dayElement.classList.add('inactive');
            } else {
                dayElement.classList.add('available');
                
                if (date.toDateString() === today.toDateString()) {
                    dayElement.classList.add('today');
                }
                
                if (this.state.selectedDate && this.isSameDay(date, this.state.selectedDate)) {
                    dayElement.classList.add('active');
                }
                
                dayElement.addEventListener('click', () => {
                    this.selectDate(date);
                });
            }
            
            daysContainer.appendChild(dayElement);
        }
    }

    renderTimeChoices() {
        const timeChoicesContainer = this.calendarContainer.querySelector('.time-choice-options');
        timeChoicesContainer.innerHTML = '';
        
        this.timeSlots.forEach(slot => {
            const timeChoice = document.createElement('div');
            timeChoice.className = 'time-choice';
            timeChoice.dataset.time = slot.id;
            
            const icon = slot.id === 'morning' ? this.icons.sun : this.icons.moon;
            const label = slot.label[this.language];
            const hours = slot.hours[this.language];
            
            timeChoice.innerHTML = `
                <div class="time-choice-icon">${icon}</div>
                <div class="time-choice-details">
                    <div class="time-choice-title">${label}</div>
                    <div class="time-choice-range">${hours}</div>
                </div>
            `;
            
            timeChoice.addEventListener('click', () => {
                this.selectTime(slot.id);
            });
            
            timeChoicesContainer.appendChild(timeChoice);
        });
    }

    selectDate(date) {
        // Remove active class from all days
        this.calendarContainer.querySelectorAll('.day').forEach(d => d.classList.remove('active'));
        
        // Add active class to clicked day
        const dayElement = Array.from(this.calendarContainer.querySelectorAll('.day')).find(
            el => el.textContent == date.getDate() && el.classList.contains('available')
        );
        if (dayElement) {
            dayElement.classList.add('active');
        }
        
        this.state.selectedDate = new Date(date);
        this.state.selectedTime = null;
        
        this.resetTimeChoices();
        this.updateAddSlotButton();
    }

    selectTime(timeId) {
        if (!this.state.selectedDate) return;
        
        this.resetTimeChoices();
        
        const timeChoice = this.calendarContainer.querySelector(`[data-time="${timeId}"]`);
        if (timeChoice) {
            timeChoice.classList.add('selected');
        }
        
        this.state.selectedTime = timeId;
        this.updateAddSlotButton();
    }

    resetTimeChoices() {
        this.calendarContainer.querySelectorAll('.time-choice').forEach(choice => {
            choice.classList.remove('selected');
        });
    }

    updateAddSlotButton() {
        const addButton = this.calendarContainer.querySelector('.add-slot-btn');
        addButton.disabled = !this.state.selectedDate || !this.state.selectedTime || this.state.selectedSlots.length >= this.maxSlots;
    }

    addSelectedSlot() {
        if (!this.state.selectedDate || !this.state.selectedTime || this.state.selectedSlots.length >= this.maxSlots) {
            return;
        }
        
        const slotId = `${this.formatDate(this.state.selectedDate)}_${this.state.selectedTime}`;
        
        // Check if slot already selected
        if (this.state.selectedSlots.some(slot => slot.id === slotId)) {
            return;
        }
        
        const timeSlot = this.timeSlots.find(slot => slot.id === this.state.selectedTime);
        const formattedDate = this.formatDateForDisplay(this.state.selectedDate);
        const timeLabel = timeSlot.label[this.language] + ' (' + timeSlot.hours[this.language] + ')';
        
        const newSlot = {
            date: new Date(this.state.selectedDate),
            timeOfDay: this.state.selectedTime,
            id: slotId,
            displayText: `${formattedDate} - ${timeLabel}`
        };
        
        this.state.selectedSlots.push(newSlot);
        this.renderSelectedSlots();
        
        // Reset selections
        this.resetTimeChoices();
        this.state.selectedTime = null;
        this.updateAddSlotButton();
        
        this.hideError();
        this.handleChange();
        
        if (this.state.selectedSlots.length >= this.maxSlots) {
            this.showMaxSlotsMessage();
        }
    }

    removeSelectedSlot(slotId) {
        this.state.selectedSlots = this.state.selectedSlots.filter(slot => slot.id !== slotId);
        this.renderSelectedSlots();
        this.hideMaxSlotsMessage();
        this.handleChange();
    }

    renderSelectedSlots() {
        const slotsContainer = this.calendarContainer.querySelector('.selected-slots-container');
        const slotsList = this.calendarContainer.querySelector('.selected-slots-list');
        const slotsCount = this.calendarContainer.querySelector('.selected-badge');
        
        slotsCount.textContent = this.state.selectedSlots.length;
        
        if (this.state.selectedSlots.length > 0) {
            slotsContainer.style.display = 'block';
        } else {
            slotsContainer.style.display = 'none';
        }
        
        slotsList.innerHTML = '';
        
        this.state.selectedSlots.forEach(slot => {
            const slotItem = document.createElement('div');
            slotItem.className = 'selected-slot-item';
            slotItem.innerHTML = `
                <div class="selected-slot-info">${slot.displayText}</div>
                <button type="button" class="delete-slot" data-slot-id="${slot.id}">
                    ${this.icons.delete}
                </button>
            `;
            
            slotItem.querySelector('.delete-slot').addEventListener('click', () => {
                this.removeSelectedSlot(slot.id);
            });
            
            slotsList.appendChild(slotItem);
        });
    }

    showMaxSlotsMessage() {
        const messageElement = this.calendarContainer.querySelector('.max-slots-message');
        messageElement.style.display = 'block';
    }

    hideMaxSlotsMessage() {
        if (this.state.selectedSlots.length < this.maxSlots) {
            const messageElement = this.calendarContainer.querySelector('.max-slots-message');
            messageElement.style.display = 'none';
        }
    }

    setupEventListeners() {
        const prevBtn = this.calendarContainer.querySelector('.prev-btn');
        const nextBtn = this.calendarContainer.querySelector('.next-btn');
        const addBtn = this.calendarContainer.querySelector('.add-slot-btn');
        
        prevBtn.addEventListener('click', () => {
            this.state.currentDate = new Date(
                this.state.currentDate.getFullYear(),
                this.state.currentDate.getMonth() - 1,
                1
            );
            this.generateCalendar();
            this.updateCurrentMonthDisplay();
        });
        
        nextBtn.addEventListener('click', () => {
            this.state.currentDate = new Date(
                this.state.currentDate.getFullYear(),
                this.state.currentDate.getMonth() + 1,
                1
            );
            this.generateCalendar();
            this.updateCurrentMonthDisplay();
        });
        
        addBtn.addEventListener('click', () => {
            this.addSelectedSlot();
        });
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    formatDateForDisplay(date) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const locale = this.language === 'fr' ? 'fr-FR' : 'en-US';
        return new Intl.DateTimeFormat(locale, options).format(date);
    }

    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    getValue() {
        return this.state.selectedSlots.map(slot => ({
            date: this.formatDate(slot.date),
            timeOfDay: slot.timeOfDay,
            displayText: slot.displayText
        }));
    }

    setValue(value) {
        if (Array.isArray(value)) {
            this.state.selectedSlots = value.map(slot => ({
                date: new Date(slot.date),
                timeOfDay: slot.timeOfDay,
                id: `${slot.date}_${slot.timeOfDay}`,
                displayText: slot.displayText
            }));
            this.renderSelectedSlots();
        }
    }
}

// ============================================================================
// CUSTOM CHECKBOX FIELD FOR TERMS
// ============================================================================

class TermsCheckboxField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.termsContent = config.termsContent || '';
        this.termsTitle = config.termsTitle || '';
        this.acceptText = config.acceptText || '';
        this.language = config.language || 'fr';
    }

    validate() {
        const checkbox = this.container.querySelector('input[type="checkbox"]');
        if (this.required && !checkbox.checked) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        this.hideError();
        return true;
    }

    render() {
        const container = this.createContainer();
        
        const termsContainer = document.createElement('div');
        termsContainer.className = 'terms-container';
        termsContainer.innerHTML = `
            <h3 class="terms-title required">${this.termsTitle}</h3>
            <div class="terms-content">${this.termsContent}</div>
            <ul class="terms-list">
                <li><strong>${this.language === 'fr' ? 'Frais de déplacement' : 'Travel fees'}</strong>: ${this.language === 'fr' ? '125 $' : '$125'}</li>
                <li><strong>${this.language === 'fr' ? 'Coût horaire' : 'Hourly rate'}</strong>: ${this.language === 'fr' ? '115 $ (minimum une heure de service)' : '$115 (minimum one hour of service)'}</li>
            </ul>
            <div class="checkbox-container">
                <input type="checkbox" id="${this.id}" name="${this.name}" required />
                <label for="${this.id}" class="checkbox-label">
                    <span class="custom-checkbox">
                        <span class="check-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="12px" height="12px">
                                <path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                            </svg>
                        </span>
                    </span>
                    <span class="checkbox-text">${this.acceptText}</span>
                </label>
            </div>
        `;
        
        const errorElement = this.createErrorElement();
        
        container.appendChild(termsContainer);
        container.appendChild(errorElement);
        
        this.container = container;
        
        // Add event listener
        const checkbox = container.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                this.hideError();
            }
            this.handleChange();
        });
        
        return container;
    }

    getValue() {
        const checkbox = this.container.querySelector('input[type="checkbox"]');
        return checkbox ? checkbox.checked : false;
    }

    setValue(value) {
        const checkbox = this.container.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.checked = !!value;
        }
    }
}

// ============================================================================
// FILE UPLOAD FIELD
// ============================================================================

class ServiceRequestFileUploadField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.accept = config.accept || 'image/*';
        this.language = config.language || 'fr';
    }

    validate() {
        // File upload is optional, so always return true
        return true;
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const fileUploadContainer = document.createElement('div');
        fileUploadContainer.className = 'file-upload-container';
        fileUploadContainer.innerHTML = `
            <div class="file-upload">
                <input type="file" class="file-upload-input" id="${this.id}" name="${this.name}" accept="${this.accept}">
                <div class="file-upload-text">${this.language === 'fr' ? 'Glissez et déposez une image ou cliquez pour parcourir' : 'Drag and drop an image or click to browse'}</div>
                <div class="file-upload-buttons">
                    <button type="button" class="file-upload-btn upload-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                        </svg>
                        <span>${this.language === 'fr' ? 'Choisir un fichier' : 'Choose file'}</span>
                    </button>
                    <button type="button" class="file-upload-btn camera-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                        </svg>
                        <span>${this.language === 'fr' ? 'Prendre une photo' : 'Take a photo'}</span>
                    </button>
                </div>
                <div class="file-name-display" style="display: none;"></div>
            </div>
        `;
        
        container.appendChild(label);
        container.appendChild(fileUploadContainer);
        
        this.container = container;
        this.setupFileUploadEvents();
        
        return container;
    }

    setupFileUploadEvents() {
        const fileInput = this.container.querySelector('.file-upload-input');
        const fileNameDisplay = this.container.querySelector('.file-name-display');
        const uploadBtn = this.container.querySelector('.upload-btn');
        const cameraBtn = this.container.querySelector('.camera-btn');
        
        fileInput.addEventListener('change', () => {
            if (fileInput.files && fileInput.files[0]) {
                const fileName = fileInput.files[0].name;
                fileNameDisplay.textContent = fileName;
                fileNameDisplay.style.display = 'block';
                this.handleChange();
            }
        });
        
        uploadBtn.addEventListener('click', () => {
            fileInput.click();
        });
        
        cameraBtn.addEventListener('click', () => {
            fileInput.setAttribute('capture', 'environment');
            fileInput.click();
        });
    }

    getValue() {
        const fileInput = this.container.querySelector('.file-upload-input');
        return fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;
    }

    setValue(value) {
        // File inputs cannot be programmatically set for security reasons
        // This method is mainly for form reset
        if (!value) {
            const fileInput = this.container.querySelector('.file-upload-input');
            const fileNameDisplay = this.container.querySelector('.file-name-display');
            if (fileInput) fileInput.value = '';
            if (fileNameDisplay) fileNameDisplay.style.display = 'none';
        }
    }
}

/**
 * BookingCancellationCardField - Display booking information for cancellation
 * Add this class to FormFieldFactory.js after CurrentAppointmentCardField
 */
class BookingCancellationCardField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Store config for later use
        this.config = config;
        
        // Validate required configuration
        if (!config.translations) {
            console.error('BookingCancellationCardField: translations are required in config');
        }
        if (!config.serviceMapping) {
            console.error('BookingCancellationCardField: serviceMapping is required in config');
        }
        
        // Current appointment specific config (same structure as CurrentAppointmentCardField)
        this.meetingName = config.meetingName || config.serviceProvider || "Provider";
        this.startTime = config.startTime || config.currentAppointment || new Date().toISOString();
        this.serviceName = config.serviceName || config.eventName || this.getServiceNameFromSlug(config.eventTypeSlug, this.meetingName);
        this.language = config.language || 'en';
        this.showServiceName = config.showServiceName !== false;
        this.showDateTime = config.showDateTime !== false;
        this.showProvider = config.showProvider !== false;
        this.iconType = config.iconType || 'calendar'; // 'calendar', 'appointment', 'cancel'
        this.cardStyle = config.cardStyle || 'default'; // 'default', 'compact', 'detailed'
        
        // Booking cancellation specific config (additional properties)
        this.bookingId = config.bookingId || '';
        this.bookingUid = config.bookingUid || '';
        this.status = config.status || 'confirmed';
        this.attendeeEmail = config.attendeeEmail || '';
        this.attendeeName = config.attendeeName || '';
        this.showBookingInfo = config.showBookingInfo !== false;
        this.showAttendeeInfo = config.showAttendeeInfo !== false;
        
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

    // Booking cancellation specific methods
    getStatusDisplay() {
        const statusMap = {
            confirmed: this.getText('confirmed'),
            pending: this.getText('pending'),
            cancelled: this.getText('cancelled')
        };
        return statusMap[this.status] || this.status;
    }

    renderBookingSpecificFields() {
        let bookingFields = '';
        if (this.showBookingInfo && this.bookingId) {
            bookingFields += `<div class="meta-item"><span class="meta-label">${this.getText('bookingNumber')}:</span> <span class="meta-value">${this.bookingId}</span></div>`;
        }
        if (this.showBookingInfo) {
            bookingFields += `<div class="meta-item"><span class="meta-label">${this.getText('status')}:</span> <span class="meta-value">${this.getStatusDisplay()}</span></div>`;
        }
        if (this.showAttendeeInfo && this.attendeeName) {
            bookingFields += `<div class="meta-item"><span class="meta-label">${this.getText('attendee')}:</span> <span class="meta-value">${this.attendeeName}</span></div>`;
        }
        if (this.showAttendeeInfo && this.attendeeEmail) {
            bookingFields += `<div class="meta-item"><span class="meta-label">${this.getText('email')}:</span> <span class="meta-value">${this.attendeeEmail}</span></div>`;
        }
        return bookingFields;
    }

    validate() {
        // Booking cancellation card is typically read-only, so it's always valid
        // But we can validate that required booking data is present
        if (this.required) {
            const hasRequiredData = this.meetingName && this.startTime;
            if (!hasRequiredData) {
                this.showError("Booking information is required");
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
                    <span class="error-text">Booking information is required</span>
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
                        <div class="appointment-info-title">${this.getText('bookingToCancel')}</div>
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
        const bookingFields = this.renderBookingSpecificFields();
        
        return `
            <div class="current-appointment-card detailed">
                <div class="appointment-header-detailed">
                    <div class="appointment-icon-large">
                        ${this.getIcon()}
                    </div>
                    <div class="appointment-details-full">
                        <div class="appointment-title-large">${this.getText('bookingToCancel')}</div>
                        <div class="appointment-meta">
                            ${this.showProvider ? `<div class="meta-item"><span class="meta-label">${this.getText('scheduledWith')}:</span> <span class="meta-value">${this.meetingName}</span></div>` : ''}
                            ${this.showServiceName && this.serviceName ? `<div class="meta-item"><span class="meta-label">${this.getText('serviceName')}:</span> <span class="meta-value">${this.serviceName}</span></div>` : ''}
                            ${this.showDateTime ? `<div class="meta-item"><span class="meta-label">${this.getText('currentDateTime')}:</span> <span class="meta-value">${appointmentDate}</span></div>` : ''}
                            ${bookingFields}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getValue() {
        // Return the booking information as an object
        return {
            meetingName: this.meetingName,
            startTime: this.startTime,
            serviceName: this.serviceName,
            formattedDate: this.formatAppointmentDate(this.startTime),
            language: this.language,
            // Booking cancellation specific properties
            bookingId: this.bookingId,
            bookingUid: this.bookingUid,
            status: this.status,
            attendeeEmail: this.attendeeEmail,
            attendeeName: this.attendeeName
        };
    }
    
    setValue(value) {
        // Update booking information if provided
        if (value && typeof value === 'object') {
            if (value.meetingName) this.meetingName = value.meetingName;
            if (value.startTime) this.startTime = value.startTime;
            if (value.serviceName) this.serviceName = value.serviceName;
            if (value.language) this.language = value.language;
            // Booking cancellation specific properties
            if (value.bookingId) this.bookingId = value.bookingId;
            if (value.bookingUid) this.bookingUid = value.bookingUid;
            if (value.status) this.status = value.status;
            if (value.attendeeEmail) this.attendeeEmail = value.attendeeEmail;
            if (value.attendeeName) this.attendeeName = value.attendeeName;
            
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
        // Booking cancellation specific properties
        if (newConfig.bookingId) this.bookingId = newConfig.bookingId;
        if (newConfig.bookingUid) this.bookingUid = newConfig.bookingUid;
        if (newConfig.status) this.status = newConfig.status;
        if (newConfig.attendeeEmail) this.attendeeEmail = newConfig.attendeeEmail;
        if (newConfig.attendeeName) this.attendeeName = newConfig.attendeeName;
        
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



/**
 * TabManager - A field that manages multiple tabs with their own content
 * Extends BaseField to integrate seamlessly with FormFieldFactory
 */
/**
 * TabManager - A field that manages multiple tabs with their own content
 * Extends BaseField to integrate seamlessly with FormFieldFactory
 */
class TabManager extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Tab-specific configuration
        this.tabs = config.tabs || []; // Array of tab objects
        this.activeTabId = config.activeTabId || (this.tabs[0]?.id);
        this.tabStyle = config.tabStyle || 'default'; // 'default', 'pills', 'underline'
        this.orientation = config.orientation || 'horizontal'; // 'horizontal', 'vertical'
        
        // Tab structure example:
        // {
        //   id: 'borrowing',
        //   label: 'Borrowing Capacity',
        //   fields: [field configurations],
        //   onActivate: function(tabId, tabManager) {},
        //   onDeactivate: function(tabId, tabManager) {},
        //   customContent: null // Optional custom HTML content
        // }
        
        this.tabFieldInstances = new Map(); // Store field instances for each tab
        this.tabContainers = new Map(); // Store tab content containers
        this.onTabChange = config.onTabChange || null;
        this.allowValidation = config.allowValidation !== false;
        
        // Event listeners registry
        this.tabEventListeners = [];
    }

    validate() {
        if (!this.allowValidation) return true;
        
        // Validate all fields in all tabs or just active tab based on config
        const validateAllTabs = this.config.validateAllTabs || false;
        
        if (validateAllTabs) {
            // Validate all tabs
            let isValid = true;
            this.tabFieldInstances.forEach((fields, tabId) => {
                fields.forEach(field => {
                    if (!field.validate()) {
                        isValid = false;
                    }
                });
            });
            return isValid;
        } else {
            // Validate only active tab
            const activeFields = this.tabFieldInstances.get(this.activeTabId) || [];
            return activeFields.every(field => field.validate());
        }
    }

    render() {
        const container = this.createContainer();
        
        // Create tab navigation
        const tabNav = this.createTabNavigation();
        container.appendChild(tabNav);
        
        // Create tab content area
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content-area';
        
        // Create content for each tab
        this.tabs.forEach(tab => {
            const tabContainer = this.createTabContent(tab);
            this.tabContainers.set(tab.id, tabContainer);
            tabContent.appendChild(tabContainer);
        });
        
        container.appendChild(tabContent);
        
        // Create error element
        const errorElement = this.createErrorElement();
        container.appendChild(errorElement);
        
        // Set initial active tab
        this.setActiveTab(this.activeTabId, false);
        
        this.container = container;
        return container;
    }

    createTabNavigation() {
        const navContainer = document.createElement('div');
        navContainer.className = `tab-navigation ${this.tabStyle} ${this.orientation}`;
        
        // Add centering styles
        navContainer.style.display = 'flex';
        navContainer.style.justifyContent = 'center';
        navContainer.style.alignItems = 'center';
        navContainer.style.marginBottom = '20px';
        
        // Create inner container for the buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'tab-buttons-container';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.flexWrap = 'wrap';
        buttonContainer.style.justifyContent = 'center';
        
        this.tabs.forEach(tab => {
            const tabButton = document.createElement('button');
            tabButton.type = 'button';
            tabButton.className = 'tab-button';
            tabButton.dataset.tabId = tab.id;
            tabButton.textContent = tab.label;
            
            // Override flex: 1 to allow natural button width
            tabButton.style.flex = 'none';
            
            // Add active class if this is the active tab
            if (tab.id === this.activeTabId) {
                tabButton.classList.add('active');
            }
            
            // Add click event listener
            const clickHandler = (e) => {
                e.preventDefault();
                this.setActiveTab(tab.id);
            };
            
            tabButton.addEventListener('click', clickHandler);
            this.tabEventListeners.push({
                element: tabButton,
                event: 'click',
                handler: clickHandler
            });
            
            buttonContainer.appendChild(tabButton);
        });
        
        navContainer.appendChild(buttonContainer);
        return navContainer;
    }

    createTabContent(tab) {
        const tabContainer = document.createElement('div');
        tabContainer.className = 'tab-content';
        tabContainer.dataset.tabId = tab.id;
        tabContainer.style.display = tab.id === this.activeTabId ? 'block' : 'none';
        
        if (tab.customContent && typeof tab.customContent === 'function') {
            // Use custom content function
            tab.customContent(tabContainer, this);
        } else if (tab.customContent) {
            // Use custom HTML content
            tabContainer.innerHTML = tab.customContent;
        } else if (tab.fields && Array.isArray(tab.fields)) {
            // Create fields from configuration
            this.createTabFields(tab, tabContainer);
        }
        
        return tabContainer;
    }

    createTabFields(tab, container) {
        const fieldInstances = [];
        
        // Group fields by rows if specified
        const fieldGroups = this.groupFieldsByRow(tab.fields);
        
        fieldGroups.forEach(group => {
            if (group.isRow) {
                // Create row container
                const rowContainer = document.createElement('div');
                rowContainer.className = 'field-row';
                
                group.fields.forEach(fieldConfig => {
                    const colContainer = document.createElement('div');
                    colContainer.className = 'field-col';
                    
                    const field = this.createFieldInstance(fieldConfig, tab.id);
                    if (field) {
                        fieldInstances.push(field);
                        colContainer.appendChild(field.render());
                    }
                    rowContainer.appendChild(colContainer);
                });
                
                container.appendChild(rowContainer);
            } else {
                // Single field
                const field = this.createFieldInstance(group.fields[0], tab.id);
                if (field) {
                    fieldInstances.push(field);
                    container.appendChild(field.render());
                }
            }
        });
        
        // Store field instances for this tab
        this.tabFieldInstances.set(tab.id, fieldInstances);
    }

    groupFieldsByRow(fields) {
        const groups = [];
        let i = 0;
        
        while (i < fields.length) {
            const currentField = fields[i];
            
            if (currentField.row) {
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
            
            // Single field without row
            groups.push({
                isRow: false,
                fields: [currentField]
            });
            
            i++;
        }
        
        return groups;
    }

    createFieldInstance(fieldConfig, tabId) {
        // Create unique field ID with tab prefix
        const enhancedConfig = {
            ...fieldConfig,
            id: `${tabId}-${fieldConfig.id}`,
            onChange: (value) => {
                // Call original onChange if provided
                if (fieldConfig.onChange) {
                    fieldConfig.onChange(value, tabId, this);
                }
                // Call tab manager onChange
                this.handleFieldChange(tabId, fieldConfig.name || fieldConfig.id, value);
            }
        };

        return this.factory.createField(enhancedConfig);
    }

    handleFieldChange(tabId, fieldName, value) {
        // Update the tab's value
        if (!this.value) this.value = {};
        if (!this.value[tabId]) this.value[tabId] = {};
        
        this.value[tabId][fieldName] = value;
        
        // Call main field change handler
        this.handleChange();
        
        // Call tab-specific change handler if provided
        const tab = this.tabs.find(t => t.id === tabId);
        if (tab && tab.onFieldChange) {
            tab.onFieldChange(fieldName, value, tabId, this);
        }
    }

    setActiveTab(tabId, triggerCallbacks = true) {
        const previousTabId = this.activeTabId;
        
        if (previousTabId === tabId) return; // No change needed
        
        // Call deactivate callback for previous tab
        if (triggerCallbacks && previousTabId) {
            const previousTab = this.tabs.find(t => t.id === previousTabId);
            if (previousTab && previousTab.onDeactivate) {
                previousTab.onDeactivate(previousTabId, this);
            }
        }
        
        // Update active tab
        this.activeTabId = tabId;
        
        // Update tab buttons
        this.container.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tabId === tabId);
        });
        
        // Show/hide tab content
        this.tabContainers.forEach((container, currentTabId) => {
            container.style.display = currentTabId === tabId ? 'block' : 'none';
        });
        
        // Call activate callback for new tab
        if (triggerCallbacks) {
            const activeTab = this.tabs.find(t => t.id === tabId);
            if (activeTab && activeTab.onActivate) {
                activeTab.onActivate(tabId, this);
            }
            
            // Call global tab change callback
            if (this.onTabChange) {
                this.onTabChange(tabId, previousTabId, this);
            }
        }
        
        // Trigger change event
        this.handleChange();
    }

    getValue() {
        // Return object with all tab values and current active tab
        const allValues = {};
        
        this.tabFieldInstances.forEach((fields, tabId) => {
            allValues[tabId] = {};
            fields.forEach(field => {
                const fieldName = field.name;
                allValues[tabId][fieldName] = field.getValue();
            });
        });
        
        return {
            activeTab: this.activeTabId,
            tabs: allValues,
            // Convenience accessors
            ...allValues
        };
    }

    setValue(value) {
        if (!value || typeof value !== 'object') return;
        
        // Set active tab if provided
        if (value.activeTab) {
            this.setActiveTab(value.activeTab, false);
        }
        
        // Set values for each tab
        const tabValues = value.tabs || value;
        
        this.tabFieldInstances.forEach((fields, tabId) => {
            const tabData = tabValues[tabId];
            if (tabData && typeof tabData === 'object') {
                fields.forEach(field => {
                    const fieldName = field.name;
                    if (tabData[fieldName] !== undefined) {
                        field.setValue(tabData[fieldName]);
                    }
                });
            }
        });
        
        this.value = value;
    }

    // Get values for specific tab
    getTabValues(tabId) {
        const fields = this.tabFieldInstances.get(tabId);
        if (!fields) return {};
        
        const values = {};
        fields.forEach(field => {
            values[field.name] = field.getValue();
        });
        return values;
    }

    // Set values for specific tab
    setTabValues(tabId, values) {
        const fields = this.tabFieldInstances.get(tabId);
        if (!fields || !values) return;
        
        fields.forEach(field => {
            if (values[field.name] !== undefined) {
                field.setValue(values[field.name]);
            }
        });
    }

    // Get field instance by tab and field name
    getField(tabId, fieldName) {
        const fields = this.tabFieldInstances.get(tabId);
        if (!fields) return null;
        
        return fields.find(field => field.name === fieldName);
    }

    // Add new tab dynamically
    addTab(tabConfig) {
        this.tabs.push(tabConfig);
        
        if (this.container) {
            // Re-render if already rendered
            const buttonContainer = this.container.querySelector('.tab-buttons-container');
            const tabContent = this.container.querySelector('.tab-content-area');
            
            // Add new tab button
            const tabButton = document.createElement('button');
            tabButton.type = 'button';
            tabButton.className = 'tab-button';
            tabButton.dataset.tabId = tabConfig.id;
            tabButton.textContent = tabConfig.label;
            
            // Override flex: 1 to allow natural button width
            tabButton.style.flex = 'none';
            
            const clickHandler = (e) => {
                e.preventDefault();
                this.setActiveTab(tabConfig.id);
            };
            
            tabButton.addEventListener('click', clickHandler);
            this.tabEventListeners.push({
                element: tabButton,
                event: 'click',
                handler: clickHandler
            });
            
            buttonContainer.appendChild(tabButton);
            
            // Add new tab content
            const tabContainer = this.createTabContent(tabConfig);
            this.tabContainers.set(tabConfig.id, tabContainer);
            tabContent.appendChild(tabContainer);
        }
    }

    // Remove tab
    removeTab(tabId) {
        this.tabs = this.tabs.filter(tab => tab.id !== tabId);
        
        if (this.container) {
            // Remove tab button
            const tabButton = this.container.querySelector(`.tab-button[data-tab-id="${tabId}"]`);
            if (tabButton) {
                // Remove event listeners
                this.tabEventListeners = this.tabEventListeners.filter(listener => {
                    if (listener.element === tabButton) {
                        tabButton.removeEventListener(listener.event, listener.handler);
                        return false;
                    }
                    return true;
                });
                tabButton.remove();
            }
            
            // Remove tab content
            const tabContainer = this.tabContainers.get(tabId);
            if (tabContainer) {
                tabContainer.remove();
                this.tabContainers.delete(tabId);
            }
            
            // Remove field instances
            this.tabFieldInstances.delete(tabId);
            
            // Switch to first tab if removing active tab
            if (this.activeTabId === tabId && this.tabs.length > 0) {
                this.setActiveTab(this.tabs[0].id);
            }
        }
    }

    // Clean up event listeners
    cleanup() {
        this.tabEventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this.tabEventListeners = [];
        
        // Cleanup field instances
        this.tabFieldInstances.forEach(fields => {
            fields.forEach(field => {
                if (field.cleanup) field.cleanup();
            });
        });
        
        super.cleanup();
    }

    destroy() {
        this.cleanup();
        this.tabFieldInstances.clear();
        this.tabContainers.clear();
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


   class ServiceProviderFilterField extends BaseField {
            constructor(factory, config) {
                super(factory, config);
                
                // Core configuration
                this.language = config.language || 'fr';
                this.mode = config.mode || 'both'; // 'service-only', 'provider-only', 'both'
                
                // Data configuration - FIX: Properly handle data reference
                if (typeof config.serviceProviders === 'string') {
                    // Reference to data in form - need to get it from factory or form
                    this.rawServiceProviders = this.factory.getFormData?.(config.serviceProviders) || 
                                              this.factory.formData?.[config.serviceProviders] || 
                                              this.factory.data?.[config.serviceProviders] || {};
                } else {
                    this.rawServiceProviders = config.serviceProviders || config.dentistsInfo || {};
                }
                
                this.availableServices = [];
                this.filteredProviders = [];
                this.allProviders = [];
                
                // Selection state
                this.selectedService = config.selectedService || config.serviceName || '';
                this.selectedProviderId = config.selectedProviderId || '';
                this.selectedProvider = null;
                
                // UI Configuration
                this.serviceLabel = config.serviceLabel || this.getText('selectService');
                this.servicePlaceholder = config.servicePlaceholder || this.getText('selectServicePlaceholder');
                this.providerLabel = config.providerLabel || this.getText('selectProvider');
                this.providerPlaceholder = config.providerPlaceholder || this.getText('selectProviderPlaceholder');
                
                // Show/hide options
                this.showServiceField = config.showServiceField !== false && (this.mode === 'both' || this.mode === 'service-only');
                this.showProviderField = config.showProviderField !== false && (this.mode === 'both' || this.mode === 'provider-only');
                
                // Auto-selection behavior
                this.autoSelectSingleService = config.autoSelectSingleService !== false;
                this.autoSelectSingleProvider = config.autoSelectSingleProvider !== false;
                
                // Callback functions
                this.onServiceChange = config.onServiceChange || null;
                this.onProviderChange = config.onProviderChange || null;
                this.onSelectionComplete = config.onSelectionComplete || null;
                
                // Field instances
                this.serviceSelectField = null;
                this.providerSelectField = null;
                
                this.init();
            }

            // FIX: Method to get data from form context
            getDataFromForm() {
                if (this.factory && this.factory.form && this.factory.form.data) {
                    return this.factory.form.data.serviceProviders || {};
                }
                if (window.DentalServicesFormExtension && window.DentalServicesFormExtension.FORM_DATA) {
                    return window.DentalServicesFormExtension.FORM_DATA.serviceProviders || {};
                }
                return this.rawServiceProviders;
            }

            init() {
                // FIX: Ensure we have the correct data
                if (!this.rawServiceProviders || Object.keys(this.rawServiceProviders).length === 0) {
                    this.rawServiceProviders = this.getDataFromForm();
                }
                
                this.availableServices = this.extractAvailableServices(this.rawServiceProviders);
                this.allProviders = this.extractAllProviders(this.rawServiceProviders);
                
                if (this.autoSelectSingleService && this.availableServices.length === 1 && !this.selectedService) {
                    this.selectedService = this.availableServices[0].name;
                }
                
                if (this.selectedService) {
                    this.filteredProviders = this.filterProvidersByService(this.selectedService);
                    
                    if (this.autoSelectSingleProvider && this.filteredProviders.length === 1 && !this.selectedProviderId) {
                        this.selectedProviderId = this.filteredProviders[0].id;
                        this.selectedProvider = this.filteredProviders[0];
                    }
                } else {
                    this.filteredProviders = this.allProviders;
                }
                
                if (this.selectedProviderId && !this.selectedProvider) {
                    this.selectedProvider = this.filteredProviders.find(p => p.id === this.selectedProviderId);
                }
            }

            extractAvailableServices(rawProviders) {
                const serviceSet = new Set();
                
                try {
                    
                    // Handle object format: { 'Dr. Name': { services: {...} } }
                    Object.entries(rawProviders).forEach(([providerName, providerData]) => {
                        console.log('Processing provider:', providerName, providerData);
                        
                        if (providerData && providerData.services) {
                            Object.keys(providerData.services).forEach(service => {
                                serviceSet.add(service);
                            });
                        }
                    });
                } catch (error) {
                    console.error('Error extracting services:', error);
                }
                
                const services = Array.from(serviceSet).sort().map(service => ({
                    id: this.slugify(service),
                    name: service,
                    displayName: service
                }));
                
                return services;
            }

            extractAllProviders(rawProviders) {
                const allProviders = [];
                
                try {
                    Object.entries(rawProviders).forEach(([providerName, providerData]) => {
                        if (providerData) {
                            allProviders.push({
                                id: this.slugify(providerName),
                                name: providerName,
                                displayName: providerName,
                                description: providerData.description || providerData.specialty || "",
                                services: providerData.services || {},
                                rawData: providerData
                            });
                        }
                    });
                } catch (error) {
                    console.error('Error extracting providers:', error);
                }
                
                return allProviders;
            }

            filterProvidersByService(serviceName) {
                if (!serviceName || !this.rawServiceProviders) {
                    return this.allProviders;
                }

                const filteredProviders = [];
                
                Object.entries(this.rawServiceProviders).forEach(([providerName, providerData]) => {
                    if (providerData.services && providerData.services[serviceName]) {
                        const serviceConfig = providerData.services[serviceName];
                        
                        filteredProviders.push({
                            id: this.slugify(providerName),
                            name: providerName,
                            displayName: providerName,
                            description: providerData.description || providerData.specialty || "",
                            serviceConfig: serviceConfig,
                            allServices: providerData.services,
                            rawData: providerData
                        });
                    }
                });
                
                return filteredProviders;
            }

            slugify(text) {
                return text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '') 
                    .replace(/[\s_-]+/g, '-') 
                    .replace(/^-+|-+$/g, '');
            }

            selectService(serviceId) {
                
                const service = this.availableServices.find(s => s.id === serviceId);
                if (!service) {
                    console.error('Service not found:', serviceId);
                    return;
                }
                
                this.selectedService = service.name;
                this.filteredProviders = this.filterProvidersByService(service.name);
                
                if (this.selectedProviderId) {
                    const stillValid = this.filteredProviders.find(p => p.id === this.selectedProviderId);
                    if (!stillValid) {
                        this.selectedProviderId = '';
                        this.selectedProvider = null;
                    }
                }
                
                if (this.autoSelectSingleProvider && this.filteredProviders.length === 1) {
                    this.selectedProviderId = this.filteredProviders[0].id;
                    this.selectedProvider = this.filteredProviders[0];
                    
                    if (this.providerSelectField) {
                        this.providerSelectField.setValue(this.selectedProviderId);
                    }
                }
                
                this.showProviderSelection();
                this.updateProviderOptions();
                
                if (this.onServiceChange) {
                    this.onServiceChange(service, this.filteredProviders);
                }
                
                this.checkSelectionComplete();
                this.updateValue();
            }

            selectProvider(providerId) {
                
                const provider = this.filteredProviders.find(p => p.id === providerId) || 
                                this.allProviders.find(p => p.id === providerId);
                
                if (!provider) {
                    console.error('Provider not found:', providerId);
                    return;
                }
                
                this.selectedProviderId = providerId;
                this.selectedProvider = provider;
                
                if (this.onProviderChange) {
                    this.onProviderChange(provider);
                }
                
                this.checkSelectionComplete();
                this.updateValue();
            }

            checkSelectionComplete() {
                const isComplete = this.isSelectionComplete();
                
                if (isComplete && this.onSelectionComplete) {
                    this.onSelectionComplete({
                        service: this.selectedService,
                        provider: this.selectedProvider,
                        serviceConfig: this.selectedProvider?.serviceConfig
                    });
                }
            }

            isSelectionComplete() {
                let complete = true;
                
                if (this.showServiceField && this.required && !this.selectedService) {
                    complete = false;
                }
                
                if (this.showProviderField && this.required && !this.selectedProviderId) {
                    complete = false;
                }
                
                return complete;
            }

            createServiceSelectField() {
                if (!this.showServiceField) return null;
                
                this.serviceSelectField = new SingleSelectField(this.factory, {
                    id: `${this.id}-service`,
                    name: `${this.name}_service`,
                    label: this.serviceLabel,
                    placeholder: this.servicePlaceholder,
                    options: this.availableServices,
                    required: this.required,
                    row:'serviceSelectField',
                    onChange: (value) => this.selectService(value)
                });

                if (this.selectedService) {
                    const serviceOption = this.availableServices.find(s => s.name === this.selectedService);
                    if (serviceOption) {
                        this.serviceSelectField.setValue(serviceOption.id);
                    }
                }

                return this.serviceSelectField;
            }

            createProviderSelectField() {
                if (!this.showProviderField) return null;
                
                this.providerSelectField = new SingleSelectField(this.factory, {
                    id: `${this.id}-provider`,
                    name: `${this.name}_provider`,
                    label: this.providerLabel,
                    placeholder: this.providerPlaceholder,
                    options: this.filteredProviders,
                    required: this.required,
                    row:'providerSelectField',
                    onChange: (value) => this.selectProvider(value)
                });

                if (this.selectedProviderId) {
                    this.providerSelectField.setValue(this.selectedProviderId);
                }

                return this.providerSelectField;
            }

            showProviderSelection() {
                const providerContainer = this.element.querySelector('.provider-select-container');
                if (providerContainer) {
                    providerContainer.style.display = 'block';
                    // Add smooth transition effect
                    providerContainer.style.opacity = '0';
                    providerContainer.style.transform = 'translateY(-10px)';
                    
                    // Animate in
                    setTimeout(() => {
                        providerContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        providerContainer.style.opacity = '1';
                        providerContainer.style.transform = 'translateY(0)';
                    }, 10);
                }
            }

            updateProviderOptions() {
                if (!this.providerSelectField) return;

                const providerContainer = this.element.querySelector('.provider-select-container');
                if (!providerContainer) return;

                const currentValue = this.selectedProviderId;
                providerContainer.innerHTML = '';

                this.providerSelectField = new SingleSelectField(this.factory, {
                    id: `${this.id}-provider`,
                    name: `${this.name}_provider`,
                    label: this.providerLabel,
                    placeholder: this.providerPlaceholder,
                    options: this.filteredProviders,
                    required: this.required,
                    onChange: (value) => this.selectProvider(value)
                });

                const newFieldElement = this.providerSelectField.render();
                providerContainer.appendChild(newFieldElement);

                if (currentValue && this.filteredProviders.find(p => p.id === currentValue)) {
                    this.providerSelectField.setValue(currentValue);
                }
            }

            getText(key) {
                const translations = {
                    en: {
                        selectService: "Select a service",
                        selectServicePlaceholder: "-- Select a service --",
                        selectProvider: "Select a provider",
                        selectProviderPlaceholder: "-- Select a provider --",
                        pleaseSelectService: "Please select a service",
                        pleaseSelectProvider: "Please select a provider"
                    },
                    fr: {
                        selectService: "Sélectionner un service",
                        selectServicePlaceholder: "-- Sélectionner un service --",
                        selectProvider: "Sélectionner un dentiste",
                        selectProviderPlaceholder: "-- Sélectionner un dentiste --",
                        pleaseSelectService: "Veuillez sélectionner un service",
                        pleaseSelectProvider: "Veuillez sélectionner un dentiste"
                    }
                };
                return translations[this.language]?.[key] || key;
            }

            validate() {
                if (!this.required) return true;
                
                if (this.showServiceField && !this.selectedService) {
                    this.showError(this.getText('pleaseSelectService'));
                    return false;
                }
                
                if (this.showProviderField && !this.selectedProviderId) {
                    this.showError(this.getText('pleaseSelectProvider'));
                    return false;
                }
                
                this.hideError();
                return true;
            }

            render() {
                const container = this.createContainer();
                
                // Add vertical spacing styles
                const styles = `
                    <style>
                        .service-provider-filter {
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                        }
                        .service-provider-filter .service-select-container {
                            margin-bottom: 0;
                        }
                        .service-provider-filter .provider-select-container {
                            margin-top: 0;
                            transition: opacity 0.3s ease, transform 0.3s ease;
                        }
                    </style>
                `;
                
                if (!document.querySelector('#service-provider-filter-styles')) {
                    const styleElement = document.createElement('div');
                    styleElement.id = 'service-provider-filter-styles';
                    styleElement.innerHTML = styles;
                    document.head.appendChild(styleElement.firstElementChild);
                }
                
                if (this.showServiceField) {
                    this.createServiceSelectField();
                    const serviceFieldElement = this.serviceSelectField.render();
                    serviceFieldElement.classList.add('service-select-container');
                    container.appendChild(serviceFieldElement);
                }
                
                if (this.showProviderField) {
                    this.createProviderSelectField();
                    const providerFieldElement = this.providerSelectField.render();
                    providerFieldElement.classList.add('provider-select-container');
                    
                    if (!this.selectedService) {
                        providerFieldElement.style.display = 'none';
                    }
                    
                    container.appendChild(providerFieldElement);
                }
                
                const filterContainer = document.createElement('div');
                filterContainer.className = 'service-provider-filter';
                
                while (container.firstChild) {
                    filterContainer.appendChild(container.firstChild);
                }
                
                container.appendChild(filterContainer);
                
                const errorElement = this.createErrorElement();
                container.appendChild(errorElement);
                
                this.element = container;
                this.element.fieldInstance = this;
                
                return this.element;
            }

            // UPDATED: Return structured object for separate summary display
            getValue() {
                return {
                    service: this.selectedService || '',
                    dentist: this.selectedProvider?.displayName || '',
                    // Flag to indicate this should be displayed as separate fields
                    _separateFields: true,
                    // Provide field labels for display
                    _fieldLabels: {
                        service: 'Service',
                        dentist: 'Dentiste'
                    },
                    toString: () => this.getDisplayText() // Fallback for string conversion
                };
            }

            // NEW: Method to get separate summary fields
            getSummaryFields() {
                const fields = [];
                
                if (this.selectedService) {
                    fields.push({
                        label: 'Service',
                        value: this.selectedService
                    });
                }
                
                if (this.selectedProvider?.displayName) {
                    fields.push({
                        label: 'Dentiste', 
                        value: this.selectedProvider.displayName
                    });
                }
                
                return fields;
            }

            // Method to get display-friendly text
            getDisplayText() {
                const parts = [];
                
                if (this.selectedService) {
                    parts.push(this.selectedService);
                }
                
                if (this.selectedProvider && this.selectedProvider.displayName) {
                    parts.push(this.selectedProvider.displayName);
                }
                
                return parts.length > 0 ? parts.join(' - ') : '';
            }

            // Method specifically for summary display
            getSummaryValue() {
                const parts = [];
                if (this.selectedService) {
                    parts.push(`Service: ${this.selectedService}`);
                }
                if (this.selectedProvider && this.selectedProvider.displayName) {
                    parts.push(`Dentiste: ${this.selectedProvider.displayName}`);
                }
                return parts.join('\n');
            }

            // Method specifically for getting full data object when needed
            getDataValue() {
                return {
                    selectedService: this.selectedService,
                    selectedServiceId: this.selectedService ? this.slugify(this.selectedService) : '',
                    selectedProviderId: this.selectedProviderId,
                    selectedProvider: this.selectedProvider,
                    filteredProviders: this.filteredProviders,
                    serviceConfig: this.selectedProvider?.serviceConfig || null,
                    isComplete: this.isSelectionComplete(),
                    displayText: this.getDisplayText()
                };
            }

            // Override toString for automatic string conversion
            toString() {
                return this.getDisplayText();
            }

            setValue(value) {
                if (value && typeof value === 'object') {
                    if (value.selectedService && this.showServiceField) {
                        const serviceOption = this.availableServices.find(s => s.name === value.selectedService);
                        if (serviceOption) {
                            this.selectService(serviceOption.id);
                            if (this.serviceSelectField) {
                                this.serviceSelectField.setValue(serviceOption.id);
                            }
                        }
                    }
                    
                    if (value.selectedProviderId && this.showProviderField) {
                        this.selectProvider(value.selectedProviderId);
                        if (this.providerSelectField) {
                            this.providerSelectField.setValue(value.selectedProviderId);
                        }
                    }
                } else if (typeof value === 'string') {
                    console.log('String value set:', value);
                }
            }

            updateValue() {
                this.handleChange();
            }

            reset() {
                this.selectedService = '';
                this.selectedProviderId = '';
                this.selectedProvider = null;
                this.filteredProviders = this.allProviders;
                
                if (this.serviceSelectField) {
                    this.serviceSelectField.setValue('');
                }
                
                if (this.providerSelectField) {
                    this.providerSelectField.setValue('');
                    this.updateProviderOptions();
                }
                
                const providerContainer = this.element?.querySelector('.provider-select-container');
                if (providerContainer) {
                    providerContainer.style.display = 'none';
                }
                
                this.updateValue();
            }

            destroy() {
                if (this.serviceSelectField && typeof this.serviceSelectField.destroy === 'function') {
                    this.serviceSelectField.destroy();
                }
                if (this.providerSelectField && typeof this.providerSelectField.destroy === 'function') {
                    this.providerSelectField.destroy();
                }
                super.destroy();
            }
        }


    // ============================================================================
        // FIXED DATA TRANSFORMER FACTORY SYSTEM
        // ============================================================================

                class DataTransformerFactory {
            constructor(config = {}) {
                this.config = {
                    defaultLanguage: config.defaultLanguage || 'fr',
                    enableLogging: config.enableLogging || false,
                    logPrefix: config.logPrefix || '🔄 DataTransformer'
                };
                
                this.fieldExtractors = new Map();
                this.sectionBuilders = new Map();
                this.optionsCache = new Map();
                
                this.initializeDefaultExtractors();
            }

            // ============================================================================
            // ENHANCED FIELD VALUE EXTRACTORS
            // ============================================================================
            initializeDefaultExtractors() {
                // Basic field extractors
                this.registerFieldExtractor('text', (value, fieldConfig, context) => {
                    return this.extractSimpleValue(value);
                });
                
                this.registerFieldExtractor('email', (value, fieldConfig, context) => {
                    return this.extractSimpleValue(value);
                });
                
                this.registerFieldExtractor('phone', (value, fieldConfig, context) => {
                    return this.extractSimpleValue(value);
                });
                
                this.registerFieldExtractor('textarea', (value, fieldConfig, context) => {
                    return this.extractSimpleValue(value);
                });
                
                this.registerFieldExtractor('url', (value, fieldConfig, context) => {
                    return this.extractSimpleValue(value);
                });

                // Boolean field extractors
                this.registerFieldExtractor('yesno', (value, fieldConfig, context) => {
                    return this.extractYesNoValue(value, fieldConfig, context);
                });
                
                // Selection field extractors  
                this.registerFieldExtractor('select', (value, fieldConfig, context) => {
                    return this.extractSelectValue(value, fieldConfig, context);
                });
                
                this.registerFieldExtractor('multiselect', (value, fieldConfig, context) => {
                    return this.extractMultiSelectValue(value, fieldConfig, context);
                });
                
                this.registerFieldExtractor('select-with-other', (value, fieldConfig, context) => {
                    return this.extractSelectWithOtherValue(value, fieldConfig, context);
                });
                
                this.registerFieldExtractor('multiselect-with-other', (value, fieldConfig, context) => {
                    return this.extractMultiSelectWithOtherValue(value, fieldConfig, context);
                });
                
                // Complex field extractors
                this.registerFieldExtractor('yesno-with-options', (value, fieldConfig, context) => {
                    return this.extractYesNoWithOptionsValue(value, fieldConfig, context);
                });

                // Custom extractor for teamSize
                this.registerFieldExtractor('teamSize', (value, fieldConfig, context) => {
                    const teamSizeOptions = [
                        { id: 'solo', name: { fr: "Entrepreneur individuel", en: "Individual Entrepreneur" } },
                        { id: 'small', name: { fr: "TPE (2-10 employés)", en: "Small Business (2-10 employees)" } },
                        { id: 'medium', name: { fr: "PME (11-50 employés)", en: "Medium Business (11-50 employees)" } },
                        { id: 'large', name: { fr: "Grande entreprise (50+ employés)", en: "Large Enterprise (50+ employees)" } }
                    ];
                    
                    const option = teamSizeOptions.find(opt => opt.id === value);
                    if (option) {
                        const name = option.name;
                        return typeof name === 'object' ? (name[context.language] || name.en) : name;
                    }
                    return value;
                });
            }

            registerFieldExtractor(fieldType, extractorFunction) {
                this.fieldExtractors.set(fieldType, extractorFunction);
            }

            registerSectionBuilder(sectionId, builderFunction) {
                this.sectionBuilders.set(sectionId, builderFunction);
            }

            // ============================================================================
            // CORE VALUE EXTRACTION METHODS
            // ============================================================================
            extractSimpleValue(value) {
                if (value === null || value === undefined || value === '') return '';
                return String(value).trim();
            }

            extractYesNoValue(value, fieldConfig, context) {
                if (fieldConfig.customOptions && Array.isArray(fieldConfig.customOptions)) {
                    const option = fieldConfig.customOptions.find(opt => opt.value === value);
                    if (option) {
                        const label = option.label;
                        return typeof label === 'object' ? 
                            (label[context.language] || label.en || label.fr) : 
                            label;
                    }
                }
                
                if (value === true || value === 'yes') {
                    return context.getText('common.yes') || 'Oui';
                } else if (value === false || value === 'no') {
                    return context.getText('common.no') || 'Non';
                }
                
                return value;
            }

            extractSelectValue(value, fieldConfig, context) {
                if (!value) return '';
                return this.getOptionDisplayName(fieldConfig.optionsPath, value, context);
            }

            extractMultiSelectValue(value, fieldConfig, context) {
                if (!Array.isArray(value) || value.length === 0) return [];
                
                return value.map(item => 
                    this.getOptionDisplayName(fieldConfig.optionsPath, item, context)
                ).filter(Boolean);
            }

            extractSelectWithOtherValue(value, fieldConfig, context) {
                if (typeof value === 'object' && value.main) {
                    if (value.main === 'other' && value.other) {
                        return value.other.trim();
                    }
                    return this.getOptionDisplayName(fieldConfig.optionsPath, value.main, context);
                }
                
                return this.getOptionDisplayName(fieldConfig.optionsPath, value, context);
            }

            extractMultiSelectWithOtherValue(value, fieldConfig, context) {
                if (typeof value === 'object' && value.main) {
                    const mainValues = Array.isArray(value.main) ? 
                        value.main.map(v => this.getOptionDisplayName(fieldConfig.optionsPath, v, context)) : [];
                    
                    if (value.other && value.other.trim()) {
                        mainValues.push(value.other.trim());
                    }
                    return mainValues.filter(Boolean);
                }
                
                return Array.isArray(value) ? 
                    value.map(v => this.getOptionDisplayName(fieldConfig.optionsPath, v, context)).filter(Boolean) : 
                    [];
            }

            extractYesNoWithOptionsValue(value, fieldConfig, context) {
                this.log(`🔍 Extracting yesno-with-options value:`, value);
                this.log(`🔍 Field config:`, fieldConfig);
                
                // Handle the case where value is already a flattened string (from form submission)
                if (typeof value === 'string') {
                    // Try to parse the flattened format
                    // Examples: "yes, item1, item2" or "no" or "multilingual, English, Español"
                    const parts = value.split(', ').map(part => part.trim());
                    const mainValue = parts[0];
                    
                    this.log(`🔍 Parsed string parts:`, parts);
                    
                    let extractedMain = mainValue;
                    if (fieldConfig.customOptions && Array.isArray(fieldConfig.customOptions)) {
                        const option = fieldConfig.customOptions.find(opt => opt.value === mainValue);
                        if (option) {
                            const label = option.label;
                            extractedMain = typeof label === 'object' ? 
                                (label[context.language] || label.en || label.fr) : 
                                label;
                        }
                    } else {
                        extractedMain = mainValue === 'yes' ? context.getText('common.yes') :
                                      mainValue === 'no' ? context.getText('common.no') :
                                      mainValue;
                    }
                    
                    const conditionalValues = {};
                    
                    // If there are additional parts, they represent conditional values
                    if (parts.length > 1) {
                        const conditionalItems = parts.slice(1);
                        
                        // Determine if this should be yesValues or noValues based on main value
                        let shouldExtractYes = false;
                        if (fieldConfig.customOptions && Array.isArray(fieldConfig.customOptions)) {
                            shouldExtractYes = mainValue === fieldConfig.customOptions[0].value;
                        } else {
                            shouldExtractYes = mainValue === 'yes' || mainValue === true;
                        }
                        
                        if (shouldExtractYes) {
                            conditionalValues.yesValues = conditionalItems.length === 1 ? conditionalItems[0] : conditionalItems;
                        } else {
                            conditionalValues.noValues = conditionalItems.length === 1 ? conditionalItems[0] : conditionalItems;
                        }
                    }
                    
                    const result = { main: extractedMain, conditionalValues };
                    this.log(`🔍 String extraction result:`, result);
                    return result;
                }
                
                // Handle structured object format
                if (typeof value !== 'object' || !value || value.main === undefined) {
                    this.log(`🔍 Invalid object format, returning empty`);
                    return { main: '', conditionalValues: {} };
                }
                
                // Extract main value
                let mainValue = this.extractYesNoValue(value.main, fieldConfig, context);
                
                // Determine which conditional fields to extract
                const conditionalValues = {};
                let shouldExtractYes = false;
                let shouldExtractNo = false;
                
                if (fieldConfig.customOptions && Array.isArray(fieldConfig.customOptions)) {
                    shouldExtractYes = value.main === fieldConfig.customOptions[0].value;
                    shouldExtractNo = value.main === fieldConfig.customOptions[1].value;
                } else {
                    shouldExtractYes = value.main === true || value.main === 'yes';
                    shouldExtractNo = value.main === false || value.main === 'no';
                }
                
                // Extract conditional values
                if (shouldExtractYes && value.yesValues) {
                    conditionalValues.yesValues = this.extractConditionalValues(
                        value.yesValues, 
                        fieldConfig.yesFields || [fieldConfig.yesField].filter(Boolean), 
                        context
                    );
                }
                
                if (shouldExtractNo && value.noValues) {
                    conditionalValues.noValues = this.extractConditionalValues(
                        value.noValues, 
                        [fieldConfig.noField].filter(Boolean), 
                        context
                    );
                }
                
                const result = { main: mainValue, conditionalValues };
                this.log(`🔍 Object extraction result:`, result);
                return result;
            }

            extractConditionalValues(valuesObject, fieldConfigs, context) {
                const extracted = {};
                
                if (!valuesObject || !fieldConfigs) return extracted;
                
                fieldConfigs.forEach(fieldConfig => {
                    if (!fieldConfig) return;
                    
                    const value = valuesObject[fieldConfig.id];
                    if (value !== undefined && value !== null && value !== '') {
                        const extractor = this.fieldExtractors.get(fieldConfig.type) || 
                                        this.fieldExtractors.get('text');
                        extracted[fieldConfig.id] = extractor(value, fieldConfig, context);
                    }
                });
                
                return extracted;
            }

            // ============================================================================
            // OPTIONS HANDLING WITH CACHING
            // ============================================================================
            getOptionDisplayName(optionsPath, value, context) {
                if (!optionsPath || !value) return value;
                
                // Try to get from cache first
                const cacheKey = `${optionsPath}:${context.language}`;
                let options = this.optionsCache.get(cacheKey);
                
                if (!options && context.getData) {
                    options = context.getData(optionsPath);
                    this.optionsCache.set(cacheKey, options);
                }
                
                if (!options || !Array.isArray(options)) return value;
                
                const option = options.find(opt => opt.id === value);
                if (option) {
                    const name = option.name;
                    if (typeof name === 'object') {
                        return name[context.language] || name.en || name.fr || value;
                    }
                    return name || option.label || value;
                }
                
                return value;
            }

            // ============================================================================
            // ENHANCED SECTION-BASED DATA TRANSFORMATION
            // ============================================================================
            createStructuredTransformer(transformationConfig) {
                return (flatData, originalFormValues, creatFormInstance) => {
                    const context = this.createTransformationContext(flatData, originalFormValues, creatFormInstance);
                    
                    this.log('Starting structured transformation', {
                        flatDataKeys: Object.keys(flatData),
                        originalFormValuesKeys: Object.keys(originalFormValues),
                        configSections: Object.keys(transformationConfig.sections || {})
                    });
                    
                    const sections = {};
                    
                    // Build each configured section using the registered section builders
                    Object.entries(transformationConfig.sections || {}).forEach(([sectionId, sectionConfig]) => {
                        try {
                            this.log(`🔧 Processing section ${sectionId}`);
                            
                            // Always try to use the registered section builder first
                            if (this.sectionBuilders.has(sectionId)) {
                                this.log(`🔧 Building section ${sectionId} with custom builder`);
                                const sectionData = this.sectionBuilders.get(sectionId)(sectionConfig, context);
                                this.log(`🔧 Section ${sectionId} data:`, sectionData);
                                
                                if (sectionData && Object.keys(sectionData).length > 1) { // More than just sectionType
                                    sections[sectionId] = sectionData;
                                    this.log(`✅ Section ${sectionId} added successfully`);
                                } else {
                                    this.log(`⚠️ Section ${sectionId} has no data or only sectionType`);
                                }
                            } else {
                                this.log(`⚠️ No custom builder found for section ${sectionId}, using default builder`);
                                const sectionData = this.buildSection(sectionId, sectionConfig, context);
                                this.log(`🔧 Default section ${sectionId} data:`, sectionData);
                                
                                if (sectionData && Object.keys(sectionData).length > 1) {
                                    sections[sectionId] = sectionData;
                                    this.log(`✅ Section ${sectionId} added successfully`);
                                }
                            }
                        } catch (error) {
                            console.error(`❌ Error building section ${sectionId}:`, error);
                            this.log(`❌ Error details for section ${sectionId}:`, error.stack);
                        }
                    });
                    
                    // Create final structured payload
                    const structuredPayload = {
                        submissionType: transformationConfig.submissionType || "form_submission",
                        formVersion: transformationConfig.formVersion || "1.0.0",
                        submissionTimestamp: new Date().toISOString(),
                        language: context.language,
                        
                        sections: sections,
                        
                        // Legacy flat data for backwards compatibility
                        flatData: flatData,
                        
                        // Generate metadata
                        metadata: this.generateMetadata(flatData, originalFormValues, context, transformationConfig)
                    };
                    
                    this.log('Structured transformation completed', {
                        sectionsCreated: Object.keys(sections),
                        totalFields: Object.keys(flatData).length
                    });
                    
                    return structuredPayload;
                };
            }

            createTransformationContext(flatData, originalFormValues, creatFormInstance) {
                return {
                    flatData,
                    originalFormValues,
                    creatFormInstance,
                    language: creatFormInstance?.config?.language || this.config.defaultLanguage,
                    getText: (path) => creatFormInstance?.getText?.(path) || path,
                    getData: (path) => creatFormInstance?.getData?.(path) || [],
                    // Enhanced extractValue that works with raw form values
                    extractValue: (fieldId, fieldConfig) => {
                        // Get the raw value from originalFormValues (this contains the actual field values)
                        const rawValue = originalFormValues[fieldId];
                        
                        this.log(`🔍 Extracting value for ${fieldId}:`, rawValue);
                        
                        if (rawValue === undefined || rawValue === null) {
                            this.log(`⚠️ No value found for ${fieldId}`);
                            return '';
                        }
                        
                        const extractor = this.fieldExtractors.get(fieldConfig?.type) || 
                                        this.fieldExtractors.get('text');
                        
                        const result = extractor(rawValue, fieldConfig || { type: 'text' }, this.createTransformationContext(flatData, originalFormValues, creatFormInstance));
                        
                        this.log(`🔍 Extracted result for ${fieldId}:`, result);
                        
                        return result;
                    }
                };
            }

            buildSection(sectionId, sectionConfig, context) {
                // Default section building
                const sectionData = {
                    sectionType: sectionId,
                    ...sectionConfig.staticFields || {}
                };
                
                // Process field mappings if configured
                if (sectionConfig.fieldMappings) {
                    Object.entries(sectionConfig.fieldMappings).forEach(([targetField, sourceConfig]) => {
                        const value = this.extractMappedFieldValue(sourceConfig, context);
                        if (value !== null && value !== undefined && value !== '') {
                            sectionData[targetField] = value;
                        }
                    });
                }
                
                return sectionData;
            }

            extractMappedFieldValue(sourceConfig, context) {
                if (typeof sourceConfig === 'string') {
                    // Simple field mapping
                    return context.extractValue(sourceConfig, { type: 'text' });
                }
                
                if (typeof sourceConfig === 'object') {
                    const { sourceField, fieldConfig, transformer, fallback } = sourceConfig;
                    
                    let value = context.extractValue(sourceField, fieldConfig);
                    
                    // Apply custom transformer
                    if (transformer && typeof transformer === 'function') {
                        try {
                            value = transformer(value, context);
                        } catch (error) {
                            console.error('Error in field transformer:', error);
                        }
                    }
                    
                    // Apply fallback if needed
                    if ((value === null || value === undefined || value === '') && fallback) {
                        value = typeof fallback === 'function' ? fallback(context) : fallback;
                    }
                    
                    return value;
                }
                
                return null;
            }

            generateMetadata(flatData, originalFormValues, context, transformationConfig) {
                const metadata = {
                    submissionQuality: this.assessSubmissionQuality(originalFormValues, transformationConfig),
                    completedFields: Object.keys(originalFormValues).filter(key => {
                        const value = originalFormValues[key];
                        return value !== undefined && value !== null && value !== '' && 
                               !(Array.isArray(value) && value.length === 0);
                    }).length,
                    totalFields: Object.keys(originalFormValues).length,
                    deviceInfo: {
                        userAgent: navigator.userAgent,
                        language: navigator.language,
                        timestamp: new Date().toISOString()
                    }
                };
                
                // Add custom metadata if configured
                if (transformationConfig.metadataGenerators) {
                    Object.entries(transformationConfig.metadataGenerators).forEach(([key, generator]) => {
                        if (typeof generator === 'function') {
                            try {
                                metadata[key] = generator(flatData, originalFormValues, context);
                            } catch (error) {
                                console.error(`Error generating metadata for ${key}:`, error);
                            }
                        }
                    });
                }
                
                return metadata;
            }

            assessSubmissionQuality(formValues, config) {
                if (config.qualityAssessment && typeof config.qualityAssessment === 'function') {
                    try {
                        return config.qualityAssessment(formValues);
                    } catch (error) {
                        console.error('Error in quality assessment:', error);
                    }
                }
                
                // Default quality assessment
                const totalFields = Object.keys(formValues).length;
                const completedFields = Object.values(formValues).filter(value => 
                    value !== undefined && value !== null && value !== '' && 
                    !(Array.isArray(value) && value.length === 0)
                ).length;
                
                const completionPercentage = totalFields > 0 ? (completedFields / totalFields) * 100 : 0;
                
                if (completionPercentage >= 90) return 'excellent';
                if (completionPercentage >= 70) return 'good';
                if (completionPercentage >= 50) return 'fair';
                return 'basic';
            }

            log(message, data = null) {
                if (this.config.enableLogging) {
                    console.log(`${this.config.logPrefix} ${message}`, data || '');
                }
            }

            clearCache() {
                this.optionsCache.clear();
            }
        }

        // ============================================================================
        // TRANSFORMATION CONFIG BUILDER
        // ============================================================================
        class TransformationConfigBuilder {
            constructor() {
                this.config = {
                    sections: {},
                    metadataGenerators: {},
                    visibilityRules: {}
                };
            }

            addSection(sectionId, sectionConfig) {
                this.config.sections[sectionId] = sectionConfig;
                return this;
            }

            addMetadataGenerator(key, generator) {
                this.config.metadataGenerators[key] = generator;
                return this;
            }

            setSubmissionType(type) {
                this.config.submissionType = type;
                return this;
            }

            setFormVersion(version) {
                this.config.formVersion = version;
                return this;
            }

            build() {
                return this.config;
            }
        }
        


// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FormFieldFactory, CreatForm, MultiStepForm };
} else {
    window.FormFieldFactory = FormFieldFactory;
window.CreatForm = CreatForm;
window.MultiStepForm = MultiStepForm;
}

// Export for module usage
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = { FormFieldFactory, CreatForm, MultiStepForm, DataTransformerFactory, TransformationConfigBuilder };
// } else {
//     window.FormFieldFactory = FormFieldFactory;
// window.CreatForm = CreatForm;
// window.MultiStepForm = MultiStepForm;
// window.DataTransformerFactory = DataTransformerFactory;
// window.TransformationConfigBuilder = TransformationConfigBuilder;
// }
