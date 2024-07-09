import { Box, IQuestionProps, SvgIcon, Symbol, TMainHeaderInfoTypes, Image, BoxWrap, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '../../assets/icon/header_star.svg';
import dottedLine from '../../assets/icon/dotted_line.svg';

const EMA01101 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCheck',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <Box marginRight='12px' vAlign='center'>
          <SvgIcon src={headerIcon} size='36px' />
        </Box>
        더 큰 각에
        <Symbol type='correct' cssStyle={{ marginLeft: '10px', marginRight: '2px' }} />표 하세요.
      </Box>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
      vAlign='start'
    >
      <BoxWrap flexDirection='row' justifyContent='center' height='273px' marginTop='10px'>
        <BoxWrap justifyContent='space-around' alignItems='center' width='calc(100%/2 - 51px - 2px)'>
          <BoxWrap flexDirection='column' alignItems='center' justifyContent='flex-end' height='225px'>
            <Image
              src='../../assets/example/EMA-407-01/A-EM41-020002-0801_1.jpg'
              alt='각의 크기가 직각보다 작은 도형이 있습니다.'
              width='140px'
              height='67px'
            />
            <BoxWrap justifyContent='space-between' padding='4px 12px' width='183px' marginTop='66px' marginRight='25px'>
              <Typography useGap={false} weight={700}>
                (
              </Typography>
              <Typography useGap={false} weight={700}>
                )
              </Typography>
            </BoxWrap>
          </BoxWrap>

          <BoxWrap flexDirection='column' alignItems='center' justifyContent='flex-end' height='225px' marginRight='28px'>
            <Image
              src='../../assets/example/EMA-407-01/A-EM41-020002-0801_2.jpg'
              alt='각의 크기가 직각보다 큰 도형이 있습니다.'
              width='175px'
              height='67px'
            />
            <BoxWrap justifyContent='space-between' padding='4px 12px' width='183px' marginTop='66px'>
              <Typography useGap={false} weight={700}>
                (
              </Typography>
              <Typography useGap={false} weight={700}>
                )
              </Typography>
            </BoxWrap>
          </BoxWrap>
        </BoxWrap>

        <Box width='2px' height='202px' marginRight={0} marginTop='24px'>
          <SvgIcon src={dottedLine} width='2px' height='202px' />
        </Box>

        <BoxWrap justifyContent='space-around' alignItems='center' width='calc(100%/2 - 51px - 2px)'>
          <BoxWrap flexDirection='column' alignItems='center' justifyContent='flex-end' height='225px' marginLeft='22px'>
            <Image
              src='../../assets/example/EMA-407-01/A-EM41-020002-0801_3.jpg'
              alt='각의 크기가 직각보다 큰 도형이 있습니다.'
              width='174px'
              height='101px'
            />
            <BoxWrap justifyContent='space-between' padding='4px 12px' width='183px' marginTop='66px'>
              <Typography useGap={false} weight={700}>
                (
              </Typography>
              <Typography useGap={false} weight={700}>
                )
              </Typography>
            </BoxWrap>
          </BoxWrap>

          <BoxWrap flexDirection='column' alignItems='center' justifyContent='flex-end' height='225px'>
            <Image
              src='../../assets/example/EMA-407-01/A-EM41-020002-0801_4.jpg'
              alt='각의 크기가 직각보다 작은 도형이 있습니다.'
              width='147px'
              height='100px'
            />
            <BoxWrap justifyContent='space-between' padding='4px 12px' width='183px' marginTop='66px' marginLeft='30px'>
              <Typography useGap={false} weight={700}>
                (
              </Typography>
              <Typography useGap={false} weight={700}>
                )
              </Typography>
            </BoxWrap>
          </BoxWrap>
        </BoxWrap>
      </BoxWrap>
    </Container>
  );
};

export default EMA01101;
