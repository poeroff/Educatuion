import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { Image, Box, TMainHeaderInfoTypes, Input, Typography, Label, IQuestionProps, EImageType } from '@maidt-cntn/ui';

const EM04201 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '시간의 덧셈하기',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        <Label value='ㄱ' type='paint' background='#969590' color='var(--color-white)' marginRight={12} />
        버스의 도착 예정 시각을 그림으로 알아보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

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
      <Box display='flex' flexDirection='column' alignItems='center' paddingBottom='10px'>
        <Box position='relative'>
          <Box position='absolute' top='33px' left='15px'>
            <Typography>
              지금은 8시 5분 10초이고 버스는 2분 20초 후에 도착 예정이래. <br /> 버스의 도착 예정 시각을 어떻게 알 수 있을까?
            </Typography>
          </Box>
          <Image type={EImageType.IMG_BG} src='/example/EM-047-01/image_bg.png' width='822px' height='159px' />
        </Box>

        <Box position='relative' type='dashed' useRound padding='25px 20px 16px 20px' marginTop='24px'>
          <Box position='absolute' top='20px' right='86px'>
            <Input ariaLabel='8시 5분 10초에서 2분 20초 후의 분을 입력하세요' width='52px' value={value1} onChange={e => setValue1(e.target.value)} />
            <Input
              ariaLabel='8시 5분 10초에서 2분 20초 후의 초를 입력하세요'
              width='98px'
              value={value2}
              onChange={e => setValue2(e.target.value)}
              marginLeft={39}
            />
          </Box>
          <Image
            src='/example/EM-047-01/image_bg1.png'
            alt='8시 5분부터 8시 8분까지 10초 단위로 나타내고, 8시 5분 10초에서 2분 20초 후의 시각을 나타낸 그림입니다.'
            width='758px'
            height='222px'
          />
        </Box>
      </Box>
    </Container>
  );
};

export default EM04201;
