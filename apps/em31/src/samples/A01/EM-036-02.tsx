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
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import thumbRight from '@/assets/icon/thumb_right.svg';

const EM04301 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '물건의 길이 어림하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' color='var(--color-white)' background='#969590' />
        자신의 둘째 손가락의 너비와 길이를 어림하고 자로 재어 확인해 보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState(false);

  const th_arr = ['둘째 손가락', '어림한 길이', '잰 길이'];
  const td_arr = ['너비', '길이'];

  const onSubmit = () => {
    setShow(!isShow);
  };

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
      <Box display='flex' justifyContent='center'>
        <Table color={EStyleTableTypes.YELLOW_SECONDARY} sizes={['221px', '221px', '221px']}>
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
            {td_arr.map((value, index) => (
              <TR key={index}>
                <TH scope='col' hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                  {value}
                </TH>
                {Array(th_arr.length - 1)
                  .fill(null)
                  .map((_, index) => (
                    <TD key={index} hAlign='center' vAlign='middle' color={EStyleTableTypes.YELLOW_SECONDARY}>
                      <Typography>약</Typography>
                      <Input width='130px' value={''} onChange={() => {}} ariaLabel='' />
                    </TD>
                  ))}
              </TR>
            ))}
          </TBody>
        </Table>

        <SvgIcon src={thumbRight} height='219px' width='252px' />
      </Box>
    </Container>
  );
};

export default EM04301;
