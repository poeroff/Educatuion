import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, PinchZoom, Image, SvgIcon, ESvgType } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import DownArrow from '@/assets/icon/down_arrow.svg';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'When he pointed to the cup with the food, the dogs found it easily.',
      answer: '먹이가 있는 컵을 가리키자 개들은 쉽게 찾아냈습니다.',
    },
    {
      question: 'The wolves, however, struggled and chose cups at random, paying no attention to his gestures.',
      answer: '하지만 늑대들은 고군분투하며 무작위로 컵을 골랐습니다.',
    },
    {
      question:
        'Dr. Hare suggested that the friendly nature of dogs probably provided them a survival advantage that allowed their population to grow larger than that of wolves.',
      answer:
        'Hare 박사는 개들의 친근한 성격이 아마도 그들에게 늑대들보다 더 많은 개체 수를 증가시킬 수 있는 생존의 이점을 제공했을 것이라고 제안했습니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull maxWidth='340px' vAlign='center'>
          <PinchZoom>
            <Image size='100%' src={'/L01/SP03-1/HE1-L01-SP03-1-P07.jpg'} alt='' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              개와 늑대 사진 아래 각각의 설명이 적힌 인포그래픽 Dogs vs. Wolves (Case 1) Dogs followed Dr. Hare’s Gestures 화살표 found the cup with
              the food easily Wolves paid no attention to his gestures 화살표 struggled and chose cups randomly
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull marginTop='4px'>
          <Scroll tabIndex={0}>
            <Box display='flex' gap='12px' flexDirection='column' paddingBottom='10px'>
              <Box background='white' useRound paddingBottom='28px'>
                <Typography color='var(--color-grey-900)'>{data[0].question}</Typography>
                <Box height='50px'>
                  <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-MEDIUM']}>
                    {data[0].answer}
                  </Typography>
                </Box>
              </Box>
              <Box background='white' useRound paddingBottom='28px'>
                <Typography color='var(--color-grey-900)'>{data[1].question}</Typography>
                <Box height='55px'>
                  <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-MEDIUM']}>
                    {data[1].answer}
                  </Typography>
                </Box>
              </Box>
              <Box hAlign='center'>
                <SvgIcon src={DownArrow} type={ESvgType.IMG} alt='아래를 향한 화살표' />
              </Box>
              <Box background='white' useRound paddingBottom='28px'>
                <Typography color='var(--color-grey-900)'>{data[2].question}</Typography>
                <Box height='120px'>
                  <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-MEDIUM']}>
                    {data[2].answer}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P07;
