import HE00601 from '@maidt-cntn/pages/HE-006-01';
import { IQuestionProps } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo = {
    headerText: 'Read and Analyze',
  };
  const questionInfo: IQuestionProps = {
    text: 'Read the persuasive paragraph and answer the questions.',
    size: 'medium',
  };
  const imageSrc = '/L04/C09/A02/HE2-L04-C09-A02-P01.jpg';

  const udl = [
    '글의 구조가 보이는 설득하는 글 Online Manners: Respecting Others in the Digital Age',
    'Opinion : In the 21st century, the development of digital literacy is essential for global citizens. I consider it particularly important to have good manners when communicating online.',
    'Supporting Details : To help you achieve this, let me make a few suggestions. First, you should be careful with your language online. Before you leave comments on others’ posts, consider whether or not your words might hurt their feelings. Protecting others’ privacy is also crucial. Avoid posting other people’s personal information on social media without their permission.',
    'Conclusion : To be responsible digital citizens, always remember the fact that we should respect others in any kind of online activity.',
  ];

  return <HE00601 headerInfo={headerInfo} questionInfo={questionInfo} imageSrc={imageSrc} imageAlt='' udl={udl} imageHeight='340px' />;
};

export default P01;
