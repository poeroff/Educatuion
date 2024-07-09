import { useState } from 'react';
import { BoxWrap, Box, TMainHeaderInfoTypes, Textarea, Typography, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE04502 = () => {
  const [value, setValue] = useState<string>('');
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'D. Writing',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = { type: 'text', text: 'Write your answer using a structure you learned in this lesson.' };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='start'
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap useFull>
        <Box flexDirection='column' hAlign={'center'} useFull>
          <Typography>How can books help us understand the world?</Typography>
          <Box vAlign='flex-start' marginTop={10} border={'1px dashed #75c2ff'} padding={'10px 16px'} useRound>
            <Box>
              {' '}
              <Typography>e.g.</Typography>
            </Box>
            <Typography>
              While reading books, we can feel{' '}
              <Typography useGap={false} color={'#275CE7'}>
                as if
              </Typography>{' '}
              we{' '}
              <Typography useGap={false} color={'#275CE7'}>
                were
              </Typography>{' '}
              the characters in the story. This helps us think from others’ perspectives.
            </Typography>
          </Box>
        </Box>
        <Box>
          <Textarea value={value} onChange={event => setValue(event.target.value)} width='405px' placeholder='내용을 넣어 주세요.' />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE04502;
