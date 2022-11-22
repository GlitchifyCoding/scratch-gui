import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './user-avatar.css';

const UserAvatar = ({
    className,
    imageUrl
}) => (
    <img
        className={classNames(
            className,
            styles.userThumbnail
        )}
        src="https://cdn.discordapp.com/attachments/948706145990750278/1044633413283483648/3553ce919efddc6a819903dda039238d_1.png"
    />
);

UserAvatar.propTypes = {
    className: PropTypes.string,
    imageUrl: PropTypes.string
};

export default UserAvatar;
