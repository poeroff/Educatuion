import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  ChipButton,
  EChipButtonType,
  IQuestionProps,
  BottomSheet,
  List,
  Tag,
  Scroll,
  Typography,
  Question,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';

export interface IHE01702 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  content: string | React.ReactNode;
  questionList: string[];
  answers: string[];
  answerLabel: string;
  values: string[];
  handleValueChange: (value: string[], type: EChipButtonType, index: number) => void;
  isSubmitted?: boolean;
  submitAnswer: () => void;
}

const HE01702 = ({
  headerInfo,
  questionInfo,
  content,
  questionList,
  answers,
  answerLabel,
  values,
  handleValueChange,
  isSubmitted,
  submitAnswer,
}: IHE01702) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const initialStates = Array(questionList.length).fill(null);
  const [activeButton, setActiveButton] = useState<EChipButtonType[]>(initialStates);

  useEffect(() => {
    values.map((value, index) => {
      processActiveButton(value === 'T' ? EChipButtonType.TRUE : value === 'F' ? EChipButtonType.FALSE : EChipButtonType.EMPTY, index);
    });
  }, [isSubmitted]);

  const processActiveButton = (type: EChipButtonType, index: number) => {
    const newActiveButton = [...activeButton];
    newActiveButton[index] = type;
    setActiveButton(newActiveButton);
  };

  const handleButtonClick = (type: EChipButtonType, index: number) => {
    handleValueChange?.(values, type, index - 1);
    processActiveButton(type, index - 1);
  };

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const handleSubmitClick = () => {
    if (!isSubmitted) {
      submitAnswer();
    } else {
      setIsShow(!isShow);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!values.every(isNotEmptyString)}
      submitBtnColor={values.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmitClick}
      vAlign='flex-start'
    >
      <BoxWrap useFull>
        <Box width='486px' vAlign='center'>
          <List data={questionList} gap={20}>
            {({ value, index = 1 }) => (
              <Question size='small'>
                <BoxWrap justifyContent='space-between' useFull>
                  <Box>{value}</Box>
                  <Box>
                    <BoxWrap>
                      <ChipButton
                        type='radio'
                        name={`chip-radio-${index}`}
                        status={EChipButtonType.TRUE}
                        isActive={activeButton[index - 1] === EChipButtonType.TRUE}
                        size={'48px'}
                        onClick={() => handleButtonClick(EChipButtonType.TRUE, index)}
                        readOnly={isSubmitted}
                        isError={isSubmitted && values[index - 1] !== answers[index - 1] ? true : false}
                      />
                      <ChipButton
                        type='radio'
                        name={`chip-radio-${index}`}
                        status={EChipButtonType.FALSE}
                        isActive={activeButton[index - 1] === EChipButtonType.FALSE}
                        size={'48px'}
                        onClick={() => handleButtonClick(EChipButtonType.FALSE, index)}
                        readOnly={isSubmitted}
                        isError={isSubmitted && values[index - 1] !== answers[index - 1] ? true : false}
                      />
                    </BoxWrap>
                  </Box>
                </BoxWrap>
              </Question>
            )}
          </List>
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull width='490px' padding='20px 16px'>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false}>
                  {content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문 보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
            </Box>
          )}
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={answerLabel} />
          </Box>
          <Box marginTop='12px'>{answers.join(', ')}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE01702;
