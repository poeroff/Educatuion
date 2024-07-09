import { Box, BoxWrap, EStyleFontSizes, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IEngLishAndKorean {
  eng: string;
  kor: string;
}

const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };
  const data: IEngLishAndKorean[] = [
    {
      eng: 'According to the International Coffee Organization (ICO), approximately 10 billion tons of coffee was consumed worldwide between 2020 and 2021, and Koreans made a significant contribution to this huge total, consuming 150,780 tons of coffee.',
      kor: '국제 커피 기구(ICO)에 따르면 2020년부터 2021년까지 전 세계적으로 약 100억 톤의 커피가 소비되었으며, 한국인은 150,780톤의 커피를 소비하며 이 엄청난 총량에 상당한 기여를 했다.',
    },
    {
      eng: 'This means that every Korean adult drank an average of one cup of coffee every day throughout the year.',
      kor: '이는 한국 성인 한 명이 일 년 내내 평균적으로 매일 커피 한 잔을 마셨다는 것을 의미한다.',
    },
    {
      eng: 'The world’s widespread love of coffee comes at a substantial environmental cost, as the extraction process generates significant waste.',
      kor: '커피에 대한 전 세계의 광범위한 사랑은 추출 과정에서 많은 폐기물이 발생하기 때문에 상당한 환경 비용을 초래한다.',
    },
    {
      eng: 'Only 0.2 percent of a coffee bean is used to make coffee, with the remaining 99.8 percent disposed of as waste.',
      kor: '커피 원두 중 0.2%만이 커피를 만드는 데 사용되며, 나머지 99.8%는 폐기물로 처리된다.',
    },
    {
      eng: 'As a result, the vast quantity of coffee consumed worldwide produces millions of tons of coffee waste each year.',
      kor: '그 결과, 전 세계적으로 소비되는 엄청난 양의 커피로 인해 매년 수백만 톤의 커피 폐기물이 발생한다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull marginTop='4px'>
          <Scroll tabIndex={0}>
            <Box display='flex' gap='12px' flexDirection='column' paddingBottom='10px'>
              <Box display='flex' gap='12px'>
                <Box maxWidth='340px'>
                  <PinchZoom>
                    <Image width='340px' src={'/L04/SP03-1/HE1-L04-SP03-1-P07-01.jpg'} alt='' ariaDescribedby='img_desc1' />
                    <Box type='hidden' id='img_desc1'>
                      남녀 세 명이 탁자에 나란히 앉아 커피를 마시며 재미있게 이야기를 나누고 있다.{' '}
                    </Box>
                  </PinchZoom>
                </Box>
                <Box background='white' useRound paddingBottom='28px'>
                  <Typography color='var(--color-grey-900)'>{data[0].eng}</Typography>
                  <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                    {data[0].kor}
                  </Typography>
                  <Typography color='var(--color-grey-900)'>{data[1].eng}</Typography>
                  <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                    {data[1].kor}
                  </Typography>
                </Box>
              </Box>
              <Box display='flex' gap='12px'>
                <Box maxWidth='340px'>
                  <PinchZoom>
                    <Image width='340px' src={'/L04/SP03-1/HE1-L04-SP03-1-P07-02.jpg'} alt='' ariaDescribedby='img_desc2' />
                    <Box type='hidden' id='img_desc2'>
                      <p>이미지 제목</p>
                      <p>How Much of a coffee bean is used to make coffee?</p>
                      <p>커피콩이 커피로 만들어지는 과정의 모습 0.2%</p>
                      <p>커피콩이 폐기물이 되는 과정의 모습 99.8%</p>
                    </Box>
                  </PinchZoom>
                </Box>
                <Box background='white' useRound paddingBottom='28px'>
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
              </Box>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P07;
