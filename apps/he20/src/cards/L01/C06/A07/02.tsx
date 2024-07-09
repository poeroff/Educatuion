import {
  Question,
  TMainHeaderInfoTypes,
  Input,
  Typography,
  Box,
  SvgIcon,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  IQuestionProps,
  Button,
  Dialog,
  InputStatus,
  EStyleSizes,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useRef, useState } from 'react';
import { textContentA07 } from './commonData';
import arrowRight from '@/assets/icon/arrow_right.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C06A07 } from './store';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const { title, header, content } = textContentA07;
  const pageKey = 'P02';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A07);
  const [isAnswerOpen, setAnswerOpen] = useState<boolean>(false);
  const isAllFilled = useMemo(() => cardData[pageKey].answer.every(value => value), [cardData[pageKey].answer]);

  const defaultInputData: inputDatasType[] = cardData[pageKey].answer.map((value, index) => ({
    subKey: index + 1,
    type: 'TEXT',
    value: value,
    isAnswer: false,
  }));

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: defaultInputData,
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
            answer: userSubmissionList[0].inputData.map((item: { value: string }) => item.value),
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isCorrectInput: userSubmissionList[0].inputData.map((item: { isCorrect: boolean }) => item.isCorrect),
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData[pageKey].isSubmitted) {
      setAnswerOpen(!isAnswerOpen);
      return;
    }
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));

    const inputData: inputDatasType[] = cardData[pageKey].answer.map((value, idx) => ({
      subKey: idx + 1,
      type: 'TEXT',
      value: value,
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: inputData,
        isCorrect: true,
      },
    ];
    submitData(pageKey, userSubmission);
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

  const [isAnswerOpenText, setShowText] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary (5)',
  };
  const questionInfo: IQuestionProps = {
    text: (
      <>
        <Typography useGap={false} style={{ fontWeight: 'var(--font-weight-extraBold)', fontSize: '32px' }}>
          Q5.
        </Typography>
        {' Fill in the blanks to answer the question.'}
      </>
    ),
    size: 'medium',
    mark: 'none',
  };

  const checkStatus = (index: number) => {
    return !cardData[pageKey].isSubmitted && cardData[pageKey].answer[index] ? InputStatus.ENABLE : InputStatus.DEFAULT;
  };

  const selectBtnColor = () => {
    if (cardData[pageKey].isSubmitted) {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAllFilled ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
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

  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const dialogHeader = () => {
    return (
      <Box border={'none'} background={'gray'} height='50px' marginBottom='20px' useRound useFull>
        <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
          {title}
        </Typography>
      </Box>
    );
  };

  return (
    <Container
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={selectBtnColor()}
      submitLabel={cardData[pageKey].isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!cardData[pageKey].isSubmitted && !isAllFilled}
      onSubmit={() => submitAnswer()}
    >
      <Box hAlign='right'>
        <Button
          minWidth='118px'
          size={EStyleSizes.SMALL}
          color={EStyleButtonTypes.SECONDARY}
          label='지문보기'
          useRound
          onClick={() => {
            lastFocusedElementRef.current = document.activeElement as HTMLElement;
            setShowText(true);
          }}
        />
      </Box>
      <Box useFull flexDirection='column' gap='48px' paddingTop='20px'>
        <Box useRound width='100%' background='white'>
          <Box>
            <Question size={'small'}>What kinds of human activities can harm animals, and what do you think about them?</Question>
          </Box>

          <Box hAlign='center' vAlign='flex-start'>
            <SvgIcon src={arrowRight} size='38px' style={{ marginTop: '8px' }} />
            <Box display='inline' useFull vAlign='center' hAlign='center'>
              <Typography useGap={false}>Activities such as </Typography>
              &nbsp;
              <Input
                key={'text-input-1'}
                value={cardData[pageKey].answer[0]}
                inputSize='x-small'
                width='450px'
                maxLength={60}
                onChange={event => handleInputChangeEvent(event.target.value, 0)}
                placeholder='내용을 넣어 주세요.'
                aria-label='1번 답란.'
                status={checkStatus(0)}
                marginLeft={0}
                readOnly={cardData[pageKey].isSubmitted}
              />
              &nbsp;
              <Typography useGap={false}>can take</Typography>
              <Typography useGap={false}>away animals’ homes. I think</Typography>
              &nbsp;
              <Input
                key={'text-input-2'}
                value={cardData[pageKey].answer[1]}
                inputSize='x-small'
                width='450px'
                maxLength={60}
                onChange={event => handleInputChangeEvent(event.target.value, 1)}
                placeholder='내용을 넣어 주세요.'
                aria-label='2번 답란.'
                status={checkStatus(1)}
                marginLeft={0}
                readOnly={cardData[pageKey].isSubmitted}
              />
              &nbsp;
              <Typography useGap={false}>.</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog
        useHeader
        tabIndex={101}
        header={dialogHeader}
        topHeight={50}
        width={921}
        height={500}
        isShow={isAnswerOpenText}
        useFooter={true}
        closeLabel='지문 닫기'
        onClose={() => {
          setShowText(false);
          if (lastFocusedElementRef.current) {
            lastFocusedElementRef.current.focus();
          }
        }}
        confirmLabel='지문 닫기'
      >
        <Typography usePre useGap={false} lineHeight={'48px'} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
          <Typography style={{ fontWeight: 'var(--font-weight-semiBold)' }}>{header}</Typography>
          {content}
        </Typography>
      </Dialog>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre useGap={false}>{`(1) ${cardData[pageKey].commentary[0]} \n(2) ${cardData[pageKey].commentary[1]} `}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
