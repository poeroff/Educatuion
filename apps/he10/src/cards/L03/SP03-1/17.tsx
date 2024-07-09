import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03SP03_1 } from './store';

const P17 = ({ _page = 'P17' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP03_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <Typography>1. (A), (B), (C)의 각 네모 안에서 어법에 맞는 표현으로 가장 적절한 것을 고르시오.</Typography>,
    mark: cardData.p17.isSubmitted ? (cardData.p17.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    {
      text: '(A)vibrate - (B)reach - (C)results',
    },
    {
      text: '(A)vibrate - (B)reach to - (C)resulting',
    },
    {
      text: '(A)to vibrate - (B)reach - (C)results',
    },
    {
      text: '(A)to vibrate - (B)reach to - (C)resulting',
    },
    {
      text: '(A)to vibrate - (B)reach - (C)resulting',
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
    if (cardData.p17.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p17.answer === cardData.p17.solution;
      setCardData(prev => ({ ...prev, p17: { ...prev.p17, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p17.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p17: {
            ...prev.p17,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p17.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p17: { ...prev.p17, answer: index } }));
    changeData(_page, 1, 1, index);
    if (index !== 0) {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData(_page);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      vAlign='flex-start'
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p17.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p17.isSubmitted && cardData.p17.answer === 0}
      submitBtnColor={
        cardData.p17.isSubmitted
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : isSubmittable
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box useFull>
          <Box background='white' useRound paddingRight='10px'>
            <Typography>
              &nbsp;&nbsp;Sound is produced through vibrations that occur from a sound source, when the strings of a guitar are played, for instance.
              The vibrations of the sound source cause the air (A)[vibrate / to vibrate] and the sound to travel as waves, similar to the ripples
              created in a lake when you throw a stone. When these sound waves (B)[reach / reach to] our ears, the brain interprets them as sound.
              Just as different ripples in water might overlap if you throw two stones, sound waves can also interfere with each other when they meet.
              There are two types of interference: constructive and destructive. Constructive interference occurs when the peaks of two waves overlap,
              (C)[results / resulting] in a bigger wave and a louder sound. Destructive interference, on the other hand, occurs when a peak of one
              wave overlaps with a valley of another wave, so they cancel each other out and produce a quieter sound, or no sound at all.
            </Typography>
          </Box>
          <Box marginTop='10px'>
            <List
              gap={10}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p17.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p17.isSubmitted}
                  isError={cardData.p17.isSubmitted && cardData.p17.answer !== cardData.p17.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p17.solution}</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                (A)동사 cause는 5형식 문장에서 목적격 보어로 to 부정사를 취하는 동사이므로, to vibrate가 적절하다.
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                (B)동사 reach는 ‘~에 도착하다’라는 의미를 가지며 목적어 앞에 전치사를 쓰지 않으므로, reach가 적절하다.
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                (C) “and it results ~“를 분사구문으로 바꾼 형태로, 접속사와 주어가 생략되고 동사를 현재분사로 바꿔야 하므로 resulting이 적절하다.
              </Box>
            </Typography>

            <Box marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='해석' />
            </Box>
            <Box marginTop='22px'>
              <Typography>
                소리는 예를 들어 기타의 줄이 연주될 때처럼, 음원에서 발생하는 진동을 통해 만들어진다. 음원의 진동으로 인해 공기가 진동하고 소리가
                파도처럼 이동하게 되는데, 이는 돌을 던질 때 호수에 생성되는 잔물결과 유사하다. 이 음파가 우리 귀에 도달하면 뇌는 그것들을 소리로
                해석한다. 두 개의 돌을 던지면 물에서 서로 다른 잔물결이 겹칠 수 있는 것처럼, 소리 파동도 만나면 서로 간섭할 수 있다. 간섭에는 보강
                간섭과 상쇄 간섭이라는 두 가지 유형이 있다. 보강 간섭은 두 파동의 정점이 겹칠 때 발생하여 더 큰 파동과 더 큰 소리를 만들어낸다. 반면에
                상쇄 간섭은 한 파동의 정점이 다른 파동의 저점과 겹칠 때 발생하여, 정점과 저점이 서로를 상쇄하며 더 작은 소리를 내거나 전혀 소리가 나지
                않게 한다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P17;
