import { TMainHeaderInfoTypes, IQuestionProps, Box, SvgIcon, VideoPlayer, Typography } from '@maidt-cntn/ui';

import { DialogContainer } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <Box marginTop={'-3px'}>
          <Typography fontSize='25px'>배운 내용을 다시 한 번 살펴볼까요?</Typography>
        </Box>
      </>
    ),
  };

  const videoSrc = '/C03/0004/20/EM313_4_기초(영상).mp4';
  const srtFile = '/C03/0004/20/EM313_4_기초(영상).srt';

  return (
    <DialogContainer headerInfo={headerInfo} questionInfo={questionInfo} bodyId='targetContainer'>
      <Box height={'280px'}>
        <VideoPlayer videoSrc={videoSrc} srtFile={srtFile} />
      </Box>
    </DialogContainer>
  );
};

export default P05;
