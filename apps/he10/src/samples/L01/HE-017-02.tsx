import { useState } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  ChipButton,
  Dialog,
  EChipButtonType,
  EStyleButtonTypes,
  EStyleSizes,
  List,
  Scroll,
  TMainHeaderInfoTypes,
  Question,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IData {
  contents: string;
  value: boolean | undefined;
}

const HE01702 = () => {
  const [isShow, setShow] = useState(false);

  const [opened, setOpened] = useState<boolean>(false);

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong (3/5)',
  };

  const questionInfo = {
    text: 'Q3. Read through the passage and complete the sentences.',
  };

  const [list, setList] = useState<IData[]>([
    {
      contents: 'When placed with partners that the chimpanzees knew, they were able to work together to get the food.',
      value: undefined,
    },
    {
      contents: 'The bonobos solved the problem regardless of which individual they were paired with',
      value: undefined,
    },
  ]);

  const handleChangeValue = (value: boolean, index?: number) => {
    setList(data => data?.map((val, idx) => (idx === index ? { ...val, value: value } : val)));
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
      <BoxWrap useFull>
        <Box width='60%'>
          <List data={list} gap={20}>
            {({ value, index = 1 }) => (
              <Question size='small'>
                <BoxWrap justifyContent='space-between' useFull>
                  <Box>{value?.contents}</Box>
                  <Box>
                    <BoxWrap>
                      <ChipButton
                        type='radio'
                        name={`chip-radio-${index}`}
                        status={EChipButtonType.TRUE}
                        isActive={value?.value === true}
                        size={'48px'}
                        onClick={() => handleChangeValue(true, index - 1)}
                      />
                      <ChipButton
                        type='radio'
                        name={`chip-radio-${index}`}
                        status={EChipButtonType.FALSE}
                        isActive={value?.value === false}
                        size={'48px'}
                        onClick={() => handleChangeValue(false, index - 1)}
                      />
                    </BoxWrap>
                  </Box>
                </BoxWrap>
              </Question>
            )}
          </List>
        </Box>
        <Box width='400px' useFull>
          <Box background='blue' useRound useFull>
            {opened ? (
              <>
                <Box hAlign='flex-end' marginBottom={'8px'}>
                  <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
                </Box>
                <Box height='calc(100% - 52px)'>
                  <Scroll height='100%'>
                    It’s good to see you, everyone! I’m Dr. Edward Wilson, an evolutionary biologist. Thank you for inviting me here today. On my way,
                    I had trouble locating this room. Luckily, a friendly student came up to me and walked me here. It’s fascinating how, in
                    situations like this, we want to help someone in need. Now, this raises some interesting questions: where does our friendliness
                    come from, and why is it important?
                  </Scroll>
                </Box>
              </>
            ) : (
              <Box vAlign='center' hAlign='center' useFull>
                <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
              </Box>
            )}
          </Box>
        </Box>
      </BoxWrap>
      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        정답 확인
      </Dialog>
    </Container>
  );
};

export default HE01702;
