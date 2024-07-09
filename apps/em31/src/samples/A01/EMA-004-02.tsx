import { Box, Typography, Label, IQuestionProps, Image, BoxWrap, Symbol } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';

const EMA00402 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={4} />
        <Box vAlign='center'>
          더 넓은 것에&nbsp;
          <Symbol type='correct' />&nbsp;표 해보세요.
        </Box>
      </>
    ),
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      vAlign='start'
      useExtend
    >
      <BoxWrap justifyContent='center' boxGap={80} useFull>
        <Box width='279px' hAlign='center' flexDirection='column'>
          <Image
            src='../../assets/example/EMA-004-02/calendar.png'
            alt='편지봉투와 포개어 보면 남는 부분이 있는 스케치북 그림입니다.'
            width='279'
            height='209px'
          />
          <Box vAlign='center' marginTop={'26px'}>
            <Typography>스케치북 </Typography>
          </Box>
          <Box vAlign='center' marginTop={'26px'}>
            <Typography>(</Typography>
            <CircleCheck type='button' onClick={() => {}}>
              {/* <RedCircle /> */}
            </CircleCheck>
            <Typography>)</Typography>
          </Box>
        </Box>

        <Box paddingTop='98px' width='174px' hAlign='center' flexDirection='column'>
          <Image
            src='../../assets/example/EMA-004-02/envelop.png'
            alt='스케치북과 포개어 보면 남는 부분이 없는 편지봉투 그림입니다.'
            width='174px'
            height='108px'
          />
          <Box vAlign='center' marginTop={'26px'}>
            <Typography>편지봉투 </Typography>
          </Box>
          <Box vAlign='center' marginTop={'26px'}>
            <Typography>(</Typography>
            <CircleCheck type='button' onClick={() => {}}>
              {/* <RedCircle /> */}
              <Symbol type='correct' />
            </CircleCheck>
            <Typography>)</Typography>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

const CircleCheck = styled.button`
  width: 140px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default EMA00402;
