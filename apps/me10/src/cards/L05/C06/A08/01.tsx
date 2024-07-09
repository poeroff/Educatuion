import { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography, TMainHeaderInfoTypes, BoxWrap, Box, PinchZoom, Scroll, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Small Actions, Big Change (5)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L05/C06/A08/ME1-L05-C06-A08-P01.mp3',
    captionSrc: '/L05/C06/A08/ME1-L05-C06-A08-P01.srt',
  };

  const text = (
    <Typography style={{ textIndent: 'var(--font-size-28)' }}>
      I posted my pictures on my social media. I got many “likes”. Some of my friends even tried the challenge. We shared useful tips and ideas. This
      challenge was good for the environment, but it was also great for our friendship. We helped the Earth together.
    </Typography>
  );

  const info: IHE01602Info = {
    altText: '',
    hiddenAltText: (
      <>
        <p>네 장의 사진이 있다.</p>
        <p>#Day 1 #My trash 여학생이 쓰레기를 모아놓고 자신의 얼굴과 함께 찍은 사진</p>
        <p>#Day 3 #NoStraws 빨대 없이 음료를 마시고 있는 남학생과 여학생</p>
        <p>#Day 5 #Secondhanditems 테니스 라켓과 티셔츠를 들고 함께 사진 찍는 여학생과 엄마</p>
        <p>#Day 7 #ZeroWasteShop 상점 앞에서 다회용기를 손에 들고 기념 사진을 찍는 여학생</p>
      </>
    ),
    text: text,
    imageSrc: '/L05/C06/A08/ME1-L05-C06-A08-P01.jpg',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='400px' vAlign='center' useFull>
          <PinchZoom>
            <Image
              src={info.imageSrc}
              width={info?.imageWidth || '100%'}
              height={info?.imageHeight || '100%'}
              alt={info.altText}
              ariaDescribedby={info.hiddenAltText ? 'img_desc' : undefined}
            />
          </PinchZoom>
          {info.hiddenAltText && (
            <Box type='hidden' id={'img_desc'}>
              {info.hiddenAltText}
            </Box>
          )}
        </Box>
        <Box marginLeft='10px' useFull hAlign='center'>
          <Box background='white' useRound>
            <Scroll height='100%' tabIndex={0}>
              {info.text}
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
