import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ExampleBox, Container } from '@maidt-cntn/ui/en';
import { Input, Recorder, Typography, TMainHeaderInfoTypes, Box, BoxWrap, Question, EStyleButtonTypes } from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L03C03A03 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const currentPage = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A03);
  const { userId } = useRecoilValue(studentAtom);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn (Step 2)',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Write and talk about an innovative item that you have recently seen.',
  };

  const formerInputRef = useRef<HTMLInputElement>(null);
  const latterInputRef = useRef<HTMLInputElement>(null);
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
          value: false,
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: ['', ''],
        },
        {
          subKey: 3,
          type: 'RECORDER',
          value: {},
        },
      ],
    },
  ];

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            isSubmitted,
            isDoneRecord1: userSubmissionList[0].inputData[0]?.value || cardData.p02.isDoneRecord1,
            answer: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer,
            audioData: [userSubmissionList[0].inputData[2]?.value] || cardData.p02.audioData,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newAnswer = [...cardData.p02.answer];
    newAnswer[index] = event.target.value;

    const value = event.target.value;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: prev.p02.answer.map((item, idx) => (idx === index ? value : item)) } }));
    changeData(currentPage, 1, 2, newAnswer);
  };

  useEffect(() => {
    if (formerInputRef.current) {
      formerInputRef.current.style.width = 'auto';
      formerInputRef.current.style.width = `${formerInputRef.current.scrollWidth}px`;
      formerInputRef.current.style.maxWidth = '650px';
    }

    if (latterInputRef.current) {
      latterInputRef.current.style.width = 'auto';
      latterInputRef.current.style.width = `${latterInputRef.current.scrollWidth}px`;
      latterInputRef.current.style.maxWidth = '650px';
    }
  }, [cardData.p02.answer]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={
        cardData.p02.answer.some(item => item === '') || cardData.p02.isDoneRecord1 === false || cardData.p02.isSubmitted
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={cardData.p02.answer.some(item => item === '') || cardData.p02.isDoneRecord1 === false || cardData.p02.isSubmitted}
      onSubmit={() => {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
        const userSubmission: userSubmissionType[] = [
          {
            mainKey: 1,
            inputData: [
              {
                subKey: 1,
                type: 'BOOLEAN',
                value: cardData.p02.isDoneRecord1,
              },
              {
                subKey: 2,
                type: 'TEXT_LIST',
                value: cardData.p02.answer,
              },
              {
                subKey: 3,
                type: 'RECORDER',
                value: cardData.p02.audioData[0],
              },
            ],
          },
        ];
        submitData(currentPage, userSubmission);
      }}
    >
      <ExampleBox color={'emerald'} title={'Innovative Items'}>
        <Question type={'dot'} size='small'>
          <Typography useGap={false}>Have you heard of</Typography>
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            &nbsp;a washable keyboard
          </Typography>
          <Typography useGap={false}>?</Typography>
        </Question>
        <Box>
          <Typography useGap={false}>&nbsp;&nbsp;&nbsp;&nbsp;You can</Typography>
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            &nbsp;wash it with water as it’s waterproof
          </Typography>
          <Typography useGap={false}>.</Typography>
        </Box>
      </ExampleBox>
      <Box marginTop='20px' vAlign='flex-start' paddingLeft={'14px'}>
        <Question type={'dot'} size='small'>
          Have you heard of
          <Input
            width='auto'
            minWidth={'420px'}
            textAlign='start'
            placeholder=' e.g. a 3D printing pen '
            ariaLabel='1번 답 입력란'
            value={cardData.p02.answer[0]}
            onChange={e => handleInputChange(0, e)}
            maxLength={40}
            inputRef={formerInputRef}
            marginLeft={20}
            inputSize='x-small'
            readOnly={cardData.p02.isSubmitted}
          />
          ?
        </Question>
      </Box>
      <Box alignItems='start' vAlign='flex-start' hAlign='left'>
        <Question type='text' size='small'>
          &nbsp;&nbsp;&nbsp;&nbsp;You can
          <Input
            width='auto'
            minWidth={'450px'}
            textAlign='start'
            placeholder=' e.g. draw and create 3D objects'
            ariaLabel='2번 답 입력란'
            value={cardData.p02.answer[1]}
            onChange={e => handleInputChange(1, e)}
            maxLength={65}
            inputRef={latterInputRef}
            marginLeft={20}
            inputSize='x-small'
            readOnly={cardData.p02.isSubmitted}
          />
        </Question>
      </Box>
      <BoxWrap justifyContent={'center'} marginTop={'20px'}>
        <Recorder
          readOnly={cardData.p02.isSubmitted}
          initialData={cardData.p02.audioData?.[0]}
          recorderIndex={0}
          onSubmit={audioData => {
            setCardData(prev => ({
              ...prev,
              p02: {
                ...prev.p02,
                isDoneRecord1: true,
              },
            }));
            changeData(currentPage, 1, 1, true);
            const userInputs = [...cardData.p02.audioData];
            userInputs[0] = audioData;
            setCardData(prev => ({
              ...prev,
              p02: {
                ...prev.p02,
                audioData: userInputs,
              },
            }));
            changeData(currentPage, 1, 3, audioData);
          }}
          onRefresh={() => {
            setCardData(prev => ({
              ...prev,
              p02: {
                ...prev.p02,
                isDoneRecord1: false,
              },
            }));
            changeData(currentPage, 1, 1, false);
            setCardData(prev => ({
              ...prev,
              p02: {
                ...prev.p02,
                audioData: [{}],
              },
            }));
            changeData(currentPage, 1, 3, {});
          }}
        />
      </BoxWrap>
    </Container>
  );
};

export default P02;
