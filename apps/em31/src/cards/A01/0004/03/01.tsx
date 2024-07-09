import { Typography } from '@maidt-cntn/ui';
import EM00701, { IExplainInfo } from '@maidt-cntn/math/pages/EM-007-01';

const P01 = () => {
  const explainInfo: IExplainInfo = {
    explainImgSrc: '/A01/0004/03/MA31103_리터칭.png',
    explainImgAlt: '파란색 판 위에 블록을 쌓아 집을 만들고 있습니다.',
    explainInfo: {
      type: 'text',
      text: <Typography>블록을 쌓아 집을 만들려고 해. 지금까지 블록 256개를 쌓았는데 집을 완성하려면 블록 378개를 더 쌓아야 돼.</Typography>,
    },
  };

  const questionText = '집을 만들려면 블록이 모두 몇 개 필요할까?';
  return <EM00701 explainInfo={explainInfo} questionText={questionText} />;
};

export default P01;
