import styled from '@emotion/styled';
import simpleRightArrow from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

const CustomWrap = ({ children }: any) => {
  return (
    <CheckerWrap>
      <CheckerText>{children}</CheckerText>
    </CheckerWrap>
  );
};

export default CustomWrap;

const CheckerWrap = styled.div`
  display: flex;
  align-items: baseline;
  gap: 7px;

  &::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background: url(${simpleRightArrow}) center center no-repeat;
  }
`;

const CheckerText = styled.p`
  width: calc(100% - 31px);
  line-height: 48px;
  font-weight: var(--font-weight-bold);
  color: #47494d;

  > span:nth-of-type(2) {
    position: relative;
    display: inline-block;

    > span {
      position: absolute;
      top: 50%;
      left: 40%;
      transform: translateX(-50%);

      font-size: 22px;
      font-weight: var(--font-weight-medium);
    }
  }
`;
