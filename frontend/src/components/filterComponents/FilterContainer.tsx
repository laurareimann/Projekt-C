import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../buttons/Buttons';
import LabelButton from '../buttons/LabelButton';
import TileButton from '../buttons/TileButton';
import axios from 'axios';

type TransportMethod = 'walking' | 'bike' | 'publicTransport' | 'car';
type Preference =
    | 'restaurants' | 'cafes' | 'bars' | 'clubs'
    | 'park' | 'gym' | 'hikingArea' | 'hairDresser' | 'beautySalon' | 'spa'
    | 'theatres' | 'museums' | 'libraries' | 'galleries';

type FilterState = {
    transportMethod: Record<TransportMethod, boolean>;
    preferences: Record<Preference, boolean>;
};

const FContainer = styled.div<{ color: string; $hasOutline: boolean }>`
z-index: 1000;
 display: grid;
 gap:16px;
width: fit-content;
    min-height: 280px;
    padding: 24px;
    box-sizing: border-box;
    border-radius: 26px;
    align-content: center;
    justify-content: center;
    box-shadow: 0px 0px 18px rgba(255, 255, 255, 0.5);
    color: ${({ color }) =>
    (color === "blue" ? "var(--color--blue-5)" :
        (color === "green" ? "var(--color--green-5)" :
            "var(--color--pink-5)"))};
    
    background-color: ${({ $hasOutline, color }) =>
        $hasOutline ? "var(--color--white-shade)" :
            (color === "blue" ? "var(--color--blue-1)" :
                (color === "green" ? "var(--color--green-1)" :
                    "var(--color--pink-1)"))};

    border: ${({ $hasOutline, color }) =>
        $hasOutline ? (color === "blue" ? "var(--color--blue-3) 3px solid" :
            (color === "green" ? "var(--color--green-3) 3px solid" :
                "var(--color--pink-3) 3px solid")) :
            "none"};
`

function FilterContainer({ color = "blue", children, onClose }: { color?: string; outline?: boolean; children?: React.ReactNode; onClose?: () => void }) {
    const [selectedFilters, setSelectedFilters] = useState<FilterState>({
        transportMethod: {
            walking: false,
            bike: false,
            publicTransport: false,
            car: false
        },
        preferences: {
            hairDresser: false,
            beautySalon: false,
            spa: false,
            restaurants: false,
            cafes: false,
            bars: false,
            clubs: false,
            park: false,
            gym: false,
            hikingArea:false,
            theatres: false,
            museums: false,
            libraries: false,
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
    };

    const handleLabelButtonClick = (key: Preference) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            preferences: {
                ...prevFilters.preferences,
                [key]: !prevFilters.preferences[key]
            }
        }));
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
            beautySalon: false,
            spa: false,
            restaurants: false,
            cafes: false,
            bars: false,
            clubs: false,
            park: false,
            gym: false,
            hikingArea:false,
            theatres: false,
            museums: false,
            libraries: false,
            galleries: false
            }
        });
    };

    // Use useEffect to log the selected filters whenever they change
    useEffect(() => {
        const activeTransportMethods = Object.entries(selectedFilters.transportMethod)
            .filter(([value]) => value)
            .map(([key]) => key);

        const activePreferences = Object.entries(selectedFilters.preferences)
            .filter(([value]) => value)
            .map(([key]) => key);

        console.log("Selected Transport Methods:", activeTransportMethods);
        console.log("Selected Preferences:", activePreferences);
    }, [selectedFilters]); // Dependency array to watch for changes in selectedFilters

    const preferenceGroups = {
        'Social': ['restaurants', 'cafes', 'bars', 'clubs'],
        'Sports & Wellness': ['park', 'gym','hikingArea', 'hairDresser', 'spa', 'beautySalon'],
        'Culture': ['theatres', 'museums', 'libraries', 'galleries']
    };

    async function updatePreferences(chosenPreferences: Record<Preference, boolean>,shouldReset:boolean){
        console.log(chosenPreferences);

        //Social
        let restaurantBool = chosenPreferences.restaurants;
        let cafeBool = chosenPreferences.cafes;
        let barBool = chosenPreferences.bars;
        let clubBool = chosenPreferences.clubs;
        //Sports&Wellness
        let parkBool = chosenPreferences.park;
        let gymBool = chosenPreferences.gym;
        let hikingBool =  chosenPreferences.hikingArea;
        let hairDresserBool = chosenPreferences.hairDresser;
        let spaBool = chosenPreferences.spa;
        let beautySalonBool = chosenPreferences.beautySalon;
        //Culture
        let theatreBool = chosenPreferences.theatres;
        let museumBool = chosenPreferences.museums;
        let libraryBool = chosenPreferences.libraries;
        let artGalleryBool = chosenPreferences.galleries;

        try{
            if(shouldReset == true){
                hairDresserBool = false;
                spaBool = false;
                beautySalonBool =false;
                restaurantBool = false;
                cafeBool = false;
                barBool =false;
                clubBool = false;
                parkBool = false;
                gymBool = false;
                hikingBool = false;
                theatreBool =false;
                museumBool = false;
                libraryBool = false;
                artGalleryBool = false;
            }    

            await axios.post("http://localhost:8080/updatePreferenceJson",{
                hairDresserBool,spaBool,beautySalonBool,
                restaurantBool,cafeBool,barBool,clubBool,
                parkBool,gymBool,hikingBool,
                theatreBool,museumBool,libraryBool,artGalleryBool
            }).then((res:{data:string})=>{
                if(res.data == "update successful"){
                    console.log("Updated preference Json File");
                }
            })
        }catch(e){
            console.log(e)
        }

    }

    return (
        <ContainerWrapper>
            <FContainer color={color} $hasOutline={false}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
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
                                    selected={selectedFilters.transportMethod[text.toLowerCase() as TransportMethod]} // Pass selected state
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
                                        selected={selectedFilters.preferences[item as Preference]} // Pass selected state
                                        onClick={() => handleLabelButtonClick(item as Preference)}
                                    >
                                        {item}
                                    </LabelButton>
                                ))}
                            </LabelGrid>
                        </QuestionWrapper>
                    ))}
                    <ResetWrapper>
                        <Button onClick={()=>{
                            resetFilters();
                            setTimeout(()=>{updatePreferences(selectedFilters.preferences,true)},250)
                        }}>Reset All</Button>
                        <Button color={'blue'} onClick={()=>{
                            onClose;
                            console.log(selectedFilters.preferences.bars);
                            updatePreferences(selectedFilters.preferences,false)}
                            }>Save</Button>
                    </ResetWrapper>
                </FilterWrapper>
            </FContainer>
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

const ContainerWrapper = styled.div`
    position: relative;
`;

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
    gap: 8px;
    width: 100%;
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

export default FilterContainer;
