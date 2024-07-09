import { Box, SvgIcon, IQuestionProps, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { useEffect, useState } from 'react';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        수학에 관련된 재미있는 이야기를 더 알아보세요.
      </>
    ),
  };

  const [srtFile, setSrtFile] = useState('');

  useEffect(() => {
    const getSrt = async () => {
      const file = await handleDownload('EM31', 'B03/0008/20/(추가)_EM313_M_(기본)_수학더알기.srt');
      const reader = new FileReader();
      reader.onload = e => {
        const text = e.target?.result as string;
        setSrtFile(text);
      };
      reader.readAsText(file);
    };
    getSrt();
  }, []);

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound useScroll={false}>
      <Box height={'390px'}>
        <VideoPlayer videoSrc='/B03/0008/20/(추가)_EM313_M_(기본)_수학더알기.mp4' srtFile={srtFile} />
      </Box>
    </Container>
  );
};

export default P01;
