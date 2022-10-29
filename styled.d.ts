import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      darkBlue: string;
      blue: string;
      lightBlue: string;
      text: string;
      gray: string;
      red: string;
      green: string;
      yellow: string;
      lightGreen: string;
      lightRed: string;
    };
  }
}
