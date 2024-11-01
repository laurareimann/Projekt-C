import React from 'react';
import styled from 'styled-components';
import Header from '../components/header&footer/Header';

const Wrapper = styled.div`
    width: 55%;
    text-align: start;

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

const AboutUs: React.FC = () => {
    return (
        <Wrapper>
            <Header/>
                <h1>Travel Time Score</h1>

                <Section>
                    <p>Our Travel Time Score helps you quickly understand the convenience of any address by calculating how long it would take to reach essential services nearby. Whether you're assessing a new neighborhood or simply curious about your current location, this score offers valuable insights into the accessibility of important amenities.</p>
                </Section>

                <Section>
                    <h3>How It Works</h3>

                    <p><strong>1. Default Score Calculation</strong></p>
                    <p>When you provide an address, our algorithm automatically searches for the nearest locations in three key categories:</p>
                    <ul>
                        <ListElement><strong>Grocery:</strong> Supermarkets, grocery stores, and other places where you can easily buy food and household items.</ListElement>
                        <ListElement><strong>Health:</strong> Pharmacies, clinics, hospitals, and other healthcare facilities that are important for your well-being.</ListElement>
                        <ListElement><strong>Transit:</strong> Public transportation options like bus stops, subway stations, and train stations for easy commuting.</ListElement>
                    </ul>
                    <p>For each of these categories, the algorithm identifies the nearest place and calculates the time it would take to get there. These times are then averaged together to provide a single score, expressed in minutes. This number gives you an overview of how long, on average, it takes to reach important services from the given address.</p>
                </Section>

                <Section>
                    <p><strong>2. Customizing the Score</strong></p>
                    <p>Because everyone has different priorities, you can customize your Travel Time Score to better match your individual needs. By applying filters, you can refine the calculation to focus on the services and amenities that are most relevant to you. For example:</p>
                    <ul>
                        <ListElement>You might want to include other locations such as parks, restaurants or entertainment.</ListElement>
                        <ListElement>Adjust the mode of travel (e.g., walking, cycling, driving, or public transport) to see how different options affect the score.</ListElement>
                        <ListElement>You can choose to prioritize specific categories which will effect the weighting in the final score.</ListElement>
                    </ul>
                    <p>When you change the mode of travel after you already searched for an address, the score will be recalculated to fit that chosen travel mode. Filters for additional locations need to be applied before entering an address to take effect.</p>
                </Section>

                <Section>
                    <h3>How to Get Your Score</h3>
                    <p>To get started, simply enter any address into our platform, and you’ll receive the default Travel Time Score based on the nearest grocery, health, and transit options. If you’d like to refine the score further, use our filtering options to personalize the calculation and get a new score that reflects your unique priorities.</p>
                </Section>
        </Wrapper>
    );
};

export default AboutUs;