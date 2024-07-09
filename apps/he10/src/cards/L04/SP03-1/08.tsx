import { Box, BoxWrap, EStyleFontSizes, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IEngLishAndKorean {
  eng: string;
  kor: string;
}

const P08 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };
  const data: IEngLishAndKorean[] = [
    {
      eng: 'What happens to all the waste from the coffee extraction process?',
      kor: '커피 추출 과정에서 나온 모든 폐기물은 어떻게 될까?',
    },
    {
      eng: 'Spent coffee grounds (SCGs) are classified as general waste and sent to landfills.',
      kor: '사용된 커피 찌꺼기(SCG)는 일반폐기물로 분류되어 매립지로 보내진다.',
    },
    {
      eng: 'There they break down, releasing methane, a greenhouse gas that is approximately 25 times more potent than CO2.',
      kor: '그곳에서 그것들은 분해되며 이산화탄소보다 약 25배 더 강력한 온실가스인 메탄을 배출한다.',
    },
    {
      eng: 'Some SCGs are incinerated instead of being buried, but this releases a lot of CO2: 338 kg per ton.',
      kor: '일부 SCG는 매립되지 않고 소각되는데, 이에 따라 톤당 338kg에 달하는 많은 양의 이산화탄소가 배출된다.',
    },
    {
      eng: 'However, neither of these waste management options takes into account the potential value of coffee grounds.',
      kor: '그러나 이러한 폐기물 관리 옵션 중 어느 것도 커피 찌꺼기의 잠재적 가치를 고려하지 않는다.',
    },
    {
      eng: 'Although the grounds contain valuable organic compounds and minerals, they are simply destroyed.',
      kor: '찌꺼기에는 귀중한 유기 화합물과 미네랄이 포함되어 있지만, 그냥 파괴될 뿐이다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull marginTop='8px'>
          <Scroll tabIndex={0}>
            <Box display='flex' gap='12px' flexDirection='column' paddingBottom='10px'>
              <Box textAlign='center'>
                <Typography fontWeight='bold'>{data[0].eng}</Typography>
                <Typography fontWeight='bold' size={EStyleFontSizes['X-MEDIUM']}>
                  {data[0].kor}
                </Typography>
              </Box>

              <Box background='white' useRound paddingBottom='28px'>
                <Typography color='var(--color-grey-900)'>{data[1].eng}</Typography>
                <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                  {data[1].kor}
                </Typography>
                <Typography color='var(--color-grey-900)'>{data[2].eng}</Typography>
                <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                  {data[2].kor}
                </Typography>
              </Box>
              <Box background='white' useRound paddingBottom='28px'>
                <Typography color='var(--color-grey-900)'>{data[3].eng}</Typography>
                <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                  {data[3].kor}
                </Typography>
              </Box>
              <Box display='flex' gap='12px'>
                <Box maxWidth='340px'>
                  <PinchZoom>
                    <Image width='340px' src={'/L04/SP03-1/HE1-L04-SP03-1-P08.jpg'} alt='' ariaDescribedby='img_desc' />
                    <Box type='hidden' id='img_desc'>
                      커피머신에서 커피 찌꺼기를 분리해내고 있다.
                    </Box>
                  </PinchZoom>
                </Box>
                <Box background='white' useRound paddingBottom='28px'>
                  <Typography color='var(--color-grey-900)'>{data[4].eng}</Typography>
                  <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                    {data[4].kor}
                  </Typography>
                  <Typography color='var(--color-grey-900)'>{data[5].eng}</Typography>
                  <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                    {data[5].kor}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P08;
