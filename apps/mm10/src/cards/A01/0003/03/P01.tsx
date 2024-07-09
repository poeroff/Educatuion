import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/math';
import HiddenTextButton from './components/hiddenTextButton';
import { useState } from 'react';
import LearnedSVG from '@/assets/A01/0003/03/learned.svg';
import { SvgIcon } from '@maidt-cntn/ui';

function P01() {
  const [showText, setShowText] = useState<{ [key: number]: boolean }>({});
  const [showScript, setShowScript] = useState(false);

  const handleClick = (number: number) => {
    setShowText(prev => ({
      ...prev,
      [number]: true,
    }));
  };
  return (
    <Container headerInfo={null} useExtend>
      <ContentsContainer>
        <Script>
          <Text>
            <p>
              <span>생각열기</span>에서 <span>24</span>와 <span>60</span>의 공약수는
            </p>
            <HiddenTextButton width='172px' onClick={() => handleClick(1)} showText={showText[1]}>
              <Number>1, 2, 3, 4, 6, 12</Number>
            </HiddenTextButton>
            <p>이고 최대공약수는</p>
            <HiddenTextButton width='75px' onClick={() => handleClick(2)} showText={showText[2]}>
              <Number>12</Number>
            </HiddenTextButton>
            <p>이므로</p>
          </Text>
          <Text>
            <p>놀이를 할 수 있는 사람은 최대</p>
            <HiddenTextButton width='75px' onClick={() => handleClick(3)} showText={showText[3]}>
              <Number>12</Number>
            </HiddenTextButton>
            <p>명이다</p>
          </Text>
        </Script>
        <LearnedContainer showScript={showScript}>
          <SvgIcon src={LearnedSVG} width='124px' height='34px' onClick={() => setShowScript(prev => !prev)} />
          {showScript && <p>두 수의 공통인 약수를 두 수의 공약수라 하고, 공약수 중에서 가장 큰 수를 두 수의 최대공약수라고 한다.</p>}
        </LearnedContainer>
      </ContentsContainer>
    </Container>
  );
}

const ContentsContainer = styled.section`
  height: 100%;

  padding-top: 48px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Script = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;
`;

const Text = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  white-space: nowrap;

  > p {
    font-weight: 600;
    font-size: 28px;
    line-height: 42px;

    > span:first-child {
      font-family: SUIT;
      font-weight: 800;
      color: var(--color-grey-600);
    }
  }

  span {
    font-family: NOTO;
    font-weight: 400;
  }
`;

const Number = styled.p`
  font-family: NOTO;
  font-weight: 400;
  font-size: 28px;
  line-height: 42px;
`;

const LearnedContainer = styled.div<{ showScript: boolean }>`
  width: 982px;
  min-height: 124px;

  box-shadow: 2px 0 0 0 #c37bac, 0 2px 0 0 #c37bac, 0 -2px 0 0 #c37bac;
  border-radius: 0 20px 20px 0;

  position: relative;

  padding: 20px 20px 20px 0;

  margin-left: 16px;

  > span {
    cursor: pointer;
    position: absolute;

    top: -34px;
    left: -20px;
  }

  p {
    font-size: 28px;
    font-weight: 600;
    line-height: 42px;

    white-space: pre-wrap;
  }

  ${({ showScript }) =>
    !showScript &&
    `
    box-shadow: none;
    border-radius: none;
  `}
`;

export default P01;
