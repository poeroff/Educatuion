import styled from '@emotion/styled';
import Slider from 'react-slick';

export interface ICarouselStyle {
  arrowSize?: number;
  arrowGap?: number;
  slideWidth?: number;
  slideHeight?: number;
}

namespace StyleCarousel {
  export const Wrap = styled.div``;

  export const StyleSlider = styled(Slider)<ICarouselStyle>`
    .slick-list {
      width: calc(100% - 100px);
      height: 100%;
      margin: 0 auto;
    }

    .slick-arrow:before {
      content: none;
    }

    .slick-arrow {
      top: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .slick-prev {
      ${({ arrowGap }) => `left: ${arrowGap}px;`};
    }

    .slick-next {
      ${({ arrowGap }) => `right: ${arrowGap}px;`};
    }

    .dots_custom {
      display: inline-block;
      vertical-align: middle;
      margin: auto 0;
      padding: 0;
      text-align: center;
      margin-top: 15px;
    }
    .dots_custom li {
      list-style: none;
      cursor: pointer;
      display: inline-block;
      margin: 0 6px;
      padding: 0;
    }

    .dots_custom li button {
      border: none;
      background: #d1d1d1;
      color: transparent;
      cursor: pointer;
      display: block;
      height: 8px;
      width: 8px;
      border-radius: 100%;
      padding: 0;
    }

    .dots_custom li.slick-active button {
      width: 50px;
      background-color: black;
      border-radius: 5px;
    }
  `;

  export const Arrow = styled.button<ICarouselStyle>`
    ${({ arrowSize }) => `
    width : ${arrowSize}px;
    height : ${arrowSize}px;
    z-index: 1;
    `};

    :focus {
      border: 2px solid #1e6efa;
    }
  `;

  export const StyleImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
  `;

  export const StyleNull = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    align-content: center;
    background-color: #eeeeee;
    border-radius: 4px;
  `;
}

export default StyleCarousel;
