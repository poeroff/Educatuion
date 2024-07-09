import useCurrentPageData from '@/hooks/useCurrentPageData';
import { Box, Drawing, ESvgType, Input, SvgIcon } from '@maidt-cntn/ui';
import { MContainer } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import DescriptiveTypeSVG from '@/assets/A01/0099/02/descriptiveType.svg';
import { ExampleTag, HeaderTitle, HeaderTitleIndex, HeaderTitleIndexWrap, LevelIcon, Number, Problem } from './styles';

const MAIN_KEY = [12];

function P11() {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(11),
    collectDatas: getCorrectData(11),
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
                11
                <GradeCheck mainKey={MAIN_KEY[0]} />
              </HeaderTitleIndex>
              <Box display='flex' alignItems='center' gap='4px'>
                {[true, true, true].map((colored, i) => (
                  <LevelIcon $colored={colored} key={i} />
                ))}
              </Box>
            </HeaderTitleIndexWrap>
            <Box whiteSpace='nowrap'>다음을 모두 만족시키는 자연수를 구하는 풀이 과정과 답을 쓰시오.</Box>
          </HeaderTitle>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={!getValueInputData(MAIN_KEY[0], 'TEXT-0') || pageSubmitted}
      vAlign='baseline'
    >
      <ContentsContainer>
        <ItemContainer>
          <ItemBox>
            <Box display='flex' alignItems='center' justifyContent='center' position='relative' marginTop='14px'>
              <ExampleTag>보기</ExampleTag>
              <Box
                display='flex'
                flexDirection='column'
                gap='10px'
                width='480px'
                padding='20px 16px'
                border='1px solid #8D9299'
                borderRadius='8px'
                fontSize='28px'
                fontWeight='600'
                lineHeight='42px'
              >
                {Problems.map(el => {
                  return <Problem key={Math.random()}>{el}</Problem>;
                })}
              </Box>
            </Box>
          </ItemBox>
          <ItemBox>
            <DrawingContainer>
              <CustomLabel $drawing>풀이</CustomLabel>
              <Drawing height='232px' width='100%' />
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
          </ItemBox>
          <ItemBox></ItemBox>
        </ItemContainer>
      </ContentsContainer>
    </MContainer>
  );
}

export default P11;

const ContentsContainer = styled.section`
  height: 100%;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ItemBox = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
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
  position: ${({ $drawing }) => ($drawing ? 'absolute' : 'static')};
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

const Problems = [
  <>
    (1) <Number>25</Number>보다 크고 <Number>30</Number>보다 작다.
  </>,
  <>
    (2) 소인수가 두 개이고, 두 소인수의
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;합이 <Number>9</Number>이다.
  </>,
];
