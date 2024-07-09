import Style from './DropZone.style';
import { Box, RecordButton, SvgIcon, Typography } from '@maidt-cntn/ui';
import icon from '@maidt-cntn/assets/icons/drag_drop.svg';

interface IDropZone {
  chipButtonInfo: IChipButtonInfo[];
  chipButtonOnClick: (index: number) => void;
  chipButtonMinWidth?: string;
  clickedChipButtons: number[];
  resetButtonOnClick: () => void;
  isCompleted?: boolean;
}

export interface IChipButtonInfo {
  text: string;
  backgroundColor?: string;
  isError?: boolean;
  answer?: number;
}

export const DropZone = ({
  chipButtonInfo,
  chipButtonOnClick,
  chipButtonMinWidth,
  clickedChipButtons,
  resetButtonOnClick,
  isCompleted,
}: IDropZone) => {
  const handleClick = (index: number) => {
    if (isCompleted) return;
    chipButtonOnClick(index);
  };

  return (
    <>
      <Box display='flex' flexWrap='wrap' gap='10px' justifyContent='center'>
        {chipButtonInfo.map((item, index) => (
          <Style.ChipButton
            key={index}
            type='button'
            backgroundColor={item.backgroundColor}
            minWidth={chipButtonMinWidth}
            isDisabled={clickedChipButtons.includes(index)}
            aria-selected={clickedChipButtons.includes(index)}
            onClick={() => handleClick(index)}
          >
            <Typography color={clickedChipButtons.includes(index) ? 'var(--color-grey-500)' : undefined}>{item.text}</Typography>
          </Style.ChipButton>
        ))}
      </Box>

      <Style.DropZone>
        {clickedChipButtons.length ? (
          <Box display='flex' flexWrap='wrap' gap='10px' flex='1' marginRight='8px' height='fit-content'>
            {clickedChipButtons.map((item, index) => (
              <Style.ChipButton
                key={index}
                type='button'
                backgroundColor={chipButtonInfo[item].backgroundColor}
                minWidth={chipButtonMinWidth}
                isShadow={false}
                onClick={() => handleClick(item)}
                isError={chipButtonInfo[item].isError}
              >
                <Typography>{chipButtonInfo[item].text}</Typography>
              </Style.ChipButton>
            ))}
          </Box>
        ) : (
          <Style.InformationText>
            <SvgIcon src={icon} size='32px' />
            카드를 선택해주세요.
          </Style.InformationText>
        )}

        {!isCompleted && <RecordButton label='reset' onClick={resetButtonOnClick} />}
      </Style.DropZone>
    </>
  );
};

export default DropZone;
