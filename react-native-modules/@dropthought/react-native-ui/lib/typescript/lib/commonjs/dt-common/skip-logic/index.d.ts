export var __esModule: boolean;
export function Greeter(name: any): string;
export function EvaluateRuleSet(ruleSet: Rule[], pageFeedback: IQAData[]): string;
export type Rule = any;
export type QuestionType = any;
export type IQAData = import('./IfcRule').IQAData;
/**
 *
 * @param {string[]} conditionArr
 * @param {string} questionId
 * @param {QuestionType} type
 * @param {IQAData} feedback
 */
export function evaluateCondition(conditionArr: string[], questionId: string, type: any, feedback: any): boolean;
