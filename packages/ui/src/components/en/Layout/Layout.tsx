import {
  TChapterInfoTypes,
  Footer,
  TFooterinfoTypes,
  TLayoutBackColorTypes,
  ChapterHeader,
  Alert,
  TAlertInfoTypes,
  TClass,
  LoadingIndicator,
  TLoadingIndicatorInfoTypes,
} from '@maidt-cntn/ui';
import { IPageAtom } from '@maidt-cntn/ui';
import Style from './Layout.style';
import { useMemo } from 'react';

type LayoutProps = {
  classInfo?: TClass;
  backColor?: TLayoutBackColorTypes; // background color
  chapterInfo: TChapterInfoTypes;
  footerInfo?: TFooterinfoTypes;
  alert?: TAlertInfoTypes;
  loadingIndicator?: TLoadingIndicatorInfoTypes;
  seconds?: number;
  isVisible?: boolean;
  selectedPage: number;
  pageTotalNums: number;
  children?: React.ReactNode;
  setPage: (page: (prev: IPageAtom) => IPageAtom) => void;
};

export const Layout = ({
  classInfo = 'hight',
  backColor = 'blue',
  chapterInfo,
  footerInfo,
  seconds = 600,
  isVisible = false,
  selectedPage = 0,
  pageTotalNums = 0,
  alert,
  loadingIndicator,
  setPage,
  children,
}: LayoutProps) => {
  const BackColorSection = useMemo(() => {
    switch (classInfo) {
      case 'hight':
      case 'middle':
        return Style.HEBackColorSection;
      default:
        return Style.EBackColorSection;
    }
  }, [classInfo]);

  return (
    <Style.LayoutContainer>
      <BackColorSection color={backColor} />
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
      <LoadingIndicator {...loadingIndicator} />
    </Style.LayoutContainer>
  );
};

export default Layout;
