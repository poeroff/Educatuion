import styled from '@emotion/styled';
import { Box, ETypographyTypes, IAudioPlayerProps, IQuestionProps, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
export interface IHE01603 {
  headerInfo: TMainHeaderInfoTypes;
  audioInfo?: IAudioPlayerProps;
  title: string;
  info: IHE01603Info[];
  questionInfo?: IQuestionProps;
}

export interface IHE01603Info {
  id: string;
  altText?: string[];
  textTitle?: string;
  text: string[];
  styledText?: IHE01603Text[];
  nodeText?: React.ReactNode;
  imageSrc?: string[];
  imagePosition: string; // 'before', 'after', 'both', 'doubleAfter'
  udl?: string[];
  imageWidth?: string;
}

export interface IHE01603Text {
  text: string;
  color: string;
  usePre: boolean;
  useGap: boolean;
  weight?: string;
}

const HE01603 = ({ headerInfo, audioInfo, title, info, questionInfo }: IHE01603) => {
  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo} questionInfo={questionInfo}>
      <Box background='white' useRound useFull>
        <Scroll height='100%' tabIndex={0}>
          <Box justifyContent='center' display='flex'>
            <Typography styleType={ETypographyTypes.BODY}>{title}</Typography>
          </Box>
          {info &&
            info.map((item, index) => (
              <div key={item.id}>
                {(item.imagePosition === 'before' || item.imagePosition === 'both') && item.imageSrc?.[0] && (
                  <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                    <PinchZoom key={102 + index} pinchType={'image'}>
                      <Image alt={item.altText?.[0] || ''} src={item.imageSrc[0]} width={item.imageWidth || '480px'} />
                      {item.udl && (
                        <HiddenDev>
                          {item.udl.map((udlItem, udlIndex) => (
                            <p key={udlIndex}>{udlItem}</p>
                          ))}
                        </HiddenDev>
                      )}
                    </PinchZoom>
                  </div>
                )}
                {item.textTitle && (
                  <Typography weight={700} usePre>
                    {item.textTitle}
                  </Typography>
                )}
                {item.text[0] &&
                  item.text.map((textItem, textIndex) => (
                    <Typography lineHeight={'48px'} key={textIndex}>
                      &nbsp;&nbsp;{textItem}
                    </Typography>
                  ))}
                {item.styledText &&
                  item.styledText.map((styledTextItem, styledTextIndex) => (
                    <Typography
                      key={styledTextIndex}
                      color={styledTextItem.color}
                      usePre={styledTextItem.usePre}
                      useGap={styledTextItem.useGap}
                      weight={styledTextItem?.weight}
                    >
                      {styledTextItem.text}
                    </Typography>
                  ))}
                {item?.nodeText && item.nodeText}
                {(item.imagePosition === 'after' || item.imagePosition === 'both' || item.imagePosition === 'doubleAfter') && (
                  <>
                    <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                      <PinchZoom key={202 + index} pinchType={'image'}>
                        <Image
                          alt={item.imagePosition === 'both' ? item.altText?.[1] || '' : item.altText?.[0] || ''}
                          src={item.imagePosition === 'both' ? item.imageSrc?.[1] || '' : item.imageSrc?.[0] || ''}
                          width='480px'
                        />
                        {item.udl && (
                          <HiddenDev>
                            {item.udl.map((udlItem, udlIndex) => (
                              <p key={udlIndex}>{udlItem}</p>
                            ))}
                          </HiddenDev>
                        )}
                      </PinchZoom>
                    </div>
                    {item.imagePosition === 'doubleAfter' && item.imageSrc?.[1] && (
                      <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                        <PinchZoom key={302 + index} pinchType={'image'}>
                          <Image alt={item.altText?.[1] || ''} src={item.imageSrc[1]} width='480px' />
                          {item.udl && (
                            <HiddenDev>
                              {item.udl.map((udlItem, udlIndex) => (
                                <p key={udlIndex}>{udlItem}</p>
                              ))}
                            </HiddenDev>
                          )}
                        </PinchZoom>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
        </Scroll>
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

export default HE01603;
