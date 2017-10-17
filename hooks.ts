import { IHooks } from "./lib/domain/ihooks";

export class Hooks implements IHooks {
    beforeScenario(): void {
        console.log('Execute this code before each scenario');
    }
    afterScenario(): void {
        console.log('Execute this code after each scenario');
    }
    
}