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
  return (
    <View
      style={{...styles.wrapper, backgroundColor: getBackgroundColor(role)}}>
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
    width: '15%',
    maxWidth: '20%',
    padding: 5,
    borderRadius: 3,
    textAlign: 'center',
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
