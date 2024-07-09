import { useState } from 'react';

import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  Label,
  SvgIcon,
  TBody,
  TD,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableMathCaption,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import star from '../../assets/icon/header_star.svg';

const EM07001 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [quotients, setQuotients] = useState<string[]>(Array(4).fill(''));
  const [remainders, setRemainders] = useState<string[]>(Array(4).fill(''));

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCheck2',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={star} size='36px' />
        계산해 보세요.
      </>
    ),
  };

  const data = [
    { first: 8, second: 2, third: 5, num: 25, divideNum: 8 },
    { first: 4, second: 6, third: 7, num: 67, divideNum: 4 },
    { first: 5, second: 5, third: 9, num: 59, divideNum: 5 },
    { first: 3, second: 8, third: 6, num: 86, divideNum: 3 },
  ];

  const handleInputQuotientsChange = (index: number, value: string) => {
    setQuotients(prevValue => prevValue.map((prevValue, i) => (i === index ? value : prevValue)));
  };

  const handleInputRemaindersChange = (index: number, value: string) => {
    setRemainders(prevValue => prevValue.map((prevValue, i) => (i === index ? value : prevValue)));
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
      <BoxWrap justifyContent='center' alignItems='center'>
        {data.map((value, index) => (
          <Box key={index}>
            <Box hAlign='center' vAlign='center' height={76} border='4px solid var(--color-grey-100)' useRound>
              <Table color={EStyleTableTypes.MATH_DIVIDE} useMathBorder={false}>
                <TableMathCaption
                  caption={`세로셈, ${value.num} 나누기 ${value.divideNum}의 풀이`}
                  math={[`${value.num}`, '÷', `${value.divideNum}`]}
                />
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
                      {value.first}
                    </TD>
                    <TD width='25px' height='40px'>
                      {value.second}
                    </TD>
                    <TD width='20px' height='40px'>
                      {value.third}
                    </TD>
                  </TR>
                </TBody>
              </Table>
            </Box>
            <Box marginTop='48px'>
              <Box hAlign='end'>
                <Label
                  value='몫'
                  color='var(--color-yellow-800)'
                  background='var(--color-yellow-100)'
                  lineColor='var(--color-yellow-700)'
                  fontSize={22}
                  marginRight={8}
                />
                <Input
                  width='94px'
                  ariaLabel='몫 답 입력란'
                  value={quotients[index]}
                  onChange={e => handleInputQuotientsChange(index, e.target.value)}
                />
              </Box>
              <Box hAlign='end' marginTop='12px'>
                <Label
                  value='나머지'
                  svgWidth={100}
                  color='var(--color-yellow-800)'
                  background='var(--color-yellow-100)'
                  lineColor='var(--color-yellow-700)'
                  fontSize={22}
                  marginRight={8}
                />
                <Input
                  width='94px'
                  ariaLabel='나머지 답 입력란'
                  value={remainders[index]}
                  onChange={e => handleInputRemaindersChange(index, e.target.value)}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </BoxWrap>
    </Container>
  );
};

export default EM07001;
