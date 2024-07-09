import {
  Box,
  BoxWrap,
  EStyleFontSizes,
  IAudioPlayerProps,
  Image,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  TextView,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong (3)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A05/HE1-L01-C06-A05.mp3',
    captionSrc: '/L01/C06/A05/HE1-L01-C06-A05.srt',
    top: -10,
  };

  const textViewText = `1929년에 발견된 침팬지속의 포유류로, 아프리카 콩고강 남쪽에만 분포한다. 서식지의 지리적 제한으로, 비교적 넓은 지역에 걸쳐 사는 침팬지보다 멸종 위기에 더 취약한 상황이지만, 자신들의 종을 유지해 나가고 있다.`;
  const scriptText = `I’ll give you another example of how friendliness is related to survival. Dr. Hare and his colleagues designed an experiment with chimpanzees and bonobos. Although the two are genetically similar, they are different in nature. To study their cooperative behavior, Dr. Hare’s team set up a device which required two individuals to pull both ends of a rope at the same time in order to access food on a board. When placed with partners that the chimpanzees knew, they were able to work together to get the food. However, when paired with new partners, the chimpanzees usually failed to get the food, and when they occasionally succeeded, they did not share  the food with their partner. The bonobos, on the other hand, got along much better than the chimpanzees. They solved the problem regardless of which individual they were paired with, and they were also more willing  to share the food. This research shows that bonobos have a cooperative and friendly nature. Experts suggest that their nature has helped their species survive. Without these characteristics, they could have faced extinction.`;

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo} vAlign='flex-start'>
      <BoxWrap>
        <Box background='white' paddingRight='10px' flexDirection={'column'} width={'50%'} useRound>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PinchZoom pinchType={'image'}>
              <Image src={'/L01/C06/A05/HE1-L01-C06-A05.jpg'} width='400px' height='130px' ariaDescribedby={'img_desc'} />
              <Box type='hidden' id={'img_desc'}>
                <p>침팬지와 보노보의 비교 사진</p>
                <p>이미지 제목: Chimpanzees vs. Bonobos(Case 2)</p>
                <p>슬라이드 텍스트</p>
                <p>Similar look, Different Nature</p>
                <p>Chimpanzees</p>
                <p>Bonobos</p>
                <p>보노보 두 마리가 철장 속 바나나를 꺼내기 위해 협력하는 그림</p>
                <p>이미지 제목: Chimpanzees vs. Bonobos(Case 2)</p>
                <p>슬라이드 텍스트</p>
                <p>How Bonobos Cooperated</p>
              </Box>
            </PinchZoom>
          </div>
          <br />
          <Box>
            <TextView title='보노보(Bonobos)' height='240px'>
              <Typography align='left' size={EStyleFontSizes.SMALL}>
                {textViewText}
              </Typography>
            </TextView>
          </Box>
        </Box>
        <Box background='white' height='480px' useRound>
          <Scroll height='100%' tabIndex={0}>
            <Typography>{scriptText}</Typography>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
