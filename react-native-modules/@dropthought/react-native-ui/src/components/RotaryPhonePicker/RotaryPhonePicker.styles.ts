import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#071B43',
    width: 400,
    height: 400,
    borderRadius: 200,
  },
  content: {
    width: 250,
    height: 250,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 75,
    backgroundColor: '#FCF268',
    borderRadius: 125,
    margin: 'auto',
  },
  item: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cursor: {
    position: 'absolute',
    top: 100,
  },
});
