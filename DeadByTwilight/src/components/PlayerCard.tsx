import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Role = 'survivor' | 'killer' | 'unassigned';

interface Props {
  name: string;
  role: Role;
}

const getBackgroundColor = (role: Role) =>
  role === 'survivor' ? 'blue' : role === 'killer' ? 'red' : 'grey';
export const PlayerCard: React.FC<Props> = ({name, role}) => {
  return (
    <View
      style={{...styles.wrapper, backgroundColor: getBackgroundColor(role)}}>
      <Text style={styles.name}>{`${name} -`}</Text>
      <Text style={styles.role}>{role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    width: '50%',
    height: 30,
    borderRadius: 3,
  },
  name: {
    justifyContent: 'flex-start',
    color: 'white',
    textAlign: 'center',
  },
  role: {
    justifyContent: 'flex-end',
    color: 'white',
    width: '40%',
    textAlign: 'center',
  },
});
