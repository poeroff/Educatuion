import { Box, Input, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import GradeCheck from '@/components/gradeCheck';
import { getCorrectData, getDefaultData } from './pageData';
import { HeaderTitleNumber, HeaderTitleText, Sup } from './style';
import { useMemo } from 'react';

const MAIN_KEY = [0, 1];

const P01 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const getEmptyValue = (values: string[]) => {
    return values.some(value => value.trim() === '');
  };

  const hasEmptyValue = useMemo(() => {
    return getEmptyValue([getValueInputData(MAIN_KEY[0], 'TEXT-0') as string, getValueInputData(MAIN_KEY[1], 'TEXT-0') as string]);
  }, [getValueInputData]);

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'checkLearnedEmotion' }}
      questionInfo={{
        text: (
          <Box display='flex' alignItems='center' gap='14px'>
            <HeaderTitleNumber>
              1<GradeCheck isGradeAll />
            </HeaderTitleNumber>
            <HeaderTitleText>소인수분해를 이용하여 다음 두 수의 최대공약수를 구하시오.</HeaderTitleText>
          </Box>
        ),
      }}
      vAlign='start'
      submitDisabled={hasEmptyValue || pageSubmitted}
      onSubmit={() => gradeSubmitPageData()}
      submitLabel='채점하기'
      useExtend
    >
      <Box display='flex' flexDirection='column' alignItems='start' gap='12px' marginTop='30px'>
        <Box display='flex' alignItems='center' gap='12px'>
          <Box display='flex' alignItems='center' width='222px'>
            <Box display='flex' alignItems='center' fontFamily='Noto Serif'>
              <Box position='relative'>
                (1)
                <GradeCheck mainKey={MAIN_KEY[0]} />
              </Box>
              <Typography>
                2×5<Sup>4</Sup>, 2<Sup>3</Sup>×5<Sup>3</Sup>
              </Typography>
            </Box>
          </Box>
          <Input
            width='312px'
            inputSize='medium'
            value={getValueInputData(MAIN_KEY[0], 'TEXT-0') as string}
            onChange={e => {
              handleChangeInputData(MAIN_KEY[0], 'TEXT-0', e.target.value);
            }}
            disabled={isSubmittedInput(MAIN_KEY[0], 'TEXT-0')}
          />
        </Box>
        <Box display='flex' alignItems='center' gap='12px'>
          <Box display='flex' alignItems='center' width='222px'>
            <Box display='flex' alignItems='center' fontFamily='Noto Serif'>
              <Box position='relative'>
                (2)
                <GradeCheck mainKey={MAIN_KEY[1]} />
              </Box>
              <Typography>28, 84</Typography>
            </Box>
          </Box>
          <Input
            width='312px'
            inputSize='medium'
            value={getValueInputData(MAIN_KEY[1], 'TEXT-0') as string}
            onChange={e => {
              handleChangeInputData(MAIN_KEY[1], 'TEXT-0', e.target.value);
            }}
            disabled={isSubmittedInput(MAIN_KEY[1], 'TEXT-0')}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
