import { Box, Checkbox, EStyleButtonTypes, Image, Typography, TMainHeaderInfoTypes, IQuestionProps, List } from '@maidt-cntn/ui';
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Container } from '@maidt-cntn/ui/en';

interface IData {
  text: string;
  state: boolean;
  isError?: boolean; //오답이 있는 문제일 경우 사용
}

const HE03401 = () => {
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Topic Preview',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Check if you have experienced the following online situations',
  };

  const [list, setList] = useState<IData[]>([
    {
      text: 'I rushed to buy things after seeing a “last chance” message.',
      state: false,
      isError: true,
    },
    {
      text: 'I couldn’t find the button to cancel my membership or subscription.',
      state: false,
    },
    {
      text: 'The actual price was different from what I saw on price-comparison sites.',
      state: false,
    },
    {
      text: 'Some item were being sold at the same price even after the promotional period had ended.',
      state: false,
    },
  ]);

  const isSelected = useMemo(() => {
    return list.some(val => val.state);
  }, [list]);

  const handleRowClick = (value?: boolean, index?: number) => {
    setList(data => data?.map((val, idx) => (idx === index ? { ...val, state: value || false } : val)));
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitBtnColor={EStyleButtonTypes.PRIMARY}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box background='gray' border='none' padding='4px 12px' hAlign='center'>
        <Typography useGap={false} weight={700}>
          My Experience with Online Shopping
        </Typography>
      </Box>
      <Box marginTop='20px'>
        <Box vAlign='flex-end' position='relative'>
          <Box width='100%' tabIndex={101}>
            <List data={list}>
              {({ value, index = 1 }) => (
                <ListItem
                  width={index > 2 ? 'calc(100% - 276px)' : '100%'}
                  isEven={index % 2 === 0}
                  isActive={value?.state}
                  isSelected={isSelected}
                  isError={value?.isError}
                >
                  <Checkbox
                    type={'check'}
                    label={value?.text}
                    value={value?.state}
                    onClick={val => handleRowClick(val.target?.checked, index - 1)}
                    isError={value?.isError}
                  />
                </ListItem>
              )}
            </List>
          </Box>
          <BackgroundImage>
            <Image src={'/example/HE2-L02-C05-A02.png'} alt='' />
          </BackgroundImage>
        </Box>
      </Box>
    </Container>
  );
};

export default HE03401;

export const BackgroundImage = styled.div`
  position: absolute;
  z-index: -1;
  right: 0;
  bottom: 0;
`;

export const ListItem = styled.div<{ isEven?: boolean; isActive?: boolean; isSelected?: boolean; width?: string; isError?: boolean }>`
  padding: 6px 12px;
  border-radius: 8px;

  ${({ isEven }) =>
    isEven &&
    `
      background-color: var(--color-blue-50);
  `};

  width: ${({ width }) => width};
  ${({ isActive, isError }) =>
    isActive
      ? isError
        ? `
      background-color: var(--color-red-50);
      outline: 1px solid var(--color-red-700);
      color: var(--color-red-800);
      `
        : `
      background-color: var(--color-blue-700);
      color: var(--color-white);
      `
      : ``}
`;
