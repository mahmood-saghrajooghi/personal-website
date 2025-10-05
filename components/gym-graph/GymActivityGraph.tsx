import React, { useState, useRef, useEffect, useMemo } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useSpring, animated } from 'react-spring';
import styles from './gym-graph.module.css';

interface ActivityData {
  date: string;
  attended: boolean; // true if any user went to gym
  users?: string[]; // usernames of users who attended
}

interface GymActivityGraphProps {
  data?: ActivityData[];
}

// Color palette for users
const USER_COLORS = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // green
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
  '#6366f1', // indigo
  '#84cc16', // lime
  '#d946ef', // fuchsia
  '#14b8a6', // teal
];

interface AnimatedTooltipContentProps {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
}

const AnimatedTooltipContent = React.forwardRef<HTMLDivElement, AnimatedTooltipContentProps>(
  ({ children, className, sideOffset, ...props }, ref) => {
    const springProps = useSpring({
      from: { opacity: 0, transform: 'scale(0.98)' },
      to: { opacity: 1, transform: 'scale(1)' },
      config: { tension: 300, friction: 20 },
    });

    return (
      <Tooltip.Content
        ref={ref}
        className={className}
        sideOffset={sideOffset}
        asChild
        {...props}
      >
        <animated.div style={springProps}>
          {children}
        </animated.div>
      </Tooltip.Content>
    );
  }
);

AnimatedTooltipContent.displayName = 'AnimatedTooltipContent';

const GymActivityGraph: React.FC<GymActivityGraphProps> = ({
  data = []
}) => {
  const graphRef = useRef<HTMLDivElement>(null);
  
  // Get all unique users and assign them persistent colors
  const userColorMap = useMemo(() => {
    // Load existing color assignments from localStorage
    const storedColors = localStorage.getItem('gym-user-colors');
    const existingColorMap: Record<string, string> = storedColors 
      ? JSON.parse(storedColors) 
      : {};
    
    // Get all unique users from current data
    const allUsers = new Set<string>();
    data.forEach(d => {
      if (d.users) {
        d.users.forEach(user => allUsers.add(user));
      }
    });
    
    // Track which colors are already in use
    const usedColors = new Set(Object.values(existingColorMap));
    const colorMap = new Map<string, string>();
    
    // Assign colors to all users
    allUsers.forEach(user => {
      if (existingColorMap[user]) {
        // Use existing color assignment
        colorMap.set(user, existingColorMap[user]);
      } else {
        
        // Find next available color
        const availableColor = USER_COLORS.find(color => !usedColors.has(color)) 
          || USER_COLORS[Object.keys(existingColorMap).length % USER_COLORS.length];
        
        colorMap.set(user, availableColor);
        existingColorMap[user] = availableColor;
        usedColors.add(availableColor);
      }
    });
    // Save updated color assignments to localStorage

    localStorage.setItem('gym-user-colors', JSON.stringify(existingColorMap));
    
    return colorMap;
  }, [data]);
  // Generate weeks for the last ~7 months ending today
  const generateWeeks = () => {
    const weeks: Date[][] = [];
    const today = new Date();
    
    // Go back approximately 7 months (210 days)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 210);

    // End at today
    const endDate = new Date(today);

    // Find the Sunday before or on the start date
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

  // Scroll to show the most recent dates on mount
  useEffect(() => {
    if (graphRef.current) {
      // Scroll to the right to show current date
      graphRef.current.scrollLeft = graphRef.current.scrollWidth;
    }
  }, []);

  // Create a map for quick lookup of activity data
  const activityMap = new Map(
    data.map(d => [d.date, { attended: d.attended, users: d.users || [] }])
  );

  // Render a split cell based on multiple users using conic gradients
  const renderSplitCell = (users: string[]) => {
    if (users.length === 0) {
      return null;
    }
    
    if (users.length === 1) {
      // Single user - solid color
      return (
        <div 
          className={styles.cellSingle}
          style={{ backgroundColor: userColorMap.get(users[0]) }}
        />
      );
    }
    
    // Multiple users - use conic gradient to create pie chart
    const slicePercentage = 100 / users.length;
    
    // Build conic-gradient stop list
    const gradientStops = users.map((user, index) => {
      const color = userColorMap.get(user);
      const startPercent = slicePercentage * index;
      const endPercent = slicePercentage * (index + 1);
      
      // Each color occupies its slice of the pie
      return `${color} ${startPercent}% ${endPercent}%`;
    }).join(', ');
    
    return (
      <div 
        className={styles.cellPie}
        style={{ 
          background: `conic-gradient(from 30deg, ${gradientStops})`
        }}
      />
    );
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
    <Tooltip.Provider delayDuration={200}>
      <div className={styles.container}>
        <div className={styles.graph} ref={graphRef}>
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
                  const activityData = activityMap.get(dateStr);
                  const users = activityData?.users || [];
                  const isFuture = date > new Date();

                  if (isFuture) {
                    return (
                      <div
                        key={dayIndex}
                        className={`${styles.cell} ${styles.none} ${styles.future}`}
                      />
                    );
                  }

                  return (
                    <Tooltip.Root key={dayIndex}>
                      <Tooltip.Trigger asChild>
                        <div className={`${styles.cell} ${users.length === 0 ? styles.none : ''}`}>
                          {renderSplitCell(users)}
                        </div>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <AnimatedTooltipContent
                          className={styles.tooltipContent}
                          sideOffset={5}
                        >
                          <div className={styles.tooltipDate}>{getDateDisplay(date)}</div>
                          {users.length > 0 ? (
                            <div className={styles.tooltipUsers}>
                              <div className={styles.tooltipUsersLabel}>
                                {users.length} {users.length === 1 ? 'person' : 'people'} attended:
                              </div>
                              {users.map((username, idx) => (
                                <div key={idx} className={styles.tooltipUser}>
                                  <span 
                                    className={styles.tooltipUserColor}
                                    style={{ backgroundColor: userColorMap.get(username) }}
                                  />
                                  {username}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className={styles.tooltipStatus}>
                              ✗ No one attended
                            </div>
                          )}
                        </AnimatedTooltipContent>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.userLegend}>
          <div className={styles.userLegendItems}>
            {Array.from(userColorMap.entries())
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([username, color]) => (
                <div key={username} className={styles.userLegendItem}>
                  <div 
                    className={styles.userLegendColor}
                    style={{ backgroundColor: color }}
                  />
                  <span className={styles.userLegendName}>{username}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
};

export default GymActivityGraph;
