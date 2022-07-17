import React, {useState} from "react";
import { View, StyleSheet, Text, Vibration } from "react-native"
import { ProgressBar } from "react-native-paper";
import {Countdown} from '../components/Countdown'
import { RoundedButton } from "../components/RoundedButton";
import { spacing } from "../utils/sizes";
import { colors } from "../utils/colors";
import { Timing } from "./timing";
import { useKeepAwake } from 'expo-keep-awake';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({focusSubject, clearSubject, onTimerEnd}) => {
    useKeepAwake();
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setprogress] = useState(1);
    const [minutes, setMinutes] = useState(0.1);

    const onEnd = (reset) => {
        {Vibration.vibrate(PATTERN)}
        setIsStarted(false);
        setprogress(1);
        reset();
        onTimerEnd(focusSubject);
    };

    return (
    <View style = {styles.container}>
        <View style = {styles.countdown}>
            <Countdown
                minutes={minutes} 
                isPaused={!isStarted}  
                onProgress={setprogress}
                onEnd={onEnd}
            />
            <View style={styles.focus}>
                <Text style={styles.title}>Focusing on:</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
        </View>
        <View style={{paddingTop:spacing.xxl}}>
            <ProgressBar
                color={colors.progressBar}
                style={{height: spacing.sm}}
                progress={progress}
            />
        </View>
        <View style={styles.timingWrapper}>
            <Timing    
                onChangeTime={setMinutes} 
            />
        </View>
        <View style={styles.clearWrapper}>
            <RoundedButton 
                size={50}
                title='-'
                onPress={clearSubject}
            />
        </View>
        <View style={styles.buttonWrapper}>
            {!isStarted && (
                <RoundedButton 
                title='start'
                onPress={() => setIsStarted(true)}
                />)}
            {isStarted && (
                <RoundedButton 
                title='pause'
                onPress={() => setIsStarted(false)}
                />)}
           
        </View>
        
    </View>
)}

const styles= StyleSheet.create({
    container: {
        flex: 1, 
    },
    countdown: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timingWrapper: {
        flex: 0.2,
        paddingTop: spacing.xxl,
    },
    buttonWrapper: {
        flex: 0.3,
        padding: spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    focus: {
        paddingTop: spacing.xxl,
    },
    title: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    task: {
        color: colors.white,
        textAlign: 'center',
    },
    clearWrapper: {
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: spacing.md,
        paddingBottom: spacing.lg
    },
    timingWrapper: {
        flex: 0.1,
        padding: spacing.md,
        flexDirection: 'row',
        justifyContent: 'center',
    }
})