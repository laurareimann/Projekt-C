import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../buttons/Buttons';
import FilterContainer from './FilterContainer';

const FilterOverlay = () => {
    const [isFilterVisible, setFilterVisible] = useState(false);

    const toggleFilter = () => {
        setFilterVisible((prev) => !prev);
    };

    const handleClose = () => {
        setFilterVisible(false);
    };


    return (
        <>
            <Button onClick={toggleFilter}>Filter</Button>
            {isFilterVisible && (
                <Overlay>
                    <StyledFilterContainer
                        color="blue"
                        outline={true}
                        onClose={handleClose}>
                        <CloseButton onClick={toggleFilter}>&times;</CloseButton>
                    </StyledFilterContainer>
                </Overlay>
            )}
        </>
    );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StyledFilterContainer = styled(FilterContainer)`
  position: relative; 
`;

const CloseButton = styled.button`
  position: absolute; 
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px; 
  color: black;
  cursor: pointer;
  &:hover {
    color: red; 
  }
`;

export default FilterOverlay;
