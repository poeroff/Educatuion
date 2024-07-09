import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import ConnectorArrow from '@maidt-cntn/assets/icons/connector_arrow.svg';
import ConnectorLine from '@maidt-cntn/assets/icons/connector_line.svg';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Dialog,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { checkAnswers, getInputStatus } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import A03000105State from './store';

const P04 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A03000105State);

  const [showAnswer, setShowAnswer] = useState(false);
  const [isShowDialog, setShowDialog] = useState(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const answers = ['6', '54'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark,
  };

  useEffect(() => {
    if (cardData.p04.isSubmitted) {
      setMark(cardData.p04.isAllCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p04.isSubmitted, cardData.p04.isAllCorrect]);

  const isInputComplete = useMemo(() => cardData.p04.inputs.every(Boolean), [cardData.p04.inputs]);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...cardData.p04.inputs];
    newInputs[index] = value;

    setCardData(prev => ({
      ...prev,
      p04: {
        ...prev.p04,
        inputs: newInputs,
      },
    }));
    changeData('P04', 1, index + 1, value);
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
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            inputs: userSubmissionList[0].inputData.map((item: { value: string }) => item.value) || cardData.p04.inputs,
            isCorrectArr: userSubmissionList[0].inputData.map((item: { isCorrect: boolean }) => item.isCorrect) || cardData.p04.isCorrectArr,
            isAllCorrect: userSubmissionList[0].inputData.every((item: { isCorrect: boolean }) => item.isCorrect) || cardData.p04.isAllCorrect,
            isSubmitted,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const submitAnswer = () => {
    const isCorrectArr = checkAnswers(cardData.p04.inputs, answers);
    const isAllCorrect = isCorrectArr.every(Boolean);
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrectArr, isAllCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.inputs[0],
            isAnswer: true,
            isCorrect: isCorrectArr[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p04.inputs[1],
            isAnswer: true,
            isCorrect: isCorrectArr[1],
          },
        ],
      },
    ];
    submitDataWithResult('P04', userSubmission, isAllCorrect);
  };

  const handleSubmit = () => {
    if (cardData.p04.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p03.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isInputComplete ? EStyleButtonTypes.SECONDARY : showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
      useRound
      vAlign='flex-start'
      useLinkLabel={cardData.p04.isSubmitted && !cardData.p04.isAllCorrect}
      linkLabel='맞춤 학습하기'
      onLink={() => setShowDialog(true)}
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              2
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>× 3</GrayRoundBox>
            </Box>
            <Box>
              <Input
                type='number'
                maxLength={6}
                width='130px'
                ariaLabel='2 × 3의 값'
                value={cardData.p04.inputs[0]}
                onChange={e => handleInputChange(0, e.target.value)}
                status={cardData.p04.isSubmitted && getInputStatus(cardData.p04.isCorrectArr[0], cardData.p04.inputs[0])}
                readOnly={cardData.p04.isSubmitted}
              />
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>× 9</GrayRoundBox>
            </Box>
            <Box>
              <Input
                type='number'
                maxLength={6}
                width='130px'
                ariaLabel='2 × 3 × 9의 값'
                value={cardData.p04.inputs[1]}
                onChange={e => handleInputChange(1, e.target.value)}
                status={cardData.p04.isSubmitted && getInputStatus(cardData.p04.isCorrectArr[1], cardData.p04.inputs[1])}
                readOnly={cardData.p04.isSubmitted}
              />
            </Box>
          </BoxWrap>
        </Box>
      </Box>

      <BottomSheet
        height={'50%'}
        show={showAnswer}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShowAnswer(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>{answers.join(', ')}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>2×3=6, 6×9=54</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        isShow={isShowDialog}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <Box hAlign='center'>C-EI31-03-0001-1201</Box>
      </Dialog>
    </Container>
  );
};

const GrayRoundBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-100);
  min-width: 120px;
  height: 52px;
  padding: 4px 12px;
  border-radius: 80px;
  margin-top: -140px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -30px;
    top: 50%;
    width: 26px;
    height: 42px;
    background: url(${`"${ConnectorLine}"`}) no-repeat;
    background-size: contain;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    right: -40px;
    top: 50%;
    width: 35px;
    height: 46px;
    background: url(${`"${ConnectorArrow}"`}) no-repeat;
    background-size: contain;
  }
`;

export default P04;
