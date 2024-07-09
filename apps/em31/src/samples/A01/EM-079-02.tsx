import styled from '@emotion/styled';
import { Box, BoxWrap, IQuestionProps, Image, Input, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM07902 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '문제',
    iconType: 'write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '색칠한 부분과 색칠하지 않은 부분을 분수로 나타내 보세요.',
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');
  const [value5, setValue5] = useState<string>('');
  const [value6, setValue6] = useState<string>('');
  const [value7, setValue7] = useState<string>('');
  const [value8, setValue8] = useState<string>('');
  const [value9, setValue9] = useState<string>('');
  const [value10, setValue10] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => setShow(!isShow)}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap useFull>
        <Box
          display='flex'
          type='dashed'
          padding='32px 30.17px'
          useRound
          useFull
          flexDirection='column'
          alignItems='center'
          justifyContent='flex-end'
        >
          <Image
            src='/example/EM-079-02/trapezoid.jpg'
            width='221px'
            height='98px'
            alt='사각형이 세 부분으로 나누어져있고 그 중 두 부분이 색칠해져 있습니다.'
          />
          <BoxWrap marginTop={64} justifyContent='center'>
            <InputWrapper bgColor='var(--color-pink-100)'>
              <Typography fontSize='32px' lineHeight='24px' fontWeight='400' fontFamily='BTbunsu'>
                <MathExpression equation={`\\(\\frac{2}{3}\\)`} />
              </Typography>
            </InputWrapper>
            <InputWrapper>
              <Input
                width='40px'
                maxLength={1}
                height='40px'
                ariaLabel='분자-사다리꼴의 색칠하지 않은 부분'
                value={value1}
                onChange={e => setValue1(e.target.value)}
              />
              <Line />
              <Input
                width='40px'
                maxLength={1}
                height='40px'
                ariaLabel='분모-사다리꼴의 전체 조각'
                value={value2}
                onChange={e => setValue2(e.target.value)}
              />
            </InputWrapper>
          </BoxWrap>
        </Box>
        <Box
          display='flex'
          type='dashed'
          padding='32px 30.17px'
          useRound
          useFull
          flexDirection='column'
          alignItems='center'
          justifyContent='flex-end'
        >
          <Image
            src='/example/EM-079-02/hexagon.jpg'
            width='189px'
            height='164px'
            alt='육각형이 여섯 부분으로 나누어져있고 그 중 다섯 부분이 색칠해져 있습니다.'
          />
          <BoxWrap marginTop={32} justifyContent='center'>
            <InputWrapper bgColor='var(--color-green-100)'>
              <Input
                width='40px'
                maxLength={1}
                height='40px'
                ariaLabel='분자-육각형의 색칠한 부분'
                value={value3}
                onChange={e => setValue3(e.target.value)}
              />
              <Line />
              <Input
                width='40px'
                maxLength={1}
                height='40px'
                ariaLabel='분모-육각형의 전체 조각'
                value={value4}
                onChange={e => setValue4(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                width='40px'
                maxLength={1}
                height='40px'
                ariaLabel='육각형의 색칠하지 않은 부분'
                value={value5}
                onChange={e => setValue5(e.target.value)}
              />
              <Line />
              <Input
                width='40px'
                maxLength={1}
                height='40px'
                ariaLabel='분모-육각형의 전체 조각'
                value={value6}
                onChange={e => setValue6(e.target.value)}
              />
            </InputWrapper>
          </BoxWrap>
        </Box>
        <Box
          display='flex'
          type='dashed'
          padding='32px 30.17px'
          useRound
          useFull
          flexDirection='column'
          alignItems='center'
          justifyContent='flex-end'
        >
          <Image
            src='/example/EM-079-02/circle.jpg'
            width='164px'
            height='164px'
            alt='원이 여덟 부분으로 나누어져있고 그 중  세 부분이 색칠해져 있습니다.'
          />
          <BoxWrap marginTop={32} justifyContent='center'>
            <InputWrapper bgColor='var(--color-blue-100)'>
              <Input
                width='40px'
                maxLength={1}
                height='40px'
                ariaLabel='분자-원의 색칠한 부분'
                value={value7}
                onChange={e => setValue7(e.target.value)}
              />
              <Line />
              <Input width='40px' maxLength={1} height='40px' ariaLabel='원의 전체 조각' value={value8} onChange={e => setValue8(e.target.value)} />
            </InputWrapper>
            <InputWrapper>
              <Input
                width='40px'
                maxLength={1}
                height='40px'
                ariaLabel='분자-원의 색칠하지 않은 부분'
                value={value9}
                onChange={e => setValue9(e.target.value)}
              />
              <Line />
              <Input width='40px' maxLength={1} height='40px' ariaLabel='원의 전체 조각' value={value10} onChange={e => setValue10(e.target.value)} />
            </InputWrapper>
          </BoxWrap>
        </Box>
      </BoxWrap>
    </Container>
  );
};
export default EM07902;

const InputWrapper = styled.div<{ bgColor?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 4px;
  width: 52px;
  height: 106px;
  padding: 4px;
  border: 2px solid var(--color-grey-200);
  border-radius: 8px;
  ${({ bgColor }) => `
    background-color: ${bgColor ? bgColor : 'var(--color-white)'}
  `}
`;

const Line = styled.div`
  width: 40px;
  border: 1px solid var(--color-grey-900);
`;
