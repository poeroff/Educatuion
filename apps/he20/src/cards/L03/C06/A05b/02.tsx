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
import { L03C06A05b } from './store';
const P02 = () => {
  const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false);
  const [isParagraphOpen, setIsParagraphOpen] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A05b);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'From Shadows to Spotlights (3)',
  };

  const questionInfo: IQuestionProps = {
    text: "Q3. Why do you think people are inspired by Maud Lewis' story?​ ",
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        { subKey: 1, type: 'TEXT', value: '', isCorrect: false, isAnswer: true },
        { subKey: 2, type: 'TEXT', value: '', isCorrect: false, isAnswer: true },
      ],
      isCorrect: false,
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const inputStatus1 = isAnswer(userSubmissionList[0].inputData[0]?.value, cardData.p02.solution1) ? InputStatus.CORRECT : InputStatus.ERROR;
        const inputStatus2 = isAnswer(userSubmissionList[0].inputData[1]?.value, cardData.p02.solution2) ? InputStatus.CORRECT : InputStatus.ERROR;

        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || '',
            answer2: userSubmissionList[0].inputData[1]?.value || '',
            isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect || false,
            inputStatus1,
            inputStatus2,
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
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
      const isCorrect = isCorrect1 && isCorrect2;

      const inputStatus1 = isCorrect1 ? InputStatus.CORRECT : InputStatus.ERROR;
      const inputStatus2 = isCorrect2 ? InputStatus.CORRECT : InputStatus.ERROR;

      setCardData(prev => ({
        ...prev,
        p02: { ...prev.p02, isSubmitted: true, isCorrect, inputStatus1, inputStatus2 },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            { subKey: 1, type: 'TEXT', value: cardData.p02.answer1, isCorrect: isCorrect1, isAnswer: true },
            { subKey: 2, type: 'TEXT', value: cardData.p02.answer2, isCorrect: isCorrect2, isAnswer: true },
          ],
          isCorrect,
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  const handleInputChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const status = isNotEmptyString(value) ? InputStatus.ENABLE : InputStatus.DEFAULT;

    setCardData(prev => ({
      ...prev,
      p02: { ...prev.p02, answer1: value, inputStatus1: status },
    }));
    changeData('P02', 1, 1, value);
  };

  const handleInputChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const status = isNotEmptyString(value) ? InputStatus.ENABLE : InputStatus.DEFAULT;

    setCardData(prev => ({
      ...prev,
      p02: { ...prev.p02, answer2: value, inputStatus2: status },
    }));
    changeData('P02', 1, 2, value);
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

  const isSubmitDisabled = () => !isNotEmptyString(cardData.p02.answer1) || !isNotEmptyString(cardData.p02.answer2);

  const getButtonColor = () => {
    if (!cardData.p02.isSubmitted) {
      return isSubmitDisabled() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const content =
    'Next, we have Maud Lewis, a renowned artist known for her heart-warming paintings. Born in a small Canadian town in 1903, Lewis suffered from physical weaknesses such as distorted shoulders and fingers. This limited her mobility and caused her to drop out of school. To make a living, she began to paint and sell Christmas cards. When her parents passed away, Lewis went to live with her aunt in Digby, Nova Scotia, where she met her future husband, Everett Lewis. After marrying, the couple spent the rest of their lives there, and Lewis continued to paint. She often depicted the Digby landscapes in paintings such as Edge of Digby Harbor. Her artwork used a mixture of bright and vivid oil paints and simple forms, generating an original, innovative style. Although her physical limitations confined her to a small cottage, her talent and imagination were both limitless. In Red Sleigh, red maple leaves appear on a special winter landscape, and Pair of Oxen shows decorated cows standing in a flower field. With these features, Lewis’ paintings create a magical quality, like that of a fairy tale. As her paintings gradually gained popularity, her story inspired many people and was later made into books and movies. Maud Lewis expressed her love for the world through her paintings and became an iconic figure in Canadian folk art.';

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
        <Box vAlign={'center'} hAlign={'center'} useFull useRound border={'1px solid var(--color-grey-600)'}>
          <Box padding={'0px 20px 0px 20px'}>
            Her story shows that anyone can have
            <Box marginTop={'10px'} display={'inline-block'}>
              <Input
                tabIndex={101}
                marginLeft={5}
                maxLength={80}
                value={cardData.p02.answer1}
                inputSize={'x-small'}
                width='215px'
                placeholder={'내용을 넣어 주세요.'}
                onChange={handleInputChange1}
                readOnly={cardData.p02.isSubmitted}
                ariaLabel={'답란'}
                status={
                  !cardData.p02.isSubmitted
                    ? isNotEmptyString(cardData.p02.answer1)
                      ? InputStatus.ENABLE
                      : InputStatus.DEFAULT
                    : isAnswer(cardData.p02.answer1, cardData.p02.solution1)
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                }
              />
            </Box>{' '}
            and become
            <Box marginTop={'10px'} display={'inline-block'}>
              <Input
                tabIndex={102}
                marginLeft={5}
                maxLength={80}
                value={cardData.p02.answer2}
                inputSize={'x-small'}
                width='215px'
                placeholder={'내용을 넣어 주세요.'}
                onChange={handleInputChange2}
                readOnly={cardData.p02.isSubmitted}
                ariaLabel={'답란2'}
                status={
                  !cardData.p02.isSubmitted
                    ? isNotEmptyString(cardData.p02.answer2)
                      ? InputStatus.ENABLE
                      : InputStatus.DEFAULT
                    : isAnswer(cardData.p02.answer2, cardData.p02.solution2)
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                }
              />
            </Box>{' '}
            .
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
                <Typography lineHeight={'48px'} useGap={false}>
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
            <Typography usePre useGap={false}>
              {`${cardData.p02.solution1}\n${cardData.p02.solution2}`}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
