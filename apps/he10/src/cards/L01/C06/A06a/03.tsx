import React, { useState } from 'react';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong  (4)',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Now let’s turn our attention to ourselves, Homo sapiens.',
      translation: '이제 우리 자신, 호모 사피엔스에게로 시선을 돌려보겠습니다.',
    },
    {
      originText: 'How have we managed to survive for so long?',
      translation: '우리는 어떻게 그토록 오랫동안 생존할 수 있었을까요?',
    },
    {
      originText:
        'Neanderthals existed together with Homo sapiens until about 40,000 years ago, and they were known to be intelligent and physically superior to Homo sapiens.',
      translation:
        '네안데르탈인은 약 4만 년 전까지 호모 사피엔스와 함께 존재했으며, 호모 사피엔스보다 지능이 높고 신체적으로 우월한 것으로 알려져 있습니다.',
    },
    {
      originText: 'Neanderthals were able to make tools and fire and had strong bodies with well-developed muscles and broad shoulders.',
      translation: '네안데르탈인은 도구를 만들고 불을 피울 수 있었으며, 잘 발달된 근육과 넓은 어깨를 가진 튼튼한 신체를 가졌습니다.',
    },
    {
      originText: 'Despite these attributes, however, it was Homo sapiens who ultimately survived and thrived.',
      translation: '그러나 이러한 특성에도 불구하고 궁극적으로 생존하고 번성했던 것은 호모 사피엔스였습니다.',
    },
    {
      originText:
        'One possible explanation is that our ancestors lived in larger communities that promoted cooperation and the free exchange of knowledge, while Neanderthals tended to live in smaller groups.',
      translation:
        '한 가지 가능한 설명은 우리 조상은 협력과 자유로운 지식 교환을 장려하는 대규모 공동체에서 살았던 반면, 네안데르탈인은 소규모 집단에서 사는 경향이 있었다는 것입니다.',
    },
    {
      originText:
        'These social differences may have given Homo sapiens a competitive advantage over Neanderthals, allowing them to adapt to an ever-changing environment.',
      translation:
        '이러한 사회적 차이가 호모 사피엔스가 네안데르탈인보다 경쟁 우위를 점하게 하여 끊임없이 변화하는 환경에 적응할 수 있게 했을 수 있습니다.',
    },
  ];

  return <HE00501 data={data} headerInfo={headerInfo} questionInfo={questionInfo} />;
};

export default P03;
