import HE00601 from '@maidt-cntn/pages/HE-006-01';
import { useRecoilState } from 'recoil';
import { L03_C09_A02 } from './store';

const P01 = () => {
  const imageSrc = '/L03/C09/A02/HE1-L03-C09-A02-P01.jpg';
  const [cardData, setCardData] = useRecoilState(L03_C09_A02);
  const udl = [
    '글의 구조가 보이는 과학 실험 설명 글 Title & Purpose : I’d like to introduce a cool experiment called “Magic Rainbow Milk.',
    'The purpose of this experiment is to see if dish soap can create a rainbow pattern on milk.',
    'Materials : You’ll need whole milk, food coloring, dish soap, and a flat dish.',
    'Procedure & Caution : Here’s how to do it. First, pour the milk into the dish. Be careful. Only if you use milk that contains fat will\n' +
      'the experiment work properly. Next, add some drops of food coloring into the milk. Finally, put a drop of dish soap in the center.',
    'Expected Results & Reasoning : Then, you will observe the colors spreading all over the milk. That’s because the dish soap can\n' +
      'break up the fat in the milk into tiny pieces, causing the colors to spread.\n' +
      'Last Note : It will be interesting for you to watch the rainbow in this experiment!',
  ];

  return (
    <HE00601
      headerInfo={cardData.common.headerInfo}
      questionInfo={cardData.common.questionInfo}
      imageSrc={imageSrc}
      imageWidth={'630px'}
      imageAlt=''
      udl={udl}
    />
  );
};

export default P01;
