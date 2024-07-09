import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  TMainHeaderInfoTypes,
  IQuestionProps,
  SvgIcon,
  Recorder,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  IRecorderRef,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Balloon, Container } from '@maidt-cntn/ui/en';

import green from '@/assets/icon/green_person.svg';
import blue from '@/assets/icon/blue_person.svg';

import { useRecoilState, useRecoilValue } from 'recoil';
import { L05C12A04 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L05C12A04);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [isShow, setShow] = useState(false);

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Speaking',
  };

  const questionInfo: IQuestionProps = {
    text: '8. 대화를 완성해 봅시다.',
  };

  const content: React.ReactNode = <Typography>What are you going to do this Saturday?</Typography>;

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<IUploadRecordData>(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p01.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
        });
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L05/C12/A04',
      changeData,
      mainKey: 1,
      page: 'p01',
      setFunction: setCardData,
      subjectCode: 'ME10',
      subKey: index,
      userId,
    });
  };

  const onSubmitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const userSubmission: userSubmissionType[] = [{ mainKey: 1, inputData: [] }];

    if (pageData.find(value => value.page === 'P01')) {
      userSubmission[0].inputData = pageData.find(value => value.page === 'P01')!.userSubmission[0].inputData;
    }

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    submitData('P01', userSubmission);
  };

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onSubmitAnswer}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={cardData.p01.audioData?.[1] === undefined}
      submitBtnColor={
        cardData.p01.audioData?.[1] === undefined ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
    >
      <Box hAlign='center' useFull>
        <Box>
          <Box vAlign='center'>
            <SvgIcon src={green} size='48px' />
            <Box marginLeft={14}>
              <Balloon place='left' backgroundColor='var(--color-green-100)' ariaLabel='' isShadow>
                {content}
              </Balloon>
            </Box>
          </Box>
          <Box vAlign='center' marginTop='24px' padding='14px 0'>
            <SvgIcon src={blue} size='48px' />
            <Box marginLeft='24px'>
              <Recorder
                recorderIndex={1}
                initialData={cardData.p01.audioData?.[1]}
                readOnly={cardData.p01.isSubmitted}
                onSubmit={() => {
                  onSubmitRecorder(1);
                }}
                onClick={() => {
                  handleRecorderClose(1);
                }}
                ref={ref => {
                  recorderRef.current[1] = ref;
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'예시 답안'} />
          </Box>
          <Box marginTop='12px'>{cardData.p01.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
