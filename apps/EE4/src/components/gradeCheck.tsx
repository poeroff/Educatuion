import { useMemo } from 'react';
import { css, styled } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { currentPageGradeData } from '@/stores';
import { Mark } from '@maidt-cntn/ui';

const GradeCheck = ({ mainKey, width = 52, isGradeAll = false, left }: { mainKey?: number; width?: number; isGradeAll?: boolean; left?: number }) => {
  const gradeData = useRecoilValue(currentPageGradeData);

  const grade = useMemo(() => {
    if (gradeData.length < 1) return undefined;

    if (isGradeAll) {
      return gradeData.every(data => Boolean(data.isCorrect));
    }

    const correctData = gradeData.find(data => data.mainKey === mainKey);
    return correctData?.isCorrect;
  }, [gradeData, mainKey, isGradeAll]);

  if (grade === undefined) return null;

  return (
    <Figure $width={width} $left={left}>
      {<Mark type={grade ? 'correct' : 'star'} />}
    </Figure>
  );
};

export default GradeCheck;

const Figure = styled.figure<{ $width: number; $left?: number }>`
  position: absolute;
  top: calc(50% - 70px);
  ${({ $left }) => css`
    left: ${`${$left}%`};
  `}
  ${({ $width }) => css`
    width: ${`${$width}px`};
    height: ${`${$width}px`};
  `}
`;
