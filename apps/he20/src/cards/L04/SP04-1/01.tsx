import { Box, Label, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = ({ _page = 'P01' }: { _page?: string }) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
  };

  const data = [
    {
      text: '5 형식 문장의 목적어가 to 부정사 ( 구 ) 일 때 , 일반적으로 목적어 자리에 가목적어 it 을 쓰고 진목적어인 to 부정사 ( 구 ) 는 목적격 보어 뒤로 보낸다.',
    },
    {
      text: '함께 쓰이는 동사로는 consider, find, make, think, believe 등이 있다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start'>
      <Box vAlign='start' flexDirection='column' padding='10px 0' marginTop='24px'>
        <Box vAlign='center' marginBottom='60px'>
          <Box padding='26px 10px'>
            <Label background='var(--color-blue-500)' type='paint' size='xx-small' />
          </Box>
          <Typography fontSize='32px' lineHeight='48px' weight='var(--font-weight-bold)'>
            가목적어와 진목적어
          </Typography>
        </Box>
        <List
          gap={30}
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

export default P01;
