import { Box, BoxWrap, EStyleFontSizes, Label, List, Scroll, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow from '@/assets/icon/arrow_right.svg';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  const data = [
    {
      text: '일반동사가 있는 문장: <부정어구+do/does/did+주어+동사원형>',
    },
  ];

  return (
    <Container headerInfo={headerInfo} useExtend={true}>
      <Box>
        <Box flexDirection='column' width='840px' height='420px'>
          <Scroll width='inherit'>
            <Typography weight='700' useGap={false}>
              1) 방향·장소의 부사(구)를 강조하기 위한 도치: {'<'}부사(구)＋동사＋주어{'>'}
            </Typography>
            <Typography>
              The bank is
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} textDecoration={'underline'} title='밑줄'>
                around the corner.
              </Typography>
              <Box>
                <Typography>
                  <SvgIcon size='38px' src={arrow} />
                  <Typography type='blank' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} title='빈칸'>
                    Around the corner
                  </Typography>
                  <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
                    is the bank
                  </Typography>
                  <Box color='var(--color-blue-900)'>
                    <Typography size={EStyleFontSizes['X-MEDIUM']}>모퉁이를 돌면 은행이 있다.</Typography>
                  </Box>
                </Typography>
              </Box>
            </Typography>
            <Box>
              <Typography weight='700' useGap={false}>
                2) 부정어(구)를 강조하기 위한 도치
              </Typography>
              {/* <List
              data={data}
              row={({ value }) => (
                <BoxWrap>
                  <Box>
                    <Label type={'paint'} size={'xx-small'} background='var(--color-black)' />
                  </Box>
                  <Typography>{value?.text}</Typography>
                </BoxWrap>
              )}
            /> */}
              <Box padding='8px 12px'>
                <Label type={'paint'} size={'xx-small'} background='var(--color-black)' />
                <Typography>
                  일반동사가 있는 문장: {'<'}부정어구+do/does/did+주어+동사원형{'>'}
                </Typography>
              </Box>
              She
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} textDecoration={'underline'} title='밑줄'>
                never
              </Typography>
              dreamed of becoming the world’s most popular movie star
              <Box>
                <Typography>
                  <SvgIcon size='38px' src={arrow} />
                  <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} textDecoration={'underline'} title='밑줄'>
                    Never
                  </Typography>
                  <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
                    did she dream
                  </Typography>
                  of becoming the world’s most popular movie star
                  <Box color='var(--color-blue-900)'>
                    <Typography size={EStyleFontSizes['X-MEDIUM']}>그녀는 세계에서 가장 인기 있는 영화배우가 될 꿈도 꾸지 못했다.</Typography>
                  </Box>
                </Typography>
              </Box>
              <Box padding='8px 12px'>
                <Label type={'paint'} size={'xx-small'} background='var(--color-black)' />
                <Typography>
                  be동사 또는 조동사가 있는 문장: {'<'}부정어구+be동사/조동사+주어{'>'}
                </Typography>
              </Box>
              <Typography>I could</Typography>
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} textDecoration={'underline'} title='밑줄'>
                hardly
              </Typography>
              <Typography>trust his promises.</Typography>
              <Box>
                <Typography>
                  <SvgIcon size='38px' src={arrow} />
                  <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'} textDecoration={'underline'} title='밑줄'>
                    Hardly
                  </Typography>
                  <Typography type='box' color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
                    could I trust
                  </Typography>
                  <Typography>his promises.</Typography>
                  <Box color='var(--color-blue-900)'>
                    <Typography size={EStyleFontSizes['X-MEDIUM']}>나는 그의 약속을 좀처럼 믿을 수 없었다.</Typography>
                  </Box>
                </Typography>
              </Box>
            </Box>
            {/*  */}
          </Scroll>
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
