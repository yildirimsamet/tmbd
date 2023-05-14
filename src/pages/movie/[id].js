import { addApiKey } from "@/utils/addApiKey";
import { enums } from "@/utils/enums";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from './styles.module.scss';
import { shortcutDropDownData } from "@/staticData";
import Dropdown from "@/components/Dropdown";

const MoviePage = ({ data }) => {
    const { baseApiUrl } = enums;
    const [movieInfo, setMovieInfo] = useState({});

    const getMovieData = async () => {
        try {
            const movieResponse = await axios.get(addApiKey(`${baseApiUrl}/movie/${data}`));

            setMovieInfo(movieResponse?.data);
            console.log(movieResponse?.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (data) {
            getMovieData();
        }
    }, [data])
    return (
        movieInfo.poster_path && <div className={styles.wrapper} style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieInfo.backdrop_path})` }}>
        <div className={styles.innerWrapper}>
            <div className={styles.shortcut}>
                {shortcutDropDownData.map(({ title, dropdownList }, index) => (
                    <Dropdown color="#000" key={index} title={title} dropdownList={dropdownList} dropdownOpenSide="down" />
                ))}
            </div>
            <div className="w-container ml-auto mr-auto">
                <div className={styles.main} >
                    <div className={styles.mainLeft}>
                        <div>
                            <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieInfo.poster_path}`} />
                        </div>
                    </div>
                    <div className={styles.mainRight}>
                        <div>
                            <p className={styles.title}>{movieInfo.title} {'(' + movieInfo.release_date?.substring(0, 4) + ')'}</p>
                            {movieInfo.release_date}
                            {movieInfo.genres.map((genre) => <span className={styles.genre}>{genre.name}</span>)}
                        </div>
                        <div>
                            <p className={styles.overviewTitle}>Özet</p>
                            <p>{movieInfo.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
};

export default MoviePage;

export const getServerSideProps = async (ctx) => {
    const { id } = ctx.query;

    return {
        props: { data: id }
    };
};