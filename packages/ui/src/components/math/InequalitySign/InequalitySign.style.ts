import styled from '@emotion/styled';
import empty from '@maidt-cntn/assets/icons/inequalitySign/empty.svg';
import focusedEmpty from '@maidt-cntn/assets/icons/inequalitySign/focused_empty.svg';
import errorEmpty from '@maidt-cntn/assets/icons/inequalitySign/error_empty.svg';
import equal from '@maidt-cntn/assets/icons/inequalitySign/equal.svg';
import focusedEqual from '@maidt-cntn/assets/icons/inequalitySign/focused_equal.svg';
import errorEqual from '@maidt-cntn/assets/icons/inequalitySign/error_equal.svg';
import notEqual from '@maidt-cntn/assets/icons/inequalitySign/not_equal.svg';
import focusedNotEqual from '@maidt-cntn/assets/icons/inequalitySign/focused_not_equal.svg';
import errorNotEqual from '@maidt-cntn/assets/icons/inequalitySign/error_not_equal.svg';
import biggerLeft from '@maidt-cntn/assets/icons/inequalitySign/bigger_left.svg';
import focusedBiggerLeft from '@maidt-cntn/assets/icons/inequalitySign/focused_bigger_left.svg';
import errorBiggerLeft from '@maidt-cntn/assets/icons/inequalitySign/error_bigger_left.svg';
import biggerOrEqualLeft from '@maidt-cntn/assets/icons/inequalitySign/bigger_or_equal_left.svg';
import focusedBiggerOrEqualLeft from '@maidt-cntn/assets/icons/inequalitySign/focused_bigger_or_equal_left.svg';
import errorBiggerOrEqualLeft from '@maidt-cntn/assets/icons/inequalitySign/error_bigger_or_equal_left.svg';
import biggerRight from '@maidt-cntn/assets/icons/inequalitySign/bigger_right.svg';
import focusedBiggerRight from '@maidt-cntn/assets/icons/inequalitySign/focused_bigger_right.svg';
import errorBiggerRight from '@maidt-cntn/assets/icons/inequalitySign/error_bigger_right.svg';
import biggerOrEqualRight from '@maidt-cntn/assets/icons/inequalitySign/bigger_or_equal_right.svg';
import focusedBiggerOrEqualRight from '@maidt-cntn/assets/icons/inequalitySign/focused_bigger_or_equal_right.svg';
import errorBiggerOrEqualRight from '@maidt-cntn/assets/icons/inequalitySign/error_bigger_or_equal_right.svg';
import { EInequalitySignStatus, IDefaultInequalitySignProps } from '@maidt-cntn/ui';

const getIcon = (type: string, status?: EInequalitySignStatus) => {
  switch (type) {
    case 'equal':
      return status === EInequalitySignStatus.ACTIVE ? focusedEqual : status === EInequalitySignStatus.IS_ERROR ? errorEqual : equal;
    case 'notEqual':
      return status === EInequalitySignStatus.ACTIVE ? focusedNotEqual : status === EInequalitySignStatus.IS_ERROR ? errorNotEqual : notEqual;
    case 'biggerRight':
      return status === EInequalitySignStatus.ACTIVE
        ? focusedBiggerRight
        : status === EInequalitySignStatus.IS_ERROR
        ? errorBiggerRight
        : biggerRight;
    case 'biggerOrEqualRight':
      return status === EInequalitySignStatus.ACTIVE
        ? focusedBiggerOrEqualRight
        : status === EInequalitySignStatus.IS_ERROR
        ? errorBiggerOrEqualRight
        : biggerOrEqualRight;
    case 'biggerLeft':
      return status === EInequalitySignStatus.ACTIVE ? focusedBiggerLeft : status === EInequalitySignStatus.IS_ERROR ? errorBiggerLeft : biggerLeft;
    case 'biggerOrEqualLeft':
      return status === EInequalitySignStatus.ACTIVE
        ? focusedBiggerOrEqualLeft
        : status === EInequalitySignStatus.IS_ERROR
        ? errorBiggerOrEqualLeft
        : biggerOrEqualLeft;
    default:
      return status === EInequalitySignStatus.ACTIVE ? focusedEmpty : status === EInequalitySignStatus.IS_ERROR ? errorEmpty : empty;
  }
};

namespace StyleInequalitySign {
  export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 48px;
    width: 48px;
    min-height: 48px;
    height: 48px;
    box-sizing: border-box;

    border-radius: 50%;
  `;

  export const Icon = styled.div<{
    inequalitySignProps: IDefaultInequalitySignProps;
    status?: EInequalitySignStatus;
  }>`
    width: 100%;
    height: 100%;
    border-radius: 50%;

    ${({ inequalitySignProps, status }) => `background : url(${`"${getIcon(inequalitySignProps.type, status)}"`}) center center no-repeat;`}
    background-color: #fff;
  `;
}

export default StyleInequalitySign;
