# CodeSpecJS
Welcome to the CodeSpecJS. A Protractor and Cucumber.JS based framework that allow users to write UI Automation Tests without writing a single line of code. 

Gherkin grammar is very popular among many BDD frameworks. CodeSpecJS is targeting to take it to the next level by eliminating the need to write code associated with the Gherkin grammar. 

## Getting Started

## How it works

## Supported Grammar
Below is a list of currently support grammar. Please copy and paste them directly in to your feature specification files (.feature) file and replace the placeholders (marked within "<" and ">") with actual values. 

### URL Navigation
* Navigate to "\<URL\>"
    * Sample Usage
        * **Given Navigate to "http://www.google.com"** -  _This will navigate the browser to google.com_

    **_Notes_**
         * _You can also use this with "Then", "And", "When"_

### Click on UI Elements
* Click on "\<Element Key>\" with the "\<Selection Method>\" of "\<Selection Value>\"
    * _\<Element Key\>_ - Name of the UI Element you are interacting with
    * _\<Selection Method\>_ - Indicate how you are going to identify the UI element in the DOM. At present, the following methods are allowed
        * _id_ - UI element is identified by using its Id property
        * _css_ - UI element is identified by using its CSS class
        * _xpath_ - UI element is identified by using its xpath
        * _model_ - UI element is identified by using its Angular model name
        * _binding_ - UI element is identified by Angular binding
    * _\<Selection Value\>_ - Actual value associated with the \<Selection Method\>, Ex: element "id" value or CSS class name.
    
    * Sample Usage
        * **When Click on "Submit Button" with the "xpath" of "//html/head/body/div[3]/button"** - _This will find and click on the button that has an xpath of "//html/head/body/div[3]/button". This will also create a new object repository element with the element key "Submit Button" and store it in the object repository so that you can refer to it directly in the future instances_
    * **_Notes_**
        * _You can also use this with "Then", "And", "Given"_

* Click on "\<Element Key>\"
    * _\<Element Key\>_ - Name of the UI Element you are interacting with
    * Sample Usage
        * **When Click on "Submit Button"** - _This will search the object repository for an element with the element key of "Submit Button" and click on it. **Please note in order use this grammar, the element "Submit Button" has to be pre-defined in the object repository or you have to have defined it at least once before using the \<Selection Method\> and \<Selection Value\> grammar shown above.**_
    * **_Notes_**
        * _You can also use this with "Then", "And", "Given"_
        * _In order use this grammar, the element with \<Element Key\> has to be pre-defined in the object repository or you have to have defined it at least once before using the grammar shown above_

### Verify UI Element Content
* The content of "\<Element Key\>" with the "\<Selection Method\>" of "\<Selection Value\>" has text "\<Expected Text\>"
    * _\<Element Key\>_ - Name of the UI Element you are interacting with
    * _\<Selection Method\>_ - Indicate how you are going to identify the UI element in the DOM. At present, the following methods are allowed
        * _id_ - UI element is identified by using its Id property
        * _css_ - UI element is identified by using its CSS class
        * _xpath_ - UI element is identified by using its xpath
        * _model_ - UI element is identified by using its Angular model name
        * _binding_ - UI element is identified by Angular binding
    * _\<Selection Value\>_ - Actual value associated with the \<Selection Method\>, Ex: element "id" value or CSS class name.
    * _\<Expected Text\>_ - Expected text that need to be verified 
    * Sample Usage
        * **And The content of "Alert Area" with the "id" of "system-alerts" has text "Record Created Successfully."** - _This will verify the UI element with an id of "system-alerts" contains the text "Record Created Successfully.". This will also create a new object repository element with the element key "Alert Area" and store it in the object repository so that you can refer to it directly in the future instances_
     * **_Notes_**
        * _You can also use this with "Then", "When", "Given"_

* The content of "\<Element Key\>" has text "\<Expected Text\>"
    * _\<Element Key\>_ - Name of the UI Element you are interacting with
    * _\<Expected Text\>_ - Expected text that need to be verified 
    * Sample Usage
        *  **And The content of "Alert Area" has text "Record Created Successfully."** - _This will search the object repository for an element with the element key of "Alert Area" and verify it contains the text "Record Created Successfully.". **Please note in order use this grammar, the element "Alert Area" has to be pre-defined in the object repository or you have to have defined it at least once before using the \<Selection Method\> and \<Selection Value\> grammar shown above.**_
    * **_Notes_**
        * _You can also use this with "Then", "When", "Given"_
        * _In order use this grammar, the element with \<Element Key\> has to be pre-defined in the object repository or you have to have defined it at least once before using the grammar shown above_

* Element "\<Element Key\>" contains text "\<Expected Text\>"
    * _\<Element Key\>_ - Name of the UI Element you are interacting with
    * _\<Expected Text\>_ - Expected text that need to be verified 
    * Sample Usage
        *  **And Element "Alert Area" contains text "Record Created Successfully."** - _This will search the object repository for an element with the element key of "Alert Area" and verify it contains the text "Record Created Successfully.". **Please note in order use this grammar, the element "Alert Area" has to be pre-defined in the object repository or you have to have defined it at least once before using the \<Selection Method\> and \<Selection Value\> grammar shown above.**_
    * **_Notes_**
        * _You can also use this with "Then", "When", "Given"_
        * _In order use this grammar, the element with \<Element Key\> has to be pre-defined in the object repository or you have to have defined it at least once before using the grammar shown above_

### Wait for an UI Element to Appear or to Show a Given Content
* Wait for "\<Element Key\>" with the "\<Selection Method\>" of "\<Selection Value\>" to appear
    * _\<Element Key\>_ - Name of the UI Element you are interacting with
    * _\<Selection Method\>_ - Indicate how you are going to identify the UI element in the DOM. At present, the following methods are allowed
        * _id_ - UI element is identified by using its Id property
        * _css_ - UI element is identified by using its CSS class
        * _xpath_ - UI element is identified by using its xpath
        * _model_ - UI element is identified by using its Angular model name
        * _binding_ - UI element is identified by Angular binding
    * _\<Selection Value\>_ - Actual value associated with the \<Selection Method\>, Ex: element "id" value or CSS class name.
    * Sample Usage
        * **Then Wait for "More Information Text Area" with the "css" of ".more_info_txt" to appear** - _This will wait until an UI Text area element with a css class of ".more_info_txt" to appear in the DOM. This will also create a new object repository element with the element key "More Information Text Area" and store it in the object repository so that you can refer to it directly in the future instances_
    * **_Notes_**
        * _You can also use this with "And", "When", "Given"_

* Wait for "\<Element Key\>" to appear
    * _\<Element Key\>_ - Name of the UI Element you are interacting with
    * Sample Usage
        * **Then Wait for "More Information Text Area" to appear** -  _This will search the object repository for an element with the element key of "More Information Text Area" and wait for it to appear in the DOM. **Please note in order use this grammar, the element "More Information Text Area" has to be pre-defined in the object repository or you have to have defined it at least once before using the \<Selection Method\> and \<Selection Value\> grammar shown above.**_
    * **_Notes_**
        * _You can also use this with "And", "When", "Given"_
        * _In order use this grammar, the element with \<Element Key\> has to be pre-defined in the object repository or you have to have defined it at least once before using the \<Selection Method\> and \<Selection Value\> grammar shown above._

* Wait for "\<Element Key\>" with the "\<Selection Method\>" of "\<Selection Value\>" to contain text "\<Expected Text\>"
    * _\<Element Key\>_ - Name of the UI Element you are interacting with
    * _\<Selection Method\>_ - Indicate how you are going to identify the UI element in the DOM. At present, the following methods are allowed
        * _id_ - UI element is identified by using its Id property
        * _css_ - UI element is identified by using its CSS class
        * _xpath_ - UI element is identified by using its xpath
        * _model_ - UI element is identified by using its Angular model name
        * _binding_ - UI element is identified by Angular binding
    * _\<Selection Value\>_ - Actual value associated with the \<Selection Method\>, Ex: element "id" value or CSS class name.
    * _\<Expected Text\>_ - Expected text that need to be verified 
    * Sample Usage
        * **Then Wait for "Confirmation Area" with the "css" of ".confirm_message" to contain text "User Acceptance Confirmed"** - _This will wait until an UI element with a css class of ".confirm_message" to appear in the DOM and contain the text "User Acceptance Confirmed". This will also create a new object repository element with the element key "Confirmation Area" and store it in the object repository so that you can refer to it directly in the future instances_
    * **_Notes_**
        * _You can also use this with "And", "When", "Given"_

* Wait for "\<Element Key\>" to contain text "\<Expected Text\>"
    * _\<Element Key\>_ - Name of the UI Element you are interacting with
    * _\<Expected Text\>_ - Expected text that need to be verified 
    * Sample Usage
        * **Then Wait for "Confirmation Area" to contain text "User Acceptance Confirmed"** -  _This will search the object repository for an element with the element key of ""Confirmation Area" and wait for it to appear in the DOM with the text "User Acceptance Confirmed". **Please note in order use this grammar, the element "Confirmation Area" has to be pre-defined in the object repository or you have to have defined it at least once before using the \<Selection Method\> and \<Selection Value\> grammar shown above.**_
    * **_Notes_**
        * _You can also use this with "And", "When", "Given"_
        * _In order use this grammar, the element with \<Element Key\> has to be pre-defined in the object repository or you have to have defined it at least once before using the \<Selection Method\> and \<Selection Value\> grammar shown above._

* Wait for "\<Seconds\>" seconds
    * _\<Seconds\>_ - Number of seconds we need to wait
    * Sample Usage
        * **And Wait for "2" seconds** - _This will pause the flow and wait 2 seconds before continuing. This is useful when we want to wait for elements to load or some async method to complete._
    * **_Notes_**
        * _You can also use this with "Then", "When", "Given"_

### Working with popup windows and iframes
* Switch to iframe "\<Element key\>" with the "<Selection Method>" of "\<Selection Value\>"
    * _\<Element Key\>_ - Name of the UI Element you are interacting with
    * _\<Selection Method\>_ - Indicate how you are going to identify the UI element in the DOM. At present, the following methods are allowed
        * _id_ - UI element is identified by using its Id property
        * _css_ - UI element is identified by using its CSS class
        * _xpath_ - UI element is identified by using its xpath
        * _model_ - UI element is identified by using its Angular model name
        * _binding_ - UI element is identified by Angular binding
    * _\<Selection Value\>_ - Actual value associated with the \<Selection Method\>, Ex: element "id" value or CSS class name.
    * Sample Usage
        * **Then Switch to iframe "Result Frame" with the "id" of "result_frame"** - _This will switch the dom structure to the one within the iframe. All consequent UI interactions will use the DOM model within the iframe until you switch back. This will also create a new object repository element with the element key "Result Frame" and store it in the object repository so that you can refer to it directly in the future instances_
     * **_Notes_**
        * _You can also use this with "And", "When", "Given"_

* Switch to iframe "\<Element key\>"
    * _\<Element Key\>_ - Name of the UI Element you are interacting with
    * Sample Usage
        * **Then Switch to iframe "Result Frame"** -  _This will search the object repository for an iframe with the element key of "Result Frame" and switch to it. This will switch the dom structure to the one within the iframe. All consequent UI interactions will use the DOM model within the iframe until you switch back. **Please note in order use this grammar, the element "Result Frame" has to be pre-defined in the object repository or you have to have defined it at least once before using the \<Selection Method\> and \<Selection Value\> grammar shown above.**_
    * **_Notes_**
        * _You can also use this with "And", "When", "Given"_
        * _In order use this grammar, the element with \<Element Key\> has to be pre-defined in the object repository or you have to have defined it at least once before using the \<Selection Method\> and \<Selection Value\> grammar shown above._ 

* Switch to popup window "\<Window or Tab Index\>"
    * _\<Window or Tab Index\>_ - Index number of the popup window. Index 0 is always the main window, Newly opened popups will be assigned incremental indexes starting from 1. 
    * Sample Usage
        * **Then Switch to popup window "1"** -  _This will switch the dom structure to the one in the first opened popup window. All consequent UI interactions will use the DOM model within the iframe until you switch back._
    * **_Notes_**
        * _You can also use this with "And", "When", "Given"_

* Switch to main frame
    * Sample Usage
        * **Then Switch to main frame** -  _This will switch the dom structure back to the main window. You need to use this to return the dom structure to the main window after switching to an iframe or a popup window_
    * **_Notes_**
        * _You can also use this with "And", "When", "Given"_

### Select Drop Down Lists
* Select value "\<Value\>" from "\<Element Key\>" with the "\<Selection Method\>" of "\<Selection Value\>"
    * _\<Element Key\>_ - Name of the UI Element you are interacting with
    * _\<Selection Method\>_ - Indicate how you are going to identify the UI element in the DOM. At present, the following methods are allowed
        * _id_ - UI element is identified by using its Id property
        * _css_ - UI element is identified by using its CSS class
        * _xpath_ - UI element is identified by using its xpath
        * _model_ - UI element is identified by using its Angular model name
        * _binding_ - UI element is identified by Angular binding
    * _\<Selection Value\>_ - Actual value associated with the \<Selection Method\>, Ex: element "id" value or CSS class name.
    * _\<Value\>_ - The Value of the \<option\> we want to select in the drop down.
    * Sample Usage
        * **And Select value "opera" from "Browser List Selector" with the "id" of "browser_list_dropdown"** - _This will select "opera" from the drop down select list with the "id" of "browser_list_dropdown". This will also create a new object repository element with the element key "Browser List Selector" and store it in the object repository so that you can refer to it directly in the future instances_
    * **_Notes_**
        * _You can also use this with "Then", "When", "Given"_

* Select value "\<Value\>" from "\<Element Key\>"
     * _\<Element Key\>_ - Name of the UI Element you are interacting with
      * _\<Value\>_ - The Value of the \<option\> we want to select in the drop down.
    * Sample Usage
        * **And Select value "opera" from "Browser List Selector"** -  _This will search the object repository for an drowdown list with the element key of "Browser List Selector" and slect the value "opera" from it.  **Please note in order use this grammar, the element "Browser List Selector" has to be pre-defined in the object repository or you have to have defined it at least once before using the \<Selection Method\> and \<Selection Value\> grammar shown above.**_
    * **_Notes_**
        * _You can also use this with "Then", "When", "Given"_
        * _In order use this grammar, the element with \<Element Key\> has to be pre-defined in the object repository or you have to have defined it at least once before using the \<Selection Method\> and \<Selection Value\> grammar shown above._ 

### Working with Alerts,Confirmation and Prompt dialogs
* Accept the confirmation alert
    * Sample Usage
        * **Then Accept the confirmation alert** - _This will simply accept the alert by clicking on the ok button_
     * **_Notes_**
        * _You can also use this with "And", "When", "Given"_

* The alert message says "\<Expected Text\>"
     * _\<Expected Text\>_ - Expected text that need to be verified 
    * Sample Usage
        * **Then The alert message says "Invalid Email Address"** - _This will verify the alert dialog message to be "Invalid Email Address_"
     * **_Notes_**
        * _You can also use this with "And", "When", "Given"_

* I Dismiss the prompt dialog
    * Sample Usage
        * **Then I Dismiss the prompt dialog** - _This will Dismiss a prompt dialog by clicking on the "Cancel" button_
     * **_Notes_**
        * _You can also use this with "And", "When", "Given"_

* I Accept the prompt dialog
    * Sample Usage
        * **Then I Accept the prompt dialog** - _This will Accept a prompt dialog by clicking on the "ok" button_
     * **_Notes_**
        * _You can also use this with "And", "When", "Given"_

* I type "\<Input Text\>" into prompt
     * _\<Input Text\>_ - Text to type in the prompt dialog
    * Sample Usage
        * **Then I type "Suren Rodrigo" into prompt** - _This will set the text in the prompt dialog to "Suren Rodrigo"_
     * **_Notes_**
        * _You can also use this with "And", "When", "Given"_

### Drag and Drop Items
* I drag "\<Dragable Element Key\>" with the "\<Dragable Element Selection Method\>" of "\<Dragable Element Selection Value\>" and drop on to "\<Droppable Element Key\>" with the "\<Droppable Element Selection Method\>" of "\<Droppable Element Selection Value\>"
    * _\<Dragable Element Key\>, <Droppable Element Key\>_ - Name of the UI Elements you are interacting with
    * _\<Dragable Element Selection Method\>, \<Droppable Element Selection Method\>_ - Indicate how you are going to identify the UI element in the DOM. At present, the following methods are allowed
        * _id_ - UI element is identified by using its Id property
        * _css_ - UI element is identified by using its CSS class
        * _xpath_ - UI element is identified by using its xpath
        * _model_ - UI element is identified by using its Angular model name
        * _binding_ - UI element is identified by Angular binding
    * _\<Dragable Element Selection Value\>, \<Droppable Element Selection Method\>_ - Actual value associated with the \<Selection Method\>, Ex: element "id" value or CSS class name.
    * Sample usage
        * **And I drag "User Widget" with the "id" of "user_widget" and drop on to "My Control Panel" with the "xpath" of "//html/div/div[1]"** - _This will drag an UI element with the id of "user_widget" and drop it on to another UI element with the xpath of "//html/div/div[1]". This will also create two object repository elements with the element keys of "user_widget" and "

* I drag "<Dragable Element Key>" and drop on to "<Droppable Element Key>"
    * _\<Dragable Element Key\>, <Droppable Element Key\>_ - Name of the UI Elements you are interacting with
    
    * Sample Usage
        * **And I drag "User Widget" and drop on to "My Control Panel"** -  _This will search the object repository for both "User Widget" and "My Control Panel" UI elements and will perform the drag and drop as instructed.  **Please note in order use this grammar, both UI elements has to be pre-defined in the object repository or you have to have defined it at least once before using the \<Selection Method\> and \<Selection Value\> grammar shown above.**_
    * **_Notes_**
        * _You can also use this with "Then", "When", "Given"_
        * _In order use this grammar, the element with \<Element Key\> has to be pre-defined in the object repository or you have to have defined it at least once before using the \<Selection Method\> and \<Selection Value\> grammar shown above._ 
