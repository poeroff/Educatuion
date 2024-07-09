import { useState } from 'react';
import { Box, BoxWrap, ESvgType, IQuestionProps, Input, Label, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import roundedPen from '@/assets/icon/rounded_pen.svg';
import roundedMicrophone from '@/assets/icon/rounded_microphone.svg';

const EM04301 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '1 cm보다 작은 단위 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' color='var(--color-white)' background='#969590' />1 mm를 쓰고 읽어 보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const onSubmit = () => {
    setShow(!isShow);
  };
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');

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
      <BoxWrap alignItems='center' position='relative'>
        <Box>
          <SvgIcon type={ESvgType.IMG} src={roundedPen} width='52px' height='22px' alt='쓰기' />
        </Box>

        <Box position='absolute' left='77px' zIndex='1' top='22px'>
          <Box borderBottom='0.5px dashed var(--color-blue-500)' height='0.5px' width='245px' />
        </Box>
        <Box position='absolute' left='77px' zIndex='1' top='31px'>
          <Box borderBottom='0.5px dashed var(--color-blue-500)' height='0.5px' width='245px' />
        </Box>
        <Box position='absolute' left='77px' zIndex='1' top='48px'>
          <Box borderBottom='0.5px dashed var(--color-blue-500)' height='0.5px' width='245px' />
        </Box>

        <Box marginTop='1px'>
          <Typography useGap={false} fontSize='var(--font-size-36)' lineHeight='40px' weight={'var(--font-weight-bold)'}>
            1 mm
          </Typography>
        </Box>
        <Input
          ariaLabel='1미리미터를 따라 쓰는 칸'
          placeholder='1 mm'
          width='138px'
          inputSize='large'
          marginLeft={24}
          value={value1}
          onChange={e => {
            setValue1(e.target.value);
          }}
        />
        <Input
          ariaLabel='1미리미터를 따라 쓰는 칸'
          width='138px'
          inputSize='large'
          marginLeft={24}
          value={value2}
          onChange={e => {
            setValue2(e.target.value);
          }}
        />
      </BoxWrap>

      <Box vAlign='center' marginTop='24px'>
        <SvgIcon type={ESvgType.IMG} src={roundedMicrophone} width='52px' height='22px' alt='읽기' />
        <Input
          ariaLabel='1미리미터를 읽는 발음대로 쓰는 칸'
          width='303px'
          inputSize='large'
          marginLeft={24}
          value={value3}
          onChange={e => {
            setValue3(e.target.value);
          }}
        />
      </Box>
    </Container>
  );
};

export default EM04301;
