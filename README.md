# CodeSpecJS
Welcome to the CodeSpecJS. A Protractor and Cucumber.JS based framework that allow users to write UI Automation Tests without writing a single line of code. 

Gherkin grammar is very popular among many BDD frameworks. CodeSpecJS is targeting to take it to the next level by eliminating the need to write code associated with the Gherkin grammar. 

## Getting Started
### Step 1: Setting up the development environment

1. You need to install [ NodeJs with NPM ](https://nodejs.org/en/). You'll also need to install and configure [ Git ](https://git-scm.com/). 
2. Latest version of Chrome

### Step 2: Clone the project
```
git clone https://github.com/99xt/CodeSpecJS.git
```
### Step 3: Install node packages
Step inside the project root folder and issue the following command to install node dependencies.
```
npm install
```

### Step 4: Let's start writing our first UI Automation test 
Under the "features" folder create a new file called "sample.feature". copy and paste the specification given below
```
Feature: As a user I want to test google search so that I can search for cats and dogs
    Scenario: Search google for cats
        Given Navigate to "http://www.google.com"
        And Wait for "Google Main Search Text Box" with the "id" of "lst-ib" to appear
        Then I enter "Cats" to the "Google Main Search Text Box"
        And Click on "Search Button" with the "id" of "_fZl"
        And Wait for "Second Result Element" with the "xpath" of "//*[@id='rso']/div[1]/div/div[2]/div/div/h3/a" to contain text "Cats Protection"
         
    Scenario: Search google for Dogs
        Given Navigate to "http://www.google.com"
        And Wait for "Google Main Search Text Box" to appear
        Then I enter "Dogs" to the "Google Main Search Text Box"
        And Click on "Search Button"
        And Wait for "Second Result Element" to contain text "Complete Guide to Caring for Dogs | Dog Breed Information, Dog ..."
```
* This is a standard [Cucumber](https://cucumber.io/) feature specification file.
* We are using CodeSpecJS pre-defined grammar to write the test above. A full set of Supported grammar with detail description can be found [here](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar)

Thats it, you are now ready to run the test. **Note that we haven't written any code** We just used a set of well defined Gherkin grammar to specify what we want to do. Please refer to [Supported Grammar](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar) to a full set of grammar you can use in your tests. 

### Step 5: Running the test
Inside the project root folder, issue the following command
```
npm run test
```
**Note that first time execution may take few minutes since system need to download browser drivers and configure them**
You should see your test executed in Chrome browser, Results will be shown in your console log. A detailed HTML report is generated under
\<project_root\>/results/reports. Open the html report and see the detailed results.

Where to go from here?
1. [Improve the tests you wrote here by learning how to integrate an Object Repository](https://github.com/99xt/CodeSpecJS/wiki/Creating-an-Object-Repository)
2. [See what are the other pre-defined CodeSpecJS grammar you can use in your tests and experiment with them](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar)
3. [Learn how to integrate your test project with Jenkins (a proven Continuos Integration environment )](https://github.com/99xt/CodeSpecJS/wiki/Configuring-Jenkins-Environment)
4. [Improve your productivity even more by configuring your IDE to auto complete CodeSpecJs Grammar](https://github.com/99xt/CodeSpecJS/wiki/Configuring-IDE-Autocomplete-for-CodeSpecJS-Grammar)