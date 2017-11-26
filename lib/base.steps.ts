import { before, after, binding, when, then, given } from 'cucumber-tsflow';
import {
  browser,
  element,
  by,
  ElementFinder,
  ExpectedConditions
} from 'protractor';
import { ElementService } from './services/element.service';
import { VariableService } from './services/variable.service';
import { VariableType } from './domain/variableType';
import { ICommonVariable } from './domain/ICommonVariable';
import { IHooks } from './domain/ihooks';
import { Hooks } from '../hooks';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let assert = chai.assert;

@binding()
class BaseSteps {
  elementService: ElementService;
  variableService: VariableService;
  lifeCycleHooks: IHooks;
  defaultElementTimeout: number;
  constructor() {
    this.elementService = ElementService.GetInstance();
    this.variableService = VariableService.GetInstance();
    this.lifeCycleHooks = new Hooks();
    this.defaultElementTimeout = 10000;
  }


  @before()
  public beforeEveryScenarios(): void {
    this.lifeCycleHooks.beforeScenario();
  }

  @after()
  public afterEveryScenario(): void {
    this.lifeCycleHooks.afterScenario();
  }
  // @after()
  // public afterAllScenarios(scenario): void {
  //   if (scenario.status === 'failed') {
  //     let world = this;
  //     browser.takeScreenshot().then(function (png) {
  //       var decodedImage = new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');

  //       ScenarioContext.attach(decodedImage, 'image/png');
  //     });
  //   }
  // }

  private getWebElement(
    elementKey: string,
    selectionMethod: string,
    selectionValue: string
  ): ElementFinder {
    if (selectionMethod && selectionValue) {
      let webElement = element(
        this.elementService.getElementSource(selectionMethod, selectionValue)
      );
      if (!webElement)
        throw new Error(
          'Element "' +
          elementKey +
          '" not found in dom. Selection Method: "' +
          selectionMethod +
          '", Selection Value: "' +
          selectionValue +
          '"'
        );
      this.elementService.addNewElement(elementKey, webElement);
      return webElement;
    } else {
      let webElement = this.elementService.getElementByKey(elementKey);
      if (!webElement)
        throw new Error(
          'Element "' + elementKey + '" not found in object repository.'
        );
      return webElement;
    }
  }

  @given(/^[I|i] navigate to "([^"]*)"$/, null, 160 * 1000)
  @given(/[N|n]avigate to "([^"]*)"$/, null, 160 * 1000)
  public navigateToUrl(url: string): void {
    return assert.eventually.equal(
      browser.get(url).then(
        () => {
          return url;
        },
        (error: any) => {
          throw new Error(error.message);
        }
      ),
      url,
      'Navigated to the wrong url.'
    );
  }

  @given(/^[E|e]nter "([^"]*)" to the "([^"]*)"$/, null, 60 * 1000)
  @given(/^[I|i] enter "([^"]*)" to the "([^"]*)"$/, null, 60 * 1000)
  public enterTextToElement(inputValue: string, elementKey: string) {
    this.enterTextToElementWithSelectionMethod(
      inputValue,
      elementKey,
      null,
      null
    );
  }

  @given(
    /^I enter "([^"]*)" to the "([^"]*)" with the "([^"]*)" of "([^"]*)"$/,
    null,
    60 * 1000
  )
  public enterTextToElementWithSelectionMethod(
    inputValue: string,
    elementKey: string,
    selectionMethod: string,
    selectionValue: string
    ) {
    let inputElement = this.getWebElement(
      elementKey,
      selectionMethod,
      selectionValue
    );

    return assert.eventually.equal(
      inputElement.sendKeys(inputValue).then(
        () => {
          return true;
        },
        (error: any) => {
          throw new Error(error.message);
        }
      ),
      true,
      'This had better be true, eventually'
    );
  }

  @given(/^Click on "([^"]*)"$/, null, 60 * 1000)
  public clickOnElement(elementKey) {
    this.clickOnElementWithSelectionMethod(elementKey, null, null);
  }

  @given(
    /^Click on "([^"]*)" with the "([^"]*)" of "([^"]*)"$/,
    null,
    60 * 1000
  )
  public clickOnElementWithSelectionMethod(
    elementKey,
    selectionMethod,
    selectionValue
    ) {
    let elementToClick = this.getWebElement(
      elementKey,
      selectionMethod,
      selectionValue
    );
    return assert.eventually.equal(
      elementToClick.click().then(
        () => {
          return true;
        },
        (error: any) => {
          throw new Error(error.message);
        }
      ),
      true,
      'Element "' + elementKey + '" click failed'
    );
  }

  @given(/^Wait for "([^"]*)" seconds$/, null, 60 * 1000)
  public waitForGivenSeconds(seconds): void {
    let waitMils = parseInt(seconds) * 1000;
    return assert.eventually.equal(
      browser.driver.sleep(waitMils).then(
        () => {
          return waitMils;
        },
        (error: any) => {
          throw new Error(error.message);
        }
      ),
      waitMils,
      'Operation failed.'
    );
  }

  @given(/^The content of "([^"]*)" has text "([^"]*)"$/, null, 60 * 1000)
  public verifyElementText(elementKey, expectedText) {
    return this.verifyElementTextWithSelectionMethod(
      elementKey,
      null,
      null,
      expectedText
    );
  }

  @given(
    /^The content of "([^"]*)" with the "([^"]*)" of "([^"]*)" has text "([^"]*)"$/,
    null,
    60 * 1000
  )
  public verifyElementTextWithSelectionMethod(
    elementKey: string,
    selectionMethod: string,
    selectionValue: string,
    expectedText: string
    ) {
    let elementToVerify = this.getWebElement(
      elementKey,
      selectionMethod,
      selectionValue
    );
    return expect(elementToVerify.getText()).to.eventually.equal(expectedText);
  }

  @given(/^Element "([^"]*)" contains text "([^"]*)"$/, null, 60 * 1000)
  public assertElementContainText(elementKey: string, targetText: string) {
    let element = this.getWebElement(elementKey, null, null);
    return expect(element.getText()).to.eventually.equal(targetText);
  }

  @given(/^Switch to popup window "([^"]*)"$/, null, 60 * 1000)
  public switchWindowOrTab(windowOrTabIndex: string) {
    let index = parseInt(windowOrTabIndex);
    if (isNaN(index)) throw new Error('Window or tab index should be a number');
    // // browser.ignoreSynchronization = true;
    // browser.waitForAngular();
    // browser.sleep(500);

    browser.driver.getAllWindowHandles().then(function (handles) {
      return assert.eventually.equal(
        browser.driver
          .switchTo()
          .window(handles[index])
          .then(
          () => {
            // browser.ignoreSynchronization = false;
            return index;
          },
          (error: any) => {
            throw new Error(error.message);
          }
          ),
        index,
        'Operation failed.'
      );
    },
      (error: any) => {
        throw new Error(error.message);
      });
  }

  @given(/^Switch to iframe "([^"]*)"$/, null, 60 * 1000)
  public switchToIframe(elementKey) {
    return this.switchToIframeWithSelection(elementKey, null, null);
  }

  @given(
    /^Switch to iframe "([^"]*)" with the "([^"]*)" of "([^"]*)"$/,
    null,
    60 * 1000
  )
  public switchToIframeWithSelection(
    elementKey,
    selectionMethod,
    selectionValue
    ) {
    let iframeToSwitch = this.getWebElement(
      elementKey,
      selectionMethod,
      selectionValue
    );
    // browser.ignoreSynchronization = true;
    return assert.eventually.equal(
      browser.driver
        .switchTo()
        .frame(iframeToSwitch.getWebElement())
        .then(
        () => {
          // browser.ignoreSynchronization = false;
          return elementKey;
        },
        (error: any) => {
          // browser.ignoreSynchronization = false;
          throw new Error(error.message);
        }
        ),
      elementKey,
      'Operation failed.'
    );
  }

  @given(/^Switch to main frame$/, null, 60 * 1000)
  public switchToMainFrame() {
    // browser.ignoreSynchronization = true;
    return assert.eventually.equal(
      browser.driver
        .switchTo()
        .defaultContent()
        .then(
        () => {
          // browser.ignoreSynchronization = false;
          return true;
        },
        (error: any) => {
          // browser.ignoreSynchronization = false;
          throw new Error(error.message);
        }
        ),
      true,
      'Operation failed.'
    );
  }

  @given(/^Wait for "([^"]*)" to contain text "([^"]*)"$/, null, 60 * 1000)
  public waitForElementToContainText(elementKey: string, targetText: string) {
    return this.waitForElementToContainTextWithSelection(
      elementKey,
      null,
      null,
      targetText
    );
  }

  @given(
    /^Wait for "([^"]*)" with the "([^"]*)" of "([^"]*)" to contain text "([^"]*)"$/,
    null,
    60 * 1000
  )
  public waitForElementToContainTextWithSelection(
    elementKey: string,
    selectionMethod: string,
    selectionValue: string,
    targetText: string
    ) {
    let elementToWait = this.getWebElement(
      elementKey,
      selectionMethod,
      selectionValue
    );
    let expectedCondition = ExpectedConditions.textToBePresentInElement(
      elementToWait,
      targetText
    );
    // browser.ignoreSynchronization = true;
    return assert.eventually.equal(
      browser.driver.wait(expectedCondition, this.defaultElementTimeout).then(
        () => {
          // browser.ignoreSynchronization = false;
          return elementToWait.getText();
        },
        (error: any) => {
          // browser.ignoreSynchronization = false;
          throw new Error(error.message);
        }
      ),
      targetText,
      'Operation failed.'
    );
  }

  @given(/^Wait for "([^"]*)" to appear$/, null, 60 * 1000)
  public waitForElementToBeVisible(elementKey: string) {
    return this.waitForElementToBeVisibleWithSelection(elementKey, null, null);
  }

  @given(
    /^Wait for "([^"]*)" with the "([^"]*)" of "([^"]*)" to appear$/,
    null,
    60 * 1000
  )
  public waitForElementToBeVisibleWithSelection(
    elementKey,
    selectionMethod,
    selectionValue
    ) {
    let elementToWait = this.getWebElement(
      elementKey,
      selectionMethod,
      selectionValue
    );
    let expectedCondition = ExpectedConditions.visibilityOf(elementToWait);
    // browser.ignoreSynchronization = true;
    return assert.eventually.equal(
      browser.driver.wait(expectedCondition, this.defaultElementTimeout).then(
        () => {
          // browser.ignoreSynchronization = false;
          return true;
        },
        (error: any) => {
          // browser.ignoreSynchronization = false;
          throw new Error(error.message);
        }
      ),
      true,
      'Operation failed.'
    );
  }

  @given(/^I read the content of element "([^"]*)" and store in variable "([^"]*)" as a "([^"]*)"$/, null, 60 * 1000)
  public readContentAndStoreInVariable(
    elementKey: string,
    variableKey: string,
    variableType: string
    ) {
    return this.readContentWithSelectionAndStoreInVariable(
      elementKey,
      null,
      null,
      variableKey,
      variableType
    );
  }

  @given(/^I read the content of element "([^"]*)" with the "([^"]*)" of "([^"]*)" and store in variable "([^"]*)" as a "([^"]*)"$/, null, 60 * 1000)
  public readContentWithSelectionAndStoreInVariable(
    elementKey: string,
    selectionMethod: string,
    selectionValue: string,
    variableKey: string,
    variableType: string
    ) {
    let elementToStore = this.getWebElement(
      elementKey,
      selectionMethod,
      selectionValue
    );
    return assert.eventually.equal(
      elementToStore.getText().then(
        (value: string) => {
          this.variableService.addVariable(variableKey, variableType, value);
          return true;
        },
        (error: any) => {
          throw new Error(error);
        }
      ),
      true,
      'Operation failed.'
    );
  }

  @given(/^I store the value "([^"]*)" in variable "([^"]*)" as a "([^"]*)"$/, null, 60 * 1000)
  public storeVariableValue(
    value: string,
    variableKey: string,
    variableType: string
    ) {
    const storeVariable = () => {
      this.variableService.addVariable(variableKey, variableType, value);
      return true;
    };
    return assert.eventually.equal(
      Promise.resolve(storeVariable()),
      true,
      'Operation failed'
    );
  }

  @given(/^I populate "([^"]*)" with the value of variable "([^"]*)" of type "([^"]*)"$/, null, 60 * 1000)
  public populateElementUsingVariableValue(elementKey: string, variableKey: string, variableType: string) {
      return this.populateElementWithSelectionUsingVariableValue(elementKey, null, null, variableKey, variableType);
    }

  @given(/^I populate "([^"]*)" with the "([^"]*)" of "([^"]*)" with the value of variable "([^"]*)" of type "([^"]*)"$/, null, 60 * 1000)
  public populateElementWithSelectionUsingVariableValue(elementKey: string, elementSelectionType: string, elementSelectionValue: string,
    variableKey: string, variableType: string) {
    let inputElement = this.getWebElement(elementKey, elementSelectionType, elementSelectionValue);
    let variableValue = null;
    switch (variableType.toLowerCase()) {
      case VariableType.String:
        variableValue = this.variableService.getStringVariable(variableKey).getValue();
        break;
      case VariableType.Number:
        variableValue = this.variableService.getNumberVariable(variableKey).getValue();
        break;
      default:
        throw new Error('Invalid variable type');
    }
    if (!variableValue) throw new Error('Invalid variable value');

    return assert.eventually.equal(
      inputElement.sendKeys(variableValue).then(() => { return true; }, (error: any) => {
        throw new Error(error.message);
      }
      ), true, 'Operation failed');
  }


  @given(
    /^The value in variable "([^"]*)" of type "([^"]*)" equals to "([^"]*)"$/, null, 60 * 1000
  )
  public compareVariableValues(
    variableKey: string,
    variableType: string,
    variableValue: string
    ) {
    const getVariableByType = () => {
      switch (variableType.toLocaleLowerCase()) {
        case VariableType.String:
          return this.variableService.getStringVariable(variableKey).getValue();
        case VariableType.Number:
          return this.variableService.getNumberVariable(variableKey).getValue();
        default:
          throw new Error('Invalid variable type "' + variableType + '"');
      }
    };
    return assert.eventually.equal(
      Promise.resolve(getVariableByType()),
      variableValue,
      'Operation failed'
    );
  }

  @given(/^I drag "([^"]*)" and drop on to "([^"]*)"$/, null, 60 * 1000)
  public dragAndDropElement(dragElementKey: string, dropElementKey: string) {
    return this.dragAndDropElementsWithSelection(dragElementKey, null, null, dropElementKey, null, null);
  }

  @given(/^I drag "([^"]*)" with the "([^"]*)" of "([^"]*)" and drop on to "([^"]*)" with the "([^"]*)" of "([^"]*)"$/, null, 60 * 1000)
  public dragAndDropElementsWithSelection(dragElementKey: string, dragElementSelectionMethod: string, dragElementSelectionValue: string,
    dropElementKey: string, dropElementSelectionMethod: string, dropElementSelectionValue: string) {

    let dragElement = this.getWebElement(dragElementKey, dragElementSelectionMethod, dragElementSelectionValue);
    let dropElement = this.getWebElement(dropElementKey, dropElementSelectionMethod, dropElementSelectionValue);

    return assert.eventually.equal(
      browser.driver.actions().dragAndDrop(dragElement, dropElement).perform().then(() => { return true; }, (error: any) => {
        throw new Error(error.message);
      }
      ), true, 'Operation failed');

  }



  @given(/^Accept the confirmation alert$/, null, 60 * 1000)
  @given(/^I Accept the confirm dialog$/, null, 60 * 1000)
  public AcceptBrowserAlert() {
    return assert.eventually.equal(
      browser.driver.switchTo().alert().accept().then(() => {
        return true;
      }, (error: any) => {
        throw new Error(error.message);
      }
      ), true, 'Operation failed');
  }

  @given(/^The alert message says "([^"]*)"$/, null, 60 * 1000)
  public CheckAlertMessageText(textToCompare: string) {
    return assert.eventually.equal(
      browser.driver.switchTo().alert().getText().then((text: string) => {
        return text.trim() === textToCompare.trim();
      }, (error: any) => {
        throw new Error(error.message);
      }
      ), true, 'Operation failed');
  }

  @given(/^I Dismiss the confirm dialog$/, null, 60 * 1000)
  public DisMissConfirmation() {
    return assert.eventually.equal(
      browser.driver.switchTo().alert().dismiss().then(() => {
        return true;
      }, (error: any) => {
        throw new Error(error.message);
      }
      ), true, 'Operation failed');
  }

  @given(/^I Accept the confirm dialog$/, null, 60 * 1000)
  public AcceptConfirmation() {
    return assert.eventually.equal(
      browser.driver.switchTo().alert().accept().then(() => {
        return true;
      }, (error: any) => {
        throw new Error(error.message);
      }
      ), true, 'Operation failed');
  }

  @given(/^I enter "([^"]*)" into prompt$/, null, 60 * 1000)
  public typeInPrompt(textToCompare: string) {
    return assert.eventually.equal(
      browser.driver.switchTo().alert().sendKeys(textToCompare).then(() => {
        return true;
      }, (error: any) => {
        throw new Error(error.message);
      }
      ), true, 'Operation failed');
  }

  @given(/^The value in variable "([^"]*)" of type "([^"]*)" equals to variable "([^"]*)"$/, null, 60 * 1000)
  public compareVariableWithVariable(variableOne: string, variableType: string, variableTwo: string) {
    let comparison = null;
    const getVariableByType = () => {
      switch (variableType.toLocaleLowerCase()) {
        case VariableType.String:
          comparison = this.variableService.getStringVariable(variableTwo).getValue();
          return this.variableService.getStringVariable(variableOne).getValue();
        case VariableType.Number:
          comparison = this.variableService.getNumberVariable(variableTwo).getValue();
          return this.variableService.getNumberVariable(variableOne).getValue();
        default:
          throw new Error('Invalid variable type "' + variableType + '"');
      }
    };
    return assert.eventually.equal(Promise.resolve(getVariableByType()), comparison, 'Operation failed');
  }

  @given(/^I Add variable "([^"]*)" to "([^"]*)" and store in "([^"]*)"$/, null, 60 * 1000)
  public addNumericValues(variableKey1: string, variableKey2: string, newVariable: string) {
    let valOne = this.getVariable(variableKey1, VariableType.Number).toNumber();
    let valTwo = this.getVariable(variableKey2, VariableType.Number).toNumber();
    const addVariables = () => {
      let newVal = valOne + valTwo;
      this.variableService.addVariable(newVariable, VariableType.Number, newVal.toString());
      return true;
    }
    return assert.eventually.equal(Promise.resolve(addVariables()), true, 'Operation failed');

  }

  @given(/^I Subtract variable "([^"]*)" from "([^"]*)" and store in "([^"]*)"$/, null, 60 * 1000)
  public subTractNumericValues(variableKey1: string, variableKey2: string, newVariable: string) {
    let valOne = this.getVariable(variableKey1, VariableType.Number).toNumber();
    let valTwo = this.getVariable(variableKey2, VariableType.Number).toNumber();
    const subtractVariables = () => {
      let newVal = valOne - valTwo;
      this.variableService.addVariable(newVariable, VariableType.Number, newVal.toString());
      return true;
    }
    return assert.eventually.equal(Promise.resolve(subtractVariables()), true, 'Operation failed');

  }

  @given(/^I Multiply variable "([^"]*)" from "([^"]*)" and store in "([^"]*)"$/, null, 60 * 1000)
  public multiplyNumericValues(variableKey1: string, variableKey2: string, newVariable: string) {
    let valOne = this.getVariable(variableKey1, VariableType.Number).toNumber();
    let valTwo = this.getVariable(variableKey2, VariableType.Number).toNumber();
    const multiplyVariables = () => {
      let newVal = valOne * valTwo;
      this.variableService.addVariable(newVariable, VariableType.Number, newVal.toString());
      return true;
    }
    return assert.eventually.equal(Promise.resolve(multiplyVariables()), true, 'Operation failed');

  }

  @given(/^I Divide variable "([^"]*)" from "([^"]*)" and store in "([^"]*)"$/, null, 60 * 1000)
  public divideNumericValues(variableKey1: string, variableKey2: string, newVariable: string) {
    let valOne = this.getVariable(variableKey1, VariableType.Number).toNumber();
    let valTwo = this.getVariable(variableKey2, VariableType.Number).toNumber();
    const divideVariables = () => {
      let newVal = valOne / valTwo;
      this.variableService.addVariable(newVariable, VariableType.Number, newVal.toString());
      return true;
    }
    return assert.eventually.equal(Promise.resolve(divideVariables()), true, 'Operation failed');

  }

  @given(/^I Upload "([^"]*)" to "([^"]*)"$/, null, 60 * 1000)
  public uploadFile(filePath: string, elementKey: string) {
    this.uploadFileWithSelectionMethod(filePath, elementKey, null, null);
  }


  @given(/^I Upload "([^"]*)" to "([^"]*)" with the "([^"]*)" of "([^"]*)"$/, null, 60 * 1000)
  public uploadFileWithSelectionMethod(filePath: string, elementKey: string, selectionMethod: string, selectionValue: string) {
    let uploadElement = this.getWebElement(elementKey, selectionMethod, selectionValue);
    return assert.eventually.equal(
      uploadElement.sendKeys(filePath).then(
        () => { 
          return true; 
        }, (error: any) => {
          throw new Error(error.message);
        }
      ), true, 'Failed to upload file'
    );
  }

  @given(/^Click on "([^"]*)" when active$/, null, 60 * 1000)
  public clickOnElementWhenActive(elementKey: string) {
    return this.clickOnElementWhenActiveWithSelectionMethod(elementKey, null, null);
  }

  @given(/^Click on "([^"]*)" with the "([^"]*)" of "([^"]*)" when active$/, null, 60 * 1000)
  public clickOnElementWhenActiveWithSelectionMethod(elementKey: string, selectionMethod: string, selectionValue: string) {
    let elementToWait = this.getWebElement(elementKey, selectionMethod, selectionValue);
    let expectedCondition = ExpectedConditions.visibilityOf(elementToWait);

    browser.driver.wait(expectedCondition, this.defaultElementTimeout).then( () => {
      return assert.eventually.equal(
        elementToWait.click().then(() => {
          return true;
        }, (error: any) => {
          throw new Error(error.message);
        }),
        true,
        'Element click failed.'
      );
    },
    (error: any) => {
          throw new Error(error.message);
    });
  }

  private getVariable(variableKey: string, variableType: string): ICommonVariable {
    switch (variableType.toLocaleLowerCase()) {
      case VariableType.Number:
        return this.variableService.getNumberVariable(variableKey);
      case VariableType.String:
        return this.variableService.getStringVariable(variableKey);
    }
  }
}

export = BaseSteps;
