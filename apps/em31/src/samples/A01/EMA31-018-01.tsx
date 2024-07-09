import { Box, BoxWrap, IQuestionProps, Image, Label, Textarea, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EMA3101801 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box>
        <BoxWrap alignItems='center'>
          <Label type='icon' value='6' marginRight={12} />약 2 km인 나만의 산책길을 만들고 주아의 산책길과
        </BoxWrap>
        비교해 보세요.
      </Box>
    ),
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
      vAlign='start'
    >
      <BoxWrap flexDirection='column' alignItems='center' height='273px' marginTop='10px'>
        <Image
          src='/example/EMA31-018-01/direction.jpg'
          width='270px'
          height='205px'
          alt='한 변의 길이가 200m 직각으로 이루어진 가로로 6칸, 세로로 5칸의 지도 이미지 입니다.'
        />
        <Box marginTop={24} useFull>
          <BoxWrap boxGap={8} alignItems='center' height={66}>
            <BoxWrap width='fit-content' height={60} alignItems='center'>
              <Label value='ㄷ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' size='x-small' />
            </BoxWrap>
            <BoxWrap alignItems='center'>
              <Typography>어떻게 문제를 해결했는지 설명해 보세요.</Typography>
            </BoxWrap>
          </BoxWrap>
          <Box paddingLeft='60px'>
            <Textarea placeholder='' height='85px' ariaLabel='약 2 km의 산책길을 만들기 위해 어떻게 했는지 설명을 적어주세요.' />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EMA3101801;
