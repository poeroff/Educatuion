import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C04/A02/HE1-L04-C04-A02.mp3',
    captionSrc: '/L04/C04/A02/HE1-L04-C04-A02.srt',
  };

  const GLabel = {
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  };

  const MLabel = {
    label: 'M',
    labelColor: 'var(--color-blue-100)',
  };

  const data: IListenAndAnswer[] = [
    {
      ...GLabel,
      originText: `Good evening.`,
      translation: `안녕하세요.`,
    },
    {
      originText: `I’m Gabby Logan, and this is SHA News.`,
      translation: `저는 Gabby Logan이고 SHA 뉴스입니다.`,
      inLine: true,
    },
    {
      originText: `You’ve probably heard a lot of news about climate change, and you’re worried about its impact on the future of our planet.`,
      translation: `기후 변화에 대한 뉴스를 많이 들으셨을 것이고, 기후 변화가 지구의 미래에 미칠 영향에 대해 걱정하고 계실 것입니다.`,
      inLine: true,
    },
    {
      originText: `But today, I have some good news to share!`,
      translation: `하지만 오늘은 좋은 소식이 있습니다!`,
      inLine: true,
    },
    {
      originText: `According to the United Nations, the ozone layer is recovering.`,
      translation: `유엔에 따르면 오존층이 회복되고 있다고 합니다.`,
      inLine: true,
    },
    {
      originText: `Our reporter Henry Miller explains. Henry?`,
      translation: `저희 Henry Miller 리포터가 설명해드립니다. Henry?`,
      inLine: true,
    },
    {
      ...MLabel,
      originText: `Thanks, Gabby.`,
      translation: `고맙습니다, Gabby.`,
    },
    {
      originText: `The Montreal Agreement was signed in 1987 to stop the production and use of substances harmful to the ozone layer.`,
      translation: `몬트리올 협약은 오존층에 유해한 물질의 생산과 사용을 중단하기 위해 1987년에 체결되었습니다.`,
      inLine: true,
    },
    {
      originText: `Since then, the size of the hole in the ozone layer has been steadily decreasing.`,
      translation: `그 이후로 오존층 구멍의 크기는 꾸준히 감소하고 있습니다.`,
      inLine: true,
    },
    {
      originText: `If we continue these efforts, the ozone layer is expected to fully recover in most parts of the world by 2040.`,
      translation: `이러한 노력을 계속한다면 2040년에는 전 세계 대부분의 지역에서 오존층이 완전히 회복될 것으로 예상됩니다.`,
      inLine: true,
    },
    {
      originText: `Although we still have a long way to go, we’re on track to achieve this important goal.`,
      translation: `아직 갈 길이 멀지만, 이 중요한 목표를 달성하기 위한 노력은 순조롭게 진행되고 있습니다.`,
      inLine: true,
    },
    {
      originText: `Experts suggest that individuals can also support these protective efforts simply by using eco-friendly products, reducing energy consumption, and taking public transportation.`,
      translation: `전문가들은 개인도 친환경 제품을 사용하고, 에너지 소비를 줄이고, 대중교통을 이용하는 것만으로도 이러한 보호 노력을 지원할 수 있다고 말합니다.`,
      inLine: true,
    },
    {
      originText: `Why don’t you get involved and help protect our planet?`,
      translation: `여러분도 동참하여 지구를 보호하는 데 힘을 보태보는 건 어떨까요?`,
      inLine: true,
    },
    {
      originText: `For SHA News, I’m Henry Miller.`,
      translation: `SHA 뉴스의 Henry Miller입니다.`,
      inLine: true,
    },
  ];

  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} data={data} />;
};

export default P03;
