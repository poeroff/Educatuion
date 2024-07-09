import { ChangeEvent, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Scroll,
  Button,
  Input,
  Recorder,
  BoxWrap,
  EStyleButtonTypes,
  EStyleSizes,
  List,
  Question,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE01102 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 3. Present and Share',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Fill in the blanks to present your speech.',
  };

  const [isRecordingDone, setIsRecordingDone] = useState(false);

  const [inputs, setInputs] = useState({
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
  });

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

  const handleInputChangeEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    if (value) {
      target.style.width = 'auto';
      target.style.width = `${target.scrollWidth}px`;
      target.style.maxWidth = '99%';
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleModalInputChangeEvent = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setModalInputs(result => result?.map((val, idx) => (idx === index ? { ...val, modalValue: value } : val)));
  };

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitBtnColor={EStyleButtonTypes.TERTIARY}
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitDisabled={!isRecordingDone}
      submitLabel={'완료하기'}
    >
      <Box background={'white'} useRound>
        <Scroll height='300px'>
          Hello, I'm <Input maxLength={999} name='value1' value={inputs.value1} width='310px' onChange={handleInputChangeEvent} />
          . It's a great honor to speak as a represontative of the 1st grade students. As a newcomer myself, I understand how everybody is feeling at
          the moment.
          <br />
          We might feel a bit worried about{' '}
          <Input maxLength={999} name='value2' value={inputs.value2} width='259px' onChange={handleInputChangeEvent} />
          .
          <br />
          Instead of focusing on those worries, let's try a few things together.
          <br />
          First, <Input maxLength={999} name='value3' value={inputs.value3} width='310px' onChange={handleInputChangeEvent} />. Second,
          <Input maxLength={999} name='value4' value={inputs.value4} width='310px' onChange={handleInputChangeEvent} />. <br />I hope we all can{' '}
          <Input maxLength={999} name='value5' value={inputs.value5} width='310px' onChange={handleInputChangeEvent} />.
        </Scroll>
      </Box>

      <BoxWrap justifyContent={'space-between'} marginTop={'24px'} width={'100%'}>
        <Box width={'30%'}></Box>
        <Box width={'30%'} hAlign='center'>
          <Recorder recorderIndex={0} onSubmit={() => setIsRecordingDone(true)} onRefresh={() => setIsRecordingDone(false)} />
        </Box>
        <Box width={'30%'} hAlign='flex-end'>
          <Button
            label={'작성 내용 보기'}
            color={EStyleButtonTypes.SECONDARY}
            size={EStyleSizes['SMALL']}
            minWidth='132px'
            useRound
            onClick={openModal}
          />
        </Box>
      </BoxWrap>

      <Dialog width={921} height={500} isShow={isShowModal} closeLabel='확인' onClose={closeModal} useFooter={true} confirmLabel='확인'>
        <Box>
          <Scroll>
            <List data={modalInputs} gap={24}>
              {({ value, index = 1 }) => (
                <>
                  <Question type={'dot'} size={'small'}>
                    {value?.question}
                  </Question>
                  <Box marginTop='8px'>
                    <Input
                      maxLength={999}
                      width='100%'
                      name='modalValue'
                      value={value?.modalValue}
                      onChange={val => handleModalInputChangeEvent(val, index - 1)}
                    />
                  </Box>
                </>
              )}
            </List>
          </Scroll>
        </Box>
      </Dialog>
    </Container>
  );
};

export default HE01102;
