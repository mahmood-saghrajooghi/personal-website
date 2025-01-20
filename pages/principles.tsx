import { useState } from 'react';

import Layout from '../components/layout/layout';
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
        <article className='color-text'>
          <BlurIn asChild>
            <h1 className='color-sub mb-6'>
              Principles
            </h1>
          </BlurIn>
          <BlurIn asChild>
            <div className='mb-6'>
              <ul className='-sub ml-4'>
                <li className='mb-2 list-decimal'>
                  Forgive yourself!
                </li>
                <li className='mb-2 list-decimal'>
                  Finish what you have started before moving on to the next thing.
                </li>
                <li className='mb-2 list-decimal'>
                  Don't get stuck in thinking too much. Just do it.
                </li>
              </ul>
            </div>
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
