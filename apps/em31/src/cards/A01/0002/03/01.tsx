import EM00701, { IExplainInfo } from '@maidt-cntn/math/pages/EM-007-01';
import { IQuestionProps, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Typography>
        사람을 대신해서 드론이 물건을 배달해 주는 것을 본 적 있어? 오늘 하루 동안에 드론으로 물건을 사랑 마을에 351개, 행복 마을에 246개 배달했대!
      </Typography>
    ),
  };
  const explainInfo: IExplainInfo = {
    explainImgSrc: '/A01/0002/03/MA31101_리터칭.png',
    explainImgAlt: '마을 풍경에 드론이 날아다니고 있습니다.',
    explainInfo: questionInfo,
  };

  const questionText = '드론으로 모두 몇 개의 물건을 \n배달했을까?';

  return <EM00701 explainInfo={explainInfo} questionText={questionText} />;
};

export default P01;
