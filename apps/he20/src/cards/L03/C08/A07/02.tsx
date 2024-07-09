import { TMainHeaderInfoTypes, Box, Recorder, Image, EStyleButtonTypes, IRecorderRef, IUploadRecordData, makeAudioData } from '@maidt-cntn/ui';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L03C08A07 } from './store';

const P02 = () => {
  const PAGE_NUMBER = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A07);
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
    if (cardData.p02.isSubmitted) {
      setIsCompleted(!isCompleted);
    } else {
      submitAnswer();
    }
  };

  const submitAnswer = () => {
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
    if (pageData.find(value => value.page === PAGE_NUMBER)) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === PAGE_NUMBER)!.userSubmission[0].inputData[1]);
    }
    submitData(PAGE_NUMBER, userSubmission);
  };

  const onSubmitRecorder = async () => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L03/C08/A07',
      changeData,
      mainKey: 1,
      page: 'p02',
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
          originCardData: cardData.p02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
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
    text: 'Guess and say what the woman on the right would say in the situation using the structures below.',
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
      submitBtnColor={cardData.p02.isSubmitted || !isCompleted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p02.isSubmitted || !isCompleted}
    >
      <Box justifyContent='center'>
        <Image
          src={'/L03/C08/A07/HE2-L03-C08-A07-02.jpg'}
          width={'100%'}
          alt='Although he became a free man, he still faced racial discrimination. 빨간 색자 Although 가 이끄는 절이 하늘색 음영으로 강조되어 있다. '
        />
        <Image
          src={'/L03/C08/A07/HE2-L03-C08-A07-03.jpg'}
          width={'100%'}
          alt='Despite challenges in their lives, the artists never gave up on their art. 파란 색자 Despite 가 이끄는 구가 하늘색 음영으로 강조되어 있다. '
        />
        <Image src={'/L03/C08/A07/HE2-L03-C08-A07-04.jpg'} width={'100%'} alt='' ariaDescribedby='img_desc' />
        <Box type='hidden' id='img_desc'>
          <p>She even studied abroad in Paris, which was unusual for women at the time.</p>
          <p>She 부터 Paris까지 파란 색자로, 빨간 색자 which 가 이끄는 절이 하늘색 음영으로 강조되어 있다.</p>
        </Box>
        <Image src={'/L03/C08/A07/HE2-L03-C08-A07-05.jpg'} width={'100%'} alt='' ariaDescribedby='img_desc' />
        <Box type='hidden' id='img_desc'>
          <p>Lewis went to live with her aunt in Digby, where she met her future husband.</p>
          <p>Digby가 파란 색자로, 빨간 색자 where가 이끄는 절은 하늘색 음영으로 강조되어 있다.</p>
        </Box>
      </Box>
      <Box marginTop='50px' display='flex' justifyContent='center'>
        <Box marginLeft='4px'>
          <Recorder
            ref={recorderRef}
            recorderIndex={1}
            initialData={cardData.p02.audioData?.[2]}
            readOnly={cardData.p02.isSubmitted}
            onSubmit={() => {
              onSubmitRecorder();
              setIsCompleted(true);
            }}
            onRefresh={() => {
              setIsCompleted(false);
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
