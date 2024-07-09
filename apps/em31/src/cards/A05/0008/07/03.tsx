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
  Input,
  Label,
  List,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import arrow from '@maidt-cntn/assets/icons/arrow_right.svg';
import { A05_0008_07 } from './store';
import { DialogContainer } from '@maidt-cntn/ui/math';

const P03 = () => {
  const { changeData, initData, submitDataWithResult } = usePageData();
  const [cardData, setCardData] = useRecoilState(A05_0008_07);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState(false);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'basic',
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
    if (cardData.p03.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    const isCorrect =
      (cardData.p03.answer1.value === '243' && cardData.p03.answer2.value === '353') ||
      (cardData.p03.answer1.value === '353' && cardData.p03.answer2.value === '243');
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer1: {
          value: cardData.p03.answer1.value,
          isCorrect: isCorrect,
        },
        answer2: {
          value: cardData.p03.answer2.value,
          isCorrect: isCorrect,
        },
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
            value: cardData.p03.answer1.value,
            isCorrect,
          },
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p03.answer2.value,
            isCorrect,
          },
        ],
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
            answer1: {
              value: userSubmissionList[0].inputData[0]?.value || '',
              isCorrect: isSubmitted ? userSubmissionList[0].inputData[0].isCorrect : false,
            },
            answer2: {
              value: userSubmissionList[0].inputData[1]?.value || '',
              isCorrect: isSubmitted ? userSubmissionList[0].inputData[1].isCorrect : false,
            },
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    if (cardData.p03.answer1.value && cardData.p03.answer2.value) {
      return;
    }
    if (!cardData.p03.answer1.value && value !== cardData.p03.answer2.value) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: { ...prev.p03.answer1, value } } }));
      changeData('P03', 1, 1, value);
      return;
    }
    if (!cardData.p03.answer2.value && value !== cardData.p03.answer1.value) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: { ...prev.p03.answer2, value } } }));
      changeData('P03', 1, 2, value);
    }
  };

  const popInput = (index: number) => {
    if (cardData.p03.isSubmitted) {
      return;
    }
    if (index === 0) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: { ...prev.p03.answer1, value: '' } } }));
      changeData('P03', 1, 1, 0);
    } else {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: { ...prev.p03.answer2, value: '' } } }));
      changeData('P03', 1, 2, 0);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <DialogContainer
      headerInfo={headerInfo}
      questionInfo={{
        type: 'icon',
        text: (
          <>
            <Label type='icon' size='small' value={2} />
            임시페이지
          </>
        ),
        mark: cardData.p03.isSubmitted ? (cardData.p03.answer1.isCorrect && cardData.p03.answer2.isCorrect ? 'correct' : 'incorrect') : 'none',
      }}
      bodyId='targetContainer3'
      submitLabel={cardData.p03.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        !(cardData.p03.answer1.value && cardData.p03.answer2.value)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={onSubmit}
      submitDisabled={!(cardData.p03.answer1.value && cardData.p03.answer2.value)}
    >
      <BoxWrap boxGap={24} justifyContent='center'>
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
                    cardData.p03.answer1.value === String(value) || cardData.p03.answer2.value === String(value)
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
              value={String(cardData.p03.answer1.value)}
              readOnly
              onClick={() => popInput(0)}
              status={!cardData.p03.answer1.value ? 'default' : cardData.p03.isSubmitted && !cardData.p03.answer1.isCorrect ? 'error' : 'enable'}
              ariaLabel={`첫번째 선택 숫자`}
            />
            <Typography>+</Typography>
            <Input
              value={String(cardData.p03.answer2.value)}
              readOnly
              onClick={() => popInput(1)}
              status={!cardData.p03.answer2.value ? 'default' : cardData.p03.isSubmitted && !cardData.p03.answer2.isCorrect ? 'error' : 'enable'}
              ariaLabel={`두번째 선택 숫자`}
            />
            <Typography>= 596</Typography>
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer3' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' gap='8px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography> 243, 353</Typography>
          </Box>
          <Box marginTop='12px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            <Typography>두 수의 일의 자리끼리 더해서 6이 되는 경우는 323, 243, 353입니다.</Typography>
          </Box>
          <Box marginTop='12px'>
            <Typography>세 수 중에서 십의 자리끼리 더해서 9, 백의 자리끼리 더해서 5가 되는 경우는 243과 353입니다.</Typography>
          </Box>
          <Box marginTop='12px' vAlign='center'>
            <SvgIcon size='38px' src={arrow} />
            <Typography>243+353=596 또는 353+243=595</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P03;
