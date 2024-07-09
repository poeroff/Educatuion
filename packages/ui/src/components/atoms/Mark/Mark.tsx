import React, { useMemo } from 'react';
import Style, { IMarkStyle } from './Mark.style';

import icCorrect from '@maidt-cntn/assets/icons/correct.svg';
import icInCorrect from '@maidt-cntn/assets/icons/in_correct.svg';
import star from '@maidt-cntn/assets/icons/in_correct_star.svg';
import wrong from '@maidt-cntn/assets/icons/wrong.svg';

export interface IMarkProps extends IMarkStyle {
  children?: React.ReactNode;
  markPosition?: string;
}

export const Mark: React.FC<IMarkProps> = ({ type = 'none', size = 'middle', children, markPosition, ...rest }) => {
  const margin = useMemo(() => {
    if (size === 'large') {
      return '';
    }
    switch (type) {
      case 'wrong':
        return markPosition || '0 0 0 -15px';
      case 'incorrect':
        return markPosition || '-20px 0 0 10px';
      case 'correct':
      default:
        return markPosition || '-15px 0 0';
    }
  }, []);

  const icon = useMemo(() => {
    switch (type) {
      case 'incorrect':
        return <Style.Icon src={icInCorrect} size={size} alt='틀림' margin={margin} />;
      case 'correct':
        return <Style.Icon src={icCorrect} size={size} alt='맞음' margin={margin} />;
      case 'wrong':
        return <Style.Icon src={wrong} size={size} alt='틀림' margin={margin} />;
      case 'star':
        return <Style.Icon src={star} size={size} alt='틀림' />;
      case 'none':
      default:
        return '';
    }
  }, [type, size]);

  return (
    <Style.Mark type={type} size={size} {...rest}>
      {children}
      {icon}
    </Style.Mark>
  );
};

export default Mark;
