# CodeSpecJS
Welcome to the CodeSpecJS. A Protractor and Cucumber.JS based framework that allow users to write UI Automation Tests without writing a single line of code. 

Gherkin grammar is very popular among many BDD frameworks. CodeSpecJS is targeting to take it to the next level by eliminating the need to write code associated with the Gherkin grammar. 

## Key Feature
* Zero code UI Test Automation. I.e. You will not write a single line of code to define your tests. you will be using a set of well defined Gherkin grammar to define your tests. Having no code to write provide some unique advantages
    * Learning curve to implement UI Automation tests is minimized.
    * Not depended on any specific programing language. CodeSpecJS grammar is written in pure english. Any one can understand it. 
    * No need to maintain test code bases, because with CodeSpecJS, there's none. 
    * Time taken to write tests are reduced drastically. 
    * No need to worry about inner workings of underline frameworks, As developers/testers, we just need to concentrate about test logic.
    * Real quick startup time. You can write your first UI Automation test within minutes
    
* Since all test are using Gherkin to define them, they are easy to write and well understood by all parties (i.e. stake holders, developers, testers etc.)
* You will be able to map real agile story definitions directly to CodeSpecJS tests since both use almost the same specification structure
* Provide grammar to support for all the necessary UI Automation Actions
    * [URL Navigation](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#url-navigation)
    * [Clicking on UI Elements](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#click-on-ui-elements)
    * [Verifying content of UI Elements](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#verify-ui-element-content)
    * [Waiting for UI elements to appear](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#wait-for-an-ui-element-to-appear-or-to-show-a-given-content)
    * [Waiting for UI elements to show a specific content](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#wait-for-an-ui-element-to-appear-or-to-show-a-given-content)
    * [Wait a given number of seconds for application to complete its tasks](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#wait-for-an-ui-element-to-appear-or-to-show-a-given-content)
    * [Working with html select drop down lists](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#select-drop-down-lists)
    * [Working with Popup windows](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#working-with-popup-windows-and-iframes)
    * [Working with iframes](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#working-with-popup-windows-and-iframes)
    * [Working with Alert Message Dialogs ](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#working-with-alertsconfirmation-and-prompt-dialogs)
    * [Working with Prompt Dialogs](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#working-with-alertsconfirmation-and-prompt-dialogs)
    * [Drag and Drop UI elements](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#drag-and-drop-items)


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

### Step 4: Open sample tests
use VS Code to open the project
```
code .
```
now navigate to 'features' folder and open 'cat.feature' file see the readable test case
 ```
 Feature: As a user I want to test google search so that I can search for Cats
    Scenario: Search google for cats
        Given Navigate to "http://www.google.com"
        And Wait for "Google Main Search Text Box" to appear
        Then I enter "Cats" to the "Google Main Search Text Box"
        And Click on "Search Button"
        And Wait for "Second Result Element Cats" to contain text "Cats"
 ```

* This is a standard [Cucumber](https://cucumber.io/) feature specification file.
* We are using CodeSpecJS pre-defined grammar to write the test above. A full set of Supported grammar with detail description can be found [here](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar)

Thats it, you are now ready to run the test. 

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