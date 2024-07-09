import { Box, EStyleButtonTypes, Image, Input, IQuestionProps, Label, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM02501 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={1} type='icon' size='small' />
        토마토 20개 중에서 5개를 먹었습니다. 남은 토마토는 몇 개인가요?
      </>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      submitBtnColor={EStyleButtonTypes.YELLOW}
      onSubmit={() => {
        setShow(!isShow);
      }}
      background={'var(--color-white)'}
      useRound
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box type='line' padding='20px 40px' useRound>
          <Image
            src='/example/EM-025-01/EC31301.png'
            alt='토마토 20개가 나란히 놓여있고 그 중 5개의 토마토에 빗금 표시가 있습니다.'
            width='652px'
            height='40px'
          />
        </Box>
        <Box marginTop='24px'>
          <Typography>20-5=</Typography>
          <Input width='130px' />
        </Box>
      </Box>
    </Container>
  );
};

export default EM02501;
