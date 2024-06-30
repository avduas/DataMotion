-- Table: app.users

-- DROP TABLE IF EXISTS app.users;

CREATE TABLE IF NOT EXISTS app.users
(
    user_id integer NOT NULL DEFAULT nextval('app.users_user_id_seq'::regclass),
    org_id integer NOT NULL,
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_organizations_fk FOREIGN KEY (org_id)
        REFERENCES app.organizations (org_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION 
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS app.users
    OWNER to postgres;