import {
  Box,
  TMainHeaderInfoTypes,
  Button,
  ChipButton,
  EChipButtonType,
  List,
  BoxWrap,
  EStyleButtonTypes,
  BottomSheet,
  Dialog,
  Typography,
  Question,
  IQuestionProps,
  EStyleSizes,
  Scroll,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IData {
  contents: string;
  value: boolean | undefined;
  answer: boolean;
}

const P02 = () => {
  const [ansShow, setAnsShow] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isContentShow, setContentShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary (2)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q2. Is it true (T) or false (F)?',
    mark: isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const [list, setList] = useState<IData[]>([
    { contents: 'Mia and the club members chopped sugarcane for the elephants with weak teeth.', value: undefined, answer: false },
  ]);

  const handleChangeValue = (value: boolean, index?: number) => {
    setList(data => data?.map((val, idx) => (idx === index ? { ...val, value: val.value === value ? undefined : value } : val)));
  };

  const handleGrading = () => {
    setIsSubmitted(true);
    setIsCorrect(list.every((val, idx) => val.value === val.answer));
  };

  const scriptHead = `July 29, Monday`;
  const scriptBody = `Our club arrived at the Free Animals sanctuary. Jane, the staff member in charge of animal care, welcomed us with a big smile and gave us a tour of the facility. It was amazing to see bears and elephants moving freely in a large field. Our tasks for the day included cleaning the shelter and preparing food for the animals. While cleaning the habitats, we checked if there were any hazards that could harm the animals. Then, we helped prepare the food by cutting up fruits and vegetables and dividing them into several large baskets. For old elephants with weak teeth, we chopped bananas instead of the sugarcane that they usually eat. Spending the whole day helping out with the animals was an incredible experience for me. It was a rewarding experience, and I was impressed with the attention the staff members gave to all the animals.`;

  const answerText = 'F';

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (ansShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={list?.some(val => val?.value === undefined) ? true : false}
      submitBtnColor={
        isSubmitted
          ? ansShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : list?.some(val => val?.value === undefined)
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={() => {
        isSubmitted ? (ansShow ? setAnsShow(false) : setAnsShow(true)) : handleGrading();
      }}
    >
      <BoxWrap flexDirection='column' justifyContent='space-around' useFull>
        <List data={list}>
          {({ value, index = 1 }) => (
            <BoxWrap justifyContent='space-between' useFull>
              <Box>
                <Question size={'small'}>{value?.contents}</Question>
              </Box>
              <Box vAlign='center'>
                <BoxWrap>
                  <ChipButton
                    type='radio'
                    name={`chip-radio-${index}`}
                    status={EChipButtonType.TRUE}
                    isActive={value?.value === true}
                    size={'48px'}
                    onClick={() => handleChangeValue(true, index - 1)}
                    isDisabled={isSubmitted}
                    isError={isSubmitted && value?.value === true && !isCorrect}
                  />
                  <ChipButton
                    type='radio'
                    name={`chip-radio-${index}`}
                    status={EChipButtonType.FALSE}
                    isActive={value?.value === false}
                    size={'48px'}
                    onClick={() => handleChangeValue(false, index - 1)}
                    isDisabled={isSubmitted}
                    isError={isSubmitted && value?.value === false && !isCorrect}
                  />
                </BoxWrap>
              </Box>
            </BoxWrap>
          )}
        </List>

        <Box hAlign='flex-end'>
          <Button
            label={'지문보기'}
            color={EStyleButtonTypes.SECONDARY}
            size={EStyleSizes['SMALL']}
            minWidth='132px'
            useRound
            onClick={() => {
              setContentShow(!isContentShow);
            }}
          />
        </Box>
      </BoxWrap>

      <Dialog isShow={isContentShow} width={893} height={458} useFooter onClose={() => setContentShow(!isContentShow)} closeLabel='닫기'>
        <Box vAlign='center' width='100%' height='48px' useRound backgroundColor='var(--color-grey-100)' marginBottom='24px'>
          <Typography weight='var(--font-weight-bold)'>{headerInfo.headerText}</Typography>
        </Box>
        <Box>
          <Typography weight='var(--font-weight-bold)'>{scriptHead}</Typography>
          <p />
          <Typography>{scriptBody}</Typography>
        </Box>
      </Dialog>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={ansShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{answerText}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
