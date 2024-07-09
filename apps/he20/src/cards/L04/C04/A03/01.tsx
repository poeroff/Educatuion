import { TMainHeaderInfoTypes, Typography, Input, Tag, ETagLine, Box, List, EStyleFontSizes, EStyleButtonTypes, Scroll } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useCallback } from 'react';

export type TAnswers = { text: string; value: string; answer: string };

interface IP01 {
  savedAns: TAnswers[];
  isSubmitted: boolean;
  onSubmit: (ans: TAnswers[]) => void;
}

const P01 = ({ savedAns, isSubmitted, onSubmit }: IP01) => {
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 1. Think and Plan',
  };

  const questionInfo = {
    text: 'Answer the questions to prepare for a debate.',
  };

  const [data, setData] = useState<TAnswers[]>(savedAns);

  const handleChange = (index: number, value: string) => {
    setData(data.map((item, idx) => (idx + 1 === index ? { ...item, value } : item)));
  };

  const handleSubmit = useCallback(() => {
    onSubmit(data);
  }, [data, onSubmit]);

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={isSubmitted ? (isShow ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.DEFAULT}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!data.every(item => item.value)}
      onSubmit={isSubmitted ? handleShowAnswer : handleSubmit}
    >
      <Scroll>
        <List data={data} gap={20}>
          {({ value: item, index = 0 }) => (
            <Box>
              <Typography>{item?.text}</Typography>
              <Box marginTop={'8px'} paddingLeft={'40px'}>
                <Input
                  width='100%'
                  value={item?.value}
                  placeholder='내용을 넣어주세요.'
                  textAlign='left'
                  onChange={e => handleChange(index, e.target.value)}
                  maxLength={1000}
                />
              </Box>
            </Box>
          )}
        </List>

        {isShow && isSubmitted && (
          <Box background='lightGray' borderRadius='12px' marginTop='40px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='모범답안' />
            </Box>
            <Box marginTop='10px'>
              {savedAns.map((value, index) => (
                <Typography
                  key={Number(index + 40)}
                  size={EStyleFontSizes.SMALL}
                  usePre
                  dangerouslySetInnerHTML={{ __html: `${index + 1}. ${value?.answer}` }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Scroll>
    </Container>
  );
};

export default P01;
