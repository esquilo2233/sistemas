-- Criação da tabela senators
CREATE TABLE public.senators (
    id SERIAL PRIMARY KEY,
    caucus VARCHAR(255),
    current BOOLEAN,
    description TEXT,
    district VARCHAR(255),
    enddate DATE,
    leadership_title VARCHAR(255),
    party VARCHAR(50),
    bioguideid VARCHAR(50),
    birthday DATE,
    cspanid INTEGER,
    firstname VARCHAR(255),
    gender VARCHAR(50),
    lastname VARCHAR(255),
    link TEXT,
    middlename VARCHAR(255),
    name VARCHAR(255),
    namemod VARCHAR(255),
    nickname VARCHAR(255),
    osid VARCHAR(50),
    sortname VARCHAR(255),
    twitterid VARCHAR(50),
    youtubeid VARCHAR(50),
    phone VARCHAR(50),
    role_type VARCHAR(50),
    senator_class VARCHAR(50),
    senator_rank VARCHAR(50),
    startdate DATE,
    state VARCHAR(50),
    title VARCHAR(50),
    title_long VARCHAR(50),
    website TEXT,
    created_by VARCHAR(255) NOT NULL DEFAULT 'system',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela congress_numbers
CREATE TABLE public.congress_numbers (
    id SERIAL PRIMARY KEY,
    senator_id INTEGER REFERENCES senators(id),
    congress_number INTEGER,
    created_by VARCHAR(255) NOT NULL DEFAULT 'system',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela extra
CREATE TABLE public.extra (
    id SERIAL PRIMARY KEY,
    senator_id INTEGER REFERENCES senators(id),
    address TEXT,
    contact_form TEXT,
    office TEXT,
    rss_url TEXT,
    created_by VARCHAR(255) NOT NULL DEFAULT 'system',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
