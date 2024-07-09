import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  Label,
  TMainHeaderInfoTypes,
  IQuestionProps,
  Drawing,
  BottomSheet,
  Tag,
  ETagLine,
  Input,
  InputStatus,
  TextView,
  ICanvasFunction,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useState } from 'react';

export interface IEM00903 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  example: React.ReactNode;
  initialValue: string;
  canvasRef: React.RefObject<ICanvasFunction>;
  answer?: string;
  exampleAnswer: React.ReactNode;
  explanation?: React.ReactNode;
  isSubmitted?: boolean;
  drawingHeight?: string;
  handleInputChange?: (value: string) => void;
  onSubmit?: () => void;
  canvasTmpSave?: () => void;
}

const EM00903 = ({
  headerInfo,
  questionInfo,
  example,
  initialValue,
  canvasRef,
  answer,
  exampleAnswer,
  explanation,
  isSubmitted,
  drawingHeight = '100%',
  handleInputChange,
  onSubmit,
  canvasTmpSave,
}: IEM00903) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleSubmitChange = () => {
    if (!isSubmitted && answer) {
      onSubmit && onSubmit();
    } else {
      setIsShow(!isShow);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      background={'var(--color-white)'}
      submitBtnColor={initialValue !== '' ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={initialValue === ''}
      onSubmit={handleSubmitChange}
      useRound
    >
      <Box useFull display='flex' flexDirection='column'>
        <Box display='flex' justifyContent='center' marginBottom='15px'>
          <TextView title='보기' hAlign='start'>
            {example}
          </TextView>
        </Box>
        <BoxWrap marginTop='10px' flex='1'>
          <Box marginRight='10px' marginTop='40px'>
            <Tag width='90px' type={ETagLine.BLUE} label='문제' />
          </Box>
          <Box useFull>
            <Drawing height={drawingHeight} width='100%' ref={canvasRef} tmpSave={canvasTmpSave} disabled={isSubmitted} />
          </Box>
        </BoxWrap>
        {answer && (
          <Box display='flex' justifyContent='right' alignItems='center' marginTop='10px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              type='number'
              ariaLabel='답 입력란'
              marginLeft={8}
              maxLength={30}
              width='292px'
              value={initialValue}
              onChange={e => {
                handleInputChange && handleInputChange(e.target.value);
              }}
              status={
                !isNotEmptyString(initialValue)
                  ? InputStatus.DEFAULT
                  : isSubmitted && !isAnswer(initialValue, answer)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={isSubmitted}
            />
          </Box>
        )}
        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
          <Box background='lightGray' borderRadius='12px' marginTop='40px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='예시답안' />
            </Box>
            <Box marginTop='10px'>{exampleAnswer}</Box>
            {explanation && (
              <>
                <Box marginTop='40px'>
                  <Tag type={ETagLine.GREEN} label='풀이' />
                </Box>
                {explanation}
              </>
            )}
          </Box>
        </BottomSheet>
      </Box>
    </Container>
  );
};

export default EM00903;
