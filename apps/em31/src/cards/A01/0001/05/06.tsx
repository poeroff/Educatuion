import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { IQuestionProps, EStyleButtonTypes, Box, BoxWrap, Input, BottomSheet, Tag, ETagLine, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';
import { A01_0001_05 } from './store';
import ConnectorArrow from '@/assets/example/connector_arrow.svg';
import ConnectorLine from '@/assets/example/connector_line.svg';
import { checkAnswers, isNotEmptyString, isNumber } from '@maidt-cntn/util/CommonUtil';
import { DialogContainer } from '@maidt-cntn/ui/math';

const P06 = () => {
  const pageKey = 'P06';
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
    text: <>빈칸에 알맞은 수를 써넣으세요.</>,
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
            isAnswer: true,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData[pageKey].answer[1],
            isCorrect: results[1],
            isAnswer: true,
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
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isListCorrect: isSubmitted ? userSubmissionList[0].inputData.map((item: { isCorrect: boolean }) => item.isCorrect) : Array(2).fill(false),
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (!isNumber(value)) return;
    const newAnswer = cardData[pageKey].answer.map((item, idx) => (subKey === idx + 1 ? value : item));
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newAnswer } }));
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
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              37
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>+ 28</GrayRoundBox>
            </Box>
            <Box>
              <Input
                type='number'
                status={
                  !cardData[pageKey].answer[0] ? 'default' : cardData[pageKey].isSubmitted && !cardData[pageKey].isListCorrect[0] ? 'error' : 'enable'
                }
                readOnly={cardData[pageKey].isSubmitted}
                width='130px'
                ariaLabel='37와 28의 더한 값'
                value={cardData[pageKey].answer[0]}
                onChange={e => handleChange(1, e.target.value.trim())}
                maxLength={3}
              />
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>- 19</GrayRoundBox>
            </Box>
            <Box>
              <Input
                type='number'
                status={
                  !cardData[pageKey].answer[1] ? 'default' : cardData[pageKey].isSubmitted && !cardData[pageKey].isListCorrect[1] ? 'error' : 'enable'
                }
                readOnly={cardData[pageKey].isSubmitted}
                width='130px'
                ariaLabel='37와 28의 더한 값에 19을 뺀 값'
                value={cardData[pageKey].answer[1]}
                onChange={e => handleChange(2, e.target.value.trim())}
                maxLength={3}
              />
            </Box>
          </BoxWrap>
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
              <Typography>37+28=65, 65-19=46</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

const GrayRoundBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-100);
  min-width: 120px;
  height: 52px;
  padding: 4px 12px;
  border-radius: 80px;
  margin-top: -140px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -30px;
    top: 50%;
    width: 26px;
    height: 42px;
    background: url(${`"${ConnectorLine}"`}) no-repeat;
    background-size: contain;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    right: -40px;
    top: 50%;
    width: 35px;
    height: 46px;
    background: url(${`"${ConnectorArrow}"`}) no-repeat;
    background-size: contain;
  }
`;

export default P06;
