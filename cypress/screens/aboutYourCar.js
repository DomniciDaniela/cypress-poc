var utils = require('../utils/utils')
/*
* Validate the url
*/
function waitForPage() {
	utils.validateURL('aboutYourCar.xhtml')
}

/*
* Fill up the form
*/
function enterDetails() {
	waitForPage()

	cy.get('#legalOwner').select('Proposer')
	cy.get('#registeredKeeper').select('Proposer')
	cy.get('#carUsage').select('SDP&C + Business use by you')
	cy.get('#securityDevice').select('None Fitted')
	cy.get('#carValueRaw').type('2500')
	cy.get('#label_trackerFitted_1').click()
	cy.get('#annualMileage').select('1001 - 2000 miles')
	cy.get('#label_differentPostcode_1').click()
	cy.get('#overnightLocation').select('Driveway')

	cy.get('input[name="carPurchaseDate.day"]').type('12') // unable to set the DOB
	cy.get('input[name="carPurchaseDate.month"]').type('12')
	cy.get('input[name="carPurchaseDate.year"]').type('2015')
	cy.get('#coverRequired').select('Comprehensive')
	cy.get('#label_hasMods_1').click()
}

exports.waitForPage = waitForPage
exports.enterDetails = enterDetails