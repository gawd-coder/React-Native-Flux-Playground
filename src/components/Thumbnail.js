import React, { PropTypes } from 'react';
import {
StyleSheet,
Image,
View
} from 'react-native';
import Title from "./Title"

const Thumbnail = ({url, titleText,accentColor,style}) => {
    const imageStyle = {
        backgroundColor: `${accentColor}77`
    };
    const TitleComponent = <Title style={styles.title}>{titleText}</Title>;
    return(
        <View style = {[styles.container,{borderColor: accentColor}, style]}>
            {
                url.length > 0 ? (
                    <Image 
                        style = {[styles.image]}
                        source = {{
                            uri: url
                        }}
                    >
                        {TitleComponent}
                    </Image>
                ):(
                    <View style={[styles.image, imageStyle]}>
                        {TitleComponent}
                    </View>
                    )
            }        
        </View>        
    );
};

Thumbnail.propTypes = {
    url: PropTypes.string.isRequired,
    titleText: PropTypes.string,
    style: View.PropTypes.style,
    accentColor: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
    image:{
        height: 100,
        justifyContent: "flex-end",
    },
    title: {
        padding: 5
    },
    container:{
        borderBottomWidth: 3,
        borderStyle: "solid"
    }
})

export default Thumbnail;