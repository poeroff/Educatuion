import { Box, BoxWrap, EStyleFontSizes, List, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

interface ICardData {
  idx: number;
  listenAndAnswer: IListenAndAnswer[];
}

const P12 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: ICardData[] = [
    {
      idx: 1,
      listenAndAnswer: [
        {
          question: 'Saying goodbye to the animals and staff, I felt grateful for the opportunity to volunteer.',
          answer: '동물들과 직원들에게 작별 인사를 하면서 나는 이런 자원봉사를 하게 된 기회에 정말 감사했다.',
        },
        {
          question: 'From this experience, I learned the importance of treating animals with respect and care.',
          answer: '이번 경험으로부터 나는 존중과 보살핌으로 동물들을 대해야 하는 것의 중요성을 알게 되었다.',
        },
        {
          question: 'I also came to realize that humans are just another kind of animal and share the Earth with all other living creatures.',
          answer: '또한 나는 인간도 그저 다른 동물일 뿐이며 다른 동식물들과 지구를 공유하는 것이라는 사실을 깨달았다.',
        },
        {
          question: "Hopefully, I'll have the chance to  volunteer  at  another  sanctuary  next  summer.",
          answer: '바라건대, 내년에도 다른 보호 구역에서 자원봉사 할 기회를 갖고 싶다.',
        },
      ],
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull marginTop='4px'>
          <Scroll tabIndex={0} height='420px'>
            <Box background='white' useRound paddingBottom='28px'>
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

export default P12;
