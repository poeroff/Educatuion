import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Image, Input, Button, EStyleButtonTypes, EStyleSizes, Typography, BottomSheet, ETagLine, Tag, InputStatus } from '@maidt-cntn/ui';
import { Balloon, Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C07A02, getUserSubmissionStore, L01L07A02HeaderInfo, getL01L07A02QuestionInfo, getDialogText, getTeacherSpeech } from './store';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission } from '@maidt-cntn/api';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

const PAGE = 'P04';

const P04 = () => {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A02);
  const { userId } = useRecoilValue(studentAtom);
  const defaultSubmission = getUserSubmissionStore('');

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleShowDialog = () => {
    setIsShowDialog(!isShowDialog);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: value } }));
    changeData(PAGE, 1, 1, value);
  };

  const handleSubmit = () => {
    const isCorrect = isAnswer(cardData.p04.answer, cardData.p04.solution);
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));
    submitDataWithResult(PAGE, getUserSubmissionStore(cardData.p04.answer, isCorrect), isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
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
    if (cardData.p04.answer === '') {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p04]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={L01L07A02HeaderInfo}
      questionInfo={getL01L07A02QuestionInfo(cardData.p04.isSubmitted, cardData.p04.isCorrect)}
      submitLabel={cardData.p04.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isButtonDisabled}
      onSubmit={cardData.p04.isSubmitted ? handleShowAnswer : handleSubmit}
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
      {getTeacherSpeech('/L01/C07/A02/ME1-L01-C07-A02-P01.mp3')}
      <Box vAlign='center' hAlign='flex-end' marginTop={5} width='930px'>
        <Box marginRight={14}>
          <Balloon place='right' backgroundColor='var(--color-yellow-100)' isShadow>
            <Typography>A </Typography>
            <Input
              tabIndex={105}
              width='243px'
              maxLength={100}
              placeholder='내용을 넣어주세요.'
              value={cardData.p04.answer}
              onChange={handleChangeValue}
              ariaLabel='정답 입력란'
              readOnly={cardData.p04.isSubmitted}
              status={
                cardData.p04.answer === ''
                  ? InputStatus.DEFAULT
                  : cardData.p04.isSubmitted && !cardData.p04.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
            <Typography>!</Typography>
          </Balloon>
        </Box>
        <Image src={'/L01/C07/A02/ME1-L01-C07-A02-P04-02.jpg'} width='auto' height='180px' alt="여학생의 얼굴과 손거울 'Somin" />
      </Box>

      {getDialogText(isShowDialog, handleShowDialog)}

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p04.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;