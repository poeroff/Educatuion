import { Box, Scroll, BoxWrap, PinchZoom, Image, Typography, EStyleFontSizes, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { IHeaderInfo } from './index';

const P01 = ({ headerInfo }: IHeaderInfo) => {
  const contents = `To answer these questions, I’d like to tell you about my childhood companion dog, Sparky. 
  When we played with a ball, I noticed that he responded well to my gestures.
  The responsive behavior of dogs also caught the attention of an evolutionary anthropologist, Brian Hare.
  He conducted an experiment to see how dogs would respond to human gestures compared to wolves, who share the same common ancestor.
  He placed two cups on the ground with food hidden under only one of them. When he pointed to the cup with the food, the dogs found it easily.
  The wolves, however, struggled and chose cups at random, paying no attention to his gestures.
  Dr. Hare concluded that the dogs’ ability to read human gestures allowed them to perform better than the wolves.
  He explained that dogs, unlike wolves, have developed communicative skills with humans and a sense of friendliness.
  This explanation sounds reasonable according to several evolutionary biologists.
  They say that from the common ancestors of these two species, those that acted friendly toward humans evolved into dogs, and those that didn’t became wolves.
  Furthermore, Dr. Hare suggested that the friendly nature of dogs probably provided them a survival advantage that allowed their population to grow larger than that of wolves.
  `;

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A04/HE1-L01-C06-A04.mp3',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull height={'450px'}>
        <Box background='white' useRound={true} useFull={true} height={'100%'}>
          <Scroll height={'100%'} tabIndex={0}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PinchZoom pinchType={'image'}>
                <Image alt='' src={'/L01/C06/A04/HE1-L01-C06-A04.jpg'} width='320px' height='228.91px' ariaDescribedby='img_desc' />
                <Box type='hidden' id='img_desc'>
                  <p>남자 선생님이 개와 늑대 사진 아래 각각의 설명이 적힌 인포그래픽 슬라이드를 설명하고 있다.</p>
                  <p>이미지 제목</p>
                  <p>Dogs vs. Wolves (Case 1)</p>
                  <p>슬라이드 텍스트</p>
                  <p>Dogs followed Dr. Hare’s Gestures found the cup with the food easily</p>
                  <p>Wolves paid no attention to his gestures struggled and chose cups randomly</p>
                </Box>
              </PinchZoom>
            </div>
            <Box height={'65%'} paddingTop={'30px'}>
              <Typography weight={500} size={EStyleFontSizes.MEDIUM}>
                {contents}
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
