
CREATE TABLE public.users
(
    id bigint NOT NULL,
    telegram_id bigint NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL
);

CREATE SEQUENCE public.users_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_seq OWNED BY public.events.id;

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.events_seq'::regclass);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);