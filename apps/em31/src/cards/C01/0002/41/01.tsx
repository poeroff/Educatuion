import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  ETagLine,
  Input,
  IQuestionProps,
  List,
  SvgIcon,
  Tag,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getInputStatus } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';

import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import C01000241State from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01000241State);

  const choices = ['232', '253', '342', '354', '421'];
  const answers = ['253', '421'];
  const explanation = `두 수의 일의 자리끼리 더해서 4가 되는 경우는 232와 342, 253과 421입니다. 232+342=574, 253+421=674입니다.
  ➡ 253+421=674 또는 421+253=674`;

  const [clickedIndexes, setClickedIndexes] = useState<(number | null)[]>([
    choices.indexOf(cardData.p01.input1) === -1 ? null : choices.indexOf(cardData.p01.input1),
    choices.indexOf(cardData.p01.input2) === -1 ? null : choices.indexOf(cardData.p01.input2),
  ]);

  const [mark, setMark] = useState<TMarkType>('none');
  const [showAnswer, setShowAnswer] = useState(false);

  const isCorrect = useMemo(
    () => answers.includes(cardData.p01.input1) && answers.includes(cardData.p01.input2),
    [cardData.p01.input1, cardData.p01.input2],
  );

  useEffect(() => {
    if (cardData.p01.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p01.isSubmitted, isCorrect]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />두 수를 골라 합이 674인 덧셈식을 만들어 보세요.
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
        const input1 = userSubmissionList[0].inputData[0]?.value || cardData.p01.input1;
        const input2 = userSubmissionList[0].inputData[1]?.value || cardData.p01.input2;
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            input1,
            input2,
            isSubmitted,
          },
        }));
        setClickedIndexes([
          choices.indexOf(input1) === -1 ? null : choices.indexOf(input1),
          choices.indexOf(input2) === -1 ? null : choices.indexOf(input2),
        ]);
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
    return clickedIndexes.every(index => index !== null);
  }, [clickedIndexes]);

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.input1.trim(),
            isAnswer: true,
            isCorrect,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.input2.trim(),
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };

  const handleClick = (index: number | null) => () => {
    if (cardData.p01.isSubmitted || index === null) return;

    setClickedIndexes(prev => {
      const newClickedIndexes = [...prev];
      const emptyIndex = newClickedIndexes.indexOf(null);

      if (newClickedIndexes.includes(index)) {
        newClickedIndexes[newClickedIndexes.indexOf(index)] = null;
      } else if (emptyIndex !== -1) {
        newClickedIndexes[emptyIndex] = index;
      }

      return newClickedIndexes;
    });
  };

  useEffect(() => {
    const input1 = choices[clickedIndexes[0] ?? -1];
    const input2 = choices[clickedIndexes[1] ?? -1];
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, input1, input2 } }));
    changeData('P01', 1, 1, input1);
    changeData('P01', 1, 2, input2);
  }, [clickedIndexes]);

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
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={getSubmitBtnColor(isInputComplete, showAnswer)}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
      vAlign='start'
    >
      <Box marginTop='40px' type='dashed' useRound padding='20px'>
        <Box background='yellow' useRound textAlign='center' marginBottom='36px' padding='16px 0'>
          <List
            gap={20}
            data={choices}
            align='horizontal'
            row={({ value, index = 1 }) => (
              <Button
                width='100px'
                useRound
                key={index}
                onClick={handleClick(index - 1)}
                color={clickedIndexes.includes(index - 1) ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.NORMAL}
                aria-label={`${index}번 버튼(${value})`}
              >
                <Typography>{value}</Typography>
              </Button>
            )}
          />
        </Box>

        <BoxWrap justifyContent='center'>
          <Box width={400} vAlign='center'>
            <Input
              width='100px'
              onClick={handleClick(clickedIndexes[0])}
              value={cardData.p01.input1}
              status={cardData.p01.isSubmitted && getInputStatus(isCorrect, cardData.p01.input1)}
              readOnly
            />
            <Typography>+</Typography>
            <Input
              width='100px'
              onClick={handleClick(clickedIndexes[1])}
              value={cardData.p01.input2}
              status={cardData.p01.isSubmitted && getInputStatus(isCorrect, cardData.p01.input2)}
              readOnly
            />
            <Typography>=</Typography>
            <Typography>674</Typography>
          </Box>
        </BoxWrap>
      </Box>

      <BottomSheet height={'40%'} show={showAnswer} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{answers.join(', ')}</Typography>
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
