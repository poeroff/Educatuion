import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Small Actions, Big Change (5)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'I posted my pictures on my social media.',
      translation: '나는 나의 사진들을 소셜 미디어에 올렸다.',
    },
    {
      originText: 'I got many “likes”.',
      translation: '나는 많은 ‘좋아요’를 받았다.',
    },
    {
      originText: 'Some of my friends even tried the challenge.',
      translation: '어떤 친구들은 그 챌린지를 해 보기도 했다.',
    },
    {
      originText: 'We shared useful tips and ideas.',
      translation: '우리는 유용한 조언과 생각을 공유했다.',
    },
    {
      originText: 'This challenge was good for the environment, but it was also great for our friendship.',
      translation: '이 챌린지는 환경에도 좋았지만, 우리의 우정에도 매우 좋았다.',
    },
    {
      originText: 'We helped the Earth together.',
      translation: '우리는 함께 지구를 도왔다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P02;
