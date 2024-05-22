import React, { useState } from 'react';
import styled from 'styled-components';

const Checkbox: React.FC<{ label: string; onChange?: (checked: boolean) => void }> = ({ label, onChange }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onChange?.(isChecked);
    };

    return (
        <label>
            <CheckboxWrapper>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            </CheckboxWrapper>
            {label}
        </label>
    );
};

const CheckboxWrapper = styled.div`
border: 3px solid var(--color--blue-3);
border-radius: 6px;
display: inline-flex;
margin-right: 8px;
cursor: pointer;

input[type="checkbox"] {
    margin: 0;
    cursor: pointer;
}
`

export default Checkbox;