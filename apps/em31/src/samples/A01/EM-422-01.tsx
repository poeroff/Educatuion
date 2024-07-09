import { Box, Label, IQuestionProps, Image, BoxWrap, EChipButtonType, ChipButton, Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM42201 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        <Box vAlign='center'>
          예각과 둔각 중에서 어느 것인지&nbsp;
          <ChipButton type='button' status={EChipButtonType.EMPTY} size='50px' />
          &nbsp;안에 써넣으세요.
        </Box>
      </>
    ),
  };

  const [value1, setValue1] = useState<string>('');

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      vAlign='start'
      useExtend
    >
      <BoxWrap justifyContent='center' boxGap={24} useFull>
        <Box width='229px' height='324px' hAlign='center' flexDirection='column'>
          <Image
            src='../../assets/example/EM-422-01/MC41259.jpg'
            alt='시계의 시침과 분침이 정각 7시를 가리키고 있습니다.'
            width='229px'
            height='248px'
          />
          <Box vAlign='center' marginTop={'24px'}>
            <Input
              value={value1}
              width='130px'
              onChange={e => {
                setValue1(e.target.value);
              }}
              ariaLabel='예각과 둔각 중 하나를 골라 적어주세요.'
            />
          </Box>
        </Box>

        <Box paddingTop='62px' height='324px' hAlign='center' flexDirection='column'>
          <Image src='../../assets/example/EM-422-01/MC41260.jpg' alt='가위가 종이를 자를 만큼 벌어져 있습니다.' width='280px' height='186px' />
          <Box vAlign='center' marginTop={'24px'}>
            <Input
              value={value1}
              width='130px'
              onChange={e => {
                setValue1(e.target.value);
              }}
              ariaLabel='예각과 둔각 중 하나를 골라 적어주세요.'
            />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};
export default EM42201;
