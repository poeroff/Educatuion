import { Box, BoxWrap, IQuestionProps, Image, Input, Label, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM07701 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '분과 초의 관계 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box vAlign='baseline'>
        <Label value='ㄱ' lineColor='none' background='#969590' color='var(--color-white)' marginRight={12} />
        빈칸에 알맞은 수를 써넣으세요.
      </Box>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);
  const [value1, setValue1] = useState<string>('');

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
      useRound
    >
      <BoxWrap justifyContent='center'>
        <Box width='330px' height={404} hAlign='center' flexDirection='column'>
          <Image src='../../assets/example/EM-077-01/MC31606_1.jpg' alt='동그란 피자 한판' width='191px' height='191px' />
        </Box>

        <Box width='566px' hAlign='center' flexDirection='column'>
          <Box vAlign='center' flexDirection='column'>
            <Box display='inline-flex' height={48} width={526}>
              <Typography>부분</Typography>
              <Box marginTop={-35} width='54px' height='103px'>
                <Image src='../../assets/example/EM-077-01/MC31606.jpg' alt='동그란 피자 반판' width='54px' height='103px' />
              </Box>
              <Typography>은 전체</Typography>
              <Box marginTop={-35} width='110px' height='110px'>
                <Image src='../../assets/example/EM-077-01/MC31606_2.jpg' alt='동그란 피자 한판' width='110px' height='110px' />
              </Box>
              <Typography>를 똑같이</Typography>
            </Box>

            <Box display='inline-flex' marginTop='38px' height={52} width={526}>
              <Typography>2로 나눈 것 중의</Typography>
              <Input
                value={value1}
                width='50px'
                onChange={e => {
                  setValue1(e.target.value);
                }}
                ariaLabel='알맞은 수를 적어주세요'
              />
              <Box marginRight={12} marginTop={4}>
                <Typography useGap={false}>입니다.</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM07701;
