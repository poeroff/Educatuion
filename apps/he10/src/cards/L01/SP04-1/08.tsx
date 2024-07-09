import { Box, EStyleFontSizes, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow from '@/assets/icon/arrow_right.svg';

const P08 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  return (
    <Container headerInfo={headerInfo}>
      <Box>
        <Box marginBottom={24}>
          <Typography>As we waited for our bus, we saw a fire in the building.</Typography>
          <Box color='var(--color-grey-700)'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>버스를 기다리면서, 우리는 건물에 불이 난 것을 봤다.</Typography>
          </Box>
        </Box>
        <Box display='flex' gap='10px' flexDirection='column'>
          <Box display='flex' flexDirection='row'>
            <Box paddingTop='8px'>
              <SvgIcon size='38px' src={arrow} alt='' />
            </Box>
            <Box>
              <Typography>
                <Typography
                  weight='var(--font-weight-bold)'
                  color='var(--color-blue-800)'
                  textDecoration={'line-through'}
                  title='취소선'
                  useGap={false}
                >
                  As
                </Typography>{' '}
                we waited for our bus, we saw a fire in the building.
              </Typography>
              <Typography>
                부사절의{' '}
                <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                  접속사
                </Typography>{' '}
                생략
              </Typography>
            </Box>
          </Box>
          <Box display='flex' flexDirection='row'>
            <Box paddingTop='8px'>
              <SvgIcon size='38px' src={arrow} alt='' />
            </Box>
            <Box>
              <Typography>
                <Typography
                  weight='var(--font-weight-bold)'
                  color='var(--color-blue-800)'
                  textDecoration={'line-through'}
                  title='취소선'
                  useGap={false}
                >
                  We
                </Typography>{' '}
                waited for our bus, we saw a fire in the building.
              </Typography>
              <Typography>
                부사절의{' '}
                <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                  주어
                </Typography>{' '}
                생략
              </Typography>
            </Box>
          </Box>
          <Box display='flex' flexDirection='row'>
            <Box paddingTop='8px'>
              <SvgIcon size='38px' src={arrow} alt='' />
            </Box>
            <Box>
              <Typography>
                <Typography weight='var(--font-weight-bold)' color='var(--color-red-800)' title='강조' useGap={false}>
                  Waiting
                </Typography>{' '}
                for our bus, we saw a fire in the building.
              </Typography>
              <Typography>
                부사절의 동사를{' '}
                <Typography useGap={false} color='var(--color-red-800)' weight={'var(--font-weight-bold)'}>
                  현재분사
                </Typography>
                로 변경
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P08;
