"use client";

import styled, { css } from "styled-components";

// Theme-aware styling
export const Page = styled.div<{
  $style: Record<string, any> | null;
}>`
  background: ${({ theme }) => theme.background.default};
  color: ${({ theme }) => theme.text.primary};
  font-family: "Segoe UI", sans-serif;

  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
`;

// Navbar
export const Navbar = styled.nav<{
  $style: Record<string, any> | null;
}>`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.primary.main};
  color: ${({ theme }) => theme.primary.contrastText};
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
`;

export const Logo = styled.h1<{
  $style: Record<string, any> | null;
}>`
  font-size: 1.5rem;
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
`;

export const NavLinks = styled.div<{
  $style: Record<string, any> | null;
}>`
  display: flex;
  gap: 1.5rem;
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }

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
export const Section = styled.section<{
  $style: Record<string, any> | null;
}>`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
`;

export const Center = styled.div`
  text-align: center;
`;
export const HeroSection = styled.div<{
  $style: Record<string, any> | null;
}>`
  padding-block-start: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
`;
// Hero
export const HeroTitle = styled.h1<{
  $style: Record<string, any> | null;
}>`
  font-size: 3rem;
  color: ${({ theme }) => theme.primary.main};
  margin-bottom: 1rem;
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
`;

export const HeroSubtitle = styled.p<{
  $style: Record<string, any> | null;
}>`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: 2rem;
  max-width: 60ch;
  margin: auto;
  text-align: center;
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
`;

export const CTAButton = styled.button<{
  $style: Record<string, any> | null;
}>`
  background-color: ${({ theme }) => theme.secondary.main};
  color: ${({ theme }) => theme.secondary.contrastText};
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }

  &:hover {
    background-color: ${({ theme }) => theme.secondary.dark};
  }
`;

// Features
export const FeaturesGrid = styled.div<{
  $style: Record<string, any> | null;
}>`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
`;

export const FeatureCard = styled.div<{
  $style: Record<string, any> | null;
}>`
  background: ${({ theme }) => theme.primary.light};
  color: ${({ theme }) => theme.primary.contrastText};
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  transition: transform 0.3s ease;
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
  &:hover {
    transform: translateY(-5px);
  }
`;

export const IconBox = styled.div<{
  $style: Record<string, any> | null;
}>`
  font-size: 2rem;
  margin-bottom: 1rem;
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
`;

// Testimonials
export const TestimonialsGrid = styled.div<{
  $style: Record<string, any> | null;
}>`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
`;

export const TestimonialCard = styled.div<{
  $style: Record<string, any> | null;
}>`
  background: ${({ theme }) => theme.info.light};
  color: ${({ theme }) => theme.info.contrastText};
  padding: 2rem;
  border-radius: 12px;
  max-width: 300px;
  font-size: 0.95rem;
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
`;

// CTA section
export const CTASection = styled(Section)<{
  $style: Record<string, any> | null;
}>`
  background-color: ${({ theme }) => theme.primary.light};
  color: ${({ theme }) => theme.primary.contrastText};
  border-radius: 24px;
  text-align: center;
  margin-bottom: 2rem;
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
`;

export const Footer = styled.footer<{
  $style: Record<string, any> | null;
}>`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.text.hint};
  font-size: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.divider.divider};
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
`;
export const FooterContainer = styled.footer<{
  $style: Record<string, any> | null;
}>`
  padding: 3rem 2rem;
  background-color: ${({ theme }) => theme.primary.dark};
  color: ${({ theme }) => theme.primary.contrastText};
  text-align: center;
  font-size: 0.95rem;
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
  }
  a {
    color: ${({ theme }) => theme.primary.contrastText};
    margin: 0 1rem;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.divider.divider};
    margin: 1.5rem auto;
    width: 80%;
  }

  .footer-bottom {
    margin-top: 1rem;
    color: ${({ theme }) => theme.text.disabled};
    font-size: 0.85rem;
  }
`;
