import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Role = 'survivor' | 'killer' | 'unassigned';

interface Props {
  name: string;
  role: Role;
  isMe?: boolean;
}

const getBackgroundColor = (role: Role) =>
  role === 'survivor' ? 'blue' : role === 'killer' ? 'red' : 'grey';
export const PlayerCard: React.FC<Props> = ({name, role, isMe}) => {
  const meLabel = isMe ? '(me)' : '';
  const width = role === 'survivor' ? styles.survivorWidth : styles.killerWidth;
  return (
    <View
      style={{
        ...styles.wrapper,
        ...width,
        backgroundColor: getBackgroundColor(role),
      }}>
      <Text style={styles.name}>{`${name} ${meLabel}`}</Text>
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
    padding: 5,
    borderRadius: 3,
    textAlign: 'center',
  },
  survivorWidth: {
    width: '15%',
    maxWidth: '20%',
  },
  killerWidth: {
    width: '80%',
    maxWidth: '90%',
  },
  name: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  role: {
    justifyContent: 'flex-end',
    color: 'white',
    width: '40%',
    textAlign: 'center',
  },
});
