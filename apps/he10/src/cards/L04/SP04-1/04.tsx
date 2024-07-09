import { Box, BoxWrap, EStyleFontSizes, List, Scroll, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow from '@/assets/icon/arrow_right.svg';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };

  const escapeRegExp = (str: string) => {
    return str.replace(/[<>()+]/g, '\\$&');
  };

  const data = [
    {
      header: '1) not only A but also B: A뿐만 아니라 B도',
      highlightHeader: 'not only A but also B:',
      body: <Box display='flex' flexDirection='row'>
        <Box>
          <Typography>
            Reusable cups{' '}
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
              not only
            </Typography>
            {' '}
            <Typography type='box' weight={'var(--font-weight-bold)'}>
              have an appealing appearance
            </Typography>
            {' '}
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
              but (also)
            </Typography>
            {' '}
            <Typography type='box' weight={'var(--font-weight-bold)'}>
              preserve the taste of the coffee
            </Typography>.
          </Typography>
          {' '}
          <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
            재사용 가능한 컵은 시각적으로 매력적인 외관을 지닐 뿐만 아니라 커피의 맛도 보존한다.{' '}
          </Typography>
        </Box>
      </Box>
    },
    {
      header: '2) neither A nor B: A도 B도 아닌',
      highlightHeader: 'neither A nor B:',
      body: <Box display='flex' flexDirection='row'>
        <Box>
          <Typography>
            They could find their cat{' '}
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
              neither
            </Typography>
            {' '}
            <Typography type='box' weight={'var(--font-weight-bold)'}>
              in the living room
            </Typography>
            {' '}
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
              nor
            </Typography>
            {' '}
            <Typography type='box' weight={'var(--font-weight-bold)'}>
              in the kitchen
            </Typography>.
          </Typography>
          {' '}
          <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
            그들은 안방뿐만 아니라 주방에서도 고양이를 찾을 수 없었다.{' '}
          </Typography>
        </Box>
      </Box>
    },
    {
      header: '3) not A but B: A가 아니라 B',
      highlightHeader: 'not A but B:',
      body: <Box display='flex' flexDirection='row'>
        <Box>
          <Typography>
            What truly matters in life is{' '}
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
              not
            </Typography>
            {' '}
            <Typography type='box' weight={'var(--font-weight-bold)'}>
              others’ opinion
            </Typography>
            {' '}
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
              but
            </Typography>
            {' '}
            <Typography type='box' weight={'var(--font-weight-bold)'}>
              your own perspective
            </Typography>.
          </Typography>
          {' '}
          <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
            인생에서 정말로 중요한 것은 다른 사람의 의견이 아니라 스스로의 관점이다.{' '}
          </Typography>
        </Box>
      </Box>
    },
    {
      header: '4) either A or B: A이거나 B',
      highlightHeader: 'either A or B:',
      body: <Box display='flex' flexDirection='row'>
        <Box>
          <Typography>
            Nora enjoys{' '}
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
              either
            </Typography>
            {' '}
            <Typography type='box' weight={'var(--font-weight-bold)'}>
              watching movies
            </Typography>
            {' '}
            <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
              or
            </Typography>
            {' '}
            <Typography type='box' weight={'var(--font-weight-bold)'}>
              playing games in her free time
            </Typography>.
          </Typography>
          {' '}
          <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
            Nora는 여가 시간에 영화를 보거나 게임을 하는 것을 즐긴다.{' '}
          </Typography>
        </Box>
      </Box>
    },
  ];

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const escapedHighlight = escapeRegExp(highlight);
    const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part === highlight ? (
            <span key={index} style={{ fontWeight: 'var(--font-weight-bold)' }}>
              {highlight}
            </span>
          ) : (
            part
          ),
        )}
      </>
    );
  };
  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
    >
      <Scroll width='inherit'>
        <List
          data={data}
          row={({ value }) => (
            <BoxWrap>
              <Box>
                <Typography useGap={false}>
                  {highlightText(value?.header || '', value?.highlightHeader || '')}
                </Typography>
                <Box padding='8px 12px'></Box>
                {value?.body}
              </Box>
            </BoxWrap>
          )}
        />

      </Scroll>
    </Container>
  );
};

export default P04;
