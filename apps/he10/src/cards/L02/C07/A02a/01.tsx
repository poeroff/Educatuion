import { textContentA02a02 } from './commonData';

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
  PinchZoom,
} from '@maidt-cntn/ui';

import { Container } from '@maidt-cntn/ui/en';

const DialogHeader = () => {
  const { title, subTitle } = textContentA02a02;
  return (
    <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
      <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
        {title}
        {'    '}
      </Typography>
      <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
        {subTitle}
      </Typography>
    </Box>
  );
};

const P01 = () => {
  const { content } = textContentA02a02;

  const width = '624px';
  const height = '356px';
  const questionInfo: IQuestionProps = {
    text: 'Check out the structure before summarizing the story.',
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
      <PinchZoom>
        <ImgBox>
          <Image type={EImageType.IMG} src={'/L02/C07/A02/HE1-L02-C07-A02a-P01.jpg'} width={width} height={height} />
          <Box type='hidden' id='img_desc'>
            <p>
              글의 구조가 보이는 인포그래픽 왼쪽부터 첫 번째 그림 제목 story structure: “Gathering of the Whakapapa” beginning 성냥개비 한 개 두 번째
              그림 Rising Action Climax 타오르는 성냥개비 한 개 세 번째 그림 Ending 다 타버린 성냥 개비 한 개
            </p>
          </Box>
        </ImgBox>
      </PinchZoom>

      <Dialog
        useHeader
        header={DialogHeader}
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
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM} style={{ marginBottom: '20px' }}>
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
