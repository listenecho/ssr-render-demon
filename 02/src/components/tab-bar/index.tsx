import React from 'react'
import { NavLink} from 'react-router-dom'
export default class TabBarExample extends React.Component {
  constructor(props: any) {
    super(props);
   
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: false,
    };
  }

  render() {
    
    return (
      <div style={{ position: 'fixed', height: '100vh', width: '100vw', bottom: 0 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around'
        }}>
          <button key={1}><NavLink to='/home'>GREA111555T</NavLink></button>
          <button key={2}><NavLink to='/news'>NEWS</NavLink></button>
          <button key={3}><NavLink to='/mine'>MINE</NavLink></button>
        </div>
      </div>
    );
  }
}

