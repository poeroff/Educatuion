import { useState } from 'react';
import {
  Box,
  Typography,
  TMainHeaderInfoTypes,
  IQuestionProps,
  EStyleSizes,
  EStyleButtonTypes,
  Button,
  Input,
  List,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  order: number;
  content: React.ReactNode;
  isReadOnlly?: boolean;
  inputStatus?: InputStatus;
}

const data: IListenAndAnswer[] = [
  {
    order: 1,
    content: <>Coach Biscuit introduced a new member, Cathy.</>,
    isReadOnlly: true,
    inputStatus: InputStatus.DEFAULT,
  },
  {
    order: 5,
    content: <>Cathy jumped into the air and got the ball.</>,
  },
  {
    order: 4,
    content: <>After the game, everyone talked about Cathy.</>,
    inputStatus: InputStatus.ERROR,
  },
  {
    order: 6,
    content: <>The dogs started a game without Cathy.</>,
    inputStatus: InputStatus.ERROR,
  },
  {
    order: 2,
    content: <>The dogs looked at the ball and ran toward it.</>,
    inputStatus: InputStatus.ERROR,
  },
  {
    order: 3,
    content: <>During the game, the ball was going over the fence.</>,
  },
];

const ME11601 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [inputData, setInputData] = useState(data);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Read and Put in Order',
  };

  const questionInfo: IQuestionProps = {
    text: '본문의 내용과 일치하도록 순서대로 빈칸에 번호를 써 봅시다. ',
    mark: 'incorrect',
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    index = index > 0 ? index - 1 : 0;
    setInputData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], order: Number(newValue) };
      return newData;
    });
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='채점하기'
    >
      <Box useFull>
        <Box hAlign='flex-end'>
          <Button minWidth='96px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound />
        </Box>
        <Box>
          <Box useFull>
            <List<IListenAndAnswer>
              data={inputData}
              row={({ value, index = 1 }) => (
                <Box vAlign='flex-start' key={index} height='52px' alignItems='center' marginTop={index === 1 ? '3px' : 'unset'}>
                  <Box padding='10px 0' marginRight={8} vAlign='center'>
                    <Input
                      value={value?.order.toString()}
                      width='52px'
                      textAlign='center'
                      ariaLabel='본문의 순서에 맞게 번호를 적어주세요.'
                      readOnly={value?.isReadOnlly || false}
                      onChange={e => {
                        handleInputChange(index, e);
                      }}
                      status={value?.inputStatus}
                    />
                  </Box>
                  <Box flex={1} paddingTop='8px'>
                    <Typography>{value?.content}</Typography>
                  </Box>
                </Box>
              )}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ME11601;
