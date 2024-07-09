import React, { useState } from 'react';
import { Button } from '@maidt-cntn/ui';
import style from './Tools.style';
import { Compass } from './Compass/Compass';
import { Ruler, TriangleRuler, Protractor } from './Ruler/Ruler';
import { Time } from './Time';

export const Tools = () => {
  const [showCompass, setShowCompass] = useState(false);
  const [showTime, setShowTime] = useState(true);
  const [showRuler, setShowRuler] = useState(false);
  const [showTriangleRuler, setShowTriangleRuler] = useState(false);
  const [showProtractor, setShowProtractor] = useState(false);
  return (
    <style.ToolsContainer>
      <style.ToolsWrapper>
        <Compass show={showCompass} setShow={setShowCompass} zIndex={0} />
        {showTime && <Time setShow={setShowTime} zIndex={0} />}
        {showRuler && <Ruler zIndex={0} setShow={setShowRuler} />}
        {showTriangleRuler && <TriangleRuler zIndex={0} setShow={setShowTriangleRuler} />}
        {showProtractor && <Protractor zIndex={0} setShow={setShowProtractor} />}
      </style.ToolsWrapper>
      <style.ButtonWrapper>
        <Button onClick={() => setShowCompass(prev => !prev)}>Compass</Button>
        <Button onClick={() => setShowTime(true)}>StopWatch</Button>
        <Button onClick={() => setShowRuler(true)}>Ruler</Button>
        <Button onClick={() => setShowTriangleRuler(true)}>TriangleRuler</Button>
        <Button onClick={() => setShowProtractor(true)}>Protractor</Button>
      </style.ButtonWrapper>
    </style.ToolsContainer>
  );
};

export interface ITools {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  zIndex: number;
}
