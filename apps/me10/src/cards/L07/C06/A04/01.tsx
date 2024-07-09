import styled from '@emotion/styled';
import {
  Box,
  BoxWrap,
  ETypographyTypes,
  IAudioPlayerProps,
  IQuestionProps,
  Image,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
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
  text: IHE01603Text;
  imageSrc?: string[];
  imagePosition: string; // 'before', 'after', 'both', 'doubleAfter'
  udl?: string[];
  imageWidth?: string;
}

export interface IHE01603Text {
  textContent: string;
  styledContents: IHE01603TextStyle[];
}

export interface IHE01603TextStyle {
  text: string;
  color: string;
  usePre: boolean;
  useGap: boolean;
}

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Amazing Facts About the World (1)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L07/C06/A04/ME1-L07-C06-A04-P01.mp3',
    captionSrc: '/L07/C06/A04/ME1-L07-C06-A04-P01.srt',
    top: -10,
  };

  const title = 'Amazing Facts About the World';
  const styledTexts: IHE01603TextStyle[] = [
    {
      text: 'Host',
      color: 'var(--color-purple-800)',
      usePre: false,
      useGap: true,
    },
    {
      text: 'Namjun',
      color: '#EB6707',
      usePre: false,
      useGap: true,
    },
    {
      text: 'Sara',
      color: 'var(--color-green-800)',
      usePre: false,
      useGap: true,
    },
    {
      text: '&',
      color: 'var(--color-blue-800)',
      usePre: false,
      useGap: false,
    },
  ];

  const info: IHE01603Info[] = [
    {
      id: 'P1',
      altText: [
        `퀴즈쇼에 온 아이들 앞에서 진행자가 마이크를 잡은 채 말하고 있는 모습.
        무대 위에는 여자 아이 한 과 남자아이 한 명이 서 있고 주변에서 친구들이 응원하고 있다.  무대 뒤쪽 벽에는 “QUIZ” 라는 글자가 있고 로봇이 있다.`,
      ],
      text: {
        textContent: `     Welcome to the Paran Quiz Show! I’m your host, Suji. Today, we have two finalists, Namjun from Class 2 and Sara from Class 5. Namjun and Sara, how are you today?`,
        styledContents: [styledTexts[0]],
      },
      imageSrc: ['/L07/C06/A04/ME1-L07-C06-A04-P01.jpg'],
      imagePosition: 'before',
    },
    {
      id: 'P2',
      text: {
        textContent: `I’m nervous, but I’ll do my best.`,
        styledContents: [styledTexts[1]],
      },
      imagePosition: '',
    },
    {
      id: 'P3',
      text: {
        textContent: `I’m excited!`,
        styledContents: [styledTexts[2]],
      },
      imagePosition: '',
    },
    {
      id: 'P4',
      text: {
        textContent: `     The winner will receive a Fast Pass for lunch. Today’s topic is amazing facts about the world. I’m going to ask you three questions. Are you ready?`,
        styledContents: [styledTexts[0]],
      },
      imagePosition: '',
    },
    {
      id: 'P5',
      text: {
        textContent: `Yes, I’m ready!`,
        styledContents: [styledTexts[1], styledTexts[3], styledTexts[2]],
      },
      imagePosition: '',
    },
  ];

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <Box background='white' useRound useFull>
        <Scroll height='100%' tabIndex={0}>
          <Box justifyContent='center' display='flex'>
            <Typography weight={700}>{title}</Typography>
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
                <Box vAlign='top' marginTop={10}>
                  {item.text.styledContents.map((styleItem, styleIndex) => (
                    <Typography
                      key={styleIndex}
                      color={styleItem.color}
                      weight={'var(--font-weight-bold)'}
                      usePre={styleItem.usePre}
                      useGap={styleItem.useGap}
                    >
                      {styleItem.text}
                    </Typography>
                  ))}
                  <Typography key={index} style={{ whiteSpace: 'pre-wrap' }}>
                    {item.text.textContent}
                  </Typography>
                </Box>
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

export default P01;
