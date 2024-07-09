import { ChangeEvent, useState, useEffect } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Scroll,
  Input,
  EStyleButtonTypes,
  IAudioPlayerProps,
  InputStatus,
  IQuestionProps,
  BottomSheet,
  Typography,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C03A02a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';

const P01 = () => {
  const PAGE_KEY = 'p01';
  const PAGE_NUM = 'P01';

  const SOLUTIONS = ['wildlife', 'crossings'];

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C03A02a);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'What are the speakers mainly talking about? Fill in the blanks.',
    mark: getMarking(cardData[PAGE_KEY].isSubmitted, cardData[PAGE_KEY].isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C03/A02/HE2-L01-C03-A02-01.mp3',
    captionSrc: '/L01/C03/A02/HE2-L01-C03-A02-01.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [PAGE_KEY]: {
            ...prev[PAGE_KEY],
            answers: userSubmissionList[0]?.inputData[0]?.value || cardData[PAGE_KEY].answers,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUM);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const tempAnswers = [...cardData[PAGE_KEY].answers];
    tempAnswers[Number(name.split('_')[1])] = value;

    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], answers: [...tempAnswers] } }));
    changeData(PAGE_NUM, 1, 1, tempAnswers);
  };

  const handleSubmit = () => {
    if (cardData[PAGE_KEY].isSubmitted) {
      setShow(prev => !prev);
      return;
    }
    const isCorrect1 = cardData[PAGE_KEY].answers[0] === SOLUTIONS[0];
    const isCorrect2 = cardData[PAGE_KEY].answers[1] === SOLUTIONS[1];
    const isAllCorrect = isCorrect1 && isCorrect2;

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[PAGE_KEY].answers,
            isAnswer: true,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], isSubmitted: true, isCorrect: isAllCorrect } }));
    submitDataWithResult(PAGE_NUM, userSubmission, isAllCorrect);
  };

  const getStatus = (answer: string, solution: string) => {
    return !isNotEmptyString(answer)
      ? InputStatus.DEFAULT
      : cardData.p01.isSubmitted && !isAnswer(answer, solution)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      vAlign={'flex-start'}
      submitBtnColor={
        cardData[PAGE_KEY].isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData[PAGE_KEY].answers.some(answer => answer === '')
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={handleSubmit}
      submitDisabled={cardData[PAGE_KEY].answers?.some(answer => answer === '')}
      submitLabel={cardData[PAGE_KEY].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
    >
      <Box background={'white'} useRound>
        <Scroll>
          the importance of&nbsp;&nbsp;
          <Input
            maxLength={10}
            name='input_0'
            value={cardData[PAGE_KEY].answers[0]}
            minWidth='250px'
            ariaLabel={'1번 첫번째 단어 답란'}
            placeholder='내용을 넣어 주세요.'
            onChange={handleInputChange}
            readOnly={cardData[PAGE_KEY].isSubmitted}
            status={getStatus(cardData[PAGE_KEY].answers[0], SOLUTIONS[0])}
          />
          &nbsp;&nbsp;&nbsp;
          <Input
            maxLength={10}
            name='input_1'
            value={cardData[PAGE_KEY].answers[1]}
            minWidth='250px'
            ariaLabel={'2번 첫번째 단어 답란'}
            placeholder='내용을 넣어 주세요.'
            onChange={handleInputChange}
            readOnly={cardData[PAGE_KEY].isSubmitted}
            status={getStatus(cardData[PAGE_KEY].answers[1], SOLUTIONS[1])}
          />
        </Scroll>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={true}>{SOLUTIONS.map((item, idx) => item).join(' ')}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
