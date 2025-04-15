"use client";

import styled, { ThemeProvider } from "styled-components";
import useManageTheme from "../../hooks/useManageTheme";
import {
  FaHeadSideCoughSlash,
  FaPalette,
  FaRocket,
  FaStar,
} from "react-icons/fa6";

// Theme-aware styling
const Page = styled.div`
  background: ${({ theme }) => theme.background.default};
  color: ${({ theme }) => theme.text.primary};
  font-family: "Segoe UI", sans-serif;
`;

// Navbar
const Navbar = styled.nav`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.primary.main};
  color: ${({ theme }) => theme.primary.contrastText};
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    color: inherit;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Section layout
const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Center = styled.div`
  text-align: center;
`;
const HeroSection = styled.div`
  padding-block-start: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
// Hero
const HeroTitle = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.primary.main};
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: 2rem;
  max-width: 60ch;
  margin: auto;
  text-align: center;
`;

const CTAButton = styled.button`
  background-color: ${({ theme }) => theme.secondary.main};
  color: ${({ theme }) => theme.secondary.contrastText};
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondary.dark};
  }
`;

// Features
const FeaturesGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.primary.light};
  color: ${({ theme }) => theme.primary.contrastText};
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

const IconBox = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

// Testimonials
const TestimonialsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const TestimonialCard = styled.div`
  background: ${({ theme }) => theme.info.light};
  color: ${({ theme }) => theme.info.contrastText};
  padding: 2rem;
  border-radius: 12px;
  max-width: 300px;
  font-size: 0.95rem;
`;

// CTA section
const CTASection = styled(Section)`
  background-color: ${({ theme }) => theme.primary.light};
  color: ${({ theme }) => theme.primary.contrastText};
  border-radius: 24px;
  text-align: center;
`;

const Footer = styled.footer`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.text.hint};
  font-size: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.divider.divider};
`;
const ExampleLandingPage = () => {
  const { colorVars } = useManageTheme();
  if (!colorVars) return;
  return (
    <ThemeProvider theme={colorVars}>
      <Page>
        {/* Navbar */}
        <Navbar>
          <Logo>ThemedUI</Logo>
          <NavLinks>
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#get-started">Get Started</a>
          </NavLinks>
        </Navbar>

        {/* Hero */}
        <HeroSection>
          <HeroTitle>Modern UI, Your Theme</HeroTitle>
          <HeroSubtitle>
            Build beautiful, customizable interfaces using your own theme
            system. React + styled-components = ❤️
          </HeroSubtitle>
          <CTAButton>Explore Now</CTAButton>
        </HeroSection>

        {/* Features */}
        <Section id="features">
          <Center>
            <h2 style={{ marginBottom: "2rem" }}>Why Choose Us</h2>
          </Center>
          <FeaturesGrid>
            <FeatureCard>
              <IconBox>
                <FaRocket />
              </IconBox>
              <h3>Fast Setup</h3>
              <p>
                Plug and play in seconds. Just load your theme and start coding!
              </p>
            </FeatureCard>
            <FeatureCard>
              <IconBox>
                <FaPalette />
              </IconBox>
              <h3>Fully Themed</h3>
              <p>
                Your colors, your vibe. Every component respects your palette.
              </p>
            </FeatureCard>
            <FeatureCard>
              <IconBox>
                <FaHeadSideCoughSlash />
              </IconBox>
              <h3>Built with React</h3>
              <p>Composable, typed, and scalable. Perfect for modern devs.</p>
            </FeatureCard>
            <FeatureCard>
              <IconBox>
                <FaStar />
              </IconBox>
              <h3>Beautiful Design</h3>
              <p>Elegance meets flexibility with clean, responsive design.</p>
            </FeatureCard>
          </FeaturesGrid>
        </Section>

        {/* Testimonials */}
        <Section id="testimonials">
          <Center>
            <h2 style={{ marginBottom: "2rem" }}>What Users Say</h2>
          </Center>
          <TestimonialsGrid>
            <TestimonialCard>
              “This saved me hours! The theme integration is seamless and the
              layout is stunning.”
            </TestimonialCard>
            <TestimonialCard>
              “Perfect for showcasing my design system. Everything just works.”
            </TestimonialCard>
            <TestimonialCard>
              “Love how easy it is to drop into any React app. Theme support is
              🔥.”
            </TestimonialCard>
          </TestimonialsGrid>
        </Section>

        {/* CTA */}
        <CTASection id="get-started">
          <CTAButton>Start Your Journey Now</CTAButton>
        </CTASection>

        {/* Footer */}
        <Footer>
          © {new Date().getFullYear()} ThemedUI. Built with ❤️ and
          styled-components.
        </Footer>
      </Page>
    </ThemeProvider>
  );
};

export default ExampleLandingPage;
