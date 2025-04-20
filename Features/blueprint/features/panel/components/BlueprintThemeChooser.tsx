"use client";

import {
  selectBlueprint,
  updateElement,
} from "@/Features/blueprint/slice/elementSlice";
import ThemeChooser from "@/Features/theme/components/themeChooser/ThemeChooser";
import useThemes from "@/Features/theme/hooks/useThemes";
import { TTheme } from "@/Features/theme/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { TBlueprint } from "../../blockManager/type";
import { applyStyles } from "../../styleManager/utils";
interface Props {
  onClose: () => void;
}
const BlueprintThemeChooser: React.FC<Props> = ({ onClose }) => {
  const { data, isError, isLoading, error } = useThemes();
  const blueprint = useAppSelector(selectBlueprint);
  const dispatch = useAppDispatch();
  const handleApplyTheme = (theme: TTheme) => {
    let tempElement: TBlueprint | null;
    try {
      tempElement = structuredClone(blueprint);
    } catch {
      tempElement = JSON.parse(JSON.stringify(blueprint));
    }
    if (theme.colorVars && tempElement) {
      tempElement = {
        ...tempElement,
        colorVars: theme.colorVars,
      };
    }
    if (theme.styles && tempElement) {
      const rel = applyStyles(tempElement, theme.styles);
    }
    if (tempElement) {
      dispatch(updateElement(tempElement));
    }
  };
  if (isLoading) return <div>Laoding...</div>;
  if (isError)
    return (
      <div>
        <p>{error?.message}</p>
      </div>
    );
  return (
    !isLoading &&
    !isError && (
      <>
        {data ? (
          <ThemeChooser
            themes={data}
            onApplyTheme={handleApplyTheme}
            onClose={onClose}
          />
        ) : (
          <div>No theme data.</div>
        )}
      </>
    )
  );
};

export default BlueprintThemeChooser;
