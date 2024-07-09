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
import { L03C12A04 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const PAGE_KEY = 'p01';
  const PAGE_NUM = 'P01';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C12A04);
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

  const content: React.ReactNode = <Typography>Can you walk the dog?</Typography>;

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
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<IUploadRecordData>(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData[PAGE_KEY].audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
        });
        setCardData(prev => ({
          ...prev,
          [PAGE_KEY]: {
            ...prev[PAGE_KEY],
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L03/C12/A04',
      changeData,
      mainKey: 1,
      page: PAGE_KEY,
      setFunction: setCardData,
      subjectCode: 'ME10',
      subKey: index,
      userId,
    });
  };

  const onSubmitAnswer = () => {
    if (cardData[PAGE_KEY].isSubmitted) {
      setShow(!isShow);
      return;
    }
    const userSubmission: userSubmissionType[] = [{ mainKey: 1, inputData: [] }];

    if (pageData.find(value => value.page === PAGE_NUM)) {
      userSubmission[0].inputData = pageData.find(value => value.page === PAGE_NUM)!.userSubmission[0].inputData;
    }

    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], isSubmitted: true } }));
    submitData(PAGE_NUM, userSubmission);
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
      saveData(PAGE_NUM);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onSubmitAnswer}
      submitLabel={cardData[PAGE_KEY].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={cardData[PAGE_KEY].audioData?.[1] === undefined}
      submitBtnColor={
        cardData[PAGE_KEY].audioData?.[1] === undefined ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
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
                initialData={cardData[PAGE_KEY].audioData?.[1]}
                readOnly={cardData[PAGE_KEY].isSubmitted}
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
          <Box marginTop='12px'>{cardData[PAGE_KEY].solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
