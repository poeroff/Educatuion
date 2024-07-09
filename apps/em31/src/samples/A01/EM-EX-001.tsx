import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { Box, List, IQuestionProps, TMainHeaderInfoTypes, Label, Image, Input, Typography } from '@maidt-cntn/ui';

const EMEX001 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '필요한 봉투 수 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='#969590' />
        달걀 10개를 2개씩 덜어 내면 몇 번 덜어 낼 수 있는지 뺄셈식으로 알아보세요.
      </>
    ),
  };

  const data = [1, 2, 3, 4, 5];

  const [inputValues, setInputValues] = useState(Array(data.length).fill(''));
  const handleChange = (index: number, value: string) => {
    const changeValues = [...inputValues];
    changeValues[index] = value;
    setInputValues(changeValues);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => setShow(!isShow)}
      vAlign='flex-start'
      useRound
    >
      <Box useFull position='relative'>
        <Box vAlign='center' whiteSpace='noWrap' position='absolute' bottom='35px' left='2px'>
          <Typography>10</Typography>
          <List
            data={data}
            align='horizontal'
            gap={0}
            row={({ value, index = 1 }) => (
              <Box vAlign='flex'>
                <Box hAlign='center' width='55px'>
                  <Typography>-</Typography>
                </Box>
                <Box hAlign='center' width='98px'>
                  <Input
                    width='52px'
                    value={inputValues[index]}
                    onChange={e => handleChange(index, e.target.value)}
                    ariaLabel={value + '번째 답을 입력하세요'}
                  />
                </Box>
              </Box>
            )}
          />
          <Typography>= 0</Typography>
        </Box>
        <Image
          src='../../assets/example/EM-EX-001/MC31308.png'
          alt='달걀이 10개 있으며 첫번째 두번째 달걀은 묶음으로 표시되어 있으며 이 묶음은 아래에 있는 봉투 1개에 화살표로 연결되어 있습니다. 그리고 아래에는 봉투 5개가 있습니다.'
          width='100%'
        />
      </Box>
    </Container>
  );
};

export default EMEX001;
