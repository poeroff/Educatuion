import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Dialog,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  SvgIcon,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A04_0002_08 } from './store';

import headerIcon from '../../../../assets/icon/header_write.svg';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A04_0002_08);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        이번 시간에 공부한 내용을 문제를 풀며 확인해 보세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [0, 0, 0, 0],
          isAnswer: true,
        },
      ],
    },
  ];

  const handleChange = (subKey: number, value: string) => {
    const newAnswer = cardData.p01.answer.map((item, idx) => (subKey === idx ? value : item));
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newAnswer } }));
    changeData('P01', 1, 1, newAnswer);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(show => !show);
    } else if (cardData.p01.answer.every(val => val)) {
      const isCorrect = cardData.p01.answer.every((val, index) => val.trim() === cardData.p01.solution[index]);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData.p01.answer,
              isAnswer: true,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useLinkLabel={cardData.p01.isSubmitted}
      linkLabel='맞춤 학습하기'
      onLink={() => {
        setShowDialog(!showDialog);
      }}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p01.answer.every(val => val)}
      submitBtnColor={cardData.p01.answer.every(val => val) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.GRAY}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='space-around' flexDirection='row' useRound useFull>
          <Box hAlign='center' flexDirection='column'>
            <Box margin='30px'>
              <Typography>20 × 2 =</Typography>
              <Input
                width='130px'
                value={cardData.p01.answer[0]}
                onChange={event => handleChange(0, event.target.value)}
                ariaLabel='20×2 값'
                type='number'
                status={
                  !cardData.p01.answer[0]
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer[0], cardData.p01.solution[0])
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                readOnly={cardData.p01.isSubmitted}
              />
            </Box>
            <Box margin='30px'>
              <Typography>20 × 4 =</Typography>
              <Input
                width='130px'
                value={cardData.p01.answer[1]}
                onChange={event => handleChange(1, event.target.value)}
                ariaLabel='10×8의 값'
                type='number'
                status={
                  !cardData.p01.answer[1]
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer[1], cardData.p01.solution[1])
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                readOnly={cardData.p01.isSubmitted}
              />
            </Box>
          </Box>
          <Box hAlign='center' flexDirection='column'>
            <Box margin='30px'>
              <Typography>30 × 3 =</Typography>
              <Input
                width='130px'
                value={cardData.p01.answer[2]}
                onChange={event => handleChange(2, event.target.value)}
                ariaLabel='30×3 값'
                type='number'
                status={
                  !cardData.p01.answer[2]
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer[2], cardData.p01.solution[2])
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                readOnly={cardData.p01.isSubmitted}
              />
            </Box>
            <Box margin='30px'>
              <Typography>20 × 4 =</Typography>
              <Input
                width='130px'
                value={cardData.p01.answer[3]}
                onChange={event => handleChange(3, event.target.value)}
                ariaLabel='20×4의 값'
                type='number'
                status={
                  !cardData.p01.answer[3]
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer[3], cardData.p01.solution[3])
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                readOnly={cardData.p01.isSubmitted}
              />
            </Box>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box marginTop='12px' gap={'20px'}>
              <Typography>40, 80, 90, 80</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Typography>20×2=40, 10×8=80, 30×3=90, 20×4=80</Typography>
          </Box>
        </Box>
      </BottomSheet>
      <Dialog
        isShow={showDialog}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        {cardData.p01.isCorrect && 'C-EM31-04-0002-10'}
        {!cardData.p01.isCorrect && 'C-EM31-04-0002-20'}
      </Dialog>
    </Container>
  );
};

export default P01;
