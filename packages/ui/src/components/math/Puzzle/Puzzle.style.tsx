/* eslint-disable @typescript-eslint/no-namespace */
import styled from '@emotion/styled';

namespace StyleDragAndDrop {
  export const PuzzleWrapper = styled.div`
    width: max-content;
  `;

  export const DragAndDropWrapper = styled.div`
    display: flex;
  `;

  export const DragBox = styled.div<{
    colNum: number;
    imgUrl: string | undefined;
    posL: number | undefined;
    posT: number | undefined;
    placed: boolean;
  }>`
    width: ${({ colNum = 3 }) => 348 / colNum + 'px'};
    height: ${({ colNum = 3 }) => 348 / colNum + 'px'};
    z-index: 1;
    box-shadow: 0px 2.846625804901123px 11.386503219604492px 0px rgba(71, 73, 77, 0.24);
    position: absolute;
    background: url('${props => props.imgUrl}') center no-repeat;
    background-size: cover;
    left: ${props => props.posL + 'px'};
    top: ${props => props.posT + 'px'};
    cursor: ${props => (!props.placed ? 'grab' : 'default')};
  `;

  export const DragBoxWrapper = styled.div<{ colNum?: number }>`
    position: relative;
    width: ${({ colNum = 3 }) => colNum * 116 + 'px'};
  `;

  export const CenterArrowWrapper = styled.section`
    align-self: center;
    margin-left: 348px;
  `;

  export const DropBoxInput = styled.input<{ colNum: number }>`
    width: ${({ colNum = 3 }) => 220 / colNum + 'px'};
    height: ${({ colNum = 3 }) => 70 / colNum + 'px'};
    font-size: ${({ colNum = 3 }) => 66 / colNum + 'px'};
    outline: 3px solid var(--color-blue-300);
    text-align: end;
    border-radius: 5px;
    padding: 1px;
  `;

  export const DropBoxText = styled.p<{ colNum: number; lineYn: boolean }>`
    margin: 0;
    font-weight: var(--font-weight-medium);
    text-align: end;
    font-size: ${({ colNum = 3 }) => 66 / colNum + 'px'};
    line-height: ${({ colNum = 3 }) => 96 / colNum + 'px'};
    border-bottom: ${props => (props.lineYn ? 'solid 2px' : 'none')};
  `;

  export const DropBoxSection = styled.section<{ colNum: number }>`
    height: ${({ colNum = 3 }) => 192 / colNum + 'px'};
    display: flex;
    align-items: end;
    flex-direction: column;
    justify-content: center;
  `;

  export const DropBox = styled.div<{ colNum: number }>`
    width: ${({ colNum = 3 }) => 348 / colNum + 'px'};
    height: ${({ colNum = 3 }) => 348 / colNum + 'px'};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  `;

  export const DropBoxWrapper = styled.div<{ colNum: number; backgroundImg?: string }>`
    display: grid;
    grid-template-columns: repeat(${({ colNum = 3 }) => colNum + ',' + 348 / colNum + 'px'});
    user-select: none;
    margin-right: 80px;
    background: top right / cover no-repeat;
    background-image: url('${props => props.backgroundImg}');
    background-size: 346px 466px;
  `;
}

export default StyleDragAndDrop;
