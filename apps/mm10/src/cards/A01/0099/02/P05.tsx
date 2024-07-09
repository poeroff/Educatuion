import { Box, Input } from '@maidt-cntn/ui';
import { MContainer } from '@maidt-cntn/ui/math';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import { HeaderTitle, HeaderTitleIndexWrap, HeaderTitleIndex, LevelIcon, Number } from './styles';

const MAIN_KEY = [5];

const P05 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(5),
    collectDatas: getCorrectData(5),
  });
  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'finish' }}
      questionInfo={{
        text: (
          <HeaderTitle>
            <HeaderTitleIndexWrap>
              <HeaderTitleIndex>
                05
                <GradeCheck mainKey={MAIN_KEY[0]} />
              </HeaderTitleIndex>
              <Box display='flex' alignItems='center' gap='4px'>
                {[true, true, false].map((colored, i) => (
                  <LevelIcon $colored={colored} key={i} />
                ))}
              </Box>
            </HeaderTitleIndexWrap>
            <Box>
              <Number>240</Number>에 자연수를 곱하여 어떤 자연수의 제곱이 되게 하려고 할 때, 곱할 수 있는 가장 작은 자연수를 구하시오.
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

export default P05;