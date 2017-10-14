import { ICommonVariable } from "./ICommonVariable";

export interface IStringVariable extends ICommonVariable {
    addString(otherVariable: object): IStringVariable;
    
}