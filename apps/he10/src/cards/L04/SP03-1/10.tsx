import { Box, BoxWrap, EStyleFontSizes, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IEngLishAndKorean {
  eng: string;
  kor: string;
}
const P10 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };
  const data: IEngLishAndKorean[] = [
    {
      eng: 'How does circular economy work?',
      kor: '순환 경제는 어떻게 작동하는가? (2)',
    },
    {
      eng: 'This fertilizer is later sold back to the coffee shop chain.',
      kor: '이 비료는 나중에 커피숍 체인에 다시 판매된다.',
    },
    {
      eng: 'The chain provides the fertilizer to local eco friendly farmers, who then sell their produce back to the chain.',
      kor: '체인은 지역 친환경 농부들에게 비료를 제공하고, 농부들은 자기 농산물을 체인에 다시 판매한다.',
    },
    {
      eng: 'The farm produce can be used to create various food items, such as rice chips and dried sweet potatoes, which are sold in the chain’s coffee shops.',
      kor: '농산물들은 라이스 칩이나 말린 고구마 같은 다양한 식품을 만드는 데 사용될 수 있으며, 그것들은 체인 커피숍에서 판매된다.',
    },
    {
      eng: 'By repurposing coffee grounds in this manner, related businesses and local farmers can benefit both economically and environmentally.',
      kor: '이러한 방식으로 커피 찌꺼기를 재활용함으로써 관련 기업과 지역 농민들은 경제적이면서 환경적인 혜택을 모두 누릴 수 있다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} useExtend>
      <Box textAlign='center' paddingBottom='12px'>
        <Box>
          <Typography fontWeight='bold'>{data[0].eng}</Typography>
        </Box>
        <Typography fontWeight='bold' size={EStyleFontSizes['X-MEDIUM']}>
          {data[0].kor}
        </Typography>
      </Box>
      <BoxWrap useFull height='80%'>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image size='100%' src={'/L04/SP03-1/HE1-L04-SP03-1-P10.jpg'} alt='' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>커피가 생산되고 소비되는 과정을 선형적, 원형적으로 나타낸 인포그래픽</p>
              <p>이미지 제목: Linear and Circular Economies of Spent Coffee Grounds</p>
              <p>슬라이드 텍스트</p>
              <p>Coffee Beans</p>
              <p>Coffee</p>
              <p>Spent Coffee Grounds(SCGs)</p>
              <p>Methane</p>
              <p>Buried</p>
              <p>CO2</p>
              <p>Incinerated</p>
              <p>Coffee Shop</p>
              <p>Collection Center</p>
              <p>Fertilizer Company</p>
              <p>Organic Fertilizer</p>
              <p>Eco-Friendly Farm</p>
              <p>Farm Produce</p>
              <p>Coffee Shop Chain</p>
              <p>Food Items</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull>
          <Box useFull background='white' useRound>
            <Scroll height='100%' tabIndex={0}>
              <Box useFull display='flex' gap='10px' flexDirection='column'>
                <Typography color='var(--color-grey-900)'>{data[1].eng}</Typography>
                <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                  {data[1].kor}
                </Typography>
                <Typography color='var(--color-grey-900)'>{data[2].eng}</Typography>
                <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                  {data[2].kor}
                </Typography>
                <Typography color='var(--color-grey-900)'>{data[3].eng}</Typography>
                <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                  {data[3].kor}
                </Typography>
                <Typography color='var(--color-grey-900)'>{data[4].eng}</Typography>
                <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                  {data[4].kor}
                </Typography>
              </Box>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P10;
