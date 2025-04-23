describe('Feedback Form Tests', () => {
    beforeEach(() => {
        cy.visit('https://forms.office.com/pages/responsepage.aspx?id=is2XW8LLaEmfFhLKD9VwE9lpKmxdveNGmMWKETZvAWNUMzhBV1lYTlc1SDNRS00xRVg4OFhPODlQTS4u')
        cy.on('uncaught:exception', (err) => /webAnalyticsPlugin|_satellite/.test(err.message) && false);
    
    });

    function fillForm(name, phone, affordability, rating, date, otherText, isAssert=false, emptyForm) {
        if (name) cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type(name);
        if (phone) cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type(phone);
        if (affordability) {
            if (affordability === 'Other answer') {
                cy.get('.-mb-74 > .-a-85 > .-gY-86').click();
                if (otherText) {
                    cy.get('.-na-91 > .-aq-67').type(otherText);
                }
            } else {
                cy.contains(affordability).click();
            }
        }
        if (rating) cy.get(`[aria-label="${rating} Star"]`).click();
        if (date) {
            cy.get('[aria-label="Date picker"]').click();
            cy.get(`[aria-label="${date}"]`).click({force: true})
        }
    }

    function assertFormCleared() {
        cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').should('be.empty');
        cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').should('be.empty');
        cy.get('[data-automation-id="choiceItem"]').should('not.be.selected');
        cy.get('[aria-labelledby="QuestionId_r9f97f2550332479a8fdd2914bd99bc1d QuestionInfo_r9f97f2550332479a8fdd2914bd99bc1d"]').should('not.be.selected');
        cy.get('[aria-label="Date picker"]').should('be.empty');
    }

    function assertFormFilled(name, phone, affordability, rating, date) {
        if (name) cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').should('have.value',name)
        if (phone) cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').should('have.value',phone);
        if (affordability) cy.get('[data-automation-id="choiceItem"]').should('not.be.empty');
        if (rating) cy.get('[aria-labelledby="QuestionId_r9f97f2550332479a8fdd2914bd99bc1d QuestionInfo_r9f97f2550332479a8fdd2914bd99bc1d"]').should('not.be.empty');
        if (date) cy.get('[aria-label="Date picker"]').should('have.value','3/1/2025');
    }

    it('Aksesibilitas', () => {
        cy.get('[id="FormTitleId_titleAriaId"]').should('contain.text', 'Review our product')
    })

    it('Elemen Form', () => {
        cy.get('[id="question-list"]').should('contain', 'Full name')
        cy.get('[id="question-list"]').should('contain', 'Phone Number')
        cy.get('[id="question-list"]').should('contain', 'Do you think your product or service is affordable or expensive?')
        cy.get('[id="question-list"]').should('contain', 'Rate our services')
        cy.get('[id="question-list"]').should('contain', 'Review date')
        cy.get('[data-automation-id="submitButton"]').should('contain','Submit')
        cy.get('[aria-label="More options"]').should('be.visible');
        cy.get('[id="branding-footer"]').should('exist') 
    })

    it('Submit form with valid data', () => {
        fillForm('Tono', '0888888888', 'Affordable', 5, '1, March, 2025');
        cy.contains('Submit').click();
        cy.contains('Your response was submitted').should('exist');
    });

    it('Validation error when submitting empty form', () => {
        cy.contains('Submit').click();
        cy.get('[data-automation-id="validationError"]').should('exist');
    });

    it('Phone number should accept only digits', () => {
        fillForm('Tono', 'abcd1234', 'Affordable', 5, '1, March, 2025');
        cy.contains('Submit').click();
        cy.contains('Please enter a valid phone number').should('exist');
    });

    it('Phone number should be at least 7 digits', () => {
        fillForm('Tono', '123456', 'Affordable', 5, '1, March, 2025');
        cy.contains('Submit').click();
        cy.contains('Please enter a valid phone number').should('exist');
    });

    it('Phone number should be at most 15 digits', () => {
        fillForm('Tono', '1234567890123456', 'Affordable', 5, '1, March, 2025');
        cy.contains('Submit').click();
        cy.contains('Please enter a valid phone number').should('exist');
    });

    const requiredFields = [
        { field: 'Full name', fill: (form) => fillForm('', form.phone, form.affordability, form.rating, form.date), question: 1 },
        { field: 'Phone number', fill: (form) => fillForm(form.name, '', form.affordability, form.rating, form.date), question: 2 },
        { field: 'Affordability', fill: (form) => fillForm(form.name, form.phone, '', form.rating, form.date), question: 3 },
        { field: 'Rating', fill: (form) => fillForm(form.name, form.phone, form.affordability, '', form.date), question: 4 },
        { field: 'Date', fill: (form) => fillForm(form.name, form.phone, form.affordability, form.rating, ''), question: 5 },
    ];

    requiredFields.forEach(({ field, fill, question }) => {
        it(`${field} should be required`, () => {
            const form = { name: 'Tono', phone: '0888888888', affordability: 'Affordable', rating: 5, date: '1, March, 2025' };
            fill(form);
            cy.contains('Submit').click();
            cy.get('[data-automation-id="validationError"]').should('exist');
            cy.contains(`1 question(s) need to be completed before submitting: Question ${question}.`).should('exist');
        });
    });

    ['Affordable', 'Expensive', 'Other answer'].forEach(option => {
        it(`Validates ${option} option selection`, () => {
            let otherText = undefined; 
            if(option === 'Other answer') {
                otherText = 'Other text';
            }
            fillForm('Tono', '0888888888', option, 5, '1, March, 2025', otherText);
            cy.contains('Submit').click();
            cy.contains('Your response was submitted').should('exist');
        });
    });

    it('Form Invalid: Tidak isi field Other pada IsAffordable', () => {
        fillForm('Tono', '0888888888', 'Other answer', 5, '1, March, 2025');
        cy.contains('Submit').click();
        cy.get('[data-automation-id="validationError"]').should('exist');
        cy.get('[data-automation-id="submitError"]').should('exist');
    });

    it('Form Invalid: Tanggal masa depan (3 hari ke depan)', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 3);
        const futureMonth = futureDate.toLocaleString('default', { month: 'long' }); // Mendapatkan nama bulan
        const futureYear = futureDate.getFullYear();
        const futureDay = futureDate.getDate();
        const date = `${futureDay}, ${futureMonth}, ${futureYear}`;

        fillForm('Tono', '0888888888', 'Affordable', 5, date);
        cy.contains('Submit').click();
        cy.get('[data-automation-id="submitError"]').should('exist');
    });
    
    [1, 2, 3, 4, 5].forEach(star => {
        it(`Validates ${star} star rating selection`, () => {
            fillForm('Tono', '0888888888', 'Affordable', star, '1, March, 2025');
            cy.contains('Submit').click();
            cy.contains('Your response was submitted').should('exist');
        });
    });

    it('Enable Immersive Reader', () => {
        cy.get('[aria-label="More options"]').click();
        cy.contains('Enable Immersive Reader').click();
        cy.get('[aria-label="Immersive Reader"]').should('exist');
    })

    it('Disable Immersive Reader', () => {
        cy.get('[aria-label="More options"]').click()
        cy.contains('Enable Immersive Reader').click()
        cy.get('[aria-label="More options"]').click()
        cy.contains('Disable Immersive Reader').click()
        cy.get('[aria-label="Immersive Reader"]').should('not.exist')
    })

    it('Clear Form', () => {
        fillForm('Tono', '0888888888', 'Affordable', 5, '1, March, 2025'); // Mengisi form menggunakan fillForm
        cy.get('[aria-label="More options"]').click();
        cy.contains('Clear Form').click();
        cy.contains('button', 'Clear Form').click();
        assertFormCleared() 
    })

    it.only('Cancel Clear Form', () => {
        const date = '1, March, 2025';
        fillForm('Tono', '0888888888', 'Affordable', 5, date);
        assertFormFilled('Tono','0888888888','Affordable',5,date)
        cy.get('[aria-label="More options"]').click();
        cy.contains('Clear Form').click();
        cy.contains('button', 'Cancel').click();
         assertFormFilled('Tono','0888888888','Affordable',5,date)
    });

    it('Report Abuse', () => {
        cy.contains('Report abuse').click()
        cy.url().should('include', 'View=ReportAbuse')
    })

    it('Create Form', () => {
        cy.contains('Create my own form').click()
        cy.url().should('include', 'https://forms.office.com/')
    })

    it('Terms of Use', () => {
        cy.contains('Terms of use').scrollIntoView().should('be.visible')
            .invoke('removeAttr', 'target').click({ force: true });
        cy.origin('https://www.microsoft.com', () => {
            cy.on('uncaught:exception', (err) => err.message.includes('_satellite') && false);
            cy.url().should('include', '/servicesagreement');
        })
    })
    
    it('Report Abuse :Phising', () => {
        cy.contains('Report abuse').click()
        cy.get('#Phishing').click()
        cy.get('[aria-labelledby="ReportAbuseId_CommentsTitle"]').type('Yes')
        cy.contains('Submit').click()
        cy.contains('Your report was submitted').should('exist')
    })

    it('Report Abuse :Infringement', () => {
        cy.contains('Report abuse').click()
        cy.get('#ContentInfringement').click()
        cy.contains('Report copyright infringement to Microsoft').click()
        cy.on('uncaught:exception', (err) => {
            if (err.message.includes("Cannot read properties of undefined (reading 'webAnalyticsPlugin')")) {
                return false};
        })
    })

    it('Report Abuse :Other', () => {
        cy.contains('Report abuse').click()
        cy.get('#Other').click()
        cy.get('[aria-labelledby="ReportAbuseId_CommentsTitle"]').type('Yes')
        cy.contains('Submit').click()
        cy.contains('Your report was submitted').should('exist')
    })
});
