import { useState } from 'react';
import {
  Box,
  BoxWrap,
  IQuestionProps,
  Input,
  Label,
  TMainHeaderInfoTypes,
  Typography,
  Image,
  EStyleFontSizes,
  ITypography,
  Tag,
  ETagLine,
  Symbol,
  EStyleTableTypes,
  TBody,
  TD,
  TH,
  TR,
  Table,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EMA00301 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <BoxWrap flexDirection='column'>
        <Box hAlign='center' gap='12px' marginRight={0}>
          <Label type='icon' size='small' value={1} />
          구슬로 비누와 치약의 무게를 쟀습니다. 안에 알맞은 수나
        </Box>

        <Box marginLeft='5px'>말을 써넣으세요.</Box>
      </BoxWrap>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');

  const td_arr = [
    ['물건', '비누', '치약'],
    ['구슬', '30개', '42개'],
  ];

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
      <BoxWrap flexDirection='column' alignItems='center' marginTop='5px' paddingTop='20px'>
        <Box width='682px'>
          <Table useMathBorder color={EStyleTableTypes.YELLOW_TERTIARY} sizes={['149px', '266px', '266px']} caption='반별 인형수'>
            <TBody>
              {td_arr.map((item, index) => (
                <TR key={index}>
                  {item.map((value, idx) => {
                    if (index === 0 || idx === 0) {
                      return (
                        <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.YELLOW_TERTIARY}>
                          {value}
                        </TH>
                      );
                    } else
                      return (
                        <TD key={idx} hAlign='center' color={EStyleTableTypes.YELLOW_TERTIARY}>
                          {value}
                        </TD>
                      );
                  })}
                </TR>
              ))}
            </TBody>
          </Table>
        </Box>

        <Box hAlign='center' vAlign='center' marginTop='25px' marginRight={0}>
          <Box>
            <Input
              width='120px'
              value={value1}
              onChange={e => setValue1(e.target.value)}
              ariaLabel='구슬로 비누와 치약의 무게를 쟀을 때 더 많은 것을 적어주세요.'
            />
            <Typography style={{ paddingLeft: 0 }}>이/가</Typography>
          </Box>

          <Box>
            <Input
              width='120px'
              value={value2}
              onChange={e => setValue2(e.target.value)}
              ariaLabel='구슬로 비누와 치약의 무게를 쟀을 때 더 적은 것을 적어주세요.'
            />
            <Typography style={{ paddingLeft: 0 }}>보다 구슬</Typography>
          </Box>

          <Box>
            <Input
              width='120px'
              value={value3}
              onChange={e => setValue3(e.target.value)}
              ariaLabel='비누와 치약 무게의 차이만큼 구슬 수를 적어주세요.'
            />
            <Typography style={{ paddingLeft: 0 }}>개 만큼 더 무겁습니다.</Typography>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EMA00301;
