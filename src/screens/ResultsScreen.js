/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, View, RefreshControl, Text} from 'react-native';

import {SectionGrid} from 'react-native-super-grid';
import Card from 'components/Card';
import NavigationButtonsGroup from 'components/NavigationButtonsGroup';

import {connect} from 'react-redux';
import resultsActions from 'store/domains/results/resultsActions';

const ResultItem = ({item, onShowDetail}) => {
  return (
    <Card>
      <View style={styles.resultLeft}>
        <Text>Pos: {item.position}</Text>
        <Text>No: {item.number}</Text>
      </View>
      <View style={styles.resultMiddle}>
        <View style={styles.resultPerson}>
          <Text>Гонщик</Text>
          <Text
            style={styles.resultTextLink}
            onPress={() => onShowDetail('Гонщик', item.Driver)}>
            {item.Driver.givenName} {item.Driver.familyName}
          </Text>
        </View>
        <View style={styles.resultPerson}>
          <Text>Конструктор</Text>
          <Text
            style={styles.resultTextLink}
            onPress={() => onShowDetail('Конструктор', item.Constructor)}>
            {item.Constructor.name}
          </Text>
        </View>
      </View>
      <View style={styles.resultRight}>
        <Text style={{fontSize: 10}}>Q1: {item.Q1}</Text>
      </View>
    </Card>
  );
};

const ResultSection = ({section}) => (
  <View style={styles.sectionBgr}>
    <Text style={styles.sectionTitle}>{section.title}</Text>
  </View>
);

const ResultsScreen = ({results, cursor, move, reset, navigation}) => {
  useEffect(() => {
    if (!results.length) {
      move(0);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: `Результаты - ${cursor.page + 1} / ${cursor.pages}`,
      headerRight: (props) => (
        <NavigationButtonsGroup cursor={cursor} onMove={move} />
      ),
    });
  });

  const onShowDetail = (title, obj) => {
    navigation.push('DetailsScreen', {details: obj, title: title});
  };

  return (
    <SectionGrid
      refreshing={cursor.loading}
      itemDimension={600}
      style={styles.flatGrid}
      spacing={2}
      sections={results}
      refreshControl={
        <RefreshControl
          size={RefreshControl.SIZE.LARGE}
          title="Обновление"
          refreshing={cursor.loading}
          onRefresh={() => reset()}
        />
      }
      renderItem={({item, section}) => (
        <ResultItem item={item} onShowDetail={onShowDetail} />
      )}
      renderSectionHeader={({section}) => <ResultSection section={section} />}
    />
  );
};

const mapStateToProps = ({resultsReducers}) => {
  const {results, cursor, error} = resultsReducers;
  if (error) {
    throw new Error(error.message);
  }
  return {
    results,
    cursor,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    move: (direction) => dispatch(resultsActions.navigate(direction)),
    reset: () => dispatch(resultsActions.reset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsScreen);

const styles = StyleSheet.create({
  flatGrid: {
    marginTop: 0,
    flex: 1,
  },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionBgr: {
    backgroundColor: 'orange',
    height: 48,
    display: 'flex',
    justifyContent: 'center',
  },
  resultLeft: {
    width: 60,
  },
  resultMiddle: {
    flexGrow: 1,
    alignItems: 'flex-start',
  },
  resultPerson: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  resultTextLink: {
    textDecorationLine: 'underline',
    paddingLeft: 5,
    color: 'orange',
    fontWeight: 'bold',
  },
});

//export default withAppContextProvider(ResultsScreen);
