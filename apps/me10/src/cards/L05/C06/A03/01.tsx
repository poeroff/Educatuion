import { TMainHeaderInfoTypes, IAudioPlayerProps, Box, Scroll, Typography, ETypographyTypes, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IContentInfo {
  id: string;
  altText?: string[];
  textTitle?: string;
  text: string[];
  imageSrc?: string[];
  imageHeight?: string;
  styledText?: IStyledText[];
}

interface IStyledText {
  text: string;
  color: string;
}

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Small Actions, Big Change (전체 읽기)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L05/C06/A03/ME1-L05-C06-A03-P01.mp3',
    captionSrc: '/L05/C06/A03/ME1-L05-C06-A03-P01.srt',
  };

  const title = 'Small Actions, Big Change';

  const contentInfo: IContentInfo[] = [
    {
      id: `P1`,
      imageSrc: [`/L05/C06/A03/ME1-L05-C06-A03-P01-01.jpg`],
      altText: [
        `Day1부터 Day7까지 환경보호를 위해 실천해야 할 일들을 그림으로 보여주는 조각 퍼즐`,
        `DAY1 know your trash`,
        `DAY 2 종이가방`,
        `DAY 3 Say No to straws.`,
        `DAY 4 슬픈 표정이 그려진 플라스틱 컵`,
        `DAY 5 Buy and sell secondhand items.`,
        `DAY 6 분리수거 스레기통`,
        `DAY 7 Visit a zero-waste shop.`,
      ],
      text: [
        `   Last month, I saw “#ZeroWasteChallenge” on Jiwoo’s social media. The challenge was making no trash. I liked her idea and tried the challenge. Here is my one-week plan for a trash-free life.`,
      ],
      imageHeight: '222px',
    },

    {
      id: `P2`,
      imageSrc: [`/L05/C06/A03/ME1-L05-C06-A03-P01-02.jpg`],
      altText: [`Sunny Day에 자신이 버린 쓰레기를 떠올리며 생각하는 여자아이의 모습`],
      styledText: [
        {
          text: `DAY 1 Know your trash.`,
          color: `var(--color-red-800)`,
        },
      ],
      text: [
        `   Today is the first day of the challenge. Jiwoo gave me some advice. She said, “Knowing your trash is very important.” So I went through my garbage. I was throwing away too much paper and plastic! I should not be so wasteful.`,
      ],
      imageHeight: '286px',
    },

    {
      id: `P3`,
      imageSrc: [`/L05/C06/A03/ME1-L05-C06-A03-P01-03.jpg`],
      altText: [`“No Straw Please.”라고 적힌 음료수 그림과 빨대를 사용하지 않고 컵을 들고 있는 남자와 여자`],
      styledText: [
        {
          text: `DAY 3 Say NO to straws.`,
          color: `var(--color-blue-600)`,
        },
      ],
      text: [
        `   It was really hot today, so Dad bought me lemonade. It came with a straw. I said, “No straw, please. Thank you!” I should say this more often.`,
      ],
      imageHeight: '215px',
    },
    {
      id: `P4`,
      imageSrc: [`/L05/C06/A03/ME1-L05-C06-A03-P01-04.jpg`],
      altText: [`엄마와 함께 스마트폰으로 보며 중고 물품 옷가지를 보고 있는 여자 아이`],
      styledText: [
        {
          text: `DAY 5 Buy and sell secondhand items.`,
          color: `#EB6707`,
        },
      ],
      text: [
        `   Today I cleaned my room and found too many T-shirts. I didn’t wear some of them for a long time. With Mom’s help, I used an app for buying and selling secondhand items. We listed my T-shirts on the app. To my surprise, one person wanted one, and I sold it to him. With that money, I bought a used badminton racket. Hooray!`,
      ],
      imageHeight: '312px',
    },
    {
      id: `P5`,
      imageSrc: [`/L05/C06/A03/ME1-L05-C06-A03-P01-05.jpg`],
      altText: [`쓰레기 없는 상점에서 필요한 물건을 다회용기에 담고 있는 여자 아이의 모습`, `상점에는 다양한 물건이 플라스틱 통에 진열되어 있다.`],
      styledText: [
        {
          text: `DAY 7 Visit a zero-waste shop.`,
          color: `var(--color-green-600)`,
        },
      ],
      text: [
        `   This morning, I ran out of shampoo. I took the empty bottle and went to a zero-waste shop. I filled my bottle with shampoo there. It smelled so good! This way, I cut down on plastic.`,
      ],
      imageHeight: '288px',
    },
    {
      id: `P6`,
      imageSrc: [`/L05/C06/A03/ME1-L05-C06-A03-P01-06.jpg`],
      altText: [
        `네 장의 사진이 있다.`,
        `#Day 1 #My trash`,
        `여학생이  쓰레기를 모아놓고 자신의 얼굴과 함께 찍은 사진`,
        `#Day 3 #NoStraws`,
        `빨대 없이 음료를 마시고 있는 남학생과 여학생`,
        `#Day5 #Secondhanditems`,
        `테니스 라켓과 티셔츠를 들고 함께 사진 찍는 여학생과 엄마`,
        `#Day 7 #ZeroWasteShop`,
        `상점 앞에서 다회용기를 손에 들고 기념 사진을 찍는 여학생`,
      ],
      text: [
        `   I posted my pictures on my social media. I got many “likes”. Some of my friends even tried the challenge. We shared useful tips and ideas. This challenge was good for the environment, but it was also great for our friendship. We helped the Earth together.`,
      ],
      imageHeight: '286px',
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
              <Box marginTop={'24px'} key={item.id}>
                {item.styledText &&
                  item.styledText.map((styledTextItem, styledTextIndex) => (
                    <Typography key={styledTextIndex} color={styledTextItem.color} weight={'var(--font-weight-bold)'} usePre>
                      {styledTextItem.text}
                    </Typography>
                  ))}

                {item.text.map((textItem, textIndex) => (
                  <Box key={item.id}>
                    <Typography key={textIndex} usePre>
                      &nbsp;{textItem}
                    </Typography>
                  </Box>
                ))}

                <Box vAlign='center' hAlign='center' marginTop={'6px'}>
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
              </Box>
            ))}
        </Scroll>
      </Box>
    </Container>
  );
};

export default P01;
