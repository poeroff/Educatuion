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

const AnswerSheet03 = () => {
  return (
    <Box tabIndex={199} background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
      <Box>
        <Tag type={ETagLine.GREEN} label='정답' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
          <Typography>있습니다. 많기 또는 없습니다. 적기</Typography>
        </Box>
      </Box>
      <Box position='relative' marginTop='40px'>
        <Tag type={ETagLine.GREEN} label='풀이' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
          <Typography>어림셈을 이용하여 문제를 해결합니다.</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default AnswerSheet03;
