import { Box, TMainHeaderInfoTypes, Dialog, BoxWrap, File, Image, IQuestionProps, Typography, Textarea, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE02402 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Heart-Warming Relationships in Movies',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Create a movie trailer and write about it.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='완료하기'
    >
      <BoxWrap>
        <Box flex='1'>
          <Box height='60px' padding='8px 24px' background='var(--color-grey-800)' borderRadius='12px' hAlign='center'>
            <Typography color='var(--color-white)' weight='var(--font-weight-bold)' fontSize='var(--font-size-24)' lineHeight='36px'>
              Picture of your trailer
            </Typography>
          </Box>
          <Box marginTop='4px' height='348px'>
            <File cardStoreInfo={{ subjectCode: 'HE10', cardPath: '', page: '', index: 0, userId: 9999 }} />
          </Box>
        </Box>
        <Box flex='1'>
          <Textarea placeholder='내용을 넣어 주세요' />
        </Box>
      </BoxWrap>
      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE02402;
