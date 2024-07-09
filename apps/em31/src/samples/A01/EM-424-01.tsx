import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  BoxWrap,
  IQuestionProps,
  TMainHeaderInfoTypes,
  Label,
  Image,
  SvgIcon,
  EStyleTableTypes,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  Input,
  TableMathCaption,
  Typography,
  EStyleFontSizes,
  Button,
  Scroll,
  EStyleButtonTypes,
  ESvgType,
  EImageType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import retry from '@/assets/icon/retry.svg';

const EM42401 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '각도 어림 놀이 하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='#969590' />
        각도 어림 놀이를 해 보세요.
      </>
    ),
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} vAlign='flex-start' useRound useExtend>
      <Scroll tabIndex={0}>
        <BoxWrap boxGap={12}>
          <Box>
            <Button color={EStyleButtonTypes.SECONDARY} width='120px' height='40px' aria-label='' useRound>
              <Box vAlign='center' gap='8px'>
                <SvgIcon src={retry} type={ESvgType.IMG} alt='다시 하기' />
                <Typography size={EStyleFontSizes['X-SMALL']} color='var(--color-grey-700)' useGap={false}>
                  다시 하기
                </Typography>
              </Box>
            </Button>
          </Box>
          <Box vAlign='center' flexDirection='column' padding='20px 31px' borderRadius='8px' position='relative'>
            <Typography size={EStyleFontSizes['X-MEDIUM']} useGap={false}>
              눈금이 없는 쪽이 보이도록
              <br />
              놓은 뒤 각을 만들어 보세요.
            </Typography>
            <Box vAlign='flex-start' marginTop='12px'>
              <Image
                src='../../assets/example/EM-424-01/MC41249.png'
                alt='보라색 원 위에 노란색 부채꼴 모양이 있고, 부채꼴에 각이 표시되어 있습니다.'
                width='200px'
              />
              <Button color={EStyleButtonTypes.SECONDARY} width='83px' height='44px' aria-label='' useRound>
                <Typography size={EStyleFontSizes['X-SMALL']} color='var(--color-grey-700)' useGap={false}>
                  뒤집기
                </Typography>
              </Button>
            </Box>
            <Background type={EImageType.IMG_BG} role='img' src='../../assets/example/EM-424-01/MC41249_bg.png' width='100%' height='100%' />
          </Box>
          <Box type='line' vAlign='center' flexDirection='column' padding='20px 31px' borderRadius='8px'>
            <Typography size={EStyleFontSizes['X-MEDIUM']} useGap={false}>
              만든 각의 각도를 어림하고
              <br />
              뒤집어서 확인해 보세요.
            </Typography>
            <Box marginTop='12px'>
              <Image
                src='../../assets/example/EM-424-01/MC41250.png'
                alt='보라색 원 위에 노란색 부채꼴 모양이 있고, 부채꼴에 각이 표시되어 있습니다. 보라색 원 바깥 쪽에는 눈금이 표시되어 있습니다.'
                width='228px'
              />
            </Box>
          </Box>
          <Box width='93px' height='93px' backgroundColor='var(--color-grey-100)'>
            <Typography useGap={false} size={EStyleFontSizes['SMALL']} style={{ lineHeight: '20px' }}>
              자 교구 버튼
            </Typography>
            <Typography useGap={false} size={EStyleFontSizes['X-SMALL']} style={{ fontSize: '10px', lineHeight: '20px' }}>
              (고객 검토 후 반영 예정)
            </Typography>
          </Box>
        </BoxWrap>
        <Box marginTop='24px' padding='0 24px'>
          <Table color={EStyleTableTypes.RED} sizes={['230px', '230px', '230px', '230px']}>
            <TableMathCaption caption='덧셈 테이블' math={[]} hidden />
            <THead>
              <TR>
                <TH scope='row' color={EStyleTableTypes.RED} height='67px'></TH>
                <TH scope='row' color={EStyleTableTypes.RED} vAlign='middle'>
                  1회
                </TH>
                <TH scope='row' color={EStyleTableTypes.RED} vAlign='middle'>
                  2회
                </TH>
                <TH scope='row' color={EStyleTableTypes.RED} vAlign='middle'>
                  3회
                </TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TH scope='row' color={EStyleTableTypes.RED} height='80px'>
                  어림한 각도
                </TH>
                <TD></TD>
                <TD></TD>
                <TD></TD>
              </TR>
              <TR>
                <TH scope='row' color={EStyleTableTypes.RED} height='80px'>
                  확인한 각도
                </TH>
                <TD></TD>
                <TD></TD>
                <TD></TD>
              </TR>
            </TBody>
          </Table>
        </Box>
      </Scroll>
    </Container>
  );
};

const Background = styled(Image)`
  position: absolute;
  top: 0;
  z-index: -1;
`;

export default EM42401;
