import classNames from 'classnames';
import styles from './Filters.module.css';

const FiltersItem = (props) => {
    const {
        children,
        id,
        usersList,
        setUsersList,
        pageData,
        setPageData,
        userPropertyName,
    } = props;

    const filterFunc = () => {
        setPageData({
            ...pageData,
            filter: {
                activeId: id,
                reverse:
                    pageData.filter.activeId === id && !pageData.filter.reverse
                        ? true
                        : false,
            },
        });
        setUsersList(
            usersList.sort((a, b) => {
                if (pageData.filter.reverse) {
                    return b[userPropertyName].localeCompare(
                        a[userPropertyName]
                    );
                }
                return a[userPropertyName].localeCompare(b[userPropertyName]);
            })
        );
    };

    return (
        <li className={'filters__item'}>
            <button
                className={classNames(styles['filters__item__btn'], {
                    [styles['filters__item__btn-active']]:
                        pageData.filter.activeId == id,
                    [styles['filters__item__btn-reverse']]:
                        pageData.filter.activeId == id &&
                        pageData.filter.reverse,
                })}
                onClick={filterFunc}
            >
                {children}
            </button>
        </li>
    );
};

export default FiltersItem;
