Feature: Base pre-build scenarios for UI Automation
    As a Developer I want to list down all the possible steps so that intellisence can capture it

    Scenario: Protractor and cucumber Test
      When Navigate to "<URL>"
      
      When I enter "<Input Value>" to the "<Element Key>" with the "<Selection Method>" of "<Selection Value>"
      When I enter "<Input Value" to the "<Element Key>"

      When Click on "<Element Key>" with the "<Selection Method>" of "<Selection Value>"
      When Click on "<Element Key>"

      When The content of "<Element Key>" with the "<Selection Method>" of "<Selection Value>" has text "<Expected Text>"
      When The content of "<Element Key>" has text "<Expected Text>"
      When Element "<Element Key>" contains text "<Expected Text>"

      When Wait for "<Element Key>" to appear
      When Wait for "<Element Key>" with the "<Selection Method>" of "<Selection Value>" to appear
      When Wait for "<Element Key>" to contain text "<Expected Text>"
      When Wait for "<Element Key>" with the "<Selection Method>" of "<Selection Value>" to contain text "<Expected Text>"
      When Wait for "<Seconds>" seconds

      When Switch to main frame
      When Switch to iframe "<Element key>"
      When Switch to iframe "<Element key>" with the "<Selection Method>" of "<Selection Value>"
      When Switch to popup window "<Window or Tab Index>"

      When Select value "<Value>" from "<Element Key>"
      When Select value "<Value>" from "<Element Key>" with the "<Selection Method>" of "<Selection Value>"

      When Accept the confirmation alert
      When The alert message says "<Expected Text>"
      When I Dismiss the confirm dialog
      When I Accept the confirm dialog
      When I enter "<Input Text>" into prompt
      When I drag "<Dragable Element Key>" and drop on to "<Droppable Element Key>"
      When I drag "<Dragable Element Key>" with the "<Selection Method>" of "<Selection Value>" and drop on to "<Droppable Element Key>" with the "<Selection Method>" of "<Selection Value>"

      When I read the content of element "<Element Key>" with the "<Selection Method>" of "<Selection Value>" and store in variable "<Variable Key>" as a "<Variable Type>"
      When I read the content of element "<Element Key>" and store in variable "<Variable Key>" as a "<Variable Type>"
      When I store the value "<Value>" in variable "<Variable Key>" as a "<Variable Type>"
      When The value in variable "<Variable key>" of type "<Variable Type>" equals to "<Value>"
      When The value in variable "<Variable1 key>" of type "<Variable1 Type>" equals to variable "<Variable2 key>"
      When I Add variable "<Variable1 key>" to "<Variable2 key>" and store in "<Variable3 key>"
      When I Subtract variable "<Variable1 key>" from "<Variable2 key>" and store in "<Variable3 key>"
      When I Multiply variable "<Variable1 key>" from "<Variable2 key>" and store in "<Variable3 key>"
      When I Divide variable "<Variable1 key>" from "<Variable2 key>" and store in "<Variable3 key>"
      When I populate "<Element Key>" with the "<Selection Method>" of "<Selection Value>" with the value of variable "<Variable Key>" of type "<Variable Type>"
      When I populate "<Element Key>" with the value of variable "<Variable Key>" of type "<Variable Type>"

      When I Upload "<File Path>" to "<Element Key>" with the "<Selection Method>" of "<Selection Value>"
      When I Upload "<File Path>" to "<Element Key>"