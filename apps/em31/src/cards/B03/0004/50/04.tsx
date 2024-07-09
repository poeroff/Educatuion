import arrow from '@/assets/icon/v_arrow.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  SvgIcon,
  Tag,
  Typography,
  Image,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B03_0004_50 } from './store';

const P04 = () => {
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(B03_0004_50);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={4} />
        나눗셈식을 곱셈식 2개로 나타내 보세요.
      </>
    ),
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
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

  const isAnswerUnfilled = () => {
    let flag = false;
    cardData.p04.answer.forEach(ans => {
      if (!isNotEmptyString(ans)) {
        flag = true;
      }
    });
    return flag;
  };

  const setSubmitBtnColor = () => {
    if (isAnswerUnfilled()) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (isShow) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  const setSubmitLabel = () => {
    if (cardData.p04.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p04.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p04.isSubmitted) {
      setShow(show => !show);
      return;
    }

    const isCorrect = cardData.p04.answer[0] === cardData.p04.solution[0] && cardData.p04.answer[1] === cardData.p04.solution[1];

    setCardData(prev => ({
      ...prev,
      p04: {
        ...prev.p04,
        isCorrect: isCorrect,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer[0],
            isCorrect: isCorrect,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p04.answer[1],
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];

    submitDataWithResult('P04', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: [userSubmissionList[0].inputData[0]?.value, userSubmissionList[0].inputData[1]?.value] || cardData.p04.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const answerList = [...cardData.p04.answer];
    answerList[subKey - 1] = value;

    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: answerList } }));
    changeData('P04', 1, subKey, value);
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      useRound
      vAlign='start'
    >
      <Box display='flex' hAlign='center'>
        <Box background='yellow' minWidth='329px' useRound hAlign='center'>
          <MathExpression equation={'$35\\div7=5$'} />
        </Box>

        <SvgIcon src={arrow} width='140px' height='124px' />

        <Box>
          <Box type='dashed' useRound hAlign='center' padding='24px'>
            <MathExpression equation={'$7\\times5=$'} />
            <Input
              width='121px'
              maxLength={2}
              status={
                !cardData.p04.answer[0]
                  ? InputStatus.DEFAULT
                  : cardData.p04.isSubmitted && cardData.p04.isSubmitted && cardData.p04.answer[0] !== cardData.p04.solution[0]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p04.isSubmitted}
              value={cardData.p04.answer[0]}
              onChange={e => handleChange(1, e.target.value.trim())}
              ariaLabel='7 곱하기 5의 몫'
              type='number'
            />
          </Box>
          <Box type='dashed' useRound hAlign='center' padding='24px' marginTop='44px'>
            <MathExpression equation={'$5\\times7=$'} />
            <Input
              width='121px'
              maxLength={2}
              status={
                !cardData.p04.answer[1]
                  ? InputStatus.DEFAULT
                  : cardData.p04.isSubmitted && cardData.p04.isSubmitted && cardData.p04.answer[1] !== cardData.p04.solution[1]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p04.isSubmitted}
              value={cardData.p04.answer[1]}
              onChange={e => handleChange(2, e.target.value.trim())}
              ariaLabel='5 곱하기 7의 몫'
              type='number'
            />
          </Box>
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>35, 35</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Box display={'flex'} flexDirection={'row'} gap={'100px'}>
                <MathExpression equation={'$35\\div7=5$'} />
                <MathExpression equation={'$35\\div7=5$'} />
              </Box>
              <Box display='flex' flexDirection={'row'} gap={'120px'} padding={'10px'}>
                <Image src={'/B03/0004/50/B-EM31-03-0004-5003(1).png'} width='110px' height='70px' />
                <Image src={'/B03/0004/50/B-EM31-03-0004-5001(2).png'} width='110px' height='70px' />
              </Box>
              <Box display='flex' flexDirection={'row'} gap={'100px'}>
                <MathExpression equation={'$7\\times5=35$'} />
                <MathExpression equation={'$5\\times7=35$'} />
              </Box>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default P04;
