import { Image, BoxWrap, Box, TMainHeaderInfoTypes, List, Typography, PinchZoom, Scroll, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Roll the Dice',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo = {
    text: '활동 방법을 확인해 봅시다.',
  };

  const data = [
    {
      text: '두 명이 한 팀을 이룬 후 주사위와 말을 준비합니다.',
    },
    {
      text: '주사위를 던져 나온 숫자만큼 칸을 이동합니다.',
    },
    {
      text: '이동한 칸이 주황색이면 도움을 요청하고 수락하는 대화를, 이동한 칸이 하늘색이면 무슨일이 있는지 묻고 답하는 대화를 합니다.',
    },
    {
      text: '이동한 칸에 사다리가 있으면 위(↑)로 올라가고, 뱀의 얼굴이 있으면 아래(↓)로 내려갑니다.',
    },
    {
      text: '제일 먼저 FINISH에 도착하는 팀이 이깁니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull>
        <Box width='410px' hAlign={'center'} useFull>
          <PinchZoom>
            <Image
              src={'/L03/C03/A02/ME1-L03-C03-A02-P01.jpg'}
              width='410px'
              height='400px'
              alt='1~17번까지 있고 각 칸마다 다양한 상황이 쓰여있는 보드게임판'
            />
          </PinchZoom>
        </Box>
        <Box hAlign={'center'} useFull>
          <Scroll>
            <Typography>준비물: 주사위, 말</Typography>
            <Box marginLeft='80px'>
              <Typography fontSize='22px' color='var(--color-blue-900)'>
                온라인 주사위도 좋습니다.
              </Typography>
            </Box>
            <List gap={20} data={data}>
              {({ value, index = 1 }) => (
                <Box vAlign='start'>
                  <Box width='30px'>
                    <Typography color='var(--color-required)' weight='var(--font-weight-bold)'>
                      {index}&nbsp;
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>{value?.text}</Typography>
                  </Box>
                </Box>
              )}
            </List>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
