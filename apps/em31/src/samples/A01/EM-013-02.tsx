import { Box, EStyleButtonTypes, EStyleFontSizes, IQuestionProps, Label, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM01302 = () => {
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '뺄셈의 어림셈으로 문제를 해결하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' color='var(--color-white)' background='#969590' />
        3학년 학생 모두 영상 체험관에 들어갈 수 있다고 생각하나요? 왜 그렇게 생각하는지 이야기해 보세요.
      </>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      submitBtnColor={EStyleButtonTypes.YELLOW}
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <Box useFull>
        <Box display='flex' flexDirection='column'>
          <Typography size={EStyleFontSizes.MEDIUM}>
            3학년 학생이 모두 영상 체험관에서 영상을 보기로 했어.
            <br /> 영상 체험관의 자리는 700개이고 지금까지 입장한 사람은 198명이야.
            <br /> 3학년 학생 모두 영상 체험관에 들어갈 수 있을까?
          </Typography>
        </Box>
        <Box marginTop='24px'>
          <Scroll tabIndex={0}>{/* 그리기 도구 */}</Scroll>
        </Box>
      </Box>
    </Container>
  );
};

export default EM01302;
