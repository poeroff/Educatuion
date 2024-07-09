import { Box, BoxWrap, IAudioPlayerProps, IQuestionProps, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

export interface IHE01602 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  info: IHE01602Info;
}

export interface IHE01602Info {
  altText: string;
  hiddenAltText?: React.ReactNode;
  text: React.ReactNode;
  imageSrc: string;
  title?: string[];
  imageWidth?: string;
  imageHeight?: string;
  textBorder?: string;
}

const HE01602 = ({ headerInfo, audioInfo, questionInfo, info }: IHE01602) => {
  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo} questionInfo={questionInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image
              src={info.imageSrc}
              width={info?.imageWidth || '100%'}
              height={info?.imageHeight || '100%'}
              alt={info.altText}
              ariaDescribedby={info.hiddenAltText ? 'img_desc' : undefined}
            />
            {info.hiddenAltText && (
              <Box type='hidden' id='img_desc'>
                {info.hiddenAltText}
              </Box>
            )}
          </PinchZoom>
          {info.hiddenAltText && (
            <Box type='hidden' id={'img_desc'}>
              {info.hiddenAltText}
            </Box>
          )}
        </Box>
        <Box marginLeft='10px' useFull>
          {info?.title ? (
            <>
              <Box height='25%' flexDirection='column' hAlign='center'>
                {info.title.map((title, index) => (
                  <Box key={index} hAlign='center'>
                    <Typography weight='var(--font-weight-bold)' align='center'>
                      {title}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box useFull background='white' useRound height='70%'>
                <Scroll height='100%' tabIndex={0}>
                  {info.text}
                </Scroll>
              </Box>
            </>
          ) : (
            <Box useFull background='white' useRound>
              <Scroll height='100%' tabIndex={0}>
                {info.text}
              </Scroll>
            </Box>
          )}
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE01602;
