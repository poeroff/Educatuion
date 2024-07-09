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

const P09 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: ICardData[] = [
    {
      idx: 1,
      listenAndAnswer: [
        {
          question: 'Today, we did something special for Ben and Lily.',
          answer: '오늘 우리는 Ben과 Lily를 위해 특별한 일을 했다.',
        },
        {
          question: 'To help the bears restore their natural instincts, we carried out some special activities known as “behavioral enrichment.”',
          answer: '그 곰들이 타고난 본능을 회복하는 것을 돕기 위해, 우리는 "행동 강화"라고 알려진 몇 가지 특별한 활동을 수행했다.',
        },
        {
          question: 'For example, we made honey-log feeders for the bears.',
          answer: '예를 들어서, 우리는 곰들을 위해 통나무 꿀 먹이통을 만들었다.',
        },
        {
          question: 'First, we made several holes in a log and filled them with honey.',
          answer: '먼저 우리는 통나무에 몇 개의 구멍을 뚫어 꿀을 채웠다.',
        },
        {
          question: 'Then, we hung the honey-log feeders on trees near the bears’ habitat.',
          answer: '그러고 나서 우리는 통나무 꿀 먹이통을 곰들의 서식지 근처 나무에 매달았다.',
        },
        {
          question:
            'As bears are intelligent and curious creatures, they can become bored and stressed when lacking mental and physical stimulation.',
          answer: '곰들은 똑똑하고 호기심이 많은 생명체이기 때문에 그들이 정신적, 신체적 자극이 부족할 때 지루해하고 스트레스를 받을 수 있다.',
        },
        {
          question: 'The honey-log feeders stimulate their natural curiosity and keep them as active as they would be in the wild.',
          answer: '통나무 꿀 먹이통은 그들의 타고난 호기심을 자극하고 야생에서만큼 활동적이 되도록 해준다.',
        },
      ],
    },
  ];

  const imageData: { src: string; alt: string }[] = [
    {
      src: '/L01/SP03-1/HE2-L01-SP03-1-P09.jpg',
      alt: '허니 로그 피더를 가지고 놀고 있는 곰',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull marginTop='4px'>
          <Scroll tabIndex={0} height='420px'>
            <Box background='white' useRound paddingBottom='28px'>
              <Box border='none' hAlign='center'>
                <Typography useGap={false} weight='var(--font-weight-bold)'>
                  July 30, Tuesday 7월 30일, 화요일
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

export default P09;
