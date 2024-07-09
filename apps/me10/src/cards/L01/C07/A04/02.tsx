import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  Typography,
  TMainHeaderInfoTypes,
  IQuestionProps,
  IRecorderRef,
  Recorder,
  EStyleFontSizes,
  Input,
  EStyleButtonTypes,
  IAudioData,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Balloon, Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01C07A04 } from './store';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A04);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const recorderRef = useRef<IRecorderRef>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'tellYourStory',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '자신의 school survival kit에 넣고 싶은 물건을 쓰고 그 이유를 말해봅시다.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
        });

        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }

      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: e.target.value } }));
    changeData('P02', 1, 1, e.target.value);
  };

  const onSubmitAnswer = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
            },
          ],
        },
      ];

      if (pageData.find(value => value.page === 'P02')) {
        // inputData[1] is the audio data
        userSubmission[0].inputData.push(pageData.find(value => value.page === 'P02')!.userSubmission[0].inputData[1]);
      }
      submitData('P02', userSubmission);
    }
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L01/C07/A04',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: 'ME10',
      subKey: index,
      userId,
    });
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => {
        onSubmitAnswer();
      }}
      submitDisabled={cardData.p02.isSubmitted || Object.keys(cardData.p02.audioData!).length === 0 || !isNotEmptyString(cardData.p02.answer1!)}
      submitBtnColor={
        Object.keys(cardData.p02.audioData!).length === 0 || !isNotEmptyString(cardData.p02.answer1!)
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p02.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <Box vAlign='center' flexDirection='column'>
        <Box hAlign='start' height='76px'>
          <Balloon place='right' backgroundColor='var(--color-green-100)' isShadow ariaLabel=''>
            <Typography>I want</Typography>
            <Input
              minWidth='243px'
              value={cardData.p02.answer1}
              onChange={handleInputChange}
              maxLength={20}
              readOnly={cardData.p02.isSubmitted}
              placeholder='내용을 넣어 주세요'
              ariaLabel='답 입력란'
            />
            <Typography>in my school survival kit.</Typography>
          </Balloon>
        </Box>
        <Box marginTop={24}>
          <Typography size={EStyleFontSizes.SMALL}>이유를 말해보세요.</Typography>
          <Box marginTop={4} hAlign='center'>
            <Recorder
              recorderIndex={2}
              initialData={cardData.p02.audioData?.[2]}
              readOnly={cardData.p02.isSubmitted}
              onSubmit={() => {
                onSubmitRecorder(2);
              }}
              ref={recorderRef}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
