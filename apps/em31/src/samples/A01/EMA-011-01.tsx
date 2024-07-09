import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, IQuestionProps, Input, Tag, ETagLine, Typography, BottomSheet, SvgIcon, Symbol, ESvgType, List } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '../../assets/icon/m_default_01.svg';
import empty_square from '@/assets/icon/math_empty_square.svg';

const EMA01101 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <Box>
          <Box vAlign='center'>
            1부터 9까지의 수 중에서&nbsp;
            <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
            &nbsp;안에 들어갈 수 있는 수를
          </Box>
          <Box vAlign='center'>
            모두 찾아&nbsp;
            <Symbol type='correct' />
            &nbsp;하세요.
          </Box>
        </Box>
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState<string>('');

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
      vAlign='start'
      useExtend
    >
      <Box hAlign='center' flexDirection='column'>
        <Box type='line' hAlign='center' useRound width={448} padding='25px 0'>
          <Typography>41×</Typography>
          <Input width='52px' readOnly value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='' />
          <Typography>{'>'}300</Typography>
        </Box>

        <Box vAlign='center' marginTop='24px' padding='24px 0'>
          <Typography>(</Typography>
          <Box vAlign='center'>
            <List
              data={data}
              align='horizontal'
              row={({ value, index = 1 }) => (
                <Box vAlign='center'>
                  <CircleCheck type='button'>{value}</CircleCheck>
                  {index != data.length && <Typography>,</Typography>}
                </Box>
              )}
            />
          </Box>
          <Typography>)</Typography>
        </Box>
      </Box>

      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box></Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box></Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const CircleCheck = styled.button`
  width: 42px;
  height: 50px;
`;

export default EMA01101;
