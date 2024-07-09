import styled from '@emotion/styled';

const Button = styled.button<{ ratingGap?: number }>`
  display: inline-flex;
  margin-right: ${({ ratingGap }) => `${ratingGap}px` ?? '10px'};
`;

const Icon = styled.span<{ src: string; size: number }>`
  display: inline-block;

  ${({ src }) =>
    `
        background: url(${'"' + src + '"'}) center no-repeat var(--color-white);
        background-size: contain;
    `}

  ${({ size }) =>
    `
        width: ${size}px;
        height: ${size}px;
    `}
`;

const Style = { Button, Icon };

export default Style;
