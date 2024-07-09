import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  IQuestionProps,
  Input,
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
import { useEffect, useState } from 'react';

const valueData = {
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
  value6: '',
  value7: '',
  value8: '',
};

const EM06802 = () => {
  const [showOneDepthTb1, setshowOneDepthTb1] = useState<boolean>(false);
  const [showOneDepthTb2, setshowOneDepthTb2] = useState<boolean>(false);

  const [valueTb1, setValuesTb1] = useState(valueData);
  const [valueTb2, setValuesTb2] = useState(valueData);
  const [value, setValue] = useState<string>('');

  const handleInputChange = (table: number, key: string, value: string) => {
    const setter = table === 1 ? setValuesTb1 : setValuesTb2;
    setter(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setshowOneDepthTb1(!!(valueTb1.value1 && valueTb1.value3 && valueTb1.value4 && valueTb1.value5));
  }, [valueTb1]);

  useEffect(() => {
    setshowOneDepthTb2(!!(valueTb2.value1 && valueTb2.value3 && valueTb2.value4 && valueTb2.value5));
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
          <Table color={EStyleTableTypes.MATH_DIVIDE} useMathBorder={false}>
            <TableMathCaption caption='세로셈' math={['3', '÷', '51']} />
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
                  <Input
                    value={valueTb1.value1}
                    onChange={e => handleInputChange(1, 'value1', e.target.value)}
                    readOnly={false}
                    status={0}
                    ariaLabel='몫, 십의 자리'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  {showOneDepthTb1 && (
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
                <TD>3</TD>
                <TD>5</TD>
                <TD>1</TD>
              </TR>
              <>
                <TR>
                  <TH scope='row' hiddenLabel={'십의 자리 풀이'}></TH>
                  <TD>
                    <Input
                      value={valueTb1.value3}
                      onChange={e => handleInputChange(1, 'value3', e.target.value)}
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
                  <TD>
                    <Input
                      value={valueTb1.value4}
                      onChange={e => handleInputChange(1, 'value4', e.target.value)}
                      readOnly={false}
                      status={0}
                      ariaLabel='나누어지는 십의 자리와 나누는 수 일의 자리를 나눈 십의 자리값'
                      maxLength={1}
                    />
                  </TD>
                  <TD>
                    <Input
                      value={valueTb1.value5}
                      onChange={e => handleInputChange(1, 'value5', e.target.value)}
                      readOnly={false}
                      status={0}
                      ariaLabel='나누어지는 십의 자리와 나누는 수 일의 자리를 나눈 일의 자리값'
                      maxLength={1}
                    />
                  </TD>
                </TR>
              </>
              <TR>
                {showOneDepthTb1 && (
                  <>
                    <TD></TD>
                    <TD>
                      <Input
                        value={valueTb1.value6}
                        onChange={e => handleInputChange(1, 'value6', e.target.value)}
                        readOnly={false}
                        status={0}
                        ariaLabel='나누어지는 십의 자리와 나누는 수 일의 자리를 나눈 십의 자리값'
                        maxLength={1}
                      />
                    </TD>
                    <TD>
                      <Input
                        value={valueTb1.value7}
                        onChange={e => handleInputChange(1, 'value7', e.target.value)}
                        readOnly={false}
                        status={0}
                        ariaLabel='나누어지는 십의 자리와 나누는 수 일의 자리를 나눈 일의 자리값'
                        maxLength={1}
                      />
                    </TD>
                  </>
                )}
              </TR>
            </TBody>
            {showOneDepthTb1 && (
              <TFoot>
                <TR isDivideExpLine>
                  <TD></TD>
                  <TD></TD>
                  <TD>
                    <Input
                      value={valueTb1.value8}
                      onChange={e => handleInputChange(1, 'value8', e.target.value)}
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
        <Box width='100%' height='fit-content' useRound type='dashed' padding='24px 0' display='flex' justifyContent='center'>
          <Table color={EStyleTableTypes.MATH_DIVIDE} useMathBorder={false}>
            <TableMathCaption caption='세로셈' math={['2', '÷', '50']} />
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
                  <Input
                    value={valueTb2.value1}
                    onChange={e => handleInputChange(2, 'value1', e.target.value)}
                    readOnly={false}
                    status={0}
                    ariaLabel='몫, 십의 자리'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  {showOneDepthTb2 && (
                    <Input
                      value={valueTb2.value2}
                      onChange={e => handleInputChange(2, 'value2', e.target.value)}
                      readOnly={false}
                      status={0}
                      ariaLabel='몫, 일의 자리'
                      maxLength={1}
                    />
                  )}
                </TD>
              </TR>
              <TR isDivideExp divideExpGap={52}>
                <TD>2</TD>
                <TD>5</TD>
                <TD>0</TD>
              </TR>
              <>
                <TR>
                  <TH scope='row' hiddenLabel={'십의 자리 풀이'}></TH>
                  <TD>
                    <Input
                      value={valueTb2.value3}
                      onChange={e => handleInputChange(2, 'value3', e.target.value)}
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
                  <TD>
                    <Input
                      value={valueTb2.value4}
                      onChange={e => handleInputChange(2, 'value4', e.target.value)}
                      readOnly={false}
                      status={0}
                      ariaLabel='나누어지는 십의 자리와 나누는 수 일의 자리를 나눈 십의 자리값'
                      maxLength={1}
                    />
                  </TD>
                  <TD>
                    <Input
                      value={valueTb2.value5}
                      onChange={e => handleInputChange(2, 'value5', e.target.value)}
                      readOnly={false}
                      status={0}
                      ariaLabel='나누어지는 십의 자리와 나누는 수 일의 자리를 나눈 일의 자리값'
                      maxLength={1}
                    />
                  </TD>
                </TR>
              </>
              <TR>
                {showOneDepthTb2 && (
                  <>
                    <TD></TD>
                    <TD>
                      <Input
                        value={valueTb2.value6}
                        onChange={e => handleInputChange(2, 'value6', e.target.value)}
                        readOnly={false}
                        status={0}
                        ariaLabel='나누어지는 십의 자리와 나누는 수 일의 자리를 나눈 십의 자리값'
                        maxLength={1}
                      />
                    </TD>
                    <TD>
                      <Input
                        value={valueTb2.value7}
                        onChange={e => handleInputChange(2, 'value7', e.target.value)}
                        readOnly={false}
                        status={0}
                        ariaLabel='나누어지는 십의 자리와 나누는 수 일의 자리를 나눈 일의 자리값'
                        maxLength={1}
                      />
                    </TD>
                  </>
                )}
              </TR>
            </TBody>
            {showOneDepthTb2 && (
              <TFoot>
                <TR isDivideExpLine>
                  <TD></TD>
                  <TD></TD>
                  <TD>
                    <Input
                      value={valueTb2.value8}
                      onChange={e => handleInputChange(2, 'value8', e.target.value)}
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
        <Box width='100%' height='fit-content' useRound type='dashed' padding='24px 0' display='flex' justifyContent='center'>
          <Typography>64÷4= </Typography>
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
            readOnly={false}
            status={0}
            ariaLabel='답 입력란'
            width='130px'
            marginLeft={12}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM06802;
