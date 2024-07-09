import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioData,
  IUploadRecordData,
  Recorder,
  Tag,
  Textarea,
  TMainHeaderInfoTypes,
  IRecorderRef,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L02C07A04 } from './store';
import { handleDownload } from '@maidt-cntn/util/FileUtil';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';

const headerInfo: TMainHeaderInfoTypes = {
  headerPattern: 'text',
  headerText: 'Think and Talk',
};

const questionInfo = {
  text: 'Talk about ways to raise awareness about dark patterns.',
};

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C07A04);
  const recorderRef = useRef<IRecorderRef>(null);
  const pageData = useRecoilValue(pageDataAtom);

  const [showAnswer, setShowAnswer] = useState(false);

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
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const makeAudioData = async ({
    originCardData,
    userSubmissionList,
  }: {
    originCardData:
      | {
          [x: string]: IAudioData | null;
        }
      | undefined;
    userSubmissionList: userSubmissionType<IUploadRecordData>[];
  }) => {
    const newCardData: typeof originCardData = originCardData ? { ...originCardData } : {};

    for (let index = 0; index < userSubmissionList[0].inputData.length; index++) {
      const data = userSubmissionList[0].inputData[index];

      if (!data.value) continue;
      if (data.type !== 'AUDIO') continue;

      let result: string | Blob = 'TIMEOUT';

      if (data.value.uploadPath) {
        result = await fulfillWithTimeLimit(1000, 3, handleDownload('HE20', data.value.uploadPath));

        if (result !== 'TIMEOUT') {
          newCardData[data.subKey] = {
            blob: [result as Blob],
            convertedText: data.value.convertedText,
            recordingTime: data.value.recordingTime,
            totalAudioVolumes: data.value.totalAudioVolumn,
          };
        }
      }
    }

    return newCardData;
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
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
        console.log('newAudioData', newAudioData);
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(!showAnswer);
      return;
    }
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1,
            isAnswer: true,
          },
        ],
      },
    ];

    if (pageData.find(value => value.page === 'P02')) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === 'P02')!.userSubmission[0].inputData[1]);
    }

    submitData('P02', userSubmission);
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer1: event.target.value,
      },
    }));
    changeData('P02', 1, 1, event.target.value);
  };

  const checkDisableInput = () => {
    return cardData.p02.answer1 === '' || !Object.values(cardData.p02.audioData!).every(value => value);
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L02/C07/A04',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: index,
      userId,
    });
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData.p02.isSubmitted ? '완료하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitBtnColor={
        checkDisableInput()
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p02.isSubmitted || !showAnswer
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.DEFAULT
      }
      submitDisabled={checkDisableInput()}
      onSubmit={submitAnswer}
    >
      <Typography weight={700}>We can...</Typography>
      <Box height='290px' marginTop='10px' useFull>
        <Textarea
          width='100%'
          height='100%'
          placeholder='내용을 넣어 주세요.'
          onChange={handleChangeValue}
          value={cardData.p02.answer1}
          readOnly={cardData.p02.isSubmitted}
        />
      </Box>
      <Box hAlign='center' marginTop='10px'>
        <Recorder
          recorderIndex={2}
          initialData={cardData.p02.audioData?.[2]}
          onSubmit={() => {
            onSubmitRecorder(2);
          }}
          readOnly={cardData.p02.isSubmitted}
          ref={recorderRef}
        />
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>
              We can make a poster about the types of dark patterns and put it on the school’s information board.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
