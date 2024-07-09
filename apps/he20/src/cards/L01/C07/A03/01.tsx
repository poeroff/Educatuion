import React, { useState } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  Image,
  IQuestionProps,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { imgContentA03P01, textContentA03 } from './commonData';

const P01 = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { title, content, subTitleIndexes } = textContentA03;
  const { imgSrc, imgAlt } = imgContentA03P01;

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Write',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Complete the club members’ conversation before visiting the Free Animals sanctuary based on the main text',
    size: 'small',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} useExtend vAlign='flex-start'>
      <BoxWrap useFull>
        <Box marginLeft='150px'>
          <PinchZoom>
            <Image type={EImageType.IMG} src={imgSrc} width='700px' height='360px' />
            <Box type='hidden'>{imgAlt}</Box>
          </PinchZoom>
        </Box>
        <Box hAlign='flex-end' vAlign='flex-start'>
          <Button
            minWidth='96px'
            size={EStyleSizes.SMALL}
            color={EStyleButtonTypes.SECONDARY}
            label='지문보기'
            onClick={handleButtonClick}
            useRound
          />
        </Box>
      </BoxWrap>

      <Dialog
        width={893}
        height={458}
        isShow={isDialogOpen}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              {title}
            </Typography>
          </Box>
        )}
        onClose={handleDialogClose}
        useFooter={true}
        closeLabel={'지문 닫기'}
      >
        <Box>
          <Scroll tabIndex={0}>
            {content.split('\n').map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <Typography useGap={false} weight={!subTitleIndexes.has(index) ? 'normal' : 'semi-bold'} size={EStyleFontSizes.MEDIUM}>
                  {paragraph}
                </Typography>

                <br />
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Scroll>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P01;
