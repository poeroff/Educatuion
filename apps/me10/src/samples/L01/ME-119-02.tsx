import { useState } from 'react';
import { Box, IQuestionProps, Label, Image, TMainHeaderInfoTypes, Typography, Textarea } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const ME11902 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const [value, setValue] = useState<string>('');
  const [value1, setValue1] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'words',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고, 표현의 의미를 추측해서 써 봅시다.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='center'
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='완료하기'
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box vAlign='flex-start'>
          <Box width='448px' flexDirection='row' paddingRight='24px'>
            <Box display='flex' justifyContent='center' flex='8px' paddingBottom='2px'>
              <Label size='number' type='line'>
                <Typography useGap={false} weight='var(--font-weight-bold)' align='center' lineHeight='42px'>
                  1
                </Typography>
              </Label>
              <Box margin='0 6px 8px 6px'>
                <Image
                  src='/example/ME-119-02-P01.png'
                  alt='교복을 입고 책상 위 책가방에 책을 넣고있는 남자 이미지 입니다.'
                  width='268px'
                  height='256px'
                />
                <Box display='flex' justifyContent='center'>
                  <Typography useGap={false} weight='var(--font-weight-bold)' lineHeight='42px'>
                    get ready for school
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box flexDirection='column'>
              <Textarea
                height='94px'
                onChange={e => {
                  setValue(e.target.value);
                }}
                placeholder='내용을 넣어 주세요.'
                ariaLabel='그림을 참고하여 사용된 표현의 의미를 적어주세요.'
              />
            </Box>
          </Box>

          <Box width='448px' flexDirection='row'>
            <Box display='flex' justifyContent='center' flex='8px' paddingBottom='2px'>
              <Label size='number' type='line'>
                <Typography useGap={false} weight='var(--font-weight-bold)' align='center' lineHeight='42px'>
                  2
                </Typography>
              </Label>

              <Box margin='0 6px 8px 6px'>
                <Image src='/example/ME-119-02-P02.png' alt='교복을 입은 남자가 버스 정거장에 서 있는 이미지 입니다.' width='268px' height='256px' />
                <Box display='flex' justifyContent='center'>
                  <Typography useGap={false} weight='var(--font-weight-bold)' lineHeight='42px'>
                    wait for the bus
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box flexDirection='column'>
              <Textarea
                height='94px'
                onChange={e => {
                  setValue1(e.target.value);
                }}
                placeholder='내용을 넣어 주세요.'
                ariaLabel='그림을 참고하여 사용된 표현의 의미를 적어주세요.'
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ME11902;
