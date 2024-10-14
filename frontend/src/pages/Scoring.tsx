import React from 'react';
import styled from 'styled-components';

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

const AboutUs: React.FC = () => {
    return (
        <div>
            <Wrapper>
                <h1>Travel Time Score</h1>

                <Section>
                    <p>Our Travel Time Score helps you quickly understand the convenience of any address by calculating how long it would take to reach essential services nearby. Whether you're assessing a new neighborhood or simply curious about your current location, this score offers valuable insights into the accessibility of important amenities.</p>
                </Section>

                <Section>
                    <h3>How It Works</h3>

                    <p><b>1. Default Score Calculation</b></p>
                    <p>When you provide an address, our algorithm automatically searches for the nearest locations in three key categories:</p>
                    <ul>
                        <li><b>Grocery:</b> Supermarkets, grocery stores, and other places where you can easily buy food and household items.</li>
                        <li><b>Health:</b> Pharmacies, clinics, hospitals, and other healthcare facilities that are important for your well-being.</li>
                        <li><b>Transit:</b> Public transportation options like bus stops, subway stations, and train stations for easy commuting.</li>
                    </ul>
                    <p>For each of these categories, the algorithm identifies the nearest place and calculates the time it would take to get there. These times are then averaged together to provide a single score, expressed in minutes. This number gives you an overview of how long, on average, it takes to reach important services from the given address.</p>
                </Section>

                <Section>
                    <p><b>2. Customizing the Score</b></p>
                    <p>Because everyone has different priorities, you can customize your Travel Time Score to better match your individual needs. By applying filters, you can refine the calculation to focus on the services and amenities that are most relevant to you. For example:</p>
                    <ul>
                        <li>You might want to include other locations such as parks, restaurants or entertainment.</li>
                        <li>Adjust the mode of travel (e.g., walking, cycling, driving, or public transport) to see how different options affect the score.</li>
                    </ul>
                    <p>Once you apply these filters, the system recalculates the nearest relevant places, and a new, personalized score is generated based on the updated average travel time.</p>
                </Section>

                <Section>
                    <h3>How to Get Your Score</h3>
                    <p>To get started, simply enter any address into our platform, and you’ll receive the default Travel Time Score based on the nearest grocery, health, and transit options. If you’d like to refine the score further, use our filtering options to personalize the calculation and get a new score that reflects your unique priorities.</p>
                </Section>

            </Wrapper>
        </div>
    );
};

export default AboutUs;