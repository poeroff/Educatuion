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
  SupWrap,
} from './styles';
import { useMemo } from 'react';

const MAIN_KEY = [8, 9];

const P08 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(8),
    collectDatas: getCorrectData(8),
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
                08
                <GradeCheck isGradeAll />
              </HeaderTitleIndex>
              <Box display='flex' alignItems='center' gap='4px'>
                {[true, true, false].map((colored, i) => (
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
      submitDisabled={hasEmptyValue || pageSubmitted} // TODO : 수정
      vAlign='baseline'
    >
      <ProblemContainer>
        <MoonjaeContainer>
          <Moonjae>
            <MoonjaeIndex>
              (1)
              <GradeCheck mainKey={MAIN_KEY[0]} />
            </MoonjaeIndex>
            <SupWrap>
              <MoonjaeText>
                2×3<Sup>2</Sup>, 2<Sup>2</Sup>×3<Sup>3</Sup>, 2<Sup>3</Sup>×3×7
              </MoonjaeText>
            </SupWrap>
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
              />
            </Dap>
          </DapLan>
        </MoonjaeContainer>
        <MoonjaeContainer>
          <Moonjae>
            <MoonjaeIndex>
              (2)
              <GradeCheck mainKey={MAIN_KEY[1]} />
            </MoonjaeIndex>
            <MoonjaeText>45, 126, 140</MoonjaeText>
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
              />
            </Dap>
          </DapLan>
        </MoonjaeContainer>
      </ProblemContainer>
    </MContainer>
  );
};

export default P08;
