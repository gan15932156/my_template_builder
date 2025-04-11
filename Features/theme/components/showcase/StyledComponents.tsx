import styled from "styled-components";
const colors = {
  primary: "#3b82f6", // A softer blue
  primaryDark: "#2563eb",
  text: "#1f2937",
  textLight: "#6b7280",
  background: "#ffffff",
  backgroundAlt: "#f9fafb",
  border: "#e5e7eb",
  footer: "#111827",
};

// Styled Components
const Container = styled.div`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  color: ${colors.text};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${colors.border};
  background-color: ${colors.background};
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.text};
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    gap: 2rem;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${colors.textLight};
  font-weight: 500;
  transition: color 0.2s;
  &:hover {
    color: ${colors.primary};
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.background};
  z-index: 50;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  /* max-width: 80%; */
  margin: 0 auto;
  background-color: ${colors.background};
`;
const HeroHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Image = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: cover;
`;
const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: ${colors.text};
  line-height: 1.2;
  text-align: right;
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${colors.textLight};
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const CTAButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.primaryDark};
  }
`;

const Features = styled.div`
  padding: 4rem 2rem;
  background-color: ${colors.backgroundAlt};
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  margin-bottom: 3rem;
  color: ${colors.text};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  background: ${colors.background};
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
  }
`;

const FeatureIcon = styled.div`
  color: ${colors.primary};
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${colors.text};
`;

const FeatureDescription = styled.p`
  color: ${colors.textLight};
  line-height: 1.6;
`;

const Footer = styled.footer`
  background-color: ${colors.footer};
  color: white;
  padding: 2rem;
  text-align: center;
`;

export {
  Container,
  Image,
  CTAButton,
  FeatureCard,
  FeatureDescription,
  FeatureGrid,
  FeatureIcon,
  Features,
  FeaturesContainer,
  FeatureTitle,
  Footer,
  Hero,
  HeroHeader,
  HeroSubtitle,
  HeroTitle,
  Logo,
  MenuButton,
  MobileMenu,
  MobileMenuHeader,
  MobileNavLinks,
  Nav,
  NavLink,
  NavLinks,
  SectionTitle,
};
