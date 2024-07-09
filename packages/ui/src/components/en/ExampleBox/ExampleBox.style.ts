import styled from '@emotion/styled';

namespace StyleLayout {
  export const Container = styled.div`
    position: relative;
  `;

  export const ContentBox = styled.div<{ color: string }>`
    padding: 20px 14px;
    background: ${({ color }) => {
      switch (color) {
        case 'purple':
          return '#EEDAEA';
        case 'blue':
          return '#BCD7FF';
        case 'green':
          return '#E2F4DD';
        case 'yellow':
          return '#FFF0CC';
        case 'emerald':
          return '#E0F0F2';
        case 'pink':
          return '#FDE1E1';
      }
    }};
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
  `;

  export const TitleBox = styled.div<{ color: string }>`
    width: max-content;
    padding: 5px 20px;
    color: #fff;
    font-size: 16px;
    line-height: 25.23px;
    font-weight: var(--font-weight-bold);
    background-color: ${({ color }) => {
      switch (color) {
        case 'purple':
          return '#AA54A1';
        case 'blue':
          return '#124899';
        case 'green':
          return '#00A42E';
        case 'yellow':
          return '#CF8900';
        case 'emerald':
          return '#77C1BF';
        case 'pink':
          return '#F06E6E';
      }
    }};
    position: absolute;
    z-index: 1;
    left: 0;
    top: -13px;
  `;
}

export default StyleLayout;
