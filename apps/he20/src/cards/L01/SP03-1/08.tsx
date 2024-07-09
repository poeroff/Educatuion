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

const P08 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: ICardData[] = [
    {
      idx: 1,
      listenAndAnswer: [
        {
          question: 'Our club arrived at the Free Animals sanctuary.',
          answer: '우리 동아리는 Free Animals 보호 구역에 도착했다.',
        },
        {
          question: 'Our tasks for the day included cleaning the shelter and preparing food for the animals.',
          answer: '그날 우리의 임무는 주거지를 청소하고 동물들을 위해 음식을 준비하는 것이었다.',
        },
        {
          question: 'While cleaning the habitats, we checked if there were any hazards that could harm the animals.',
          answer: '서식지를 청소하는 동안 우리는 동물들에게 해를 끼칠 수 있는 위험 요소들이 있는지 확인했다.',
        },
        {
          question: 'Then, we helped prepare the food by cutting up fruits and vegetables and dividing them into several large baskets.',
          answer: '그러고 나서, 우리는 과일과 채소를 자르고 그것들을 몇 개의 큰 바구니로 나누어서 먹이를 준비하는 것을 도왔다.',
        },
        {
          question: 'Spending the whole day helping out with the animals was an incredible experience for me.',
          answer: '동물들을 돕는 데 하루 종일 시간을 보내는 것은 나에게 놀라운 경험이었다.',
        },
        {
          question: 'It was a rewarding experience, and I was impressed with the attention the staff members gave to all the animals.',
          answer: '그것은 보람 있는 경험이었고, 나는 직원들이 모든 동물에게 쏟는 애정이 인상 깊었다.',
        },
      ],
    },
  ];

  const imageData: { src: string; alt: string }[] = [
    {
      src: '/L01/SP03-1/HE2-L01-SP03-1-P08-01.jpg',
      alt: '과일을 손질하고 있는 사람들',
    },
    {
      src: '/L01/SP03-1/HE2-L01-SP03-1-P08-02.jpg',
      alt: '벽을 청소하고 있는 여성',
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
                  July 29, Monday 7월 29일, 월요일
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

export default P08;
