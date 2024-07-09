import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, Typography, PinchZoom, Image, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P08 = () => {
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
              The Principle of Sound Waves and Interference
              <br />
              음파와 간섭의 원리 2
            </Typography>
          </Box>

          <Box background='white' useRound margin='8px 0' padding='8px'>
            <Typography color='var(--color-grey-900)'>{`Just as different ripples in water might overlap if you throw two stones, sound waves can also interfere with each other when they meet.`}</Typography>
            <Typography
              color='var(--color-blue-900)'
              size={EStyleFontSizes['X-MEDIUM']}
            >{`두 개의 돌을 던지면 물에서 서로 다른 잔물결이 겹칠 수 있는 것처럼, 소리 파동도 만나면 서로 간섭할 수 있다.`}</Typography>
            <Typography
              style={{ marginTop: 16 }}
              color='var(--color-grey-900)'
            >{`There are two types of interference: constructive and destructive.`}</Typography>
            <Typography
              color='var(--color-blue-900)'
              size={EStyleFontSizes['X-MEDIUM']}
            >{`간섭에는 보강 간섭과 상쇄 간섭이라는 두 가지 유형이 있다.`}</Typography>
          </Box>

          <Box display='flex' marginTop='20px'>
            <Box>
              <PinchZoom>
                <Image
                  src={'/L03/SP03-1/HE1-L03-SP03-1-P08-01.jpg'}
                  width='346px'
                  alt='Constructive Interference가 어떻게 작용하는지를 설명해주는 그래프'
                />
              </PinchZoom>
            </Box>
            <Box background='white' useRound margin='0 0 0 12px' padding='8px'>
              <Typography color='var(--color-grey-900)'>{`Constructive interference occurs when the peaks of two waves overlap, resulting in a bigger wave and a louder sound.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`보강 간섭은 두 파동의 정점이 겹칠 때 발생하여 더 큰 파동과 더 큰 소리를 만들어낸다.`}</Typography>
            </Box>
          </Box>

          <Box display='flex' marginTop='20px'>
            <Box>
              <PinchZoom>
                <Image
                  src={'/L03/SP03-1/HE1-L03-SP03-1-P08-02.jpg'}
                  width='346px'
                  alt='Destructive Interference가 어떻게 작용하는지를 설명해주는 그래프'
                />
              </PinchZoom>
            </Box>
            <Box background='white' useRound margin='0 0 0 12px' padding='8px'>
              <Typography color='var(--color-grey-900)'>{`Destructive interference occurs when a peak of one wave overlaps with a valley of another wave, so they cancel each other out and produce a quieter sound, or no sound at all.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`상쇄 간섭은 한 파동의 정점이 다른 파동의 저점과 겹칠 때 발생하여, 정점과 저점이 서로를 상쇄하며 더 작은 소리를 내거나 전혀 소리가 나지 않게 한다.`}</Typography>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P08;
