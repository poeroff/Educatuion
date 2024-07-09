import { useEffect, useRef, useState } from 'react';
import {
  Image,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Textarea,
  PinchZoom,
  Typography,
  IQuestionProps,
  EStyleButtonTypes,
  Recorder,
  IRecorderRef,
  IUploadRecordData,
  IAudioData,
  BottomSheet,
  ETagLine,
  Tag,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L01C07A04 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { handleDownload } from '@maidt-cntn/util/FileUtil';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A04);
  const recorderRef = useRef<IRecorderRef>(null);
  const pageData = useRecoilValue(pageDataAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Which one you like the most and why?',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXTAREA',
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
          subjectCode: 'HE20',
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
      cardPath: 'L01/C07/A04',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: 'HE20',
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
      <BoxWrap height={'340px'} paddingLeft={'16px'} paddingRight={'16px'}>
        <Box useFull width='50%' vAlign='center' hAlign='center'>
          <PinchZoom>
            <Image src={'/L01/C07/A04/HE2-L01-C07-A04-P02.jpg'} width='100%' height='100%' alt='' />
            <Box type='hidden'>
              {` Only if we understand, can we care. Only if we care, will we help. Only if we help, shall all be saved.
– Jane Goodall
The question is not, “Can they reason?” nor, “Can they talk?” but, “Can they suffer?”
– Jeremy Bentham
It’s not enough to love animals; we must actively protect and preserve them.
– Daphne Sheldrick `}
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull width='50%'>
          <Typography>I like ... the most. ...</Typography>{' '}
          <Box marginTop='10px'>
            <Textarea
              height='200px'
              value={cardData.p02.answer}
              onChange={handleChangeValue}
              placeholder='내용을 넣어 주세요.'
              readOnly={cardData.p02.isSubmitted}
              ariaLabel={'답란'}
            />
          </Box>
          <Box marginTop={20} vAlign='center' hAlign='center'>
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
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow && cardData.p02.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>
              I like what Jeremy Bentham said the most. We should be aware that animals can suffer just like humans.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
