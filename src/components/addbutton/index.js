import React from 'react';

import styles from './styles.module.css';

function AddButton(props) {
    return (
        <div className={styles.button} onClick={(event) => props.handleClickAdd(event)}>
            Нэмэх
        </div>
    )
}

export default AddButton;
