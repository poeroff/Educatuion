import { Box, Input, Label } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import styled from 'styled-components';
import { HeaderTitleNumber, HeaderTitleText, Sup, Number } from './style';
import { useMemo } from 'react';

const MAIN_KEY = [2, 3];

const P02 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(2),
    collectDatas: getCorrectData(2),
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
          <Box display='flex' gap='14px'>
            <HeaderTitleNumber>
              2<GradeCheck isGradeAll />
            </HeaderTitleNumber>
            <HeaderTitleText $isSup>
              두 수{' '}
              <Number>
                2<SupRectCircleText>ㄱ</SupRectCircleText>
                ×3<Sup>5</Sup>과 2<Sup>3</Sup>×3<Sup>4</Sup>
              </Number>
              의 최대공약수가{' '}
              <Number>
                2<Sup>2</Sup>×3<SupRectCircleText>ㄴ</SupRectCircleText>
              </Number>{' '}
              일 때, <Label value='ㄱ' />과 <Label value='ㄴ' /> 에 알맞은 수를 써넣으시오.
            </HeaderTitleText>
          </Box>
        ),
      }}
      vAlign='start'
      submitDisabled={hasEmptyValue || pageSubmitted}
      onSubmit={() => gradeSubmitPageData()}
      submitLabel='채점하기'
      useExtend
    >
      <Box display='flex' flexDirection='column' alignItems='start' gap='20px' marginTop='30px'>
        <Box display='flex' alignItems='center' gap='10px'>
          <Box position='relative'>
            <Label value='ㄱ' />
            <GradeCheck mainKey={MAIN_KEY[0]} />
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
        <Box display='flex' alignItems='center' gap='10px'>
          <Box position='relative'>
            <Label value='ㄴ' />
            <GradeCheck mainKey={MAIN_KEY[1]} />
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

const SupRectCircleText = styled.span`
  vertical-align: super;
  position: relative;
  min-width: 14.57px;
  height: 14.57px;
  border-radius: 50%;
  border: 1px solid #6a6d73;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: 700;
  line-height: 36px;
  text-align: center;
  top: -8px;
  margin: 0 2px;

  &::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border: 1px solid #8d9299;
    border-radius: 3.43px;
  }
`;

export default P02;
