import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Dialog,
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
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { A01_0001_05 } from './store';
import { studentAtom } from '@/stores/student';
import { checkAnswers, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import ConnectorLine from '@maidt-cntn/assets/icons/connector_line.svg';
import ConnectorArrow from '@maidt-cntn/assets/icons/connector_arrow.svg';
import P06 from './06';

const P03 = () => {
  const pageKey = 'P03';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(A01_0001_05);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [1, 2].map(subKey => ({
        subKey,
        type: 'TEXT',
        value: '',
        isAnswer: true,
      })),
      isListCorrect: cardData[pageKey].isListCorrect,
    },
  ];

  const { userId } = useRecoilValue(studentAtom);
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
            isListCorrect: isSubmitted ? userSubmissionList[0].isListCorrect : cardData[pageKey].isListCorrect,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
      return;
    }
    const results = checkAnswers(cardData[pageKey].answer, cardData[pageKey].solution);
    const isCorrect = results.every(result => result);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect, isListCorrect: results } }));

    const inputData: inputDatasType[] = cardData[pageKey].answer.map((value, idx) => ({
      subKey: idx + 1,
      type: 'TEXT',
      value: value || '',
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: inputData,
        isCorrect: isCorrect,
        isListCorrect: results,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    size: 'medium',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const checkStatus = (index: number) => {
    return cardData[pageKey].isSubmitted && !cardData[pageKey].isListCorrect[index]
      ? InputStatus.ERROR
      : isNotEmptyString(cardData[pageKey].answer[index])
      ? InputStatus.ENABLE
      : InputStatus.DEFAULT;
  };

  const handleInputChangeEvent = (value: string, index: number) => {
    const updatedAnswers = cardData[pageKey].answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: updatedAnswers,
      },
    }));
    changeData(pageKey, 1, index + 1, updatedAnswers[index]);
  };

  const sequenceNodes = ['44', '+19', '-36'];

  const inputNodes: React.ReactNode[] = [
    <Input
      type='number'
      width='130px'
      ariaLabel='44와 19의 더한 값'
      maxLength={3}
      value={cardData[pageKey].answer[0]}
      onChange={e => handleInputChangeEvent(e.target.value, 0)}
      readOnly={cardData[pageKey].isSubmitted}
      status={checkStatus(0)}
    />,
    <Input
      type='number'
      width='130px'
      ariaLabel='44와 19의 더한 값에 36의 뺀 값'
      maxLength={3}
      value={cardData[pageKey].answer[1]}
      onChange={e => handleInputChangeEvent(e.target.value, 1)}
      readOnly={cardData[pageKey].isSubmitted}
      status={checkStatus(1)}
    />,
  ];

  return (
    <Container
      useRound
      useExtend
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData[pageKey].answer.some(ans => !isNotEmptyString(ans))}
      submitBtnColor={
        cardData[pageKey].answer.every(ans => isNotEmptyString(ans))
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.GRAY
      }
      onSubmit={handleSubmit}
      useLinkLabel={cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect}
      linkLabel='맞춤 학습하기'
      onLink={() => {
        setDialogOpen(!isDialogOpen);
      }}
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              {sequenceNodes[0]}
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>{sequenceNodes[1]}</GrayRoundBox>
            </Box>
            <Box>{inputNodes[0]}</Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>{sequenceNodes[2]}</GrayRoundBox>
            </Box>
            <Box>{inputNodes[1]}</Box>
          </BoxWrap>
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
              <Typography>{cardData[pageKey].solution.join(', ')}</Typography>
            </Box>
            <Box position='relative' marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='풀이' />
              <Box>
                <Typography usePre>{cardData[pageKey].commentary}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
      <Dialog
        isShow={isDialogOpen}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setDialogOpen(false);
          saveData('P06');
        }}
        onConfirm={() => {
          setDialogOpen(false);
        }}
      >
        <P06 />
      </Dialog>
    </Container>
  );
};

export default P03;

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
