import { TMainHeaderInfoTypes, Box, Typography, ToggleButton, ListHeader, Scroll, List, BoxWrap, Label, EStyleFontSizes } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan B Was Great, Too! (1)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: '해석을 확인해 봅시다.',
  };

  const headerData: IListenAndAnswer = {
    originText: (
      <Box border='none' padding='4px 12px' hAlign='center' width={'900px'}>
        <Typography useGap={false} weight={700}>
          Plan B Was Great, Too!
        </Typography>
      </Box>
    ),
    translation: (
      <Box border='none' padding='4px 12px' hAlign='center' width={'900px'}>
        <Typography useGap={false} weight={700}>
          차선책도 좋았어요!
        </Typography>
      </Box>
    ),
  };

  const subheaderData: IListenAndAnswer = {
    originText: (
      <Box border='none' padding='4px 12px' hAlign='center' width={'900px'}>
        <Typography useGap={false} weight={700}>
          My Plan
        </Typography>
      </Box>
    ),
    translation: (
      <Box border='none' padding='4px 12px' hAlign='center' width={'900px'}>
        <Typography useGap={false} weight={700}>
          나의 계획
        </Typography>
      </Box>
    ),
  };

  const data: IListenAndAnswer[] = [
    {
      originText: `This Saturday is my grandma's birthday.`,
      translation: '이번 토요일은 나의 할머니의 생신이다.',
    },
    {
      originText: `Dad and I will visit her in Gunsan.`,
      translation: `아빠와 나는 군산에 계신 할머니를 방문할 것이다.`,
    },
    {
      originText: `Dad usually makes plans for our family trips, but I will make a plan this time!`,
      translation: `아빠가 보통 가족 여행을 위해 계획을 세우시지만, 이번에는 내가 계획을 세울 것이다!`,
    },
    subheaderData,
    {
      originText: `First, I need bus tickets!`,
      translation: `첫 번째, 나는 버스 승차권이 필요하다!`,
    },
    {
      originText: `I will buy tickets for the first bus from Suwon to Gunsan`,
      translation: `나는 수원에서 군산으로 가는 첫 버스 승차권을 살 것이다.`,
    },
    {
      originText: `The streets will not be busy early in the morning.`,
      translation: `이른 아침에는 길이 막히지 않을 것이다.`,
    },
    {
      originText: `Second, I will get a birthday cake!`,
      translation: `두 번째, 나는 생일 케이크를 살 것이다!`,
    },
    {
      originText: `I will buy a strawberry cake at a famous bakery in Gunsan.`,
      translation: `나는 군산에서 유명한 제과점에서 딸기 케이크를 살 것이다.`,
    },
    {
      originText: `My grandma loves strawberries.`,
      translation: `할머니는 딸기를 좋아하신다.`,
    },
    {
      originText: `Third, I will prepare for my grandma's birthday party!`,
      translation: `세 번째, 나는 할머니의 생신 파티를 준비할 것이다!`,
    },
    {
      originText: `I will find a nice seafood restaurant.`,
      translation: `나는 좋은 해물 요리 식당을 찾을 것이다.`,
    },
    {
      originText: `Fourth, we will take family pictures!`,
      translation: `네 번째, 우리는 가족사진을 찍을 것이다!`,
    },
    {
      originText: `Taking family photos in a studio will be great.`,
      translation: `스튜디오에서 가족사진을 찍는 것은 멋질 것이다.`,
    },
    {
      originText: `I'm so excited!`,
      translation: `나는 너무 기대된다!`,
    },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton
          id='toggle'
          isChecked={isOpen}
          isTranslation
          onClick={() => setIsOpen(!isOpen)}
          ariaLabel={isOpen ? '해석 숨기기' : '해석 보기'}
        />
      </ListHeader>
      <BoxWrap boxGap={10}>
        <Box>
          <Typography>{headerData.originText}</Typography>
          <Box height='80px' paddingTop={4}>
            {isOpen && (
              <Typography color={'var(--color-blue-900)'} size={EStyleFontSizes['X-MEDIUM']}>
                {headerData.translation}
              </Typography>
            )}
          </Box>
        </Box>
      </BoxWrap>

      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer> data={data}>
          {({ value }) => (
            <BoxWrap boxGap={10}>
              {value?.label && (
                <Box padding={'4px 0px'}>
                  <Label value={value?.label} type={'paint'} background={value?.labelColor} />
                </Box>
              )}
              <Box>
                <Typography>{value?.originText}</Typography>
                <Box height='72px'>
                  {isOpen && (
                    <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                      {value?.translation}
                    </Typography>
                  )}
                </Box>
              </Box>
            </BoxWrap>
          )}
        </List>
      </Scroll>
    </Container>
  );
};

export default P04;
