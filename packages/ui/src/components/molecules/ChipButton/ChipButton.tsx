import React, { useMemo } from 'react';
import Style from '../../../components/molecules/ChipButton/ChipButton.style';

import move_h_selected from '@maidt-cntn/assets/icons/move/move_h_selected.svg';
import move_v_selected from '@maidt-cntn/assets/icons/move/move_v_selected.svg';
import move_h_unselected from '@maidt-cntn/assets/icons/move/move_h_unselected.svg';
import move_v_unselected from '@maidt-cntn/assets/icons/move/move_v_unselected.svg';
import true_selected from '@maidt-cntn/assets/icons/trueFalseButton/true_selected.svg';
import true_unselected from '@maidt-cntn/assets/icons/trueFalseButton/true_unselected.svg';
import true_error from '@maidt-cntn/assets/icons/trueFalseButton/true_error.svg';
import false_selected from '@maidt-cntn/assets/icons/trueFalseButton/false_selected.svg';
import false_unselected from '@maidt-cntn/assets/icons/trueFalseButton/false_unselected.svg';
import false_error from '@maidt-cntn/assets/icons/trueFalseButton/false_error.svg';
import arrow_up_enabled from '@maidt-cntn/assets/icons/arrow_up_enabled.svg';
import arrow_up_disabled from '@maidt-cntn/assets/icons/arrow_up_disabled.svg';
import arrow_down_enabled from '@maidt-cntn/assets/icons/arrow_down_enabled.svg';
import arrow_down_disabled from '@maidt-cntn/assets/icons/arrow_down_disabled.svg';
import ox_o_unselected from '@maidt-cntn/assets/icons/trueFalseButton/ox_o.svg';
import ox_o_selected from '@maidt-cntn/assets/icons/trueFalseButton/ox_o_selected.svg';
import ox_o_error from '@maidt-cntn/assets/icons/trueFalseButton/ox_o_error.svg';
import ox_x_unselected from '@maidt-cntn/assets/icons/trueFalseButton/ox_x.svg';
import ox_x_selected from '@maidt-cntn/assets/icons/trueFalseButton/ox_x_selected.svg';
import ox_x_error from '@maidt-cntn/assets/icons/trueFalseButton/ox_x_error.svg';

import profile from '@maidt-cntn/assets/icons/profile.svg';
import profile_selected from '@maidt-cntn/assets/icons/profile_selected.svg';
import profile_disabled from '@maidt-cntn/assets/icons/profile_disabled.svg';

import GoodSVG from '@maidt-cntn/assets/CheckList/good.svg';
import GoodClickedSVG from '@maidt-cntn/assets/CheckList/good_clicked.svg';
import GoodDisabledSVG from '@maidt-cntn/assets/CheckList/good_disabled.svg';
import NotGoodSVG from '@maidt-cntn/assets/CheckList/soso.svg';
import NotGoodClickedSVG from '@maidt-cntn/assets/CheckList/soso_clicked.svg';
import NotGoodDisabledSVG from '@maidt-cntn/assets/CheckList/soso_disabled.svg';
import BadSVG from '@maidt-cntn/assets/CheckList/bad.svg';
import BadClickedSVG from '@maidt-cntn/assets/CheckList/bad_clicked.svg';
import BadDisabledSVG from '@maidt-cntn/assets/CheckList/bad_disabled.svg';

import Check from '@maidt-cntn/assets/icons/chipbutton/check_enabled.svg';
import CheckClicked from '@maidt-cntn/assets/icons/chipbutton/check_clicked.svg';
import CheckDisabled from '@maidt-cntn/assets/icons/chipbutton/chkeck_disabled.svg';
import FilledStar from '@maidt-cntn/assets/icons/rating/filledStar.svg';
import EmptyStar from '@maidt-cntn/assets/icons/rating/emptyStar.svg';
import DisabledStar from '@maidt-cntn/assets/icons/rating/nonActiveStar.svg';

import empty from '@maidt-cntn/assets/icons/square_empty.svg';
import empty_disabled from '@maidt-cntn/assets/icons/square_empty_disabled.svg';

import circle_empty_selected from '@maidt-cntn/assets/icons/chipbutton/circle_empty_selected.svg';
import circle_empty_unselected from '@maidt-cntn/assets/icons/chipbutton/circle_empty_unselected.svg';
import circle_empty_error from '@maidt-cntn/assets/icons/chipbutton/circle_empty_error.svg';
import { IWAI } from '@emotion/react';

export enum EChipButtonType {
  DRAG = 'drag',
  PROFILE = 'profile',
  TRUE = 'true',
  FALSE = 'false',
  UP = 'up',
  DOWN = 'down',
  GOOD = 'good',
  NOT_GOOD = 'not-good',
  BAD = 'bad',
  O = 'o',
  X = 'x',
  STAR = 'star',
  EMPTY = 'empty',
  CHECK = 'check',
  NORMAL = 'normal',
}

export enum EAlignType {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export interface IChipButton extends IWAI {
  type?: 'button' | 'radio';
  name?: string;
  hasChildren?: boolean;
  children?: React.ReactNode;
  status?:
    | EChipButtonType.DRAG
    | EChipButtonType.PROFILE
    | EChipButtonType.TRUE
    | EChipButtonType.FALSE
    | EChipButtonType.UP
    | EChipButtonType.DOWN
    | EChipButtonType.GOOD
    | EChipButtonType.NOT_GOOD
    | EChipButtonType.BAD
    | EChipButtonType.O
    | EChipButtonType.X
    | EChipButtonType.EMPTY
    | EChipButtonType.CHECK
    | EChipButtonType.STAR
    | EChipButtonType.NORMAL;
  src?: string;
  size?: string;
  height?: string;
  width?: string;
  alt?: string;
  align?: EAlignType.HORIZONTAL | EAlignType.VERTICAL;
  isActive?: boolean;
  isError?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: (state: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) => void;
  isDisabled?: boolean;
  readOnly?: boolean;
}

const getChipButtonSrc = (
  status: IChipButton['status'],
  align: IChipButton['align'],
  isActive: IChipButton['isActive'],
  isError: IChipButton['isError'],
  disabled: IChipButton['disabled'],
) => {
  switch (status) {
    case EChipButtonType.DRAG:
      if (align === EAlignType.VERTICAL) {
        return isActive ? move_v_selected : move_v_unselected;
      } else if (align === EAlignType.HORIZONTAL) {
        return isActive ? move_h_selected : move_h_unselected;
      }
      return '';
    case EChipButtonType.TRUE:
      return !isActive ? true_unselected : isError ? true_error : true_selected;
    case EChipButtonType.FALSE:
      return !isActive ? false_unselected : isError ? false_error : false_selected;
    case EChipButtonType.UP:
      return disabled ? arrow_up_disabled : arrow_up_enabled;
    case EChipButtonType.DOWN:
      return disabled ? arrow_down_disabled : arrow_down_enabled;
    case EChipButtonType.GOOD:
      if (disabled) {
        return GoodDisabledSVG;
      }
      return isActive ? GoodClickedSVG : GoodSVG;
    case EChipButtonType.NOT_GOOD:
      if (disabled) {
        return NotGoodDisabledSVG;
      }
      return isActive ? NotGoodClickedSVG : NotGoodSVG;
    case EChipButtonType.BAD:
      if (disabled) {
        return BadDisabledSVG;
      }
      return isActive ? BadClickedSVG : BadSVG;
    case EChipButtonType.O:
      return !isActive ? ox_o_unselected : isError ? ox_o_error : ox_o_selected;
    case EChipButtonType.X:
      return !isActive ? ox_x_unselected : isError ? ox_x_error : ox_x_selected;
    case EChipButtonType.PROFILE:
      if (disabled) {
        return profile_disabled;
      }
      return isActive ? profile_selected : profile;
    case EChipButtonType.EMPTY:
      if (disabled) {
        return empty_disabled;
      }
      return empty;
    case EChipButtonType.CHECK:
      if (disabled) {
        return CheckDisabled;
      }
      return isActive ? CheckClicked : Check;
    case EChipButtonType.STAR:
      return disabled ? DisabledStar : isActive ? FilledStar : EmptyStar;
    case EChipButtonType.NORMAL:
      return !isActive ? circle_empty_unselected : isError ? circle_empty_error : circle_empty_selected;
    default:
      return '';
  }
};

const getAriaLabel = (status: IChipButton['status'], align: IChipButton['align']) => {
  switch (status) {
    case EChipButtonType.DRAG:
      if (align === EAlignType.VERTICAL) {
        return '세로로 교차하는 화살표';
      } else if (align === EAlignType.HORIZONTAL) {
        return '가로로 교차하는 화살표';
      }
      return '';
    case EChipButtonType.TRUE:
      return '참';
    case EChipButtonType.FALSE:
      return '거짓';
    case EChipButtonType.UP:
      return '위 화살표';
    case EChipButtonType.DOWN:
      return '아래 화살표';
    case EChipButtonType.GOOD:
      return '좋음';
    case EChipButtonType.NOT_GOOD:
      return '보통';
    case EChipButtonType.BAD:
      return '나쁨';
    case EChipButtonType.O:
      return '알파벳 오 표시';
    case EChipButtonType.X:
      return '알파벳 엑스 표시';
    case EChipButtonType.EMPTY:
      return '값이 없는 사각형';
    case EChipButtonType.CHECK:
      return '체크 표시';
    default:
      return '';
  }
};

export const ChipButton: React.FC<IChipButton> = ({
  type = 'button',
  name = 'chip-group',
  hasChildren = false,
  children,
  status,
  src,
  align,
  size,
  ariaLabel,
  isActive = false,
  isError = false,
  disabled = false,
  width,
  height,
  onClick,
  isDisabled = false,
  readOnly = false,
  ...rest
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) => {
    if (readOnly) {
      return;
    }
    onClick?.(event);
  };

  src = getChipButtonSrc(status, align, isActive, isError, disabled);
  ariaLabel = ariaLabel || getAriaLabel(status, align);
  width = status === EChipButtonType.DRAG && !width ? '44px' : width;
  height = status === EChipButtonType.DRAG && !height ? '44px' : height;

  const content = useMemo(() => {
    switch (type) {
      case 'radio':
        return (
          <Style.ChipRadio
            name={name}
            label={status}
            value={isActive}
            onClick={handleClick}
            disabled={isDisabled}
            readOnly={readOnly}
            aria-label={ariaLabel}
          >
            <Style.ChipIcon src={src} size={size} width={width} height={height} isActive={isActive} isError={isError} {...rest}></Style.ChipIcon>
          </Style.ChipRadio>
        );
      case 'button':
      default:
        return (
          <Style.ChipButton onClick={handleClick} disabled={isDisabled} aria-label={ariaLabel}>
            <Style.ChipIcon
              src={src}
              size={size}
              width={width}
              height={height}
              hasChildren={hasChildren}
              isActive={isActive}
              isError={isError}
              {...rest}
            >
              {children}
            </Style.ChipIcon>
          </Style.ChipButton>
        );
    }
  }, [src, status, isError, isActive, size, width, height, onClick]);

  return <>{content}</>;
};

export default ChipButton;
