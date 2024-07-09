// Page: EE4-L01-C02-A03-P02
import { useEffect, useRef, useState } from 'react';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import {
  Box,
  BoxWrap,
  Dialog,
  EStyleButtonTypes,
  IAudioData,
  IQuestionProps,
  TMainHeaderInfoTypes,
  Typography,
  VideoPlayer,
  Recorder,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

type PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  srtFile: string;
  video: string;
  mainKey: number;
};

type IVideoProps = HTMLVideoElement & {
  togglePlayback: () => void;
  handleStopVideo: () => void;
};

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story Song',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '노래를 따라 부르며 익혀 봅시다.',
  },
  srtFile: `
    1
    00:00:00,000 --> 00:00:02,500
    Welcome to the Example Subtitle File!

    2
    00:00:03,000 --> 00:00:06,000
    This is a demonstration of SRT subtitles.

    3
    00:00:07,000 --> 00:00:10,500
    You can use SRT files to add subtitles to your videos
  `,
  video: '/L01/C02/A03/EE4-L01-C02-A03-P02.mp4',
  mainKey: 0,
};

const P01 = () => {
  const { headerInfo, questionInfo, srtFile, video, mainKey } = pageInfo;
  const videoRef = useRef<IVideoProps>(null);

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: IAudioData) => {
    changeInputData(mainKey, subKey, value);
  };
  const [isShow, setShow] = useState(false);

  const recorderValue = getValueInputData(mainKey, 'RECORDER-03') || null;
  const isComplete: boolean = isSubmittedInput(mainKey, 'RECORDER-03'); // submit 여부

  const onHandler = (audioData: IAudioData) => {
    handleChangeInputData(mainKey, 'RECORDER-03', audioData);
  };

  const handelModal = () => {
    setShow(!isShow);
  };

  const completeQnA = () => {
    setShow(false);
    gradeSubmitPageData();
  };

  useEffect(() => {
    if (videoRef.current) {
      console.log(videoRef.current.currentTime);
    }
  }, [videoRef.current]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={recorderValue ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      submitDisabled={!recorderValue}
      onSubmit={handelModal}
    >
      <BoxWrap>
        <Box position='relative' zIndex={0} width={684} height={384} marginRight='40px'>
          <VideoPlayer ref={videoRef} srtFile={srtFile} videoSrc={video} />
        </Box>

        <Box hAlign='center'>
          <Recorder
            recorderIndex={1}
            label='노래하기'
            initialData={recorderValue}
            onPlay={() => {
              if (videoRef.current) {
                videoRef.current.togglePlayback();
              }
            }}
            onPause={() => {
              if (videoRef.current) {
                videoRef.current.togglePlayback();
              }
            }}
            onStop={() => {
              if (videoRef.current) {
                videoRef.current.handleStopVideo();
              }
              console.log(videoRef.current?.currentTime);
            }}
            onSubmit={audioData => onHandler(audioData)}
          />
        </Box>
      </BoxWrap>
      <Dialog
        width={400}
        height={200}
        useFooter
        isShow={isShow && !isComplete && recorderValue !== false}
        closeLabel='아니오'
        confirmLabel='예'
        onClose={handelModal}
        onConfirm={completeQnA}
      >
        <Typography>완료하시겠습니까?</Typography>
      </Dialog>
    </Container>
  );
};

export default P01;
