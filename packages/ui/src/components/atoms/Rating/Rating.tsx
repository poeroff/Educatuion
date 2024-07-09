import { useMemo } from 'react';
import { ERatingTypes } from '@maidt-cntn/ui';
import Style from './Rating.style';

import filledStar from '@maidt-cntn/assets/icons/rating/filledStar.svg';
import filledSmile1 from '@maidt-cntn/assets/icons/rating/filledSmile_1.svg';
import filledSmile2 from '@maidt-cntn/assets/icons/rating/filledSmile_2.svg';
import filledSmile3 from '@maidt-cntn/assets/icons/rating/filledSmile_3.svg';

import emptyStar from '@maidt-cntn/assets/icons/rating/emptyStar.svg';
import emptySmile1 from '@maidt-cntn/assets/icons/rating/emptySmile_1.svg';
import emptySmile2 from '@maidt-cntn/assets/icons/rating/emptySmile_2.svg';
import emptySmile3 from '@maidt-cntn/assets/icons/rating/emptySmile_3.svg';

import nonActiveStar from '@maidt-cntn/assets/icons/rating/nonActiveStar.svg';
import nonActiveSmile1 from '@maidt-cntn/assets/icons/rating/nonActiveSmile_1.svg';
import nonActiveSmile2 from '@maidt-cntn/assets/icons/rating/nonActiveSmile_2.svg';
import nonActiveSmile3 from '@maidt-cntn/assets/icons/rating/nonActiveSmile_3.svg';

export interface IRating {
  type?: ERatingTypes;
  count?: number;
  score?: number;
  onChange?: (inx: number) => void;
  readOnly?: boolean;
  disabled?: boolean;
  ariaLabels?: string[];
  ratingGap?: number;
  size?: number;
  src?: string;
}

export const Rating: React.FC<IRating> = ({
  type = ERatingTypes.STAR,
  count = 3,
  score = 0,
  onChange,
  readOnly = false,
  disabled = false,
  ariaLabels,
  size,
  ratingGap = 10,
}: IRating) => {
  const [filledIcon, emptyIcon, nonActiveIcon] = useMemo(() => {
    // TODO: disabled 상태의 filled icon 가이드가 없어서 일단 비어있는 icon으로 보여줌
    switch (type) {
      case ERatingTypes.STAR:
        return [filledStar, emptyStar, nonActiveStar];
      case ERatingTypes.SMILE_1:
        return [filledSmile1, emptySmile1, nonActiveSmile1];
      case ERatingTypes.SMILE_2:
        return [filledSmile2, emptySmile2, nonActiveSmile2];
      case ERatingTypes.SMILE_3:
        return [filledSmile3, emptySmile3, nonActiveSmile3];
      default:
        return [filledStar, emptyStar, nonActiveStar];
    }
  }, [type]);

  const handleChange = (idx: number) => {
    if (readOnly) {
      return;
    }
    // 현재 점수 클릭하면 전체 선택 해제
    if (score === idx) {
      idx = 0;
    }
    onChange?.(idx);
  };

  return (
    <>
      {[...Array(count)].map((_, idx) => (
        <Style.Button
          key={idx}
          onClick={() => handleChange(idx + 1)}
          disabled={disabled}
          aria-label={`${ariaLabels && ariaLabels.length === count ? ariaLabels[idx] : `${idx + 1}점`}${idx + 1 === score ? ', 선택됨' : ''}`}
          ratingGap={ratingGap}
        >
          <Style.Icon src={idx + 1 <= score ? (disabled ? nonActiveIcon : filledIcon) : disabled ? nonActiveIcon : emptyIcon} size={size ?? 32} />
        </Style.Button>
      ))}
    </>
  );
};

export default Rating;
