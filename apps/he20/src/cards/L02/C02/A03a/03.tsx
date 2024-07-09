import { useState, useEffect } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Input,
  EStyleButtonTypes,
  Typography,
  InputStatus,
  ETagLine,
  Tag,
  BottomSheet,
  IAudioPlayerProps,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L02C02A03a } from './store';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C02A03a);

  const [showAnswer, setShowAnser] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'What is the purpose of the talk? Fill in the blanks.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/HE2-L02-C02-A03-02.mp3',
    captionSrc: '/L02/C02/A03/HE2-L02-C02-A03-02.srt',
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

  const onGrade = () => {
    if (cardData.p03.isSubmitted) {
      setShowAnser(!showAnswer);
    } else {
      const isCorrect1 = cardData.p03.answer1.trim().toLowerCase() === cardData.p03.solution1;
      const isCorrect2 = cardData.p03.answer2.trim().toLowerCase() === cardData.p03.solution2;
      const isCorrect3 = cardData.p03.answer3.trim().toLowerCase() === cardData.p03.solution3;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
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
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p03.answer3,
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
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: value } }));
    }
    changeData('P03', 1, subKey, value);
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      bodyId='targetContainer'
      vAlign={'flex-start'}
      submitLabel={cardData.p03.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3)}
      onSubmit={onGrade}
      audioInfo={audioInfo}
      submitBtnColor={
        !(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <Box background={'white'} height={'auto'} useRound useFull>
        <Box>
          <Box>
            <Typography>to announce and promote the school</Typography>
          </Box>
          <Box>
            <Typography>(1)</Typography>
            <Input
              inputSize='x-small'
              value={cardData.p03.answer1}
              minWidth='212px'
              onChange={event => handleChange(1, event.target.value)}
              placeholder={'내용을 넣어 주세요.'}
              maxLength={100}
              ariaLabel='1번 답 첫번째 입력란'
              readOnly={cardData.p03.isSubmitted}
              status={
                !cardData.p03.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p03.answer1.trim().toLowerCase() !== cardData.p03.solution1
                  ? InputStatus.ERROR
                  : ''
              }
            />
            <Input
              inputSize='x-small'
              value={cardData.p03.answer2}
              marginLeft={8}
              minWidth='212px'
              onChange={event => handleChange(2, event.target.value)}
              placeholder={'내용을 넣어 주세요.'}
              maxLength={100}
              ariaLabel='1번 답 두번째 입력란'
              readOnly={cardData.p03.isSubmitted}
              status={
                !cardData.p03.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p03.answer2.trim().toLowerCase() !== cardData.p03.solution2
                  ? InputStatus.ERROR
                  : ''
              }
            />
            <Typography> for (2)</Typography>
            <Input
              inputSize='x-small'
              value={cardData.p03.answer3}
              minWidth='212px'
              onChange={event => handleChange(3, event.target.value)}
              placeholder={'내용을 넣어 주세요.'}
              maxLength={100}
              ariaLabel='2번 답 입력란'
              readOnly={cardData.p03.isSubmitted}
              status={
                !cardData.p03.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p03.answer3.trim().toLowerCase() !== cardData.p03.solution3
                  ? InputStatus.ERROR
                  : ''
              }
            />
            <Typography>month</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography usePre>(1) flea, market (2) next</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
