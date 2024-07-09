import { TMainHeaderInfoTypes, IAudioPlayerProps, Box, Scroll, Typography, ETypographyTypes, PinchZoom, Image, List, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IContentInfo {
  id: string;
  altText?: string[];
  textTitle?: string;
  text?: IListenAndAnswer[];
  imageSrc?: string[];
  imageHeight?: string;
}

interface IListenAndAnswer {
  question: string;
  label: string;
  label2?: string;
}

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Amazing Facts About the World (전체 읽기)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L07/C06/A03/ME1-L07-C06-A03-P01.mp3',
    captionSrc: '/L07/C06/A03/ME1-L07-C06-A03-P01.srt',
  };

  const title = 'Amazing Facts About the World';

  const contentInfo: IContentInfo[] = [
    {
      id: `P1`,
      imageSrc: [`/L07/C06/A03/ME1-L07-C06-A03-P01-01.jpg`],
      altText: [
        `퀴즈쇼에 온 아이들 앞에서 진행자가 마이크를 잡은 채 말하고 있는 모습.`,
        `무대 위에는 여자 아이 한 과 남자아이 한 명이 서 있고 주변에서 친구들이 응원하고 있다.`,
        `무대 뒤쪽 벽에는 “QUIZ” 라는 글자가 있고 로봇이 있다.`,
      ],
      text: [
        {
          question: `Welcome to the Paran Quiz Show! I’m your host, Suji. Today, we have two finalists, Namjun from Class 2 
        and Sara from Class 5. Namjun and Sara, how are you today?`,
          label: 'Host',
        },
        {
          question: `I’m nervous, but I’ll do my best.`,
          label: 'Namjun',
        },
        {
          question: `I’m excited!`,
          label: 'Sara',
        },
        {
          question: `The winner will receive a Fast Pass for lunch. Today’s topic is amazing facts about the world. I’m going to 
          ask you three questions. Are you ready?`,
          label: 'Host',
        },
        {
          question: `Yes, I’m ready!`,
          label: 'Namjun',
          label2: 'Sara',
        },
      ],
      imageHeight: '198px',
    },

    {
      id: `P2`,
      imageSrc: [`/L07/C06/A03/ME1-L07-C06-A03-P01-02.jpg`],
      altText: [
        `두 개의 사진이 있다. 사진 위로 로봇과 아이의 모습이 겹쳐져 있다.`,
        `왼쪽: Antarctica 라고 적힌 눈 덮인 사막 사진`,
        `오른쪽: The Sahara 라고 적힌 모래 사막 사진`,
      ],
      text: [
        {
          question: `Here is the first question. What is the largest desert in the world? `,
          label: 'Host',
        },
        {
          question: `It’s the Sahara.`,
          label: 'Namjun',
        },
        {
          question: `It’s Antarctica.`,
          label: 'Sara',
        },
        {
          question: `The answer is … Antarctica!`,
          label: 'Host',
        },
        {
          question: `Antarctica? I thought a desert has to be hot and sandy.`,
          label: 'Namjun',
        },
        {
          question: `Well, it doesn’t need to be hot or sandy. We have AI Joe here. Hey Joe, can you tell us more about deserts? `,
          label: 'Host',
        },
        {
          question: `A desert is a dry place. It can be cold or hot. The Sahara is the largest hot desert in the world. But Antarctica is larger than the 
          Sahara. So Antarctica is the world’s largest desert.`,
          label: 'AI Joe',
        },
      ],
      imageHeight: '120px',
    },

    {
      id: `P3`,
      imageSrc: [`/L07/C06/A03/ME1-L07-C06-A03-P01-03.jpg`],
      altText: [
        `두 개의 사진이 있다. 사진 위로 로봇이 설명하고 있는 모습과 아이가 펜을 들고 메모 하고 있는 모습이 겹쳐져 있다.`,
        `왼쪽: Mount Everest 라고 적힌 산 사진`,
        `오른쪽: Mauna Kea라고 적힌 산 사진`,
      ],
      text: [
        {
          question: `Thank you, Joe. Let’s move on to the next question. What is the tallest mountain in the world? `,
          label: 'Host',
        },
        {
          question: `It’s Mount Everest.`,
          label: 'Namjun',
        },
        {
          question: `It’s Mauna Kea in Hawaii.`,
          label: 'Sara',
        },
        {
          question: `Well, it’s a difficult question. Hey Joe, what is the tallest mountain on Earth?`,
          label: 'Host',
        },
        {
          question: `Mount Everest is the tallest mountain above sea level. Mauna Kea begins below sea level. So from the bottom to the top, Mauna Kea is taller than Mount Everest.`,
          label: 'AI Joe',
        },
        {
          question: `Thank you, Joe.`,
          label: 'Host',
        },
        {
          question: `Then who is correct`,
          label: 'Sara',
        },
        {
          question: `For this question, you are both correct.`,
          label: 'Host',
        },
      ],
      imageHeight: '174px',
    },
    {
      id: `P4`,
      imageSrc: [`/L07/C06/A03/ME1-L07-C06-A03-P01-04.jpg`],
      altText: [
        `두 산의 높이 비교 그래프`,
        `Mount Everest : 8,849 m`,
        `Mauna Kea : 10,211 m`,
        `sea level을 기준으로 하는 선`,
        `4,207 m (above sea level)`,
        `Mount Everest는 이보다 높다.`,
        `Mauna Kea는 이와 동일 하다.`,
        `6,004 m (below sea level)`,
        `Mauna Kea는 이와 동일 하다.`,
      ],
      imageHeight: '114px',
    },
  ];

  const contentInfo2 = [
    {
      id: `P5`,
      imageSrc: [`/L07/C06/A03/ME1-L07-C06-A03-P01-05.jpg`],
      altText: [
        `사막을 가상 공간으로 한 배경 앞에서 로봇이 세계 각 나라에 대해 설명하고 있고 아이들은 사막에 서서 로봇의 설명을 듣고 있다.`,
        `로봇이 설명 하고 있는 세계 지도`,
        `LIBYA`,
        `CHAD`,
        `NIGERIA`,
        `ETHIOPIA`,
        `SAUDI`,
        `ARABIA`,
        `NIGER`,
        `SUDAN`,
      ],
      text: [
        {
          question: `Now, here comes the final question. Which country has the most pyramids in the world?`,
          label: 'Host',
        },
        {
          question: `I’m sure it’s Egypt!`,
          label: 'Sara',
        },
        {
          question: `It’s Sudan`,
          label: 'Namjun',
        },
        {
          question: `The answer is … Sudan!`,
          label: 'Host',
        },
        {
          question: `Oh, really?`,
          label: 'Sara',
        },
        {
          question: `I’m surprised, too. Hey Joe, tell us more about it.`,
          label: 'Host',
        },
        {
          question: `Please look at this map. Sudan and Egypt are close to each other. Egypt is more famous for its pyramids,but Sudan has more pyramids than Egypt.`,
          label: 'AI Joe',
        },
      ],
      imageHeight: '200px',
    },
    {
      id: `P6`,
      imageSrc: [`/L07/C06/A03/ME1-L07-C06-A03-P01-06.jpg`],
      altText: [
        `진행자가 무대에서 마이크를 들고 서 있고 남자 아이와 여자 아이는 무대에서 퀴즈를 맞추고 신나 있다. `,
        `로봇이 아이들을 축하하고 있다.`,
      ],
      text: [
        {
          question: `Thanks, Joe. We have two winners today. Congratulations, Namjun and Sara!`,
          label: 'Host',
        },
      ],

      imageHeight: '200px',
    },
  ];

  const labelColor = (label: string) => {
    const str = label;
    if (str === 'Host') return 'var(--color-purple-800)';
    if (str === 'Namjun') return '#EB6707';
    if (str === 'AI Joe') return 'var(--color-blue-800)';
    if (str === 'Sara') return 'var(--color-green-800)';
    return '';
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <Box background='white' useRound useFull>
        <Scroll height='100%' tabIndex={0}>
          <Box justifyContent='center' display='flex'>
            <Typography styleType={ETypographyTypes.BODY} weight={'var(--font-weight-bold)'}>
              {title}
            </Typography>
          </Box>
          {contentInfo &&
            contentInfo.map((item, index) => (
              <Box key={item.id} marginTop={'24px'}>
                <Box vAlign='center' hAlign='center'>
                  <PinchZoom pinchType={'image'}>
                    <Image alt='' src={item.imageSrc?.[0]} width='320px' height={item.imageHeight} ariaDescribedby={`img_desc_${item.id}`} />
                    {item.altText && (
                      <Box type='hidden' id={`img_desc_${item.id}`}>
                        {item.altText.map((item, idx) => (
                          <p key={idx}> {item} </p>
                        ))}
                      </Box>
                    )}
                  </PinchZoom>
                </Box>

                <Box marginTop={'24px'}>
                  {item.text && (
                    <List<IListenAndAnswer> data={item.text}>
                      {({ value, index = 1 }) => (
                        <BoxWrap>
                          {value?.label2 ? (
                            <>
                              <Box width='180px' height='fit-content' padding='4px 0' textAlign='center'>
                                <Typography weight='var(--font-weight-bold)' color={value?.label && labelColor(value?.label)} useGap={false}>
                                  {value?.label}
                                </Typography>
                                <Box>
                                  <Typography weight='var(--font-weight-bold)' color='var(--color-blue-800)' useGap={false}>
                                    &nbsp;&&nbsp;
                                  </Typography>
                                </Box>
                                <Typography weight='var(--font-weight-bold)' color={value?.label2 && labelColor(value?.label2)} useGap={false}>
                                  {value?.label2}
                                </Typography>
                              </Box>
                            </>
                          ) : (
                            <>
                              <Box width='180px' textAlign='center' height='fit-content' padding='4px 0'>
                                <Typography weight='var(--font-weight-bold)' color={value?.label && labelColor(value?.label)}>
                                  {value?.label}
                                </Typography>
                              </Box>
                            </>
                          )}
                          <Box useFull>
                            <Typography>{value?.question}</Typography>
                          </Box>
                        </BoxWrap>
                      )}
                    </List>
                  )}
                </Box>
              </Box>
            ))}

          {contentInfo2 && (
            <>
              <Box marginTop={'24px'}>
                {contentInfo2[0].text && (
                  <List<IListenAndAnswer> data={contentInfo2[0].text}>
                    {({ value, index = 1 }) => (
                      <BoxWrap>
                        <Box width='180px' textAlign='center' height='fit-content' padding='4px 0'>
                          <Typography weight='var(--font-weight-bold)' color={value?.label && labelColor(value?.label)}>
                            {value?.label}
                          </Typography>
                        </Box>
                        <Box useFull>
                          <Typography>{value?.question}</Typography>
                        </Box>
                      </BoxWrap>
                    )}
                  </List>
                )}
              </Box>
              <Box vAlign='center' hAlign='center' marginTop={'24px'} gap={10}>
                <Box>
                  <PinchZoom pinchType={'image'}>
                    <Image
                      alt=''
                      src={contentInfo2[0].imageSrc?.[0]}
                      height={contentInfo2[0].imageHeight}
                      ariaDescribedby={`img_desc_${contentInfo2[0].id}`}
                      width='292px'
                    />
                    {contentInfo2[0].altText && (
                      <Box type='hidden' id={`img_desc_${contentInfo2[0].id}`}>
                        {contentInfo2[0].altText.map((item, idx) => (
                          <p key={idx}> {item} </p>
                        ))}
                      </Box>
                    )}
                  </PinchZoom>
                </Box>
                <Box>
                  <PinchZoom pinchType={'image'}>
                    <Image
                      alt=''
                      src={contentInfo2[1].imageSrc?.[0]}
                      height={contentInfo2[1].imageHeight}
                      ariaDescribedby={`img_desc_${contentInfo2[1].id}`}
                      width='330px'
                    />
                    {contentInfo2[1].altText && (
                      <Box type='hidden' id={`img_desc_${contentInfo2[1].id}`}>
                        {contentInfo2[1].altText.map((item, idx) => (
                          <p key={idx}> {item} </p>
                        ))}
                      </Box>
                    )}
                  </PinchZoom>
                </Box>
              </Box>
              <Box marginTop={'24px'}>
                {contentInfo2[1].text && (
                  <List<IListenAndAnswer> data={contentInfo2[1].text}>
                    {({ value, index = 1 }) => (
                      <BoxWrap>
                        <Box width='180px' textAlign='center' height='fit-content' padding='4px 0'>
                          <Typography weight='var(--font-weight-bold)' color={value?.label && labelColor(value?.label)}>
                            {value?.label}
                          </Typography>
                        </Box>
                        <Box useFull>
                          <Typography>{value?.question}</Typography>
                        </Box>
                      </BoxWrap>
                    )}
                  </List>
                )}
              </Box>
            </>
          )}
        </Scroll>
      </Box>
    </Container>
  );
};

export default P01;
