import { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  TMainHeaderInfoTypes,
  BoxWrap,
  Input,
  Recorder,
  Box,
  Typography,
  List,
  Label,
  IQuestionProps,
  EStyleButtonTypes,
  InputStatus,
  IRecorderRef,
  IUploadRecordData,
  makeAudioData,
  IAudioData,
} from '@maidt-cntn/ui';
import { Container, ExampleBox } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01C03A03 } from './store';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
}

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C03A03);
  const { userId } = useRecoilValue(studentAtom);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const pageData = useRecoilValue(pageDataAtom);

  const pageNumber = 'P02';
  const pageKey = 'p02';
  const subjectCode = 'HE10';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn (Step 2)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Write and talk about an appropriate advice to a problem.',
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

  const onSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [],
        },
      ];
      if (pageData.find(value => value.page === 'P02')) {
        userSubmission[0].inputData = pageData.find(value => value.page === 'P02')!.userSubmission[0].inputData;
      }

      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
      submitData('P02', userSubmission);
    }
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L01/C03/A03',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: 'HE10',
      subKey: index,
      userId,
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE10',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: e.target.value } }));
    changeData('P02', 1, 1, e.target.value);
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

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: <Typography>I feel nervous when I give a presentation.</Typography>,
    },
    {
      type: 'B',
      content: <Typography>Why don’t you practice speaking in front of your family?</Typography>,
    },
  ];

  const answerData: IListenAndAnswer[] = [
    {
      type: 'A',
      content: <Typography>I feel nervous when I give a presentation.</Typography>,
    },
    {
      type: 'B',
      content: (
        <>
          <Typography>Why don’t you </Typography>
          <Input
            placeholder='e.g. try deep breathing exercises'
            width='calc(100% - 228px)'
            maxLength={50}
            value={cardData.p02.answer1}
            onChange={handleInputChange}
            readOnly={cardData.p02.isSubmitted}
            status={cardData.p02.answer1 ? InputStatus.ENABLE : InputStatus.DEFAULT}
            ariaLabel='답 입력란'
          />
          &nbsp;?
        </>
      ),
    },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={
        !(
          Object.values(cardData.p02.audioData!).every(value => {
            return Boolean(value) && Object.keys(value!).length > 0;
          }) && isNotEmptyString(cardData.p02.answer1 ?? '')
        ) || cardData.p02.isSubmitted
      }
      onSubmit={() => {
        onSubmit();
      }}
      submitBtnColor={
        !(
          Object.values(cardData.p02.audioData!).every(value => {
            return Boolean(value) && Object.keys(value!).length > 0;
          }) && isNotEmptyString(cardData.p02.answer1 ?? '')
        ) || cardData.p02.isSubmitted
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <ExampleBox color={'purple'} title={'Problem and Advice'}>
        <Box padding='4px 26px'>
          <List<IListenAndAnswer> data={data}>
            {({ value, index = 1 }) => (
              <BoxWrap key={index} alignItems='center'>
                <Box marginRight={0}>
                  <Label value={value?.type} type={'paint'} lineColor='var(--color-grey-600)' />
                </Box>
                <Box useFull>
                  <div>{value?.content}</div>
                </Box>
              </BoxWrap>
            )}
          </List>
        </Box>
      </ExampleBox>
      <Box marginLeft={40} marginTop={20}>
        <List<IListenAndAnswer> data={answerData}>
          {({ value, index = 1 }) => (
            <BoxWrap key={index} alignItems='center'>
              <Box marginRight={0}>
                <Label value={value?.type} type={'paint'} lineColor='var(--color-grey-600)' />
              </Box>
              <Box useFull>
                <div>{value?.content}</div>
              </Box>
            </BoxWrap>
          )}
        </List>
      </Box>
      <BoxWrap justifyContent={'center'} marginTop={'20px'}>
        <Recorder
          recorderIndex={2}
          initialData={cardData.p02.audioData?.[2]}
          readOnly={cardData.p02.isSubmitted}
          onSubmit={() => {
            onSubmitRecorder(2);
          }}
          ref={ref => {
            recorderRef.current[2] = ref;
          }}
        />
      </BoxWrap>
    </Container>
  );
};

export default P02;
