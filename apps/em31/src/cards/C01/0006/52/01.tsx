import {
  Box,
  IQuestionProps,
  Typography,
  EStyleButtonTypes,
  Input,
  BottomSheet,
  Tag,
  ETagLine,
  Label,
  List,
  SvgIcon,
  InputStatus,
} from '@maidt-cntn/ui';
import { isNotEmptyString, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { C01_0006_52 } from './store';
import arrow from '@/assets/icon/arrow_right.svg';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(C01_0006_52);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        계산 결과가 가장 큰 것을 찾아 기호를 써 보세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const questionListData = [
    {
      number: 'ㄱ',
      question: '516-231',
    },
    {
      number: 'ㄴ',
      question: '892-585',
    },
    {
      number: 'ㄷ',
      question: '637-391',
    },
  ];

  const isBtnDisabled = () => {
    return !isNotEmptyString(cardData.p01.answer);
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect = isAnswer(cardData.p01.answer, cardData.p01.solution);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value } }));
    changeData('P01', 1, 1, value);
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={handleSubmit}
      submitLabel={!cardData.p01.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={isBtnDisabled()}
      submitBtnColor={
        isBtnDisabled()
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p01.isSubmitted || !showAnswer
          ? EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.DEFAULT
      }
      useRound
      vAlign='start'
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box type='dashed' padding='20px' useRound display='flex' justifyContent='space-around' width='682px'>
          {questionListData.map(value => (
            <Box vAlign='center'>
              <Label value={value?.number} />
              <Box marginLeft='8px'>
                <Typography>{value?.question}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box marginTop='24px'>
          <List align='horizontal' gap={0} data={questionListData}>
            <Input
              name='value'
              value={cardData.p01.answer}
              width='52px'
              maxLength={1}
              placeholder=''
              onChange={handleChange}
              status={
                !isNotEmptyString(cardData.p01.answer)
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer, cardData.p01.solution)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p01.isSubmitted}
              ariaLabel='답란'
            />
          </List>
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={showAnswer} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box marginTop='12px' gap={'20px'}>
              <Typography>
                <Label value='ㄴ' />
              </Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box marginTop='12px' gap={'20px'}>
              <Typography>
                <Label value='ㄱ' /> 516-231=285 <Label value='ㄴ' /> 892-585=307 <Label value='ㄷ' /> 637-391=246
              </Typography>
              <Typography>
                <SvgIcon size='38px' src={arrow} />
                307{'>'}285{'>'}246 이므로 계산 결과가 가장 큰 것은 <Label value='ㄴ' />
                입니다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
