import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  ArrowBox,
  BottomSheet,
  Box,
  BoxWrap,
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
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B03_0008_40 } from './store';

const P07 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);
  const [isMark, setIsMark] = useState(false);

  const [cardData, setCardData] = useRecoilState(B03_0008_40);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const pageNumber = 'P07';
  const containerBodyId = 'B030008-40-07';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: ['', ''],
          isCorrect: false,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {};

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={7} type='icon' size='small' title='7번 빈칸에 알맞은 수를 써넣으세요.' />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: isSubmitted ? (isMark ? 'correct' : 'incorrect') : 'none',
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    setIsSubmitted(cardData.p07.isSubmitted);
    if (cardData.p07.isSubmitted) {
      setIsMark(cardData.p07.isCorrect);
    }
    if (cardData.p07.answer[0] && cardData.p07.answer[1]) {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const defaultAnswer =
          userSubmissionList[0]?.inputData[0]?.value.length === 0
            ? cardData.p07.answer
            : userSubmissionList[0]?.inputData[0]?.value || cardData.p07.answer;
        const defaultIsCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;
        setCardData(prev => ({
          ...prev,
          p07: {
            ...prev.p07,
            answer: defaultAnswer,
            isSubmitted,
            isCorrect: defaultIsCorrect,
          },
        }));
        if (isSubmitted) {
          setIsMark(defaultIsCorrect);
          setIsSubmitted(isSubmitted);
          setIsSubmittable(false);
        }
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newData = { ...cardData, p07: { ...cardData.p07, answer: cardData.p07.answer.map((v, i) => (i === index ? value : v)) } };
    if (newData.p07.answer.every(v => v)) {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
    setCardData(newData);
    changeData(pageNumber, 1, 1, newData.p07.answer);
  };

  const submitAnswer = () => {
    if (isSubmitted) {
      setIsSubmittable(false);
      setIsShow(!isShow);
      setIsMark(cardData.p07.isCorrect);
    } else {
      if (cardData.p07.answer) {
        const isCorrect = cardData.p07.answer.toString() === cardData.p07.solution.toString();
        setCardData(prev => ({ ...prev, p07: { ...prev.p07, isSubmitted: true, isCorrect: isCorrect } }));
        setIsSubmittable(false);
        setIsSubmitted(true);
        setIsMark(isCorrect);
        const userSubmission: userSubmissionType[] = [
          {
            mainKey: 1,
            inputData: [
              {
                subKey: 1,
                type: 'NUMBER_LIST',
                value: cardData.p07.answer,
                isAnswer: true,
                isCorrect,
              },
            ],
            isCorrect,
          },
        ];
        submitDataWithResult(pageNumber, userSubmission, isCorrect);
      }
    }
  };

  const submitLabel = isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';
  const buttonColor = isShow ? EStyleButtonTypes.GRAY : isSubmittable || isSubmitted ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY;

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId={containerBodyId}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={submitLabel}
      submitBtnColor={buttonColor}
      submitDisabled={!isSubmitted && !isSubmittable}
      onSubmit={submitAnswer}
      background={'var(--color-white)'}
      useRound
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box background='yellow' minWidth='329px' useRound hAlign='center'>
          <MathExpression equation='$30\div5$' />
        </Box>
        <Box marginTop={'40px'}>
          <BoxWrap>
            <Box>
              <MathExpression equation='$5\times$' />
              <Input
                width='50px'
                type='number'
                maxLength={1}
                value={cardData.p07.answer[0]}
                status={
                  !cardData.p07.answer[0]
                    ? InputStatus.DEFAULT
                    : cardData.p07.isSubmitted && !cardData.p07.isCorrect
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                onChange={e => handleChange(0, e)}
                disabled={isSubmitted}
                aria-label='5곱하기 n의 값을 입력합니다.'
              />
              <MathExpression equation='$=$' />
              30
            </Box>
            <Box vAlign='center'>
              <ArrowBox width={30} height={30} rotate={90} arrowColor='var(--color-black)' />
            </Box>
            <Box>
              <MathExpression equation='$30\div5=$' />
              <Input
                width='50px'
                type='number'
                maxLength={1}
                value={cardData.p07.answer[1]}
                status={
                  !cardData.p07.answer[1]
                    ? InputStatus.DEFAULT
                    : cardData.p07.isSubmitted && !cardData.p07.isCorrect
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                onChange={e => handleChange(1, e)}
                disabled={isSubmitted}
                aria-label='30 나누기 5 의 몫을 입력합니다.'
              />
            </Box>
          </BoxWrap>
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={containerBodyId}
        closeOption={{
          useYn: true,
          onClose: () => {
            setIsShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography tabIndex={151}>{cardData.p07.solution.join(', ')}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap marginTop='12px'>
              <Typography tabIndex={152}>
                5와 곱해서 30이 되는 수는 6이므로 <MathExpression equation='$30\div5$' />의 몫은 6입니다.
              </Typography>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P07;