import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Label,
  BottomSheet,
  ETagLine,
  Tag,
  EStyleButtonTypes,
  Typography,
  TMainHeaderInfoTypes,
  IQuestionProps,
  SimpleAudioPlayer,
  TextView,
  Recorder,
  EStyleFontSizes,
  IAudioPlayerProps,
  IAudioData,
  IUploadRecordData,
  IRecorderRef,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom, pageDataAtom } from '@/stores/page';
import L01SP02State from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P10 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SP02State);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const [isRecordSubmit, setIsRecordSubmit] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);

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

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 말하기 연습',
  };
  const questionInfo: IQuestionProps = {
    text: '다음 대화의 빈 칸에 들어갈 알맞은 문장을 골라 말 해 보세요.',
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/SP02/HE1-L01-SP02-P10.wav',
  };

  const handleClickSubmit = () => {
    if (cardData.p10.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      setCardData(prev => ({ ...prev, p10: { ...prev.p10, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [],
        },
      ];
      if (pageData.find(value => value.page === 'P10')) {
        userSubmission[0].inputData.push(pageData.find(value => value.page === 'P10')!.userSubmission[0].inputData[0]);
      }
      submitData('P10', userSubmission);
    }
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L01/SP02',
      changeData,
      mainKey: 1,
      page: 'p10',
      subjectCode: 'HE10',
      subKey: index,
      userId,
      setFunction: setCardData,
    });

    setIsRecordSubmit(true);
  };

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
    const pageId = pageIds.find(page => page.page === 'P10')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<IUploadRecordData | boolean | number>(userId, pageId);
      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p10.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
        });

        setCardData(prev => ({
          ...prev,
          p10: {
            ...prev.p10,
            audioData: newAudioData || cardData.p10.audioData,
            isSubmitted,
          },
        }));
      }
      initData('P10', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const checkDisableInput = () => {
    return !(Object.values(cardData.p10.audioData || {}).length > 0);
  };

  useEffect(() => {
    return () => {
      saveData('P10');
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
      submitDisabled={checkDisableInput()}
      submitBtnColor={
        cardData.p10.isSubmitted
          ? !showAnswer
            ? EStyleButtonTypes.PRIMARY
            : EStyleButtonTypes.DEFAULT
          : isRecordSubmit
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      submitLabel={!cardData.p10.isSubmitted ? '완료하기' : !showAnswer ? '답안보기' : '답안닫기'}
      onSubmit={handleClickSubmit}
    >
      <Box hAlign='start'>
        <Label value={'A'} type={'paint'} background='var(--color-blue-100)' />
        <Box backgroundColor='var(--color-blue-100)' border='none' useRound hAlign='center' padding='12px' margin='0 8px'>
          <Typography>What do you want to do at the park?</Typography>
        </Box>
        <SimpleAudioPlayer audioSrc={audioInfo.audioSrc} />
      </Box>
      <Box marginTop='20px'>
        <Box hAlign='end'>
          <Box width='478px' backgroundColor='var(--color-red-200)' border='none' useRound hAlign='center' padding='12px 0' marginRight='8px'>
            <Recorder
              recorderIndex={1}
              initialData={cardData.p10.audioData?.[1]}
              readOnly={cardData.p10.isSubmitted}
              onSubmit={() => {
                onSubmitRecorder(1);
              }}
              ref={ref => {
                recorderRef.current[1] = ref;
              }}
            />
          </Box>
          <Label value={'B'} type={'paint'} background='var(--color-orange-200)' />
        </Box>
        <Box hAlign='end' margin='26px 45px 0 0'>
          <TextView title='보기' hAlign='start'>
            <Box vAlign='flex-start'>
              <Box>
                <Label background={'var(--color-black)'} type={'paint'} size={'xxx-small'} />
              </Box>
              <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
                The park is famous for its beautiful lake.
              </Typography>
            </Box>
            <Box vAlign='flex-start'>
              <Box>
                <Label background={'var(--color-black)'} type={'paint'} size={'xxx-small'} />
              </Box>
              <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
                I hope we can try riding the roller coaster.
              </Typography>
            </Box>
          </TextView>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>I hope we can try riding the roller coaster.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P10;
