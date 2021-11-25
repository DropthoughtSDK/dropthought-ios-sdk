"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurveyPageProvider = SurveyPageProvider;
exports.useSurveyPageContext = exports.useAddMandatoryRef = void 0;

var React = _interopRequireWildcard(require("react"));

var _ramda = require("ramda");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @description
 * this context keep the mandatory question title ref of a single survey page
 * they are saved in the mandatoryQuestionTitleRefs, as map:
 * {
 *     'question-id-1': ref1,
 *     'question-id-3': ref3,
 * }
 */
const initialValue = {
  mandatoryQuestionTitleRefs: {},
  addMandatoryQuestionTitleRef: () => undefined
};
const SurveyPageContext = /*#__PURE__*/React.createContext(initialValue);

function SurveyPageProvider({
  children
}) {
  const [mandatoryQuestionTitleRefs, setRefs] = React.useState({});
  const addMandatoryQuestionTitleRef = React.useCallback((questionId, ref) => {
    // update the refs map by setting the questionId to ref
    setRefs((0, _ramda.assoc)(questionId, ref));
  }, []);
  /** @type {SurveyPageContextValue} */

  const state = React.useMemo(() => ({
    mandatoryQuestionTitleRefs,
    addMandatoryQuestionTitleRef
  }), [mandatoryQuestionTitleRefs, addMandatoryQuestionTitleRef]);
  return /*#__PURE__*/React.createElement(SurveyPageContext.Provider, {
    value: state
  }, children);
}

const useSurveyPageContext = () => {
  return React.useContext(SurveyPageContext);
};

exports.useSurveyPageContext = useSurveyPageContext;

const useAddMandatoryRef = () => {
  const {
    addMandatoryQuestionTitleRef
  } = useSurveyPageContext();
  return addMandatoryQuestionTitleRef;
};

exports.useAddMandatoryRef = useAddMandatoryRef;
//# sourceMappingURL=SurveyPageContext.js.map