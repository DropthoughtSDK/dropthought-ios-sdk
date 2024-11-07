"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePollingRecord = usePollingRecord;
var _jotai = require("jotai");
const pollingRecordAtom = (0, _jotai.atom)({});
function usePollingRecord() {
  const [pollingRecord, setPollingRecord] = (0, _jotai.useAtom)(pollingRecordAtom);
  const resetRecord = () => {
    setPollingRecord({});
  };
  return {
    pollingRecord,
    setPollingRecord,
    resetRecord
  };
}
//# sourceMappingURL=usePollingRecord.js.map