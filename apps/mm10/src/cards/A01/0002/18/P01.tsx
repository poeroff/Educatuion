import { Container } from '@maidt-cntn/ui/math';
import styled, { keyframes } from 'styled-components';
import { Image } from '@maidt-cntn/ui';

function P01() {
  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'toolsEmotion' }}
      questionInfo={{ text: <Text>다음은 자연수를 소인수분해 하는 블록 코딩이다.</Text> }}
      useExtend
    >
      <ContentsContainer>
        <Title>블록 코딩으로 소인수분해 하기</Title>
        <ItemContainer>
          {/* TODO: 피그마 문의 후 이미지 크기 수정 */}
          <AnimatedImage
            src='/A01/0002/18/A-MM1-0102-18-01.png'
            alt='자연수를 소인수분해 하는 블록 코딩입니다.'
            width='265px'
            height='214px'
            delay='1s'
          />
        </ItemContainer>
      </ContentsContainer>
    </Container>
  );
}

const show = keyframes`
  from {
    visibility: hidden;
  }
  to {
    visibility: visible;
  }
`;

const ContentsContainer = styled.section`
  height: 100%;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
`;

const ItemContainer = styled.div`
  padding: 48px 0;

  height: calc(100% - 60px);

  display: flex;
  flex-direction: column;

  gap: 12px;
`;

const AnimatedImage = styled(Image)<{ delay?: any }>`
  visibility: hidden;
  animation: ${show} 1s forwards;
  animation-delay: ${props => props.delay};
`;

const Text = styled.p`
  font-size: 28px;
  font-weight: 500;
  line-height: 42px;

  figure {
    transform: translateX(-15px);
  }
`;

export default P01;
