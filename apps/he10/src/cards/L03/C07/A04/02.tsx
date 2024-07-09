import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  Box,
  TMainHeaderInfoTypes,
  Typography,
  Recorder,
  Textarea,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Tag,
  IRecorderRef,
  IUploadRecordData,
  IAudioData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C07A04 } from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { handleDownload } from '@maidt-cntn/util/FileUtil';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C07A04);
  const recorderRef = useRef<IRecorderRef>(null);
  const pageData = useRecoilValue(pageDataAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };
  const questionInfo = {
    text: 'Where would you like to use noise-cancellation technology?',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
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
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    }
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer,
            isAnswer: true,
          },
        ],
      },
    ];

    if (pageData.find(value => value.page === 'P02')) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === 'P02')!.userSubmission[0].inputData[1]);
    }
    submitData('P02', userSubmission);
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: event.target.value,
      },
    }));
    changeData('P02', 1, 1, event.target.value);
  };

  const checkDisableInput = () => {
    const isCheckText = cardData.p02.answer === '';
    const isCheckRecord = Object.values(cardData.p02.audioData!).length !== 1;

    return isCheckText || isCheckRecord;
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L03/C07/A04',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: 'HE10',
      subKey: index,
      userId,
    });
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='center'
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={submitAnswer}
      submitBtnColor={checkDisableInput() ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitDisabled={checkDisableInput()}
    >
      <Typography weight={700}>I wish ... I can't ...</Typography>{' '}
      <Box height='290px' marginTop='10px' useFull>
        <Textarea
          height='200px'
          value={cardData.p02.answer}
          onChange={handleChangeValue}
          placeholder='내용을 넣어 주세요.'
          readOnly={cardData.p02.isSubmitted}
          ariaLabel={'답란'}
        />
      </Box>
      <Box hAlign='center' marginTop='10px'>
        <Recorder
          recorderIndex={2}
          initialData={cardData.p02.audioData?.[2]}
          onSubmit={() => {
            onSubmitRecorder(2);
          }}
          readOnly={cardData.p02.isSubmitted}
          ref={recorderRef}
        />
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow && cardData.p02.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>I wish I had a noise-cancelling table. I can’t focus on studying because of the noise around me.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
