document.addEventListener('DOMContentLoaded', () => {

    // Helper function to safely set the value of an input/textarea
    const safeSetValue = (id, value) => {
        const element = document.getElementById(id);
        // Check if element exists and value is not null/undefined
        if (element && value !== undefined && value !== null) {
            element.value = value;
        }
    };

    // Helper function to set the state of checkboxes
    const setCheckboxStates = (name, values) => {
        if (values && Array.isArray(values)) {
            values.forEach(value => {
                const checkbox = document.querySelector(`input[name="${name}"][value="${value}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
    };

    // Get data from URL params or sessionStorage
    const urlParams = new URLSearchParams(window.location.search);
    const clientName = urlParams.get('name');
    const clientPhone = urlParams.get('phone');
    const clientStatus = urlParams.get('status');
    const dataString = sessionStorage.getItem('currentClientData');

    if (dataString) {
        // If full data object exists in session, populate everything from it
        const clientInfo = JSON.parse(dataString);
        
        // --- Populate General Details ---
        safeSetValue('businessName', clientInfo.businessName);
        safeSetValue('contactName', clientInfo.contactName);
        safeSetValue('phoneNumber', clientInfo.phoneNumber);
        safeSetValue('emailContact', clientInfo.emailContact);
        safeSetValue('businessField', clientInfo.businessField);
        safeSetValue('assessmentDate', clientInfo.assessmentDate);

        // --- Populate Section 1 ---
        safeSetValue('businessGoals', clientInfo.businessGoals);
        safeSetValue('businessBottleneck', clientInfo.businessBottleneck);

        // --- Populate Section 2 ---
        safeSetValue('kpiCac', clientInfo.cac);
        safeSetValue('kpiLtv', clientInfo.ltv);
        safeSetValue('kpiMostImportant', clientInfo.mostImportant);

        // --- Populate Section 3 ---
        safeSetValue('humanFactorShortcut', clientInfo.shortcut);
        safeSetValue('humanFactorFrustration', clientInfo.frustration);

        // --- Populate Section 4 ---
        safeSetValue('dataStorage', clientInfo.storage);
        safeSetValue('dataMissingInfo', clientInfo.missingInfo);

        // --- Populate Section 5 ---
        setCheckboxStates('leadSource', clientInfo.leadSources);
        safeSetValue('leadProcess', clientInfo.leadProcess);

        // --- Populate Section 6 ---
        safeSetValue('salesTimeWasters', clientInfo.timeWasters);
        safeSetValue('salesFollowUp', clientInfo.followUp);

        // --- Populate Section 7 ---
        safeSetValue('serviceFaq', clientInfo.faq);
        safeSetValue('serviceOnboarding', clientInfo.onboarding);

        // --- Populate Section 8 ---
        safeSetValue('opsSystems', clientInfo.systems);
        safeSetValue('opsManualCopy', clientInfo.manualCopy);

        // --- Populate Section 9 ---
        safeSetValue('summaryFindings', clientInfo.findings);
        safeSetValue('summaryOpportunities', clientInfo.opportunities);
        safeSetValue('summaryNextSteps', clientInfo.nextSteps);

    } else {
        // Fallback for simple cases where only name and phone are passed
        if (clientName) {
            const clientNameInput = document.getElementById('contactName');
            if(clientNameInput) clientNameInput.value = decodeURIComponent(clientName);
        }

        if (clientPhone) {
            const clientPhoneInput = document.getElementById('phoneNumber');
            if(clientPhoneInput) clientPhoneInput.value = decodeURIComponent(clientPhone);
        }
    }

    const accordionButtons = document.querySelectorAll('.accordion-button');
    const formElements = document.querySelectorAll('.form-input, .form-textarea, .form-select, .form-checkbox');
    const progressBar = document.getElementById('progressBar');
    const totalElements = formElements.length;

    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            button.classList.toggle('open');
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.paddingTop = null;
                content.style.paddingBottom = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.paddingTop = "1.5rem";
                content.style.paddingBottom = "1.5rem";
            } 
        });
    });

    if(accordionButtons.length > 0) {
        accordionButtons[0].click();
    }

    // Set date only if it wasn't populated from clientInfo
    if (!document.getElementById('assessmentDate').value) {
        document.getElementById('assessmentDate').valueAsDate = new Date();
    }
    
    const updateProgress = () => {
        let completedCount = 0;
        formElements.forEach(el => {
            if ((el.type === 'checkbox' && el.checked) || (el.type !== 'checkbox' && el.value.trim() !== '')) {
                completedCount++;
            }
        });
        const percentage = (completedCount / totalElements) * 100;
        progressBar.style.width = percentage + '%';
    };

    formElements.forEach(el => {
        el.addEventListener('input', updateProgress);
        el.addEventListener('change', updateProgress);
    });
    
    updateProgress();
    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        saveButton.addEventListener('click', saveClientData);
    }
    
    async function saveClientData() {
        // 1. Get the ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');

        if (!userId) {
            alert('User ID not found in URL. Cannot update data.');
            return;
        }

        const getCheckedValues = (name) => {
            const checkedCheckboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
            return Array.from(checkedCheckboxes).map(checkbox => checkbox.value);
        };

        // 2. Collect all data from the form
        const clientData = {
            // General Details
            businessName: document.getElementById('businessName').value,
            contactName: document.getElementById('contactName').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            emailContact: document.getElementById('emailContact').value,
            businessField: document.getElementById('businessField').value,
            assessmentDate: document.getElementById('assessmentDate').value,
            status: clientStatus || 'In progress' ,
            // Section 1
            businessGoals: document.getElementById('businessGoals').value,
            businessBottleneck: document.getElementById('businessBottleneck').value,
            // Section 2
            cac: document.getElementById('kpiCac').value,
            ltv: document.getElementById('kpiLtv').value,
            mostImportant: document.getElementById('kpiMostImportant').value,
            // Section 3
            shortcut: document.getElementById('humanFactorShortcut').value,
            frustration: document.getElementById('humanFactorFrustration').value,
            // Section 4
            storage: document.getElementById('dataStorage').value,
            missingInfo: document.getElementById('dataMissingInfo').value,
            // Section 5
            leadSources: getCheckedValues('leadSource'),
            leadProcess: document.getElementById('leadProcess').value,
            // Section 6
            timeWasters: document.getElementById('salesTimeWasters').value,
            followUp: document.getElementById('salesFollowUp').value,
            // Section 7
            faq: document.getElementById('serviceFaq').value,
            onboarding: document.getElementById('serviceOnboarding').value,
            // Section 8
            systems: document.getElementById('opsSystems').value,
            manualCopy: document.getElementById('opsManualCopy').value,
            // Section 9
            findings: document.getElementById('summaryFindings').value,
            opportunities: document.getElementById('summaryOpportunities').value,
            nextSteps: document.getElementById('summaryNextSteps').value,
        };

        console.log('Client Data to be sent:', clientData);

        // 3. Send the data to the server
        try {
            const response = await fetch(`/api/clients/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientData),
            });

            if (response.ok) {
                alert('Client data updated successfully!');
                const result = await response.json();
                console.log('Server response:', result);
            } else {
                const errorData = await response.json();
                console.error('Failed to update client data:', errorData);
                alert(`Error updating data: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Network error while saving client data: ', error);
            alert('A network error occurred. Please try again.');
        }
    }
});
