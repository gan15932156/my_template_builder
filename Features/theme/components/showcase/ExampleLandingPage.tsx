"use client";

import { ThemeProvider } from "styled-components";
import useManageTheme from "../../hooks/useManageTheme";
import {
  FaHeadSideCoughSlash,
  FaPalette,
  FaRocket,
  FaStar,
} from "react-icons/fa6";
import { parseStyles2 } from "./utils";
import {
  Center,
  CTAButton,
  CTASection,
  FeatureCard,
  FeaturesGrid,
  FooterContainer,
  HeroSection,
  HeroSubtitle,
  HeroTitle,
  IconBox,
  Logo,
  Navbar,
  NavLinks,
  Page,
  TestimonialCard,
  TestimonialsGrid,
} from "./StyledComponentExampleLandingPage";
import { Section } from "./StyledComponents";

const ExampleLandingPage = () => {
  const { colorVars, styles } = useManageTheme();

  if (!colorVars) return;

  return (
    <ThemeProvider theme={colorVars}>
      <Page
        $style={
          styles ? parseStyles2(styles, { tag: "div", type: "box" }) : null
        }
      >
        {/* Navbar */}
        <Navbar
          $style={
            styles ? parseStyles2(styles, { tag: "nav", type: "box" }) : null
          }
        >
          <Logo
            $style={
              styles ? parseStyles2(styles, { tag: "h1", type: "text" }) : null
            }
          >
            ThemedUI
          </Logo>
          <NavLinks
            $style={
              styles ? parseStyles2(styles, { tag: "div", type: "box" }) : null
            }
          >
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#get-started">Get Started</a>
          </NavLinks>
        </Navbar>

        {/* Hero */}
        <HeroSection
          $style={
            styles ? parseStyles2(styles, { tag: "div", type: "box" }) : null
          }
        >
          <HeroTitle
            $style={
              styles ? parseStyles2(styles, { tag: "h1", type: "text" }) : null
            }
          >
            Modern UI, Your Theme
          </HeroTitle>
          <HeroSubtitle
            $style={
              styles ? parseStyles2(styles, { tag: "p", type: "text" }) : null
            }
          >
            Build beautiful, customizable interfaces using your own theme
            system. React + styled-components = ❤️
          </HeroSubtitle>
          <CTAButton
            $style={
              styles
                ? parseStyles2(styles, { tag: "base", type: "button" })
                : null
            }
          >
            Explore Now
          </CTAButton>
        </HeroSection>

        {/* Features */}
        <Section id="features">
          <Center>
            <h2 style={{ marginBottom: "2rem" }}>Why Choose Us</h2>
          </Center>
          <FeaturesGrid
            $style={
              styles ? parseStyles2(styles, { tag: "div", type: "box" }) : null
            }
          >
            <FeatureCard
              $style={
                styles
                  ? parseStyles2(styles, { tag: "div", type: "box" })
                  : null
              }
            >
              <IconBox
                $style={
                  styles
                    ? parseStyles2(styles, { tag: "div", type: "box" })
                    : null
                }
              >
                <FaRocket />
              </IconBox>
              <h3>Fast Setup</h3>
              <p>
                Plug and play in seconds. Just load your theme and start coding!
              </p>
            </FeatureCard>
            <FeatureCard
              $style={
                styles
                  ? parseStyles2(styles, { tag: "div", type: "box" })
                  : null
              }
            >
              <IconBox
                $style={
                  styles
                    ? parseStyles2(styles, { tag: "div", type: "box" })
                    : null
                }
              >
                <FaPalette />
              </IconBox>
              <h3>Fully Themed</h3>
              <p>
                Your colors, your vibe. Every component respects your palette.
              </p>
            </FeatureCard>
            <FeatureCard
              $style={
                styles
                  ? parseStyles2(styles, { tag: "div", type: "box" })
                  : null
              }
            >
              <IconBox
                $style={
                  styles
                    ? parseStyles2(styles, { tag: "div", type: "box" })
                    : null
                }
              >
                <FaHeadSideCoughSlash />
              </IconBox>
              <h3>Built with React</h3>
              <p>Composable, typed, and scalable. Perfect for modern devs.</p>
            </FeatureCard>
            <FeatureCard
              $style={
                styles
                  ? parseStyles2(styles, { tag: "div", type: "box" })
                  : null
              }
            >
              <IconBox
                $style={
                  styles
                    ? parseStyles2(styles, { tag: "div", type: "box" })
                    : null
                }
              >
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
          <TestimonialsGrid
            $style={
              styles ? parseStyles2(styles, { tag: "div", type: "box" }) : null
            }
          >
            <TestimonialCard
              $style={
                styles
                  ? parseStyles2(styles, { tag: "div", type: "box" })
                  : null
              }
            >
              “This saved me hours! The theme integration is seamless and the
              layout is stunning.”
            </TestimonialCard>
            <TestimonialCard
              $style={
                styles
                  ? parseStyles2(styles, { tag: "div", type: "box" })
                  : null
              }
            >
              “Perfect for showcasing my design system. Everything just works.”
            </TestimonialCard>
            <TestimonialCard
              $style={
                styles
                  ? parseStyles2(styles, { tag: "div", type: "box" })
                  : null
              }
            >
              “Love how easy it is to drop into any React app. Theme support is
              🔥.”
            </TestimonialCard>
          </TestimonialsGrid>
        </Section>

        {/* CTA */}
        <CTASection
          id="get-started"
          $style={
            styles
              ? parseStyles2(styles, { tag: "section", type: "box" })
              : null
          }
        >
          <CTAButton
            $style={
              styles
                ? parseStyles2(styles, { tag: "base", type: "button" })
                : null
            }
          >
            Start Your Journey Now
          </CTAButton>
        </CTASection>

        {/* Footer */}
        <FooterContainer
          $style={
            styles ? parseStyles2(styles, { tag: "footer", type: "box" }) : null
          }
        >
          <div>
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#get-started">Get Started</a>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} ThemedUI. Made with ❤️ using
            styled-components.
          </div>
        </FooterContainer>
      </Page>
    </ThemeProvider>
  );
};

export default ExampleLandingPage;
