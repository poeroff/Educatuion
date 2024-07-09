import { Box, ETagPaint, IQuestionProps, Label, List, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '../../assets/icon/m_default_01.svg';

const EM02301 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        덧셈과 뺄셈을 하여 그림 조각을 맞추고, 색칠을 하여 그림을 완성해 보세요.
      </>
    ),
  };

  const data = [
    {
      text: '덧셈과 뺄셈을 합니다.',
    },
    {
      text: '그림 조각을 계산 결과에 맞게 붙입니다.',
    },
    {
      text: '색칠하여 그림을 완성합니다.',
    },
  ];

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound>
      <Box useFull>
        <Box marginBottom={24}>
          <Tag type={ETagPaint.YELLOW_PAINT} label='활동 방법' />
        </Box>
        <List
          gap={20}
          data={data}
          row={({ value, index }) => (
            <Box display='flex' alignItems='center'>
              <Label value={index} />
              <Box marginLeft={8}>
                <Typography>{value?.text}</Typography>
              </Box>
            </Box>
          )}
        />
      </Box>
    </Container>
  );
};

export default EM02301;
