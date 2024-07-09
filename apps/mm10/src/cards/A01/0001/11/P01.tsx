import styled from 'styled-components';
import { MContainer } from '@maidt-cntn/ui/math';
import { Image } from '@maidt-cntn/ui';

const P01 = () => {
  const fileUrl = '/A01/0001/11/A-MM1-0101-11-01.jpg';
  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'mathStoryEmotion' }}
      questionInfo={{
        text: '더 큰 소수를 찾아서',
      }}
      vAlign='start'
      cardType='mainText'
    >
      <Content>
        <Text>
          &nbsp;&nbsp;소수가 무수히 많다는 사실이 고대 그리스의 수학자 유클리드 (Euclid, B.C. 325?~B.C.265?)에 의해 밝혀진 후로 많은 사람들이 큰
          소수를 찾기 위해 노력하였다. 이와 같은 노력은 지금까지도 이어지고 있다.
          <br />
          <br />
          &nbsp;&nbsp;<span>15</span>세기까지 알려진 가장 큰 소수는 <span>2</span>를 <span>13</span>번 곱한 수에서 <span>1</span>을 뺀 수로 고작 네
          자리 수에 불과했지만 <span>20</span>세기 컴퓨터가 등장한 이후로 큰 소수를 찾아내는 속도가 빨라졌다. <span>2018</span>년에는 <span>2</span>를{' '}
          <span>82589933</span>번 곱한 수에서 <span>1</span>을 뺀 수가 소수임이 밝혀졌는데 이것은 무려 <span>24862048</span>자리 수이다.
        </Text>
        <ImageWrapper>
          <Image src={fileUrl ?? ''} alt='1963년 가장 큰 소수 발견을 기념하는 우표 소인' width='330px' height='92px' />
          <ImageText>
            <span>1963</span>년 가장 큰 소수 발견을 기념하는 우표 소인
            <br />
            출처: GIMPS, 2023
          </ImageText>
        </ImageWrapper>
      </Content>
    </MContainer>
  );
};

export default P01;

const Content = styled.div`
  display: flex;
  gap: 40px;
  padding: 0 35px 50px 0;
`;

const Text = styled.div`
  white-space: pre-wrap;

  font-family: 'SUIT';
  font-size: 28px;
  font-weight: 600;
  color: var(--color-grey-900);
  line-height: 42px;

  span {
    font-family: 'NOTO';
    font-weight: 500;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
`;

const ImageText = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  padding: 4px 8px;

  span {
    font-family: 'NOTO';
    font-weight: 600;
  }
`;
