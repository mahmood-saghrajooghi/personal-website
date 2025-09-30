import BlurIn from '../components/blur-animation/BlurIn';
import Layout from '../components/layout/layout';
import GymActivityGraph from '../components/gym-graph/GymActivityGraph';

// Sample data - replace this with your actual gym data
const generateSampleData = () => {
  const data = [];
  const today = new Date();

  // Generate random binary attendance for two people for the past year
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Random binary attendance for each person (60% chance of going)
    const person1Went = Math.random() > 0.4;
    const person2Went = Math.random() > 0.4;

    // Only include days where at least one person went
    if (person1Went || person2Went) {
      data.push({
        date: date.toISOString().split('T')[0],
        person1: person1Went,
        person2: person2Went
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
              Gym attendance tracking for two people over the past year.
              Each square shows who went to the gym that day.
            </p>
          </BlurIn>

          <BlurIn>
            <GymActivityGraph
              data={gymData}
              person1Name="Mahmood"
              person2Name="Partner"
            />
          </BlurIn>
        </article>
      </div>
    </Layout>
  );
}
