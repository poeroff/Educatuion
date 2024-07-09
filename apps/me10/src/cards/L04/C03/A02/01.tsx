import { Image, BoxWrap, Box, TMainHeaderInfoTypes, List, Typography, PinchZoom, Scroll, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'World Food Festival',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo = {
    text: '활동 방법을 확인해 봅시다.',
  };

  const data = [
    {
      text: '짝과 (A)와 (B) 중 하나씩 선택합니다. 선택한 음식점을 지도의 같은 색 빈 곳에 자유롭게 씁니다.',
    },
    {
      text: '예시와 같이 짝이 정한 부스에 가는 길을 묻고 답하며 짝이 어디에 음식점을 배치했는지 알아낸 후, 자신의 지도에도 이름을 씁니다.',
    },
    {
      text: '대화가 끝난 후, 서로의 지도가 같은지 확인합니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull>
        <Box width='410px' hAlign={'center'} flexDirection='column' useFull>
          <PinchZoom>
            <Image
              src={'/L04/C03/A02/ME1-L04-C03-A02-P01.jpg'}
              width='360px'
              height='340px'
              alt='세계 음식 축제를 하는 공원의 지도 음식점 자리마다 번호가 쓰여있다. '
            />
          </PinchZoom>
          <Box width='400px' justifyContent='flex' background='#FFF0CC'>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'(A) Mexican Food'}</Typography>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'Italian Food'}</Typography>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'Chinese Food'}</Typography>
          </Box>
          <Box width='400px' background='#EB6707'>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'(B) American Food'}</Typography>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'Thai Food'}</Typography>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'Indian Food'}</Typography>
          </Box>
        </Box>
        <Box hAlign={'center'} useFull>
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
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
