import { Container } from '@maidt-cntn/ui/en';
import { Box, VideoPlayer, BoxWrap, TMainHeaderInfoTypes, IQuestionProps, Dialog, List, Button, Label, Typography } from '@maidt-cntn/ui';
import { useState } from 'react';
import styled from 'styled-components';

export interface IVideoPlayerProps {
  videoSrc: string;
  srtFile?: string;
  width?: string;
  height?: string;
}

interface IEEL01C03A09P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  videoInfo: IVideoPlayerProps;
  data: string[];
}

const EEL01C03A09P01 = ({ headerInfo, questionInfo, videoInfo, data }: IEEL01C03A09P01) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const closeModal = () => {
    setIsShow(false);
  };

  return (
    <Container headerInfo={headerInfo} vAlign={'top'} questionInfo={questionInfo}>
      <BoxWrap useFull {...{ width: videoInfo.width, height: videoInfo.height, margin: '0 auto' }}>
        <Box height={videoInfo.height} marginTop={10} useFull>
          <VideoPlayer srtFile={videoInfo.srtFile || ''} videoSrc={videoInfo.videoSrc} />
        </Box>
      </BoxWrap>
      <Box hAlign={'center'} useFull {...{ width: videoInfo.width, margin: '0 auto' }}>
        <CustomButton width={'153px'} onClick={() => setIsShow(true)}>
          활동 방법
        </CustomButton>
      </Box>
      <Dialog width={984} height={530} topHeight={80} isShow={isShow} useHeader={true} onClose={closeModal} closeLabel='확인'>
        <CustomButton width={'190px'}>활동 방법</CustomButton>
        <Box tabIndex={103} {...{ margin: '30px 30px 0px 30px' }}>
          <List
            data={data}
            row={({ value, index = 1 }) => (
              <BoxWrap key={index} marginTop={10}>
                <Label value={index} type={'icon'} size='x-small' />
                <Box marginTop={-7}>
                  {value?.split('\n').map((item: any, i) => {
                    return (
                      <Typography key={`item_${i}`}>
                        {item}
                        <br />
                      </Typography>
                    );
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

const CustomButton = styled.button<{ width: string }>`
  width: ${props => props.width};
  height: 48px;
  border-radius: 22px;
  margin-top: 20px;
  gap: 10px;
  background-color: #0091ff;
  font-weight: 700;
  line-height: 42px;
  font-size: 32px;
  color: #ffffff;
`;

export default EEL01C03A09P01;
