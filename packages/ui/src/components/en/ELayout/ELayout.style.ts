import styled from '@emotion/styled';
import { TLayoutBackColorTypes } from '@maidt-cntn/ui';

import blue from '@maidt-cntn/assets/background/ee_blue.png';
import pink from '@maidt-cntn/assets/background/ee_pink.png';
import brown from '@maidt-cntn/assets/background/ee_brown.png';
import yellow from '@maidt-cntn/assets/background/ee_yellow.png';
import green from '@maidt-cntn/assets/background/ee_green.png';

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

  export const BackColorSection = styled.div<{ color: TLayoutBackColorTypes }>`
    position: absolute;
    top: 0;
    width: 100%;
    height: 96px;
    z-index: 10;
    background: ${({ color }) => {
      switch (color) {
        case 'blue':
          return 'linear-gradient(180deg, #BCD7FF 0%, #F4F8FF 81.02%)';
        case 'green':
          return 'linear-gradient(180deg, #9DEDDF -10.42%, #FFF 100%)';
        case 'pink':
          return 'linear-gradient(180deg, #FCC6CC 0%, #FFF5F5 100%)';
        case 'yellow':
          return 'linear-gradient(180deg, #FFE199 0%, #FFFAEF 100%)';
        case 'purple':
          return 'linear-gradient(180deg, #E2D0F9 0%, #FFF 100%)';
        default:
          return 'transparent';
      }
    }};
  `;

  export const EEBackColorSection = styled.div<{ color: TLayoutBackColorTypes }>`
    position: absolute;
    top: 0;
    width: 100%;
    height: 96px;
    z-index: 10;
    ${({ color }) => {
      switch (color) {
        case 'blue':
          return `
            background: url('${blue}') left top no-repeat;
            height: 100%;
          `;
        case 'pink':
          return `
            background: url('${pink}') left top no-repeat;
            height: 100%;
          `;
        case 'brown':
          return `
          background: url('${brown}') left top no-repeat;
          height: 100%;
        `;
        case 'yellow':
          return `
            background: url('${yellow}') left top no-repeat;
            height: 100%;
          `;
        case 'green':
          return `
            background: url('${green}') left top no-repeat;
            height: 100%;
          `;
        default:
          return 'background: transparent;';
      }
    }}
  `;
}

export default StyleLayout;
