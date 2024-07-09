import { Box, BoxWrap, EStyleFontSizes, Image, List, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

interface ICardData {
  idx: number;
  listenAndAnswer: IListenAndAnswer[];
}

const P10 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: ICardData[] = [
    {
      idx: 1,
      listenAndAnswer: [
        {
          question: 'This morning, we had the opportunity to learn about animal treatment thanks to Molly, an elderly elephant.',
          answer: '오늘 아침에 우리는 나이 든 코끼리인 Molly 덕분에 동물 치료에 대해 배울 수 있는 기회를 가졌다.',
        },
        {
          question:
            'In order to support Jane in taking care of Molly’s foot, we took part in positive reinforcement training, which involves using rewards to encourage desirable behaviors.',
          answer:
            'Molly의 발을 돌보는 데 있어 Jane을 도와주기 위해, 우리는 바람직한 행동을 장려하기 위해 보상을 사용하는 것을 포함하는 긍정적 강화 훈련에 참여했다.',
        },
        {
          question:
            'This training helps reduce the stress that animals experience during controlled situations, such as treatment or a health examination.',
          answer: '이 훈련은 치료나 건강 검진과 같은 통제된 상황 동안 동물들이 경험하는 스트레스를 줄이는 데 도움이 된다.',
        },
        {
          question: 'The good news is Molly seems to be adapting well, and I expect her to get better soon.',
          answer: '다행인 것은 Molly가 잘 적응하는 것 같고, 나는 그녀가 곧 좋아질 것으로 기대한다.',
        },
      ],
    },
  ];

  const imageData: { src: string; alt: string }[] = [];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull marginTop='4px'>
          <Scroll tabIndex={0} height='420px'>
            <Box background='white' useRound paddingBottom='28px'>
              <Box border='none' hAlign='center'>
                <Typography useGap={false} weight='var(--font-weight-bold)'>
                  July 31, Wednesday 7월 31일, 수요일
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' justifyContent='center' gap={20} marginTop={10} marginBottom={10}>
                {imageData.map(img => (
                  <PinchZoom key={img.src}>
                    <Image src={img.src} width='240px' height='50%' alt={img.alt} />
                  </PinchZoom>
                ))}
              </Box>
              <List<ICardData>
                data={data}
                row={({ value }) => (
                  <>
                    <List<IListenAndAnswer>
                      data={value ? value.listenAndAnswer : []}
                      row={({ value }) => (
                        <>
                          <BoxWrap>
                            <Box>
                              <Typography color='var(--color-grey-900)'>{value?.question}</Typography>
                              <Box>
                                <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                                  {value?.answer}
                                </Typography>
                              </Box>
                            </Box>
                          </BoxWrap>
                        </>
                      )}
                    />
                  </>
                )}
              />
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P10;
