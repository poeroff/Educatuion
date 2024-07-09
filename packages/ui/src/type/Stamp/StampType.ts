export enum EStampType {
  'Excellent' = 'Excellent',
  'Good' = 'Good',
  'Soso' = 'Soso',
  'O' = 'O',
  'X' = 'X',
}

export const StampTextMap = {
  [EStampType.Excellent]: '최고예요',
  [EStampType.Good]: '잘했어요',
  [EStampType.Soso]: '아쉬워요',
  [EStampType.O]: '',
  [EStampType.X]: '',
};
