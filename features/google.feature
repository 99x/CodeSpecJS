Feature: As a user I want to Test Google Search
	Scenario: Search for Cats
		Given Navigate to "https://www.google.com/ncr"
		And Click on "Google Search Box" with the "id" of "lst-ib"
		Then I enter "Cats" to the "Google Search Box"
		And Click on "Google Logo" with the "id" of "hplogo"
		When Click on "Google Search Button" with the "xpath" of "//input[@name='btnK']"
		Then Wait for "Result Right Panel Title" with the "xpath" of "id('rhs_block')/div[1]/div[1]/div/div[1]/div[2]/div[1]/div/div[2]/div/div/div[2]/div[1]/span" to contain text "Cat"
	
	Scenario: Search for Dogs
		Given Navigate to "https://www.google.com/ncr"
		And Click on "Google Search Box"
		Then I enter "Dogs" to the "Google Search Box"
		And Click on "Google Logo"
		And Click on "Google Search Button"
		Then Wait for "Result Right Panel Title" to contain text "Dog"