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

const P08 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: ICardData[] = [
    {
      idx: 1,
      listenAndAnswer: [
        {
          question: 'For some time, my grandfather had been busy writing down the village genealogy, known as the whakapapa.',
          answer: '한동안 할아버지는 와카파파라고 불리는 마을의 족보를 쓰느라 바쁘셨다. ',
        },
        {
          question: 'The whakapapa had been in his old house.',
          answer: '와카파파는 그의 예전 집에 있었다.',
        },
        {
          question: 'But then came the night of the fire, which ran through the house and destroyed our past.',
          answer: '어느 날 한밤중에 화재가 일어났고, 화재는 집을 휩쓸고 우리의 과거도 파괴했다.',
        },
      ],
    },
    {
      idx: 2,
      listenAndAnswer: [
        {
          question: 'Trying to find a way out of the ashes of the past, Nani began to write the whakapapa again with his shaky hands.',
          answer: '과거의 잿더미로부터 길을 찾아가면서 할아버지는 떨리는 손으로 와카파파를 다시 쓰기 시작했다.',
        },
        {
          question: 'He chanted the names of the ancestors, joining the past to the present once more.',
          answer: '그는 조상들의 이름을 낭송하면서 과거를 현재와 다시 한번 연결했다. ',
        },
        {
          question: 'It took Nani Tama almost two years to gather most of the whakapapa, but there were still missing names he needed to fill in.',
          answer: '할아버지가 대부분의 와카파파를 다시 완성하는 데는 거의 2년이 걸렸지만, 여전히 채워야 할 빠진 이름들이 있었다.',
        },
        {
          question: 'Now, he wanted me to drive him to Murupara to finish his work.',
          answer: '이제 할아버지는 남은 작업을 완성하시기 위해, 내가 그를 Murupara에 데려다주기를 원하셨다.',
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
                          <Box>
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

export default P08;
