import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TAnswers } from '.';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleSizes,
  IQuestionProps,
  IRecorderRef,
  IUploadRecordData,
  Input,
  List,
  Question,
  Recorder,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L03C04A03 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C04A03);
  const recorderRef = useRef<IRecorderRef>(null);
  const pageData = useRecoilValue(pageDataAtom);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 3. Present and Share',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Fill in the blanks to present a lecture.',
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

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedAnswers = cardData.p03.answer?.map((ans, idx) => (idx === index ? e.target.value : ans));
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
    return !cardData.p03.answer?.every(val => val) || Object.values(cardData.p03.audioData!).length === 0;
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L03/C04/A03',
      changeData,
      mainKey: 1,
      page: 'p03',
      setFunction: setCardData,
      subjectCode: 'HE10',
      subKey: index,
      userId,
    });
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', '', '', ''],
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
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = async () => {
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
      userSubmission[0].inputData.push(pageData.find(value => value.page === 'P03')!.userSubmission[0].inputData[1]);
    }
    submitData('P03', userSubmission);
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

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitLabel='완료하기'
      submitBtnColor={cardData.p03.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p03.isSubmitted || checkDisableInput()}
      onSubmit={handleSubmit}
    >
      <Box background={'white'} height='330px' useRound useFull>
        <Scroll tabIndex={0}>
          <Typography useGap={false}>
            Hello, students! Today, I'd like to talk about
            <Input
              textAlign='left'
              value={cardData.p03.answer?.[0]}
              width='520px'
              maxLength={100}
              placeholder='e.g. the concept of hexagonal structures'
              onChange={e => handleInputChangeEvent(e, 0)}
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='1번째 답안 입력란'
            />
            . Have you heard of it before? It's inspired by&nbsp;
            <Input
              textAlign='left'
              value={cardData.p03.answer?.[1]}
              maxLength={100}
              width='560px'
              placeholder='e.g the hexagonal shape found in beehives'
              onChange={e => handleInputChangeEvent(e, 1)}
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='2번째 답안 입력란'
            />
            .&nbsp;
            <Input
              textAlign='left'
              value={cardData.p03.answer?.[2]}
              maxLength={100}
              width='650px'
              placeholder='e.g The structure is strong and resistant to weight'
              onChange={e => handleInputChangeEvent(e, 2)}
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='3번째 답안 입력란'
            />
            &nbsp;because
            <Input
              textAlign='left'
              value={cardData.p03.answer?.[3]}
              maxLength={100}
              width='650px'
              placeholder='e.g hexagonally shaped cells are tightly connected'
              onChange={e => handleInputChangeEvent(e, 3)}
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='4번째 답안 입력란'
            />
            . You may wonder how can apply this principle to our lives. As one example, we can use it in&nbsp;
            <Input
              textAlign='left'
              value={cardData.p03.answer?.[4]}
              maxLength={100}
              width='400px'
              placeholder='e.g. the construction industry'
              onChange={e => handleInputChangeEvent(e, 4)}
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='5번째 답안 입력란'
            />
            . It can also be used in many other products, like&nbsp;
            <Input
              textAlign='left'
              value={cardData.p03.answer?.[5]}
              maxLength={100}
              width='270px'
              placeholder='e.g wrapping paper'
              onChange={e => handleInputChangeEvent(e, 5)}
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='6번째 답안 입력란'
            />
            . Thank you for listening
          </Typography>
        </Scroll>
      </Box>
      <BoxWrap justifyContent={'space-between'} marginTop={'24px'} width={'100%'}>
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

      <Dialog width={921} isShow={isShowModal} closeLabel='확인' onClose={closeModal} useFooter={true} confirmLabel='확인' tabIndexCount={3}>
        <Box>
          <Scroll>
            <List data={cardData.p01.contents || []}>
              {({ value, index = 1 }) => (
                <>
                  <Question type={'dot'} size={'small'}>
                    {value}
                  </Question>
                  <Box marginTop='8px'>
                    <Input textAlign='left' width='100%' name='modalValue' value={cardData.p01.answer?.[index - 1]} disabled />
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
