'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Greeter = name => `Nĭ hăo ${name}`;
exports.EvaluateRuleSet = (ruleSet, pageFeedback) => {
    let result = '';
    for (const rule of ruleSet) {
        if (rule.condition.indexOf('&&') > -1) {
            const andArr = rule.condition.split('&&');
            let evalCond = '';
            for (const andCond of andArr) {
                const filteredFeedback = filterFeedback(pageFeedback, andCond.split('.')[0]);
                const conditionArr = handleSplit(andCond, filteredFeedback[0].type);
                if (filteredFeedback.length > 0) {
                    logDetails(conditionArr, filteredFeedback);
                    if (evaluateCondition(conditionArr, filteredFeedback[0].questionId, filteredFeedback[0].type, filteredFeedback[0])) {
                        evalCond =
                            evalCond.length > 0 ? evalCond + ' && ' + true : evalCond + true;
                    }
                    else {
                        evalCond =
                            evalCond.length > 0
                                ? evalCond + ' && ' + false
                                : evalCond + false;
                    }
                }
            }
            const e = eval;
            result = e(evalCond) ? rule.toPageId : '';
        }
        else if (rule.condition.indexOf('||') > -1) {
            const orArr = rule.condition.split('||');
            for (const orCond of orArr) {
                const filteredFeedback = filterFeedback(pageFeedback, orCond.split('.')[0]);
                const conditionArr = handleSplit(orCond, filteredFeedback[0].type);
                if (filteredFeedback.length > 0) {
                    logDetails(conditionArr, filteredFeedback);
                    if (evaluateCondition(conditionArr, filteredFeedback[0].questionId, filteredFeedback[0].type, filteredFeedback[0])) {
                        result = rule.toPageId;
                    }
                }
            }
        }
        else {
            const filteredFeedback = filterFeedback(pageFeedback, rule.condition.split('.')[0]);
            const conditionArr = handleSplit(rule.condition, filteredFeedback[0].type);
            if (filteredFeedback.length > 0) {
                logDetails(conditionArr, filteredFeedback);
                if (evaluateCondition(conditionArr, filteredFeedback[0].questionId, filteredFeedback[0].type, filteredFeedback[0])) {
                    result = rule.toPageId;
                }
            }
        }
        if (result.length > 0) {
            break;
        }
    }
    return result;
};
const filterFeedback = (pageFeedback, questionId) => {
    return pageFeedback.filter(el => {
        return (el.questionId === questionId);
    });
};
const logDetails = (conditionArr, filteredFeedback) => {
};
const handleSplit = (condition, type) => {
    const conditionArr = condition.split('.');
    let conditionArrMax;
    if (type === 'open') {
        conditionArrMax = 3;
    }
    else if (type === 'multipleOpenEnded') {
        conditionArrMax = 4;
    }
    if (typeof conditionArrMax === 'number' &&
        conditionArr.length > conditionArrMax) {
        let lastString = '';
        for (let i = conditionArrMax - 1; i < conditionArr.length; i++) {
            lastString =
                lastString +
                    conditionArr[i] +
                    (i !== conditionArr.length - 1 ? '.' : '');
        }
        conditionArr[conditionArrMax - 1] = lastString;
        conditionArr.length = conditionArrMax;
        return conditionArr;
    }
    return conditionArr;
};
export const evaluateCondition = (conditionArr, questionId, type, feedback) => {
    let result = false;
    let targetAnswer;
    const lastIndex = conditionArr.length - 1;
    if (questionId === conditionArr[0]) {
        if (conditionArr.length === 4) {
            const targetOption = conditionArr[1];
            const skiplogicType = conditionArr[2];
            let selectedAnswer = -1;
            let selectedMatrix = [-1];
            let conditionMatrixArr = [];
            let condition = -1;
            switch (type) {
                case 'ranking': {
                    selectedAnswer = feedback.textOrIndexArr.findIndex(value => value === targetOption);
                    if (selectedAnswer === -1)
                        return false;
                    targetAnswer = parseInt(conditionArr[3], 10);
                    condition = targetAnswer - 1;
                    break;
                }
                case 'matrixRating': {
                    const selectedIndex = parseInt(targetOption, 10);
                    const textOrIndexArr = `${feedback.textOrIndexArr[selectedIndex]}`;
                    selectedAnswer = parseInt(textOrIndexArr, 10);
                    condition = Number(conditionArr[3]) - 1;
                    break;
                }
                case 'matrixChoice': {
                    const selectedIndex = parseInt(targetOption, 10);
                    const textOrIndexArr = `${feedback.textOrIndexArr[selectedIndex]}`;
                    conditionMatrixArr = conditionArr[3]
                        .split(',')
                        .map(condition => parseInt(condition, 10));
                    selectedMatrix = textOrIndexArr
                        .split(',')
                        .map(selected => parseInt(selected, 10));
                    break;
                }
                case 'multipleOpenEnded': {
                    const selectedIndex = parseInt(targetOption, 10);
                    const textOrIndexArr = `${feedback.textOrIndexArr[selectedIndex]}`;
                    if (textOrIndexArr.length === 0) {
                        selectedAnswer = -1;
                    }
                    else {
                        selectedAnswer = parseInt(textOrIndexArr, 10);
                    }
                    break;
                }
                default:
            }
            switch (skiplogicType) {
                case 'mtch':
                    result = feedback.textOrIndexArr[conditionArr[1]].includes(conditionArr[lastIndex]);
                    break;
                case 'nmtch': {
                    if (feedback.textOrIndexArr[conditionArr[1]] === '') {
                        result = true;
                    }
                    else {
                        result = !feedback.textOrIndexArr[conditionArr[1]].includes(conditionArr[lastIndex]);
                    }
                    break;
                }
                case 'answ':
                    switch (type) {
                        case 'matrixChoice': {
                            result = conditionMatrixArr.some(condition => selectedMatrix.includes(condition));
                            break;
                        }
                        default: {
                            const conditionValueArr = conditionArr[lastIndex]
                                .split(',')
                                .map(value => Number(value) - 1);
                            result = conditionValueArr.includes(selectedAnswer);
                            break;
                        }
                    }
                    break;
                case 'ansr':
                    switch (type) {
                        case 'matrixChoice':
                            {
                                result = selectedMatrix[0] !== -1;
                            }
                            break;
                        default:
                            {
                                result = selectedAnswer !== -1;
                            }
                            break;
                    }
                    break;
                case 'nasr':
                    result = selectedAnswer === -1;
                    switch (type) {
                        case 'matrixChoice':
                            {
                                result = selectedMatrix[0] === -1;
                            }
                            break;
                        default:
                            {
                                result = selectedAnswer === -1;
                            }
                            break;
                    }
                    break;
                case 'nasw': {
                    switch (type) {
                        case 'matrixChoice': {
                            const isIncluding = conditionMatrixArr.some(condition => selectedMatrix.includes(condition));
                            result = !isIncluding;
                            break;
                        }
                        default: {
                            const conditionValueArr = conditionArr[lastIndex]
                                .split(',')
                                .map(text => parseInt(text, 10) - 1);
                            const isIncluding = conditionValueArr.includes(selectedAnswer);
                            result = !isIncluding;
                            break;
                        }
                    }
                    break;
                }
                case 'eq':
                    result = selectedAnswer === condition;
                    break;
                case 'btwn': {
                    const conditionValueArr = conditionArr[lastIndex]
                        .split('-')
                        .map(value => Number(value));
                    result =
                        selectedAnswer > conditionValueArr[0] - 1 &&
                            selectedAnswer < conditionValueArr[1] - 1;
                    break;
                }
                case 'lt':
                    result = selectedAnswer < condition;
                    break;
                case 'lteq':
                    result = selectedAnswer <= condition;
                    break;
                case 'gt':
                    result = selectedAnswer > condition;
                    break;
                case 'gteq':
                    result = selectedAnswer >= condition;
                    break;
            }
        }
        else {
            const skiplogicType = conditionArr[1];
            let selectedAnswer = parseInt(`${feedback.textOrIndexArr[0]}`, 10);
            let condition = parseInt(conditionArr[2], 10);
            switch (type) {
                case 'ratingSlider':
                    selectedAnswer++;
                    break;
                default:
            }
            switch (skiplogicType) {
                case 'mtch': {
                    const textOrIndexArr = `${feedback.textOrIndexArr[0]}`;
                    result = textOrIndexArr.includes(conditionArr[lastIndex]);
                    break;
                }
                case 'nmtch': {
                    const textOrIndexArr = `${feedback.textOrIndexArr[0]}`;
                    if (textOrIndexArr === '') {
                        result = true;
                    }
                    else {
                        result = !textOrIndexArr.includes(conditionArr[lastIndex]);
                    }
                    break;
                }
                case 'ansr': {
                    const textOrIndexArr = `${feedback.textOrIndexArr[0]}`;
                    result = textOrIndexArr.trim().length > 0;
                    break;
                }
                case 'nasr': {
                    const textOrIndexArr = `${feedback.textOrIndexArr[0]}`;
                    result = textOrIndexArr.trim().length === 0;
                    break;
                }
                case 'answ': {
                    const conditionValueArr = conditionArr[2].split(',');
                    const feedbackAnswers = feedback.textOrIndexArr.map(feedback => `${feedback}`);
                    conditionValueArr.forEach(condition => {
                        if (!result) {
                            if (condition === '-2') {
                                if (feedback.otherFlag) {
                                    result = true;
                                }
                            }
                            else {
                                const isIncluding = feedbackAnswers.includes(condition);
                                if (isIncluding) {
                                    result = true;
                                }
                            }
                        }
                    });
                    break;
                }
                case 'nasw': {
                    const textOrIndexArr = `${feedback.textOrIndexArr[0]}`;
                    if (textOrIndexArr.trim().length === 0) {
                        result = true;
                        break;
                    }
                    const conditionValueArr = conditionArr[2]
                        .split(',')
                        .map(text => parseInt(text, 10));
                    const feedbackArr = textOrIndexArr
                        .split(',')
                        .map(text => parseInt(text, 10));
                    switch (type) {
                        case 'ratingSlider':
                            result = !conditionValueArr.includes(selectedAnswer);
                            break;
                        case 'multiChoice':
                            const multiChoiceFeedbackArr = feedback.textOrIndexArr.map(text => parseInt(text, 10));
                            result = conditionValueArr.every(condition => !multiChoiceFeedbackArr.includes(condition));
                            break;
                        default:
                            result = conditionValueArr.every(feedback => !feedbackArr.includes(feedback));
                            break;
                    }
                    break;
                }
                case 'btwn': {
                    const conditionValueArr = conditionArr[lastIndex]
                        .split('-')
                        .map(value => Number(value));
                    result =
                        selectedAnswer > conditionValueArr[0] &&
                            selectedAnswer < conditionValueArr[1];
                    break;
                }
                case 'eq':
                    result = selectedAnswer === condition;
                    break;
                case 'lt':
                    result = selectedAnswer < condition;
                    break;
                case 'lteq':
                    result = selectedAnswer <= condition;
                    break;
                case 'gt':
                    result = selectedAnswer > condition;
                    break;
                case 'gteq':
                    result = selectedAnswer >= condition;
                    break;
            }
        }
    }
    return result;
};
export * from './SkipLogic';
export * from './IfcRule';
