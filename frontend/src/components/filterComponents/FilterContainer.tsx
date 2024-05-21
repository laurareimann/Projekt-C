import styled from 'styled-components';
import Container from '../Container';
import Input from '../Inputforms';
import TileButton from '../buttons/TileButton';


function FilterContainer({ color = "blue", outline = true, children }: { color?: string; outline?: boolean; children?: React.ReactNode }) {
    return (
        <Container color={color} outline={outline}>
            {children}
            <p>How old are you?</p>
            <Input placeholder='Enter your age' size='small'></Input>
            <p>Include any other age groups:</p>
            <TileButton></TileButton>
        </Container>
    );
}

export default FilterContainer;