import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  BottomSheet,
  Box,
  Dropdown,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C03A02b } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C03A02b);

  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'What are the speakers mainly talking about? Choose the correct word. ',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C03/A02/HE1-L02-C03-A02-01.mp3',
    captionSrc: '/L02/C03/A02/HE1-L02-C03-A02-01.srt',
  };

  const handleClickDropdown = (index: number, value?: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx = 0) => idx === index));
    const updatedAnswers = cardData.p01.answer.map((ans, idx = 0) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer: updatedAnswers,
      },
    }));
    changeData('P01', 1, 1, updatedAnswers);
  };

  const script: React.ReactNode = (
    <>
      <Typography useGap={false}>a way of </Typography>
      <Dropdown
        dropdownList={cardData.p01.dropArr[0]}
        width='240px'
        isOpen={openDropdown[0]}
        selectedValue={cardData.p01.answer[0]}
        onClick={value => handleClickDropdown(0, value)}
        aria-label='1번째 답 선택칸'
        readOnly={cardData.p01.isSubmitted}
        isError={cardData.p01.isSubmitted && !cardData.p01.isCorrect}
      />{' '}
      <Typography useGap={false}>in Tibet</Typography>
    </>
  );

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [undefined],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

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

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(!isShowAnswer);
      return;
    } else {
      const isCorrect = cardData.p01.answer.every((item, idx = 0) => item === cardData.p01.solution[idx]);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p01.answer,
              isAnswer: true,
              isCorrect: cardData.p01.isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        !cardData.p01.answer?.some(value => value === '' || value === undefined)
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={cardData.p01.answer?.some(value => value === '' || value === undefined)}
      onSubmit={handleSubmit}
    >
      <Box background='white' height='100px' vAlign='center' useRound useFull>
        {script}
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='20px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p01.solution[0]}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
