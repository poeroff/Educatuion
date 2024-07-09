import { useState } from 'react';
import {
  Box,
  BoxWrap,
  TableMathCaption,
  EStyleButtonTypes,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  Label,
  THead,
  TBody,
  TD,
  TH,
  TR,
  TFoot,
  Tag,
  ETagLine,
  Table,
  Typography,
  TableCaption,
  BottomSheet,
  Mark,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EMA00701 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        계산을 하고, 각 자리수에 알맞은 글자를 찾아 문장을 만들어 보세요.
      </>
    ),
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShow, setShow] = useState(false);
  const [answer1, setAnswer1] = useState<string[]>(['', '', '']);
  const [answer2, setAnswer2] = useState<string[]>(['', '', '']);
  const [answer3, setAnswer3] = useState<string>('');

  const words = ['나', '랑', '요', '도', '해', '월', '독', '야', '사', '너'];
  const index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const onChangeAnswer1 = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setAnswer1(prev => prev.map((value, idx) => (idx === index ? event.target.value : value)));
  };

  const onChangeAnswer2 = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setAnswer2(prev => prev.map((value, idx) => (idx === index ? event.target.value : value)));
  };

  const onSubmit = () => {
    if (!isSubmitted) {
      setIsSubmitted(true);
    } else {
      setShow(!isShow);
    }
  };
  const isBtnDisabled = () => {
    return answer1.some(answer => answer === '') || answer2.some(answer => answer === '') || answer3 === '';
  };
  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      vAlign='flex-start'
      submitLabel={isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitBtnColor={!isBtnDisabled() ? (isShow ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isBtnDisabled()}
      onSubmit={() => {
        onSubmit();
      }}
      useRound
    >
      <BoxWrap height={'206px'} justifyContent='center'>
        <Box type='line' hAlign='center' flexDirection='column' useRound useFull width={300} height={200}>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['127', '+', '621']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>
                  <Mark type={'wrong'} size={'small'}>
                    7
                  </Mark>
                </TD>
                <TD>2</TD>
                <TD>1</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>1</TD>
                <TD>2</TD>
                <TD>6</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input value={answer1[2]} onChange={e => onChangeAnswer1(e, 2)} ariaLabel='1번 문제 일의 자리의 답' maxLength={1} />
                </TD>
                <TD>
                  <Input value={answer1[1]} onChange={e => onChangeAnswer1(e, 1)} ariaLabel='1번 문제 십의 자리의 답' maxLength={1} />
                </TD>
                <TD>
                  <Input value={answer1[0]} onChange={e => onChangeAnswer1(e, 0)} ariaLabel='1번 문제 백의 자리의 답' maxLength={1} />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
        <Box type='line' hAlign='center' flexDirection='column' useRound useFull width={300} height={200}>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['211', '+', '714']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>1</TD>
                <TD>1</TD>
                <TD>2</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD>1</TD>
                <TD>7</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input value={answer2[2]} onChange={e => onChangeAnswer2(e, 2)} ariaLabel='2번 문제 일의 자리의 답' maxLength={1} />
                </TD>
                <TD>
                  <Input value={answer2[1]} onChange={e => onChangeAnswer2(e, 1)} ariaLabel='2번 문제 십의 자리의 답' maxLength={1} />
                </TD>
                <TD>
                  <Input value={answer2[0]} onChange={e => onChangeAnswer2(e, 0)} ariaLabel='2번 문제 백의 자리의 답' maxLength={1} />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>

      <Box display='flex' justifyContent='center' marginTop={30}>
        <TableCaption caption='문장과 숫자 테이블' hidden />
        <Table color={EStyleTableTypes.YELLOW_SECONDARY}>
          <THead>
            <TR>
              {index.map((item, idx) => {
                return (
                  <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                    {item}
                  </TH>
                );
              })}
            </TR>
          </THead>
          <TBody>
            <TR>
              {words.map((word, idx) => {
                return (
                  <TD key={idx} scope='col' hAlign='center' width='100px' height='50px' color={EStyleTableTypes.DEFAULT}>
                    <Typography>{word}</Typography>
                  </TD>
                );
              })}
            </TR>
          </TBody>
        </Table>
      </Box>
      <Box hAlign='center' marginTop={30}>
        <Box marginTop='8px' vAlign='center' marginBottom='10px'>
          <Box
            color='var(--color-yellow-800)'
            backgroundColor='var(--color-yellow-100)'
            border='1px solid var(--color-yellow-700)'
            fontSize={22}
            borderRadius={50}
            display='flex'
            alignItems='center'
            padding='4px 18px'
            height={44}
            marginRight={8}
          >
            문장
          </Box>

          <Input
            minWidth='353px'
            marginLeft={8}
            value={answer3}
            onChange={e => {
              setAnswer3(e.target.value);
            }}
            ariaLabel='문장 답 입력칸'
          />
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} marginTop='12px' gap={'20px'}>
              <Typography>(1) 748</Typography>
              <Typography>(2) 925 </Typography>
              <Typography>(3) 독도야 사랑해</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='1번 세로셈 답 해설' math={['127', '+', '625']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>7</TD>
                      <TD>2</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>5</TD>
                      <TD>2</TD>
                      <TD>6</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>
                        <Input value={'8'} disabled={true} onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} />
                      </TD>
                      <TD>
                        <Input value={'4'} disabled={true} onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} />
                      </TD>
                      <TD>
                        <Input value={'7'} disabled={true} onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} />
                      </TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='2번 세로셈 답 해설' math={['211', '+', '714']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>1</TD>
                      <TD>1</TD>
                      <TD>2</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>4</TD>
                      <TD>1</TD>
                      <TD>7</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>
                        <Input value={'5'} readOnly={true} onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} />
                      </TD>
                      <TD>
                        <Input value={'2'} readOnly={true} onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} />
                      </TD>
                      <TD>
                        <Input value={'9'} readOnly={true} onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} />
                      </TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default EMA00701;
