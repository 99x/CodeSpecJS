Feature: As a user I want to test google search so that I can search for Cats
    Scenario: Search google for cats
        Given Navigate to "http://www.google.com"
        And Wait for "Google Main Search Text Box" to appear
        Then I enter "Cats" to the "Google Main Search Text Box"
        And Click on "Search Button"
        And Wait for "Second Result Element Cats" to contain text "Cats the Musical - Official Website & Tickets"
         