import styled from '@emotion/styled';

import {
  Box,
  Label,
  EStyleButtonTypes,
  IQuestionProps,
  BoxWrap,
  TMainHeaderInfoTypes,
  Tag,
  TMarkType,
  BottomSheet,
  ETagLine,
  ConnectLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getInputStatus } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useMemo, useState } from 'react';
import { C01_0004_20 } from './store';

const P04 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0004_20);

  const answers = [0, 1];
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const direction = 'vertical';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const isAnswer1Correct = useMemo(() => cardData.p04.input1[0] === answers[0], [cardData.p04.input1]);
  const isAnswer2Correct = useMemo(() => cardData.p04.input2[0] === answers[1], [cardData.p04.input2]);

  const isAllCorrect = useMemo(() => isAnswer1Correct && isAnswer2Correct, [isAnswer1Correct, isAnswer2Correct]);

  useEffect(() => {
    if (cardData.p04.isSubmitted) {
      setMark(isAllCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p04.isSubmitted, isAllCorrect]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark,
    markSize: 'middle',
    text: (
      <>
        <Label value='3' type='icon' />
        계산 결과를 찾아 이어 보세요.
      </>
    ),
  };

  const left_data = [
    {
      value: '258+347',
      itemId: '1',
    },
    {
      value: '149+473',
      itemId: '2',
    },
  ];

  const right_data = [
    {
      value: '605',
      itemId: '3',
    },
    {
      value: '622',
      itemId: '4',
    },
    {
      value: '625',
      itemId: '5',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [0],
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: [0],
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'p04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            input1: userSubmissionList[0].inputData[0]?.value || cardData.p04.input1,
            input2: userSubmissionList[0].inputData[1]?.value || cardData.p04.input2,
            isSubmitted,
          },
        }));
      }
      initData('p04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('p04');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const isInputComplete = useMemo(() => {
    return cardData.p04.input1.every(value => value !== 0) && cardData.p04.input2.every(value => value !== 0);
  }, [cardData.p04.input1, cardData.p04.input2]);

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isAllCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p04.input1,
            isAnswer: true,
            isCorrect: isAnswer1Correct,
          },
          {
            subKey: 2,
            type: 'TEXT_LIST',
            value: cardData.p04.input2,
            isAnswer: true,
            isCorrect: isAnswer2Correct,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    submitDataWithResult('p04', userSubmission, isAllCorrect);
  };

  const handleSubmit = () => {
    if (cardData.p04.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };
  const handleListInputChange = (index: number, subKey: number) => {
    // const newInput = [...cardData.p04[`button${subKey}`]];
    // newInput[index] = e.target.value;
    // setCardData(prev => ({ ...prev, p04: { ...prev.p04, [`button${subKey}`]: newInput } }));
    // changeData('p04', 1, subKey, newInput);
    console.log(index, subKey);
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      vAlign='center'
      useRound
      submitLabel={cardData.p04.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={getSubmitBtnColor(isInputComplete, showAnswer)}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
    >
      <Box useFull>
        <Box marginTop='24px' height='350px' hAlign='center' width='calc(100% - 112px)' margin='0 auto'>
          <ConnectLineContainer
            onConnect={props => {
              console.log('onConnect!', props);
            }}
            direction={direction}
          >
            <ConnectLineSide sideId='aSide' bgColor='var(--color-green-100)'>
              {left_data.map((value, index) => (
                <ConnectLineItem value={value.value} itemId={value.itemId} key={index} width='200px' />
              ))}
            </ConnectLineSide>

            <ConnectLineSide sideId='bSide' bgColor='var(--color-yellow-100)'>
              {right_data.map((value, index) => (
                <ConnectLineItem value={value.value} itemId={value.itemId} key={index} width='200px' />
              ))}
            </ConnectLineSide>
          </ConnectLineContainer>
        </Box>
      </Box>

      <BottomSheet height={'50%'} show={showAnswer} bottomSheetTargetId='targetContainer'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box marginTop='24px' height='350px' display='flex' flexDirection='column' justifyContent='space-between'>
              TEST
            </Box>
          </Box>
          <Box position='relative'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap marginTop='20px'>258+347=605, 149+473=622</BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const ConnectLineSide = styled(ConnectLine.Side)``;

const ConnectLineContainer = styled(ConnectLine)``;

const ConnectLineItem = styled(ConnectLine.Item)``;

export default P04;
