import { Image, SvgIcon } from '@maidt-cntn/ui';
import styled, { keyframes } from 'styled-components';
import ArrowIconSVG from '@/assets/A01/0002/MM1-0102-18-02-arrow.svg';
import { Container } from '@maidt-cntn/ui/math';

function P02() {
  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'toolsEmotion' }}
      questionInfo={{ text: <Title>블록 코딩으로 소인수분해 하기</Title> }}
      useExtend
    >
      <ContentsContainer>
        <ItemContainer>
          <AnimatedText delay='1s'>이 프로그램을 실행하면 다음과 같다.</AnimatedText>
          <ImagesContainer>
            {/* TODO: 피그마 문의 후 이미지 크기 수정 */}
            <AnimatedImage
              src='/A01/0002/18/A-MM1-0102-18-02_01.png'
              alt='자연수를 입력하세요. 600을 입력했습니다.'
              width='282px'
              height='200px'
              delay='2s'
            />
            <AnimatedSvgIcon src={ArrowIconSVG} width='40px' height='40px' delay='3s' />
            <AnimatedImage
              src='/A01/0002/18/A-MM1-0102-18-02_02.png'
              alt='대답: 600, 결과: 2곱하기2곱하기2곱하기3곱하기5곱하기5'
              width='282px'
              height='200px'
              delay='4s'
            />
          </ImagesContainer>
          <AnimatedText delay='5s'>
            위의 활동에서 <span>600</span>을 소인수분해 하면{' '}
            <span>
              2<span role='math'>3</span>×3×5<span role='math'>2</span>
            </span>{' '}
            임을 알 수 있다.
          </AnimatedText>
        </ItemContainer>
      </ContentsContainer>
    </Container>
  );
}

const ContentsContainer = styled.section`
  height: 100%;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;

  figure {
    transform: translateX(-15px);
  }
`;

const ItemContainer = styled.div`
  padding-top: 48px;

  display: flex;
  flex-direction: column;

  gap: 32px;
`;

const ImagesContainer = styled.div`
  display: flex;
  align-items: center;

  height: 200px;

  gap: 32px;

  img {
    height: 100%;
  }
`;

const show = keyframes`
  from {
    visibility: hidden;
  }
  to {
    visibility: visible;
  }
`;

const AnimatedImage = styled(Image)<{ delay?: any }>`
  visibility: hidden;
  animation: ${show} 1s forwards;
  animation-delay: ${props => props.delay};
`;

const AnimatedSvgIcon = styled(SvgIcon)<{ delay?: any }>`
  visibility: hidden;
  animation: ${show} 1s forwards;
  animation-delay: ${props => props.delay};
`;

const AnimatedText = styled.p<{ delay?: any }>`
  font-weight: 500;
  font-size: 28px;
  line-height: 42px;

  > span {
    font-family: var(--font-NOTO);
    font-weight: 400;

    > span {
      vertical-align: super;
      font-size: 50%;
    }
  }

  visibility: hidden;
  animation: ${show} 1s forwards;
  animation-delay: ${props => props.delay};
`;

export default P02;
