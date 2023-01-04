import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  subTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    height: 150,
    paddingVertical: 16,
    paddingHorizontal: 15,
    paddingTop: 16,
    borderRadius: 6,
    textAlignVertical: 'top',
  },
  descText: {
    fontWeight: '500',
    paddingVertical: 8,
    fontSize: 12,
    flexGrow: 1,
  },
  descLeft: {
    textAlign: 'left',
  },
  descRight: {
    textAlign: 'right',
  },
});
