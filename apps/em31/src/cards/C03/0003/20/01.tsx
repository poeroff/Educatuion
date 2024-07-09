import { IQuestionProps, Question, SvgIcon, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import EM00102 from '@maidt-cntn/math/pages/EM-001-02';

interface ShowBulleType {
  isShowBulle?: boolean;
}

const P01 = ({ isShowBulle = false }: ShowBulleType) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <p>배운 내용을 다시 한 번 살펴볼까요?</p>
      </>
    ),
    size: 'medium',
  };

  return (
    <EM00102
      headerInfo={isShowBulle ? null : headerInfo}
      questionInfo={questionInfo}
      videoSrc='/C03/0003/20/EM313_3_기초(영상).mp4'
      srtFile='/C03/0003/20/EM313_3_기초(영상).srt'
    />
  );
};

export default P01;
