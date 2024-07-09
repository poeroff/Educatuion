import { useState, useEffect } from 'react';
import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  SvgIcon,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableMathCaption,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import arrow from '../../assets/example/ArrowFatRight.svg';

const valueData = {
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
  value6: '',
  value7: '',
  value8: '',
  value9: '',
};

const EM06801 = () => {
  const [showOneDepthTb1, setshowOneDepthTb1] = useState<boolean>(false);
  const [showTwoDepthTb1, setshowTwoDepthTb1] = useState<boolean>(false);
  const [showOneDepthTb2, setshowOneDepthTb2] = useState<boolean>(false);
  const [showTwoDepthTb2, setshowTwoDepthTb2] = useState<boolean>(false);

  const [valueTb1, setValuesTb1] = useState(valueData);
  const [valueTb2, setValuesTb2] = useState(valueData);

  const handleInputChange = (table: number, key: string, value: string) => {
    const setter = table === 1 ? setValuesTb1 : setValuesTb2;
    setter(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setshowOneDepthTb1(!!(valueTb1.value3 && valueTb1.value4 && valueTb1.value5));
    setshowTwoDepthTb1(!!(valueTb1.value1 && valueTb1.value6 && valueTb1.value7));
  }, [valueTb1]);

  useEffect(() => {
    setshowOneDepthTb2(!!(valueTb2.value3 && valueTb2.value4 && valueTb2.value5));
    setshowTwoDepthTb2(!!(valueTb2.value1 && valueTb2.value6 && valueTb2.value7));
  }, [valueTb2]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    text: '나눗셈을 세로로 나타내어 계산해 보세요.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      useRound
      background='var(--color-white)'
      submitLabel='채점하기'
      onSubmit={() => {}}
    >
      <BoxWrap paddingTop={10}>
        <Box width='100%' height='fit-content' useRound type='dashed' padding='24px 0' display='flex' justifyContent='center'>
          <Box vAlign='center' height={170}>
            <Typography>77÷7</Typography>
            <SvgIcon src={arrow} size='26px' alt='오른쪽 화살표' />
          </Box>
          <Box marginLeft={10}>
            <Table color={EStyleTableTypes.MATH_DIVIDE} useMathBorder={false}>
              <TableMathCaption caption='세로셈' math={['77', '÷', '7']} />
              <THead hidden>
                <TR>
                  <TH scope='col'>나누는 수, 일의 자리</TH>
                  <TH scope='col'>나누어지는 수, 십의 자리</TH>
                  <TH scope='col'>나누어지는 수, 일의 자리</TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD></TD>
                  <TD>
                    {showOneDepthTb1 && (
                      <Input
                        value={valueTb1.value1}
                        onChange={e => handleInputChange(1, 'value1', e.target.value)}
                        readOnly={false}
                        status={0}
                        ariaLabel='몫, 십의 자리'
                        maxLength={1}
                      />
                    )}
                  </TD>
                  <TD>
                    {showTwoDepthTb1 && (
                      <Input
                        value={valueTb1.value2}
                        onChange={e => handleInputChange(1, 'value2', e.target.value)}
                        readOnly={false}
                        status={0}
                        ariaLabel='몫, 일의 자리'
                        maxLength={1}
                      />
                    )}
                  </TD>
                </TR>
                <TR isDivideExp divideExpGap={52}>
                  <TD>
                    <Input
                      value={valueTb1.value3}
                      onChange={e => handleInputChange(1, 'value3', e.target.value)}
                      readOnly={false}
                      status={0}
                      ariaLabel='나누는 수, 일의 자리'
                      maxLength={1}
                    />
                  </TD>
                  <TD>
                    <Input
                      value={valueTb1.value4}
                      onChange={e => handleInputChange(1, 'value4', e.target.value)}
                      readOnly={false}
                      status={0}
                      ariaLabel='나누어지는 수, 십의 자리'
                      maxLength={1}
                    />
                  </TD>
                  <TD>
                    <Input
                      value={valueTb1.value5}
                      onChange={e => handleInputChange(1, 'value5', e.target.value)}
                      readOnly={false}
                      status={0}
                      ariaLabel='나누어지는 수, 일의 자리'
                      maxLength={1}
                    />
                  </TD>
                </TR>
                {showOneDepthTb1 && (
                  <>
                    <TR>
                      <TH scope='row' hiddenLabel={'십의 자리 풀이'}></TH>
                      <TD>
                        <Input
                          value={valueTb1.value6}
                          onChange={e => handleInputChange(1, 'value6', e.target.value)}
                          readOnly={false}
                          status={0}
                          ariaLabel='나누어지는 수 십의 자리와 나누는 수 일의 자리를 나눈 값'
                          maxLength={1}
                        />
                      </TD>
                      <TD></TD>
                    </TR>
                    <TR isDivideExpLine>
                      <TD></TD>
                      <TD></TD>
                      <TD>
                        <Input
                          value={valueTb1.value7}
                          onChange={e => handleInputChange(1, 'value7', e.target.value)}
                          readOnly={false}
                          status={0}
                          ariaLabel='나누어지는 수 십의 자리와 나누는 수 일의 자리를 나눈 나머지'
                          maxLength={1}
                        />
                      </TD>
                    </TR>
                  </>
                )}
                {showTwoDepthTb1 && (
                  <TR>
                    <TD></TD>
                    <TD></TD>
                    <TD>
                      <Input
                        value={valueTb1.value8}
                        onChange={e => handleInputChange(1, 'value8', e.target.value)}
                        readOnly={false}
                        status={0}
                        ariaLabel='나누어지는 일의 자리와 나누는 수 일의 자리를 나눈 값'
                        maxLength={1}
                      />
                    </TD>
                  </TR>
                )}
              </TBody>
              {showTwoDepthTb1 && (
                <TFoot>
                  <TR isDivideExpLine>
                    <TD></TD>
                    <TD></TD>
                    <TD>
                      <Input
                        value={valueTb1.value9}
                        onChange={e => handleInputChange(1, 'value9', e.target.value)}
                        readOnly={false}
                        status={0}
                        ariaLabel='나머지, 일의 자리'
                        maxLength={1}
                      />
                    </TD>
                  </TR>
                </TFoot>
              )}
            </Table>
          </Box>
        </Box>
        <Box width='100%' height='fit-content' useRound type='dashed' padding='24px 0' display='flex' justifyContent='center'>
          <Box vAlign='center' height={170}>
            <Typography>48÷2</Typography>
            <SvgIcon src={arrow} size='26px' alt='오른쪽 화살표' />
          </Box>
          <Box marginLeft={10}>
            <Table color={EStyleTableTypes.MATH_DIVIDE} useMathBorder={false}>
              <TableMathCaption caption='세로셈' math={['48', '÷', '2']} />
              <THead hidden>
                <TR>
                  <TH scope='col'>나누는 수, 일의 자리</TH>
                  <TH scope='col'>나누어지는 수, 십의 자리</TH>
                  <TH scope='col'>나누어지는 수, 일의 자리</TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD></TD>
                  <TD>
                    {showOneDepthTb2 && (
                      <Input
                        value={valueTb2.value1}
                        onChange={e => handleInputChange(2, 'value1', e.target.value)}
                        readOnly={false}
                        status={0}
                        ariaLabel='몫, 십의 자리'
                        maxLength={1}
                      />
                    )}
                  </TD>
                  <TD>
                    {showTwoDepthTb2 && (
                      <Input
                        value={valueTb2.value2}
                        onChange={e => handleInputChange(2, 'value2', e.target.value)}
                        readOnly={false}
                        status={0}
                        ariaLabel='몫, 십의 자리'
                        maxLength={1}
                      />
                    )}
                  </TD>
                </TR>
                <TR isDivideExp divideExpGap={52}>
                  <TD>
                    <Input
                      value={valueTb2.value3}
                      onChange={e => handleInputChange(2, 'value3', e.target.value)}
                      readOnly={false}
                      status={0}
                      ariaLabel='나누는 수, 일의 자리'
                      maxLength={1}
                    />
                  </TD>
                  <TD>
                    <Input
                      value={valueTb2.value4}
                      onChange={e => handleInputChange(2, 'value4', e.target.value)}
                      readOnly={false}
                      status={0}
                      ariaLabel='나누어지는 수, 십의 자리'
                      maxLength={1}
                    />
                  </TD>
                  <TD>
                    <Input
                      value={valueTb2.value5}
                      onChange={e => handleInputChange(2, 'value5', e.target.value)}
                      readOnly={false}
                      status={0}
                      ariaLabel='나누어지는 수, 일의 자리'
                      maxLength={1}
                    />
                  </TD>
                </TR>
                {showOneDepthTb2 && (
                  <>
                    <TR>
                      <TH scope='row' hiddenLabel={'십의 자리 풀이'}></TH>
                      <TD>
                        <Input
                          value={valueTb2.value6}
                          onChange={e => handleInputChange(2, 'value6', e.target.value)}
                          readOnly={false}
                          status={0}
                          ariaLabel='나누어지는 수 십의 자리와 나누는 수 일의 자리를 나눈 값'
                          maxLength={1}
                        />
                      </TD>
                      <TD></TD>
                    </TR>
                    <TR isDivideExpLine>
                      <TD></TD>
                      <TD></TD>
                      <TD>
                        <Input
                          value={valueTb2.value7}
                          onChange={e => handleInputChange(2, 'value7', e.target.value)}
                          readOnly={false}
                          status={0}
                          ariaLabel='몫, 십의 자리'
                          maxLength={1}
                        />
                      </TD>
                    </TR>
                  </>
                )}
                {showTwoDepthTb2 && (
                  <TR>
                    <TD></TD>
                    <TD></TD>
                    <TD>
                      <Input
                        value={valueTb2.value8}
                        onChange={e => handleInputChange(2, 'value8', e.target.value)}
                        readOnly={false}
                        status={0}
                        ariaLabel='몫, 십의 자리'
                        maxLength={1}
                      />
                    </TD>
                  </TR>
                )}
              </TBody>
              {showTwoDepthTb2 && (
                <TFoot>
                  <TR isDivideExpLine>
                    <TD></TD>
                    <TD></TD>
                    <TD>
                      <Input
                        value={valueTb2.value9}
                        onChange={e => handleInputChange(2, 'value9', e.target.value)}
                        readOnly={false}
                        status={0}
                        ariaLabel='나머지, 일의 자리'
                        maxLength={1}
                      />
                    </TD>
                  </TR>
                </TFoot>
              )}
            </Table>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM06801;
