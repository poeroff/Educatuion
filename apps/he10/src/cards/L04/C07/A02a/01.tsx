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
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { textContentA02a, imgContentA02aP01 } from './commonData';

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
          <Image type={EImageType.IMG} src={imgContentA02aP01.imgSrc} height='410px' />
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

      <Dialog width={893} height={458} isShow={isDialogOpen} onClose={handleDialogClose} useFooter={true} closeLabel={'지문 닫기'}>
        <Box height={'15%'} background={'gray'} useRound={true} hAlign='flex-start' vAlign='flex-center' useFull={true}>
          <Typography useGap={false} weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
            {textContentA02a.title}
          </Typography>
        </Box>
        <Box hAlign='center' marginTop='24px'>
          <Scroll height={'260px'}>
            {textContentA02a.content.split('\n').map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
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

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default P01;
