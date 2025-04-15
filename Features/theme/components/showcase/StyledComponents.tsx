import styled from "styled-components";
export const PageContainer = styled.div`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${(props) => props.theme.background.default};
  color: ${(props) => props.theme.text.primary};
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.primary.main};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.p`
  color: ${(props) => props.theme.text.secondary};
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
`;

export const Section = styled.section`
  margin-bottom: 3rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.text.primary};
  border-bottom: 1px solid ${(props) => props.theme.divider.divider};
  padding-bottom: 0.5rem;
`;

// Components for variable display
export const VariablesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const VariableCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const ColorPreview = styled.div<{ $textColor: string; $color: string }>`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$color};
  color: ${(props) => props.$textColor || "#FFFFFF"};
  font-weight: 600;
  font-size: 1.1rem;
`;

export const VariableInfo = styled.div`
  padding: 1rem;
  background-color: ${(props) => props.theme.background.default};
`;

export const VariablePath = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.text.primary};
`;

export const VariableValue = styled.div`
  font-family: monospace;
  padding: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 0.9rem;
`;

// Example UI elements using theme variables
export const UIElementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

export const UICard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.background.default};
  padding: 1.5rem;
`;

export const UITitle = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 1rem;
  color: ${(props) => props.theme.text.primary};
`;

export const Button = styled.button<{
  $textColor?: string;
  $color?: string;
  $hoverColor?: string;
}>`
  background-color: ${(props) => props.$color || props.theme.primary.main};
  color: ${(props) => props.$textColor || props.theme.primary.contrastText};
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$hoverColor || props.theme.primary.dark};
  }
`;

export const Badge = styled.span<{
  $textColor?: string;
  $color?: string;
}>`
  background-color: ${(props) => props.$color || props.theme.primary.main};
  color: ${(props) => props.$textColor || props.theme.primary.contrastText};
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const TextExample = styled.p<{
  $color?: string;
}>`
  color: ${(props) => props.$color};
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

export const Alert = styled.div<{
  $textColor?: string;
  $bgColor?: string;
  $borderColor?: string;
}>`
  background-color: ${(props) => props.$bgColor || props.theme.primary.light};
  color: ${(props) => props.$textColor || props.theme.primary.dark};
  border-left: 4px solid
    ${(props) => props.$borderColor || props.theme.primary.main};
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export const Code = styled.pre`
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-family: monospace;
  font-size: 0.9rem;
  margin: 1rem 0;
`;
