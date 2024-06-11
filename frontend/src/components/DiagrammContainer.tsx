import styled from 'styled-components';

const StyledDiagram = styled.div`
min-height: 200px;
  height:fit-content;
  width: 300px;
  padding: 0.3rem;
  border: 4px solid var(--color--pink-3);
  border-radius:20px;
  //margin-bottom:10px;
`

function DiagramContainer({}){
    return(
        <StyledDiagram></StyledDiagram>
    )
}

export default DiagramContainer;