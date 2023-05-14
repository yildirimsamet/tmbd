import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames'
import axios from 'axios';
import { addApiKey } from '@/utils/addApiKey';
import { enums } from "@/utils/enums";
import MovieCart from '../MovieCart';

const TrendingSection = () => {
    const { baseApiUrl } = enums;

    const [isTodayChecked, setIsTodayChecked] = useState(true);
    const [moviesData, setMoviesData] = useState([]);

    const handleChange = () => {
        setIsTodayChecked(!isTodayChecked);
    }

    const getTrendingData = async () => {
        const { data } = await axios.get(addApiKey(`${baseApiUrl}/trending/movie/${isTodayChecked ? 'day' : 'week'}`));
        console.log(data)
        setMoviesData(data);
    }

    useEffect(() => {
        getTrendingData();
    }, [isTodayChecked])

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperTop}>
                <h3 className={styles.wrapperTopTitle}>Trend</h3>
                <div onClick={handleChange} className={styles.wrapperTopToggle}>
                    <div className={cn(styles.wrapperTopToggleShadow, isTodayChecked ? styles.wrapperTopToggleShadowLeft : styles.wrapperTopToggleShadowRight)}>
                    </div>
                    <div className={cn(styles.wrapperTopToggleLeft, isTodayChecked && styles.wrapperTopToggleActive)}>Bugün</div>
                    <div className={cn(styles.wrapperTopToggleRight, !isTodayChecked && styles.wrapperTopToggleActive)}>Bu Hafta</div>
                </div>
            </div>
            <div className={styles.wrapperBottom}>
                {moviesData.results && moviesData.results.map((movie, index) => {
                    return (
                        <MovieCart key={index} movie={movie} />
                    )
                })
                }
            </div>
        </div>
    )
};

export default TrendingSection;