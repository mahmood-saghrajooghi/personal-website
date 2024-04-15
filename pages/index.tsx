import Link from 'next/link';
import Layout from '../components/layout/layout';

const IndexPage = () => (
  <Layout>
    <div className='main-grid'>
      <article>
        <h1 className='mb-6 color-text'>Mahmood Sagharjooghi</h1>
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
        <h2 className='mb-4 color-text'>Now</h2>
        <p className='mb-7 color-sub'>
          Doing side projects and diving deep into web fundamentals. I'm most passionate about
          building performant small animations. Things you may not notice
          when they're there, but you'll miss when they're not.
        </p>
        <p className='mb-16 color-sub'>
          Listening to music is one of the things I enjoy the most. My most
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
      <div></div>
    </div>
  </Layout>
);

export default IndexPage;
