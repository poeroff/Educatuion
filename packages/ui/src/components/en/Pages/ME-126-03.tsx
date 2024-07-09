import { useState } from 'react';

import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IME12603 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  wordArr: string[];
  question?: React.ReactNode;
  answer?: string;
  solution?: string;
  isSubmitted?: boolean;
  submitAnswer?: () => void;
}

const ME12603 = ({ headerInfo, questionInfo, wordArr, question, answer, solution, isSubmitted, submitAnswer }: IME12603) => {
  const [isShow, setShow] = useState<boolean>(false);

  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(show => !show);
    } else {
      submitAnswer && submitAnswer();
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!isSubmitted ? '채점하기' : isShow ? '답안 닫기' : '답안 보기'}
      onSubmit={handleSubmit}
      submitDisabled={!answer}
      submitBtnColor={!answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <Box hAlign='center' flexDirection='column'>
        <Box width='740px' hAlign='center' flexWrap='wrap' padding='20px 28px' gap='20px 40px' border='1px solid var(--color-grey-600)' useRound>
          {wordArr.map((value, index) => (
            <Box minWidth='192px' textAlign='center' key={index}>
              <Typography>{value}</Typography>
            </Box>
          ))}
        </Box>
        <Box marginTop='36px'>{question}</Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='12px'>
            <Typography>{solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default ME12603;
