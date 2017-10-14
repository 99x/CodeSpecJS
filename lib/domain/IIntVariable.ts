import { ICommonVariable } from "./ICommonVariable";

export interface IIntVariable extends ICommonVariable {
    add(otherVariable: number): IIntVariable;
    subtract(otherVariable: number): IIntVariable;
    multiply(otherVariable: number): IIntVariable;
    divide(otherVariable: number): IIntVariable;
}