import { IQuestionProps, TMainHeaderInfoTypes, Box, Typography, EStyleButtonTypes, BottomSheet, Tag, ETagLine, Label } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { checkExpression, isAnswer, isNotEmptyString, removeSpaces } from '@maidt-cntn/util/CommonUtil';
import { useMemo, useState } from 'react';

type TSubmitType = 'marking' | 'complete';

export interface IEM02001 {
  headerInfo: TMainHeaderInfoTypes | null;
  questionInfo: IQuestionProps;
  inputNodes: React.ReactNode[];
  answers: string[];
  solutions: string[];
  submitted: boolean;
  submitType?: TSubmitType;
  commentary?: string;
  unit?: string;
  onSubmit?: (isCorrect: boolean[]) => void;
}

const EM02001 = ({
  headerInfo,
  questionInfo,
  inputNodes,
  answers,
  solutions,
  submitType = 'marking',
  submitted,
  commentary,
  onSubmit,
  unit = '개',
}: IEM02001) => {
  const [isShow, setShow] = useState<boolean>(false);
  const isAllFilled = useMemo(() => answers.every(isNotEmptyString), [answers]);

  const handleSubmit = () => {
    if (submitted) {
      setShow(show => !show);
    } else {
      const result: boolean[] = answers.map((val, index) => {
        if (index === 0) {
          return checkExpression(removeSpaces(val), solutions[0]);
        } else {
          return isAnswer(removeSpaces(val), solutions[index]);
        }
      });

      onSubmit && onSubmit(result);
    }
  };

  const onSubmitLabel = () => {
    return submitted ? (isShow ? '답안 닫기' : '답안 보기') : submitType === 'marking' ? '채점하기' : '완료하기';
  };

  return (
    <Container
      useRound
      useExtend
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={onSubmitLabel()}
      submitDisabled={!isAllFilled}
      submitBtnColor={isAllFilled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={() => {
        handleSubmit();
      }}
    >
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            {inputNodes[0]}
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            {inputNodes[1]}
            <Typography>{unit}</Typography>
          </Box>
        </Box>
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
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{solutions.join(', ')}</Typography>
            </Box>
            {commentary && (
              <Box position='relative' marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='해설' />
                <Box>
                  <Typography usePre>{commentary}</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default EM02001;
