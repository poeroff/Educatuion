import { IQuestionProps, SvgIcon, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import EM00102 from '@maidt-cntn/math/pages/EM-001-02';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: '단원 도입 영상',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        만화를 보며 이 단원에서 배우는 내용을 살펴보세요.
      </>
    ),
  };

  return (
    <EM00102
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      videoSrc='/A01/0001/02/EM311_1_도입만화.mp4'
      srtFile='/A01/0001/02/EM311_1_도입만화.srt'
    />
  );
};

export default P01;
