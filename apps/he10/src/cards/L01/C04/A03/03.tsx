import { ChangeEvent, useState, useEffect, useRef } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Scroll,
  Button,
  Input,
  BoxWrap,
  EStyleButtonTypes,
  EStyleSizes,
  List,
  Question,
  IRecorderRef,
  Recorder,
  IAudioData,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L01C04A03 } from './store';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P03 = () => {
  const currentPage = 'P03';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C04A03);
  const recorderRef = useRef<IRecorderRef>(null);
  const pageData = useRecoilValue(pageDataAtom);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 3. Present and Share',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Fill in the blanks to present your speech.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', '', ''],
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
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p03.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE10',
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
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedAnswers = cardData.p03.answer?.map((ans, idx) => (idx === index ? e.target.value : ans));
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer: updatedAnswers,
      },
    }));
    changeData(currentPage, 1, 1, updatedAnswers);
  };

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
            isAnswer: true,
          },
        ],
      },
    ];

    if (pageData.find(value => value.page === 'P03')) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === currentPage)!.userSubmission[0].inputData[1]);
    }
    submitData(currentPage, userSubmission);
  };

  const openModal = () => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  };

  const checkDisableInput = () => {
    return !cardData.p03.answer?.every(val => val) || Object.values(cardData.p03.audioData!).length === 0;
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L01/C04/A03',
      changeData,
      mainKey: 1,
      page: 'p03',
      setFunction: setCardData,
      subjectCode: 'HE10',
      subKey: index,
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
      onSubmit={() => {
        submitAnswer();
      }}
    >
      <Box background={'white'} height='350px' useRound useFull>
        <Scroll tabIndex={0}>
          <Box>
            Hello, I'm{' '}
            <Input
              textAlign='left'
              value={cardData.p03.answer?.[0]}
              maxLength={100}
              placeholder='e.g. Hajun'
              onChange={e => handleInputChangeEvent(e, 0)}
              ariaLabel={'1번째 답 입력란'}
              readOnly={cardData.p03.isSubmitted}
            />
            . It's a great honor to speak as a representative of the 1st grade students. As a newcomer myself, I understand how everybody is feeling
            at the moment. We might feel a bit worried about{' '}
            <Input
              textAlign='left'
              value={cardData.p03.answer?.[1]}
              maxLength={100}
              width='630px'
              placeholder='e.g. making new friends or performing well in class'
              onChange={e => handleInputChangeEvent(e, 1)}
              ariaLabel={'2번째 답 입력란'}
              readOnly={cardData.p03.isSubmitted}
            />
            . Instead of focusing on those worries, let's try a few things together. First,{' '}
            <Input
              textAlign='left'
              value={cardData.p03.answer?.[2]}
              maxLength={100}
              width='785px'
              placeholder="e.g. let's join clubs to make new friends"
              onChange={e => handleInputChangeEvent(e, 2)}
              ariaLabel={'3번째 답 입력란'}
              readOnly={cardData.p03.isSubmitted}
            />
            . Second,{' '}
            <Input
              textAlign='left'
              value={cardData.p03.answer?.[3]}
              maxLength={100}
              width='750px'
              placeholder='e.g. seek advice from seniors and teachers for support'
              onChange={e => handleInputChangeEvent(e, 3)}
              ariaLabel={'4번째 답 입력란'}
              readOnly={cardData.p03.isSubmitted}
            />
            . I hope we all can{' '}
            <Input
              textAlign='left'
              value={cardData.p03.answer?.[4]}
              maxLength={100}
              width='650px'
              placeholder='e.g. accomplish our goals and enjoy high school life'
              onChange={e => handleInputChangeEvent(e, 4)}
              ariaLabel={'5번째 답 입력란'}
              readOnly={cardData.p03.isSubmitted}
            />
          </Box>
          .
        </Scroll>
      </Box>
      <BoxWrap justifyContent={'space-between'} marginTop={'20px'} width={'100%'}>
        <Box width={'30%'}></Box>
        <Box width={'30%'} hAlign='center'>
          <Recorder
            recorderIndex={2}
            initialData={cardData.p03.audioData?.[2]}
            onSubmit={() => {
              onSubmitRecorder(2);
            }}
            readOnly={cardData.p03.isSubmitted}
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
            onClick={openModal}
          />
        </Box>
      </BoxWrap>

      <Dialog
        width={921}
        isShow={isShowModal}
        closeLabel='확인'
        onClose={closeModal}
        useFooter={true}
        confirmLabel='확인'
        tabIndex={101}
        tabIndexCount={3}
      >
        <Box>
          <Scroll>
            <List data={cardData.p01.contents!}>
              {({ value, index = 1 }) => (
                <>
                  <Question size={'small'}>
                    {index}. {value}
                  </Question>
                  <Box marginTop='8px'>
                    <Input
                      textAlign='left'
                      width='100%'
                      name='modalValue'
                      maxLength={100}
                      value={cardData.p01.answer?.[index - 1]}
                      ariaLabel={`${index + 1}번째 답 입력란`}
                      readOnly={cardData.p01.isSubmitted}
                    />
                  </Box>
                </>
              )}
            </List>
          </Scroll>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P03;
