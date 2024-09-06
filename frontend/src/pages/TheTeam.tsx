import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    text-align: start;
    margin: 0 auto;
`;

const TeamGrid = styled.div`
    display: grid;
    width: 100%;
    padding: 10px;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsive grid layout */
    margin-top: 20px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Adjust for smaller screens */
    }
`;

const TeamMemberCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
    width: 100%; /* Adjust width to fit four items in a row with spacing */
`;

const TeamMemberImage = styled.div<{ color: string }>`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: ${({ color }) => color}; /* Color applied to the image background */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    position: relative;

    &::before {
        content: '';
        display: block;
        width: 80px;
        height: 80px;
        mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>') center/contain;
        background-color: white; /* White SVG icon on the colored background */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const TeamMemberName = styled.h3`
    margin-bottom: 10px;
`;

const TeamMemberRole = styled.p`
    margin-bottom: 5px;
    font-weight: bold;
`;

const TeamMemberBio = styled.p`
    font-size: 0.9em;
`;

const Team: React.FC = () => {
    const teamMembers = [
        {
            name: "Laura Reimann",
            role: "Lead Developer",
            bio: "Laura leads the development team, focusing on the technical aspects of the project. She leads the implementation of new features and sets the technical direction for the project.",
            color: "#3D50F5"
        },
        {
            name: "Leon Mohr",
            role: "Project Manager and Backend Developer",
            bio: "Leon is responsible for managing the project and ensuring everything runs smoothly. He coordinates the team and oversees the development process from start to finish.",
            color: "#30736B"
        },
        {
            name: "Nico Klärmann",
            role: "Concepter and UX/UI Designer",
            bio: "Nico designs the user interface and user experience for the platform. He aims to create an intuitive and aesthetically pleasing experience for all users.",
            color: "#B8007A"
        },
        {
            name: "Nikolas Müller",
            role: "Software Developer",
            bio: "Niko is involved in software development, contributing to both frontend and backend aspects of the project. He has a deep interest in urban planning and sustainability.",
            color: "#8B96F9"
        }
    ];

    return (
        <Wrapper>
            <h1>Meet Our Team</h1>
            <TeamGrid>
                {teamMembers.map((member, index) => (
                    <TeamMemberCard key={index}>
                        <TeamMemberImage color={member.color} />
                        <TeamMemberName>{member.name}</TeamMemberName>
                        <TeamMemberRole>{member.role}</TeamMemberRole>
                        <TeamMemberBio>{member.bio}</TeamMemberBio>
                    </TeamMemberCard>
                ))}
            </TeamGrid>
        </Wrapper>
    );
};

export default Team;