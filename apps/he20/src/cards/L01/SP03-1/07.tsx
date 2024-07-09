import { Box, BoxWrap, EStyleFontSizes, Image, List, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  question: string;
  answer: string;
  imageSrc?: string;
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
          question: 'As the leader of our school club Care for Animals, I organized a volunteer trip to an animal sanctuary for my club members.',
          answer: '우리 학교 동아리 Care for Animals의 리더로서, 나는 우리 동아리 회원들을 위한 자원봉사 여행을 동물 보호 구역으로 가기로 했다.',
          imageSrc: '/L01/SP03-1/HE2-L01-SP03-1-P07.jpg',
        },
        {
          question: 'An animal sanctuary is a special place where rescued, injured, or abused animals can live in a safe and caring environment.',
          answer:
            '동물 보호 구역은 구조되거나 상처를 입었거나 학대를 당한 동물들이 안전하고 보살핌을 받을 수 있는 환경에서 살 수 있는 특별한 장소이다.',
        },
        {
          question: 'All the club members and I agreed that the sanctuary would be the perfect place to learn about animal care.',
          answer: '모든 동아리 회원과 나는 그 보호 구역이 동물 보호에 대해 배울 수 있는 완벽한 장소라는 것에 동의했다.',
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
                          <BoxWrap>
                            {value?.imageSrc && (
                              <Box display='flex' alignItems='center' paddingLeft={15}>
                                <PinchZoom>
                                  <Image
                                    src={value?.imageSrc}
                                    width='240px'
                                    height='50%'
                                    alt='한 여성이 VOLUNTEER이라고 쓰인 티셔츠를 입고 엄지 손가락을 들어올린 채 웃고 있다.'
                                  />
                                </PinchZoom>
                              </Box>
                            )}
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
                  </Box>
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
