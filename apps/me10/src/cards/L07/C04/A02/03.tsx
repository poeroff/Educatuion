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
  IRecorderRef,
  Recorder,
  IUploadRecordData,
  makeAudioData,
  Typography,
  ICanvasFunction,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L07C04A02 } from './store';
import { dataURLToBlob, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import DialogContent from './DialogContent';

const P03 = () => {
  const currentPage = 'P03';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L07C04A02);
  const recorderRef = useRef<IRecorderRef>(null);
  const pageData = useRecoilValue(pageDataAtom);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const canvasRef2 = useRef<ICanvasFunction>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'About Animals: Step 3',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Step 2를 바탕으로 관심 있는 동물을 소개해 봅시다.',
  };

  const exampleSolution = `Do you know about pandas? Here are some fun facts. First, pandas are big eaters. Every day, they can eat for 12 hours. Second, baby pandas are pink. They are about 15 cm long. Lastly, pandas can swim.`;
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
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p03.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
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

        cardData.p02.canvasDataURL && canvasRef2?.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p02.canvasDataURL));
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
    const updatedAnswers = cardData.p03.answer?.map((ans, idx) => (idx === index ? truncateToMaxBytes(e.target.value) : ans));
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
      setIsOpen(!isOpen);
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

  const isSubmitDisabled = !cardData.p03.answer?.every(val => val) || Object.values(cardData.p03.audioData!).length === 0;

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L07/C04/A02',
      changeData,
      mainKey: 1,
      page: 'p03',
      setFunction: setCardData,
      subjectCode: 'ME10',
      subKey: index,
      userId,
    });
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitLabel={cardData.p03.isSubmitted ? (isOpen ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isSubmitDisabled}
      onSubmit={submitAnswer}
    >
      <Box background={'white'} height='350px' useRound useFull>
        <Scroll tabIndex={0}>
          <Box>
            <Typography>
              Do you know about &nbsp;
              <Input
                textAlign='left'
                value={cardData.p03.answer?.[0]}
                maxLength={100}
                width='300px'
                placeholder='e.g. pandas'
                onChange={e => handleInputChangeEvent(e, 0)}
                ariaLabel={'1번째 답 입력란'}
                readOnly={cardData.p03.isSubmitted}
              />
              &nbsp;?
            </Typography>
            <br />
            <Typography>Here are some fun facts.</Typography>
            <br />
            <Typography>
              First, &nbsp;
              <Input
                textAlign='left'
                value={cardData.p03.answer?.[1]}
                maxLength={100}
                width='600px'
                placeholder='e.g. pandas are big eaters'
                onChange={e => handleInputChangeEvent(e, 1)}
                ariaLabel={'2번째 답 입력란'}
                readOnly={cardData.p03.isSubmitted}
              />
              &nbsp;.
            </Typography>
            <Typography>
              <Input
                textAlign='left'
                value={cardData.p03.answer?.[2]}
                maxLength={100}
                width='770px'
                placeholder='e.g. Every day, they can eat for 12 hours'
                onChange={e => handleInputChangeEvent(e, 2)}
                ariaLabel={'3번째 답 입력란'}
                readOnly={cardData.p03.isSubmitted}
              />
              &nbsp;.
            </Typography>
            <Typography>
              Second,&nbsp;
              <Input
                textAlign='left'
                value={cardData.p03.answer?.[3]}
                maxLength={100}
                width='600px'
                placeholder='e.g. baby pandas are pink'
                onChange={e => handleInputChangeEvent(e, 3)}
                ariaLabel={'4번째 답 입력란'}
                readOnly={cardData.p03.isSubmitted}
              />
              &nbsp;.
            </Typography>
            <Typography>
              <Input
                textAlign='left'
                value={cardData.p03.answer?.[4]}
                maxLength={100}
                width='770px'
                placeholder='e.g. They are about 15 cm long'
                onChange={e => handleInputChangeEvent(e, 4)}
                ariaLabel={'5번째 답 입력란'}
                readOnly={cardData.p03.isSubmitted}
              />
              &nbsp;.
            </Typography>
            <Typography>
              Lastly, &nbsp;
              <Input
                textAlign='left'
                value={cardData.p03.answer?.[5]}
                maxLength={100}
                width='600px'
                placeholder='e.g. pandas can swim'
                onChange={e => handleInputChangeEvent(e, 5)}
                ariaLabel={'6번째 답 입력란'}
                readOnly={cardData.p03.isSubmitted}
              />
              &nbsp;.
            </Typography>
          </Box>
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

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'예시 답안'} />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{exampleSolution}</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        width={960}
        height={530}
        isShow={isShowModal}
        closeLabel='확인'
        onClose={closeModal}
        useFooter={true}
        tabIndex={101}
        confirmLabel='확인'
      >
        <Box>
          <Scroll>
            <DialogContent answer={cardData.p02.answer} canvasDataURL={cardData.p02.canvasDataURL} />
          </Scroll>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P03;
