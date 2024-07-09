import {
  Box,
  BoxWrap,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleSizes,
  IAudioData,
  IQuestionProps,
  IRecorderRef,
  IUploadRecordData,
  Input,
  List,
  Question,
  Recorder,
  Scroll,
  TMainHeaderInfoTypes,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C04A03 } from './store';

const headerInfo: TMainHeaderInfoTypes = {
  headerPattern: 'text',
  headerText: 'Topic Preview',
};

const questionInfo: IQuestionProps = {
  type: 'text',
  text: 'Write and talk about why we are willing to help people in need.',
};

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C04A03);
  const recorderRef = useRef<IRecorderRef>(null);
  const [showModal, setShowModal] = useState(false);
  const pageData = useRecoilValue(pageDataAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
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
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p03.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });

        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p03.answer,
          },
        ],
      },
    ];
    if (pageData.find(value => value.page === 'P03')) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === 'P03')!.userSubmission[0].inputData[1]);
    }
    submitData('P03', userSubmission);
  };

  const handleChange = (index: number, value: string) => {
    const updatedAnswers = cardData.p03.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer: updatedAnswers,
      },
    }));
    changeData('P03', 1, 1, updatedAnswers);
  };

  const checkDisableInput = () => {
    return !(cardData.p03.answer?.every(val => val) && Object.values(cardData.p03.audioData || {}).length > 0);
  };

  const onSubmitRecorder = async () => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L02/C04/A03',
      changeData,
      mainKey: 1,
      page: 'p03',
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: 2,
      userId,
    });
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitLabel='완료하기'
      submitBtnColor={cardData.p03.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p03.isSubmitted || checkDisableInput()}
      onSubmit={submitAnswer}
    >
      <Box background={'white'} height='330px' useRound useFull>
        <Scroll tabIndex={101}>
          Welcome to our live show on social media! Today, I’d like to show you one of our top-selling items:{' '}
          <Input
            inputSize='x-small'
            name='value1'
            textAlign='left'
            value={cardData.p03.answer?.[0]}
            maxLength={100}
            width='300px'
            minWidth='100px'
            placeholder='e.g. a bluetooth keyboard'
            readOnly={cardData.p03.isSubmitted}
            onChange={e => handleChange(0, e.target.value)}
            ariaLabel={`첫번째 답란`}
          />
          .{' '}
          <Input
            inputSize='x-small'
            name='value2'
            textAlign='left'
            value={cardData.p03.answer?.[1]}
            maxLength={100}
            width='860px'
            minWidth='100px'
            placeholder='e.g. It has a comfortable, curved design to support your wrists better than others'
            readOnly={cardData.p03.isSubmitted}
            onChange={e => handleChange(1, e.target.value)}
            ariaLabel={`두번째 답란`}
          />
          .<br />
          Most of our users are satisfied with this product.
          <br />
          <Input
            inputSize='x-small'
            name='value3'
            textAlign='left'
            value={cardData.p03.answer?.[2]}
            maxLength={100}
            width='520px'
            minWidth='100px'
            placeholder='e.g. If you share a photo review on our website'
            readOnly={cardData.p03.isSubmitted}
            onChange={e => handleChange(2, e.target.value)}
            ariaLabel={`세번째 답란`}
          />{' '}
          <Input
            inputSize='x-small'
            name='value4'
            textAlign='left'
            value={cardData.p03.answer?.[3]}
            maxLength={100}
            width='730px'
            minWidth='100px'
            placeholder='e.g. we’ll reward you with a 10% off coupon for your next purchase'
            readOnly={cardData.p03.isSubmitted}
            onChange={e => handleChange(3, e.target.value)}
            ariaLabel={`네번째 답란`}
          />
          .<br />
          Don’t miss this great opportunity!
        </Scroll>
      </Box>
      <BoxWrap justifyContent={'space-between'} marginTop={'24px'} width={'100%'}>
        <Box width={'30%'}></Box>
        <Box width={'30%'} hAlign='center'>
          <Recorder
            recorderIndex={1}
            initialData={cardData.p03.audioData?.[2]}
            readOnly={cardData.p03.isSubmitted}
            onSubmit={onSubmitRecorder}
            ref={recorderRef}
          />
        </Box>
        <Box width={'30%'} hAlign='flex-end'>
          <Button
            label={'작성 내용 보기'}
            color={EStyleButtonTypes.SECONDARY}
            size={EStyleSizes['SMALL']}
            minWidth='132px'
            useRound
            onClick={() => setShowModal(true)}
          />
        </Box>
      </BoxWrap>

      <Dialog width={921} isShow={showModal} closeLabel='확인' onClose={() => setShowModal(false)} useFooter={true} confirmLabel='확인'>
        <List data={cardData.p01.answer || []}>
          {({ value, index = 1 }) => (
            <>
              <Question size={'small'}>
                {index}. {cardData.p01.questions?.[index - 1]}
              </Question>
              <Box marginTop='8px'>
                <Input inputSize='x-small' textAlign='left' width='100%' name='modalValue' value={value} readOnly />
              </Box>
            </>
          )}
        </List>
      </Dialog>
    </Container>
  );
};

export default P03;
