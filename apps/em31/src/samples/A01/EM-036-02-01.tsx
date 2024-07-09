import { useState } from 'react';
import { Box, BoxWrap, EStyleFontSizes, EStyleTableTypes, IQuestionProps, Input, Label, TBody, TD, TH, TR, Table, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';

const EM0360201 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={24} />
        우진이가 일주일 동안 한 운동별 시간을 나타낸 그래프입니다. 우진이가 축구를 한 시간은 농구를 한 시간보다 몇 시간 더 많은지 구해 보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [ans, setAns] = useState<string>('');

  const onSubmit = () => {
    setShow(!isShow);
  };

  const td_arr = [
    ['5', '', '', '', ''],
    [
      '4',
      <Box hAlign='center' width='100%'>
        <CircleIcon />
      </Box>,
      '',
      '',
      '',
    ],
    [
      '3',
      <Box hAlign='center' width='100%'>
        <CircleIcon />
      </Box>,
      '',
      '',
      <Box hAlign='center' width='100%'>
        <CircleIcon />
      </Box>,
    ],
    [
      '2',
      <Box hAlign='center' width='100%'>
        <CircleIcon />
      </Box>,
      '',
      <Box hAlign='center' width='100%'>
        <CircleIcon />
      </Box>,
      <Box hAlign='center' width='100%'>
        <CircleIcon />
      </Box>,
    ],
    [
      '1',
      <Box hAlign='center' width='100%'>
        <CircleIcon />
      </Box>,
      <Box hAlign='center' width='100%'>
        <CircleIcon />
      </Box>,
      <Box hAlign='center' width='100%'>
        <CircleIcon />
      </Box>,
      <Box hAlign='center' width='100%'>
        <CircleIcon />
      </Box>,
    ],
    [
      <Box position='relative'>
        <Box position='absolute' top='-40px' left='-5px'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>시간</Typography>
        </Box>
        <Box
          width='100px'
          height='120px'
          position='absolute'
          borderRight='1px solid var(--color-grey-200)'
          top='-8px'
          transform='rotate(56deg) translate(-93%, -24%)'
        ></Box>
        <Box position='absolute' top='-8px' right='0'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>운동</Typography>
        </Box>
      </Box>,
      '축구',
      '달리기',
      '농구',
      '줄넘기',
    ],
  ];

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
      <BoxWrap flexDirection='column' alignItems='center' justifyContent='center'>
        <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-900)'>
          일주일 동안 한 운동별 시간
        </Typography>

        <BoxWrap justifyContent='center' paddingTop='24px' paddingBottom='40px'>
          <Table color={EStyleTableTypes.YELLOW_SECONDARY} sizes={['100px', '100px', '100px', '100px', '100px']} caption='운동별 시간'>
            <TBody>
              {td_arr.map((item, index) => (
                <TR key={index}>
                  {item.map((value, idx) => {
                    if (index === td_arr.length - 1 || idx === 0) {
                      return (
                        <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                          {value}
                        </TH>
                      );
                    } else
                      return (
                        <TD key={idx} hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                          {value}
                        </TD>
                      );
                  })}
                </TR>
              ))}
            </TBody>
          </Table>
        </BoxWrap>

        <BoxWrap justifyContent='center' alignItems='center' marginBottom='10px'>
          <Input
            width='98px'
            inputSize='small'
            value={ans}
            onChange={event => setAns(event.target.value)}
            ariaLabel='축구를 한 시간과 농구를 한 시간의 차이 시간을 적어주세요.'
          />

          <Typography useGap={false}>시간</Typography>
        </BoxWrap>
      </BoxWrap>
    </Container>
  );
};

export default EM0360201;

const CircleIcon = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid var(--color-grey-900);
  border-radius: 50%;
  box-sizing: border-box;
  display: inline-block;
`;
