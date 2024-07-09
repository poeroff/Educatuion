import { Container, DialogContainer } from '@maidt-cntn/ui/math';
import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  Typography,
  Dialog,
  Carousel,
  Question,
  DotIndicator,
  MainTitleHeader,
  Button,
  EStyleSizes,
  BottomSheet,
  Tag,
  ETagLine,
  Scroll,
} from '@maidt-cntn/ui';
import { useState, useRef } from 'react';
import Slider from 'react-slick';

interface IMath {
  id: number;
  value: number[];
  expression: string;
  sign: string;
}

const EM00001 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [isBottomSheetShow, setBottomSheetShow] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '계산을 해보세요',
  };

  const [mathList, setMathList] = useState<IMath[][]>(mockData);

  const sliderRef = useRef<Slider>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onChangeSlide = (idx: number) => {
    timerRef.current && clearTimeout(timerRef.current);
    setActiveIndex(idx);
  };

  const renderDigits = (number: number, maxLength: number) => {
    const digits = number.toString().split('').reverse();
    const addDigits = [...digits, ...Array(maxLength - digits.length).fill('')];
    return addDigits.map((digit, index) => <TD key={index}>{digit}</TD>);
  };

  const renderTableRows = (values: number[], sign: string) => {
    const maxLength = Math.max(...values.map(value => value.toString().length));
    return (
      <>
        {values.map((value, index) => (
          <TR key={index}>
            {renderDigits(value, maxLength)}
            {index === values.length - 1 && <TD>{sign}</TD>}
            {index !== values.length - 1 && <TD></TD>}
          </TR>
        ))}
      </>
    );
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useLinkLabel
      linkLabel='맞춤 학습하기'
      onLink={() => {
        setShow(!isShow);
      }}
      submitLabel='채점하기'
      submitBtnColor={EStyleButtonTypes.YELLOW}
      onSubmit={() => {}}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap height='304px'>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['24', '+', '7']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>4</TD>
                <TD>2</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>7</TD>
                <TD></TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} />
                </TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='십의 자리의 답' maxLength={1} />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop={24}>
            <Typography>56+18=</Typography>
            <Input width='130px' value={''} onChange={() => {}} ariaLabel='답 입력란' maxLength={1} />
          </Box>
        </Box>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['35', '-', '8']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>5</TD>
                <TD>3</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>8</TD>
                <TD></TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} />
                </TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='십의 자리의 답' maxLength={1} />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop={24}>
            <Typography>61-29=</Typography>
            <Input width='130px' value={''} onChange={() => {}} ariaLabel='답 입력란' maxLength={1} />
          </Box>
        </Box>
      </BoxWrap>

      <Dialog
        isShow={isShow}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setShow(false);
          setBottomSheetShow(false);
          setActiveIndex(0);
        }}
        onConfirm={() => {
          setShow(false);
        }}
      >
        <Box hAlign='center'>
          <Carousel
            data={mathList}
            slideWidth={930}
            infinite={false}
            arrowGap={0}
            arrowSize={40}
            ref={sliderRef}
            onChange={onChangeSlide}
            dots={false}
            controller={({ goto }) => (
              <BoxWrap justifyContent='center' alignItems='center' position='absolute' left={0} right={0} bottom={0}>
                <DotIndicator length={mathList.length} activeNumber={activeIndex} onClick={idx => goto(idx)} />
              </BoxWrap>
            )}
          >
            {mathList.map((mathGroup, groupIndex) => (
              <DialogContainer
                headerInfo={headerInfo}
                questionInfo={{
                  text: '계산을 해보세요.',
                  mark: 'correct',
                }}
                submitLabel='채점하기'
                submitBtnColor={EStyleButtonTypes.YELLOW}
                submitDisabled={false}
                onSubmit={() => setBottomSheetShow(true)}
                bodyId={`targetContainer${groupIndex}`}
              >
                <BoxWrap key={`question-wrap-${groupIndex}`} height='294px' boxGap={24}>
                  {mathGroup.map(item => (
                    <Box key={`question-${item.id}`} type='dashed' hAlign='center' flexDirection='column' useRound useFull>
                      <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                        <TableMathCaption caption='세로셈' math={[`${item.value[0]}`, item.sign, `${item.value[1]}`]} />
                        <THead hidden>
                          <TR>
                            <TH scope='col'>일의 자리</TH>
                            {Math.max(...item.value.map(v => v.toString().length)) > 2 ? (
                              <>
                                <TH scope='col'>십의 자리</TH>
                                <TH scope='col'>백의 자리</TH>
                              </>
                            ) : (
                              <TH scope='col'>십의 자리</TH>
                            )}
                            <TH scope='col'>연산 기호</TH>
                          </TR>
                        </THead>
                        <TBody>{renderTableRows(item.value, item.sign)}</TBody>
                        <TFoot>
                          <TR>
                            {Array.from({ length: Math.max(...item.value.map(v => v.toString().length)) }).map((_, index) => (
                              <TD key={index}>
                                <Input value={''} onChange={() => {}} ariaLabel='답 입력란' maxLength={1} />
                              </TD>
                            ))}
                            <TD></TD>
                          </TR>
                        </TFoot>
                      </Table>
                      <Box marginTop={24}>
                        <Typography>{item.expression}</Typography>
                        <Input width='130px' value={''} onChange={() => {}} ariaLabel='답 입력란' maxLength={1} />
                      </Box>
                    </Box>
                  ))}
                </BoxWrap>

                <BottomSheet bottomSheetTargetId={`targetContainer${groupIndex}`} height='40%' show={isBottomSheetShow}>
                  <Box background='lightGray' borderRadius='12px' marginTop='48px'>
                    <Box>
                      <Tag type={ETagLine.GREEN} label='답안' />
                    </Box>
                    <Box marginTop='12px'>31, 27, 74, 32</Box>

                    <Box marginTop='40px'>
                      <Tag type={ETagLine.GREEN} label='해설' />
                    </Box>
                    <Box marginTop='22px'>해설 자리</Box>
                  </Box>
                </BottomSheet>
              </DialogContainer>
            ))}
          </Carousel>
        </Box>
      </Dialog>
    </Container>
  );
};

export default EM00001;

const mockData: IMath[][] = [
  [
    { id: 1, value: [24, 7], expression: '56＋18=', sign: '+' },
    { id: 2, value: [35, 8], expression: '61-29=', sign: '-' },
  ],
  [
    { id: 3, value: [9, 3], expression: '23＋45=', sign: '+' },
    { id: 4, value: [13, 26], expression: '90-12=', sign: '-' },
  ],
  [
    { id: 5, value: [112, 100], expression: '54＋32=', sign: '+' },
    { id: 6, value: [230, 181], expression: '21-43=', sign: '-' },
  ],
];
