import styled from '@emotion/styled';

namespace StyleChapterHeader {
  export const ChapterHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% + 16px);
    min-height: 38px;
  `;

  export const TitleContainer = styled.div`
    display: flex;
  `;

  export const TextContainer = styled.div`
    display: inline-flex;
    margin-left: 8px;
  `;

  export const Text = styled.span<{ subChapter?: string; minorChapter?: string }>`
    margin-left: 4px;
    line-height: 20px;
    font-size: var(--font-size-14);
    font-weight: var(--font-weight-bold);
    color: var(--color-grey-700);
    ${({ subChapter, minorChapter }) =>
      subChapter
        ? `
          max-width: 300px;
          margin-left: 8px;
    `
        : minorChapter
        ? `max-width: 300px;`
        : `max-width: 600px;`}
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;

  export const MainText = styled(Text)`
    color: var(--color-grey-900);
    margin-left: 0px;
  `;
}
export default StyleChapterHeader;
