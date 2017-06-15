Feature: Login to Ticombo using facebook credentials
    As a user of ticombo, I want to login to ticombo using my facebook 
    credentials so that I can perform activities. 

    Scenario: Open Ticombo and remove userbilla message
        Given navigate to "http://uat.ticombo.com"
        And Wait for "userbilla" to appear
        And Switch to iframe "userbilla"
        And Wait for "BetaMessageCloseButton" to appear
        Then Click on "BetaMessageCloseButton"
        And Switch to main frame
    
    Scenario: Login using main login link
        And Click on "MainLoginButton"
        And Wait for "8" seconds
        Then Switch to popup window "1"
        And Wait for "faceBookLoginEmail" to appear
        And I enter "surenwork@gmail.com" to the "faceBookLoginEmail"
        And I enter "SurenRodrigoNerus19820318" to the "facebookLoginPassword"
        Then Click on "facebookLoginButton"
        And Wait for "5" seconds
        And Switch to popup window "0"
        And Wait for "userprofile" to contain text "Suren Rodrigo"
    
    Scenario: Search for item in main search
        Given Click on "Main Search Text Box"
        And I enter "2017" to the "Main Search Text Box"
        Then Wait for "3" seconds
        And Wait for "search Result First Item" to appear
        Then Click on "search Result First Item"
        And Wait for "search Result Listing First Item" to appear
        When Click on "search Result Listing First Item"
        And Wait for "checkout Page Listing Owner Name" to contain text "Jefferson Masdrtina"
    
    Scenario: Logout of Ticombo
        And Wait for "userprofile" to contain text "Suren Rodrigo"
        Then Click on "userprofile"
        And Wait for "logoutLink" to appear
        And Click on "logoutLink"
    