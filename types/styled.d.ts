// import original module declarations
import { ColorVar } from "@/Features/blueprint/features/blockManager/type";
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends ColorVar {}
}
