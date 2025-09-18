import { Blockquote } from '../../components/blockquote';
import BlurIn from '../../components/blur-animation/BlurIn';
import Layout from '../../components/layout/layout';
import NavLink from '../../components/link/nav-link';

// something that can determine the difference in thinking is the goal that one pursues for that
// thinking. For example, looking back at a work experience, different people will have different
// learnings. This is highly dependent on what goals the have by thinking back on that experience.
// Someone can be looking for an understanding of the whole product creation process, while someone else
// might be looking for an understanding of the technical aspects.
//
// At the moment it is not clear to me on how to set goals for the thinking. I think this might be
// different that setting life goals for example. Some goals in thinking might have better outcomes
// regardless of the goals themselves.

const ThinkingMachines = () => {
  return (
    <Layout>
      <div className='main-grid'>
        <article className='color-text'>
          <BlurIn asChild>
            <h1 className='color-sub mb-6'>
              You deserve it
            </h1>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7'>
              I'm trying to answer the question "How should you think about deserving something you
              want? What should your reaction be to the following quote?"
            </p>
          </BlurIn>

          <BlurIn>
            <Blockquote className='my-7'>
              To get what you want, you have to deserve what you want. The world is not yet a crazy enough place to reward a whole bunch of
              undeserving people.<br />
              ― Charles T. Munger
            </Blockquote>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7'>
              Something you need to consider about the quote above is that you should try to avoid
              a situation where you are always trying to deserve something because you don't believe
              you already deserve it. If not, you might end up in a situation where you are always
              in a state of preparation.
            </p>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7'>
              A good example is when you want to get a job at a certain position in a certain company.
              Reading the quote above, you might be like "I'll spend a year preparing for this job".
              Then a year becomes two, and before you know it you have lost the opportunity to apply
              for the job.
            </p>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7'>
              I'm not saying that you shouldn't try to become better. I'm just saying that recognize
              when you <i>do</i> deserve something and <i>go for it</i>. Otherwise you will end up in a state of regret.
            </p>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7'>
              This reminds me of the distinction between regret versus remorse. Regret is when you look
              back and say "I wish I <i>had done</i> ...". Remorse is when you look back and say
              "I wish I <i>hadn't done</i> ...". Do you see the difference? Regret follows inaction, while
              remorse follows action. Thinking about regret, this quote comes to mind:
            </p>
          </BlurIn>

          <BlurIn className='relative'>
            <Blockquote className='my-7'>
              Carpe diem. <sup id="unref-1"><NavLink href="#1">1</NavLink></sup>
            </Blockquote>
            <div className='lg:absolute lg:w-48 lg:top-0 lg:left-[calc(100%+1.5rem)] text-sm mb-7 ml-4'>
              1. It reminds me of the movie Dead Poets Society. See <a href="https://youtu.be/vi0Lbjs5ECI?si=HCgr-PaMGf_tA0Y-" target="_blank" className='link'>this clip</a>.
            </div>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7'>
              Like anything else in life, there should be a balance between preparing to deserve
              something and going for it when the opportunity presents itself.
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
  )
}

export default ThinkingMachines;
