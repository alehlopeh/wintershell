
import React from 'react';
import ReactNative, { AppRegistry, TextInput, StyleSheet, Text, View, TouchableHighlight, NativeModules } from 'react-native-macos';
const {RNWindowSize, RNOpenApp} = NativeModules


if(typeof window !== 'undefined'){
  window.ReactNative = ReactNative;
}

function getFiles(){
  return fetch('http://localhost:3000').then(res => res.json())
}

class Wintershell extends React.Component{

  state = {
    apps: [],
    visibleResults: [],
    search: ''
  };

  componentDidMount(){
    getFiles().then(files => {
      const apps = files.filter(f => f.indexOf('.app') > -1)
      this.setState({apps})
    })
  }



  handleChangeText(text){
    const {apps, search} = this.state

    const visibleResults = apps.filter(a => a.toLowerCase().indexOf(text.toLowerCase()) > -1).slice(0,5)

    if(!text.length){
      RNWindowSize.resize(700, 50)
    }else if(text.length != search.length || visibleResults.length != this.state.visibleResults.length){
      RNWindowSize.resize(700, visibleResults.length*50 + 50)
    }

    this.setState({search: text, visibleResults })

  }

  handleSelectApp(appName){
    this.setState({search: '', visibleResults: [] })
    RNWindowSize.resize(700, 50)
    RNOpenApp.openApp(appName)
  }

  handleSubmit(){
    // Not being fired 
    if(this.state.visibleResults[0]) this.handleSelectApp(this.state.visibleResults[0])
  }

  renderList(){
    const {visibleResults} = this.state

    return visibleResults.map((app,i) => (
      <TouchableHighlight
        onPress={this.handleSelectApp.bind(this,app)}
        key={`${i}file`}
        underlayColor={'#ccc'}
        style={[styles.welcome,{borderTopWidth:1,borderColor:'#666'}]}
      >
        <Text
          numberOfLines={1}
          style={styles.welcomeText}
        >{app}</Text>
      </TouchableHighlight>
    ))
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={{alignSelf:'stretch',padding:0,borderWidth:0}}>
          <TextInput
            onChangeText={this.handleChangeText.bind(this)}
            style={[styles.welcome,styles.welcomeText,{borderColor:'transparent'}]}
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus
            onSubmitEditing={this.handleSubmit.bind(this)}
            value={this.state.search}
            multiline={false}
            onKeyPress={(event) => {
             console.log('onKeyPress key: ' + event.nativeEvent.key);
            }}
          />
        </View>
        {this.state.search.length > 0 && this.renderList()}
      </View>
    )
  }
}
AppRegistry.registerComponent('Wintershell', () => Wintershell);


const styles = StyleSheet.create({
  container: {
    position:'relative',
    width:700,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  welcome: {
    marginHorizontal:0,
    height:50,
    padding:20,
    alignSelf:'stretch',
    alignItems:'stretch',
    justifyContent:'center'
  },
  welcomeText: {
    fontSize: 40,
    textAlign: 'left',
    margin: 0,
    color: '#fff',

  },

});
