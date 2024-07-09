import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { Image, Box, TMainHeaderInfoTypes, Input, Typography, Label, IQuestionProps, SvgIcon, ESvgType } from '@maidt-cntn/ui';
import empty_square from '@/assets/icon/math_empty_square.svg';

const EM04201 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: <Typography color='var(--color-grey-900)'>길이 나타내기</Typography>,
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' color='var(--color-white)' background='#969590' />
        <Box display='flex' alignItems='center'>
          <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
          &nbsp;안에 알맞은 수를 써넣어 자를 완성해 보세요.
        </Box>
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');

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
      vAlign='start'
    >
      <Box position='relative'>
        <Box position='absolute' bottom='15px' left='49px'>
          <Input ariaLabel='1센치미터를 밀리미터로 나타냈을 때의 값' width='100px' value={value1} onChange={e => setValue1(e.target.value)} />
          <Input
            ariaLabel='4센치미터를 밀리미터로 나타냈을 때의 값'
            width='100px'
            marginLeft={139}
            value={value2}
            onChange={e => setValue2(e.target.value)}
          />
          <Input
            ariaLabel='7센치미터를 밀리미터로 나타냈을 때의 값'
            width='100px'
            marginLeft={138}
            value={value3}
            onChange={e => setValue3(e.target.value)}
          />
          <Input
            ariaLabel='9센치미터를 밀리미터로 나타냈을 때의 값'
            width='100px'
            marginLeft={59}
            value={value4}
            onChange={e => setValue4(e.target.value)}
          />
        </Box>
        <Image
          src='/example/EM-042-01/ruler.png'
          alt='자로 종이띠를 재고 있습니다. 2센티미터는 20밀리미터, 3센티미터는 30밀리미터 등이 적혀 있으므로 센티미터가 밀리미터 단위로 바뀌면 10배가 됩니다.'
          width='100%'
          height='190px'
        />
      </Box>
    </Container>
  );
};

export default EM04201;
