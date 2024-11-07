import React from 'react';
import type { Feedback } from '../data';
import type { PollingOption } from '../hooks/usePolling';
type Props = {
    disabled: boolean;
    option?: PollingOption;
    selected: boolean;
    percentage?: number;
    placeholder?: string;
    onPoll: (option: PollingOption) => void;
    feedback?: Feedback;
};
declare const PollingItem: ({ disabled, option, selected, percentage, placeholder, onPoll, feedback, }: Props) => React.JSX.Element;
export default PollingItem;
//# sourceMappingURL=PollingItem.d.ts.map