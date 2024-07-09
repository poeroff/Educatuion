import { Container } from '@maidt-cntn/ui/math';
import {
  EStyleButtonTypes,
  IQuestionProps,
  Box,
  Drawing,
  TMainHeaderInfoTypes,
  BottomSheet,
  Tag,
  ETagLine,
  Typography,
  ICanvasFunction,
} from '@maidt-cntn/ui';
import { MathExpression } from '@maidt-cntn/ui/math';
import { useState } from 'react';

export interface IEM00902 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  answers?: string[];
  descriptions?: string[];
  isSubmit?: boolean;
  onSubmit?: () => void;
  canvasRef: React.RefObject<ICanvasFunction>;
  canvasTmpSave?: () => void;
}

const EM00902 = ({ headerInfo, questionInfo, answers, descriptions, isSubmit = false, onSubmit, canvasRef, canvasTmpSave }: IEM00902) => {
  const [isShow, setShow] = useState<boolean>(false);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={isSubmit ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={() => {
        if (isSubmit) {
          setShow(prev => !prev);
        } else {
          onSubmit && onSubmit();
        }
      }}
      useRound
    >
      <Box useFull>
        <Drawing ref={canvasRef} tmpSave={canvasTmpSave} disabled={isSubmit} />
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          {answers && (
            <Box>
              <Tag type={ETagLine.GREEN} label='예시답안' />
              <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
                {answers.map((answer, index) => (
                  <Typography key={`answer-${index}`} lineHeight='normal'>
                    {answers.length === 1 ? '' : '- '}
                    {answer}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
          {descriptions && (
            <Box position='relative' marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='풀이' />{' '}
              <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
                {descriptions.map((description, index) => (
                  <Typography key={`description-${index}`} lineHeight='normal'>
                    {description.indexOf('$') === -1 ? description : <MathExpression equation={description} />}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default EM00902;
