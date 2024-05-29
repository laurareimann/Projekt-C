import styled from 'styled-components';
import Container from '../Container';
import Input from '../Inputforms';
import TileButton from '../buttons/TileButton';
import Checkbox from '../Checkbox';
import LabelButton from '../buttons/LabelButton';
import Button from '../buttons/Buttons';


function FilterContainer({ color = "blue", outline = true, children }: { color?: string; outline?: boolean; children?: React.ReactNode }) {
    return (
        <Container color={color} outline={outline}>
            {children}
            <FilterWrapper>
                <h2>Filter</h2>
                <QuestionWrapper>
                    <p>How old are you?</p>
                    <Input type="number" placeholder='Enter your age' size='small' min={0} max={120}></Input>
                </QuestionWrapper>
                <QuestionWrapper>
                    <p>Include any other age groups:</p>
                    <TileGrid>
                        <TileButton text='baby' subline='0-3'></TileButton>
                        <TileButton text='children' subline='4-10'></TileButton>
                        <TileButton text='teenager' subline='11-17'></TileButton>
                        <TileButton text='young adult' subline='18-35'></TileButton>
                        <TileButton text='middle age' subline='36-70'></TileButton>
                        <TileButton text='senior' subline='70+'></TileButton>
                    </TileGrid>
                </QuestionWrapper>
                <QuestionWrapper>
                    <p>Do you own a pet?</p>
                    <Checkbox label="Yes" />
                </QuestionWrapper>
                <QuestionWrapper>
                    <p>What is your relationship status?</p>
                </QuestionWrapper>
                <QuestionWrapper>
                    <p>What is your occupation?</p>
                </QuestionWrapper>
                <QuestionWrapper>
                    <p>What is your preferred method of transport?</p>
                    <TileGrid>
                        <TileButton icon='walking' text='Walking'></TileButton>
                        <TileButton icon='bike' text='Bike'></TileButton>
                        <TileButton icon='scooter' text='Scooter'></TileButton>
                        <TileButton icon='tram' text='Public Transport' ></TileButton>
                        <TileButton icon='bus' text='car' ></TileButton>
                    </TileGrid>
                </QuestionWrapper>
                <h3>Preferences</h3>
                <QuestionWrapper>
                    <p>Health & Wellness</p>
                    <LabelGrid>
                        <LabelButton color='blue'>Hair Dresser</LabelButton>
                        <LabelButton color='blue'>Nail Salon</LabelButton>
                        <LabelButton color='blue'>Cosmetic Studio</LabelButton>
                        <LabelButton color='blue'>Massage</LabelButton>
                        <LabelButton color='blue'>Therme</LabelButton>
                        <LabelButton color='blue'>Sauna</LabelButton>
                        <LabelButton color='blue'>Solarium</LabelButton>
                        <LabelButton color='blue'>Hospital</LabelButton>
                    </LabelGrid>
                </QuestionWrapper>
                <QuestionWrapper>
                    <p>Social</p>
                    <LabelGrid>
                        <LabelButton color='blue'>Restaurants</LabelButton>
                        <LabelButton color='blue'>Cafes</LabelButton>
                        <LabelButton color='blue'>Bars</LabelButton>
                        <LabelButton color='blue'>Clubs</LabelButton>
                    </LabelGrid>
                </QuestionWrapper>
                <QuestionWrapper>
                    <p>Sports & Activities</p>
                    <LabelGrid>
                        <LabelButton color='blue'>Hiking</LabelButton>
                        <LabelButton color='blue'>Cycling</LabelButton>
                        <LabelButton color='blue'>Aquatics</LabelButton>
                        <LabelButton color='blue'>Gymnastics</LabelButton>
                        <LabelButton color='blue'>Tennis</LabelButton>
                        <LabelButton color='blue'>Soccer</LabelButton>
                        <LabelButton color='blue'>Basketball</LabelButton>
                        <LabelButton color='blue'>Skating</LabelButton>
                        <LabelButton color='blue'>Indoor Sports</LabelButton>
                    </LabelGrid>
                </QuestionWrapper>
                <QuestionWrapper>
                    <p>Culture</p>
                    <LabelGrid>
                        <LabelButton color='blue'>Theatres</LabelButton>
                        <LabelButton color='blue'>Museums</LabelButton>
                        <LabelButton color='blue'>Libraries</LabelButton>
                        <LabelButton color='blue'>Book stores</LabelButton>
                        <LabelButton color='blue'>Galleries</LabelButton>
                    </LabelGrid>
                </QuestionWrapper>
                <ResetWrapper>
                    <Button>Rest All</Button>
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