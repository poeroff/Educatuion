import { Image, BoxWrap, Box, TMainHeaderInfoTypes, List, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Find a Person',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo = {
    text: '활동 방법을 확인해 봅시다.',
  };

  const data = [
    {
      text: '교실을 돌아다니며 친구들에게 인사를 건넨 후, 그림 카드에 있는 것을 좋아하는지 묻습니다.',
    },
    {
      text: '친구가 좋아한다고 답하면 카드 빈칸에 친구의 이름을 씁니다. 좋아하지 않는다고 답하면 다른 친구에게 다시 묻습니다.',
    },
    {
      text: '모든 카드에 친구들의 이름을 다 쓰면 자리에 앉습니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull>
        <Box width='410px' hAlign={'center'} useFull>
          <Image
            src={'/L01/C03/A02/ME1-L01-C03-A02-P01.jpg'}
            width='410'
            alt='민트 초콜릿, 야구, 영어, 개, 떡볶이, 새, 점심 급식, 교복, 비 오는 날'
          />
        </Box>
        <Box hAlign={'center'} useFull>
          <List gap={20} data={data}>
            {({ value, index = 1 }) => (
              <Box vAlign='start'>
                <Box width='30px'>
                  <Typography color='var(--color-required)' weight='var(--font-weight-bold)'>
                    {index}&nbsp;
                  </Typography>
                </Box>
                <Box>
                  <Typography>{value?.text}</Typography>
                </Box>
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
