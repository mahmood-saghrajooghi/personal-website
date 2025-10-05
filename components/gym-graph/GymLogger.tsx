import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import styles from './gym-graph.module.css';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface GymLoggerProps {
  onLogActivity: (date: string, attended: boolean) => void;
  onDeleteActivity: (date: string) => void;
  hasUserLoggedDate: (date: string) => Promise<boolean>;
  existingData?: boolean | null;
}

const GymLogger: React.FC<GymLoggerProps> = ({
  onLogActivity,
  onDeleteActivity,
  hasUserLoggedDate,
  existingData
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  // Check if user has logged the selected date
  useEffect(() => {
    const checkUserLog = async () => {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const hasLogged = await hasUserLoggedDate(dateStr);
      setIsUserLogged(hasLogged);
    };
    checkUserLog();
  }, [selectedDate, hasUserLoggedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert Date to YYYY-MM-DD format
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    // Submitting the form means you went to the gym
    onLogActivity(dateStr, true);
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleDelete = () => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    onDeleteActivity(dateStr);
    
    // Show success message
    setShowDeleteSuccess(true);
    setTimeout(() => setShowDeleteSuccess(false), 2000);
  };

  return (
    <div className={styles.loggerContainer}>
      <h2 className={styles.loggerTitle}>Log Gym Activity</h2>
      
      <form onSubmit={handleSubmit} className={styles.loggerForm}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar 
                mode="single" 
                selected={selectedDate} 
                onSelect={(date) => date && setSelectedDate(date)}
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className={styles.buttonGroup}>
          {!isUserLogged ? (
            <button type="submit" className={styles.submitButton}>
              Log Gym Visit
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleDelete} 
              className={styles.submitButton}
            >
              Remove Log
            </button>
          )}
        </div>

        {showSuccess && (
          <div className={styles.successMessage}>
            ✓ Activity logged successfully!
          </div>
        )}

        {showDeleteSuccess && (
          <div className={styles.successMessage}>
            ✓ Activity removed successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default GymLogger;

