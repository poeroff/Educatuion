import { useState } from 'react';
import { NameTag, Box, Typography, Input, EDefaultInequalitySignType } from '@maidt-cntn/ui';
import { HContainer, MathExpression, InequalitySignBox, IInequalitySignBoxProps } from '@maidt-cntn/ui/math';

type TValues = { [index: string]: string };

const HM00504 = () => {
  const [inputValues, setInputValues] = useState<TValues>({});
  const [signValues, setSignValues] = useState<{ [toolTipId: string]: EDefaultInequalitySignType }>({});

  const handleChange = (type: EDefaultInequalitySignType, toolTipId: string) => {
    setSignValues({
      ...signValues,
      [toolTipId]: type,
    });
  };

  const inequalityData: IInequalitySignBoxProps = {
    type: 'single',
    signs: ['>=', '>', '=', '<', '<='],
    toolTipId: '',
    onChange: handleChange,
  };

  const headerInfo = {
    headerText: (
      <NameTag
        label='맞춤형'
        color='#385CAA'
        style={{
          color: 'var(--color-white)',
          fontSize: '20px',
        }}
      />
    ),
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start' submitLabel={'채점하기'} onSubmit={() => {}}>
      <Box vAlign='center' padding='7px 0' whiteSpace='nowrap'>
        <Box width='6px' height='28px' marginRight='8px' background='var(--color-h-math-primary-origin)' borderRadius='3px' />
        <Typography
          useGap={false}
          fontSize='var(--font-size-30)'
          lineHeight='45px'
          weight={'var(--font-weight-bold)'}
          color='var(--color-h-math-primary-normal)'
        >
          문제1
        </Typography>
        <Box marginLeft='12px'>
          <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='50px'>
            다음 이차부등식을 푸시오.
          </Typography>
        </Box>
      </Box>

      <Box display='table' marginTop='24px'>
        {[
          {
            equation: '$x^2-x-2<0$',
            qustion: 'A',
          },
          {
            equation: '$2x^2-5x+3\\ge0$',
            qustion: 'B',
          },
          {
            equation: '$-x^2+3x+1-<0$',
            qustion: 'B',
          },
          {
            equation: '$-3x^2+7x-2\\ge0$',
            qustion: 'A',
          },
        ].map((data, idx) => (
          <Box display='table-row' key={idx}>
            <Box display='table-cell'>
              &#40;{idx + 1}&#41;&nbsp;
              <MathExpression equation={data.equation} />
            </Box>
            <Box display='table-cell' padding='0 0 24px 34px'>
              {data.qustion === 'A' && (
                <Box vAlign='center'>
                  <Input
                    name={`tooltip-${idx}-1`}
                    width='190px'
                    value={inputValues[`tooltip-${idx}-1`]}
                    onChange={({ target }) => setInputValues({ ...inputValues, [target.name]: target.value })}
                    placeholder=''
                    ariaLabel='답 입력란'
                  />
                  <InequalitySignBox {...inequalityData} toolTipId={`tooltip-${idx}-1`} value={signValues[`tooltip-${idx}-1`]} />
                  <MathExpression equation={`$x$`} />
                  <InequalitySignBox {...inequalityData} toolTipId={`tooltip-${idx}-2`} value={signValues[`tooltip-${idx}-2`]} />
                  <Input
                    name={`tooltip-${idx}-2`}
                    width='190px'
                    value={inputValues[`tooltip-${idx}-2`]}
                    onChange={({ target }) => setInputValues({ ...inputValues, [target.name]: target.value })}
                    placeholder=''
                    ariaLabel='답 입력란'
                  />
                </Box>
              )}
              {data.qustion === 'B' && (
                <Box vAlign='center'>
                  <MathExpression equation={`$x$`} />
                  <InequalitySignBox {...inequalityData} toolTipId={`tooltip-${idx}-1`} value={signValues[`tooltip-${idx}-1`]} />
                  <Input
                    name={`tooltip-${idx}-1`}
                    width='190px'
                    value={inputValues[`tooltip-${idx}-1`]}
                    onChange={({ target }) => setInputValues({ ...inputValues, [target.name]: target.value })}
                    placeholder=''
                    ariaLabel='답 입력란'
                  />
                  &nbsp;또는&nbsp;
                  <MathExpression equation={`$x$`} />
                  <InequalitySignBox {...inequalityData} toolTipId={`tooltip-${idx}-2`} value={signValues[`tooltip-${idx}-2`]} />
                  <Input
                    name={`tooltip-${idx}-2`}
                    width='190px'
                    value={inputValues[`tooltip-${idx}-2`]}
                    onChange={({ target }) => setInputValues({ ...inputValues, [target.name]: target.value })}
                    placeholder=''
                    ariaLabel='답 입력란'
                  />
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </HContainer>
  );
};

export default HM00504;
