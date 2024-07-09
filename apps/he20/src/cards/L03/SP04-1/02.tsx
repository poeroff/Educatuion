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
    <Container headerInfo={headerInfo}>
      <Box>
        <Box width='940px' height='420px'>
          <Scroll width='inherit'>
            <Box marginBottom={24}>
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
                Although
              </Typography>
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                <span>he became a free man,</span>
              </u>{' '}
              he still faced racial discrimination.
              <Typography>
                {'<'}절과 함께 쓰인 접속사{'>'}
              </Typography>
              <Typography color='var(--color-blue-900)'>자유인이 되었지만, 그는 여전히 인종차별을 겪었다.</Typography>
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
                Despite
              </Typography>
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                <span>challenges</span>
              </u>{' '}
              in their lives, the artists never gave up on their art.
              <Typography>
                {'<'}명사구와 함께 쓰인 전치사{'>'}
              </Typography>
              <Typography color='var(--color-blue-900)'>삶의 고난에도 불구하고, 예술가들은 예술을 포기하지 않았다.</Typography>
            </Box>
            <Box>
              One group cooked the food
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
                while
              </Typography>
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                <span>the other cleaned the camping site.</span>
              </u>{' '}
              <Typography>
                {'<'}절과 함께 쓰인 접속사{'>'}
              </Typography>
              <Typography color='var(--color-blue-900)'>한 그룹은 음식을 요리하는 동안 다른 그룹은 캠핑장을 청소했다.</Typography>
              <Typography>John learned a lot about the local culture</Typography>
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
                during
              </Typography>
              <Typography textDecoration={'underline'}>his stay </Typography>
              in Andong Hahoe Village.
              <Typography>
                {'<'}명사구와 함께 쓰인 전치사{'>'}
              </Typography>
              <Typography color='var(--color-blue-900)'>John은 안동 하회마을에 머무는 동안 현지 문화에 대해 많은 것을 배웠다.</Typography>
            </Box>
          </Scroll>
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
