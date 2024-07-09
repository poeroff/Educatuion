import { Box, ETagPaint, IQuestionProps, Label, List, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@maidt-cntn/assets/icons/m_default_01.svg';

export interface IEM02301 {
  questionText: string;
  tag: string;
  data: Idata[];
}

export interface Idata {
  text: string;
}

const EM02301 = ({ questionText, tag, data }: IEM02301) => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        {questionText}
      </>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound>
      <Box useFull>
        <Box marginBottom={24}>
          <Tag type={ETagPaint.YELLOW_PAINT} label={tag} />
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
