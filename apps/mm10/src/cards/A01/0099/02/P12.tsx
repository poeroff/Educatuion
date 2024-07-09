import useCurrentPageData from '@/hooks/useCurrentPageData';
import { Box, Drawing, ESvgType, Input, SvgIcon } from '@maidt-cntn/ui';
import { MContainer } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import DescriptiveTypeSVG from '@/assets/A01/0099/02/descriptiveType.svg';
import { HeaderTitle, HeaderTitleIndex, HeaderTitleIndexWrap, LevelIcon, Number } from './styles';

const MAIN_KEY = [13];

function P12() {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(12),
    collectDatas: getCorrectData(12),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'finish', headerText: <SvgIcon src={DescriptiveTypeSVG} type={ESvgType.IMG} /> }}
      questionInfo={{
        text: (
          <HeaderTitle>
            <HeaderTitleIndexWrap>
              <HeaderTitleIndex>
                12
                <GradeCheck mainKey={MAIN_KEY[0]} />
              </HeaderTitleIndex>
              <Box display='flex' alignItems='center' gap='4px'>
                {[true, true, false].map((colored, i) => (
                  <LevelIcon $colored={colored} key={i} />
                ))}
              </Box>
            </HeaderTitleIndexWrap>
            <Box display='flex' flexDirection='column'>
              <Box display='flex' alignItems='center' gap='8px'>
                <Number>270</Number>과 <Number>23×</Number>
                <Square />
                <Number>×7</Number>의 최대공약수가 <Number>52</Number>일 때,
                <Square />
                안에 들어갈
              </Box>
              <Box display='flex'>수 있는 가장 작은 자연수를 구하는 풀이 과정과 답을 쓰시오.</Box>
            </Box>
          </HeaderTitle>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={!getValueInputData(MAIN_KEY[0], 'TEXT-0') || pageSubmitted}
      vAlign='start'
    >
      <ContentsContainer>
        <ItemContainer>
          <DrawingContainer>
            <CustomLabel $drawing>풀이</CustomLabel>
            <Drawing height='220px' width='100%' />
          </DrawingContainer>
          <AnswerContainer>
            <CustomLabel>정답</CustomLabel>
            <Input
              width='312px'
              inputSize='medium'
              value={getValueInputData(MAIN_KEY[0], 'TEXT-0') as string}
              onChange={e => {
                handleChangeInputData(MAIN_KEY[0], 'TEXT-0', e.target.value);
              }}
              disabled={isSubmittedInput(MAIN_KEY[0], 'TEXT-0')}
            />
          </AnswerContainer>
        </ItemContainer>
      </ContentsContainer>
    </MContainer>
  );
}

export default P12;

const ContentsContainer = styled.section`
  height: 100%;
`;

const Square = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid #8d9299;
  background-color: #ffffff;
`;

const ItemContainer = styled.div`
  display: flex;
  gap: 48px;
`;

const DrawingContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding-top: 12px;
  gap: 12px;

  width: calc(100% - 48px - 312px);
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;
`;

const CustomLabel = styled.p<{ $drawing?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  width: 74px;
  white-space: nowrap;

  position: ${({ $drawing }) => ($drawing ? 'absolute' : '')};
  top: 0;

  font-family: SUIT;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;

  border: 1px solid #058943;
  border-radius: 40px;

  color: #00593e;
  background-color: #ffffff;
`;
