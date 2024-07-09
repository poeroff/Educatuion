import styled from '@emotion/styled';
import { TMainHeaderInfoTypes, IAudioPlayerProps, Box, Scroll, Typography, ETypographyTypes, PinchZoom, Image, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan B Was Great, Too! (전체 읽기)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A03/ME1-L04-C06-A03-P01.mp3',
    captionSrc: '/L04/C06/A03/ME1-L04-C06-A03-P01.srt',
  };

  const title = 'Plan B Was Great, Too!';

  const contentInfo = [
    {
      id: `P1`,
      imageSrc: [`/L04/C06/A03/ME1-L04-C06-A03-P01-01.jpg`],
      altText: [
        `여자아이가 할머니 생신 기념 군산여행을 계획하고 있다.`,
        `여자아이의 머리 위로 할머니의 모습이 있고 여자아이 주변으로 버스, 딸기 케이크, 카메라가 있다.`,
      ],
      rightText: [
        {
          text: (
            <>
              &nbsp;This Saturday is my grandma’s birthday. Dad and I will visit her in Gunsan. Dad usually makes the plans for family trips, but I
              will make the plan this time!
            </>
          ),
        },
      ],
      bottomText: [
        {
          text: (
            <StyledText color='var(--color-green-600)' weight={'var(--font-weight-bold)'}>
              My Plan
            </StyledText>
          ),
        },
        {
          text: (
            <>
              &nbsp;First, I need bus tickets! I will buy tickets for the first bus from Suwon to Gunsan. The streets will not be busy early in the
              morning.
            </>
          ),
        },
        {
          text: <br />,
        },
        {
          text: (
            <>&nbsp;Second, I will get a birthday cake! I will buy a strawberry cake at a famous bakery in Gunsan. My grandma loves strawberries.</>
          ),
        },
        {
          text: <br />,
        },
        {
          text: (
            <>
              &nbsp;Third, I will prepare for my grandma’s birthday party! I will find a nice seafood restaurant. Fourth, I will take family pictures!
              Taking family photos in a studio will be great. I’m so excited!
            </>
          ),
        },
      ],
    },

    {
      id: `P2`,
      imageSrc: [`/L04/C06/A03/ME1-L04-C06-A03-P01-02.jpg`],
      altText: [
        `아버지와 여자아이가 기차의 온돌 방에 앉아있다.`,
        `그 아래로 만족스럽지 못한 표정으로 케이크 집을 나오고 있는 여자아이의 모습과 어버지, 할머니, 여자아이가 행복한 표정으로 케이크 식탁 앞에 앉아있는 모습이 보인다. `,
        `식탁 주변으로 문어, 꽃게, 물고기의 모습이 보인다.`,
      ],
      rightText: [
        {
          text: (
            <StyledText color='#EB6707' weight={'var(--font-weight-bold)'}>
              On Grandma’s Birthday
            </StyledText>
          ),
        },
        {
          text: (
            <>
              &nbsp;My plan looked perfect. But Dad and I woke up late and missed the bus. I said, “It’s okay, Dad. We have a plan B. Our plan B is
              taking the train.” Dad said, “Great! You had another plan.
            </>
          ),
        },
      ],

      bottomText: [
        {
          text: (
            <>
              Thanks to you, we can be there in time.” So we took the train, and it even had a special ondol room! Dad and I really enjoyed riding on
              the train. We got there in time. Hooray!
            </>
          ),
        },
        {
          text: <br />,
        },
        {
          text: (
            <>
              &nbsp;We had another problem. There was no strawberry cake at the bakery. We got a carrot cake instead. Finally, we met Grandma at the
              seafood restaurant. She loved the food, even the carrot cake! Her birthday party was a big success.
            </>
          ),
        },
      ],
    },

    {
      id: `P3`,
      imageSrc: [`/L04/C06/A03/ME1-L04-C06-A03-P01-03.jpg`],
      altText: [`사진관의 모습이 있고 그 앞으로 아버지, 할머니, 여자아이가 옛날 교복을 입고 찍은 사진이 있다.`],
      rightText: [
        {
          text: (
            <>
              &nbsp;Lastly, we went to the studio. We put on school uniforms for fun. I said, “Grandma, you look like a student in that uniform.” We
              took very nice pictures together. My grandma looked so happy.
            </>
          ),
        },
      ],

      bottomText: [
        {
          text: <>She said, “Thank you for everything today. I love you so much!</>,
        },
        {
          text: <br />,
        },
        { text: <>&nbsp;My plan did not work out perfectly, but I was not upset. I had another plan. Plan B was great, too!</> },
      ],
    },
  ];

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
              <Box key={item.id}>
                <BoxWrap marginTop={'24px'}>
                  <Box marginTop='12px'>
                    <PinchZoom pinchType={'image'}>
                      <Image alt='' src={item.imageSrc?.[0]} width='320px' ariaDescribedby={`img_desc_${item.id}`} />
                      {item.altText && (
                        <Box type='hidden' id={`img_desc_${item.id}`}>
                          {item.altText.map((item, idx) => (
                            <p key={idx}> {item} </p>
                          ))}
                        </Box>
                      )}
                    </PinchZoom>
                  </Box>
                  <Box>
                    {item.rightText.map((styledTextItem, styledTextIndex) => (
                      <Box key={styledTextIndex}>
                        <Typography>{styledTextItem.text}</Typography>
                      </Box>
                    ))}
                  </Box>
                </BoxWrap>

                {item.bottomText && (
                  <Box>
                    {item.bottomText.map((styledTextItem, styledTextIndex) => (
                      <Box key={styledTextIndex}>
                        <Typography>{styledTextItem.text}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}
                <br />
              </Box>
            ))}
        </Scroll>
      </Box>
    </Container>
  );
};

const StyledText = styled.span<{ color?: string; weight?: string }>`
  font-size: 28px;
  padding: 4px 12px;
  ${props =>
    props.color &&
    props.weight &&
    `
    color : ${props.color};
    font-weight : ${props.weight};
    `}
`;

export default P01;
