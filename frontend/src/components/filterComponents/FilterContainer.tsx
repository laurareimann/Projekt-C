import { useState } from 'react';
import styled from 'styled-components';
import Container from '../Container';
import Button from '../buttons/Buttons';
import LabelButton from '../buttons/LabelButton';
import TileButton from '../buttons/TileButton';

type TransportMethod = 'walking' | 'bike' | 'publicTransport' | 'car';
type Preference =
  | 'hairDresser' | 'nailSalon' | 'cosmeticStudio' | 'massage' | 'therme' | 'sauna' | 'solarium' | 'hospital'
  | 'restaurants' | 'cafes' | 'bars' | 'clubs'
  | 'hiking' | 'cycling' | 'aquatics' | 'gymnastics' | 'tennis' | 'soccer' | 'basketball' | 'skating' | 'indoorSports'
  | 'theatres' | 'museums' | 'libraries' | 'bookStores' | 'galleries';

type FilterState = {
    transportMethod: Record<TransportMethod, boolean>;
    preferences: Record<Preference, boolean>;
};

function FilterContainer({ color = "blue", outline = true, children }: { color?: string; outline?: boolean; children?: React.ReactNode }) {
    const [selectedFilters, setSelectedFilters] = useState<FilterState>({
        transportMethod: {
            walking: false,
            bike: false,
            publicTransport: false,
            car: false
        },
        preferences: {
            hairDresser: false,
            nailSalon: false,
            cosmeticStudio: false,
            massage: false,
            therme: false,
            sauna: false,
            solarium: false,
            hospital: false,
            restaurants: false,
            cafes: false,
            bars: false,
            clubs: false,
            hiking: false,
            cycling: false,
            aquatics: false,
            gymnastics: false,
            tennis: false,
            soccer: false,
            basketball: false,
            skating: false,
            indoorSports: false,
            theatres: false,
            museums: false,
            libraries: false,
            bookStores: false,
            galleries: false
        }
    });

    const handleTileButtonClick = (key: TransportMethod) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            transportMethod: {
                ...prevFilters.transportMethod,
                [key]: !prevFilters.transportMethod[key]
            }
        }));

        // Log the currently true filters
        logSelectedFilters();
    };

    const handleLabelButtonClick = (key: Preference) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            preferences: {
                ...prevFilters.preferences,
                [key]: !prevFilters.preferences[key]
            }
        }));

        // Log the currently true filters
        logSelectedFilters();
    };

    const resetFilters = () => {
        setSelectedFilters({
            transportMethod: {
                walking: false,
                bike: false,
                publicTransport: false,
                car: false
            },
            preferences: {
                hairDresser: false,
                nailSalon: false,
                cosmeticStudio: false,
                massage: false,
                therme: false,
                sauna: false,
                solarium: false,
                hospital: false,
                restaurants: false,
                cafes: false,
                bars: false,
                clubs: false,
                hiking: false,
                cycling: false,
                aquatics: false,
                gymnastics: false,
                tennis: false,
                soccer: false,
                basketball: false,
                skating: false,
                indoorSports: false,
                theatres: false,
                museums: false,
                libraries: false,
                bookStores: false,
                galleries: false
            }
        });

        // Log the currently true filters
        logSelectedFilters();
    };

    // Log only the selected filters that are set to true
    const logSelectedFilters = () => {
        const activeTransportMethods = Object.entries(selectedFilters.transportMethod)
            .filter(([_, value]) => value)
            .map(([key]) => key);

        const activePreferences = Object.entries(selectedFilters.preferences)
            .filter(([_, value]) => value)
            .map(([key]) => key);

        console.log("Selected Transport Methods:", activeTransportMethods);
        console.log("Selected Preferences:", activePreferences);
    };

    const preferenceGroups = {
        'Health & Wellness': ['hairDresser', 'nailSalon', 'cosmeticStudio', 'massage', 'therme', 'sauna', 'solarium', 'hospital'],
        'Social': ['restaurants', 'cafes', 'bars', 'clubs'],
        'Sports & Activities': ['hiking', 'cycling', 'aquatics', 'gymnastics', 'tennis', 'soccer', 'basketball', 'skating', 'indoorSports'],
        'Culture': ['theatres', 'museums', 'libraries', 'bookStores', 'galleries']
    };

    return (
        <ContainerWrapper>
            <Container color={color} outline={outline}>
                {children}
                <FilterWrapper>
                    <h2>Filters</h2>
                    <QuestionWrapper>
                        <p>What is your preferred method of transport?</p>
                        <TileGrid>
                            {[
                                { text: 'Walking', icon: 'walking' },
                                { text: 'Bike', icon: 'bike' },
                                { text: 'Public Transport', icon: 'tram' },
                                { text: 'Car', icon: 'bus' }
                            ].map(({ text, icon }) => (
                                <TileButton
                                    key={text}
                                    icon={icon.toLowerCase()}
                                    text={text}
                                    onClick={() => handleTileButtonClick(text.toLowerCase() as TransportMethod)}
                                ></TileButton>
                            ))}
                        </TileGrid>
                    </QuestionWrapper>
                    <h3 style={{ "marginBottom": 0 }}>Preferences</h3>
                    {Object.entries(preferenceGroups).map(([group, items]) => (
                        <QuestionWrapper key={group}>
                            <p>{group}</p>
                            <LabelGrid>
                                {items.map(item => (
                                    <LabelButton
                                        key={item}
                                        color='blue'
                                        onClick={() => handleLabelButtonClick(item as Preference)}
                                    >
                                        {item}
                                    </LabelButton>
                                ))}
                            </LabelGrid>
                        </QuestionWrapper>
                    ))}
                    <ResetWrapper>
                        <Button onClick={resetFilters}>Reset All</Button>
                    </ResetWrapper>
                </FilterWrapper>
            </Container>
        </ContainerWrapper>
    );
}

const FilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    height: 80vh;
    overflow-y: auto;
`;

const ContainerWrapper = styled.div``;

const QuestionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: -webkit-fill-available;
    gap: 8px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--color--blue-5);
`;

const TileGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 8px;
`;

const LabelGrid = styled.div`
    max-width: 380px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
`;

const ResetWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

export default FilterContainer;