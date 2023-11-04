import Link from 'next/link';
import Layout from '../components/layout/layout';

const IndexPage = () => (
  <Layout>
    <div className='main-grid'>
      <div></div>
      <article>
        <h1 className='mb-7'>Mahmood Sagharjooghi</h1>
        <p className='mb-7'>
          <i>Web craftsman</i>. Creating delightful and smooth web experiences.
          Frontenddev at <a className='underline' target='_blank' href='https://www.Oneflow.com/'>Oneflow</a>.
        </p>
        <div className='flex mb-7'>
          <div className='w-[192px]'>
            <h2 className='text-mono-1100 text-sm'>Building</h2>
            <div className="mt-5">
              <Link href='/craft' className='underline leading-7'>
                Craft
              </Link>
              <p className='text-mono-1100 leading-7'>
                Implementing designs and animations.
              </p>
            </div>
          </div>
          <div className='w-[192px]'>
            <h2 className='text-mono-1100 text-sm'>Projects</h2>
            <div className="mt-5">
              <p className='text-mono-1100 leading-7'>
                -
              </p>
            </div>
          </div>
          <div className='w-[192px]'>
            <h2 className='text-mono-1100 text-sm'>Blog</h2>
            <div className="mt-5">
              <p className='text-mono-1100 leading-7'>
                -
              </p>
            </div>
          </div>
        </div>
        <h2 className='mb-7'>Now</h2>
        <p className='mb-7'>
          Doing side projects and learning new stuff. I'm most passionate about building performant small animations. Things that you may not notice when they're there, but you'll miss them when they're not.
        </p>
        <p className='mb-7'>
          Listening to music is one of the things I enjoy the most. My most played song is{' '}
          <a className='underline' target='_blank' href='https://open.spotify.com/track/6zIzgsgb7fLnD4dL0IVhzP?si=1fbc11fe70324090'>Float</a>
          {' '}by{' '}
          <a className='underline' target='_blank' href='https://www.youtube.com/channel/UC3M9cxN9x7uEKIzFILwJ9Eg'>Zane Alexander</a>.
        </p>
      </article>
      <div></div>
    </div>
  </Layout>
)

export default IndexPage
