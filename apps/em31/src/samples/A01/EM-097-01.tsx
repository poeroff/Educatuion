import { Box, ESvgType, IQuestionProps, Image, Input, Scroll, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

import arrow_dashed from '@/assets/icon/arrow_dashed.svg';

const EM09701 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '문제',
    iconType: 'write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '학용품의 길이를 재어 보세요.',
  };

  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
    >
      <Scroll tabIndex={0}>
        <Box>
          <Box hAlign='space-between'>
            <Box vAlign='center'>
              <Image src='/example/EM-097-01/MC31508.ai.png' width='181px' height='301px' alt='지우개가 있습니다.' />
              <Box marginLeft='-25px'>
                <Box>
                  <Input placeholder='' name={`value1`} value={value} onChange={e => setValue(e.target.value)} width='52px' ariaLabel={`답 입력란`} />
                  <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
                    cm
                  </Typography>
                  <Input
                    placeholder=''
                    name={`value2`}
                    value={value2}
                    onChange={e => setValue2(e.target.value)}
                    width='52px'
                    ariaLabel={`답 입력란`}
                  />
                  <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
                    mm
                  </Typography>
                </Box>
                <Box marginTop='8px'>
                  <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
                    =
                  </Typography>
                  <Input
                    placeholder=''
                    name={`value3`}
                    value={value3}
                    onChange={e => setValue3(e.target.value)}
                    width='98px'
                    ariaLabel={`답 입력란`}
                  />
                  <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
                    mm
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box display='flex'>
              <Box position='relative' top='-43px' left='270px'>
                <Box transform='scaleX(-1) rotate(165deg)'>
                  <SvgIcon type={ESvgType.IMG} src={arrow_dashed} alt='아래쪽 방향 화살표' />
                </Box>
                <Box position='absolute' top='0' left='40px'>
                  <Typography color='var(--color-yellow-800)' fontSize='var(--font-size-24)' weight='var(--font-weight-medium)' lineHeight='36px'>
                    풀
                  </Typography>
                </Box>
              </Box>
              <Box vAlign='center' flexDirection='column'>
                <Image src='/example/EM-097-01/MC31507.ai.png' width='332px' height='149px' alt='풀이 있습니다.' />
                <Box marginRight='40px' marginTop='-32px'>
                  <Box>
                    <Input
                      placeholder=''
                      name={`value1`}
                      value={value}
                      onChange={e => setValue(e.target.value)}
                      width='52px'
                      ariaLabel={`답 입력란`}
                    />
                    <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
                      cm
                    </Typography>
                    <Input
                      placeholder=''
                      name={`value2`}
                      value={value2}
                      onChange={e => setValue2(e.target.value)}
                      width='52px'
                      ariaLabel={`답 입력란`}
                    />
                    <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
                      mm
                    </Typography>
                  </Box>
                  <Box marginTop='8px'>
                    <Typography>=</Typography>
                    <Input
                      placeholder=''
                      name={`value3`}
                      value={value3}
                      onChange={e => setValue3(e.target.value)}
                      width='98px'
                      ariaLabel={`답 입력란`}
                    />
                    <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
                      mm
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                position='relative'
                top='-35px'
                marginLeft='24px'
                type='paint'
                backgroundColor='#D9D9D9'
                width='94px'
                height='94px'
                vAlign='center'
              >
                자 교구
              </Box>
            </Box>
          </Box>
          <Box position='relative'>
            <Box position='absolute' left='30px'>
              <SvgIcon type={ESvgType.IMG} src={arrow_dashed} alt='위쪽 방향 화살표' />
              <Box position='relative' top='-30px' left='35px'>
                <Typography color='var(--color-yellow-800)' fontSize='var(--font-size-24)' weight='var(--font-weight-medium)' lineHeight='36px'>
                  지우개
                </Typography>
              </Box>
            </Box>
            <Box position='absolute' top='80px' left='100px'>
              <Box position='relative' left='75px' transform='rotate(130deg)'>
                <SvgIcon type={ESvgType.IMG} src={arrow_dashed} alt='오른쪽 방향 화살표' />
              </Box>
              <Box position='relative' top='-30px' left='58px'>
                <Typography color='var(--color-yellow-800)' fontSize='var(--font-size-24)' weight='var(--font-weight-medium)' lineHeight='36px'>
                  클립
                </Typography>
              </Box>
            </Box>
            <Box position='absolute' left='255px'>
              <Box vAlign='center'>
                <Image src='/example/EM-097-01/MC31506.ai.png' width='121px' height='194px' alt='클립이 있습니다.' />
                <Box marginLeft='-25px'>
                  <Box>
                    <Input
                      placeholder=''
                      name={`value1`}
                      value={value}
                      onChange={e => setValue(e.target.value)}
                      width='52px'
                      ariaLabel={`답 입력란`}
                    />
                    <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
                      cm
                    </Typography>
                    <Input
                      placeholder=''
                      name={`value2`}
                      value={value2}
                      onChange={e => setValue2(e.target.value)}
                      width='52px'
                      ariaLabel={`답 입력란`}
                    />
                    <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
                      mm
                    </Typography>
                  </Box>
                  <Box marginTop='8px'>
                    <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
                      =
                    </Typography>
                    <Input
                      placeholder=''
                      name={`value3`}
                      value={value3}
                      onChange={e => setValue3(e.target.value)}
                      width='98px'
                      ariaLabel={`답 입력란`}
                    />
                    <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
                      mm
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Scroll>
    </Container>
  );
};

export default EM09701;
