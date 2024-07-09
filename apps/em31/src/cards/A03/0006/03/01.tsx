import { Box, ETagPaint, IQuestionProps, Label, List, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        몫이 같은 나눗셈을 찾은 후 승객을 알맞은 기차에 태워 보세요 .
      </>
    ),
  };

  const data = [
    {
      text: '나눗셈의 몫을 구합니다.',
    },
    {
      text: (
        <>
          기차 앞에 적힌 수가 몫인 승객을 기차에 태웁니다. <br />
          (기차에 태우는 순서는 상관 없습니다 .)
        </>
      ),
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

export default P01;
