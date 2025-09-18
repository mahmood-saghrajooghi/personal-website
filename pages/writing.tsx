import { useState } from 'react';

import Layout from '../components/layout/layout';
import Cursor from '../components/glitch/cursor';
import Link from '../components/link/link';
import NavLink from '../components/link/nav-link';
import BlurIn from '../components/blur-animation/BlurIn';
import { Blockquote } from '../components/blockquote';

const IndexPage = () => {
  const [customCursorVisible, setCustomCursorVisible] = useState(false);

  const handleMouseEnter = () => {
    setCustomCursorVisible(true);
  }

  const handleMouseLeave = () => {
    setCustomCursorVisible(false);
  }

  return (
    <Layout>
      <div className='main-grid'>
        <article className='color-text'>
          <BlurIn asChild>
            <h1 className='color-sub mb-6'>
              Writing
            </h1>
          </BlurIn>
          <BlurIn asChild>
            <p className='mb-7'>Welcome to my mind!</p>
          </BlurIn>
          <BlurIn asChild>
            <p className='mb-7'>
              Quite often, I wander in the world of thought. <span id="action">It can be productive if it's followed by
              action. Otherwise, it can turn one into <Link href='https://en.wikipedia.org/wiki/Oblomov' target="_" className='px-1'>Oblomov</Link>.</span> But
              that caution shouldn't stop one from thinking in order to remove one's bad ideas and replace
              them with better ones.
            </p>
          </BlurIn>
          <BlurIn asChild>
            <p className='mb-7'>
              Thinking itself is not enough. Thoughts need to be written. One reason is that humans
              are forgetful. There has been cases that I repeated the same errors multiple times,
              each time to come to the same conclusion after solving the problem, only to forget it later.
              Another reason that is more important is that not every kind of thinking is going to have
              productive results. The kind of thinking I am talking about here, only happens
              when writing. As Leslie Lamport has said:
            </p>
          </BlurIn>
          <BlurIn>
            <Blockquote className='my-7'>
              If you're thinking without writing, you only think you're thinking.
            </Blockquote>
          </BlurIn>
          <BlurIn asChild>
            <p className='mb-7'>
              So what you are reading here, is me <i>thinking</i>. And the reason for this is for me
              to build a framework for thinking to help me live a better life and achieve my goals.
              I suggest you to also <i>think</i> for your self.
              The ideas that I will be talking about here are very simple and basic.
              But you won't really understand them unless you write about it and try to explain it
              yourself.
            </p>
          </BlurIn>
          <BlurIn asChild>
            <p className='mb-7'>
              Still, this shouldn't stop you from reading other people's writings. What you read is
              like what fuel is to an engine that is your mind (more on this <NavLink href="/writing/thinking-machines">later</NavLink>). After
              all, we're no better than Sir Isaac Newton who said:
            </p>
          </BlurIn>
          <BlurIn>
            <Blockquote className='my-7'>
              If I have seen further, it is by standing on the shoulders of giants.
            </Blockquote>
          </BlurIn>
          <BlurIn asChild>
            <p className='mb-7'>
              I hope you enjoy reading this as much as I did writing it :)
            </p>
          </BlurIn>

          <BlurIn className='mb-2 flex items-center gap-2'>
            <NavLink href="/writing/thinking-machines">Thinking machines</NavLink>
          </BlurIn>
          <BlurIn className='mb-7 flex items-center gap-2'>
            <NavLink href="/writing/you-deserve-it">You deserve it</NavLink>
          </BlurIn>

          <BlurIn asChild>
            <div className='mb-6 flex items-center gap-2'>
              <NavLink
                href='/'
                className='px-1 flex items-center gap-2'
              >
                back to home
              </NavLink>
            </div>
          </BlurIn>
        </article>
      </div>
    </Layout>
  )
};

export default IndexPage;
