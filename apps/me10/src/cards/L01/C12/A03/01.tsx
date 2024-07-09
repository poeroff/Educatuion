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

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C12A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening',
  };

  const questionInfo: IQuestionProps = {
    text: '5. 잘 듣고, 빈칸에 알맞은 말을 써 봅시다.',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C12/A03/ME1-L01-C12-A03-P01.mp3',
    captionSrc: '/L01/C12/A03/ME1-L01-C12-A03-P01.srt',
  };

  const nodeData: React.ReactNode = (
    <Box>
      <Typography align='left' lineHeight='60px'>
        Her name is Bora Han. She teaches{' '}
        <Input
          value={cardData.p01.answer1}
          onChange={event => handleChange(1, event.target.value)}
          textAlign='left'
          width='250px'
          maxLength={25}
          readOnly={cardData.p01.isSubmitted}
          status={
            !cardData.p01.isSubmitted
              ? !cardData.p01.answer1
                ? InputStatus.DEFAULT
                : InputStatus.ENABLE
              : isAnswer(cardData.p01.answer1, cardData.p01.solution1)
              ? InputStatus.ENABLE
              : InputStatus.ERROR
          }
          ariaLabel={'답란'}
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
      ],
    },
  ];
  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
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
              isCorrect: isCorrect,
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onGrade}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p01.answer1}
      submitBtnColor={!cardData.p01.answer1 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      audioInfo={audioInfo}
    >
      <TextView title={''} children={nodeData} height='40%'></TextView>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'답안'} />
          </Box>
          <Box marginTop='12px'>{cardData.p01.solution1}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const Bold = styled.span`
  font-weight: var(--font-weight-extraBold);
`;

export default P01;
