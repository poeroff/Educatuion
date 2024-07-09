import styled from '@emotion/styled';
import { IChipButton } from './ChipButton';
import { Radio } from '@maidt-cntn/ui';

namespace StyleChipButton {
  export const ChipButton = styled.button`
    display: inline-flex;
  `;

  export const ChipRadio = styled(Radio)``;

  export const ChipIcon = styled.span<Omit<IChipButton, 'onClick'>>`
    display: inline-block;

    ${({ src }) =>
      `
        background: url(${'"' + src + '"'}) center no-repeat var(--color-white);
        background-size: contain;
    `}

    ${({ size, width }) =>
      !!(size || width) &&
      `
        width: ${size || width};
    `}
    ${({ size, height }) =>
      !!(size || height) &&
      `
        height: ${size || height};
    `}
    ${({ hasChildren, isActive, isError }) =>
      hasChildren &&
      `
        color: ${!isActive ? 'var(--color-grey-900)' : isError ? '#EB1807' : '#FFFFFF'};
        justify-content: center;
        align-items: center;
        display: flex;
        border-radius: 50%;
    `}
  `;
}

export default StyleChipButton;
