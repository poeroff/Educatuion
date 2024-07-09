import { useState } from 'react';
import { Box, BoxWrap, Drawing, IQuestionProps, Recorder, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const ME12901 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'tellYourStory',
  };

  const questionInfo: IQuestionProps = {
    text: '본문에서 가장 좋아하는 부분을 그림으로 그리고 느낀 점을 말해 봅시다.',
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
      <Box>
        <Box useFull>
          <Box>
            <BoxWrap>
              <Box height='380px' flex={1}>
                <Drawing />
              </Box>
              <Box width={289} display='flex' flexDirection='column' alignItems='center' justifyContent='center' fontSize='var(--font-size-18)'>
                <Typography useGap={false} weight='var(--font-weight-bold)' fontSize='var(--font-size-18)' align='center'>
                  느낀 점을 말해보세요.
                </Typography>
                <Box fontSize='var(--font-size-16)'>
                  <Recorder recorderIndex={0} onSubmit={() => {}} onRefresh={() => {}} />
                </Box>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ME12901;
