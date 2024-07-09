import { Box, BoxWrap, EStyleFontSizes, Label, List, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import arrow from '@/assets/icon/arrow_right.svg';

const P06 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  const data = [
    {
      text: '<접속사+주어+동사>의 부사절을 분사를 사용해 부사구로 줄여 쓴 표현이다.',
    },
    {
      text: '문맥에 따라 시간, 조건, 양보, 동시, 연속의 뜻을 나타낼 수 있다.',
      highlight: '시간, 조건, 양보, 동시, 연속',
    },
  ];
  const escapeRegExp = (str: string) => {
    return str.replace(/[<>()+]/g, '\\$&');
  };
  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const escapedHighlight = escapeRegExp(highlight);
    const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part === highlight ? (
            <span key={index} style={{ fontWeight: 'var(--font-weight-semiBold)', color: 'var(--color-blue-700)' }}>
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
    <Container headerInfo={headerInfo}>
      <Box>
        <Box
          flexDirection='column'
          width='840px'
          height='280px'
          padding='28px'
          hAlign={'center'}
          marginTop={160}
          background='white'
          useRound
          useShadow
        >
          <Box padding='8px 12px'>
            <Typography weight='700'>분사구문이란?</Typography>
          </Box>
          <List
            data={data}
            row={({ value }) => (
              <BoxWrap>
                <Box>
                  <Label type={'paint'} size={'xx-small'} background='var(--color-blue-800)' />
                </Box>
                <Typography>{highlightText(value?.text || '', value?.highlight || '')}</Typography>
              </BoxWrap>
            )}
          />
        </Box>
        <Box padding='8px 12px'></Box>
        <Box marginBottom={24}>
          <Typography>
            <Typography weight={'var(--font-weight-bold)'} useGap={false}>
              When they are paired
            </Typography>{' '}
            with new partners, the chimpanzees usually failed to get the food.
          </Typography>
        </Box>
        <Box display='flex' flexDirection='row'>
          <Box paddingTop='6px'>
            <SvgIcon size='38px' src={arrow} alt='' />
          </Box>
          <Box>
            <Typography>
              <Typography weight={'var(--font-weight-bold)'} useGap={false}>
                Paired
              </Typography>{' '}
              with new partners, the chimpanzees usually failed to get the food.
            </Typography>
            <Typography color='var(--color-grey-700)' size={EStyleFontSizes['X-MEDIUM']}>
              새로운 파트너와 짝이 지어졌을 때, 침팬지들은 보통 음식을 얻는 데 실패했다.{' '}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P06;
