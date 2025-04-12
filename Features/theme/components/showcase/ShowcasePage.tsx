"use client";

import { useState } from "react";
import useManageTheme from "../../hooks/useManageTheme";
import {
  Container,
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
  Image,
  Logo,
  MenuButton,
  MobileMenu,
  MobileMenuHeader,
  MobileNavLinks,
  Nav,
  NavLink,
  NavLinks,
  SectionTitle,
} from "./StyledComponents";
import { FiX, FiZap } from "react-icons/fi";
import { BiMenu, BiShield } from "react-icons/bi";
import { FaArrowRight, FaStar } from "react-icons/fa6";

const ShowcasePage = () => {
  const { currentTheme } = useManageTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <Container>
      <Nav>
        <Logo>
          <FiZap size={24} />
          Brand
        </Logo>

        <MenuButton onClick={() => setMobileMenuOpen(true)}>
          <BiMenu size={24} />
        </MenuButton>

        <NavLinks>
          <NavLink href="#">Features</NavLink>
          <NavLink href="#">Pricing</NavLink>
          <NavLink href="#">About</NavLink>
          <NavLink href="#">Contact</NavLink>
        </NavLinks>
      </Nav>

      {mobileMenuOpen && (
        <MobileMenu>
          <MobileMenuHeader>
            <Logo>
              <FiZap size={24} />
              Brand
            </Logo>
            <MenuButton onClick={() => setMobileMenuOpen(false)}>
              <FiX size={24} />
            </MenuButton>
          </MobileMenuHeader>

          <MobileNavLinks>
            <NavLink href="#">Features</NavLink>
            <NavLink href="#">Pricing</NavLink>
            <NavLink href="#">About</NavLink>
            <NavLink href="#">Contact</NavLink>
          </MobileNavLinks>
        </MobileMenu>
      )}

      <Hero>
        <HeroHeader>
          <HeroTitle>Modern solutions for your growing business</HeroTitle>
          <Image src="https://picsum.photos/300/200" alt="Hero image" />
        </HeroHeader>
        <div>
          <HeroSubtitle>
            Our platform provides everything you need to scale your business,
            reach new customers, and achieve your goals with ease.
          </HeroSubtitle>
          <CTAButton>
            Get Started <FaArrowRight size={18} />
          </CTAButton>
        </div>
      </Hero>

      <Features>
        <FeaturesContainer>
          <SectionTitle>Why choose us?</SectionTitle>

          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>
                <FiZap size={32} />
              </FeatureIcon>
              <FeatureTitle>Lightning Fast</FeatureTitle>
              <FeatureDescription>
                Our platform is optimized for speed, ensuring your business
                operates efficiently at all times.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <BiShield size={32} />
              </FeatureIcon>
              <FeatureTitle>Secure & Reliable</FeatureTitle>
              <FeatureDescription>
                Enterprise-grade security with 99.9% uptime guarantee to keep
                your business running smoothly.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FaStar size={32} />
              </FeatureIcon>
              <FeatureTitle>Premium Support</FeatureTitle>
              <FeatureDescription>
                Our dedicated team is available 24/7 to help you solve any
                issues that may arise.
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </FeaturesContainer>
      </Features>

      <Footer>
        <p>© 2025 Brand. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

export default ShowcasePage;
