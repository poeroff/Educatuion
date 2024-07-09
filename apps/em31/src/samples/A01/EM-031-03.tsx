import { useState } from 'react';
import { Box, TMainHeaderInfoTypes, Label, Input, IQuestionProps, SvgIcon, Typography, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import ArrowFatRight from '@/assets/icon/arrow_fat_right.svg';

const EM03103 = () => {
  const [value, setValue] = useState<string>('');
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '나눗셈식으로 나타내기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' type='paint' background='#969590' color='var(--color-white)' />
        <Box hAlign='center' alignItems='center'>
          <Input inputSize='x-small' disabled={true} width='48px' ariaLabel='빈 칸' />
          <Typography fontSize='var(--font-size-36)' useGap={false}>
            &nbsp;안에 알맞은 수를 써넣으세요.
          </Typography>
        </Box>
      </>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setValue(value);
  };
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
      vAlign='flex-start'
    >
      <BoxWrap flexDirection='column' alignItems='center'>
        <Box display='contents' vAlign='flex-start' width={840} margin='4px 12px' lineHeight='54px'>
          <Typography fontSize='var(--font-size-36)' lineHeight='var(--font-size-54)' fontWeight='var(--font-weight-500)'>
            바둑돌 12개를 주머니 3개에 똑같이 나누어 넣으면
          </Typography>
          <Box display='flex' hAlign='center'>
            <Typography fontSize='var(--font-size-36)' lineHeight='var(--font-size-54)' fontWeight='var(--font-weight-500)'>
              주머니 한 개에 넣을 수 있는 바둑돌은&nbsp;
            </Typography>
            <Input inputSize='x-small' disabled={true} width='48px' ariaLabel='나눗셈의 몫' />
            <Typography fontSize='var(--font-size-36)' lineHeight='var(--font-size-54)' fontWeight='var(--font-weight-500)' useGap={false}>
              개입니다.
            </Typography>
          </Box>
        </Box>

        <Box hAlign='center' marginTop={32}>
          <SvgIcon alt='' src={ArrowFatRight} size='32px' />
          <Box display='flex' hAlign='center'>
            <Typography fontSize='var(--font-size-36)' lineHeight='var(--font-size-54)' fontWeight='var(--font-weight-500)'>
              12를 3으로 나누면
            </Typography>
            <Input
              value={value}
              onChange={e => handleChange(e.target.value)}
              inputSize='x-small'
              width='48px'
              ariaLabel='12 나누기 3의 몫을 입력하세요.'
            />
            <Typography fontSize='var(--font-size-36)' lineHeight='var(--font-size-54)' fontWeight='var(--font-weight-500)' useGap={false}>
              입니다.
            </Typography>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM03103;
