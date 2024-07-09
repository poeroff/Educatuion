import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C06A05b } from './store';

const headerText = 'A Better Future for Coffee Waste (3)';
const questionText = 'Q3. What economic model is proposed as a solution to the coffee waste problem?';
const content = `So, what happens to all the waste from the coffee extraction process? Spent coffee grounds (SCGs) are classified as general waste and sent to landfills. There they break down, releasing methane, a greenhouse gas that is approximately 25 times more potent than CO2. Some SCGs are incinerated instead of being buried, but this releases a lot of CO2: 338 kg per ton. However, neither of these waste management options takes into account the potential value of coffee grounds. Although the grounds contain valuable organic compounds and minerals, they are simply destroyed. 
  
  Fortunately, thanks to increased awareness of the coffee waste problem, companies, organizations, and governments around the world are working hard to improve the environmental impact of the coffee industry through circular economy measures. A circular economy promotes the reuse of resources for as long as possible, reducing waste and environmental costs.`;

const answer = 2;
const options = [
  {
    text: 'sharing economy',
  },
  {
    text: 'circular economy',
  },
  {
    text: 'platform economy',
  },
];

const P02 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A05b);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userAnswer, isSubmitted, isCorrect } = cardData.p02;
  const [isTextShow, setIsTextShow] = useState<boolean>(false);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const isDisabled = useMemo(() => !userAnswer || userAnswer === 0, [userAnswer]);
  const submitLabel = useMemo(() => (isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'), [isSubmitted, isAnswerShow]);
  const mark: TMarkType = useMemo(() => (isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none'), [isCorrect, isSubmitted]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: headerText,
  };
  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: mark,
  };
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            userAnswer: userSubmissionList[0].inputData[0]?.value || userAnswer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setIsAnswerShow(!isAnswerShow);
    } else {
      const isCorrect = userAnswer === answer;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: userAnswer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const handleRadioClick = (number: number) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, userAnswer: number } }));
    changeData('P02', 1, 1, number);
  };

  const handleButtonOnClick = () => {
    setIsTextShow(!isTextShow);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={submitLabel}
      onSubmit={handleSubmit}
      submitDisabled={isDisabled}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap useFull>
        <Box useFull marginRight='24px'>
          <List
            gap={24}
            data={options}
            row={({ value, index = 0 }) => (
              <Radio
                type={'box'}
                align='vertical'
                name={'radio-question'}
                label={value?.text}
                value={index === userAnswer}
                readOnly={isSubmitted}
                onClick={() => handleRadioClick(index)}
                isError={isSubmitted && !isCorrect}
              >
                <Box padding={'6px 0'} whiteSpace='nowrap'>
                  <Label value={index} />
                  <Typography>{value?.text}</Typography>
                </Box>
              </Radio>
            )}
          />
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isTextShow ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='56px' onClick={handleButtonOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} usePre>
                  {content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
            </Box>
          )}
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              {answer}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
