import { Box, Input } from '@maidt-cntn/ui';
import { MContainer } from '@maidt-cntn/ui/math';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import { HeaderTitle, HeaderTitleIndexWrap, HeaderTitleIndex, LevelIcon, Number } from './styles';

const MAIN_KEY = [11];

const P10 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(10),
    collectDatas: getCorrectData(10),
  });
  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'finish' }}
      questionInfo={{
        text: (
          <HeaderTitle>
            <HeaderTitleIndexWrap>
              <HeaderTitleIndex>
                10
                <GradeCheck mainKey={MAIN_KEY[0]} />
              </HeaderTitleIndex>
              <Box display='flex' alignItems='center' gap='4px'>
                {[true, true, true].map((colored, i) => (
                  <LevelIcon $colored={colored} key={i} />
                ))}
              </Box>
            </HeaderTitleIndexWrap>
            <Box>
              최대공약수가 <Number>5</Number>이고 최소공배수가 <Number>120</Number>인 두 자연수가 있다. <br />이 두 자연수의 차가 <Number>25</Number>
              일 때, 두 자연수의 합을 구하시오.
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

export default P10;
