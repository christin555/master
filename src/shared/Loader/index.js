import React from 'react';
import s from './Loader.module.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
    return <div className={s.loader}><CircularProgress/></div>
}

export default Loader;
