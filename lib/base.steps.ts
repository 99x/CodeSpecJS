import { before, after, binding, when, then, given } from 'cucumber-tsflow';
import { browser, element, by, ElementFinder, ExpectedConditions } from 'protractor';
import { ElementService } from "./services/element.service";

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let assert = chai.assert;

@binding()
class BaseSteps {
  elementService: ElementService;
  defaultElementTimeout: number;
  constructor() {
    this.elementService = ElementService.GetInstance();
    this.defaultElementTimeout = 10000;

  }

  @before()
  public beforeAllScenarios(): void {
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

  private getWebElement(elementKey: string, selectionMethod: string, selectionValue: string): ElementFinder {
    if (selectionMethod && selectionValue) {
      let webElement = element(this.elementService.getElementSource(selectionMethod, selectionValue));
      if (!webElement) throw new Error('Element "' + elementKey + '" not found in dom. Selection Method: "' + selectionMethod + '", Selection Value: "' + selectionValue + '"');
      this.elementService.addNewElement(elementKey, webElement);
      return webElement;
    } else {
      let webElement = this.elementService.getElementByKey(elementKey);
      if (!webElement) throw new Error('Element "' + elementKey + '" not found in object repository.');
      return webElement;
    }
  }


  @given(/^[I|i] navigate to "([^"]*)"$/, null, (160 * 1000))
  @given(/[N|n]avigate to "([^"]*)"$/, null, (160 * 1000))
  public navigateToUrl(url: string): void {
    return assert.eventually.equal(browser.get(url).then(() => {
      return url;
    }, (error: any) => {
      throw new Error(error.message);
    }), url, "Navigated to the wrong url.");
  }

  @given(/^[E|e]nter "([^"]*)" to the "([^"]*)"$/, null, (60 * 1000))
  @given(/^[I|i] enter "([^"]*)" to the "([^"]*)"$/, null, (60 * 1000))
  public enterTextToElement(inputValue: string, elementKey: string) {
    this.enterTextToElementWithSelectionMethod(inputValue, elementKey, null, null);
  }

  @given(/^I enter "([^"]*)" to the "([^"]*)" with the "([^"]*)" of "([^"]*)"$/, null, (60 * 1000))
  public enterTextToElementWithSelectionMethod(inputValue: string, elementKey: string, selectionMethod: string, selectionValue: string) {
    let inputElement = this.getWebElement(elementKey, selectionMethod, selectionValue);

    return assert.eventually.equal(inputElement.sendKeys(inputValue).then(() => {
      return true;
    }, (error: any) => {
      throw new Error(error.message);
    }), true, "This had better be true, eventually")

  }

  @given(/^Click on "([^"]*)"$/, null, (60 * 1000))
  public clickOnElement(elementKey) {
    this.clickOnElementWithSelectionMethod(elementKey, null, null);
  }

  @given(/^Click on "([^"]*)" with the "([^"]*)" of "([^"]*)"$/, null, (60 * 1000))
  public clickOnElementWithSelectionMethod(elementKey, selectionMethod, selectionValue) {
    let elementToClick = this.getWebElement(elementKey, selectionMethod, selectionValue);
    return assert.eventually.equal(elementToClick.click().then(() => { return true }, (error: any) => {
      throw new Error(error.message);
    }), true, 'Element "' + elementKey + '" click failed')

  }

  @given(/^Wait for "([^"]*)" seconds$/, null, (60 * 1000))
  public waitForGivenSeconds(seconds): void {
    let waitMils = parseInt(seconds) * 1000;
    return assert.eventually.equal(browser.driver.sleep(waitMils).then(() => {
      return waitMils;
    }, (error: any) => {
      throw new Error(error.message);
    }), waitMils, 'Operation failed.')

  }

  @given(/^The content of "([^"]*)" has text "([^"]*)"$/, null, (60 * 1000))
  public verifyElementText(elementKey, expectedText) {
    return this.verifyElementTextWithSelectionMethod(elementKey, null, null, expectedText);
  }

  @given(/^The content of "([^"]*)" with the "([^"]*)" of "([^"]*)" has text "([^"]*)"$/, null, (60 * 1000))
  public verifyElementTextWithSelectionMethod(elementKey: string, selectionMethod: string, selectionValue: string, expectedText: string) {
    let elementToVerify = this.getWebElement(elementKey, selectionMethod, selectionValue);
    return expect(elementToVerify.getText()).to.eventually.equal(expectedText)
  }

  @given(/^Element "([^"]*)" contains text "([^"]*)"$/, null, (60 * 1000))
  public assertElementContainText(elementKey: string, targetText: string) {
    let element = this.getWebElement(elementKey, null, null);
    return expect(element.getText()).to.eventually.equal(targetText)
  }

  @given(/^Switch to popup window "([^"]*)"$/, null, (60 * 1000))
  public switchWindowOrTab(windowOrTabIndex: string) {
    let index = parseInt(windowOrTabIndex);
    if (isNaN(index)) throw new Error('Window or tab index should be a number');
    // // browser.ignoreSynchronization = true;
    // browser.waitForAngular();
    // browser.sleep(500);

    browser.driver.getAllWindowHandles().then(function (handles) {
      return assert.eventually.equal(
        browser.driver.switchTo().window(handles[index]).then(() => {
          // browser.ignoreSynchronization = false;
          return index;
        }, (error: any) => {
          throw new Error(error.message);
        }), index, 'Operation failed.');
    }, (error: any) => {
      throw new Error(error.message);
    })


  }

  @given(/^Switch to iframe "([^"]*)"$/, null, (60 * 1000))
  public switchToIframe(elementKey) {
    return this.switchToIframeWithSelection(elementKey, null, null);
  }

  @given(/^Switch to iframe "([^"]*)" with the "([^"]*)" of "([^"]*)"$/, null, (60 * 1000))
  public switchToIframeWithSelection(elementKey, selectionMethod, selectionValue) {
    let iframeToSwitch = this.getWebElement(elementKey, selectionMethod, selectionValue);
    // browser.ignoreSynchronization = true;
    return assert.eventually.equal(browser.driver.switchTo().frame(iframeToSwitch.getWebElement()).then(() => {
      // browser.ignoreSynchronization = false;
      return elementKey;
    }, (error: any) => {
      // browser.ignoreSynchronization = false;
      throw new Error(error.message);
    }), elementKey, 'Operation failed.');

  }

  @given(/^Switch to main frame$/, null, (60 * 1000))
  public switchToMainFrame() {
    // browser.ignoreSynchronization = true;
    return assert.eventually.equal(browser.driver.switchTo().defaultContent().then(() => {
      // browser.ignoreSynchronization = false;
      return true;
    }, (error: any) => {
      // browser.ignoreSynchronization = false;
      throw new Error(error.message);
    }), true, 'Operation failed.');

  }

  @given(/^Wait for "([^"]*)" to contain text "([^"]*)"$/, null, (60 * 1000))
  public waitForElementToContainText(elementKey: string, targetText: string) {
    return this.waitForElementToContainTextWithSelection(elementKey, null, null, targetText);
  }

  @given(/^Wait for "([^"]*)" with the "([^"]*)" of "([^"]*)" to contain text "([^"]*)"$/, null, (60 * 1000))
  public waitForElementToContainTextWithSelection(elementKey: string, selectionMethod: string, selectionValue: string, targetText: string) {

    let elementToWait = this.getWebElement(elementKey, selectionMethod, selectionValue);
    let expectedCondition = ExpectedConditions.textToBePresentInElement(elementToWait, targetText);
    // browser.ignoreSynchronization = true;
    return assert.eventually.equal(browser.driver.wait(expectedCondition, this.defaultElementTimeout).then(() => {
      // browser.ignoreSynchronization = false;
      return elementToWait.getText();
    }, (error: any) => {
      // browser.ignoreSynchronization = false;
      throw new Error(error.message);
    }), targetText, 'Operation failed.');

  }

  @given(/^Wait for "([^"]*)" to appear$/, null, (60 * 1000))
  public waitForElementToBeVisible(elementKey: string) {
    return this.waitForElementToBeVisibleWithSelection(elementKey, null, null);
  }

  @given(/^Wait for "([^"]*)" with the "([^"]*)" of "([^"]*)" to appear$/, null, (60 * 1000))
  public waitForElementToBeVisibleWithSelection(elementKey, selectionMethod, selectionValue) {
    let elementToWait = this.getWebElement(elementKey, selectionMethod, selectionValue);
    let expectedCondition = ExpectedConditions.visibilityOf(elementToWait);
    // browser.ignoreSynchronization = true;
    return assert.eventually.equal(
      browser.driver.wait(expectedCondition, this.defaultElementTimeout).then(() => {
        // browser.ignoreSynchronization = false;
        return true;
      }, (error: any) => {
        // browser.ignoreSynchronization = false;
        throw new Error(error.message);
      }), true, 'Operation failed.');

  }
}

export = BaseSteps;