import React from 'react';

const Notification = ({ message }) => {
    const styles = {
        fontSize: 16,
        border: '3px solid white',
        background: 'lightgrey',
        borderRadius: 5
    }

    if(message === null) { 
       return null
    }
    else {
        if(message.error === true) {
            styles.color = 'red'
            styles.border = '3px solid red'
        }
        else {
            styles.color = 'green'
            styles.border = '3px solid green'
        }
    }

    return (
        <div style={styles} className='notification'>
            <br />
            <p>{message.text}</p>
        </div>
    )
}

export default Notification