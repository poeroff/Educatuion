import HE00102 from '@maidt-cntn/pages/HE-001-02';

const P02 = () => {
  return (
    <>
      <HE00102
        value1={'Rarely do people want to put up with a lot of noise.'}
        highlight1={['Rarely do people want']}
        value2={'It is possible for drivers to focus on driving without being disturbed.'}
        highlight2={['It', 'for drivers to focus']}
      />
    </>
  );
};

export default P02;
