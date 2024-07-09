import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, PinchZoom, Image, ESvgType, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import DownArrow from '@/assets/icon/down_arrow.svg';

interface IListenAndAnswer {
  question: string[];
  answer: string[];
}

const P09 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const data: IListenAndAnswer[] = [
    {
      question: ['Neanderthals were known to be intelligent and physically superior to Homo sapiens.'],
      answer: ['네안데르탈인은 지적이고 신체적으로 호모 사피엔스보다 뛰어나다고 알려져 있었습니다.'],
    },
    {
      question: [
        'Despite these attributes, however, it was Homo sapiens who ultimately survived and thrived.',
        'One possible explanation is that they lived in larger communities that promoted cooperation and the free exchange of knowledge, while Neanderthals tended to live in smaller groups.',
      ],
      answer: [
        '그러나 이러한 특성에도 불구하고, 궁극적으로 생존하고 번성한 것은 호모 사피엔스였습니다.',
        '한 가지 가능한 설명은 그들이 협력과 지식의 자유로운 교환을 촉진하는 더 큰 공동체에서 사는 반면, 네안데르탈인은 더 작은 집단에서 사는 경향이 있다는 것입니다.',
      ],
    },
    {
      question: [
        'These social differences may have given Homo sapiens a competitive advantage over Neanderthals, allowing them to adapt to an ever-changing environment.',
      ],
      answer: [
        '이러한 사회적 차이는 호모 사피엔스가 끊임없이 변화하는 환경에 적응하도록 하면서, 네안데르탈인에 비해 경쟁적인 이점을 주었을지도 모릅니다.',
      ],
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull maxWidth='340px' vAlign='center'>
          <PinchZoom>
            <Image
              size='100%'
              src={'/L01/SP03-1/HE1-L01-SP03-1-P09.jpg'}
              alt='네안데르탈인과 호모 사피언스 비교 사진 제목 Neanderthals vs. Homo Sapiens (Case 3)  How They Lived in Groups'
              ariaDescribedby='img_desc'
            />
          </PinchZoom>
        </Box>
        <Box useFull marginTop='4px'>
          <Scroll tabIndex={0}>
            <Box display='flex' gap='12px' flexDirection='column'>
              <Box background='white' useRound paddingBottom='28px'>
                <Typography color='var(--color-grey-900)'>{data[0].question[0]}</Typography>
                <Box height='70px'>
                  <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-MEDIUM']}>
                    {data[0].answer[0]}
                  </Typography>
                </Box>
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
              <Box background='white' useRound paddingBottom='28px' height='340px'>
                <Typography color='var(--color-grey-900)'>{data[2].question[0]}</Typography>
                <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-MEDIUM']}>
                  {data[2].answer[0]}
                </Typography>
                <Typography color='var(--color-grey-900)'>{data[2].question[1]}</Typography>
                <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-MEDIUM']}>
                  {data[2].answer[1]}
                </Typography>
              </Box>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P09;
