import { BoxWrap, Image, PinchZoom } from '@maidt-cntn/ui';
import { Box, Button, EStyleButtonTypes, EStyleSizes, TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { titleA02b, semiTitleA02b, dialogContentA02b, imgContentA02bP01 } from './commonData';
import styled from '@emotion/styled';
import { useState } from 'react';
import ShowText from './ShowText';
import { Container } from '@maidt-cntn/ui/en';

const { imgSrc } = imgContentA02bP01;

const P01 = () => {
  const [isTextOpen, setIsTextOpen] = useState(false);

  const handleButtonClick = () => {
    setIsTextOpen(true);
  };

  const handleTextClose = () => {
    setIsTextOpen(false);
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
              <Image width='380px' height='350px' ariaDescribedby='imgDesc' alt='' src={imgSrc} />
              <Box type='hidden' id='imgDesc'>
                <p tabIndex={101}>글의 구조가 보이는 인포그래픽</p>
                <p tabIndex={102}>구역 1 AI-Powered Neural Implants에 관한 내용 중심으로 여러 방향으로 뻗어있는 화살표 </p>
                <p tabIndex={103}>구역 2 Current Medical Applications에 관한 내용 </p>
                <p tabIndex={104}>구역 3 Future Commercial Applications에 관한 내용 </p>
                <p tabIndex={105}>구역 4 Ethical Concerns에 관한 내용 구역 5 Solutions에 관한 내용</p>
              </Box>
            </PinchZoom>
          </ImgBox>
        </Box>
      </BoxWrap>

      <ShowText title={titleA02b} semiTitle={semiTitleA02b} content={dialogContentA02b} isTextOpen={isTextOpen} handleTextClose={handleTextClose} />
    </Container>
  );
};
const ImgBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default P01;
