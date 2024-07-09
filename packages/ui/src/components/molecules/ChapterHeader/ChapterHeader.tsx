import Style from './ChapterHeader.style';
import { SvgIcon, SmallTimer, TChapterInfoTypes } from '@maidt-cntn/ui';
import ShallowIcon from '@maidt-cntn/assets/icons/shallow_right.svg';

export const ChapterHeader = ({ chapterNum, mainChapter, subChapter, minorChapter, seconds = 600, isVisible = false }: TChapterInfoTypes) => {
  return (
    <Style.ChapterHeaderContainer>
      <Style.TitleContainer>
        {chapterNum && <Style.MainText>{chapterNum}</Style.MainText>}
        {mainChapter && <Style.MainText subChapter={subChapter}>{mainChapter}</Style.MainText>}
        {subChapter && (
          <Style.TextContainer>
            {/* <ShallowIcon /> */}
            <SvgIcon src={ShallowIcon} width='20px' height='20px' />
            <Style.Text minorChapter={minorChapter}>{subChapter}</Style.Text>
          </Style.TextContainer>
        )}
        {minorChapter && (
          <Style.TextContainer>
            {/* <ShallowIcon /> */}
            <SvgIcon src={ShallowIcon} width='20px' height='20px' />
            <Style.Text minorChapter={minorChapter}>{minorChapter}</Style.Text>
          </Style.TextContainer>
        )}
      </Style.TitleContainer>
      {isVisible && <SmallTimer seconds={seconds} />}
    </Style.ChapterHeaderContainer>
  );
};

export default ChapterHeader;
