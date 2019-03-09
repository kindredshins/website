import { createGlobalStyle } from 'styled-components';
import { scrollbar } from '@/styles/mixins';
import { theme } from '@/styles/theme';

export const GlobalStyle = createGlobalStyle`
	html, body, #__next {
		height: 100%;
	}

	body {
		${scrollbar};
		background: ${theme.background};
		color: ${theme.foreground};
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	*,
	*:before,
	*:after {
		box-sizing: border-box;
  }

	fieldset {
		border: 0;
		padding: 0;
		margin: 0;
		min-width: 0;
	}

	input,
	button,
	select,
	textarea {
    font: inherit;
    color: inherit;
		border-radius: 0;
  }
`;
