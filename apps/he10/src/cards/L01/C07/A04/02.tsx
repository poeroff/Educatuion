import {
  Box,
  EStyleButtonTypes,
  IQuestionProps,
  IRecorderRef,
  IUploadRecordData,
  Input,
  Recorder,
  SvgIcon,
  TMainHeaderInfoTypes,
  Typography,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { ChangeEvent, useEffect, useRef } from 'react';
import circleStar from '@/assets/icon/circle_star.svg';
import { L01C07A04 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A04);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const pageData = useRecoilValue(pageDataAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };
  const questionInfo: IQuestionProps = {
    text: 'What do you think are the advantages of working with others?',
  };

  const { userId } = useRecoilValue(studentAtom);
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
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const handleSubmit = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === 'P02')) {
      userSubmission[0].inputData = pageData.find(value => value.page === 'P02')!.userSubmission[0].inputData;
    }

    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    submitData('P02', userSubmission);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newAnswer = cardData.p02.answer?.map((val, idx) => (idx === index ? event.target.value : val));
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: newAnswer } }));
    changeData('P02', 1, index + 1, event.target.value);
  };

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
            answer: [userSubmissionList[0].inputData[0]?.value, userSubmissionList[0].inputData[1]?.value] || cardData.p02.answer,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L01/C07/A04',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: 'HE10',
      subKey: index,
      userId,
    });
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={handleSubmit}
      submitDisabled={
        cardData.p02.answer?.some(answer => !isNotEmptyString(answer)) ||
        !Object.values(cardData.p02.audioData!).every(value => {
          return Boolean(value) && Object.keys(value!).length > 0;
        }) ||
        cardData.p02.isSubmitted
      }
      submitBtnColor={
        cardData.p02.answer?.some(answer => !isNotEmptyString(answer)) ||
        !Object.values(cardData.p02.audioData!).every(value => {
          return Boolean(value) && Object.keys(value!).length > 0;
        }) ||
        cardData.p02.isSubmitted
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <Box hAlign='center' gap='10px'>
        <SvgIcon src={circleStar} size='26px' alt='' />
        <Typography color='var(--color-blue-500)' weight={'var(--font-weight-bold)'} useGap={false}>
          Advantages
        </Typography>
      </Box>

      <Box hAlign='center' marginTop='20px'>
        <Box>
          <Typography>Personally, I think working with others</Typography>
          <Box marginTop='8px'>
            <Typography>is</Typography>
            <Input
              value={cardData.p02.answer?.[0]}
              onChange={e => handleChange(e, 0)}
              placeholder='내용을 넣어 주세요.'
              width='423px'
              maxLength={100}
              ariaLabel='첫 번째 답란'
              readOnly={cardData.p02.isSubmitted}
            />
          </Box>
          <Box marginTop='8px'>
            <Typography>because</Typography>
            <Input
              value={cardData.p02.answer?.[1]}
              onChange={e => handleChange(e, 1)}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='두 번째 답란'
              width='340px'
              maxLength={50}
              readOnly={cardData.p02.isSubmitted}
            />
          </Box>
        </Box>
      </Box>
      <Box hAlign='center' marginTop='20px'>
        <Recorder
          recorderIndex={3}
          initialData={cardData.p02.audioData?.[3]}
          readOnly={cardData.p02.isSubmitted}
          onSubmit={() => {
            onSubmitRecorder(3);
          }}
          ref={ref => {
            recorderRef.current[3] = ref;
          }}
        />
      </Box>
    </Container>
  );
};

export default P02;