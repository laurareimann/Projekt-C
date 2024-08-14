import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 80%;
    text-align:start;
`;

const AboutUs: React.FC = () => {
    return (
        <Wrapper>
            <h1>About Us</h1>
            <p>This project is part of the Project C module in the Bachelor's degree programme Media Systems at HAW Hamburg</p>
            <h3>What is the 15-minute city?</h3>
            <p>The 15-minute city is a concept that aims to create a city where all necessary services and facilities are within a 15-minute walk or bike ride from home. This concept is designed to make cities more sustainable, liveable, and resilient.</p>
            <h3>Why is the 15-minute city important?</h3>
            <p>We believe that how we design our cities has a profound impact on our lives. Alternative modes of transport, like cycling and walking, along with accessible public transportation, are not just environmentally friendly choices, they also contribute to a healthier and more vibrant community. The 15-minute city model, where all your daily needs are within a 15-minute walk or bike ride, promotes this ideal.</p>
            <h3>Our Vision</h3>
            <p>Our core objective is to provide citizens with the information they need to make informed choices about their communities. This website serves as a resource for individuals seeking a better quality of life and for policymakers considering improvements to urban environments.</p>
            <p>Here's a breakdown of how we hope to contribute:</p>
            <ul>
                <li>Provide information on the 15-minute city concept and its benefits</li>
                <li>Offer resources for individuals looking to make their communities more sustainable</li>
                <li>Encourage policymakers to consider the 15-minute city model in their urban planning</li>
            </ul>
            <h3>Our Team</h3>
            <p>This project wouldn't be possible without the dedication of our team:</p>
            <p>Laura, Leon, Nico, and Niko</p>
        </Wrapper>
    );
};

export default AboutUs;