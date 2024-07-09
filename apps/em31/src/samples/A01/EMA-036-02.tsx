import { useState } from 'react';
import {
  Box,
  BoxWrap,
  EStyleFontSizes,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  Label,
  TBody,
  TD,
  TH,
  TR,
  Table,
  Typography,
  SvgIcon,
  ESvgType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import bearBig from '@/assets/icon/bear_big.png';
import bearSmall from '@/assets/icon/bear_big.png';

const EMA03602 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={24} />
        다음은 준철이네 학교 4학년 학생들이 반별로 가지고 있는 인형 수를 조사하여 그림그래프로 나타낸 것입니다. 가장 많은 인형을 가지고 있는 반을 구해
        보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [ans, setAns] = useState<string>('');

  const onSubmit = () => {
    setShow(!isShow);
  };

  const renderBear = (bearType: 'big' | 'small', quantity: number) => {
    return Array.from({ length: quantity }, (_, index) => {
      const bearW = bearType === 'big' ? '39px' : '23px';
      const bearH = bearType === 'big' ? '48px' : '29px';
      const bearAlt = bearType === 'big' ? '10개를 나타내는 큰 곰인형 그림입니다.' : '1개를 나타내는 작은 곰인형 그림입니다.';
      return (
        <Box key={index} marginRight={0}>
          <SvgIcon src={bearType === 'big' ? bearBig : bearSmall} type={ESvgType.IMG} style={{ width: bearW, height: bearH }} alt={bearAlt} />
        </Box>
      );
    });
  };

  const td_arr = [
    ['반', '인형 수'],
    [
      '1반',
      <BoxWrap marginLeft='8px' gap='10px' alignItems='flex-end'>
        {renderBear('big', 1)}
        {renderBear('small', 6)}
      </BoxWrap>,
    ],
    [
      '2반',
      <BoxWrap marginLeft='8px' gap='10px' alignItems='flex-end'>
        {renderBear('big', 3)}
      </BoxWrap>,
    ],
    [
      '3반',
      <BoxWrap marginLeft='8px' gap='10px' alignItems='flex-end'>
        {renderBear('big', 2)}
        {renderBear('small', 3)}
      </BoxWrap>,
    ],
    [
      '4반',
      <BoxWrap marginLeft='8px' gap='10px' alignItems='flex-end'>
        {renderBear('big', 1)}
        {renderBear('small', 2)}
      </BoxWrap>,
    ],
  ];

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={onSubmit}
      submitLabel='채점하기'
      useRound
      vAlign='flex-start'
    >
      <BoxWrap flexDirection='column' alignItems='center' justifyContent='center'>
        <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-900)'>
          학생들이 가지고 있는 인형 수
        </Typography>

        <BoxWrap justifyContent='center' paddingTop='24px' paddingBottom='40px'>
          <Table color={EStyleTableTypes.YELLOW_SECONDARY} sizes={['139px', '465px']} caption='반별 인형수'>
            <TBody>
              {td_arr.map((item, index) => (
                <TR key={index}>
                  {item.map((value, idx) => {
                    if (index === 0) {
                      return (
                        <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                          {value}
                        </TH>
                      );
                    } else
                      return (
                        <TD key={idx} hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                          {value}
                        </TD>
                      );
                  })}
                </TR>
              ))}
            </TBody>
          </Table>

          <BoxWrap paddingLeft='16px' width='fit-content' flexDirection='column' justifyContent='flex-end'>
            <BoxWrap gap='12px' paddingBottom='10px'>
              {renderBear('big', 1)}
              <Typography size={EStyleFontSizes['X-MEDIUM']}>10개</Typography>
            </BoxWrap>

            <BoxWrap gap='12px'>
              {renderBear('small', 1)}
              <Box paddingLeft='15px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']}>1개</Typography>
              </Box>
            </BoxWrap>
          </BoxWrap>
        </BoxWrap>

        <BoxWrap justifyContent='center' alignItems='center' marginBottom='10px'>
          <Input
            width='98px'
            inputSize='small'
            value={ans}
            onChange={event => setAns(event.target.value)}
            ariaLabel='가장 많은 인형을 가지고 있는 반을 적어주세요.'
          />

          <Typography useGap={false}>반</Typography>
        </BoxWrap>
      </BoxWrap>
    </Container>
  );
};

export default EMA03602;
