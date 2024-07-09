import { useMemo } from 'react';
import {
  TChapterInfoTypes,
  Footer,
  TFooterinfoTypes,
  ChapterHeader,
  Alert,
  TAlertInfoTypes,
  TClass,
  TSubject,
  SvgIcon,
  ESvgType,
  TLayoutBackColorTypes,
} from '@maidt-cntn/ui';
import { IPageAtom } from '@maidt-cntn/ui';
import Style from './MLayout.style';
import DescriptiveSVG from '../../../assets/icons/MLayout/descriptive.svg';
import InformationProcessingSVG from '../../../assets/icons/MLayout/information_processing.svg';
import InferenceSVG from '../../../assets/icons/MLayout/inference.svg';
import ProblemSolvingSVG from '../../../assets/icons/MLayout/problem_solving.svg';
import { Tools } from '../Tools/Tools';

export type RightIconsType = Partial<Record<'problemSolving' | 'inference' | 'descriptive' | 'information', boolean>>;
type HashColor = `#${string}`;
type TMMBackColorType = 'orange' | 'green' | 'yellow' | 'blue' | 'beige' | 'purple';
export type TMMLayoutBackColorTypes = TLayoutBackColorTypes | TMMBackColorType | HashColor;

type MLayoutProps = {
  classInfo?: TClass;
  subjectInfo?: TSubject;
  backColor?: TMMLayoutBackColorTypes;
  chapterInfo: TChapterInfoTypes;
  footerInfo?: TFooterinfoTypes;
  alert?: TAlertInfoTypes;
  seconds?: number;
  isVisible?: boolean;
  selectedPage: number;
  pageTotalNums: number;
  children?: React.ReactNode;
  setPage: (page: (prev: IPageAtom) => IPageAtom) => void;
  footerBackColor?: string;
  rightIcons?: RightIconsType;
};

export const MLayout = ({
  classInfo = 'elementary',
  subjectInfo = 'math',
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
  footerBackColor = 'white',
  rightIcons,
}: MLayoutProps) => {
  const BackColorSection = useMemo(() => {
    if (classInfo === 'middle' && subjectInfo === 'math') {
      return Style.MMBackColorSection;
    }
    return Style.MBackColorSection;
  }, [classInfo, subjectInfo]);

  return (
    <Style.LayoutContainer backColor={footerBackColor}>
      <BackColorSection color={backColor} />
      <Style.ContentsContainer>
        <Style.HeaderContainer>
          <ChapterHeader
            chapterNum={chapterInfo.chapterNum}
            mainChapter={chapterInfo.mainChapter}
            subChapter={chapterInfo.subChapter}
            minorChapter={chapterInfo.minorChapter}
            seconds={seconds}
            isVisible={isVisible}
          />
          <Style.HeaderRightIcons>
            {rightIcons?.problemSolving && <SvgIcon src={ProblemSolvingSVG} type={ESvgType.IMG} alt='문제해결' height='20px' />}
            {rightIcons?.information && <SvgIcon src={InformationProcessingSVG} type={ESvgType.IMG} alt='정보처리' height='20px' />}
            {rightIcons?.inference && <SvgIcon src={InferenceSVG} type={ESvgType.IMG} alt='추론' height='20px' />}
            {rightIcons?.descriptive && <SvgIcon src={DescriptiveSVG} type={ESvgType.IMG} alt='서술형' height='20px' />}
          </Style.HeaderRightIcons>
        </Style.HeaderContainer>
        {children}
        {footerInfo && <Footer colorType={footerInfo.footerColorType} selectedPage={selectedPage} pageTotalNums={pageTotalNums} setPage={setPage} />}
        <Alert {...alert} />
      </Style.ContentsContainer>
      <Tools />
    </Style.LayoutContainer>
  );
};

export default MLayout;
