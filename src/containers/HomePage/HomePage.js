import React, { Component } from 'react';

import { connect } from 'react-redux';

import Header from './HomeHeader.js'
import HomeHeader from './HomeHeader.js';

class HomePage extends Component {

    render() {
        
        return (
            <div>
                 <HomeHeader />
            </div>
        )
            
        
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
