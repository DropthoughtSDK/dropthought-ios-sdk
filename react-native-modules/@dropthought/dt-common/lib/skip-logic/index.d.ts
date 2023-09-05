export function evaluateCondition(conditionArr: string[], questionId: string, type: QuestionType, feedback: IQAData): boolean;
export * from "./SkipLogic";
export * from "./IfcRule";
export type Rule = import('../types/data').Rule;
export type QuestionType = import('../types/data').QuestionType;
export type IQAData = import('./IfcRule').IQAData;
