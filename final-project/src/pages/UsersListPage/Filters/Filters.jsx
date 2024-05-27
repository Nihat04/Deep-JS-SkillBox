import styles from './Filters.module.css';
import FiltersItem from './FiltersItem';

const Filters = (props) => {
    const { usersList, setUsersList, pageData, setPageData } = props;

    return (
        <div className={styles['filters']}>
            <p className={styles['filters__header']}>Сортировать по</p>
            <ul className={styles['filters__list']}>
                <FiltersItem
                    id={1}
                    usersList={usersList}
                    setUsersList={setUsersList}
                    pageData={pageData}
                    setPageData={setPageData}
                    userPropertyName="first_name"
                >
                    По имени
                </FiltersItem>
                <FiltersItem
                    id={2}
                    usersList={usersList}
                    setUsersList={setUsersList}
                    pageData={pageData}
                    setPageData={setPageData}
                    userPropertyName="last_name"
                >
                    По Фамилии
                </FiltersItem>
                <FiltersItem
                    id={3}
                    usersList={usersList}
                    setUsersList={setUsersList}
                    pageData={pageData}
                    setPageData={setPageData}
                    userPropertyName="email"
                >
                    По Почте
                </FiltersItem>
            </ul>
        </div>
    );
};

export default Filters;
