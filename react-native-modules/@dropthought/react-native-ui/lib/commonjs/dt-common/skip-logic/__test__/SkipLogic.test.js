"use strict";

var _ = require("..");

var _index = require("../index");

const surveyWithRules = {
  pageOrder: ['38923572-2924-45af-bf3f-b2b43b2b3929', '366065b9-a495-430e-927a-f4ddc02dc85a', '86a829b1-e2ee-4201-a006-ca43d2958e55', '6a6d5dca-bc10-4f7a-9d55-4e8ccfc2fbf1'],
  pages: [{
    pageId: '38923572-2924-45af-bf3f-b2b43b2b3929',
    questions: [{
      questionId: 'cf82e9de-7140-40d2-b59f-8b43e0dec209'
    }, {
      questionId: '86e3cd04-f81e-4254-a59a-a61641eb9c26'
    }, {
      questionId: '64cbf808-95d0-470f-8748-0b9111cdbca5'
    }]
  }, {
    pageId: '366065b9-a495-430e-927a-f4ddc02dc85a',
    questions: [{
      questionId: '43c8f71b-4613-4b77-bd99-90cdfacb7f00'
    }, {
      questionId: 'c0ad0634-af48-4903-98c7-01322d323643'
    }, {
      questionId: '6ab17499-9316-49cf-9d70-20827aa20fe3'
    }]
  }, {
    pageId: '86a829b1-e2ee-4201-a006-ca43d2958e55',
    questions: [{
      questionId: '91e635aa-8887-4ded-96f2-5b4fa96715be'
    }, {
      questionId: 'a02a4a16-110d-48c8-8fdb-f87dff9c6c19'
    }, {
      questionId: '8d215d01-a8ae-430d-8a44-8a5a4f142b9d'
    }]
  }, {
    pageId: '6a6d5dca-bc10-4f7a-9d55-4e8ccfc2fbf1',
    questions: [{
      questionId: '5ec1ffd1-bcf2-454f-9707-4f0880db0bfc'
    }]
  }],
  rules: {
    // index: 0 (p1)
    '366065b9-a495-430e-927a-f4ddc02dc85a': [{
      id: 'cbe49f36-dd9b-42c9-89d4-214388024716',
      toPageId: '6a6d5dca-bc10-4f7a-9d55-4e8ccfc2fbf1',
      condition: '43c8f71b-4613-4b77-bd99-90cdfacb7f00.nasw.0&&c0ad0634-af48-4903-98c7-01322d323643.answ.0&&6ab17499-9316-49cf-9d70-20827aa20fe3.ansr',
      ruleIndex: 0,
      mode: 'noChange'
    }, {
      id: 'e5f41651-e40d-4df2-9377-2ddf671cda6d',
      toPageId: 'thank-you-page',
      condition: '43c8f71b-4613-4b77-bd99-90cdfacb7f00.answ.3||c0ad0634-af48-4903-98c7-01322d323643.answ.1||6ab17499-9316-49cf-9d70-20827aa20fe3.answ.0',
      ruleIndex: 1,
      mode: 'noChange'
    }],
    // index: 1 (p2)
    '38923572-2924-45af-bf3f-b2b43b2b3929': [{
      id: 'fb736b53-e1b3-4cc4-a164-795bfab44ad5',
      toPageId: '86a829b1-e2ee-4201-a006-ca43d2958e55',
      condition: 'cf82e9de-7140-40d2-b59f-8b43e0dec209.answ.4&&86e3cd04-f81e-4254-a59a-a61641eb9c26.ansr&&64cbf808-95d0-470f-8748-0b9111cdbca5.answ.0',
      ruleIndex: 0,
      mode: 'noChange'
    }, {
      id: '6a045d0a-5a0d-4e2d-8fac-bfba89576ef6',
      toPageId: 'thank-you-page',
      condition: 'cf82e9de-7140-40d2-b59f-8b43e0dec209.answ.2&&86e3cd04-f81e-4254-a59a-a61641eb9c26.nasr&&64cbf808-95d0-470f-8748-0b9111cdbca5.nasr',
      ruleIndex: 1,
      mode: 'noChange'
    }]
  }
};
describe('rule set for page 1, conditions with &&', () => {
  test('should jump to 3rd page (index 2) when match with conditions', () => {
    const testPageIndex = 0;
    const feedbacks = [{
      answers: [4],
      questionId: 'cf82e9de-7140-40d2-b59f-8b43e0dec209'
    }, {
      answers: ['12345'],
      questionId: '86e3cd04-f81e-4254-a59a-a61641eb9c26'
    }, {
      answers: [0],
      questionId: '64cbf808-95d0-470f-8748-0b9111cdbca5'
    }, {
      answers: [0],
      questionId: '43c8f71b-4613-4b77-bd99-90cdfacb7f00'
    }];
    const nextPageIndex = (0, _.nextPage)(testPageIndex, feedbacks, surveyWithRules);
    expect(nextPageIndex).toBe(2);
  });
  test('should jump to next when not match with conditions', () => {
    const testPageIndex = 0;
    const feedbacks = [{
      answers: [3],
      questionId: 'cf82e9de-7140-40d2-b59f-8b43e0dec209'
    }, {
      answers: [''],
      questionId: '86e3cd04-f81e-4254-a59a-a61641eb9c26'
    }, {
      answers: [0],
      questionId: '64cbf808-95d0-470f-8748-0b9111cdbca5'
    }, {
      answers: [0],
      questionId: '43c8f71b-4613-4b77-bd99-90cdfacb7f00'
    }];
    const nextPageIndex = (0, _.nextPage)(testPageIndex, feedbacks, surveyWithRules);
    expect(nextPageIndex).toBe(testPageIndex + 1);
  });
  test('should jump to end when match with conditions', () => {
    const testFeedbacksSets = [[{
      answers: [2],
      questionId: 'cf82e9de-7140-40d2-b59f-8b43e0dec209'
    }, {
      answers: [''],
      questionId: '86e3cd04-f81e-4254-a59a-a61641eb9c26'
    }, {
      answers: [0],
      questionId: '43c8f71b-4613-4b77-bd99-90cdfacb7f00'
    }], [{
      answers: [2],
      questionId: 'cf82e9de-7140-40d2-b59f-8b43e0dec209'
    }, {
      answers: [],
      questionId: '64cbf808-95d0-470f-8748-0b9111cdbca5'
    }, {
      answers: [0],
      questionId: '43c8f71b-4613-4b77-bd99-90cdfacb7f00'
    }], [{
      answers: [2],
      questionId: 'cf82e9de-7140-40d2-b59f-8b43e0dec209'
    }, {
      answers: [0],
      questionId: '43c8f71b-4613-4b77-bd99-90cdfacb7f00'
    }]];

    for (const feedbacks of testFeedbacksSets) {
      const nextPageIndex = (0, _.nextPage)(0, feedbacks, surveyWithRules);
      expect(nextPageIndex).toBe(-1);
    }
  });
});
describe('rule set for page 2, condifionts with ||', () => {
  test('should jump to end when match with conditions', () => {
    const testFeedbacksSets = [[{
      answers: [3],
      questionId: 'cf82e9de-7140-40d2-b59f-8b43e0dec209'
    }, {
      answers: [3],
      questionId: '43c8f71b-4613-4b77-bd99-90cdfacb7f00'
    }, {
      answers: [2],
      questionId: 'c0ad0634-af48-4903-98c7-01322d323643'
    }, {
      answers: [1],
      questionId: '6ab17499-9316-49cf-9d70-20827aa20fe3'
    }], [{
      answers: [3],
      questionId: 'cf82e9de-7140-40d2-b59f-8b43e0dec209'
    }, {
      answers: [1],
      questionId: '43c8f71b-4613-4b77-bd99-90cdfacb7f00'
    }, {
      answers: [1],
      questionId: 'c0ad0634-af48-4903-98c7-01322d323643'
    }, {
      answers: [10],
      questionId: '6ab17499-9316-49cf-9d70-20827aa20fe3'
    }], [{
      answers: [3],
      questionId: 'cf82e9de-7140-40d2-b59f-8b43e0dec209'
    }, {
      answers: [2],
      questionId: '43c8f71b-4613-4b77-bd99-90cdfacb7f00'
    }, {
      answers: [1, 2],
      questionId: 'c0ad0634-af48-4903-98c7-01322d323643'
    }, {
      answers: [0],
      questionId: '6ab17499-9316-49cf-9d70-20827aa20fe3'
    }]];

    for (const feedbacks of testFeedbacksSets) {
      const nextPageIndex = (0, _.nextPage)(1, feedbacks, surveyWithRules);
      expect(nextPageIndex).toBe(-1);
    }
  });
  test('should jump to next when not match any rules', () => {
    const testFeedbacksSets = [[{
      answers: [3],
      //answ.2
      questionId: 'cf82e9de-7140-40d2-b59f-8b43e0dec209'
    }, {
      answers: [0],
      //answ.3
      questionId: '43c8f71b-4613-4b77-bd99-90cdfacb7f00'
    }, {
      answers: [2],
      //answ.1
      questionId: 'c0ad0634-af48-4903-98c7-01322d323643'
    }, {
      answers: [''],
      //answ.0
      questionId: '6ab17499-9316-49cf-9d70-20827aa20fe3'
    }], [{
      answers: [3],
      questionId: 'cf82e9de-7140-40d2-b59f-8b43e0dec209'
    }, {
      answers: [1],
      questionId: '43c8f71b-4613-4b77-bd99-90cdfacb7f00'
    }, {
      answers: [''],
      questionId: 'c0ad0634-af48-4903-98c7-01322d323643'
    }, {
      answers: [8],
      questionId: '6ab17499-9316-49cf-9d70-20827aa20fe3'
    }], [{
      answers: [3],
      questionId: 'cf82e9de-7140-40d2-b59f-8b43e0dec209'
    }, {
      answers: [0],
      questionId: '43c8f71b-4613-4b77-bd99-90cdfacb7f00'
    }, {
      answers: [0],
      questionId: 'c0ad0634-af48-4903-98c7-01322d323643'
    }, {
      answers: [''],
      questionId: '6ab17499-9316-49cf-9d70-20827aa20fe3'
    }]];

    for (const feedbacks of testFeedbacksSets) {
      const nextPageIndex = (0, _.nextPage)(1, feedbacks, surveyWithRules);
      expect(nextPageIndex).toBe(2);
    }
  });
});
describe('rule set for page answered and not answered, ', () => {
  test('answered question', () => {
    const testPageIndex = 0;
    const feedbacks = [{
      answers: [4],
      questionId: 'cf82e9de-7140-40d2-b59f-8b43e0dec209'
    }, {
      answers: [2],
      questionId: '86e3cd04-f81e-4254-a59a-a61641eb9c26'
    }, {
      answers: [0],
      questionId: '64cbf808-95d0-470f-8748-0b9111cdbca5'
    }];
    const nextPageIndex = (0, _.nextPage)(testPageIndex, feedbacks, surveyWithRules);
    expect(nextPageIndex).toBe(2);
  });
  test('not answered question', () => {
    const testPageIndex = 0;
    const feedbacks = [{
      answers: [2],
      questionId: 'cf82e9de-7140-40d2-b59f-8b43e0dec209'
    }];
    const nextPageIndex = (0, _.nextPage)(testPageIndex, feedbacks, surveyWithRules);
    expect(nextPageIndex).toBe(-1);
  });
  test('DK-1173, not answered question has no answer', () => {
    const testPageIndex = 0;
    const feedbacks = [{
      answers: [''],
      questionId: '43c8f71b-4613-4b77-bd99-90cdfacb7f00'
    }, {
      answers: [0, 1, 2],
      questionId: 'c0ad0634-af48-4903-98c7-01322d323643'
    }, {
      answers: [0],
      questionId: '6ab17499-9316-49cf-9d70-20827aa20fe3'
    }];
    const nextPageIndex = (0, _.nextPage)(testPageIndex, feedbacks, surveyWithRules);
    expect(nextPageIndex).toBe(1);
  });
});
describe('original paging behavior when no rules', () => {
  test('survey without rules', () => {
    const surveyWithoutRules = {
      pageOrder: ['e528ea34-163b-46a4-a915-92812620171f', 'a5df0202-4e12-48e2-95a3-d0374ba3e65f', '2958a4e7-87d9-4205-9f66-be2e4f72cde8', '206b6407-b17b-49f0-9cb9-911747f768f2'],
      pages: [{
        pageId: 'e528ea34-163b-46a4-a915-92812620171f',
        pageTitle: 'Mandatory Questions',
        questions: [{
          mandatory: true,
          options: ['Strongly Disagree', 'Strongly Agree'],
          questionId: '39562a2b-c58e-4dd0-8302-4db112b1e7a3',
          questionTitle: 'Rating in p1',
          scale: '10',
          subType: 'slider',
          type: 'rating'
        }, {
          mandatory: true,
          questionId: '22fdc074-b64d-475a-bf5d-c496ec24947a',
          questionTitle: 'Open in p1',
          scale: '0',
          type: 'open'
        }, {
          mandatory: true,
          options: ['A', 'B', 'C', 'D', 'E'],
          questionId: '83e7102d-8213-4b71-b388-53490fa8f89b',
          questionTitle: 'Multi in p1',
          scale: '0',
          type: 'multiChoice'
        }]
      }, {
        pageId: 'a5df0202-4e12-48e2-95a3-d0374ba3e65f',
        pageTitle: '2nd Page',
        questions: [{
          mandatory: true,
          options: ['Not at all Likely', 'Extremely Likely'],
          questionId: 'a5656ff0-d4f9-435c-8030-cd0a21a121b5',
          questionTitle: 'On a scale of 0-10, how likely are you to recommend NPS to a friend or colleague?',
          scale: '11',
          subType: 'slider',
          type: 'nps'
        }, {
          mandatory: true,
          options: ['A', 'B', 'C', 'D', 'E'],
          questionId: '22fd40df-3363-493a-aaa8-169102afbe2a',
          questionTitle: 'Single in p2',
          scale: '0',
          type: 'singleChoice'
        }, {
          mandatory: true,
          questionId: '410bc87a-a51b-4d07-9192-185df88d492c',
          questionTitle: 'open in p2',
          scale: '0',
          type: 'open'
        }]
      }, {
        pageId: '2958a4e7-87d9-4205-9f66-be2e4f72cde8',
        pageTitle: '3rd Page',
        questions: [{
          mandatory: true,
          options: ['Z', 'Y', 'X', 'W', 'V'],
          questionId: '6c80b5ed-7ebc-43cb-bbde-0276a52ba511',
          questionTitle: 'Multi in p3',
          scale: '0',
          type: 'multiChoice'
        }, {
          mandatory: true,
          options: ['Poor', 'Fair', 'Good', 'Excellent'],
          questionId: '5c799726-4831-419b-9f0c-3d8d9741393c',
          questionTitle: 'Smiley in p3',
          scale: '4',
          subType: 'smiley',
          type: 'rating'
        }]
      }, {
        pageId: '206b6407-b17b-49f0-9cb9-911747f768f2',
        pageTitle: '4th Page',
        questions: [{
          mandatory: true,
          options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
          questionId: 'b3f64dce-ce10-4776-b237-a92becfcba38',
          questionTitle: 'Smiley in p4',
          scale: '5',
          subType: 'smiley',
          type: 'rating'
        }]
      }],
      rules: {}
    };
    expect((0, _.nextPage)(0, [], surveyWithoutRules)).toBe(1);
    expect((0, _.nextPage)(1, [], surveyWithoutRules)).toBe(2);
    expect((0, _.nextPage)(3, [], surveyWithoutRules)).toBe(-1);
  });
  test('page has no rules defined', () => {
    expect((0, _.nextPage)(2, [], surveyWithRules)).toBe(3);
    expect((0, _.nextPage)(3, [], surveyWithRules)).toBe(-1);
  });
});
const mockSkipLogicList = [{
  conditionArr: ['626fa5f1-750a-43db-b165-af5b55cad927', 'gt', '9'],
  filteredFeedback: [{
    questionId: '626fa5f1-750a-43db-b165-af5b55cad927',
    textOrIndexArr: ['9'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['0085564d-652e-4fb5-9314-20aeab36b30b', 'answ', '1,2'],
  filteredFeedback: [{
    questionId: '0085564d-652e-4fb5-9314-20aeab36b30b',
    textOrIndexArr: ['1'],
    type: 'rating'
  }]
}, {
  conditionArr: ['0903cf61-e77c-413c-8785-581d2f902ab9', '2', 'gt', '4'],
  filteredFeedback: [{
    questionId: '0903cf61-e77c-413c-8785-581d2f902ab9',
    textOrIndexArr: ['0', '0', '4', '0', '0', '0'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['0903cf61-e77c-413c-8785-581d2f902ab9', '4', 'gteq', '5'],
  filteredFeedback: [{
    questionId: '0903cf61-e77c-413c-8785-581d2f902ab9',
    textOrIndexArr: ['0', '0', '0', '0', '5', '0'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['6b1720da-3c06-4306-ad75-011b8285f0f8', 'gt', '8'],
  filteredFeedback: [{
    questionId: '6b1720da-3c06-4306-ad75-011b8285f0f8',
    textOrIndexArr: ['9'],
    type: 'nps'
  }]
}, {
  conditionArr: ['1fe272da-c71d-47c0-8bab-7b21c03db405', 'nasw', '1,3'],
  filteredFeedback: [{
    questionId: '1fe272da-c71d-47c0-8bab-7b21c03db405',
    // if user wasn't answer
    textOrIndexArr: [''],
    type: 'rating'
  }]
}, {
  conditionArr: ['285d8a32-0422-430b-8178-b24f1932da22', 'gteq', '4'],
  filteredFeedback: [{
    questionId: '285d8a32-0422-430b-8178-b24f1932da22',
    textOrIndexArr: ['3'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['87cf8d58-6948-448f-aa11-ccdfe1585487', 'lt', '26'],
  filteredFeedback: [{
    questionId: '87cf8d58-6948-448f-aa11-ccdfe1585487',
    textOrIndexArr: ['24'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['48218a84-1fbe-413e-af15-502669199623', 'ansr'],
  filteredFeedback: [{
    questionId: '48218a84-1fbe-413e-af15-502669199623',
    textOrIndexArr: ['0'],
    type: 'rating'
  }]
}, {
  conditionArr: ['faa339f1-dbcc-4891-80a5-6d723b21cdeb', '0', 'lt', '5'],
  filteredFeedback: [{
    questionId: 'faa339f1-dbcc-4891-80a5-6d723b21cdeb',
    textOrIndexArr: ['3', '-1', '-1', '-1'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['faa339f1-dbcc-4891-80a5-6d723b21cdeb', '2', 'lteq', '6'],
  filteredFeedback: [{
    questionId: 'faa339f1-dbcc-4891-80a5-6d723b21cdeb',
    textOrIndexArr: ['-1', '-1', '5', '-1'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['48a6530e-c526-44c7-96af-08aa3a04aa41', 'lteq', '34'],
  filteredFeedback: [{
    questionId: '48a6530e-c526-44c7-96af-08aa3a04aa41',
    textOrIndexArr: ['33'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['e0b46de9-d824-40b8-bc0d-96e95849d896', 'eq', '15'],
  filteredFeedback: [{
    questionId: 'e0b46de9-d824-40b8-bc0d-96e95849d896',
    textOrIndexArr: ['14'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['073b6e12-7e59-4523-91fb-82b85a4b1051', 'ansr'],
  filteredFeedback: [{
    questionId: '073b6e12-7e59-4523-91fb-82b85a4b1051',
    textOrIndexArr: ['1'],
    type: 'rating'
  }]
}, {
  conditionArr: ['4f643963-e6fe-4111-aaf9-5008ce9af3a2', '0', 'eq', '3'],
  filteredFeedback: [{
    questionId: '4f643963-e6fe-4111-aaf9-5008ce9af3a2',
    textOrIndexArr: ['2', '-1', '-1', '-1', '-1'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['4f643963-e6fe-4111-aaf9-5008ce9af3a2', '2', 'btwn', '2-5'],
  filteredFeedback: [{
    questionId: '4f643963-e6fe-4111-aaf9-5008ce9af3a2',
    textOrIndexArr: ['1', '2', '2', '-1', '1'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['8ce47319-7ea2-423b-b322-cac316384314', 'mtch', 'logic test'],
  filteredFeedback: [{
    questionId: '8ce47319-7ea2-423b-b322-cac316384314',
    textOrIndexArr: ['logic test']
  }]
}, {
  conditionArr: ['87700a1c-ff7a-43da-9c0a-fca87864a3e5', '1', 'answ', '2,3'],
  filteredFeedback: [{
    questionId: '87700a1c-ff7a-43da-9c0a-fca87864a3e5',
    textOrIndexArr: ['0', '1', '2', '3'],
    type: 'ranking'
  }]
}, {
  conditionArr: ['c6fa4d3c-d48e-4927-89fc-33b484643d93', 'gteq', '2'],
  filteredFeedback: [{
    questionId: 'c6fa4d3c-d48e-4927-89fc-33b484643d93',
    textOrIndexArr: ['2'],
    type: 'rating'
  }]
}, {
  conditionArr: ['69e6aab5-6433-4a8f-a6d8-5c79d7e0d7df', 'btwn', '3-8'],
  filteredFeedback: [{
    questionId: '69e6aab5-6433-4a8f-a6d8-5c79d7e0d7df',
    textOrIndexArr: ['3'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['ea7072a9-a7fb-4957-8912-5908ff664c69', '0', 'ansr', ''],
  filteredFeedback: [{
    questionId: 'ea7072a9-a7fb-4957-8912-5908ff664c69',
    textOrIndexArr: ['0', '-1', '-1', '1'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['ea7072a9-a7fb-4957-8912-5908ff664c69', '2', 'nasr', ''],
  filteredFeedback: [{
    questionId: 'ea7072a9-a7fb-4957-8912-5908ff664c69',
    textOrIndexArr: ['0', '-1', '-1', '1'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['ea7072a9-a7fb-4957-8912-5908ff664c69', '3', 'nasw', ''],
  filteredFeedback: [{
    questionId: 'ea7072a9-a7fb-4957-8912-5908ff664c69',
    textOrIndexArr: ['0', '-1', '-1', '1'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['f6e8ff39-46aa-4791-ad36-15b3581c1ab1', 'ansr'],
  filteredFeedback: [{
    questionId: 'f6e8ff39-46aa-4791-ad36-15b3581c1ab1',
    textOrIndexArr: ['0'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['2f26be08-89b0-4319-95a0-f3548a6634f1', 'nasr'],
  filteredFeedback: [{
    questionId: '2f26be08-89b0-4319-95a0-f3548a6634f1',
    textOrIndexArr: ['']
  }]
}, {
  conditionArr: ['f5b50ebe-46c4-44ea-a07d-d237800b45dd', 'nasw', '5'],
  filteredFeedback: [{
    questionId: 'f5b50ebe-46c4-44ea-a07d-d237800b45dd',
    textOrIndexArr: ['3'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['382b3998-25c5-4d02-bc3b-8d5153efa7fe', 'answ', '1,-2'],
  filteredFeedback: [{
    questionId: '382b3998-25c5-4d02-bc3b-8d5153efa7fe',
    textOrIndexArr: ['1'],
    type: 'singleChoice'
  }]
}, {
  conditionArr: ['0c719149-6a8b-48af-8187-32a53ca61dd4', 'answ', '1,-2'],
  filteredFeedback: [{
    questionId: '0c719149-6a8b-48af-8187-32a53ca61dd4',
    textOrIndexArr: ['1001'],
    otherFlag: true,
    type: 'dropdown'
  }]
}, {
  conditionArr: ['bf7c978c-7acf-4596-b6aa-29b6fda7e72c', 'gt', '9'],
  filteredFeedback: [{
    questionId: 'bf7c978c-7acf-4596-b6aa-29b6fda7e72c',
    textOrIndexArr: ['28'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['3d387096-af80-4d71-ae3c-3f1489361713', 'answ', '1,2'],
  filteredFeedback: [{
    questionId: '3d387096-af80-4d71-ae3c-3f1489361713',
    textOrIndexArr: ['1'],
    type: 'rating'
  }]
}, {
  conditionArr: ['af0d014f-9c10-4766-b22f-831dc8ea8a05', 'lt', '40'],
  filteredFeedback: [{
    questionId: 'af0d014f-9c10-4766-b22f-831dc8ea8a05',
    textOrIndexArr: ['0'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['99541df1-08e7-4806-9807-4e7998f99acf', 'nasw', '3'],
  filteredFeedback: [{
    questionId: '99541df1-08e7-4806-9807-4e7998f99acf',
    textOrIndexArr: ['0'],
    type: 'nps'
  }]
}, {
  conditionArr: ['0921ae06-b562-40c6-a3b8-934974310749', 'answ', '1,-2'],
  filteredFeedback: [{
    questionId: '0921ae06-b562-40c6-a3b8-934974310749',
    textOrIndexArr: ['Others'],
    otherFlag: true,
    type: 'singleChoice'
  }]
}, {
  conditionArr: ['1ce1c62f-6190-4e2d-aed9-7633a288421b', '0', 'gteq', '3'],
  filteredFeedback: [{
    questionId: '1ce1c62f-6190-4e2d-aed9-7633a288421b',
    textOrIndexArr: ['2', '4', '0', '0', '0', '2'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['1ce1c62f-6190-4e2d-aed9-7633a288421b', '1', 'gt', '4'],
  filteredFeedback: [{
    questionId: '1ce1c62f-6190-4e2d-aed9-7633a288421b',
    textOrIndexArr: ['2', '4', '0', '0', '0', '2'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['1ce1c62f-6190-4e2d-aed9-7633a288421b', '5', 'lt', '4'],
  filteredFeedback: [{
    questionId: '1ce1c62f-6190-4e2d-aed9-7633a288421b',
    textOrIndexArr: ['2', '4', '0', '0', '0', '2'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['e3d60432-55ed-4fec-93b3-2d31c9c98b75', 'nasr'],
  filteredFeedback: [{
    questionId: 'e3d60432-55ed-4fec-93b3-2d31c9c98b75',
    textOrIndexArr: ['']
  }]
}, {
  conditionArr: ['38d58149-241f-4058-8793-7030479ab9d1', 'gteq', '2'],
  filteredFeedback: [{
    questionId: '38d58149-241f-4058-8793-7030479ab9d1',
    textOrIndexArr: ['2'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['32d16a65-cbf5-4289-8013-9acfd0910091', 'lteq', '70'],
  filteredFeedback: [{
    questionId: '32d16a65-cbf5-4289-8013-9acfd0910091',
    textOrIndexArr: ['59'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['56d70b21-2452-4e30-a6ed-926b148d34ed', 'nasw', '0'],
  filteredFeedback: [{
    questionId: '56d70b21-2452-4e30-a6ed-926b148d34ed',
    textOrIndexArr: ['1'],
    type: 'rating'
  }]
}, {
  conditionArr: ['7c81b337-aa9c-4699-8ebc-93ce12837808', '0', 'lteq', '4'],
  filteredFeedback: [{
    questionId: '7c81b337-aa9c-4699-8ebc-93ce12837808',
    textOrIndexArr: ['3', '0', '4', '0'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['7c81b337-aa9c-4699-8ebc-93ce12837808', '2', 'eq', '5'],
  filteredFeedback: [{
    questionId: '7c81b337-aa9c-4699-8ebc-93ce12837808',
    textOrIndexArr: ['3', '0', '4', '0'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['3adb396c-16b8-44ec-b0b3-f260bab36670', 'nmtch', 'logic and'],
  filteredFeedback: [{
    questionId: '3adb396c-16b8-44ec-b0b3-f260bab36670',
    textOrIndexArr: ['do not contain condition'],
    type: 'open'
  }]
}, {
  conditionArr: ['56c5ebfb-c98b-4688-ad5b-a8054a4fb5c0', 'eq', '35'],
  filteredFeedback: [{
    questionId: '56c5ebfb-c98b-4688-ad5b-a8054a4fb5c0',
    textOrIndexArr: ['34'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['cc46b959-af02-407d-94f4-5c4988a0bc60', 'ansr'],
  filteredFeedback: [{
    questionId: 'cc46b959-af02-407d-94f4-5c4988a0bc60',
    textOrIndexArr: ['0'],
    type: 'rating'
  }]
}, {
  conditionArr: ['0f71e253-e6e9-4de5-a700-57ecbbbbd306', 'btwn', '15-27'],
  filteredFeedback: [{
    questionId: '0f71e253-e6e9-4de5-a700-57ecbbbbd306',
    textOrIndexArr: ['16'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['f336f1cc-0dd1-466f-a184-7a8129aab028', '0', 'btwn', '2-5'],
  filteredFeedback: [{
    questionId: 'f336f1cc-0dd1-466f-a184-7a8129aab028',
    textOrIndexArr: ['2', '0', '0', '0', '0'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['f336f1cc-0dd1-466f-a184-7a8129aab028', '2', 'nasw', '3'],
  filteredFeedback: [{
    questionId: 'f336f1cc-0dd1-466f-a184-7a8129aab028',
    textOrIndexArr: ['1', '0', '0', '0', '0'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['0b54121a-1d5d-4a5e-b7a0-b71a459d1be5', 'mtch', 'contains text'],
  filteredFeedback: [{
    questionId: '0b54121a-1d5d-4a5e-b7a0-b71a459d1be5',
    textOrIndexArr: ['contains text'],
    type: 'open'
  }]
}, {
  conditionArr: ['dd6037cb-4668-4875-8e7f-cb18b49d76fc', 'answ', '1,-2'],
  filteredFeedback: [{
    questionId: 'dd6037cb-4668-4875-8e7f-cb18b49d76fc',
    textOrIndexArr: ['123'],
    otherFlag: true,
    type: 'dropdown'
  }]
}, {
  conditionArr: ['57a127d0-ecd5-4aa9-8e9c-f07155e9955c', '0', 'nasw', '2'],
  filteredFeedback: [{
    questionId: '57a127d0-ecd5-4aa9-8e9c-f07155e9955c',
    textOrIndexArr: ['0', '0', '0', '0'],
    type: 'matrixRating'
  }]
}, {
  conditionArr: ['431ce05c-ca0e-4e29-a83a-66ca8f248a0b', 'nasr'],
  filteredFeedback: [{
    questionId: '431ce05c-ca0e-4e29-a83a-66ca8f248a0b',
    textOrIndexArr: ['']
  }]
}, {
  conditionArr: ['de97384d-df0f-4091-aec9-ed07d67cbe7c', 'nasw', '30'],
  filteredFeedback: [{
    questionId: 'de97384d-df0f-4091-aec9-ed07d67cbe7c',
    textOrIndexArr: ['28'],
    type: 'ratingSlider'
  }]
}, {
  conditionArr: ['867daa2a-c195-455b-8016-956736df99ba', 'nasw', '1,2'],
  filteredFeedback: [{
    questionId: '867daa2a-c195-455b-8016-956736df99ba',
    textOrIndexArr: ['0', '3', '4'],
    otherFlag: false,
    type: 'multiChoice'
  }]
}, {
  conditionArr: ['a27e897b-6b92-4a22-a632-db3c09c23c6b', 'answ', '1,2'],
  filteredFeedback: [{
    otherFlag: true,
    questionId: 'a27e897b-6b92-4a22-a632-db3c09c23c6b',
    textOrIndexArr: ['1', '2', 'pink'],
    type: 'multiChoice'
  }]
}, {
  conditionArr: ['a27e897b-6b92-4a22-a632-db3c09c23c6b', 'answ', '1,2,-2'],
  filteredFeedback: [{
    otherFlag: true,
    questionId: 'a27e897b-6b92-4a22-a632-db3c09c23c6b',
    textOrIndexArr: ['3', '4', 'red'],
    type: 'multiChoice'
  }]
}, {
  conditionArr: ['c7ffdd24-b6be-44d2-b266-5e98972f4115', '1', 'btwn', '1-4'],
  filteredFeedback: [{
    questionId: 'c7ffdd24-b6be-44d2-b266-5e98972f4115',
    textOrIndexArr: ['3', '1', '2', '1', '4'],
    type: 'ranking'
  }]
}, {
  conditionArr: ['ec945dad-78d5-4894-a0f6-e749fb7536b0', 'mtch', 'OP1'],
  filteredFeedback: [{
    questionId: 'ec945dad-78d5-4894-a0f6-e749fb7536b0',
    textOrIndexArr: ['OP1'],
    type: 'open'
  }]
}, {
  conditionArr: ['5e3480b2-6e4b-475c-a916-1f0bab87033b', '5', 'mtch', 'amazon.com'],
  filteredFeedback: [{
    questionId: '5e3480b2-6e4b-475c-a916-1f0bab87033b',
    textOrIndexArr: ['', '', '', '', '', 'amazon.com', ''],
    type: 'multipleOpenEnded'
  }]
}, {
  conditionArr: ['918e61b4-4512-4246-8446-4bc2f4fdfffa', '0', 'nmtch', 'respond promptly'],
  filteredFeedback: [{
    questionId: '918e61b4-4512-4246-8446-4bc2f4fdfffa',
    textOrIndexArr: ['no match', '', ''],
    type: 'multipleOpenEnded'
  }]
}, {
  conditionArr: ['918e61b4-4512-4246-8446-4bc2f4fdfffa', '1', 'ansr', ''],
  filteredFeedback: [{
    questionId: '918e61b4-4512-4246-8446-4bc2f4fdfffa',
    textOrIndexArr: ['', 'answer', ''],
    type: 'multipleOpenEnded'
  }]
}, {
  conditionArr: ['42d3c77f-621d-47ae-acd2-901c382427e3', '1', 'nasr', ''],
  filteredFeedback: [{
    questionId: '42d3c77f-621d-47ae-acd2-901c382427e3',
    textOrIndexArr: ['answer', '', 'answer'],
    type: 'multipleOpenEnded'
  }]
}, {
  conditionArr: ['b583b6bd-fba0-498c-bbd4-d984d686139f', '1', 'answ', '1,3'],
  filteredFeedback: [{
    questionId: 'b583b6bd-fba0-498c-bbd4-d984d686139f',
    textOrIndexArr: ['7', '1,3', '7', '7', '7', '7'],
    type: 'matrixChoice'
  }]
}, {
  conditionArr: ['4cda4dd8-f1f4-4bb2-adfa-efe94e4a7894', '1', 'nasw', '1,2'],
  filteredFeedback: [{
    questionId: '4cda4dd8-f1f4-4bb2-adfa-efe94e4a7894',
    textOrIndexArr: ['-1', '3', '-1', '-1', '-1', '-1'],
    type: 'matrixChoice'
  }]
}, {
  conditionArr: ['4cda4dd8-f1f4-4bb2-adfa-efe94e4a7894', '1', 'ansr', ''],
  filteredFeedback: [{
    questionId: '4cda4dd8-f1f4-4bb2-adfa-efe94e4a7894',
    textOrIndexArr: ['-1', '0', '-1'],
    type: 'matrixChoice'
  }]
}, {
  conditionArr: ['4cda4dd8-f1f4-4bb2-adfa-efe94e4a7894', '1', 'nasr', ''],
  filteredFeedback: [{
    questionId: '4cda4dd8-f1f4-4bb2-adfa-efe94e4a7894',
    textOrIndexArr: ['-1', '-1', '-1'],
    type: 'matrixChoice'
  }]
}];
describe('evaluateCondition skiplogic', () => {
  mockSkipLogicList.forEach((item, index) => {
    const {
      conditionArr,
      filteredFeedback
    } = item;
    const skipLogicType = conditionArr[conditionArr.length === 4 ? 2 : 1];
    test(`[${index + 1}], ${filteredFeedback[0].questionId}, ${skipLogicType}, ${filteredFeedback[0].type}`, () => {
      expect((0, _index.evaluateCondition)(conditionArr, filteredFeedback[0].questionId, filteredFeedback[0].type, filteredFeedback[0])).toBe(true);
    });
  });
});
//# sourceMappingURL=SkipLogic.test.js.map