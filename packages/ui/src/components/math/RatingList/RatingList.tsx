import { Box, Typography, List, SvgIcon, Rating, EStyleFontSizes, ESvgType } from '@maidt-cntn/ui';
import girl_icon from '@maidt-cntn/assets/ratingList/girl.png';
interface Data {
  text: string;
  rating: string;
}
interface IRatingListProps {
  ratingType?: 'goal' | 'check';
  data: Data[];
  ratingData?: string[];
  title?: string;
  ratings?: number[];
  onRatingChange?: (index: number, rating: number) => void;
}

export const RatingList = ({ data, ratingType = 'goal', ratingData = [], title = '', ratings = [], onRatingChange = () => {} }: IRatingListProps) => {
  return (
    <>
      {ratingType === 'goal' ? (
        <Box marginTop={8}>
          <List data={data} gap={8}>
            {({ value, index = 1 }) => (
              <Box vAlign='center'>
                <Typography size={EStyleFontSizes['X-MEDIUM']}>
                  {index}. {value?.text}
                </Typography>
                <Box flex='1' border='1px dashed var(--color-h-math-primary-normal)' />
                <Typography size={EStyleFontSizes['X-MEDIUM']} weight='var(--font-weight-bold)' color='var(--color-h-math-primary-strong)'>
                  {value?.rating}
                </Typography>
              </Box>
            )}
          </List>
        </Box>
      ) : (
        <Box useRound position='relative' padding='24px' marginTop='48px' boxShadow='0 4px 12px 0 #47494d3D'>
          <Box hAlign='space-between' marginBottom='10px'>
            <Box position='absolute' top='-19px' left='10px'>
              <SvgIcon type={ESvgType.IMG} src={girl_icon} size='74px' alt='노란색 별 말풍선을 잡고 있는 교복입은 소녀' />
            </Box>
            <Box paddingLeft='52px'>
              <Typography
                align='right'
                weight='var(--font-weight-bold)'
                color='var(--color-h-math-primary-strong)'
                size={EStyleFontSizes['X-MEDIUM']}
              >
                {title}
              </Typography>
            </Box>
            <Box hAlign='flex-end' flex='1'>
              {ratingData.map((item, index) => {
                return (
                  <Typography
                    key={index}
                    width='65px'
                    weight='var(--font-weight-regular)'
                    fontSize='13px'
                    lineHeight='13px'
                    color='var(--font-color-grey800)'
                    align='center'
                    useGap={false}
                    usePre
                  >
                    {item}
                  </Typography>
                );
              })}
            </Box>
          </Box>
          <List data={data} gap={8}>
            {({ value, index = 1 }) => (
              <Box
                vAlign='center'
                justifyContent='space-between'
                paddingTop={index !== 1 ? '8px' : '0'}
                borderTop={index !== 1 ? '1px dashed var(--color-h-math-primary-normal)' : ''}
              >
                <Typography fontSize='22px' lineHeight='33px'>
                  {index}. {value?.text}
                </Typography>
                <Box vAlign='center' padding='12px' marginRight={-36}>
                  <Rating ratingGap={36} score={ratings[index - 1] || 0} onChange={rating => onRatingChange(index - 1, rating)} />
                </Box>
              </Box>
            )}
          </List>
        </Box>
      )}
    </>
  );
};

export default RatingList;
