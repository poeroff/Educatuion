import { Container } from '@maidt-cntn/ui/math';
import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  BottomSheet,
  Input,
  IQuestionProps,
  Label,
  SvgIcon,
  Table,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  InputStatus,
} from '@maidt-cntn/ui';
import empty_square from '@/assets/icon/math_empty_square.svg';
import { useCallback, useEffect, useState } from 'react';
import AnswerSheet02 from './AnswerSheet02';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { B01000330_Atom } from './store';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const CURRENT_PAGE = 'P02';
  const headerInfo = null;

  const { initData, submitDataWithResult, saveData, changeData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(B01000330_Atom);

  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        <Box>
          <Box vAlign='center'>
            <SvgIcon alt='부등호' src={empty_square} size='43px' />
            &nbsp;안에 알맞은 수를 찾아 써넣으세요.
          </Box>
        </Box>
      </>
    ),
  };
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 2,
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
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(CURRENT_PAGE);
    };
  }, []);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === CURRENT_PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            inputData: {
              ...userSubmissionList[0].inputData,
            },
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(CURRENT_PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const isBtnDisabled = () => {
    const allZero = Object.values(cardData.p02).every(value => value !== '');
    return allZero || cardData.p02.isSubmitted;
  };

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      submitAnswer();
    } else {
      setIsShowBottom(prev => !prev);
    }
  };

  const submitAnswer = () => {
    const correct = checkAnswerCorrect();
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 2,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1,
            isAnswer: cardData.p02.answer1 === cardData.p02.solution1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer2,
            isAnswer: cardData.p02.answer2 === cardData.p02.solution2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.answer3,
            isAnswer: cardData.p02.answer3 === cardData.p02.solution3,
          },
        ],
        isCorrect: correct,
      },
    ];
    setCardData(prev => ({
      ...prev,
      p02: { ...prev.p02, isSubmitted: true, isCorrect: correct, inputData: [...(userSubmission[0].inputData as [])] },
    }));
    submitDataWithResult(CURRENT_PAGE, userSubmission, correct);
  };

  const checkAnswerCorrect = useCallback(() => {
    return (
      cardData.p02.answer1 === cardData.p02.solution1 &&
      cardData.p02.answer2 === cardData.p02.solution2 &&
      cardData.p02.answer3 === cardData.p02.solution3
    );
  }, [cardData.p02]);

  const handleChange = (value: string, subKey: number) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, [`answer${subKey}`]: value } }));
    changeData('P02', 2, subKey, value);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      bodyId={'targetContainer'}
      background={'var(--color-white)'}
      submitBtnColor={isBtnDisabled() ? (isShowBottom ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isBtnDisabled()}
      submitLabel={cardData.p02.isSubmitted ? (isShowBottom ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={handleSubmit}
      vAlign='flex-start'
    >
      <BoxWrap justifyContent={'center'} alignItems={'center'} height='304px'>
        <Box type='dashed' useRound padding={'40px'}>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={[]} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>5</TD>
                <TD>4</TD>
                <TD>
                  <Input
                    value={cardData.p02.answer1}
                    readOnly={cardData.p02.isSubmitted}
                    status={
                      cardData.p02.isSubmitted ? (cardData.p02.inputData[0].isAnswer ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE
                    }
                    onChange={e => handleChange(e.target.value, 1)}
                    width='100%'
                    ariaLabel='1번 답란'
                    maxLength={1}
                    tabIndex={102}
                  />
                </TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>1</TD>
                <TD>
                  <Input
                    value={cardData.p02.answer2}
                    readOnly={cardData.p02.isSubmitted}
                    status={
                      cardData.p02.isSubmitted ? (cardData.p02.inputData[1].isAnswer ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE
                    }
                    onChange={e => handleChange(e.target.value, 2)}
                    width='100%'
                    ariaLabel='2번 답란'
                    maxLength={1}
                    tabIndex={103}
                  />
                </TD>
                <TD>5</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p02.answer3}
                    readOnly={cardData.p02.isSubmitted}
                    status={
                      cardData.p02.isSubmitted ? (cardData.p02.inputData[2].isAnswer ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE
                    }
                    onChange={e => handleChange(e.target.value, 3)}
                    width='100%'
                    ariaLabel='3번 답란'
                    maxLength={1}
                    tabIndex={104}
                  />
                </TD>
                <TD>1</TD>
                <TD>9</TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
      <BottomSheet
        bottomSheetTargetId={'targetContainer'}
        height='50%'
        show={isShowBottom}
        closeOption={{
          useYn: true,
          onClose: () => {
            setIsShowBottom(false);
          },
        }}
      >
        <AnswerSheet02 />
      </BottomSheet>
    </Container>
  );
};

export default P02;
