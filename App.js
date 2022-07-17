import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar } from 'react-native';
import {colors} from './src/utils/colors';
import {Focus} from './src/features/focus';
import { TextInput } from 'react-native-paper';
import { Timer } from './src/features/timer';
import { FocusHistory } from './src/features/FocuHistory';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [history, setHistory] = useState([])
  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <> 
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory history={history}/> 
        </>
        ):( 
          <Timer
            focusSubject={currentSubject}
            onTimerEnd={(subject) =>{
              setHistory([...history, subject])
            }}
            clearSubject={() => setCurrentSubject(null)}
          /> 
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkblue,
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
