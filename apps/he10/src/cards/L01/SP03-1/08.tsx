import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, PinchZoom, Image, ESvgType, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import DownArrow from '@/assets/icon/down_arrow.svg';

interface IListenAndAnswer {
  question: string[];
  answer: string[];
}

const P08 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: IListenAndAnswer[] = [
    {
      question: [
        'When placed with partners that the chimpanzees knew, they were able to work together to get the food.',
        'However, when paired with new partners, the chimpanzees usually failed to get the food, and when they occasionally succeeded, they did not share the food with their partner.',
      ],
      answer: [
        '침팬지들이 알고 있는 파트너와 함께 있을 때, 그들은 음식을 얻기 위해 함께 일할 수 있었습니다.',
        '그러나, 새로운 파트너와 짝을 지을 때, 침팬지들은 보통 음식을 얻는데 실패했고, 가끔 성공했을 때, 그들은 파트너와 음식을 공유하지 않았습니다.',
      ],
    },
    {
      question: [
        'The bonobos, on the other hand, solved the problem regardless of which individual they were paired with, and they were also more willing to share the food.',
      ],
      answer: ['반면에 보노보들은 어느 개인과 짝을 이루는지에 관계없이 문제를 해결했고, 음식을 기꺼이 공유했습니다.'],
    },
    {
      question: ['Experts suggest that bonobo’s friendly nature has helped their species survive.'],
      answer: ['전문가들은 보노보들의 친절한 본성이 그들의 종의 생존을 도왔다고 제안합니다.'],
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull maxWidth='325px' vAlign='center' flexDirection='column'>
          <PinchZoom>
            <Image size='100%' src={'/L01/SP03-1/HE1-L01-SP03-1-P08-01.jpg'} alt='' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              침팬지와 보노보의 비교 사진 이미지 제목: Chimpanzees vs. Bonobos(Case 2) 슬라이드 텍스트 Similar look, Different Nature Chimpanzees
              Bonobos
            </Box>
          </PinchZoom>
          <PinchZoom>
            <Image size='100%' src={'/L01/SP03-1/HE1-L01-SP03-1-P08-02.jpg'} alt='' ariaDescribedby='img_desc2' />
            <Box type='hidden' id='img_desc2'>
              보노보 두 마리가 철장 속 바나나를 꺼내기 위해 협력하는 그림 이미지 제목: Chimpanzees vs. Bonobos(Case 2) 슬라이드 텍스트 How Bonobos
              Cooperated
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull marginTop='4px'>
          <Scroll tabIndex={0}>
            <Box display='flex' gap='12px' flexDirection='column' paddingBottom='10px'>
              <Box background='white' useRound paddingBottom='28px'>
                <Typography color='var(--color-grey-900)'>{data[0].question[0]}</Typography>
                <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-MEDIUM']}>
                  {data[0].answer[0]}
                </Typography>
                <Typography color='var(--color-grey-900)'>{data[0].question[1]}</Typography>
                <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-MEDIUM']}>
                  {data[0].answer[1]}
                </Typography>
              </Box>{' '}
              <Box hAlign='center'>
                <SvgIcon src={DownArrow} type={ESvgType.IMG} alt='아래를 향한 화살표' />
              </Box>
              <Box background='white' useRound paddingBottom='28px'>
                <Typography color='var(--color-grey-900)'>{data[1].question[0]}</Typography>
                <Box height='80px'>
                  <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-MEDIUM']}>
                    {data[1].answer[0]}
                  </Typography>
                </Box>
              </Box>
              <Box hAlign='center'>
                <SvgIcon src={DownArrow} type={ESvgType.IMG} alt='아래를 향한 화살표' />
              </Box>
              <Box background='white' useRound paddingBottom='28px'>
                <Typography color='var(--color-grey-900)'>{data[2].question[0]}</Typography>
                <Box height='70px'>
                  <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-MEDIUM']}>
                    {data[2].answer[0]}
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

export default P08;
