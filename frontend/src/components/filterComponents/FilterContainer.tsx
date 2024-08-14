import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import Checkbox from '../Checkbox';
import Container from '../Container';
import Input from '../Inputforms';
import Button from '../buttons/Buttons';
import LabelButton from '../buttons/LabelButton';
import TileButton from '../buttons/TileButton';
import Dropdown from '../Dropdown';

function FilterContainer({ color = "blue", outline = true, children }: { color?: string; outline?: boolean; children?: React.ReactNode }) {
    const [selectedFilters, setSelectedFilters] = useState({
        age: null,
        ageGroups: [],
        hasPet: false,
        relationshipStatus: '',
        occupation: '',
        transportMethod: '',
        preferences: {
            health: [],
            social: [],
            sports: [],
            culture: []
        }
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const age = inputValue === '' ? null : Number(inputValue);
        setSelectedFilters(prevState => ({ ...prevState, age: age }) as typeof prevState);
        console.log("Selected Filters:", selectedFilters);
    };

    const handleCheckboxChange = () => {
        setSelectedFilters({ ...selectedFilters, hasPet: !selectedFilters.hasPet });
        console.log("Selected Filters:", selectedFilters);
    };

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
            age: null,
            ageGroups: [],
            hasPet: false,
            relationshipStatus: '',
            occupation: '',
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
                    <p>How old are you?</p>
                    <Input type="number" placeholder='Age' size='small' min={0} max={120}></Input>
                    <Input type="number" placeholder='Age' size='small' min={0} max={120} value={selectedFilters.age ?? undefined} onChange={handleInputChange}></Input>                </QuestionWrapper>
                <QuestionWrapper>
                    <p>Include any other age groups:</p>
                    <TileGrid>
                        {[
                            { text: 'baby', range: '0-3' },
                            { text: 'children', range: '4-10' },
                            { text: 'teenager', range: '11-17' },
                            { text: 'young adult', range: '18-35' },
                            { text: 'middle age', range: '36-70' },
                            { text: 'senior', range: '70+' }
                        ].map(({ text, range }) => (
                            <TileButton key={text} text={text} subline={range} onClick={() => handleTileButtonClick('ageGroups', text)}></TileButton>
                        ))}
                    </TileGrid>
                </QuestionWrapper>
                <QuestionWrapper>
                    <p>Do you own a pet?</p>
                    <Checkbox label="Yes" checked={selectedFilters.hasPet} onChange={handleCheckboxChange} />
                </QuestionWrapper>
                <QuestionWrapper>
                    <p>What is your relationship status?</p>
                    <Dropdown options={["Single", "Married"]} category='Relationship Status'></Dropdown>
                </QuestionWrapper>
                <QuestionWrapper>
                    <p>What is your occupation?</p>
                    <Dropdown options={["Student", "Working", "Unemployed"]} category='Occupation'></Dropdown>
                </QuestionWrapper>
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