import { ChangeEvent, useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import List, { IListProps } from './List';
import Input from '../../atoms/Input/Input';
import BoxWrap, { Box } from '../../atoms/Box/Box';

const meta = {
  title: 'Molecules/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;

const mock = [
  {
    text: 'debate width new friends',
  },
  {
    text: 'have an interview for a club',
  },
  {
    text: 'check out some recent news',
  },
];

const TemplateRow: StoryFn<typeof List> = ({ data, ...args }: IListProps<any>) => {
  return (
    <List
      data={data}
      row={({ value, index = 1 }) => (
        <Box>
          {index}. {value?.text}
        </Box>
      )}
      {...args}
    />
  );
};

const TemplateChildren: StoryFn<typeof List> = ({ data, ...args }: IListProps<any>) => {
  const [modalInputs, setModalInputs] = useState([
    {
      question: ' What are you worried about as a newcomer?',
      modalValue: '',
    },
    {
      question: 'How can you overcome these concerns? Write 2 solutions.',
      modalValue: '',
    },
    {
      question: 'What would you say to encourage other newcomers?',
      modalValue: '',
    },
  ]);

  const handleModalInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setModalInputs(result => result?.map((val, idx) => (idx === index ? { ...val, modalValue: value } : val)));
  };

  return (
    <List data={modalInputs} {...args}>
      {({ value, index = 1 }) => (
        <BoxWrap>
          <Box>
            {index}. {value?.text}
          </Box>
          <Input width='100%' marginLeft={30} name='modalValue' value={value?.modalValue} onChange={val => handleModalInput(val, index - 1)} />
        </BoxWrap>
      )}
    </List>
  );
};

export const ListRow: StoryFn<typeof List> = TemplateRow.bind({});
ListRow.args = {
  data: mock,
};

export const ListChildren: StoryFn<typeof List> = TemplateChildren.bind({});
ListChildren.args = {
  data: mock,
};
