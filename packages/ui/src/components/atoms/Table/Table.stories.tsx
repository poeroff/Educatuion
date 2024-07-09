import type { Meta, StoryFn } from '@storybook/react';
import { Table, ITable, TBody, TR, TD, TH } from './Table';
import { EStyleTableTypes, EStyleThemeTypes } from '../../../styles/types';

const meta = {
  title: 'Molecules/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;

const TemplateListTable: StoryFn<typeof Table> = ({ ...args }: ITable) => {
  return (
    <>
      <Table {...args}>
        <TBody>
          <TR>
            <TH scope='col'>Title</TH>
            <TH scope='col'>Title</TH>
            <TH scope='col'>Title</TH>
            <TH scope='col'>Title</TH>
            <TH scope='col'>Title</TH>
            <TH scope='col'>Title</TH>
            <TH scope='col'>Title</TH>
          </TR>
          <TR>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
          </TR>
          <TR isActive>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
          </TR>
          <TR>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
          </TR>
          <TR>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
          </TR>
          <TR>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
            <TD>Text</TD>
          </TR>
        </TBody>
      </Table>
    </>
  );
};

const TemplateFormTable: StoryFn<typeof Table> = ({ ...args }: ITable) => {
  return (
    <>
      <Table {...args}>
        <TBody>
          <TR>
            <TH scope='row'>Title</TH>
            <TD>Text</TD>
          </TR>
          <TR>
            <TH scope='row'>Title</TH>
            <TD>Text</TD>
          </TR>
          <TR>
            <TH scope='row'>Title</TH>
            <TD>Text</TD>
          </TR>
        </TBody>
      </Table>
    </>
  );
};

export const Default: StoryFn<typeof Table> = TemplateListTable.bind({});
Default.args = {
  color: EStyleTableTypes.GRAY,
  useHover: true,
};

export const Secondery: StoryFn<typeof Table> = TemplateFormTable.bind({});
Secondery.args = {
  color: EStyleTableTypes.SECONDARY,
};

export const Tertiary: StoryFn<typeof Table> = TemplateFormTable.bind({});
Tertiary.args = {
  color: EStyleTableTypes.TERTIARY,
};

export const Math: StoryFn<typeof Table> = TemplateFormTable.bind({});
Math.args = {
  color: EStyleTableTypes.MATH,
};
