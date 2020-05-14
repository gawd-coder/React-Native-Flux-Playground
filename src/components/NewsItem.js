import React, { Component, PropTypes } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Byline from './Byline';
import AppText from './AppText';
import Thumbnail from './Thumbnail';
import * as globalStyles from '../styles/global';

export default class NewsItem extends Component {
    render(){
        const{
            style,
            imageUrl,
            title,
            author,
            date,
            location,
            onPress,
            description,
        } = this.props;
        const accentColor = globalStyles.ACCENT_COLORS[
        this.props.index % globalStyles.ACCENT_COLORS.length
        ];
        return (
            <TouchableOpacity 
                style={style}
                onPress = {onPress}
            >
                <View>
                    <Thumbnail
                        url={imageUrl}
                        titleText={title}
                        accentColor={accentColor}
                        style={styles.thumbnail}
                    />
                    <View style={styles.content}>
                        <Byline
                            author={author}
                            date={date}
                            location={location}
                        />
                        <AppText>
                            {description}
                        </AppText>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

NewsItem.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date).isRequired,
    author: PropTypes.string.isRequired,
    location: PropTypes.string,
    index: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    style: View.PropTypes.style,
    onPress = PropTypes.func.isRequired
    };

const styles = StyleSheet.create({
    thumbnail: {
    marginBottom: 5
    },
    content: {
    paddingHorizontal: 5
    }
});        