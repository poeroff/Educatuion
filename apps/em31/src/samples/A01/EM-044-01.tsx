import { useState } from 'react';
import { Box, BoxWrap, EStyleFontSizes, IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM04301 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '주변에 있는 여러 가지 물건의 길이를 재어 보세요.',
  };

  const [isShow, setShow] = useState(false);
  const onSubmit = () => {
    setShow(!isShow);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={onSubmit}
      submitLabel='완료하기'
      useRound
      vAlign='flex-start'
    >
      <BoxWrap>
        <Box width='796px' height='390px' border='1px solid var(--color-blue-200)' borderRadius='8px'>
          그리기 도구 티맥스에서 제공
        </Box>

        <Box width='100px' height='100px' backgroundColor='var(--color-grey-100)'>
          <Typography useGap={false} size={EStyleFontSizes['SMALL']} style={{ lineHeight: '20px' }}>
            자 교구 버튼
          </Typography>
          <Typography useGap={false} size={EStyleFontSizes['X-SMALL']} style={{ fontSize: '10px', lineHeight: '20px' }}>
            (고객 검토 후 반영 예정)
          </Typography>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM04301;
