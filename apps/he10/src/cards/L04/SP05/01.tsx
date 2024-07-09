import {
  Box,
  TMainHeaderInfoTypes,
  Typography,
  Recorder,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  IRecorderRef,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef, useState } from 'react';
import { L04SP05 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';

const P01 = ({ _page = 'P01' }: { _page?: string }) => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04SP05);
  const { userId } = useRecoilValue(studentAtom);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const recorderRef = useRef<IRecorderRef>(null);
  const pageData = useRecoilValue(pageDataAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 자유 발화',
  };
  const questionInfo = {
    text: '다음 질문에 대해 나의 답변을 자유롭게 말해 봅시다.',
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p01.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE10',
        });

        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShowAnswer(prev => !prev);
      return;
    }
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === _page)) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === _page)!.userSubmission[0].inputData[0]);
    }
    submitData(_page, userSubmission);
  };

  const onSubmitRecorder = async () => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L04/SP05',
      changeData,
      mainKey: 1,
      page: _page.toLowerCase(),
      subjectCode: 'HE10',
      subKey: 1,
      userId,
      setFunction: setCardData,
    });
  };

  useEffect(() => {
    return () => {
      saveData(_page);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const BttonColorShow = () => {
    const { audioData, isSubmitted } = cardData.p01;

    if (!isSubmitted) {
      return Object.entries(audioData!).length > 0 ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData.p01.isSubmitted ? '완료하기' : !isShowAnswer ? '답안 보기' : '답안 닫기'}
      onSubmit={onSubmitAnswer}
      submitDisabled={
        (Object.entries(cardData.p01.audioData!).length === 0 || cardData.p01.isSubmitted) && !cardData.p01.isSubmitted && !isShowAnswer
      }
      submitBtnColor={BttonColorShow()}
    >
      <Box vAlign='center' marginTop='20px' textAlign='center' tabIndex={101} flexDirection='column' gap='8px'>
        <Typography>What are you worried about these days and why?</Typography>
        <Typography>Use an expression you learned in this lesson.</Typography>
      </Box>
      <Box hAlign='center' marginTop='20px'>
        <Recorder
          recorderIndex={1}
          initialData={cardData.p01.audioData?.[1]}
          readOnly={cardData.p01.isSubmitted}
          onRefresh={() => {
            setCardData(prev => ({
              ...prev,
              p01: {
                ...prev.p01,
                audioData: {},
                isSubmitted: false,
              },
            }));
            changeData(_page, 1, 1, {});
          }}
          onSubmit={() => {
            onSubmitRecorder();
          }}
          ref={recorderRef}
        />
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box tabIndex={102}>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box vAlign='flex-start' marginTop='10px' textAlign='left' tabIndex={103} flexDirection='column' gap='10px'>
            <Typography> {cardData.p01.exampleAnswerEng} </Typography>
            <Typography> {cardData.p01.exampleAnswerKor} </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;