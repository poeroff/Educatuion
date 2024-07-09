import { useState } from 'react';
import { Box, IQuestionProps, Label, TMainHeaderInfoTypes, Symbol, Typography, SvgIcon, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '../../assets/icon/m_default_01.svg';

const EMA3201701 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathTween',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <Box vAlign='center'>
          알맞은 말에&nbsp;
          <Box>
            <Symbol type='correct' />
          </Box>
          &nbsp;표 하세요.
        </Box>
      </>
    ),
  };

  const [isShow, setShow] = useState(false);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => setShow(!isShow)}
      vAlign='flex-start'
    >
      <BoxWrap flexDirection='column' gap={24}>
        <Box marginRight={'unset'} display='flex'>
          <Box display='flex' alignItems='center'>
            <Label type='dot'></Label>
          </Box>
          <Box>
            <Typography fontSize='var(--font-size-28)' lineHeight='42px' weight='var(--font-weight-medium)'>
              수박은 귤보다 더 ( 무겁습니다 , 가볍습니다 ).
              <Symbol type='correct' size={40} cssStyle={{ position: 'absolute', left: '302px', top: '2' }} />
            </Typography>
          </Box>
        </Box>

        <Box display='flex'>
          <Box display='flex' alignItems='center'>
            <Label type='dot'></Label>
          </Box>
          <Box>
            <Typography fontSize='var(--font-size-28)' lineHeight='42px' weight='var(--font-weight-medium)'>
              수컵은 욕조보다 담을 수 있는 양이 더 ( 많습니다 , 적습니다 ).
              <Symbol type='correct' size={40} cssStyle={{ position: 'absolute', left: '652px', top: '2' }} />
            </Typography>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EMA3201701;
