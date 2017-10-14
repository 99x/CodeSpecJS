import { IIntVariable } from "./IIntVariable";
import { IStringVariable } from "./IStringVariable";

export class VariableObject implements IIntVariable, IStringVariable {
    key: string;
    value: string;
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }

    setValue(newValue: string): void {
       this.value = newValue;
    }

    getKey(): string {
        return this.key;
    }
    getValue(): string {
        return this.value;
    }
    toString(): string {
        return this.value.toString();
    }
    toNumber(): number {
        return parseInt(this.getValue());
    }
    add(otherVariable: number): IIntVariable {
        let localValue = this.toNumber();
        let newNumber = localValue + otherVariable;
        let returnVariable: IIntVariable = new VariableObject(this.getKey(), newNumber.toString());
        return returnVariable;

    }
    addString(otherVariable: object): IStringVariable {
        let newString = this.toString() + otherVariable.toString();
        let returnVariable: IStringVariable = new VariableObject(this.getKey(), newString.toString());
        return returnVariable;
    }
    subtract(otherVariable: number): IIntVariable {
        let localValue = this.toNumber();
        let newNumber = localValue - otherVariable;
        let returnVariable: IIntVariable = new VariableObject(this.getKey(), newNumber.toString());
        return returnVariable;
    }
    multiply(otherVariable: number): IIntVariable {
        let localValue = this.toNumber();
        let newNumber = localValue * otherVariable;
        let returnVariable: IIntVariable = new VariableObject(this.getKey(), newNumber.toString());
        return returnVariable;
    }
    divide(otherVariable: number): IIntVariable {
        let localValue = this.toNumber();
        let newNumber = localValue / otherVariable;
        let returnVariable: IIntVariable = new VariableObject(this.getKey(), newNumber.toString());
        return returnVariable;
    }
}