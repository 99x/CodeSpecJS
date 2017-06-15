import { ElementFinder } from "protractor/built";

export class ElementObject {
    Key: string;
    UIElement: ElementFinder
    constructor(key: string, uiElement: ElementFinder){
        this.Key = key;
        this.UIElement = uiElement;
    }
}