import { Box, EStyleTableTypes, Image, SvgIcon, TBody, TD, TH, THead, TR, Table, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';
import arrowIcon from '../../assets/icons/arrow_right.svg';

const HM02811 = () => {
  const th_arr = [
    <Typography fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
      모든 실수 <MathExpression equation={`$x$`} />에 대하여
      <br />
      <MathExpression equation={`$ax^2+bx+c>0$`} />
    </Typography>,
    <Typography fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
      모든 실수 <MathExpression equation={`$x$`} />에 대하여
      <br />
      <MathExpression equation={`$ax^2+bx+c \\geq 0$`} />
    </Typography>,
    <Typography fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
      모든 실수 <MathExpression equation={`$x$`} />에 대하여
      <br />
      <MathExpression equation={`$ax^2+bx+c<0$`} />
    </Typography>,
    <Typography fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
      모든 실수 <MathExpression equation={`$x$`} />에 대하여
      <br />
      <MathExpression equation={`$ax^2+bx+c\\leq0$`} />
    </Typography>,
  ];
  const td_arr = [
    [
      <Image
        src='../../assets/example/HM-028-11/D1-2-3-04-01.jpg'
        alt='아래로 볼록한 이차함수의 그래프가 x축보다 위쪽에 있는 그림입니다.'
        width='200px'
        height='155px'
      />,
      <Image
        src='../../assets/example/HM-028-11/D1-2-3-04-02.jpg'
        alt='아래롤 볼록한 이차함수의 그래프가 x축에 접하는 것과 축보다 위쪽에 있는 것, 2개가 있는 그림입니다.'
        width='200px'
        height='155px'
      />,
      <Image
        src='../../assets/example/HM-028-11/D1-2-3-04-03.jpg'
        alt='위로 볼록한 이차함수의 그래프가 x축보다 아래쪽에 있는 그림입니다.'
        width='200px'
        height='155px'
      />,
      <Image
        src='../../assets/example/HM-028-11/D1-2-3-04-04.jpg'
        alt='위로 볼록한 이차함수의 그래프가 x축에 접하는 것과 축보다 아래쪽에 있는 것, 2개가 있는 그림입니다.'
        width='200px'
        height='155px'
      />,
    ],
    [
      <Box>
        <Box height='212px'>
          <Typography useGap={false} fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
            그래프가
            <br />
            <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
              아래
            </Typography>
            로 볼록하고,
            <br />
            <MathExpression equation={`$x$`} />
            축보다{' '}
            <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
              위
            </Typography>
            쪽에
            <br />
            있다.
          </Typography>
        </Box>
        <Box hAlign='center'>
          <SvgIcon src={arrowIcon} width='20px' height='20px' />
          <Box useRound background='var(--color-yellow-100)' padding='12px'>
            <Typography fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
              <MathExpression equation={`$x$`} />
              <Typography useGap={false} useSticker>
                <MathExpression equation={`$>$`} />
              </Typography>
              0,
              <MathExpression equation={`$D$`} />
              <Typography useGap={false} useSticker>
                <MathExpression equation={`$<$`} />
              </Typography>
              0,
            </Typography>
          </Box>
        </Box>
      </Box>,
      <Box>
        <Box height='212px'>
          <Typography useGap={false} fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
            그래프가
            <br />
            <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
              아래
            </Typography>
            로 볼록하고,
            <br />
            <MathExpression equation={`$x$`} />
            축에
            <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
              접하거나
            </Typography>
            <br />
            <MathExpression equation={`$x$`} />
            축보다{' '}
            <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
              위
            </Typography>
            쪽에
            <br />
            있다.
          </Typography>
        </Box>
        <Box hAlign='center'>
          <SvgIcon src={arrowIcon} width='20px' height='20px' />
          <Box useRound background='var(--color-yellow-100)' padding='12px'>
            <Typography fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
              <MathExpression equation={`$x$`} />
              <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
                <MathExpression equation={`$>$`} />
              </Typography>
              0,
              <MathExpression equation={`$D$`} />
              <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
                <MathExpression equation={`$\\leq$`} />
              </Typography>
              0,
            </Typography>
          </Box>
        </Box>
      </Box>,
      <Box>
        <Box height='212px'>
          <Typography useGap={false} fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
            그래프가
            <br />
            <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
              위
            </Typography>
            로 볼록하고,
            <br />
            <MathExpression equation={`$x$`} />
            축보다{' '}
            <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
              아래
            </Typography>
            쪽에
            <br />
            있다.
          </Typography>
        </Box>
        <Box hAlign='center'>
          <SvgIcon src={arrowIcon} width='20px' height='20px' />
          <Box useRound background='var(--color-yellow-100)' padding='12px'>
            <Typography fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
              <MathExpression equation={`$a$`} />
              <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
                <MathExpression equation={`$<$`} />
              </Typography>
              0,
              <MathExpression equation={`$D$`} />
              <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
                <MathExpression equation={`$<$`} />
              </Typography>
              0,
            </Typography>
          </Box>
        </Box>
      </Box>,
      <Box>
        <Box height='212px'>
          <Typography useGap={false} fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
            그래프가
            <br />
            <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
              위
            </Typography>
            로 볼록하고,
            <br />
            <MathExpression equation={`$x$`} />
            축에{' '}
            <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
              접하거나
            </Typography>
            <br />
            <MathExpression equation={`$x$`} />
            축보다{' '}
            <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
              아래
            </Typography>
            쪽에
            <br />
            있다.
          </Typography>
        </Box>
        <Box hAlign='center'>
          <SvgIcon src={arrowIcon} width='20px' height='20px' />
          <Box useRound background='var(--color-yellow-100)' padding='12px'>
            <Typography fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
              <MathExpression equation={`$a$`} />
              <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
                <MathExpression equation={`$<$`} />
              </Typography>
              0,
              <MathExpression equation={`$D$`} />
              <Typography useGap={false} useSticker fontSize='var(--font-size-24)' fontWeight='var(--font-weight-regular)'>
                <MathExpression equation={`$\\leq$`} />
              </Typography>
              0,
            </Typography>
          </Box>
        </Box>
      </Box>,
    ],
  ];
  return (
    <HContainer headerInfo={null} vAlign='flex-start'>
      <Typography fontSize='var(--font-size-32)' fontWeight='var(--font-weight-semiBold)' lineHeight='48px'>
        이차부등식이 모든 실수에 대하여 성립할 조건
      </Typography>
      <Box marginTop='24px'>
        <Table color={EStyleTableTypes.GRAY} sizes={['244px', '244px', '244px', '244px']}>
          <THead>
            <TR>
              {th_arr.map((item, idx) => {
                return (
                  <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.GRAY}>
                    {item}
                  </TH>
                );
              })}
            </TR>
          </THead>
          <TBody>
            {td_arr.map((item, index) => (
              <TR key={index}>
                {item.map((value, index) => {
                  return (
                    <TD key={index} vAlign='top' color={EStyleTableTypes.GRAY}>
                      {value}
                    </TD>
                  );
                })}
              </TR>
            ))}
          </TBody>
        </Table>
      </Box>
    </HContainer>
  );
};
export default HM02811;
