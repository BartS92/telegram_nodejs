
CREATE TABLE public.users
(
    telegram_id bigint NOT NULL,
    chat_id bigint NOT NULL,
    first_name text NOT NULL,
    last_name text
);

-- CREATE SEQUENCE public.users_seq
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;


-- ALTER SEQUENCE public.users_seq OWNED BY public.users.id;

-- ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_seq'::regclass);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (telegram_id);