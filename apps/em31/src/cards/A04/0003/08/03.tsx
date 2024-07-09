import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';

import React from 'react';
import { DialogContainer } from '@maidt-cntn/ui/math';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'basic',
  };

  const questionInfo: IQuestionProps = {
    text: '오답 시 맞춤 카드 2',
  };

  return <DialogContainer headerInfo={headerInfo} questionInfo={questionInfo} bodyId='targetContainer'></DialogContainer>;
};

export default P03;
