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
import { A04_0004_04 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';

const P03 = () => {
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04_0004_04);
  const { userId } = useRecoilValue(studentAtom);

  const explanation = '41×3=123이므로 123회입니다.';
  const answer = '41, 3, 123 또는 3, 41, 123';
  const answers = [cardData.p03.answer1, cardData.p03.answer2, cardData.p03.answer3];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '지수가 한 줄넘기 횟수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign={'center'}>
        <Label value='ㄷ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        <Typography>지수가 한 줄넘기 횟수를 구해 보세요.</Typography>
      </Box>
    ),
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
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

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect1 = isAnswer(cardData.p03.answer1, cardData.p03.solution1) && cardData.p03.answer1 !== cardData.p03.answer2;
      const isCorrect2 = isAnswer(cardData.p03.answer2, cardData.p03.solution2) && cardData.p03.answer2 !== cardData.p03.answer1;
      const isCorrect3 = isAnswer(cardData.p03.answer3, cardData.p03.solution3);
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

  const handleChange = (subKey: number, value: string) => {
    if (!isNumber(value)) {
      return;
    }

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
      bodyId='targetContainer'
      background='var(--color-white)'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3)}
      submitBtnColor={
        !(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3)
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
            value={answers[0]}
            onChange={e => handleChange(1, e.target.value)}
            maxLength={answers[0].length + 5}
            readOnly={cardData.p03.isSubmitted}
            status={
              cardData.p03.isSubmitted && !cardData.p03.isCorrect
                ? InputStatus.ERROR
                : answers[0].trim().length > 0
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            width='150px'
            ariaLabel='내가 한 줄넘기 횟수 또는 지수가 나보다 더 한 줄넘기 배수 입력란'
          />
          <Typography>x</Typography>
          <Input
            value={answers[1]}
            onChange={e => handleChange(2, e.target.value)}
            maxLength={answers[1].length + 5}
            readOnly={cardData.p03.isSubmitted}
            status={
              cardData.p03.isSubmitted && !cardData.p03.isCorrect
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
            value={answers[2]}
            onChange={e => handleChange(3, e.target.value)}
            maxLength={answers[2].length + 5}
            readOnly={cardData.p03.isSubmitted}
            status={
              cardData.p03.isSubmitted && !cardData.p03.isCorrect
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
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>{explanation}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
