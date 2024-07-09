import { useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  IQuestionProps,
  Typography,
  List,
  SvgIcon,
  Scroll,
  Radio,
  EStyleFontSizes,
  Table,
  EStyleTableTypes,
  THead,
  TD,
  TH,
  TR,
  TBody,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow from '../../assets/icon/double_arrow.svg';

const data = [
  'I like to put things together.',
  'I like clear rules.',
  'I like making plans.',
  'I like to play outside.',
  'I like volunteering.',
  'I like making new friends.',
  'I like talking in front of people.',
  'I like to put things together.',
  'I like clear rules.',
  'I like making plans.',
  'I like to play outside.',
  'I like volunteering.',
  'I like making new friends.',
  'I like talking in front of people.',
  'I like talking in front of people.',
];

const ME12801 = () => {
  const [radio, setRadio] = useState<number[]>(Array(data.length).fill(0));
  const onClickRadio = (number: number, clickRadio: number) => {
    setRadio(prev => prev.map((value, index) => (index === number ? clickRadio : value)));
  };

  const [radioCountData, setRadioCountDatao] = useState<number[]>(Array(data.length / 3).fill(0));
  // 완료하기를 누르고 난 후 radio[3 * index] + radio[3 * index + 1] + radio[3 * index + 2]값을 각 index에 맞게 넣어주면 표에 알맞게 뿌려짐
  const maxCountIndex = 4;
  // 완료하기를 누르고 난 후 radioCountData의 값중 가장 큰 값을 가지고 있는 index값을 maxCountIndex안에 넣어주면 td에 빨간색
  // 초기값 : null 입니다. 임시로 4를 할당하였습니다.

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'funny',
    headerText: 'Tell Your Story',
    headerTextColor: 'var(--color-purple-1000)',
  };

  const questionInfo: IQuestionProps = {
    text: '설문을 통해 자신의 성향을 알아봅시다.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} submitLabel='완료하기' onSubmit={() => {}} useScroll={false}>
      <Box hAlign='flex-end' paddingRight='20px'>
        <Box width='255px' hAlign='space-between'>
          <Typography fontSize='var(--font-size-18)' lineHeight='28px' useGap={false}>
            전혀 아니다
          </Typography>
          <SvgIcon src={arrow} width='21px' height='12px' />
          <Typography fontSize='var(--font-size-18)' lineHeight='28px' useGap={false}>
            매우 그렇다
          </Typography>
        </Box>
      </Box>
      <Scroll height='386px'>
        <List gap={4} data={data}>
          {({ value, index = 1 }) => (
            <Box display='flex'>
              <Box flex={1}>
                <Box marginRight='4px' display='inline'>
                  <Typography>({index})</Typography>
                </Box>
                <Typography>{value}</Typography>
              </Box>
              <Box marginLeft='8px'>
                {[...Array(5)].map((__, radioIndex) => (
                  <Radio
                    name={`radio-${index}`}
                    value={radio[index] === radioIndex + 1}
                    onClick={() => onClickRadio(index - 1, radioIndex + 1)}
                    type='box'
                    gap={4}
                  >
                    <Box width='22px' textAlign='center'>
                      {radioIndex + 1}
                    </Box>
                  </Radio>
                ))}
              </Box>
            </Box>
          )}
        </List>

        <Box marginTop='48px'>
          <Box background='blue' padding='0 20px' width='fit-content' borderRadius='8px' border='1px solid #275CE7' marginBottom='8px'>
            <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-blue-900)'>
              설문 결과
            </Typography>
          </Box>
          <Table color={EStyleTableTypes.DEFAULT} sizes={['176px', '176px', '176px', '176px', '176px']}>
            <THead>
              <TR>
                <TH color={EStyleTableTypes.DEFAULT} scope='col'>
                  1~3번
                </TH>
                <TH color={EStyleTableTypes.DEFAULT} scope='col'>
                  4~6번
                </TH>
                <TH color={EStyleTableTypes.DEFAULT} scope='col'>
                  7~9번
                </TH>
                <TH color={EStyleTableTypes.DEFAULT} scope='col'>
                  10~12번
                </TH>
                <TH color={EStyleTableTypes.DEFAULT} scope='col'>
                  13~15번
                </TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                {radioCountData.map((__, index) => (
                  <TD
                    color={maxCountIndex !== index ? EStyleTableTypes.DEFAULT : EStyleTableTypes.ENGLISH_POINT}
                    height='56px'
                    hAlign='center'
                    vAlign='middle'
                  >
                    {!!radioCountData[index] && radioCountData[index]}
                  </TD>
                ))}
              </TR>
            </TBody>
          </Table>
        </Box>
      </Scroll>
    </Container>
  );
};

export default ME12801;
