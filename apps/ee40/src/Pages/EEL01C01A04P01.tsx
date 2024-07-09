import { MouseEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, IQuestionProps, SimpleAudioPlayer, Image, BoxWrap, Carousel } from '@maidt-cntn/ui';

type CustomMouseEvent = MouseEvent<HTMLElement>;

type Image = {
  src: string;
  alt: string;
  value?: string;
  title?: string;
};

type Audio = {
  audioSrc: string;
};

interface IEEL01C01A04P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageList: Image[];
  audioList: Audio[];
  cardWidth?: string;
  cardHeight?: string;
}

const EEL01C01A04P01 = ({ headerInfo, questionInfo, imageList, audioList, cardWidth, cardHeight }: IEEL01C01A04P01) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const slideItem = imageList.map((img, idx) => (
    <CardWarp
      key={idx}
      $cardWidth={cardWidth}
      $cardHeight={cardHeight}
      onClick={(e: CustomMouseEvent) => {
        const nodeName = (e.target as HTMLElement).nodeName;
        if (nodeName !== 'SPAN' && nodeName !== 'BUTTON') {
          document.querySelectorAll('.card-box')[idx]?.classList.toggle('flipped');
        }
      }}
    >
      <CardBox className='card-box'>
        <div className='front'>
          <Box width={'454px'} height={'230px'} hAlign='center' vAlign='center' margin='auto'>
            <Image src={img.src} alt={img.alt} width='fit-content' height={'230px'} />
          </Box>
          <AudioBox>
            <SimpleAudioPlayer audioSrc={audioList[idx]?.audioSrc}></SimpleAudioPlayer>
            <AudioText>{img.value}</AudioText>
          </AudioBox>
        </div>
        <div className='back'>
          <CardText>{img.title}</CardText>
        </div>
      </CardBox>
    </CardWarp>
  ));

  const handleSlideChange = (num: number) => {
    const cardBox = document.querySelectorAll('.card-box');

    cardBox.forEach(card => {
      card.classList.remove('flipped');
    });

    setCurrentSlide(num);
  };

  useEffect(() => {
    const prevArrow = document.querySelector('.slick-prev') as HTMLButtonElement;
    const nextArrow = document.querySelector('.slick-next') as HTMLButtonElement;

    if (prevArrow && nextArrow) {
      if (currentSlide === 0) {
        prevArrow.style.display = 'none';
      } else {
        prevArrow.style.display = 'block';
      }

      if (currentSlide === imageList.length - 1) {
        nextArrow.style.display = 'none';
      } else {
        nextArrow.style.display = 'block';
      }
    }
  }, [currentSlide, imageList.length]);

  return (
    <Container vAlign='top' headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull justifyContent={'center'} marginTop={'35px'}>
        <Box
          useFull
          hAlign='center'
          vAlign='center'
          useShadow={true}
          useRound={true}
          background='white'
          width={`598px`}
          height={'364px'}
          padding={`24px 16px`}
        >
          <Carousel
            data={imageList}
            dots={false}
            infinite={false}
            arrows={true}
            arrowSize={40}
            arrowGap={20}
            slideHeight={294}
            slideWidth={454 + 150}
            children={slideItem}
            ref={carouselRef}
            onChange={handleSlideChange}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

const CardWarp = styled.div<{ $cardWidth?: string; $cardHeight?: string }>`
  width: ${({ $cardWidth }) => $cardWidth || '454px'};
  height: ${({ $cardHeight }) => $cardHeight || '294px'};
`;

const CardBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: 0.5s;
    &.front {
      transform: rotateY(0deg);
    }
    &.back {
      transform: rotateY(180deg);
    }
  }
  &.flipped {
    div {
      &.front {
        transform: rotateY(180deg);
      }
      &.back {
        transform: rotateY(0deg);
      }
    }
  }
`;

const CardText = styled.div`
  width: 100%;
  height: 40;
  z-index: 1;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-family: S-Core Dream;
  font-size: 40px;
  font-weight: 500;
  line-height: normal;
  white-space: pre-wrap;
`;

const AudioBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  padding-top: 16px;
`;

const AudioText = styled.div`
  font-family: Lexend;
  font-size: 40px;
  font-weight: 500;
  line-height: 40px;
  text-align: left;
  padding: 0px 12px 8px 12px;
`;

export default EEL01C01A04P01;
