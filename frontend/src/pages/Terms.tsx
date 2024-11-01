import React from 'react';
import styled from 'styled-components';
import Header from '../components/header&footer/Header';
import { Wrapper } from './FAQ';

const Section = styled.div`
    margin-bottom: 20px;
`;

const Terms: React.FC = () => {
    return (
        <Wrapper>
            <Header/>
                <h1>Terms of Service</h1>

                <Section>
                    <h2>Introduction</h2>
                    <p>Welcome to our website. By accessing or using our website, you agree to be bound by the following terms and conditions. Please read them carefully.</p>
                </Section>

                <Section>
                    <h2>Use of Our Site</h2>
                    <p>You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the site.</p>
                </Section>

                <Section>
                    <h2>Intellectual Property</h2>
                    <p>All content on this site, including text, graphics, logos, and images, is the property of our company and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our express written permission.</p>
                </Section>

                <Section>
                    <h2>Limitation of Liability</h2>
                    <p>We do our best to ensure that the information on our website is accurate, but we do not guarantee its accuracy or completeness. We will not be liable for any loss or damage arising from the use of our website or reliance on its content.</p>
                </Section>

                <Section>
                    <h2>Third-Party Links</h2>
                    <p>Our website may contain links to third-party websites. These links are provided for your convenience, and we do not endorse the content of any linked sites. We are not responsible for the content or practices of these third-party sites.</p>
                </Section>

                <Section>
                    <h2>Termination</h2>
                    <p>We reserve the right to terminate or suspend your access to our website at any time, without notice, for conduct that we believe violates these terms or is harmful to other users or our business interests.</p>
                </Section>

                <Section>
                    <h2>Changes to These Terms</h2>
                    <p>We may update these terms from time to time. Any changes will be posted on this page, and we encourage you to review the terms regularly. Your continued use of the site after changes are posted constitutes your acceptance of the updated terms.</p>
                </Section>

                <Section>
                    <h2>Governing Law</h2>
                    <p>These terms are governed by and construed in accordance with the laws of Germany, and you agree to submit to the exclusive jurisdiction of the courts located in Germany for the resolution of any disputes.</p>
                </Section>

        </Wrapper>
    );
};

export default Terms;