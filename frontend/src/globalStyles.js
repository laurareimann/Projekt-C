import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {

    // color palette
    // double dashes are a naming convention often used to create reusable and easily identifiable custom properties for styling purposes in web development
    --color--blue-1: #C5CAFC;
    --color--blue-2: #8B96F9;
    --color--blue-3: #3D50F5;
    --color--blue-4: #0B1FD5;
    --color--blue-5: #050E61;

    --color--green-1: #9AD5CE;
    --color--green-2: #48ADA1;
    --color--green-3: #30736B;
    --color--green-4: #1E4843;
    --color--green-5: #122B28;
    
    --color--pink-1: #FFC2EA;
    --color--pink-2: #FF47C2;
    --color--pink-3: #B8007A;
    --color--pink-4: #660044;
    --color--pink-5: #3D0029;

    // additional colors
    --color--error-red-light: #FFF0F1;
    --color--error-red-mid: #FA8686;
    --color--error-red: #EE1D36;
    --color--success-green-light: #EFFDF6;
    --color--success-green-mid: #7FF0B8;
    --color--success-green: #17C970;
    --color--white-shade: #ffffff;
    --color--black-shade: #000000;
  }

  body {
    background-color: var(--color--white-shade);

    margin: 0;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
  }

  // typography
  h1 {
  color: var(--color--blue-5);
  line-height: 3.5rem;
  font-size: 3rem;
  font-weight: 600;
}
  h2 {
  color: var(--color--blue-5);
  line-height: 2.5rem;
  font-size: 2rem;
  font-weight: 600;
}
  h3 {
  color: var(--color--blue-5);
  line-height: 2rem;
  font-size: 1.25rem;
  font-weight: 500;
}
  p {
  color: var(--color--black-shade);
  line-height: 1.5rem;
  font-size: 1.25rem;
  font-weight: 400;
}
`;
