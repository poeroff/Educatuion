import { Box, BoxWrap, EStyleFontSizes, List, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  question: string[];
  answer: string[];
}

const P09 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: IListenAndAnswer[] = [
    {
      question: ['We traveled all night, mostly in silence, listening to Nani chanting in the darkness.'],
      answer: ['우리는 어둠 속에서 할아버지의 낭송을 들으며, 조용히 밤새 달렸다.'],
    },
    {
      question: ['Just before noon, we arrived at a small town called Murupara.'],
      answer: ['정오가 되기 직전, 우리는 Murupara라고 불리는 작은 마을에 도착했다.'],
    },
    {
      question: ['After turning the corner, we saw an old man standing in front of a house.'],
      answer: ['모퉁이를 돌자, 우리는 한 노인이 집 앞에 서 있는 것을 보았다.'],
    },
    {
      question: ['He welcomed Nani Tama with a gentle smile, but in his eyes, I saw the message, “We must hurry.”'],
      answer: ['그는 온화한 미소로 할아버지를 맞이했지만, 그의 눈에서 나는 이런 메시지를 읽을 수 있었다. “서둘러야겠구나.”'],
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull marginTop='4px'>
          <Scroll tabIndex={0} height='420px'>
            <Box background='white' useRound paddingBottom='28px'>
              <List
                data={data}
                row={({ value, index }) =>
                  index === 2 ? (
                    <Box>
                      <Typography color='var(--color-grey-900)'>{value?.question[0]}</Typography>
                      <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                        {value?.answer[0]}
                      </Typography>
                      <Typography color='var(--color-grey-900)'>{value?.question[1]}</Typography>
                      <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                        {value?.answer[1]}
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Typography color='var(--color-grey-900)'>{value?.question[0]}</Typography>
                      <Box height='60px'>
                        <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                          {value?.answer[0]}
                        </Typography>
                      </Box>
                    </Box>
                  )
                }
              />
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P09;
