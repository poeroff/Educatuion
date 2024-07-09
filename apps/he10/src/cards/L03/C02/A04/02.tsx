import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  TMainHeaderInfoTypes,
  BoxWrap,
  Input,
  Recorder,
  Box,
  Question,
  Typography,
  IRecorderRef,
  IUploadRecordData,
  IAudioData,
  EStyleButtonTypes,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { ExampleBox, Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C02A04 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit, truncateToMaxBytes, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C02A04);

  const recorderRef = useRef<IRecorderRef>(null);
  const pageData = useRecoilValue(pageDataAtom);

  const pageNo = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Write and talk about your hopes for the year.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
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
        result = await fulfillWithTimeLimit(1000, 3, handleDownload('HE10', data.value.uploadPath));

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
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
        });

        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            isSubmitted,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            audioData: newAudioData,
          },
        }));
      }

      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = cardData.p02.answer?.map((ans, idx) => (idx === index ? truncateToMaxBytes(value) : ans));
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: updatedAnswers,
      },
    }));
    changeData(pageNo, 1, 1, updatedAnswers);
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p02.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    if (pageData.find(value => value.page === pageNo)) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === pageNo)!.userSubmission[0].inputData[1]);
    }
    submitData(pageNo, userSubmission);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  const checkDisableInput = () => {
    return (
      (Array.isArray(cardData.p02.answer) && cardData.p02.answer?.some(val => val === '')) || Object.values(cardData.p02.audioData!).length !== 1
    );
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L03/C02/A04',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: 'HE10',
      subKey: index,
      userId,
    });
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => submitAnswer()}
      submitBtnColor={cardData.p02.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p02.isSubmitted || checkDisableInput()}
    >
      <ExampleBox color={'emerald'} title={'My Favorite and the Reason'}>
        <Box paddingTop='12px'>
          <Question type='dot' size='small'>
            <Typography useGap={false}>
              I’m interested in
              <Typography weight={'var(--font-weight-extraBold)'}>biographies.</Typography>
            </Typography>
          </Question>
          <Box alignItems='start' vAlign='flex-start' hAlign='flex-start'>
            <Typography style={{ marginLeft: '15px' }}>
              They
              <Typography weight={'var(--font-weight-extraBold)'}>inspire me to live my life to the fullest.</Typography>
            </Typography>
          </Box>
        </Box>
      </ExampleBox>
      <Box alignItems='start' paddingLeft='14px' paddingTop='15px' vAlign='flex-start' hAlign='left'>
        <Question type={'dot'} size='small'>
          I’m interested in
        </Question>
        <Input
          width={'230px'}
          textAlign='start'
          placeholder='e.g. comic books'
          ariaLabel='1번 답란'
          value={cardData.p02.answer?.[0]}
          onChange={e => handleInputChange(0, e.target.value)}
          maxLength={2000}
          inputSize='x-small'
          readOnly={cardData.p02.isSubmitted}
        />
      </Box>
      <Box paddingLeft='40px' paddingTop='15px'>
        <Typography useGap={false}>They</Typography>
        <Input
          width={'470px'}
          textAlign='start'
          placeholder='e.g. tell stories with eye-catching visuals'
          ariaLabel='2번 답란'
          value={cardData.p02.answer?.[1]}
          onChange={e => handleInputChange(1, e.target.value)}
          maxLength={2000}
          marginLeft={20}
          inputSize='x-small'
          readOnly={cardData.p02.isSubmitted}
        />
      </Box>
      <BoxWrap justifyContent={'center'} marginTop={'20px'}>
        <Recorder
          recorderIndex={2}
          initialData={cardData.p02.audioData?.[2]}
          onSubmit={() => {
            onSubmitRecorder(2);
          }}
          readOnly={cardData.p02.isSubmitted}
          ref={recorderRef}
        />
      </BoxWrap>
    </Container>
  );
};

export default P02;
