import { useState } from 'react';
import { BoxWrap, Box, TMainHeaderInfoTypes, Dialog, Textarea, Tag, ETagLine } from '@maidt-cntn/ui';
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

      {isShow && isComplete && (
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>답안자리</Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>해설 자리</Box>
        </Box>
      )}

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
