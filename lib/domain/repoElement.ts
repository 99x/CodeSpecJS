export class RepoElement {
    elementKey: string;
    selectionMethod: string;
    value: string;
    constructor(elementKey: string, selectionMethod: string, value: string){
        this.elementKey = elementKey;
        this.selectionMethod = selectionMethod;
        this.value = value;
    }
}