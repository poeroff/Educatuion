import HE00601 from '@maidt-cntn/pages/HE-006-01';
import { L01C11A02HeaderInfo, L01C11A02ImageInfo, L01C11A02QuestionInfo } from './store';

const P02 = () => {
  return (
    <HE00601
      headerInfo={L01C11A02HeaderInfo}
      questionInfo={L01C11A02QuestionInfo.p02}
      imageSrc={L01C11A02ImageInfo.p02.src}
      imageAlt={L01C11A02ImageInfo.p02.alt}
    />
  );
};

export default P02;
