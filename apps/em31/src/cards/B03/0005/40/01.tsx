//C-EM31-03-0005-2001
import headerIcon from '@/assets/icon/m_default_01.svg';
import { IQuestionProps, SvgIcon, TMainHeaderInfoTypes, VideoPlayer } from '@maidt-cntn/ui';
import { Container, DialogContainer } from '@maidt-cntn/ui/math';

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
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound>
      <VideoPlayer videoSrc='/C03/0005/20/EM313_5_기초(영상).mp4' srtFile={'/C03/0005/20/EM313_5_기초(영상).srt'} />
    </Container>
  );
};

export default P01;
