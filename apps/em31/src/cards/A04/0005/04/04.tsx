import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
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
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isAnswer, isNumber } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A04_0005_04 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';

const P04 = () => {
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04_0005_04);
  const { userId } = useRecoilValue(studentAtom);

  const explanation1 = '- 17×4=68이므로 68명입니다.';
  const explanation2 = '- 어림한 값 80보다 실제로 계산한 값 68이 조금 더 작습니다.';
  const answer = '17, 4, 68 또는 4, 17, 68';
  const answers = [cardData.P04.answer1, cardData.P04.answer2, cardData.P04.answer3];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '줄을 선 사람 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄹ'} type='paint' color='var(--color-white)' background='var(--color-grey-600)' />
        줄을 선 사람 수를 구하고 어림한 값과 비교해 보세요.
      </>
    ),
    mark: cardData.P04.isSubmitted ? (cardData.P04.isCorrect ? 'correct' : 'incorrect') : 'none',
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P04: {
            ...prev.P04,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.P04.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.P04.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.P04.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.P04.isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect1 = isAnswer(cardData.P04.answer1, cardData.P04.solution1) && cardData.P04.answer1 !== cardData.P04.answer2;
      const isCorrect2 = isAnswer(cardData.P04.answer2, cardData.P04.solution2) && cardData.P04.answer2 !== cardData.P04.answer1;
      const isCorrect3 = isAnswer(cardData.P04.answer3, cardData.P04.solution3);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;

      setCardData(prev => ({ ...prev, P04: { ...prev.P04, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.P04.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.P04.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.P04.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P04', userSubmission, isCorrect);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (!isNumber(value)) {
      return;
    }

    if (subKey === 1) {
      setCardData(prev => ({ ...prev, P04: { ...prev.P04, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, P04: { ...prev.P04, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, P04: { ...prev.P04, answer3: value } }));
    }
    changeData('P04', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P04');
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
      submitLabel={cardData.P04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!(cardData.P04.answer1 && cardData.P04.answer2 && cardData.P04.answer3)}
      submitBtnColor={
        !(cardData.P04.answer1 && cardData.P04.answer2 && cardData.P04.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      vAlign='flex-start'
      useRound
      useExtend
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding={'20px 44px'} useRound>
          <Input
            type='number'
            value={answers[0]}
            onChange={e => handleChange(1, e.target.value)}
            maxLength={answers[0].length + 5}
            readOnly={cardData.P04.isSubmitted}
            status={
              cardData.P04.isSubmitted && !cardData.P04.isCorrect
                ? InputStatus.ERROR
                : answers[0].trim().length > 0
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            width='150px'
            ariaLabel='내가 한 줄넘기 횟수 또는 지수가 나보다 더 한 줄넘기 배수 입력란'
          />
          <Typography>×</Typography>
          <Input
            type='number'
            value={answers[1]}
            onChange={e => handleChange(2, e.target.value)}
            maxLength={answers[1].length + 5}
            readOnly={cardData.P04.isSubmitted}
            status={
              cardData.P04.isSubmitted && !cardData.P04.isCorrect
                ? InputStatus.ERROR
                : answers[1].trim().length > 0
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            width='150px'
            ariaLabel='지수가 나보다 더 한 줄넘기 배수 또는 내가 한 줄넘기 횟수 입력란'
          />
          <Typography>=</Typography>
          <Input
            type='number'
            value={answers[2]}
            onChange={e => handleChange(3, e.target.value)}
            maxLength={answers[2].length + 5}
            readOnly={cardData.P04.isSubmitted}
            status={
              cardData.P04.isSubmitted && !cardData.P04.isCorrect
                ? InputStatus.ERROR
                : answers[2].trim().length > 0
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            width='150px'
            ariaLabel='지수가 한 줄넘기 횟수 입력란'
          />
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{answer}</Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>{explanation1}</Box>
          <Box marginTop='12px'>{explanation2}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
