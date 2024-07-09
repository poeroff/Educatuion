import {
  Box,
  TMainHeaderInfoTypes,
  Recorder,
  Textarea,
  EStyleButtonTypes,
  IAudioData,
  IUploadRecordData,
  IRecorderRef,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEventHandler, useEffect, useRef } from 'react';
import { fulfillWithTimeLimit, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom, pageDataAtom } from '@/stores/page';
import { L02C05A02 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L02C05A02);
  const { userId } = useRecoilValue(studentAtom);
  const pageNumber = 'P02';
  const pageKey = 'p02';
  const subjectCode = 'HE20';

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Topic Preview',
  };
  const questionInfo = {
    text: 'Write and talk about your online shopping experiences.',
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

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L02/C05/A02',
      changeData,
      mainKey: 1,
      page: pageKey,
      subjectCode: subjectCode,
      subKey: index,
      userId,
      setFunction: setCardData,
    });
  };

  const onSubmitAnswer = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === pageNumber)) {
      userSubmission[0].inputData = pageData.find(value => value.page === pageNumber)!.userSubmission[0].inputData;
    }

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
    submitData(pageNumber, userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData[pageKey].audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });

        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            isSubmitted,
            answer2: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer2,
            audioData: newAudioData,
          },
        }));
      }

      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer2: event.target.value } }));
    changeData(pageNumber, 1, 1, event.target.value);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      vAlign='flex-start'
      onSubmit={onSubmitAnswer}
      submitDisabled={
        !isNotEmptyString(cardData[pageKey].answer2!) || Object.values(cardData[pageKey].audioData!).length === 0 || cardData[pageKey].isSubmitted
      }
      submitBtnColor={
        !isNotEmptyString(cardData[pageKey].answer2!) || Object.values(cardData[pageKey].audioData!).length === 0
          ? EStyleButtonTypes.SECONDARY
          : !cardData[pageKey].isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <Box height='220px' marginTop='10px' useFull>
        <Textarea
          readOnly={cardData[pageKey].isSubmitted}
          value={cardData[pageKey].answer2}
          onChange={handleInputChange}
          width='100%'
          height='100%'
          placeholder='내용을 넣어 주세요.'
          ariaLabel='답 입력란'
        />
      </Box>

      <Box hAlign='center' marginTop='50px'>
        <Recorder
          recorderIndex={2}
          initialData={cardData[pageKey].audioData?.[2]}
          readOnly={cardData[pageKey].isSubmitted}
          onSubmit={() => {
            onSubmitRecorder(2);
          }}
          onClick={() => {
            handleRecorderClose(2);
          }}
          ref={ref => {
            recorderRef.current[2] = ref;
          }}
        />
      </Box>
    </Container>
  );
};

export default P02;
