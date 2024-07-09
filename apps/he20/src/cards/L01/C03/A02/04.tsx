import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
  size: 'medium',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L01/C03/A02/HE2-L01-C03-A02-02.mp3',
  captionSrc: '/L01/C03/A02/HE2-L01-C03-A02-02.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: `Good morning, everyone!`,
    translation: `안녕하세요, 여러분!`,
    label: 'M',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `Today, I’m reporting from the Vet Bus, a mobile clinic designed to treat homeless animals.`,
    translation: `오늘은 유기 동물을 치료하기 위한 이동 진료소인 Vet Bus에서 소식을 전해드리려고 합니다.`,
    inLine: true,
  },
  {
    originText: `This special bus has everything needed to provide essential care for dogs and cats living on the streets.`,
    translation: `이 특별한 버스에는 길에서 생활하는 개와 고양이에게 필수적인 치료를 제공하는 데 필요한 모든 것이 갖춰져 있습니다.`,
    inLine: true,
  },
  {
    originText: `Every day, the bus travels to different locations, visiting areas in need of the service.`,
    translation: `매일 이 버스는 다른 지역으로 이동하며 진료가 필요한 지역을 방문합니다.`,
    inLine: true,
  },
  {
    originText: `It’s important to recognize the significance of this project.`,
    translation: `이 프로젝트의 중요성을 인식하는 것이 중요합니다.`,
    inLine: true,
  },
  {
    originText: `Countless homeless animals suffer from serious illnesses, without any access to proper medical care.`,
    translation: `수많은 유기 동물들이 적절한 의료 서비스를 받지 못한 채 심각한 질병으로 고통받고 있습니다.`,
    inLine: true,
  },
  {
    originText: `By supporting the Vet Bus project, you can help improve the well-being of homeless animals and also create healthier environments.`,
    translation: `Vet Bus 프로젝트를 후원함으로써 유기 동물의 복지를 개선하고 더 건강한 환경을 조성하는 데 도움을 줄 수 있습니다.`,
    inLine: true,
  },
  {
    originText: `This project welcomes your interest.`,
    translation: `이 프로젝트에 여러분의 많은 관심을 부탁드립니다.`,
    inLine: true,
  },
  {
    originText: `This is Andy Hiller, your reporter on the scene.`,
    translation: `저는 현장 리포터인 Andy Hiller입니다.`,
    inLine: true,
  },
];

const P04 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
