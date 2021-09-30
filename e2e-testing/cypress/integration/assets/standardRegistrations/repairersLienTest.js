/// <reference types="Cypress" />
import { landingPage } from '../../../pages/assets/landingPage'
import { addSecurityAgreementPage } from '../../../pages/assets/addSecurityAgreementPage'
import { repairersLienPage } from '../../../pages/assets/repairersLienPage'
import repairersLienData from '../../../fixtures/assets/repairersLienData.json'
import { securityAgreementPage } from '../../../pages/assets/securityAgreementPage'
import partyData from '../../../fixtures/assets/partyData.json'
import debtorData from '../../../fixtures/assets/debtorData.json'
import collateralData from '../../../fixtures/assets/collateralData.json'
import credentials from '../../../fixtures/relationship/assetsBCSC.json'
import feeData from '../../../fixtures/assets/fees.json'
import { feeSummaryModalPage } from '../../../pages/assets/feeSummaryModalPage'
import registrationType from '../../../fixtures/assets/registrationTypesData.json'

describe('PPR Dashboard test Suite ', function () {
  // Setup data and login as BC Service Card

  it('Security Agreement Test Case', function () {

    landingPage.visit(Cypress.env('PPR_DOMAIN') + '/dashboard')

    landingPage.clickVirtualCardTestingButton()

    landingPage.bcscLogin(credentials)

    addSecurityAgreementPage.selectSecurityAgreementDropdown(credentials.type)

    addSecurityAgreementPage.selectStandardRegistrations(credentials.type, registrationType.standard.rl)

    repairersLienPage.setLienAmount(repairersLienData.AmountOfLien)

    repairersLienPage.setSurrenderDate(repairersLienData.SurrenderDate)

    feeSummaryModalPage.verifyFeeSummaryModal(feeData.feeSummary.rl)

    repairersLienPage.clickDateOkButton()

    securityAgreementPage.clickAddSecuredPartiesAndDebtorsButton()

    securityAgreementPage.clickAddSecuredPartyLink()

    securityAgreementPage.setPartyIndividual(partyData.partyIndividual)

    securityAgreementPage.clickAddSecuredPartyLink()

    securityAgreementPage.setPartyBusiness(partyData.partyBusiness)

    securityAgreementPage.setDebtorIndividual(debtorData.debtorIndividual)

    securityAgreementPage.setDebtorBusiness(debtorData.debtorBusiness)

    securityAgreementPage.clickAddCollateralButton()

    securityAgreementPage.setVehicleCollateral(collateralData.vehicleCollateral.bo, true)

    securityAgreementPage.verifyVehicleCollateral(collateralData.vehicleCollateral)

    securityAgreementPage.clickReviewAndConfirmButton()

    securityAgreementPage.setFolioNumberText(collateralData.folioNumber)

    securityAgreementPage.clickRegisterAndPayButton()

  })

})