import React, { useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';

import prevArrow from '@maidt-cntn/assets/icons/arrow_left.svg';
import nextArrow from '@maidt-cntn/assets/icons/arrow_right.svg';

import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

import { ICarouselStyle } from './Carousel.style';
import StyleCarousel from './Carousel.style';
import SvgIcon, { ESvgType } from '../SvgIcon/SvgIcon';
import { IWAI } from '@emotion/react';
import Slider from 'react-slick';

interface ICarouselSlideProps<T> extends IWAI {
  index?: number;
  value: T;
  onClick?: (state: T) => void;
}

interface IController {
  index: number;
  goto: (index: number) => void;
}
export interface ICarouselProps<T> extends ICarouselStyle {
  data?: T[];
  dots?: boolean;
  infinite?: boolean;
  speed?: number;
  arrows?: boolean;
  tabIndex?: number;
  onChange?: (index: number) => void;
  controller?: React.ComponentType<IController>;
  children: React.ReactNode | ((props: ICarouselSlideProps<T>) => React.ReactElement<T, string | React.JSXElementConstructor<T>>);
}

export const Carousel = React.forwardRef(
  <T,>(
    {
      data = [],
      dots = true,
      infinite = true,
      speed = 500,
      arrows = true,
      slideWidth = 500,
      slideHeight = 400,
      arrowSize = 50,
      arrowGap = -60,
      tabIndex,
      onChange,
      controller,
      children,
    }: ICarouselProps<T>,
    ref: React.Ref<any>,
  ) => {
    const [index, setIndex] = useState<number>(0);
    const sliderRef = useRef<Slider>(null);
    const prevArrowRef = useRef<HTMLButtonElement>(null);
    const nextArrowRef = useRef<HTMLButtonElement>(null);

    const settings = {
      dotsClass: 'dots_custom',
      dots,
      infinite: data.length < 3 ? false : infinite,
      speed: speed,
      arrows,
      prevArrow: (
        <StyleCarousel.Arrow arrowSize={arrowSize} aria-label={'이전'} type='button' tabIndex={tabIndex} ref={prevArrowRef}>
          <SvgIcon src={prevArrow} type={ESvgType.IMG} size='15px' />
        </StyleCarousel.Arrow>
      ),
      nextArrow: (
        <StyleCarousel.Arrow arrowSize={arrowSize} aria-label={'다음'} type='button' tabIndex={tabIndex} ref={nextArrowRef}>
          <SvgIcon src={nextArrow} type={ESvgType.IMG} size='15px' />
        </StyleCarousel.Arrow>
      ),
      slideWidth: slideWidth,
      slideHeight: slideHeight,
      arrowGap: arrowGap,
      beforeChange: (currentIdx: number, nextIdx: number) => {
        setIndex(nextIdx);
        onChange?.(nextIdx);
      },
      adaptiveHeight: true,
    };

    useImperativeHandle(ref, () => ({
      slider: sliderRef.current,
      prevArrow: prevArrowRef.current,
      nextArrow: nextArrowRef.current,
    }));

    const Controller = useMemo(() => {
      return controller
        ? controller
        : () => {
            return <></>;
          };
    }, [controller]);

    const goTo = useCallback((index: number) => {
      sliderRef.current?.slickGoTo(index);
      setIndex(index);
      onChange?.(index);
    }, []);

    return (
      <div className='slider-container' style={{ width: `${slideWidth}px` }}>
        <StyleCarousel.StyleSlider {...settings} ref={sliderRef}>
          {typeof children === 'function'
            ? data.map((val, idx) =>
                children({
                  index: idx,
                  value: val,
                }),
              )
            : children}
        </StyleCarousel.StyleSlider>

        <Controller index={index} goto={goTo} />
      </div>
    );
  },
);

export default Carousel;
