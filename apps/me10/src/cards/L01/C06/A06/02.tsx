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
  Input,
  InputStatus,
  IQuestionProps,
  Scroll,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C06A06 } from './store';
const P02 = () => {
  const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false);
  const [isParagraphOpen, setIsParagraphOpen] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A06);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What’s in Your School Survival Kit? (3)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks.',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

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

      const inputStatus = isCorrect ? InputStatus.CORRECT : InputStatus.ERROR;

      setCardData(prev => ({
        ...prev,
        p02: { ...prev.p02, isSubmitted: true, isCorrect, inputStatus },
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const status = isNotEmptyString(value) ? InputStatus.ENABLE : InputStatus.DEFAULT;

    setCardData(prev => ({
      ...prev,
      p02: { ...prev.p02, answer: value, inputStatus: status },
    }));
    changeData('P02', 1, 1, value);
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
  const content = `Mrs.Seo : Now, what do you want in your school survival kit?
  Somin : A mirror! I look in the mirror and say, “Just be you!”
  Jiwon : For me, a stress ball. I hold the ball tightly. Then my stress goes away.
  Mike : An eraser! It erases my mistakes. I start all over again!
  Emily : I need a Band-Aid! My feelings get hurt sometimes. But with the Band-Aid, I'm okay.
  Mrs.Seo : Great! Now make your own survival kit. Let's have a great year!`;
  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={getSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={getButtonColor()}
      submitDisabled={isSubmitDisabled()}
    >
      <BoxWrap useFull>
        <Box vAlign={'center'} hAlign={'center'} useFull useRound>
          <Box padding={'0px 20px 0px 20px'}>
            Somin looks in the mirror and says, “just
            <Box marginTop={'10px'} display={'inline-block'}>
              <Input
                tabIndex={101}
                marginLeft={5}
                maxLength={80}
                value={cardData.p02.answer}
                inputSize={'x-small'}
                width='215px'
                placeholder={'내용을 넣어 주세요.'}
                onChange={handleInputChange}
                readOnly={cardData.p02.isSubmitted}
                ariaLabel={'답란'}
                status={
                  !cardData.p02.isSubmitted
                    ? isNotEmptyString(cardData.p02.answer)
                      ? InputStatus.ENABLE
                      : InputStatus.DEFAULT
                    : isAnswer(cardData.p02.answer, cardData.p02.solution)
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                }
              />
            </Box>{' '}
            !"
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
                <Typography lineHeight={'48px'} usePre>
                  {content}
                </Typography>
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