import { useEffect, useRef, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Scroll,
  EStyleButtonTypes,
  List,
  TextView,
  Typography,
  Label,
  BottomSheet,
  ETagLine,
  Tag,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IAudioData,
  IUploadRecordData,
  Recorder,
  BoxWrap,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L02C11A03 } from './store';
import { studentAtom } from '@/stores/student';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L02C11A03);
  const { userId } = useRecoilValue(studentAtom);
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'B. Speaking',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: '1. Complete the dialogue with the given sentences.',
  };

  const sentenceArr = [
    'Jessica and I are going to watch a movie.',
    'Why don’t we think about it and decide after checking with Jessica?',
    'Don’t you think watching movies at the theater is more engaging than watching them at home?',
  ];

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
        {
          subKey: 3,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const audioSubKeys = [1, 2, 3];
  const isSubmitDisabled = !audioSubKeys.every(index => !!cardData.P01.audioData?.[index]);

  const handleSubmitRecorder = async (index: number) => {
    if (!index) return;
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L02/C11/A03',
      changeData,
      mainKey: 1,
      page: 'P01',
      subjectCode: 'HE20',
      subKey: index,
      userId,
      setFunction: setCardData,
    });
  };

  const handleSubmit = () => {
    if (cardData.P01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [],
        },
      ];

      if (pageData.find(value => value.page === 'P01')) {
        userSubmission[0].inputData = pageData.find(value => value.page === 'P01')!.userSubmission[0].inputData;
      }

      setCardData(prev => ({ ...prev, P01: { ...prev.P01, isSubmitted: true } }));
      submitData('P01', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<IUploadRecordData>(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.P01.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });

        setCardData(prev => ({
          ...prev,
          P01: {
            ...prev.P01,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }

      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      onSubmit={handleSubmit}
      submitDisabled={isSubmitDisabled}
      submitLabel={cardData.P01.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '완료하기'}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <Box background={'white'} useRound>
        <Scroll height='300px'>
          <Box vAlign='start'>
            <Box whiteSpace='nowrap'>A :</Box>
            <Typography>Hey, Chris. Do you have any plans this weekend? Hey, Chris. Do you have any plans this weekend?</Typography>
          </Box>

          <Box vAlign='start'>
            <Box whiteSpace='nowrap'>B :</Box>
            <Typography>Not really. Why, what’s up?</Typography>
          </Box>

          <Box vAlign='start'>
            <Box whiteSpace='nowrap'>A : &nbsp;</Box>
            <Typography>
              <Typography type='blank' width='280px'>
                <Box hAlign='center' width='100%'>
                  <Recorder
                    recorderIndex={1}
                    readOnly={cardData.P01.isSubmitted}
                    initialData={cardData.P01.audioData?.[1]}
                    onSubmit={() => handleSubmitRecorder(1)}
                    onClick={() => handleRecorderClose(1)}
                    ref={ref => {
                      recorderRef.current[1] = ref;
                    }}
                  />
                </Box>
              </Typography>
              Would you like to join us?
            </Typography>
          </Box>

          <Box vAlign='start'>
            <Box whiteSpace='nowrap'>B :</Box>
            <Typography>I’d love to. I know that Space War 3 is on at the theater now. How about watching that?</Typography>
          </Box>

          <Box vAlign='start'>
            <Box whiteSpace='nowrap'>A :</Box>
            <Typography>Oh, we were thinking of watching a movie at my place.</Typography>
          </Box>

          <Box vAlign='start'>
            <Box whiteSpace='nowrap'>B :</Box>
            <Typography>
              Really? I rarely watch movies at home.&nbsp;
              <Typography type='blank' width='280px'>
                <Box hAlign='center' width='100%'>
                  <Recorder
                    recorderIndex={2}
                    readOnly={cardData.P01.isSubmitted}
                    initialData={cardData.P01.audioData?.[2]}
                    onSubmit={() => handleSubmitRecorder(2)}
                    onClick={() => handleRecorderClose(2)}
                    ref={ref => {
                      recorderRef.current[2] = ref;
                    }}
                  />
                </Box>
              </Typography>
            </Typography>
          </Box>

          <Box vAlign='start'>
            <Box whiteSpace='nowrap'>A :</Box>
            <Typography>
              I see your point.&nbsp;
              <Typography type='blank' width='280px'>
                <Box hAlign='center' width='100%'>
                  <Recorder
                    recorderIndex={3}
                    readOnly={cardData.P01.isSubmitted}
                    initialData={cardData.P01.audioData?.[3]}
                    onSubmit={() => handleSubmitRecorder(3)}
                    onClick={() => handleRecorderClose(3)}
                    ref={ref => {
                      recorderRef.current[3] = ref;
                    }}
                  />
                </Box>
              </Typography>
            </Typography>
          </Box>

          <Box vAlign='start'>
            <Box whiteSpace='nowrap'>B :</Box>
            <Typography>All right. If we all agree, let’s go to the movies together.</Typography>
          </Box>
        </Scroll>
      </Box>
      <Box marginTop='20px'>
        <TextView title='보기'>
          <List data={sentenceArr}>
            {({ value, index = 1 }) => (
              <BoxWrap textAlign='start' boxGap={0}>
                <Box>
                  <Label value={index} marginRight={16} />
                </Box>
                <Box>{value}</Box>
              </BoxWrap>
            )}
          </List>
        </TextView>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>1, 3, 2</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
