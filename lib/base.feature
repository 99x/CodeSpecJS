Feature: Base pre-build scenarios for UI Automation
    As a Developer I want to list down all the possible steps so that intellisence can capture it

    Scenario: Protractor and cucumber Test
      When I navigate to "<URL>"
      Then Navigate to "<URL>"
      
      When I enter "<Input Value>" to the "<Element Key>" with the "<Selection Method>" of "<Selection Value>"
      When I enter "<Input Value" to the "<Element Key>"

      When Click on "<Element Key>" with the "<Selection Method>" of "<Selection Value>"
      When Click on "<Element Key>"

      When The content of "<Element Key>" with the "<Selection Method>" of "<Selection Value>" has text "<Expected Text>"
      When The content of "<Element Key>" has text "<Expected Text>"

    

        