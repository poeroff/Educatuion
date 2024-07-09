import { Box, TMainHeaderInfoTypes, Typography, Textarea, BottomSheet, Tag, ETagLine, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP05 } from './store';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SP05);
  const { userId } = useRecoilValue(studentAtom);
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const [submitLabel, setSubmitLabel] = useState<string>('완료하기');

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '자유 영작',
  };
  const questionInfo = {
    text: '다음 질문에 대해 나의 답변을 자유롭게 써 봅시다.',
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
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);

      if (isSubmitted) {
        setSubmitLabel('답안보기');
      }
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value.trim() } }));
    changeData('P02', 1, 1, value.trim());
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

  const submitAnswer = () => {
    const isCorrect = true;
    if (isShowAnswer) {
      setIsShowAnswer(false);
      setSubmitLabel('답안보기');
    } else if (cardData.p02.isSubmitted) {
      setIsShowAnswer(true);
      setSubmitLabel('답안닫기');
    } else {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
            },
          ],
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
      setSubmitLabel('답안보기');
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={submitLabel}
      submitDisabled={!(cardData.p02.answer && isNotEmptyString(cardData.p02.answer))}
      onSubmit={submitAnswer}
      submitBtnColor={
        !(cardData.p02.answer && isNotEmptyString(cardData.p02.answer))
          ? EStyleButtonTypes.SECONDARY
          : isShowAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <Typography>
        Imagine your friend is planning to adopt an animal, and give some advice to him or her. Write a short paragraph about this, using key
        expressions you learned in this lesson.
      </Typography>

      <Box height='220px' marginTop='10px' useFull>
        <Textarea
          width='100%'
          height='100%'
          placeholder='내용을 넣어 주세요.'
          onChange={event => {
            handleChange(event.target.value);
          }}
          readOnly={cardData.p02.isSubmitted}
          ariaLabel='답란'
          value={cardData.p02.answer}
        />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box vAlign='flex-start' marginTop='10px' textAlign='left' flexDirection='column' gap='10px'>
            <Typography> {cardData.p02.exampleAnswerEng} </Typography>
          </Box>
          <Box marginTop={'24px'}></Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box vAlign='flex-start' marginTop='10px' textAlign='left' flexDirection='column' gap='10px'>
            <Typography useGap={false}>
              {' '}
              여러분의 친구가 동물을 입양할 계획이라고 상상해 보고, 그 또는 그녀에게 조언을 해보세요. 이 단원에서 배운 주요 표현을 활용하여, 그것에
              대한 짧은 글을 써 보세요.
            </Typography>
            <Typography useGap={false}>
              {' '}
              나는 네가 입양하고 싶은 동물의 독특한 특성을 파악하라고 조언하고 싶어. 각각의 동물은 서로 다른 것을 요구하기 때문에, 네 반려동물에게
              무엇이 필요한지 이해하는 것이 중요해. 또한 네가 반려동물에게 적합한 환경을 제공할 수 있는지도 사전에 확인해야 해.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
