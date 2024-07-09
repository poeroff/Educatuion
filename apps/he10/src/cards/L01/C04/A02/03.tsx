import { useState, useEffect } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  BoxWrap,
  List,
  Label,
  Typography,
  Radio,
  IAudioPlayerProps,
  Tag,
  ETagLine,
  BottomSheet,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01C04A02 } from './store';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C04A02);
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C04/A02/HE1-L01-C04-A02.mp3',
  };

  const questionInfo = {
    text: '2. Choose the one that is NOT mentioned in the speech.',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: 'make new friends',
    },
    {
      text: 'have good relationships with teachers',
    },
    {
      text: 'find a role model',
    },
    {
      text: 'explore different clubs and classes',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p03.answer === cardData.p03.solution;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p03.answer,
              isAnswer: true,
              isCorrect,
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: index } }));
    changeData('P03', 1, 1, index);
  };

  const selectBtnColor = () => {
    return cardData.p03.answer !== 0 ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY;
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
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitBtnColor={selectBtnColor()}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p03.answer === 0}
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box useFull>
          <List
            gap={24}
            data={data}
            row={({ value, index = 1 }) => (
              <Radio
                align={'vertical'}
                type={'square'}
                name={'radio-question-A'}
                label={value?.text}
                value={index === cardData.p03.answer}
                defaultValue={index === cardData.p03.answer}
                onClick={() => handleChange(index)}
                readOnly={cardData.p03.isSubmitted}
                isError={cardData.p03.isSubmitted && cardData.p03.answer !== cardData.p03.solution}
                ariaLabel={`${index}번째 답`}
                tabIndex={1 + index}
              >
                <Label value={index} />
                <Typography>{value?.text}</Typography>
              </Radio>
            )}
          />
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p03.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
