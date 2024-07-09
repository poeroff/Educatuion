import React, { useState, useRef } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  IQuestionProps,
  Image,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  EStyleFontSizes,
  EStyleSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { dialogContentA02, imageAltA02 } from '@/cards/L01/C07/commonData';

const DialogHeader = () => {
  return (
    <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
      <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
        The Power of Friendliness: Soft but Strong
      </Typography>
    </Box>
  );
};

const P01 = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Check out the structure before summarize the main text.',
  };

  return (
    <Container bodyId='targetContainer' headerInfo={headerInfo} questionInfo={questionInfo} useExtend>
      <Scroll>
        <BoxWrap useFull>
          <Box marginLeft={'70px'} hAlign={'center'}>
            <Image
              type={EImageType.IMG}
              src={'/L01/C07/A02/HE1-L01-C07-A02-P01.jpg'}
              alt=''
              height='400px'
              width='789px'
              ariaDescribedby={'img_desc'}
            />
            <Box type='hidden' id={'img_desc'}>
              {imageAltA02}
            </Box>
          </Box>
          <Box hAlign='flex-end' vAlign='flex-start'>
            <Button
              minWidth='96px'
              size={EStyleSizes.SMALL}
              color={EStyleButtonTypes.SECONDARY}
              label='지문 보기'
              onClick={() => {
                lastFocusedElementRef.current = document.activeElement as HTMLElement;
                setShowModal(true);
              }}
              useRound
            />
          </Box>
        </BoxWrap>
      </Scroll>
      <Dialog
        useHeader
        header={DialogHeader}
        topHeight={50}
        width={893}
        height={458}
        isShow={showModal}
        onClose={() => {
          setShowModal(false);
          if (lastFocusedElementRef.current) {
            lastFocusedElementRef.current.focus();
          }
        }}
        useFooter={true}
        closeLabel={'지문 닫기'}
        tabIndex={101}
      >
        <Box>
          {dialogContentA02.split('\n').map((paragraph, index, arr) => (
            <React.Fragment key={index}>
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                {paragraph}
              </Typography>
              <br />
              {index !== arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </Box>
      </Dialog>
    </Container>
  );
};

export default P01;
