import { useState } from 'react';
import {
  Box,
  EStyleButtonTypes,
  EStyleTableTypes,
  ESvgType,
  IQuestionProps,
  Input,
  Label,
  SvgIcon,
  TBody,
  TD,
  TH,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableMathCaption,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import empty_square from '@/assets/icon/math_empty_square.svg';

const EMA01301 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={1} size='small' />
        <Box>
          <Box vAlign='center'>
            주어진 세 수를 이용하여
            <Box marginLeft='5px' marginRight='5px' hAlign='center'>
              <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='48px' />
            </Box>
            안에 알맞은 수를 써넣으세요.
          </Box>
        </Box>
      </>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);
  const [inputs, setInputs] = useState<string[]>(Array(12).fill(''));

  const handleChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const tdArr = [
    [
      <Box hAlign='center'>
        <Input width='95px' value={inputs[0]} onChange={e => handleChange(0, e.target.value)} ariaLabel='첫 번째 곱셈 첫 번째 숫자' />
        <Typography>×</Typography>
        <Input width='95px' value={inputs[1]} onChange={e => handleChange(1, e.target.value)} ariaLabel='첫 번째 곱셈 두 번째 숫자' />
        <Typography>=</Typography>
        <Input width='95px' value={inputs[2]} onChange={e => handleChange(2, e.target.value)} ariaLabel='첫 번째 곱셈 결과' />
      </Box>,
    ],
    [
      <Box hAlign='center'>
        <Input width='95px' value={inputs[6]} onChange={e => handleChange(6, e.target.value)} ariaLabel='두 번째 곱셈 첫 번째 숫자' />
        <Typography>×</Typography>
        <Input width='95px' value={inputs[7]} onChange={e => handleChange(7, e.target.value)} ariaLabel='두 번째 곱셈 두 번째 숫자' />
        <Typography>=</Typography>
        <Input width='95px' value={inputs[8]} onChange={e => handleChange(8, e.target.value)} ariaLabel='두 번째 곱셈 결과' />
      </Box>,
    ],
    [
      <Box hAlign='center'>
        <Input width='95px' value={inputs[3]} onChange={e => handleChange(3, e.target.value)} ariaLabel='첫 번째 나눗셈 첫 번째 숫자' />
        <Typography>÷</Typography>
        <Input width='95px' value={inputs[4]} onChange={e => handleChange(4, e.target.value)} ariaLabel='첫 번째 나눗셈 두 번째 숫자' />
        <Typography>=</Typography>
        <Input width='95px' value={inputs[5]} onChange={e => handleChange(5, e.target.value)} ariaLabel='첫 번째 나눗셈 결과' />
      </Box>,
    ],
    [
      <Box hAlign='center'>
        <Input width='95px' value={inputs[9]} onChange={e => handleChange(9, e.target.value)} ariaLabel='두 번째 나눗셈 첫 번째 숫자' />
        <Typography>÷</Typography>
        <Input width='95px' value={inputs[10]} onChange={e => handleChange(10, e.target.value)} ariaLabel='두 번째 나눗셈 두 번째 숫자' />
        <Typography>=</Typography>
        <Input width='95px' value={inputs[11]} onChange={e => handleChange(11, e.target.value)} ariaLabel='두 번째 나눗셈 결과' />
      </Box>,
    ],
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
      vAlign='start'
    >
      <Box marginTop='10px'>
        <Table color={EStyleTableTypes.GRAY} sizes={['52px', '49px', 'auto', 'auto']}>
          <TableMathCaption caption='곱셈 나눗셈 테이블' math={[]} hidden />
          <TBody>
            {[
              [45, 6],
              [45, 8],
            ].map((value, index) => (
              <TR key={index}>
                {index === 0 && (
                  <TH scope='row' color={EStyleTableTypes.GRAY} rowSpan={2}>
                    {value[0]}
                  </TH>
                )}
                <TH scope='col' color={EStyleTableTypes.GRAY}>
                  {value[1]}
                </TH>
                <TD hAlign='center' color={EStyleTableTypes.GRAY}>
                  {tdArr[index * 2]}
                </TD>
                <TD hAlign='center' color={EStyleTableTypes.GRAY}>
                  {tdArr[index * 2 + 1]}
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Box>
    </Container>
  );
};

export default EMA01301;
