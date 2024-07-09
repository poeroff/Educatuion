import {
  Box,
  TextView,
  IQuestionProps,
  Tag,
  ETagLine,
  BottomSheet,
  EStyleButtonTypes,
  Typography,
  Input,
  InputStatus,
  IAudioPlayerProps,
  TMainHeaderInfoTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L01C12A03 } from './store';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C12A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening',
  };

  const questionInfo: IQuestionProps = {
    text: '6. 잘 듣고, 빈칸에 알맞은 말을 써 봅시다.',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C12/A03/ME1-L01-C12-A03-P03.mp3',
    captionSrc: '/L01/C12/A03/ME1-L01-C12-A03-P03.srt',
  };

  const nodeData: React.ReactNode = (
    <Box textAlign='left'>
      <Typography align='left' lineHeight='60px'>
        <Bold>1)</Bold> Yuna’s favorite subject is{' '}
        <Input
          value={cardData.p03.answer1}
          onChange={event => handleChange(1, event.target.value)}
          textAlign='left'
          width='250px'
          maxLength={25}
          readOnly={cardData.p03.isSubmitted}
          status={
            !cardData.p03.isSubmitted
              ? !cardData.p03.answer1
                ? InputStatus.DEFAULT
                : InputStatus.ENABLE
              : isAnswer(cardData.p03.answer1, cardData.p03.solution1)
              ? InputStatus.ENABLE
              : InputStatus.ERROR
          }
          ariaLabel={'1번 답란'}
          placeholder='내용을 넣어 주세요.'
        />
        .{' '}
      </Typography>

      <Typography align='left' lineHeight='60px'>
        <Bold>2)</Bold> Dylan’s favorite subject is{' '}
        <Input
          value={cardData.p03.answer2}
          onChange={event => handleChange(2, event.target.value)}
          textAlign='left'
          width='250px'
          maxLength={25}
          readOnly={cardData.p03.isSubmitted}
          status={
            !cardData.p03.isSubmitted
              ? !cardData.p03.answer2
                ? InputStatus.DEFAULT
                : InputStatus.ENABLE
              : isAnswer(cardData.p03.answer2, cardData.p03.solution2)
              ? InputStatus.ENABLE
              : InputStatus.ERROR
          }
          ariaLabel={'2번 답란'}
          placeholder='내용을 넣어 주세요.'
        />
        .{' '}
      </Typography>
    </Box>
  );

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
  const onGrade = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p03.answer1, cardData.p03.solution1);
      const isCorrect2 = isAnswer(cardData.p03.answer2, cardData.p03.solution2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect: isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };
  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
    }
    changeData('P03', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onGrade}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p03.answer1 || !cardData.p03.answer2}
      submitBtnColor={
        !cardData.p03.answer1 || !cardData.p03.answer2 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      audioInfo={audioInfo}
    >
      <TextView title={''} children={nodeData} height='40%'></TextView>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'답안'} />
          </Box>
          <Box marginTop='12px'>1) math</Box>
          <Box marginTop='12px'>2) science</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const ExtraBold = styled.span`
  font-weight: var(--font-weight-extraBold);
`;

const Bold = styled.span`
  font-weight: var(--font-weight-bold);
`;

export default P03;
