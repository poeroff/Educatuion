import { Box, TextView } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import styled from 'styled-components';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { HeaderTitleNumber, HeaderTitleText } from './style';

const MAIN_KEY = [4];

const P03 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(3),
    collectDatas: getCorrectData(3),
  });
  const initialValue = useMemo(() => getValueInputData(MAIN_KEY[0], 'TEXT_LIST-0') as string[], [getValueInputData]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(initialValue.length > 0 ? initialValue : []);

  const OPTIONS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ'];

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedOptions(prev => [...prev, e.target.value]);
    else setSelectedOptions(prev => prev.filter(option => option !== e.target.value));
  };

  useEffect(() => {
    changeInputData(MAIN_KEY[0], 'TEXT_LIST-0', selectedOptions);
  }, [changeInputData, selectedOptions]);

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'checkLearnedEmotion' }}
      questionInfo={{
        text: (
          <Box display='flex' gap='14px'>
            <HeaderTitleNumber>
              3<GradeCheck mainKey={MAIN_KEY[0]} />
            </HeaderTitleNumber>
            <HeaderTitleText>다음 보기에서 두 수가 서로소인 것을 모두 찾으시오.</HeaderTitleText>
          </Box>
        ),
      }}
      vAlign='start'
      submitDisabled={selectedOptions.length === 0 || pageSubmitted}
      onSubmit={() => gradeSubmitPageData()}
      submitLabel='채점하기'
      useExtend
    >
      <Box display='flex' flexDirection='column' alignItems='center' gap='21px' marginTop='30px'>
        <TextView title='보기'>
          <Box display='flex' flexDirection='column' gap='10px' flexWrap='wrap' padding='10px 0'>
            <Box display='flex' gap='10px'>
              <Option>
                <OptionLabel>ㄱ.</OptionLabel>
                <Number>4, 9</Number>
              </Option>
              <Option>
                <OptionLabel>ㄴ.</OptionLabel>
                <Number>27, 51</Number>
              </Option>
            </Box>
            <Box display='flex' alignItems='center' gap='10px'>
              <Option>
                <OptionLabel>ㄷ.</OptionLabel>
                <Number>35, 72</Number>
              </Option>
              <Option>
                <OptionLabel>ㄹ.</OptionLabel>
                <Number>52, 65</Number>
              </Option>
            </Box>
          </Box>
        </TextView>
        {/* TODO: 선다형 컴포넌트 추가되면 변경하기 */}
        <Box display='flex' flexDirection='row' alignItems='center' gap='48px'>
          {OPTIONS.map((option, index) => (
            <OptionButtonLabel key={option}>
              <input
                type='checkbox'
                value={index.toString()}
                onChange={handleClick}
                disabled={isSubmittedInput(0, 'TEXT_LIST-0')}
                checked={initialValue.includes(index.toString())}
              />
              <Circle>{index + 1}</Circle>
              <span>{option}</span>
            </OptionButtonLabel>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

const OptionButtonLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 20px 10px 12px;
  border-radius: 8px;

  & input {
    display: none;
  }

  &:has(input:checked) {
    background-color: #1e6efa;
    color: #ffffff;
  }
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 100%;
  border: 1px solid;
`;

const Option = styled.div`
  width: 218px;
  font-family: SUIT;
  font-size: 28px;
  font-weight: 600;
  line-height: 40px;
  text-align: left;
  white-space: nowrap;
`;

const OptionLabel = styled.span`
  font-family: SUIT;
  font-size: 28px;
  font-weight: 600;
  line-height: 42px;
  margin-right: 14px;
`;

const Number = styled.span`
  font-family: Noto Serif;
  font-size: 28px;
  font-weight: 400;
  line-height: 42px;
`;

export default P03;
