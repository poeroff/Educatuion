import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  ETagLine,
  Input,
  InputStatus,
  IQuestionProps,
  Question,
  SvgIcon,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import rightArrowIconSrc from '@maidt-cntn/assets/icons/arrow-icon.svg';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L03C06A07 } from '@/cards/L03/C06/A07/store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A07);

  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [isParagraphOpen, setIsParagraphOpen] = useState(false);

  const inputMinWidth = 250;
  const currentPage = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Tuning Out: The Science of Noise-Cancellation (5)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q5. Fill in the blanks to complete the sentences.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
          isAnswer: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChangeInput = (index: number, { target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: prev.p02.answer.map((item, idx) => (idx === index ? value : item)) } }));
    changeData(currentPage, 1, 1, value);
  };

  const handleIsParagraphOpen = () => {
    setIsParagraphOpen(!isParagraphOpen);
  };

  const handleInputStatus = (userAnswer: string, correctAnswer: string): InputStatus => {
    return !isNotEmptyString(userAnswer)
      ? InputStatus.DEFAULT
      : cardData.p02.isSubmitted && !isAnswer(userAnswer, correctAnswer)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const isCorrectFinally = (): boolean => {
    return cardData.p02.answer?.every((val, index) => isAnswer(val, cardData.p02.solution[index]));
  };

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      const isCorrect = isCorrectFinally();
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p02.answer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(currentPage, userSubmission, isCorrect);
    } else {
      setIsAnswerOpen(!isAnswerOpen);
    }
  };

  const getButtonColor = () => {
    if (!cardData?.p02.isSubmitted) {
      return !cardData.p02.answer?.every(val => val) ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const getSubmitLabel = () => (cardData.p02.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '채점하기');
  const isSubmitDisabled = () => !cardData.p02.answer?.every(val => val) && !cardData.p02.isSubmitted;

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
      submitLabel={getSubmitLabel()}
      submitDisabled={isSubmitDisabled()}
    >
      <Box hAlign='flex-end' vAlign='flex-start' marginBottom='8px'>
        <Button
          label={'지문 보기'}
          color={EStyleButtonTypes.SECONDARY}
          size={EStyleSizes['X-SMALL']}
          minWidth='132px'
          useRound
          onClick={handleIsParagraphOpen}
        />
      </Box>

      <Box background={'white'} useRound>
        <Question size={'small'}>
          What does the phrase "these problems" in the second <br /> sentence refer to?
        </Question>
        <Box hAlign={'center'} vAlign={'flex-start'}>
          <SvgIcon src={rightArrowIconSrc} size='36px' style={{ marginTop: '8px' }} />
          <Box display='inline-block' useFull vAlign='center' hAlign='center' whiteSpace={'nowrap'}>
            <Typography>It refers to various</Typography>
            <Input
              placeholder={'내용을 넣어 주세요.'}
              maxLength={20}
              name='value1'
              value={cardData.p02.answer[0]}
              width={`${inputMinWidth}px`}
              onChange={event => handleChangeInput(0, event)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(cardData.p02.answer[0], cardData.p02.solution[0])}
              ariaLabel='1번 답란'
            />
            <Input
              placeholder={'내용을 넣어 주세요.'}
              marginLeft={20}
              maxLength={20}
              name='value2'
              value={cardData.p02.answer[1]}
              width={`${inputMinWidth}px`}
              onChange={event => handleChangeInput(1, event)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(cardData.p02.answer[1], cardData.p02.solution[1])}
              ariaLabel='2번 답란'
            />
            <Box />
            <Box marginTop={'20px'} display='inline-block' useFull vAlign='center' hAlign='center' whiteSpace={'nowrap'}>
              <Typography>caused by</Typography>
              <Input
                placeholder={'내용을 넣어 주세요.'}
                maxLength={20}
                name='value3'
                value={cardData.p02.answer[2]}
                width={`${inputMinWidth}px`}
                onChange={event => handleChangeInput(2, event)}
                readOnly={cardData.p02.isSubmitted}
                status={handleInputStatus(cardData.p02.answer[2], cardData.p02.solution[2])}
                ariaLabel='3번 답란'
              />
              <Input
                placeholder={'내용을 넣어 주세요.'}
                marginLeft={20}
                maxLength={20}
                name='value4'
                value={cardData.p02.answer[3]}
                width={`${inputMinWidth}px`}
                onChange={event => handleChangeInput(3, event)}
                readOnly={cardData.p02.isSubmitted}
                status={handleInputStatus(cardData.p02.answer[3], cardData.p02.solution[3])}
                ariaLabel='4번 답란'
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog
        width={921}
        height={400}
        topHeight={50}
        useHeader
        header={() => (
          <Box tabIndex={104} background={'gray'} useRound height='50px' marginBottom='20px'>
            <Typography weight='bold'>Tuning Out: The Science of Noise-Cancellation (5)</Typography>
          </Box>
        )}
        isShow={isParagraphOpen}
        closeLabel='닫기'
        onClose={handleIsParagraphOpen}
        useFooter={true}
      >
        <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
          As technology advances, many people expect it will solve various social issues caused by noise pollution. A common source of these problems
          is noisy neighbors, as the noise they make can lead to conflict among residents. Noise-cancellation technology can help address these
          problems by reducing unwanted disturbances, allowing people to lead more peaceful and healthier lives.
        </Typography>
      </Dialog>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre useGap={false}>{`${cardData.p02.solution.reduce(
              (prev, cur, idx) => prev.concat(`(${idx + 1}) ${cur}\n`),
              '',
            )}`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
