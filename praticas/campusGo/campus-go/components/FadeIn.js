import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export default function FadeIn({ children }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  }, []);

  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}