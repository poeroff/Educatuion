import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  Box,
  Input,
  Label,
  TMainHeaderInfoTypes,
  Typography,
  makeAudioData,
  IUploadRecordData,
  Recorder,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  SimpleAudioPlayer,
  EStyleButtonTypes,
  IAudioData,
  BoxWrap,
  PinchZoom,
  Image,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C02A06 } from './store';
import { useEffect, useRef, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const defaultSubmission: userSubmissionType[] = [
  {
    mainKey: 1,
    inputData: [
      {
        subKey: 1,
        type: 'AUDIO',
        value: {},
      },
      {
        subKey: 2,
        type: 'BOOLEAN',
        value: false,
      },
      {
        subKey: 3,
        type: 'TEXT',
        value: '',
      },
    ],
  },
];

const P02 = () => {
  const pageKey = 'P02';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C02A06);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const [isShowBS, setIsShowBS] = useState<boolean>(false);

  const recorderRef = useRef<IRecorderRef | null>(null);
  const audioRef = useRef<ISimpleAudioPlayerRef | null>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'B',
    headerPattern: 'icon',
    iconType: 'meSmallTalk',
  };

  const questionInfo = {
    text: `지도를 보며 A가 되어 길을 묻는 문장을 완성한 후, 대화를 연습해 봅시다.`,
  };

  const data = {
    1: {
      label: { value: 'A', background: 'var(--color-blue-100)' },
      content: (
        <>
          <Typography>Where is</Typography>
          <Input
            value={cardData[pageKey].answer}
            onChange={e => handleInputChange(e.target.value)}
            readOnly={cardData[pageKey].isSubmitted}
            maxLength={100}
            placeholder='내용을 넣어 주세요.'
            width='280px'
            ariaLabel='A의 대사 빈칸'
          />
          <Typography>?</Typography>
        </>
      ),
    },
    2: {
      label: { value: 'B', background: 'var(--color-orange-200)' },
      content: <Typography>Go straight two blocks and turn left. It's on your right.</Typography>,
    },
  };

  const altText = (
    <>
      <p>가운데 세로로 난 길 아래에 화살표와 "You are here."라고 적혀 있는 지도.</p>
      <p>화살표 왼쪽에 Juice Store가 있다.</p>
      <p>가운데 길을 따라 첫 번째 사거리에서 왼쪽으로 돌면 오른쪽에 Pizza 가게와 Library가 나란히 있다.</p>
      <p>첫 번째 사거리에서 오른쪽으로 돌면 왼쪽에 Flower Shop이 있다.</p>
      <p>두 번째 사거리에서 왼쪽으로 돌면 오른쪽에 Park가 있다.</p>
      <p>두 번째 사거리에서 오른쪽으로 돌면 왼쪽에 School이 있다.</p>
    </>
  );

  const exampleAnswer = 'Where is the park?';

  const isEmptyAudioData = (data: IAudioData | null | undefined) => {
    return !data || Object.keys(data).length === 0;
  };

  const isSubmitDisabled =
    isEmptyAudioData(cardData[pageKey].audioData?.[1]) || !cardData[pageKey].listenComplete?.[1] || !isNotEmptyString(cardData[pageKey].answer || '');

  const handleSubmitRecorder = async () => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L04/C02/A06',
      changeData,
      mainKey: 1,
      page: pageKey,
      subjectCode: 'ME10',
      subKey: 1,
      userId,
      setFunction: setCardData,
    });
  };

  const handleClickRecorder = () => {
    handleAudioReset();
  };

  const handleAudioReset = () => {
    audioRef.current?.changePlayStatus(false);
  };

  const handleAudioEnded = () => {
    if (cardData[pageKey].listenComplete?.[1]) {
      return;
    }

    const newListenComplete = { ...cardData[pageKey].listenComplete };
    newListenComplete[1] = true;
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        listenComplete: newListenComplete,
      },
    }));
    changeData(pageKey, 1, 2, true);
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(pageKey, 1, 3, value);
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setIsShowBS(prev => !prev);
      return;
    }
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === pageKey)) {
      userSubmission[0].inputData = pageData.find(value => value.page === pageKey)!.userSubmission[0].inputData;
    }
    handleAudioReset();
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
    submitData(pageKey, userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData[pageKey].audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
        });

        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            isSubmitted,
            audioData: newAudioData,
            listenComplete: { 1: userSubmissionList[0].inputData[1]?.value || cardData[pageKey].listenComplete?.[1] },
            answer: userSubmissionList[0].inputData[2]?.value || cardData[pageKey].answer,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageKey);
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
      vAlign='center'
      submitLabel={!cardData[pageKey].isSubmitted ? '완료하기' : isShowBS ? '답안 닫기' : '답안 보기'}
      onSubmit={handleSubmit}
      submitDisabled={isSubmitDisabled}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isShowBS ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <Box vAlign='center' hAlign='center' marginBottom='24px'>
        <PinchZoom pinchType={'image'}>
          <Image alt='' ariaDescribedby='img_desc' src={'/L04/C02/A06/ME1-L04-C02-A06-P02.jpg'} width='320px' />
        </PinchZoom>
        <Box type='hidden' id='img_desc'>
          {altText}
        </Box>
      </Box>
      <BoxWrap marginBottom={'20px'}>
        <Box marginRight='8px' padding='5px 0'>
          <Label type={'paint'} {...data[1].label} />
        </Box>
        <Box width={'80%'}>{data[1].content}</Box>
        <Box width={'20%'} hAlign='flex-end' vAlign='center'>
          <Recorder
            recorderIndex={1}
            initialData={cardData[pageKey].audioData?.[1]}
            readOnly={cardData[pageKey].isSubmitted}
            onSubmit={handleSubmitRecorder}
            onClick={handleClickRecorder}
            ref={recorderRef}
          />
        </Box>
      </BoxWrap>

      <Box vAlign='center'>
        <Label type={'paint'} {...data[2].label} />
        <Box width={'80%'} marginLeft='8px'>
          {data[2].content}
        </Box>
        <Box width={'20%'} hAlign='flex-end' vAlign='center'>
          {!isEmptyAudioData(cardData[pageKey].audioData?.[1]) ? (
            <SimpleAudioPlayer audioSrc={'/L04/C02/A06/ME1-L04-C02-A06-P02.mp3'} onEnded={handleAudioEnded} ref={audioRef} />
          ) : null}
        </Box>
      </Box>

      <BottomSheet show={isShowBS} bottomSheetTargetId={'targetContainer'} height={'30%'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'예시 답안'} />
          </Box>
          <Box marginTop='12px'>{exampleAnswer}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
