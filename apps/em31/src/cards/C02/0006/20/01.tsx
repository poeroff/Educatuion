import { IQuestionProps, SvgIcon, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
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
      <VideoPlayer videoSrc={'/C02/0006/20/EM312_6_기초(영상).mp4'} srtFile={'/C02/0006/20/EM312_6_기초(영상).srt'} />
    </DialogContainer>
  );
};

export default P01;
