import styled from '@emotion/styled';
import { Box, EImageType, IQuestionProps, Image, Input, Label, OverlayTooltip, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

import bear from '../../assets/example/EM-037-05/otter.svg';
import arrow from '../../assets/example/EM-037-05/ArrowFatRight.svg';

const EM03705 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '26÷6을 맞게 계산했는지 확인하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' color='var(--color-white)' background='#969590' />
        묶은 그림을 식으로 나타내어 확인해 보세요.
      </>
    ),
  };

  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
      submitLabel='채점하기'
      onSubmit={() => {}}
    >
      <Box hAlign='center' padding='8px 7px'>
        <Image
          src='../../assets/example/EM-037-05/MC32312.jpg'
          type={EImageType.IMG}
          alt='구슬 26개를 6개씩 묶으면 4묶음이 되고 나머지는 2개입니다.'
          width='680px'
          height='104px'
        />
      </Box>
      <Box marginTop='24px' useRound type='dashed' width='684px' height='256px' hAlign='center'>
        <Box display='flex' height='208px'>
          <Box>
            <Box hAlign='center'>
              <Typography fontSize='var(--font-size-36)' lineHeight='58px' color='var(--color-pink-800)'>
                6
              </Typography>
              <Box display='inline' padding='13px 12px'>
                <Typography useGap={false}>X</Typography>
              </Box>
              <Input placeholder='' name={`value1`} value={value} onChange={e => setValue(e.target.value)} width='65px' ariaLabel={`답 입력란`} />
              <Typography>=</Typography>
            </Box>
            <Box hAlign='center' marginTop='-20px' marginLeft='-87px'>
              <Typography fontSize='var(--font-size-20)' lineHeight='58px' color='var(--color-pink-800)' useGap={false}>
                나누는 수
              </Typography>
              <Box marginLeft='54px'>
                <Typography fontSize='var(--font-size-20)' lineHeight='58px' color='var(--color-blue-800)' useGap={false}>
                  몫
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box width='80px' height='188px' background='var(--color-yellow-100)' useRound hAlign='center' flexDirection='column'>
            <Typography fontSize='var(--font-size-36)'>24</Typography>
            <Box marginTop='12px' marginBottom='12px'>
              <SvgIcon src={arrow} width='32px' height='32px' />
            </Box>

            <Typography fontSize='var(--font-size-36)'>24</Typography>
          </Box>
          <Box hAlign='end' flexDirection='column'>
            <Box hAlign='center'>
              <Typography>+</Typography>
              <Input placeholder='' name={`value2`} value={value2} onChange={e => setValue2(e.target.value)} width='65px' ariaLabel={`답 입력란`} />
              <Typography>=</Typography>
              <Input placeholder='' name={`value3`} value={value3} onChange={e => setValue3(e.target.value)} width='65px' ariaLabel={`답 입력란`} />
            </Box>
            <Box hAlign='center' marginTop='4px' marginRight='-90px'>
              <Typography fontSize='var(--font-size-20)' color='var(--color-yellow-700)' useGap={false} lineHeight='none'>
                나머지
              </Typography>
              <Box marginLeft='34px'>
                <Typography fontSize='var(--font-size-20)' color='var(--color-green-800)' useGap={false} lineHeight='none'>
                  나누어지는 수
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box hAlign='end' position='relative'>
        <BearBalloon>
          <Box>
            <OverlayTooltip type='cloud' place='top'>
              <Typography useGap={false} fontSize='var(--font-size-16)' lineHeight='none' color='var(--color-pink-800)'>
                나누는 수
              </Typography>
              와
              <Typography useGap={false} fontSize='var(--font-size-16)' lineHeight='none' color='var(--color-blue-800)'>
                몫
              </Typography>
              을 곱하고
              <br />
              <Typography useGap={false} fontSize='var(--font-size-16)' lineHeight='none' color='var(--color-yellow-700)'>
                나머지
              </Typography>
              를 더하면
              <br />
              <Typography useGap={false} fontSize='var(--font-size-16)' lineHeight='none' color='var(--color-green-800)'>
                나누어지는 수
              </Typography>
              가 돼요.
            </OverlayTooltip>
          </Box>
        </BearBalloon>
      </Box>
    </Container>
  );
};

export default EM03705;

const BearBalloon = styled.span`
  position: absolute;
  top: -200px;
  right: -10px;
  background: url(${bear}) bottom no-repeat;
  height: 212px;
  width: 208px;
`;
