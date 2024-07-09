import { useState } from 'react';
import {
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleTableTypes,
  ESvgType,
  SvgIcon,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  Typography,
  Symbol,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import oIcon from '@/assets/example/EM-019-01/o_icon.png';
import xIcon from '@/assets/example/EM-019-01/x_icon.png';

const EM01901 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const dataList = [
    { key: 1, value: true },
    { key: 2, value: false },
    { key: 3, value: false },
    { key: 4, value: true },
    { key: 5, value: false },
    { key: 6, value: true },
  ];

  return (
    <Container
      headerInfo={null}
      background={'var(--color-white)'}
      submitBtnColor={EStyleButtonTypes.YELLOW}
      submitLabel='맞춤 학습하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <Box useFull>
        <Table color={EStyleTableTypes.DEFAULT} sizes={['154px', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto']}>
          <TableMathCaption math={[]} caption='최종 결과' hidden />
          <THead hidden>
            <TR>
              <TH scope='row'>문제</TH>
              <TH scope='row'>결과</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TH scope='row' color={EStyleTableTypes.DEFAULT}>
                문제
              </TH>
              {dataList.map(item => (
                <TD key={item.key} vAlign='middle' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                  {item.key}
                </TD>
              ))}
            </TR>
            <TR>
              <TH scope='row' color={EStyleTableTypes.DEFAULT}>
                결과
              </TH>
              {dataList.map(item => (
                <TD key={item.key} vAlign='middle' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                  {item.value ? <Symbol type='correct' /> : <Symbol type='incorrect' />}
                </TD>
              ))}
            </TR>
          </TBody>
        </Table>
        <Box marginTop='24px' hAlign='center'>
          <Typography>나는 6문제 중에서</Typography>
          <Typography size={EStyleFontSizes.LARGE} color='var(--color-blue-800)'>
            3
          </Typography>
          <Typography>문제를 맞혔어요.</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default EM01901;
