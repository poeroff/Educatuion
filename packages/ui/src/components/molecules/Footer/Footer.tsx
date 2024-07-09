import { TFooterColorTypes, IPageAtom } from '@maidt-cntn/ui';
import Style from './Footer.style';

interface IFooterProps {
  colorType?: TFooterColorTypes;
  selectedPage?: number;
  pageTotalNums?: number;
  setPage?: (page: (prev: IPageAtom) => IPageAtom) => void;
}

export const Footer = ({ colorType = 'white', selectedPage = 0, pageTotalNums = 0, setPage }: IFooterProps) => {
  const handleMovePage = (num: number) => {
    if (selectedPage + num > pageTotalNums || selectedPage + num <= 0) return;
    setPage?.(prev => ({ ...prev, selectedPage: prev.selectedPage + num }));
  };

  const handleMoveFinalPage = () => {
    setPage?.(prev => {
      return { ...prev, selectedPage: pageTotalNums };
    });
  };
  return (
    <Style.FooterContainer color={colorType}>
      {pageTotalNums > 1 && (
        <>
          <Style.TextBtn isEnd={selectedPage === 1} onClick={() => handleMovePage(-1)} disabled={selectedPage === 1}>
            이전
          </Style.TextBtn>
          <Style.NumSpan color={colorType} title='현재 페이지'>
            {selectedPage}
          </Style.NumSpan>
          <span className='divider'>/</span>
          <Style.NumBtn isSelected={false} color={colorType} onClick={() => handleMoveFinalPage()} disabled={selectedPage === pageTotalNums}>
            {pageTotalNums}
          </Style.NumBtn>
          <Style.TextBtn isEnd={selectedPage === pageTotalNums} onClick={() => handleMovePage(1)} disabled={selectedPage === pageTotalNums}>
            다음
          </Style.TextBtn>
        </>
      )}
    </Style.FooterContainer>
  );
};

export default Footer;
