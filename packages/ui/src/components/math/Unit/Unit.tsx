import React from 'react';
import Style, { IStyleUnit, TUnit } from './Unit.style';

interface IInput extends IStyleUnit {
  unit?: TUnit;
}

export const Unit: React.FC<IInput> = ({ height, unit }) => {
  return (
    <>
      {unit === 'degree' && (
        <Style.Degree aria-label={'도'} height={height}>
          °
        </Style.Degree>
      )}
    </>
  );
};

export default Unit;
