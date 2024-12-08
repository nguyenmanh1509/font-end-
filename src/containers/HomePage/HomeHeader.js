import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import {    FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
            <div className='home-header-container'>
                <div className='home-header-content'>
                <div className='left-content'>
                    <i className="fas fa-bars"></i>
                <div className='header-logo'></div>
                </div>
                <div className='center-content'>
                    <div className='child-content'>
                         <div><b><FormattedMessage id="home-header.speaciality"/></b></div>
                         <div className='subs-title'></div>

                    </div>
                    <div className='child-content'>
                        <div><b><FormattedMessage id="home-header.medical-facility"/></b></div>
                         <div className='subs-title'><FormattedMessage id="home-header.select-room"/></div>

                    </div>
                    <div className='child-content'>
                        <div><b><FormattedMessage id="home-header.doctor"/></b></div>
                        <div className='subs-title'><FormattedMessage id="home-header.leading-doctor"/></div>

                    </div>
                    <div className='child-content'>
                        <div><b><FormattedMessage id="home-header.fee"/></b></div>
                        <div className='subs-title'><FormattedMessage id="home-header.fee-1"/></div>

                    </div>
                    
                </div>
                <div className='right-content'>
                    <div className='support' >
                    <i className="far fa-question-circle"></i>
                    <FormattedMessage id="home-header.support"/>
                    </div>
                     <div className="flag"><span onClick={()=>this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                    <div className="flag"><span onClick={()=>this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                </div>
                </div>
            </div>

            <div className='home-header-banner'>
                <div className='title1'><FormattedMessage id="banner.title1"/></div>
                <div className='title2'><FormattedMessage id="banner.title2"/></div>
                <div className='search'>
                <i className="fas fa-search"></i>
                    <input type="text" placeholder='Tìm kiếm bác sĩ, cơ sở y tế...'/>
                </div>
                <div className='options'>
                    <div className='option-child'>
                    <div className='icon-child'> <i className="fas fa-hospital-alt"></i></div>
                    <div className='text-child'><FormattedMessage id="banner.child1"/> </div>
                    </div>
                    <div className='option-child'>
                    <div className='icon-child'> <i className="fas fa-procedures"></i></div>
                    <div className='text-child'><FormattedMessage id="banner.child2"/></div>
                    </div>
                    <div className='option-child'>
                    <div className='icon-child'> <i className="fas fa-flask"></i></div>
                    <div className='text-child'><FormattedMessage id="banner.child3"/></div>
                    </div>
                    <div className='option-child'>
                    <div className='icon-child'> <i className="fas fa-briefcase-medical"></i></div>
                    <div className='text-child'><FormattedMessage id="banner.child4"/></div>
                    </div>
                    <div className='option-child'>
                    <div className='icon-child'> <i className="fas fa-map-pin"></i></div>
                    <div className='text-child'><FormattedMessage id="banner.child5"/>  </div>
                    </div>
                    



                </div>


            </div>

            </React.Fragment>
        )
        
        
    }
    
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux:(language)=>dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
