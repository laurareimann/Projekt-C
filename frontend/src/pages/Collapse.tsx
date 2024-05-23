import React from 'react';
import DropDownLanguage from '../components/languageDropdownButton';

const TestSite: React.FC = () => {
    return (
        <div>
            <h1>Collapse Test</h1>
            <DropDownLanguage options={["Deitsch", "Englis"]}></DropDownLanguage>
        </div>
    );
};

export default TestSite;