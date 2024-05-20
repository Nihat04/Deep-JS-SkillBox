import { useMemo } from 'react';
import PaginatorButton from './PaginatorButton';
import styles from '../UserListPage.module.css';

const Paginator = (props) => {
    const { pageData, setPageData } = props;

    const pagesArray = useMemo(
        () => Array.from({ length: pageData.totalPages }, (_, i) => i + 1),
        [pageData.totalPages]
    );

    return (
        <div className={styles['paginator']}>
            {pagesArray.map((btn) => (
                <PaginatorButton
                    key={btn}
                    active={pageData.currentPage === btn}
                    pageData={pageData}
                    setPageData={setPageData}
                >
                    {btn}
                </PaginatorButton>
            ))}
        </div>
    );
};

export default Paginator;
