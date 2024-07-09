import { useState } from 'react';
import { TMainHeaderInfoTypes, Typography, Input, Dialog, EStyleFontSizes, Box, List } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

type TAnswers = { text: string; value: string };

const HE01001 = () => {
  const [emptyBoxDialogShow, SetEmptyBoxDialogShow] = useState<boolean>(false);
  const [overwriteBoxDialogShow, SetOverwriteBoxDialogShow] = useState<boolean>(false);
  const [isSaved, SetIsSaved] = useState<boolean>(false);

  const [data, setData] = useState<Array<TAnswers>>([
    {
      text: `1. What are you worried about as a newcomer?`,
      value: '',
    },
    {
      text: `2. What would you say to encourage other newcomers?`,
      value: '',
    },
    {
      text: `3. How can you overcome these concerns? Write 2 solutions.`,
      value: '',
    },
  ]);

  // 제출할 답안 반환하는 코드 - 추후 사용 예정
  // const getAnswers = () => {
  //   return data.map(item => item.value);
  // }

  const handleSave = () => {
    SetIsSaved(true);
    return;
  };

  const handleChange = (index: number, value: string) => {
    setData(data.map((item, idx) => (idx + 1 === index ? { ...item, value } : item)));
  };

  const handleSubmit = () => {
    if (data.every(item => item.value)) {
      if (isSaved) {
        SetOverwriteBoxDialogShow(true);
      } else {
        handleSave();
      }
    } else {
      SetEmptyBoxDialogShow(true);
    }
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Answer the questions to prepare for your speech.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} onSubmit={handleSubmit} submitLabel='완료하기'>
      <List data={data} gap={20}>
        {({ value: item, index = 0 }) => (
          <Box>
            <Typography>{item?.text}</Typography>
            <Box marginTop={'8px'} paddingLeft={'40px'}>
              <Input
                width='100%'
                value={item?.value}
                onChange={e => handleChange(index, e.target.value)}
                maxLength={100}
                placeholder='내용을 넣어 주세요.'
              />
            </Box>
          </Box>
        )}
      </List>

      <Dialog
        isShow={emptyBoxDialogShow}
        useFooter
        onClose={() => {
          SetEmptyBoxDialogShow(false);
        }}
        closeLabel='닫기'
      >
        <Typography>빈칸을 다 채워주세요!</Typography>
      </Dialog>

      <Dialog
        isShow={overwriteBoxDialogShow}
        useFooter
        onClose={() => {
          SetOverwriteBoxDialogShow(false);
        }}
        onConfirm={() => {
          SetOverwriteBoxDialogShow(false);
          handleSave();
        }}
      >
        <Typography size={EStyleFontSizes.SMALL}>저장된 내용이 있습니다.</Typography>
        <br />
        <Typography size={EStyleFontSizes.SMALL}>다시 저장하시겠습니까? </Typography>
        <br />
        <Typography size={EStyleFontSizes.SMALL}>"예"를 누르면 기존에 저장된 내용은 사라집니다.</Typography>
      </Dialog>
    </Container>
  );
};

export default HE01001;
