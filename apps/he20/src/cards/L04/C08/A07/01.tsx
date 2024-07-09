import {
  TMainHeaderInfoTypes,
  Image,
  BoxWrap,
  Recorder,
  EStyleButtonTypes,
  IRecorderRef,
  IAudioData,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L04C08A07 } from './store';
import { Container } from '@maidt-cntn/ui/en';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P01 = () => {
  const PAGE_NUMBER = 'P01';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A07);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const recorderRef = useRef<IRecorderRef>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Fun with Grammar',
    headerPattern: 'text',
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

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsCompleted(!isCompleted);
    } else {
      submitAnswer();
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1,
          },
        ],
      },
    ];
    if (pageData.find(value => value.page === PAGE_NUMBER)) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === PAGE_NUMBER)!.userSubmission[0].inputData[1]);
    }
    submitData(PAGE_NUMBER, userSubmission);
  };

  const onSubmitRecorder = async () => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L04/C08/A07',
      changeData,
      mainKey: 1,
      page: 'p01',
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: 2,
      userId,
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p01.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });

        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
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

  const questionInfo = {
    text: 'Guess and say what the man would say in the situation using the structures below.',
  };

  const checkDisableInput = () => {
    return !Object.keys(cardData.p01.audioData!).length;
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => {
        setIsCompleted(!isCompleted);
        handleSubmit();
      }}
      submitBtnColor={cardData.p01.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p01.isSubmitted || checkDisableInput()}
    >
      <BoxWrap justifyContent={'center'}>
        <Image
          alt={`I find it fun to sing in front of people. 이라고 말하면서 마이크에 대고 신나게 노래하는 여자 옆에 귀를 막은 남자가 있다`}
          src={'/L04/C08/A07/HE2-L04-C08-A07-01.jpg'}
          width='300px'
          height='300px'
        />
      </BoxWrap>
      <BoxWrap justifyContent={'center'} marginTop={'20px'}>
        <Recorder
          ref={recorderRef}
          recorderIndex={1}
          initialData={cardData.p01.audioData?.[2]}
          readOnly={cardData.p01.isSubmitted}
          onSubmit={() => {
            onSubmitRecorder();
            setIsCompleted(true);
          }}
          onRefresh={() => {
            setIsCompleted(false);
          }}
        />
      </BoxWrap>
    </Container>
  );
};

export default P01;
