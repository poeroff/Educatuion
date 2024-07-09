import { Image, BoxWrap, Box, TMainHeaderInfoTypes, List, Typography, PinchZoom, Scroll } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Ladder Game',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo = {
    text: '활동 방법을 확인해 봅시다.',
  };

  const data = [
    {
      text: '계획(Plans) 아래의 사다리를 타고 내려가서 어울리는 제안(Ideas)을 확인합니다.',
    },
    {
      text: '서로 연결된 계획과 제안을 사용하여 짝과 함께 대화합니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull>
        <Box width='410px' hAlign={'center'} useFull>
          <PinchZoom>
            <Image
              src={'/L05/C03/A02/ME1-L05-C03-A02-P01.jpg'}
              width='410px'
              height='400px'
              alt='다양한 계획과 실천 아이디어가 사다리타기로 연결되어 있다. 
                    save energy – use the stairs
                    made a short video – try a dance challenge
                    do some exercise – play tennis with me
                    have lunch – order tteokbokki
                    do volunteer work – pick up trash in the park'
            />
          </PinchZoom>
        </Box>
        <Box hAlign={'center'} useFull>
          <Scroll>
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
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
