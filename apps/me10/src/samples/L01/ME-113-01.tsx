import { Box, EStyleFontSizes, Label, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const ME11301 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '주요 내용 이해하기',
  };

  const data = [
    {
      text: "be동사는 ‘~이다, ~이 있다'의 의미입니다. 주어에 따라 am, are, is 중 알맞은 것을 씁니다. ",
    },
    {
      text: '주어+be동사: I am / you are / he is / she is / it is / we are / they are',
    },
    {
      text: '주어+be동사의 축약형: I’m / you’re / he’s / she’s / it’s / we’re / they’re',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start'>
      <Box height='48px' vAlign='center' justifyContent='space-between'>
        <Box background='#2294b4' borderRadius='0 32px 32px 0' padding='2px 10px'>
          <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-white)'>
            한눈에 정리하기
          </Typography>
        </Box>
        <Box useRound border='2px solid var(--color-yellow-600)' padding='2px 10px'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>am/are/is ~이다. ~이 있다.</Typography>
        </Box>
      </Box>
      <Box vAlign='start' flexDirection='column' padding='10px 0' marginTop='24px'>
        <Box vAlign='center' marginBottom='24px'>
          <Box padding='26px 10px'>
            <Label background='var(--color-blue-500)' type='paint' size='xx-small' />
          </Box>
          <Typography fontSize='32px' lineHeight='48px' weight='var(--font-weight-bold)'>
            be 동사의 의미와 형태
          </Typography>
        </Box>
        <List
          gap={10}
          data={data}
          row={({ value }) => (
            <Box vAlign='flex-start'>
              <Box padding='4px 12px' marginRight='8px'>
                <Label background='var(--color-black)' type='paint' size='xxx-small' />
              </Box>
              <Typography>{value?.text}</Typography>
            </Box>
          )}
        />
      </Box>
    </Container>
  );
};

export default ME11301;
