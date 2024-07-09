import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Input, Label, SvgIcon, TMarkType, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getInputStatus } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import C01000240State from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01000240State);

  const answer1 = ['425+162=587', '162+425=587', '425+162', '162+425'];
  const answer2 = '587';
  const explanation = `(접은 종이학 수)+(더 접은 종이학 수)
    =425+162=587(마리)`;

  const [showAnswer, setShowAnswer] = useState(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const isAnswer1Correct = useMemo(() => answer1.includes(cardData.p01.input1.replace(/\s+/g, '')), [cardData.p01.input1]);
  const isAnswer2Correct = useMemo(() => cardData.p01.input2.trim() === answer2, [cardData.p01.input2]);
  const isAllCorrect = useMemo(() => isAnswer1Correct && isAnswer2Correct, [isAnswer1Correct, isAnswer2Correct]);

  useEffect(() => {
    if (cardData.p01.isSubmitted) {
      setMark(isAllCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p01.isSubmitted, isAllCorrect]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        유경이는 종이학을 425마리 접었습니다. 162마리 더 접었다면 종이학은 모두 몇 마리인가요?
      </>
    ),
    markSize: 'middle',
    mark,
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
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
            input1: userSubmissionList[0].inputData[0]?.value || cardData.p01.input1,
            input2: userSubmissionList[0].inputData[1]?.value || cardData.p01.input2,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const isInputComplete = useMemo(() => {
    return !!cardData.p01.input1.trim() && !!cardData.p01.input2.trim();
  }, [cardData.p01]);

  const submitAnswer = () => {
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        input1: prev.p01.input1.replace(/\s+/g, ''),
        isSubmitted: true,
        isCorrect: isAllCorrect,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.input1.replace(/\s+/g, ''),
            isAnswer: true,
            isCorrect: isAnswer1Correct,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.input2,
            isAnswer: true,
            isCorrect: isAnswer1Correct,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isAllCorrect);
  };

  const handleInputChange = (subKey: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, [`input${subKey}`]: e.target.value } }));
    changeData('P01', 1, subKey, e.target.value);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };

  const getSubmitBtnColor = (isInputComplete: boolean, showAnswer: boolean): EStyleButtonTypes => {
    if (!isInputComplete) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.YELLOW;
  };

  return (
    <Container
      headerInfo={null}
      bodyId='targetContainer'
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={getSubmitBtnColor(isInputComplete, showAnswer)}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
      vAlign='flex-start'
    >
      <Box marginTop='40px' display='flex' justifyContent='center'>
        <Box>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              maxLength={20}
              minWidth='296px'
              marginLeft={12}
              textAlign='center'
              value={cardData.p01.input1}
              onChange={e => handleInputChange(1, e)}
              status={cardData.p01.isSubmitted && getInputStatus(isAnswer1Correct, cardData.p01.input1)}
              readOnly={cardData.p01.isSubmitted}
              ariaLabel='식을 적어주세요.'
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              type='number'
              maxLength={5}
              width='124px'
              marginLeft={12}
              textAlign='center'
              value={cardData.p01.input2}
              onChange={e => handleInputChange(2, e)}
              status={cardData.p01.isSubmitted && getInputStatus(isAnswer2Correct, cardData.p01.input2)}
              readOnly={cardData.p01.isSubmitted}
              ariaLabel='답을 적어주세요.'
            />
            <Typography>마리</Typography>
          </Box>
        </Box>
      </Box>

      <BottomSheet height={'40%'} show={showAnswer} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{`${answer1.join(' 또는 ')}, ${answer2}`}</Typography>
          </Box>
          <Box marginTop='20px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography usePre>{explanation}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
