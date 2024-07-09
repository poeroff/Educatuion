import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Input,
  InputStatus,
  StyleReceipt,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C02A03 } from './store';

export const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const [cardData, setCardData] = useRecoilState(L02C02A03);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const [showAnswer, setShowAnswer] = useState(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: ['', '', '', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p01.answer.map(val => (Number(val) ? Number(val) : val)),
            isAnswer: true,
          },
        ],
      },
    ];
    submitDataWithResult(
      'P01',
      userSubmission,
      cardData.p01.answer.every((val, index) => val + '' === cardData.p01.solution[index]),
    );
  };

  const handleChange = (index: number, value: string) => {
    const updatedAnswers = cardData.p01.answer?.map((ans, idx) => (idx === index ? value.replace(/\s/gi, '') : ans));
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer: updatedAnswers,
      },
    }));
    changeData('P01', 1, 1, updatedAnswers);
  };

  const questionInfo: IQuestionProps = {
    text: 'Complete the bill using information from the dialogue.',
    mark: cardData.p01.isSubmitted
      ? cardData.p01.answer.every((val, index) => val + '' === cardData.p01.solution[index])
        ? 'correct'
        : 'incorrect'
      : 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/HE2-L02-C02-A03-01.mp3',
    captionSrc: '/L02/C02/A03/HE2-L02-C02-A03-01.srt',
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p01.answer.every(val => val)}
      onSubmit={submitAnswer}
      audioInfo={audioInfo}
      submitBtnColor={
        !cardData.p01.answer.every(val => val) ? EStyleButtonTypes.SECONDARY : showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      bodyId='targetContainer'
    >
      <StyleReceipt.BackgroundWrap>
        <StyleReceipt.Content>
          <StyleReceipt.TextWrap>
            <Box paddingTop='30px' paddingLeft='12px' width='422px'>
              <Typography weight={900} size={EStyleFontSizes.SMALL}>
                Item
              </Typography>
            </Box>
            <Box paddingTop='30px' width='100px' hAlign='right' marginLeft='20px'>
              <Typography weight={900} size={EStyleFontSizes.SMALL}>
                Qty
              </Typography>
            </Box>
            <Box paddingTop='30px' width='307px' hAlign='right' marginLeft='20px'>
              <Typography weight={900} size={EStyleFontSizes.SMALL}>
                Price
              </Typography>
            </Box>
          </StyleReceipt.TextWrap>
          <StyleReceipt.TextWrap>
            <Box paddingLeft='12px' width='430px' vAlign='left'>
              <StyleReceipt.ContentText weight={800}>ORGANIC COTTEN SWEATER</StyleReceipt.ContentText>
            </Box>
            <Box width='100px' hAlign='right' marginLeft='10px'>
              <StyleReceipt.ContentText weight={500}>1</StyleReceipt.ContentText>
            </Box>
            <Box width='307px' hAlign='right' marginLeft='20px'>
              <StyleReceipt.ContentText weight={500}>$50</StyleReceipt.ContentText>
            </Box>
          </StyleReceipt.TextWrap>
          <StyleReceipt.TextWrap>
            <Box paddingLeft='15px' width='553px' marginTop='12px'>
              <StyleReceipt.ContentText weight={500}>(1)</StyleReceipt.ContentText>
              <Input
                inputSize='x-small'
                value={cardData.p01.answer[0]}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleChange(0, e.target.value)}
                placeholder='내용을 넣어 주세요.'
                width='225px'
                maxLength={30}
                status={
                  cardData.p03.isSubmitted && cardData.p01.answer[0] + '' !== cardData.p01.solution[0]
                    ? InputStatus.ERROR
                    : cardData.p01.answer[0]
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
              />
              <StyleReceipt.ContentText weight={500}>% off</StyleReceipt.ContentText>
            </Box>
            <Box marginTop='12px'>
              <StyleReceipt.ContentText weight={500}>-$ (2)</StyleReceipt.ContentText>
              <Input
                inputSize='x-small'
                value={cardData.p01.answer[1]}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleChange(1, e.target.value)}
                placeholder='내용을 넣어 주세요.'
                width='225px'
                maxLength={30}
                status={
                  cardData.p03.isSubmitted && cardData.p01.answer[1] + '' !== cardData.p01.solution[1]
                    ? InputStatus.ERROR
                    : cardData.p01.answer[1]
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
              />
            </Box>
          </StyleReceipt.TextWrap>
          <StyleReceipt.TextWrap>
            <Box paddingLeft='15px' width='553px' marginTop='8px'>
              <StyleReceipt.ContentText weight={500}>New Membershop Coupon</StyleReceipt.ContentText>
            </Box>
            <Box marginTop='8px'>
              <StyleReceipt.ContentText weight={500}>-$ (3)</StyleReceipt.ContentText>
              <Input
                inputSize='x-small'
                value={cardData.p01.answer[2]}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleChange(2, e.target.value)}
                placeholder='내용을 넣어 주세요.'
                width='225px'
                maxLength={30}
                status={
                  cardData.p03.isSubmitted && cardData.p01.answer[2] + '' !== cardData.p01.solution[2]
                    ? InputStatus.ERROR
                    : cardData.p01.answer[2]
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
              />
            </Box>
          </StyleReceipt.TextWrap>
          <StyleReceipt.TextWrap>
            <Box width='566px' marginTop='25px' hAlign='center'>
              <Typography weight={800} size={EStyleFontSizes.MEDIUM}>
                Total
              </Typography>
            </Box>
            <Box marginTop='25px'>
              <StyleReceipt.ContentText weight={500}>$ (4)</StyleReceipt.ContentText>
              <Input
                inputSize='x-small'
                value={cardData.p01.answer[3]}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleChange(3, e.target.value)}
                placeholder='내용을 넣어 주세요.'
                width='225px'
                maxLength={30}
                status={
                  cardData.p03.isSubmitted && cardData.p01.answer[3] + '' !== cardData.p01.solution[3]
                    ? InputStatus.ERROR
                    : cardData.p01.answer[3]
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
              />
            </Box>
          </StyleReceipt.TextWrap>
        </StyleReceipt.Content>
      </StyleReceipt.BackgroundWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='0px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              (1) 20
              <br />
              (2) 10
              <br />
              (3) 5<br />
              (4) 35
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
