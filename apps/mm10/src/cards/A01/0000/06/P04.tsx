import { getCorrectData, getDefaultData } from './pageData';
import { Input } from '@maidt-cntn/ui';
import styled from 'styled-components';
import { MContainer } from '@maidt-cntn/ui/math';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import GradeCheck from '@/components/gradeCheck';

const P04 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(4),
    collectDatas: getCorrectData(4),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

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
              <RoundNumber>4</RoundNumber>
              <GradeCheck isGradeAll />
            </span>
            <h1>다음 두 수의 최소공배수를 구하시오.</h1>
          </Numbering>
        ),
      }}
      vAlign='start'
      onSubmit={gradeSubmitPageData}
      submitDisabled={pageSubmitted}
      submitLabel='채점하기'
      hasMark
      markIcon='초 5~6'
      markText='최대공배수'
    >
      <ContentWrapper>
        <Content>
          <DetailNumbering>
            <span>
              (1)
              <GradeCheck mainKey={0} />
            </span>
            <span>4, 10</span>
          </DetailNumbering>

          <Input
            width='312px'
            maxLength={3}
            value={getValueInputData(0, 'TEXT-0') as string}
            onChange={e => {
              handleChangeInputData(0, 'TEXT-0', e.target.value);
            }}
            disabled={isSubmittedInput(0, 'TEXT-0')}
          />
        </Content>
        <Content>
          <DetailNumbering>
            <span>
              (2)
              <GradeCheck mainKey={1} />
            </span>
            <span>12, 18</span>
          </DetailNumbering>
          <Input
            width='312px'
            maxLength={3}
            value={getValueInputData(1, 'TEXT-0') as string}
            onChange={e => {
              handleChangeInputData(1, 'TEXT-0', e.target.value);
            }}
            disabled={isSubmittedInput(1, 'TEXT-0')}
          />
        </Content>
      </ContentWrapper>
    </MContainer>
  );
};

export default P04;

const ContentWrapper = styled.div`
  flex-direction: column;
  display: flex;
  gap: 24px;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 70px;
  div {
    margin: 4px 12px;
    font-family: var(--font-NOTO);
    display: flex;
    align-items: end;
    gap: 8px;
    width: 140px;

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
`;

const DetailNumbering = styled.div`
  display: flex;
  gap: 6px;
  span {
    height: fit-content;
    position: relative;
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