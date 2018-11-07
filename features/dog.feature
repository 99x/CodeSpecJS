Feature: As a user I want to test google search so that I can search for Dogs   
    Scenario: Search google for Dogs
        Given Navigate to "http://www.google.com"
        And Wait for "Google Main Search Text Box" to appear
        Then I enter "Dogs" to the "Google Main Search Text Box"
        And Click on "Search Button"
        And Wait for "Second Result Element Dogs" to contain text "Complete Guide to Caring for Dogs | Dog Breed Information, Dog ..."