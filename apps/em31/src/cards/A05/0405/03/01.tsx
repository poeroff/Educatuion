import EM00701, { IExplainInfo } from '@maidt-cntn/math/pages/EM-007-01';
import { IQuestionProps, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Typography>
        <p>연필심이 뭉툭해졌네.</p>
        <p>드르륵드르륵 연필깎이로 연필을 깎았어.</p>
        <p>연필심과 연필의 길이를 내 둘째 손가락과</p>
        <p>비교해 봐야지.</p>
      </Typography>
    ),
  };
  const explainInfo: IExplainInfo = {
    explainImgSrc: '/A05/0405/03/MA31504 1.png',
    explainImgAlt: '연필을 깎고 있는 연필깎이 그림이 있습니다.',
    explainInfo: questionInfo,
  };

  const backgroundStyle = {
    bottom: '0px',
    right: '0px',
  };

  const questionText = `연필심과 연필의 \n길이는 얼마쯤일까?`;

  return <EM00701 explainInfo={explainInfo} questionText={questionText} backgroundStyle={backgroundStyle} />;
};

export default P01;
