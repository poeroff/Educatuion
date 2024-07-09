import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import GradeCheck from '@/components/gradeCheck';
import { Input } from '@maidt-cntn/ui';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';

function P01() {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const allQuestionAnswered = [...Array(3).keys()].every((_, idx) => String(getValueInputData(1, `TEXT-${idx}`)).trim() !== '');

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'formativeTest' }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={pageSubmitted || !allQuestionAnswered}
      useExtend
      questionInfo={{
        text: (
          <Title>
            <span>
              1<GradeCheck mainKey={0} />
            </span>{' '}
            다음 <TitleInput /> 안에 알맞은 수를 써넣으시오.
          </Title>
        ),
      }}
    >
      <ContentsContainer>
        <ItemContainer>
          <Items>
            <Item>
              <Question>
                <span>(1)</span> 3×3×3×3×3=
              </Question>
              <Answer>
                <div>
                  <p>3</p>
                  <Input
                    value={getValueInputData(0, 'TEXT-0') as string}
                    onChange={e => {
                      changeInputData(0, 'TEXT-0', e.target.value);
                    }}
                    disabled={isSubmittedInput(0, 'TEXT-0')}
                  />
                </div>
              </Answer>
            </Item>
            <Item>
              <Question>
                <span>(2)</span> 2×2×2×3×3×3×3=
              </Question>
              <Answer>
                <div>
                  <p>2</p>
                  <Input
                    value={getValueInputData(0, 'TEXT-1') as string}
                    onChange={e => {
                      changeInputData(0, 'TEXT-1', e.target.value);
                    }}
                    disabled={isSubmittedInput(0, 'TEXT-1')}
                  />
                </div>
                <div>
                  <p>
                    <span>x</span> 3
                  </p>
                  <Input
                    value={getValueInputData(0, 'TEXT-2') as string}
                    onChange={e => {
                      changeInputData(0, 'TEXT-2', e.target.value);
                    }}
                    disabled={isSubmittedInput(0, 'TEXT-2')}
                  />
                </div>
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
  width: 42px;
  height: 42px;

  border: 1px solid var(--color-grey-600);
  border-radius: 8px;

  background-color: #fff;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;

  font-weight: 600;
  font-size: 36px;
  line-height: 54px;

  white-space: pre-wrap;

  > span:first-child {
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

const Item = styled.div`
  display: flex;
  align-items: center;

  padding: 8px 10px;

  gap: 12px;
`;

const Question = styled.p`
  font-family: NOTO;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-28);
  line-height: 36px;

  width: 320px;

  span:first-child {
    position: relative;
    font-family: SUIT;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;
`;

const Answer = styled.div`
  display: flex;

  gap: 4px;

  p {
    font-family: NOTO;
    font-size: 28px;
    font-weight: 400;
    line-height: 40px;

    span {
      font-family: SUIT;
    }
  }

  div {
    display: flex;

    gap: 2px;

    input {
      width: 14px;
      height: 14px;

      margin-top: 4px;

      border-radius: 2px;

      font-family: NOTO;
      font-size: 14px;
      font-weight: 400;

      padding: 0;

      text-align: center;
    }

    input:focus {
      padding: 0;
    }
  }
`;

export default P01;
