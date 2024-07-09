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

const P05 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);
  const [isMark, setIsMark] = useState(false);

  const [cardData, setCardData] = useRecoilState(B03_0008_40);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const pageNumber = 'P05';
  const containerBodyId = 'B030008-40-05';

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
        <Label value={5} type='icon' size='small' title='5번 곱셈식을 나눗셈식 2개로 나타내 보세요.' />
        곱셈식을 나눗셈식 2개로 나타내 보세요.
      </>
    ),
    mark: isSubmitted ? (isMark ? 'correct' : 'incorrect') : 'none',
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    setIsSubmitted(cardData.p05.isSubmitted);
    if (cardData.p05.isSubmitted) {
      setIsMark(cardData.p05.isCorrect);
    }
    if (cardData.p05.answer[0] && cardData.p05.answer[1]) {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const defaultAnswer =
          userSubmissionList[0]?.inputData[0]?.value.length === 0
            ? cardData.p05.answer
            : userSubmissionList[0]?.inputData[0]?.value || cardData.p05.answer;
        const defaultIsCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
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
    const newData = { ...cardData, p05: { ...cardData.p05, answer: cardData.p05.answer.map((v, i) => (i === index ? value : v)) } };
    if (newData.p05.answer.every(v => v)) {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
    setCardData(newData);
    changeData(pageNumber, 1, 1, newData.p05.answer);
  };

  const submitAnswer = () => {
    if (isSubmitted) {
      setIsSubmittable(false);
      setIsShow(!isShow);
      setIsMark(cardData.p05.isCorrect);
    } else {
      if (cardData.p05.answer) {
        const isCorrect = cardData.p05.answer.toString() === cardData.p05.solution.toString();
        setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect } }));
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
                value: cardData.p05.answer,
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
          <MathExpression equation='$3\times4=12$' />
        </Box>
        <SvgIcon src={arrow} width='140px' height='124px' />
        <Box>
          <Box type='dashed' useRound hAlign='center' padding='24px'>
            <MathExpression equation='$12\div3=$' />
            <Input
              width='50px'
              type='number'
              maxLength={1}
              value={cardData.p05.answer[0]}
              status={
                !cardData.p05.answer[0]
                  ? InputStatus.DEFAULT
                  : cardData.p05.isSubmitted && !cardData.p05.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              onChange={e => handleChange(0, e)}
              disabled={isSubmitted}
              aria-label='12를 3으로 나누었을 때의 몫을 입력합니다.'
            />
          </Box>
          <Box type='dashed' useRound hAlign='center' padding='24px' marginTop='44px'>
            <MathExpression equation='$12\div4=$' />
            <Input
              width='50px'
              type='number'
              maxLength={1}
              value={cardData.p05.answer[1]}
              status={
                !cardData.p05.answer[1]
                  ? InputStatus.DEFAULT
                  : cardData.p05.isSubmitted && !cardData.p05.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              onChange={e => handleChange(1, e)}
              disabled={isSubmitted}
              aria-label='12를 4로 나누었을 때의 몫을 입력합니다.'
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
              <Typography tabIndex={151}>{cardData.p05.solution.join(', ')}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap marginTop='12px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <BoxWrap>
                  <Typography tabIndex={152}>
                    <MathExpression equation='$3\times4=12$' />
                  </Typography>
                  <Typography tabIndex={153}>
                    <MathExpression equation='$3\times4=12$' />
                  </Typography>
                </BoxWrap>
                <BoxWrap marginLeft={'50px'}>
                  <Image src={'/B03/0004/50/B-EM31-03-0004-5001(1).png'} width='110px' height='70px' />
                  <Box marginLeft={'15px'}> </Box>
                  <Image src={'/B03/0004/50/B-EM31-03-0004-5001(2).png'} width='110px' height='70px' />
                </BoxWrap>
                <BoxWrap>
                  <Typography tabIndex={154}>
                    <MathExpression equation='$12\div3=4$' />
                  </Typography>
                  <Typography tabIndex={155}>
                    <MathExpression equation='$12\div4=3$' />
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

export default P05;
