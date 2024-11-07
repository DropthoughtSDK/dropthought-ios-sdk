import { atom, useAtom } from 'jotai';

const pollingRecordAtom = atom<{
  [questionId: string]: { [choice: string]: number };
}>({});

export function usePollingRecord() {
  const [pollingRecord, setPollingRecord] = useAtom(pollingRecordAtom);

  const resetRecord = () => {
    setPollingRecord({});
  };

  return {
    pollingRecord,
    setPollingRecord,
    resetRecord,
  };
}
