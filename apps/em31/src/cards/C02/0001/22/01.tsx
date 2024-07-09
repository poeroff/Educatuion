import { Box, EStyleTableTypes, IQuestionProps, SvgIcon, Table, TBody, TD, TH, TR, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const ths = ['도형의 이름', '삼각형', '사각형'];
  const tds = ['3', '4'];

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size={'36px'} />
        <Typography>삼각형과 사각형의 변, 꼭짓점의 수 알아보기.</Typography>
      </Box>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} vAlign='flex-start' bodyId={'dialogContainer'}>
      <Box display='flex' justifyContent='center' marginTop={'50px'}>
        <Table color={EStyleTableTypes.TERTIARY} sizes={['210px', '210px', '210px', '210px']}>
          <TBody>
            <TR>
              {ths.map((item, idx) => {
                return (
                  <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                    {item}
                  </TH>
                );
              })}
            </TR>
            <TR>
              <TH scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                변의 수(개)
              </TH>
              {tds.map((item, idx) => {
                return (
                  <TD key={idx} vAlign='middle' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                    {item}
                  </TD>
                );
              })}
            </TR>
            <TR>
              <TH scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                꼭짓점의 수(개)
              </TH>
              {tds.map((item, idx) => {
                return (
                  <TD key={idx} vAlign='middle' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                    {item}
                  </TD>
                );
              })}
            </TR>
          </TBody>
        </Table>
      </Box>
    </Container>
  );
};

export default P01;
