import { Box, TMainHeaderInfoTypes, PinchZoom, Image, EImageType, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };
  const questionInfo = {
    text: 'Read the quotes about animal rights and think which one you like the most and why. Check out the example.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C07/A04/HE2-L01-C07-A04-P01.mp4',
    captionSrc: '/L01/C07/A04/HE2-L01-C07-A04-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <Box>
        <Box marginTop='20px' hAlign='center'>
          <PinchZoom>
            <Image src={'/L01/C07/A04/HE2-L01-C07-A04-P01.jpg'} alt='' width='696px' height='274px' type={EImageType.IMG} />
            <Box type='hidden'>
              {`
 이미지에는 문장이 퍼즐 조각처럼 나뉘어져 있다:
 첫 번째 조각: "Critics suggest"는 "suggest"가 빨간색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.
 두 번째 조각: "that"는 검은색으로 표시되어 있다.
 세 번째 조각: "a marketing strategy create value for both companies and customers."는 "create"가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.
 세 개의 인용문과 남학생이 생각에 잠긴 모습
Only if we understand, can we care. Only if we care, will we help. Only if we help, shall all be saved.
– Jane Goodall
The question is not, “Can they reason?” nor, “Can they talk?” but, “Can they suffer?”
– Jeremy Bentham
It’s not enough to love animals; we must actively protect and preserve them.
– Daphne Sheldrick
남학생 말풍선 속 글자 : I like what Jane Gooddall said the most. I believe that
understanding animals is the
first step to helping them. `}
            </Box>
          </PinchZoom>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
