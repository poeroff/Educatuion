import styled from '@emotion/styled';
import {
  Box,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  IQuestionProps,
  Image,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React, { useState } from 'react';
import { imgContentA02aP01, textContentA02a } from './commonData';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Check out the structure before summarizing the main text.',
  };

  const { title, content, subTitleIndexes } = textContentA02a;
  const { imgSrc, imgAlt } = imgContentA02aP01;
  const [isMainTextOpen, setIsMainTextOpen] = useState(false);
  const handleButtonClick = () => {
    setIsMainTextOpen(true);
  };

  const handleDialogClose = () => {
    setIsMainTextOpen(false);
  };

  return (
    <Container bodyId='container' headerInfo={headerInfo} questionInfo={questionInfo} vAlign={'flex-start'}>
      <Box hAlign='flex-end' vAlign='flex-start' marginBottom='8px'>
        <Button width='96px' color={EStyleButtonTypes.TERTIARY} style={{ height: '44px' }} onClick={handleButtonClick}>
          <CustomButtonLabel>지문 보기</CustomButtonLabel>
        </Button>
      </Box>
      <Box display='flex' justifyContent='center'>
        <PinchZoom>
          <Image width='261.6px' height='293.2px' type={EImageType.IMG} src={imgSrc} alt={imgAlt} />
        </PinchZoom>
      </Box>
      <Dialog width={893} height={480} isShow={isMainTextOpen} onClose={handleDialogClose} useFooter={true} closeLabel={'지문 닫기'}>
        <Box height={'15%'} background={'gray'} useRound={true} hAlign='flex-start' vAlign='flex-center' useFull={true}>
          <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
            {title}
          </Typography>
        </Box>
        <Box hAlign='center' marginTop='24px'>
          <Scroll height={'270px'}>
            {content.split('\n').map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <Typography
                  style={{ whiteSpace: 'pre-wrap' }}
                  weight={!subTitleIndexes.has(index) ? 'normal' : 'semi-bold'}
                  size={EStyleFontSizes.MEDIUM}
                >
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

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;
