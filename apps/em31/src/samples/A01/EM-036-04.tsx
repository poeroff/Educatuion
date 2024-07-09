import { useState } from 'react';
import {
  Box,
  EStyleTableTypes,
  ESvgType,
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
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import arrow_dashed from '@/assets/icon/arrow_dashed.svg';

const EM03604 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        깃털을 한 명에게 3개씩 나누어 주려고 합니다. 준비한 깃털 수에 따라 남는 깃털 수가 될 수 있는 수를 알아보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [ans, setAns] = useState<string[]>(Array(8).fill(''));

  const th_arr = ['', '24÷3', '25÷3', '26÷3', '27÷3', '28÷3', '29÷3'];
  const td_arr = ['나누어 줄 수 있는 친구 수(명)', '남은 깃털 수(개)'];

  const onSubmit = () => {
    setShow(!isShow);
  };

  const handleInputChange = (index: number, value: string) => {
    const newAns = [...ans];
    newAns[index] = value;
    setAns(newAns);
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={onSubmit}
      submitLabel='채점하기'
      useRound
      vAlign='flex-start'
    >
      <Box>
        <Label value='ㄷ' color='var(--color-white)' background='#969590' marginRight={20} />
        <Typography useGap={false} lineHeight='58px'>
          표를 완성하여 준비한 깃털 수에 따라 남는 깃털 수를 구해 보세요.
        </Typography>
      </Box>
      <Box position='relative'>
        <Box position='absolute' bottom='120px' left='45px'>
          <Box transform='rotate(124deg)'>
            <SvgIcon type={ESvgType.IMG} src={arrow_dashed} alt='아래쪽 방향 화살표' />
          </Box>
          <Box position='absolute' top='30px' left='-30px'>
            <Typography color='var(--color-yellow-800)' fontSize='var(--font-size-24)' weight='var(--font-weight-medium)' lineHeight='36px'>
              몫
            </Typography>
          </Box>
        </Box>
        <Box position='absolute' bottom='30px' left='45px'>
          <Box transform='rotate(124deg)'>
            <SvgIcon type={ESvgType.IMG} src={arrow_dashed} alt='아래쪽 방향 화살표' />
          </Box>
          <Box position='absolute' top='30px' left='-50px' whiteSpace='nowrap'>
            <Typography color='var(--color-yellow-800)' fontSize='var(--font-size-24)' weight='var(--font-weight-medium)' lineHeight='36px'>
              나머지
            </Typography>
          </Box>
        </Box>
        <Box hAlign='end' marginTop='24px'>
          <Table color={EStyleTableTypes.YELLOW_SECONDARY} sizes={['372px', '75px', '75px', '75px', '75px', '75px', '75px']}>
            <THead>
              <TR>
                {th_arr.map((item, idx) => {
                  return (
                    <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                      {item}
                    </TH>
                  );
                })}
              </TR>
            </THead>
            <TBody>
              {td_arr.map((value, rowIndex) => (
                <TR key={rowIndex}>
                  <TH scope='col' hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                    {value}
                  </TH>
                  {Array(th_arr.length - 1)
                    .fill(null)
                    .map((_, colIndex) => {
                      const inputIndex = rowIndex * (th_arr.length - 1) + colIndex;
                      return (
                        <TD key={colIndex} hAlign='center' vAlign='middle' color={EStyleTableTypes.YELLOW_SECONDARY}>
                          {(rowIndex === 0 && colIndex === 0) || (rowIndex === 0 && colIndex === 1) ? (
                            <Typography fontSize='var(--font-size-24)' lineHeight='36px'>
                              8
                            </Typography>
                          ) : rowIndex === 1 && colIndex === 0 ? (
                            <Typography fontSize='var(--font-size-24)' lineHeight='36px'>
                              0
                            </Typography>
                          ) : rowIndex === 1 && colIndex === 1 ? (
                            <Typography fontSize='var(--font-size-24)' lineHeight='36px'>
                              1
                            </Typography>
                          ) : (
                            <Input
                              width='52px'
                              value={ans[inputIndex]}
                              onChange={event => handleInputChange(inputIndex, event.target.value)}
                              ariaLabel='답을 입력하세요.'
                            />
                          )}
                        </TD>
                      );
                    })}
                </TR>
              ))}
            </TBody>
          </Table>
        </Box>
      </Box>
    </Container>
  );
};

export default EM03604;
