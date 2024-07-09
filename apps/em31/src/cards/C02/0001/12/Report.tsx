import { useState } from 'react';
import { Box, Dialog, EStyleButtonTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import P01 from './01';
import usePageData from '@/hooks/usePageData';

const Report = () => {
  const { saveData } = usePageData();

  const [isShow, setShow] = useState<boolean>(false);

  return (
    <Container
      headerInfo={null}
      background={'var(--color-white)'}
      submitBtnColor={EStyleButtonTypes.YELLOW}
      useLinkLabel
      linkLabel='맞춤 학습하기'
      onLink={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <Typography>더미 리포트 페이지 (하단의 "맞춤 학습하기"를 클릭해 주세요.)</Typography>
      <Dialog
        isShow={isShow}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setShow(false);
          saveData('P01');
        }}
        onConfirm={() => {
          setShow(false);
        }}
      >
        <P01 key={'P01'} />
      </Dialog>
    </Container>
  );
};

export default Report;
