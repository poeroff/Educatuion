import { ReactNode } from 'react';
import { Box, EImageType, EStyleFontSizes, Image, Label, SvgIcon, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';
import arrowIcon from '../../assets/icons/arrow.svg';

const wordList = ['연립부등식', '수직선 위에 나타내기', '연립부등식의 해'];

interface DataItem {
  labelValue: number;
  equation: string;
  description?: ReactNode;
  imageSrc: string;
  imageAlt: string;
  solutionEquation: string;
}

const data: DataItem[] = [
  {
    labelValue: 1,
    equation: '$\\left\\{\\begin{array}{ll} x \\geq a \\\\ x > b \\end{array}\\right.$',
    description: (
      <Typography>
        (단, <MathExpression equation='$x<b$' />)
      </Typography>
    ),
    imageSrc: '../../assets/example/HM-028-10/D1-2-3-03-01.png',
    imageAlt: 'a<b일 때, x≥a와 x>b를 수직선 위에 나타내어 공통부분을 색칠한 그림입니다.',
    solutionEquation: '$a>b$',
  },
  {
    labelValue: 2,
    equation: '$\\left\\{\\begin{array}{ll} x \\geq a \\\\ x < b \\end{array}\\right.$',
    description: (
      <Typography>
        (단, <MathExpression equation='$a<b$' />)
      </Typography>
    ),
    imageSrc: '../../assets/example/HM-028-10/D1-2-3-03-02.png',
    imageAlt: 'a<b일 때, x≥a와 x<b를 수직선 위에 나타내어 공통부분을 색칠한 그림입니다.',
    solutionEquation: '$a \\leq x < b$',
  },
  {
    labelValue: 3,
    equation: '$\\left\\{\\begin{array}{ll} x \\leq a \\\\ x < b \\end{array}\\right.$',
    description: (
      <Typography>
        (단, <MathExpression equation='$a<b$' />)
      </Typography>
    ),
    imageSrc: '../../assets/example/HM-028-10/D1-2-3-03-03.png',
    imageAlt: 'a<b일 때, x≥a와 x<b를 수직선 위에 나타내어 공통부분을 색칠한 그립입니다.',
    solutionEquation: '$x \\leq a$',
  },
  {
    labelValue: 4,
    equation: '$\\left\\{\\begin{array}{ll} x \\leq a \\\\ x \\geq a \\end{array}\\right.$',
    description: '',
    imageSrc: '../../assets/example/HM-028-10/D1-2-3-03-04.png',
    imageAlt: 'x≤a와 x≥a를 수직선 위에 타나낸 그림입니다.',
    solutionEquation: '$x=a$',
  },
];

const HM02810 = () => {
  return (
    <HContainer headerInfo={null} vAlign='flex-start'>
      <Typography fontSize='var(--font-size-32)' weight='var(--font-weight-semiBold)' lineHeight='48px'>
        연립부등식의 해
      </Typography>
      {data.map((value, index) => (
        <Box key={value.labelValue} marginTop='24px'>
          <Box hAlign='center'>
            <Box marginRight={12} marginTop={index === 0 ? '30px' : '0px'}>
              <Label value={value.labelValue} size='x-small' svgWidth={24} svgHeight={24} lineColor='var(--color-grey-900)' />
            </Box>
            <Box>
              {index === 0 && (
                <Box hAlign='center' flexDirection='column'>
                  <Typography
                    size={EStyleFontSizes['X-SMALL']}
                    weight='var(--font-weight-bold)'
                    color='var(--color-grey-700)'
                    lineHeight='24px'
                    width='auto'
                    align='center'
                  >
                    {wordList[0]}
                  </Typography>
                </Box>
              )}
              <Box hAlign='center' height='120px'>
                <MathExpression equation={value.equation} />
                <Box width='141px' whiteSpace='nowrap'>
                  {value.description || <>&nbsp;</>}
                </Box>
              </Box>
            </Box>

            <Box marginLeft='24px' marginRight='24px' marginTop={index === 0 ? '30px' : '0px'}>
              <SvgIcon src={arrowIcon} width='32px' height='32px' />
            </Box>
            <Box hAlign='center' flexDirection='column'>
              {index === 0 && (
                <Typography
                  size={EStyleFontSizes['X-SMALL']}
                  weight='var(--font-weight-bold)'
                  color='var(--color-grey-700)'
                  lineHeight='24px'
                  width='auto'
                  align='center'
                >
                  {wordList[1]}
                </Typography>
              )}
              <Box useRound border='1px solid var(--color-grey-300)' padding='12px 22px'>
                <Image src={value.imageSrc} width='255px' height='90px' type={EImageType.IMG} alt={value.imageAlt} />
              </Box>
            </Box>

            <Box marginLeft='24px' marginRight='24px' marginTop={index === 0 ? '30px' : '0px'}>
              <SvgIcon src={arrowIcon} width='32px' height='32px' />
            </Box>
            <Box hAlign='center' flexDirection='column'>
              {index === 0 && (
                <Typography
                  size={EStyleFontSizes['X-SMALL']}
                  weight='var(--font-weight-bold)'
                  color='var(--color-grey-700)'
                  lineHeight='24px'
                  width='auto'
                  align='center'
                >
                  {wordList[2]}
                </Typography>
              )}
              <Box height='120px' hAlign='center'>
                <Box useRound background='var(--color-yellow-100)' padding='12px' width='227px'>
                  <Typography useSticker width='100%'>
                    <Box width='184px' hAlign='center'>
                      <MathExpression equation={value.solutionEquation} />
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </HContainer>
  );
};

export default HM02810;
