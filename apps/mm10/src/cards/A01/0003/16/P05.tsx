import { Box, Drawing, ETagLine, Input, Tag } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import styled from 'styled-components';
import { HeaderTitleNumber, HeaderTitleText } from './style';

const MAIN_KEY = [7];

const P05 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(5),
    collectDatas: getCorrectData(5),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'checkLearnedEmotionPlusScript' }}
      questionInfo={{
        text: (
          <Box display='flex' gap='10px'>
            <HeaderTitleNumber>
              5<GradeCheck mainKey={MAIN_KEY[0]} />
            </HeaderTitleNumber>
            <HeaderTitleText>
              두 분수&nbsp;
              <Fraction>
                <Numerator>1</Numerator>
                <Denominator>12</Denominator>
              </Fraction>
              &nbsp;과&nbsp;
              <Fraction>
                <Numerator>1</Numerator>
                <Denominator>14</Denominator>
              </Fraction>
              &nbsp;의 어느 것에 곱하여도 그 결과가 자연수가 되게 하는 가장 작은 자연수를 구하는 풀이 과정과 답을 쓰시오.
            </HeaderTitleText>
          </Box>
        ),
      }}
      vAlign='start'
      submitDisabled={!getValueInputData(MAIN_KEY[0], 'TEXT-0') || pageSubmitted}
      onSubmit={() => gradeSubmitPageData()}
      submitLabel='채점하기'
      useExtend
    >
      <Box display='flex' flexDirection='column' alignItems='center' gap='21px' marginTop='30px'>
        <Box display='flex' flexDirection='row' alignItems='center' gap='40px'>
          <Box display='flex' flexDirection='column' gap='12px'>
            <Tag label='풀이' type={ETagLine.GREEN} width='84px' height='42px' />
            <Drawing width='632px' height='220px' />
          </Box>
          <Box display='flex' flexDirection='column' gap='12px' alignSelf='start'>
            <Tag label='정답' type={ETagLine.GREEN} width='84px' height='42px' />
            <Input
              width='312px'
              value={getValueInputData(MAIN_KEY[0], 'TEXT-0') as string}
              onChange={e => {
                handleChangeInputData(MAIN_KEY[0], 'TEXT-0', e.target.value);
              }}
              disabled={isSubmittedInput(MAIN_KEY[0], 'TEXT-0')}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

const Fraction = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  font-family: Noto Serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  text-align: center;
  vertical-align: top;
`;

const Numerator = styled.span`
  width: 100%;
  text-align: center;
`;

const Denominator = styled.span`
  border-top: 1px solid #000;
`;

export default P05;
