import { Box, TextView, IQuestionProps, Tag, ETagLine, BottomSheet, EStyleButtonTypes, Typography, Input, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L02C02A03a } from './store';
import { IProps } from '.';

const P01 = ({ headerInfo }: IProps) => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C02A03a);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Which book is the girl going to borrow? Fill in the blank.',
    mark: 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/HE1-L02-C02-A03-01.mp3',
    captionSrc: '/L02/C02/A03/HE1-L02-C02-A03-01.srt',
  };

  const nodeData: React.ReactNode = (
    <Box>
      <Typography align='left' lineHeight='60px'>
        She is going to borrow{' '}
        <Input
          value={cardData.p01.answer}
          onChange={event => handleChange(1, event.target.value)}
          textAlign='left'
          width='290px'
          maxLength={20}
          readOnly={cardData.p01.isSubmitted}
          ariaLabel={'답란'}
          placeholder='내용을 넣어 주세요'
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
        },
      ],
    },
  ];
  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer,
            },
          ],
        },
      ];
      submitData('P01', userSubmission);
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value } }));
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
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!cardData.p01.answer}
      submitBtnColor={!cardData.p01.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      audioInfo={audioInfo}
    >
      <TextView title={''} children={nodeData} height='40%'></TextView>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'모범 답안'} />
          </Box>
          <Box marginTop='12px'>{cardData.p01.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
