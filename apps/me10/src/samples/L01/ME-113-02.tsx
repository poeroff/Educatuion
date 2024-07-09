import { Box, BoxWrap, EStyleFontSizes, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const ME11302 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '주요 내용 이해하기',
  };

  const data = [
    {
      en: (
        <>
          I&nbsp;
          <Typography useGap={false} color='var(--color-required)' weight='var(--font-weight-bold)'>
            am&nbsp;
          </Typography>
          nervous. = &nbsp;I
          <Typography useGap={false} color='var(--color-required)' weight='var(--font-weight-bold)'>
            ’m
          </Typography>
          &nbsp;nervous
        </>
      ),
      ko: '나는 긴장된다.',
    },
    {
      en: (
        <>
          You&nbsp;
          <Typography useGap={false} color='var(--color-required)' weight='var(--font-weight-bold)'>
            are&nbsp;
          </Typography>
          my best friend. = You
          <Typography useGap={false} color='var(--color-required)' weight='var(--font-weight-bold)'>
            're&nbsp;
          </Typography>
          my best friend.
        </>
      ),
      ko: '너는 내 가장 친한 친구이다.',
    },
    {
      en: (
        <>
          He [She]&nbsp;
          <Typography useGap={false} color='var(--color-required)' weight='var(--font-weight-bold)'>
            is
          </Typography>{' '}
          a teacher. = He
          <Typography useGap={false} color='var(--color-required)' weight='var(--font-weight-bold)'>
            ’s&nbsp;
          </Typography>
          [She’s] a teacher.
        </>
      ),
      ko: '그는[그녀는] 선생님이다.',
    },
    {
      en: (
        <>
          We [They]&nbsp;
          <Typography useGap={false} color='var(--color-required)' weight='var(--font-weight-bold)'>
            are&nbsp;
          </Typography>
          students. = We
          <Typography useGap={false} color='var(--color-required)' weight='var(--font-weight-bold)'>
            're&nbsp;
          </Typography>
          [They’re] students.
        </>
      ),
      ko: '우리는[그들은] 학생이다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo}>
      <Box width='fit-content' background='#2294b4' borderRadius='0 32px 32px 0' padding='2px 10px'>
        <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-white)'>
          대표 예문 확인하기
        </Typography>
      </Box>
      <Box hAlign='start' flexDirection='column' marginTop='24px'>
        <List
          gap={8}
          data={data}
          row={({ value }) => (
            <Box hAlign='flex-start' alignItems='flex-start'>
              <Box width='6px' height='30px' margin='8px' borderRadius='999px' background='var(--color-grey-300)' />
              <BoxWrap flexDirection='column'>
                <Typography lineHeight='42px'>{value?.en}</Typography>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-600)'>
                  {value?.ko}
                </Typography>
              </BoxWrap>
            </Box>
          )}
        />
      </Box>
    </Container>
  );
};

export default ME11302;
