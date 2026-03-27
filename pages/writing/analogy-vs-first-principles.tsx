import BlurIn from '../../components/blur-animation/BlurIn';
import Layout from '../../components/layout/layout';
import NavLink from '../../components/link/nav-link';

const AnalogyVsFirstPrinciples = () => {
  return (
    <Layout>
      <div className='main-grid'>
        <article className='color-text'>
          <BlurIn asChild>
            <h1 className='color-sub mb-6'>
              Thinking by analogy vs first principles
            </h1>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7'>
              I was answering a question asked by a colleague recently where something interesting hit me.
              How was it that I knew the answer to these questions and they didn't?
              Was it because I was using a better framework for thinking?
              The answer is obviously no. This is just the experience of having seen something before (wether by through
              experience or through reading about someone else's experience).
            </p>
          </BlurIn>

          <BlurIn className='relative'>
            <p className='mb-7'>
              This made me think of how people get better at what they do. When you see someone that is really good at
              what they do, it is important to differentiate between what is purely prior experience and what is their
              thinking skills/ability<sup id="unref-1"><NavLink href="#1">1</NavLink></sup>. Most of the time they're
              just good at it because they've done it 100 times.
            </p>
            <div className='lg:absolute lg:w-48 lg:top-0 lg:left-[calc(100%+1.5rem)] text-sm mb-7 ml-4' id="1">
              It is important to note that part of this is pure horsepower in terms of ones thinking abilities,
              but part of it is also about knowing how to think and having a framework for it.
              And by framework I mean knowing what questions to ask in a given situation.
            </div>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7'>
              That is what differentiates good from exceptional people. First principles thinking.
            </p>
          </BlurIn>

          <BlurIn className='mb-6 flex items-center gap-2'>
            <div>
              <NavLink
                href='/writing'
                className='px-1 flex items-center gap-2'
              >
                back to Writing
              </NavLink>
            </div>
          </BlurIn>
        </article>
      </div>
    </Layout>
  );
};

export default AnalogyVsFirstPrinciples;
