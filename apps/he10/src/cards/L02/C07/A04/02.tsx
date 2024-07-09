import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioData,
  IRecorderRef,
  IUploadRecordData,
  Recorder,
  TMainHeaderInfoTypes,
  Tag,
  Textarea,
  Typography,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C07A04 } from './store';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C07A04);
  const pageData = useRecoilValue(pageDataAtom);
  const [showAnswer, setShowAnswer] = useState(false);

  const recorderRef = useRef<IRecorderRef>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };

  const questionInfo = {
    text: 'Talk about how you like the ending of the story.',
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
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE10',
        });

        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData('P02', 1, 1, value);
  };

  const onSubmitRecorder = async () => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L02/C07/A04',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: 'HE10',
      subKey: 2,
      userId,
    });
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(prev => !prev);
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
            value: cardData.p02.answer,
          },
        ],
      },
    ];
    if (pageData.find(value => value.page === 'P02')) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === 'P02')!.userSubmission[0].inputData[1]);
    }

    submitData('P02', userSubmission);
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData.p02.isSubmitted ? '완료하기' : showAnswer ? '답안 닫기' : '답안 보기'}
      submitBtnColor={
        cardData.p02.answer && Object.values(cardData.p02.audioData!).length > 0
          ? showAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={!cardData.p02.answer || Object.values(cardData.p02.audioData!).length === 0}
      onSubmit={submitAnswer}
    >
      <Typography weight={700}>I think the ending is</Typography>
      <Box height='290px' marginTop='10px' useFull>
        <Textarea
          width='100%'
          height='100%'
          placeholder='내용을 넣어 주세요.'
          value={(cardData.p02.answer as string) ?? ''}
          readOnly={cardData.p02.isSubmitted}
          onChange={handleChange}
          ariaLabel='답란'
        />
      </Box>
      <Box hAlign='center' marginTop='10px'>
        <Recorder
          ref={recorderRef}
          recorderIndex={1}
          onSubmit={onSubmitRecorder}
          initialData={cardData.p02.audioData?.[2]}
          readOnly={cardData.p02.isSubmitted}
        />
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>
              I think the ending feels unfinished. There could be more to the story about how the whakapapa is going to be preserved after Nani’s
              death.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
