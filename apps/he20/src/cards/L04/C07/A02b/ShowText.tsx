import { Box, Dialog, Scroll, Typography } from '@maidt-cntn/ui';
import React from 'react';

interface IShowDialog {
  title: string;
  semiTitle?: string;
  content: string;
  isTextOpen: boolean;
  handleTextClose: () => void;
}

const ShowText = ({ title, semiTitle, content, isTextOpen, handleTextClose }: IShowDialog) => {
  return (
    <Dialog width={893} height={458} isShow={isTextOpen} onClose={handleTextClose} useFooter={true} closeLabel={'지문 닫기'}>
      <Box height={'15%'} background={'gray'} useRound={true} vAlign='flex-center' useFull={true}>
        <Typography useGap={false} weight={'bold'}>
          {title}
        </Typography>
      </Box>
      <Box hAlign='center' marginTop='24px'>
        <Scroll height={'260px'}>
          <Box hAlign='center'>
            <Typography useGap={false} weight={'normal'}>
              {semiTitle}
            </Typography>
          </Box>
          <br />
          {content.split('\n').map((paragraph, index, arr) => (
            <React.Fragment key={index}>
              <Typography useGap={true} weight={'normal'}>
                {paragraph}
              </Typography>
              <br />
              {index !== arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </Scroll>
      </Box>
    </Dialog>
  );
};

export default ShowText;
