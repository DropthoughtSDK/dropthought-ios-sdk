import { atom, useAtom } from 'jotai';
const pollingRecordAtom = atom({});
export function usePollingRecord() {
  const [pollingRecord, setPollingRecord] = useAtom(pollingRecordAtom);
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