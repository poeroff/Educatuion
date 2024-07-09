import { BoxWrap, Box, TMainHeaderInfoTypes, List, Label, RecordButton, Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React from 'react';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  recordButton: React.ReactNode;
}

const HE00901 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'YourTurn',
  };

  const questionInfo = {
    text: `Doing a role-play, practice how to express understanding other's feelings and give advice`,
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: (
        <>
          <span style={{ color: 'var(--color-yellow-600)' }}>I can’t </span>
          sellp well the night before the test.
        </>
      ),
      recordButton: (
        <RecordButton
          label='listen'
          onClick={() => {
            console.log('버튼 클릭 이벤트');
          }}
        />
      ),
    },
    {
      type: 'You',
      content: `I know how you fell. You’ll figure it out. though.`,
      recordButton: (
        <RecordButton
          label='speak'
          onClick={() => {
            console.log('버튼 클릭 이벤트');
          }}
        />
      ),
    },
    {
      type: 'A',
      content: `That's comforting. Can you give me some advice?`,
      recordButton: (
        <RecordButton
          label='listen'
          onClick={() => {
            console.log('버튼 클릭 이벤트');
          }}
        />
      ),
    },
    {
      type: 'You',
      content: (
        <>
          Why Don't <Input width='396px' placeholder='내용을 넣어 주세요.' /> ? It can help!
        </>
      ),
      recordButton: (
        <RecordButton
          label='wait'
          onClick={() => {
            console.log('버튼 클릭 이벤트');
          }}
        />
      ),
    },
  ];

  const labelStr = (index: number) => {
    return index % 2 === 0 ? 'You' : 'A';
  };

  const labelColor = (index: number) => {
    const str = labelStr(index);
    return str === 'A' ? 'var(--color-blue-100)' : 'var(--color-yellow-100)';
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel='완료하기'
      onSubmit={() => {
        console.log('submit 이벤트');
      }}
    >
      <Box marginTop={'40px'}>
        <List
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap marginBottom={'20px'}>
              <Box>
                <Label value={labelStr(index)} type={'paint'} size={'x-small'} background={labelColor(index)} />
              </Box>
              <Box width={'80%'} whiteSpace='nowrap'>
                {value?.content}
              </Box>
              <Box width={'20%'} hAlign='flex-end' vAlign='flex-start'>
                {value?.recordButton}
              </Box>
            </BoxWrap>
          )}
        />
      </Box>
    </Container>
  );
};

export default HE00901;
