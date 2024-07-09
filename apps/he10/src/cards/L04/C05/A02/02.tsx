import {
  Box,
  TMainHeaderInfoTypes,
  BoxWrap,
  Input,
  PinchZoom,
  EImageType,
  Image,
  Question,
  IQuestionProps,
  BottomSheet,
  Typography,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C05A02, getUserSubmissionStore } from './store';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission } from '@maidt-cntn/api';

const PAGE = 'P02';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C05A02);
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const defaultSubmission = getUserSubmissionStore('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Topic Preview',
  };

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData(PAGE, 1, 1, value);
  };

  const handleSubmit = () => {
    const isCorrect = isAnswer(cardData.p02.answer, cardData.p02.solution);
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
            isCorrect: isSubmitted ? userSubmissionList[0].inputData[0].isCorrect : false,
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
    if (!isNotEmptyString(cardData.p02.answer)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p02]);

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks with the correct words.',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      useExtend
      submitLabel={cardData.p02.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점 하기'}
      submitDisabled={isButtonDisabled}
      onSubmit={cardData.p02.isSubmitted ? handleShowAnswer : handleSubmit}
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap useFull height='330px' width='970px'>
        <Box useFull hAlign='center'>
          <PinchZoom pinchType={'image'}>
            <Image
              type={EImageType.IMG}
              src={'/L04/C05/A02/HE1-L04-C05-A02-01.jpg'}
              alt='재활용 무늬 배경에 나무, 공장, 쓰레기통 순서로 화살표 표시가 되어있고 Linear Economy라는 설명이 붙어 있다.'
              width='699px'
              height='330px'
            />
          </PinchZoom>
        </Box>
      </BoxWrap>

      <Box vAlign='center' marginTop='15px' justifyContent='center'>
        <Box vAlign='center'>
          <Question type='text' size='small'>
            (3)
          </Question>
          <ItemWrap>
            T{' '}
            <Input
              marginLeft={5}
              width='410px'
              placeholder='내용을 넣어 주세요.'
              value={cardData.p02.answer}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeValue(e)}
              maxLength={100}
              readOnly={cardData.p02.isSubmitted}
              ariaLabel='답란'
              status={
                !cardData.p02.isSubmitted && !isNotEmptyString(cardData.p02.answer)
                  ? InputStatus.DEFAULT
                  : cardData.p02.isSubmitted && !cardData.p02.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
          </ItemWrap>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Typography>
              <Tag type={ETagLine.GREEN} label='답안' />
            </Typography>
          </Box>
          <Box>
            <Typography useGap={false}>T{cardData.p02.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0px;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;
