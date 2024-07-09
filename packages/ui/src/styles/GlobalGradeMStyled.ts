import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import './font/font.css';
import { GlobalRootStyle, GlobalStyle } from './GlobalRootStyled';

export const GlobalGradeMStyled = createGlobalStyle`
	${reset};
	${GlobalStyle}

  a{
    text-decoration: none;
    color: inherit;
		cursor: pointer;
		color : var(--color-grey-900);
  }

	input, button {
		margin : 0;
		padding : 0;

		border-radius: 0;
		border: 0;

		font-size: 28px;
		font-weight: var(--font-weight-medium);
		color : var(--color-grey-900);
	}

	button {
		background-color: transparent;
		cursor: pointer;
	}

	button[readonly], button[disabled],
	input[readonly], input[disabled] {
		cursor: default;
	}

	div {
		font-family: 'SUIT';
	}

  *{		
		font-family: 'SUIT';
    box-sizing: border-box;
  }

	body {
		font-size: 28px;
		font-weight: var(--font-weight-medium);
		color : var(--color-grey-900);
	}
	
	h1{
		font-weight: 600;
		font-size: 36px;
	}
	h2{
		font-weight: 500;
		font-size: 30px;
	}
	h3{
		font-weight: 600;
		font-size: 24px;
	}
	h4{
		font-weight: 500;
		font-size: 20px;
	}



	:root {	
		${GlobalRootStyle}
		--color-required : #EB6707; // required

		--color-m-en-default: #EB6707;
		--color-m-en-bg: #F2B75E;
		
		/* border-radius */
		--border-radius: 8px;
  }
`;

export default GlobalGradeMStyled;
