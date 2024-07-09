import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Label,
  Typography,
  TMainHeaderInfoTypes,
  IQuestionProps,
  Recorder,
  IRecorderRef,
  TextView,
  EStyleFontSizes,
  SimpleAudioPlayer,
  OverlayTooltip,
  BoxWrap,
  ISimpleAudioPlayerRef,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  IAudioData,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { L01SP02 } from './store';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P12 = () => {
  const pageNo = 'P12';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L01SP02);
  const { userId } = useRecoilValue(studentAtom);

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const isAllFilled = useMemo(() => Object.values(cardData.p12.audioData ?? {}).every(val => val), [cardData.p12.audioData]);
  const disabled = useMemo(() => !cardData.p12.isSubmitted && !isAllFilled, [cardData.p12.isSubmitted, isAllFilled]);

  const submitBtnColor = useMemo(() => {
    if (cardData.p12.isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAllFilled ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
  }, [cardData.p12.isSubmitted, isAllFilled, isShowAnswer]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '말하기 연습',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '다음 대화의 빈칸에 들어갈 알맞은 문장을 골라 말해 보세요.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p12.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
        });

        setCardData(prev => ({
          ...prev,
          p12: {
            ...prev.p12,
            audioData: newAudioData,
            isSubmitted: isSubmitted ?? false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  const onSubmitRecorder = async (index: number) => {
    await recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L01/SP02',
      changeData,
      mainKey: 1,
      page: 'p12',
      setFunction: setCardData,
      subjectCode: 'ME10',
      subKey: index,
      userId,
    });
  };

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  const handleSubmit = () => {
    if (!cardData.p12.isSubmitted) {
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [],
        },
      ];

      if (pageData.find(value => value.page === pageNo)) {
        userSubmission[0].inputData = pageData.find(value => value.page === pageNo)?.userSubmission[0].inputData ?? [];
      }

      handleAudioReset(0);
      setCardData(prev => ({ ...prev, p12: { ...prev.p12, isSubmitted: true } }));
      submitData(pageNo, userSubmission);
    } else {
      setShowAnswer(!isShowAnswer);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p12.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={handleSubmit}
      submitDisabled={disabled}
      submitBtnColor={submitBtnColor}
    >
      <BoxWrap height='60px'>
        <Box>
          <Label value={'A'} type={'paint'} background={'var(--color-blue-100)'} data-tooltip-id='click_tooltip' />
        </Box>
        <OverlayTooltip
          id='click_tooltip'
          type='normal'
          place='right'
          padding='8px 0'
          openOnClick
          backgroundColor='var(--color-blue-100)'
          color='var(--color-black)'
          borderRadius='8px'
          isShow
        >
          <Typography size={EStyleFontSizes['X-MEDIUM']}>Hi, I'm Judy. Nice to meet you.</Typography>
        </OverlayTooltip>
        <Box marginLeft='325px' vAlign='flex-start'>
          <SimpleAudioPlayer
            ref={ref => {
              audioRefs.current[1] = ref;
            }}
            audioSrc={'/L01/SP02/ME1-L01-SP02-P12.mp3'}
            ariaLabel={'대화 듣기 버튼'}
            onChangeStatus={() => handleAudioReset(1)}
            tabIndex={102}
          />
        </Box>
      </BoxWrap>
      <Box marginTop='20px'>
        <Box hAlign='end' height='68px' flexDirection='row-reverse'>
          <Label value={'B'} type={'paint'} background={'var(--color-orange-200)'} data-tooltip-id='click_tooltip1' />
          <Box width='478px'>
            <OverlayTooltip
              id='click_tooltip1'
              type='normal'
              place='left'
              padding='12px 187px'
              openOnClick
              backgroundColor='var(--color-pink-100)'
              borderRadius='8px'
              isShow
            >
              <Recorder
                recorderIndex={1}
                initialData={cardData.p12.audioData?.[1]}
                readOnly={cardData.p12.isSubmitted}
                onSubmit={() => {
                  onSubmitRecorder(1);
                }}
                onClick={() => {
                  handleRecorderClose(1);
                  handleAudioReset(0);
                }}
                ref={ref => {
                  recorderRef.current[1] = ref;
                }}
              />
            </OverlayTooltip>
          </Box>
        </Box>
        <Box hAlign='end' margin='12px 45px 0 0'>
          <TextView title='보기' hAlign='start' padding='20px 16px'>
            <Box vAlign='flex-start'>
              <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
                No, I don't. I like comedies.
              </Typography>
            </Box>
            <Box vAlign='flex-start'>
              <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
                Nice to meet you, too. My name is Max.
              </Typography>
            </Box>
          </TextView>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{cardData.p12.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P12;
