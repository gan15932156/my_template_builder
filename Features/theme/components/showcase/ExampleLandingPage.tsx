"use client";

import { ThemeProvider } from "styled-components";
import useManageTheme from "../../hooks/useManageTheme";
import {
  FaHeadSideCoughSlash,
  FaPalette,
  FaRocket,
  FaStar,
} from "react-icons/fa6";
import { useEffect, useMemo } from "react";
import { parseStyles } from "./utils";
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
  const parsedStyles = useMemo(() => parseStyles(styles), [styles]);
  if (!colorVars) return;

  return (
    <ThemeProvider theme={colorVars}>
      <Page $baseStyle={null} $style={null}>
        {/* Navbar */}
        <Navbar
          $baseStyle={
            parsedStyles && parsedStyles.base ? parsedStyles.base : null
          }
          $style={parsedStyles && parsedStyles.box ? parsedStyles.box : null}
        >
          <Logo
            $baseStyle={
              parsedStyles && parsedStyles.base ? parsedStyles.base : null
            }
            $style={parsedStyles && parsedStyles.box ? parsedStyles.box : null}
          >
            ThemedUI
          </Logo>
          <NavLinks
            $baseStyle={
              parsedStyles && parsedStyles.base ? parsedStyles.base : null
            }
            $style={parsedStyles && parsedStyles.box ? parsedStyles.box : null}
          >
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#get-started">Get Started</a>
          </NavLinks>
        </Navbar>

        {/* Hero */}
        <HeroSection
          $baseStyle={
            parsedStyles && parsedStyles.base ? parsedStyles.base : null
          }
          $style={parsedStyles && parsedStyles.box ? parsedStyles.box : null}
        >
          <HeroTitle
            $baseStyle={
              parsedStyles && parsedStyles.base ? parsedStyles.base : null
            }
            $style={
              parsedStyles && parsedStyles.text ? parsedStyles.text : null
            }
          >
            Modern UI, Your Theme
          </HeroTitle>
          <HeroSubtitle
            $baseStyle={
              parsedStyles && parsedStyles.base ? parsedStyles.base : null
            }
            $style={
              parsedStyles && parsedStyles.text ? parsedStyles.text : null
            }
          >
            Build beautiful, customizable interfaces using your own theme
            system. React + styled-components = ❤️
          </HeroSubtitle>
          <CTAButton
            $baseStyle={
              parsedStyles && parsedStyles.base ? parsedStyles.base : null
            }
            $style={
              parsedStyles && parsedStyles.button ? parsedStyles.button : null
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
            $baseStyle={
              parsedStyles && parsedStyles.base ? parsedStyles.base : null
            }
            $style={parsedStyles && parsedStyles.box ? parsedStyles.box : null}
          >
            <FeatureCard
              $baseStyle={
                parsedStyles && parsedStyles.base ? parsedStyles.base : null
              }
              $style={
                parsedStyles && parsedStyles.box ? parsedStyles.box : null
              }
            >
              <IconBox
                $baseStyle={
                  parsedStyles && parsedStyles.base ? parsedStyles.base : null
                }
                $style={
                  parsedStyles && parsedStyles.box ? parsedStyles.box : null
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
              $baseStyle={
                parsedStyles && parsedStyles.base ? parsedStyles.base : null
              }
              $style={
                parsedStyles && parsedStyles.box ? parsedStyles.box : null
              }
            >
              <IconBox
                $baseStyle={
                  parsedStyles && parsedStyles.base ? parsedStyles.base : null
                }
                $style={
                  parsedStyles && parsedStyles.box ? parsedStyles.box : null
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
              $baseStyle={
                parsedStyles && parsedStyles.base ? parsedStyles.base : null
              }
              $style={
                parsedStyles && parsedStyles.box ? parsedStyles.box : null
              }
            >
              <IconBox
                $baseStyle={
                  parsedStyles && parsedStyles.base ? parsedStyles.base : null
                }
                $style={
                  parsedStyles && parsedStyles.box ? parsedStyles.box : null
                }
              >
                <FaHeadSideCoughSlash />
              </IconBox>
              <h3>Built with React</h3>
              <p>Composable, typed, and scalable. Perfect for modern devs.</p>
            </FeatureCard>
            <FeatureCard
              $baseStyle={
                parsedStyles && parsedStyles.base ? parsedStyles.base : null
              }
              $style={
                parsedStyles && parsedStyles.box ? parsedStyles.box : null
              }
            >
              <IconBox
                $baseStyle={
                  parsedStyles && parsedStyles.base ? parsedStyles.base : null
                }
                $style={
                  parsedStyles && parsedStyles.box ? parsedStyles.box : null
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
            $baseStyle={
              parsedStyles && parsedStyles.base ? parsedStyles.base : null
            }
            $style={parsedStyles && parsedStyles.box ? parsedStyles.box : null}
          >
            <TestimonialCard
              $baseStyle={
                parsedStyles && parsedStyles.base ? parsedStyles.base : null
              }
              $style={
                parsedStyles && parsedStyles.box ? parsedStyles.box : null
              }
            >
              “This saved me hours! The theme integration is seamless and the
              layout is stunning.”
            </TestimonialCard>
            <TestimonialCard
              $baseStyle={
                parsedStyles && parsedStyles.base ? parsedStyles.base : null
              }
              $style={
                parsedStyles && parsedStyles.box ? parsedStyles.box : null
              }
            >
              “Perfect for showcasing my design system. Everything just works.”
            </TestimonialCard>
            <TestimonialCard
              $baseStyle={
                parsedStyles && parsedStyles.base ? parsedStyles.base : null
              }
              $style={
                parsedStyles && parsedStyles.box ? parsedStyles.box : null
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
          $baseStyle={
            parsedStyles && parsedStyles.base ? parsedStyles.base : null
          }
          $style={parsedStyles && parsedStyles.box ? parsedStyles.box : null}
        >
          <CTAButton
            $baseStyle={
              parsedStyles && parsedStyles.base ? parsedStyles.base : null
            }
            $style={
              parsedStyles && parsedStyles.button ? parsedStyles.button : null
            }
          >
            Start Your Journey Now
          </CTAButton>
        </CTASection>

        {/* Footer */}
        <FooterContainer
          $baseStyle={
            parsedStyles && parsedStyles.base ? parsedStyles.base : null
          }
          $style={parsedStyles && parsedStyles.box ? parsedStyles.box : null}
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
