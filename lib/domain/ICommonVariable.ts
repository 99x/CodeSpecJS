export interface ICommonVariable {
    getKey(): string;
    getValue(): string;
    setValue(newValue: string): void;
    toNumber(): number;
    toString(): string;
}