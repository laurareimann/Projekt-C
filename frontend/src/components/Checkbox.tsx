import React, { useState } from 'react';
import styled from 'styled-components';

type CheckboxProps = {
    label: string;
    checked: boolean;
    onChange?: (checked: boolean) => void;
};

function Checkbox({ label, checked, onChange }: CheckboxProps) {
    const handleCheckboxChange = () => {
        const newChecked = !checked;
        onChange?.(newChecked);
    };

    return (
        <label>
            <CheckboxWrapper onClick={handleCheckboxChange}>
                <input type="checkbox" checked={checked} readOnly />
            </CheckboxWrapper>
            {label}
        </label>
    );
}

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
`;

export default Checkbox;
