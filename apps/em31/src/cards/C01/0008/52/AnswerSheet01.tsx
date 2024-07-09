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
  const AnswerSheet01 = () => {
    return (
      <Box tabIndex={199} background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
        <Box>
          <Tag type={ETagLine.GREEN} label='정답' />
          <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
            <Typography>513, 498, 1011 / 1011, 있습니다.</Typography>
          </Box>
        </Box>
        <Box position='relative' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='풀이' />
          <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
            <Typography>마을 사람들이 이틀 동안 기부한 라면이 1000개가 넘으므로 으뜸 기업은 약속한 대로 라면을 기부할 수 있습니다.</Typography>
          </Box>
        </Box>
      </Box>
    );
  };
  export default AnswerSheet01;