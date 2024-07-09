//C-EM31-03-0005-2004
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
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B03_0005_60 } from './store';

const P03 = () => {
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(B03_0005_60);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        가장 큰 수를 가장 작은 수로 나눈 몫을 구해 보세요.
      </>
    ),
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const questionListData = [
    {
      question: '56',
    },
    {
      question: '8',
    },
    {
      question: '7',
    },
    {
      question: '63',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
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

    const isCorrect = cardData.p03.answer[0] === cardData.p03.solution[0];

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
            answer: [userSubmissionList[0].inputData[0]?.value] || cardData.p03.answer,
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
      bodyId='targetContainer8'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      background={'var(--color-white)'}
      useRound
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box type='dashed' padding='20px' useRound display='flex' justifyContent='space-around' width='682px'>
          {questionListData.map((value, index) => (
            <Box vAlign='center' key={`box-item-${index}`}>
              <Box marginLeft='8px'>
                <Typography>{value?.question}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box marginTop='24px'>
          <Input
            width='52px'
            status={
              !cardData.p03.answer[0]
                ? InputStatus.DEFAULT
                : cardData.p03.isSubmitted && cardData.p03.answer[0] !== cardData.p03.solution[0]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            readOnly={cardData.p03.isSubmitted}
            value={cardData.p03.answer[0]}
            onChange={e => handleChange(1, e.target.value)}
            ariaLabel='답을 적어주세요.'
            maxLength={1}
          />
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer8'}
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
              <Typography>9</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>가장 큰 수는 63, 가장 작은 수는 7입니다. 따라서 가장 큰 수를 가장 작은 수로 나눈 몫은 63÷7=9입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
