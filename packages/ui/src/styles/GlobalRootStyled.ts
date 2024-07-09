export const GlobalStyle = `
  #root {
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }
`;

export const GlobalRootStyle = `

  /* font-family */
	--font-family-math-ex: 'SUIT';

  --font-SUIT : "SUIT";
  --font-NOTO : "NOTO";

  --color-white : #ffffff; // fixed
  --color-black : #000000; // fixed

  /* grey color */
  --color-grey-50 : #F9F9FA;
  --color-grey-100 : #EFF0F2;
  --color-grey-200 : #E0E2E6;
  --color-grey-300 : #D0D3D9;
  --color-grey-400 : #C0C5CC;
  --color-grey-500 : #B0B6C0;
  --color-grey-600 : #8D9299;
  --color-grey-700 : #6A6D73;
  --color-grey-800 : #47494D;
  --color-grey-900 : #232426;


  /* blue-primary color */
  --color-blue-50 : #F4F8FF;
  --color-blue-100 : #E2F2FF;
  --color-blue-200 : #BADDFF;
  --color-blue-300 : #75C2FF;
  --color-blue-400 : #37ACFF;
  --color-blue-500 : #1E78FF;
  --color-blue-600 : #0682FF;
  --color-blue-700 : #1E6EFA;
  --color-blue-800 : #275CE7;
  --color-blue-900 : #2F38C7;

  --color-blue-1000 : #d0edf5;
  --color-blue-1100 : #0091FF;
  --color-blue-1200: #2294B4;

  /* yellow sub color */
  --color-yellow-50 : #FFFAEF;
  --color-yellow-100 : #FFF0CC;
  --color-yellow-200 : #FFE199;
  --color-yellow-300 :#FFD266;
  --color-yellow-400 : #FFC333;
  --color-yellow-500 : #FFB400;
  --color-yellow-600 : #CF8900;
  --color-yellow-700 : #996500;
  --color-yellow-800 : #664300;
  --color-yellow-900 : #332400;


  /* orange sub color */
  --color-orange-100 : #FCC187;
  --color-orange-200 : #F8CBAD;


  /* green sub color */
  --color-green-50 : #E5F4EA;
  --color-green-100 :#C0E4CB;
  --color-green-200 : #98D3AA;
  --color-green-300 :#6DC389;
  --color-green-400 : #4AB670;
  --color-green-500 : #1EAA58;
  --color-green-600 : #149B4E;
  --color-green-700 : #058943;
  --color-green-800 : #007637;
  --color-green-900 : #00593E;
  --color-green-1000: #C5E0B4;


  /* pink sub color */
  --color-pink-50 : #FFF6F8;
  --color-pink-100 : #FFECF1;
  --color-pink-200 : #FCC6CC;
  --color-pink-300 : #FBA9B3;
  --color-pink-400 : #FF828C;
  --color-pink-500 : #FE5663;
  --color-pink-600 : #FF3B4B;
  --color-pink-700 : #E71C2C;
  --color-pink-800 : #CD1423;
  --color-pink-900 : #990E19;
  --color-pink-1000 : #D78C91;
  --color-pink-1050 : #F0D4D3;

  /* red sub color */
  --color-red-50 : #FFF4F3;
  --color-red-100 : #FDE8E6;
  --color-red-200 : #FFC9BA;
  --color-red-300: #FFA68D;
  --color-red-400: #FF815F;
  --color-red-500: #FF623C;
  --color-red-600: #FF3914;
  --color-red-700: #EB1807;
  --color-red-800 : #C11D00;
  --color-red-900 : #981700;

  /* purple sub color */
  --color-purple-50 : #F6EEFF;
  --color-purple-100 : #E8D5FF;
  --color-purple-200 : #DCC3FE;
  --color-purple-300 : #C59BFF;
  --color-purple-400 : #AC6EFF;
  --color-purple-500 : #9747FF;
  --color-purple-600 : #800EFD;
  --color-purple-700 : #7404F6;
  --color-purple-800 : #6200EE;
  --color-purple-900 : #4F00E9;
  --color-purple-1000 : #646DB4; 


  /* Decided Color In Figma  */
  --Material-Dimmer : rgba(23, 23, 25, 0.52);


  /* drop shadow */
  --dp-1 : 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px 0px rgba(0, 0, 0, 0.12), 0px 1px 3px 0px rgba(0, 0, 0, 0.20);
  --dp-2 : 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px 0px rgba(0, 0, 0, 0.12), 0px 1px 5px 0px rgba(0, 0, 0, 0.20);
  --dp-3 : 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px 0px rgba(0, 0, 0, 0.12), 0px 1px 8px 0px rgba(0, 0, 0, 0.20);
  --dp-4 : 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px 0px rgba(0, 0, 0, 0.20);
  --dp-6 :0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12), 0px 3px 5px 0px rgba(0, 0, 0, 0.20);
  --dp-8 :0px 8px 10px 0px rgba(0, 0, 0, 0.14), 0px 3px 14px 0px rgba(0, 0, 0, 0.12), 0px 5px 5px 0px rgba(0, 0, 0, 0.20);
  --dp-9 : 0px 9px 12px 0px rgba(0, 0, 0, 0.14), 0px 3px 16px 0px rgba(0, 0, 0, 0.12), 0px 5px 6px 0px rgba(0, 0, 0, 0.20);
  --dp-12 :0px 12px 17px 0px rgba(0, 0, 0, 0.14), 0px 5px 22px 0px rgba(0, 0, 0, 0.12), 0px 7px 8px 0px rgba(0, 0, 0, 0.20);
  --dp-16 :0px 16px 24px 0px rgba(0, 0, 0, 0.14), 0px 6px 30px 0px rgba(0, 0, 0, 0.12), 0px 8px 10px 0px rgba(0, 0, 0, 0.20);
  --dp-24 :0px 24px 38px 0px rgba(0, 0, 0, 0.14), 0px 9px 46px 0px rgba(0, 0, 0, 0.12), 0px 11px 15px 0px rgba(0, 0, 0, 0.20);

  /* font-weight */

  --font-weight-extraBold: 800;
  --font-weight-bold: 700;
  --font-weight-semiBold: 600;
  --font-weight-medium: 500;
  --font-weight-regular: 400;

  /* font-size */

  --font-size-10: 10px;
  --font-size-12: 12px;
  --font-size-13: 13px;
  --font-size-14: 14px;
  --font-size-15: 15px;
  --font-size-16: 16px;
  --font-size-18: 18px;
  --font-size-20: 20px;
  --font-size-22: 22px;
  --font-size-24: 24px;
  --font-size-26: 26px;
  --font-size-27: 27px;
  --font-size-28: 28px;
  --font-size-30: 30px;
  --font-size-32: 32px;
  --font-size-34: 34px;
  --font-size-36: 36px;
  --font-size-40: 40px;
  --font-size-52: 52px;


  
  /* tag color */
  --color-tag-green-border: 2px solid #1eaa58;
  --color-tag-green-background: #e5f4ea;
  --color-tag-green-color: #149b4e;
`;
