import Link from 'next/link';
import styles from './styles.module.scss';

const MovieCart = ({ movie }) => {
    const {poster_path, release_date, title, id} = movie;
    console.log(movie)

    return (
        <div className={styles.wrapper}>
            <img className={styles.wrapperImage} src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster_path}`}/>
            <Link href={`movie/${ id }`} className={styles.wrapperTitle}>{title}</Link>
            <p className={styles.wrapperRelease}>{release_date}</p>
        </div>
    )
};

export default MovieCart;