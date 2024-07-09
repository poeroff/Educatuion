import { Box, TMainHeaderInfoTypes, TextView, Typography, List, ETagLine, BottomSheet, Tag, IQuestionProps, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useMemo, useState } from 'react';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

interface HE10L01C08A05a {
  subQuestionInfo: React.ReactNode;
  inputNodes: React.ReactNode;
  inputs: string[];
  answers: string[];
  mark: IQuestionProps['mark'];
  submitted: boolean;
  onSubmit: (status: boolean[]) => void;
}

const HE10L01C08A05a = ({ subQuestionInfo, inputNodes, inputs, answers, mark, submitted, onSubmit }: HE10L01C08A05a) => {
  const [isShow, setShow] = useState<boolean>(false);
  const isDisabled = useMemo(() => inputs.some(val => !isNotEmptyString(val)), [inputs]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2 : Practice',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Change the underlined words to the most appropriate forms, referring to the sentence in the box.',
    mark: mark,
  };

  const data = [{ num: '(1)' }, { num: '(2)' }];

  const handleSubmit = () => {
    if (submitted) {
      setShow(show => !show);
    } else if (inputs.every(val => isNotEmptyString(val))) {
      onSubmit && onSubmit(inputs.map((val, index) => isAnswer(val, answers[index])));
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel={submitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={isDisabled}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={() => {
        handleSubmit();
      }}
    >
      <Box width='100%' marginTop='24px'>
        <TextView title='보기' hAlign='start'>
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            My dad{' '}
            <Typography useGap={false} textDecoration={'underline'}>
              had
            </Typography>{' '}
            already{' '}
            <Typography useGap={false} textDecoration={'underline'} style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
              prepared
            </Typography>{' '}
            lunch when I{' '}
            <Typography useGap={false} textDecoration={'underline'}>
              arrived
            </Typography>{' '}
            home.
          </Typography>
        </TextView>
      </Box>
      <Box marginTop={'24px'}>
        {subQuestionInfo}
        <Box marginTop='24px' marginLeft='24px' hAlign='center'>
          <List data={data} align='horizontal' gap={24}>
            <Box vAlign='center'>{inputNodes}</Box>
          </List>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            {answers.map((value, index) => (
              <Typography key={index} usePre>
                {`(${index + 1}) ${value}`}
              </Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE10L01C08A05a;
