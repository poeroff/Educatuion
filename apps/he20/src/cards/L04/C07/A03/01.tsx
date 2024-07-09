import { BoxWrap, EImageType, Image, PinchZoom } from '@maidt-cntn/ui';
import { Box, Button, EStyleButtonTypes, EStyleSizes, TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { titleA03, semiTitleA03, dialogContentA03, imgContentA03P01 } from './commonData';
import styled from '@emotion/styled';
import { useState } from 'react';
import ShowText from './ShowText';
import { Container } from '@maidt-cntn/ui/en';

const { imgSrc, imgAlt } = imgContentA03P01;

const P01 = () => {
  const [isTextOpen, setIsTextOpen] = useState(false);

  const handleButtonClick = () => {
    setIsTextOpen(true);
  };

  const handleTextClose = () => {
    setIsTextOpen(false);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Choose',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the correct words to complete the news article based on the main text.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull marginBottom={'10px'}>
        <Box marginLeft='150px'>
          <PinchZoom>
            <Image type={EImageType.IMG} src={imgSrc} width='650px' height='360px' />
            <Box type='hidden'>{imgAlt}</Box>
          </PinchZoom>
        </Box>
        <Box hAlign='flex-end' vAlign='flex-start'>
          <Box hAlign='right' marginBottom={'10px'}>
            <Button
              minWidth='96px'
              size={EStyleSizes.SMALL}
              color={EStyleButtonTypes.SECONDARY}
              label='지문보기'
              useRound
              onClick={handleButtonClick}
            />
          </Box>
        </Box>
      </BoxWrap>

      <ShowText title={titleA03} semiTitle={semiTitleA03} content={dialogContentA03} isTextOpen={isTextOpen} handleTextClose={handleTextClose} />
    </Container>
  );
};
const ImgBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default P01;
