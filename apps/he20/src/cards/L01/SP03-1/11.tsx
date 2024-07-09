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

const P11 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: ICardData[] = [
    {
      idx: 1,
      listenAndAnswer: [
        {
          question: 'On the last day, we were called to the rescue center due to a sudden emergency.',
          answer: '마지막 날에 우리는 갑작스러운 응급 상황으로 인해 구조 센터로 호출되었다.',
        },
        {
          question: 'Some dehydrated birds had fallen out of the sky in the city and were brought to the center.',
          answer: '일부 탈수 증세를 보이는 새들이 도시의 하늘에서 떨어져 센터로 옮겨져 왔다.',
        },
        {
          question:
            'Following the veterinarian’s guidance, we provided water to the birds while the vets treated their broken wings and legs and injected them with vitamins for a speedy recovery.',
          answer:
            '수의사의 안내에 따라서, 수의사들이 새의 부러진 날개와 다리를 치료하고 빠른 회복을 위해 비타민을 주입하는 동안 우리는 새들에게 물을 주었다.',
        },
        {
          question: 'It was shocking that this type of accident happens every year since the high temperatures dry up water sources in the city.',
          answer: '높은 기온이 도시의 상수원을 바싹 마르게 만들어서 이런 종류의 사고가 매년 일어난다는 것은 충격적이었다.',
        },
        {
          question: 'Caring for the birds, I couldn’t help but reflect on the impact of human activities on climate change and how it harms animals.',
          answer:
            '새들을 돌보는 동안, 나는 인간의 활동이 기후 변화에 주는 영향과 그것이 동물들에게 어떻게 해를 끼치는지에 대해 생각하지 않을 수 없었다.',
        },
      ],
    },
  ];

  const imageData: { src: string; alt: string }[] = [
    {
      src: '/L01/SP03-1/HE2-L01-SP03-1-P11.jpg',
      alt: '새에게 주사기로 물을 먹여 주고 있다.',
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
                  August 1, Thursday 8월 1일, 목요일
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

export default P11;
