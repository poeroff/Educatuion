import { useRef } from 'react';
import { Box, ChipButton, EChipButtonType } from '@maidt-cntn/ui';

interface Props {
  mainKey: number;
  subKey: string;
  count: number;
  ariaLabelList: string[];
  gap: string | number;
  changeInputData: (mainKey: number, subKey: string, value: unknown) => void;
  getValueInputData: (mainKey: number, subKey: string) => {};
  isSubmittedInput: (mainKey: number, subKey: string) => boolean;
}

export const StarRating = ({ mainKey, subKey, count, ariaLabelList, gap, changeInputData, getValueInputData, isSubmittedInput }: Props) => {
  const countIdx = useRef(Array.from({ length: count }, (_, index) => index));

  const handleChangeValue = (mainKey: number, subKey: string, index?: number) => {
    changeInputData(mainKey, subKey, index);
  };

  return (
    <Box hAlign='center' gap={gap}>
      {countIdx.current.map((value, index) => (
        <ChipButton
          key={`${mainKey}-${subKey}-${value}`}
          type='button'
          name={`chip-radio-${mainKey}-${subKey}`}
          status={EChipButtonType.STAR}
          isActive={getValueInputData(mainKey, subKey) === value}
          size={'32px'}
          onClick={() => handleChangeValue(mainKey, subKey, value)}
          ariaLabel={ariaLabelList[index]}
          readOnly={isSubmittedInput(mainKey, subKey)}
        />
      ))}
    </Box>
  );
};
