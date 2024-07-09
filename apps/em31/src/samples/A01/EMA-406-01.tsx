import { Box, Drawing, EImageType, ESvgType, IQuestionProps, Image, Label, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import arrow_dashed from '@/assets/icon/arrow_dashed02.svg';

const EMA40601 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '크기가 같은 각으로 각의 크기 비교하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' color='var(--color-white)' background='#969590' />
        <Box>
          <Typography fontSize='var(--font-size-36)' fontWeight='var(--font-weight-bold)' useGap={false}>
            가
          </Typography>
          와{' '}
          <Typography fontSize='var(--font-size-36)' fontWeight='var(--font-weight-bold)' useGap={false}>
            나
          </Typography>
          에 같은 크기의 붙임딱지를 이어 붙였습니다.
          <br />
          붙임딱지 수를 세어 보세요.
        </Box>
      </>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
      submitLabel='완료하기'
      onSubmit={() => {}}
    >
      <Box hAlign='center'>
        <Box position='relative' top='18px' left='20px'>
          <Box>
            <SvgIcon type={ESvgType.IMG} src={arrow_dashed} alt='오른쪽 방향 화살표' />
          </Box>
          <Box position='absolute' top='30px' left='-60px' whiteSpace='nowrap'>
            <Typography color='var(--color-yellow-800)' fontSize='var(--font-size-24)' weight='var(--font-weight-medium)' lineHeight='36px'>
              붙임딱지
            </Typography>
          </Box>
        </Box>
        <Box useRound border='4px solid var(--color-grey-100)' width='84px' height='134px' hAlign='center' marginRight='24px'>
          <Image
            src='../../assets/example/EMA-406-01/MC41203.jpg'
            width='36px'
            height='86px'
            type={EImageType.IMG}
            alt='각도 표시가 있는 붙임딱지가 한 개 있습니다.'
          />
        </Box>
        <Image
          src='../../assets/example/EMA-406-01/MC41202.jpg'
          width='495'
          height='122px'
          type={EImageType.IMG}
          alt='‘가＇에는 끝이 맞닿아 있는 두 선분 속에 붙임딱지 세 개가 이어 붙어 있고 각도 표시가 있습니다. ‘나＇에는 끝이 맞닿아 있는 두 선분 속에 붙임딱지 네 개가 이어 붙어 있고 각도 표시가 있습니다.'
        />
      </Box>
      <Box marginTop='24px' flex={1}>
        <Drawing />
      </Box>
    </Container>
  );
};
export default EMA40601;
