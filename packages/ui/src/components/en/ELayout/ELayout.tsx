import { TChapterInfoTypes, Footer, TFooterinfoTypes, TLayoutBackColorTypes, ChapterHeader, Alert, TAlertInfoTypes, TClass } from '@maidt-cntn/ui';
import { IPageAtom } from '@maidt-cntn/ui';
import Style from './ELayout.style';
import { useMemo } from 'react';

type LayoutProps = {
  classInfo?: TClass;
  backColor?: TLayoutBackColorTypes; // background color
  chapterInfo: TChapterInfoTypes;
  footerInfo?: TFooterinfoTypes;
  alert?: TAlertInfoTypes;
  seconds?: number;
  isVisible?: boolean;
  selectedPage: number;
  pageTotalNums: number;
  children?: React.ReactNode;
  setPage: (page: (prev: IPageAtom) => IPageAtom) => void;
};

export const Layout = ({
  classInfo = 'elementary',
  backColor = 'blue',
  chapterInfo,
  footerInfo,
  seconds = 600,
  isVisible = false,
  selectedPage = 0,
  pageTotalNums = 0,
  alert,
  setPage,
  children,
}: LayoutProps) => {
  const BackColorSection = useMemo(() => {
    switch (classInfo) {
      default:
        return Style.EEBackColorSection;
    }
  }, [classInfo]);
  return (
    <Style.LayoutContainer>
      <Style.EEBackColorSection color={backColor} />
      <Style.ContentsContainer>
        <ChapterHeader
          chapterNum={chapterInfo.chapterNum}
          mainChapter={chapterInfo.mainChapter}
          subChapter={chapterInfo.subChapter}
          minorChapter={chapterInfo.minorChapter}
          seconds={seconds}
          isVisible={isVisible}
        />
        {children}
        {footerInfo && <Footer colorType={footerInfo.footerColorType} selectedPage={selectedPage} pageTotalNums={pageTotalNums} setPage={setPage} />}
      </Style.ContentsContainer>
      <Alert {...alert} />
    </Style.LayoutContainer>
  );
};

export default Layout;
