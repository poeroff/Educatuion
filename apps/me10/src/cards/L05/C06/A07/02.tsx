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
  EStyleSizes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L05C06A07 } from './store';

const P02 = () => {
  const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false);
  const [isParagraphOpen, setIsParagraphOpen] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L05C06A07);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Small Actions, Big Change (4)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the correct word.',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const subQuestion = (
    <>
      <Typography>I went to a zero-waste shop and filled my bottle with _______________</Typography>
    </>
  );

  const content = (
    <>
      <Typography color='var(--color-green-600)' weight='var(--font-weight-bold)'>
        DAY 7 Visit a zero-waste shop.
      </Typography>
      <Typography style={{ textIndent: 'var(--font-size-28)' }}>
        This morning, I ran out of shampoo. I took the empty bottle and went to a zero-waste shop. I filled my bottle with shampoo there. It smelled
        so good! This way, I cut down on plastic.
      </Typography>
    </>
  );

  const data = [
    {
      text: 'juice',
    },
    {
      text: 'shampoo',
    },
    {
      text: 'water',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [{ subKey: 1, type: 'TEXT', value: '', isCorrect: false, isAnswer: true }],
      isCorrect: false,
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
            answer: userSubmissionList[0].inputData[0]?.value || '',
            isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect || false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsAnswerOpen(!isAnswerOpen);
    } else {
      const isCorrect = isAnswer(cardData.p02.answer, cardData.p02.solution);

      setCardData(prev => ({
        ...prev,
        p02: { ...prev.p02, isSubmitted: true, isCorrect },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [{ subKey: 1, type: 'TEXT', value: cardData.p02.answer, isCorrect: isCorrect, isAnswer: true }],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const handleChange = (alpha: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: alpha } }));
    changeData('P02', 1, 1, alpha);
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

  const handleParagraphOpen = () => {
    setIsParagraphOpen(!isParagraphOpen);
  };

  const getSubmitLabel = () => (cardData.p02.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '채점하기');

  const isSubmitDisabled = () => !isNotEmptyString(cardData.p02.answer);

  const getButtonColor = () => {
    if (!cardData.p02.isSubmitted) {
      return isSubmitDisabled() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={getSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={getButtonColor()}
      submitDisabled={isSubmitDisabled()}
      vAlign='flex-start'
    >
      <BoxWrap useFull>
        <Box flexDirection='column' hAlign='center' useFull useRound>
          <Box marginTop='32px'>
            <Typography>{subQuestion}</Typography>
          </Box>
          <Box marginTop='16px' useFull>
            <List
              gap={10}
              data={data}
              row={({ value, index = 1 }) => {
                const alpha = String.fromCharCode(97 + index - 1);
                return (
                  <Radio
                    ariaLabel={alpha + '번 보기'}
                    type={'square'}
                    align='vertical'
                    name={'radio-question-A'}
                    label={value?.text}
                    value={cardData.p02.answer === alpha}
                    isError={cardData.p02.isSubmitted && cardData.p02.answer !== cardData.p02.solution}
                    onClick={() => handleChange(alpha)}
                    readOnly={cardData.p02.isSubmitted}
                    defaultValue={cardData.p02.answer === cardData.p02.solution}
                  >
                    <BoxWrap alignItems='baseline'>
                      <Label value={alpha} />
                      <Typography>{value?.text}</Typography>
                    </BoxWrap>
                  </Radio>
                );
              }}
            />
          </Box>
        </Box>

        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isParagraphOpen ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button
                  tabIndex={103}
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={handleParagraphOpen}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={104}>
                <Typography lineHeight={'48px'}>{content}</Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button tabIndex={105} color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleParagraphOpen} />
            </Box>
          )}
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{cardData.p02.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
