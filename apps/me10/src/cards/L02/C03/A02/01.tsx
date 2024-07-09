import { Image, BoxWrap, Box, TMainHeaderInfoTypes, List, Typography, PinchZoom, Scroll } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Spin! Spin! Spin!',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo = {
    text: '활동 방법을 확인해 봅시다.',
  };

  const data = [
    {
      text: '두 명이 한 팀을 이룹니다.',
    },
    {
      text: '한 명은 교과서를 잘 잡고 다른 한 명이 눈을 감고 손가락으로 화면을 짚어 칸을 고릅니다.',
    },
    {
      text: '고른 칸의 그림과 어울리는 날씨를 골라서 다른 팀과 대화하며 날씨와 그림 속 인물의 행동을 알맞게 표현하면 해당 칸의 점수를 얻습니다.',
    },
    {
      text: '점수가 가장 높은 팀이 이깁니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull>
        <Box width='410px' hAlign={'center'} useFull>
          <PinchZoom>
            <Image
              src={'/L02/C03/A02/ME1-L02-C03-A02-P01.jpg'}
              width='410px'
              height='400px'
              alt='10~30점이 쓰여진 다트판 
            10: eat ice cream, buy umbrella 
            20: drink hot chocolate, skate 
            30: surf, ride bikes 
            그 아래에는 hot, snowy, sunny, rainy, windy, cold, cloudy 각 날씨 그림이 있다. '
            />
          </PinchZoom>
        </Box>
        <Box hAlign={'center'} useFull>
          <Scroll>
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
