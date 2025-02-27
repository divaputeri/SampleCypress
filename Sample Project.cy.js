describe('template spec', () => {

  beforeEach(() => 
    { //untuk buka laman login pada setiap tes
    cy.visit('https://forms.office.com/pages/responsepage.aspx?id=is2XW8LLaEmfFhLKD9VwE9lpKmxdveNGmMWKETZvAWNUMzhBV1lYTlc1SDNRS00xRVg4OFhPODlQTS4u')
    //cy.wait(5000)
    cy.on('uncaught:exception', (err) => /webAnalyticsPlugin|_satellite/.test(err.message) && false);
    
  });

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

  it('Validasi Form Valid Affordable', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="5 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.contains('Your response was submitted').should('exist')
  })

  it('Validasi Form Valid Expensive', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('[data-automation-value="Expensive"]').click()
    cy.get('[aria-label="5 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.contains('Your response was submitted').should('exist')
  })

  it('Validasi Form Valid Other', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('.-mc-74 > .-a-85 > .-gZ-86').type('Other')
    cy.get('[aria-label="5 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.contains('Your response was submitted').should('exist')
  })

  it('Validasi 1 Star', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="1 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.contains('Your response was submitted').should('exist')
  })

  it('Validasi 2 Stars', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="2 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.contains('Your response was submitted').should('exist')
  })
  
  it('Validasi 3 Stars', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="3 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.contains('Your response was submitted').should('exist')
  })

  it('Validasi 4 Stars', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="4 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.contains('Your response was submitted').should('exist')
  })

  it('Validasi 5 Stars', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="5 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.contains('Your response was submitted').should('exist')
  })
  
  it('Mandatory field: Nama kosong', () => {
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="5 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.get('[data-automation-id="validationError"]').should('exist')
    cy.get('[data-automation-id="submitError"]').should('exist')
  })

  it('Mandatory field: Phone number kosong', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="5 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.get('[data-automation-id="validationError"]').should('exist')
    cy.get('[data-automation-id="submitError"]').should('exist')
  })

  it('Mandatory field: IsAffordable kosong', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('[aria-label="5 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(5) > :nth-child(4) > .dayButton-341 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.get('[data-automation-id="validationError"]').should('exist')
    cy.get('[data-automation-id="submitError"]').should('exist')
  })

  it('Mandatory field: Rate kosong', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(5) > :nth-child(4) > .dayButton-340 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.get('[data-automation-id="validationError"]').should('exist')
    cy.get('[data-automation-id="submitError"]').should('exist')
  })

  it('Mandatory field: Review date kosong', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="5 Star"]').click()
    cy.contains('Submit').click()
    cy.get('[data-automation-id="validationError"]').should('exist')
    cy.get('[data-automation-id="submitError"]').should('exist')
  })

  it('Form Invalid: Phone number bukan angka', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('Bukan angka')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="5 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.get('[data-automation-id="submitError"]').should('exist')
  })

  it('Form Invalid: Phone number <7', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('123456')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="5 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.get('[data-automation-id="submitError"]').should('exist')
  })

  it('Form Invalid: Phone number >15', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('1234567891234560')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="5 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.get('[data-automation-id="submitError"]').should('exist')
  })

  it('Form Invalid: Tidak isi field Other pada IsAffordable', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('Bukan angka')
    cy.get('[aria-label="Other answer"]').click({ multiple: true })
    cy.get('[aria-label="5 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.get('[data-automation-id="validationError"]').should('exist')
    cy.get('[data-automation-id="submitError"]').should('exist')
  })

  it('Form Invalid: Tanggal masa depan', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="5 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(7) > :nth-child(6) > .dayButton-342 > span').click({ force: true })
    cy.contains('Submit').click()
    cy.get('[data-automation-id="submitError"]').should('exist')
  })

  it('Enable Immersive Reader', () => {
    cy.get('[aria-label="More options"]').click()
    cy.contains('Enable Immersive Reader').click()
    cy.get('[aria-label="Immersive Reader"]').should('exist')
  }) 

  it('Disable Immersive Reader', () => {
    cy.get('[aria-label="More options"]').click()
    cy.contains('Enable Immersive Reader').click()
    cy.get('[aria-label="More options"]').click()
    cy.contains('Disable Immersive Reader').click()
    cy.get('[aria-label="Immersive Reader"]').should('not.exist')
  })

  it('Clear Form', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="5 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.get('[aria-label="More options"]').click()
    cy.contains('Clear Form').click()
    cy.contains('button', 'Clear Form').click()
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').should('be.empty')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').should('be.empty')
    cy.get('[data-automation-id="choiceItem"]').should('not.be.selected')
    cy.get('[aria-labelledby="QuestionId_r9f97f2550332479a8fdd2914bd99bc1d QuestionInfo_r9f97f2550332479a8fdd2914bd99bc1d"]').should('not.be.selected')
    cy.get('[aria-label="Date picker"]').should('be.empty')
  })

  it('Cancel Clear Form', () => {
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').type('Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').type('0888888888')
    cy.get('[data-automation-value="Affordable"]').click()
    cy.get('[aria-label="5 Star"]').click()
    cy.get('[aria-label="Date picker"]').click()
    cy.get(':nth-child(6) > :nth-child(3) > .dayButton-342 > span').click({ force: true })
    cy.get('[aria-label="More options"]').click()
    cy.contains('Clear Form').click()
    cy.contains('button', 'Cancel').click()
    cy.get('[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').should('have.value','Diva')
    cy.get('[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').should('have.value','0888888888')
    cy.get('[data-automation-id="choiceItem"]').should('not.be.empty')
    cy.get('[aria-labelledby="QuestionId_r9f97f2550332479a8fdd2914bd99bc1d QuestionInfo_r9f97f2550332479a8fdd2914bd99bc1d"]').should('not.be.empty')
    cy.get('#DatePicker0-label').should('have.value','2/18/2025')
  })

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

})