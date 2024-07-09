import styled from '@emotion/styled';
import { Box, BoxWrap, Drawing, IQuestionProps, Image, Input, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM03401 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '나눗셈의 몫을 곱셈식으로 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' type='paint' background='#969590' color='var(--color-white)' />
        32 ÷ 4의 몫을 곱셈식으로 구하는 방법을 설명해 보세요.
      </>
    ),
  };

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <BoxWrap useFull alignItems='center'>
        <Box position='relative'>
          <Image
            src='/example/EM-034-01/EM03401.jpg'
            width='274px'
            height='206px'
            alt='32과 4의 관계를 표현한 이미지가 있습니다. 32나누기 4의 답이 4 X x=32에서 x의 답과 같습니다.'
          />
          <InputWrapper1>
            <Input
              width='56px'
              inputSize='x-small'
              type='number'
              maxLength={2}
              value={value1}
              onChange={e => setValue1(e.target.value)}
              ariaLabel='32 나누기 4의 몫을 적어주세요.'
            />
          </InputWrapper1>
          <InputWrapper2>
            <Input
              width='56px'
              inputSize='x-small'
              type='number'
              maxLength={2}
              value={value2}
              onChange={e => setValue2(e.target.value)}
              ariaLabel='4 곱하기 x = 32 에서 x를 적어주세요.'
            />
          </InputWrapper2>
        </Box>
        <Box useFull>
          <Drawing width='622.22px' height='402px' tmpSave={() => {}} />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM03401;

const InputWrapper1 = styled.div`
  position: absolute;
  input {
    border-radius: 4px;
    height: 36px;
  }
  top: 24px;
  right: 85px;
`;
const InputWrapper2 = styled.div`
  position: absolute;
  input {
    border-radius: 4px;
    height: 36px;
  }
  bottom: 62px;
  right: 83px;
`;
