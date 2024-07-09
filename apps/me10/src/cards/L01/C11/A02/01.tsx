import HE00601 from '@maidt-cntn/pages/HE-006-01';
import { L01C11A02HeaderInfo, L01C11A02QuestionInfo, L01C11A02ImageInfo } from './store';

const P01 = () => {
  return (
    <HE00601
      headerInfo={L01C11A02HeaderInfo}
      questionInfo={L01C11A02QuestionInfo.p01}
      imageSrc={L01C11A02ImageInfo.p01.src}
      imageAlt={L01C11A02ImageInfo.p01.alt}
    />
  );
};

export default P01;
