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
import styled from '@emotion/styled';
import { TAnswers } from '.';

interface IP03 {
  savedP01Ans: TAnswers[];
  isSubmitted: boolean;
  onSubmit: (val: boolean) => void;
}

const P03 = ({ savedP01Ans, isSubmitted, onSubmit }: IP03) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [recordeCompleted, setRecordeCompleted] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 3. Present and Share',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Fill in the blanks to present a lecture.',
  };

  const [inputs, setInputs] = useState({
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
    value6: '',
    value7: '',
    value8: '',
    value9: '',
  });

  const handleInputChangeEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    if (value) {
      target.style.width = `${value.length * 0.8 + 2}ch`;
      target.style.maxWidth = '99%';
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleRecordeSubmit = (status = true) => {
    setRecordeCompleted(status);
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
      submitDisabled={
        !recordeCompleted ||
        isSubmitted ||
        inputs.value1 === '' ||
        inputs.value2 === '' ||
        inputs.value3 === '' ||
        inputs.value4 === '' ||
        inputs.value5 === '' ||
        inputs.value6 === '' ||
        inputs.value7 === '' ||
        inputs.value8 === '' ||
        inputs.value9 === ''
      }
      onSubmit={() => {
        onSubmit(true);
      }}
      submitLabel='완료하기'
    >
      <Box background={'white'} useRound>
        <Scroll height='300px'>
          <BoldText>Debate Question:</BoldText>{' '}
          <Input
            name='value1'
            value={inputs.value1}
            minWidth='500px'
            maxLength={1000}
            onChange={handleInputChangeEvent}
            placeholder='e.g. Are chatbots helpful for studying?'
          />{' '}
          <br />I think{' '}
          <Input
            name='value2'
            value={inputs.value2}
            minWidth='330px'
            maxLength={1000}
            onChange={handleInputChangeEvent}
            placeholder='e.g. studying with chatbots'
          />{' '}
          is{' '}
          <Input
            name='value3'
            value={inputs.value3}
            minWidth='200px'
            maxLength={1000}
            onChange={handleInputChangeEvent}
            placeholder='e.g. effective'
          />{' '}
          It can
          <Input
            name='value4'
            value={inputs.value4}
            minWidth='650px'
            maxLength={1000}
            onChange={handleInputChangeEvent}
            placeholder='e.g. help students to improve their academic performance'
          />{' '}
          because
          <Input
            name='value5'
            value={inputs.value5}
            minWidth='600px'
            maxLength={1000}
            onChange={handleInputChangeEvent}
            placeholder='e.g. they can get personalized support from chatbots'
          />
          .<br /> I believe{' '}
          <Input
            name='value6'
            value={inputs.value6}
            minWidth='340px'
            maxLength={1000}
            onChange={handleInputChangeEvent}
            placeholder='e.g. studying with chatbots'
          />{' '}
          is{' '}
          <Input
            name='value7'
            value={inputs.value7}
            minWidth='200px'
            maxLength={1000}
            onChange={handleInputChangeEvent}
            placeholder='e.g. not good'
          />
          . <br /> It can{' '}
          <Input
            name='value8'
            value={inputs.value8}
            minWidth='500px'
            maxLength={1000}
            onChange={handleInputChangeEvent}
            placeholder='e.g. keep students from thinking critically'
          />{' '}
          because
          <Input
            name='value9'
            value={inputs.value9}
            minWidth='500px'
            maxLength={1000}
            onChange={handleInputChangeEvent}
            placeholder='e.g. they might end up relying on chatbots'
          />
        </Scroll>
      </Box>

      <BoxWrap justifyContent={'space-between'} marginTop={'24px'} width={'100%'}>
        <Box width={'30%'}></Box>
        <Box width={'30%'} hAlign='center'>
          <Recorder recorderIndex={0} onSubmit={handleRecordeSubmit} onRefresh={() => handleRecordeSubmit(false)} />
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
            <List data={savedP01Ans} gap={24}>
              {({ value, index = 1 }) => (
                <>
                  <Question type={'dot'} size={'small'}>
                    {value?.text}
                  </Question>
                  <Box marginTop='8px'>
                    <Input width='100%' name='modalValue' value={value?.value} disabled />
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

const BoldText = styled.span`
  font-weight: var(--font-weight-bold);
  font-size: 32px;
  line-height: 40px;
`;

export default P03;
