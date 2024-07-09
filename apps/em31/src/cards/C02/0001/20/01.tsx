import { Box, EStyleTableTypes, Image, IQuestionProps, SvgIcon, Table, TBody, TD, TH, TR, Typography } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const diagramImages = [
    { src: '/C02/0001/20/DEC312I01_2.png', altText: '변이 3개인 도형 2개가 그려진 그림입니다.' },
    { src: '/C02/0001/20/DEC312I01_1.png', altText: '변이 4개인 도형 2개가 그려진 그림입니다.' },
  ];
  const diagramNames = ['삼각형', '사각형'];

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size={'36px'} />
        <Typography>삼각형, 사각형 알아보기</Typography>
      </Box>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} vAlign='flex-start' bodyId={'dialogContainer'}>
      <Box display='flex' justifyContent='center' marginTop={'50px'}>
        <Table color={EStyleTableTypes.TERTIARY} sizes={['210px', '210px', '210px', '210px']}>
          <TBody>
            <TR>
              <TH scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                모양
              </TH>
              {diagramImages.map((item, idx) => {
                return (
                  <TD key={idx} vAlign='middle' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                    <Box padding='16px' vAlign='center'>
                      <Image src={item.src} alt={item.altText} width={'100%'} />
                    </Box>
                  </TD>
                );
              })}
            </TR>
            <TR>
              <TH scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                도형의 이름
              </TH>
              {diagramNames.map((item, idx) => {
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
