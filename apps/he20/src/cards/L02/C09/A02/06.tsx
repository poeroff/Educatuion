import HE02502, { ITextView } from '@maidt-cntn/pages/HE-025-02';
import { TMainHeaderInfoTypes, Box, Question, Typography, Input, InputStatus, EStyleFontSizes, Scroll } from '@maidt-cntn/ui';
import { TextBoard } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const P06 = () => {
  const [value, setValue] = useState<string>('');
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };

  const questionText = 'Read Jay’s request e-mail and answer the questions.';

  const wordArr: string[] = [];

  const textView: ITextView = {
    title: 'Contact Information',
    text: 'If you have any questions about my request, please feel free to contact me at jaypark@example.com.',
    color: 'var(--color-yellow-500)',
    height: '70px',
  };

  const textViewNode = (
    <TextBoard color={textView.color} width={'488px'}>
      <Box>
        <Typography size={EStyleFontSizes.MEDIUM} weight={'var(--font-weight-bold)'}>
          {textView.title}
        </Typography>
      </Box>
      <Box>
        <Scroll>
          <Typography useGap={false}>{textView.text}</Typography>
        </Scroll>
      </Box>
    </TextBoard>
  );

  const boxNode = (
    <>
      <Box hAlign='center'>
        <Typography weight={'var(--font-weight-bold)'}>Request Details</Typography>
      </Box>
      <Box display='flex'>
        <Typography useGap={false}>
          <Question size={'small'}>5.</Question>
        </Typography>
        <Typography weight={'var(--font-weight-bold)'}>How does he want to be contacted?</Typography>
      </Box>
      <Box hAlign='center' vAlign='flex-start'>
        <Box paddingLeft='25px'>
          <Box>
            <Typography>by e-mail</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );

  return (
    <HE02502
      headerInfo={headerInfo}
      questionText={questionText}
      wordArr={wordArr}
      boxNode={boxNode}
      textViewNode={textViewNode}
      textViewHeight={textView.height}
      answer={['by e-mail']}
      value={[value]}
      showBoxNode={false}
      showSubmitButton={false}
    />
  );
};

export default P06;
