import styled from 'styled-components';
import image1 from '@/assets/A01/0001/12/001-1.png';
import image2 from '@/assets/A01/0001/12/001-2.png';
import { MContainer } from '@maidt-cntn/ui/math';
import { Box } from '@maidt-cntn/ui';

const P01 = () => {
  return (
    <MContainer headerInfo={{ headerPattern: 'icon', iconType: 'funPlayAndMathEmotion' }} questionInfo={{ text: '어떻게 색칠하면 될까?' }} cardType='mainText'>
      <Paragraph>
        한 자연수를 두 자연수의 곱으로 나타낼 때, 합성수는 <span>6=1×6</span> 과 <span>6=2×3</span> 처럼 두 가지 이상의 방법이 있지만 소수는{' '}
        <span>5=1×5</span> 처럼 한 가지 방법으로만 나타낼 수 있다.
      </Paragraph>
      <Paragraph>
        따라서 작은 정사각형을 이어 붙여서 직사각형을 만들 때, 다음과 같이 정사각형 <span>6</span>개로 만드는 방법은 두 가지가 있고, 정사각형{' '}
        <span>5</span>개로 만드는 방법은 한 가지가 있다.
      </Paragraph>

      <Box display='flex' justifyContent='space-evenly' marginTop='40px'>
        <NumberImageWrapper $isVisible={true}>
          <Number>6</Number> <img src={image1} alt='정사각형 6개로 만드는 방법 두 가지' />
        </NumberImageWrapper>
        <NumberImageWrapper $isVisible={true}>
          <Number>5</Number> <img src={image2} alt='정사각형 5개로 만드는 방법 한 가지' />
        </NumberImageWrapper>
      </Box>
    </MContainer>
  );
};

const Paragraph = styled.p`
  font-family: SUIT;
  font-size: 28px;
  font-weight: 500;
  line-height: 42px;
  text-indent: 20px;
  span {
    font-family: 'NOTO';
  }
`;

const NumberImageWrapper = styled.div<{ $isVisible: boolean }>`
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Number = styled.span`
  font-family: STIX Two Text;
  font-size: var(--font-size-32);
  font-weight: var(--font-weight-bold);
  line-height: 42px;
`;

export default P01;
