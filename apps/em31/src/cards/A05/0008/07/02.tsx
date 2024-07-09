import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, BoxWrap, EStyleButtonTypes, ETagLine, Input, Label, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A05_0008_07 } from './store';
import { DialogContainer } from '@maidt-cntn/ui/math';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
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
          type: 'TEXT',
          value: '',
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
    const isCorrect1 = isAnswer(cardData.p02.answer1.value, '352+347=699') || isAnswer(cardData.p02.answer1.value, '347+352=699');
    const isCorrect2 = cardData.p02.answer2.value === '699';
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer1: {
          ...cardData.p02.answer1,
          isCorrect: isCorrect1,
        },
        answer2: {
          ...cardData.p02.answer2,
          isCorrect: isCorrect2,
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
            type: 'TEXT',
            value: cardData.p02.answer1.value,
            isCorrect: isCorrect1,
          },
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p02.answer2.value,
            isCorrect: isCorrect2,
          },
        ],
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect1 && isCorrect2);
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
              isCorrect: isSubmitted ? userSubmissionList[0].inputData[0]?.isCorrect : false,
            },
            answer2: {
              value: userSubmissionList[0].inputData[1]?.value || '',
              isCorrect: isSubmitted ? userSubmissionList[0].inputData[1].isCorrect : false,
            },
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: { ...prev.p02.answer1, value } } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: { ...prev.p02.answer2, value } } }));
    }
    changeData('P02', 1, subKey, value);
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
            <Label type='icon' size='small' value={1} />
            임시페이지
          </>
        ),
        mark: cardData.p02.isSubmitted ? (cardData.p02.answer1.isCorrect && cardData.p02.answer2.isCorrect ? 'correct' : 'incorrect') : 'none',
      }}
      bodyId='targetContainer2'
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        !(cardData.p02.answer1.value && cardData.p02.answer2.value)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={onSubmit}
      submitDisabled={!(cardData.p02.answer1.value && cardData.p02.answer2.value)}
    >
      <BoxWrap justifyContent='center' boxGap={24}>
        <Box>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              minWidth='296px'
              marginLeft={12}
              maxLength={100}
              textAlign='center'
              value={cardData.p02.answer1.value}
              onChange={e => handleChange(1, e.target.value.replace(/\s/gi, ''))}
              ariaLabel='식을 적어주세요.'
              readOnly={cardData.p02.isSubmitted}
              status={!cardData.p02.answer1.value ? 'default' : cardData.p02.isSubmitted && !cardData.p02.answer1.isCorrect ? 'error' : 'enable'}
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              width='124px'
              marginLeft={12}
              textAlign='center'
              value={cardData.p02.answer2.value}
              onChange={e => handleChange(2, e.target.value.trim())}
              ariaLabel='답을 적어주세요.'
              readOnly={cardData.p02.isSubmitted}
              status={!cardData.p02.answer2.value ? 'default' : cardData.p02.isSubmitted && !cardData.p02.answer2.isCorrect ? 'error' : 'enable'}
            />
            <Typography>마리</Typography>
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer2' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' gap='8px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography> 352+347=699, 699</Typography>
          </Box>
          <Box marginTop='12px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            <Box>
              <Typography>(생태 습지에 있는 철새 수)+(더 날아온 철새 수)</Typography>
            </Box>
            <Typography>=352+347=699(마리)</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P02;
