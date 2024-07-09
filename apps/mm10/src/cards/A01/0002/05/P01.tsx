import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import OpenThinkingSVG from '@/assets/A01/0002/05/open-thinking.svg';
import { Image } from '@maidt-cntn/ui';
import { useState } from 'react';

const P01 = () => {
  const [showAnswerButton, setShowAnswerButton] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const fileUrl = '/A01/0002/05/A-MM1-0102-05-01.png';
  return (
    <Container
      headerInfo={{}}
      questionInfo={{
        text: (
          <TitleContainer>
            <TitleNumber>2</TitleNumber>
            <Title>소인수분해는 어떻게 할까?</Title>
          </TitleContainer>
        ),
      }}
      useExtend
    >
      <Content>
        <img src={OpenThinkingSVG} alt='생각 열기' width='1000px' />

        <QuestionTitle>
          다음은 <span>12</span>를 두 자연수를 곱으로 나타낸 것이다. 빈칸에 알맞은 수를 써넣어 보자.
        </QuestionTitle>

        <ImageContainer>
          <AnswerChip onClick={() => setShowAnswerButton(true)}>정답</AnswerChip>
          <Image src={fileUrl ?? ''} alt='12를 소인수분해 하면 1과 12, 2와 6, 3과 4로 나뉘어질 수 있습니다.' width='1000px' height='278px' />
        </ImageContainer>

        <div>
          <QuestionContainer>
            <AnswerTitle>
              <span>12</span>의 약수를 구하고, 그중에서 소수인 것을 모두 말해보자.
            </AnswerTitle>
          </QuestionContainer>

          {showAnswerButton && (
            <AnswerContainer>
              <AnswerChip onClick={() => setShowAnswer(true)}>정답</AnswerChip>
              {showAnswer && (
                <div>
                  <AnswerText>
                    <span>12</span>의 약수: <span>1, 2, 3, 4, 6, 12</span>
                  </AnswerText>
                  <AnswerText>
                    <span>12</span>의 약수 중에서 소수인 것: <span>2, 3</span>
                  </AnswerText>
                </div>
              )}
            </AnswerContainer>
          )}
        </div>
      </Content>
    </Container>
  );
};

export default P01;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  margin-bottom: 20px;
`;

const TitleNumber = styled.p`
  font-family: SUIT;
  font-weight: 800;
  font-size: 36px;
  line-height: 58px;
  color: var(--color-yellow-700);
`;

const Title = styled.h1`
  font-family: SUIT;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
  color: var(--color-grey-900);
`;

const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  white-space: nowrap;
`;

const QuestionTitle = styled.p`
  font-family: SUIT;
  font-weight: 600;
  font-size: 28px;
  line-height: 42px;
  color: var(--color-black);
`;

const Content = styled.div`
  /* width: 100%; */
  height: 100%;

  display: flex;
  flex-direction: column;

  gap: 44px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  margin-top: 30px;

  gap: 10px;
`;

const AnswerChip = styled.button`
  width: fit-content;
  height: fit-content;

  border-radius: 22px;
  padding: 0 14px;
  background-color: var(--color-blue-500);

  font-family: SUIT;
  font-weight: 700;
  font-size: 20px;
  line-height: 42px;
  color: var(--color-white);
`;

const AnswerTitle = styled.p`
  font-family: SUIT;
  font-weight: 600;
  font-size: 28px;
  line-height: 40px;
  color: var(--color-grey-900);

  padding-left: 12px;

  span {
    font-family: NOTO;
  }
`;

const AnswerContainer = styled.div`
  display: flex;
  gap: 8px;

  margin-top: 30px;
`;

const AnswerText = styled(AnswerTitle)`
  line-height: 36px;
  padding-left: 0;
  margin-bottom: 8px;
`;
