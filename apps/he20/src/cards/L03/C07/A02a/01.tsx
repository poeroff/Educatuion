import { textContentA02a, imgContentA02aP01 } from './commonData';
import {
  Box,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  Image,
  IQuestionProps,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import React, { useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Check out the structure before summarize the main text.',
  };

  const { title, content, subTitleIndexes } = textContentA02a;
  const { imgSrc } = imgContentA02aP01;
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
          <Image width='261.6px' height='271.2px' type={EImageType.IMG} src={imgSrc} ariaDescribedby='img_desc' alt='' />
          <Box type='hidden' id='img_desc'>
            <p>글의 구조가 보이는 인포그래픽</p>
            <p>제목 Artists Who Never Gave up on Their Art Despite 1 C 빈칸 in Their Lives</p>
            <p>첫 번째 칸 Bill Traylor의 born, Life History, Works에 관한 내용</p>
            <p>두 번째 칸 Maud Lewis의 born, Life History, Works에 관한 내용</p>
            <p>세 번째 칸 Anna Ancher의 born, Life History, Works에 관한 내용</p>
          </Box>
        </PinchZoom>
      </Box>
      <Dialog width={893} height={480} isShow={isMainTextOpen} onClose={handleDialogClose} useFooter={true} closeLabel={'지문 닫기'}>
        <Box height={'15%'} background={'gray'} useRound={true} hAlign='flex-start' vAlign='flex-center' useFull={true}>
          <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
            {title}
          </Typography>
        </Box>
        <Box hAlign='center' marginTop='24px'>
          <Scroll height={'270px'}>
            {content.split('\n').map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <Typography
                  style={{ whiteSpace: 'pre-wrap' }}
                  weight={!subTitleIndexes.has(index) ? 'var(--font-weight-medium)' : 'var(--font-weight-semiBold)'}
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
