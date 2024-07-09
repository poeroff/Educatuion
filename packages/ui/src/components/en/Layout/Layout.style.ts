import styled from '@emotion/styled';
import { TLayoutBackColorTypes } from '@maidt-cntn/ui';

import pink from '@maidt-cntn/assets/background/pink.jpg';
import brown from '@maidt-cntn/assets/background/brown.jpg';
import yellow from '@maidt-cntn/assets/background/yellow.jpg';
import green from '@maidt-cntn/assets/background/green.jpg';
import blue from '@maidt-cntn/assets/background/blue.jpg';

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

  export const EBackColorSection = styled.div<{ color: TLayoutBackColorTypes }>`
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

  export const HEBackColorSection = styled.div<{ color: TLayoutBackColorTypes }>`
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
}

export default StyleLayout;
