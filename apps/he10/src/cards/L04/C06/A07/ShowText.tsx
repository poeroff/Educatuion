import { Box, Dialog, Scroll, Typography } from '@maidt-cntn/ui';
import React from 'react';

interface IShowDialog {
  title?: string;
  semiTitle?: string;
  content: string;
  isTextOpen: boolean;
  handleTextClose: () => void;
}

const ShowText = ({ title, semiTitle, content, isTextOpen, handleTextClose }: IShowDialog) => {
  return (
    <Dialog
      width={893}
      height={458}
      topHeight={50}
      useHeader
      header={() => (
        <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
          <Typography useGap={false} weight={'bold'}>
            {title}
          </Typography>
        </Box>
      )}
      isShow={isTextOpen}
      onClose={handleTextClose}
      useFooter={true}
      closeLabel={'지문 닫기'}
      tabIndex={101}
    >
      <Box hAlign='center'>
        <Typography useGap={false} weight={'normal'}>
          {semiTitle}
        </Typography>
      </Box>
      {content.split('\n').map((paragraph, index, arr) => (
        <React.Fragment key={index}>
          <Typography useGap={true} weight={'normal'}>
            {paragraph}
          </Typography>
          <br />
          {index !== arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </Dialog>
  );
};

export default ShowText;
