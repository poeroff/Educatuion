import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Image,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A04_0002_05 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { isNotEmptyString, isAnswer, removeSpaces } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const [isShow, setShow] = useState(false);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A04_0002_05);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '30×2 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <Label value={'ㄴ'} color='var(--color-white)' background='var(--color-grey-600)' marginRight={12} />
        <Box marginTop={5} vAlign='center'>
          <Image src='/A04/0002/05/MC31402-2.png' alt='십의 모형' width='40px' height='40px' /> 은 모두 몇 개인가요?
        </Box>
      </Box>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
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
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const isCorrectAnswer = (answer: string, solution: string[]) => {
    return solution.some(element => isAnswer(removeSpaces(answer), removeSpaces(element)));
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect = isCorrectAnswer(cardData.p02.answer, cardData.p02.solution);
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData('P02', 1, 1, value);
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
      background='var(--color-white)'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!cardData.p02.answer.trim()}
      submitBtnColor={cardData.p02.answer.trim() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      vAlign='flex-start'
      useRound
      useExtend
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding={'20px 44px'} useRound>
          <Typography>3 x 2 =</Typography>
          <Input
            value={cardData.p02.answer}
            onChange={e => handleChange(e.target.value)}
            maxLength={cardData.p02.solution[0].length + 5}
            readOnly={cardData.p02.isSubmitted}
            type='number'
            status={
              !isNotEmptyString(cardData.p02.answer)
                ? InputStatus.DEFAULT
                : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer, cardData.p02.solution)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            width='150px'
            title='식 입력란'
          />
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p02.solution[0]}</Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>3x2=6(개)입니다.</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
