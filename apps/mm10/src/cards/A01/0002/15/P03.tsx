import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import GradeCheck from '@/components/gradeCheck';
import BracketSVG from '@/assets/A01/0002/15/bracket.svg';
import DivisionSVG from '@/assets/A01/0002/15/division.svg';
import { Input, SvgIcon } from '@maidt-cntn/ui';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';

function P03() {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(3),
    collectDatas: getCorrectData(3),
  });
  const question1Answered = [...Array(4).keys()].every((_, idx) => String(getValueInputData(2, `TEXT-${idx}`)).trim() !== '');
  const question2Answered = [...Array(5).keys()].every((_, idx) => String(getValueInputData(3, `TEXT-${idx}`)).trim() !== '');

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'formativeTest' }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={pageSubmitted || !(question1Answered && question2Answered)}
      useExtend
      questionInfo={{
        text: (
          <Title>
            <span>
              3<GradeCheck isGradeAll />
            </span>{' '}
            <TitleInput />
            <h1>
              안에 알맞은 수를 써넣고, <span>40</span>을 소인수분해 한 결과를 구하시오.
            </h1>
          </Title>
        ),
      }}
    >
      <ContentsContainer>
        <ItemContainer>
          <Items>
            <Item>
              <Question>
                <QuestionNumber>(1)</QuestionNumber>
                <FirstQuestionContainer>
                  <FirstQuestion className='first-1'>
                    <p>40</p>
                    <SvgIcon src={BracketSVG} width='19px' height='42px' />
                    <Input
                      value={getValueInputData(2, 'TEXT-0') as string}
                      onChange={e => {
                        changeInputData(2, 'TEXT-0', e.target.value);
                      }}
                      disabled={isSubmittedInput(2, 'TEXT-0')}
                    />
                  </FirstQuestion>
                  <FirstQuestion className='first-2'>
                    <p>20</p>
                    <SvgIcon src={BracketSVG} width='19px' height='42px' />
                    <Input
                      value={getValueInputData(2, 'TEXT-1') as string}
                      onChange={e => {
                        changeInputData(2, 'TEXT-1', e.target.value);
                      }}
                      disabled={isSubmittedInput(2, 'TEXT-1')}
                    />
                  </FirstQuestion>
                  <FirstQuestion className='first-3'>
                    <p>10</p>
                    <SvgIcon src={BracketSVG} width='19px' height='42px' />
                    <Input
                      value={getValueInputData(2, 'TEXT-2') as string}
                      onChange={e => {
                        changeInputData(2, 'TEXT-2', e.target.value);
                      }}
                      disabled={isSubmittedInput(2, 'TEXT-2')}
                    />
                  </FirstQuestion>
                  <p>5</p>
                </FirstQuestionContainer>
              </Question>
              <Answer>
                <p>40=</p>
                <Input
                  inputSize='medium'
                  width='282px'
                  value={getValueInputData(2, 'TEXT-3') as string}
                  onChange={e => {
                    changeInputData(2, 'TEXT-3', e.target.value);
                  }}
                  disabled={isSubmittedInput(2, 'TEXT-3')}
                />
              </Answer>
            </Item>
            <Item>
              <Question>
                <QuestionNumber>(2)</QuestionNumber>
                <SecondQuestionContainer>
                  <SecondQuestion>
                    <Input
                      value={getValueInputData(3, 'TEXT-0') as string}
                      onChange={e => {
                        changeInputData(3, 'TEXT-0', e.target.value);
                      }}
                      disabled={isSubmittedInput(3, 'TEXT-0')}
                    />
                    <SvgIcon src={DivisionSVG} width='99px' height='45px' />
                    <p>40</p>
                  </SecondQuestion>
                  <SecondQuestion>
                    <Input
                      value={getValueInputData(3, 'TEXT-1') as string}
                      onChange={e => {
                        changeInputData(3, 'TEXT-1', e.target.value);
                      }}
                      disabled={isSubmittedInput(3, 'TEXT-1')}
                    />
                    <SvgIcon src={DivisionSVG} width='99px' height='45px' />
                    <p>20</p>
                  </SecondQuestion>
                  <SecondQuestion>
                    <Input
                      value={getValueInputData(3, 'TEXT-2') as string}
                      onChange={e => {
                        changeInputData(3, 'TEXT-2', e.target.value);
                      }}
                      disabled={isSubmittedInput(3, 'TEXT-2')}
                    />
                    <SvgIcon src={DivisionSVG} width='99px' height='45px' />
                    <p>10</p>
                  </SecondQuestion>
                  <Input
                    value={getValueInputData(3, 'TEXT-3') as string}
                    onChange={e => {
                      changeInputData(3, 'TEXT-3', e.target.value);
                    }}
                    disabled={isSubmittedInput(3, 'TEXT-3')}
                  />
                </SecondQuestionContainer>
              </Question>
              <Answer>
                <p>40=</p>
                <Input
                  inputSize='medium'
                  width='282px'
                  value={getValueInputData(3, 'TEXT-4') as string}
                  onChange={e => {
                    changeInputData(3, 'TEXT-4', e.target.value);
                  }}
                  disabled={isSubmittedInput(3, 'TEXT-4')}
                />
              </Answer>
            </Item>
          </Items>
        </ItemContainer>
      </ContentsContainer>
    </Container>
  );
}

const ContentsContainer = styled.section`
  height: 100%;
`;

const TitleInput = styled.span`
  display: inline-flex;

  width: 42px;
  height: 42px;

  border: 1px solid var(--color-grey-600);
  border-radius: 8px;

  background-color: #fff;

  margin: 0 10px;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;

  white-space: pre;

  h1 {
    display: flex;
    align-items: center;

    font-weight: 600;
    font-size: 36px;
    line-height: 54px;

    span {
      font-family: NOTO;
      font-weight: 400;
    }
  }

  > span:first-child {
    font-family: SUIT;
    font-weight: 800;
    font-size: 36px;
    line-height: 58px;
    color: var(--color-yellow-700);

    position: relative;

    margin-right: 14px;
  }

  figure {
    transform: translate(-15px, 30px);
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 30px;
`;

const QuestionNumber = styled.p`
  font-size: 28px;
  font-weight: 500;
  line-height: 40px;

  padding: 4px 0;
`;

const Items = styled.div`
  display: flex;

  gap: 135px;
`;

const Item = styled.div`
  width: 400px;
  height: 328px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Question = styled.div`
  display: flex;

  gap: 30px;
`;

const FirstQuestionContainer = styled.div`
  position: relative;

  width: 277px;
  height: 162px;

  .first-1 {
    position: absolute;

    top: 7px;
  }

  .first-2 {
    position: absolute;

    top: 45px;
    left: 79px;
  }

  .first-3 {
    position: absolute;

    top: 75px;
    left: 158px;
  }

  > p {
    position: absolute;

    bottom: 0;
    right: 26px;

    font-family: NOTO;
    font-size: 28px;
    font-weight: 400;
  }
`;

const FirstQuestion = styled.div`
  position: relative;

  p {
    position: absolute;
    top: 27px;

    font-family: NOTO;
    font-size: 28px;
    font-weight: 400;
  }

  span {
    position: absolute;

    top: 25px;
    left: 44px;
  }

  input {
    position: absolute;

    left: 67px;

    width: 38px;
    height: 38px;

    font-size: 34px;

    padding: 0;
    text-align: center;
  }
`;

const SecondQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 18px;

  position: relative;

  height: 221px;

  > input {
    width: 38px;
    height: 38px;

    position: absolute;
    bottom: 0;
    right: 31px;

    padding: 0;
    text-align: center;
  }
`;

const SecondQuestion = styled.div`
  position: relative;

  width: 148px;
  height: 45px;

  input {
    width: 38px;
    height: 38px;

    position: absolute;

    top: 4px;

    padding: 0;
    text-align: center;
  }

  span {
    position: absolute;

    left: 48px;
  }

  p {
    position: absolute;

    top: 0;
    right: 35px;

    font-family: NOTO;
    font-size: 28px;
    font-weight: 400;
    line-height: 40px;
  }
`;

const Answer = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;

  p {
    width: 74px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: NOTO;
    font-size: 28px;
    font-weight: 400;
    line-height: 40px;
  }
`;

export default P03;
