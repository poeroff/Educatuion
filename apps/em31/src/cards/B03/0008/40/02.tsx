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
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B03_0008_40 } from './store';

const P02 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);
  const [isMark, setIsMark] = useState(false);

  const [cardData, setCardData] = useRecoilState(B03_0008_40);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const pageNumber = 'P02';
  const containerBodyId = 'B030008-40-02';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
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
        <Label value={2} type='icon' size='small' title='2번 그림을 보고 빈칸에 알맞은 수를 써넣으세요.' />
        그림을 보고 빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: isSubmitted ? (isMark ? 'correct' : 'incorrect') : 'none',
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    setIsSubmitted(cardData.p02.isSubmitted);
    if (cardData.p02.isSubmitted) {
      setIsMark(cardData.p02.isCorrect);
    }
    if (cardData.p02.answer) {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const defaultAnswer = userSubmissionList[0].inputData[0]?.value || cardData.p02.answer;
        const defaultIsCorrect = isSubmitted ? userSubmissionList[0].isCorrect : false;
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    if (value) {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
    changeData(pageNumber, 1, 1, value);
  };

  const submitAnswer = () => {
    if (isSubmitted) {
      setIsSubmittable(false);
      setIsShow(!isShow);
      setIsMark(cardData.p02.isCorrect);
    } else {
      if (cardData.p02.answer) {
        const isCorrect = parseInt(cardData.p02.answer) === cardData.p02.solution;
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
        setIsSubmittable(false);
        setIsSubmitted(true);
        setIsMark(isCorrect);
        const userSubmission: userSubmissionType[] = [
          {
            mainKey: 1,
            inputData: [
              {
                subKey: 1,
                type: 'NUMBER',
                value: cardData.p02.answer,
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
        <Box type='line' padding='20px 40px' useRound>
          <Image tabIndex={101} src='/B03/0008/40/DKC313M02.png' alt='별이 3개씩 7묶음 그려진 그림입니다.' width='652px' />
        </Box>
        <Box marginTop='24px'>
          <MathExpression equation='$21\div3=$' />{' '}
          <Input
            width='130px'
            type='number'
            maxLength={1}
            value={cardData.p02.answer}
            status={
              !cardData.p02.answer
                ? InputStatus.DEFAULT
                : cardData.p02.isSubmitted && !cardData.p02.isCorrect
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            onChange={e => handleChange(e)}
            disabled={isSubmitted}
            aria-label='21을 3으로 나누었을 때의 몫을 입력합니다.'
          />
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
              <Typography tabIndex={151}>{cardData.p02.solution}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap marginTop='12px'>
              <Typography tabIndex={152}>별 21개를 3개씩 묶으면 7묶음입니다.</Typography>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
