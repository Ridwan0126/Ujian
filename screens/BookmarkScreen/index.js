// import React from 'react';
// import {View, Text, Button, StyleSheet} from 'react-native';

// const BookmarkScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Bookmark Screen</Text>
//       <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
//     </View>
//   );
// };

// export default BookmarkScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const contacts = [
  {index: 0, name: ' Caroyn'},
  {index: 1, name: ' Aaroyn'},
  {index: 2, name: ' Daroyn'},
  {index: 3, name: ' Garoyn'},
  {index: 4, name: ' Naroyn'},
  {index: 5, name: ' Uaroyn'},
  {index: 6, name: ' Zaroyn'},
  {index: 7, name: ' Baroyn'},
  {index: 8, name: ' Maroyn'},
  {index: 9, name: ' Karoyn'},
  {index: 10, name: ' Qaroyn'},
  {index: 11, name: ' Aaroyn'},
  {index: 12, name: ' Saroyn'},
  {index: 13, name: ' Faroyn'},
  {index: 14, name: ' Raroyn'},
  {index: 15, name: ' Iaroyn'},
  {index: 16, name: ' Naroyn'},
  {index: 17, name: ' Vroyn'},
  {index: 18, name: ' Zroyn'},
];
// getData = () => {
//   let conatctsArr = [];
//   let aCode = 'A'.charCodeAt(0);
//   for (let i = 0; i < 26; i++) {
//     let currChar = String.fromCharCode(aCode + 1);
//     let obj = {title: currChar};
//     let currContacts = contacts.filter(item => {
//       return item.name[0].toUpperCase() === currChar;
//     });
//     if (currContacts.length > 0) {
//       currContacts.sort((a, b) => a.name.localeCompare(b.name));
//       obj.data = currContacts;
//       conatctsArr.push(obj);
//     }
//   }
//   return conatctsArr;
// };

const BookmarkScreen = () => {
  getData = () => {
    let conatctsArr = [];
    let aCode = 'A'.charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      let currChar = String.fromCharCode(aCode + 1);
      let obj = {title: currChar};
      let currContacts = contacts.filter(item => {
        return item.name[0].toUpperCase() === currChar;
      });
      if (currContacts.length > 0) {
        currContacts.sort((a, b) => a.name.localeCompare(b.name));
        obj.data = currContacts;
        conatctsArr.push(obj);
      }
    }
    return conatctsArr;
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={[
          {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
          {
            title: 'J',
            data: [
              'Jackson',
              'James',
              'Jillian',
              'Jimmy',
              'Joel',
              'John',
              'Julie',
            ],
          },
          {
            title: 'K',
            data: [
              'kackson',
              'kames',
              'killian',
              'kimmy',
              'koel',
              'kohn',
              'kulie',
            ],
          },
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default BookmarkScreen;
