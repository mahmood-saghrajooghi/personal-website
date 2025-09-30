import BlurIn from '../components/blur-animation/BlurIn';
import Layout from '../components/layout/layout';
import GymActivityGraph from '../components/gym-graph/GymActivityGraph';

// Sample data - replace this with your actual gym data
const generateSampleData = () => {
  const data = [];
  const today = new Date();

  // Generate random activity for the past year
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Random workout count (0-5), with some days having no workouts
    const count = Math.random() > 0.5 ? Math.floor(Math.random() * 5) : 0;

    if (count > 0) {
      data.push({
        date: date.toISOString().split('T')[0],
        count
      });
    }
  }

  return data;
};

export default function Gym() {
  const gymData = generateSampleData();

  return (
    <Layout>
      <div className='main-grid'>
        <article className='color-text'>
          <h1 className='color-sub mb-6'>
            Gym
          </h1>

          <BlurIn>
            <p className='mb-8 color-sub'>
              My gym activity over the past year. Each square represents a day,
              with darker colors indicating more workouts.
            </p>
          </BlurIn>

          <BlurIn>
            <GymActivityGraph data={gymData} />
          </BlurIn>
        </article>
      </div>
    </Layout>
  );
}
