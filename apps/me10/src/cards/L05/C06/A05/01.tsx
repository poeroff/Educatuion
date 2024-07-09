import HE01603, { IHE01603Info } from '@maidt-cntn/pages/HE-016-03';
import { Box, IAudioPlayerProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { contentInfo } from './contentInfo';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `Small Actions, Big Change (2)`,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: contentInfo.P01.audio.src,
    captionSrc: contentInfo.P01.audio.caption,
  };
  const HE01603Info: IHE01603Info[] = [
    {
      id: 'P1',
      udl: contentInfo.P01.image.alt[0],
      text: [''],
      nodeText: (
        <>
          <Box marginTop='24px'>
            <Typography lineHeight={'48px'} fontWeight='var(--font-weight-extraBold)' color='var(--color-m-en-default)' useGap={false}>
              {contentInfo.P01.body[0]}
            </Typography>
            <Typography lineHeight={'48px'}>&nbsp;&nbsp;{contentInfo.P01.body[1]}</Typography>
          </Box>
        </>
      ),
      imageSrc: [contentInfo.P01.image.src[0]],
      imagePosition: 'before',
      imageWidth: '300px',
    },
    {
      id: 'P2',
      udl: contentInfo.P01.image.alt[1],
      text: [''],
      nodeText: (
        <>
          <Box marginTop={'24px'}>
            <Typography lineHeight={'48px'} fontWeight='var(--font-weight-extraBold)' color='var(--color-blue-600)'>
              {contentInfo.P01.body[2]}
            </Typography>
            <Typography lineHeight={'48px'}>&nbsp;&nbsp;{contentInfo.P01.body[3]}</Typography>
          </Box>
        </>
      ),
      imageSrc: [contentInfo.P01.image.src[1]],
      imagePosition: 'before',
      imageWidth: '300px',
    },
  ];
  return <HE01603 headerInfo={headerInfo} audioInfo={audioInfo} title='' info={HE01603Info} />;
};

export default P01;
