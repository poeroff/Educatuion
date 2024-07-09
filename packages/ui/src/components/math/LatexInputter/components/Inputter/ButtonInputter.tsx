import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Draggable from 'react-draggable';

import * as Style from './ButtonInputter.styled';
import { CloseButton } from './Button.styled';

import Numpad from './Numpad';
import Keypad from './Keypad';

import { inputterDataAtom } from '../../stores/activeInputter';

export function ButtonInputter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const activeInputter = useRecoilValue(inputterDataAtom);

  const [focusedField, setFocusedField] = useState<HTMLInputElement>();
  const [tooltip, setTooltip] = useState<string>('');

  const insertTooltip = (latex: string) => {
    if (!focusedField || !focusedField.className.includes(tooltip)) return;
    const startPos = focusedField.selectionStart ?? 0;
    const endPos = focusedField.selectionEnd ?? 0;
    const currentValue = focusedField.value;
    focusedField.value = currentValue.substring(0, startPos) + latex + currentValue.substring(endPos);
    const newCursorPosition = startPos + latex.length;
    focusedField.setSelectionRange(newCursorPosition, newCursorPosition);
    focusedField.focus();
    focusedField.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const deleteTooltip = () => {
    if (!focusedField || !focusedField.className.includes(tooltip)) return;
    const startPos = focusedField.selectionStart ?? 0;
    const endPos = focusedField.selectionEnd ?? 0;
    const currentValue = focusedField.value;

    if (startPos === endPos) focusedField.value = currentValue.substring(0, startPos - 1) + currentValue.substring(endPos);
    else focusedField.value = currentValue.substring(0, startPos) + currentValue.substring(endPos);
    focusedField.setSelectionRange(startPos, startPos);
    focusedField.focus();
    focusedField.dispatchEvent(new Event('change', { bubbles: true }));
  };

  useEffect(() => {
    setTooltip('');
  }, [activeInputter?.mathfieldRef]);

  return (
    <Draggable
      defaultPosition={{ x: 500, y: 0 }}
      defaultClassName='latex-inputter-dragger'
      bounds='.latex-inputter-droppable'
      cancel='.latex-inputter-button'
      onStop={() => {
        if (!activeInputter?.mathfieldRef) return;
        activeInputter?.mathfieldRef.focus();
      }}
    >
      <Style.LatexButtonWrapper
        $visible={!!activeInputter}
        $school={activeInputter?.school ?? 'mm'}
        ref={wrapperRef}
        className='latex-inputter-button-wrapper'
      >
        {activeInputter && (
          <>
            <CloseButton
              onPointerDown={e => {
                e.stopPropagation();
                activeInputter.handleClose();
              }}
            >
              닫기
            </CloseButton>
            <Style.ButtonWrapper
              $school={activeInputter.school}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Numpad
                school={activeInputter.school}
                handleMouseOver={() => {
                  if (!tooltip || !document.activeElement) return;
                  setFocusedField(document.activeElement as HTMLInputElement);
                }}
                handleClick={(e: MouseEvent, latex: string) => {
                  if (tooltip) {
                    insertTooltip(latex);
                    return;
                  }

                  activeInputter.mathfieldRef.insert(latex, { focus: true });
                }}
                handleDelete={() => {
                  if (tooltip) {
                    deleteTooltip();
                    return;
                  }
                  activeInputter.mathfieldRef.executeCommand('deleteBackward');
                  activeInputter.mathfieldRef.focus();
                }}
              />
              <Keypad
                mathfieldRef={activeInputter.mathfieldRef}
                tooltip={tooltip}
                setTooltip={setTooltip}
                school={activeInputter.school}
                handleClick={(latex: string) => {
                  activeInputter.mathfieldRef.insert(latex, { focus: true });
                }}
              />
            </Style.ButtonWrapper>
          </>
        )}
      </Style.LatexButtonWrapper>
    </Draggable>
  );
}
