import {
  Box,
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  Typography,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  List,
  Symbol,
  BoxWrap,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { C02_0005_10 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { DialogContainer } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';

const P02 = ({ pageKey = 'P02' }: { pageKey?: string }) => {
  const storeKey = 'P02';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C02_0005_10);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const isDisabled = cardData[storeKey].answer.every(answer => !answer);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='2' type='icon' />
        시계의 긴바늘과 짧은바늘이 이루는 작은 쪽의 각이 직각인 시각을 모두 찾아 ○표 하세요.
      </>
    ),
    mark: cardData[storeKey].isSubmitted ? (cardData[storeKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleOnClick = (index: number) => {
    const mark = cardData[storeKey].answer[index] === '' ? 'O' : '';
    const answer = cardData[storeKey].answer.map((m, i) => (i === index ? mark : m));

    setCardData(prev => ({
      ...prev,
      [storeKey]: {
        ...prev[storeKey],
        answer: answer,
      },
    }));
    changeData(pageKey, 1, 1, answer);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData[storeKey].isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect = cardData[storeKey].answer.every((answer, index) => answer === cardData[storeKey].solution[index]);

      setCardData(prev => ({ ...prev, [storeKey]: { ...prev[storeKey], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData[storeKey].answer,
              isAnswer: true,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageKey, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [storeKey]: {
            ...prev[storeKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[storeKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, [pageKey]);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <DialogContainer
      bodyId='targetContainer2'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[storeKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={handleSubmit}
      vAlign='flex-start'
    >
      <BoxWrap>
        <Box display='flex' vAlign='center' flexDirection='column' useFull>
          <Box flexDirection='column' vAlign='center' marginTop='50px'>
            <List
              data={['1시', '3시', '4시', '9시']}
              align='horizontal'
              gap={50}
              row={({ value, index = 1 }) => (
                <Box>
                  <Box hAlign='center' width='150px' height='60px' background='var(--color-green-100)' useRound>
                    <Typography>{value}</Typography>
                  </Box>
                  <Box hAlign='center' width='150px' marginTop='15px'>
                    <Typography>(</Typography>
                    <CircleCheck disabled={cardData[storeKey].isSubmitted} onClick={() => handleOnClick(index - 1)}>
                      {cardData[storeKey].answer[index - 1] === 'O' && <Symbol type='correct' />}
                    </CircleCheck>
                    <Typography>)</Typography>
                  </Box>
                </Box>
              )}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer2' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <List
              data={['', '', '', '']}
              align='horizontal'
              gap={50}
              row={({ value, index = 1 }) => (
                <Box>
                  <Box hAlign='center' width='140px' marginTop='15px'>
                    <Typography>(</Typography>
                    <CircleCheck disabled>{cardData[storeKey].solution[index - 1] === 'O' && <Symbol type='correct' />}</CircleCheck>
                    <Typography>)</Typography>
                  </Box>
                </Box>
              )}
            />
          </Box>
          <Box marginTop='10px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='풀이' />
            </Box>
            <Box marginTop='12px'>
              <Typography usePre>{cardData[storeKey].commentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

const CircleCheck = styled.button`
  width: 140px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default P02;
