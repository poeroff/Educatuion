import { useEffect, useState } from 'react';
import {
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
  Dialog,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { A04000105_store } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

//맞춤 학습 콘텐츠 카드 미개발, 추후 개발 후 import 경로 수정
//import CEM310100111001 from '../../C04/0001/10/01';

const P02 = () => {
  const [isShow, setShow] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04000105_store);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={1} type='icon' size='small' />
        <Input width='50px' readOnly={true} />
        &nbsp;안에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: cardData.P02.isSubmitted ? (cardData.P02.isCorrect ? 'correct' : 'incorrect') : 'none',
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
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.P02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.P02.answer1 === cardData.P02.solution1;
      const isCorrect2 = cardData.P02.answer2 === cardData.P02.solution2;
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.P02.answer1,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.P02.answer2,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P02: {
            ...prev.P02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.P02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.P02.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer2: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  const isAllFilled = () => {
    if (cardData.P02.answer1 && cardData.P02.answer2) {
      return true;
    } else return false;
  };

  const handleInputStatus = (userAnswer: string, correctAnswer: string): InputStatus => {
    return !isNotEmptyString(userAnswer)
      ? InputStatus.DEFAULT
      : cardData.P02.isSubmitted && !isAnswer(userAnswer, correctAnswer)
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
      useRound
      vAlign='start'
      onSubmit={onGrade}
      submitLabel={cardData.P02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isAllFilled()}
      submitBtnColor={!isAllFilled() ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      {...(!cardData.P02.isCorrect &&
        cardData.P02.isSubmitted && {
          linkLabel: '맞춤 학습하기',
          useLinkLabel: true,
          onLink: () => {
            setIsModalShow(!isModalShow);
          },
        })}
    >
      <Scroll tabIndex={0}>
        <Box display='flex' alignItems='center' flexDirection='column'>
          <Box display='flex'>
            <Box marginTop='24px' width={'50%'} textAlign='center' hAlign='center'>
              <Typography>3</Typography>
              <Typography>+</Typography>
              <Typography>3</Typography>
              <Typography>+</Typography>
              <Typography>3</Typography>
              <Typography>=</Typography>
              <Typography>3</Typography>
              <Typography>×</Typography>
              <Input
                type='number'
                value={cardData.P02.answer1}
                onChange={e => handleChange(1, e.target.value)}
                width='50px'
                readOnly={cardData.P02.isSubmitted}
                status={handleInputStatus(cardData.P02.answer1, cardData.P02.solution1)}
              />
            </Box>

            <Box marginTop='24px' width={'50%'} textAlign='center'>
              <Typography>5</Typography>
              <Typography>+</Typography>
              <Typography>5</Typography>
              <Typography>+</Typography>
              <Typography>5</Typography>
              <Typography>+</Typography>
              <Typography>5</Typography>
              <Typography>+</Typography>
              <Typography>5</Typography>
              <Typography>+</Typography>
              <Typography>5</Typography>
              <Typography>=</Typography>
              <Typography>5</Typography>
              <Typography>×</Typography>
              <Input
                type='number'
                value={cardData.P02.answer2}
                onChange={e => handleChange(2, e.target.value)}
                width='50px'
                readOnly={cardData.P02.isSubmitted}
                status={handleInputStatus(cardData.P02.answer2, cardData.P02.solution2)}
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
            <Typography>3, 6</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              <p>3+3+3은 3×3과 같습니다.</p>
              <p>5+5+5+5+5+5는 5×6과 같습니다. </p>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        isShow={isModalShow}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setIsModalShow(false);
        }}
        onConfirm={() => {
          setIsModalShow(false);
        }}
      >
        {/* 맞춤 학습 콘텐츠 카드 미개발, 추후 개발 후 주석 해제  */}
        {/* C-EM31-04-0001-1001 -> 맞춤 카드*/}
        <>{/* <CEM310400011001 /> */}</>
      </Dialog>
    </Container>
  );
};

export default P02;
