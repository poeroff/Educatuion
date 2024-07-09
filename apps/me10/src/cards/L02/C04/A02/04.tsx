import { useEffect, useRef, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Scroll,
  Button,
  Input,
  Recorder,
  BoxWrap,
  EStyleButtonTypes,
  IRecorderRef,
  EStyleSizes,
  Typography,
  IUploadRecordData,
  makeAudioData,
  Table,
  EStyleTableTypes,
  TBody,
  TR,
  TH,
  TD,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/en';
import { studentAtom } from '@/stores/student';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { useRecoilValue, useRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { L02C04A02 } from './store';

const P04 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L02C04A02);
  const { userId } = useRecoilValue(studentAtom);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShow, setShow] = useState<boolean>(false);

  const recorderRef = useRef<IRecorderRef>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Weather Report: Step 3',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: '기상 캐스터가 되어 오늘의 날씨를 안내해 봅시다.',
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
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 5,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const onSubmitAnswer = () => {
    if (cardData.p04.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer1,
            isAnswer: true,
            isCorrect: true,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p04.answer2,
            isAnswer: true,
            isCorrect: true,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p04.answer3,
            isAnswer: true,
            isCorrect: true,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p04.answer4,
            isAnswer: true,
            isCorrect: true,
          },
          {
            subKey: 5,
            type: 'AUDIO',
            value: {},
          },
        ],
      },
    ];

    if (pageData.find(value => value.page === 'P04')) {
      userSubmission[0].inputData = pageData.find(value => value.page === 'P04')!.userSubmission[0].inputData;
    }

    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true } }));
    submitData('P04', userSubmission);
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L02/C04/A02',
      changeData,
      mainKey: 1,
      page: 'p04',
      setFunction: setCardData,
      subjectCode: 'ME10',
      subKey: index,
      userId,
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p04.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
        });

        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p04.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p04.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p04.answer4,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const checkBtnColorInput = () => {
    return (
      Object.values(cardData.p04.audioData!).every(value => value) &&
      Object.values(cardData.p04.audioData!).length !== 0 &&
      cardData.p04.answer1 &&
      isNotEmptyString(cardData.p04.answer1) &&
      cardData.p04.answer2 &&
      isNotEmptyString(cardData.p04.answer2) &&
      cardData.p04.answer3 &&
      isNotEmptyString(cardData.p04.answer3) &&
      cardData.p04.answer4 &&
      isNotEmptyString(cardData.p04.answer4)
    );
  };

  const checkDisableInput = () => {
    return !(
      Object.values(cardData.p04.audioData!).every(value => value) &&
      Object.values(cardData.p04.audioData!).length !== 0 &&
      cardData.p04.answer1 &&
      isNotEmptyString(cardData.p04.answer1) &&
      cardData.p04.answer2 &&
      isNotEmptyString(cardData.p04.answer2) &&
      cardData.p04.answer3 &&
      isNotEmptyString(cardData.p04.answer3) &&
      cardData.p04.answer4 &&
      isNotEmptyString(cardData.p04.answer4)
    );
  };

  const handleInputChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer4: value } }));
    }
    changeData('P04', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P04');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitBtnColor={
        checkBtnColorInput()
          ? cardData.p04.isSubmitted
            ? isShow
              ? EStyleButtonTypes.GRAY
              : EStyleButtonTypes.PRIMARY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={onSubmitAnswer}
      submitDisabled={checkDisableInput()}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
    >
      <Box background={'white'} useRound>
        <Scroll height='300px'>
          <Typography lineHeight='2' usePre>
            Good morning.{'\n'}
            Welcome to today's weather report.{'\n'}
            I'm &nbsp;
            <Input
              maxLength={999}
              placeholder='e.g. Jinju Hong'
              name='value1'
              value={cardData.p04.answer1}
              width='259px'
              onChange={event => handleInputChange(1, event?.target.value)}
              readOnly={cardData.p04.isSubmitted}
            />
            &nbsp;
            <Input
              maxLength={999}
              placeholder='e.g. Seoul, Korea'
              name='value2'
              value={cardData.p04.answer2}
              width='259px'
              onChange={event => handleInputChange(2, event?.target.value)}
              readOnly={cardData.p04.isSubmitted}
            />
            {'\n'}
            It's &nbsp;
            <Input
              maxLength={999}
              placeholder='e.g. warm and sunny'
              name='value3'
              value={cardData.p04.answer3}
              width='526px'
              onChange={event => handleInputChange(3, event?.target.value)}
              readOnly={cardData.p04.isSubmitted}
            />
            {'\n'}
            People are &nbsp;
            <Input
              maxLength={999}
              placeholder='e.g. jogging in the park'
              name='value4'
              value={cardData.p04.answer4}
              width='436px'
              onChange={event => handleInputChange(4, event?.target.value)}
              readOnly={cardData.p04.isSubmitted}
            />
            {'\n'}
            That's the weather report for today.
          </Typography>
        </Scroll>
      </Box>

      <BoxWrap justifyContent={'space-between'} marginTop={'24px'} width={'100%'}>
        <Box width={'30%'}></Box>
        <Box width={'30%'} hAlign='center'>
          <Recorder
            recorderIndex={5}
            initialData={cardData.p04.audioData?.[5]}
            readOnly={cardData.p04.isSubmitted}
            onSubmit={() => {
              onSubmitRecorder(5);
            }}
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
            style={{ border: '1.5px var(--color-grey-500) solid', color: 'var(--color-grey-700)' }}
          />
        </Box>
      </BoxWrap>

      <Dialog width={1000} height={350} isShow={isShowModal} closeLabel='확인' onClose={closeModal} useFooter={true} confirmLabel='확인'>
        <Box height='100%' vAlign='center'>
          <Scroll>
            <Table sizes={['500px', 'auto']}>
              <TBody>
                <TR>
                  <TH bgColor='var(--color-blue-200)' fontColor='var(--color-black)' scope='row' hAlign='center'>
                    {cardData.p03.egSolution?.[0].question}
                  </TH>
                  <TD bgColor='var(--color-blue-100)' color={EStyleTableTypes.COLORFUL}>
                    <Input
                      type='text'
                      minWidth='500px'
                      maxLength={100}
                      value={cardData.p03.answer1}
                      disabled={true}
                      placeholder='e.g. Seoul, Korea'
                      ariaLabel='1번 답 입련란'
                    />
                  </TD>
                </TR>
                <TR>
                  <TH bgColor='var(--color-blue-200)' fontColor='var(--color-black)' scope='row' hAlign='center'>
                    {cardData.p03.egSolution?.[1].question}
                  </TH>
                  <TD bgColor='var(--color-blue-100)' color={EStyleTableTypes.COLORFUL}>
                    <Input
                      type='text'
                      minWidth='500px'
                      maxLength={100}
                      value={cardData.p03.answer2}
                      disabled={true}
                      placeholder='e.g. warm and sunny'
                      ariaLabel='2번 답 입련란'
                    />
                  </TD>
                </TR>
                <TR>
                  <TH bgColor='var(--color-blue-200)' fontColor='var(--color-black)' scope='row' hAlign='center'>
                    {cardData.p03.egSolution?.[2].question}
                  </TH>
                  <TD bgColor='var(--color-blue-100)' color={EStyleTableTypes.COLORFUL}>
                    <Input
                      type='text'
                      minWidth='500px'
                      maxLength={100}
                      value={cardData.p03.answer3}
                      disabled={true}
                      placeholder='e.g. carry an umbrella, take a walk'
                      ariaLabel='3번 답 입련란'
                    />
                  </TD>
                </TR>
              </TBody>
            </Table>
          </Scroll>
        </Box>
      </Dialog>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Typography>
              <Tag type={ETagLine.GREEN} label='예시 답안' />
            </Typography>
          </Box>
          <Box>
            <Typography usePre>{cardData.p04.egSolution?.[0].solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
