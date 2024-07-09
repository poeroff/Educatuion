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

const P03 = () => {
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(B03_0004_50);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        나눗셈식을 곱셈식 2개로 나타내 보세요.
      </>
    ),
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
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
    cardData.p03.answer.forEach(ans => {
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
    if (cardData.p03.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p03.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(show => !show);
      return;
    }

    const isCorrect = cardData.p03.answer[0] === cardData.p03.solution[0] && cardData.p03.answer[1] === cardData.p03.solution[1];

    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
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
            value: cardData.p03.answer[0],
            isCorrect: isCorrect,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p03.answer[1],
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];

    submitDataWithResult('P03', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: [userSubmissionList[0].inputData[0]?.value, userSubmissionList[0].inputData[1]?.value] || cardData.p03.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const answerList = [...cardData.p03.answer];
    answerList[subKey - 1] = value;

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: answerList } }));
    changeData('P03', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
          <MathExpression equation={'$24\\div6=4$'} />
        </Box>

        <SvgIcon src={arrow} width='140px' height='124px' />

        <Box>
          <Box type='dashed' useRound hAlign='center' padding='24px'>
            <MathExpression equation={'$6\\times4=$'} />
            <Input
              width='121px'
              maxLength={2}
              status={
                !cardData.p03.answer[0]
                  ? InputStatus.DEFAULT
                  : cardData.p03.isSubmitted && cardData.p03.isSubmitted && cardData.p03.answer[0] !== cardData.p03.solution[0]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p03.isSubmitted}
              value={cardData.p03.answer[0]}
              onChange={e => handleChange(1, e.target.value.trim())}
              ariaLabel='6 곱하기 4의 몫'
              type='number'
            />
          </Box>
          <Box type='dashed' useRound hAlign='center' padding='24px' marginTop='44px'>
            <MathExpression equation={'$4\\times6=$'} />
            <Input
              width='121px'
              maxLength={2}
              status={
                !cardData.p03.answer[1]
                  ? InputStatus.DEFAULT
                  : cardData.p03.isSubmitted && cardData.p03.isSubmitted && cardData.p03.answer[1] !== cardData.p03.solution[1]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p03.isSubmitted}
              value={cardData.p03.answer[1]}
              onChange={e => handleChange(2, e.target.value.trim())}
              ariaLabel='4 곱하기 6의 몫'
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
              <Typography>24, 24</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Box display={'flex'} flexDirection={'row'} gap={'100px'}>
                <MathExpression equation={'$24\\div6=4$'} />
                <MathExpression equation={'$24\\div6=4$'} />
              </Box>
              <Box display='flex' flexDirection={'row'} gap={'120px'} padding={'10px'}>
                <Image src={'/B03/0004/50/B-EM31-03-0004-5003(1).png'} width='110px' height='70px' />
                <Image src={'/B03/0004/50/B-EM31-03-0004-5001(2).png'} width='110px' height='70px' />
              </Box>
              <Box display='flex' flexDirection={'row'} gap={'100px'}>
                <MathExpression equation={'$6\\times4=24$'} />
                <MathExpression equation={'$4\\times6=24$'} />
              </Box>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default P03;
