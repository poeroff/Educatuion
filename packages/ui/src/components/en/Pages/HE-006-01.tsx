import { Box, TMainHeaderInfoTypes, PinchZoom, Image, IQuestionProps, Dialog, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';

export interface IHE00601 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  imageSrc: string;
  imageAlt: string;
  imageWidth?: string;
  imageHeight?: string;
  udl?: string[];
}

const HE00601 = ({ headerInfo, questionInfo, audioInfo, imageSrc, imageAlt, udl, imageWidth, imageHeight }: IHE00601) => {
  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <Box>
        <Box marginTop='20px' hAlign={'center'}>
          <PinchZoom>
            <Image src={imageSrc} alt={imageAlt} width={imageWidth || '100%'} height={imageHeight || '100%'} />
            {udl && (
              <HiddenDev>
                {udl.map((udlItem, udlIndex) => (
                  <p key={udlIndex}>{udlItem}</p>
                ))}
              </HiddenDev>
            )}
          </PinchZoom>
        </Box>
      </Box>
    </Container>
  );
};

const HiddenDev = styled.div`
  overflow: hidden;
  position: absolute;
  z-index: -1;
  width: 1px;
  height: 1px;
  font-size: 1px;
  opacity: 0.01;
  clip: rect(1px, 1px, 1px, 1px);
`;

export default HE00601;
