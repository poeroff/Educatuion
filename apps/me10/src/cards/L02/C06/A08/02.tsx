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
import { L02C06A08 } from './store';

const P02 = () => {
  const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false);
  const [isParagraphOpen, setIsParagraphOpen] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A08);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Then and Now (5)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Where does Minjun share his song? Fill in the blanks.',
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

  const content = (
    <Typography style={{ textIndent: 'var(--font-size-28)' }}>
      Minjun is using his tablet and writing a rap song. He shares the song on social media. He gets “likes” from people around the world. Minjun
      checks his DMs before bedtime. One message says, “U R AMAZING!”
    </Typography>
  );

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
            Minjun shares his song on
            <Box marginTop={'10px'} display={'inline-block'}>
              <Input
                tabIndex={101}
                maxLength={80}
                value={cardData.p02.answer}
                inputSize={'x-small'}
                width='220px'
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
