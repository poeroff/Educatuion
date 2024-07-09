import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, Typography, VideoPlayer, IQuestionProps, TMainHeaderInfoTypes, IAudioPlayerProps, Dialog, List } from '@maidt-cntn/ui';
import { ButtonTypes, LabelTypes } from '@/assets/styles';
import { useEffect, useState } from 'react';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

interface Props {
  layout: {
    headerInfo: TMainHeaderInfoTypes;
    hQuestionInfo: IQuestionProps;
    srtFile?: string;
    audioInfo?: IAudioPlayerProps;
  };
  contentInfo: {
    modalInfo: { text: string }[];
    videoInfo: { videoSrc: string; videoSrt?: string };
    downloadInfo: { downloadSrc: string };
  };
}

const prefix = import.meta.env.VITE_CDN_PATH;

const EEL01C02A06P01 = ({ layout, contentInfo }: Props) => {
  const CONST = { ...layout };
  const { modalInfo, videoInfo, downloadInfo } = contentInfo;

  const [isShow, setIsShow] = useState<boolean>(false);
  const closeModal = () => {
    setIsShow(false);
  };

  const downloadFile = async () => {
    const response = await fetch(prefix + downloadInfo.downloadSrc);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = '활동자료';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(downloadUrl);
  };

  return (
    <Container headerInfo={CONST.headerInfo} vAlign='top' questionInfo={CONST.hQuestionInfo} audioInfo={CONST.audioInfo}>
      <BoxWrap useFull {...{ width: 'fit-content', height: '306px', margin: '0 auto' }}>
        <Box useFull height='306px'>
          {<VideoPlayer srtFile={videoInfo.videoSrt || ''} videoSrc={videoInfo.videoSrc} />}
        </Box>
      </BoxWrap>
      <Box hAlign={'center'} useFull {...{ width: '684px', margin: '20px auto 0' }}>
        <ButtonTypes type='method' onClick={() => setIsShow(true)}>
          활동 방법
        </ButtonTypes>
        <ButtonTypes type='materials' gap={20} onClick={downloadFile} style={{ color: '#fff' }}>
          활동 자료
        </ButtonTypes>
      </Box>

      <Dialog width={984} height={525} isShow={isShow} useHeader={true} /*usePopup={true}*/ onClose={closeModal} closeLabel='확인'>
        <LabelTypes info='title' fontSize={32} background='#0091FF' color='#fff' type='paint' value='활동 방법' />
        <Box tabIndex={103} {...{ marginTop: '30px' }}>
          <List
            data={modalInfo}
            row={({ value, index = 1 }) => (
              <BoxWrap key={index}>
                <LabelTypes fontSize={16} background='url(src/assets/icon/ico_label01.png) no-repeat' color='#fff' type='paint' value={index} />

                <Box>
                  {value?.text?.split('\n').map((item: string) => {
                    return <Typography key={item}>{item}</Typography>;
                  })}
                </Box>
              </BoxWrap>
            )}
          />
        </Box>
      </Dialog>
    </Container>
  );
};

export default EEL01C02A06P01;
