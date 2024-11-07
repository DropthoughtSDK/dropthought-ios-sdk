"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurveyPageProvider = SurveyPageProvider;
exports.useSurveyPageContext = exports.useAddMandatoryRef = void 0;
var React = _interopRequireWildcard(require("react"));
var _ramda = require("ramda");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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