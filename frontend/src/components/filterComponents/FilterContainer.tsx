import { useState } from 'react';
import styled from 'styled-components';
import Container from '../Container';
import Button from '../buttons/Buttons';
import LabelButton from '../buttons/LabelButton';
import TileButton from '../buttons/TileButton';

function FilterContainer({ color = "blue", outline = true, children }: { color?: string; outline?: boolean; children?: React.ReactNode }) {
    const [selectedFilters, setSelectedFilters] = useState({
        transportMethod: '',
        preferences: {
            health: [],
            social: [],
            sports: [],
            culture: []
        }
    });

    const handleTileButtonClick = (key: string, value: string) => {
        setSelectedFilters({ ...selectedFilters, [key]: value });
        console.log("Selected Filters:", selectedFilters);
    };

    const handleLabelButtonClick = (key: string, value: string) => {
        setSelectedFilters({ ...selectedFilters, [key]: value });
        console.log("Selected Filters:", selectedFilters);
    };

    const resetFilters = () => {
        setSelectedFilters({
            transportMethod: '',
            preferences: {
                health: [],
                social: [],
                sports: [],
                culture: []
            }
        });
        console.log("Selected Filters:", selectedFilters);
    };

    return (
        <Container color={color} outline={outline}>
            {children}
            <FilterWrapper>
                <h2>Filter</h2>
                <QuestionWrapper>
                    <p>What is your preferred method of transport?</p>
                    <TileGrid>
                        {[
                            { text: 'Walking', icon: 'walking' },
                            { text: 'Bike', icon: 'bike' },
                            { text: 'Scooter', icon: 'scooter' },
                            { text: 'Public Transport', icon: 'tram' },
                            { text: 'Car', icon: 'bus' }
                        ].map(({ text, icon }) => (
                            <TileButton key={text} icon={icon.toLowerCase()} text={text} onClick={() => handleTileButtonClick('transportMethod', text)}></TileButton>
                        ))}
                    </TileGrid>
                </QuestionWrapper>
                <h3 style={{ "marginBottom": 0 }}>Preferences</h3>
                {[
                    { title: 'Health & Wellness', items: ['Hair Dresser', 'Nail Salon', 'Cosmetic Studio', 'Massage', 'Therme', 'Sauna', 'Solarium', 'Hospital'], key: 'healthWellness' },
                    { title: 'Social', items: ['Restaurants', 'Cafes', 'Bars', 'Clubs'], key: 'social' },
                    { title: 'Sports & Activities', items: ['Hiking', 'Cycling', 'Aquatics', 'Gymnastics', 'Tennis', 'Soccer', 'Basketball', 'Skating', 'Indoor Sports'], key: 'sportsActivities' },
                    { title: 'Culture', items: ['Theatres', 'Museums', 'Libraries', 'Book stores', 'Galleries'], key: 'culture' }
                ].map(({ title, items, key }) => (
                    <QuestionWrapper key={title}>
                        <p>{title}</p>
                        <LabelGrid>
                            {items.map(item => (
                                <LabelButton key={item} color='blue' onClick={() => handleLabelButtonClick(key, item)}>{item}</LabelButton>
                            ))}
                        </LabelGrid>
                    </QuestionWrapper>
                ))}
                <ResetWrapper>
                    <Button onClick={resetFilters}>Reset All</Button>
                </ResetWrapper>
            </FilterWrapper>
        </Container>
    );
}

const FilterWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 16px;
`

const QuestionWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
width: -webkit-fill-available;
gap: 8px;
padding-bottom: 16px;
border-bottom: 1px solid var(--color--blue-5);
`

const TileGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 8px;
`

const LabelGrid = styled.div`
    max-width: 380px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
`

const ResetWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`

export default FilterContainer;