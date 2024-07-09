import { Box, TMainHeaderInfoTypes, File, Textarea, Typography, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE02403 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Invetions Ahead of Their Time PAST',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: (
      <Typography fontSize='var(--font-size-32)' lineHeight='50px' useGap={false}>
        Make{' '}
        <Typography fontStyle='italic' color='var(--color-grey-500)' useGap={false}>
          Card News
        </Typography>{' '}
        about the invention and write about them.
      </Typography>
    ),
    type: 'text',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='완료하기'
      useExtend
    >
      <Box hAlign='center'>
        {[...Array(4)].map((_, index) => (
          <Box key={index} marginRight={index < 3 ? '12px' : '0'} width='241px'>
            <Box marginBottom='8px' height='250px'>
              <File cardStoreInfo={{ subjectCode: 'HE10', cardPath: '', page: '', index: 0, userId: 9999 }} />
            </Box>
            <Textarea placeholder='내용을 넣어 주세요.' height='132px' width='100%' />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default HE02403;
