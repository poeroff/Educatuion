import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Button,
  Input,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  BottomSheet,
  EStyleFontSizes,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L03C06A03 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';

const P02 = () => {
  const pageNo = 'P02';
  const pageKey = 'p02';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A03);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);
  const [isShowModal, setShowModal] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Tuning Out: The Science of Noise-Cancellation (1)',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Q1. What are some examples of noise pollution, and how can we address them?',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: mainKey,
      inputData: [
        {
          subKey: subKey,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const onSubmit = () => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: mainKey,
        inputData: [
          {
            subKey: subKey,
            type: 'TEXT_LIST',
            value: cardData[pageKey].answers,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData(pageNo, userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answers: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answers,
            isSubmitted,
          },
        }));
      }

      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleInputChangeEvent = (value: string, index: number) => {
    const newAnswers = [...cardData[pageKey].answers];
    newAnswers[index] = truncateToMaxBytes(value);

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answers: newAnswers } }));
    changeData(pageNo, 1, 1, newAnswers);
  };

  return (
    <>
      <Container
        headerInfo={headerInfo}
        questionInfo={questionInfo}
        vAlign={'flex-start'}
        submitBtnColor={
          isNotEmptyString(cardData[pageKey].answers[0]) && isNotEmptyString(cardData[pageKey].answers[1])
            ? isShow
              ? EStyleButtonTypes.DEFAULT
              : EStyleButtonTypes.PRIMARY
            : EStyleButtonTypes.SECONDARY
        }
        submitDisabled={isNotEmptyString(cardData[pageKey].answers[0]) && isNotEmptyString(cardData[pageKey].answers[1]) ? false : true}
        submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
        onSubmit={() => {
          if (cardData[pageKey].isSubmitted) {
            setShow(prev => !prev);
          } else {
            onSubmit();
          }
        }}
      >
        <Box background={'white'} useRound vAlign='center' marginTop={'30px'} hAlign='center'>
          <Input
            value={cardData[pageKey].answers[0]}
            placeholder='내용을 넣어 주세요.'
            width='345px'
            inputSize='x-small'
            maxLength={2000}
            tabIndex={101}
            ariaLabel='1번 답란'
            readOnly={cardData[pageKey].isSubmitted}
            onChange={e => handleInputChangeEvent(e.target.value, 0)}
          />
          <Typography useGap={true}> , but we can </Typography>
          <Input
            value={cardData[pageKey].answers[1]}
            placeholder='내용을 넣어 주세요.'
            width='345px'
            inputSize='x-small'
            maxLength={2000}
            tabIndex={102}
            ariaLabel='2번 답란'
            readOnly={cardData[pageKey].isSubmitted}
            onChange={e => handleInputChangeEvent(e.target.value, 1)}
          />
        </Box>

        <Dialog
          isShow={isShowModal}
          width={893}
          height={458}
          topHeight={50}
          tabIndex={104}
          useHeader
          header={() => (
            <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
              <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
                Tuning Out: The Science of Noise-Cancellation (1)
              </Typography>
            </Box>
          )}
          useFooter
          onClose={() => setShowModal(false)}
          closeLabel='닫기'
        >
          <Typography>
            Which is the better environment for studying: a noisy place or a quiet place? Rarely do people want to put up with a lot of noise because
            it can be unpleasant and distracting. Fortunately, scientists have invented noise-cancelling technology, which is now being used across
            various fields to reduce unwanted noise. What is the scientific principle behind this achievement? To understand this, let’s examine how
            sound travels.
          </Typography>
        </Dialog>

        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='모범답안' />
            </Box>
            <Box marginTop='12px'>
              <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
                Highways are noisy because of cars
              </Typography>
              <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
                , but we can
              </Typography>{' '}
              <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
                put up some walls to reduce
              </Typography>
              <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
                the noise.
              </Typography>
            </Box>
          </Box>
        </BottomSheet>
      </Container>
      <SubmitBtn>
        <Button
          width='152px'
          tabIndex={103}
          color={EStyleButtonTypes.SECONDARY}
          size={EStyleSizes['XX-SMALL']}
          onClick={() => setShowModal(prev => !prev)}
          useRound
        >
          지문 보기
        </Button>
      </SubmitBtn>
    </>
  );
};

export default P02;

export const SubmitBtn = styled.div`
  display: flex;
  position: absolute;
  right: 200px;
  bottom: 8px;
`;
