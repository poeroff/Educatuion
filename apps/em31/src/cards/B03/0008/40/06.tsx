import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  Label,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import arrow from '../../../../assets/icon/v_arrow.svg';
import { B03_0008_40 } from './store';

const P06 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);
  const [isMark, setIsMark] = useState(false);

  const [cardData, setCardData] = useRecoilState(B03_0008_40);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const pageNumber = 'P06';
  const containerBodyId = 'B030008-40-06';

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
        <Label value={6} type='icon' size='small' title='6번 나눗셈식을 곱셈식 2개로 나타내 보세요.' />
        나눗셈식을 곱셈식 2개로 나타내 보세요.
      </>
    ),
    mark: isSubmitted ? (isMark ? 'correct' : 'incorrect') : 'none',
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    setIsSubmitted(cardData.p06.isSubmitted);
    if (cardData.p06.isSubmitted) {
      setIsMark(cardData.p06.isCorrect);
    }
    if (cardData.p06.answer[0] && cardData.p06.answer[1]) {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const defaultAnswer =
          userSubmissionList[0]?.inputData[0]?.value.length === 0
            ? cardData.p06.answer
            : userSubmissionList[0]?.inputData[0]?.value || cardData.p06.answer;
        const defaultIsCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
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
    const newData = { ...cardData, p06: { ...cardData.p06, answer: cardData.p06.answer.map((v, i) => (i === index ? value : v)) } };
    if (newData.p06.answer.every(v => v)) {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
    setCardData(newData);
    changeData(pageNumber, 1, 1, newData.p06.answer);
  };

  const submitAnswer = () => {
    if (isSubmitted) {
      setIsSubmittable(false);
      setIsShow(!isShow);
      setIsMark(cardData.p06.isCorrect);
    } else {
      if (cardData.p06.answer) {
        const isCorrect = cardData.p06.answer.toString() === cardData.p06.solution.toString();
        setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect: isCorrect } }));
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
                value: cardData.p06.answer,
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
      <Box display='flex' hAlign='center'>
        <Box background='yellow' minWidth='329px' useRound hAlign='center'>
          <MathExpression equation='$40\div8 = 5$' />
        </Box>
        <SvgIcon src={arrow} width='140px' height='124px' />
        <Box>
          <Box type='dashed' useRound hAlign='center' padding='24px'>
            <MathExpression equation='$8\times5=$' />
            <Input
              width='100px'
              type='number'
              maxLength={2}
              value={cardData.p06.answer[0]}
              status={
                !cardData.p06.answer[0]
                  ? InputStatus.DEFAULT
                  : cardData.p06.isSubmitted && !cardData.p06.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              onChange={e => handleChange(0, e)}
              disabled={isSubmitted}
              aria-label='8곱하기 5의 값을 입력합니다.'
            />
          </Box>
          <Box type='dashed' useRound hAlign='center' padding='24px' marginTop='44px'>
            <MathExpression equation='$5\times8=$' />
            <Input
              width='100px'
              type='number'
              maxLength={2}
              value={cardData.p06.answer[1]}
              status={
                !cardData.p06.answer[1]
                  ? InputStatus.DEFAULT
                  : cardData.p06.isSubmitted && !cardData.p06.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              onChange={e => handleChange(1, e)}
              disabled={isSubmitted}
              aria-label='5곱하기 8의 값을 입력합니다.'
            />
          </Box>
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
              <Typography tabIndex={151}>{cardData.p06.solution.join(', ')}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap marginTop='12px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <BoxWrap>
                  <Typography tabIndex={152}>
                    <MathExpression equation='$40\div8=5$ ' />
                  </Typography>
                  <Typography tabIndex={153}>
                    <MathExpression equation='$40\div8=5$ ' />
                  </Typography>
                </BoxWrap>
                <BoxWrap marginLeft={'50px'}>
                  <Image src={'/B03/0004/50/B-EM31-03-0004-5003(1).png'} width='110px' height='70px' />
                  <Box marginLeft={'15px'}> </Box>
                  <Image src={'/B03/0004/50/B-EM31-03-0004-5003(2).png'} width='110px' height='70px' />
                </BoxWrap>
                <BoxWrap>
                  <Typography tabIndex={154}>
                    <MathExpression equation='$8\times5=40$ ' />
                  </Typography>
                  <Typography tabIndex={155}>
                    <MathExpression equation='$5\times8=40$ ' />
                  </Typography>
                </BoxWrap>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P06;
