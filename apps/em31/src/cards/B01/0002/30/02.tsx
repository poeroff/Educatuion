import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  List,
  SvgIcon,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import arrow from '../../../../assets/icon/arrow_right.svg';
import { B01_0002_30 } from './store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B01_0002_30);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState(false);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />두 수를 골라 합이 596인 덧셈식을 만들어 보세요.
      </>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];

  const onSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }

    const isCorrect: boolean =
      (cardData.p02.answer1.value === '243' || cardData.p02.answer1.value === '353') &&
      (cardData.p02.answer2.value === '243' || cardData.p02.answer2.value === '353');

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer1: {
          value: cardData.p02.answer1.value,
        },
        answer2: {
          value: cardData.p02.answer2.value,
        },
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
            type: 'NUMBER',
            value: cardData.p02.answer1.value,
          },
          {
            subKey: 2,
            type: 'NUMBER',
            value: cardData.p02.answer2.value,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: {
              value: userSubmissionList[0].inputData[0]?.value || '',
            },
            answer2: {
              value: userSubmissionList[0].inputData[1]?.value || '',
            },
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    if (cardData.p02.answer1.value && cardData.p02.answer2.value) {
      return;
    }
    if (!cardData.p02.answer1.value && value !== cardData.p02.answer2.value) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: { ...prev.p02.answer1, value } } }));
      changeData('P02', 1, 1, value);
      return;
    }
    if (!cardData.p02.answer2.value && value !== cardData.p02.answer1.value) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: { ...prev.p02.answer2, value } } }));
      changeData('P02', 1, 2, value);
    }
  };

  const popInput = (index: number) => {
    if (cardData.p02.isSubmitted) {
      return;
    }
    if (index === 0) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: { ...prev.p02.answer1, value: '' } } }));
      changeData('P02', 1, 1, 0);
    } else {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: { ...prev.p02.answer2, value: '' } } }));
      changeData('P02', 1, 2, 0);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      useRound
      vAlign='start'
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onSubmit}
      submitDisabled={!(cardData.p02.answer1.value && cardData.p02.answer2.value)}
      submitBtnColor={
        !(cardData.p02.answer1.value && cardData.p02.answer2.value)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
    >
      <BoxWrap>
        <Box useFull type='dashed' useRound padding='20px'>
          <Box background='yellow' useRound textAlign='center' marginBottom='36px' padding='16px 0'>
            <List
              gap={24}
              data={[323, 243, 351, 353, 357]}
              align='horizontal'
              row={({ value, index = 1 }) => (
                <Button
                  width='100px'
                  key={index}
                  useRound
                  onClick={() => handleChange(String(value))}
                  color={
                    cardData.p02.answer1.value === String(value) || cardData.p02.answer2.value === String(value)
                      ? EStyleButtonTypes.YELLOW
                      : EStyleButtonTypes.NORMAL
                  }
                  aria-label={`${index}번 버튼(${value})`}
                >
                  <Typography>{value}</Typography>
                </Button>
              )}
            />
          </Box>
          <Box display='flex' vAlign='center' hAlign='center'>
            <Input
              value={String(cardData.p02.answer1.value)}
              readOnly
              onClick={() => popInput(0)}
              status={
                !cardData.p02.answer1.value
                  ? InputStatus.DEFAULT
                  : cardData.p02.isSubmitted && !cardData.p02.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel={`첫번째 선택 숫자`}
            />
            <Typography>+</Typography>
            <Input
              value={String(cardData.p02.answer2.value)}
              readOnly
              onClick={() => popInput(1)}
              status={
                !cardData.p02.answer2.value
                  ? InputStatus.DEFAULT
                  : cardData.p02.isSubmitted && !cardData.p02.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel={`두번째 선택 숫자`}
            />
            <Typography>= 596</Typography>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' gap='8px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography> 243, 353</Typography>
          </Box>
          <Box marginTop='12px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>두 수의 일의 자리끼리 더해서 6이 되는 경우는 323, 243, 353입니다.</Typography>
          </Box>
          <Box marginTop='12px'>
            <Typography>세 수 중에서 십의 자리끼리 더해서 9, 백의 자리끼리 더해서 5가 되는 경우는 243과 353입니다.</Typography>
          </Box>
          <Box marginTop='12px' vAlign='center'>
            <SvgIcon size='38px' src={arrow} />
            <Typography>243+353=596 또는 353+243=596</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
