import { ChangeEvent, useEffect, useState } from 'react';
import {
  Image,
  Box,
  Label,
  Typography,
  Input,
  IQuestionProps,
  TMainHeaderInfoTypes,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  InputStatus,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { A04000104_store } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04000104_store);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={2} type='icon' size='small' />
        그림을 보고 곱셈식으로 나타내 보세요.
      </>
    ),
    mark: cardData.P03.isSubmitted ? (cardData.P03.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: false,
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: false,
          isCorrect: false,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: false,
          isCorrect: false,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.P03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.P03.answer1 === cardData.P03.solution1;
      const isCorrect2 = cardData.P03.answer2 === cardData.P03.solution2;
      const isCorrect3 = cardData.P03.answer3 === cardData.P03.solution3;
      const isCorrect4 = cardData.P03.answer4 === cardData.P03.solution4;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.P03.answer1,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.P03.answer2,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.P03.answer3,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.P03.answer4,
              isCorrect: isCorrect4,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P03: {
            ...prev.P03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.P03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.P03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.P03.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.P03.answer4,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, answer4: value } }));
    }
    changeData('P03', 1, subKey, value);
  };

  const isAllFilled = () => {
    if (cardData.P03.answer1 && cardData.P03.answer2 && cardData.P03.answer3 && cardData.P03.answer4) {
      return true;
    } else return false;
  };

  const handleInputStatus = (userAnswer: string, correctAnswer: string): InputStatus => {
    return !isNotEmptyString(userAnswer)
      ? InputStatus.DEFAULT
      : cardData.P03.isSubmitted && !isAnswer(userAnswer, correctAnswer)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      useRound
      vAlign='start'
      onSubmit={onGrade}
      submitLabel={cardData.P03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isAllFilled()}
      submitBtnColor={!isAllFilled() ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
    >
      <Scroll tabIndex={0}>
        <Box display='flex' alignItems='center' flexDirection='column'>
          <Box padding='20px 44px' type='line' useRound display='flex'>
            <Box marginRight='15px'>
              <Image src={'/A04/0001/04/MC31414.png'} alt='사탕이 3개씩 모아져 있는 것이 3묶음 있습니다.' width='400px' height='115px' />
            </Box>
            <Box>
              <Image src={'/A04/0001/04/MC31413.png'} alt='6개씩 묶인 바나나가 2개 있습니다.' width='400px' height='115px' />
            </Box>
          </Box>

          <Box display='flex'>
            <Box marginTop='24px' marginRight={'175px'}>
              <Input value={'3'} width='50px' readOnly={true} />
              <Typography>×</Typography>
              <Input
                type='number'
                value={cardData.P03.answer1}
                onChange={e => handleChange(1, e.target.value)}
                width='50px'
                readOnly={cardData.P03.isSubmitted}
                status={handleInputStatus(cardData.P03.answer1, cardData.P03.solution1)}
              />
              <Typography>=</Typography>
              <Input
                type='number'
                value={cardData.P03.answer2}
                onChange={e => handleChange(2, e.target.value)}
                width='75px'
                readOnly={cardData.P03.isSubmitted}
                status={handleInputStatus(cardData.P03.answer2, cardData.P03.solution2)}
              />
            </Box>

            <Box marginTop='24px'>
              <Input value={'6'} width='50px' readOnly={true} />
              <Typography>×</Typography>
              <Input
                type='number'
                value={cardData.P03.answer3}
                onChange={e => handleChange(3, e.target.value)}
                width='50px'
                readOnly={cardData.P03.isSubmitted}
                status={handleInputStatus(cardData.P03.answer3, cardData.P03.solution3)}
              />
              <Typography>=</Typography>
              <Input
                type='number'
                value={cardData.P03.answer4}
                onChange={e => handleChange(4, e.target.value)}
                width='75px'
                readOnly={cardData.P03.isSubmitted}
                status={handleInputStatus(cardData.P03.answer4, cardData.P03.solution4)}
              />
            </Box>
          </Box>
        </Box>
      </Scroll>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>3, 9 / 2, 12</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              <p>사탕이 3개씩 3묶음이므로 3×3=9입니다. </p>
              <p>바나나가 6개씩 2묶음이므로 6×2=12입니다.</p>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
