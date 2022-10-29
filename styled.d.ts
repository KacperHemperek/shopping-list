import "styled-components/native";
import { Colors } from "./src/interface/Colors";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: Colors;
  }
}
