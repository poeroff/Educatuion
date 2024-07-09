import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import './font/font.css';
import { GlobalRootStyle, GlobalStyle } from './GlobalRootStyled';

export const GlobalGradeHMStyled = createGlobalStyle`
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
		font-weight: var(--font-weight-regular);
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
		font-weight: var(--font-weight-regular);
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

		/* font-family */
		--font-family-math-ex : "MJXTEX-I";
		
		/* header */
		--color-header-blue : #385CAA;
		--color-header-purple : #7F3394;
		--color-header-brown : #896539;

		/* highSchool Math */
		--color-h-math-difficulty : #F08437;

		--color-h-math-primary-normal : #38A39A;
		--color-h-math-primary-strong : #007067;
		--color-h-math-primary-origin : #49C0B6;

		--color-h-math-purple-gb : #FEEFEB;
		--color-h-math-purple-normal : #E54D90;
		--color-h-math-purple-strong : #7F3394;
		--color-h-math-purple-origin : #F287B6;

		--color-h-math-blue-gb : #EFF4F6;
		--color-h-math-blue-normal : #60CAE1;
		--color-h-math-blue-strong : #385CAA;

		--color-h-math-yellow-normal : #FABF14;
		--color-h-math-yellow-strong : #70522E;

		--color-h-math-border-normal : #D0D3D9;
		--color-h-math-border-strong : #B0B6C0;

		--color-h-math-submenu-divider : #AFB4DB;
		--color-h-math-submenu-text : #646DB4;
		--color-h-math-submenu-icon : #9CA1C9;



	  /* tag color */
		--color-tag-green-border: 1px solid #38A39A;
		--color-tag-green-background: #ffffff;
		--color-tag-green-color: #007067;


		/* border-radius */
		--border-radius: 8px;
  }
`;

export default GlobalGradeHMStyled;
