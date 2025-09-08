import { useState, useEffect } from 'react';

import Layout from '../components/layout/layout';
import Glitch from '../components/glitch/glitch';
import Cursor from '../components/glitch/cursor';
import Link from '../components/link/link';
import NavLink from '../components/link/nav-link';
import BlurIn from '../components/blur-animation/BlurIn';
import Card from '../components/card/card';

const IndexPage = () => {
  const [customCursorVisible, setCustomCursorVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Set up window dimensions
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial size
    handleResize();

    // Update on resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = () => {
    setCustomCursorVisible(true);
  }

  const handleMouseLeave = () => {
    setCustomCursorVisible(false);
  }

  return (
    <Layout>
      <Cursor visible={customCursorVisible} />
      <div className='main-grid'>
        <article className='color-text'>
          <div style={{ marginTop: 120 }}>
            <BlurIn asChild>

              <h1 className='mb-6'>
                Mahmood Sagharjooghi
              </h1>

            </BlurIn>

            <BlurIn asChild>
              <p className='mb-16'>
                <i>Web craftsman</i>. Creating delightful and smooth web experiences.
                Frontend dev at{' '}
                <a
                  className='link'
                  target='_blank'
                  href='https://www.Oneflow.com/'
                >
                  Oneflow
                </a>
                .
              </p>
            </BlurIn>
            <BlurIn asChild>
              <h2 className='mb-4 color-sub'>
                Links
              </h2>
            </BlurIn>
            <BlurIn asChild>
              <div className='mb-8'>
                <NavLink
                  href='/writing'
                  className='px-1'
                >
                  Writing
                </NavLink>
                <p className='mt-2 color-sub'>
                  Walk with me as I wonder through the world of thought.
                </p>
              </div>
            </BlurIn>
            <BlurIn asChild>
              <div className='mb-16'>
                <NavLink
                  href='/principles'
                  className='px-1'
                >
                  Principles
                </NavLink>
                <p className='mt-2 color-sub'>
                  A collection of principles that guide my work and life.
                </p>
              </div>
            </BlurIn>
            <BlurIn asChild>
              <h2 className='mb-4 color-sub'>
                Present
              </h2>
            </BlurIn>
            <BlurIn asChild>
              <p className='mb-7'>
                Doing side projects and diving deep into web fundamentals. I'm most passionate about
                building performant small <Glitch
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  customCursorVisible={customCursorVisible}
                >animations</Glitch>
                . Things you may not notice
                when they're there, but you'll miss when they're not.
              </p>
            </BlurIn>
            <BlurIn asChild>
              <p className='mb-16'>
                Listening to music is one of the things I enjoy a lot. My most
                played song is{' '}
                <a
                  className='link'
                  target='_blank'
                  href='https://open.spotify.com/track/6zIzgsgb7fLnD4dL0IVhzP?si=1fbc11fe70324090'
                >
                  Float
                </a>{' '}
                by Zane Alexander.
              </p>
            </BlurIn>
            <BlurIn asChild>
              <h2 className='mb-4 color-sub'>
                Socials
              </h2>
            </BlurIn>
            <BlurIn asChild>
              <div className='flex mb-16 gap-2'>
                <Link
                  href='https://x.com/mem_fara'
                  target='_blank'
                  className='px-1'
                >
                  X
                </Link>
                <Link
                  href='https://github.com/mahmood-saghrajooghi'
                  target='_blank'
                  className='px-1'
                >
                  Github
                </Link>
              </div>
            </BlurIn>
          </div>
        </article>
      </div>
    </Layout>
  )
};

export default IndexPage;
