CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uid VARCHAR(50) NOT NULL,
    UNIQUE KEY (uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE user_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    body TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    operator_id BIGINT,
    KEY (user_id),
    KEY (operator_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE operators (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    login_id VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    UNIQUE KEY (login_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE operator_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    from_operator_id BIGINT NOT NULL,
    to_operator_id BIGINT NOT NULL,
    body TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    KEY (from_operator_id),
    KEY (to_operator_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE responsible (
    user_id BIGINT NOT NULL,
    operator_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, operator_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE user_messages ADD CONSTRAINT
    user_messages_user_id FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE user_messages ADD CONSTRAINT
    user_messages_operator_id FOREIGN KEY (operator_id)
    REFERENCES operators(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE operator_messages ADD CONSTRAINT
    operator_messages_from FOREIGN KEY (from_operator_id)
    REFERENCES operators(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE operator_messages ADD CONSTRAINT
    operator_messages_to FOREIGN KEY (to_operator_id)
    REFERENCES operators(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE responsible ADD CONSTRAINT
    responsible_user_id FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE responsible ADD CONSTRAINT
    responsible_operator_id FOREIGN KEY (operator_id)
    REFERENCES operators(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
