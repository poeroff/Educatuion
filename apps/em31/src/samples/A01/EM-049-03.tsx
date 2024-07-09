import { useState } from 'react';
import {
  IQuestionProps,
  Label,
  BoxWrap,
  Box,
  Table,
  TableMathCaption,
  THead,
  TR,
  TH,
  TBody,
  TD,
  TFoot,
  EStyleTableTypes,
  Input,
  List,
  Radio,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';

const EM04903 = () => {
  const [isShow, setShow] = useState(false);
  const [radio, setRadio] = useState<number | null>(null);
  const handleRadio = (index: number) => {
    setRadio(index);
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={8} />
        빈칸에 들어갈 식은 어느 것인가요?
      </>
    ),
  };

  const data = ['9×70', '5×97', '90×5', '50×7'];

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='채점하기'
    >
      <BoxWrap position='relative' justifyContent='center' marginTop={10}>
        <Box>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['97', '*', '5']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>7</TD>
                <TD>9</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>5</TD>
                <TD></TD>
                <TD>&times;</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>5</TD>
                <TD>3</TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['35', '+', '450']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>백의 자리</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>0</TD>
                <TD>5</TD>
                <TD>4</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>5</TD>
                <TD>8</TD>
                <TD>4</TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
        <Box position='absolute' top='105px' left='calc(50% + 90px)'>
          <BoxWrap alignItems='center' gap='16px' height='56px'>
            <Arrow aria-label='35를 가르키는 화살표 아이콘' />
            <Typography fontSize='var(--font-size-32)'>7&times;5</Typography>
          </BoxWrap>
          <BoxWrap alignItems='center' gap='5px'>
            <Arrow aria-label='450을 가르키는 화살표 아이콘' />
            <Input width='120px' disabled ariaLabel='빈 칸' />
          </BoxWrap>
        </Box>
      </BoxWrap>

      <Box marginTop={24} textAlign='center'>
        <List gap={48} data={data} align='horizontal'>
          {({ value, index = 1 }) => (
            <Radio type={'square'} align='vertical' name={'radio-question-A'} value={index - 1 === radio} onClick={() => handleRadio(index - 1)}>
              <Label value={index} marginRight={4} />
              <Typography fontSize='var(--font-size-32)'>{value}</Typography>
            </Radio>
          )}
        </List>
      </Box>
    </Container>
  );
};

const Arrow = styled.div`
  position: relative;
  width: 40px;
  height: 2px;
  background: var(--color-black);

  :after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border: 2px solid var(--color-black);
    border-top: 0;
    border-right: 0;
    transform: translateY(calc(-50% + 1px)) rotate(45deg);
  }
`;

export default EM04903;
