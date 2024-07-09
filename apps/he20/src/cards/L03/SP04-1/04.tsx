import { Box, EStyleFontSizes, Label, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow from '@/assets/icon/arrow_right.svg';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  return (
    <Container headerInfo={headerInfo}>
      <Box flexDirection='column' width='940px' height=''>
        <Box marginBottom={24}>
          <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
            <span>She even studied abroad in Paris,</span>
          </u>
          <Typography color='var(--color-red-800)' weight={'var(--font-weight-extraBold)'}>
            which
          </Typography>
          was unusual for women at the time.
          <br />
          <Typography>
            {'<'}앞절 전체가 선행사{'>'}
          </Typography>
          <Typography color='var(--color-blue-900)'>그녀는 파리에서 유학하기까지 했는데, 그것은 당시 여성으로서는 드문 일이었다.</Typography>
        </Box>
        <Box>
          <Typography>Lewis went to live with her aunt in</Typography>
          <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
            <span>Digby,</span>
          </u>
          <Typography color='var(--color-black-800)' weight={'var(--font-weight-extraBold)'}>
            where
          </Typography>
          she met her future husband.
          <br />
          <Typography>
            {'<'}앞의 명사가 선행사{'>'}
          </Typography>
          <Typography color='var(--color-blue-900)'>Lewis는 이모와 함께 살기 위해 딕비로 갔고, 그곳에서 미래의 남편을 만났다.</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default P04;
