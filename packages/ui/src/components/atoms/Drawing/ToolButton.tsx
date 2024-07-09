import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import styled from '@emotion/styled';
import { SvgIcon, Dialog } from '@maidt-cntn/ui';
import PenModal from './PenModal';
import EraserModal from './EraserModal';
import caretDown from '@maidt-cntn/assets/icons/caret_down.svg';
import Style from './Drawing.style';

export interface IToolButtonProps {
  setMode: (mode: string) => void;
  setCursor: (type: string) => void;
  setIsActive: (isOpen: boolean) => void;
  penSize: number;
  handelPenSize: (size: number) => void;
  penColor: string;
  handelPenColor: (color: string) => void;
  isLine: boolean;
  handelIsLine: (isLine: boolean) => void;
  eraserSize: number;
  handelEraserSize: (eraserSize: number) => void;
  isExistDrawing: boolean;
  handelClearAll: (clearAll: boolean) => void;
  disabled?: boolean;
}

export const ToolButton = ({
  setMode,
  setCursor,
  setIsActive,
  handelPenSize,
  handelPenColor,
  handelIsLine,
  handelEraserSize,
  handelClearAll,
  penSize,
  penColor,
  isLine,
  eraserSize,
  isExistDrawing,
  disabled,
}: IToolButtonProps) => {
  const [open, setOpen] = useState(false);
  const [isPenModalOpen, setIsPenModalOpen] = useState(false);
  const [isEraserModalOpen, setIsEraserModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const ToolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutSide = (e: MouseEvent) => {
      if (ToolRef.current && !ToolRef.current.contains(e.target as Node)) {
        setOpen(false);
        setIsEraserModalOpen(false);
        setIsPenModalOpen(false);
      }
    };
    document.addEventListener('mousedown', clickOutSide);
    return () => {
      document.removeEventListener('mousedown', clickOutSide);
    };
  }, [ToolRef]);

  const handlePenButtonClick = () => {
    if (isEraserModalOpen) setIsEraserModalOpen(false);
    setMode('pen');
    setIsPenModalOpen(prev => !prev);
    setCursor('pen');
  };

  const handleEraserButtonClick = () => {
    if (isPenModalOpen) setIsPenModalOpen(false);
    setMode('eraser');
    setIsEraserModalOpen(prev => !prev);
    setCursor('eraser');
  };

  const handleOpenState = () => {
    setIsActive(true);
    setOpen(!open);
  };

  const handleClickClearAll = () => {
    handelClearAll(true);
    setIsEraserModalOpen(false);
  };

  return (
    <ToolButtonWrapper ref={ToolRef}>
      <DropDownButton disabled={disabled} isClicked={open} onClick={handleOpenState}>
        도구
        <IconWrapper isClicked={open}>
          <SvgIcon src={caretDown} width='18px' height='18px' />
        </IconWrapper>
      </DropDownButton>
      {open && (
        <DropDownBox>
          <Button type='button' onClick={handlePenButtonClick} isClicked={isPenModalOpen}>
            펜
          </Button>
          <Button type='button' onClick={handleEraserButtonClick} isClicked={isEraserModalOpen}>
            지우개
          </Button>
        </DropDownBox>
      )}
      {isPenModalOpen && (
        <PenModal
          top={0}
          left={-310}
          yPosition={45}
          penSize={penSize}
          penColor={penColor}
          isLine={isLine}
          setPenSize={handelPenSize}
          setPenColor={handelPenColor}
          setIsLine={handelIsLine}
          setIsPenModalOpen={setIsPenModalOpen}
        />
      )}
      {isEraserModalOpen && (
        <EraserModal
          top={0}
          left={-220}
          yPosition={25}
          eraserSize={eraserSize}
          setEraserSize={handelEraserSize}
          setIsAlertOpen={setIsAlertOpen}
          setIsEraserModalOpen={setIsEraserModalOpen}
          isExistDrawing={isExistDrawing}
        />
      )}
      <Dialog isShow={isAlertOpen} width={348} height={154} topHeight={-20}>
        <Style.AlertContentBox>
          <Style.AlertContent>정말 모두 지우시겠습니까?</Style.AlertContent>
          <Style.AlertButton onClick={() => setIsAlertOpen(false)}>취소</Style.AlertButton>
          <Style.AlertButton
            isConfirm
            onClick={() => {
              setIsAlertOpen(false);
              handleClickClearAll();
            }}
          >
            모두 지우기
          </Style.AlertButton>
        </Style.AlertContentBox>
      </Dialog>
    </ToolButtonWrapper>
  );
};

const ToolButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  margin-bottom: 8px;
`;

const DropDownBox = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  gap: 4px;

  margin-top: 4px;
  z-index: 3;
`;

const DropDownButton = styled.button<{ isClicked: boolean }>`
  position: relative;
  width: 81px;
  height: 32px;
  padding: 8px 16px;
  gap: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 22px;
  border: 1px solid var(--color-grey-200);

  font-family: var(--font-SUIT);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-bold);
  line-height: 20px;

  background-color: ${props => (props.isClicked ? 'var(--color-grey-200)' : 'var(--color-white)')};
`;

const IconWrapper = styled.div<{ isClicked: boolean }>`
  display: flex;
  align-items: center;
  transform: ${props => (props.isClicked ? 'scaleY(-1)' : 'scaleY(1)')};
`;

const Button = styled.button<{ isClicked: boolean }>`
  display: flex;
  width: 81px;
  height: 36px;
  padding: 8px 16px;

  border-radius: 22px;
  border: 1px solid var(--color-grey-200);

  font-family: var(--font-SUIT);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-bold);
  line-height: 20px;
  align-items: right;

  color: ${props => (props.isClicked ? 'var(--color-white)' : 'var(--color-grey-800)')};
  background-color: ${props => (props.isClicked ? 'var(--color-blue-500)' : 'var(--color-white)')};
`;

export default ToolButton;
