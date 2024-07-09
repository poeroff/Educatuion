import { Box, EStyleFontSizes, IQuestionProps, Image, Input, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM04501 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '여러 가지 장소의 길이를 나타내 보세요.',
  };

  const [isShow, setShow] = useState<boolean>(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onLink={() => {
        setShow(!isShow);
      }}
      submitLabel='채점하기'
      onSubmit={() => {}}
      vAlign='flex-start'
      useRound
    >
      <Box minHeight='514px' position='relative'>
        <Box display='flex' justifyContent='space-between'>
          <Box marginTop='13px' position='relative' width='329px' height='415px'>
            <Image src='/example/EM-045-01/scenery_pic1.png' alt='단양 고수동굴 1 킬로미터 395미터' size='100%' />
            <Box width='230px' position='absolute' bottom='35px' left='50%' transform='translateX(-50%)'>
              <Typography>1 km 395 m</Typography>
              <Box>
                <Typography>=</Typography>
                <Input
                  ariaLabel='1킬로미터 395미터를 미터로 바꾼 답 입력'
                  width='138px'
                  value={value1}
                  onChange={e => {
                    setValue1(e.target.value);
                  }}
                />
                <Typography>m</Typography>
              </Box>
            </Box>
          </Box>
          <Box position='absolute' left='50%' transform='translateX(-50%)' top='100px' zIndex={1} width='328px' height='414px'>
            <Image src='/example/EM-045-01/scenery_pic2.png' alt='포천 산정호수 둘레길 3200 미터' size='100%' />
            <Box width='265px' position='absolute' bottom='16px' left='50%' transform='translateX(-50%)'>
              <Box>
                <Input
                  width='52px'
                  ariaLabel='3200미터를 킬로미터로 바꾼 답 입력'
                  value={value2}
                  onChange={e => {
                    setValue2(e.target.value);
                  }}
                />
                <Typography>km</Typography>
                <Input
                  width='98px'
                  ariaLabel='3200미터를 키로미터와 미터로 표현했을때 미터 값'
                  value={value3}
                  onChange={e => {
                    setValue3(e.target.value);
                  }}
                />
                <Typography>m</Typography>
              </Box>
              <Typography>= 3200 m</Typography>
            </Box>
          </Box>
          <Box position='relative' width='329px' height='429px'>
            <Image src='/example/EM-045-01/scenery_pic3.png' alt='부산 광안대교 7킬로미터 420미터' size='100%' />
            <Box width='230px' position='absolute' bottom='30px' left='50%' transform='translateX(-50%)'>
              <Typography>7 km 420 m</Typography>
              <Box>
                <Typography>=</Typography>
                <Input
                  ariaLabel='7킬로미터 420미터를 미터로 바꾼 답 입력'
                  width='138px'
                  value={value4}
                  onChange={e => {
                    setValue4(e.target.value);
                  }}
                />
                <Typography>m</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box position='absolute' bottom='10px' right='40px'>
          <Typography size={EStyleFontSizes['X-SMALL']}>
            출처: 고수동굴, 2023. <br />
            &emsp;&emsp;&nbsp;산정호수, 2023. <br />
            &emsp;&emsp;&nbsp;부산시설공단, 2023.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default EM04501;
