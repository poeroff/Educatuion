import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  Image,
  IQuestionProps,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const textContentA03 = {
  title: `A Better Future for
  Coffee Waste`,
  content: `The famous German musician Johann Sebastian Bach once said, “Without my morning coffee, I’m just like a dried-up piece of goat.” Today this sentiment is shared by many,with coffee shops springing up on almost every street corner, and it is common to see city residents walking around with a cup of coffee in hand. According to the International Coffee Organization (ICO), approximately 10 billion tons of coffee was consumed worldwide between 2020 and 2021, and Koreans made a significant contribution to this huge total, consuming 150,780 tons of coffee. This means that every Korean adult drank an average of one cup of coffee every day throughout the year. Clearly, for Koreans and other world citizens, coffee is not just a drink but a daily necessity.
  The world’s widespread love of coffee comes at a substantial environmental cost, as the extraction process generates significant waste. Only 0.2 percent of a coffee bean is used to make coffee, with the remaining 99.8 percent disposed of as waste. As a result, the vast quantity of coffee consumed worldwide produces millions of tons of coffee waste each year.
  So, what happens to all the waste from the coffee extraction process? Spent coffee grounds (SCGs) are classified as general waste and sent to landfills. There they break down, releasing methane, a greenhouse gas that is approximately 25 times more potent than CO2. Some SCGs are incinerated instead of being buried, but this releases a lot of CO2: 338 kg per ton. However, neither of these waste management options takes into account the potential value of coffee grounds. Although the grounds contain valuable organic compounds and minerals, they are simply destroyed.
  An example of a circular economy in action occurs when a chain of coffee shops collaborates with an organization to collect spent coffee grounds from its shops. These grounds are processed to remove impurities and dried out. The resulting SCGs are sold to fertilizer companies, where they are transformed into organic fertilizer. This fertilizer is later sold back to the coffee shop chain. The chain provides the fertilizer to local ecofriendly farmers, who then sell their produce back to the chain. The farm produce can be used to create various food items, such as rice chips and dried sweet potatoes, which are sold in the chain’s coffee shops. By repurposing coffee grounds in this manner, related businesses and local farmers can benefit both economically and environmentally.
  Recycled coffee grounds have a wide range of uses, including coffee logs, fabrics for clothing and shoes, and reusable cups. Coffee logs, for instance, generate more heat and burn for a longer time than wood. Fabric made from coffee grounds absorbs sweat, dries quickly, and provides UV protection. Reusable cups from coffee grounds not only have a visually appealing appearance but also preserve the taste of the coffee. Korea has shown a growing interest in recycling spent coffee grounds in recent years. The government is taking steps toward the creation of a sustainable recycling system in the coffee industry, while companies are dedicating themselves to researching and developing new uses for coffee waste. By recycling materials such as coffee waste, individuals can also help protect the environment. With continued efforts, the recycling of used coffee grounds is expected to increase, encouraging more sustainable methods of enjoying coffee for years to come.`,
};

const imgContentA03P01 = {
  imgSrc: `/L04/C07/A03/HE1-L04-C07-A03-P01.jpg`,
  imgAlt: `커피가 추출 되고 있는 머그잔 사진과 연결된 이름표 Coffee Shop Owner
  말풍선 We don’t throw away coffee waste produced in our shop. Instead, we
  collaborate with an organization to collect it and use it as fertilizer to produce
  various food items. Enjoy coffee while joining our green effort!
  벽난로 앞 Coffee Logs 라고 써있는 봉투 사진과 연결된 이름표 Coffee Log Maker
  말풍선 We make our products from ... Being eco-friendly is just
  one of the benefits of our logs; they also ... Purchase our
  products for yourself and the environment!
  한 손에 핸드폰을 들고 있는 사람의 상체 사진과 연결된 이름표 Coffee Ground Clothing Seller
  말풍선 Our clothing and shoes are crafted from ... They ... Wear our products and ...!
  각기 다른 색깔을 가진 세 개의 컵 사진과 연결된 이름표 Reusable Cup Maker
  말풍선 Made from ..., our products not only ... but also ... Use our cups and ...!`,
};

const P01 = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { title, content } = textContentA03;
  const { imgSrc, imgAlt } = imgContentA03P01;

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Present',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Think about how people could promote their business based on the main text, and then present your ideas',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} useExtend vAlign='flex-start'>
      <Box hAlign='right' paddingRight={'40px'}>
        <Button minWidth='96px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문 보기' onClick={handleButtonClick} useRound />
      </Box>
      <ImgBox>
        <PinchZoom>
          <Image type={EImageType.IMG} src={imgSrc} width='600px' height='330px' />
          <Box type='hidden'>{imgAlt}</Box>
        </PinchZoom>
      </ImgBox>

      <Dialog width={893} height={458} isShow={isDialogOpen} onClose={handleDialogClose} useFooter={true} closeLabel={'지문 닫기'}>
        <Box vAlign='center' width='100%' height='48px' useRound backgroundColor='var(--color-grey-100)' marginBottom='24px' tabIndex={105}>
          <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
            {title}
          </Typography>
        </Box>

        <Box hAlign='center' marginTop='24px'>
          <Scroll height={'250px'}>
            {content.split('\n').map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <Typography size={EStyleFontSizes.MEDIUM}>{paragraph}</Typography>
                <br />
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Scroll>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P01;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
`;
