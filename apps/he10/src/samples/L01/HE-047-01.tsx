import { useState } from 'react';
import { TMainHeaderInfoTypes, IQuestionProps, Table, TBody, TR, TD, TH, EStyleTableTypes, Textarea, Question, Box, Scroll } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE04701 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Plan and Write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Choose a book that you want to review and complete the form.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useExtend
    >
      <Scroll tabIndex={0}>
        <Table color={EStyleTableTypes.COLORFUL} sizes={['258px', 'auto', '181px', 'auto']}>
          <caption></caption>
          <TBody>
            <TR>
              <TH color={EStyleTableTypes.COLORFUL} scope='row' hAlign='center'>
                Title
              </TH>
              <TD color={EStyleTableTypes.COLORFUL}>
                <Textarea placeholder='내용을 넣어주세요.' height='80px' width='100%' />
              </TD>
              <TH color={EStyleTableTypes.COLORFUL} scope='row' hAlign='center'>
                Author
              </TH>
              <TD color={EStyleTableTypes.COLORFUL}>
                <Textarea placeholder='내용을 넣어주세요.' height='80px' width='100%' />
              </TD>
            </TR>
            <TR>
              <TH color={EStyleTableTypes.COLORFUL} scope='row' hAlign='center'>
                Plot <br /> Summary
              </TH>
              <TD color={EStyleTableTypes.COLORFUL} colSpan={3}>
                <Textarea placeholder='내용을 넣어주세요.' height='80px' width='100%' />
              </TD>
            </TR>
            <TR>
              <TH color={EStyleTableTypes.COLORFUL} scope='row' hAlign='center'>
                Personal <br /> Refelction
              </TH>
              <TD color={EStyleTableTypes.COLORFUL} colSpan={3}>
                <Box>
                  <Question type='dot' size='small'>
                    Most Moving Part:
                  </Question>
                  <Textarea placeholder='내용을 넣어주세요.' height='80px' width='100%' />
                </Box>
                <Box marginTop={10}>
                  <Question type='dot' size='small'>
                    Feeling:
                  </Question>
                  <Textarea placeholder='내용을 넣어주세요.' height='80px' width='100%' />
                </Box>
              </TD>
            </TR>
            <TR>
              <TH color={EStyleTableTypes.COLORFUL} scope='row' hAlign='center'>
                Reason for
                <br /> Recommendation
              </TH>
              <TD color={EStyleTableTypes.COLORFUL} colSpan={3}>
                <Textarea placeholder='내용을 넣어주세요.' height='80px' width='100%' />
              </TD>
            </TR>
          </TBody>
        </Table>
      </Scroll>
    </Container>
  );
};

export default HE04701;
