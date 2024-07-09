import { useRecoilState } from 'recoil';
import { pageAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import { useState } from 'react';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import P04 from './04';
import P05 from './05';

export type TAnswers = { text: string; value: string; answer: string };

export function A01() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const [P01Submitted, setP01Submitted] = useState(false);
  const [P03Submitted, setP03Submitted] = useState(false);
  const [P05Submitted, setP05Submitted] = useState(false);

  const submitP01Ans = (val: TAnswers[]) => {
    setP01Ans(val);
    setP01Submitted(true);
  };

  const [P01Ans, setP01Ans] = useState<TAnswers[]>([
    {
      text: `1. What AI issue do you want to talk about?`,
      value: '',
      answer: 'Are chatbots helpful for studying?\n',
    },
    {
      text: `2. What is your opinion on the issue?`,
      value: '',
      answer: 'Studying with chatbots is effective.\n',
    },
    {
      text: `3. Why do you think so?`,
      value: '',
      answer: 'It can help students to improve their academic performance because they can get personalized support from chatbots.\n',
    },
  ]);

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 savedAns={P01Ans} isSubmitted={P01Submitted} onSubmit={submitP01Ans} />
      <P02 />
      <P03 savedP01Ans={P01Ans} isSubmitted={P03Submitted} onSubmit={() => setP03Submitted(true)} />
      <P04 />
      <P05 isSubmitted={P05Submitted} onSubmit={() => setP05Submitted(true)} />
    </Page>
  );
}

export default A01;
