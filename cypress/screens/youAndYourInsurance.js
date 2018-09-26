var utils = require('../utils/utils')

/*
* Validate the url
*/
function waitForPage() {
	utils.validateURL('youAndYourInsurance.xhtml')
}

/*
* Fill up the form
*/
function enterDetails() {
	waitForPage()

	cy.get('#title').select('MR')
	cy.get('#firstName').type('TestFirstName')
	cy.get('#lastName').type('TestLastName')
	cy.get('#email').type('test@test.com')
	cy.get('#confirmEmail').type('test@test.com')
	cy.get('#phoneNight').type('25354256823')
	cy.get('#label_claimsFlag_1').click()
	cy.get('#label_convictionsFlag_1').click()
	cy.get('#label_noOfAdditionalDrivers_1').click()
	cy.get('#sourceCode').select('email')
}

exports.waitForPage = waitForPage
exports.enterDetails = enterDetails