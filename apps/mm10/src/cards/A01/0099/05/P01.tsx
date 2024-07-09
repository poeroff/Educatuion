import { MContainer } from '@maidt-cntn/ui/math';
import styled from 'styled-components';

const P02 = () => {
  return (
    <MContainer headerInfo={{ headerPattern: 'icon', iconType: 'creativeUpEmotion' }} questionInfo={{ text: <Title>소수로 암호 체계 만들기</Title> }}>
      <Content>
        <MainBody>
          아주 오래전부터 많은 사람들이 암호를 가로챈 사람이 암호를 풀 수 없는 암호 체계를 만들려고 고심하였다. 그 결과 1970년대에 미국의 수학자들이
          200자리 이상의 자연수를 소인수분해 하는 것이 매우 어렵다는 점에 착안하여 상상을 초월하는 어려운 암호 체계의 제작 방법을 개발하였다.
        </MainBody>
      </Content>
    </MContainer>
  );
};

export default P02;

const Content = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;

const Title = styled.div`
  width: 340px;
  height: 54px;
  font-family: SUIT;
  font-size: 36px;
  font-weight: 600;
  line-height: 54px;
  text-align: left;
  color: var(--color-grey-900);
`;

const MainBody = styled.div`
  text-indent: 20px;
  width: 1000px;
  font-family: SUIT;
  font-size: 28px;
  font-weight: 600;
  line-height: 42px;
  text-align: left;
  color: var(--color-grey-900);
`;
