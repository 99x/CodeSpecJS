import { browser, ElementHelper, element, by, ElementFinder } from 'protractor';
import { ElementObject } from "../domain/elementObject";
import { ProtractorLocator } from "protractor/built/locators";
import { promise as wdpromise } from 'selenium-webdriver'
import * as _ from "lodash";
import { RepoElement } from "../domain/repoElement";

declare var OBJECT_REPO: any;

export class ElementService {
    private elementCache: ElementObject[];
    private static singleTon: ElementService;

    private constructor() {

        this.elementCache = new Array<ElementObject>();
        //TODO: Read the object repo from excel or CSV file and populate elementCache 
        if (browser.params.OBJECT_REPO) {
            let objectRepoElements = <RepoElement[]>browser.params.OBJECT_REPO;
            objectRepoElements.forEach((object: RepoElement) => {
                let elementFinderObj = element(this.getElementSource(object.selectionMethod, object.value));
                this.elementCache.push(new ElementObject(object.elementKey, elementFinderObj));
            })
        }
    }

    public static GetInstance() {
        return this.singleTon || (this.singleTon = new this());
    }

    isExistingElement(elementKey: string): boolean {
        let targetElement = _.find<ElementObject>(this.elementCache, (object: ElementObject) => {
            return elementKey === object.Key;
        });
        return targetElement ? true : false;
    }

    addNewElement(elementKey: string, element: ElementFinder): void {
        if (!this.isExistingElement(elementKey)) {
            this.elementCache.push(new ElementObject(elementKey, element));
        }
    }

    getElementByKey(elementKey: string): ElementFinder {
        let targetElement = _.find<ElementObject>(this.elementCache, (object: ElementObject) => {
            return elementKey === object.Key;
        });
        return targetElement ? targetElement.UIElement : null;

    }

    getElementSource(method: string, value: string) {
        if (method && value) {
            switch (method.toLowerCase()) {
                case "model":
                    return by.model(value);
                case "id":
                    return by.id(value);
                case "xpath":
                    return by.xpath(value);
                case "binding":
                    return by.binding(value);
                case "css":
                    return by.css(value);
            }
        } else {
            throw new Error('Invalid parameters');
        }
    }
}