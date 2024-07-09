import { Box, BoxWrap, ChipButton, EChipButtonType, EStyleFontSizes, List, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

interface ICardData {
  idx: number;
  listenAndAnswer: IListenAndAnswer[];
}

const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: ICardData[] = [
    {
      idx: 1,
      listenAndAnswer: [
        {
          question: 'The phone rang, and it was my dad calling from my hometown, Waituhi.',
          answer: '전화벨이 울렸고, 그것은 고향 Waituhi에서 걸려온 아버지의 전화 였다.',
        },
        {
          question: '“Can you take a week off?” he asked. “Your Nani Tama wants you here.”',
          answer: '“일주일 정도 휴가를 낼 수 있겠니?”라고 아버지가 물었다. “할아버지가 네가 여기 오길 원하신다.”',
        },
        {
          question: '“I need your help, Grandson. I must go to Murupara to finish the whakapapa. Drive me there.”',
          answer: '“손주야, 너의 도움이 필요하단다. 내가 와카파파를 끝마치려면 Murupara에 가야만 해. 나를 그곳으로 태워다주렴.”',
        },
      ],
    },
    {
      idx: 2,
      listenAndAnswer: [
        {
          question: 'I just knew I had no choice. “All right, Nani,” I replied with a sigh. “I’ll come.”',
          answer: '나는 선택의 여지가 없다는 것을 알았다. “알겠어요, 할아버지.” 나는 한숨을 쉬며 대답했다. “제가 갈게요.”',
        },
      ],
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull marginTop='4px'>
          <Scroll tabIndex={0} height='420px'>
            <List<ICardData>
              data={data}
              row={({ value }) => (
                <>
                  <Box background='white' useRound paddingBottom='28px'>
                    <List<IListenAndAnswer>
                      data={value ? value.listenAndAnswer : []}
                      row={({ value }) => (
                        <>
                          <Typography color='var(--color-grey-900)'>{value?.question}</Typography>
                          <Box height='60px'>
                            <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                              {value?.answer}
                            </Typography>
                          </Box>
                        </>
                      )}
                    />
                  </Box>
                  {value ? (
                    value.idx === 1 ? (
                      <Box hAlign={'center'} marginRight={'8px'} marginTop={'8px'}>
                        <ChipButton width='38px' height='38px' status={EChipButtonType.DOWN} />
                      </Box>
                    ) : (
                      ''
                    )
                  ) : (
                    ''
                  )}
                </>
              )}
            />
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P07;
