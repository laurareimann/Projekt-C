import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 80%;
    text-align: start;
`;

const Question = styled.div`
    cursor: pointer;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Arrow = styled.span<{ isOpen: boolean }>`
    display: inline-block;
    transition: transform 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

const Answer = styled.div`
    padding: 10px 0;
`;

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is the 15-minute city?",
            answer: "The 15-minute city is a concept where all essential services and facilities are within a 15-minute walk or bike ride from home, promoting sustainability and livability."
        },
        {
            question: "How does the 15-minute city benefit the environment?",
            answer: "By reducing reliance on cars and encouraging walking, cycling, and public transportation, the 15-minute city helps lower carbon emissions and decrease traffic congestion."
        },
        {
            question: "What are the key principles of the 15-minute city?",
            answer: "The key principles include proximity, accessibility, sustainability, community, and resilience."
        },
        {
            question: "How can I contribute to making my city a 15-minute city?",
            answer: "You can advocate for mixed-use development, support local businesses, and promote sustainable transport options in your community."
        },
        {
            question: "Is the 15-minute city concept applicable in all cities?",
            answer: "While the principles can be adapted, the feasibility of implementing the 15-minute city concept varies depending on existing urban layouts and infrastructure."
        }
    ];

    return (
        <Wrapper>
            <h1>Frequently Asked Questions</h1>
            {faqs.map((faq, index) => (
                <div key={index}>
                    <Question onClick={() => toggleQuestion(index)}>
                        <h3>{faq.question}</h3>
                        <Arrow isOpen={openIndex === index}>
                            &gt;
                        </Arrow>
                    </Question>
                    {openIndex === index && (
                        <Answer>
                            <p>{faq.answer}</p>
                        </Answer>
                    )}
                </div>
            ))}
        </Wrapper>
    );
};

export default FAQ;