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
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { B01_0005_70 } from './store';
import arrow from '@/assets/icon/arrow_right.svg';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(B01_0005_70);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        계산 결과가 큰 것부터 차례로 기호를 써 보세요.
      </>
    ),
  };

  const questionListData = [
    {
      number: 'ㄱ',
      question: '438-126',
    },
    {
      number: 'ㄴ',
      question: '947-613',
    },
    {
      number: 'ㄷ',
      question: '845-535',
    },
  ];

  const isBtnDisabled = () => {
    return !isNotEmptyString(cardData.p01.answer1);
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
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect1 = cardData.p01.solution1 === cardData.p01.answer1.trim();
      const isCorrect2 = cardData.p01.solution2 === cardData.p01.answer2.trim();
      const isCorrect3 = cardData.p01.solution3 === cardData.p01.answer3.trim();

      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    }
    changeData('P01', 1, subKey, value);
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

  const isAnswerAllFull = () => {
    if (!isNotEmptyString(cardData.p01.answer1) || !isNotEmptyString(cardData.p01.answer2) || !isNotEmptyString(cardData.p01.answer3)) {
      return true;
    } else {
      return false;
    }
  };

  const setSubmitBtnColor = () => {
    if (isAnswerAllFull()) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (showAnswer) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={handleSubmit}
      submitLabel={!cardData.p01.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={isBtnDisabled()}
      submitBtnColor={setSubmitBtnColor()}
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
            <Box display='flex' flexWrap='wrap'>
              <Box>
                <Input
                  name='value'
                  value={cardData.p01.answer1}
                  width='52px'
                  maxLength={1}
                  placeholder=''
                  onChange={event => handleChange(1, event.target.value)}
                  status={
                    !cardData.p01.isSubmitted
                      ? InputStatus.ENABLE
                      : cardData.p01.solution1 === cardData.p01.answer1.trim()
                      ? InputStatus.ENABLE
                      : InputStatus.ERROR
                  }
                  readOnly={cardData.p01.isSubmitted}
                  ariaLabel='답란'
                />
                ,
              </Box>
              <Box marginLeft={'10px'}>
                <Input
                  name='value'
                  value={cardData.p01.answer2}
                  width='52px'
                  maxLength={1}
                  placeholder=''
                  onChange={event => handleChange(2, event.target.value)}
                  status={
                    !cardData.p01.isSubmitted
                      ? InputStatus.ENABLE
                      : cardData.p01.solution2 === cardData.p01.answer2.trim()
                      ? InputStatus.ENABLE
                      : InputStatus.ERROR
                  }
                  readOnly={cardData.p01.isSubmitted}
                  ariaLabel='답란'
                />
                ,
              </Box>

              <Box marginLeft={'10px'}>
                <Input
                  name='value'
                  value={cardData.p01.answer3}
                  width='52px'
                  maxLength={1}
                  placeholder=''
                  onChange={event => handleChange(3, event.target.value)}
                  status={
                    !cardData.p01.isSubmitted
                      ? InputStatus.ENABLE
                      : cardData.p01.solution3 === cardData.p01.answer3.trim()
                      ? InputStatus.ENABLE
                      : InputStatus.ERROR
                  }
                  readOnly={cardData.p01.isSubmitted}
                  ariaLabel='답란'
                />
              </Box>
            </Box>
          </List>
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={showAnswer} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box marginTop='12px' gap={'20px'}>
              <Typography>
                <Label value='ㄴ' />, <Label value='ㄱ' />, <Label value='ㄷ' />
              </Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box marginTop='12px' gap={'20px'}>
              <Typography>
                <Label value='ㄱ' /> 516-231=312, <Label value='ㄴ' /> 892-585=334, <Label value='ㄷ' /> 637-391=310
              </Typography>
              <Typography>
                <SvgIcon size='38px' src={arrow} />
                334{'>'}312{'>'}310이므로 계산 결과가 큰 것부터 차례로 기호를 쓰면 <Label value='ㄴ' />, <Label value='ㄱ' />, <Label value='ㄷ' />
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
