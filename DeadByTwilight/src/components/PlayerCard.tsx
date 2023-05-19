import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Role = 'survivor' | 'killer';

interface Props {
  name: string;
  role: Role;
}

export const PlayerCard: React.FC<Props> = ({name, role}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.name}> {name} </Text>
      <Text style={styles.role}> {role} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '50%',
  },
  name: {
    justifyContent: 'flex-start',
  },
  role: {
    justifyContent: 'flex-end',
  },
});
