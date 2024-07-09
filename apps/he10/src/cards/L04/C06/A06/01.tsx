import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (4)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A06/HE1-L04-C06-A06-P01.mp3',
  };

  const info: IHE01602Info = {
    text: ` An example of a circular economy in action occurs when a chain of coffee shops collaborates with an organization to collect spent coffee
    grounds from its shops. These grounds are processed to remove impurities and dried out. The resulting SCGs are sold to fertilizer
    companies, where they are transformed into organic fertilizer. This fertilizer is later sold back to the coffee shop chain. The chain
    provides the fertilizer to local ecofriendly farmers, who then sell their produce back to the chain. The farm produce can be used to
    create various food items, such as rice chips and dried sweet potatoes, which are sold in the chain’s coffee shops. By repurposing coffee
    grounds in this manner, related businesses and local farmers can benefit both economically and environmentally.`,
    altText: `<p>이 이미지는 커피 찌꺼기의 선형 및 순환 경제를 나타내고 있다.</p>
    <p>Coffee Beans: 커피콩에서 시작한다.</p>
    <p>Coffee Shop: 커피숍에서는 커피콩을 사용해 커피를 만든다.</p>
    <p>Spent Coffee Grounds (SCGs): 커피를 만드는 과정에서 커피 찌꺼기가 발생한다.</p>
    <p>Methane, CO₂: 커피 찌꺼기는 매립되거나 소각되어 메탄과 이산화탄소가 발생할 수 있다.</p>
    <p>Collection Center: 순환 경제에서는 커피 찌꺼기가 수집 센터로 이동 한다.</p>
    <p>Fertilizer Company: 수집 센터에서 커피 찌꺼기는 비료 회사로 보내 진다.</p>
    <p>Organic Fertilizer: 비료 회사는 커피 찌꺼기를 유기농 비료로 가공 한다.</p>
    <p>Eco-Friendly Farm: 유기농 비료는 친환경 농장에서 농산물을 재배하는 데 사용 된다.</p>
    <p>Farm Produce: 재배된 농산물은 식품 아이템으로 가공 된다.</p>
    <p>Food Items: 이 식품 아이템은 다시 커피숍 체인으로 돌아가며 순환이 완료 된다.</p>
    <p>이 과정은 커피 찌꺼기를 단순히 폐기하는 대신, 자원으로 재활용하여 환경 영향을 줄이는 순환 경제를 보여 준다.</p>`,
    imageSrc: '/L04/C06/A06/HE1-L04-C06-A06-P01.jpg',
    imageWidth: '346px',
    imageHeight: '200px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
