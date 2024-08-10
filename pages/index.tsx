import { useRef, useState } from 'react';

import Layout from '../components/layout/layout';
import Glitch from '../components/glitch/glitch';
import Cursor from '../components/glitch/cursor';

const IndexPage = () => {
  const [customCursorVisible, setCustomCursorVisible] = useState(false);

  const handleMouseEnter = () => {
    console.log('mouse enter');

    setCustomCursorVisible(true);
  }

  const handleMouseLeave = () => {
    setCustomCursorVisible(false);
  }

  return (
    <Layout>
      <Cursor visible={customCursorVisible} />
      <div className='main-grid'>
        <div className='left-col hidden md:block'>
        </div>
        <article>
          <h1 className='mb-6 color-text' style={{ '--index': 1 }} data-blur-in-animation>
            Mahmood Sagharjooghi
          </h1>
          <p className='mb-16 color-sub' style={{ '--index': 2 }} data-blur-in-animation>
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
          <h2 className='mb-4 color-text' style={{ '--index': 3 }} data-blur-in-animation>
            Present
          </h2>
          <p className='mb-7 color-sub' style={{ '--index': 4 }} data-blur-in-animation>
            Doing side projects and diving deep into web fundamentals. I'm most passionate about
            building performant small <Glitch
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            customCursorVisible={customCursorVisible}
            >animations</Glitch>
            . Things you may not notice
            when they're there, but you'll miss when they're not.
          </p>
          <p className='mb-16 color-sub' style={{ '--index': 5 }} data-blur-in-animation>
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
        </article>
      </div>
    </Layout>
  )
};

export default IndexPage;
