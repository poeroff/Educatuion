import { textContentA02, imgContentA02P01 } from './commonData';

import styled from '@emotion/styled';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  Image,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  IQuestionProps,
} from '@maidt-cntn/ui';

import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const { title, subTitle, content, subTitleIndexes } = textContentA02;
  const { imgSrc, imgAlt } = imgContentA02P01;

  const height = '307px';
  const width = '262px';
  const questionInfo: IQuestionProps = {
    text: 'Check out the structure before summarize the story.',
    size: 'small',
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} useExtend vAlign='flex-start'>
      <Box hAlign='right'>
        <Button width='96px' style={{ height: '44px' }} color={EStyleButtonTypes.TERTIARY} onClick={handleButtonClick}>
          <CustomButtonLabel>지문 보기</CustomButtonLabel>
        </Button>
      </Box>
      <ImgBox>
        <Image type={EImageType.IMG} src={imgSrc} width={width} height={height} />
        <Box type='hidden' id='img_desc'>
          {imgAlt}
        </Box>
      </ImgBox>

      <Dialog
        useHeader
        header={() => {
          return (
            <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
              <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
                {subTitle}
              </Typography>
              <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
                {title}
              </Typography>
            </Box>
          );
        }}
        topHeight={50}
        width={893}
        height={458}
        isShow={isDialogOpen}
        onClose={handleDialogClose}
        useFooter={true}
        closeLabel={'지문 닫기'}
      >
        <Typography>
          {content.split('\n').map((paragraph, index, arr) => (
            <React.Fragment key={index}>
              <Typography
                useGap={true}
                weight={!subTitleIndexes?.has(index) ? 'normal' : 'bold'}
                size={EStyleFontSizes.MEDIUM}
                style={{ marginBottom: '20px' }}
              >
                {paragraph}
              </Typography>
              {index !== arr.length - 1}
            </React.Fragment>
          ))}
        </Typography>
      </Dialog>
    </Container>
  );
};

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
`;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;

export default P01;
