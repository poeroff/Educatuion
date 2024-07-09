import { Scroll, SvgIcon, ESvgType, BoxWrap, Box, TMainHeaderInfoTypes, Typography, PinchZoom, Image, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import DownArrow from '@/assets/icon/down_arrow.svg';

const P10 = () => {
  // const cdnPath = import.meta.env.VITE_CDN_PATH;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box padding='0 20px'>
          <Box background='gray' border='none' hAlign='center'>
            <Typography useGap={false} weight={700} style={{ width: '100%', textAlign: 'center' }}>
              The Science Behind Noise-Cancelling Headphones
              <br />
              노이즈 캔슬링 헤드폰 뒤에 숨겨진 과학 2
            </Typography>
          </Box>
          <Box display='flex' justifyContent='center' margin='20px 20px 0 20px'>
            <PinchZoom>
              <Image src={'/L03/SP03-1/HE1-L03-SP03-1-P09.jpg'} width='420px' alt='노이즈캔슬링 헤드폰의 작동 원리를 설명하는 그림이다.' />
            </PinchZoom>
          </Box>
          <Box background='white' useRound margin='8px 0' padding='8px'>
            <Typography color='var(--color-grey-900)'>{`It is not easy to entirely eliminate external noise with this technology.`}</Typography>
            <Typography
              color='var(--color-blue-900)'
              size={EStyleFontSizes['X-MEDIUM']}
            >{`이 기술로 외부 소음을 완전히 제거하는 것은 쉽지 않다.`}</Typography>
            <Typography
              style={{ marginTop: 16 }}
              color='var(--color-grey-900)'
            >{`To achieve full noise cancellation, the circuitry must convert the noise into digital data and instantly transmit the opposite sound to the speakers as soon as the noise reaches the microphones.`}</Typography>
            <Typography
              color='var(--color-blue-900)'
              size={EStyleFontSizes['X-MEDIUM']}
            >{`완전한 소음 제거를 이루기 위해서 회로는 소음을 디지털 데이터로 변환하고 소음이 마이크에 도달하자마자 반대 소리를 스피커로 즉시 전송해야 한다.`}</Typography>
          </Box>
          <Box hAlign='center' margin='16px 0'>
            <SvgIcon src={DownArrow} type={ESvgType.IMG} alt='아래를 향한 화살표' />
          </Box>
          <Box background='white' useRound margin='8px 0' padding='8px'>
            <Typography color='var(--color-grey-900)'>{`Therefore, this noise-cancellation technology is effective for predictable sounds, and it’s relatively less effective for inconsistent sounds.`}</Typography>
            <Typography
              color='var(--color-blue-900)'
              size={EStyleFontSizes['X-MEDIUM']}
            >{`따라서 이 노이즈 캔슬링 기술은 규칙적인 소리에 효과적이며, 일관되지 않은 소리에는 상대적으로 덜 효과적이다.`}</Typography>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P10;
