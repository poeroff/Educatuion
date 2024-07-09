import { getCorrectData, getDefaultData } from './pageData';
import { Input } from '@maidt-cntn/ui';
import styled from 'styled-components';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { MContainer } from '@maidt-cntn/ui/math';
import GradeCheck from '@/components/gradeCheck';

const P01 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };
  const question1Answered = [...Array(4).keys()].every((_, idx) => (getValueInputData(0, `TEXT-${idx}`) as string).trim() !== '');
  const question2Answered = [...Array(5).keys()].every((_, idx) => (getValueInputData(1, `TEXT-${idx}`) as string).trim() !== '');

  return (
    <MContainer
      headerInfo={{
        headerPattern: 'icon',
        iconType: 'readyBrownEmotion',
      }}
      questionInfo={{
        text: (
          <Numbering>
            <span>
              <RoundNumber>1</RoundNumber>
              <GradeCheck isGradeAll />
            </span>
            <h1>다음 수의 약수를 모두 구하시오.</h1>
          </Numbering>
        ),
      }}
      vAlign='start'
      onSubmit={gradeSubmitPageData}
      submitDisabled={pageSubmitted || !(question1Answered && question2Answered)}
      submitLabel='채점하기'
      hasMark
      markIcon='초 5~6'
      markText='약수'
    >
      <ContentWrapper>
        <Content>
          <DetailNumbering>
            <span>(1)</span>
            <span>10</span>
          </DetailNumbering>
          <div>
            <Input
              width='96px'
              textAlign='center'
              maxLength={3}
              value={getValueInputData(0, 'TEXT-0') as string}
              onChange={e => {
                handleChangeInputData(0, 'TEXT-0', e.target.value);
              }}
              disabled={isSubmittedInput(0, 'TEXT-0')}
            />
            ,
            <Input
              width='96px'
              textAlign='center'
              maxLength={3}
              value={getValueInputData(0, 'TEXT-1') as string}
              onChange={e => {
                handleChangeInputData(0, 'TEXT-1', e.target.value);
              }}
              disabled={isSubmittedInput(0, 'TEXT-1')}
            />
            ,
            <Input
              width='96px'
              textAlign='center'
              maxLength={3}
              value={getValueInputData(0, 'TEXT-2') as string}
              onChange={e => {
                handleChangeInputData(0, 'TEXT-2', e.target.value);
              }}
              disabled={isSubmittedInput(0, 'TEXT-2')}
            />
            ,
            <Input
              width='96px'
              textAlign='center'
              maxLength={3}
              value={getValueInputData(0, 'TEXT-3') as string}
              onChange={e => {
                handleChangeInputData(0, 'TEXT-3', e.target.value);
              }}
              disabled={isSubmittedInput(0, 'TEXT-3')}
            />
          </div>
        </Content>
        <Content>
          <DetailNumbering>
            <span>(2)</span>
            <span>16</span>
          </DetailNumbering>
          <div>
            <Input
              width='96px'
              textAlign='center'
              maxLength={3}
              value={getValueInputData(1, 'TEXT-0') as string}
              onChange={e => {
                handleChangeInputData(1, 'TEXT-0', e.target.value);
              }}
              disabled={isSubmittedInput(1, 'TEXT-0')}
            />
            ,
            <Input
              width='96px'
              textAlign='center'
              maxLength={3}
              value={getValueInputData(1, 'TEXT-1') as string}
              onChange={e => {
                handleChangeInputData(1, 'TEXT-1', e.target.value);
              }}
              disabled={isSubmittedInput(1, 'TEXT-1')}
            />
            ,
            <Input
              width='96px'
              textAlign='center'
              maxLength={3}
              value={getValueInputData(1, 'TEXT-2') as string}
              onChange={e => {
                handleChangeInputData(1, 'TEXT-2', e.target.value);
              }}
              disabled={isSubmittedInput(1, 'TEXT-2')}
            />
            ,
            <Input
              width='96px'
              textAlign='center'
              maxLength={3}
              value={getValueInputData(1, 'TEXT-3') as string}
              onChange={e => {
                handleChangeInputData(1, 'TEXT-3', e.target.value);
              }}
              disabled={isSubmittedInput(1, 'TEXT-3')}
            />
            ,
            <Input
              width='96px'
              textAlign='center'
              maxLength={3}
              value={getValueInputData(1, 'TEXT-4') as string}
              onChange={e => {
                handleChangeInputData(1, 'TEXT-4', e.target.value);
              }}
              disabled={isSubmittedInput(1, 'TEXT-4')}
            />
          </div>
        </Content>
      </ContentWrapper>
    </MContainer>
  );
};

export default P01;

const ContentWrapper = styled.div`
  flex-direction: column;
  display: flex;
  gap: 24px;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 150px;
  div {
    margin: 4px 12px;
    font-family: var(--font-NOTO);
    display: flex;
    align-items: end;
    gap: 8px;

    input {
      height: 58px;
      font-size: 32px;
    }
  }
`;

const Numbering = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  span {
    height: fit-content;
    position: relative;
    color: #f37259;
  }
  figure {
    transform: translate(-15px, 30px);
  }
`;

const DetailNumbering = styled.div`
  display: flex;
  gap: 6px;
  span:nth-child(1) {
    font-family: 'SUIT';
  }
`;

const RoundNumber = styled.div`
  padding: 10px 22px;
  width: 61px;
  height: 46px;
  border-radius: 50px;
  border: 1px solid #fecd6a;
  display: flex;
  align-items: center;
  justify-content: center;
`;
