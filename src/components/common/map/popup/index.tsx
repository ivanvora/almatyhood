import React from 'react';
import ReactDOM from 'react-dom';

import { TargetPopup } from '../../target-popup';

export type TProps = {
    number?: string;
    year?: string;
    street?: string;
    district?: string;
    type?: string;
    fid?: number;
};

export default function Popup(props: TProps) {
    const root = document.querySelectorAll('#building_popup');

    if (root.length > 0) {
        return ReactDOM.createPortal(<TargetPopup {...props} />, root[root.length - 1]);
    }

    return <div id='aaa' />;
}
