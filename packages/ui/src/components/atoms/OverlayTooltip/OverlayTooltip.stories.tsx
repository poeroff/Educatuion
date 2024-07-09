import type { Meta, StoryFn } from '@storybook/react';
import OverlayTooltip from './OverlayTooltip';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Box, ESvgType, SvgIcon } from '@maidt-cntn/ui';
import GreaterSvg from '@maidt-cntn/assets/icons/greater_than.svg';
import LessSvg from '@maidt-cntn/assets/icons/less_than.svg';
import EqualSvg from '@maidt-cntn/assets/icons/equalto.svg';

const meta = {
  title: 'Atoms/OverlayTooltip',
  component: OverlayTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '사용 하실때, 툴팁을 그리고자 하는 컴포넌트에 "data-tooltip-id" 속성에 준 값과 OverlayTooltip 컴포넌트의 id 값을 매칭 시켜 사용하면 됩니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OverlayTooltip>;

export default meta;

const Template: StoryFn<typeof OverlayTooltip> = ({ type, children, place, ...rest }) => {
  return (
    <div>
      <FullContainer>
        <BorderSpan data-tooltip-id='cloud_tooltip'>Cloud Tooltip Cloud Tooltip Cloud Tooltip</BorderSpan>
        <OverlayTooltip {...rest} id='cloud_tooltip' type={type} place={place}>
          {children ? (
            children
          ) : (
            <>
              <div>This is Sample</div>
              <div>This is Sample</div>
            </>
          )}
        </OverlayTooltip>
      </FullContainer>
    </div>
  );
};

const ClickTemplate: StoryFn<typeof OverlayTooltip> = ({ type, children, place, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectSvg, setSelectSvg] = useState<any>(LessSvg);
  const onClickTooltip = (type: 'greater' | 'equal' | 'smaller') => {
    setSelectSvg(type === 'greater' ? GreaterSvg : type === 'equal' ? EqualSvg : LessSvg);
  };

  const MySVG = () => {
    return <SvgIcon type={ESvgType.IMG} width='10px' src={selectSvg} />;
  };
  return (
    <div>
      <FullContainer>
        <Wrap>
          <span>3 * 4</span>
          <Circle data-tooltip-id='click_tooltip' onClick={() => setIsOpen(!isOpen)}>
            <MySVG />
          </Circle>
          <span>5 * 4</span>
        </Wrap>

        <OverlayTooltip openOnClick id='click_tooltip' type={type} place={place}>
          {children ? (
            children
          ) : (
            <Wrap>
              <Circle onClick={() => onClickTooltip('greater')}>
                <SvgIcon type={ESvgType.IMG} width='10px' src={GreaterSvg} />
              </Circle>
              <Circle onClick={() => onClickTooltip('equal')}>
                <SvgIcon type={ESvgType.IMG} width='10px' src={EqualSvg} />
              </Circle>
              <Circle onClick={() => onClickTooltip('smaller')}>
                <SvgIcon type={ESvgType.IMG} width='10px' src={LessSvg} />
              </Circle>
            </Wrap>
          )}
        </OverlayTooltip>
      </FullContainer>
    </div>
  );
};

const ClickCloseTemplate: StoryFn<typeof OverlayTooltip> = ({ type, children, place, ...rest }) => {
  return (
    <div>
      <FullContainer>
        <BorderSpan data-tooltip-id='close_tooltip'>Normal Tooltip With Close Button</BorderSpan>
        <OverlayTooltip {...rest} id='close_tooltip' type={type} place={place}>
          {children ? (
            children
          ) : (
            <Box width='448px'>
              <div>This is Sample</div>
              <div>This is Sample</div>
            </Box>
          )}
        </OverlayTooltip>
      </FullContainer>
    </div>
  );
};

const FullContainer = styled.div`
  width: 60vw;
  height: 500px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;

const Circle = styled.div`
  width: 30px;
  border-radius: 30px;
  background-color: white;
  height: 30px;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const BorderSpan = styled.div`
  border: 1px solid black;
  padding: 10px;
`;

const Wrap = styled.div`
  display: flex;

  gap: 16px;
`;

export const Default: StoryFn<typeof OverlayTooltip> = Template.bind({});
Default.args = {};

export const ClickOpen: StoryFn<typeof OverlayTooltip> = ClickTemplate.bind({});
ClickOpen.args = {};

export const ClickClose: StoryFn<typeof OverlayTooltip> = ClickCloseTemplate.bind({});
ClickClose.args = { openOnClick: true, showClose: true };
