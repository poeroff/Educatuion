import { Box, Input } from '@maidt-cntn/ui';
import { MContainer } from '@maidt-cntn/ui/math';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import { HeaderTitle, HeaderTitleIndexWrap, HeaderTitleIndex, LevelIcon, Number } from './styles';

const MAIN_KEY = [4];

const P04 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(4),
    collectDatas: getCorrectData(4),
  });
  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'finish' }}
      questionInfo={{
        text: (
          <HeaderTitle>
            <HeaderTitleIndexWrap>
              <HeaderTitleIndex>
                04
                <GradeCheck mainKey={MAIN_KEY[0]} />
              </HeaderTitleIndex>
              <Box display='flex' alignItems='center' gap='4px'>
                {[true, true, false].map((colored, i) => (
                  <LevelIcon $colored={colored} key={i} />
                ))}
              </Box>
            </HeaderTitleIndexWrap>
            <Number>1×2×3×...×10</Number>을 소인수분해 할 때,&nbsp;
            <Number>3</Number>의 지수를 구하시오.
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

export default P04;
