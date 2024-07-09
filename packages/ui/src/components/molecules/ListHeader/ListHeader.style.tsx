import styled from '@emotion/styled';

export interface IListHeaderStyle {}

namespace StyleListHeader {
  export const ListHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 4px 0;
    font-size: 18px;
    font-weight: var(--font-weight-medium);
    line-height: 48px;
  `;
}

export default StyleListHeader;
