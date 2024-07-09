import styled from '@emotion/styled';
import { Box, BoxWrap, Button, EStyleButtonTypes, EStyleSizes, IQuestionProps, Image, PinchZoom, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRef, useState } from 'react';
import ShowText from './ShowText';
import { dialogContentA02, imgContentA02P01, semiTitleA02, titleA02 } from './commonData';

const { imgSrc, imgAlt } = imgContentA02P01;

const P01 = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const handleButtonClick = () => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Check out the structure before summarize the main text.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box hAlign='right'>
        <Button minWidth='118px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound onClick={handleButtonClick} />
      </Box>
      <BoxWrap useFull>
        <Box useFull>
          <ImgBox>
            <PinchZoom>
              <Image width='380px' src={imgSrc} ariaDescribedby={'img_desc'} />
            </PinchZoom>
            <Box type='hidden' id={'img_desc'}>
              {imgAlt}
            </Box>
          </ImgBox>
        </Box>
      </BoxWrap>

      <ShowText
        title={titleA02}
        semiTitle={semiTitleA02}
        content={dialogContentA02}
        isShow={isDialogOpen}
        handleDiaglogClose={handleDialogClose}
        lastFocusedElementRef={lastFocusedElementRef}
      />
    </Container>
  );
};
const ImgBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default P01;
