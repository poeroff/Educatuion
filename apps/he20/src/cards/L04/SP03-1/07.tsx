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

const P07 = ({ _page = 'P07' }: { _page?: string }) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: ICardData[] = [
    {
      idx: 1,
      listenAndAnswer: [
        {
          question: 'Neuroscience has a long history of exploring treatments for disorders of the nervous system, including the brain and spinal cord.',
          answer: '신경과학은 뇌와 척수를 포함한 신경계 장애에 대한 치료법을 탐구해 온 오랜 역사가 있습니다.',
        },
        {
          question: 'Traditionally, researchers have studied various functions of neural implants, which are medical devices like computer chips that can be implanted in the nervous system.',
          answer: '전통적으로 연구원들은 신경계에 이식될 수 있는 컴퓨터 칩과 같은 의료 기기인 신경 임플란트의 다양한 기능을 연구해 왔습니다.',
        },
        {
          question: 'With the rapid advancement of artificial intelligence (AI), researchers have begun to integrate AI into neural implants.',
          answer: '인공지능 (AI) 의 급속한 발전과 함께 연구원들이 신경 임플란트에 AI 를 통합하기 시작했습니다.',
        },
       
      ],
    },
  ];

  const imageData: { src: string; alt: string }[] = [
    {
      src: '/L04/SP03-1/HE2-L04-SP03-1-P07.jpg',
      alt: '블로그 타이틀 사진으로 인체안에 AI 라는 문구와 톱니바퀴가 그려져 있는 사진이 등록되어 있음',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull marginTop='4px'>
          <Scroll tabIndex={0} height='420px'>
            <Box background='white' useRound paddingBottom='28px'>
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
                              <Typography weight={'500'} color='var(--color-grey-900)'>{value?.question}</Typography>
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

export default P07;