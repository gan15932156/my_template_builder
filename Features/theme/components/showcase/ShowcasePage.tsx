"use client";

import { useState } from "react";
import useManageTheme from "../../hooks/useManageTheme";

import { ThemeProvider } from "styled-components";
import {
  Alert,
  Badge,
  Button,
  Code,
  ColorPreview,
  Header,
  PageContainer,
  Section,
  SectionTitle,
  Subtitle,
  TextExample,
  Title,
  UICard,
  UIElementsGrid,
  UITitle,
  VariableCard,
  VariableInfo,
  VariablePath,
  VariablesGrid,
  VariableValue,
} from "./StyledComponents";
import { ColorVar } from "@/Features/blueprint/features/blockManager/type";

type FlattenedTheme = Record<string, string>;

export const flattenTheme = (
  obj: Record<string, any>,
  prefix = ""
): FlattenedTheme => {
  return Object.keys(obj).reduce<FlattenedTheme>((acc, key) => {
    const value = obj[key];
    const pre = prefix ? `${prefix}.` : "";

    if (typeof value === "object" && value !== null) {
      Object.assign(acc, flattenTheme(value, `${pre}${key}`));
    } else {
      acc[`${pre}${key}`] = value;
    }

    return acc;
  }, {});
};
const ShowcasePage = () => {
  const { currentTheme, colorVars } = useManageTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  if (!colorVars) return;
  const flat = flattenTheme(colorVars);

  const isColor = (value: unknown): value is string => {
    return (
      typeof value === "string" &&
      (value.startsWith("#") || value.startsWith("rgb"))
    );
  };

  // Function to determine appropriate text color for a background
  const getContrastText = (path: string): string => {
    const parts = path.split(".");
    const section = parts[0] as keyof ColorVar;

    // Handle color groups with contrastText
    if (
      parts.length >= 2 &&
      colorVars &&
      section in colorVars &&
      "contrastText" in colorVars[section] &&
      typeof (colorVars[section] as any).contrastText === "string"
    ) {
      return (colorVars[section] as any).contrastText;
    }

    // Use text.primary for background
    if (colorVars && path.includes("background")) {
      return colorVars.text.primary;
    }

    // Fallback
    return "#FFFFFF";
  };
  return (
    <ThemeProvider theme={colorVars}>
      <PageContainer>
        <Header>
          <Title>Theme Variables Showcase</Title>
          <Subtitle>
            A comprehensive visualization of all theme variables and how they
            appear when applied to UI elements
          </Subtitle>
        </Header>

        <Section>
          <SectionTitle>All Theme Variables</SectionTitle>
          <VariablesGrid>
            {Object.entries(flat).map(([path, value]) => (
              <VariableCard key={path}>
                {isColor(value) ? (
                  <ColorPreview
                    $color={value}
                    $textColor={getContrastText(path)}
                  >
                    {path.split(".").pop()}
                  </ColorPreview>
                ) : (
                  <ColorPreview $color="#f5f5f5" $textColor="#333">
                    {path.split(".").pop()}
                  </ColorPreview>
                )}
                <VariableInfo>
                  <VariablePath>{path}</VariablePath>
                  <VariableValue>{value}</VariableValue>
                </VariableInfo>
              </VariableCard>
            ))}
          </VariablesGrid>
        </Section>

        <Section>
          <SectionTitle>UI Elements with Theme Variables</SectionTitle>
          <UIElementsGrid>
            {/* Buttons examples */}
            <UICard>
              <UITitle>Buttons</UITitle>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Button>Primary Button</Button>
                <Button
                  $color={colorVars.secondary.main}
                  $hoverColor={colorVars.secondary.dark}
                  $textColor={colorVars.secondary.contrastText}
                >
                  Secondary Button
                </Button>
                <Button
                  $color={colorVars.success.main}
                  $hoverColor={colorVars.success.dark}
                  $textColor={colorVars.success.contrastText}
                >
                  Success Button
                </Button>
                <Button
                  $color={colorVars.error.main}
                  $hoverColor={colorVars.error.dark}
                  $textColor={colorVars.error.contrastText}
                >
                  Error Button
                </Button>
                <Button
                  $color={colorVars.warning.main}
                  $hoverColor={colorVars.warning.dark}
                  $textColor={colorVars.warning.contrastText}
                >
                  Warning Button
                </Button>
                <Button
                  $color={colorVars.info.main}
                  $hoverColor={colorVars.info.dark}
                  $textColor={colorVars.info.contrastText}
                >
                  Info Button
                </Button>
              </div>
            </UICard>

            {/* Badges examples */}
            <UICard>
              <UITitle>Badges</UITitle>
              <div>
                <Badge>Primary</Badge>
                <Badge
                  $color={colorVars.secondary.main}
                  $textColor={colorVars.secondary.contrastText}
                >
                  Secondary
                </Badge>
                <Badge
                  $color={colorVars.success.main}
                  $textColor={colorVars.success.contrastText}
                >
                  Success
                </Badge>
                <Badge
                  $color={colorVars.error.main}
                  $textColor={colorVars.error.contrastText}
                >
                  Error
                </Badge>
                <Badge
                  $color={colorVars.warning.main}
                  $textColor={colorVars.warning.contrastText}
                >
                  Warning
                </Badge>
                <Badge
                  $color={colorVars.info.main}
                  $textColor={colorVars.info.contrastText}
                >
                  Info
                </Badge>
              </div>
            </UICard>

            {/* Text styles examples */}
            <UICard>
              <UITitle>Typography</UITitle>
              <TextExample $color={colorVars.text.primary}>
                Primary text - Used for main content and headings.
              </TextExample>
              <TextExample $color={colorVars.text.secondary}>
                Secondary text - Used for less important content.
              </TextExample>
              <TextExample $color={colorVars.text.disabled}>
                Disabled text - Used for inactive or disabled elements.
              </TextExample>
              <TextExample $color={colorVars.text.hint}>
                Hint text - Used for additional information and help text.
              </TextExample>
            </UICard>

            {/* Alerts examples */}
            <UICard>
              <UITitle>Alerts</UITitle>
              <Alert
                $bgColor={colorVars.primary.light}
                $textColor={colorVars.primary.dark}
                $borderColor={colorVars.primary.main}
              >
                Primary alert message
              </Alert>
              <Alert
                $bgColor={colorVars.secondary.light}
                $textColor={colorVars.secondary.dark}
                $borderColor={colorVars.secondary.main}
              >
                Secondary alert message
              </Alert>
              <Alert
                $bgColor={colorVars.success.light}
                $textColor={colorVars.success.dark}
                $borderColor={colorVars.success.main}
              >
                Success alert message
              </Alert>
              <Alert
                $bgColor={colorVars.error.light}
                $textColor={colorVars.error.dark}
                $borderColor={colorVars.error.main}
              >
                Error alert message
              </Alert>
            </UICard>
          </UIElementsGrid>
        </Section>
      </PageContainer>
    </ThemeProvider>
  );
};

export default ShowcasePage;
