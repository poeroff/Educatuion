import styled from '@emotion/styled';
import { TLayoutBackColorTypes } from '@maidt-cntn/ui';

import pink from '@maidt-cntn/assets/background/pink.jpg';
import brown from '@maidt-cntn/assets/background/brown.jpg';
import yellow from '@maidt-cntn/assets/background/yellow.jpg';
import green from '@maidt-cntn/assets/background/green.jpg';
import blue from '@maidt-cntn/assets/background/blue.jpg';
import imgBlue from '@maidt-cntn/assets/background/img_blue.png';
import imgPink from '@maidt-cntn/assets/background/img_pink.png';
import imgYellow from '@maidt-cntn/assets/background/img_yellow.jpg';
import mathIndex from '@maidt-cntn/assets/background/math_index.jpg';
import mathIntro from '@maidt-cntn/assets/background/math_intro.svg';
import mathThumb from '@maidt-cntn/assets/background/math_thumb.jpg';
import mathQuiz from '@maidt-cntn/assets/background/math_quiz.svg';
import mathWaveBlue from '@maidt-cntn/assets/background/math_wave_blue.jpg';

export interface IRadioStyle {
  align?: 'horizontal' | 'vertical';
  gap?: number;
}

namespace StyleLayout {
  export const LayoutContainer = styled.div`
    width: 1080px;
    height: 608px;
    z-index: 0;
    background-color: var(--color-white);
    position: relative;
  `;

  export const ContentsContainer = styled.div`
    padding: 0 40px;
    width: 100%;
    height: 100%;
    z-index: 20;
    position: relative;
    display: flex;
    flex-direction: column;
  `;

  export const MBackColorSection = styled.div<{ color: TLayoutBackColorTypes }>`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: ${({ color }) => {
      switch (color) {
        case 'blue':
          return `url('${blue}') 100% 100% no-repeat`;
        case 'green':
          return `url('${green}') 100% 100% no-repeat`;
        case 'pink':
          return `url('${pink}') 100% 100% no-repeat`;
        case 'yellow':
          return `url('${yellow}') 100% 100% no-repeat`;
        case 'brown':
          return `url('${brown}') 100% 100% no-repeat`;
        default:
          return 'transparent';
      }
    }};
  `;

  export const MMBackColorSection = styled.div<{ color: TLayoutBackColorTypes }>`
    position: absolute;
    top: 0;
    width: 100%;
    height: 96px;
    z-index: 10;
    background: ${({ color }) => {
      switch (color) {
        case 'blue':
          return 'linear-gradient(180deg, #BCD4F1 0%, #FFF 81.02%)';
        case 'green':
          return 'linear-gradient(180deg, #9DEDDF -10.42%, #FFF 100%)';
        case 'pink':
          return 'linear-gradient(180deg, #ECB3E3 0%, #FFF 100%)';
        case 'yellow':
          return 'linear-gradient(180deg, #EDD79D 0%, #FFF 100%)';
        case 'purple':
          return 'linear-gradient(180deg, #E2D0F9 0%, #FFF 100%)';
        default:
          return 'transparent';
      }
    }};
  `;

  export const HMBackColorSection = styled.div<{ color: TLayoutBackColorTypes }>`
    position: absolute;
    top: 0;
    width: 100%;
    height: 96px;
    z-index: 10;
    ${({ color }) => {
      switch (color) {
        case 'blue':
          return 'background: linear-gradient(180deg, #DDFFFD 0%, #FFF 81.02%);';
        case 'pink':
          return 'background: linear-gradient(180deg, #FFDAEA 0%, #FFF 100%);';
        case 'orange':
          return 'background: linear-gradient(180deg, #FFE6D4 0%, #FFF 100%);';
        case 'img_blue':
          return `
            background: url('${imgBlue}') left top no-repeat #EFF4F6;
            background-size: 100% auto;
            height: 100%;
          `;
        case 'img_pink':
          return `
            background: url('${imgPink}') left top no-repeat #FEEFEB;
            background-size: 100% auto;
            height: 100%;
          `;
        case 'img_yellow':
          return `
            background: url('${imgYellow}') left top no-repeat #FEEFEB;
            background-size: 100% auto;
            height: 100%;
          `;
        case 'math_index':
          return `
            background: url('${mathIndex}') left -2px top no-repeat;
            background-size: auto 100%;
            height: 100%;
          `;
        case 'math_intro':
          return `
            background: url('${mathIntro}') left -5px top -5px no-repeat;
            background-size: 110% auto;
            height: 200px;
          `;
        case 'math_thumb':
          return `
            background: url('${mathThumb}') left top no-repeat #49C0B6;
            background-size: 100% auto;
            height: 100%;
          `;
        case 'math_quiz':
          return `
            background: url('${mathQuiz}') left top no-repeat #49C0B6;
            background-size: 100% auto;
            height: 100%;
          `;
        case 'math_wave_blue':
          return `
            background: url('${mathWaveBlue}') left top no-repeat #49C0B6;
            background-size: 100% auto;
            height: 100%;
          `;
        default:
          return 'background: transparent;';
      }
    }}
  `;
}

export default StyleLayout;
