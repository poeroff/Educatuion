import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Box } from '@maidt-cntn/ui';
import { MContainer } from '@maidt-cntn/ui/math';
import { getCorrectData, getDefaultData } from './pageData';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import GradeCheck from '@/components/gradeCheck';
import {
  HeaderTitle,
  HeaderTitleIndexWrap,
  HeaderTitleIndex,
  LevelIcon,
  ExampleTag,
  Problem,
  AnswerContainer,
  Sup,
  OptionButtonLabel,
  Circle,
} from './styles';

const MAIN_KEY = [1];

const P02 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(2),
    collectDatas: getCorrectData(2),
  });
  const initialValue = useMemo(() => getValueInputData(MAIN_KEY[0], 'TEXT_LIST-0') as string[], [getValueInputData]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(initialValue.length > 0 ? initialValue : []);

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedOptions(prev => [...prev, e.target.value]);
    else setSelectedOptions(prev => prev.filter(option => option !== e.target.value));
  };

  useEffect(() => {
    changeInputData(MAIN_KEY[0], 'TEXT_LIST-0', selectedOptions);
  }, [changeInputData, selectedOptions]);

  const Problems = [
    <>
      ㄱ.{' '}
      <span>
        40=2<Sup>3</Sup>×5
      </span>
    </>,
    <>
      ㄴ. <span>84=3×4×7</span>
    </>,
    <>
      ㄷ.{' '}
      <span>
        156=2<Sup>2</Sup>×3×13
      </span>
    </>,
    <>
      ㄹ.{' '}
      <span>
        300=2<Sup>2</Sup>×5×15
      </span>
    </>,
  ];

  const KorIndex = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ'];

  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'finish' }}
      questionInfo={{
        text: (
          <HeaderTitle>
            <HeaderTitleIndexWrap>
              <HeaderTitleIndex>
                02
                <GradeCheck mainKey={MAIN_KEY[0]} />
              </HeaderTitleIndex>
              <Box display='flex' alignItems='center' gap='4px'>
                {[true, false, false].map((colored, i) => (
                  <LevelIcon $colored={colored} key={i} />
                ))}
              </Box>
            </HeaderTitleIndexWrap>
            다음 보기에서 바르게 소인수분해 한 것을 모두 찾으시오.
          </HeaderTitle>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={selectedOptions.length === 0 || pageSubmitted}
      vAlign='baseline'
    >
      <Box display='flex' alignItems='center' justifyContent='center' position='relative' margin='14px 0 40px'>
        <ExampleTag>보기</ExampleTag>
        <Box
          display='flex'
          flexDirection='column'
          gap='10px'
          width='480px'
          padding='20px 39px'
          border='1px solid #8D9299'
          borderRadius='8px'
          fontSize='28px'
          fontWeight='600'
          lineHeight='42px'
        >
          {Problems.map((el, index) => {
            return <Problem key={index}>{el}</Problem>;
          })}
        </Box>
      </Box>
      <AnswerContainer>
        {KorIndex.map((option, index) => {
          const newIndex = (index + 1).toString();
          return (
            <OptionButtonLabel key={option}>
              <input
                type='checkbox'
                value={newIndex}
                onChange={handleClick}
                disabled={isSubmittedInput(0, 'TEXT_LIST-0')}
                checked={initialValue.includes(newIndex)}
              />
              <Circle>{newIndex}</Circle>
              <span>{option}</span>
            </OptionButtonLabel>
          );
        })}
      </AnswerContainer>
    </MContainer>
  );
};

export default P02;
