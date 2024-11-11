import React from 'react';
import styled from 'styled-components';
import Header from '../components/header&footer/Header';

const Wrapper = styled.div`
    width: 55%;
    text-align: start;
    align-self: center;
    flex:1;

    @media (max-width: 768px) {
        width: 80%;
    }
`;

const Section = styled.div`
    margin-bottom: 20px;
`;

const ListElement = styled.li`
  line-height: 1.5rem;
  font-size: 1.125rem;
  font-weight: 400;
`


const Concept: React.FC = () => {
    return (
            <Wrapper>
                <Header/>
                <h1>Concept</h1>

                <Section>
                    <p>Our project is rooted in the idea of transforming urban environments into more sustainable and livable spaces. The 15-minute city is a central concept that guides our work.</p>
                </Section>

                <Section>
                    <h3>The 15-Minute City Explained</h3>
                    <p>The 15-minute city is a revolutionary urban planning concept that suggests all essential services—such as work, shopping, education, healthcare, and leisure—should be accessible within a 15-minute walk or bike ride from home. This idea focuses on reducing the need for cars, decreasing traffic congestion, and lowering carbon emissions, while fostering community interaction and improving the overall quality of life.</p>
                </Section>

                <Section>
                    <h3>Core Principles</h3>
                    <p>The concept of the 15-minute city is built upon several key principles that drive its implementation:</p>
                    <ul>
                        <ListElement><strong>Proximity:</strong> Ensuring that daily needs are within a short distance, reducing reliance on cars.</ListElement>
                        <ListElement><strong>Accessibility:</strong> Making sure that everyone, regardless of age or ability, can access necessary services easily.</ListElement>
                        <ListElement><strong>Sustainability:</strong> Promoting environmentally friendly modes of transport like walking, cycling, and public transit.</ListElement>
                        <ListElement><strong>Community:</strong> Enhancing social interactions and community ties by designing shared spaces.</ListElement>
                        <ListElement><strong>Resilience:</strong> Creating cities that can adapt to economic, social, and environmental changes.</ListElement>
                    </ul>
                </Section>

                <Section>
                    <h3>Implementing the Concept</h3>
                    <p>Applying the 15-minute city concept requires a collaborative effort between urban planners, policymakers, and citizens. It involves rethinking city layouts, promoting mixed-use development, and investing in infrastructure that supports sustainable transport. The goal is to create neighborhoods that are vibrant, self-sufficient, and closely connected to the urban fabric.</p>
                </Section>

                <Section>
                    <h3>Why It Matters</h3>
                    <p>Adopting the 15-minute city model is more than just a trend; it's a necessary step towards building healthier, more resilient urban environments. By making cities more accessible and reducing the need for long commutes, we can improve public health, decrease environmental impact, and create a sense of belonging in our communities.</p>
                </Section>

            </Wrapper>
    );
};

export default Concept;