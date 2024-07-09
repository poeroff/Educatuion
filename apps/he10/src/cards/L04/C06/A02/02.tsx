import HE01603 from '@maidt-cntn/pages/HE-016-03';
import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';

interface IHE01603Info {
  id: string;
  altText?: string[];
  textTitle?: string;
  text: string[];
  imageSrc?: string[];
  imagePosition: string;
}

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `A Better Future for Coffee Waste (전체 읽기)`,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A02/HE1-L04-C06-A02.mp3',
    captionSrc: '/L04/C06/A02/HE1-L04-C06-A02.srt',
  };
  const title = 'A Better Future for Coffee Waste';

  const HE01603Info: IHE01603Info[] = [
    {
      id: 'P1',
      altText: ['네 사람이 탁자에 둘러앉아 커피를 마시며 재미있게 이야기를 나누고 있다'],
      text: [
        '\nThe famous German musician Johann Sebastian Bach once said, “Without my morning coffee, I’m just like a dried-up piece of goat.” Today this sentiment is shared by many, with coffee shops springing up on almost every street corner, and it is common to see city residents walking around with a cup of coffee in hand. According to the International Coffee Organization (ICO), approximately 10 billion tons of coffee was consumed worldwide between 2020 and 2021, and Koreans made a significant contribution to this huge total, consuming 150,780 tons of coffee. This means that every Korean adult drank an average of one cup of coffee every day throughout the year. Clearly, for Koreans and other world citizens, coffee is not just a drink but a daily necessity.',
      ],
      imageSrc: ['/L04/C06/A02/HE1-L04-C06-A02-01.jpg'],
      imagePosition: 'before',
    },
    {
      id: 'P2',
      altText: [
        '커피머신에서 커피를 내리는 이미지 위로 커피 콩에서 나오는 쓰레기를 설명하는 슬라이드가 위치해있다. 이미지 제목 How Much of a coffee bean is used to make coffee? 슬라이드 텍스트 0.2% 99.8%',
      ],
      text: [
        '\nThe world’s widespread love of coffee comes at a substantial environmental cost, as the extraction process generates significant waste. Only 0.2 percent of a coffee bean is used to make coffee, with the remaining 99.8 percent disposed of as waste. As a result, the vast quantity of coffee consumed worldwide produces millions of tons of coffee waste each year.',
      ],
      imageSrc: ['/L04/C06/A02/HE1-L04-C06-A02-02.jpg'],
      imagePosition: 'before',
    },
    {
      id: 'P3',
      altText: ['커피머신에서 커피 찌꺼기를 분리해내고 있다.'],
      text: [
        '\nSo, what happens to all the waste from the coffee extraction process? Spent coffee grounds (SCGs) are classified as general waste and sent to landfills. There they break down, releasing methane, a greenhouse gas that is approximately 25 times more potent than CO2. Some SCGs are incinerated instead of being buried, but this releases a lot of CO2: 338 kg per ton. However, neither of these waste management options takes into account the potential value of coffee grounds. Although the grounds contain valuable organic compounds and minerals, they are simply destroyed.\nFortunately, thanks to increased awareness of the coffee waste problem, companies, organizations, and governments around the world are working hard to improve the environmental impact of the coffee industry through circular economy measures. A circular economy promotes the reuse of resources for as long as possible, reducing waste and environmental costs.',
      ],
      imageSrc: ['/L04/C06/A02/HE1-L04-C06-A02-03.jpg'],
      imagePosition: 'before',
    },
    {
      id: 'P4',
      altText: [
        '커피가 생산되고 소비되는 과정을 선형적, 원형적으로 나타낸 인포그래픽이다. 이미지 제목: Linear and Circular Economies of Spent Coffee Grounds 슬라이드 텍스트 Coffee Beans Coffee Spent Coffee Grounds(SCGs) Methane Buried CO2 Incinerated Coffee Shop Collection Center Fertilizer Company Organic Fertilizer Eco-Friendly Farm Farm Produce Coffee Shop Chain Food Items',
      ],
      text: [
        '\nAn example of a circular economy in action occurs when a chain of coffee shops collaborates with an organization to collect spent coffee grounds from its shops. These grounds are processed to remove impurities and dried out. The resulting SCGs are sold to fertilizer companies, where they are transformed into organic fertilizer. This fertilizer is later sold back to the coffee shop chain. The chain provides the fertilizer to local ecofriendly farmers, who then sell their produce back to the chain. The farm produce can be used to create various food items, such as rice chips and dried sweet potatoes, which are sold in the chain’s coffee shops. By repurposing coffee grounds in this manner, related businesses and local farmers can benefit both economically and environmentally.',
      ],
      imageSrc: ['/L04/C06/A02/HE1-L04-C06-A02-04.jpg'],
      imagePosition: 'before',
    },
    {
      id: 'P5',
      altText: ['커피 찌꺼기가 재활용된 예시들을 보여주고 있다. 각각 연료, 섬유, 재활용 컵이다.', '커피콩과 커피찌꺼기가 화분에 담겨있는 모습이다.'],
      text: [
        '\nRecycled coffee grounds have a wide range of uses, including coffee logs, fabrics for clothing and shoes, and reusable cups. Coffee logs, for instance, generate more heat and burn for a longer time than wood. Fabric made from coffee grounds absorbs sweat, dries quickly, and provides UV protection. Reusable cups from coffee grounds not only have a visually appealing appearance but also preserve the taste of the coffee. Korea has shown a growing interest in recycling spent coffee grounds in recent years. The government is taking steps toward the creation of a sustainable recycling system in the coffee industry, while companies are dedicating themselves to researching and developing new uses for coffee waste. By recycling materials such as coffee waste, individuals can also help protect the environment. With continued efforts, the recycling of used coffee grounds is expected to increase, encouraging more sustainable methods of enjoying coffee for years to come.',
      ],
      imageSrc: ['/L04/C06/A02/HE1-L04-C06-A02-05.jpg', '/L04/C06/A02/HE1-L04-C06-A02-06.jpg'],
      imagePosition: 'both',
    },
  ];

  return <HE01603 headerInfo={headerInfo} audioInfo={audioInfo} title={title} info={HE01603Info} />;
};

export default P02;
