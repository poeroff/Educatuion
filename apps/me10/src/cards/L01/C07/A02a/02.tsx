import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Input, Button, EStyleButtonTypes, EStyleSizes, Typography, BottomSheet, ETagLine, Tag, InputStatus, Label } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C07A02a, getUserSubmissionStore, HeaderInfo, getQuestionInfo, getDialogText } from './store';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission } from '@maidt-cntn/api';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

const PAGE = 'P02';

const P02 = () => {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A02a);
  const { userId } = useRecoilValue(studentAtom);
  const defaultSubmission = getUserSubmissionStore(['', '']);

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleShowDialog = () => {
    setIsShowDialog(!isShowDialog);
  };
  ``;
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const updatedAnswers = cardData.p02.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: updatedAnswers } }));
    changeData(PAGE, 1, 1, value);
  };

  const handleSubmit = () => {
    const isCorrect1 = isAnswer(cardData.p02.answer[0], cardData.p02.solution[0]);
    const isCorrect2 = isAnswer(cardData.p02.answer[1], cardData.p02.solution[1]);
    const isCorrect = isCorrect1 && isCorrect2;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
    submitDataWithResult(PAGE, getUserSubmissionStore(cardData.p02.answer, isCorrect), isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].inputData[0]?.isCorrect : false,
          },
        }));
      }
      initData(PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    if (cardData.p02.answer[0] === '' || cardData.p02.answer[1] === '') {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p02]);

  const getParagraph = (): React.ReactNode => {
    return (
      <Box useFull hAlign='center'>
        <Box useFull hAlign='center' flexDirection='column'>
          <Box useFull vAlign='center' background='white' useRound margin={'20px'}>
            <Typography weight={'var(--font-weight-bold)'} color='var(--color-green-800)'>
              Mrs. Seo
            </Typography>
            <Typography usePre>
              I have my school survival kit. I feel okay with it.
              {'\n'}What do you want in your school survival kit?
            </Typography>
          </Box>
          <Box useFull vAlign='center' marginLeft={'40px'}>
            <Label value={3} background={'var(--color-blue-100)'} />
            <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-800)'>
              Mike
            </Typography>
            <Typography usePre>I want</Typography>
            <Input
              tabIndex={105}
              width='243px'
              maxLength={100}
              placeholder='내용을 넣어주세요.'
              value={cardData.p02.answer[0]}
              onChange={e => handleChangeValue(e, 0)}
              ariaLabel='3번 답안'
              readOnly={cardData.p02.isSubmitted}
              status={
                cardData.p02.answer[0] === ''
                  ? InputStatus.DEFAULT
                  : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer[0], cardData.p02.solution[0])
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
            !
          </Box>
          <Box useFull vAlign='center' marginLeft={'40px'}>
            {' '}
            <Label value={4} background={'var(--color-blue-100)'} />
            <Typography weight={'var(--font-weight-bold)'} color='var(--color-pink-600)'>
              Somin
            </Typography>
            <Typography usePre>I need</Typography>
            <Input
              tabIndex={106}
              width='243px'
              maxLength={100}
              placeholder='내용을 넣어주세요.'
              value={cardData.p02.answer[1]}
              onChange={e => handleChangeValue(e, 1)}
              ariaLabel='4번 답안'
              readOnly={cardData.p02.isSubmitted}
              status={
                cardData.p02.answer[1] === ''
                  ? InputStatus.DEFAULT
                  : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer[1], cardData.p02.solution[1])
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
            .
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={HeaderInfo}
      questionInfo={getQuestionInfo(cardData.p02.isSubmitted, cardData.p02.isCorrect)}
      submitLabel={cardData.p02.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isButtonDisabled}
      onSubmit={cardData.p02.isSubmitted ? handleShowAnswer : handleSubmit}
    >
      <Box hAlign='flex-end' width='930px'>
        <Button
          tabIndex={101}
          minWidth='96px'
          size={EStyleSizes.SMALL}
          color={EStyleButtonTypes.SECONDARY}
          label='지문 보기'
          useRound
          onClick={handleShowDialog}
        />
      </Box>
      {getParagraph()}
      {getDialogText(isShowDialog, handleShowDialog)}
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>3) {cardData.p02.solution[0]}</Box>
          <Box marginTop='12px'>4) {cardData.p02.solution[1]}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;