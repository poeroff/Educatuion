import { useState } from 'react';
import { Box, BoxWrap, Drawing, IQuestionProps, Label, Recorder, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const ME12902 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'tellYourStory',
  };

  const questionInfo: IQuestionProps = {
    text: '본문의 글쓴이처럼 Plan B를 세웠던 경험을 그림으로 그리고 설명해 봅시다.',
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
          <Box display='flex' height={290} gap={24}>
            <BoxWrap flexDirection='column'>
              <Box marginRight='unset' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <Box
                  width={112}
                  height={44}
                  fontSize='var(--font-size-24)'
                  background='var(--color-red-200)'
                  outlineColor='var(--color-red-200)'
                  useRound
                  display='flex'
                  borderRadius={'16px'}
                  justifyContent='center'
                >
                  <Typography fontSize='var(--font-size-24)'>Plan</Typography>
                </Box>
              </Box>
              <Box height='240px' flex={1} marginTop={4}>
                <Drawing />
              </Box>
            </BoxWrap>

            <BoxWrap flexDirection='column'>
              <Box display='flex' marginRight='unset' flexDirection='column' alignItems='center' justifyContent='center'>
                <Box
                  width={133}
                  height={44}
                  display='flex'
                  background='var(--color-green-100)'
                  outlineColor='var(--color-green-100)'
                  borderRadius={'16px'}
                  justifyContent='center'
                >
                  <Typography fontSize='var(--font-size-24)'>Plan B</Typography>
                </Box>
              </Box>
              <Box height='240px' flex={1} marginTop={4}>
                <Drawing />
              </Box>
            </BoxWrap>
          </Box>

          <BoxWrap justifyContent='center' paddingTop={24}>
            <Recorder recorderIndex={0} onSubmit={() => {}} onRefresh={() => {}} />
          </BoxWrap>
        </Box>
      </Box>
    </Container>
  );
};

export default ME12902;
