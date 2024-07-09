import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, Typography, PinchZoom, Image, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P11 = () => {
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
              Exploring the Technology and Its Applications
              <br />
              기술과 그 응용 분야 탐색
            </Typography>
          </Box>
          <Box display='flex' marginTop='20px'>
            <Box>
              <PinchZoom>
                <Image src={'/L03/SP03-1/HE1-L03-SP03-1-P11-01.jpg'} width='300px' alt='관광지 매표소 앞' />
              </PinchZoom>
            </Box>
            <Box background='white' useRound margin='0 0 0 12px' padding='8px'>
              <Typography color='var(--color-grey-900)'>{`ticket offices at tourist attractions`}</Typography>
              <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>{`관광 명소의 매표소`}</Typography>
              <Typography
                style={{ marginTop: 16 }}
                color='var(--color-grey-900)'
              >{`Microphones are installed in ticket offices to detect external noise, and an opposite sound wave is generated and transmitted through a speaker, enabling the ticket agent to hear the customer’s voice clearly.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`매표소에 마이크가 설치되어 외부 소음을 감지하고 반대 음파가 생성되어 스피커를 통해 전달됨으로써, 매표소 직원이 고객의 목소리를 명확하게 들을 수 있게 한다.`}</Typography>
            </Box>
          </Box>
          <Box display='flex' marginTop='20px'>
            <Box>
              <PinchZoom>
                <Image src={'/L03/SP03-1/HE1-L03-SP03-1-P11-02.jpg'} width='300px' alt='패스트푸드의 드라이브스루로 음식을 받는 모습' />
              </PinchZoom>
            </Box>
            <Box background='white' useRound margin='0 0 0 12px' padding='8px'>
              <Typography color='var(--color-grey-900)'>{`drive-through fast-food restaurants and coffee shops`}</Typography>
              <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>{`관광 명소의 매표소`}</Typography>
              <Typography
                style={{ marginTop: 16 }}
                color='var(--color-grey-900)'
              >{`They use noise-cancelling headsets to improve communication between employees and customers by eliminating vehicle noise.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`그곳에선 노이즈 캔슬링 헤드셋을 사용하여 차량 소음을 제거함으로써 직원과 고객 간의 의사소통을 개선한다.`}</Typography>
            </Box>
          </Box>

          <Box display='flex' marginTop='20px'>
            <Box>
              <PinchZoom>
                <Image src={'/L03/SP03-1/HE1-L03-SP03-1-P11-03.jpg'} width='300px' alt='아빠, 엄마, 아이 세 가족이 타고 있는 자동 차 안의 모습' />
              </PinchZoom>
            </Box>
            <Box background='white' useRound margin='0 0 0 12px' padding='8px'>
              <Typography color='var(--color-grey-900)'>{`The technology is also used for cars, whose audio systems generate waves to cancel out unpleasant sounds.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`오디오 시스템이 불쾌한 소리를 상쇄하기 위해 파동을 생성하는 자동차에도 이 기술이 사용된다.`}</Typography>
              <Typography
                style={{ marginTop: 16 }}
                color='var(--color-grey-900)'
              >{`Thanks to noise-cancelling devices, it is possible for drivers to focus on driving without being disturbed by distracting noises.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`노이즈 캔슬링 장치 덕분에 운전자는 산만하게 하는 소음에 방해받지 않고 운전에 집중하는 것이 가능하다.`}</Typography>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P11;
