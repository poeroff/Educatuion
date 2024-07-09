import { Box, Input } from '@maidt-cntn/ui';
import { MContainer } from '@maidt-cntn/ui/math';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import { HeaderTitle, HeaderTitleIndexWrap, HeaderTitleIndex, LevelIcon, Number } from './styles';

const MAIN_KEY = [10];

const P09 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(9),
    collectDatas: getCorrectData(9),
  });
  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'finish' }}
      questionInfo={{
        text: (
          <HeaderTitle>
            <HeaderTitleIndexWrap>
              <HeaderTitleIndex>
                09
                <GradeCheck mainKey={MAIN_KEY[0]} />
              </HeaderTitleIndex>
              <Box display='flex' alignItems='center' gap='4px'>
                {[true, true, true].map((colored, i) => (
                  <LevelIcon $colored={colored} key={i} />
                ))}
              </Box>
            </HeaderTitleIndexWrap>
            <Box>
              <Number>1</Number>부터 <Number>100</Number>까지 자연수 중에서 약수가 3개인 수의 개수를 구하시오.
            </Box>
          </HeaderTitle>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={!getValueInputData(MAIN_KEY[0], 'TEXT-0') || pageSubmitted}
      vAlign='baseline'
    >
      <Box display='flex' justifyContent='end'>
        <Input
          width='235px'
          inputSize='medium'
          value={getValueInputData(MAIN_KEY[0], 'TEXT-0') as string}
          disabled={isSubmittedInput(MAIN_KEY[0], 'TEXT-0')}
          onChange={e => {
            changeInputData(MAIN_KEY[0], 'TEXT-0', e.target.value);
          }}
        />
      </Box>
    </MContainer>
  );
};

export default P09;
