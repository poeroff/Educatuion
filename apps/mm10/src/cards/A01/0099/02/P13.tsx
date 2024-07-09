import useCurrentPageData from '@/hooks/useCurrentPageData';
import { Box, Drawing, ESvgType, Input, SvgIcon } from '@maidt-cntn/ui';
import { MContainer } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import DescriptiveTypeSVG from '@/assets/A01/0099/02/descriptiveType.svg';
import { HeaderTitle, HeaderTitleIndex, HeaderTitleIndexWrap, LevelIcon, Number } from './styles';
import { useMemo } from 'react';

const MAIN_KEY = [14];

function P13() {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(13),
    collectDatas: getCorrectData(13),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const getEmptyValue = (values: string[]) => {
    return values.some(value => value.trim() === '');
  };

  const hasEmptyValue = useMemo(() => {
    const values = [getValueInputData(MAIN_KEY[0], 'TEXT-0') as string, getValueInputData(MAIN_KEY[0], 'TEXT-1') as string];
    return getEmptyValue(values);
  }, [getValueInputData]);

  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'finish', headerText: <SvgIcon src={DescriptiveTypeSVG} type={ESvgType.IMG} /> }}
      questionInfo={{
        text: (
          <HeaderTitle>
            <HeaderTitleIndexWrap>
              <HeaderTitleIndex>
                13
                <GradeCheck mainKey={MAIN_KEY[0]} />
              </HeaderTitleIndex>
              <Box display='flex' alignItems='center' gap='4px'>
                {[true, true, true].map((colored, i) => (
                  <LevelIcon $colored={colored} key={i} />
                ))}
              </Box>
            </HeaderTitleIndexWrap>
            <Box display='flex' flexDirection='column'>
              <Box display='flex'>
                서로소인 두 자연수의 최소공배수가 <Number>1440</Number>일 때, 이 두 자연수를
              </Box>
              <Box display='flex'>
                구하는 풀이 과정과 답을 쓰시오. <br />
                (단, 두 수 모두 두 자리 자연수이다.)
              </Box>
            </Box>
          </HeaderTitle>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={hasEmptyValue || pageSubmitted}
      vAlign='baseline'
    >
      <ContentsContainer>
        <ItemContainer>
          <DrawingContainer>
            <CustomLabel $drawing>풀이</CustomLabel>
            <Drawing height='220px' width='100%' />
          </DrawingContainer>
          <AnswerContainer>
            <CustomLabel>정답</CustomLabel>
            <Box display='flex' gap='8px' alignItems='end'>
              <Input
                width='143.5px'
                inputSize='medium'
                value={getValueInputData(MAIN_KEY[0], 'TEXT-0') as string}
                onChange={e => {
                  handleChangeInputData(MAIN_KEY[0], 'TEXT-0', e.target.value);
                }}
                disabled={isSubmittedInput(MAIN_KEY[0], 'TEXT-0')}
              />
              ,
              <Input
                width='143.5px'
                inputSize='medium'
                value={getValueInputData(MAIN_KEY[0], 'TEXT-1') as string}
                onChange={e => {
                  handleChangeInputData(MAIN_KEY[0], 'TEXT-1', e.target.value);
                }}
                disabled={isSubmittedInput(MAIN_KEY[0], 'TEXT-1')}
              />
            </Box>
          </AnswerContainer>
        </ItemContainer>
      </ContentsContainer>
    </MContainer>
  );
}

export default P13;

const ContentsContainer = styled.section`
  height: 100%;
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
