Feature: I want to click on a button only when it is enabled and visible
    Scenario: Is button active Test 
        Given navigate to "https://jsfiddle.net/nivedithak/bLbqb482/7/"
        And Wait for "iframe" with the "xpath" of "//*[@id='result']/iframe" to appear
        Then Switch to iframe "iframe" with the "xpath" of "//*[@id='result']/iframe"
        Then Click on "button" with the "id" of "Button" when active
        And Wait for "3" seconds
        Then Accept the confirmation alert
        And Wait for "2" seconds