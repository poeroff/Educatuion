import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  TMainHeaderInfoTypes,
  Typography,
  IQuestionProps,
  EStyleButtonTypes,
  IRecorderRef,
  Recorder,
  IUploadRecordData,
  TextView,
  EStyleFontSizes,
  Label,
  BottomSheet,
  Tag,
  ETagLine,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L03SP02 } from './store';

const P11 = () => {
  const PAGE_NUMBER = 'P11';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L03SP02);
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
    if (!cardData.p11.isSubmitted) {
      setCardData(prev => ({ ...prev, p11: { ...prev.p11, isSubmitted: true } }));

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
      cardPath: 'L03/SP02',
      changeData,
      mainKey: 1,
      page: 'p11',
      setFunction: setCardData,
      subjectCode: 'HE10',
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
          originCardData: cardData.p11.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE10',
        });

        setCardData(prev => ({
          ...prev,
          p11: {
            ...prev.p11,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const resetAudio = () => {
    setCardData(prev => ({
      ...prev,
      p11: {
        ...prev.p11,
        audioData: {},
        isSubmitted: false,
      },
    }));
    changeData(PAGE_NUMBER, 1, 1, {});
  };

  const getButtonColor = () => {
    const { audioData, isSubmitted } = cardData.p11;

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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData.p11.isSubmitted ? '완료하기' : !isAnswerShow ? '답안보기' : '답안닫기'}
      onSubmit={onSubmit}
      submitDisabled={
        (Object.entries(cardData.p11.audioData!).length === 0 || cardData.p11.isSubmitted) && !cardData.p11.isSubmitted && !isAnswerShow
      }
      submitBtnColor={getButtonColor()}
    >
      <Box hAlign='start'>
        <Label value={'A'} type={'paint'} background='var(--color-blue-100)' />
        <Box width='478px' backgroundColor='var(--color-blue-100)' border='none' useRound hAlign='center' padding='12px' margin='0 8px'>
          <Recorder
            recorderIndex={1}
            initialData={cardData.p11.audioData?.[1]}
            readOnly={cardData.p11.isSubmitted}
            onSubmit={() => {
              onSubmitRecorder();
            }}
            onRefresh={resetAudio}
            ref={recorderRef}
          />
        </Box>
      </Box>
      <Box hAlign='start' margin='26px 45px 0 0'>
        <TextView title='보기' hAlign='start'>
          <Box>
            <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
              I wonder why the sea sometimes looks green.
            </Typography>
          </Box>
          <Box>
            <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
              The sea looks really cool, doesn't it?
            </Typography>
          </Box>
        </TextView>
      </Box>
      <Box marginTop='20px'>
        <Box hAlign='end'>
          <Box backgroundColor='var(--color-red-100)' border='none' useRound hAlign='center' padding='12px' margin='0 8px'>
            <Typography>Oceans appear green when the water reflects more green light.</Typography>
          </Box>
          <Label value={'B'} type={'paint'} background='var(--color-pink-100)' />
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>I wonder why the sea sometimes looks green.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P11;
