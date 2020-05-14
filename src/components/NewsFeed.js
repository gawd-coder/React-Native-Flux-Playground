import React, { PropTypes, Component } from 'react';
import {
    ListView,
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    WebView
} from 'react-native';
import * as globalStyles from '../styles/global';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SmallText from './SmallText';

export default class NewsFeed extends Component{
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (row1,row2) => row1.title !== row2.title,  //tells it how to compare two rows to tell if they have changed. This tells the ListView when to re-render
            modalVisible: false
        });
        this.state = {
            DataSource: this.ds.cloneWithRows(props.news) //we give the new data source the raw data and store the result in our component's state so that we can access it at render time
        }
        this.onModalOpen = this.onModalOpen.bind(this);  //binding this component of event listener
        this.renderRow = this.renderRow.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
    }
    renderRow(rowData, ...rest){
        const index = parseInt(rest[1], 10);
        return (
            <NewsItem
            onPress = {() => this.onModalOpen(rowData.url)}
            style={styles.newsItem}
            index={index}
            {...rowData}
            />
        );
    }
    onModalClose(){(
        this.setState({
            modalVisible: false
        })
    )}
    renderModal(){
        return(
            <Modal
                animationType = "slide"
                visible = {this.state.modalVisible}
                onRequestClose = {this.onModalClose}
            >
                <View style = {styles.modelContent}>
                    <TouchableOpacity
                        onPress = {this.onModalClose}
                        style = {styles.closeButton}
                    >
                        <SmallText>Close</SmallText>
                    </TouchableOpacity>    
                    <WebView 
                        onNavigationStateChange={(navState) => {
                            if(navState.canGoBack){
                                this.showBackButton();
                            }
                        }}
                        scalesPageToFit
                        source = {{uri: this.state.modalUrl}}
                    /> 
                    {/*In order to tell our WebView what to show, we'll need to define its source object)prop. */}
                </View>
            </Modal>
        );
    }
    onModalOpen(){
        this.setState({
            modalVisible: true,
            modalUrl: url
        });
    }
    render(){        
        return(
            <View style = {globalStyles.COMMON_STYLES.pageContainer}>
                <ListView 
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    style={this.props.listStyles}
                />
                {this.renderModal()}
            </View>
        )
    }
}

NewsFeed.propTypes = {
    news: PropTypes.arrayOf(PropTypes.object),
    listStyles: View.propTypes.style
}

NewsFeed.defaultProps = {
    news: [
        {
        title: 'React Native',
        imageUrl: 'https://facebook.github.io/react/img/logo_og.png',
        description: 'Build Native Mobile Apps using JavaScript and React',
        date: new Date(),
        author: 'Facebook',
        location: 'Menlo Park, California',
        url: 'https://facebook.github.io/react-native'
    },
        {
        title: 'Packt Publishing',
        imageUrl:  'https://www.packtpub.com/sites/default/files/packt_logo.png',
        description: 'Stay Relevant',
        date: new Date(),
        author: 'Packt Publishing',
        location: 'Birmingham, UK',
        url: 'https://www.packtpub.com/'
    },
    ]
};

const styles = StyleSheet.create({
    newsItem:{
    marginBottom: 20
    },
    modalContent:{
        flex: 1,
        justifyContent: 'center',
        paddingTop: 20,
        backgroundColor: globalStyles.BG_COLOR
    },
    closeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row'
    }
});