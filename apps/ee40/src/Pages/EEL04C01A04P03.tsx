import { Container } from '@maidt-cntn/ui/en';
import { Box, VideoPlayer, TMainHeaderInfoTypes, IQuestionProps, BoxWrap, EStyleButtonTypes, Recorder } from '@maidt-cntn/ui';
import { initDataType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { currentPageSubmittedData } from '@/stores';
import { useRecoilValue } from 'recoil';
import useCurrentPageData from '@/hooks/useCurrentPageData';

interface IVideoPlayerProps {
  videoSrc: string;
  srtFile: string;
  width?: number;
  height?: number;
}

interface IDataKey {
  mainKey: number;
  subKey: string;
}

interface IEEL04C01A04P03 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  videoInfo: IVideoPlayerProps;
  dataKey: IDataKey;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string | string[] | number | number[] | boolean;
    }[][];
  }[];
}

const EEL04C01A04P03 = ({ headerInfo, questionInfo, videoInfo, dataKey, getDefaultData, getCorrectData }: IEEL04C01A04P03) => {
  const { mainKey, subKey } = dataKey;

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const isSubmit = useRecoilValue(currentPageSubmittedData);

  const { changeInputData, submitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const handleRecoderSubmit = () => {
    changeInputData(mainKey, subKey, true);
  };

  const handleSubmit = () => {
    submitPageData();
    setIsCompleted(true);
  };

  useEffect(() => {
    console.log(isSubmit);
    isSubmit && setIsCompleted(true);
  }, [isSubmit]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      useExtend
      submitLabel={'완료하기'}
      onSubmit={handleSubmit}
      submitBtnColor={isSubmit ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      submitDisabled={isSubmit && !isCompleted ? true : false}
    >
      <BoxWrap useFull alignItems={'center'}>
        <Box vAlign={'center'} hAlign={'center'} useFull width={videoInfo.width || 480} height={videoInfo.height || 360}>
          <VideoPlayer
            srtFile={videoInfo.srtFile}
            videoSrc={videoInfo.videoSrc}
            // initControlBar={false}
          />
        </Box>
        <Box zIndex={1000} useFull width={480} height={394} vAlign='center' hAlign='center'>
          {/* TODO
          Recorder label : 노래하기, width : 114px 수정 필요 */}
          <Recorder
            recorderIndex={1}
            onSubmit={() => {
              handleRecoderSubmit();
            }}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EEL04C01A04P03;
