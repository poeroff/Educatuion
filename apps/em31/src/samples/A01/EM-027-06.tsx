import { Box, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM02706 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '48÷4를 맞게 계산했는지 확인하기',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box hAlign='center' flexDirection='column'>
        <Typography fontSize='36px' lineHeight='54px' weight='var(--font-weight-semiBold)' align='center'>
          나눗셈의 계산이 맞는지 곱셈식을 이용하여
          <br />
          확인할 수 있어요.
        </Typography>
        <Box useRound hAlign='center' flexDirection='column' background='var(--color-white)' padding='0 47px' marginTop='32px'>
          <Box padding='4px 0'>
            <Typography fontSize='36px' weight='var(--font-weight-semiBold)' lineHeight='58px'>
              <Typography color='var(--color-green-800)' fontSize='36px' weight='var(--font-weight-semiBold)' useGap={false}>
                48
              </Typography>
              ÷
              <Typography color='var(--color-pink-800)' fontSize='36px' weight='var(--font-weight-semiBold)' useGap={false}>
                4
              </Typography>
              =
              <Typography color='var(--color-blue-800)' fontSize='36px' weight='var(--font-weight-semiBold)' useGap={false}>
                12
              </Typography>
            </Typography>
          </Box>
          <Box vAlign='center'>
            <Box
              color='var(--color-yellow-800)'
              backgroundColor='var(--color-yellow-100)'
              border='1px solid var(--color-yellow-700)'
              fontSize={22}
              borderRadius={50}
              display='flex'
              alignItems='center'
              padding='2px 18px'
              height={38}
              marginRight={8}
            >
              확인
            </Box>
            <Box padding='4px 0'>
              <Typography width='265px' fontSize='36px' weight='var(--font-weight-semiBold)' lineHeight='58px'>
                <Typography color='var(--color-pink-800)' fontSize='36px' weight='var(--font-weight-semiBold)' useGap={false}>
                  4
                </Typography>
                ×
                <Typography color='var(--color-blue-800)' fontSize='36px' weight='var(--font-weight-semiBold)' useGap={false}>
                  12
                </Typography>
                =
                <Typography color='var(--color-green-800)' fontSize='36px' weight='var(--font-weight-semiBold)' useGap={false}>
                  48
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM02706;
