import { Box, EStyleFontSizes, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow from '@/assets/icon/arrow_right.svg';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      vAlign='flex-start'
    >
      <Box>
        <Typography weight='700' useGap={false}>
          1) {'<'}with＋(대)명사＋현재분사{'>'}: ‘…이 ~한 채’라는 뜻으로 (대)명사와 분사의 관계가{' '}
          <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
            능동
          </Typography>일 때 쓴다.
        </Typography>
        <Box padding='8px 12px'></Box>
        <Box display='flex' flexDirection='row'>
          <Box>
            <Typography>
              The sentiment is shared by many,{' '}
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                with coffee shops
              </Typography>
              {' '}
              <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-bold)'}>
                springing
              </Typography>{' '}
              up on every street corner.
            </Typography>
            <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
              이 정서는 거의 모든 길모퉁이에 커피숍이 생겨나는 가운데 많은 사람에 의해 공유되고 있다.{' '}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography weight='700' useGap={false}>
          2) {'<'}with＋(대)명사＋과거분사{'>'}: ‘…이 ~된 채’라는 뜻으로 (대)명사와 분사의 관계가{' '}
          <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
            수동
          </Typography>일 때 쓴다.
        </Typography>
        <Box padding='8px 12px'></Box>
        <Box display='flex' flexDirection='row'>
          <Box>
            <Typography>
              Judy walked out of the library{' '}
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                with her backpack
              </Typography>
              {' '}
              <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-bold)'}>
                filled
              </Typography>{' '}
              with books.
            </Typography>
            <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
              Judy는 책으로 가방이 가득 찬 채로 도서관에서 걸어 나왔다.{' '}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
