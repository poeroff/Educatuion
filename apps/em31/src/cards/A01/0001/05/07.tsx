import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Input, Label, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { A01_0001_05 } from './store';
import { checkAnswers, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { DialogContainer } from '@maidt-cntn/ui/math';

const P07 = () => {
  const pageKey = 'P07';
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0001_05);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: <>과일 가게에 사과가 67개 있었는데 38개를 팔았습니다. 남은 사과는 몇 개인가요?</>,
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(show => !show);
      return;
    }
    const results = checkAnswers(cardData[pageKey].answer, cardData[pageKey].solution);
    const isCorrect = results.every(item => item);

    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        isSubmitted: true,
        isListCorrect: results,
        isCorrect,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].answer[0],
            isCorrect: results[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData[pageKey].answer[1],
            isCorrect: results[1],
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData.map((item: { value: string }) => item.value) || cardData[pageKey].answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isListCorrect: isSubmitted ? userSubmissionList[0].inputData.map((item: { isCorrect: boolean }) => item.isCorrect) : Array(2).fill(false),
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const newAnswer = cardData[pageKey].answer.map((item, idx) => (subKey === idx + 1 ? value : item));
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: newAnswer,
      },
    }));
    changeData(pageKey, 1, subKey, value);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <DialogContainer
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      bodyId='targetContainer-1'
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData[pageKey].answer.every(item => isNotEmptyString(item))
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={cardData[pageKey].answer.some(item => !isNotEmptyString(item))}
      onSubmit={handleSubmit}
    >
      <Box hAlign='center' vAlign='flex-start' width='880px' padding='20px 0 0 20px'>
        <Box>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              status={
                !cardData[pageKey].answer[0] ? 'default' : cardData[pageKey].isSubmitted && !cardData[pageKey].isListCorrect[0] ? 'error' : 'enable'
              }
              readOnly={cardData[pageKey].isSubmitted}
              minWidth='296px'
              marginLeft={12}
              textAlign='center'
              value={cardData[pageKey].answer[0]}
              onChange={e => handleChange(1, e.target.value.replace(/\s/gi, ''))}
              ariaLabel='남은 사과를 구하는 식'
              maxLength={12}
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              type='number'
              status={
                !cardData[pageKey].answer[1] ? 'default' : cardData[pageKey].isSubmitted && !cardData[pageKey].isListCorrect[1] ? 'error' : 'enable'
              }
              readOnly={cardData[pageKey].isSubmitted}
              width='124px'
              marginLeft={12}
              textAlign='center'
              value={cardData[pageKey].answer[1]}
              onChange={e => handleChange(2, e.target.value.trim())}
              ariaLabel='답란'
              maxLength={4}
            />
            <Typography>개</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet
        height='50%'
        show={isShow}
        bottomSheetTargetId='targetContainer-1'
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' marginRight='20px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>67-38=29, 29</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>(전체 사과 수)-(판 사과 수) = 67-38=29(개)</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P07;
