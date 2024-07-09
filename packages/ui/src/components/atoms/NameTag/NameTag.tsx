import styled from '@emotion/styled';
import { CSSProperties } from 'react';

export interface NameTagProps {
  color?: string;
  label?: string;
  style?: CSSProperties;
}

export const NameTag = ({ color = 'var(--color-blue-100)', label = '', style }: NameTagProps) => {
  const padding = label.length === 1 ? '4px 10px' : '4px 16px';

  return (
    <Wrapper color={color} padding={padding} style={style}>
      {label}
    </Wrapper>
  );
};

const Wrapper = styled.span<{ color: string; padding: string }>`
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 22px;

  padding: ${({ padding }) => padding};

  background-color: ${({ color }) => color};

  font-family: 'SUIT';
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-18);
  line-height: 28px;
`;

export default NameTag;
