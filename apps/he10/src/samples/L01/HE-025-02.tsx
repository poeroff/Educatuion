import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, TextView, BoxWrap, Input, Dialog, Typography, List, Question, IQuestionProps } from '@maidt-cntn/ui';
import { TextBoard } from '@maidt-cntn/ui/en';

const HE02502 = () => {
  const [value, setValue] = useState<string>('');
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Read the book review and answer the questions.',
  };

  const wordArr = ['listening', 'restore', 'sing', 'traditions', 'Witi', 'lhimaera'];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box useFull>
        <BoxWrap paddingTop='30px'>
          <Box hAlign='flex-start' useFull>
            <TextBoard color='var(--color-pink-200 )'>
              <Box>
                <Typography weight='var(--font-weight-bold)'>Title & Author</Typography>
              </Box>
              <Box padding='8px 12px'>
                <Typography>
                  Gathering of the <i>Whakapapa</i> is a short story written by Witi lhimaera, a famous Maori writter.
                </Typography>
              </Box>
            </TextBoard>
          </Box>
          <Box flexDirection='column' hAlign='center' useFull>
            <Box vAlign='baseline' padding='8px 12px'>
              <Question size='medium'>1.</Question>
              <Typography fontSize='32px' lineHeight='40px' weight='var(--font-weight-bold)'>
                What is the title of the story, and who is the author?
              </Typography>
            </Box>
            <Box hAlign='center' marginTop='12px'>
              <Box paddingLeft='36px'>
                <Box whiteSpace='nowrap'>
                  <Typography>Gathering of the Whakapapa by</Typography>
                </Box>
                <Box padding='0 12px'>
                  <Input
                    width='244px'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder='내용을 넣어 주세요.'
                    ariaLabel='답 입력란'
                  />
                  <Typography>.</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </BoxWrap>
        <Box marginTop='24px'>
          <TextView title='보기'>
            <List align='horizontal' data={wordArr} row={({ value }) => <Typography>{value}</Typography>} />
          </TextView>
        </Box>
      </Box>

      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE02502;
