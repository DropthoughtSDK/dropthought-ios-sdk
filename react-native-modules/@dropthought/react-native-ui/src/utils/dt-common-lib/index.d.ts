import { IQAData, IRule } from './IfcRule';
export declare const Greeter: (name: string) => string;
/**
 * This function is used to evaluate skip logic rule based on the skip authoring rules
 * and the page feedback passed to evaluate and provide the next page index on condition met
 * it will return empty string for conditions not met.
 * @param ruleSet
 * @param pageFeedback
 */
export declare const EvaluateRuleSet: (
  ruleSet: IRule[],
  pageFeedback: IQAData[]
) => string;
