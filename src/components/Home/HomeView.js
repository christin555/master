import React from 'react';
import Header from './Header';
import s from './Home.module.scss';
import Index from '../../shared/Footer';
import Wrapper from '../../shared/wapper.jpg';
import logo from '../../shared/logo.png';
import TextField from "../../shared/TextField";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhoneIcon from '@material-ui/icons/Phone';
import YouTube from 'react-youtube';

const Home = () => (
    <div>
        <div className={s.contentContainer}>
            <div className={s.wrapper}>
                <div className={s.gradientOverlay}>
                    <div className={s.header}>
                        <div className={s.right}>
                            <div className={s.logoBlock}>
                                <img src={logo}/>
                            </div>
                            <div> МАСТЕР ПОЛА</div>
                        </div>

                        <div className={s.left}>
                           <div className={s.search}>
                               <SearchIcon/>
                               <TextField placeholder={'Поиск'}/>
                           </div>
                            <div className={s.phone}>
                                +7 982 988-15-22
                            </div>
                        </div>

                    </div>
                    <div className={s.menu}>
                        <div> Главная </div>
                        <div className={s.importnant}> Каталог </div>
                        <div> О нас </div>
                        <div> Контакты </div>
                        <div className={s.importnant}> Монтаж </div>
                    </div>


                    <div className={s.mediaBlock}>
                        <div className={s.text}>
                            РЕАЛИЗУЙТЕ МЕЧТЫ ВМЕСТЕ С НАМИ
                            <div className={s.slogan}>
                                <span>проффесионализм</span>
                                <span>ответсвенность</span>
                                <span>надежность</span>
                            </div>
                        </div>
                        <YouTube
                        className={s.video}
                        videoId={'bAmdyypn8OI'}
                        opts={{
                            playerVars: {
                                rel: 0,
                                showinfo: 0,
                                iv_load_policy: 3,
                                modestbranding: 1,
                                fs: 0,
                                loop: 1,
                                width: 160,
                                height: 215,
                                controls: 0,
                            },
                        }}
                    />
                    </div>
                </div>

                <div className={s.other}> КАКОЙ-ТО ТЕКСТ </div>
            </div>
        </div>
        <Index/>
    </div>
);

export default Home;
