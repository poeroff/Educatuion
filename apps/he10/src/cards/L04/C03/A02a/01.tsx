import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Input,
  InputStatus,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C03A02a } from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C03A02a);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'What are the speakers most likely to do together after the dialogue?',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C03/A02/HE1-L04-C03-A02-01.mp3',
    captionSrc: '/L04/C03/A02/HE1-L04-C03-A02-01.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
      const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
      const isCorrect3 = isAnswer(cardData.p01.answer3, cardData.p01.solution3);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;

      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    }
    changeData('P01', 1, subKey, value);
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3)}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
    >
      <Box background={'white'} useRound>
        <Scroll>
          <Typography>
            They are going to 1){' '}
            <Input
              width='250px'
              ariaLabel='1번의 첫번째 답 입력란'
              status={
                cardData.p01.isSubmitted && cardData.p01.answer1.trim().toLowerCase() !== cardData.p01.solution1
                  ? InputStatus.ERROR
                  : isNotEmptyString(cardData.p01.answer1)
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              readOnly={cardData.p01.isSubmitted}
              maxLength={20}
              value={cardData.p01.answer1}
              onChange={e => {
                handleChange(1, e.target.value);
              }}
              placeholder='내용을 넣어 주세요.'
            />{' '}
            <Input
              width='250px'
              ariaLabel='1번의 두번째 답 입력란'
              status={
                cardData.p01.isSubmitted && cardData.p01.answer2.trim().toLowerCase() !== cardData.p01.solution2
                  ? InputStatus.ERROR
                  : isNotEmptyString(cardData.p01.answer2)
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              readOnly={cardData.p01.isSubmitted}
              maxLength={20}
              value={cardData.p01.answer2}
              onChange={e => {
                handleChange(2, e.target.value);
              }}
              placeholder='내용을 넣어 주세요.'
            />{' '}
          </Typography>
          <Typography>
            from old 2){' '}
            <Input
              width='250px'
              ariaLabel='2번 입력란'
              status={
                cardData.p01.isSubmitted && cardData.p01.answer3.trim().toLowerCase() !== cardData.p01.solution3
                  ? InputStatus.ERROR
                  : isNotEmptyString(cardData.p01.answer3)
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              readOnly={cardData.p01.isSubmitted}
              maxLength={20}
              value={cardData.p01.answer3}
              onChange={e => {
                handleChange(3, e.target.value);
              }}
              placeholder='내용을 넣어 주세요.'
            />{' '}
          </Typography>
        </Scroll>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>

          <Box marginTop='12px'>
            <Typography>
              1) {cardData.p01.solution1} {cardData.p01.solution2}
            </Typography>
          </Box>
          <Box>
            <Typography>2) {cardData.p01.solution3}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
