import { useState } from 'react';
import { BoxWrap, Box, TMainHeaderInfoTypes, BottomSheet, Dialog, Textarea, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE00301 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think Ahead',
  };

  const [isShow, setShow] = useState(false);
  const [value, setValue] = useState<string>('');
  const [isComplete, setComplete] = useState(false);

  const handelModal = () => {
    setShow(!isShow);
  };

  const completeQnA = () => {
    setShow(false);
    setComplete(true);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      submitBtnColor={EStyleButtonTypes.PRIMARY}
      submitLabel={isComplete ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={value === '' ? true : false}
      onSubmit={handelModal}
    >
      <BoxWrap useFull>
        <Box hAlign={'center'} useFull>
          How do you feel about
          <br /> starting at a new school?
        </Box>
        <Box useFull>
          <Textarea
            value={value}
            onChange={event => setValue(event.target.value)}
            readOnly={isComplete ? true : false}
            placeholder='내용을 넣어 주세요.'
          />
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='20%' show={isShow && isComplete}>
        <div>
          <p>I was a bit nervous.</p>
          <p>I was very excited.</p>
        </div>
      </BottomSheet>

      <Dialog
        width={400}
        height={200}
        useFooter
        isShow={isShow && !isComplete && value.length > 0}
        closeLabel='아니오'
        confirmLabel='예'
        onClose={handelModal}
        onConfirm={completeQnA}
      >
        <div style={{ textAlign: 'center', marginTop: '40px' }}>완료하시겠습니까?</div>
      </Dialog>
    </Container>
  );
};

export default HE00301;
