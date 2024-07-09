import HE00601 from '@maidt-cntn/pages/HE-006-01';
import { IQuestionProps } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo = {
    headerText: 'Read and Analyze',
  };
  const questionInfo: IQuestionProps = {
    text: 'Read Jay’s request e-mail and answer the questions.',
    size: 'medium',
  };
  const imageSrc = '/L02/C09/A02/HE2-L02-C09-A02-P01.jpg';

  const udl = [
    '글의 구조가 보이는 이메일',
    'To : cscenter@everydaystylish.com',
    'Subject : Request for a Full Refund',
    'Receiver : Dear Customer Service,',
    'Purpose of the E-mail : I’m writing to request a full refund for the shirt I purchased from your website.',
    'Description of the Issue : Unfortunately, the color of the shirt is very different from the photo on the website. I think that I should’ve seen it in person before buying.',
    'Request Details : I would therefore like to request that you provide a full refund for the product to my Safe Bank account, 012-34-56789.',
    'Contact Information : If you have any questions about my request, please feel free to contact me at jaypark@example.com.',
    'Closing : I look forward to hearing back from you soon. Best regards, Jay Park',
  ];

  return <HE00601 headerInfo={headerInfo} questionInfo={questionInfo} imageSrc={imageSrc} imageAlt='' udl={udl} imageWidth='540px' />;
};

export default P01;
