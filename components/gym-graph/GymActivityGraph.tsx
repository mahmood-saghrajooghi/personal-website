import React, { useState } from 'react';
import styles from './gym-graph.module.css';

interface ActivityData {
  date: string;
  count: number;
}

interface GymActivityGraphProps {
  data?: ActivityData[];
}

const GymActivityGraph: React.FC<GymActivityGraphProps> = ({ data = [] }) => {
  const [hoveredCell, setHoveredCell] = useState<{ date: string; count: number } | null>(null);
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
    data.map(d => [d.date, d.count])
  );

  // Get activity level (0-4) based on count
  const getActivityLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count === 3) return 3;
    return 4; // 4 or more
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

  const handleMouseEnter = (date: Date, count: number, event: React.MouseEvent) => {
    setHoveredCell({ date: getDateDisplay(date), count });
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
                const count = activityMap.get(dateStr) || 0;
                const level = getActivityLevel(count);
                const isFuture = date > new Date();

                return (
                  <div
                    key={dayIndex}
                    className={`${styles.cell} ${styles[`level${level}`]} ${
                      isFuture ? styles.future : ''
                    }`}
                    onMouseEnter={(e) => !isFuture && handleMouseEnter(date, count, e)}
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
            <strong>{hoveredCell.count} workout{hoveredCell.count !== 1 ? 's' : ''}</strong>
            <div className={styles.tooltipDate}>{hoveredCell.date}</div>
          </div>
        </div>
      )}

      <div className={styles.legend}>
        <span className={styles.legendText}>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div key={level} className={`${styles.legendCell} ${styles[`level${level}`]}`} />
        ))}
        <span className={styles.legendText}>More</span>
      </div>
    </div>
  );
};

export default GymActivityGraph;
