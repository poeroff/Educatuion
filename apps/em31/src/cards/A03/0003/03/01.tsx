import EM00701, { IExplainInfo } from '@maidt-cntn/math/pages/EM-007-01';
import { IQuestionProps, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Typography>
        닭장에 가 보니 암탉들이 따끈따끈한 달걀을 낳아 놓았어. <br />
        달걀 10개를 봉투 한 개에 2개씩 담아서 나누어 주려고 해.
      </Typography>
    ),
  };
  const explainInfo: IExplainInfo = {
    explainImgSrc: '/A03/0003/03/MA31302_리터칭.png',
    explainImgAlt: '학생이 계란이 여러 개 놓여 있는 작은 집을 바라보고 있습니다.',
    explainInfo: questionInfo,
  };

  const questionText = '봉투는 몇 개 필요할까?';

  return <EM00701 explainInfo={explainInfo} questionText={questionText} />;
};

export default P01;
