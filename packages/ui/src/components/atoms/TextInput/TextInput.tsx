import { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { CSSProperties } from 'styled-components';

interface TextInputProps {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
}

const TextInput = ({ id, value, onChange, style }: TextInputProps) => {
  return <Wrapper type='text' id={id} value={value} onChange={onChange} style={style} />;
};

const Wrapper = styled.input`
  appearance: none;
  box-sizing: border-box;

  display: flex;
  align-items: center;

  width: 100%;
  height: 56px;

  padding: 0 12px;

  border: 1px solid #b0b6c0;
  border-radius: 8px;

  font-family: 'SUIT';
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-18px);
  line-height: 28px;
`;

export default TextInput;
