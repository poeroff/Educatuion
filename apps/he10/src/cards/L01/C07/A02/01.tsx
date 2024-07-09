import styled from '@emotion/styled';
import { useState, useRef } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  IQuestionProps,
  Image,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { imageAltA02 } from '@/cards/L01/C07/commonData';
import ContentInfo from '../A03/contentInfo';

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
    text: 'Check out the structure before summarizing the main text.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} useExtend vAlign='flex-start'>
      <BoxWrap useFull>
        <Box marginLeft={'70px'} hAlign={'center'}>
          <Image
            ariaDescribedby='img-desc'
            type={EImageType.IMG}
            src={'/L01/C07/A02/HE1-L01-C07-A02-P01.jpg'}
            alt={''}
            height='410px'
            width='789px'
          />
          <Box type='hidden' id='img-desc'>
            {imageAltA02}
          </Box>
        </Box>
        <Box hAlign='flex-end' vAlign='flex-start'>
          <Button width='96px' color={EStyleButtonTypes.TERTIARY} style={{ height: '44px' }} onClick={handleButtonClick}>
            <CustomButtonLabel>지문 보기</CustomButtonLabel>
          </Button>
        </Box>
      </BoxWrap>

      <Dialog
        useHeader
        topHeight={50}
        width={893}
        height={458}
        isShow={isDialogOpen}
        onClose={handleDialogClose}
        useFooter={true}
        closeLabel={'지문 닫기'}
        header={() => (
          <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
            <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              The Power of Friendliness: Soft but Strong
            </Typography>
          </Box>
        )}
        tabIndex={101}
      >
        <Typography>
          <ContentInfo />
        </Typography>
      </Dialog>
    </Container>
  );
};

export default P01;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
  padding: 10px 20px;
`;
