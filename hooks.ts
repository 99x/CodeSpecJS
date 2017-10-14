import { IHooks } from "./lib/domain/ihooks";

export class Hooks implements IHooks {
    beforeScenario(): void {
        console.log('Before Scenario Triggered----------------');
    }
    afterScenario(): void {
        console.log('After Scenario Triggered-----------------');
    }
    
}