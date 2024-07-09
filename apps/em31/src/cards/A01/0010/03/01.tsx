import styled from '@emotion/styled';
import { Box, BoxWrap, Table, TR, TH, TBody, TD, EStyleTableTypes, SvgIcon, Typography, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import e_fish_icon from '@maidt-cntn/assets/icons/e_fish_icon.svg';

const P01 = () => {
  const th_arr = ['페트병', '알루미늄 캔', '유리병'];
  const td_arr = [
    [416, 287, 135],
    [324, 121, 109],
  ];

  const size = '180px';
  const tableSize = [size, size, size, size];

  const script = `쓰담 달리기는 걷거나 달리면서 주변의 쓰레기를 줍는 활동입니다. 지수네 학교에서는 한 달에 한 번씩 쓰담 달리기를 하면서 운동도 하고 환경도
            보호합니다. 쓰담 달리기를 하며 주운 쓰레기양 중에서 두 수를 골라 문제 만들기를 해 보세요.`;

  const renderTable = (title: string, index: number) => {
    return (
      <BoxWrap flexDirection='column' alignItems='center' boxGap={0} paddingBottom={30}>
        <TableTitle>{title}</TableTitle>
        <Table color={EStyleTableTypes.TERTIARY} sizes={tableSize} fontSize={EStyleFontSizes['X-MEDIUM']}>
          <TBody>
            <TR>
              <TH scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                재활용 쓰레기
              </TH>
              {th_arr.map((item, idx) => {
                return (
                  <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                    {item}
                  </TH>
                );
              })}
            </TR>
            <TR>
              <TH scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                주운 양(개)
              </TH>
              {td_arr[index].map((item, idx) => {
                return (
                  <TD key={idx} vAlign='middle' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                    {item}
                  </TD>
                );
              })}
            </TR>
          </TBody>
        </Table>
      </BoxWrap>
    );
  };

  return (
    <Container headerInfo={null} vAlign='flex-start' background={'var(--color-white)'} useRound useExtend>
      <Box vAlign='start' marginBottom='10px'>
        <SvgIcon src={e_fish_icon} width='48px' height='34px' />
        <Box marginLeft='8px' width='calc(100% - 56px)'>
          <Typography>{script}</Typography>
        </Box>
      </Box>
      {renderTable('지난 달 쓰담 달리기에서 주운 재활용 쓰레기양', 0)}
      {renderTable('이번 달 쓰담 달리기에서 주운 재활용 쓰레기양', 1)}
    </Container>
  );
};

const TableTitle = styled.p`
  padding: 4px 30px;
  margin-bottom: 8px;

  color: var(--color-white);
  line-height: 40px;
  text-align: center;

  border-radius: 16px;

  font-size: 28px;

  background-color: #058943;
`;

export default P01;
