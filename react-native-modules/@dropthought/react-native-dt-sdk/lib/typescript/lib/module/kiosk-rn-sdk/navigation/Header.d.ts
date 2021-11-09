export default Header;
export type Props = {
    title: string;
    themeColor: string;
    onClose?: (() => void) | undefined;
};
/**
 * @typedef {object} Props
 * @property {string} title
 * @property {string} themeColor
 * @property {()=>void=} onClose
 */
/**
 * @type {React.FunctionComponent<Props>}
 * @param {Props} props
 */
declare const Header: React.FunctionComponent<Props>;
import * as React from "react";
