import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { scrollbar } from '@/styles/mixins';
import { theme } from '@/styles/theme';

export const GlobalStyle = createGlobalStyle`
	${normalize()};

	body {
		${scrollbar};
		background: ${theme.background};
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
  }
`;
