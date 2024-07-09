import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  TMainHeaderInfoTypes,
  Image,
  Typography,
  BottomSheet,
  ETagLine,
  Tag,
  Dialog,
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

const P02 = () => {
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
        <Label type='icon' size='small' value={1} />
        색연필과 끈의 길이를 써 보세요.
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
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
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
      return;
    }

    const isCorrect1 = isAnswerCorrect(cardData.p02.answer1, cardData.p02.solution1);
    const isCorrect2 = isAnswerCorrect(cardData.p02.answer2, cardData.p02.solution2);
    const isCorrect3 = isAnswerCorrect(cardData.p02.answer3, cardData.p02.solution3);
    const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.answer3,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            isSubmitted: isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputStatus = (userAnswer: string, correctAnswer: string): InputStatus => {
    return !isNotEmptyString(userAnswer)
      ? InputStatus.DEFAULT
      : cardData.p02.isSubmitted && !isAnswerCorrect(userAnswer, correctAnswer)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2)}
      submitBtnColor={
        cardData.p02.answer1 && cardData.p02.answer2 ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY
      }
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      useRound
      useLinkLabel={cardData.p02.isSubmitted && !cardData.p02.isCorrect}
      linkLabel='맞춤 학습하기'
      onLink={() => setIsShowDialog(true)}
    >
      <Box width='750px' type='dashed' useRound padding='24px'>
        <BoxWrap boxGap={40} alignItems='flex-end'>
          <Box>
            <Image src={'/A05/0001/05/EC31501.png'} width='496px' alt='한 칸에 1센치미터인 10센치미터 자에 색연필 길이는 9칸이다.' />
          </Box>
          <Box>
            <Input
              type='number'
              width='52px'
              value={cardData.p02.answer1}
              onChange={e => handleChange(1, e.target.value)}
              ariaLabel={'센치미터의 길이를 써보세요.'}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(cardData.p02.answer1, cardData.p02.solution1)}
            />
            <Typography>cm</Typography>
          </Box>
        </BoxWrap>
      </Box>
      <Box width='779px' type='dashed' useRound marginTop='24px' padding='24px'>
        <BoxWrap boxGap={40} alignItems='flex-end'>
          <Box>
            <Image
              src={'/A05/0001/05/EC31540-2.png'}
              width='425px'
              alt='한 칸에 10센치미터인 170센치미터 자에 끈의 길이는 16칸이다.(100센치미터는 1미터이다.) '
            />
          </Box>
          <Box>
            <Input
              type='number'
              width='52px'
              value={cardData.p02.answer2}
              onChange={e => handleChange(2, e.target.value)}
              ariaLabel={'미터의 길이를 써보세요.'}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(cardData.p02.answer2, cardData.p02.solution2)}
            />
            <Typography>m</Typography>
            <Input
              type='number'
              width='88px'
              value={cardData.p02.answer3}
              onChange={e => handleChange(3, e.target.value)}
              ariaLabel={'센치미터의 길이를 써보세요.'}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(cardData.p02.answer3, cardData.p02.solution3)}
            />
            <Typography>cm</Typography>
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>9, 1, 60</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>자의 눈금을 읽으면 9 cm입니다.</Typography>
            <br />
            <Typography>160 cm는 1 m 60 cm입니다.</Typography>
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
        C-EM31-05-0001-1001
      </Dialog>
    </Container>
  );
};

export default P02;
