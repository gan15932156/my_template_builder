"use client";
import chroma from "chroma-js";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 10rem;
  margin-inline: auto;
  text-align: center;
`;
const Colors = styled.div`
  display: grid;
  place-content: center;
`;
const TestPage = () => {
  return (
    <Wrapper>
      <ColorPaletteGenerator />
    </Wrapper>
  );
};
// https://codesandbox.io/p/sandbox/contrast-check-with-relative-luminosity-unlimited-vg1if?file=%2Fsrc%2Findex.js
export default TestPage;

const ColorPaletteGenerator = () => {
  const [palette, setPalette] = useState<string[]>([]);

  const generateRandomPalette = () => {
    const baseColor = chroma.random();
    const newPalette = chroma
      .scale([baseColor, baseColor.set("hsl.h", "+90")])
      .mode("lch")
      .colors(6);
    setPalette(newPalette);
  };

  const generateColorTheoryPalette = (
    type: "complementary" | "analogous" | "triadic" | "tetradic"
  ) => {
    const baseColor = chroma.random();
    let newPalette: string[] = [];

    switch (type) {
      case "complementary":
        newPalette = [baseColor.hex(), baseColor.set("hsl.h", "+180").hex()];
        break;
      case "analogous":
        // newPalette = baseColor.analogous().map((color) => color.hex());
        break;
      case "triadic":
        newPalette = [
          baseColor.hex(),
          baseColor.set("hsl.h", "+120").hex(),
          baseColor.set("hsl.h", "-120").hex(),
        ];
        break;
      case "tetradic":
        newPalette = [
          baseColor.hex(),
          baseColor.set("hsl.h", "+90").hex(),
          baseColor.set("hsl.h", "+180").hex(),
          baseColor.set("hsl.h", "+270").hex(),
        ];
        break;
    }
    setPalette(newPalette);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex gap-2">
        <button onClick={generateRandomPalette}>Random Palette</button>
        <button onClick={() => generateColorTheoryPalette("complementary")}>
          Complementary
        </button>
        <button onClick={() => generateColorTheoryPalette("analogous")}>
          Analogous
        </button>
        <button onClick={() => generateColorTheoryPalette("triadic")}>
          Triadic
        </button>
        <button onClick={() => generateColorTheoryPalette("tetradic")}>
          Tetradic
        </button>
      </div>
      <Colors>
        {palette.map((color, index) => (
          <div key={index} style={{ backgroundColor: color, height: "2rem" }}>
            {color}
          </div>
        ))}
      </Colors>
    </div>
  );
};
