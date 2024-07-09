import styled from '@emotion/styled';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  Image,
  IQuestionProps,
  PinchZoom,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { textContentA02b, imgContentA02bP01 } from './commonData';

const P01 = () => {
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
  const questionInfo: IQuestionProps = {
    text: 'Check out the structure before summarize the main text.',
    size: 'small',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} useExtend vAlign='flex-start'>
      <Box hAlign='right'>
        <Button minWidth='96px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' onClick={handleButtonClick} useRound />
      </Box>
      <ImgBox>
        <PinchZoom>
          <Image type={EImageType.IMG} src={imgContentA02bP01.imgSrc} height='410px' />
          <Box type='hidden'>
            <p>글의 구조가 보이는 인포그래픽</p>
            <p>제목 Consuming Coffee</p>
            <p>소제목1 Problem 내용1 The Production of Coffee Waste에 관한 문장</p>
            <p>아래로 이어지는 화살표</p>
            <p>첫 번째 칸 Buried에 관한 문장</p>
            <p>두 번째 칸 빈칸에 관한 문장</p>
            <p>아래로 이어지는 화살표</p>
            <p>소제목2 Solution</p>
            <p>내용2 Introducing a 4 C 빈칸, E 빈칸에 관한 문장</p>
            <p>소제목3 Examples 내용3 examples에 관한 표현들</p>
          </Box>
        </PinchZoom>
      </ImgBox>

      <Dialog
        width={893}
        height={458}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              {textContentA02b.title}
            </Typography>
          </Box>
        )}
        isShow={isDialogOpen}
        onClose={handleDialogClose}
        useFooter={true}
        closeLabel={'지문 닫기'}
      >
        {textContentA02b.content.split('\n').map((paragraph, index, arr) => (
          <React.Fragment key={index}>
            <Typography useGap={true} size={EStyleFontSizes.MEDIUM}>
              {paragraph}
            </Typography>
            <br />
            {index !== arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </Dialog>
    </Container>
  );
};

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default P01;
