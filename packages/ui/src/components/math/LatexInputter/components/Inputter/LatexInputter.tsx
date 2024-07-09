import { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { MathfieldElement } from 'mathlive';

import * as Style from './LatexInputter.styled';

import { LatexRenderer, SubmittedLatexRenderer } from '../Renderer/LatexRenderer';

import { useFocusOutside } from '../../utils/useFocusOutside';

import { inputterDataAtom } from '../../stores/activeInputter';
import { ALIGN, FONT_SIZE, HEIGHT, WIDTH } from '../../static/DefaultStyleData';

export type AlignType = 'start' | 'center' | 'end';

export interface StyleProps {
  fontSize?: number;
  width?: number;
  height?: number;
  align?: AlignType;
}
export interface BaisicInputProps extends StyleProps {
  placeholder?: string;
  readonly?: boolean;
  value?: string;
  isError?: boolean;
}

interface LatexInputterProps extends StyleProps {
  placeholder?: string;
  school: 'em' | 'mm' | 'hm';
  handleChange?: (latex: string) => void;
}

function SubmittedLatexInputter(props: BaisicInputProps) {
  const { placeholder = '답안을 입력하세요', isError, value, fontSize = FONT_SIZE, width = WIDTH, height = HEIGHT, align = ALIGN } = props;
  return (
    <Style.Wrapper $width={width} $height={height}>
      <SubmittedLatexRenderer
        fontSize={fontSize}
        align={align}
        value={(value ?? '').replace(/\\placeholder\{\}/g, '\\square')}
        placeholder={placeholder}
        isError={isError}
      />
    </Style.Wrapper>
  );
}

function EditableLatexInputter(props: LatexInputterProps) {
  const {
    school,
    placeholder = '답안을 입력하세요',
    handleChange = () => {},
    fontSize = FONT_SIZE,
    width = WIDTH,
    height = HEIGHT,
    align = ALIGN,
  } = props;

  const [activeInputter, setActiveInputter] = useRecoilState(inputterDataAtom);

  const [latex, setLatex] = useState<string>('');

  const mathfieldRef = useRef<MathfieldElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* replace placeholder commands  */
  const replaceLatex = (latex: string) => {
    if (latex === '') return '';
    return `$${latex.replace(/\\placeholder\{\}/g, '{}').replace(/\\overgroup/g, '\\overparen')}$`;
  };

  // 입력값 변화시 호출
  const onChange = (value: string) => {
    if (value === latex) return;
    if (!mathfieldRef.current) return;
    setLatex(value);
    handleChange(replaceLatex(value));
    if (mathfieldRef.current.mode === 'text') mathfieldRef.current.executeCommand('switchMode', 'math');
    handleFocusCaret();
  };

  // 수식 입력 필드 내 활성화된 커서로 위치 이동
  const handleFocusCaret = () => {
    if (!mathfieldRef.current || !mathfieldRef.current.shadowRoot) return;
    if (!mathfieldRef.current.shadowRoot) return;
    const caret = mathfieldRef.current.shadowRoot.querySelector('.ML__caret');
    if (caret) caret.scrollIntoView();
  };

  const handleFocus = () => {
    if (!mathfieldRef.current) return;
    setActiveInputter({
      mathfieldRef: mathfieldRef.current,
      school: school,
      handleClose: () => closeButtonInputter(),
    });
    mathfieldRef.current.focus();
  };

  const closeButtonInputter = () => {
    setActiveInputter(undefined);
    mathfieldRef.current?.blur();
  };

  useEffect(() => {
    const handlingData = { latexLength: 0 };
    mathfieldRef.current?.addEventListener('keydown', e => {
      // space handler
      if (e.key === ' ') mathfieldRef.current?.insert('\\: ');

      // backspace handler
      if (mathfieldRef.current?.mode === 'latex') {
        if (e.key === 'Backspace') {
          if (--handlingData.latexLength === 0) mathfieldRef.current.mode = 'math';
        } else handlingData.latexLength++;
      } else {
        handlingData.latexLength = 0;
      }
    });
  }, []);

  useFocusOutside(wrapperRef, closeButtonInputter);

  useEffect(() => {
    if (!mathfieldRef.current) return;
    // prevent default settings provided by mathlive
    mathfieldRef.current.popoverPolicy = 'off';
    mathfieldRef.current.mathVirtualKeyboardPolicy = 'manual';
    mathfieldRef.current.menuItems = [];
  }, [mathfieldRef]);

  return (
    <>
      <Style.DragBoundary className='latex-inputter-droppable' />
      <Style.Wrapper $width={width} $height={height} ref={wrapperRef} className='latex-inputter-root'>
        <Style.EditorWrapper
          className='latex-inputter-editor'
          $fontSize={fontSize}
          $align={align}
          $visible={!!activeInputter && activeInputter.mathfieldRef === mathfieldRef.current}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            if (!mathfieldRef.current) return;
            mathfieldRef.current.focus();
          }}
        >
          <math-field
            className='latex-inputter-math-field'
            ref={mathfieldRef}
            onInput={value => {
              onChange(value.currentTarget.getValue('latex'));
            }}
          >
            {latex}
          </math-field>
        </Style.EditorWrapper>
        <LatexRenderer
          fontSize={fontSize}
          align={align}
          visible={!activeInputter || activeInputter.mathfieldRef !== mathfieldRef.current}
          hide={handleFocus}
          value={latex.replace(/\\placeholder\{\}/g, '\\square')}
          placeholder={placeholder}
        />
      </Style.Wrapper>
    </>
  );
}

export function LatexInputter(props: LatexInputterProps & BaisicInputProps) {
  const { readonly } = props;
  if (readonly) return <SubmittedLatexInputter {...props} />;
  return <EditableLatexInputter {...props} />;
}
