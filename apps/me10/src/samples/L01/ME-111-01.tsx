import {
  Box,
  Typography,
  TMainHeaderInfoTypes,
  IQuestionProps,
  Table,
  TBody,
  TR,
  TH,
  EStyleTableTypes,
  THead,
  TD,
  Textarea,
  TableCaption,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const ME11101 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string[]>(Array(5).fill(''));

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'My School Life',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Box marginRight='10px'>
          <Typography useGap={false} fontSize='32px' lineHeight='50px' weight={800}>
            Step 1
          </Typography>
          <Typography>자신의 학교생활에 관해 간단히 써 봅시다.</Typography>
        </Box>
      </>
    ),
  };

  const data = [
    { thText: '학교 이름', eg: 'e.g. Hanguk' },
    { thText: '학교 가는 방법', eg: 'walk' },
    { thText: '반 친구들', eg: 'nice' },
    { thText: '가장 좋아하는 시간/과목', eg: 'lunch time' },
    { thText: '가장 좋아하는 급식 메뉴', eg: 'bibimbap' },
  ];

  const handleInputChange = (index: number, value: string) => {
    setInputValue(prevValue => prevValue.map((prevValue, i) => (i === index ? value : prevValue)));
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useExtend
    >
      <Table color={EStyleTableTypes.PINK_AND_GREEN} sizes={['200px', '200px', '200px', '200px', '200px']}>
        <TableCaption caption='학교생활 쓰기 목록' hidden />
        <THead>
          {data.map(value => (
            <TH vAlign='middle' color={EStyleTableTypes.PINK_AND_GREEN} scope={'col'}>
              {value.thText}
            </TH>
          ))}
        </THead>
        <TBody>
          <TR>
            {data.map(value => (
              <TD hAlign='center' color={EStyleTableTypes.PINK_AND_GREEN} scope={'col'}>
                {value.eg}
              </TD>
            ))}
          </TR>
          <TR>
            {data.map((__, index) => (
              <TD color={EStyleTableTypes.PINK_AND_GREEN} key={index}>
                <Textarea
                  height='196px'
                  placeholder='내용을 넣어 주세요.'
                  ariaLabel='답 입력란'
                  value={inputValue[index]}
                  onChange={e => handleInputChange(index, e.target.value)}
                />
              </TD>
            ))}
          </TR>
        </TBody>
      </Table>
    </Container>
  );
};

export default ME11101;
