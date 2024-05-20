import classNames from 'classnames';
import styles from '../UserListPage.module.css';

const PaginatorButton = (props) => {
    const { children, active, pageData, setPageData } = props;
    return (
        <button
            className={classNames(styles['paginator__btn'], {
                [styles['paginator__btn-active']]: active,
            })}
            onClick={() => setPageData({ ...pageData, currentPage: children })}
        >
            {children}
        </button>
    );
};

export default PaginatorButton;
