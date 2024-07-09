import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import EEL01C03A04P01, { IImageProps, HighlightProps } from '@/Pages/EEL01C03A04P01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Sounds and Letters 3',
  };

  const questionInfo: IQuestionProps = {
    text: 'a의 소리를 생각하며 잘 들어 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L01/C03/A04/EE4-L01-C03-A04-P01.JPG',
    title: '왼쪽에는 고양이가 사과모양 모자를 유심히 들여다보고 있는 모습, 오른쪽에는 고양이가 사과 모양 모자를 쓰고 있는 모습',
    alt: '왼쪽에는 고양이가 사과모양 모자를 유심히 들여다보고 있는 모습, 오른쪽에는 고양이가 사과 모양 모자를 쓰고 있는 모습',
    height: '277px',
  };

  const data: HighlightProps[] = [
    {
      text: 'It’s a cat. It’s a hat.',
      highlightChar: 'a',
      color: 'red',
    },
    {
      text: 'An apple hat cat!',
      highlightChar: 'a',
      color: 'red',
    },
  ];

  const audioList = [{ audioSrc: '/L01/C03/A04/EE4-L01-C03-A04-P01-01.mp3' }, { audioSrc: '/L01/C03/A04/EE4-L01-C03-A04-P01-02.mp3' }];

  return <EEL01C03A04P01 headerInfo={headerInfo} questionInfo={questionInfo} imageInfo={imageInfo} audioList={audioList} data={data} />;
};

export default P01;
