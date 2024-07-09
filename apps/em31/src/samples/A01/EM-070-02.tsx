import { useState } from 'react';

import {
  Box,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  Label,
  SvgIcon,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableMathCaption,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import star from '../../assets/icon/header_star.svg';

const EM07002 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<string[]>(Array(8).fill('')); // 7개의 인풋 필드를 위한 상태 배열

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCheck2',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={star} size='36px' />
        계산을 하고, 계산 결과가 맞는지 확인해 보세요.
      </>
    ),
  };

  const handleInputChange = (index: number, value: string) => {
    setInputValues(prevValue => prevValue.map((prevValue, i) => (i === index ? value : prevValue)));
  };

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
      <Box hAlign='center' padding='24px 0 12px 0' border='4px solid var(--color-grey-100)' useRound>
        <Table color={EStyleTableTypes.MATH_DIVIDE} useMathBorder={false}>
          <TableMathCaption caption='세로셈, 97 나누기 3의 풀이' math={['97', '÷', '3']} />
          <THead hidden>
            <TR>
              <TH scope='col'>나누는 수, 일의 자리</TH>
              <TH scope='col'>나누어지는 수, 십의 자리</TH>
              <TH scope='col'>나누어지는 수, 일의 자리</TH>
            </TR>
          </THead>
          <TBody>
            <TR isDivideExp divideExpGap={22} height={35}>
              <TD width='30px' height='40px'>
                3
              </TD>
              <TD width='25px' height='40px'>
                9
              </TD>
              <TD width='20px' height='40px'>
                7
              </TD>
            </TR>
          </TBody>
        </Table>
      </Box>
      <Box marginTop='24px' hAlign='center'>
        <Box width='460px'>
          <Box vAlign='center'>
            <Box width='100px' textAlign='right' marginRight='10px'>
              <Label
                value='몫'
                color='var(--color-yellow-800)'
                background='var(--color-yellow-100)'
                lineColor='var(--color-yellow-700)'
                fontSize={22}
              />
            </Box>
            <Input width='130px' ariaLabel='몫 답 입력란' value={inputValues[0]} onChange={e => handleInputChange(0, e.target.value)} />
          </Box>
          <Box marginTop='12px' vAlign='center'>
            <Box width='100px' textAlign='right' marginRight='10px'>
              <Label
                value='나머지'
                svgWidth={100}
                color='var(--color-yellow-800)'
                background='var(--color-yellow-100)'
                lineColor='var(--color-yellow-700)'
                fontSize={22}
              />
            </Box>
            <Input width='130px' ariaLabel='나머지 답 입력란' value={inputValues[1]} onChange={e => handleInputChange(1, e.target.value)} />
          </Box>
          <Box marginTop='12px' vAlign='flex-start'>
            <Box width='100px' textAlign='right' marginRight='10px'>
              <Label
                value='확인'
                svgWidth={79}
                color='var(--color-yellow-800)'
                background='var(--color-yellow-100)'
                lineColor='var(--color-yellow-700)'
                fontSize={22}
              />
            </Box>
            <Box>
              <Box vAlign='center'>
                <Input width='50px' ariaLabel='답 입력란' value={inputValues[2]} onChange={e => handleInputChange(2, e.target.value)} />
                <Typography>×</Typography>
                <Input width='98px' ariaLabel='답 입력란' value={inputValues[3]} onChange={e => handleInputChange(3, e.target.value)} />
                <Typography>=</Typography>
                <Input width='98px' ariaLabel='곱한 값 입력란' value={inputValues[4]} onChange={e => handleInputChange(4, e.target.value)} />,
              </Box>
              <Box marginTop='8px' vAlign='center'>
                <Input width='98px' ariaLabel='답 입력란' value={inputValues[5]} onChange={e => handleInputChange(5, e.target.value)} />
                <Typography>+</Typography>
                <Input width='50px' ariaLabel='답 입력란' value={inputValues[6]} onChange={e => handleInputChange(6, e.target.value)} />
                <Typography>=</Typography>
                <Input width='98px' ariaLabel='더한 값 입력란' value={inputValues[7]} onChange={e => handleInputChange(7, e.target.value)} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM07002;
