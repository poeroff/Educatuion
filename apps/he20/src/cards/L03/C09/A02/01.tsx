import HE00601 from '@maidt-cntn/pages/HE-006-01';
import { IQuestionProps } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo = {
    headerText: 'Read and Analyze',
  };
  const questionInfo: IQuestionProps = {
    text: 'Read the short biography and answer the questions.',
    size: 'medium',
  };
  const imageSrc = '/L03/C09/A02/HE2-L03-C09-A02-P01.jpg';

  const udl = [
    '글의 구조가 보이는 전기문 Name & Job : Arturo Toscanini (1867–1957) was an Italian conductor who succeeded in the face of some of life’s challenges.',
    'Challenge & Solution : Although he had difficulty reading musical scores on the stand due to his poor vision, he was able to memorize entire pieces of music.',
    'Achievements : His passion for music allowed him to interpret original scores faithfully, as shown in his performances of Beethoven’s and Verdi’s works. He also established a modern conducting style.',
    'Reputation : He made some very remarkable achievements, which is why he is still regarded as one of the most influential musicians of the 20th century.',
  ];

  return <HE00601 headerInfo={headerInfo} questionInfo={questionInfo} imageSrc={imageSrc} imageAlt='' udl={udl} imageHeight='390px' />;
};

export default P01;
