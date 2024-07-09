import {
  StyleReceipt,
  TMainHeaderInfoTypes,
  Input,
  Typography,
  Box,
  EStyleFontSizes,
  IQuestionProps,
  IAudioPlayerProps,
  BottomSheet,
  ETagLine,
  Tag,
  EStyleButtonTypes,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L02C02A03b } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

export const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C02A03b);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const [showAnswer, setShowAnser] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    text: 'Complete the bill using information from the dialogue.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/HE2-L02-C02-A03-01.mp3',
    captionSrc: '/L02/C02/A03/HE2-L02-C02-A03-01.srt',
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
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnser(!showAnswer);
    } else {
      const isCorrect1 = cardData.p01.answer1.trim() === cardData.p01.solution1;
      const isCorrect2 = cardData.p01.answer2.trim() === cardData.p01.solution2;
      const isCorrect3 = cardData.p01.answer3.trim() === cardData.p01.solution3;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    }
    changeData('P01', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3)}
      onSubmit={onGrade}
      audioInfo={audioInfo}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
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
            <Box paddingLeft='12px' width='430px'>
              <StyleReceipt.ContentText weight={800}>ORGANIC COTTON SWEATER</StyleReceipt.ContentText>
            </Box>
            <Box width='100px' hAlign='right' marginLeft='10px'>
              <StyleReceipt.ContentText weight={500}>1</StyleReceipt.ContentText>
            </Box>
            <Box width='307px' hAlign='right' marginLeft='20px'>
              <StyleReceipt.ContentText weight={500}>$ 50</StyleReceipt.ContentText>
            </Box>
          </StyleReceipt.TextWrap>
          <StyleReceipt.TextWrap>
            <Box paddingLeft='15px' width='553px' marginTop='12px'>
              <StyleReceipt.ContentText weight={500}>(1)</StyleReceipt.ContentText>
              <Input
                inputSize='x-small'
                value={cardData.p01.answer1}
                onChange={e => handleChange(1, e.target.value)}
                placeholder='내용을 넣어 주세요.'
                ariaLabel='1번 답 입력란'
                width='225px'
                maxLength={30}
                readOnly={cardData.p01.isSubmitted}
                status={
                  !cardData.p01.isSubmitted ? InputStatus.ENABLE : cardData.p01.answer1.trim() !== cardData.p01.solution1 ? InputStatus.ERROR : ''
                }
              />
              <StyleReceipt.ContentText weight={500}>% off</StyleReceipt.ContentText>
            </Box>
            <Box marginTop='12px'>
              <StyleReceipt.ContentText weight={500}>-$ (2)</StyleReceipt.ContentText>
              <Input
                inputSize='x-small'
                value={cardData.p01.answer2}
                onChange={e => handleChange(2, e.target.value)}
                placeholder='내용을 넣어 주세요.'
                ariaLabel='2번 답 입력란'
                width='225px'
                maxLength={30}
                readOnly={cardData.p01.isSubmitted}
                status={
                  !cardData.p01.isSubmitted ? InputStatus.ENABLE : cardData.p01.answer2.trim() !== cardData.p01.solution2 ? InputStatus.ERROR : ''
                }
              />
            </Box>
          </StyleReceipt.TextWrap>
          <StyleReceipt.TextWrap>
            <Box paddingLeft='15px' width='553px' marginTop='8px'>
              <StyleReceipt.ContentText weight={500}>New Membershop Coupon</StyleReceipt.ContentText>
            </Box>
            <Box marginTop='8px' hAlign='right' width='307px'>
              <StyleReceipt.ContentText weight={500}>-$ 5</StyleReceipt.ContentText>
            </Box>
          </StyleReceipt.TextWrap>
          <StyleReceipt.TextWrap>
            <Box width='566px' marginTop='25px' hAlign='center'>
              <Typography weight={800} size={EStyleFontSizes.MEDIUM}>
                Total
              </Typography>
            </Box>
            <Box marginTop='25px'>
              <StyleReceipt.ContentText weight={500}>$ (3)</StyleReceipt.ContentText>
              <Input
                inputSize='x-small'
                value={cardData.p01.answer3}
                onChange={e => handleChange(3, e.target.value)}
                placeholder='내용을 넣어 주세요.'
                ariaLabel='3번 답 입력란'
                width='225px'
                maxLength={30}
                readOnly={cardData.p01.isSubmitted}
                status={
                  !cardData.p01.isSubmitted ? InputStatus.ENABLE : cardData.p01.answer3.trim() !== cardData.p01.solution3 ? InputStatus.ERROR : ''
                }
              />
            </Box>
          </StyleReceipt.TextWrap>
        </StyleReceipt.Content>
      </StyleReceipt.BackgroundWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography usePre>(1) 20 (2) 10 (3) 35 </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
