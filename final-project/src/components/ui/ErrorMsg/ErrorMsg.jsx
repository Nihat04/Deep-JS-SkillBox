import classNames from 'classnames';
import styles from './ErrorMsg.module.css';

const ErrorMsg = (props) => {
    const { children, active } = props;

    return (
        <div
            className={classNames(styles['error-msg'], {
                [styles['error-msg-active']]: active,
            })}
        >
            {children}
        </div>
    );
};

export default ErrorMsg;
