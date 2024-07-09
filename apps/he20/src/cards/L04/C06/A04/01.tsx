import { BoxWrap, Box, TMainHeaderInfoTypes, PinchZoom, Image, Scroll, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { textContentA04 } from './commonData';

const P01 = () => {
  const { content } = textContentA04;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (2)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A04/HE2-L04-C06-A04-P01.mp3',
    captionSrc: '/L04/C06/A04/HE2-L04-C06-A04-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull tabIndex={101}>
          <div>
            <PinchZoom>
              <Image
                src={'/L04/C06/A04/HE2-L04-C06-A04-P01-01.jpg'}
                height='200px'
                width='228px'
                alt=''
                ariaDescribedby='HE2-L04-C06-A04-P01-01_desc'
              />
              <Box type='hidden' id='HE2-L04-C06-A04-P01-01_desc'>
                <p>척추 임플란트 작동 방법이 쓰여 있는 인체 그림이다.</p>
                <p>How the Brain and Spinal Implants Work</p>
                <p>Brain implants send signal</p>
                <p>Spinal implant receives signal</p>
                <p>Nerve cells carry signal to legs</p>
              </Box>
            </PinchZoom>
            <PinchZoom>
              <Image
                style={{ marginTop: '15px' }}
                src={'/L04/C06/A04/HE2-L04-C06-A04-P01-02.jpg'}
                width='346px'
                height='147px'
                alt=''
                ariaDescribedby='HE2-L04-C06-A04-P01-02_desc'
              />
              <Box type='hidden' id='HE2-L04-C06-A04-P01-02_desc'>
                <p>YOU MAY ALSO LIKE 라는 제목이 적힌 이미지이다.</p>
                <p>컵을 들고 있는 한쪽 팔이 인공 팔로 대체된 여성과 그 옆에 신체 보조기구의 역사가 기록된 연표가 있다.</p>
                <p>around 950-710 B.C. : Wooden Toe </p>
                <p>around 1508 : Götz’s Iron Hand </p>
                <p>World War I : 1914-1918</p>
                <p>World War II : 1939-1945</p>
                <p>1945 : Bert Shepard’s Leg</p>
                <p>Today : AI-Powered Artificial Limbs</p>
              </Box>
            </PinchZoom>
          </div>
        </Box>

        <Box useFull background='white' useRound tabIndex={102}>
          <Scroll height='100%' tabIndex={0}>
            <Typography usePre>&nbsp;{content}</Typography>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
