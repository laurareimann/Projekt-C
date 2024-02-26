/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import styled from 'styled-components';

import './App.css'
//import GlobalStyle from './globalStyles.js';

const GlobalStyle = styled.div`
  body {
    margin: 0;
    padding: 20px;
    background: grey;
    font-family: 'Roboto', sans-serif;
  }

  // typography
  h1 {
  color: var(--color--blue-1);
  line-height: 1.2;
  margin-bottom: 0.5em;
  font-weight: bold;
}
`



function App() {
  const [count, setCount] = useState(0)
  return (
    <GlobalStyle>
      <div>
        <header>
          15-Minuten Stadt für Project C
        </header>
        <h1>h1</h1>
      </div>
    </GlobalStyle>
  )
}

export default App
