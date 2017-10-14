import * as _ from "lodash";
import { IStringVariable } from '../domain/IStringVariable';
import { IIntVariable } from '../domain/IIntVariable';
import { VariableObject } from '../domain/variableObject';
import { VariableType } from '../domain/variableType';
import { ICommonVariable } from "../domain/ICommonVariable";

export class VariableService {
    private stringVariables: IStringVariable[];
    private numberVariables: IIntVariable[];
    private static singleTon: VariableService;

    private constructor() {
        this.stringVariables = new Array<IStringVariable>();
        this.numberVariables = new Array<IIntVariable>();

    }

    public static GetInstance() {
        return this.singleTon || (this.singleTon = new this());
    }

    isExistingString(variableKey: string): IStringVariable {
        let targetVariable = _.find<IStringVariable>(this.stringVariables, (object: IStringVariable) => {
            return object.getKey() === variableKey;
        })

        return targetVariable;
    }

    isExistingNumber(variableKey: string): IIntVariable {
        let targetVariable = _.find<IIntVariable>(this.numberVariables, (object: IIntVariable) => {
            return object.getKey() === variableKey;
        })

        return targetVariable;
    }


    addVariable(variableKey: string, variableType: string, variableValue: string): void {
        switch (variableType.toLowerCase()) {
            case VariableType.String:
                let existingString = this.isExistingString(variableKey);
                if (existingString) {
                    this.stringVariables.forEach((element: IStringVariable) => {
                        if (element.getKey() === variableKey) {
                            element.setValue(variableValue);
                        }
                    });
                } else {
                    this.stringVariables.push(new VariableObject(variableKey, variableValue));
                }
                break;
            case VariableType.Number:
                let existingNumber = this.isExistingNumber(variableKey);
                if (existingNumber) {
                    this.numberVariables.forEach((element: IIntVariable) => {
                        if (element.getKey() === variableKey) {
                            element.setValue(variableValue);
                        }
                    });
                } else {
                    this.numberVariables.push(new VariableObject(variableKey, variableValue));
                }
                break;
        }
    }

    getNumberVariable(variableKey: string): IIntVariable {

        let variable = _.find<IIntVariable>(this.numberVariables, (object: IIntVariable) => {
            return variableKey === object.getKey();
        });
        if (variable) return variable;
        throw new Error('Variable "' + variableKey + '" not found');
    }

    getStringVariable(variableKey: string): IStringVariable {
        let variable = _.find<IStringVariable>(this.stringVariables, (object: IStringVariable) => {
            return variableKey === object.getKey();
        });
        if (variable) return variable;
        throw new Error('Variable "' + variableKey + '" not found');
    }

    getVariable(variableKey: string, variableType: string): ICommonVariable{
        switch(variableType.toLowerCase()){
            case VariableType.String:
                return this.getStringVariable(variableKey);
            case VariableType.Number:
                return this.getNumberVariable(variableKey);
        }
    }
}