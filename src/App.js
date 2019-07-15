import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css'
import { SideNav, Nav } from 'react-sidenav'
import escapeRegExp from 'escape-string-regexp'


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            show : false,
            };
        
        this.toggleDiv = this.toggleDiv.bind(this)
    }
    
    toggleDiv = () => {
        const { show } = this.state;
        this.setState( { show : !show } )
    }
    
    
    state = {
        images:{},
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        query: '',
        
        
    };

    updateinput=(query)=>{
        this.setState({query:query.trim()})
    }

    clearinput=()=>{
        this.setState({ query: '' })
    }
    
    locations = [
          {title: 'Bangalore Palace', location: {lat: 12.9988, lng: 77.5921},image:'https://images8.alphacoders.com/593/593193.jpg'},
          {title: 'Tippu Sultan Palace', location: {lat: 12.9595, lng: 77.5738},image:'https://cdn1.goibibo.com/t_tg_fs/bangalore-tipu-sultans-summer-palace-149598657369-orijgp.jpg'},
          {title: 'Lal Bagh', location: {lat: 12.9507, lng: 77.5848},image:'https://dd0w3jaz1pep7.cloudfront.net/assets/images/tourism/poi/Bangalore/lalbagh-botanical-garden-bangalore-4fcd3fd3e44d78692f24624f.jpg'},
          {title: 'Vishweshwaraiah Museum', location: {lat: 12.9752, lng: 77.5963},image:'http://www.vismuseum.gov.in/images/vitm.jpg'},
          {title: 'Vidhana Soudha', location: {lat: 12.9779, lng: 77.5896},image:'https://c1.hiqcdn.com/customcdn/1300x512/destreviewimages/1514274312_rotates_irctc_21402787322017122246.jpg'}
        ];

    onMarkerClick = (props, marker, e) =>
     
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
       
        
    });
        
    render() {
        
        const location = this.locations
        const {query} = this.state
        
        let showingList
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingList = location.filter((location) => match.test(location.title))
        } 
        else 
        {
            showingList = location
        }
       
        return( 
            <div>
             
                <Map google={this.props.google}
                    onClick={this.onMapClicked}
                    initialCenter={{
                        lat: 12.9769,
                        lng: 77.59
                    }}
                    zoom={13}
                >    
                    <div id="nav">
                        <i id="header">Neigbourhood Map</i>
                        <div>    

                            {this.state.show && 
                                <div id="sidenav">
                                    
                                    <button className="btn1" onClick={ this.toggleDiv }>X</button>
                                    <p>Map Locations</p>
                                    <input id="field" type='text' placeholder='Search Places' onChange={(event)=>{this.updateinput(event.target.value)}}/>
                                    
                                    {	
                                        <ul className="books-grid">
                                        {showingList.map((List) =>     
                                        (
                                            <a onClick={this.onMarkerClick}><li>
                                                {List.title}
                                            </li></a>    
                                        ))}
                                        </ul>
                                    }
                                </div>
                            }
                            
                            <button className="btn" onClick={ this.toggleDiv }>≡</button>
                        
                        </div>
                    </div>

                    {showingList.map((List) =>     
                    (
                        
                        <Marker
                            onClick={this.onMarkerClick}
                            title = { List.title }
                            position = {List.location}
                            animation={2}
                            image = {List.image}
                        />
                        
                            
                    ))}  

                    {this.state.showingInfoWindow &&      
                        <InfoWindow 
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            <div>
                                <h1 className="infoheader">{this.state.selectedPlace.title}</h1>
                                <div className="background" style={{ width: 300, height: 300, backgroundImage: `url("${this.state.selectedPlace.image}")` }} ></div>
                            </div>
                        </InfoWindow>             
                    }
                </Map>               
            
            </div>
        )
    }  
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCYe9PVwZnOypXNIzJLyHLCRO3dats993o")
})(App)