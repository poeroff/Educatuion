import {
  BottomSheet,
  Box,
  Dialog,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { A05_0001_05 } from './store';
import empty_square from '@/assets/icon/math_empty_square.svg';
const P04 = () => {
  const [isShow, setShow] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A05_0001_05);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathPreview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        <Box>
          <SvgIcon style={{ verticalAlign: 'text-top' }} type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
          &nbsp;안에 알맞은 수를 써넣으세요.
        </Box>
      </>
    ),
    mark: getMarking(cardData.p04.isSubmitted, cardData.p04.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const isAnswerCorrect = (answer: string, solution: string) => {
    const incorrectPattern = /\d\s+\d/;
    return answer.replace(/\s+/g, '') === solution && !incorrectPattern.test(answer);
  };

  const handleSubmit = () => {
    if (cardData.p04.isSubmitted) {
      setShow(!isShow);
      return;
    }

    const isCorrect1 = isAnswerCorrect(cardData.p04.answer1, cardData.p04.solution1);
    const isCorrect2 = isAnswerCorrect(cardData.p04.answer2, cardData.p04.solution2);
    const isCorrect3 = isAnswerCorrect(cardData.p04.answer3, cardData.p04.solution3);
    const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p04.answer2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p04.answer3,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P04', userSubmission, isCorrect);
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer3: value } }));
    }
    changeData('P04', 1, subKey, value);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p04.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p04.answer3,
            isSubmitted: isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputStatus = (userAnswer: string, correctAnswer: string): InputStatus => {
    return !isNotEmptyString(userAnswer)
      ? InputStatus.DEFAULT
      : cardData.p04.isSubmitted && !isAnswerCorrect(userAnswer, correctAnswer)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  useEffect(() => {
    return () => {
      saveData('P04');
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitDisabled={!(cardData.p04.answer1 && cardData.p04.answer2)}
      submitBtnColor={
        cardData.p04.answer1 && cardData.p04.answer2 ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY
      }
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      useRound
      useLinkLabel={cardData.p04.isSubmitted && !cardData.p04.isCorrect}
      linkLabel='맞춤 학습하기'
      onLink={() => setIsShowDialog(true)}
    >
      <Box display='flex' flexDirection='column' marginBottom='200px'>
        <Box display='flex'>
          <Box type='dashed' padding='20px' width={'50%'} textAlign='center' hAlign='center'>
            <Typography>1시간 =</Typography>
            <Input
              type='number'
              value={cardData.p04.answer1}
              onChange={e => handleChange(1, e.target.value)}
              width='70px'
              readOnly={cardData.p04.isSubmitted}
              status={handleInputStatus(cardData.p04.answer1, cardData.p04.solution1)}
              ariaLabel='1시간을 분으로 표현한 값'
            />
            <Typography>분</Typography>
          </Box>
          <Typography></Typography>
          <Box type='dashed' padding='20px' width={'50%'} textAlign='center'>
            <Typography>150분 =</Typography>
            <Input
              type='number'
              value={cardData.p04.answer2}
              onChange={e => handleChange(2, e.target.value)}
              width='65px'
              readOnly={cardData.p04.isSubmitted}
              status={handleInputStatus(cardData.p04.answer2, cardData.p04.solution2)}
              ariaLabel='150분을 시,분으로 표현한 값'
            />
            <Typography>시간</Typography>
            <Input
              type='number'
              value={cardData.p04.answer3}
              onChange={e => handleChange(3, e.target.value)}
              width='70px'
              readOnly={cardData.p04.isSubmitted}
              status={handleInputStatus(cardData.p04.answer3, cardData.p04.solution3)}
              ariaLabel='150분을 시,분으로 표현한 값'
            />
            <Typography>분</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>60, 2, 30</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>60분=1시간입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
      <Dialog
        isShow={isShowDialog}
        useHeader
        width={1000}
        height={572}
        onClose={() => {
          setIsShowDialog(false);
        }}
      >
        C-EM31-05-0001-1101
      </Dialog>
    </Container>
  );
};

export default P04;
