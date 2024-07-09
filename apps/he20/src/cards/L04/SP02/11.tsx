import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IAudioData,
  IQuestionProps,
  IRecorderRef,
  IUploadRecordData,
  Label,
  makeAudioData,
  Recorder,
  Tag,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { L04SP02Recorder } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useEffect, useRef, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P11 = () => {
  const PAGE_NUMBER = 'P11';
  const STORE_NUMBER = 'p11';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L04SP02Recorder);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const recorderRef = useRef<IRecorderRef>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: '[Listen & Speak] 말하기 연습',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '다음 대화의 빈 칸에 들어갈 알맞은 문장을 골라 말 해 보세요.',
  };

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

  const onSubmit = () => {
    if (!cardData[STORE_NUMBER].isSubmitted) {
      setCardData(prev => ({ ...prev, [STORE_NUMBER]: { ...prev[STORE_NUMBER], isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [],
        },
      ];
      if (pageData.find(value => value.page === PAGE_NUMBER)) {
        userSubmission[0].inputData.push(pageData.find(value => value.page === PAGE_NUMBER)!.userSubmission[0].inputData[0]);
      }
      submitData(PAGE_NUMBER, userSubmission);
    } else {
      setIsAnswerShow(isAnswerShow => !isAnswerShow);
    }
  };

  const onSubmitRecorder = async () => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L04/SP02',
      changeData,
      mainKey: 1,
      page: STORE_NUMBER,
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: 1,
      userId,
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData[STORE_NUMBER].audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });

        setCardData(prev => ({
          ...prev,
          [STORE_NUMBER]: {
            ...prev[STORE_NUMBER],
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const getButtonColor = () => {
    const { audioData, isSubmitted } = cardData[STORE_NUMBER];

    if (!isSubmitted) {
      return Object.entries(audioData!).length > 0 ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);
  interface IComp {
    part: 'A' | 'B';
    hasRecord: boolean;
    speech?: string;
    sentences?: string[];
    marginTop?: number;
  }

  const SpeechBallon = ({ part, hasRecord, speech, sentences, marginTop }: IComp) => {
    return (
      <Box marginTop={marginTop ? `${marginTop}px` : `0px`}>
        <Box hAlign={part == 'A' ? 'start' : 'end'}>
          {part == 'A' && <Label value={part} type={'paint'} background={'var(--color-blue-100)'} />}
          {hasRecord && (
            <Box
              width='478px'
              backgroundColor='var(--color-red-100)'
              border='none'
              useRound
              hAlign='center'
              padding='12px 0'
              marginLeft='8px'
              marginRight='8px'
            >
              <Recorder
                recorderIndex={1}
                initialData={cardData[STORE_NUMBER].audioData?.[1]}
                readOnly={cardData[STORE_NUMBER].isSubmitted}
                onSubmit={() => {
                  onSubmitRecorder();
                }}
                ref={recorderRef}
              />
            </Box>
          )}
          {speech && (
            <Box
              backgroundColor={part == 'A' ? 'var(--color-blue-100)' : 'var(--color-orange-200)'}
              border='none'
              useRound
              hAlign='center'
              padding='12px'
              margin='0 8px'
            >
              <Typography>{speech}</Typography>
            </Box>
          )}
          {part == 'B' && <Label value={part} type={'paint'} background={'var(--color-orange-200)'} />}
        </Box>
        {sentences && (
          <Box hAlign={part == 'A' ? 'start' : 'end'} margin='26px 45px 0 0'>
            <TextView title='보기' hAlign='start'>
              {sentences.map(sen => {
                return (
                  <Box key={sen}>
                    <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
                      {sen}
                    </Typography>
                  </Box>
                );
              })}
            </TextView>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData[STORE_NUMBER].isSubmitted ? '완료하기' : !isAnswerShow ? '답안보기' : '답안닫기'}
      onSubmit={onSubmit}
      submitDisabled={
        (Object.entries(cardData[STORE_NUMBER].audioData!).length === 0 || cardData[STORE_NUMBER].isSubmitted) &&
        !cardData[STORE_NUMBER].isSubmitted &&
        !isAnswerShow
      }
      submitBtnColor={getButtonColor()}
    >
      <SpeechBallon
        part='A'
        hasRecord={false}
        speech='What do you think about the effect of technology on the future of food?
        '
        marginTop={20}
      />
      <SpeechBallon
        part='B'
        hasRecord={true}
        sentences={[
          'I believe that technology will make the future of food truly bright.',
          'Future food will be both delicious and environmentally friendly.',
        ]}
        marginTop={20}
      />

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>I believe that technology will make the future of food truly bright.</Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>A: 기술이 음식의 미래에 어떻게 영향을 미칠 것이라고 생각해?</Typography>
            <Typography>B: 나는 기술이 식량의 미래를 진정으로 밝게 만들 것이라고 생각해.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P11;
