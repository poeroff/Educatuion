import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Reading',
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Today was my little brother’s birthday.',
      translation: '오늘은 내 남동생의 생일이었다.',
    },
    {
      originText: 'My family went on a picnic.',
      translation: '우리 가족은 소풍을 갔다.',
    },
    {
      originText: 'We bought a cake, a birthday hat, and nice presents for him.',
      translation: '우리는 그를 위한 케이크 , 생일 모자와 멋진 선물을 샀다.',
    },
    {
      originText: 'The weather was good and we took nice pictures.',
      translation: '날씨가 좋아서 우리는 멋진 사진을 찍었다.',
    },
    {
      originText: 'We all were happy.',
      translation: '우리 모두 행복했다.',
    },
    {
      originText: 'We had a good time.',
      translation: '우리는 좋은 시간을 보냈다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
