var youAndYourInsurance = require('../screens/youAndYourInsurance')
var aboutYou = require('../screens/aboutYou')
var aboutYourCar = require('../screens/aboutYourCar')
/*
* Click on find address button
*/
function clickNextButton() {
	cy.get('#next').click({ force: true });
}

/*
* Click on find address button
*/
function clickFindAddress() {
	cy.get('#findAddress').click();
}

/*
* Helper method to validate the url
*/
function validateURL(sURL) {
	cy.url().should('include', sURL);
}

/*
* Helper method to close the cookie banner
*/
function closeCookieBanner() {
	cy.get('#ensCloseBanner').click();
}

/*
* Helper method to close the cookie banner
*/
function clickPrintQuote() {
	cy.get('.print-your-quote').click()
	validateURL('motorQuotePrintView.xhtml');
}

/*
* Save quote to file
*/
function saveQuoteToFile() {
	clickPrintQuote();
	cy.get('h3').invoke('text').then((text1) => {
		var premium = cy.get('#displayPremium > :nth-child(1) > :nth-child(2)').invoke('text').then((text2) => {
			var monthly = cy.get('#premiumAmountInstallments').invoke('text').then((text3) => {
				// TODO https://github.com/cypress-io/cypress/pull/2465 -> wait for this PR to be merge
				cy.writeFile('./results/quotes.txt', text1 + " " + " Premium is: " + text2 + " Monthly is: " + text3)
			})
		})
	})
}

/*
* Helper method to reach quote page
*/
function reachQuotePage() {
	cy.readFile('./data/testdata.json', 'ascii').then(function(content) {
		var url = content.TestConfig[0].url;
		for (var i=0; i<content.MotorTestData.length; i++) {
			cy.visit(url);
			closeCookieBanner();
			
			debugger;
			
			validateURL('youAndYourInsurance.xhtml');	
			cy.get('#title').select(content.MotorTestData[i].Title);
			cy.get('#firstName').clear().type(content.MotorTestData[i].Firstname);
			cy.get('#lastName').clear().type(content.MotorTestData[i].Surname);
			cy.get('#email').clear().type(content.MotorTestData[i].Email);
			cy.get('#confirmEmail').clear().type(content.MotorTestData[i].ConfirmEmail);
			cy.get('#phoneNight').clear().type(content.MotorTestData[i].MainPhone);
			
			if(content.MotorTestData[i].Claims === "N") {
				cy.get('#label_claimsFlag_1').click();
			} else {
				cy.get('#label_claimsFlag_0').click();
			}

			if(content.MotorTestData[i].Convictions === "N") {
				cy.get('#label_convictionsFlag_1').click();
			} else {
				cy.get('#label_convictionsFlag_0').click();
			}

			if(content.MotorTestData[i].AdditionalDriver === "N") {
				cy.get('#label_noOfAdditionalDrivers_1').click();
			} else {
				cy.get('#label_noOfAdditionalDrivers_0').click();
				 if (content.MotorTestData[i].MainDriver === "N") {
				 	cy.get('#description_mainDriverFlag_1').click();
				 } else {
				 	cy.get('#description_mainDriverFlag_0').click();
				 }
			}

			cy.get('#sourceCode').select(content.MotorTestData[i].VisitReason);


			clickNextButton();

			// Submit aboutYou form
			validateURL('aboutYou.xhtml');
			cy.get('input[name="input-dob.day"]').type(content.MotorTestData[i].DOBDay);
			cy.get('input[name="input-dob.month"]').type(content.MotorTestData[i].DOBMonth);
			cy.get('input[name="input-dob.year"]').type(content.MotorTestData[i].DOBYear);
			
			if(content.MotorTestData[i].AlwaysResident === "N") {
				cy.get('#label_ukResident_1').click();
			} else {
				cy.get('#label_ukResident_0').click();
			}

			cy.get('#employmentStatus').select(content.MotorTestData[i].EmploymentStatus);
 			if (content.MotorTestData[i].EmploymentStatus != "Retired") {
				cy.get('#occupationOther').clear().type(content.MotorTestData[i].Occupation);
				cy.get('#industry').clear().type(content.MotorTestData[i].Industry);
				if (content.MotorTestData[i].SecondOccupation === "Y") {
					cy.get('#label_secondaryOccupationFlag_0').click();
					cy.get('#secondaryOccupation').clear().type(content.MotorTestData[i].SecondOccupation);
				} else {
					cy.get('#description_secondaryOccupationFlag_1').click();
				}
 			}

			if (content.MotorTestData[i].Gender === "M") {
				cy.get('#label_gender_0').click();
			} else {
				cy.get('#label_gender_1').click();
			}

			cy.get('#maritalStatus').select(content.MotorTestData[i].MaritalStatus);
			cy.get('#motorNumberOfChildren').select(content.MotorTestData[i].ChildrenUnder16);
			cy.get('#residentialStatus').select(content.MotorTestData[i].ResidentialStatus);
			cy.get('#numberOfHouseholdCars').select(content.MotorTestData[i].HouseholdCars);
			cy.get('#useOtherCars').select(content.MotorTestData[i].OtherVehicleAccess);
			cy.get('#licenseType').select(content.MotorTestData[i].LicenceType);
			cy.get('#licenceHeldYearList').select(content.MotorTestData[i].LicenceHeld);
			cy.get('#ncd').select(content.MotorTestData[i].NCD);

			if(content.MotorTestData[i].Registration === "") {
				cy.get('#registrationNumber').click();
			}	else {
		    	cy.get('#registrationNumber').type(content.MotorTestData[i].Registration);
			}
			
			cy.get('#postCode').type(content.MotorTestData[i].HomePostcode);

			clickFindAddress();
			cy.get('#addressList').select(content.MotorTestData[i].HomeAddress);
			cy.get('#label_coverDeclarations_0').click();
			cy.get('#label_additionalCoverDeclarations_0').click();
			
			clickNextButton();
			
			// Complete your car search
			if (content.MotorTestData[i].Registration === "") {
				validateURL('yourCarSearch.xhtml');
				cy.get('#makeType').select(content.MotorTestData[i].VehicleMake);
				cy.get('#modelType').select(content.MotorTestData[i].VehicleModel);
				cy.get('#fuelType').select(content.MotorTestData[i].FuelType);
				cy.get('#transmissionType').select(content.MotorTestData[i].TransmissionType);
				
				cy.get('input[name="registrationDate.day"]').type(content.MotorTestData[i].RegistrationDay);
				cy.get('input[name="registrationDate.month"]').type(content.MotorTestData[i].RegistrationMonth);
				cy.get('input[name="registrationDate.year"]').type(content.MotorTestData[i].RegistrationYear);
			
				cy.get('#findVehicle').click();	
				cy.get('#carType').select(content.MotorTestData[i].CarID);

				clickNextButton();
			}

			
			// Complete about your car form
			validateURL('aboutYourCar.xhtml');
			cy.get('#legalOwner').select(content.MotorTestData[i].LegalOwner);
			cy.get('#registeredKeeper').select(content.MotorTestData[i].RegisteredKeeper);
			cy.get('#carUsage').select(content.MotorTestData[i].CarUse);
			cy.get('#securityDevice').select(content.MotorTestData[i].SecurityDevices);
			cy.get('#carValueRaw').type(content.MotorTestData[i].EstimatedValue);

			if(content.MotorTestData[i].TrackerFitted === "N") {
				cy.get('#label_trackerFitted_1').click();
			}	else {
		    	cy.get('#label_trackerFitted_0').click();
			}
			
			
			cy.get('#annualMileage').select(content.MotorTestData[i].EstimatedMileage);
			if(content.MotorTestData[i].IsCarKeptAtDifferentPostcode === "N") {
				cy.get('#label_differentPostcode_1').click();
				//cy.get('#carValueRaw').type(content.MotorTestData[i].OvernightPostcode);
			}	else {
		    	cy.get('#label_differentPostcode_0').click();
			}

			cy.get('#overnightLocation').select(content.MotorTestData[i].OvernightLocation);

			cy.get('input[name="carPurchaseDate.day"]').type(content.MotorTestData[i].PurchaseDay);
			cy.get('input[name="carPurchaseDate.month"]').type(content.MotorTestData[i].PurchaseMonth);
			cy.get('input[name="carPurchaseDate.year"]').type(content.MotorTestData[i].PurchaseYear);
			cy.get('#coverRequired').select(content.MotorTestData[i].CoverLevel);

			if(content.MotorTestData[i].CarModified === "N") {
				cy.get('#label_hasMods_1').click();
			}	else {
		    	cy.get('#label_hasMods_0').click();
		    	// TODO put modifications
			}

			clickNextButton();

			// Set main driver's claims
			if (content.MotorTestData[i].Claims === "Y") {
			    validateURL('aboutYourClaims.xhtml');
			    cy.get('#claimType').select(content.MotorTestData[i].Claim1Type);
			    cy.get('input[name="claimDate.day"]').type(content.MotorTestData[i].Claim1Day);
            	cy.get('input[name="claimDate.month"]').type(content.MotorTestData[i].Claim1Month);
            	cy.get('input[name="claimDate.year"]').type(content.MotorTestData[i].Claim1Year);
 				cy.get('#afaultClaimFlag_1').click();
 				cy.get('#addClaimButton').click();

            	clickNextButton();
			}

			// Set main driver's convictions
			if (content.MotorTestData[i].Convictions === "Y") {
			    validateURL('aboutYourConvictions.xhtml');
			    cy.get('#conviction').type(content.MotorTestData[i].MD1ConvCode);
			    cy.get('input[name="convictionDate.day"]').type(content.MotorTestData[i].MD1ConvDay);
            	cy.get('input[name="convictionDate.month"]').type(content.MotorTestData[i].MD1ConvMonth);
            	cy.get('input[name="convictionDate.year"]').type(content.MotorTestData[i].MD1ConvYear);
 				cy.get('#penaltyPoints').type(content.MotorTestData[i].MD1PenaltyPoints);
 				cy.get('#banLength').type(content.MotorTestData[i].MD1BanLength);
 				cy.get('#addConvictionButton').click();

            	clickNextButton();
			}

			// Set aditional driver
			if (content.MotorTestData[i].AdditionalDriver === "Y") {
			    validateURL('aboutYourAdditionalDrivers.xhtml');
			    cy.get('#title').select(content.MotorTestData[i].AD1Title);
				cy.get('#firstName').clear().type(content.MotorTestData[i].AD1Firstname);
				cy.get('#lastName').clear().type(content.MotorTestData[i].AD1Surname);
				
				if (content.MotorTestData[i].AD1Gender === "M") {
					cy.get('#label_gender_0').click();
				} else {
					cy.get('#label_gender_1').click();
				}
				
				cy.get('input[name="input-dob.day"]').type(content.MotorTestData[i].AD1DOBDay);
				cy.get('input[name="input-dob.month"]').type(content.MotorTestData[i].AD1DOBMonth);
				cy.get('input[name="input-dob.year"]').type(content.MotorTestData[i].AD1DOBYear);

				if(content.MotorTestData[i].AD1UKResidence === "N") {
					cy.get('#ukResident_1').click();
				} else {
					cy.get('#ukResident_0').click();
				}

				cy.get('#employmentStatus').select(content.MotorTestData[i].AD1EmploymentStatus);
	 			
	 			if (content.MotorTestData[i].EmploymentStatus != "Retired") {
					cy.get('#occupationOther').clear().type(content.MotorTestData[i].AD1Occupation);
					cy.get('#industry').clear().type(content.MotorTestData[i].AD1Industry);
					
					if (content.MotorTestData[i].AD1SecondOccupation === "Y") {
						cy.get('#label_secondaryOccupationFlag_0').click();
						cy.get('#secondaryOccupation').clear().type("Teacher");
					} else {
						cy.get('#description_secondaryOccupationFlag_1').click();
					}
	 			}
				
				cy.get('#maritalStatus').select(content.MotorTestData[i].AD1MaritalStatus);
				cy.get('#relationship').select(content.MotorTestData[i].AD1Relationship);
	            cy.get('#licenseType').select(content.MotorTestData[i].AD1LicenceType);	
				cy.get('#licenceHeldYearList').select(content.MotorTestData[i].AD1LicenceHeld);	
	            
	            if (content.MotorTestData[i].AD1Claims === "Y") {
				    cy.get('#claimsFlag_0').click();
				    cy.get('#claimType').select(content.MotorTestData[i].Claim1Type);
				    cy.get('input[name="claimDate.day"]').type(content.MotorTestData[i].Claim1Day);
	            	cy.get('input[name="claimDate.month"]').type(content.MotorTestData[i].Claim1Month);
	            	cy.get('input[name="claimDate.year"]').type(content.MotorTestData[i].Claim1Year);
	 				cy.get('#afaultClaimFlag_1').click();
	 				cy.get('#addClaimButton').click();
				} else {
					cy.get('#claimsFlag_1').click();
				}

				if (content.MotorTestData[i].AD1Convictions === "Y") {
				    cy.get('#convictionsFlag_0').click();
				    cy.get('#conviction').type(content.MotorTestData[i].AD1ConvictionCode);
				    cy.get('input[name="convictionDate.day"]').type(content.MotorTestData[i].AD1ConvictionDay);
	            	cy.get('input[name="convictionDate.month"]').type(content.MotorTestData[i].AD1ConvictionMonth);
	            	cy.get('input[name="convictionDate.year"]').type(content.MotorTestData[i].AD1ConvictionYear);
	 				cy.get('#penaltyPoints').type(content.MotorTestData[i].AD1PenaltyPoints);
	 				cy.get('#banLength').type(content.MotorTestData[i].AD1BanLength);
	 				cy.get('#addConvictionButton').click();
				} else {
	 				cy.get('#convictionsFlag_1').click();
				}
    			
    			// click AD next		      
				cy.get('#add_driver_next_false').click({ force: true });
				if (content.MotorTestData[i].MainDriver === "N") {
					validateURL('chooseMainDriver.xhtml');
					cy.get('#chooseMainDriver_0').click();
            		
            		clickNextButton();
				}
			}

			validateURL('yourQuote.xhtml');

			if(content.TestConfig[0].isQuote === "Y") {
				saveQuoteToFile();
			} else {
				// Select Full protection - Addons
				cy.get('#bundle1 > ul > .cost-area > .rad-label > .bundleLabelText').click();
				clickNextButton();

				validateURL('breakdownOptions.xhtml');

				// Select No cover - Breakdowns
				cy.get('#breakdownCover_3').click();
				clickNextButton();

				if (content.MotorTestData[i].Registration === "") {
					validateURL('moreDetails.xhtml');
					cy.get('#registrationNumber').type('ABC123');
	 				
	 				clickNextButton();
				}
				// Quote details 
				validateURL("quoteDetails.xhtml");
				quoteDetailsConfirmDetails();
				clickNextButton();

				// Payment methods
				validateURL("paymentOptions.xhtml");
				proceedPayment();
				clickNextButton();

				// Card details
				validateURL('cardInformation.xhtml');

				// TODO Add support for iframes: https://github.com/cypress-io/cypress/issues/136
				 /*cy.get('#cardDetailsFrame').then(function ($iframe) {
			       	cy.get('#capf1').select(content.CardDetails[0].CardType)
					cy.get('#capf2').type(content.CardDetails[0].CardOwner)
					cy.get('#card_number').type(content.CardDetails[0].CardNumber)
					cy.get('#exp_month').select(content.CardDetails[0].ExpiryMonth)
					cy.get('#exp_year').select(content.CardDetails[0].ExpiryYear)
					cy.get('#cv2_number').type(content.CardDetails[0].SecurityCode)

					clickBuyButton();
		        });
				// Payment confirmation
				validateURL('paymentConfirmation.xhtml');
				// TODO save policy to file	*/
			}
		}

		
	});
}

/*
* Helper method to confirm quote details
*/
function quoteDetailsConfirmDetails() {
	cy.get('#detailsCorrectDeclaration').click();
	cy.get('#confirmGeneralFlag').click();
	cy.get('#confirmDetailsFlag').click();
}

/*
* Helper method to proceed the payment
*/
function proceedPayment() {
	cy.get('#paymentOption_1').click();
	cy.get('#billingAddrSameAsPolicyAddr_0').click();
	cy.get('#cardOwnerPolicyHolder_1').click();
}

/*
* Helper method to click Buy button
*/
function clickBuyButton() {
	cy.get('#continue').click();
}


// Export of functions
exports.closeCookieBanner = closeCookieBanner
exports.clickNextButton = clickNextButton
exports.clickFindAddress = clickFindAddress
exports.reachQuotePage = reachQuotePage
exports.validateURL = validateURL
exports.clickPrintQuote = clickPrintQuote
exports.saveQuoteToFile = saveQuoteToFile
exports.quoteDetailsConfirmDetails = quoteDetailsConfirmDetails
exports.proceedPayment = proceedPayment
exports.clickBuyButton = clickBuyButton