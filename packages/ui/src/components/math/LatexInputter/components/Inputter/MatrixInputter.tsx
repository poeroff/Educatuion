import { useEffect, useRef, useState } from 'react';
import { MathfieldElement } from 'mathlive';

import * as Styled from './MatrixInputter.styled';

import { SvgIcon } from '@maidt-cntn/ui';

import ByIcon from '../../assets/icon/icon_by.svg';

export default function MatrixInputter(props: { handleSubmit?: Function; mathfieldRef?: MathfieldElement }) {
  const [value, setValue] = useState<{ row: number; col: number }>({ row: 2, col: 2 });
  const rowRef = useRef<HTMLInputElement>(null);
  const colRef = useRef<HTMLInputElement>(null);

  const { mathfieldRef, handleSubmit } = props;

  useEffect(() => {
    const handleChange = () => {
      if (!rowRef.current || !colRef.current) return;

      setValue({
        row: Number.parseInt(rowRef.current.value, 10),
        col: Number.parseInt(colRef.current.value, 10),
      });
    };

    rowRef.current?.addEventListener('change', handleChange);
    colRef.current?.addEventListener('change', handleChange);

    return () => {
      rowRef.current?.removeEventListener('change', handleChange);
      colRef.current?.removeEventListener('change', handleChange);
    };
  }, []);

  if (!mathfieldRef) return null;

  const getLatex = () => {
    let arr = [];
    for (let i = 0; i < value.row; i++) arr.push('\\placeholder{}');
    const row = arr.join('&');
    arr = [];
    for (let j = 0; j < value.col; j++) arr.push(row);
    return `\\begin{pmatrix}
   ${arr.join(`\\\\`)}
    \\end{pmatrix}`;
  };

  return (
    <>
      <Styled.InputWrapper
        className='latex-inputter-tooltip latex-inputter-button'
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Styled.Input
          $warning={value.row > 9}
          className={`latex-inputter-button-input 행렬`}
          autoFocus
          draggable={false}
          inputMode='none'
          ref={rowRef}
          defaultValue={value.row}
          onChange={v => {
            setValue({ ...value, row: Number.parseInt(v.currentTarget.value, 10) });
          }}
        />
        <SvgIcon src={ByIcon} size={'18px'} />
        <Styled.Input
          $warning={value.col > 9}
          className={`latex-inputter-button-input 행렬`}
          inputMode='none'
          draggable={false}
          ref={colRef}
          defaultValue={value.col}
          onChange={v => {
            setValue({ ...value, col: Number.parseInt(v.currentTarget.value, 10) });
          }}
        />
      </Styled.InputWrapper>
      {(value.row > 9 || value.col > 9 || value.row * value.col < 0) && <Styled.ErrorMessage>9보다 큰 수는 입력할 수 없어요.</Styled.ErrorMessage>}
      <Styled.SubmitButton
        aria-label='행렬 입력'
        title='행렬 입력'
        $disabled={!value.row || !value.col || value.row > 9 || value.col > 9 || value.row * value.col <= 0}
        onClick={e => {
          e.stopPropagation();
          mathfieldRef.insert(getLatex());
          if (handleSubmit) handleSubmit();
        }}
      >
        입력하기
      </Styled.SubmitButton>
    </>
  );
}
