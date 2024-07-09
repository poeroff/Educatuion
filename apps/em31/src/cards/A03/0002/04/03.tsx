import { Box, EStyleFontSizes, ESvgType, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container, Divexplanation } from '@maidt-cntn/ui/math';
import roundedMicrophone from '@/assets/icon/rounded_microphone.svg';
const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '심을 수 있는 모종 수 알아보기',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box hAlign='center' flexDirection='column'>
        <Typography weight={700} useGap={false}>
          6을 2로 나누면 3입니다.
        </Typography>
        <Box>
          <Typography weight={700} useGap={false}>
            이것을 식으로 나타내면 6
          </Typography>
          <Typography weight={700} useGap={false} color='#EB1807'>
            ÷
          </Typography>
          <Typography weight={700} useGap={false}>
            2=3입니다.
          </Typography>
        </Box>
      </Box>
      <Box hAlign='center' marginTop={'20px'} flexDirection='column'>
        <Divexplanation>
          <Typography weight={600} useGap={false}>
            6÷2=3
          </Typography>
        </Divexplanation>

        <Typography weight={700} useGap={true} size={EStyleFontSizes['SMALL']}>
          <SvgIcon style={{ verticalAlign: 'text-top' }} type={ESvgType.IMG} src={roundedMicrophone} width='52px' height='20px' alt='읽기' /> 6 나누기
          2는 3과 같습니다.
        </Typography>
      </Box>

      <Box marginTop={'20px'} hAlign='center'>
        <Typography weight={700}>
          6÷2와 같은 계산을{' '}
          <Typography weight={700} useGap={false} color='#EB1807'>
            나눗셈
          </Typography>
          이라고 합니다.
        </Typography>
      </Box>
    </Container>
  );
};

export default P03;
