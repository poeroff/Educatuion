//C-EM31-03-0005-2001
import headerIcon from '@/assets/icon/m_default_01.svg';
import { IQuestionProps, SvgIcon, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        배운 내용을 다시 한 번 살펴볼까요?
      </>
    ),
  };
  return (
    <DialogContainer headerInfo={headerInfo} questionInfo={questionInfo}>
      <VideoPlayer videoSrc='/C03/0005/20/EM313_5_기초(영상).mp4' srtFile={'/C03/0005/20/EM313_5_기초(영상).srt'} />
    </DialogContainer>
  );
};

export default P05;
