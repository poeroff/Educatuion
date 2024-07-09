import { Image, BoxWrap, Box, TMainHeaderInfoTypes, List, Typography, PinchZoom, Scroll } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Guess Who',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo = {
    text: '활동 방법을 확인해 봅시다.',
  };

  const data = [
    {
      text: '짝과 어떤 알파벳의 인물 카드를 맡을지 정합니다.',
    },
    {
      text: '예시와 같이 대화하며 인물에 관한 정보를 한 가지씩 알려 줍니다.',
    },
    {
      text: '카드의 1번만 듣고 알아맞히면 3점, 2번까지 듣고 알아맞히면 1점을 얻습니다. 마지막까지 알아맞히지 못하면, 점수를 얻을 수 없습니다.',
    },
    {
      text: '더 높은 점수를 얻은 사람이 이깁니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull>
        <Box width='410px' hAlign={'center'} useFull>
          <PinchZoom>
            <Image src={'/L07/C03/A02/ME1-L07-C03-A02-P01.jpg'} width='410px' height='400px' alt='특징이 2가지씩 적혀있는 인물 카드 6장' />
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
