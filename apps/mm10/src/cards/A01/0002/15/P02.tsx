import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import GradeCheck from '@/components/gradeCheck';
import P2ArrowSVG from '@/assets/A01/0002/15/p2_arrow.svg';
import { Input, SvgIcon } from '@maidt-cntn/ui';
import { useState } from 'react';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';

function P02() {
  const { getValueInputData, changeInputData, pageSubmitted, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(2),
    collectDatas: getCorrectData(2),
  });

  const answers_1 = [
    { subKey: 'TEXT_LIST-0', length: 6, title: '약수' },
    { subKey: 'TEXT_LIST-1', length: 2, title: '소인수' },
  ];

  const answers_2 = [
    { subKey: 'TEXT_LIST-2', length: 7, title: '약수' },
    { subKey: 'TEXT_LIST-3', length: 1, title: '소인수' },
  ];

  const handleChangeInputData = (mainKey: number, subKey: string, value: string, index: number) => {
    const newList = [...(getValueInputData(mainKey, subKey) as string[])];
    newList[index] = value;

    changeInputData(mainKey, subKey, newList);
  };

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'formativeTest' }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={pageSubmitted}
      useExtend
      questionInfo={{
        text: (
          <Title>
            <span>
              2<GradeCheck mainKey={1} />
            </span>{' '}
            다음 수의 약수와 소인수를 모두 구하시오.
          </Title>
        ),
      }}
    >
      <ContentsContainer>
        <ItemContainer>
          <Items>
            <Item>
              <Question>
                <p>
                  <span>(1)</span> 20
                </p>
                <SvgIcon src={P2ArrowSVG} width='40px' height='22px' />
              </Question>
              <AnswerContainer>
                {answers_1.map(({ subKey, length, title }) => (
                  <Answer>
                    <p>{title}</p>
                    <Inputs>
                      {new Array(length).fill('').map((_, index) => (
                        <>
                          <Input
                            key={`${subKey}-${title}`}
                            width='66px'
                            inputSize='medium'
                            value={(getValueInputData(1, subKey) as string[])[index] || ''}
                            onChange={e => {
                              handleChangeInputData(1, subKey, e.target.value, index);
                            }}
                          />
                          <span>,</span>
                        </>
                      ))}
                    </Inputs>
                  </Answer>
                ))}
              </AnswerContainer>
            </Item>
            <Item>
              <Question>
                <p>
                  <span>(2)</span> 64
                </p>
                <SvgIcon src={P2ArrowSVG} width='40px' height='22px' />
              </Question>
              <AnswerContainer>
                {answers_2.map(({ subKey, length, title }) => (
                  <Answer>
                    <p>{title}</p>
                    <Inputs>
                      {new Array(length).fill('').map((_, index) => (
                        <>
                          <Input
                            key={`${subKey}-${title}`}
                            width='66px'
                            inputSize='medium'
                            value={(getValueInputData(1, subKey) as string[])[index] || ''}
                            onChange={e => {
                              handleChangeInputData(1, subKey, e.target.value, index);
                            }}
                          />
                          <span>,</span>
                        </>
                      ))}
                    </Inputs>
                  </Answer>
                ))}
              </AnswerContainer>
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

  gap: 12px;
`;

const Question = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;

  height: 54px;

  padding: 8px 0px 8px 10px;

  align-self: flex-start;

  p {
    display: flex;
    align-items: center;

    width: 100px;

    font-family: NOTO;
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-28);
    line-height: 36px;

    white-space: pre-wrap;

    padding: 4px 10px;
  }

  span:first-child {
    position: relative;
    font-family: SUIT;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Answer = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;

  p {
    width: 98px;
    height: 54px;

    padding: 6px 12px;

    font-size: 28px;
    font-weight: 500;
    line-height: 42px;

    span {
      font-family: SUIT;
    }
  }
`;

const Inputs = styled.div`
  display: flex;
  align-items: end;

  gap: 8px;

  span {
    font-family: NOTO;
    font-size: 28px;
    font-weight: 700;
    line-height: 36px;
  }

  span:last-child {
    display: none;
  }
`;

export default P02;
