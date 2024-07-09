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
  Number,
  ItemContainer,
  Item,
  ContentContainer,
  Sup,
  SupWrap,
} from './styles';

const MAIN_KEY = [0];

const P01 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted, isDetailCorrect } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const isChecked = (value: string) => {
    return getValueInputData(0, 'TEXT-0') === value;
  };

  const Problems = [
    <>
      가장 작은 소수는&nbsp;<Number>2</Number>이다.
    </>,
    <>
      <Number>51</Number>은 합성수이다.
    </>,
    <>
      <Number>15</Number>&nbsp;이하의 소수는&nbsp;<Number>7</Number>개이다.
    </>,
    <>
      <Number>32</Number>의 소인수는&nbsp;<Number>2</Number>뿐이다.
    </>,
    <SupWrap>
      2×5×2×5×3=2<Sup>2</Sup>×3×5<Sup>2</Sup>
    </SupWrap>,
  ];

  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'finish' }}
      questionInfo={{
        text: (
          <HeaderTitle>
            <HeaderTitleIndexWrap>
              <HeaderTitleIndex>
                01
                <GradeCheck mainKey={MAIN_KEY[0]} />
              </HeaderTitleIndex>
              <Box display='flex' alignItems='center' gap='4px'>
                {[true, false, false].map((colored, i) => (
                  <LevelIcon $colored={colored} key={i} />
                ))}
              </Box>
            </HeaderTitleIndexWrap>
            다음에서 옳지 않은 것은?
          </HeaderTitle>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={!getValueInputData(0, 'TEXT-0') || pageSubmitted}
      vAlign='baseline'
    >
      <ContentContainer>
        <ItemContainer>
          {Problems.map((el, index) => {
            const newIdx = String(index + 1);

            return (
              <Item
                key={newIdx}
                $isChecked={isChecked(newIdx)}
                $isError={isSubmittedInput(MAIN_KEY[0], 'TEXT-0') && !isDetailCorrect(MAIN_KEY[0], 'TEXT-0')}
              >
                <input
                  type='radio'
                  id={`option${newIdx}`}
                  name='option'
                  value={newIdx}
                  onClick={() => handleChangeInputData(MAIN_KEY[0], 'TEXT-0', newIdx)}
                  checked={isChecked(newIdx)}
                  onChange={e => {
                    handleChangeInputData(MAIN_KEY[0], 'TEXT-0', e.target.value);
                  }}
                  disabled={isSubmittedInput(MAIN_KEY[0], 'TEXT-0')}
                />
                <label htmlFor={`option${newIdx}`} data-number={newIdx}>
                  {el}
                </label>
              </Item>
            );
          })}
        </ItemContainer>
      </ContentContainer>
    </MContainer>
  );
};

export default P01;
