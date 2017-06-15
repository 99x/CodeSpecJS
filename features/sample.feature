Feature: As a user I want to test google search so that I can search for cats and dogs
    Scenario: Search google for cats
        Given Navigate to "http://www.google.com"
        And Wait for "Google Main Search Text Box" to appear
        Then I enter "Cats" to the "Google Main Search Text Box"
        And Click on "Search Button"
        And Wait for "Second Result Element" to contain text "Cats Protection"
    
    #Failing Scenario
    Scenario: Search google for Dogs
        Given Navigate to "http://www.google.com"
        And Wait for "Google Main Search Text Box" to appear
        Then I enter "Dogs" to the "Google Main Search Text Box"
        And Click on "Search Button"
        And Wait for "Second Result Element" to contain text "Cats Protection"