import { useState } from 'react';
import { Box, Label, Typography, EStyleFontSizes, Input, IQuestionProps, Table, EStyleTableTypes, TBody, TR, TH, TD, THead } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM03601 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        해열제를 종류별로 하루 동안 먹을 수 있는 횟수를 구해보세요.
      </>
    ),
  };
  const [isShow, setShow] = useState<boolean>(false);
  const [ans1, setAns1] = useState<string>('');
  const [ans2, setAns2] = useState<string>('');
  const [ans3, setAns3] = useState<string>('');
  const [ans4, setAns4] = useState<string>('');
  const [ans5, setAns5] = useState<string>('');
  const [ans6, setAns6] = useState<string>('');
  const [ans7, setAns7] = useState<string>('');

  const th_arr = ['해열제', '하루(시간)', '먹는 시간 간격(시간)', '나눗셈', '먹을 수 있는 횟수(회)'];
  const td_arr = [
    [
      '다나',
      24,
      4,
      '24÷4',
      <Input width='130px' inputSize='small' value={ans1} onChange={event => setAns1(event.target.value)} ariaLabel='다나의 먹을 수 있는 횟수(회)' />,
    ],
    [
      '시원',
      24,
      <Input width='130px' inputSize='small' value={ans2} onChange={event => setAns2(event.target.value)} ariaLabel='시원의 먹는 시간 간격(시간)' />,
      <Input width='130px' inputSize='small' value={ans3} onChange={event => setAns3(event.target.value)} ariaLabel='시원의 나눗셈' />,
      <Input width='130px' inputSize='small' value={ans4} onChange={event => setAns4(event.target.value)} ariaLabel='시원의 먹을 수 있는 횟수(회)' />,
    ],
    [
      '튼튼',
      24,
      <Input width='130px' inputSize='small' value={ans5} onChange={event => setAns5(event.target.value)} ariaLabel='튼튼의 먹는 시간 간격(시간)' />,
      <Input width='130px' inputSize='small' value={ans6} onChange={event => setAns6(event.target.value)} ariaLabel='튼튼의 먹는 시간 간격(시간)' />,
      <Input width='130px' inputSize='small' value={ans7} onChange={event => setAns7(event.target.value)} ariaLabel='튼튼의 먹을 수 있는 횟수(회)' />,
    ],
  ];
  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
      vAlign='start'
    >
      <Box display='flex'>
        <Box height={'72px'} display='flex' alignItems='center'>
          <Label value='ㄴ' lineColor='none' background='#969590' color='var(--color-white)' />
        </Box>
        <Box marginLeft='8px'>
          <Typography size={EStyleFontSizes.LARGE}>표를 완성하여 해열제 종류별로 하루 동안 먹을 수 있는 횟수를 구해보세요.</Typography>
        </Box>
      </Box>
      <Box marginTop='24px'>
        <Table color={EStyleTableTypes.TERTIARY} sizes={['110px', '149px', 'auto', '142px', 'auto']}>
          <THead>
            <TR>
              {th_arr.map((item, idx) => {
                return (
                  <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                    {item}
                  </TH>
                );
              })}
            </TR>
          </THead>
          <TBody>
            {td_arr.map((item, index) => (
              <TR key={index}>
                {item.map((value, index) => {
                  return (
                    <TD key={index} hAlign='center' color={EStyleTableTypes.TERTIARY}>
                      {value}
                    </TD>
                  );
                })}
              </TR>
            ))}
          </TBody>
        </Table>
      </Box>
    </Container>
  );
};

export default EM03601;
