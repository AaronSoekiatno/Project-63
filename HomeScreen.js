import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity } from 'react-native';


export default class HomeScreen extends React.Component {
constructor(){
  super();
  this.state={
    text:'',
    isSearchedPressed:false,
    word:'',
  }
}

getWord=(word)=>{
var searchKeyword=word.toLowerCase();
var url="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
return fetch(url)
.then((data)=>{
  if(data.status===200){
    return data.json()
  }else{
    return null;
  }
})
.then((response)=>{
  var responseObject=response;

  if(responseObject){
    var wordData=responseObject.definitions[0]
    var definition=wordData.description
    var lexicalCategory=wordData.wordtype
    this.setState({
      "word":this.state.text,
      "definition":definition,
      "lexicalCategory":lexicalCategory,
    })
  }
  else{
    this.state({
      "word":this.state.text,
      "definition":"Not Found"
    })
  }
})
}

  render(){
    return(
      <View>
      <TextInput
      style={styles.text}
      onChangeText={text=>{
        this.setState({
          text:text,
          isSearchedPressed:false,
          word:"Loading...",
          lexicalCategory:"Loading...",
          examples:[],
          definition:"Loading...",
        })
      }}
      value={this.state.text}
      />

      <TouchableOpacity
      style={styles.button}
      onPress={()=>{
        this.setState({isSearchedPressed:true});
        this.getWord(this.state.text);
      }}
      >
      <Text style={{alignSelf:'center'}}>Search</Text>
      </TouchableOpacity>

      <View>
      <Text style={{marginTop:15}}>Word :{""}</Text>
      <Text>{this.state.word}</Text>
      </View>

      <View>
      <Text style={{marginTop:15}}>Type :{""}</Text>
      <Text>{this.state.lexicalCategory}</Text>
      </View>

      <View>
      <Text style={{marginTop:15}}>Definition :{""}</Text>
      <Text>{this.state.definition}</Text>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    marginLeft:130,
    borderWidth:.5,
    width:100,
    height:25,
    marginTop:100,
    borderRadius:20
  },
  text:{
    borderWidth:1.5,
    marginTop:10,
  }
});