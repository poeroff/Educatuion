import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography } from '@maidt-cntn/ui';

const headerInfo = {
  headerText: 'Viewing Critically : Deep Learning',
};
const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L04/C06/A08/HE1-L04-C06-A08-P02.mp3',
  captionSrc: '/L04/C06/A08/HE1-L04-C06-A08-P02.srt',
};

const imageSrc = '/L04/C06/A08/HE1-L04-C06-A08-P02.jpg';
const imageAlt = (
  <>
    <p>이 이미지는 버섯 재배 주기를 설명하는 다이어그램이다. 아래는 각 단계의 설명이다:</p>
    <p>커피 찌꺼기 (80%)와 버섯 종균 (20%)를 준비한다.</p>
    <p>커피 찌꺼기와 버섯 종균을 빈 우유 상자에 넣는다.</p>
    <p>상자를 어두운 곳에 두고 버섯이 자라도록 한다.</p>
    <p>2-4주 후 우유 상자에 물을 준다.</p>
    <p>버섯이 우유상자에 가득히 자라있다.</p>
    <p>이미지 속 한 여성이 버섯 요리를 먹고 있다.</p>
    <p>이러한 과정이 반복되며 지속적으로 버섯을 재배할 수 있다.</p>
  </>
);

const contentTitle = ['Become a Mushroom Farmer at Home!'];
const contentText = (
  <Typography style={{ whiteSpace: 'pre-wrap' }}>
    {'   '}
    Did you know that you can grow tasty mushrooms right in your home using spent coffee grounds? Coffee grounds contain the perfect nutrients for
    growing mushrooms. Here is a step-by-step guide to help you get started. First, mix 80 percent coffee grounds with 20 percent mushroom spawn.
    Then, thoroughly wash a milk container and make four small holes in the sides. Fill the container about two-thirds full of the mixture and close
    it tightly. Next, find a warm and dark place with a temperature between 18 and 25˚C, and place the container there for two to four weeks until the
    mixture turns completely white. When this happens, move the container to a bright area with indirect sunlight and cut the top off. To keep the
    mixture from drying out, spray it with water twice a day. Within a week, you will notice tiny mushrooms emerging. When the mushrooms grow tall,
    they are ready to be picked. After that, you can enjoy your mushrooms with your favorite dish!
  </Typography>
);

const info: IHE01602Info = {
  imageSrc: imageSrc,
  altText: '',
  hiddenAltText: imageAlt,
  title: contentTitle,
  text: contentText,
};

const P02 = () => {
  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P02;
