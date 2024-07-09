import { Box, Input } from '@maidt-cntn/ui';
import { MContainer } from '@maidt-cntn/ui/math';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import {
  HeaderTitle,
  HeaderTitleIndexWrap,
  HeaderTitleIndex,
  LevelIcon,
  ProblemContainer,
  Moonjae,
  MoonjaeText,
  DapLan,
  Dap,
  Sup,
  MoonjaeContainer,
  MoonjaeIndex,
} from './styles';
import { useMemo } from 'react';

const MAIN_KEY = [2, 3];

const P03 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted, isDetailCorrect } = useCurrentPageData({
    initData: getDefaultData(3),
    collectDatas: getCorrectData(3),
  });

  const getEmptyValue = (values: string[]) => {
    return values.some(value => value.trim() === '');
  };

  const hasEmptyValue = useMemo(() => {
    const values = [
      getValueInputData(MAIN_KEY[0], 'TEXT-0') as string,
      getValueInputData(MAIN_KEY[0], 'TEXT-1') as string,
      getValueInputData(MAIN_KEY[1], 'TEXT-0') as string,
      getValueInputData(MAIN_KEY[1], 'TEXT-1') as string,
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
                03
                <GradeCheck isGradeAll />
              </HeaderTitleIndex>
              <Box display='flex' alignItems='center' gap='4px'>
                {[true, false, false].map((colored, i) => (
                  <LevelIcon $colored={colored} key={i} />
                ))}
              </Box>
            </HeaderTitleIndexWrap>
            다음 두 수의 최대공약수와 최소공배수를 구하시오.
          </HeaderTitle>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={hasEmptyValue || pageSubmitted}
      vAlign='baseline'
    >
      <ProblemContainer>
        <MoonjaeContainer>
          <Moonjae>
            <MoonjaeIndex>(1)</MoonjaeIndex>
            <MoonjaeText>
              2×3<Sup>2</Sup>×11, 2<Sup>2</Sup>×11
            </MoonjaeText>
          </Moonjae>
          <DapLan>
            <Dap>
              최대공약수 :{' '}
              <Input
                width='120px'
                inputSize='medium'
                value={getValueInputData(MAIN_KEY[0], 'TEXT-0') as string}
                disabled={isSubmittedInput(MAIN_KEY[0], 'TEXT-0')}
                onChange={e => {
                  changeInputData(MAIN_KEY[0], 'TEXT-0', e.target.value);
                }}
                status={isSubmittedInput(MAIN_KEY[0], 'TEXT-0') && !isDetailCorrect(MAIN_KEY[0], 'TEXT-0') ? 'error' : 'default'}
              />
            </Dap>
            <Dap>
              최소공배수 :{' '}
              <Input
                width='120px'
                inputSize='medium'
                value={getValueInputData(MAIN_KEY[0], 'TEXT-1') as string}
                disabled={isSubmittedInput(MAIN_KEY[0], 'TEXT-1')}
                onChange={e => {
                  changeInputData(MAIN_KEY[0], 'TEXT-1', e.target.value);
                }}
                status={isSubmittedInput(MAIN_KEY[0], 'TEXT-1') && !isDetailCorrect(MAIN_KEY[0], 'TEXT-1') ? 'error' : 'default'}
              />
            </Dap>
          </DapLan>
        </MoonjaeContainer>
        <MoonjaeContainer>
          <Moonjae>
            <MoonjaeIndex>(2)</MoonjaeIndex>
            <MoonjaeText>45, 105</MoonjaeText>
          </Moonjae>
          <DapLan>
            <Dap>
              최대공약수 :{' '}
              <Input
                width='120px'
                inputSize='medium'
                value={getValueInputData(MAIN_KEY[1], 'TEXT-0') as string}
                disabled={isSubmittedInput(MAIN_KEY[1], 'TEXT-0')}
                onChange={e => {
                  changeInputData(MAIN_KEY[1], 'TEXT-0', e.target.value);
                }}
                status={isSubmittedInput(MAIN_KEY[1], 'TEXT-0') && !isDetailCorrect(MAIN_KEY[1], 'TEXT-0') ? 'error' : 'default'}
              />
            </Dap>
            <Dap>
              최소공배수 :{' '}
              <Input
                width='120px'
                inputSize='medium'
                value={getValueInputData(MAIN_KEY[1], 'TEXT-1') as string}
                disabled={isSubmittedInput(MAIN_KEY[1], 'TEXT-1')}
                onChange={e => {
                  changeInputData(MAIN_KEY[1], 'TEXT-1', e.target.value);
                }}
                status={isSubmittedInput(MAIN_KEY[1], 'TEXT-1') && !isDetailCorrect(MAIN_KEY[1], 'TEXT-1') ? 'error' : 'default'}
              />
            </Dap>
          </DapLan>
        </MoonjaeContainer>
      </ProblemContainer>
    </MContainer>
  );
};

export default P03;
