import { useState } from 'react';
import { Box, ESvgType, IQuestionProps, Input, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import star from '../../assets/icon/header_star.svg';
import empty_square from '@/assets/icon/math_empty_square.svg';

const EM04301 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCheck2',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={star} size='36px' />
        <Box vAlign='center'>
          <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
          &nbsp;안에 알맞은 수를 써넣으세요.
        </Box>
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const onSubmit = () => {
    setShow(!isShow);
  };

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');
  const [value5, setValue5] = useState<string>('');
  const [value6, setValue6] = useState<string>('');
  const [value7, setValue7] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={onSubmit}
      submitLabel='채점하기'
      useRound
      vAlign='flex-start'
    >
      <Box vAlign='center'>
        <Typography>40초+50초=</Typography>
        <Input
          ariaLabel='40초 더하기 50초 했을 때 분을 입력하세요'
          marginLeft={8}
          value={value1}
          onChange={e => {
            setValue1(e.target.value);
          }}
          width='98px'
        />
        분
        <Input
          ariaLabel='40초 더하기 50초 했을 때 초를 입력하세요'
          marginLeft={24}
          value={value2}
          onChange={e => {
            setValue2(e.target.value);
          }}
          width='98px'
        />
        초
      </Box>
      <Box vAlign='center' marginTop='24px'>
        <Typography>1분 15초-30초=</Typography>
        <Input
          ariaLabel='1분 15초 빼기 30초 했을 때 초를 입력하세요'
          marginLeft={8}
          value={value3}
          onChange={e => {
            setValue3(e.target.value);
          }}
          width='98px'
        />
        초
      </Box>
      <Box vAlign='center' marginTop='24px'>
        <Typography>20분 35초+18분 45초=</Typography>
        <Input
          ariaLabel='20분 35초 더하기 18분 45초 했을 때 분을 입력하세요'
          marginLeft={8}
          value={value4}
          onChange={e => {
            setValue4(e.target.value);
          }}
          width='98px'
        />
        분
        <Input
          ariaLabel='20분 35초 더하기 18분 45초 했을 때 초를 입력하세요'
          marginLeft={24}
          value={value5}
          onChange={e => {
            setValue5(e.target.value);
          }}
          width='98px'
        />
        초
      </Box>
      <Box vAlign='center' marginTop='24px'>
        <Typography>33분 20초-10분 37초=</Typography>
        <Input
          ariaLabel='33분 20초 빼기 10분 37초 했을 때 분을 입력하세요'
          marginLeft={8}
          value={value6}
          onChange={e => {
            setValue6(e.target.value);
          }}
          width='98px'
        />
        분
        <Input
          ariaLabel='33분 20초 빼기 10분 37초 했을 때 초를 입력하세요'
          marginLeft={24}
          value={value7}
          onChange={e => {
            setValue7(e.target.value);
          }}
          width='98px'
        />
        초
      </Box>
    </Container>
  );
};

export default EM04301;
