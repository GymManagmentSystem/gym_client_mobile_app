import {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import * as Progress from 'react-native-progress';

const ExerciseTimer = () => {
  const TOTAL_TIME = 5 * 60;
  const [remainingTime, setRemainingTime] = useState(5 * 60);
  const [isRunning, setRunning] = useState<boolean>(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      timeRef.current = setInterval(
        () => setRemainingTime(prev => prev - 1),
        1000,
      );
    } else {
      if (timeRef.current) clearInterval(timeRef.current);
    }

    return () => {
      if (timeRef.current) clearInterval(timeRef.current);
    };
  }, [isRunning, remainingTime]);

  return (
    <View>
      <TouchableOpacity onPress={() => setRunning(!isRunning)}>
        <Text style={{color: '#FFF'}}>Pause</Text>
      </TouchableOpacity>
      <Text style={{color: '#FFF'}}>{Math.floor(remainingTime / 60)}</Text>
      <Text style={{color: '#FFF'}}>{remainingTime % 60}</Text>
      <Progress.Bar progress={remainingTime / TOTAL_TIME} />
    </View>
  );
};

export default ExerciseTimer;
