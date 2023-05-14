import styles from './styles.module.scss';

const Discover = () => {
    return (
        <div className={styles.discover}>
            <h3 className={styles.discoverTitle}>Hoş Geldiniz.</h3>
            <h4 className={styles.discoverSubTitle}>Milyonlarca film, TV şovu ve keşfedilecek kişi. Şimdi keşfedin.</h4>
            <div className={styles.discoverSearchSection}>
                <input placeholder="Film, dizi, kişi ara..." className={styles.discoverSearchSectionInput} />
                <button className={styles.discoverSearchSectionButton}>Search</button>
            </div>
        </div>
    )
}

export default Discover;