import React from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import  logo from './images/logo.svg';
import {storage, firestore} from './components/firebase/firebase.utils';


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      blinds: [],
      blindsSummary: ''
    }
  
  }
 
componentDidMount(){
  // const myKey = '6HJx2R8st$%Q';
  // const url = `https://www.interiorgoodsdirect.com/interview/api/products/?key=${myKey}`;
  // const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  // fetch(proxyUrl + url)
  //        .then(response => response.json())
  //        .then(obj => this.setState({blinds: obj.data.products, blindsSummary: obj.data.description}, () => console.log(this.state)))

    firestore.collection('blindProducts')
      .get()
      .then( snapshot => {
        const newBlinds = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            newBlinds.push(data)
        })
        this.setState({blinds: newBlinds}, () => console.log(this.state))
      })
      .catch( error => console.log(error))

      firestore.collection('mainDescription').doc('bV1BRJ2BuKtCU85inlYf')
      .get()
      .then( snapshot => {
        
        this.setState({blindsSummary: snapshot.data().description})
      })
      .catch( error => console.log(error))

      
    }

    


render(){
  return(
    
    <div className="App">
        <header className="App-header">
          <img src={logo} className="Igd-logo" alt="logo" />
          <p className="Igd-decription">{this.state.blindsSummary}</p>
        </header>
        
        <CardList blinds={this.state.blinds}/>
    </div>
  )
}

}

export default App;
