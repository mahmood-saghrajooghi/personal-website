import React, { useState } from 'react';
import styles from './gym-graph.module.css';

interface ActivityData {
  date: string;
  person1: boolean; // true if person 1 went to gym
  person2: boolean; // true if person 2 went to gym
}

interface GymActivityGraphProps {
  data?: ActivityData[];
  person1Name?: string;
  person2Name?: string;
}

const GymActivityGraph: React.FC<GymActivityGraphProps> = ({
  data = [],
  person1Name = 'Person 1',
  person2Name = 'Person 2'
}) => {
  const [hoveredCell, setHoveredCell] = useState<{ date: string; person1: boolean; person2: boolean } | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Generate weeks from January 1st of current year to today
  const generateWeeks = () => {
    const weeks: Date[][] = [];
    const today = new Date();

    // Start from January 1st of current year
    const startDate = new Date(today.getFullYear(), 0, 1);

    // End at today
    const endDate = new Date(today);

    // Find the Sunday before or on January 1st
    const firstSunday = new Date(startDate);
    firstSunday.setDate(startDate.getDate() - startDate.getDay());

    let currentDate = new Date(firstSunday);

    while (currentDate <= endDate) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);
    }

    return weeks;
  };

  const weeks = generateWeeks();

  // Create a map for quick lookup of activity data
  const activityMap = new Map(
    data.map(d => [d.date, { person1: d.person1, person2: d.person2 }])
  );

  // Get status class based on who went to gym
  const getStatusClass = (person1: boolean, person2: boolean): string => {
    if (person1 && person2) return 'both';
    if (person1) return 'person1Only';
    if (person2) return 'person2Only';
    return 'none';
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const getDateDisplay = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleMouseEnter = (date: Date, person1: boolean, person2: boolean, event: React.MouseEvent) => {
    setHoveredCell({ date: getDateDisplay(date), person1, person2 });
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (hoveredCell) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  // Get month labels
  const getMonthLabels = () => {
    const labels: { month: string; index: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, index) => {
      const firstDay = week[0];
      const month = firstDay.getMonth();

      if (month !== lastMonth && index > 0) {
        labels.push({
          month: firstDay.toLocaleDateString('en-US', { month: 'short' }),
          index
        });
        lastMonth = month;
      }
    });

    return labels;
  };

  const monthLabels = getMonthLabels();
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={styles.container}>
      <div className={styles.graph} onMouseMove={handleMouseMove}>
        <div className={styles.monthLabels}>
          {monthLabels.map((label, i) => (
            <div
              key={i}
              className={styles.monthLabel}
              style={{ gridColumn: label.index + 2 }}
            >
              {label.month}
            </div>
          ))}
        </div>

        <div className={styles.grid}>
          <div className={styles.dayLabels}>
            {dayLabels.map((day, i) => (
              <div key={i} className={styles.dayLabel}>
                {day}
              </div>
            ))}
          </div>

          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className={styles.week}>
              {week.map((date, dayIndex) => {
                const dateStr = formatDate(date);
                const activity = activityMap.get(dateStr);
                const person1 = activity?.person1 || false;
                const person2 = activity?.person2 || false;
                const statusClass = getStatusClass(person1, person2);
                const isFuture = date > new Date();

                return (
                  <div
                    key={dayIndex}
                    className={`${styles.cell} ${styles[statusClass]} ${
                      isFuture ? styles.future : ''
                    }`}
                    onMouseEnter={(e) => !isFuture && handleMouseEnter(date, person1, person2, e)}
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {hoveredCell && (
        <div
          className={styles.tooltip}
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 40,
          }}
        >
          <div className={styles.tooltipContent}>
            <div className={styles.tooltipPerson}>
              <span className={styles.person1Dot}></span>
              {person1Name}: {hoveredCell.person1 ? '✓' : '✗'}
            </div>
            <div className={styles.tooltipPerson}>
              <span className={styles.person2Dot}></span>
              {person2Name}: {hoveredCell.person2 ? '✓' : '✗'}
            </div>
            <div className={styles.tooltipDate}>{hoveredCell.date}</div>
          </div>
        </div>
      )}

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendCell} ${styles.none}`} />
          <span className={styles.legendText}>None</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendCell} ${styles.person1Only}`} />
          <span className={styles.legendText}>{person1Name}</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendCell} ${styles.person2Only}`} />
          <span className={styles.legendText}>{person2Name}</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendCell} ${styles.both}`} />
          <span className={styles.legendText}>Both</span>
        </div>
      </div>
    </div>
  );
};

export default GymActivityGraph;
