import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 80%;
    text-align: start;
`;

const Section = styled.div`
    margin-bottom: 20px;
`;

const Privacy: React.FC = () => {
    return (
        <Wrapper>
            <h1>Privacy Policy</h1>

            <Section>
                <h2>Introduction</h2>
                <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.</p>
            </Section>

            <Section>
                <h2>Information We Collect</h2>
                <p>We may collect personal information such as your name, email address, and usage data when you interact with our website. This information helps us provide a better experience for our users.</p>
            </Section>

            <Section>
                <h2>How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Improve our website and services</li>
                    <li>Respond to your inquiries</li>
                    <li>Send you updates and newsletters if you have opted in</li>
                    <li>Analyze user behavior to improve user experience</li>
                </ul>
            </Section>

            <Section>
                <h2>Cookies</h2>
                <p>Our website uses cookies to enhance your experience. Cookies are small text files stored on your device that help us remember your preferences and track site usage.</p>
            </Section>

            <Section>
                <h2>Third-Party Services</h2>
                <p>We may use third-party services such as analytics tools or payment processors that collect and use your information according to their own privacy policies. We encourage you to review those policies.</p>
            </Section>

            <Section>
                <h2>Data Security</h2>
                <p>We take data security seriously and implement appropriate measures to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
            </Section>

            <Section>
                <h2>Your Rights</h2>
                <p>You have the right to access, update, or delete your personal information. If you wish to exercise these rights, please contact us.</p>
            </Section>

            <Section>
                <h2>Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.</p>
            </Section>

            
        </Wrapper>
    );
};

export default Privacy;
