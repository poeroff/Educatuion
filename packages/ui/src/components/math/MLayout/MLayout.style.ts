import styled from '@emotion/styled';

import pink from '@maidt-cntn/assets/background/pink.jpg';
import brown from '@maidt-cntn/assets/background/brown.jpg';
import yellow from '@maidt-cntn/assets/background/yellow.jpg';
import green from '@maidt-cntn/assets/background/green.jpg';
import blue from '@maidt-cntn/assets/background/blue.jpg';
import { TMMLayoutBackColorTypes } from './MLayout';

export interface IRadioStyle {
  align?: 'horizontal' | 'vertical';
  gap?: number;
}

namespace StyleLayout {
  export const LayoutContainer = styled.div<{ backColor: string }>`
    width: 1080px;
    height: 608px;
    z-index: 0;
    background-color: ${({ backColor }) => backColor};
    position: relative;
  `;

  export const ContentsContainer = styled.div`
    padding-right: 8px;
    width: 100%;
    height: 100%;
    z-index: 20;
    position: relative;
    display: flex;
    flex-direction: column;
  `;

  export const HeaderContainer = styled.header`
    width: 100%;
    padding: 0 34px 0 42px;

    display: flex;
    justify-content: space-between;
  `;

  export const HeaderRightIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `;

  export const MBackColorSection = styled.div<{ color: TMMLayoutBackColorTypes }>`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -10;

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

  export const MMBackColorSection = styled.div<{ color: TMMLayoutBackColorTypes }>`
    position: absolute;
    top: 0;
    width: 100%;
    height: 96px;
    z-index: -10;

    ${({ color }) => {
      switch (color) {
        case 'orange':
          return 'background: linear-gradient(180deg, #FFE9C7 0%, #FFFFFF 100%)';
        case 'green':
          return 'background: linear-gradient(180deg, #D7F4DA 0%, #FFFFFF 100%)';
        case 'yellow':
          return 'background: linear-gradient(180deg, #FFF2C6 0%, #FFFFFF 100%)';
        case 'blue':
          return 'background: linear-gradient(180deg, #D9EBFF 0%, #FFFFFF 100%)';
        case 'beige':
          return 'background: linear-gradient(180deg, #F3E8D7 0%, #FFFFFF 100%)';
        case 'purple':
          return 'background: linear-gradient(180deg, #F1E8FF 0%, #FFFFFF 100%)';
        default:
          return `background: ${color};
                height: 100%;
                `;
      }
    }}
  `;
}

export default StyleLayout;
