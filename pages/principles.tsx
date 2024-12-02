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
            <h1 className='color-sub mb-6' style={{ '--index': 1 } as React.CSSProperties} data-blur-in-animation>
              Principles
            </h1>
          </BlurIn>
          <BlurIn asChild>
            <div className='mb-6' style={{ '--index': 2 } as React.CSSProperties} data-blur-in-animation>
              <ul className='-sub ml-4'>
                <li className='mb-2 list-decimal'>
                  Finish what you have started before moving on to the next thing.
                </li>
              </ul>
            </div>
          </BlurIn>
          <BlurIn asChild>
            <div className='mb-6 flex items-center gap-2' style={{ '--index': 3 } as React.CSSProperties} data-blur-in-animation>
              <NavLink
                href='/'
                className='px-1 flex color-sub items-center gap-2'
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
