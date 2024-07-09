import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioData,
  IRecorderRef,
  IUploadRecordData,
  makeAudioData,
  Recorder,
  Tag,
  Textarea,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import L04C07A04State from './store';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L04C07A04State);

  const recorderRef = useRef<IRecorderRef>(null);

  const [showAnswer, setShowAnswer] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };
  const questionInfo = {
    text: 'Share your findings.',
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            audioData: newAudioData,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer,
          },
        ],
      },
    ];

    if (pageData.find(value => value.page === 'P02')) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === 'P02')!.userSubmission[0].inputData[1]);
    }
    submitData('P02', userSubmission);
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      submitAnswer();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: e.target.value } }));
    changeData('P02', 1, 1, e.target.value);
  };
  const isInputComplete = useMemo(() => {
    return !!cardData.p02.answer?.trim() && !!cardData.p02.audioData?.[2];
  }, [cardData.p02]);

  const getSubmitBtnColor = (isInputComplete: boolean, showAnswer: boolean): EStyleButtonTypes => {
    if (!isInputComplete) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  };

  const handleRecorderSubmit = async () => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L04/C07/A04',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: 'HE10',
      subKey: 2,
      userId,
    });
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData.p02.isSubmitted ? '완료하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitBtnColor={getSubmitBtnColor(isInputComplete, showAnswer)}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
    >
      <Typography weight={700}>A company in the ... is ...</Typography>
      <Box height='290px' marginTop='10px' useFull>
        <Textarea
          width='100%'
          height='100%'
          placeholder='내용을 넣어 주세요.'
          value={cardData.p02.answer}
          onChange={e => handleTextChange(e)}
          readOnly={cardData.p02.isSubmitted}
          ariaLabel='답 입력란'
        />
      </Box>
      <Box hAlign='center' marginTop='10px'>
        <Recorder
          ref={recorderRef}
          recorderIndex={1}
          onSubmit={handleRecorderSubmit}
          initialData={cardData.p02.audioData?.[2]}
          readOnly={cardData.p02.isSubmitted}
        />
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>
              Korea is taking action to recycle spent coffee grounds. Several cities in Korea are promoting the recycling of coffee waste by providing
              a collection service.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
