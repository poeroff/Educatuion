import { useState } from 'react';

import styled from '@emotion/styled';
import { Box, EStyleTableTypes, IQuestionProps, Label, TBody, TMainHeaderInfoTypes, TR, Table, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IData {
  name?: string;
  number?: number;
  bgColor?: string;
  txtColor?: string;
}

const ME12701 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meFunActivity',
    headerText: 'A',
  };

  const questionInfo: IQuestionProps = {
    text: '짝과 색칠된 칸에서 상하좌우로 한 칸씩 이동하며 올바른 문장 먼저 만들기 놀이를 해 봅시다. ',
  };

  const data: IData[] = [
    {
      name: 'Terry',
      number: 1,
      txtColor: '#EB6707',
      bgColor: 'var(--color-yellow-100)',
    },
    {
      name: 'went',
    },
    {
      name: 'told',
    },
    {
      name: 'Ava',
      number: 2,
      txtColor: 'var(--color-blue-600)',
      bgColor: 'var(--color-blue-100)',
    },
    {
      name: 'showed',
    },
    {
      name: 'gave',
    },
    {
      name: 'her',
    },
    {
      name: 'me',
    },
    {
      name: 'they',
    },
    {
      name: 'made',
    },
    {
      name: 'I',
    },
    {
      name: 'a ring.',
    },
    {
      name: 'a secret.',
    },
    {
      name: 'a message.',
    },
    {
      name: 'Alicia',
    },
    {
      name: 'cooked',
    },
    {
      name: 'taught',
    },
    {
      name: 'a ticket.',
    },
    {
      name: 'She',
    },
    {
      name: 'sent',
    },
    {
      name: 'Yuna',
      number: 3,
      txtColor: 'var(--color-pink-500)',
      bgColor: 'var(--color-pink-100)',
    },
    {
      name: 'bought',
    },
    {
      name: 'him',
    },
    {
      name: 'wore',
    },
    {
      name: 'Dylan',
      number: 4,
      txtColor: 'var(--color-green-600)',
      bgColor: 'var(--color-green-100)',
    },
  ];

  const filterByRow = (items: IData[], rowNumber: number) => {
    const newArray = [];
    for (let i = 0; i < items.length; i += rowNumber) {
      const chunk = items.slice(i, i + rowNumber);
      newArray.push(chunk);
    }
    return newArray;
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box marginInline='85px'>
        <Table color={EStyleTableTypes.DEFAULT} sizes={['150px', '150px', '150px', '150px', '150px']}>
          <TBody>
            {filterByRow(data, 5).map((item, index) => {
              return (
                <TR key={index}>
                  {item.map((value, indexValue) => (
                    <TD key={indexValue} bgColor={value.bgColor ? value.bgColor : 'var(--color-white)'}>
                      {value.number && (
                        <Typography fontSize='22px' useGap={false} align='center' lineHeight='32px' color={value.txtColor}>
                          {value.number}.
                        </Typography>
                      )}
                      <Typography fontSize='22px' align='center' lineHeight='32px' color='var(--color-black)'>
                        {value.name}
                      </Typography>
                    </TD>
                  ))}
                </TR>
              );
            })}
          </TBody>
        </Table>
      </Box>
      <Box display='flex' flexDirection='column' marginTop={12} justifyContent='center' alignItems='center'>
        <Box>
          <Label
            size='number'
            type='line'
            marginRight={11}
            background='var(--color-blue-100)'
            cssStyle={{ border: 0, marginTop: '5px', minWidth: '38px', height: '38px' }}
          >
            <Typography useGap={false} weight='var(--font-weight-bold)' fontSize='var(--font-size-24)' align='center' lineHeight='42px'>
              A
            </Typography>
          </Label>
          <Typography fontSize='28px'>Terry gave her a ring.</Typography>
        </Box>
        <Box marginTop={8}>
          <Label
            size='number'
            type='line'
            marginRight={11}
            background='var(--color-yellow-100)'
            cssStyle={{ border: 0, marginTop: '5px', minWidth: '38px', height: '38px' }}
          >
            <Typography useGap={false} weight='var(--font-weight-bold)' fontSize='var(--font-size-24)' align='center' lineHeight='42px'>
              B
            </Typography>
          </Label>
          <Typography fontSize='28px'>Ava told me a secret.</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ME12701;

const TD = styled.td<{ bgColor?: string }>`
  width: 150px;
  height: 48px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  background-color: ${({ bgColor }) => bgColor};
`;
