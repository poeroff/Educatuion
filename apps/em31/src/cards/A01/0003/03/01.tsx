import { Typography } from '@maidt-cntn/ui';
import EM00701, { IExplainInfo } from '@maidt-cntn/math/pages/EM-007-01';

const P01 = () => {
  const explainInfo: IExplainInfo = {
    explainImgSrc: '/A01/0003/03/MA31102_리터칭.png',
    explainImgAlt: '여성이 반려견을 훈련시키고 있고 옆에 서있는 남성이 관심을 가지며 지켜보고 있습니다.',
    explainInfo: {
      type: 'text',
      text: (
        <Typography>
          멍멍! 반려견 토토를 위해 반려동물 훈련소에 왔어. 훈련 받아 제법 늠름해 보이지 뭐야! 어제 훈련 받은 강아지가 127마리, 오늘 훈련 받은 강아지가
          215마리래!
        </Typography>
      ),
    },
  };

  const questionText = '이틀 동안 모두 몇 마리가 훈련\n받았을까?';
  return <EM00701 explainInfo={explainInfo} questionText={questionText} backgroundStyle={{ bottom: '-25px' }} />;
};

export default P01;
