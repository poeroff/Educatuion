import { Box, Dialog, EStyleFontSizes, Scroll, Typography } from '@maidt-cntn/ui';
import React, { useEffect, useRef } from 'react';

interface IShowDialog {
  title: string;
  semiTitle?: string;
  content: string;
  isShow: boolean;
  handleDiaglogClose: () => void;
  lastFocusedElementRef: React.MutableRefObject<HTMLElement | null>;
}

interface DialogHeaderProps {
  title: string;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ title }) => {
  return (
    <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
      <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM} lineHeight='unset'>
        {title}
      </Typography>
    </Box>
  );
};

const ShowText = ({ title, semiTitle, content, isShow, handleDiaglogClose, lastFocusedElementRef }: IShowDialog) => {
  useEffect(() => {
    if (!isShow && lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  }, [isShow, lastFocusedElementRef]);

  return (
    <Dialog
      useHeader
      header={() => <DialogHeader title={title} />}
      width={893}
      height={458}
      topHeight={55}
      isShow={isShow}
      onClose={handleDiaglogClose}
      useFooter={true}
      closeLabel={'지문 닫기'}
      tabIndex={101}
    >
      <Box hAlign='center'>
        <Scroll height={'270px'}>
          <Box hAlign='center'>
            <Typography useGap={false} weight={'var(--font-weight-regular)'}>
              {semiTitle}
            </Typography>
          </Box>
          <br />
          {content.split('\n').map((paragraph, index, arr) => (
            <React.Fragment key={index}>
              <Typography useGap={true} weight={'var(--font-weight-regular)'}>
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
