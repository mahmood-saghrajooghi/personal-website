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
              Thinking machines
            </h1>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7'>
              Early in college, I was walking with one of my friends Erfan and we were discussing a
              matter when he said something that sounded very insightful. What was more interesting
              than the answer itself, was that how come a person that is the same age as me and
              more or less has the same amount experienced on the matter, have better ideas about it?
            </p>
          </BlurIn>
          <BlurIn asChild>
            <p className='mb-7'>
              The more generalized form of the question can be: "How come
              some people have better ideas than others? Why what they say sounds better? How can we
              Become more like them?"
            </p>
          </BlurIn>
          <BlurIn asChild>
            <p className='mb-7' id="back-to-1">
              For the purpose of this writing, let's look at the human mind like a machine. It receives input,
              does some sort of processing and output is generated. The natural conclusion from this
              way of looking at the mind, can be that:
            </p>
          </BlurIn>
          <BlurIn asChild>
            <ul className='ml-4 mb-7'>
              <li className='mb-2 list-decimal'>
                The amount and the quality of your mind's output, is highly dependent on the quality
                of the input it receives. (fuel)
              </li>
              <li className='mb-2 list-decimal'>
                The thinking tools you have and the framework with which you think determines how
                effective it your mind is in turning the inputs into useful outputs. (the engine)
              </li>
            </ul>
          </BlurIn>
          <BlurIn asChild>
            <h2 className='color-sub mb-4'>
              Fuel
            </h2>
          </BlurIn>
          <BlurIn asChild>
            <p className='mb-7' id="back-to-1">
              So, if you are to improve your thinking, the first thing you have to do is to consume
              lots of good content. When I say content, you might think articles, books,
              X, or Youtube and you are right. But an important part that is easy to miss is the people you interact
              with. You ought to surround yourself the best people you can find. Charlie Munger puts
              this perfectly:
            </p>
          </BlurIn>
          <BlurIn className='relative'>
            <Blockquote className='my-7'>
              <i>Acquire</i> worldly wisdom and adjust your behavior accordingly. If your new behavior
              gives you a little temporary unpopularity with your <i>peer group</i>... then to hell
              with them! <sup id="unref-1"><NavLink href="#1">1</NavLink></sup>
            </Blockquote>
            <div className='lg:absolute lg:w-48 lg:top-0 lg:left-[calc(100%+1.5rem)] text-sm mb-7 ml-4' id="1">
              1. Maybe this is not the perfect way of using this quote. I used it with an emphasis
              on the "acquire" and "peer group". But the part that is easy to miss is "adjust
              your behavior accordingly". This goes back to what I said in
              the <NavLink href="/writing/#action">introduction</NavLink> about action being required in
              order for thought to be productive.
            </div>
          </BlurIn>
          <BlurIn asChild>
            <p className='mb-7' id="back-to-1">
              Now if you are an immigrant like myself and are about to nag about how hard it is to
              find good new friends that share this passion for learning, I'll throw another Munger
              quote at you:
            </p>
          </BlurIn>
          <BlurIn>
            <Blockquote className='my-7'>
              I think you learn economics better if you make Adam Smith your friend. That sounds
              funny, <i>making friends among the “eminent dead,”</i> but if you go through life making
              friends with the eminent dead who had the right ideas, I think it will work better
              for you in life and work better in education. It's way better than just giving the
              basic concepts. <sup id="unref-2"><NavLink href="#2">2</NavLink></sup>
            </Blockquote>
            <div className='lg:absolute lg:w-48 lg:top-1/2 lg:left-[calc(100%+1.5rem)] text-sm mb-7 ml-4' id="2">
              2. Again, using the quote in a twisted way. Here, Charlie is talking about the importance
              of getting to know the people in order to better understand their ideas.
            </div>
          </BlurIn>
          <BlurIn asChild>
            <p className='mb-7' id="back-to-1">
              Thanks to the internet and the social media, we are not limited to the dead who left
              behind some writing. My suggestion is to find the people who are active in the areas
              you are interested in and listen to what they have to say.
            </p>
          </BlurIn>

          <BlurIn asChild>
            <h2 className='color-sub mb-4'>
              The engine
            </h2>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7' id="back-to-1">
              Just reading a lot might not be enough. As I said, two people can have the same amount
              of experience, but one can have better ideas. I think it's because they think in a different way.
              They have better tools at their disposal and know when to use each one.
              Charlie Munger calls these tools mental models and calls for building "a latticework
              of mental models".
            </p>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7' id="back-to-1">
              But how have they built such framework?
            </p>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7' id="back-to-1">
              I think the best way to do it, is by learning the fundamental sciences and trying to
              use them in your day-to-day life. It cab be hard science, or social science. They both
              will become handy in specific situations. I'd suggest learning math, physics, and statistics,
              and psychology.
            </p>
          </BlurIn>

          {/* <BlurIn asChild>
            <p className='mb-7' id="back-to-1">
              This is where the brain differs from a machine. What is beautiful about the brain, is
              that just by reading (assuming that the quality of the input is good and
              it is an active kind of reading) the mind improves itself.
            </p>
          </BlurIn> */}

          <BlurIn asChild>
            <p className='mb-7' id="back-to-1">
              When facing a problem, you should be able to break it down into smaller problems, ones
              that can be solved by using the fundamental ideas you have learned, and then compose
              them together to form a solution for the original problem. And this is what you will
              hopefully learn by learning these fundamental ideas.
            </p>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7' id="back-to-1">
              You may find these books helpful for critical thinking:
            </p>
          </BlurIn>

          <BlurIn asChild>
            <ul className='ml-4 mb-7'>
              <li className='mb-2 list-decimal'>
                How to Read a Book Revised and Updated Edition by Charles Van Doren and Mortimer J. Adler
              </li>
              <li className='mb-2 list-decimal'>
                Asking the Right Questions: A Guide to Critical Thinking by Neil Browne and Stuart M. Keeley
              </li>
              <li className='mb-2 list-decimal'>
                Poor Charlie's Almanack: The Essential Wit and Wisdom of Charles T. Munger by Charles T. Munger
              </li>
            </ul>
          </BlurIn>

          <BlurIn asChild>
            <h2 className='color-sub mb-4'>
              Notes
            </h2>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7' id="back-to-1">
              This is not a static document. It is a living one.
              As I said in the <NavLink href="/writing">introduction</NavLink>, I'm thinking this through
              as I write about it.
            </p>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7' id="back-to-1">
              As a fellow learner who is at the beginning of this lifelong journey, I'm figuring this out as I go.
              There are definitely flaws in this writing and the core idea is half baked. But I still
              think there is value in sharing it with other people. If you have any feedback, please
              feel free to reach out to me through my socials.
            </p>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-7' id="back-to-1">
              Happy thinking!
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
