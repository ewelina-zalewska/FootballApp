import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0 auto;
  max-width: 1200px;
  background-color: ${(props) => props.theme.colors.bodyColors};
  color: #d1ccc3; 
}

* {
	scrollbar-width: thin;
	scrollbar-color:${(props) => props.theme.colors.primary} ${(props) => props.theme.colors.bodyColors};;
}
  `;
