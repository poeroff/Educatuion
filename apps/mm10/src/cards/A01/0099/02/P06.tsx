import { Box, Input } from '@maidt-cntn/ui';
import { MContainer } from '@maidt-cntn/ui/math';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import { HeaderTitle, HeaderTitleIndexWrap, HeaderTitleIndex, LevelIcon, Number } from './styles';
import { useMemo } from 'react';

const MAIN_KEY = [6];
const ANSWER_INPUT_COUNT = 8;

const P06 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(6),
    collectDatas: getCorrectData(6),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const getEmptyValue = (values: string[]) => {
    return values.some(value => value.trim() === '');
  };

  const hasEmptyValue = useMemo(() => {
    const values = [
      getValueInputData(MAIN_KEY[0], 'TEXT-0') as string,
      getValueInputData(MAIN_KEY[0], 'TEXT-1') as string,
      getValueInputData(MAIN_KEY[0], 'TEXT-2') as string,
      getValueInputData(MAIN_KEY[0], 'TEXT-3') as string,
      getValueInputData(MAIN_KEY[0], 'TEXT-4') as string,
      getValueInputData(MAIN_KEY[0], 'TEXT-5') as string,
      getValueInputData(MAIN_KEY[0], 'TEXT-6') as string,
      getValueInputData(MAIN_KEY[0], 'TEXT-7') as string,
    ];
    return getEmptyValue(values);
  }, [getValueInputData]);

  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'finish' }}
      questionInfo={{
        text: (
          <HeaderTitle>
            <HeaderTitleIndexWrap>
              <HeaderTitleIndex>
                06
                <GradeCheck mainKey={MAIN_KEY[0]} />
              </HeaderTitleIndex>
              <Box display='flex' alignItems='center' gap='4px'>
                {[true, true, false].map((colored, i) => (
                  <LevelIcon $colored={colored} key={i} />
                ))}
              </Box>
            </HeaderTitleIndexWrap>
            <Box>
              <Number>135</Number>의 약수를 모두 구하시오.
            </Box>
          </HeaderTitle>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={hasEmptyValue || pageSubmitted}
      vAlign='baseline'
    >
      <Box display='flex' justifyContent='end' gap='8px'>
        {Array.from({ length: ANSWER_INPUT_COUNT }, (_, i) => i).map((e, index) => (
          <Box display='flex' alignItems='end' gap='8px' key={e}>
            <Input
              width='86px'
              value={getValueInputData(MAIN_KEY[0], `TEXT-${index}`) as string}
              disabled={isSubmittedInput(MAIN_KEY[0], `TEXT-${index}`)}
              onChange={e => {
                handleChangeInputData(MAIN_KEY[0], `TEXT-${index}`, e.target.value);
              }}
            />
            {e !== 7 && <span>,</span>}
          </Box>
        ))}
      </Box>
    </MContainer>
  );
};

export default P06;
