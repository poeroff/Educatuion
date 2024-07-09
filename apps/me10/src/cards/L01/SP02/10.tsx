import {
  Box,
  TMainHeaderInfoTypes,
  List,
  Typography,
  Label,
  Recorder,
  SimpleAudioPlayer,
  BoxWrap,
  EStyleButtonTypes,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IQuestionProps,
  IUploadRecordData,
  IAudioData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useRef } from 'react';

import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L01SP02 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color?: string;
  audioSrc: string;
}

const defaultSubmission: userSubmissionType[] = [
  {
    mainKey: 1,
    inputData: [
      {
        subKey: 1,
        type: 'AUDIO',
        value: {},
      },
      {
        subKey: 2,
        type: 'AUDIO',
        value: {},
      },
    ],
  },
];

const P10 = () => {
  const pageNo = 'P10';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const [cardData, setCardData] = useRecoilState(L01SP02);
  const { userId } = useRecoilValue(studentAtom);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const isAllFilled = useMemo(() => Object.values(cardData.p10.audioData ?? {}).every(val => val), [cardData.p10.audioData]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '듣기 연습',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '음원을 듣고 따라 말해 봅시다.',
  };

  const audioPrefix = '/L01/SP02/ME1-L01-SP02-P10';
  const audioSurfix = '.mp3';

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: <>What's your favorite movie?</>,
      audioSrc: audioPrefix + '-01' + audioSurfix,
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: (
        <>
          My favorite movie is&nbsp;
          <Typography fontStyle='italic' useGap={false} style={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
            Kung Fu Panda
          </Typography>{' '}
          .
        </>
      ),
      audioSrc: audioPrefix + '-02' + audioSurfix,
    },
  ];

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L01/SP02',
      changeData,
      mainKey: 1,
      page: 'p10',
      setFunction: setCardData,
      subjectCode: 'ME10',
      subKey: index,
      userId,
    });
  };

  const onSubmitAnswer = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === pageNo)) {
      userSubmission[0].inputData = pageData.find(value => value.page === pageNo)?.userSubmission[0].inputData ?? [];
    }

    handleAudioReset(0);
    setCardData(prev => ({ ...prev, p10: { ...prev.p10, isSubmitted: true } }));
    submitData(pageNo, userSubmission);
  };

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<IUploadRecordData>(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p10.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
        });

        setCardData(prev => ({
          ...prev,
          p10: {
            ...prev.p10,
            isSubmitted: isSubmitted ?? false,
            audioData: newAudioData,
          },
        }));
      }

      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onSubmitAnswer}
      useExtend
      submitDisabled={cardData.p10.isSubmitted || !isAllFilled}
      submitLabel='완료하기'
      submitBtnColor={isAllFilled && !cardData.p10.isSubmitted ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY}
    >
      <Box hAlign='center'>
        <List data={data}>
          {({ value, index = 1 }: { value?: IListenAndAnswer; index?: number }) => (
            <BoxWrap>
              <Box marginRight='8px'>
                <Label value={value?.type || ''} type={'paint'} background={value?.color || ''} />
              </Box>
              <Box flex={1} marginRight={10}>
                <Typography>{value?.content}</Typography>
              </Box>
              <Box hAlign='flex-end'>
                <Box marginRight='4px'>
                  <SimpleAudioPlayer
                    ref={ref => {
                      audioRefs.current[index] = ref;
                    }}
                    audioSrc={value?.audioSrc ?? ''}
                    ariaLabel={index + '번 지문 듣기 버튼'}
                    onChangeStatus={() => handleAudioReset(index)}
                    tabIndex={100 + 2 * index}
                  />
                </Box>
                <Recorder
                  recorderIndex={index}
                  initialData={cardData.p10.audioData?.[index]}
                  readOnly={cardData.p10.isSubmitted}
                  onSubmit={() => {
                    onSubmitRecorder(index);
                  }}
                  onClick={() => {
                    handleRecorderClose(index);
                    handleAudioReset(0);
                  }}
                  ref={ref => {
                    recorderRef.current[index] = ref;
                  }}
                />
              </Box>
            </BoxWrap>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default P10;
