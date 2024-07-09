import { Box, IQuestionProps, Label, Typography, Image, Drawing, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM00906 = () => {
  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        깃털을 한 명에게 3개씩 나누어 주려고 합니다. 준비한 깃털 수에 따라 남는 깃털 수가 될 수 있는 수를 알아보세요.
      </>
    ),
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
      vAlign='flex-start'
    >
      <Box>
        <Label value='ㄴ' color='var(--color-white)' svgWidth={36} svgHeight={36} background='#969590' />
        <Typography>문제를 어떻게 해결할 수 있을지 생각해 보세요.</Typography>
      </Box>
      <BoxWrap marginTop='24px'>
        <Box useFull>
          <Drawing />
        </Box>
        <Box>
          <Image
            src='/example/EM-009-06/MA32309.png'
            width='283px'
            height='290px'
            alt='준비한 깃털이 24개일 때는 남는 깃털이 없고, 25개일 때는 남는 깃털이 1개예요. 준비한 깃털이 26, 27, 28, 29일 때는 깃털이 몇 개 남을까요?'
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM00906;
