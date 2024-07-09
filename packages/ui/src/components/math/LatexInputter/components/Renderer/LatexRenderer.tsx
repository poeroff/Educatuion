import { useResetRecoilState } from 'recoil';

import { BaisicInputProps, StyleProps } from '../Inputter/LatexInputter';

import { inputterDataAtom } from '../../stores/activeInputter';

import * as S from './LatexRenderer.styled';

import { ALIGN, FONT_SIZE } from '../../static/DefaultStyleData';

interface LatexRendererProps extends StyleProps {
  visible?: boolean;
  hide?: () => void;
  placeholder: string;
  value: string;
}

export function SubmittedLatexRenderer(props: BaisicInputProps) {
  const reset = useResetRecoilState(inputterDataAtom);
  const { value, placeholder = '답안을 입력하세요', isError = false, fontSize = FONT_SIZE, align = ALIGN } = props;
  return (
    <S.Wrapper $visible>
      <S.SubmittedRenderer $fontSize={fontSize} $isError={isError} $align={align}>
        <math-field
          onFocus={e => {
            reset();
          }}
          read-only
        >
          {value || placeholder.replace(/\s/g, '\\:')}
        </math-field>
      </S.SubmittedRenderer>
    </S.Wrapper>
  );
}

export function LatexRenderer(props: LatexRendererProps) {
  const { visible = true, hide = () => {}, value, placeholder, fontSize = FONT_SIZE, align = ALIGN } = props;

  return (
    <S.Wrapper className='latex-inputter-root' $visible={visible}>
      <S.Renderer className='latex-inputter-scroll' $fontSize={fontSize} $align={align}>
        <div
          className='latex-inputter-renderer'
          onPointerDown={e => {
            e.preventDefault();
            e.stopPropagation();
            hide();
          }}
        />
        <math-field
          read-only
          onPointerDown={e => {
            e.preventDefault();
            e.stopPropagation();
            hide();
          }}
        >
          {value || placeholder.replace(/\s/g, '\\:')}
        </math-field>
      </S.Renderer>
    </S.Wrapper>
  );
}
