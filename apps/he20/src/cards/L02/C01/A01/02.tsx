import HE00102 from '@maidt-cntn/pages/HE-001-02';

const P02 = () => {
  return (
    <>
      <HE00102
        value1={'If you have, then you may have fallen prey to a dark pattern.'}
        highlight1={['may have fallen']}
        value2={'Critics suggest that a marketing strategy (should) create value for both companies and customers.'}
        highlight2={['suggest', '(should) create']}
      />
    </>
  );
};

export default P02;
