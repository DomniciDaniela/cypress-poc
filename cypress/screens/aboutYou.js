
var utils = require('../utils/utils')

/*
* Validate the url
*/
function waitForPage() {
	utils.validateURL('aboutYou.xhtml')
}

/*
* Fill up the form
*/
function enterDetails() {
	waitForPage()
	// Submit aboutYou form
	cy.get('input[name="input-dob.day"]').type('12') // unable to set the DOB
	cy.get('input[name="input-dob.month"]').type('12')
	cy.get('input[name="input-dob.year"]').type('1980')
	cy.get('#label_ukResident_0').click()
	cy.get('#employmentStatus').select('Retired')
	cy.get('#label_gender_0').click()
	cy.get('#maritalStatus').select('Married/Civil Partnership')
	cy.get('#motorNumberOfChildren').select('None')
	cy.get('#residentialStatus').select('Home owner')
	cy.get('#numberOfHouseholdCars').select('1')
	cy.get('#useOtherCars').select('No')
	cy.get('#licenseType').select('Full UK Licence')
	cy.get('#licenceHeldYearList').select('6')
	cy.get('#ncd').select('1')

    cy.get('#registrationNumber').type('ABC123')
	cy.get('#postCode').clear().type('CR5 2QY')

	utils.clickFindAddress()
	cy.get('#addressList').select('1 Longlands Avenue, Coulsdon, Surrey, CR5 2QY')
	cy.get('#label_coverDeclarations_0').click()
	cy.get('#label_additionalCoverDeclarations_0').click()
}

exports.waitForPage = waitForPage
exports.enterDetails = enterDetails