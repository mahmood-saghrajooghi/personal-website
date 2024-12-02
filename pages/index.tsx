import { useState } from 'react';

import Layout from '../components/layout/layout';
import Glitch from '../components/glitch/glitch';
import Cursor from '../components/glitch/cursor';
import Link from '../components/link/link';
import NavLink from '../components/link/nav-link';
import BlurIn from '../components/blur-animation/BlurIn';

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
      <Cursor visible={customCursorVisible} />
      <div className='main-grid'>
        <article>
          <BlurIn asChild>
            <h1 className='color-text mb-6'>
              Mahmood Sagharjooghi
            </h1>
          </BlurIn>

          <BlurIn asChild>
            <p className='mb-16 color-sub'>
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
            <h2 className='mb-4 color-text' style={{ '--index': 3 } as React.CSSProperties} data-blur-in-animation>
              Links
            </h2>
          </BlurIn>
          <BlurIn asChild>
            <div className='mb-16 color-sub' style={{ '--index': 4 } as React.CSSProperties} data-blur-in-animation>

              <NavLink
                href='/principles'
                className='px-1 color-text'
              >
                Principles
              </NavLink>
              <p className='mt-2'>
                A collection of principles that guide my work and life.
              </p>
            </div>
          </BlurIn>
          <BlurIn asChild>
            <h2 className='mb-4 color-text' style={{ '--index': 4 } as React.CSSProperties} data-blur-in-animation>
              Present
            </h2>
          </BlurIn>
          <BlurIn asChild>
            <p className='mb-7 color-sub' style={{ '--index': 4 } as React.CSSProperties} data-blur-in-animation>
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
            <p className='mb-16 color-sub' style={{ '--index': 5 } as React.CSSProperties} data-blur-in-animation>
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
            <h2 className='mb-4 color-text' style={{ '--index': 6 } as React.CSSProperties} data-blur-in-animation>
              Socials
            </h2>
          </BlurIn>
          <BlurIn asChild>
            <div className='flex mb-16 color-sub gap-2' style={{ '--index': 7 } as React.CSSProperties} data-blur-in-animation>
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
        </article>
      </div>
    </Layout>
  )
};

export default IndexPage;
