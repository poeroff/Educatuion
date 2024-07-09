import styled from '@emotion/styled';
import { useState } from 'react';
import { BottomSheet, Box, EStyleFontSizes, ETagLine, Tag, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const data = ['$\\sqrt{2i}$', '$0$', '$-6$', '$1 - 4i$'];

const HM03801 = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [droppedNodes, setDroppedNodes] = useState<{ node: string; dropZone: string }[]>([]);

  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBenefit',
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Enter') {
      setSelectedNode(index);
    }
  };

  const handleNodeClick = (index: number) => {
    const node = data[index];
    if (droppedNodes.some(dn => dn.node === node)) {
      setDroppedNodes(droppedNodes.filter(dn => dn.node !== node));
    } else {
      setSelectedNode(index);
    }
  };

  const handleDropZoneClick = (zone: string) => {
    if (selectedNode !== null) {
      const node = data[selectedNode];
      if (!droppedNodes.some(dn => dn.node === node)) {
        setDroppedNodes(prev => [...prev, { node, dropZone: zone }]);
      }
      setSelectedNode(null);
    }
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start' submitLabel='풀이보기' onSubmit={handleShowAnswer} bodyId='targetContainer'>
      <Typography weight='var(--font-weight-semiBold)' fontSize='var(--font-size-32)' lineHeight='50px'>
        다음 복소수를 알맞은 곳에 각각 넣어보자.
      </Typography>
      <Box hAlign='center' marginTop={24}>
        {data.map((item, index) => (
          <NodeBox
            key={index}
            role='button'
            aria-label={item}
            tabIndex={0}
            onClick={() => handleNodeClick(index)}
            onKeyPress={e => handleKeyPress(e, index)}
            selected={selectedNode === index}
            dropped={droppedNodes.some(dn => dn.node === item)}
          >
            <Typography>
              <MathExpression equation={item} />
            </Typography>
          </NodeBox>
        ))}
      </Box>
      <Box useFull marginTop={100} vAlign='center'>
        <DropZone type='button' color='#FABF14' aria-label='실수' onClick={() => handleDropZoneClick('real')}>
          <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-h-math-yellow-strong)' weight='var(--font-weight-semiBold)'>
            실수
          </Typography>
          {droppedNodes
            .filter(dn => dn.dropZone === 'real')
            .map((dn, idx) => (
              <NodeBox
                key={idx}
                aria-label={dn.node}
                tabIndex={0}
                dropped
                onClick={() => handleNodeClick(data.indexOf(dn.node))}
                onKeyPress={e => handleNodeClick(data.indexOf(dn.node))}
              >
                <Typography>
                  <MathExpression equation={dn.node} />
                </Typography>
              </NodeBox>
            ))}
        </DropZone>
        <DropZone type='button' color='#F287B6' aria-label='허수' onClick={() => handleDropZoneClick('imaginary')}>
          <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-h-math-yellow-strong)' weight='var(--font-weight-semiBold)'>
            허수
          </Typography>
          {droppedNodes
            .filter(dn => dn.dropZone === 'imaginary')
            .map((dn, idx) => (
              <NodeBox
                key={idx}
                aria-label={dn.node}
                tabIndex={0}
                dropped
                onClick={() => handleNodeClick(data.indexOf(dn.node))}
                onKeyPress={e => handleNodeClick(data.indexOf(dn.node))}
              >
                <Typography>
                  <MathExpression equation={dn.node} />
                </Typography>
              </NodeBox>
            ))}
        </DropZone>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              <MathExpression equation='$0$' />
              과&nbsp;
              <MathExpression equation='$6$' /> 은 실수이고,&nbsp;
              <MathExpression equation='$\\sqrt{2i}$' />
              와&nbsp;
              <MathExpression equation='$1-4i$' />는 허수이다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </HContainer>
  );
};

const NodeBox = styled.div<{ selected?: boolean; dropped?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 170px;
  padding: 4px 0;
  border: 2px solid ${({ selected }) => (selected ? 'var(--color-blue-700)' : 'var(--color-h-math-primary-origin)')};
  border-radius: var(--border-radius);
  background-color: ${({ selected }) => (selected ? 'var(--color-blue-100)' : 'var(--color-white)')};
  box-shadow: 4px 4px ${({ selected }) => (selected ? 'var(--color-blue-100)' : '#49c0b640')};

  opacity: ${({ dropped }) => (dropped ? '0.2' : '1')};

  cursor: pointer;

  & + * {
    margin-left: 10px;
  }
`;

const DropZone = styled.button<{ color: string }>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 48px 24px 24px;
  border: 2px solid ${({ color }) => color};
  border-radius: var(--border-radius);
  box-shadow: 4px 4px ${({ color }) => color}66;

  cursor: pointer;

  > div {
    width: calc(50% - 5px);
    height: calc(50% - 5px);
    opacity: 1;

    :nth-of-type(odd) {
      margin-left: 0;
    }

    :nth-of-type(1),
    :nth-of-type(2) {
      margin-bottom: 10px;
    }
  }

  > span {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 24px;
    background-color: var(--color-white);
    border: 2px solid ${({ color }) => color};
    border-radius: var(--border-radius);
    box-shadow: 14px 20px #fff, 8px 1px ${({ color }) => color}66;
  }

  & + * {
    margin-left: 24px;
  }
`;

export default HM03801;
