import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans?(5)',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'I hope that we can overcome these challenges through careful consideration of neuroethics. ',
      translation: '저는 신경 윤리에 대한 신중한 고찰을 통해 우리가 이러한 난제를 극복할 수 있기를 바랍니다. ',
    },
    {
      originText:
        'This field highlights the social aspects of neural technology and provides possible answers to what should be considered legal and ethical. ',
      translation: '신경 윤리 분야는 신경 기술의 사회적 측면을 강조하고 법적, 윤리적으로 고려해야 할 사항에 대해 가능한 대답을 제시합니다. ',
    },
    {
      originText:
        'I think it is important to establish a prior review process and thoroughly assess the ethical aspects before any kind of brain research is conducted. ',
      translation: '저는 어떤 종류의 뇌 연구를 수행하기 전에 사전 검토 프로세스를 확립하고 윤리적 측면을 철저히 평가하는 것이 중요하다고 생각합니다.',
    },
    {
      originText: 'This will ensure that science and technology progress in accordance with ethical principles. ',
      translation: '그래야 과학과 기술이 윤리적 원칙에 따라 발전할 수 있을 것입니다. ',
    },
    {
      originText: 'What do you think about this technology?',
      translation: '이 기술에 대해 여러분은 어떻게 생각하시나요?',
    },
    {
      originText: 'Please share your opinion in the comments section below.',
      translation: '아래 댓글 섹션에 여러분의 의견을 공유해 주세요.',
    },
    {
      originText: 'Eric Davis Wow, AI-powered neural implants sound incredible!',
      translation: 'Eric Davis 와, AI 기반 신경 임플란트는 정말 놀랍네요!',
    },
    {
      originText: 'I can’t believe that AI can help the disabled walk again and use artificial arms that move according to their thoughts',
      translation: 'AI가 장애인이 다시 걸을 수 있게 돕고 생각에 따라 움직이는 의수를 사용하도록 도와줄 수 있다는 사실이 믿기지 않아요!',
    },
    {
      originText: 'Yumi Lee Well, the technology sounds amazing, but I’m really worried about the privacy issues it might cause.',
      translation: 'Yumi Lee 이 기술은 대단해 보이지만, 저는 이로 인해 발생할 수 있는 개인 정보 보호 문제가 정말 걱정됩니다. ',
    },
    {
      originText: 'I think it is necessary to strictly enforce privacy laws to protect the personal information of individuals.',
      translation: '개인 정보 보호를 위해 개인 정보 보호법을 엄격하게 시행할 필요가 있다고 생각합니다.',
    },
    {
      originText: 'Andy Taylor Thank you all for sharing your thoughts. ',
      translation: 'Andy Taylor 의견을 공유해 주신 모든 분께 감사드립니다.',
    },
    {
      originText: 'I’ll talk more about how to address the concerns in my next post.',
      translation: '제 다음 포스트에서 이러한 문제를 해결하는 방법에 관해 설명해 보겠습니다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P04;
