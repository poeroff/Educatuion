import styled from 'styled-components';
import { Input, Typography, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';

const P03 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(3),
    collectDatas: getCorrectData(3),
  });
  const fileUrl = '/A01/0001/10/A-MM1-0101-10-03.png';
  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };
  const allQuestionAnswered = [...Array(2).keys()].every((_, idx) => (getValueInputData(0, `TEXT-${idx}`) as string).trim() !== '');

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'checkLearnedEmotion' }}
      questionInfo={{
        text: (
          <HeaderWrapper>
            <Typography weight='800' fontSize='36px' color='#996500' style={{ padding: '0 14px 0 8px' }}>
              <span style={{ position: 'relative' }}>
                3
                <GradeCheck isGradeAll />
              </span>
            </Typography>
            <Typography weight='600' fontSize='36px' style={{ padding: '0', wordBreak: 'keep-all', lineHeight: '54px' }}>
              다음은 훈민정음에 대한 글이다. 밑줄친 수 중에서 소수를 모두 찾으시오.
            </Typography>
          </HeaderWrapper>
        ),
      }}
      submitLabel='채점하기'
      submitDisabled={pageSubmitted || !allQuestionAnswered}
      onSubmit={() => gradeSubmitPageData()}
      useExtend
    >
      <Contents>
        <Image src={fileUrl ?? ''} title='세종대왕' alt='세종대왕' width='403px' height='352px' />
        <TextContainer>
          <p>
            &nbsp;&nbsp;훈민정음은 한글의 옛 이름으로 세종이 재위 <StyledSpan>25</StyledSpan>년에 창제한 문자이다.
            <br />
            &nbsp;&nbsp;창제 초기에는 닿소리 <StyledSpan>17</StyledSpan>자와 홀소리 <StyledSpan>11</StyledSpan>자로 총 <StyledSpan>28</StyledSpan>
            자였으나, 점차 <StyledSpan>4</StyledSpan>자를 사용하지 않게 되어 현재는 닿소리 <StyledSpan>14</StyledSpan>자와 홀소리{' '}
            <StyledSpan>10</StyledSpan>
            자만을 사용하고 있다.
          </p>
          <AnswerWrapper>
            <Input
              value={getValueInputData(0, 'TEXT-0') as string}
              onChange={e => handleChangeInputData(0, 'TEXT-0', e.target.value)}
              width='100px'
              inputSize='small'
              disabled={isSubmittedInput(0, 'TEXT-0')}
            />
            ,
            <Input
              value={getValueInputData(0, 'TEXT-1') as string}
              onChange={e => handleChangeInputData(0, 'TEXT-1', e.target.value)}
              width='100px'
              inputSize='small'
              disabled={isSubmittedInput(0, 'TEXT-1')}
            />
          </AnswerWrapper>
        </TextContainer>
      </Contents>
    </Container>
  );
};

export default P03;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: baseline;

  figure {
    transform: translate(-3px, 15px);
  }
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  padding: 30px 35px;

  gap: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  left: 22%;
  top: 15%;

  p {
    padding: 4px 10px;
    color: #000000;
    font-weight: 500;
    line-height: 42px;
    font-size: 28px;
    font-family: 'SUIT';
  }
`;

const AnswerWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 8px;

  font-size: 'NOTO';
  font-weight: 700;
  font-size: 34px;
  line-height: 40px;
`;

const StyledSpan = styled.span`
  font-family: 'NOTO';
  font-weight: 500;
  text-decoration: underline;
`;
