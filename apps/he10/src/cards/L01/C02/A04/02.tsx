import { useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  BoxWrap,
  Input,
  TMainHeaderInfoTypes,
  Typography,
  Question,
  IQuestionProps,
  EStyleButtonTypes,
  IRecorderRef,
  EStyleSizes,
  Recorder,
  IAudioData,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container, ExampleBox } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01C02A04 } from './store';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A04);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Your Turn',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Write and talk about your hopes for the year.',
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

  const onSubmitText = () => {
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
        userSubmission[0].inputData.push(pageData.find(value => value.page === 'P02')!.userSubmission[0].inputData[1]);
      }
      submitData('P02', userSubmission);
    }
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[0]?.onSubmitRecorderProcess({
      cardPath: 'L01/C02/A04',
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

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
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
      onSubmit={() => {
        // add api for recorder blobs upload
        onSubmitText();
      }}
      submitDisabled={
        // add condition of submit record voice
        !(Object.values(cardData.p02.audioData!).every(value => value) && cardData.p02.answer1 && isNotEmptyString(cardData.p02.answer1)) ||
        cardData.p02.isSubmitted
      }
      submitBtnColor={
        !(Object.values(cardData.p02.audioData!).every(value => value) && cardData.p02.answer1 && isNotEmptyString(cardData.p02.answer1))
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p02.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <Box hAlign='center'>
        <Box flexDirection='column' hAlign='center'>
          <Box width='829px'>
            <ExampleBox color='purple' title='My Hopes for This Year'>
              <Question type='dot' size={EStyleSizes['SMALL']}>
                I hope
                <Typography weight={700} style={{ padding: '0px 12px' }}>
                  I can complete a 5 km race.
                </Typography>
              </Question>
              <Box marginTop='-10px'>
                <Question type='dot' size={EStyleSizes['SMALL']}>
                  I hope
                  <Typography weight={700} style={{ padding: '0px 12px' }}>
                    I'll have a chance to learn Spanish.
                  </Typography>
                </Question>
              </Box>
            </ExampleBox>
          </Box>
          <Box alignItems='center' paddingLeft='14px' vAlign='center' hAlign='right' paddingTop={'20px'}>
            <Question type='dot' size={EStyleSizes['SMALL']}>
              I hope
            </Question>
            <Input
              width='700px'
              value={cardData.p02.answer1}
              onChange={handleInputChange}
              maxLength={100}
              readOnly={cardData.p02.isSubmitted}
              placeholder='e.g. my family can go camping together'
              ariaLabel='답 입력란'
            />
            .
          </Box>
        </Box>
      </Box>
      <BoxWrap justifyContent='center' marginTop='20px'>
        {/* TODO : Recorder 녹음 후처리 */}
        <Recorder
          recorderIndex={1}
          initialData={cardData.p02.audioData?.[2]}
          readOnly={cardData.p02.isSubmitted}
          onSubmit={() => {
            onSubmitRecorder(2);
          }}
          onClick={() => handleRecorderClose(0)}
          ref={ref => (recorderRef.current[0] = ref)}
        />
      </BoxWrap>
    </Container>
  );
};

export default P02;
