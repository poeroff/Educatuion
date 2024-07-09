import { useState } from 'react';
import { Box, IQuestionProps, Input, SvgIcon, Table, EStyleTableTypes, TableMathCaption, THead, TR, TH, TBody, TD, TFoot } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '../../assets/icon/m_default_01.svg';

const EMA00201 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        빈칸에 두 수의 합을 써넣으세요.
      </>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      useRound
      onSubmit={() => {
        setShow(!isShow);
      }}
      vAlign='start'
    >
      <Box display='flex' justifyContent='center'>
        <Table color={EStyleTableTypes.DEFAULT} sizes={['224px', '224px']}>
          <TableMathCaption caption='515 + 947의 답' math={['515', '+', '947']} hidden />
          <THead>
            <TR>
              {['515', '947'].map((item, idx) => {
                return (
                  <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                    {item}
                  </TH>
                );
              })}
            </TR>
          </THead>
          <TBody>
            <TR>
              <TD colSpan={2} hAlign='center' color={EStyleTableTypes.DEFAULT}>
                <Input
                  ariaLabel='515+947의 답'
                  width='432px'
                  textAlign='center'
                  value={value}
                  onChange={e => {
                    setValue(e.target.value);
                  }}
                />
              </TD>
            </TR>
          </TBody>
        </Table>
      </Box>
    </Container>
  );
};

export default EMA00201;
