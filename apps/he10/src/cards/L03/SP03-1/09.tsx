import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, Typography, PinchZoom, Image, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P09 = () => {
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
              노이즈 캔슬링 헤드폰 뒤에 숨겨진 과학 1
            </Typography>
          </Box>
          <Box display='flex' marginTop='20px'>
            <Box display='flex' alignItems='center'>
              <PinchZoom>
                <Image src={'/L03/SP03-1/HE1-L03-SP03-1-P09.jpg'} width='346px' alt='노이즈캔슬링 헤드폰의 작동 원리를 설명하는 그림이다.' />
              </PinchZoom>
            </Box>
            <Box background='white' useRound margin='0 0 0 12px' padding='8px'>
              <Typography color='var(--color-grey-900)'>{`Destructive interference is used in the noise-cancelling feature of headphones when we listen to music.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`상쇄 간섭은 우리가 음악을 들을 때 헤드폰의 노이즈 캔슬링 기능에 사용된다.`}</Typography>
            </Box>
          </Box>
          <Box background='white' useRound margin='8px 0' padding='8px'>
            <Typography color='var(--color-grey-900)'>{`Inside the headphones are microphones and noise-cancelling circuitry.`}</Typography>
            <Typography
              color='var(--color-blue-900)'
              size={EStyleFontSizes['X-MEDIUM']}
            >{`헤드폰 내부에는 마이크와 노이즈 캔슬링 회로가 있다.`}</Typography>
            <Typography
              style={{ marginTop: 16 }}
              color='var(--color-grey-900)'
            >{`The microphones pick up sounds from the outside, and the circuitry analyzes them to produce opposite sound waves.`}</Typography>
            <Typography
              color='var(--color-blue-900)'
              size={EStyleFontSizes['X-MEDIUM']}
            >{`마이크는 외부로부터 소리를 포착하고, 회로는 그것들을 분석하여 반대 음파를 생성한다.`}</Typography>
            <Typography
              style={{ marginTop: 16 }}
              color='var(--color-grey-900)'
            >{`This cancels out the unwanted sound even in noisy surroundings, so you can hear the music sound clearly without turning up the volume.`}</Typography>
            <Typography
              color='var(--color-blue-900)'
              size={EStyleFontSizes['X-MEDIUM']}
            >{`시끄러운 주변 환경에서도 원하지 않는 소리를 상쇄시켜서, 음량을 높이지 않고도 음악 소리를 또렷하게 들을 수 있다.`}</Typography>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P09;
