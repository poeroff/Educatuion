import HE00102 from '@maidt-cntn/pages/HE-001-02';

const P02 = () => {
  return (
    <>
      <HE00102
        value1={
          'Although he became a free man, he still faced racial discrimination.\nDespite challenges in their lives, the artists never gave up on their art'
        }
        highlight1={['Although', 'Despite']}
        value2={
          'She even studied abroad in Paris, which was unusual for women at the time.\nLewis went to live with her aunt in Digby, where she met her future husband.'
        }
        highlight2={['which', 'where']}
      />
    </>
  );
};

export default P02;
