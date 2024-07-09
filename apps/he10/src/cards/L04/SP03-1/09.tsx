import { Box, BoxWrap, EStyleFontSizes, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IEngLishAndKorean {
  eng: string;
  kor: string;
}

const P09 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };
  const data: IEngLishAndKorean[] = [
    {
      eng: 'What is circular economy?',
      kor: '순환 경제란 무엇인가?',
    },
    {
      eng: 'Companies, organizations, and governments around the world are working hard to improve the environmental impact of the coffee industry through circular economy measures.',
      kor: '전 세계 기업, 단체, 정부는 순환 경제 조치를 통해 커피 산업이 환경에 미치는 영향을 개선하려고 열심히 노력하고 있다.',
    },
    {
      eng: 'A circular economy promotes the reuse of resources for as long as possible, reducing waste and environmental costs.',
      kor: '순환 경제는 가능한 한 오랫동안 자원을 재사용하도록 촉진하여 폐기물과 환경 비용을 줄인다.',
    },
    {
      eng: 'How does circular economy work?',
      kor: '순환 경제는 어떻게 작동하는가? (1)',
    },
    {
      eng: 'An example of a circular economy in action occurs when a chain of coffee shops collaborates with an organization to collect spent coffee grounds from its shops.',
      kor: '순환 경제가 실행되는 예는 커피숍 체인이 매장에서 사용된 커피 찌꺼기를 수집하는 단체와 협력할 때 생긴다.',
    },
    {
      eng: 'These grounds are processed to remove impurities and dried out.',
      kor: '이 찌꺼기는 불순물을 제거하기 위해 가공되고 건조된다.',
    },
    {
      eng: 'The resulting SCGs are sold to fertilizer companies, where they are transformed into organic fertilizer.',
      kor: '생성된 SCG는 비료회사에 판매되는데 그곳에서 유기비료로 전환된다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull marginTop='8px'>
          <Scroll tabIndex={0}>
            <Box display='flex' gap='12px' flexDirection='column' paddingBottom='10px'>
              <Box textAlign='center'>
                <Box>
                  <Typography fontWeight='bold'>{data[0].eng}</Typography>
                </Box>
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
              <Box textAlign='center' marginTop='8px'>
                <Box>
                  <Typography fontWeight='bold'>{data[3].eng}</Typography>
                </Box>
                <Typography fontWeight='bold' size={EStyleFontSizes['X-MEDIUM']}>
                  {data[3].kor}
                </Typography>
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
                <Typography color='var(--color-grey-900)'>{data[6].eng}</Typography>
                <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                  {data[6].kor}
                </Typography>
              </Box>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P09;
