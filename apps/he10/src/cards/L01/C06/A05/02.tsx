import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  BoxWrap,
  IQuestionProps,
  Input,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  EStyleButtonTypes,
  BottomSheet,
  EStyleFontSizes,
  ETagLine,
  Tag,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L01C06A05 } from './store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A05);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Strategy in Use',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Q3. How many examples are presented that support how friendliness is related to survival?',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const leftText =
    'To answer these questions, I’d like to tell you about my childhood companion dog, Sparky. When we played with a ball, I noticed that he responded well to my gestures. The responsive behavior of dogs also caught the attention of an evolutionary anthropologist, Brian Hare. He conducted an experiment to see how dogs would respond to human gestures compared to wolves, who share the same common ancestor. He placed two cups on the ground with food hidden under only one of them. When he pointed to the cup with the food, the dogs found it easily. The wolves, however, struggled and chose cups at random, paying no attention to his gestures. Dr. Hare concluded that the dogs’ ability to read human gestures allowed them to perform better than the wolves. He explained that dogs, unlike wolves, have developed communicative skills with humans and a sense of friendliness. This explanation sounds reasonable according to several evolutionary biologists. They say that from the common ancestors of these two species, those that acted friendly toward humans evolved into dogs, and those that didn’t became wolves. Furthermore, Dr. Hare suggested that the friendly nature of dogs probably provided them a survival advantage that allowed their population to grow larger than that of wolves.\n\nI’ll give you another example of how friendliness is related to survival. Dr. Hare and his colleagues designed an experiment with chimpanzees and bonobos. Although the two are genetically similar, they are different in nature. To study their cooperative behavior, Dr. Hare’s team set up a device which required two individuals to pull both ends of a rope at the same time in order to access food on a board. When placed with partners that the chimpanzees knew, they were able to work together to get the food. However, when paired with new partners, the chimpanzees usually failed to get the food, and when they occasionally succeeded, they did not share  the food with their partner. The bonobos, on the other hand, got along much better than the chimpanzees. They solved the problem regardless of which individual they were paired with, and they were also more willing  to share the food. This research shows that bonobos have a cooperative and friendly nature. Experts suggest that their nature has helped their species survive. Without these characteristics, they could have faced extinction.';

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
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
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
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
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
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    }
    changeData('P02', 1, subKey, value);
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
      submitLabel={!cardData.p02.isSubmitted ? '채점하기' : isShow ? '답안 닫기' : '답안 보기'}
      onSubmit={submitAnswer}
      submitDisabled={!isNotEmptyString(cardData.p02.answer1) || !isNotEmptyString(cardData.p02.answer2)}
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer1) || !isNotEmptyString(cardData.p02.answer2)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BoxWrap useFull alignItems='center' boxGap={20} width={920}>
        <Box height='100%' width='468px' background='white' line-height='48px' useRound paddingRight='10px'>
          <Scroll height='100%' tabIndex={0}>
            {leftText}
          </Scroll>
        </Box>
        <Box height='300px' width='60%' useRound vAlign='center'>
          <Box>
            <Typography>There are two examples:</Typography>
            <Typography>one involving dogs and (1)</Typography>

            <Input
              name='value1'
              maxLength={100}
              value={cardData.p02.answer1.trim()}
              width='120px'
              readOnly={cardData.p02.isSubmitted}
              onChange={e => {
                handleChange(1, e.target.value);
              }}
              status={
                !cardData.p02.answer1
                  ? InputStatus.DEFAULT
                  : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer1, cardData.p02.solution1)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel='1번 답 입력란'
            />
            <Typography>and the other involving</Typography>
            <Box display='inline-block'>
              <Typography>(2)</Typography>
              <Input
                name='value2'
                maxLength={100}
                value={cardData.p02.answer2.trim()}
                width='200px'
                readOnly={cardData.p02.isSubmitted}
                onChange={e => {
                  handleChange(2, e.target.value);
                }}
                status={
                  !cardData.p02.answer2
                    ? InputStatus.DEFAULT
                    : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer2, cardData.p02.solution2)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                ariaLabel='2번 답 입력란'
              />
            </Box>
            <Typography>and bonobos.</Typography>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='10px' height='48px' padding={8}>
            <Typography size={EStyleFontSizes.MEDIUM}>{`(1) ${cardData.p02.solution1}\n(2) ${cardData.p02.solution2}`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
