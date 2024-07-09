import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  Input,
  Table,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Typography,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';

const AnswerSheet02 = () => {
  return (
    <Box tabIndex={199} background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
      <Box>
        <Tag type={ETagLine.GREEN} label='정답' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
          <Typography>500, 500 / 500, 500, 1000</Typography>
        </Box>
      </Box>
      <Box position='relative' marginTop='40px'>
        <Tag type={ETagLine.GREEN} label='풀이' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
          <Typography>496을 500, 508을 500으로 생각하여 어림셈을 하면 500+500=1000입니다.</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default AnswerSheet02;
