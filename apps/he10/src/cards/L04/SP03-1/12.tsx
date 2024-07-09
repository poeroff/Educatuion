import { Box, BoxWrap, EStyleFontSizes, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IEngLishAndKorean {
  eng: string;
  kor: string;
}

const P12 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };
  const data: IEngLishAndKorean[] = [
    {
      eng: 'Korea has shown a growing interest in recycling spent coffee grounds in recent years.',
      kor: '최근 몇 년간 한국은 커피 찌꺼기 재활용에 대해 높은 관심을 보여왔다.',
    },
    {
      eng: 'The government is taking steps toward the creation of a sustainable recycling system in the coffee industry, while companies are dedicating themselves to researching and developing new uses for coffee waste.',
      kor: '정부가 커피 산업에서 지속 가능한 재활용 시스템 구축을 향해 나아가는 동안에, 기업들은 커피 폐기물의 새로운 용도를 연구하고 개발하는 데 전념하고 있다.',
    },
    {
      eng: 'By recycling materials such as coffee waste, individuals can also help protect the environment.',
      kor: '커피 찌꺼기와 같은 물질을 재활용함으로써 개인도 환경을 보호하는 데 도움을 줄 수 있다.',
    },
    {
      eng: 'With continued efforts, the recycling of used coffee grounds is expected to increase, encouraging more sustainable methods of enjoying coffee for years to come.',
      kor: '지속적인 노력을 통해 앞으로 수년간 커피를 즐길 수 있는 더 지속 가능한 방법을 장려하며, 사용된 커피 찌꺼기의 재활용이 증가할 것으로 예상된다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box background='white' useRound paddingBottom='28px'>
          <Scroll tabIndex={0}>
            <Typography color='var(--color-grey-900)'>{data[0].eng}</Typography>
            <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
              {data[0].kor}
            </Typography>
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
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P12;
