import { useRef, useState } from 'react';
import { Box, BoxWrap, Carousel, Dialog, DotIndicator, EStyleButtonTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import Slider from 'react-slick';
import usePageData from '@/hooks/usePageData';

const Report = () => {
  const { saveData } = usePageData();

  const [isShow, setShow] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const sliderRef = useRef<Slider>(null);

  const onChangeSlide = (idx: number) => {
    saveData(`P0${activeIndex + 1}`);
    setActiveIndex(idx);
  };

  return (
    <Container
      headerInfo={null}
      background={'var(--color-white)'}
      submitBtnColor={EStyleButtonTypes.YELLOW}
      useLinkLabel
      linkLabel='맞춤 학습하기'
      onLink={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <Typography>더미 리포트 페이지 (하단의 "맞춤 학습하기"를 클릭해 주세요.)</Typography>
      <Dialog
        isShow={isShow}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setShow(false);
          setActiveIndex(0);
        }}

        onConfirm={() => {
          setShow(false);
        }}
      >
        <Box hAlign='center'>
          <Carousel
            slideWidth={930}
            infinite={false}
            arrowGap={0}
            arrowSize={40}
            ref={sliderRef}
            onChange={onChangeSlide}
            dots={false}
            controller={({ goto }) => (
              <BoxWrap justifyContent='center' alignItems='center' position='absolute' left={0} right={0} bottom={0}>
                <DotIndicator length={3} activeNumber={activeIndex} onClick={idx => goto(idx)} />
              </BoxWrap>
            )}
          >
            {[<P01 key={'P01'} />, <P02 key={'P02'} />, <P03 key={'P03'} />]}
          </Carousel>
        </Box>
      </Dialog>
    </Container>
  );
};

export default Report;
