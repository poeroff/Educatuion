import { useMemo } from 'react';
import { css, styled } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { currentPageGradeData } from '@/stores';
import { Mark } from '@maidt-cntn/ui';

const GradeCheck = ({ mainKey, width = 52, isGradeAll = false }: { mainKey?: number; width?: number; isGradeAll?: boolean }) => {
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

  return <Figure $width={width}>{<Mark type={grade ? 'correct' : 'incorrect'} />}</Figure>;
};

export default GradeCheck;

const Figure = styled.figure<{ $width: number }>`
  position: absolute;
  top: calc(50% - 70px);
  left: 50%;
  ${({ $width }) => css`
    width: ${`${$width}px`};
    height: ${`${$width}px`};
  `}
`;
